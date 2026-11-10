const TERMINAL = new Set(['completed', 'failed', 'cancelled']);
const WAITING = new Set(['queued', 'dispatched', 'waiting_local_directory', 'deferred']);
const MAX_ISSUES = 1000;
const MAX_RUNS = 1000;
const MAX_RELATIONS = 5000;
const id = value => typeof value === 'string' && value.length > 0 && value.length <= 256 ? value : null;
const object = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const time = value => typeof value === 'number' && Number.isFinite(value) ? value : typeof value === 'string' && Number.isFinite(Date.parse(value)) ? Date.parse(value) : null;
const knownCoverage = new Set(['complete', 'partial', 'failed', 'unknown', 'unsupported']);
const coverageValue = value => knownCoverage.has(value) ? value : 'unknown';
const orderedTime = run => run.startMs ?? time(run.startedAt) ?? time(run.createdAt) ?? Infinity;
const chronological = (a, b) => orderedTime(a) - orderedTime(b) || a.id.localeCompare(b.id);

function uniqueRows(values, limit) {
  const rows = new Map();
  let malformed = 0, duplicates = 0, omitted = 0;
  for (const row of Array.isArray(values) ? values : []) {
    if (!object(row) || !id(row.id)) { malformed++; continue; }
    if (rows.has(row.id)) { duplicates++; continue; }
    if (rows.size >= limit) { omitted++; continue; }
    rows.set(row.id, row);
  }
  return { rows: [...rows.values()], malformed, duplicates, omitted, invalidInput: !Array.isArray(values) };
}

function baseCoverage(input = {}, relationResult) {
  const source = object(input) ? input : {};
  const relationAvailability = relationResult?.availability;
  const dependencies = relationAvailability?.dependencies === 'unsupported' ? 'unsupported' : coverageValue(source.dependencies);
  let relations = coverageValue(source.relations);
  if (object(relationAvailability)) {
    const parentFailed = relationAvailability.parent === 'unavailable';
    const childrenFailed = relationAvailability.children === 'unavailable';
    if (parentFailed && childrenFailed) relations = 'failed';
    else if (parentFailed || childrenFailed || relationAvailability.parent === 'unknown' || relationResult.childrenTruncated === true) relations = 'partial';
    else if (relations === 'unknown' && ['available', 'none'].includes(relationAvailability.parent) && relationAvailability.children === 'available') relations = 'complete';
  }
  return { issues: coverageValue(source.issues), runs: coverageValue(source.runs), dependencies,
    relations, relationAvailability: object(relationAvailability) ? { ...relationAvailability } : null,
    childrenTruncated: relationResult?.childrenTruncated === true,
    partial: false };
}

function interval(run, now) {
  const startMs = time(run.startedAt), endMs = time(run.completedAt);
  let timeStatus, effectiveEnd = endMs, eligible = false;
  if (WAITING.has(run.status)) timeStatus = 'not_started';
  else if (run.status === 'running') {
    if (startMs == null) timeStatus = run.startedAt ? 'invalid_time' : 'missing_start';
    else if (now == null || startMs > now || run.completedAt != null) timeStatus = 'invalid_time';
    else { timeStatus = 'ongoing'; effectiveEnd = now; eligible = true; }
  } else if (TERMINAL.has(run.status)) {
    if (startMs == null && endMs == null) timeStatus = run.startedAt || run.completedAt ? 'invalid_time' : 'unknown_time';
    else if (startMs == null) timeStatus = run.startedAt ? 'invalid_time' : 'missing_start';
    else if (endMs == null) timeStatus = run.completedAt ? 'invalid_time' : 'missing_end';
    else if (endMs < startMs) timeStatus = 'invalid_time';
    else { timeStatus = 'complete'; eligible = true; }
  } else timeStatus = 'unknown_status';
  return { ...run, sourceRun: { ...run }, startMs: WAITING.has(run.status) ? null : startMs,
    endMs: WAITING.has(run.status) ? null : effectiveEnd, timeStatus, intervalKnown: eligible,
    ongoing: timeStatus === 'ongoing', endEstimated: timeStatus === 'ongoing', durationMs: eligible ? effectiveEnd - startMs : null,
    lane: null, offsetPercent: null, widthPercent: null };
}

