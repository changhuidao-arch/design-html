import { activeRunStates, conversationStatusLabels } from './run-conversation.mjs';

const waitingStates = new Set(['queued', 'dispatched', 'deferred', 'waiting_local_directory']);
const terminalStates = new Set(['completed', 'failed', 'cancelled']);
const text = (value, limit = 240) => typeof value === 'string' ? value.trim().replace(/\s+/g, ' ').slice(0, limit) : '';
const timestamp = value => typeof value === 'string' && Number.isFinite(Date.parse(value)) ? Date.parse(value) : null;
const list = value => Array.isArray(value) ? value : [];
const duration = (start, end) => start != null && end != null && end >= start ? end - start : null;
const threshold = (settings, key, fallback) => Number.isFinite(settings?.[key]) && settings[key] > 0 ? settings[key] * 60000 : fallback * 60000;
const seq = value => Number.isSafeInteger(value) && value >= 0 ? value : null;

function lastRecord(observed, now) {
  if (!observed) return { text: '执行记录尚未读取', at: null };
  const candidates = [];
  const add = (body, at, order, failed = false) => {
    if (!body) return;
    const atMs = timestamp(at);
    candidates.push({ text: body, at: atMs != null && (!Number.isFinite(now) || atMs <= now) ? at : null, order: seq(order), atMs, failed });
  };
  for (const log of list(observed.logs)) {
    if (!log || typeof log !== 'object') continue;
    const tool = text(log.tool, 60) || '工具';
    if (log.type === 'tool_use') {
      const input = log.input && typeof log.input === 'object' ? log.input : {};
      const summary = text(input.description || input.command || input.cmd || input.file_path || input.path || input.subject, 160);
      add(`工具调用记录 · ${tool}${summary ? ` · ${summary}` : ''}`, log.createdAt, log.seq);
    } else if (log.type === 'tool_result') {
      const failed = log.isError === true || log.is_error === true;
      add(`${failed ? '工具报错' : '工具返回'} · ${tool}`, log.createdAt, log.seq, failed);
    } else if (['text', 'thinking', 'error'].includes(log.type)) {
      const label = { text: '文字反馈', thinking: '思考记录', error: '错误记录' }[log.type];
      const body = text(log.content || log.output, 180);
      add(`${label}${body ? ` · ${body}` : ''}`, log.createdAt, log.seq);
    } else add('执行事件记录', log.createdAt, log.seq);
  }
  const action = observed.workProgress?.latestAction;
  if (action) {
    const returned = ['returned', 'failed'].includes(action.outcome);
    const label = action.outcome === 'failed' ? '工具报错' : returned ? '工具返回' : '工具调用记录';
    const tool = text(action.tool, 60) || '工具', summary = text(action.summary, 160);
    add(`${label} · ${tool}${summary && summary !== tool ? ` · ${summary}` : ''}`, returned ? action.resultAt || action.at : action.at, returned ? action.resultSeq ?? action.seq : action.seq, action.outcome === 'failed');
  }
  const statement = observed.workProgress?.latestStatement;
  if (statement && text(statement.text)) add(`文字反馈 · ${text(statement.text, 180)}`, statement.at, statement.seq);
  // Sequence is authoritative within a run; timestamps can be batched or arrive out of order.
  candidates.sort((a, b) => a.order != null && b.order != null ? b.order - a.order || Number(b.failed) - Number(a.failed) : a.order != null ? -1 : b.order != null ? 1 : (b.atMs ?? -Infinity) - (a.atMs ?? -Infinity));
  return candidates[0] || { text: '尚无执行记录', at: null };
}

function lifecycle(run, now, unavailable) {
  const createdAtMs = timestamp(run.createdAt), startedAtMs = timestamp(run.startedAt), completedAtMs = timestamp(run.completedAt);
  const active = activeRunStates.has(run.status), running = run.status === 'running', waiting = waitingStates.has(run.status), terminal = terminalStates.has(run.status);
  const invalidProvided = [['createdAt', createdAtMs], ['startedAt', startedAtMs], ['completedAt', completedAtMs]].some(([key, value]) => run[key] != null && run[key] !== '' && value == null);
  const inFuture = Number.isFinite(now) && [createdAtMs, startedAtMs, completedAtMs].some(value => value != null && value > now);
  const reversed = createdAtMs != null && startedAtMs != null && createdAtMs > startedAtMs || startedAtMs != null && completedAtMs != null && startedAtMs > completedAtMs || createdAtMs != null && completedAtMs != null && createdAtMs > completedAtMs;
  const contradictory = waiting && (startedAtMs != null || completedAtMs != null) || running && completedAtMs != null;
  const invalid = invalidProvided || inFuture || reversed || contradictory || !active && !terminal;
  let waitSpan = null, executionSpan = null;
  if (!invalid) {
    if (createdAtMs != null && startedAtMs != null) waitSpan = { start: createdAtMs, end: startedAtMs, pending: false };
    else if (waiting && !unavailable && Number.isFinite(now) && createdAtMs != null) waitSpan = { start: createdAtMs, end: now, pending: true };
    if (terminal && startedAtMs != null && completedAtMs != null) executionSpan = { start: startedAtMs, end: completedAtMs, pending: false };
    else if (running && !unavailable && Number.isFinite(now) && startedAtMs != null) executionSpan = { start: startedAtMs, end: now, pending: true };
  }
  const missing = waiting ? createdAtMs == null : running ? startedAtMs == null : terminal && (startedAtMs == null || completedAtMs == null);
  return { active, running, waiting, createdAtMs, startedAtMs, completedAtMs, waitSpan, executionSpan, invalid, missing,
    waitMs: waitSpan ? duration(waitSpan.start, waitSpan.end) : null, elapsedMs: executionSpan ? duration(executionSpan.start, executionSpan.end) : null };
}

