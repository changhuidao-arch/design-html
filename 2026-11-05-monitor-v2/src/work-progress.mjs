const ACTIVE = new Set(['queued', 'dispatched', 'running', 'waiting_local_directory', 'deferred']);
const LIMITS = Object.freeze({ items: 100, pending: 200, unconfirmed: 50, title: 300, action: 400, statement: 1200, id: 256, result: 16000, pendingProposalBytes: 64 * 1024 });
const encoder = new TextEncoder();
const PLANNING = new Set(['TaskCreate', 'TaskUpdate', 'TodoWrite']);
const object = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const text = (value, limit = LIMITS.action) => typeof value === 'string' ? value.trim().slice(0, limit) : '';
const identifier = value => typeof value === 'number' && Number.isSafeInteger(value) && value >= 0 ? String(value) : typeof value === 'string' && value.trim() && value.trim().length <= LIMITS.id ? value.trim() : null;
const timestamp = value => typeof value === 'string' && value.length <= 80 && Number.isFinite(Date.parse(value)) ? value : null;
const evidence = (message, call) => ({ seq: message.seq, useSeq: call.seq, at: timestamp(message.createdAt), source: call.tool });
const own = (value, key) => object(value) && Object.hasOwn(value, key) ? value[key] : undefined;

export function createWorkProgressState() {
  return { version: 1, items: new Map(), pending: new Map(), unconfirmed: [], reasons: new Set(), lastSeq: 0,
    latestAction: null, latestStatement: null, lastEvidenceAt: null, itemsTruncated: false, pendingTruncated: false, unconfirmedTruncated: false,
    pendingProposalBytes: 0, pendingProposalTruncated: false };
}

function unconfirmed(state, call, message, reason, outcome = 'unknown') {
  state.unconfirmed.push({ tool: call.tool, callId: call.callId, summary: call.summary, seq: message.seq,
    useSeq: call.seq, at: timestamp(message.createdAt), reason, outcome });
  if (state.unconfirmed.length > LIMITS.unconfirmed) { state.unconfirmed.shift(); state.unconfirmedTruncated = true; }
}

function actionFor(message) {
  const input = object(message.input) ? message.input : {};
  const tool = text(message.tool, 100) || '未知工具';
  const detail = ['description', 'subject', 'file_path', 'filePath', 'path', 'file', 'command'].map(key => text(own(input, key))).find(Boolean);
  return { tool, callId: identifier(message.callId), summary: detail || tool,
    seq: message.seq, at: timestamp(message.createdAt), source: 'tool_call', outcome: 'pending', resultSeq: null, resultAt: null };
}

function proposalFor(message) {
  const input = message.input;
  if (!object(input) || message.inputTruncated) return { invalid: '工具输入缺失、畸形或已截断，无法确认计划变更' };
  if (message.tool === 'TaskCreate') {
    const title = text(own(input, 'subject'), LIMITS.title);
    return title ? { title, status: 'pending' } : { invalid: 'TaskCreate 没有有效 subject' };
  }
  if (message.tool === 'TaskUpdate') {
    const id = identifier(own(input, 'taskId'));
    if (!id) return { invalid: 'TaskUpdate 没有有效 taskId' };
    const proposedStatus = own(input, 'status');
    if (proposedStatus !== undefined && (typeof proposedStatus !== 'string' || !proposedStatus.trim() || proposedStatus.length > 80)) return { invalid: 'TaskUpdate 的 status 格式无效' };
    const proposedTitle = own(input, 'subject');
    if (proposedTitle !== undefined && (typeof proposedTitle !== 'string' || !proposedTitle.trim())) return { invalid: 'TaskUpdate 的 subject 格式无效' };
    return { id, ...(proposedStatus !== undefined ? { status: proposedStatus.trim() } : {}), ...(proposedTitle !== undefined ? { title: text(proposedTitle, LIMITS.title) } : {}) };
  }
  if (message.tool === 'TodoWrite') {
    const todos = own(input, 'todos');
    if (!Array.isArray(todos)) return { invalid: 'TodoWrite 没有有效 todos 数组' };
    if (todos.some(todo => !object(todo) || typeof own(todo, 'content') !== 'string' || !todo.content.trim() || typeof own(todo, 'status') !== 'string' || !todo.status.trim() || todo.status.length > 80)) return { invalid: 'TodoWrite 中有畸形事项，未应用替换' };
    return { todos: todos.slice(0, LIMITS.items).map(todo => ({ title: text(todo.content, LIMITS.title), status: todo.status.trim() })), truncated: todos.length > LIMITS.items };
  }
  return null;
}