function groupAgents(runs) {
  const groups = new Map();
  for (const run of runs) {
    const agentId = id(run.agentId);
    const key = agentId || '__unknown_agent__';
    if (!groups.has(key)) groups.set(key, { id: key, agentId, agentName: run.agentName || '', identityKnown: Boolean(agentId), runs: [] });
    groups.get(key).runs.push(run);
  }
  for (const group of groups.values()) group.runs.sort(chronological);
  return [...groups.values()].sort((a, b) => a.agentName.localeCompare(b.agentName) || a.id.localeCompare(b.id));
}

export function buildRunTimeline(inputRuns, now = Date.now(), options = {}) {
  const selected = uniqueRows(inputRuns, MAX_RUNS);
  const coverage = baseCoverage(options.coverage, options.relations);
  const warnings = [];
  const nowMs = time(now);
  const runs = selected.rows.map(run => interval(run, nowMs)).sort(chronological);
  const byId = new Map(runs.map(run => [run.id, run]));
  const intervals = runs.filter(run => run.intervalKnown).sort(chronological);
  const laneEnds = [];
  for (const run of intervals) {
    if (run.durationMs === 0) { run.lane = 0; continue; }
    let lane = laneEnds.findIndex(end => end <= run.startMs);
    if (lane < 0) lane = laneEnds.length;
    laneEnds[lane] = run.endMs; run.lane = lane;
  }
  const span = intervals.length ? { startMs: Math.min(...intervals.map(run => run.startMs)), endMs: Math.max(...intervals.map(run => run.endMs)) } : null;
  if (span) {
    span.durationMs = span.endMs - span.startMs;
    for (const run of intervals) {
      run.offsetPercent = span.durationMs ? (run.startMs - span.startMs) / span.durationMs * 100 : 0;
      run.widthPercent = span.durationMs ? run.durationMs / span.durationMs * 100 : 0;
    }
  }
  const relations = [], unresolvedRelations = [];
  let relationCount = 0;
  const addRelation = relation => {
    relationCount++;
    if (relations.length < MAX_RELATIONS) relations.push({ id: `${relation.type}:${relation.from}:${relation.to}`, ...relation, isDependency: false });
  };
  // Reserve the bounded output for explicit lineage before adding timestamp-derived relations.
  const pointers = [['rerunOfTaskId', 'rerun'], ['retryOfTaskId', 'retry'], ['parentTaskId', 'parent_run'], ['delegatedFromTaskId', 'delegation']];
  for (const run of runs) for (const [field, type] of pointers) {
    if (run[field] == null || run[field] === '') continue;
    const sourceId = id(run[field]);
    const source = sourceId && byId.get(sourceId);
    let reason = null;
    if (!sourceId) reason = 'invalid_pointer';
    else if (sourceId === run.id) reason = 'self_reference';
    else if (!source) reason = options.allRunIssueIds?.has(sourceId) && options.allRunIssueIds.get(sourceId) !== run.issueId ? 'cross_issue' : 'missing_source';
    else if (type !== 'delegation' && (!id(source.issueId) || !id(run.issueId))) reason = 'unknown_issue_scope';
    else if (type !== 'delegation' && source.issueId !== run.issueId) reason = 'cross_issue';
    if (reason) {
      if (unresolvedRelations.length < MAX_RELATIONS) unresolvedRelations.push({ type, from: sourceId, to: run.id, field, reason });
    } else addRelation({ type, from: sourceId, to: run.id, evidence: { source: 'explicit_pointer', field },
      label: { rerun: '明确重跑来源', retry: '明确重试来源', parent_run: '运行父指针，非业务父子任务', delegation: '明确委派来源' }[type] });
  }
  for (let index = 0; index < intervals.length; index++) {
    const from = intervals[index];
    for (let next = index + 1; next < intervals.length && intervals[next].startMs < from.endMs; next++) {
      const to = intervals[next], startMs = Math.max(from.startMs, to.startMs), endMs = Math.min(from.endMs, to.endMs);
      if (endMs > startMs) addRelation({ type: 'observed_overlap', from: from.id, to: to.id,
        evidence: { source: 'timestamps', startMs, endMs, durationMs: endMs - startMs, ongoing: from.ongoing || to.ongoing },
        label: '观测到执行时间重叠' });
    }
    const next = intervals[index + 1];
    if (next && !from.ongoing && from.endMs <= next.startMs) addRelation({ type: 'observed_sequence', from: from.id, to: next.id,
      evidence: { source: 'timestamps', completedAtMs: from.endMs, nextStartedAtMs: next.startMs, gapMs: next.startMs - from.endMs },
      label: '仅观测到先后发生，非强制串行' });
  }
  coverage.inputRuns = Array.isArray(inputRuns) ? inputRuns.length : 0;
  coverage.retainedRuns = runs.length;
  coverage.runsTruncated = selected.omitted > 0;
  coverage.invalidRuns = selected.malformed; coverage.duplicateRuns = selected.duplicates;
  coverage.relationsTruncated = relationCount > MAX_RELATIONS;
  coverage.relationCount = relationCount; coverage.relationLimit = MAX_RELATIONS;
  coverage.lineage = runs.length && runs.every(run => run.lineageKnown === true) ? 'available' : 'unknown';
  coverage.unknownIntervals = runs.filter(run => !run.intervalKnown && !WAITING.has(run.status)).length;
  coverage.partial = coverage.runs !== 'complete' || coverage.dependencies !== 'complete' || ['failed', 'partial'].includes(coverage.relations) || selected.invalidInput || selected.malformed > 0 || selected.duplicates > 0 || coverage.runsTruncated || coverage.relationsTruncated || coverage.unknownIntervals > 0 || unresolvedRelations.length > 0;
  if (coverage.dependencies === 'unsupported') warnings.push('当前服务未提供业务依赖读取接口；时间关系不能替代依赖关系。');
  else if (coverage.dependencies !== 'complete') warnings.push('业务依赖关系未完整读取，不能据此认定没有依赖。');
  if (coverage.runs !== 'complete' || coverage.runsTruncated) warnings.push('时间线只覆盖当前已加载的运行。');
  if (coverage.unknownIntervals) warnings.push('部分运行缺少可靠起止时间，未参与并行或先后判断。');
  if (unresolvedRelations.length) warnings.push('部分明确运行指针的来源未加载或作用域不符，未自动连边。');
  if (coverage.relationsTruncated) warnings.push(`关系展示最多 ${MAX_RELATIONS} 条，当前结果已截断。`);
  if (['failed', 'partial'].includes(coverage.relations)) warnings.push('任务关系读取失败或不完整；未显示的父子关系不能视为不存在。');
  if (selected.invalidInput || selected.malformed || selected.duplicates) warnings.push('运行输入存在无效或重复记录，已披露覆盖限制。');
  return { runs, agentGroups: groupAgents(runs), relations, unresolvedRelations, coverage, warnings, span,
    laneCount: Math.max(laneEnds.length, intervals.length ? 1 : 0), maxObservedConcurrency: laneEnds.length,
    semantics: { overlap: '实际执行时间重叠，不表示任务依赖', sequence: '仅表示先后发生，不表示强制串行', width: '条形宽度代表执行时间，不代表完成百分比' } };
}

