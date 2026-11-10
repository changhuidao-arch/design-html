import React, { useEffect, useRef, useState } from 'react';
import { RunWaterfall } from './run-waterfall.jsx';
import { ReadableText, useRunTranscript } from './run-conversation.jsx';
import { conversationStatusLabels, printable } from './run-conversation.mjs';
import { buildExecutionTrace, eventLabels, runExchange, traceDuration as shortDuration } from './execution-trace.mjs';

const clock = value => value != null && Number.isFinite(typeof value === 'number' ? value : Date.parse(value)) ? new Date(value).toLocaleTimeString('zh-CN', { hour12: false }) : '时间未提供';
function TextBlock({ value, empty, limit = 180 }) { return value ? <ReadableText text={value} limit={limit}/> : <p className="mm-exec-note">{empty}</p>; }

const failedEvent = row => row.kind === 'error' || row.entry?.result?.isError === true || row.entry?.result?.is_error === true;
const eventState = row => failedEvent(row) ? row.kind === 'tool' ? '工具返回错误' : '错误记录' : row.state;
const observedWaiting = row => row.pending && row.measurement === '已观察等待' && row.duration != null;

function EvidenceRow({ row, selected, onSelect, attention = false }) {
  const failed = failedEvent(row);
  return <button type="button" className={`mm-exec-record${failed ? ' is-error' : attention ? ' is-warning' : ''}`} aria-pressed={selected} onClick={() => onSelect(row.id)} aria-label={`查看${row.name}记录，${eventState(row)}${observedWaiting(row) ? `，已观察等待 ${shortDuration(row.duration)}` : ''}`}>
    <time>{clock(row.entry?.call?.createdAt || row.entry?.result?.createdAt || row.entry?.message?.createdAt || row.start)}</time>
    <span className="mm-exec-record-body"><strong>{row.name}<span>{eventState(row)}</span></strong><span className="mm-exec-record-summary">{row.summary || '查看记录内容'}</span></span>
    {observedWaiting(row) && <span className="mm-exec-observed">已观察等待 {shortDuration(row.duration)}</span>}
    <span className="mm-exec-record-open">查看证据</span>
  </button>;
}

export function TraceEventDetail({ row, run, onClose }) {
  const call = row.entry?.call, result = row.entry?.result, message = row.entry?.message;
  const element = useRef(null);
  useEffect(() => { element.current?.scrollIntoView({ block: 'nearest' }); element.current?.focus({ preventScroll: true }); }, [row.id]);
  return <section className="mm-exec-event-detail" aria-label="选中事件详情" ref={element} tabIndex={-1}>
    <div className="mm-exec-title"><h3>{row.name}</h3><button onClick={onClose}>关闭详情</button></div>
    <p className="mm-exec-note">{eventState(row) || row.measurement}{row.seq ? ` · #${row.seq}${row.lastSeq !== row.seq ? `–${row.lastSeq}` : ''}` : ''}</p>
    <p className="mm-exec-note">{call ? `调用记录 ${clock(call.createdAt)}` : `记录时间 ${clock(row.start)}`}{result ? ` · 返回记录 ${clock(result.createdAt)}` : ''}</p>
    {observedWaiting(row) && <p className="mm-exec-attention">已观察等待 {shortDuration(row.duration)}，尚未收到返回。</p>}
    {row.kind === 'tool' ? <div className="mm-exec-payloads"><section><h4>调用输入</h4><pre>{call ? printable(call.input) || '参数未提供' : '未读到调用记录'}</pre>{call?.inputTruncated && <p className="mm-exec-note">输入已截断</p>}</section><section><h4>返回输出</h4>{result ? <pre>{result.output || result.content || '（空返回）'}</pre> : <p className="mm-exec-note">{row.state}</p>}{result && <p className="mm-exec-note">{result.outputTruncated === true ? '输出已截断' : result.outputTruncated == null ? '输出完整性未提供' : '当前记录未标记截断'}</p>}</section></div> : row.entry ? <TextBlock value={message?.content || message?.output} empty="记录未提供正文" limit={2200}/> : <p className="mm-exec-note">{row.kind === 'wait' ? '从运行创建到实际开始；包含调度、派发或其他启动前等待。等待原因需结合运行状态核实。' : run.error || '运行时间来自服务端的开始和结束记录；运行完成不代表任务验收通过。'}</p>}
    {message?.contentTruncated && <p className="mm-exec-note">正文已截断</p>}
    <p className="mm-exec-note mm-exec-timing-note">{row.kind === 'tool' ? observedWaiting(row) ? '从监控首次观察到调用开始计时；尚未收到返回，不证明工具仍在执行。' : '这里只展示调用与返回的记录时间；没有可信执行边界，不能据此计算工具耗时。' : row.kind === 'thinking' ? '这是已上报的思考内容，不代表一次模型请求的完整思考时段。' : '记录时间不表示完整输出耗时。'}</p>
  </section>;
}