function resultFor(message) {
  let output = typeof message.output === 'string' ? message.output : '';
  if (message.isError === true || message.is_error === true) return { failed: true };
  if (message.outputTruncated === true || output.length > LIMITS.result) return { unknown: '工具结果已截断，无法确认计划变更' };
  let value;
  try { value = JSON.parse(output); } catch { /* Plain-text tool results are supported below. */ }
  if (typeof value === 'string') { output = value; value = undefined; }
  if (object(value) && (value.isError === true || value.is_error === true || value.success === false || value.error != null && value.error !== false)) return { failed: true };
  if (/^\s*(?:error\b|failed\b|failure\b|exception\b|<tool_use_error>)/i.test(output)) return { failed: true };
  return { value, output: output.trim() };
}

function confirmedResult(call, result) {
  const value = result.value;
  if (call.tool === 'TaskCreate') {
    if (object(value) && value.success === true) {
      const id = identifier(value.taskId ?? value.task_id ?? value.id ?? value.task?.id);
      if (id) return { id };
    }
    const match = /^Task #([^\s]+) created successfully(?::[^\r\n]*)?\s*$/i.exec(result.output);
    const id = match && identifier(match[1]);
    return id ? { id } : null;
  }
  if (call.tool === 'TaskUpdate') {
    if (object(value) && value.success === true) {
      const id = identifier(value.taskId ?? value.task_id ?? value.id ?? value.task?.id);
      if (id === call.proposal.id) return { id };
    }
    const match = /^Updated task #([^\s]+)(?: ((?:status|subject|description|activeForm|owner|metadata|addBlocks|addBlockedBy|deleted)(?:, (?:status|subject|description|activeForm|owner|metadata|addBlocks|addBlockedBy))*))?\s*$/i.exec(result.output);
    const id = match && identifier(match[1]);
    const fields = match?.[2]?.split(', ') || [];
    const confirmsStatus = call.proposal.status === undefined || fields.includes('status') || call.proposal.status === 'deleted' && fields.includes('deleted');
    const confirmsTitle = call.proposal.title === undefined || fields.includes('subject');
    return id === call.proposal.id && confirmsStatus && confirmsTitle ? { id } : null;
  }
  if (call.tool === 'TodoWrite') {
    if (object(value) && value.success === true) return {};
    if (/^Todos have been modified successfully\.(?:\s+[^\r\n]*)?$/i.test(result.output)) return {};
  }
  return null;
}

function putItem(state, item) {
  const key = `${item.kind}:${item.id}`;
  if (!state.items.has(key) && state.items.size >= LIMITS.items) { state.itemsTruncated = true; return; }
  state.items.set(key, item);
}

