export const activeRunStates = new Set(['running', 'queued', 'dispatched', 'deferred', 'waiting_local_directory']);
export const conversationStatusLabels = { running: '运行中', queued: '排队中', dispatched: '已派发', deferred: '暂缓执行', waiting_local_directory: '等待本地目录', completed: '运行完成', failed: '运行失败', cancelled: '已取消', unknown: '状态待核实' };
export const printable = value => typeof value === 'string' ? value : value == null ? '' : JSON.stringify(value, null, 2);
const validTime = value => Number.isFinite(Date.parse(value)) ? Date.parse(value) : null;

export function mergeConversation(previous, incoming, limit = 1000) {
  if (!incoming.length) return { messages: previous, trimmed: false };
  const map = new Map(previous.map(message => [message.seq, message]));
  for (const message of incoming) map.set(message.seq, message);
  const all = [...map.values()].sort((a, b) => a.seq - b.seq);
  let bytes = 0, start = all.length;
  while (start > 0 && all.length - start < limit) {
    const size = new TextEncoder().encode(JSON.stringify(all[start - 1])).byteLength;
    if (bytes + size > 8_000_000) break;
    bytes += size; start--;
  }
  return { messages: all.slice(start), trimmed: start > 0 };
}

export function conversationEntries(messages) {
  const entries = [], calls = new Map(), ambiguous = new Set();
  let gaps = false, previous = 0, previousType = '';
  for (const message of messages) {
    const contiguous = message.seq === previous + 1, priorType = previousType;
    if (!contiguous) gaps = true;
    previous = message.seq;
    previousType = message.type;
    if (message.type === 'tool_use') {
      const entry = { kind: 'tool', seq: message.seq, call: message, result: null, ambiguous: false };
      entries.push(entry);
      if (message.callId) {
        if (calls.has(message.callId)) {
          calls.get(message.callId).ambiguous = true;
          ambiguous.add(message.callId);
        }
        entry.ambiguous = ambiguous.has(message.callId);
        calls.set(message.callId, entry);
      }
    } else if (message.type === 'tool_result') {
      const entry = message.callId && calls.get(message.callId);
      if (entry && !entry.result && !entry.ambiguous && (!message.tool || message.tool === entry.call.tool)) entry.result = message;
      else entries.push({ kind: 'tool', seq: message.seq, call: null, result: message, ambiguous: true });
    } else {
      const prior = entries.at(-1);
      if (contiguous && ['text', 'thinking'].includes(message.type) && priorType === message.type && prior?.kind === message.type) {
        prior.message = { ...prior.message, content: printable(prior.message.content) + printable(message.content), contentTruncated: prior.message.contentTruncated || message.contentTruncated };
        prior.lastSeq = message.seq; prior.lastAt = message.createdAt;
      } else entries.push({ kind: message.type, seq: message.seq, message });
    }
  }
  return { entries, gaps };
}

export function toolSummary(entry) {
  const input = entry.call?.input || {};
  return printable(input.description || input.command || input.cmd || input.file_path || input.filePath || input.path || input.query || input.subject || (!entry.call && (entry.result?.output || entry.result?.content)) || entry.call?.tool || entry.result?.tool || '工具记录').replace(/\s+/g, ' ').slice(0, 240);
}

const slowLimit = value => Number.isSafeInteger(value) && value >= 0 ? Math.min(20, value) : 20;

export function rankSlowToolRecords(rows, limit = 20) {
  return (Array.isArray(rows) ? rows : []).filter(row => row?.kind === 'tool' && row.entry?.call && row.entry?.result && !row.entry.ambiguous && Number.isFinite(row.duration) && row.duration > 0)
    .sort((a, b) => b.duration - a.duration || a.seq - b.seq).slice(0, slowLimit(limit));
}

export function createSlowToolTracker() {
  return { lastSeq: 0, calls: new Map(), usedCallIds: new Set(), completedCallIds: new Set(), ambiguous: new Set(), records: [], count: 0 };
}

