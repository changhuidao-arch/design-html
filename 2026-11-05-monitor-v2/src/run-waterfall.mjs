import { conversationEntries, printable, toolSummary } from './run-conversation.mjs';

export const waterfallKinds = { thinking: '思考输出', text: '文字输出', tool: '工具', gap: '无日志间隔', other: '其他记录' };
const logMessageKinds = { thinking: '思考输出', text: '文字输出', tool_use: '工具调用', tool_result: '工具返回', error: '错误记录' };
export const logMessageKind = type => logMessageKinds[type] || type || '记录';
const time = value => value != null && Number.isFinite(Date.parse(value)) ? Date.parse(value) : null;
export function spanDuration(ms) {
  if (!Number.isFinite(ms)) return '跨度未知';
  if (ms === 0) return '时间点';
  if (ms < 1000) return `${Math.round(ms)} 毫秒`;
  const seconds = Math.round(ms / 1000);
  return seconds < 60 ? `${seconds} 秒` : `${Math.floor(seconds / 60)} 分 ${seconds % 60} 秒`;
}
export function axisTime(ms) {
  const seconds = Math.max(0, Math.round(ms / 1000));
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
}
export function unionIntervals(intervals) {
  const merged = [];
  for (const [a, b] of [...intervals].sort((a, b) => a[0] - b[0])) {
    const prior = merged.at(-1);
    if (prior && a <= prior[1]) prior[1] = Math.max(prior[1], b);
    else merged.push([a, b]);
  }
  return merged;
}

export function buildRunWaterfall({ run, messages = [], partial = false }) {
  const { entries, gaps } = conversationEntries(messages);
  const started = time(run.startedAt), completed = time(run.completedAt);
  const terminal = ['completed', 'failed', 'cancelled'].includes(run.status);
  const times = messages.map(message => time(message.createdAt));
  const validTimes = times.filter(value => value != null);
  const start = started ?? Math.min(...validTimes);
  // Active runs stop at the last observed record, never at a speculative live clock.
  const end = terminal && completed != null ? completed : Math.max(start, ...validTimes);
  const boundsValid = Number.isFinite(start) && Number.isFinite(end) && end >= start;
  const total = boundsValid ? end - start : 0;
  let invalid = times.some((value, index) => value == null || value < start || value > end || index > 0 && value < times[index - 1]);
  const counts = new Map();
  for (const message of messages) if (message.callId && ['tool_use', 'tool_result'].includes(message.type)) {
    const key = `${message.callId}:${message.type}`;
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  const rows = [];
  for (const entry of entries) {
    const a = time(entry.call?.createdAt ?? entry.message?.createdAt ?? entry.result?.createdAt);
    const b = time(entry.result?.createdAt ?? entry.lastAt ?? entry.message?.createdAt ?? entry.call?.createdAt);
    const tool = entry.kind === 'tool';
    const paired = tool && entry.call && entry.result && !entry.ambiguous && counts.get(`${entry.call.callId}:tool_use`) === 1 && counts.get(`${entry.call.callId}:tool_result`) === 1;
    const measurable = !tool || paired;
    const valid = boundsValid && a != null && b != null && a >= start && b >= a && b <= end;
    if (!valid) invalid = true;
    const kind = waterfallKinds[entry.kind] ? entry.kind : 'other';
    rows.push({ id: `record-${entry.seq}`, kind, seq: entry.seq, lastSeq: entry.result?.seq ?? entry.lastSeq ?? entry.seq,
      name: tool ? entry.call?.tool || entry.result?.tool || '工具' : waterfallKinds[kind],
      summary: tool ? toolSummary(entry) : printable(entry.message?.content || entry.message?.output).replace(/\s+/g, ' ').slice(0, 180),
      start: a, end: valid && measurable ? b : a, offset: valid ? a - start : null,
      duration: valid && measurable ? b - a : null, entry,
      failed: entry.result?.isError === true || entry.result?.is_error === true || entry.kind === 'error',
      note: tool ? paired ? '调用记录至匹配返回，包含可能的上报延迟。' : '未能唯一配对调用与返回，跨度未知。' : '连续同类输出的首条至末条记录，不代表完整模型请求耗时。' });
  }
  const complete = !partial && !gaps && !invalid && boundsValid && started != null && messages.length > 0 && (!terminal || completed != null);
  if (complete) {
    const occupied = unionIntervals(rows.filter(row => row.offset != null).map(row => [row.offset, row.offset + (row.duration ?? 0)]));
    let cursor = 0, number = 0;
    for (const [a, b] of [...occupied, [total, total]]) {
      if (a > cursor) {
        const before = messages.findLast(message => time(message.createdAt) <= start + cursor);
        const after = messages.find(message => time(message.createdAt) >= start + a);
        rows.push({ id: `gap-${++number}`, kind: 'gap', name: '无日志间隔', summary: `${before ? `#${before.seq} ${logMessageKind(before.type)}` : '运行开始'} → ${after ? `#${after.seq} ${logMessageKind(after.type)}` : '运行结束'}`,
          start: start + cursor, end: start + a, offset: cursor, duration: a - cursor, before, after,
          note: '这一段没有新的日志记录，原因未知；不归入思考或工具执行。' });
      }
      cursor = Math.max(cursor, b);
    }
  }
  rows.sort((a, b) => (a.offset ?? Infinity) - (b.offset ?? Infinity) || (a.seq ?? 0) - (b.seq ?? 0));
  const totals = Object.fromEntries(Object.keys(waterfallKinds).map(kind => [kind, unionIntervals(rows.filter(row => row.kind === kind && row.duration != null && row.offset != null).map(row => [row.offset, row.offset + row.duration])).reduce((sum, [a, b]) => sum + b - a, 0)]));
  const ranked = rows.filter(row => row.duration > 0).slice().sort((a, b) => b.duration - a.duration || a.offset - b.offset).slice(0, 20);
  return { start, end, total, rows, totals, ranked, complete, terminal, invalid, rawCount: messages.length };
}