function applyPlan(state, call, message) {
  if (call.proposal.invalid) { unconfirmed(state, call, message, call.proposal.invalid); return; }
  const result = resultFor(message);
  if (result.failed) { unconfirmed(state, call, message, '工具明确返回失败，未应用计划变更', 'failed'); return; }
  if (result.unknown) { unconfirmed(state, call, message, result.unknown); return; }
  const confirmed = confirmedResult(call, result);
  if (!confirmed) { unconfirmed(state, call, message, '工具结果没有可识别的成功确认，未应用计划变更'); return; }
  const proof = evidence(message, call);
  if (call.tool === 'TaskCreate') {
    putItem(state, { id: confirmed.id, title: call.proposal.title, status: 'pending', kind: 'task', evidence: proof });
  } else if (call.tool === 'TaskUpdate') {
    if (call.proposal.status === 'deleted') state.items.delete(`task:${confirmed.id}`);
    else {
      const previous = state.items.get(`task:${confirmed.id}`);
      if (!previous) state.reasons.add('部分事项仅观察到更新，未观察到创建');
      putItem(state, { id: confirmed.id, title: previous?.title || `任务 ${confirmed.id}`, status: previous?.status || 'unknown', kind: 'task',
        ...call.proposal, evidence: proof });
    }
  } else if (call.tool === 'TodoWrite') {
    for (const [id, item] of state.items) if (item.kind === 'todo') state.items.delete(id);
    call.proposal.todos.forEach((todo, index) => putItem(state, { id: `todo:${call.seq}:${index}`, ...todo, kind: 'todo', evidence: proof }));
    state.itemsTruncated ||= call.proposal.truncated;
  }
}

export function ingestWorkMessages(state, messages) {
  if (!Array.isArray(messages)) { state.reasons.add('收到无效消息批次'); return state; }
  const ordered = messages.filter(message => object(message) && Number.isSafeInteger(message.seq) && message.seq > 0).sort((a, b) => a.seq - b.seq);
  if (ordered.length !== messages.length) state.reasons.add('部分消息缺少有效序号');
  for (const message of ordered) {
    if (message.seq <= state.lastSeq) continue;
    if (message.seq > state.lastSeq + 1) state.reasons.add('消息序列不完整，计划可能缺少早期记录');
    state.lastSeq = message.seq;
    const observedAt = timestamp(message.createdAt);
    if (observedAt && (!state.lastEvidenceAt || Date.parse(observedAt) > Date.parse(state.lastEvidenceAt))) state.lastEvidenceAt = observedAt;
    if (message.type === 'text' && typeof message.content === 'string' && message.content.trim()) {
      state.latestStatement = { text: text(message.content, LIMITS.statement), seq: message.seq, at: timestamp(message.createdAt), source: 'agent_statement',
        truncated: message.contentTruncated === true || message.content.length > LIMITS.statement };
    } else if (message.type === 'tool_use') {
      const action = actionFor(message);
      let proposal = PLANNING.has(action.tool) ? proposalFor(message) : null;
      let proposalBytes = proposal && !proposal.invalid ? encoder.encode(JSON.stringify(proposal)).byteLength : 0;
      if (proposalBytes + state.pendingProposalBytes > LIMITS.pendingProposalBytes) {
        proposal = { invalid: '待确认计划输入超过容量预算，未应用变更' }; proposalBytes = 0;
        state.pendingProposalTruncated = true;
      }
      state.latestAction = { ...action };
      if (!action.callId) {
        state.latestAction.outcome = 'unknown';
        state.reasons.add('部分工具缺少可关联的调用标识');
        if (proposal) unconfirmed(state, action, message, '缺少调用标识，不能关联成功结果');
      } else if (state.pending.has(action.callId)) {
        state.reasons.add('调用标识重复，无法可靠关联后续结果');
        const previous = state.pending.get(action.callId);
        previous.ambiguous = true;
        if (proposal) unconfirmed(state, action, message, '调用标识重复，未确认本次计划变更');
      } else if (state.pending.size >= LIMITS.pending) {
        state.pendingTruncated = true; state.latestAction.outcome = 'unknown';
        if (proposal) unconfirmed(state, action, message, '并行调用追踪达到上限');
      } else { state.pending.set(action.callId, { ...action, proposal, proposalBytes }); state.pendingProposalBytes += proposalBytes; }
    } else if (message.type === 'tool_result') {
      const id = identifier(message.callId);
      const call = id && state.pending.get(id);
      if (!call) {
        if (PLANNING.has(message.tool)) { state.reasons.add('部分计划工具结果缺少对应输入'); unconfirmed(state, actionFor(message), message, '未观察到对应调用输入'); }
        continue;
      }
      state.pending.delete(id);
      state.pendingProposalBytes -= call.proposalBytes;
      const result = resultFor(message);
      if (state.latestAction?.callId === id) Object.assign(state.latestAction, { resultSeq: message.seq, resultAt: timestamp(message.createdAt), outcome: result.failed ? 'failed' : result.unknown || call.ambiguous ? 'unknown' : 'returned' });
      if (call.proposal) {
        if (call.ambiguous || message.tool && message.tool !== call.tool) unconfirmed(state, call, message, '调用标识或工具名称冲突，未应用计划变更');
        else applyPlan(state, call, message);
      }
    }
  }
  return state;
}

