import {TypeIcon,AgentAvatar} from './ui-icons.jsx';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { activeRunStates, conversationActivity, conversationEntries, mergeConversation, printable, shortDuration, toolSummary } from './run-conversation.mjs';
import { createWorkProgressState, ingestWorkMessages, snapshotWorkProgress } from './work-progress.mjs';
import { WorkProgressView } from './work-progress-view.jsx';

const clock = value => value && Number.isFinite(Date.parse(value)) ? new Date(value).toLocaleTimeString('zh-CN', { hour12: false }) : '时间未提供';
const inline = text => text.split(/(\*\*[^*\n]+\*\*|`[^`\n]+`|\[[^\]\n]+\]\([^\s)]+\))/g).map((part, i) => {
  if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
  if (part.startsWith('`') && part.endsWith('`')) return <code key={i}>{part.slice(1, -1)}</code>;
  const link = part.match(/^\[([^\]]+)\]\(([^\s)]+)\)$/);
  if (link) {
    try { const url = new URL(link[2]); if (['http:', 'https:'].includes(url.protocol)) return <a key={i} href={url.href} target="_blank" rel="noreferrer">{link[1]}</a>; } catch { /* Unsupported links remain text. */ }
    return <span key={i}>{link[1]}</span>;
  }
  return part;
});

export function ReadableText({ text = '', limit = 5000 }) {
  const [expanded, setExpanded] = useState(false);
  const boundary = text.lastIndexOf('\n\n', limit);
  const shown = text.length > limit && !expanded ? text.slice(0, boundary > limit / 2 ? boundary : limit) : text;
  const blocks = shown.split(/(```[\s\S]*?(?:```|$))/g).filter(Boolean).map((block, i) => {
    if (block.startsWith('```')) return <pre key={i}>{block.replace(/^```[^\n]*\n?/, '').replace(/```$/, '')}</pre>;
    const lines = block.split('\n'), nodes = [];
    const cells = line => line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(cell => cell.trim());
    for (let j = 0; j < lines.length; j++) {
      const line = lines[j];
      if (line.includes('|') && lines[j + 1]?.includes('|') && cells(lines[j + 1]).every(cell => /^:?-{3,}:?$/.test(cell))) {
        const headings = cells(line), rows = [], key = j;
        j += 2;
        while (j < lines.length && lines[j].includes('|') && lines[j].trim()) { rows.push(cells(lines[j])); j++; }
        j--;
        nodes.push(<div className="mm-chat-table-wrap" key={key}><table><thead><tr>{headings.map((cell, k) => <th key={k}>{inline(cell)}</th>)}</tr></thead><tbody>{rows.map((row, k) => <tr key={k}>{headings.map((_, n) => <td key={n}>{inline(row[n] || '')}</td>)}</tr>)}</tbody></table></div>);
      } else if (/^#{1,6}\s/.test(line)) nodes.push(<h4 key={j}>{inline(line.replace(/^#{1,6}\s+/, ''))}</h4>);
      else if (/^\s*(?:[-*]|\d+[.)])\s/.test(line)) nodes.push(<div className="mm-chat-list-line" key={j}><span aria-hidden="true">{line.trim().match(/^\d+[.)]/)?.[0] || '•'}</span><span>{inline(line.replace(/^\s*(?:[-*]|\d+[.)])\s+/, ''))}</span></div>);
      else if (/^>\s?/.test(line)) nodes.push(<blockquote key={j}>{inline(line.replace(/^>\s?/, ''))}</blockquote>);
      else if (line.trim()) nodes.push(<p key={j}>{inline(line)}</p>);
      else nodes.push(<div className="mm-chat-paragraph-gap" key={j}/>);
    }
    return <div key={i}>{nodes}</div>;
  });
  return <div className="mm-chat-prose">{blocks}{text.length > limit && <button className="mm-chat-text-action" onClick={() => setExpanded(value => !value)}>{expanded ? '收起长内容' : '展开完整内容'}</button>}</div>;
}

