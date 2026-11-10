import React, { useEffect, useRef, useState } from 'react';
import { filterTraceRecords, mergeTraceRecords, traceStatus } from './trace-presentation.mjs';

const short = value => value ? value.length > 18 ? `${value.slice(0, 8)}…${value.slice(-8)}` : value : '尚未确认';
const time = value => value ? new Date(value).toLocaleTimeString('zh-CN', { hour12: false }) : '—';
const pretty = value => { try { return JSON.stringify(JSON.parse(value), null, 2); } catch { return value; } };
const categories = [['all', '全部'], ['tool', '工具'], ['text', '文本'], ['error', '错误'], ['session', '会话'], ['diagnostic', '诊断']];

export function NativeTraceView({ api, run, revision }) {
  const [data, setData] = useState(null), [records, setRecords] = useState([]), [error, setError] = useState('');
  const [executionId, setExecutionId] = useState(''), [retry, setRetry] = useState(0), [loading, setLoading] = useState(true);
  const [paused, setPaused] = useState(false), [category, setCategory] = useState('all'), [query, setQuery] = useState('');
  const [selection, setSelection] = useState(null), [copied, setCopied] = useState(''), [updated, setUpdated] = useState('');
  const pauseRef = useRef(false), feedRef = useRef(null);
  const pause = value => { pauseRef.current = value; setPaused(value); };
  useEffect(() => {
    let live = true, timer, cursor = 0, selected = executionId;
    const controller = new AbortController();
    setData(null); setRecords([]); setSelection(null); setLoading(true); setError(''); setUpdated(''); pause(false);
    const sync = async () => {
      let nextDelay = 1500;
      try {
        if (pauseRef.current || document.visibilityState === 'hidden') return;
        const result = await api('nativeTrace', { taskId: run.id, executionId: selected, cursor }, controller.signal);
        if (!live) return;
        selected = result.execution?.id || selected;
        cursor = result.cursor;
        setData(result); setRecords(previous => mergeTraceRecords(previous, result.records)); setError('');
        setUpdated(new Date().toISOString());
        if (result.hasMore && result.records.length) nextDelay = 80;
      } catch (reason) { if (live) setError(reason.message || 'CLI 采集记录读取失败'); }
      finally { if (live) { setLoading(false); timer = setTimeout(sync, nextDelay); } }
    };
    void sync();
    return () => { live = false; clearTimeout(timer); controller.abort(); };
  }, [api, run.id, revision, executionId, retry]);
  useEffect(() => { if (!paused && !selection && feedRef.current) feedRef.current.scrollTop = feedRef.current.scrollHeight; }, [records.length, paused, selection]);
  const execution = data?.execution;
  const session = execution?.sessions?.at(-1)?.id;
  const visible = filterTraceRecords(records, category, query);
  const selected = records.find(record => record.seq === selection);
  const incomplete = Boolean(execution?.dropped || execution?.truncated || execution?.captureError);
  const copy = async (value, label) => { try { await navigator.clipboard.writeText(value); setCopied(`${label}已复制`); } catch { setCopied('复制失败，可在详情中选中文本复制'); } };
  return <section className="mm-trace" aria-label="CLI 日志跟踪">
    <div className="mm-trace-title"><div><span className="mm-trace-eyebrow">NATIVE CLI TRACE</span><h3>从运行，追到原始现场</h3></div><span className={`mm-trace-live ${paused ? 'is-paused' : ''}`}>{paused ? '已暂停跟随' : execution?.finishedAt ? '采集已结束' : execution ? '持续跟随' : '本机采集'}</span></div>
    {error && <div className="mm-error" role="alert">{error} <button onClick={() => setRetry(value => value + 1)}>重试</button>{data && <span> 当前保留上次读取结果。</span>}</div>}
    {loading && <p className="mm-muted" role="status">正在定位这次运行的 CLI 记录…</p>}
    {!loading && !error && !data?.available && <div className="mm-trace-empty"><span aria-hidden="true">⌁</span><h4>这次运行尚无本机采集</h4><p>{data?.reason}</p><button onClick={() => setRetry(value => value + 1)}>重新检查</button></div>}
    {execution && <>
      <div className="mm-trace-chain" aria-label="运行与会话关联">
        {[['Multica 运行', run.id, 'task_id'], ['执行运行时', execution.runtimeId, 'runtime_id'], ['CLI 会话', session, session ? 'CLI 已确认' : '等待 CLI 确认']].map(([label, value, note], index) => <div className={index === 2 && session ? 'is-confirmed' : ''} key={label}><span>{label}</span><button title={value || note} disabled={!value} onClick={() => void copy(value, label)}>{short(value)}</button><small>{note}</small></div>)}
      </div>
      <div className="mm-trace-context"><strong>{execution.provider || 'CLI'}</strong><span>{traceStatus(execution.status)}</span><span>{execution.frames} 条输出</span><span>{execution.pids.map(pid => `PID ${pid}`).join(' / ') || '进程待启动'}</span></div>
      <details className="mm-trace-bindings"><summary>完整关联信息{execution.requestedSessionId ? ' · 含会话恢复记录' : ''}</summary><dl>{[['本次采集', execution.id], ['Daemon', execution.daemonId], ['业务任务', execution.issueId], ['聊天会话', execution.chatSessionId], ['请求恢复', execution.requestedSessionId || '新建会话'], ['实际确认', execution.sessions.map(item => item.id).join('\n') || '尚未观察到会话确认']].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value || '未提供'}</dd></div>)}</dl>{execution.requestedSessionId && <p>请求恢复仅代表启动意图；实际关联以 CLI 返回的会话 ID 为准。</p>}</details>
      {data.executions.length > 1 && <label className="mm-trace-capture-picker">本次运行的采集记录<select aria-label="选择 CLI 采集记录" value={execution.id} onChange={event => setExecutionId(event.target.value)}>{data.executions.map((item, index) => <option value={item.id} key={item.id}>{index === 0 ? '最新 · ' : ''}{time(item.startedAt)} · {traceStatus(item.status)} · {item.id.slice(-8)}</option>)}</select></label>}
      {(incomplete || data.warnings?.length > 0) && <div className="mm-notice" role="status">{incomplete && <p>采集不完整：{execution.dropped ? `${execution.dropped} 条输出未保留；` : ''}{execution.truncated ? '存在截断；' : ''}{execution.captureError || ''}缺失记录不能用于判断运行正常。</p>}{data.warnings?.map((warning, i) => <p key={i}>{warning}</p>)}</div>}
      <div className="mm-trace-toolbar"><input aria-label="搜索 CLI 日志" placeholder="搜索命令、输出或会话 ID…" value={query} onChange={event => setQuery(event.target.value)}/><button aria-pressed={paused} onClick={() => pause(!paused)}>{paused ? '继续跟随' : '暂停跟随'}</button></div>
      <div className="mm-trace-filters" aria-label="日志类型筛选">{categories.map(([value, label]) => <button aria-pressed={category === value} key={value} onClick={() => setCategory(value)}>{label}{value !== 'all' && <span>{filterTraceRecords(records, value, '').length}</span>}</button>)}</div>
      <div className={`mm-trace-console ${selected ? 'has-selection' : ''}`}>
        <div className="mm-trace-feed" aria-label="CLI 事件列表" ref={feedRef}><div className="mm-trace-column-head"><span>时间 / 序号</span><span>CLI 事件</span></div>
          {!visible.length && <p className="mm-trace-no-results">{records.length ? '没有匹配的日志，试试其他关键词或类型。' : 'CLI 尚未输出事件。'}</p>}
          {visible.map(record => <button className={`mm-trace-event ${selection === record.seq ? 'is-selected' : ''}`} data-kind={record.view.category} key={record.seq} aria-expanded={selection === record.seq} onClick={() => { setSelection(record.seq); pause(true); }}><span className="mm-trace-event-time">{time(record.at)}<small>#{record.seq} · {record.stream || '关联'}</small></span><span className="mm-trace-event-body"><span className="mm-trace-event-label">{record.view.label}</span><span>{record.view.title}</span></span></button>)}
        </div>
        {selected && <article className="mm-trace-record" aria-label="CLI 原始记录详情"><header><div><span className="mm-trace-eyebrow">RAW EVENT · #{selected.seq}</span><h4>原始记录</h4></div><button aria-label="关闭原始记录" onClick={() => setSelection(null)}>收起</button></header><div className="mm-trace-record-facts"><span>{time(selected.at)}</span><span>{selected.stream || selected.kind}</span><button onClick={() => void copy(selected.data || JSON.stringify(selected, null, 2), '原始记录')}>复制记录</button></div>{(selected.truncated || selected.redacted) && <p className="mm-muted">{selected.truncated ? '此条记录已截断。' : ''}{selected.redacted ? '检测到的凭据已隐藏。' : ''}</p>}<pre tabIndex={0}>{pretty(selected.data || JSON.stringify(selected, null, 2))}</pre></article>}
      </div>
      <div className="mm-trace-foot"><span>{visible.length} / {records.length} 条已载入{data.hasMore ? ' · 正在补齐' : ''}{records.length >= 1000 ? ' · 仅保留最近 1000 条' : ''}</span><span>{paused ? '暂停后仍由 daemon 持续采集' : `同步于 ${time(updated)}`}</span></div>
      <details className="mm-trace-source"><summary>采集来源与保留范围</summary><p>由本机 Multica daemon 在 CLI 输出入口采集 stdout / stderr，保留原始结构并隐藏可识别的凭据。单条最多 64 KiB，单次约 16 MiB；已结束记录保留 7 天，容量超过 512 MiB 时优先清理较早记录。其他机器与升级前的运行需要在对应执行端采集。</p></details>
    </>}
    {copied && <p className="mm-muted" role="status">{copied}</p>}
  </section>;
}