export function snapshotWorkProgress(state, { status = 'unknown', progress = null, logsCaughtUp = false } = {}) {
  const items = [...state.items.values()].map(item => ({ ...item, evidence: { ...item.evidence } }));
  const pendingActions = ACTIVE.has(status) ? [...state.pending.values()].filter(call => !call.ambiguous).map(({ proposal, proposalBytes, ambiguous, ...action }) => ({ ...action })) : [];
  const counts = { total: items.length, pending: 0, inProgress: 0, completed: 0, unknown: 0 };
  for (const item of items) {
    if (item.status === 'pending') counts.pending++;
    else if (item.status === 'in_progress') counts.inProgress++;
    else if (item.status === 'completed') counts.completed++;
    else counts.unknown++;
  }
  const warnings = [...state.reasons];
  if (!logsCaughtUp) warnings.push('日志尚未完整补齐，计划只反映已读取证据');
  if (state.itemsTruncated) warnings.push(`计划事项最多保留 ${LIMITS.items} 项，当前清单可能不完整`);
  if (state.pendingTruncated) warnings.push(`并行工具最多追踪 ${LIMITS.pending} 个，当前动作可能不完整`);
  if (state.unconfirmedTruncated) warnings.push(`未确认变更仅保留最近 ${LIMITS.unconfirmed} 条`);
  if (state.pendingProposalTruncated) warnings.push('待确认计划输入已达到每运行64KiB预算，部分变更未解析');
  if (state.unconfirmed.length) warnings.push('存在失败或未确认的计划变更，未计入已确认事项');
  const latestAction = state.latestAction ? { ...state.latestAction } : null;
  if (latestAction?.outcome === 'pending' && !ACTIVE.has(status)) latestAction.outcome = 'unknown';
  const step = Number.isSafeInteger(progress?.step) && progress.step >= 0 ? progress.step : null;
  const total = Number.isSafeInteger(progress?.total) && progress.total >= 0 ? progress.total : null;
  return { items, counts, currentAction: pendingActions[0] ?? null, latestAction,
    latestStatement: state.latestStatement ? { ...state.latestStatement } : null, pendingActions,
    unconfirmedActions: state.unconfirmed.map(action => ({ ...action })),
    coverage: { partial: warnings.length > 0, logsCaughtUp: logsCaughtUp === true, itemsTruncated: state.itemsTruncated, pendingTruncated: state.pendingTruncated, unconfirmedTruncated: state.unconfirmedTruncated, pendingProposalTruncated: state.pendingProposalTruncated },
    warnings, lastEvidenceAt: state.lastEvidenceAt, planSource: 'agent_tools', notMulticaSubtasks: true, runStatus: text(status, 80) || 'unknown',
    reportedProgress: object(progress) && text(progress.summary) && (step == null || total == null || step <= total) ? { summary: text(progress.summary, LIMITS.statement), step, total, reportedAt: timestamp(progress.reportedAt) } : null };
}
