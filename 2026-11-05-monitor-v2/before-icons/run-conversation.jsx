import React, { useEffect, useRef, useState } from 'react';
import { activeRunStates, conversationActivity, conversationEntries, conversationStatusLabels, mergeConversation, printable, shortDuration, toolSummary } from './run-conversation.mjs';

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
  return <section className="mm-chat-payload"><div><strong>{label}</strong>{note && <span>{note}</span>}</div><pre>{printable(value) || '（空输出）'}</pre></section>;
}

export function ConversationEntry({ entry, agentName }) {
  if (entry.kind === 'tool') {
    const { call, result } = entry;
    const failed = result?.isError === true;
    const unidentified = !(call?.callId || result?.callId);
    const label = unidentified ? result ? '返回记录' : '调用记录' : entry.ambiguous ? '配对待核实' : result ? failed ? '返回错误' : '已返回' : '结果尚未收到';
    return <article className="mm-chat-event mm-chat-tool-event" data-seq={entry.seq}>
      <span className="mm-chat-avatar is-tool" aria-hidden="true">⌘</span>
      <details className="mm-chat-tool" data-failed={failed || undefined}>
        <summary><span className="mm-chat-tool-heading"><strong>{call?.tool || result?.tool || '工具结果'}</strong><span className="mm-chat-chip" data-tone={failed ? 'error' : unidentified ? 'neutral' : result ? 'returned' : 'pending'}>{label}</span><time>{clock(call?.createdAt || result?.createdAt)}</time></span><span className="mm-chat-tool-preview">{toolSummary(entry)}</span></summary>
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
  return <article className={`mm-chat-event ${failure ? 'is-error' : ''}`} data-seq={entry.seq}>
    <span className={`mm-chat-avatar ${thinking ? 'is-thinking' : ''}`} aria-hidden="true">{failure ? '!' : thinking ? '···' : (agentName || '智能体').slice(0, 1)}</span>
    <div className="mm-chat-message"><header><strong>{failure ? '执行错误' : thinking ? '思考记录' : entry.kind === 'text' ? agentName || '智能体' : '执行事件'}</strong><time>{clock(entry.lastAt || message.createdAt)}</time><span>#{message.seq}{entry.lastSeq ? `–${entry.lastSeq}` : ''}</span></header>
      {thinking ? <details className="mm-chat-thinking"><summary>{content.trim().split('\n')[0]?.slice(0, 90) || '查看思考内容'}</summary><ReadableText text={content}/></details> : <ReadableText text={content || '服务端未提供事件正文'}/>}
      {message.contentTruncated && <p className="mm-chat-note">内容已截断</p>}
    </div>
  </article>;
}

export function ConversationPanel({ run, issue, agentName, messages, loading, error, hasMore, trimmed, warnings = [], updated, unavailable, onRetry }) {
  const [now, setNow] = useState(Date.now()), [following, setFollowing] = useState(true), [query, setQuery] = useState('');
  const feed = useRef(null), acknowledged = useRef(0);
  const status = conversationActivity({ messages, run, loading, error, hasMore, unavailable, now });
  const { entries } = conversationEntries(messages);
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
  const pause = () => { if (following) { acknowledged.current = lastSeq; setFollowing(false); } };
  const latest = () => { setQuery(''); acknowledged.current = lastSeq; setFollowing(true); if (feed.current) feed.current.scrollTop = feed.current.scrollHeight; };
  return <section className="mm-conversation" aria-label="执行对话">
    <div className="mm-chat-overview"><div className="mm-chat-status-line"><span className="mm-chat-chip" data-tone={run.status === 'failed' ? 'error' : run.status === 'completed' ? 'returned' : 'pending'}>{unavailable ? '状态待核实' : conversationStatusLabels[run.status] || run.status}</span><strong>{agentName || '智能体'}</strong><span className="mm-chat-run-id">{run.id.slice(-8)}</span></div><div className="mm-chat-facts"><span>{status.active ? '已运行' : '运行耗时'} <strong>{shortDuration(status.elapsed)}</strong></span><span>最近反馈 <strong>{status.lastAt ? clock(status.lastAt) : '暂无'}</strong></span>{status.active && !status.uncertain && <span>无新消息 <strong>{shortDuration(status.silence)}</strong></span>}</div></div>
    <div className="mm-chat-current" data-uncertain={status.uncertain || undefined}><span className="mm-chat-state-dot"/><div><strong>{status.title}</strong><p>{status.lastAction}</p></div><details><summary aria-label="状态说明">说明</summary><p>{status.detail}</p></details></div>
    {error && <div role="alert" className="mm-chat-alert">{error}<button onClick={onRetry}>重新连接</button></div>}
    <div className="mm-chat-toolbar"><input aria-label="搜索执行对话" placeholder="搜索回复、工具或输出…" value={query} onChange={event => { pause(); setQuery(event.target.value); }}/><button aria-pressed={following && !query} onClick={() => following ? pause() : latest()}>{following && !query ? '暂停跟随' : '跟随最新'}</button><button onClick={() => { pause(); setQuery(''); if (feed.current) feed.current.scrollTop = 0; }}>回到开头</button></div>
    {(trimmed || status.partial) && <p className="mm-chat-note mm-chat-coverage">{trimmed ? '当前窗口保留最近 1000 条以内、最多 8 MB 的消息。' : '消息序号存在缺口。'} 部分较早记录可能未展示。</p>}
    <div className="mm-chat-feed" ref={feed} tabIndex={0} aria-label="执行消息列表" onWheel={event => { if (event.deltaY < 0) pause(); }} onTouchMove={pause} onKeyDown={event => { if (['ArrowUp', 'PageUp', 'Home'].includes(event.key)) pause(); }} onPointerDown={event => { if (event.target === feed.current) pause(); }} onClick={event => { if (event.target.closest('summary,button')) pause(); }}>
      {!query && <article className="mm-chat-context"><span className="mm-chat-context-label">任务上下文 <span>{issue?.identifier}</span></span><h3>{issue?.title || '任务标题未提供'}</h3>{run.triggerSummary && <details><summary>本次触发摘要</summary><ReadableText text={run.triggerSummary}/></details>}<p>来自 Multica 的任务与触发记录，完整 CLI 提示词未提供。</p></article>}
      {visible.map(entry => <ConversationEntry key={entry.seq} entry={entry} agentName={agentName}/>)}
      {!visible.length && <div className="mm-chat-empty"><span aria-hidden="true">{query ? '⌕' : '…'}</span><strong>{query ? '没有匹配的执行记录' : loading ? '正在读取执行过程' : error ? '暂时无法读取执行记录' : '尚未收到执行消息'}</strong><p>{query ? '试试工具名称、命令或回复中的关键词。' : loading || error ? '等待从 Multica 读取本次运行的记录。' : activeRunStates.has(run.status) ? '收到新消息后会自动显示在这里。' : '这次运行没有返回可展示的消息。'}</p></div>}
      {!query && messages.length > 0 && <div className="mm-chat-end">{hasMore ? '正在补齐更早的记录…' : status.active ? '等待下一条执行消息' : '本次已读取的记录到此结束'}</div>}
    </div>
    <div className="mm-chat-bottom"><span>{hasMore ? '正在补齐历史' : `${entries.length} 条过程记录`} · {following && !query ? '跟随最新' : '正在阅读历史'}</span><button onClick={latest}>{!following && unseen > 0 ? `${unseen} 条新消息 · ` : ''}回到最新 ↓</button></div>
    <div className="mm-chat-source"><span>来自 Multica 执行消息 · 每 2 秒同步</span><span>{updated ? `检查于 ${clock(updated)}` : '等待首次同步'}</span></div>
    {warnings.length > 0 && <details className="mm-chat-notices"><summary>记录完整性说明</summary>{warnings.map((warning, i) => <p key={i}>{warning}</p>)}</details>}
  </section>;
}

export function useRunTranscript({ api, run, revision, enabled = true }) {
  const [data, setData] = useState({ messages: [], waterfallMessages: [], waterfallTrimmed: false, hasMore: true, trimmed: false, warnings: [] });
  const [loading, setLoading] = useState(true), [error, setError] = useState(''), [updated, setUpdated] = useState(''), [retry, setRetry] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    let live = true, timer, cursor = 0;
    const controller = new AbortController();
    setData({ messages: [], waterfallMessages: [], waterfallTrimmed: false, hasMore: true, trimmed: false, warnings: [] }); setLoading(true); setError(''); setUpdated('');
    const sync = async () => {
      let delay = 2000;
      try {
        if (document.visibilityState === 'hidden') return;
        const result = await api('messages', { taskId: run.id, since: cursor }, controller.signal);
        if (!live) return;
        if (result.hasMore && result.lastSeq <= cursor) throw new Error('消息读取未能前进，请重新连接');
        cursor = result.lastSeq;
        setData(previous => {
          const merged = mergeConversation(previous.messages, result.messages);
          const history = mergeConversation(previous.waterfallMessages, result.messages, 10000);
          return { ...result, ...merged, waterfallMessages: history.messages, waterfallTrimmed: previous.waterfallTrimmed || history.trimmed, trimmed: previous.trimmed || merged.trimmed, warnings: [...new Set([...previous.warnings, ...(result.warnings || []).filter(w => !w.includes('继续加载'))])].slice(-8) };
        });
        setError(''); setUpdated(new Date().toISOString());
        if (result.hasMore) delay = 100;
      } catch (reason) { if (live) setError(reason.message || '执行消息读取失败'); }
      finally { if (live) { setLoading(false); timer = setTimeout(sync, delay); } }
    };
    void sync();
    return () => { live = false; controller.abort(); clearTimeout(timer); };
  }, [api, run.id, revision, retry, enabled]);
  return { ...data, loading, error, updated, onRetry: () => setRetry(value => value + 1) };
}

export function RunConversation({ api, run, issue, agentName, revision, unavailable = false }) {
  const data = useRunTranscript({ api, run, revision });
  return <ConversationPanel {...data} run={run} issue={issue} agentName={agentName} unavailable={unavailable}/>;
}
