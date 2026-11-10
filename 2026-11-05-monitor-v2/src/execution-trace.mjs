import { activeRunStates, conversationEntries, conversationStatusLabels, shortDuration, toolSummary } from './run-conversation.mjs';

export const eventLabels = { tool: '工具', thinking: '思考记录', text: '文字反馈', error: '错误', system: '事件' };
export const timeMs = value => typeof value === 'string' && Number.isFinite(Date.parse(value)) ? Date.parse(value) : null;
export const traceDuration = value => value > 0 && value < 1000 ? '少于 1 秒' : shortDuration(value);
const interval = (start, end) => start != null && end != null && end >= start ? end - start : null;
const threshold = (settings, key, fallback) => Number.isFinite(settings?.[key]) && settings[key] > 0 ? settings[key] * 60000 : fallback * 60000;

export function executionMetrics(run, { now = Date.now(), observedRun, unavailable = false, settings = {}, runtimeStatus } = {}) {
  const active = activeRunStates.has(run.status), waiting = active && run.status !== 'running';
  const sameIdentity = observedRun?.id === run.id && observedRun?.issueId === run.issueId;
  const stateConflict = Boolean(sameIdentity && observedRun.status !== run.status);
  const observationLost = Boolean(sameIdentity && observedRun.observationError);
  const stale = unavailable || active && (stateConflict || observationLost);
  const started = timeMs(run.startedAt), created = timeMs(run.createdAt), ended = timeMs(run.completedAt);
  const running = run.status === 'running' && run.completedAt == null;
  const terminal = ['completed', 'failed', 'cancelled'].includes(run.status);
  const validStart = started != null && started <= now;
  const elapsed = validStart && (terminal && ended != null && ended <= now || running && !stale) ? interval(started, terminal ? ended : now) : null;
  const waitEnd = (running || terminal) && validStart ? started : waiting && run.startedAt == null && run.completedAt == null && !stale ? now : null;
  const wait = created != null && created <= now ? interval(created, waitEnd) : null;
  const observed = observedRun?.id === run.id && observedRun?.issueId === run.issueId && observedRun.status === run.status ? observedRun : null;
  const healthy = !stale && runtimeStatus !== 'offline' && observed && !observed.logError && !observed.observationError && observed.logsCaughtUp === true && observed.workProgress?.coverage?.partial !== true && observed.workProgress?.coverage?.logsCaughtUp !== false;
  const silence = healthy && running && Number.isFinite(observed.silenceMs) && observed.silenceMs >= 0 ? observed.silenceMs : null;
  const alerts = [];
  if (active && stateConflict) alerts.push('运行状态尚待核实');
  if (!unavailable && waiting && started == null && wait >= threshold(settings, 'queueMinutes', 5)) alerts.push('启动等待较长');
  if (!unavailable && running && elapsed >= threshold(settings, 'runMinutes', 60)) alerts.push('运行时间较长');
  if (silence != null && silence >= threshold(settings, 'noProgressMinutes', 10)) alerts.push('较久未收到新反馈');
  return { active, running, waiting, started, created, ended, elapsed, wait, observed, healthy, silence, alerts, stateConflict, observationLost };
}

export function buildExecutionTrace({ run, messages = [], now = Date.now(), observedRun, unavailable = false, settings = {}, partial = false, runtimeStatus }) {
  const metrics = executionMetrics(run, { now, observedRun: partial && observedRun ? { ...observedRun, logsCaughtUp: false } : observedRun, unavailable, settings, runtimeStatus });
  const { entries, gaps } = conversationEntries(messages);
  const phases = [];
  if (metrics.wait != null) phases.push({ id: 'wait', kind: 'wait', name: '启动前等待', start: metrics.created, end: metrics.created + metrics.wait, duration: metrics.wait, measurement: '创建至开始', pending: metrics.waiting && metrics.started == null, tone: metrics.alerts.includes('启动等待较长') ? 'warning' : 'neutral' });
  phases.push({ id: 'execution', kind: 'execution', name: conversationStatusLabels[run.status] || '状态待核实', start: metrics.started, end: metrics.elapsed == null ? null : metrics.started + metrics.elapsed, duration: metrics.elapsed, measurement: '运行起止', pending: metrics.running, tone: run.status === 'failed' ? 'error' : metrics.alerts.includes('运行时间较长') ? 'warning' : 'normal' });
  const events = entries.map(entry => {
    const call = entry.call, result = entry.result, message = entry.message;
    const start = timeMs(call?.createdAt || result?.createdAt || message?.createdAt);
    const resultAt = timeMs(result?.createdAt);
    const paired = entry.kind === 'tool' && call && result && !entry.ambiguous;
    const gap = paired ? interval(timeMs(call.createdAt), resultAt) : null;
    const pending = entry.kind === 'tool' && call?.callId && !result && !entry.ambiguous;
    const observed = pending && metrics.healthy && !partial && !gaps && metrics.running ? metrics.observed.pendingTools?.find(tool => tool.callId === call.callId && tool.tool === call.tool) : null;
    const observedAt = observed && Number.isFinite(observed.observedAt) && observed.observedAt <= now ? observed.observedAt : null;
    const observedWait = observedAt == null ? null : now - observedAt;
    const range = gap > 0 ? { start, end: resultAt, duration: gap, measurement: '记录间隔' } : observedWait != null ? { start: observedAt, end: now, duration: observedWait, measurement: '已观察等待' } : { start, end: null, duration: null, measurement: entry.kind === 'tool' ? '耗时未知' : '记录时刻' };
    const state = entry.kind !== 'tool' ? eventLabels[entry.kind] || '执行事件' : entry.ambiguous ? '配对待核实' : !call ? '仅有返回记录' : result ? '已返回' : metrics.active ? '未收到返回' : '结束时未读到返回';
    return { ...range, id: `event:${entry.seq}`, kind: entry.kind, name: entry.kind === 'tool' ? call?.tool || result?.tool || '工具' : eventLabels[entry.kind] || '执行事件',
      summary: entry.kind === 'tool' ? toolSummary(entry) : (message?.content || '').replace(/\s+/g, ' ').slice(0, 160),
      seq: entry.seq, lastSeq: entry.lastSeq || result?.seq || entry.seq, state, entry,
      tone: entry.kind === 'error' ? 'error' : observedWait != null && observedWait >= threshold(settings, 'toolMinutes', 5) ? 'warning' : 'neutral',
      pending: observedWait != null, uncertain: entry.kind === 'tool' && observedWait == null,
      note: gap > 0 ? '调用与返回的记录时间差，可能包含上报延迟，不代表精确工具执行耗时。' : observedWait != null ? '从监控首次观察到调用开始计时；尚未收到返回，不证明工具仍在执行。' : entry.kind === 'tool' ? '缺少可信起止边界，无法计算真实工具耗时；同批返回也不显示为 0 秒。' : entry.kind === 'thinking' ? '这是已上报的思考内容，不代表一次模型请求的完整思考时段。' : '时间点表示这段内容的记录时刻，不表示完整输出耗时。' };
  });
  const times = [...phases, ...events].flatMap(row => [row.start, row.end]).filter(value => value != null && Number.isFinite(value));
  const start = times.length ? Math.min(...times) : null, end = times.length ? Math.max(...times) : null;
  return { phases, events, metrics, gaps, domain: start == null ? null : { start, end, duration: Math.max(1000, end - start) } };
}