export function ExecutionEvidence({ trace, run, loading, error, hasMore, trimmed, onRetry }) {
  const [expanded, setExpanded] = useState(false), [filter, setFilter] = useState('all'), [limit, setLimit] = useState(40), [selectedId, setSelectedId] = useState('');
  const important = trace.events.filter(row => failedEvent(row) || observedWaiting(row) && row.tone === 'warning');
  const events = filter === 'all' ? trace.events : trace.events.filter(row => filter === 'error' ? failedEvent(row) : row.kind === filter);
  const selected = trace.events.find(row => row.id === selectedId);
  const select = id => setSelectedId(previous => previous === id ? '' : id);
  return <section className="mm-exec-evidence" aria-label="执行证据">
    {error && <div className="mm-exec-error" role="alert">执行消息读取失败，保留已读记录。<button onClick={onRetry}>重试读取</button></div>}
    {(hasMore || loading) && <p className="mm-exec-note" role="status">正在补齐执行消息…</p>}
    {(trace.gaps || trimmed) && <p className="mm-exec-note">当前消息不完整，仅展示已读取的证据。</p>}
    {important.length > 0 && <div className="mm-exec-important" aria-label="需要查看的执行证据"><h3>需要查看的记录 <span>{important.length}</span></h3>{important.slice(-4).map(row => <EvidenceRow key={row.id} row={row} selected={selectedId === row.id} onSelect={select} attention/>)}{important.length > 4 && <button className="mm-exec-more" onClick={() => { setExpanded(true); setFilter('all'); }}>另有 {important.length - 4} 条，展开全部记录</button>}</div>}
    <button type="button" className="mm-exec-disclosure" aria-expanded={expanded} onClick={() => setExpanded(value => !value)}>{expanded ? '收起执行记录' : `查看执行记录（${trace.events.length}）`}<svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16"><path d={expanded ? 'M4 10 8 6l4 4' : 'M4 6l4 4 4-4'} fill="none" stroke="currentColor" strokeWidth="1.5"/></svg></button>
    {expanded && <div className="mm-exec-records">
      <div className="mm-exec-controls"><label>记录类型<select aria-label="筛选执行记录" value={filter} onChange={event => { setFilter(event.target.value); setLimit(40); }}><option value="all">全部</option>{Object.entries(eventLabels).filter(([key]) => key !== 'system').map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label><span className="mm-exec-note">按记录顺序 · 时间为上报记录时刻</span></div>
      <div className="mm-exec-record-list">{events.slice(0, limit).map(row => <EvidenceRow key={row.id} row={row} selected={selectedId === row.id} onSelect={select}/>)}</div>
      {events.length > limit && <button className="mm-exec-more" onClick={() => setLimit(value => value + 40)}>再显示 {Math.min(40, events.length - limit)} 条记录</button>}
      {!events.length && !loading && !hasMore && <p className="mm-exec-note mm-exec-empty">{filter === 'all' ? '本次运行尚未读到过程消息。' : '没有这一类型的记录。'}</p>}
    </div>}
    {selected && <TraceEventDetail row={selected} run={run} onClose={() => setSelectedId('')}/>}
  </section>;
}
export function RunExecutionPanel({ waterfallOnly = false, run, issue, runs = [], comments = [], commentsError = '', commentsLoading = false, commentsIncomplete = false, commentWarnings = [], participants = [], agents = [], onInspect, onRetryComments, url, settings, observedRun, unavailable, runtimeStatus, now, ...transcript }) {
  const messages = transcript.waterfallMessages || transcript.messages || [];
  const historyTrimmed = transcript.waterfallTrimmed ?? transcript.trimmed;
  const trace = buildExecutionTrace({ run, messages, now, settings, observedRun, unavailable, runtimeStatus, partial: transcript.loading || transcript.hasMore || historyTrimmed || Boolean(transcript.error) });
  const exchange = runExchange({ run, runs, comments });
  const author = comment => comment?.authorType === 'member' ? participants.find(item => item.id === comment.authorId)?.name || '人员回复' : agents.find(item => item.id === comment?.authorId)?.name || '智能体回复';
  const last = messages.at(-1);
  const lastEntry = last && trace.events.find(row => row.entry?.result?.seq === last.seq || row.seq === last.seq || row.lastSeq === last.seq);
  const lastAction = last?.type === 'tool_use' ? `收到工具调用 · ${last.tool || '工具'}` : last?.type === 'tool_result' ? `收到工具${last.isError || last.is_error ? '错误返回' : '返回'} · ${lastEntry?.name || last.tool || '工具'}` : last?.type === 'thinking' ? '收到思考内容' : last?.type === 'text' ? '收到文字反馈' : last?.type === 'error' ? '收到错误记录' : last ? '收到执行事件' : '尚未收到执行消息';
  return <section className="mm-execution" aria-label="运行监控详情">
    <div className="mm-exec-summary"><strong>{run.agentName || agents.find(item => item.id === run.agentId)?.name || '智能体'}<span>{unavailable ? '状态待核实' : conversationStatusLabels[run.status] || run.status}</span></strong><dl>{(trace.metrics.waiting || trace.metrics.wait >= 60000) && <div><dt>{trace.metrics.waiting ? '等待启动' : '启动前等待'}</dt><dd>{shortDuration(trace.metrics.wait)}</dd></div>}{!trace.metrics.waiting && <div><dt>{trace.metrics.running ? '已运行' : '运行耗时'}</dt><dd>{shortDuration(trace.metrics.elapsed)}</dd></div>}</dl></div>
    <p className="mm-exec-last"><strong>最近确认</strong><span>{lastAction}{last ? ` · ${clock(last.createdAt)}` : ''}{transcript.error || transcript.hasMore || transcript.loading ? ' · 记录尚待核实' : ''}</span>{lastEntry?.kind === 'tool' && <span className="mm-exec-last-detail">{lastEntry.summary.slice(0, 160)}</span>}</p>
    {unavailable && <p className="mm-exec-error" role="alert">运行状态暂无法同步，当前显示上次记录，动态计时已暂停。</p>}
    {!unavailable && (trace.metrics.stateConflict || trace.metrics.observationLost) && <p className="mm-exec-error" role="status">运行信息正在核实，动态计时和无进展判断已暂停。</p>}
    {!unavailable && runtimeStatus === 'offline' && trace.metrics.active && <p className="mm-exec-error" role="status">运行时离线，暂不判断无进展或工具等待。</p>}
    {trace.metrics.alerts.length > 0 && <p className="mm-exec-attention" role="status">{trace.metrics.alerts.map(value => value === '较久未收到新反馈' ? '较久未观察到新进展' : value).join(' · ')}{trace.metrics.silence != null ? ` · 持续 ${shortDuration(trace.metrics.silence)}未观察到新进展` : ''}</p>}
    {!waterfallOnly && <div className="mm-exec-io">
      <section><h3>本轮输入</h3><p className="mm-exec-note">{issue.identifier} · {issue.title}</p>{exchange.input ? <><p className="mm-exec-source">{author(exchange.input)} · {clock(exchange.input.createdAt)}</p><TextBlock value={exchange.input.deleted ? '触发消息已删除' : exchange.input.content} empty="触发消息没有正文"/>{exchange.input.contentTruncated && <p className="mm-exec-note">触发消息已截断</p>}</> : run.triggerCommentId && <p className="mm-exec-note">{commentsLoading ? '正在读取触发消息…' : commentsError ? '触发消息暂时读取失败' : '关联的触发消息未在当前记录中返回'}</p>}
        {run.triggerSummary ? <details open={!exchange.input}><summary>本轮触发摘要</summary><ReadableText text={run.triggerSummary} limit={180}/></details> : !exchange.input && !run.triggerCommentId && <p className="mm-exec-note">本次运行未提供触发摘要或关联评论。</p>}
        <p className="mm-exec-note mm-exec-boundary">以上来自任务触发记录；完整 CLI 提示词未提供。</p>
      </section>
      <section><h3>本轮输出</h3>{commentsLoading && !exchange.outputs.length ? <p className="mm-exec-note">正在读取正式回复…</p> : exchange.outputs.length ? exchange.outputs.map(comment => <div key={comment.id} className="mm-exec-published"><p className="mm-exec-source">正式回复 · {clock(comment.createdAt)}</p><TextBlock value={comment.deleted ? '这条正式回复已删除' : comment.content} empty={comment.attachmentCount ? '此回复包含附件，请在 Multica 查看。' : '（空回复）'}/>{comment.contentTruncated && <p className="mm-exec-note">回复内容已截断</p>}</div>) : <p className="mm-exec-note">{commentsError ? '正式回复暂时无法读取。' : trace.metrics.active ? '尚未读到本轮发布的正式回复，可展开执行记录查看过程反馈。' : run.error ? `运行未成功结束：${run.error}` : '当前记录中没有与本次运行明确关联的正式回复，可展开执行记录查看文字反馈。'}</p>}
        {exchange.next.length > 0 && <div className="mm-exec-next"><h4>后续关联运行</h4>{exchange.next.map(next => <button key={next.id} onClick={() => onInspect(next.id)}>{next.agentName || '智能体'} · {conversationStatusLabels[next.status] || next.status} · #{next.id.slice(-8)}</button>)}</div>}
        {url && <a className="mm-exec-origin" href={url} target="_blank" rel="noreferrer">在 Multica 查看任务</a>}
      </section>
    </div>}
    <div className="v2-evidence-section"><div className="v2-section-title"><h3>{waterfallOnly ? '执行过程与耗时' : '执行证据'}</h3><span>{waterfallOnly ? '日志时间瀑布图与逐条证据' : '原始过程记录，按需展开'}</span></div>
    {waterfallOnly && <RunWaterfall key={run.id} run={run} issue={issue} messages={transcript.waterfallMessages || messages} partial={transcript.loading || transcript.hasMore || (transcript.waterfallTrimmed ?? transcript.trimmed) || Boolean(transcript.error)} loading={transcript.loading || transcript.hasMore} error={transcript.error} onRetry={transcript.onRetry}/>} 
    <ExecutionEvidence trace={trace} run={run} {...transcript} trimmed={historyTrimmed}/>
    </div>
    {commentsError && <div className="mm-exec-error" role="alert">输入输出同步失败，已保留读取的内容。<button onClick={onRetryComments}>重新读取</button></div>}
    {commentsIncomplete && <p className="mm-exec-note">任务评论未完整返回，输入与正式输出可能缺失。</p>}
    <details className="mm-exec-notes"><summary>数据范围与时间说明</summary><p>正式输出仅关联本任务、本智能体且来源运行 ID 匹配的评论。记录时间不代表工具或模型请求耗时；未收到结果不代表工具仍在执行。</p>{[...(transcript.warnings || []), ...commentWarnings].map((warning, index) => <p key={index}>{warning}</p>)}</details>
  </section>;
}

export function RunExecution({ api, run, revision, ...props }) {
  const transcript = useRunTranscript({ api, run, revision });
  const [now, setNow] = useState(Date.now()), [comments, setComments] = useState({ comments: [], warnings: [] }), [members, setMembers] = useState([]), [loading, setLoading] = useState(true), [error, setError] = useState(''), [retry, setRetry] = useState(0);
  useEffect(() => { const timer = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(timer); }, []);
  useEffect(() => {
    let live = true, timer; const controller = new AbortController();
    const sync = async () => { try { if (document.visibilityState === 'hidden') return; const result = await api('runComments', { issueId: run.issueId }, controller.signal); if (live) { setComments(result); setError(''); } } catch (reason) { if (live) setError(reason.message || '读取失败'); } finally { if (live) { setLoading(false); timer = setTimeout(sync, 5000); } } };
    void sync(); api('participants', {}, controller.signal).then(result => { if (live) setMembers(result.members); }).catch(() => {});
    return () => { live = false; controller.abort(); clearTimeout(timer); };
  }, [api, run.issueId, revision, retry]);
  return <RunExecutionPanel {...props} {...transcript} run={run} now={now} comments={comments.comments} commentWarnings={comments.warnings} commentsIncomplete={comments.incomplete} commentsError={error} commentsLoading={loading} participants={members} onRetryComments={() => setRetry(value => value + 1)}/>;
}