export function buildTaskMonitor({ runs = [], observedRuns = [], agents = [], runtimes = [], now = Date.now(), unavailable = false, settings = {}, issueId } = {}) {
  const agentNames = new Map(list(agents).filter(agent => agent?.id).map(agent => [agent.id, agent.name]));
  const runtimeById = new Map(list(runtimes).filter(runtime => runtime?.id).map(runtime => [runtime.id, runtime]));
  const observedById = new Map(list(observedRuns).filter(run => run?.id).map(run => [run.id, run]));
  const seen = new Set();
  const rows = list(runs).filter(run => {
    if (!run || !text(run.id) || seen.has(run.id) || issueId && run.issueId !== issueId) return false;
    seen.add(run.id); return true;
  }).map(run => {
    const candidate = observedById.get(run.id);
    const identityMatches = Boolean(run.issueId && candidate?.issueId === run.issueId);
    const statusConflict = identityMatches && candidate.status !== run.status;
    const observationError = identityMatches && Boolean(candidate.observationError);
    const stateUnavailable = unavailable || statusConflict || observationError;
    const state = lifecycle(run, now, stateUnavailable);
    const observed = identityMatches && !statusConflict ? candidate : null;
    const runtimeOffline = !stateUnavailable && state.active && runtimeById.get(run.runtimeId)?.status === 'offline';
    const coverage = observed?.workProgress?.coverage;
    const healthy = Boolean(!stateUnavailable && !runtimeOffline && observed && !observed.logError && observed.logsCaughtUp === true && coverage?.logsCaughtUp !== false && coverage?.partial !== true && coverage?.gaps !== true);
    const observationUnknown = Boolean(state.invalid || state.missing || state.active && (stateUnavailable || runtimeOffline) || state.running && !healthy);
    const silenceMs = healthy && state.running && !state.invalid && Number.isFinite(observed.silenceMs) && observed.silenceMs >= 0 ? observed.silenceMs : null;
    const reasons = [];
    if (state.active && unavailable) reasons.push('状态同步中断');
    else if (state.active && statusConflict) reasons.push('运行状态暂不同步');
    else if (state.active && observationError) reasons.push('运行状态观测异常');
    else if (state.invalid) reasons.push('运行状态或时间待核实');
    else if (state.missing) reasons.push('运行时间未完整提供');
    if (runtimeOffline) reasons.push('运行时离线');
    else if (state.running && !stateUnavailable && !healthy) reasons.push(observed?.logError ? '执行记录读取异常' : observed && (observed.logsCaughtUp === false || coverage?.partial === true || coverage?.logsCaughtUp === false || coverage?.gaps === true) ? '执行记录未完整补齐' : '运行观测尚未核实');
    const warnings = [];
    if (!stateUnavailable && state.waiting && state.waitMs != null && state.waitMs >= threshold(settings, 'queueMinutes', 5)) warnings.push('启动等待较长');
    if (!stateUnavailable && state.running && state.elapsedMs != null && state.elapsedMs >= threshold(settings, 'runMinutes', 60)) warnings.push('运行时间较长');
    if (silenceMs != null && silenceMs >= threshold(settings, 'noProgressMinutes', 10)) warnings.push('持续未观察到新进展');
    if (run.status === 'failed') reasons.unshift('运行失败');
    reasons.push(...warnings);
    const tone = run.status === 'failed' ? 'error' : warnings.length ? 'warning' : observationUnknown ? 'unknown' : 'normal';
    const severity = run.status === 'failed' ? 4 : runtimeOffline || warnings.includes('持续未观察到新进展') ? 3 : warnings.length ? 2 : observationUnknown ? 1 : 0;
    const record = lastRecord(observed, now);
    return { id: run.id, run, agentName: text(run.agentName) || text(agentNames.get(run.agentId)) || '智能体未提供',
      statusLabel: stateUnavailable && state.active ? '状态待核实' : conversationStatusLabels[run.status] || '状态待核实',
      active: state.active, running: state.running, waiting: state.waiting, createdAtMs: state.createdAtMs, startedAtMs: state.startedAtMs, completedAtMs: state.completedAtMs,
      waitMs: state.waitMs, elapsedMs: state.elapsedMs, waitSpan: state.waitSpan, executionSpan: state.executionSpan, tone, reasons,
      lastAction: record.text, lastActionAt: record.at, silenceMs, observationUnknown, severity };
  });
  rows.sort((a, b) => (a.createdAtMs ?? a.startedAtMs ?? a.completedAtMs ?? Infinity) - (b.createdAtMs ?? b.startedAtMs ?? b.completedAtMs ?? Infinity) || a.id.localeCompare(b.id));
  const attention = rows.filter(row => row.active && row.severity > 0).sort((a, b) => b.severity - a.severity || Math.max(b.waitMs ?? 0, b.elapsedMs ?? 0) - Math.max(a.waitMs ?? 0, a.elapsedMs ?? 0) || a.id.localeCompare(b.id));
  return { rows, attention, activeCount: rows.filter(row => row.active).length, failureCount: rows.filter(row => row.run.status === 'failed').length,
    unknownCount: rows.filter(row => row.observationUnknown).length };
}
