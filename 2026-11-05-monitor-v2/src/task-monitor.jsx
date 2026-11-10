import {AgentAvatar} from './ui-icons.jsx';
import React, { useEffect, useMemo, useState } from 'react';
import { buildTaskMonitor } from './task-monitor-model.mjs';
import { traceDuration } from './execution-trace.mjs';

const DAY = 86400000;
const shortId = value => String(value || '').slice(-8);
const clock = value => value == null ? '—' : new Date(value).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false });
const date = value => new Date(value).toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' });
const duration = value => value == null ? '未提供' : traceDuration(value);
const waitLabel = value => value === 0 ? '无等待' : duration(value);

export function useTaskMonitor(props) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const timer = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(timer); }, []);
  return useMemo(() => buildTaskMonitor({ ...props, now }), [props.runs, props.observedRuns, props.agents, props.runtimes, props.issueId, props.unavailable, props.settings, now]);
}

export function TaskAttention({ monitor, onSelectRun, unavailable }) {
  const [expanded, setExpanded] = useState(false);
  const rows = expanded ? monitor.attention : monitor.attention.slice(0, 3);
  if (!unavailable && !monitor.attention.length) {
    if (!monitor.rows.length) return null;
    const activity = monitor.activeCount ? `${monitor.activeCount} 次活动运行` :
      monitor.unknownCount ? `${monitor.unknownCount} 次运行信息待核实` : '当前没有活动运行';
    return <p className="mm-task-monitor-meta">{activity}{monitor.failureCount > 0 && ` · ${monitor.failureCount} 次历史失败`}</p>;
  }
  return <section className="mm-task-attention" aria-label="当前需要关注的运行">
    <div className="mm-task-attention-heading"><strong>{unavailable ? '同步中断 · 当前状态待核实' : `${monitor.attention.length} 次运行需要关注`}</strong>{monitor.failureCount > 0 && <span>另有 {monitor.failureCount} 次历史失败</span>}</div>
    {rows.length > 0 && <ul>{rows.map(row => <li key={row.id}><button type="button" onClick={() => onSelectRun(row.id)}><span className="mm-task-attention-name"><strong>{row.agentName}</strong><small>#{shortId(row.id)}</small></span><span className={`mm-task-attention-reason tone-${row.tone}`}>{row.reasons.join(' · ')}</span><span className="mm-task-attention-time">{row.waiting ? `启动等待 ${duration(row.waitMs)}` : `已运行 ${duration(row.elapsedMs)}`}{row.silenceMs != null && ` · 未见新进展 ${duration(row.silenceMs)}`}</span><span className="mm-task-attention-action">{row.lastAction}</span><span className="mm-task-attention-open">查看运行 →</span></button></li>)}</ul>}
    {monitor.attention.length > 3 && <button className="mm-text-button" aria-expanded={expanded} onClick={() => setExpanded(value => !value)}>{expanded ? '收起关注运行' : `展开其余 ${monitor.attention.length - 3} 次关注运行`}</button>}
  </section>;
}

function Span({ span, domain, kind, tone, status }) {
  if (!span || !domain) return null;
  const left = Math.max(0, (span.start - domain.start) / domain.duration * 100);
  const width = Math.max(0, (span.end - span.start) / domain.duration * 100);
  return <span className={`mm-monitor-span is-${kind} tone-${tone} status-${status}${span.pending ? ' is-pending' : ''}`} style={{ left: `${Math.min(99.6, left)}%`, width: `${Math.min(100 - left, width)}%` }}/>
}

export function TaskMonitorTimeline({ monitor, onSelectRun, selectedRunId, truncated = false, now = Date.now(), settings = {} }) {
  const [window, setWindow] = useState('all'), [scope, setScope] = useState('all'), [zoom, setZoom] = useState(1), [order, setOrder] = useState('oldest');
  const recent = row => row.active || row.observationUnknown && !['completed', 'failed', 'cancelled'].includes(row.run.status) || Math.max(row.completedAtMs || 0, row.startedAtMs || 0, row.createdAtMs || 0) >= now - DAY;
  const withinWindow = monitor.rows.filter(row => window === 'all' || recent(row));
  const rows = withinWindow.filter(row => scope === 'all' || scope === 'active' && row.active || scope === 'attention' && monitor.attention.some(item => item.id === row.id) || scope === 'failed' && row.run.status === 'failed');
  const times = rows.flatMap(row => [row.waitSpan?.start, row.waitSpan?.end, row.executionSpan?.start, row.executionSpan?.end]).filter(value => value != null);
  const start = times.length ? Math.min(...times) : null, end = times.length ? Math.max(...times) : null;
  const domain = start == null ? null : { start, end, duration: Math.max(1000, end - start) };
  const multiDay = domain && date(start) !== date(end);
  const groups = [];
  for (const row of rows) { const key = row.run.agentId || `unknown:${row.id}`; let group = groups.find(item => item.id === key); if (!group) { group = { id: key, name: row.agentName, rows: [] }; groups.push(group); } group.rows.push(row); }
  const timeOf = row => row.startedAtMs ?? row.createdAtMs ?? null;
  for (const group of groups) group.rows.sort((a, b) => { const av = order === 'longest' ? a.elapsedMs : timeOf(a), bv = order === 'longest' ? b.elapsedMs : timeOf(b); if (av == null) return bv == null ? a.id.localeCompare(b.id) : 1; if (bv == null) return -1; return (order === 'oldest' ? av - bv : bv - av) || a.id.localeCompare(b.id); });
  const maxDuration = Math.max(0, ...rows.map(row => row.elapsedMs || 0));
  return <section className="mm-monitor-timeline" aria-label="任务运行耗时时间线">
    <div className="mm-monitor-heading"><div><h3>运行时间线</h3><p>{domain ? `${date(start)} ${clock(start)} — ${multiDay ? `${date(end)} ` : ''}${clock(end)}` : !rows.length && monitor.rows.length ? window === 'recent' ? `最近 24 小时没有运行，另有 ${monitor.rows.length} 次历史运行` : '当前筛选没有匹配的运行' : '暂无可靠的运行起止记录'}</p></div><span>{rows.length} / {monitor.rows.length} 次运行{maxDuration > 0 && ` · 最长运行 ${duration(maxDuration)}`}</span></div>
    <div className="mm-monitor-controls"><label>范围<select aria-label="运行时间范围" value={window} onChange={event => { setWindow(event.target.value); setZoom(1); }}><option value="recent">最近 24 小时</option><option value="all">全部历史</option></select></label><label>显示<select aria-label="筛选监控运行" value={scope} onChange={event => setScope(event.target.value)}><option value="all">全部运行</option><option value="attention">需要关注</option><option value="active">正在等待或执行</option><option value="failed">历史失败</option></select></label><label>组内排序<select aria-label="运行排序" value={order} onChange={event => setOrder(event.target.value)}><option value="oldest">时间从早到晚</option><option value="newest">最近运行优先</option><option value="longest">执行耗时最长</option></select></label><button disabled={zoom >= 4 || !domain} onClick={() => setZoom(value => value * 2)}>放大时间轴</button><button disabled={zoom === 1} onClick={() => setZoom(1)}>全览</button></div>
    <div className="mm-monitor-legend"><span><i className="is-wait"/>启动前等待</span><span><i/>执行区间</span><span><i className="is-warning"/>需要关注</span><span><i className="is-error"/>失败</span></div>
    {rows.length ? <div className="mm-monitor-scroll" tabIndex={0} role="region" aria-label="任务运行时间轴，可横向滚动"><div className="mm-monitor-canvas" style={{ '--mm-monitor-zoom': zoom }}>
      <div className="mm-monitor-axis"><span>智能体 / 本次运行</span><div>{[0, .25, .5, .75, 1].map(fraction => { const at = domain ? start + domain.duration * fraction : null; return <time key={fraction} style={{ left: `${fraction * 100}%` }}>{at === null ? '—' : multiDay ? `${date(at)} ${clock(at)}` : clock(at)}</time>; })}</div><span>等待 / 执行</span></div>
      {groups.map(group => <section className="mm-monitor-agent" key={group.id} aria-label={group.name}><div className="mm-monitor-agent-name"><strong><AgentAvatar name={group.name} size={20}/>{group.name}</strong><span>{group.rows.length} 次运行</span></div>{group.rows.map(row => <button key={row.id} type="button" data-run-id={row.id} className={`mm-monitor-run tone-${row.tone}`} aria-pressed={row.id === selectedRunId} aria-label={`查看${row.agentName} #${shortId(row.id)}，${row.statusLabel}，等待 ${duration(row.waitMs)}，执行 ${duration(row.elapsedMs)}${row.reasons.length ? `，${row.reasons.join('，')}` : ''}`} onClick={() => onSelectRun(row.id)}>
        <span className="mm-monitor-run-name"><strong>{row.statusLabel}</strong><small>#{shortId(row.id)}</small><span>{row.reasons.join(' · ') || (row.run.triggerSummary || '').replace(/\s+/g, ' ').slice(0, 70)}</span></span>
        <span className="mm-monitor-track" aria-hidden="true"><Span span={row.waitSpan} domain={domain} kind="wait" tone={row.waiting ? row.tone : 'normal'} status={row.run.status}/><Span span={row.executionSpan} domain={domain} kind="execution" tone={row.tone} status={row.run.status}/>{!row.waitSpan && !row.executionSpan && <span className="mm-monitor-unknown">起止时间待核实</span>}</span>
        <span className="mm-monitor-duration"><span>{row.waitMs === 0 ? '' : '等 '}<strong>{waitLabel(row.waitMs)}</strong></span><span>{row.waiting ? '尚未开始' : <>{row.running ? '已运行' : '执行'} <strong>{duration(row.elapsedMs)}</strong></>}</span></span>
        {row.active && <span className="mm-monitor-last">最近记录：{row.lastAction}{row.silenceMs != null ? ` · ${duration(row.silenceMs)}未见新进展` : row.observationUnknown ? ' · 反馈状态待核实' : ''}</span>}
      </button>)}</section>)}
    </div></div> : <div className="mm-monitor-empty"><p>{monitor.rows.length ? '当前范围没有符合条件的运行。' : '这个任务尚未读取到运行记录。'}</p>{monitor.rows.length > 0 && <button onClick={() => { setWindow('all'); setScope('all'); }}>查看全部运行</button>}</div>}
    <p className="mm-monitor-footnote">同一时间轴对齐各次运行，条长表示等待或执行时间。点选运行查看输入输出与最后确认的执行记录。</p>
    {truncated && <p className="mm-monitor-footnote">历史记录未完整读取，当前仅展示已加载的运行。</p>}
    <details className="mm-monitor-method"><summary>时间与关注规则</summary><p>等待从运行创建计至开始，执行从开始计至结束。活动运行计至当前；状态无法同步时不继续推算。位置重叠只说明时间重叠，不证明依赖关系。</p><p>当前关注阈值：启动等待 {settings.queueMinutes || 5} 分钟、运行 {settings.runMinutes || 60} 分钟、持续未观察到新进展 {settings.noProgressMinutes || 10} 分钟。长时间不直接判为故障；工具记录的上报时间差不参与耗时比较。</p><p>“最近 24 小时”始终包含仍活动的运行。尚未创建运行的业务任务不计作排队。</p></details>
  </section>;
}
