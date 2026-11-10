import React, { useEffect, useRef, useState } from 'react';
import { createWorkProgressState, ingestWorkMessages, snapshotWorkProgress } from './work-progress.mjs';
import { WorkProgressView } from './work-progress-view.jsx';
import { createActivityState, ingestActivityMessages, snapshotActivity } from './work-activity.mjs';
import { WorkActivityView } from './work-activity-view.jsx';

const time = value => value && Number.isFinite(Date.parse(value)) ? new Date(value).toLocaleString('zh-CN', { hour12: false }) : '时间未提供';
const text = value => typeof value === 'string' ? value : value == null ? '' : JSON.stringify(value, null, 2);

export function LogMessage({ message, expand = false }) {
  return <article className="mm-message">
    <div className="mm-message-head"><span>#{message.seq} · {message.type}{message.tool ? ` · ${message.tool}` : ''}</span><time>{time(message.createdAt)}</time></div>
    {message.content && <pre>{text(message.content)}</pre>}
    {message.input != null && <details open={expand || undefined}><summary>工具输入</summary><pre>{text(message.input)}</pre></details>}
    {(message.output || message.type === 'tool_result') && <details open={expand || undefined}><summary>工具输出{message.outputTruncated === true ? '（已截断）' : message.outputTruncated == null ? '（完整性未知）' : ''}</summary><pre>{text(message.output) || '（空输出）'}</pre></details>}
  </article>;
}

function EvidenceReader({ api, taskId, selection, revision, onClose }) {
  const [messages, setMessages] = useState([]), [error, setError] = useState(''), [loading, setLoading] = useState(true), [retry, setRetry] = useState(0);
  const panel = useRef(null);
  useEffect(() => {
    let live = true;
    const controller = new AbortController();
    setLoading(true); setError(''); setMessages([]);
    const sequences = [...new Set([selection.useSeq, selection.seq].filter(seq => Number.isInteger(seq) && seq > 0))].sort((a, b) => a - b);
    void Promise.all(sequences.map(async seq => {
      const batch = await api('messages', { taskId, since: seq - 1 }, controller.signal);
      const message = batch.messages.find(item => item.seq === seq);
      if (!message) throw new Error(`服务端未返回日志 #${seq}，记录可能已清理`);
      return message;
    })).then(result => { if (live) setMessages(result); }).catch(reason => { if (live) setError(reason.message || '证据读取失败'); }).finally(() => { if (live) setLoading(false); });
    panel.current?.focus({ preventScroll: true });
    panel.current?.scrollIntoView({ block: 'nearest' });
    return () => { live = false; controller.abort(); };
  }, [api, taskId, selection, revision, retry]);
  return <section className="mm-selected-evidence" aria-label="原始证据" tabIndex={-1} ref={panel}>
    <div className="mm-section-heading"><h4>原始证据 · #{selection.seq}</h4><button type="button" onClick={onClose}>收起证据</button></div>
    {loading && <p role="status">正在读取原始记录…</p>}
    {error && <p role="alert" className="mm-error">{error}。<button type="button" onClick={() => setRetry(value => value + 1)}>重试读取</button></p>}
    <div className="mm-evidence-content">{messages.map(message => <LogMessage key={message.seq} message={message} expand/>)}</div>
  </section>;
}

export function RunMessages({ api, run, revision, observedRun }) {
  const [data, setData] = useState({ messages: [], lastSeq: 0, hasMore: true });
  const [error, setError] = useState(''), [loading, setLoading] = useState(true), [updated, setUpdated] = useState('');
  const [selection, setSelection] = useState(null);
  const workState = useRef(createWorkProgressState());
  const activityState = useRef(createActivityState());
  useEffect(() => {
    let live = true, timer, cursor = 0;
    const controller = new AbortController();
    workState.current = createWorkProgressState();
    activityState.current = createActivityState();
    setData({ messages: [], lastSeq: 0, hasMore: true }); setError(''); setLoading(true); setUpdated(''); setSelection(null);
    const sync = async () => {
      try {
        if (document.visibilityState === 'hidden') return;
        const result = await api('messages', { taskId: run.id, since: cursor }, controller.signal);
        if (!live) return;
        cursor = result.lastSeq;
        ingestWorkMessages(workState.current, result.messages);
        ingestActivityMessages(activityState.current, result.messages);
        setData(previous => {
          const merged = new Map(previous.messages.map(message => [message.seq, message]));
          for (const message of result.messages) merged.set(message.seq, message);
          const all = [...merged.values()].sort((a, b) => a.seq - b.seq);
          return { ...result, messages: all.slice(-300), truncated: result.truncated || previous.truncated || all.length > 300 };
        });
        setUpdated(new Date().toISOString()); setError('');
      } catch (reason) { if (live) setError(reason.message || '日志读取失败'); }
      finally { if (live) { setLoading(false); timer = setTimeout(sync, 2000); } }
    };
    void sync();
    return () => { live = false; clearTimeout(timer); controller.abort(); };
  }, [api, run.id, revision]);
  const observedStatus = error || observedRun?.observationError || observedRun?.logError ? 'unknown' : observedRun?.status || run.status;
  const work = snapshotWorkProgress(workState.current, { status: observedStatus, progress: observedRun?.progress, logsCaughtUp: !loading && !error && !data.hasMore });
  const activity = snapshotActivity(activityState.current, { status: observedStatus, logsCaughtUp: !loading && !error && !data.hasMore });
  return <>
    <WorkProgressView work={work} progress={observedRun?.progress} onEvidence={setSelection} loading={loading} error={error}/>
    <WorkActivityView activity={activity} onEvidence={setSelection}/>
    {selection && <EvidenceReader api={api} taskId={run.id} selection={selection} revision={revision} onClose={() => setSelection(null)}/>}
    <details className="mm-log-section mm-raw-log-section"><summary>Multica 执行消息 <span className="mm-muted">{updated ? `同步于 ${time(updated)}` : '每 2 秒同步'}</span></summary>
      {data.truncated && <p className="mm-muted">当前仅保留最近 300 条已读取消息；计划证据仍可单独读取。</p>}
      {data.hasMore && <p className="mm-muted">正在继续补齐历史记录，清单可能不完整。</p>}
      {data.warnings?.map((warning, index) => <p className="mm-muted" key={index}>{warning}</p>)}
      {!data.messages.length && <p className="mm-muted">{loading ? '正在读取…' : error ? '日志暂时不可用' : '这次运行还没有日志'}</p>}
      <div className="mm-logs">{data.messages.map(message => <LogMessage key={message.seq} message={message}/>)}</div>
    </details>
  </>;
}
