import { randomUUID } from 'node:crypto';
import { normalizeBaseUrl } from './multica-api.mjs';
import { createWorkProgressState, ingestWorkMessages, snapshotWorkProgress } from './work-progress.mjs';

const ACTIVE = new Set(['queued', 'dispatched', 'running', 'waiting_local_directory', 'deferred']);
const QUEUED = new Set(['queued', 'dispatched', 'waiting_local_directory', 'deferred']);
const TERMINAL = new Set(['completed', 'failed', 'cancelled']);
const MAX_RUNS = 100;
const MAX_LOGS = 200;
const MAX_LOG_BYTES = 64 * 1024;
const MAX_LOG_TEXT = 2000;
const MAX_PENDING_TOOLS = 200;
const MAX_CALL_ID = 256;
const dateMs = value => Number.isFinite(Date.parse(value)) ? Date.parse(value) : null;
const iso = value => new Date(value).toISOString();
const copy = value => structuredClone(value);
const duration = (end, start) => start == null ? null : Math.max(0, end - start);
const mean = values => values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : null;
const p95 = values => values.length ? [...values].sort((a, b) => a - b)[Math.ceil(values.length * 0.95) - 1] : null;
const minutes = (config, key, fallback) => Number.isFinite(config[key]) && config[key] > 0 ? config[key] * 60_000 : fallback * 60_000;

function boundedLog(message) {
  let clipped = false;
  const text = (value, limit) => {
    if (typeof value !== 'string') return '';
    if (value.length > limit) clipped = true;
    return value.slice(0, limit);
  };
  const content = text(message.content, MAX_LOG_TEXT);
  const contentTruncated = message.contentTruncated === true || clipped;
  clipped = false;
  const output = text(message.output, MAX_LOG_TEXT);
  const outputTruncated = message.outputTruncated === true || clipped;
  let input = message.input ?? null;
  const inputJson = input == null ? '' : JSON.stringify(input);
  const inputTruncated = message.inputTruncated === true || inputJson.length > MAX_LOG_TEXT;
  if (inputJson.length > MAX_LOG_TEXT) input = { preview: inputJson.slice(0, MAX_LOG_TEXT), notice: '监控日志已截断工具输入' };
  clipped = false;
  const log = { seq: message.seq, type: text(message.type, 80), callId: text(message.callId, MAX_CALL_ID), tool: text(message.tool, 160),
    content, contentTruncated, input: copy(input), inputTruncated, output, outputTruncated,
    isError: typeof message.isError === 'boolean' ? message.isError : null, createdAt: text(message.createdAt, 80) };
  return { log, truncated: clipped || contentTruncated || outputTruncated || inputTruncated };
}

async function mapLimited(items, limit, operation) {
  let cursor = 0;
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) await operation(items[cursor++]);
  }));
}

export class MonitoringService {
  #getClient; #getConfig; #onAlert; #now; #wsFactory; #pollInterval;
  #running = false; #config = {}; #configKey = ''; #epoch = 0; #controller; #inflight;
  #timer; #eventTimer; #reconnectTimer; #authTimer; #socket; #authenticated = false; #subscribed = new Set(); #reconnectAttempt = 0;
  #tracks = new Map(); #alerts = new Map(); #samples = new Map(); #state; #hadGap = false; #baseline = true;
  #newLogCount = 0; #allLogCount = 0; #windowStart = 0; #windowId = ''; #rerun = false;
  #usageCheckedAt = new Map();
  #historyScan = new Map();
  #lastCollectAt = -Infinity;

  constructor({ getClient, getConfig, onAlert, now = Date.now, webSocketFactory, pollIntervalMs = 10_000 }) {
    if (typeof getClient !== 'function' || typeof getConfig !== 'function') throw new TypeError('监控服务需要 getClient 和 getConfig');
    this.#getClient = getClient; this.#getConfig = getConfig; this.#onAlert = onAlert; this.#now = now;
    this.#wsFactory = webSocketFactory === null ? null : webSocketFactory ?? (typeof globalThis.WebSocket === 'function' ? url => new globalThis.WebSocket(url) : null);
    this.#pollInterval = Math.max(100, pollIntervalMs);
    this.#state = this.#emptyState();
  }