export function ingestSlowToolMessages(state, messages) {
  if (!state || !(state.calls instanceof Map) || !(state.usedCallIds instanceof Set) || !(state.completedCallIds instanceof Set) || !Array.isArray(messages)) return { records: [], count: 0 };
  for (const message of [...messages].filter(item => Number.isSafeInteger(item?.seq) && item.seq > state.lastSeq).sort((a, b) => a.seq - b.seq)) {
    state.lastSeq = message.seq;
    if (message.type === 'tool_use') {
      if (!message.callId || state.ambiguous.has(message.callId)) continue;
      if (state.usedCallIds.has(message.callId)) {
        state.calls.delete(message.callId); state.ambiguous.add(message.callId);
        if (state.completedCallIds.delete(message.callId)) {
          state.count = Math.max(0, state.count - 1);
          state.records = state.records.filter(row => row.entry.call.callId !== message.callId);
        }
        continue;
      }
      state.usedCallIds.add(message.callId);
      state.calls.set(message.callId, message);
      continue;
    }
    if (message.type !== 'tool_result' || !message.callId || state.ambiguous.has(message.callId)) continue;
    const call = state.calls.get(message.callId);
    state.calls.delete(message.callId);
    if (!call || message.tool && call.tool && message.tool !== call.tool) continue;
    const start = validTime(call.createdAt), end = validTime(message.createdAt), duration = start != null && end != null && end > start ? end - start : null;
    if (duration == null) continue;
    const entry = { kind: 'tool', seq: call.seq, lastSeq: message.seq, call, result: message, ambiguous: false };
    state.completedCallIds.add(message.callId);
    state.count++;
    state.records = rankSlowToolRecords([...state.records, {
      id: `slow:${call.seq}`, kind: 'tool', name: call.tool || message.tool || '工具', summary: toolSummary(entry), seq: call.seq, lastSeq: message.seq,
      start, end, duration, measurement: '记录跨度', state: message.isError === true || message.is_error === true ? '工具返回错误' : '已返回',
      entry, tone: message.isError === true || message.is_error === true ? 'error' : 'neutral', pending: false,
    }], 20);
  }
  return { records: state.records.slice(), count: state.count };
}

export function conversationActivity({ messages, run, loading = false, hasMore = false, error = '', unavailable = false, now = Date.now() }) {
  const last = messages.at(-1), active = activeRunStates.has(run.status);
  const { entries, gaps } = conversationEntries(messages);
  const lastAt = validTime(last?.createdAt), startedAt = validTime(run.startedAt), endedAt = validTime(run.completedAt);
  const elapsed = startedAt != null && (endedAt != null || active) ? Math.max(0, (endedAt ?? now) - startedAt) : null;
  const silence = active && (lastAt ?? startedAt) != null ? Math.max(0, now - (lastAt ?? startedAt)) : null;
  let title, detail;
  if (error || unavailable) { title = '连接异常 · 当前进展待核实'; detail = '保留上次读取的记录，恢复连接后继续同步。'; }
  else if (loading || hasMore) { title = '正在读取执行记录'; detail = '历史消息尚未补齐，暂不判断当前停在哪里。'; }
  else if (!active) { title = conversationStatusLabels[run.status] || '状态待核实'; detail = run.status === 'completed' ? '本次运行已结束，以下是已上报的执行过程。' : run.status === 'failed' ? '本次运行失败，可展开错误和最后的工具记录。' : '以下展示已读取的记录。'; }
  else if (run.status !== 'running') { title = conversationStatusLabels[run.status]; detail = '尚未进入运行状态。'; }
  else { title = last ? '等待新反馈' : '等待首条反馈'; detail = '最近没有新的执行消息，具体活动尚未确认。'; }
  let lastAction = '尚未收到执行消息';
  if (last?.type === 'tool_result') { const entry = entries.find(item => item.result?.seq === last.seq); lastAction = `工具已返回 · ${entry?.call?.tool || last.tool || '工具'}`; }
  else if (last?.type === 'tool_use') lastAction = `收到工具调用 · ${last.tool || '工具'}${last.callId ? '（结果尚未收到）' : ''}`;
  else if (last?.type === 'text') lastAction = '收到智能体回复';
  else if (last?.type === 'thinking') lastAction = '收到思考内容';
  else if (last?.type === 'error') lastAction = '收到错误信息';
  else if (last) lastAction = '收到执行事件';
  return { active, title, detail, lastAction, lastAt: last?.createdAt || null, elapsed, silence, partial: gaps, uncertain: Boolean(error || unavailable || loading || hasMore) };
}

export function shortDuration(ms) {
  if (ms == null || !Number.isFinite(ms)) return '—';
  const seconds = Math.floor(Math.max(0, ms) / 1000);
  return seconds < 60 ? `${seconds} 秒` : seconds < 3600 ? `${Math.floor(seconds / 60)} 分 ${seconds % 60} 秒` : `${Math.floor(seconds / 3600)} 小时 ${Math.floor(seconds / 60) % 60} 分`;
}
