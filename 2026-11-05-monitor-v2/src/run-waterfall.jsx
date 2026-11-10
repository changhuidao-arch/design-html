import {TypeIcon} from './ui-icons.jsx';
import React, { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import {waterfallSearchIndex,waterfallView} from './waterfall-view.mjs';
import { buildRunWaterfall, logMessageKind, spanDuration, waterfallKinds } from './run-waterfall.mjs';
import { printable } from './run-conversation.mjs';
import { ReadableText } from './run-conversation.jsx';
import { WaterfallChart } from './waterfall-chart.jsx';

const clock = value => Number.isFinite(value) ? new Date(value).toLocaleString('zh-CN', { hour12: false }) : '时间未提供';

const previewLimit = 180;
const previewKeys = ['preview', 'content', 'output', 'input', 'text'];
const previewPrefixLimit = 2048;
const previewParseLimit = 16 * 1024;
const previewDepthLimit = 12;
const boundedPreview = value => printable(value).slice(0, previewPrefixLimit).replace(/\s+/g, ' ').trim().slice(0, previewLimit);

function jsonStringPrefix(source, start) {
  const end = Math.min(source.length, start + previewPrefixLimit);
  let decoded = '';
  for (let index = start; index < end && decoded.length <= previewLimit; index++) {
    const character = source[index];
    if (character === '"') return decoded;
    if (character !== '\\') {
      if (character.charCodeAt(0) < 32) return decoded || null;
      decoded += character;
      continue;
    }
    if (++index >= end) break;
    const escape = source[index];
    if (escape === 'u') {
      const digits = source.slice(index + 1, index + 5);
      if (!/^[\da-fA-F]{4}$/.test(digits) || index + 4 >= end) break;
      decoded += String.fromCharCode(parseInt(digits, 16));
      index += 4;
    } else {
      const escaped = { '"': '"', '\\': '\\', '/': '/', b: '\b', f: '\f', n: '\n', r: '\r', t: '\t' }[escape];
      if (escaped == null) break;
      decoded += escaped;
    }
  }
  return decoded || null;
}

function previewText(value) {
  let current = value;
  for (let depth = 0; depth < previewDepthLimit; depth++) {
    if (typeof current === 'string') {
      const source = current.trimStart();
      if (source.length <= previewParseLimit && /^(?:\{|\[|")/.test(source)) {
        try {
          const parsed = JSON.parse(source);
          if (parsed !== current) { current = parsed; continue; }
        } catch { /* A truncated JSON wrapper may still have a readable string prefix. */ }
      }
      const wrapper = /^\{\s*"(?:preview|content|output|input|text)"\s*:\s*"/.exec(source.slice(0, previewPrefixLimit));
      const prefix = wrapper ? jsonStringPrefix(source, wrapper[0].length) : source.startsWith('"') ? jsonStringPrefix(source, 1) : null;
      if (prefix && (wrapper || /^(?:\{|\[|")/.test(prefix))) { current = prefix; continue; }
      return boundedPreview(source);
    }
    if (Array.isArray(current)) {
      const first = current.find(item => item != null && item !== '');
      if (first !== undefined) { current = first; continue; }
    } else if (current && typeof current === 'object') {
      const key = previewKeys.find(candidate => current[candidate] != null && current[candidate] !== '');
      if (key) { current = current[key]; continue; }
    }
    return boundedPreview(current);
  }
  return boundedPreview(current);
}

function BoundaryRecord({ label, message }) {
  const content = message?.content || message?.output || message?.input;
  const raw = message ? printable(content) : '';
  const preview = previewText(content);
  return <section className="mm-wf-boundary">
    <h4>{label}{message ? ` · #${message.seq} · ${logMessageKind(message.type)}${message.tool ? ` · ${message.tool}` : ''}` : ''}</h4>
    <p>{message ? preview || '未提供记录内容' : label === '前一记录' ? '运行开始' : '运行结束'}{raw.length > 180 ? '…' : ''}</p>
    {raw.length > 180 && <details><summary>查看完整记录</summary><pre>{raw}</pre></details>}
  </section>;
}

export function WaterfallDetail({ row, onFocus, onClose, autoFocus = true }) {
  const entry = row.entry;
  const element = useRef(null);
  useEffect(() => {
    if (!autoFocus) return;
    const bounds = element.current?.getBoundingClientRect();
    if (bounds && (bounds.top < 85 || bounds.top > window.innerHeight - 160)) element.current?.scrollIntoView({ block: 'start' });
    element.current?.focus({ preventScroll: true });
  }, [row.id, autoFocus]);
  return <section className="mm-wf-detail" aria-label="日志片段详情" ref={element} tabIndex={-1}>
    <div className="mm-wf-heading"><h3>{row.name}{row.seq ? ` · #${row.seq}${row.lastSeq !== row.seq ? `–${row.lastSeq}` : ''}` : ''}</h3><button onClick={onClose}>关闭详情</button></div>
    <div className="mm-wf-detail-body">
    <div className="mm-wf-detail-time"><span>{clock(row.start)} — {clock(row.end)}</span><strong>{spanDuration(row.duration)}</strong>{row.offset != null && <button onClick={onFocus}>在时间轴定位</button>}</div>
    <p className="mm-exec-note">{row.note}{row.failed ? ' 工具或执行记录报告了错误。' : ''}</p>
    {entry?.kind === 'tool' ? <div className="mm-wf-payloads"><section><h4>调用输入</h4><pre>{entry.call ? printable(entry.call.input) || '（空参数）' : '未读到调用记录'}</pre>{entry.call?.inputTruncated && <p>输入已截断</p>}</section><section><h4>返回输出</h4><pre>{entry.result ? printable(entry.result.output || entry.result.content) || '（空返回）' : '尚未读到匹配返回'}</pre>{entry.result?.outputTruncated && <p>输出已截断</p>}</section></div>
      : entry ? <><ReadableText text={printable(entry.message?.content || entry.message?.output)} limit={2400}/>{entry.message?.contentTruncated && <p>正文已截断</p>}</>
        : <div className="mm-wf-payloads">{[['前一记录', row.before], ['后一记录', row.after]].map(([label, message]) => <BoundaryRecord key={label} label={label} message={message}/>)}</div>}
    </div>
  </section>;
}

export function RunWaterfall({ run, messages = [], partial, loading, error, onRetry }) {
  const data = useMemo(() => buildRunWaterfall({ run, messages, partial }), [run.startedAt, run.completedAt, run.status, messages, partial]);
  const [mode, setMode] = useState('longest'), [kind, setKind] = useState('all'), [count, setCount] = useState(3), [page,setPage] = useState(0), [query,setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const [wheelZoom,setWheelZoom] = useState(false);
  const [selectedId, setSelectedId] = useState(''), [focusRequest, setFocusRequest] = useState(null);
  const returnFocus = useRef(null);
  const index = useMemo(()=>waterfallSearchIndex(data.rows),[data.rows]);
  const view = useMemo(()=>waterfallView(data.rows,{kind,query:deferredQuery,mode,page,index}),[data.rows,kind,deferredQuery,mode,page,index]);
  const {ranked,visible:rows,safePage,pages,paginated} = view;
  const selected = view.matches.find(row => row.id === selectedId);
  const hasLogs = data.rawCount > 0;
  const rememberFocus = () => { const active = document.activeElement; returnFocus.current = active?.shadowRoot?.activeElement || active; };
  const focus = (row, revealChart = false) => { if (!revealChart) rememberFocus(); if (paginated) setPage(Math.max(0,Math.floor(view.chosen.findIndex(item=>item.id===row.id)/40)));setSelectedId(row.id); setFocusRequest(revealChart ? { id:row.id,revealChart:true } : null); };
  const changeKind = value => { setKind(value);setPage(0);setCount(3);setSelectedId('');setFocusRequest(null); };
  const changePage = value => { setPage(value);setSelectedId('');setFocusRequest(null); };
  const closeDetail = () => { returnFocus.current?.focus?.({ preventScroll: true }); setSelectedId(''); setFocusRequest(null); };
  return <section className="mm-waterfall" aria-label="本次运行日志瀑布图">
    <div className="mm-wf-heading"><h3>运行过程瀑布图</h3><span>{data.rawCount} 条原始日志</span></div>
    {loading && <p role="status" className="mm-exec-note">{hasLogs ? '正在补齐日志，图表和排名会随之更新…' : '正在读取过程日志…'}</p>}
    {error && <p role="alert" className="mm-exec-error">{hasLogs ? '日志读取失败，保留已读片段。' : '日志读取失败，尚无可分析的片段。'}<button onClick={onRetry}>重试读取</button></p>}
    {!hasLogs && <div className="mm-wf-empty" role="status"><strong>{loading ? '正在读取过程日志' : '暂无可分析的过程日志'}</strong><p>{data.total > 0 ? `已知本次运行持续 ${spanDuration(data.total)}，但没有日志可以拆分各步骤耗时。` : '尚未取得可用于分析的运行时间和日志。'}{error ? '请重试读取。' : ''}</p></div>}
    {hasLogs && <>
    <div className="mm-wf-totals"><div className="mm-wf-total-intro"><strong>记录区间统计</strong><span>跨类型可重叠，不能相加为运行耗时；也不是模型或工具的实际耗时。</span></div><div className="mm-wf-total-items">{Object.entries(waterfallKinds).filter(([key]) => key !== 'other' || data.totals[key] > 0).map(([key, label]) => <span key={key}><TypeIcon type={key}/>{label}<strong>{key === 'gap' && !data.complete ? '待核实' : data.totals[key] === 0 ? '0 秒' : spanDuration(data.totals[key])}</strong></span>)}</div></div>
    {!data.complete && !loading && <p className="mm-exec-note">日志或起止时间不完整，仅展示已读片段，暂不计算无日志间隔。</p>}
    {!data.terminal && <p className="mm-exec-note">运行尚未结束，横轴截至最后一条已收到的日志。</p>}
    <div className="mm-wf-controls"><label>日志类型<select aria-label="日志类型" value={kind} onChange={event => changeKind(event.target.value)}><option value="all">全部类型</option>{Object.entries(waterfallKinds).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label><label>时间轴显示<select aria-label="时间轴显示" value={mode} onChange={event => { setMode(event.target.value); setSelectedId(''); setFocusRequest(null); }}><option value="sequence">逐条查阅 · 每批 40 条</option><option value="longest">较长片段前 20 · 按发生顺序</option></select></label></div>
    <label className="mm-wf-search">搜索本次运行的片段<input aria-label="搜索本次运行的片段" placeholder="搜索日志编号、工具名或原文…" value={query} onChange={event=>{setQuery(event.target.value);setPage(0);setSelectedId('');setFocusRequest(null);}}/></label>
    <div className="mm-wf-interaction"><p className="mm-wf-usage">搜索覆盖当前类型的全部 {view.typed.length} 个片段；{query.trim() ? `匹配 ${view.matches.length} 条，` : ''}图中{paginated ? `显示第 ${safePage+1} / ${pages} 批，每批最多 40 条` : `显示跨度最长的 ${rows.length} 条`}。</p><label className="mm-wf-wheel-mode"><input type="checkbox" checked={wheelZoom} onChange={event=>setWheelZoom(event.target.checked)}/>滚轮缩放</label><span className="mm-wf-usage">{wheelZoom ? '滚轮缩放时间范围；拖动时间轴平移' : '滚轮滚动列表；Ctrl / ⌘ + 滚轮缩放'}</span></div>
    <div className={`mm-wf-workspace${selected ? ' has-selection' : ''}`}>
      {data.total > 0 && <WaterfallChart key={`${kind}-${mode}-${safePage}`} data={data} run={run} rows={rows} wheelZoom={wheelZoom} selectedId={selectedId} focusRequest={focusRequest} onSelect={id => { if (id && id !== selectedId) rememberFocus(); setSelectedId(id); setFocusRequest(null); }}/>}
      {selected && <WaterfallDetail row={selected} onFocus={() => focus(selected, true)} onClose={closeDetail}/>}
    </div>
    {ranked.length > 0 && <details className="mm-wf-ranking-disclosure"><summary>跨度最长的片段 · 前 {ranked.length} 条</summary><section className="mm-wf-ranking" aria-label="跨度最长的片段"><div className="mm-wf-heading"><h3>跨度最长的片段</h3><span>显示 {Math.min(count, ranked.length)} / {ranked.length} 条</span></div><ol>{ranked.slice(0, count).map((row, index) => <li key={row.id}><button onClick={() => focus(row)} aria-pressed={selectedId === row.id}><span className="mm-wf-rank">{index + 1}</span><TypeIcon type={row.kind}/><span className="mm-wf-rank-name"><strong>{row.name}</strong><small>{row.kind === 'gap' ? `未收到新日志 · 原因待核实 · ${row.summary}` : row.summary || (row.seq ? `#${row.seq}–${row.lastSeq}` : '运行记录之间')}</small></span><strong>{spanDuration(row.duration)}</strong><span className="mm-wf-rank-action">查看证据</span></button></li>)}</ol>{count < ranked.length && <button onClick={() => setCount(value => Math.min(20, value + 5))}>再看 {Math.min(5, ranked.length - count)} 条</button>}</section></details>}
    {rows.some(row => row.duration == null) && <p className="mm-exec-note">时长待核实的记录可在「执行过程」中查看。</p>}
    {!rows.length && !loading && <p className="mm-exec-note">{data.rawCount ? '没有匹配的片段。可清空搜索或切换日志类型。' : '本次运行尚未读到过程日志。'}</p>}
    <div className="mm-wf-footer"><span>{paginated ? `${view.matches.length} 个片段 · 第 ${safePage+1} / ${pages} 批 · 按发生顺序排列` : `显示较长的 ${rows.length} / ${view.matches.length} 个片段 · 按发生顺序排列`}</span>{paginated&&<span><button disabled={safePage===0} onClick={()=>changePage(safePage-1)}>上一批</button><button disabled={safePage===pages-1} onClick={()=>changePage(safePage+1)}>下一批</button></span>}</div>
    <details className="mm-wf-notes"><summary>数据范围和时间口径</summary><p>{clock(data.start)} — {clock(data.end)}。只覆盖这一次运行。</p><p>思考、文字按连续同类输出的首末日志计时；工具按唯一匹配的调用与返回计时。颜色表示类型，不表示慢或异常。时间点没有可计算的时长。</p><p>无日志间隔是已知记录区间之外的时间，原因未知。各类合计对同类重叠区间去重；不同类型可能并行，不能直接相加视为总耗时。</p><p>分析窗口最多保留 10000 条、8 MB 原始日志，超出或缺失时会标明不完整。</p></details>
    </>}
  </section>;
}