  #emptyState() {
    return { enabled: false, connectionStatus: 'disabled', startedAt: null, lastSyncAt: null, syncLatencyMs: null, error: null, overview: null, warnings: [] };
  }

  #setTimer(callback, milliseconds) {
    const timer = setTimeout(callback, milliseconds);
    timer.unref?.();
    return timer;
  }

  #configured() { return this.#config.monitorEnabled === true && Boolean(this.#config.baseUrl && this.#config.token && this.#config.workspaceId); }

  #syncConfig() {
    const config = this.#getConfig() || {};
    const key = JSON.stringify([config.baseUrl, config.token, config.workspaceId, config.allowedHttpOrigins, config.monitorEnabled]);
    if (key === this.#configKey) { this.#config = { ...config }; return false; }
    this.#config = { ...config }; this.#configKey = key; this.#epoch++;
    this.#controller?.abort(); this.#disconnectSocket();
    clearTimeout(this.#eventTimer); this.#eventTimer = null;
    this.#tracks.clear(); this.#alerts.clear(); this.#samples.clear(); this.#usageCheckedAt.clear(); this.#historyScan.clear();
    this.#allLogCount = 0; this.#newLogCount = 0; this.#hadGap = false; this.#baseline = true; this.#lastCollectAt = -Infinity;
    this.#windowStart = this.#now(); this.#windowId = randomUUID(); this.#state = this.#emptyState();
    this.#state.enabled = this.#running && this.#configured();
    this.#state.startedAt = this.#state.enabled ? iso(this.#windowStart) : null;
    if (this.#state.enabled) { this.#state.connectionStatus = 'polling'; this.#connectSocket(); }
    return true;
  }

  start() {
    if (!this.#running) { this.#running = true; this.#configKey = ''; }
    void this.refresh().catch(() => {});
    return this.snapshot();
  }

  stop() {
    this.#running = false; this.#epoch++;
    clearTimeout(this.#timer); clearTimeout(this.#eventTimer); this.#timer = null; this.#eventTimer = null;
    this.#controller?.abort(); this.#disconnectSocket(); this.#rerun = false;
    this.#state.enabled = false; this.#state.connectionStatus = 'disabled';
  }

  async refresh() {
    const changed = this.#syncConfig();
    if (!this.#running) return this.snapshot();
    if (this.#inflight) {
      if (changed) this.#rerun = true;
      await this.#inflight;
      if (changed && this.#running && this.#configured()) return this.refresh();
      return this.snapshot();
    }
    clearTimeout(this.#timer);
    if (!this.#configured()) {
      this.#state.enabled = false; this.#state.connectionStatus = 'disabled';
      this.#schedulePoll(); return this.snapshot();
    }
    const epoch = this.#epoch;
    this.#controller = new AbortController();
    this.#inflight = this.#collect(epoch, this.#controller.signal).finally(() => {
      this.#inflight = null;
      if (this.#running) {
        this.#schedulePoll();
        if (this.#rerun) { this.#rerun = false; this.#requestSoon(); }
      }
    });
    await this.#inflight;
    return this.snapshot();
  }

  #schedulePoll() {
    clearTimeout(this.#timer);
    if (this.#running) this.#timer = this.#setTimer(() => { void this.refresh().catch(() => {}); }, this.#pollInterval);
  }

  #requestSoon() {
    if (!this.#running || this.#eventTimer) return;
    if (this.#inflight) { this.#rerun = true; return; }
    this.#eventTimer = this.#setTimer(() => {
      this.#eventTimer = null;
      void this.refresh().catch(() => {});
    }, Math.max(150, 1000 - (this.#now() - this.#lastCollectAt)));
  }

  #current(epoch) {
    this.#syncConfig();
    return this.#running && this.#configured() && epoch === this.#epoch;
  }

  #safeError(error) {
    const message = typeof error?.message === 'string' ? error.message : '监控读取失败，请检查 Multica 连接';
    return (this.#config.token ? message.replaceAll(this.#config.token, '[已隐藏令牌]') : message).slice(0, 500);
  }

  #newTrack(run, now) {
    return { run: { ...run }, firstSeenAt: now, lastProgressAt: now, queueObservedAt: now, lastMessageAt: null,
      cursor: 0, logs: [], logSizes: [], logBytes: 2, logsTruncated: false, pending: new Map(), pendingToolsTruncated: false, lastTool: null, messageCount: 0, initialized: false, caughtUp: false,
      logError: null, observationError: null, missing: false, wasActive: ACTIVE.has(run.status), terminalObserved: false,
      terminalLogsRead: false, progress: null, workProgress: createWorkProgressState(), usageUpdatedAt: run.usage ? now : null };
  }

  async #collect(epoch, signal) {
    const started = this.#now();
    this.#lastCollectAt = started;
    try {
      const client = this.#getClient(signal);
      const overview = await client.overview();
      if (!this.#current(epoch)) return;
      const now = this.#now();
      const warnings = [...(overview.warnings || [])];
      const rows = Array.isArray(overview.runs) ? overview.runs : [];
      const present = new Map(rows.map(run => [run.id, run]));
      const active = rows.filter(run => ACTIVE.has(run.status));
      const unresolved = [...this.#tracks.values()].filter(track => !present.has(track.run.id) && (ACTIVE.has(track.run.status) || track.missing)).map(track => track.run);
      const terminal = rows.filter(run => !ACTIVE.has(run.status)).sort((a, b) => (dateMs(b.completedAt) ?? 0) - (dateMs(a.completedAt) ?? 0));
      const selected = [...new Map([...active, ...unresolved, ...terminal, ...[...this.#tracks.values()].map(track => track.run)].map(run => [run.id, run])).values()].slice(0, MAX_RUNS);
      if (new Set([...active, ...unresolved, ...terminal].map(run => run.id)).size > MAX_RUNS) warnings.push(`仅监控最多 ${MAX_RUNS} 次运行，当前样本不覆盖整个工作区。`);
      const selectedIds = new Set(selected.map(run => run.id));
      for (const id of this.#tracks.keys()) if (!selectedIds.has(id)) this.#tracks.delete(id);
      const selectedIssues = new Set(selected.map(run => run.issueId));
      for (const id of this.#usageCheckedAt.keys()) if (!selectedIssues.has(id)) this.#usageCheckedAt.delete(id);
      for (const selectedRun of selected) {
        const incoming = present.get(selectedRun.id);
        let track = this.#tracks.get(selectedRun.id);
        if (!track) { track = this.#newTrack(incoming ?? selectedRun, now); this.#tracks.set(selectedRun.id, track); }
        if (incoming) {
          if (track.run.status !== incoming.status) {
            track.lastProgressAt = now;
            if (QUEUED.has(incoming.status) && !QUEUED.has(track.run.status)) track.queueObservedAt = now;
          }
          track.run = { ...incoming, usage: incoming.usage ?? track.run.usage }; track.missing = false; track.observationError = null;
          if (ACTIVE.has(incoming.status)) track.wasActive = true;
        } else if (ACTIVE.has(track.run.status) || track.missing) {
          track.missing = true;
          track.run = { ...track.run, previousStatus: track.run.previousStatus || track.run.status, status: 'unknown' };
        }
        if (this.#hadGap) { track.lastProgressAt = now; track.queueObservedAt = now; for (const pending of track.pending.values()) pending.observedAt = now; }
      }
      const issueReads = new Map();
      const scopeIssues = (Array.isArray(overview.issues) ? overview.issues : []).filter(issue => typeof issue?.id === 'string').slice(0, 100);
      const requestedIssues = [...new Map([...scopeIssues, ...selected.filter(run => run.issueId).map(run => ({ id: run.issueId }))].map(issue => [issue.id, issue])).values()];
      const scopeIds = new Set(requestedIssues.map(issue => issue.id));
      for (const id of this.#historyScan.keys()) if (!scopeIds.has(id)) this.#historyScan.delete(id);
      const needsRecovery = new Set([...this.#tracks.values()].filter(track => track.missing && !track.observationError).map(track => track.run.issueId));
      const candidates = requestedIssues.filter(issue => needsRecovery.has(issue.id) || now - (this.#historyScan.get(issue.id)?.checkedAt ?? -Infinity) >= 60_000)
        .sort((a, b) => Number(needsRecovery.has(b.id)) - Number(needsRecovery.has(a.id)) || (this.#historyScan.get(a.id)?.checkedAt ?? -Infinity) - (this.#historyScan.get(b.id)?.checkedAt ?? -Infinity)).slice(0, 3);
      for (const issue of candidates) issueReads.set(issue.id, client.issue(issue.id, { includeRelations: false }));
      await mapLimited(candidates, 3, async issue => {
        const prior = this.#historyScan.get(issue.id);
        try {
          const detail = await issueReads.get(issue.id);
          if (!this.#current(epoch)) return;
          const conflicting = detail.runs.some(run => run.status === 'failed' && run.issueId === issue.id && present.has(run.id) && present.get(run.id).status !== 'failed');
          const matchingFailures = detail.runs.filter(run => run.status === 'failed' && run.issueId === issue.id && (!present.has(run.id) || present.get(run.id).status === 'failed'));
          const failures = matchingFailures.slice(0, 50).map(run => ({ runId: run.id, issueId: issue.id, agentId: run.agentId || '', agentName: run.agentName || '', failedAt: run.completedAt || null, discoveredAt: prior?.failures?.find(old => old.runId === run.id)?.discoveredAt || iso(now), error: run.error || '' }));
          this.#historyScan.set(issue.id, { checkedAt: now, ok: true, truncated: detail.runHistoryTruncated === true || matchingFailures.length > 50, conflicting, failures });
          for (const run of detail.runs) {
            const end = dateMs(run.completedAt), start = dateMs(run.startedAt), created = dateMs(run.createdAt);
            if (!this.#baseline && run.status === 'failed' && run.issueId === issue.id && (!present.has(run.id) || present.get(run.id).status === 'failed') && end != null && end >= this.#windowStart && end <= now && (start == null || start <= end) && (created == null || created <= end) && !this.#alerts.has(`${run.id}:failed`)) {
              this.#raise(this.#newTrack(run, now), 'failed', '补采发现运行失败', ['Multica 任务历史确认运行失败', `服务端完成时间 ${run.completedAt}`, run.error || '接口未提供详细错误'], '查看本次运行日志，确认原因后再决定是否重试。', 'critical', now);
            }
          }
        } catch (error) {
          if (this.#current(epoch)) this.#historyScan.set(issue.id, { checkedAt: now, ok: false, truncated: prior?.truncated || false, conflicting: prior?.conflicting || false, failures: prior?.failures || [] });
        }
      });
      const usageIssues = new Set([...this.#tracks.values()].filter(track => track.run.issueId && !track.missing && now - (this.#usageCheckedAt.get(track.run.issueId) ?? -Infinity) >= 60_000)
        .sort((a, b) => (this.#usageCheckedAt.get(a.run.issueId) ?? -Infinity) - (this.#usageCheckedAt.get(b.run.issueId) ?? -Infinity)).map(track => track.run.issueId).filter((id, index, all) => all.indexOf(id) === index).slice(0, 3));
      await mapLimited([...this.#tracks.values()], 3, async track => {
        if (!this.#current(epoch)) return;
        if (track.missing && track.run.issueId) {
          try {
            if (!issueReads.has(track.run.issueId)) throw new Error('本轮任务历史补采预算已用完，等待下次采集');
            const detail = await issueReads.get(track.run.issueId);
            if (!this.#current(epoch)) return;
            const actual = detail.runs.find(run => run.id === track.run.id);
            if (actual) { track.run = { ...actual }; track.missing = false; track.observationError = null; }
            else track.observationError = '运行已离开快照，但任务历史未返回该运行，终态尚未确认';
          } catch (error) { if (this.#current(epoch)) track.observationError = this.#safeError(error); }
        } else if (track.missing) track.observationError = '运行已离开快照且没有关联任务，终态尚未确认';
        if (!this.#current(epoch)) return;
        if (!track.missing && usageIssues.has(track.run.issueId) && issueReads.has(track.run.issueId)) {
          try {
            const detail = await issueReads.get(track.run.issueId);
            if (!this.#current(epoch)) return;
            this.#usageCheckedAt.set(track.run.issueId, now);
            const detailRun = detail.runs.find(run => run.id === track.run.id);
            if (Array.isArray(detailRun?.usage)) { track.run.usage = copy(detailRun.usage); track.usageUpdatedAt = now; }
          } catch {
            if (this.#current(epoch)) this.#usageCheckedAt.set(track.run.issueId, now);
          }
        }
        const terminal = TERMINAL.has(track.run.status);
        if (terminal && !track.terminalObserved && (track.wasActive || (!this.#baseline && (dateMs(track.run.completedAt) ?? -Infinity) >= this.#windowStart))) {
          track.terminalObserved = true;
          this.#samples.set(track.run.id, { ...track.run });
          while (this.#samples.size > 1000) this.#samples.delete(this.#samples.keys().next().value);
        }
        if (track.terminalObserved && this.#samples.has(track.run.id)) this.#samples.set(track.run.id, { ...track.run });
        if (ACTIVE.has(track.run.status) || (track.terminalObserved && !track.terminalLogsRead)) {
          try {
            const batch = await client.messages(track.run.id, track.cursor);
            if (!this.#current(epoch)) return;
            const recovered = Boolean(track.logError);
            this.#consumeMessages(track, batch, this.#now());
            if (terminal && track.caughtUp) track.terminalLogsRead = true;
            if (recovered) { track.lastProgressAt = this.#now(); for (const pending of track.pending.values()) pending.observedAt = this.#now(); }
            track.logError = null;
          } catch (error) {
            if (this.#current(epoch)) track.logError = this.#safeError(error);
          }
        }
        if (terminal) track.pending.clear();
      });
      if (!this.#current(epoch)) return;
      const completed = this.#now();
      this.#state.overview = overview; this.#state.lastSyncAt = iso(completed); this.#state.syncLatencyMs = Math.max(0, completed - started);
      this.#state.error = null; this.#state.warnings = warnings;
      this.#state.connectionStatus = this.#authenticated ? 'live' : 'polling';
      this.#state.enabled = true; this.#hadGap = false; this.#baseline = false;
      for (const track of this.#tracks.values()) this.#evaluate(track, completed, overview);
      this.#syncSubscriptions();
    } catch (error) {
      if (!this.#current(epoch)) return;
      this.#state.error = this.#safeError(error); this.#state.connectionStatus = 'error'; this.#hadGap = true;
    }
  }

  #consumeMessages(track, batch, now) {
    if (!Array.isArray(batch.messages) || !Number.isInteger(batch.lastSeq) || batch.lastSeq < track.cursor) throw new Error('日志增量响应序号无效');
    const fresh = batch.messages.filter(message => message.seq > track.cursor).sort((a, b) => a.seq - b.seq);
    ingestWorkMessages(track.workProgress, fresh);
    const incremental = track.initialized;
    for (const message of fresh) {
      const { log, truncated } = boundedLog(message);
      const logSize = Buffer.byteLength(JSON.stringify(log)) + 1;
      track.logs.push(log); track.logSizes.push(logSize); track.logBytes += logSize;
      track.logsTruncated ||= truncated;
      while (track.logs.length > MAX_LOGS || track.logBytes > MAX_LOG_BYTES) {
        track.logs.shift(); track.logBytes -= track.logSizes.shift(); track.logsTruncated = true;
      }
      track.messageCount++; this.#allLogCount++;
      if (incremental) this.#newLogCount++;
      track.lastMessageAt = now;
      if (message.type === 'tool_use') {
        track.lastTool = log.tool || '未知工具';
        if (typeof message.callId === 'string' && message.callId && !track.pending.has(message.callId)) {
          if (track.pending.size < MAX_PENDING_TOOLS && message.callId.length <= MAX_CALL_ID) track.pending.set(message.callId, { callId: message.callId, tool: track.lastTool, observedAt: now });
          else track.pendingToolsTruncated = true;
        }
      } else if (message.type === 'tool_result' && typeof message.callId === 'string' && message.callId) track.pending.delete(message.callId);
    }
    if (fresh.length || !track.initialized) track.lastProgressAt = now;
    track.cursor = batch.lastSeq;
    track.caughtUp = batch.hasMore !== true;
    if (track.caughtUp) {
      if (!track.initialized) for (const pending of track.pending.values()) pending.observedAt = now;
      track.initialized = true;
    }
  }

  #evaluate(track, now, overview) {
    const run = track.run;
    if (track.missing || (!ACTIVE.has(run.status) && !TERMINAL.has(run.status))) {
      for (const existing of this.#alerts.values()) if (existing.taskId === run.id && !existing.resolvedAt) existing.verificationWarning = '运行状态暂不可核实，无法判断该提醒是否仍然成立。';
      return;
    }
    const activeKinds = new Set();
    const alert = (kind, title, evidence, suggestion, severe = false) => {
      activeKinds.add(kind);
      this.#raise(track, kind, title, evidence, suggestion, severe ? 'critical' : 'warning', now);
    };
    const noProgress = minutes(this.#config, 'noProgressMinutes', 10);
    const toolLimit = minutes(this.#config, 'toolMinutes', 5);
    const queueLimit = minutes(this.#config, 'queueMinutes', 5);
    const runLimit = minutes(this.#config, 'runMinutes', 60);
    if (run.status === 'failed' && track.terminalObserved) alert('failed', '运行失败', [`Multica 已确认运行状态 failed`, run.error || '接口未提供详细错误'], '查看本次运行日志，确认原因后再决定是否重试。', true);
    const runtime = overview.runtimes?.find(item => item.id === run.runtimeId);
    const runtimeAvailable = overview.available?.runtimes !== false;
    const priorOffline = this.#alerts.get(`${run.id}:runtime_offline`);
    if (ACTIVE.has(run.status)) {
      if (runtimeAvailable && runtime?.status === 'offline' && (!priorOffline || priorOffline.resolvedAt || priorOffline.runtimeId === runtime.id)) alert('runtime_offline', '运行所在运行时离线', [`关联运行时 ${runtime.name || runtime.id} 的服务端状态为 offline`, `运行当前状态为 ${run.status}`], '检查对应机器上的 Multica 守护进程和网络，暂不判定任务失败。');
      if (QUEUED.has(run.status) && now - track.queueObservedAt >= queueLimit) alert('queue_long', '排队时间较长', [`进入监控后连续观察到等待状态 ${Math.floor((now - track.queueObservedAt) / 60000)} 分钟`, `当前状态 ${run.status}`], '检查智能体并发上限、运行时连接及等待本地目录条件。', now - track.queueObservedAt >= queueLimit * 2);
      if (run.status === 'running' && !track.logError && track.caughtUp && runtime?.status !== 'offline') {
        const silence = now - track.lastProgressAt;
        if (silence >= noProgress) alert('no_progress', '长时间无进展（疑似）', [`监控连续 ${Math.floor(silence / 60000)} 分钟未读到新日志或运行状态变化`, '无输出不等于死锁；模型思考或外部工具等待也可能没有日志'], '先查看最近日志、工具输入和运行时状态；需要人工确认后再取消或重试。', silence >= noProgress * 2);
        const pending = [...track.pending.values()].sort((a, b) => a.observedAt - b.observedAt)[0];
        if (pending) {
          const elapsed = now - pending.observedAt;
          if (elapsed >= toolLimit) alert('tool_long', '工具调用耗时较长', [`工具 ${pending.tool} 的调用 ${pending.callId} 已观察 ${Math.floor(elapsed / 60000)} 分钟未收到同 callId 的结果`, '只关联明确的调用标识，不按工具名猜测对应关系'], '检查工具是否在等待输入、网络或长时间外部任务。', elapsed >= toolLimit * 2);
        }
      }
      const started = dateMs(run.startedAt);
      if (run.status === 'running' && started != null && now - started >= runLimit) alert('run_long', '运行耗时关注', [`服务端开始时间为 ${run.startedAt}`, `已运行约 ${Math.floor((now - started) / 60000)} 分钟，超过阈值 ${runLimit / 60000} 分钟；耗时长本身不是故障证据`], '结合任务规模、日志进展和工具状态判断是否需要介入。');
    }
    for (const existing of this.#alerts.values()) {
      if (existing.taskId !== run.id || existing.resolvedAt || activeKinds.has(existing.kind)) continue;
      if (ACTIVE.has(run.status) && existing.kind === 'runtime_offline' && (!runtimeAvailable || !runtime || !existing.runtimeId || runtime.id !== existing.runtimeId || runtime.status !== 'online')) {
        existing.verificationWarning = runtime && existing.runtimeId && runtime.id !== existing.runtimeId ? `运行关联的运行时已变更，原运行时状态无法复核。${runtime.status === 'offline' ? '当前运行时也处于离线状态。' : ''}` : '运行时状态暂不可核实，无法判断离线提醒是否已恢复。';
        continue;
      }
      if (run.status === 'running' && ['no_progress', 'tool_long'].includes(existing.kind) && (track.logError || !track.caughtUp || runtime?.status === 'offline')) {
        existing.verificationWarning = runtime?.status === 'offline' ? '运行时离线，暂时无法复核该提醒。' : track.logError ? '日志读取失败，暂时无法复核该提醒。' : '日志尚未补齐，暂时无法复核该提醒。';
        continue;
      }
      if (run.status === 'running' && existing.kind === 'run_long' && (dateMs(run.startedAt) == null || dateMs(run.startedAt) > now)) {
        existing.verificationWarning = '运行开始时间缺失或异常，暂时无法复核该提醒。';
        continue;
      }
      delete existing.verificationWarning;
      existing.resolvedAt = iso(now);
    }
  }

  #raise(track, kind, title, evidence, suggestion, severity, now) {
    const key = `${track.run.id}:${kind}`;
    const previous = this.#alerts.get(key);
    const fresh = !previous || previous.resolvedAt != null;
    const changed = previous && previous.severity !== severity;
    const episode = fresh ? (previous?.episode ?? 0) + 1 : previous.episode;
    const id = fresh ? `${this.#windowId}:${key}:${randomUUID()}` : previous.id;
    const alert = { id, ruleKey: key, episode, kind, severity, taskId: track.run.id, issueId: track.run.issueId || '', title, evidence, suggestion,
      createdAt: fresh ? iso(now) : previous.createdAt, resolvedAt: null, acknowledged: fresh ? false : previous.acknowledged,
      diagnosisSource: 'rules', connectionRevision: this.#config.revision || '', ...(kind === 'runtime_offline' ? { runtimeId: track.run.runtimeId || '' } : {}) };
    this.#alerts.set(key, alert);
    while (this.#alerts.size > 1000) this.#alerts.delete(this.#alerts.keys().next().value);
    if ((fresh || changed) && this.#onAlert) {
      try { Promise.resolve(this.#onAlert(copy(alert), copy({ ...track.run, logs: track.logs, lastTool: track.lastTool, progress: track.progress }))).catch(() => {}); } catch { /* Notification failure does not stop monitoring. */ }
    }
  }

  acknowledge(alertId) {
    this.#syncConfig();
    const alert = [...this.#alerts.values()].find(item => item.id === alertId);
    if (!alert) return false;
    alert.acknowledged = true;
    return true;
  }

  #metrics(now) {
    const tracks = [...this.#tracks.values()];
    const samples = [...this.#samples.values()];
    const outcomes = samples.filter(run => ['completed', 'failed'].includes(run.status));
    const runDurations = outcomes.map(run => { const start = dateMs(run.startedAt), end = dateMs(run.completedAt); return start != null && end != null && end >= start ? end - start : null; }).filter(value => value != null);
    const queueDurations = samples.map(run => { const created = dateMs(run.createdAt), started = dateMs(run.startedAt); return created != null && started != null && started >= created ? started - created : null; }).filter(value => value != null);
    const usageRuns = [...new Map([...samples, ...tracks.map(track => track.run)].map(run => [run.id, run])).values()].filter(run => Array.isArray(run.usage) && run.usage.length);
    const usages = usageRuns.flatMap(run => run.usage);
    const sumUsage = key => usages.reduce((sum, usage) => sum + (Number.isFinite(usage[key]) && usage[key] >= 0 ? usage[key] : 0), 0);
    return {
      scope: '当前配置下最多100次运行；终态样本最多保留监控窗口内最近1000次确认结果，不含启动时已有历史结果；失败率只计完成/失败，取消单列。日志速率不含首次历史补偿。',
      observationStartedAt: this.#state.startedAt, trackedRuns: tracks.length, runLimit: MAX_RUNS,
      active: tracks.filter(track => ACTIVE.has(track.run.status)).length, queued: tracks.filter(track => QUEUED.has(track.run.status)).length,
      unknown: tracks.filter(track => track.missing || (!ACTIVE.has(track.run.status) && !TERMINAL.has(track.run.status))).length,
      sampleSize: outcomes.length, failures: outcomes.filter(run => run.status === 'failed').length,
      failureRate: outcomes.length ? outcomes.filter(run => run.status === 'failed').length / outcomes.length : null,
      cancelled: samples.filter(run => run.status === 'cancelled').length,
      durationSampleSize: runDurations.length, averageDurationMs: mean(runDurations), p95DurationMs: p95(runDurations),
      queueSampleSize: queueDurations.length, averageQueueMs: mean(queueDurations), p95QueueMs: p95(queueDurations),
      logMessages: this.#allLogCount, incrementalLogMessages: this.#newLogCount,
      logsPerMinute: now > this.#windowStart ? this.#newLogCount / ((now - this.#windowStart) / 60000) : 0,
      tokens: { available: usageRuns.length > 0, sampleSize: usageRuns.length, inputTokens: sumUsage('inputTokens'), outputTokens: sumUsage('outputTokens'), cacheReadTokens: sumUsage('cacheReadTokens'), cacheWriteTokens: sumUsage('cacheWriteTokens'),
        costUsd: usages.some(usage => Number.isFinite(usage.costUsd)) ? sumUsage('costUsd') : null,
        scope: '仅已返回 usage 的已监控运行，按运行ID去重；每轮最多补充3个任务详情，同任务至少间隔60秒，不代表实时全工作区用量', reason: usageRuns.length ? null : '尚无运行返回 token 用量' },
      cpu: { available: false, reason: 'Multica 当前读取接口未提供 CPU 指标' },
      memory: { available: false, reason: 'Multica 当前读取接口未提供内存指标' },
    };
  }

  snapshot() {
    this.#syncConfig();
    const now = this.#now();
    const issues = (this.#state.overview?.issues || []).slice(0, 100);
    const history = issues.map(issue => this.#historyScan.get(issue.id));
    const alerted = new Set([...this.#alerts.values()].filter(alert => alert.kind === 'failed').map(alert => alert.taskId));
    const observed = new Map((this.#state.overview?.runs || []).map(run => [run.id, run.status]));
    const cached = history.flatMap(item => item?.failures || []);
    const conflicts = new Set(issues.filter(issue => this.#historyScan.get(issue.id)?.conflicting).map(issue => issue.id));
    for (const item of cached) if (observed.has(item.runId) && observed.get(item.runId) !== 'failed') conflicts.add(item.issueId);
    const allFailures = [...new Map(cached.filter(item => !alerted.has(item.runId) && (!observed.has(item.runId) || observed.get(item.runId) === 'failed')).map(item => [item.runId, item])).values()].sort((a, b) => (dateMs(b.failedAt) ?? 0) - (dateMs(a.failedAt) ?? 0));
    const historicalFailures = allFailures.slice(0, 500);
    const failureHistoryCoverage = { totalIssues: issues.length, checkedIssues: history.filter(item => item?.ok).length, failedIssues: history.filter(item => item && !item.ok).length, truncatedIssues: history.filter(item => item?.truncated).length, conflictingIssues: conflicts.size, issuesTruncated: this.#state.overview?.issuesTruncated === true, failuresTruncated: allFailures.length > 500 };
    return copy({ ...this.#state, connection: { baseUrl: this.#config.baseUrl || '', workspaceId: this.#config.workspaceId || '', revision: this.#config.revision || '' },
      historicalFailures, failureHistoryCoverage,
      runs: [...this.#tracks.values()].map(track => {
        const start = dateMs(track.run.startedAt), created = dateMs(track.run.createdAt), completed = dateMs(track.run.completedAt);
        const workProgress = snapshotWorkProgress(track.workProgress, {
          status: track.missing || track.observationError || track.logError || this.#state.error ? 'unknown' : track.run.status,
          progress: track.progress, logsCaughtUp: track.caughtUp && !track.logError && !this.#state.error,
        });
        return { ...track.run, elapsedMs: track.missing ? null : duration(completed ?? now, start), queueMs: track.missing ? null : duration(start ?? completed ?? now, created),
          silenceMs: !ACTIVE.has(track.run.status) || track.logError || this.#state.connectionStatus === 'error' || track.missing ? null : Math.max(0, now - track.lastProgressAt),
          messageCount: track.messageCount, lastActivityAt: iso(Math.max(track.lastMessageAt ?? track.firstSeenAt, track.lastProgressAt)), lastTool: workProgress.currentAction?.tool || track.lastTool,
          pendingTools: [...track.pending.values()].map(pending => ({ ...pending, elapsedMs: Math.max(0, now - pending.observedAt) })),
          pendingToolsTruncated: track.pendingToolsTruncated, logs: track.logs, logsTruncated: track.logsTruncated, logByteLimit: MAX_LOG_BYTES,
          logError: track.logError, observationError: track.observationError, logsCaughtUp: track.caughtUp, observedSince: iso(track.firstSeenAt), progress: track.progress, workProgress,
          usageUpdatedAt: track.usageUpdatedAt == null ? null : iso(track.usageUpdatedAt) };
      }), alerts: [...this.#alerts.values()].sort((a, b) => Number(Boolean(a.resolvedAt)) - Number(Boolean(b.resolvedAt)) || Date.parse(b.createdAt) - Date.parse(a.createdAt)).slice(0, 200).map(alert => ({ ...alert, verificationWarning: this.#state.error && !alert.resolvedAt ? '连接中断，暂时无法复核该提醒。' : alert.verificationWarning || '' })), alertsTruncated: this.#alerts.size > 200, metrics: this.#metrics(now) });
  }

  #connectSocket() {
    if (!this.#running || !this.#configured() || !this.#wsFactory || this.#socket) return;
    let expected;
    try {
      const url = new URL(`${normalizeBaseUrl(this.#config.baseUrl, this.#config.allowedHttpOrigins)}/ws`);
      url.protocol = url.protocol === 'https:' ? 'wss:' : 'ws:'; url.searchParams.set('workspace_id', this.#config.workspaceId);
      expected = url.href;
      const socket = this.#wsFactory(expected);
      const epoch = this.#epoch;
      this.#socket = socket;
      this.#authTimer = this.#setTimer(() => { if (!this.#authenticated && this.#socket === socket) socket.close(); }, 10_000);
      socket.onopen = () => {
        if (!this.#current(epoch) || this.#socket !== socket) return;
        // Native WebSocket rejects redirects; verify the exposed endpoint again before sending a credential frame.
        if (socket.url !== expected) { socket.close(); return; }
        try { socket.send(JSON.stringify({ type: 'auth', payload: { token: this.#config.token } })); } catch { socket.close(); return; }
        clearTimeout(this.#authTimer);
        this.#authTimer = this.#setTimer(() => { if (!this.#authenticated && this.#socket === socket) socket.close(); }, 10_000);
      };
      socket.onmessage = event => {
        if (!this.#current(epoch) || this.#socket !== socket || typeof event.data !== 'string' || event.data.length > 65536) return;
        let frame;
        try { frame = JSON.parse(event.data); } catch { return; }
        if (!frame || typeof frame !== 'object' || Array.isArray(frame) || typeof frame.type !== 'string') return;
        if (frame.type === 'auth_ack') {
          clearTimeout(this.#authTimer); this.#authenticated = true; this.#reconnectAttempt = 0;
          if (this.#state.lastSyncAt && !this.#state.error) this.#state.connectionStatus = 'live';
          this.#syncSubscriptions(); this.#requestSoon(); return;
        }
        if (this.#authenticated && frame.type === 'task:progress') {
          const payload = frame.payload;
          const track = payload && typeof payload === 'object' && !Array.isArray(payload) ? this.#tracks.get(payload.task_id) : null;
          const validNumber = value => value == null || (Number.isSafeInteger(value) && value >= 0);
          if (track && typeof payload.summary === 'string' && payload.summary.trim().length > 0 && payload.summary.length <= 2000 && validNumber(payload.step) && validNumber(payload.total) && (payload.step == null || payload.total == null || payload.step <= payload.total)) {
            track.progress = { summary: this.#config.token ? payload.summary.replaceAll(this.#config.token, '[已隐藏令牌]') : payload.summary, step: payload.step ?? null, total: payload.total ?? null, reportedAt: iso(this.#now()) };
            track.lastProgressAt = this.#now();
          }
        }
        if (this.#authenticated && /^(task:|issue:|agent:|runtime:|resync)/.test(frame.type)) this.#requestSoon();
      };
      socket.onerror = () => { if (this.#socket === socket) socket.close(); };
      socket.onclose = () => {
        if (this.#socket !== socket) return;
        clearTimeout(this.#authTimer); this.#socket = null; this.#authenticated = false; this.#subscribed.clear();
        if (!this.#running || epoch !== this.#epoch) return;
        if (!this.#state.error) this.#state.connectionStatus = 'polling';
        const delay = Math.min(30_000, 1000 * 2 ** Math.min(this.#reconnectAttempt++, 5));
        this.#reconnectTimer = this.#setTimer(() => { this.#reconnectTimer = null; this.#syncConfig(); this.#connectSocket(); }, delay);
        this.#requestSoon();
      };
    } catch {
      this.#authenticated = false; this.#socket = null;
      this.#reconnectTimer = this.#setTimer(() => { this.#reconnectTimer = null; this.#connectSocket(); }, Math.min(30_000, 1000 * 2 ** Math.min(this.#reconnectAttempt++, 5)));
    }
  }

  #syncSubscriptions() {
    if (!this.#authenticated || !this.#socket) return;
    const wanted = new Set([...this.#tracks.values()].filter(track => ACTIVE.has(track.run.status)).map(track => track.run.id));
    try {
      for (const id of this.#subscribed) if (!wanted.has(id)) this.#socket.send(JSON.stringify({ type: 'unsubscribe', payload: { scope: 'task', id } }));
      for (const id of wanted) if (!this.#subscribed.has(id)) this.#socket.send(JSON.stringify({ type: 'subscribe', payload: { scope: 'task', id } }));
      this.#subscribed = wanted;
    } catch { this.#socket.close(); }
  }

  #disconnectSocket() {
    clearTimeout(this.#reconnectTimer); clearTimeout(this.#authTimer); this.#reconnectTimer = null; this.#authTimer = null;
    if (this.#socket) {
      const socket = this.#socket; this.#socket = null;
      socket.onopen = null; socket.onmessage = null; socket.onerror = null; socket.onclose = null;
      try { socket.close(); } catch { /* Already closed sockets need no further cleanup. */ }
    }
    this.#authenticated = false; this.#subscribed.clear(); this.#reconnectAttempt = 0;
  }
}