export function buildTaskGroups(inputIssues, inputRuns, options = {}) {
  const issues = uniqueRows(inputIssues, MAX_ISSUES), runs = uniqueRows(inputRuns, MAX_RUNS);
  const coverage = baseCoverage(options.coverage, options.relations);
  const byId = new Map();
  for (const issue of issues.rows) {
    let parent;
    if (issue.parentIssueKnown !== true) parent = { id: id(issue.parentIssueId), status: 'unknown' };
    else if (issue.parentIssueId === null) parent = { id: null, status: 'root' };
    else if (id(issue.parentIssueId)) parent = { id: issue.parentIssueId, status: 'linked' };
    else parent = { id: null, status: 'unknown' };
    byId.set(issue.id, { id: issue.id, issue: { ...issue }, parent, orphan: false, children: [], runs: [], agentGroups: [], timeline: null,
      stage: { known: issue.stageKnown === true && (issue.stage === null || Number.isSafeInteger(issue.stage) && issue.stage >= 0), value: Number.isSafeInteger(issue.stage) && issue.stage >= 0 ? issue.stage : null } });
  }
  const allRunIssueIds = new Map(runs.rows.map(run => [run.id, id(run.issueId)]));
  for (const run of runs.rows) {
    const issueId = id(run.issueId), key = issueId || `__unknown_issue_for_run__:${run.id}`;
    if (!byId.has(key)) byId.set(key, { id: key, issue: null, issueId, parent: { id: null, status: 'unknown' }, orphan: true,
      children: [], runs: [], agentGroups: [], timeline: null, stage: { known: false, value: null } });
    byId.get(key).runs.push(run);
  }
  for (const group of byId.values()) if (group.parent.status === 'linked' && !byId.get(group.parent.id)?.issue) group.parent.status = 'missing';
  const done = new Set();
  for (const start of byId.keys()) {
    const path = [], positions = new Map();
    let current = start;
    while (!done.has(current) && byId.get(current)?.parent.status === 'linked') {
      if (positions.has(current)) {
        for (const cyclic of path.slice(positions.get(current))) byId.get(cyclic).parent.status = 'cycle';
        break;
      }
      positions.set(current, path.length); path.push(current); current = byId.get(current).parent.id;
    }
    for (const visited of path) done.add(visited);
  }
  const roots = [];
  for (const group of byId.values()) {
    if (group.parent.status === 'linked') byId.get(group.parent.id).children.push(group.id);
    else roots.push(group.id);
    group.timeline = buildRunTimeline(group.runs, options.now ?? Date.now(), { coverage: options.coverage, relations: options.relations, allRunIssueIds });
    group.runs = group.timeline.runs; group.agentGroups = group.timeline.agentGroups;
  }
  const groups = [...byId.values()];
  coverage.issuesTruncated = issues.omitted > 0; coverage.runsTruncated = runs.omitted > 0;
  coverage.invalidIssues = issues.malformed; coverage.duplicateIssues = issues.duplicates;
  coverage.invalidRuns = runs.malformed; coverage.duplicateRuns = runs.duplicates;
  coverage.unknownParents = groups.filter(group => group.parent.status === 'unknown').length;
  coverage.missingParents = groups.filter(group => group.parent.status === 'missing').length;
  coverage.cyclicParents = groups.filter(group => group.parent.status === 'cycle').length;
  coverage.orphanGroups = groups.filter(group => group.orphan).length;
  coverage.partial = coverage.issues !== 'complete' || coverage.runs !== 'complete' || coverage.dependencies !== 'complete' || ['failed', 'partial'].includes(coverage.relations) || issues.invalidInput || runs.invalidInput ||
    issues.malformed > 0 || issues.duplicates > 0 || runs.malformed > 0 || runs.duplicates > 0 || coverage.issuesTruncated || coverage.runsTruncated || coverage.unknownParents > 0 || coverage.missingParents > 0 || coverage.cyclicParents > 0 || coverage.orphanGroups > 0;
  const warnings = [];
  if (coverage.issues !== 'complete' || coverage.issuesTruncated) warnings.push('只展示当前已加载的业务任务；缺少父任务不代表它不存在。');
  if (coverage.unknownParents) warnings.push('部分任务未返回可确认的父关系，展示入口不等于已确认顶层任务。');
  if (coverage.missingParents) warnings.push('部分明确父任务不在当前列表中，父子结构显示不完整。');
  if (coverage.cyclicParents) warnings.push('检测到父关系循环，已断开展示循环并保留异常标记。');
  if (coverage.orphanGroups) warnings.push('部分运行的业务任务信息缺失，已单独分组，不将运行冒充新任务。');
  if (coverage.dependencies !== 'complete') warnings.push(coverage.dependencies === 'unsupported' ? '当前服务不支持读取业务依赖，不能推断任务必须串行或可以并行。' : '业务依赖未完整读取，不能据此认定没有依赖。');
  return { groups, roots, coverage, warnings, semantics: { roots: '森林展示入口；只有parent.status=root才确认无父任务', stage: '父任务内阶段分组，不自动产生依赖边' } };
}