const isRunOutput = (comment, run) => run && comment.issueId === run.issueId && comment.sourceTaskId === run.id && comment.authorType === 'agent' && comment.authorId === run.agentId;

export function runExchange({ run, comments = [], runs = [] }) {
  const scoped = comments.filter(comment => comment.issueId === run.issueId);
  const input = scoped.find(comment => comment.id === run.triggerCommentId) || null;
  const outputs = scoped.filter(comment => isRunOutput(comment, run)).sort((a, b) => (timeMs(a.createdAt) || 0) - (timeMs(b.createdAt) || 0));
  const next = runs.filter(item => item.id !== run.id && item.issueId === run.issueId && item.lineageKnown && [item.delegatedFromTaskId, item.retryOfTaskId, item.rerunOfTaskId, item.parentTaskId].includes(run.id));
  return { input, outputs, next };
}

const gateTag = comment => /^\s*\[GATE:([A-Z_]+)\][ \t]*(?:\r?\n|$)/.exec(comment.content)?.[1];

export function reviewReply(comment) {
  if (!comment || comment.deleted || comment.contentTruncated || gateTag(comment) !== 'REVIEW') return null;
  const lines = comment.content.split(/\r?\n/).map(line => line.trim().replaceAll('**', ''));
  const status = lines.find(line => /^当前状态\s*[：:]/.test(line))?.replace(/^当前状态\s*[：:]\s*/, '');
  const conclusion = lines.find(line => /^评审结论\s*[：:]/.test(line))?.replace(/^评审结论\s*[：:]\s*/, '');
  const subject = lines.find(line => /^#{1,6}\s+门禁待人工审查\s*·\s*\S/.test(line))?.replace(/^#{1,6}\s+门禁待人工审查\s*·\s*/, '');
  const awaitingRelease = /^(?:评审已通过[，,]\s*(?:流程已阻塞[，,]\s*)?)?等待人工放行[。.]?$/.test(status || '');
  const passed = /^通过(?:[，,。（(\s]|$)/.test(conclusion || '');
  if (!awaitingRelease && !conclusion) return null;
  return {
    awaitingRelease, passed,
    title: subject && passed ? `${subject}通过` : subject || '门禁评审结论',
    summary: passed && subject ? (conclusion.match(/（([^（）]+)）$/)?.[1] || conclusion) : conclusion,
  };
}

export function pendingReviewGate(issue, runs, comments) {
  if ((issue?.statusCategory || issue?.status) !== 'in_review') return null;
  const taskRuns = new Map(runs.filter(run => run.issueId === issue.id && run.agentId).map(run => [run.id, run]));
  const gates = comments.filter(comment => gateTag(comment) && isRunOutput(comment, taskRuns.get(comment.sourceTaskId)));
  if (gates.some(comment => timeMs(comment.createdAt) == null)) return null;
  const latest = gates.sort((a, b) => timeMs(b.createdAt) - timeMs(a.createdAt))[0];
  if (!reviewReply(latest)?.awaitingRelease || taskRuns.get(latest.sourceTaskId)?.status !== 'completed') return null;
  const reportedAt = timeMs(latest.createdAt);
  // A later human reply may contain a gate decision. Prefer the task status in that case.
  if (gates.some(comment => comment !== latest && timeMs(comment.createdAt) === reportedAt) ||
      comments.some(comment => comment.issueId === issue.id && comment.authorType === 'member' &&
        (timeMs(comment.createdAt) == null || timeMs(comment.createdAt) >= reportedAt))) return null;
  return latest;
}