function Payload({ label, value, note }) {
  return <section className="mm-chat-payload"><div><strong><TypeIcon type={label==='调用参数'?'tool_use':'tool_result'} size={14}/>{label}</strong>{note && <span>{note}</span>}</div><pre>{printable(value) || '（空输出）'}</pre></section>;
}

export function ConversationEntry({ entry, agentName, located }) {
  const marker = { 'data-seq': entry.seq, 'data-located': located || undefined, tabIndex: located ? -1 : undefined };
  if (entry.kind === 'tool') {
    const { call, result } = entry;
    const failed = result?.isError === true;
    const unidentified = !(call?.callId || result?.callId);
    const label = unidentified ? result ? '返回记录' : '调用记录' : entry.ambiguous ? '配对待核实' : result ? failed ? '返回错误' : '已返回' : '结果尚未收到';
    return <article className="mm-chat-event mm-chat-tool-event" {...marker}>
      <span className="mm-chat-avatar is-tool" aria-hidden="true"><TypeIcon type="tool" isError={failed} size={18}/></span>
      <details className="mm-chat-tool" data-failed={failed || undefined}>
        <summary><span className="mm-chat-tool-heading"><strong>{call?.tool || result?.tool || '工具结果'}</strong><span className="mm-chat-chip" data-tone={failed ? 'error' : unidentified ? 'neutral' : result ? 'returned' : 'pending'}><TypeIcon type={result?'tool_result':'wait'} isError={failed} size={12}/>{label}</span><time>{clock(call?.createdAt || result?.createdAt)}</time></span><span className="mm-chat-tool-preview">{toolSummary(entry)}</span></summary>
        <div className="mm-chat-tool-body">
          {call?.input != null && <Payload label="调用参数" value={call.input} note={call.inputTruncated ? '输入已截断' : undefined}/>}
          {result && <Payload label="返回内容" value={result.output || result.content} note={result.outputTruncated === true ? '输出已截断' : result.outputTruncated == null ? '输出完整性未提供' : undefined}/>}
          {unidentified ? <p className="mm-chat-note">服务端未提供关联标识，调用与返回分别展示。</p> : !result && <p className="mm-chat-note">已收到调用记录，尚未收到对应结果；不代表工具此刻仍在执行。</p>}
          {entry.ambiguous && !unidentified && <p className="mm-chat-note">调用与结果无法唯一配对，按独立记录展示。</p>}
          <div className="mm-chat-evidence">{call && <span>调用 #{call.seq} · {clock(call.createdAt)}</span>}{result && <span>返回 #{result.seq} · {clock(result.createdAt)}</span>}</div>
        </div>
      </details>
    </article>;
  }
  const message = entry.message, thinking = entry.kind === 'thinking', failure = entry.kind === 'error';
  const content = message.content || message.output || '';
  return <article className={`mm-chat-event ${failure ? 'is-error' : ''}`} {...marker}>
    <span className={`mm-chat-avatar ${thinking ? 'is-thinking' : ''}`} aria-hidden="true">{thinking||failure||entry.kind!=='text'?<TypeIcon type={entry.kind} isError={failure} size={18}/>:<AgentAvatar name={agentName} size={24}/>}</span>
    <div className="mm-chat-message"><header><strong>{entry.kind==='text'&&<TypeIcon type="text" size={14}/>} {failure ? '执行错误' : thinking ? '思考记录' : entry.kind === 'text' ? agentName || '智能体' : '执行事件'}</strong><time>{clock(entry.lastAt || message.createdAt)}</time><span>#{message.seq}{entry.lastSeq ? `–${entry.lastSeq}` : ''}</span></header>
      {thinking ? <details className="mm-chat-thinking"><summary>{content.trim().split('\n')[0]?.slice(0, 90) || '查看思考内容'}</summary><ReadableText text={content}/></details> : <ReadableText text={content || '服务端未提供事件正文'}/>}
      {message.contentTruncated && <p className="mm-chat-note">内容已截断</p>}
    </div>
  </article>;
}

function entryContainsSequence(entry, seq) {
  return entry.seq === seq || entry.result?.seq === seq || (entry.seq < seq && seq <= entry.lastSeq);
}

export function ConversationPanel({ run, issue, agentName, messages, loading, error, hasMore, trimmed, warnings = [], updated, unavailable, onRetry, work, progress, canShowWaiting, readEvidence }) {
  const [now, setNow] = useState(Date.now()), [following, setFollowing] = useState(true), [query, setQuery] = useState('');
  const [location, setLocation] = useState(null);
  const feed = useRef(null), acknowledged = useRef(0);
  const evidenceRequest = useRef(null);
  const status = conversationActivity({ messages, run, loading, error, hasMore, unavailable, now });
  const { entries } = useMemo(() => {
    if (!location?.messages?.length) return conversationEntries(messages);
    const bySeq = new Map(location.messages.map(message => [message.seq, message]));
    for (const message of messages) bySeq.set(message.seq, message);
    return conversationEntries([...bySeq.values()].sort((a, b) => a.seq - b.seq));
  }, [messages, location?.messages]);
  const locatedEntry = location && entries.find(entry => entryContainsSequence(entry, location.seq));
  const lastSeq = messages.at(-1)?.seq || 0;
  const visible = query.trim() ? entries.filter(entry => printable(entry).toLowerCase().includes(query.trim().toLowerCase())) : entries;
  const unseen = messages.filter(message => message.seq > acknowledged.current).length;
  useEffect(() => { const timer = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(timer); }, []);
  useEffect(() => {
    if (following && !query && feed.current) {
      feed.current.scrollTop = feed.current.scrollHeight; acknowledged.current = lastSeq;
      const frame = requestAnimationFrame(() => { if (feed.current) feed.current.scrollTop = feed.current.scrollHeight; });
      return () => cancelAnimationFrame(frame);
    }
  }, [lastSeq, following, query]);
  useEffect(() => () => evidenceRequest.current?.abort(), []);
  useEffect(() => {
    if (!location || location.loading || !locatedEntry) return;
    const row = feed.current?.querySelector(`[data-seq="${locatedEntry.seq}"]`);
    const disclosure = row?.querySelector('details');
    if (disclosure) disclosure.open = true;
    row?.focus({ preventScroll: true });
    row?.scrollIntoView({ block: 'nearest' });
  }, [location, locatedEntry?.seq]);

  const clearLocation = () => { evidenceRequest.current?.abort(); setLocation(null); };
  const locate = async ({ seq, useSeq }) => {
    clearLocation();
    setFollowing(false);
    setQuery('');
    const controller = new AbortController();
    evidenceRequest.current = controller;
    const requested = [...new Set([seq, useSeq].filter(value => Number.isSafeInteger(value) && value > 0))];
    const loaded = requested.map(value => messages.find(message => message.seq === value) ||
      location?.messages?.find(message => message.seq === value)).filter(Boolean);
    const missing = requested.filter(value => !loaded.some(message => message.seq === value));
    setLocation({ seq, useSeq, messages: loaded, loading: Boolean(missing.length) });
    if (!missing.length) return;
    const results = await Promise.allSettled(missing.map(value => readEvidence(value, controller.signal)));
    if (controller.signal.aborted) return;
    const extra = results.filter(result => result.status === 'fulfilled').map(result => result.value);
    setLocation({ seq, useSeq, messages: [...loaded, ...extra], error: results.some(result => result.status === 'rejected') });
  };
  const pause = () => { if (following) { acknowledged.current = lastSeq; setFollowing(false); } };
  const latest = () => { clearLocation(); setQuery(''); acknowledged.current = lastSeq; setFollowing(true); if (feed.current) feed.current.scrollTop = feed.current.scrollHeight; };
  return <section className="mm-conversation" aria-label="执行过程">
    <WorkProgressView work={work} progress={progress} showWaiting={canShowWaiting && !status.uncertain} logsCaughtUp={!status.uncertain} onEvidence={locate}/>
    <div className="mm-chat-current" data-uncertain={status.uncertain || undefined}>
      <span className="mm-chat-state-dot" aria-hidden="true"/>
      <div>
        <strong>最近反馈</strong>
        <p>{status.lastAction}{status.lastAt ? ` · ${clock(status.lastAt)}` : ''}</p>
        {status.active && !status.uncertain && status.silence != null && <p>无新消息 {shortDuration(status.silence)}</p>}
      </div>
      {(status.uncertain || status.active) && <details><summary>状态说明</summary><p>{status.detail}</p></details>}
    </div>
    {error && <div role="alert" className="mm-chat-alert">{error}<button onClick={onRetry}>重新连接</button></div>}
    <div className="mm-chat-toolbar"><input aria-label="搜索执行消息" placeholder="搜索回复、工具或输出…" value={query} onChange={event => { pause(); clearLocation(); setQuery(event.target.value); }}/><button aria-pressed={following && !query} onClick={() => following ? pause() : latest()}>{following && !query ? '暂停跟随' : '跟随最新'}</button><button onClick={() => { pause(); clearLocation(); setQuery(''); if (feed.current) feed.current.scrollTop = 0; }}>回到开头</button></div>
    {(trimmed || status.partial) && <p className="mm-chat-note mm-chat-coverage">{trimmed ? '当前窗口保留最近 1000 条以内、最多 8 MB 的消息。' : '消息序号存在缺口。'} 部分较早记录可能未展示。</p>}
    {location && <div className="mm-chat-location">
      <span role="status">{location.loading ? `正在读取日志 #${location.seq}…` : location.error ? `日志 #${location.seq} 的部分证据暂未读到` : `已定位日志 #${location.seq}`}</span>
      {location.error && <button onClick={() => void locate(location)}>重试读取</button>}
      <button onClick={clearLocation}>清除定位</button>
    </div>}
    <div className="mm-chat-feed" data-filtered={Boolean(query.trim()) || undefined} ref={feed} tabIndex={0} aria-label="执行消息列表" onWheel={event => { if (event.deltaY < 0) pause(); }} onTouchMove={pause} onKeyDown={event => { if (['ArrowUp', 'PageUp', 'Home'].includes(event.key)) pause(); }} onPointerDown={event => { if (event.target === feed.current) pause(); }} onClick={event => { if (event.target.closest('summary,button')) pause(); }}>
      {!query && <article className="mm-chat-context"><span className="mm-chat-context-label">任务上下文 <span>{issue?.identifier}</span></span><h3>{issue?.title || '任务标题未提供'}</h3>{run.triggerSummary && <details><summary>本次触发摘要</summary><ReadableText text={run.triggerSummary}/></details>}<p>来自 Multica 的任务与触发记录，完整 CLI 提示词未提供。</p></article>}
      {visible.map(entry => <ConversationEntry key={entry.seq} entry={entry} agentName={agentName} located={entry === locatedEntry}/>)}
      {!visible.length && <div className="mm-chat-empty"><span aria-hidden="true">{query ? '⌕' : '…'}</span><strong>{query ? '没有匹配的执行记录' : loading ? '正在读取执行过程' : error ? '暂时无法读取执行记录' : '尚未收到执行消息'}</strong><p>{query ? '试试工具名称、命令或回复中的关键词。' : loading || error ? '等待从 Multica 读取本次运行的记录。' : activeRunStates.has(run.status) ? '收到新消息后会自动显示在这里。' : '这次运行没有返回可展示的消息。'}</p></div>}
      {!query && messages.length > 0 && <div className="mm-chat-end">{hasMore ? '正在补齐更早的记录…' : status.active ? '等待下一条执行消息' : '本次已读取的记录到此结束'}</div>}
    </div>
    <div className="mm-chat-bottom"><span>{hasMore ? '正在补齐历史' : query.trim() ? `找到 ${visible.length} 条 · 当前窗口 ${entries.length} 条` : `${entries.length} 条过程记录`} · {following && !query ? '跟随最新' : '正在阅读历史'}</span><button onClick={latest}>{!following && unseen > 0 ? `${unseen} 条新消息 · ` : ''}回到最新 ↓</button></div>
    <div className="mm-chat-source"><span>来自 Multica 执行消息 · 每 2 秒同步</span><span>{updated ? `检查于 ${clock(updated)}` : '等待首次同步'}</span></div>
    {warnings.length > 0 && <details className="mm-chat-notices"><summary>记录完整性说明</summary>{warnings.map((warning, i) => <p key={i}>{warning}</p>)}</details>}
  </section>;
}

export function useRunTranscript({ api, run, revision, enabled = true, trackProgress = false }) {
  const [data, setData] = useState({ messages: [], waterfallMessages: [], waterfallTrimmed: false, hasMore: true, trimmed: false, warnings: [] });
  const [loading, setLoading] = useState(true), [error, setError] = useState(''), [updated, setUpdated] = useState(''), [retry, setRetry] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    let live = true, timer, cursor = 0;
    const controller = new AbortController();
    const progressState = trackProgress ? createWorkProgressState() : null;
    setData({ messages: [], waterfallMessages: [], waterfallTrimmed: false, hasMore: true, trimmed: false, warnings: [] }); setLoading(true); setError(''); setUpdated('');
    const sync = async () => {
      let delay = 2000;
      try {
        if (document.visibilityState === 'hidden') return;
        const result = await api('messages', { taskId: run.id, since: cursor }, controller.signal);
        if (!live) return;
        if (result.hasMore && result.lastSeq <= cursor) throw new Error('消息读取未能前进，请重新连接');
        cursor = result.lastSeq;
        if (progressState) ingestWorkMessages(progressState, result.messages);
        // Track pending calls separately from live status, which can change between log reads.
        const work = progressState && snapshotWorkProgress(progressState, { status: 'running', logsCaughtUp: !result.hasMore });
        setData(previous => {
          const merged = mergeConversation(previous.messages, result.messages);
          const history = mergeConversation(previous.waterfallMessages, result.messages, 10000);
          return { ...result, ...merged, work, waterfallMessages: history.messages, waterfallTrimmed: previous.waterfallTrimmed || history.trimmed, trimmed: previous.trimmed || merged.trimmed, warnings: [...new Set([...previous.warnings, ...(result.warnings || []).filter(w => !w.includes('继续加载'))])].slice(-8) };
        });
        setError(''); setUpdated(new Date().toISOString());
        if (result.hasMore) delay = 100;
      } catch (reason) { if (live) setError(reason.message || '执行消息读取失败'); }
      finally { if (live) { setLoading(false); timer = setTimeout(sync, delay); } }
    };
    void sync();
    return () => { live = false; controller.abort(); clearTimeout(timer); };
  }, [api, run.id, revision, retry, enabled, trackProgress]);
  return { ...data, loading, error, updated, onRetry: () => setRetry(value => value + 1) };
}

export function RunConversation({ api, run, issue, agentName, revision, observedRun, runtimeStatus, unavailable = false }) {
  const data = useRunTranscript({ api, run, revision, trackProgress: true });
  const canShowWaiting = run.status === 'running' && runtimeStatus !== 'offline' &&
    (!observedRun || (observedRun.status === run.status && !observedRun.observationError && !observedRun.logError));
  const readEvidence = async (seq, signal) => {
    const cached = data.waterfallMessages.find(message => message.seq === seq);
    if (cached) return cached;
    const batch = await api('messages', { taskId: run.id, since: seq - 1 }, signal);
    const match = batch.messages.find(message => message.seq === seq);
    if (!match) throw new Error(`服务端未返回日志 #${seq}`);
    return match;
  };
  return <ConversationPanel {...data} run={run} issue={issue} agentName={agentName} unavailable={unavailable}
    progress={observedRun?.progress} canShowWaiting={canShowWaiting} readEvidence={readEvidence}/>;
}
