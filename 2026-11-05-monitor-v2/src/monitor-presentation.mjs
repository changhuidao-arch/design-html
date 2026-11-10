export const activeStates = new Set(['queued', 'dispatched', 'running', 'waiting_local_directory', 'deferred']);
const timestamp = value => typeof value === 'string' && Number.isFinite(Date.parse(value)) ? Date.parse(value) : null;

export function observedWork(target, observed, unavailable = false) {
  const match = target?.id && target?.issueId && observed?.id === target.id && observed?.issueId === target.issueId;
  const value = match ? observed : null;
  const stale = Boolean(unavailable || value?.observationError || value?.logError || value?.logsCaughtUp === false || value?.workProgress?.coverage?.logsCaughtUp === false || (value?.status && target?.status && value.status !== target.status));
  const current = !stale && activeStates.has(target?.status) ? value?.workProgress?.currentAction : null;
  return { stale, current, action: current || value?.workProgress?.latestAction || null };
}

export function taskSignals(issueId, runs = [], alerts = [], failures = [], now = Date.now(), unavailable = false) {
  const related = runs.filter(run => run.issueId === issueId);
  const pending = alerts.filter(alert => alert.issueId === issueId && !alert.resolvedAt && !alert.historical);
  const verified = pending.filter(alert => !unavailable && !alert.verificationWarning);
  const currentFailed = new Set(pending.filter(alert => alert.kind === 'failed').map(alert => alert.taskId));
  const historical = new Set(failures.filter(item => item.issueId === issueId).map(item => item.runId));
  for (const alert of alerts) if (alert.issueId === issueId && alert.kind === 'failed' && (alert.resolvedAt || alert.historical)) historical.add(alert.taskId);
  for (const id of currentFailed) historical.delete(id);
  const durations = related.filter(run => run.status === 'running' && !run.observationError).map(run => timestamp(run.startedAt)).filter(value => value !== null && value <= now).map(value => now - value);
  const actions = related.flatMap(run => {
    const { action } = observedWork(run, run, unavailable);
    const at = timestamp(action?.at);
    return at !== null && at <= now ? [at] : [];
  });
  return { active: related.filter(run => activeStates.has(run.status)).length,
    running: related.filter(run => run.status === 'running').length,
    waiting: related.filter(run => activeStates.has(run.status) && run.status !== 'running').length,
    current: verified.length, uncertain: pending.length - verified.length,
    titles: [...new Set(verified.map(alert => alert.title))], historical: historical.size,
    longestMs: !unavailable && durations.length ? Math.max(...durations) : null,
    latestActionAt: actions.length ? new Date(Math.max(...actions)).toISOString() : null };
}

export function durationLabel(ms) {
  if (!Number.isFinite(ms)) return '未提供';
  const minutes = Math.floor(ms / 60000);
  return minutes >= 60 ? `${Math.floor(minutes / 60)} 小时 ${minutes % 60} 分` : minutes ? `${minutes} 分` : '不足 1 分';
}

export function triggerExcerpt(value, limit = 24) {
  if (typeof value !== 'string' || !value.trim()) return '摘要未提供';
  const failure = /^Delegated task `[^`]+` ended in a final failure \(`[^`]+`\) and no automatic retry is pending\./.test(value);
  if (failure) return '委派运行最终失败，未安排自动重试';
  const lines = value.replace(/\[([^\]]+)\]\(mention:\/\/[^)]+\)/g, '$1').replace(/\*\*|`/g, '').split(/\r?\n/).map(line => line.replace(/^[\s#*>-]+/, '').replace(/^(?:本次)?派给\s*@?[^\s：:]+[：:]\s*/, '').trim()).filter(Boolean);
  if (!lines.length) return '摘要未提供';
  const line = lines.find(text => /^(?:任务|要求|目标|请|负责|执行|检查|修复|审查|验证|实现)/.test(text)) || lines.find(text => !/^(?:本次派给|派给|@|mention:)/.test(text)) || lines[0];
  const plain = line.replace(/\s+/g, ' ');
  const chars = [...plain];
  return chars.slice(0, limit).join('') + (chars.length > limit ? '…' : '');
}

export function filterGraphRuns(runs, { status = 'all', agent = '', query = '', from = '', until = '' } = {}) {
  const start = timestamp(from), end = timestamp(until);
  const invalidRange = start !== null && end !== null && start > end;
  const needle = query.trim().toLowerCase();
  const matches = invalidRange ? [] : runs.filter(run => {
    const at = timestamp(run.startedAt) ?? timestamp(run.createdAt);
    return (status === 'all' || (status === 'active' ? activeStates.has(run.status) : run.status === status)) && (!agent || run.agentId === agent) &&
      (!needle || [run.id, run.agentName, run.triggerSummary].some(value => typeof value === 'string' && value.toLowerCase().includes(needle))) &&
      (start === null || at !== null && at >= start) && (end === null || at !== null && at <= end);
  });
  const ids = new Set(matches.map(run => run.id)), retained = new Set(ids);
  const fields = ['delegatedFromTaskId', 'retryOfTaskId', 'rerunOfTaskId', 'parentTaskId'];
  for (const run of runs) for (const field of fields) {
    if (ids.has(run.id) && run[field]) retained.add(run[field]);
    if (ids.has(run[field])) retained.add(run.id);
  }
  return { runs: runs.filter(run => retained.has(run.id)), matchedIds: ids, invalidRange };
}
