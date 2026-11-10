const display = (value, max = 240) => (typeof value === 'string' ? value : JSON.stringify(value) || '').slice(0, max);
export const traceStatus = value => ({ starting: '准备启动', running: '运行中', completed: '已完成', failed: '失败', aborted: '已中止', cancelled: '已取消', timeout: '超时' }[value] || value || '待核实');

export function describeTraceRecord(record) {
  if (record.kind === 'session') return { category: 'session', label: '会话已确认', title: record.sessionId };
  if (record.kind === 'process') return { category: 'lifecycle', label: 'CLI 启动', title: `进程 ${record.pid}` };
  if (record.kind === 'finished') return { category: ['failed', 'timeout'].includes(record.status) ? 'error' : 'lifecycle', label: '执行结束', title: traceStatus(record.status) };
  const data = record.data || '';
  if (record.stream === 'stderr') return { category: 'diagnostic', label: '诊断输出', title: data.trim().slice(0, 180) || '空输出' };
  let frame;
  try { frame = JSON.parse(data); } catch { return { category: 'raw', label: '原始输出', title: data.slice(0, 180) }; }
  if (!frame || typeof frame !== 'object') return { category: 'raw', label: '原始输出', title: display(frame) };
  const type = display(frame.type || frame.method || (frame.id != null ? 'RPC 响应' : '事件'), 90);
  const part = frame.part || {}, params = frame.params || {}, item = params.item || {}, state = part.state || {};
  const block = frame.content_block || frame.message?.content?.find?.(part => part.type === 'tool_use');
  const tool = part.tool || item.name || item.tool || block?.name || params.name;
  const error = frame.error?.message || frame.error?.data?.message || frame.error?.name || frame.is_error === true && (frame.content || frame.output) || item.error?.message || (state.status === 'error' && (state.error || '工具返回错误'));
  const content = part.text || frame.content || params.delta || params.text || frame.delta?.text || frame.result?.result || '';
  const detail = state.input || item.arguments || params.arguments || block?.input || null;
  const command = detail?.command || detail?.cmd || item.command;
  const title = command || error || detail?.path || detail?.file_path || tool || content || frame.result?.thread?.id || part.reason || type;
  const category = error || /error|failed/.test(type) ? 'error' : tool || /tool|commandExecution|function_call/i.test(type + ' ' + (item.type || '')) ? 'tool' : /text|message|delta|thinking|reasoning/i.test(type) ? 'text' : 'raw';
  const knownLabel = { step_start: '步骤开始', step_finish: '步骤结束' }[type];
  const status = state.status || item.status;
  const toolLabel = `${tool || '工具'}${status ? ` · ${traceStatus(status)}` : ''}`;
  return { category, label: tool || category === 'tool' ? toolLabel : category === 'error' ? '错误' : category === 'text' ? '文本输出' : knownLabel || type,
    title: display(title), detail, type, tool: Boolean(tool || category === 'tool') };
}

export function filterTraceRecords(records, category, query) {
  const search = query.trim().toLocaleLowerCase();
  return records.map(record => ({ ...record, view: describeTraceRecord(record) })).filter(record =>
    (category === 'all' || record.view.category === category || category === 'tool' && record.view.tool) && (!search ||
      `${record.view.label} ${record.view.title} ${record.data || ''} ${record.sessionId || ''} ${record.pid || ''}`.toLocaleLowerCase().includes(search)));
}

export function mergeTraceRecords(previous, next, limit = 1000) {
  const map = new Map(previous.map(record => [record.seq, record]));
  for (const record of next) map.set(record.seq, record);
  return [...map.values()].sort((a, b) => a.seq - b.seq).slice(-limit);
}
