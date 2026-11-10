import iconCss from './ui-icons.css';
import polishCss from './polish.css';
import {useMotionController,useSurfaceMotion} from './polish-motion.mjs';
import {TypeIcon,AgentAvatar} from './ui-icons.jsx';
import redesignCss from './redesign.css';
import {TaskList} from './task-table.jsx';
import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import css from './style.css';
import timelineCss from './task-timeline.css';
import graphCss from './call-graph.css';
import consoleCss from './console.css';
import traceCss from './native-trace.css';
import conversationCss from './run-conversation.css';
import { RunConversation } from './run-conversation.jsx';
import executionCss from './run-execution.css';
import waterfallCss from './run-waterfall.css';
import { RunExecution } from './run-execution.jsx';
import { BusinessHierarchy } from './task-timeline.jsx';
import { TaskAttention, TaskMonitorTimeline, useTaskMonitor } from './task-monitor.jsx';
import taskMonitorCss from './task-monitor.css';
import { CallGraph } from './call-graph.jsx';
import { RunsView, AlertsView, MetricsView, RuntimeView, RunActions } from './monitor-views.jsx';
import { RunMessages } from './run-work-detail.jsx';
import { FailureDiagnosis } from './failure-diagnosis-view.jsx';
import { observedWork, taskSignals, durationLabel } from './monitor-presentation.mjs';
import { buildRunTimeline } from './task-relationships.mjs';

export const inject = ['slots', 'connection', 'layout'];
const monitorThemes = new Set(['graphite', 'paper', 'strata']);
const defaultMonitorTheme = 'strata';
export const normalizeTheme = value => monitorThemes.has(value) ? value : defaultMonitorTheme;
const activeStates = new Set(['queued', 'dispatched', 'running', 'waiting_local_directory', 'deferred']);
const runLabels = { queued: '排队中', dispatched: '已派发', running: '运行中', waiting_local_directory: '等待本地目录', deferred: '暂缓', completed: '运行完成', failed: '运行失败', cancelled: '运行取消', unknown: '状态待核实' };
const issueLabels = { backlog: '待规划', todo: '待处理', in_progress: '处理中', blocked: '受阻', in_review: '待审核', done: '已完成', cancelled: '已取消' };
const time = (value) => value && Number.isFinite(Date.parse(value)) ? new Date(value).toLocaleString('zh-CN', { hour12: false }) : '—';
const errorMessage = (error) => error?.message || '请求失败，请重试';
const businessLabel = (statuses, key) => {
  const name = statuses.find(status => status.key === key)?.name;
  return !name || name.toLowerCase().replaceAll(' ', '_') === key ? issueLabels[key] || name || key : name;
};

export function selectAvailableRun(currentId, preferredId, runs) {
  if (runs.some(run => run.id === currentId) || (preferredId && currentId === preferredId)) return currentId;
  return runs.find(run => activeStates.has(run.status))?.id || runs[0]?.id || '';
}

export function defaultTaskView(detail) {
  if (!detail?.runs?.length) return 'graph';
  const confirmed = buildRunTimeline(detail.runs, Date.now(), { relations: detail.relations }).relations.some(relation => ['delegation', 'rerun', 'retry', 'parent_run'].includes(relation.type));
  return confirmed ? 'graph' : 'timeline';
}

function Icon({ kind = 'monitor', ...props }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    {kind === 'close' ? <path d="m6 6 12 12M6 18 18 6"/> : kind === 'refresh' ? <><path d="M20 7v5h-5M4 17v-5h5"/><path d="M6 7a7 7 0 0 1 12-2l2 7M4 12l2 7a7 7 0 0 0 12-2"/></> : <><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4M6 11h3l2-4 3 7 2-3h2"/></>}
  </svg>;
}

function Badge({ status, label }) {
  const tone = ['failed', 'blocked', 'offline', 'error'].includes(status) ? 'danger' : ['running', 'in_progress', 'online', 'completed', 'done'].includes(status) ? 'good' : activeStates.has(status) ? 'pending' : '';
  return <span className={`mm-badge ${tone}`}>{label || runLabels[status] || status || '未知'}</span>;
}

function ConnectionForm({ api, settings, onSaved, onClose, onDirtyChange }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [confirmClear, setConfirmClear] = useState(false);
  const clearTrigger = useRef(null), clearConfirm = useRef(null);
  useEffect(() => { if (confirmClear) clearConfirm.current?.focus(); }, [confirmClear]);
  const cancelClear = () => { setConfirmClear(false); clearTrigger.current?.focus(); };
  const clearToken = async () => {
    setBusy(true); setError('');
    try { await onSaved(await api('saveSettings', { clearToken: true, workspaceId: '' })); }
    catch (e) { setError(errorMessage(e)); setConfirmClear(false); clearTrigger.current?.focus(); }
    finally { setBusy(false); }
  };
  const submit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    for (const key of ['monitorEnabled', 'aiDiagnosis']) values[key] = form.elements[key].checked;
    for (const key of ['noProgressMinutes', 'toolMinutes', 'queueMinutes', 'runMinutes']) values[key] = Number(values[key]);
    setBusy(true); setError('');
    try {
      const next = await api('saveSettings', { ...values, workspaceId: values.baseUrl.replace(/\/+$/, '') === settings.baseUrl ? settings.workspaceId : '' });
      form.elements.token.value = '';
      await onSaved(next);
    } catch (error) { setError(errorMessage(error)); }
    finally { setBusy(false); }
  };
  return <form className="mm-settings" onSubmit={submit} onChange={onDirtyChange}>
    <div className="mm-section-heading"><h2>连接 Multica</h2>{settings.hasToken && <button type="button" onClick={onClose}>收起配置</button>}</div>
    <div className="mm-form-grid">
      <label>API 地址<input name="baseUrl" type="url" required defaultValue={settings.baseUrl} spellCheck="false"/></label>
      <label>网页地址<input name="webUrl" type="url" required defaultValue={settings.webUrl} spellCheck="false"/></label>
      <label className="mm-token">个人访问令牌<input name="token" type="password" autoComplete="new-password" required={!settings.hasToken} placeholder={settings.hasToken ? '已保存；留空保留当前令牌' : '在 Multica 个人设置中创建'} /></label>
    </div>
    <p className="mm-muted">本地开发的 API 与网页可能使用不同端口。切换环境时填写新令牌；令牌保存在 DSH 宿主本地配置中。</p>
    {settings.allowedHttpOrigins?.length > 0 && <p className="mm-muted">已明确允许以下 HTTP 地址：{settings.allowedHttpOrigins.join('、')}。这些连接使用明文 HTTP，许可不适用于其他地址。</p>}
    <div className="mm-checks"><label><input type="checkbox" name="monitorEnabled" defaultChecked={settings.monitorEnabled}/>持续监控</label><label><input type="checkbox" name="aiDiagnosis" defaultChecked={settings.aiDiagnosis}/>异常发生时自动 AI 诊断</label></div>
    <p className="mm-muted">AI 诊断会把脱敏后的少量运行信息发送给 DSH 默认模型，可能产生费用；没有可用模型时保留规则诊断。取消或重跑始终需要你确认。</p>
    <details className="mm-thresholds"><summary>异常阈值</summary><div className="mm-form-grid">{[['noProgressMinutes','无进展'],['toolMinutes','工具等待'],['queueMinutes','排队'],['runMinutes','运行总耗时']].map(([key,label]) => <label key={key}>{label} · 分钟<input type="number" min="1" max="1440" required name={key} defaultValue={settings[key]}/></label>)}</div></details>
    {error && <p role="alert" className="mm-error">{error}</p>}
    <div className="mm-actions"><button className="mm-primary" disabled={busy} type="submit">{busy ? '正在连接…' : '保存并连接'}</button></div>
    {settings.hasToken && <div className="mm-settings-danger"><button ref={clearTrigger} type="button" disabled={busy} onClick={() => setConfirmClear(true)}>清除令牌</button>{confirmClear && <div className="mm-settings-confirm" role="group" aria-label="确认清除令牌" data-mm-escape-scope onKeyDown={event => { if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); cancelClear(); } }}><p>清除本机令牌后，当前连接和持续监控将停止；重新连接需要填写令牌。</p><div className="mm-actions"><button ref={clearConfirm} type="button" disabled={busy} onClick={() => void clearToken()}>{busy ? '正在清除…' : '确认清除令牌'}</button><button type="button" disabled={busy} onClick={cancelClear}>保留连接</button></div></div>}</div>}
  </form>;
}

function LegacyTaskList({ issues = [], runs = [], agents = [], statuses = [], onSelect, onAlerts, alerts = [], historicalFailures = [], unavailable = false, unavailableLabel = '采集异常，状态待核实', issuesTruncated = false, filter = 'all', query = '', onFilterChange, onQueryChange }) {
  const now = Date.now();
  const signals = new Map(issues.map(issue => [issue.id, taskSignals(issue.id, runs, alerts, historicalFailures, now, unavailable)]));
  const visible = issues.filter(issue => `${issue.identifier || ''} ${issue.title || ''}`.toLowerCase().includes(query.trim().toLowerCase()) && (filter === 'all' || filter === 'attention' && (signals.get(issue.id).current || signals.get(issue.id).uncertain) || filter === 'active' && signals.get(issue.id).active || filter === 'history' && signals.get(issue.id).historical)).sort((a, b) => signals.get(b.id).current - signals.get(a.id).current || signals.get(b.id).uncertain - signals.get(a.id).uncertain);
  const visibleById = new Map(visible.map(issue => [issue.id, issue]));
  const children = new Map(), roots = [];
  for (const issue of visible) {
    let parent = issue.parentIssueKnown === true ? issue.parentIssueId : null;
    const seen = new Set([issue.id]);
    for (let cursor = parent; cursor && visibleById.has(cursor); cursor = visibleById.get(cursor).parentIssueId) {
      if (seen.has(cursor)) { parent = null; break; }
      seen.add(cursor);
    }
    if (parent && visibleById.has(parent)) { if (!children.has(parent)) children.set(parent, []); children.get(parent).push(issue); }
    else roots.push(issue);
  }
  const ordered = [];
  const visit = (issue, depth) => { ordered.push({ issue, depth }); for (const child of children.get(issue.id) || []) visit(child, depth + 1); };
  for (const root of roots) visit(root, 0);
  const byIssue = new Map();
  for (const run of runs) {
    if (!run.issueId) continue;
    if (!byIssue.has(run.issueId)) byIssue.set(run.issueId, []);
    byIssue.get(run.issueId).push(run);
  }
  return <section className="mm-list mm-business-list" aria-label="业务任务列表">
    <div className="mm-section-heading"><h2>业务任务</h2><span className="mm-muted">已加载 {issues.length} 个任务{issuesTruncated ? ' · 还有任务未读取' : ''}</span></div>
    <div className="mm-task-overview" aria-label="已加载任务的运行状态"><span><strong>{unavailable ? '—' : issues.filter(issue => signals.get(issue.id).running).length}</strong>运行中</span><span><strong>{unavailable ? '—' : issues.filter(issue => signals.get(issue.id).waiting).length}</strong>等待 / 暂缓</span><span className="mm-overview-attention"><strong>{unavailable ? '—' : issues.filter(issue => signals.get(issue.id).current || signals.get(issue.id).uncertain).length}</strong>需关注或复核</span><span><strong>{issues.filter(issue => signals.get(issue.id).historical).length}</strong>有历史失败</span></div>
    <div className="mm-list-filters"><input aria-label="搜索业务任务" placeholder="搜索任务名称或编号" value={query} onChange={event => onQueryChange?.(event.target.value)}/><select aria-label="任务关注范围" value={filter} onChange={event => onFilterChange?.(event.target.value)}><option value="all">全部任务</option><option value="attention">当前需关注</option><option value="active">活动运行</option><option value="history">有历史失败</option></select></div>
    {visible.length > 0 && <div className="mm-business-columns" aria-hidden="true"><div><span>任务 / 层级</span><span>业务状态</span><span>当前工作</span><span>操作</span></div><span>异常与耗时</span></div>}
    {issues.length === 0 ? <div className="mm-empty"><h3>暂无可展示的任务</h3><p>任务创建后会显示在这里。</p></div> : !visible.length ? <p className="mm-empty">没有符合筛选条件的任务。</p> : <ul className="mm-business-rows">{ordered.map(({ issue, depth }) => {
      const signal = signals.get(issue.id);
      const related = byIssue.get(issue.id) || [];
      const parentId = issue.parentIssueKnown === true ? issue.parentIssueId : null;
      const parent = parentId && issues.find(item => item.id === parentId);
      const activeRuns = related.filter(run => activeStates.has(run.status));
      const running = activeRuns.find(run => run.status === 'running') || activeRuns[0];
      const { stale, current, action } = observedWork(running, running, unavailable);
      const agent = running && (running.agentName || agents.find(item => item.id === running.agentId)?.name || '智能体未提供');
      return <li key={issue.id} className="mm-business-row" data-child={depth > 0 || undefined}><button type="button" className="mm-business-open" onClick={() => onSelect(issue.id)}>
        <span className="mm-business-title" style={{ paddingInlineStart: `${Math.min(depth, 6) * 18}px` }}><span className="mm-muted">{issue.identifier || issue.id.slice(-8)}{parentId ? ` · 子任务，父任务 ${parent?.identifier || parentId.slice(-8)}` : issue.parentIssueKnown === false ? ' · 父关系未提供' : ''}</span><strong>{issue.title || '任务名称未提供'}</strong></span>
        <span className="mm-business-state"><Badge status={issue.status} label={businessLabel(statuses, issue.status)}/>{activeRuns.length > 0 && <span>{activeRuns.length} 次活动运行</span>}</span>
        {running && <span className="mm-business-activity"><strong>{agent}</strong><span>{action ? `${current ? '等待工具结果' : '最近动作'}：${action.summary}${stale ? '（采集异常或日志未补齐，可能过期）' : ''}` : stale ? '工作记录暂不可核实' : '暂无可识别的工作记录'}</span></span>}
        {!running && <span className="mm-business-activity mm-idle">暂无活动运行</span>}
        <span className="mm-business-link">查看详情 →</span>
      </button>{(signal.current > 0 || signal.uncertain > 0 || signal.historical > 0 || unavailable || signal.longestMs !== null || signal.latestActionAt) && <div className="mm-business-signals"><div className="mm-business-health">{signal.current > 0 && <button className="mm-signal-danger" onClick={() => onAlerts?.(issue.id)}>当前告警 {signal.current} · {signal.titles.join('、')}</button>}{unavailable && <span className="mm-signal-warning">{unavailableLabel}</span>}{signal.uncertain > 0 && <span className="mm-signal-warning">{signal.uncertain} 条提醒待复核</span>}{signal.historical > 0 && <button onClick={() => onAlerts?.(issue.id)}>历史失败 {signal.historical} 次</button>}</div>{(signal.longestMs !== null || signal.latestActionAt) && <div className="mm-business-observation">{signal.longestMs !== null && <span>当前最长运行 {durationLabel(signal.longestMs)}</span>}{signal.latestActionAt && <span>最近工作记录 {time(signal.latestActionAt)}</span>}</div>}</div>}</li>;
    })}</ul>}
    <p className="mm-muted mm-list-note">活动与告警仅覆盖监控快照；历史失败为已采集记录，不表示当前故障。工作记录时间不等于采集时间。</p>
  </section>;
}

function IssueDetail({ api, issueId, statuses, agents, webUrl, workspaceSlug, revision, onClose, onSelectIssue, preferredRunId = '', observedRuns = [], issues = [], runtimes = [], unavailable = false, primary = false, settings = {} }) {
  const [evidenceTab, setEvidenceTab] = useState('execution'), [traceFocused, setTraceFocused] = useState(false);
  const [data, setData] = useState(null), [error, setError] = useState(''), [selectedRun, setSelectedRun] = useState(preferredRunId);
  const [refresh, setRefresh] = useState(0);
  const [view, setView] = useState('graph'), [inspectorOpen, setInspectorOpen] = useState(Boolean(preferredRunId));
  const initialViewChosen = useRef(false), defaultRelationshipView = useRef('graph');
  const inspectorHeading = useRef(null), canvasRef = useRef(null), restoreSelection = useRef(false);
  const inspectorRef = useRef(null), evidenceRef = useRef(null);
  useSurfaceMotion(canvasRef,view);
  useSurfaceMotion(inspectorRef,`${inspectorOpen}:${traceFocused}:${selectedRun}`);
  useSurfaceMotion(evidenceRef,evidenceTab);
  const openRun = id => { setSelectedRun(id); setInspectorOpen(true); setTraceFocused(false); };
  const closeRun = () => { restoreSelection.current = true; setInspectorOpen(false); };
  useEffect(() => {
    if (inspectorOpen) {
      if (window.innerWidth < 900) inspectorHeading.current?.scrollIntoView({ block: 'nearest', behavior: 'auto' });
      inspectorHeading.current?.focus({ preventScroll: true });
    } else if (restoreSelection.current) {
      restoreSelection.current = false;
      const selected = canvasRef.current?.querySelector('[aria-pressed="true"], [aria-current="true"]');
      selected?.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'auto' });
      selected?.focus({ preventScroll: true });
    }
  }, [inspectorOpen, selectedRun]);
  useEffect(() => {
    let live = true, timer;
    const controller = new AbortController();
    setError('');
    const sync = async () => {
      try {
        const next = await api('issue', { issueId }, controller.signal);
        if (live) {
          setData(next); setError(''); setSelectedRun(old => selectAvailableRun(old, preferredRunId, next.runs));
          defaultRelationshipView.current = defaultTaskView(next);
          if (!initialViewChosen.current) {
            setView(defaultRelationshipView.current);
            initialViewChosen.current = true;
          }
        }
      } catch (error) { if (live) setError(errorMessage(error)); }
      finally { if (live) timer = setTimeout(sync, 10000); }
    };
    void sync();
    return () => { live = false; clearTimeout(timer); controller.abort(); };
  }, [api, issueId, revision, refresh]);
  const run = data?.runs.find(item => item.id === selectedRun);
  const taskMonitor = useTaskMonitor({ runs: data?.runs || [], observedRuns, agents, runtimes, issueId, unavailable: unavailable || Boolean(error), settings });
  const issue = data?.issue;
  const sourceIssue = issue || issues.find(item => item.id === issueId);
  const url = workspaceSlug && sourceIssue ? `${webUrl}/${encodeURIComponent(workspaceSlug)}/issues/${encodeURIComponent(sourceIssue.identifier || sourceIssue.id)}` : null;
  const agentCount = new Set((data?.runs || []).map(item => item.agentId).filter(Boolean)).size;
  const childCount = data?.relations?.items.filter(item => item.kind === 'child').length || 0;
  const parentLabel = issue?.parentIssueKnown ? issue.parentIssueId ? '有父任务' : '无父任务' : '父关系待核实';
  const childrenLabel = data?.relations?.availability.children === 'available' && !data?.relations?.childrenTruncated ? childCount ? `${childCount} 个子任务` : '无业务子任务' : '子任务尚未完整读取';
  return <section className={`mm-detail ${primary ? 'mm-task-workspace' : ''}`} aria-label="任务详情">
    {primary ? <><button className="mm-task-back" onClick={onClose}>返回任务列表</button><div className="mm-task-workspace-heading"><label><TypeIcon type="task"/>业务任务<select aria-label="选择业务任务" value={issueId} onChange={event => onSelectIssue(event.target.value)}>{!issues.some(item => item.id === issueId) && <option value={issueId}>{issue?.identifier || issueId} · {issue?.title || '正在读取'}</option>}{issues.map(item => <option key={item.id} value={item.id}>{item.identifier || item.id.slice(-8)} · {item.title}</option>)}</select></label>{issue && <div className="mm-actions"><Badge status={issue.status} label={businessLabel(statuses, issue.status)}/>{url && <a href={url} target="_blank" rel="noreferrer">在 Multica 打开</a>}</div>}</div></> : <div className="mm-section-heading"><h2>{issue ? `${issue.identifier || ''} ${issue.title}` : '任务详情'}</h2><button onClick={onClose} aria-label="关闭任务详情"><Icon kind="close"/></button></div>}
    {error && <p role="alert" className="mm-error">{error}{data ? '；当前显示上次成功读取的数据。' : ''}</p>}
    {!data ? <div role="status" className="mm-empty"><p>{error ? '详情暂时不可用，请重新读取或在 Multica 查看。' : '正在读取任务…'}</p>{error && <div className="mm-actions"><button type="button" onClick={() => setRefresh(value => value + 1)}>重新读取</button>{url && <a href={url} target="_blank" rel="noreferrer">在 Multica 打开</a>}</div>}</div> : <>
      <div className="mm-task-facts"><span>{data.runs.length} 次运行</span><span>{agentCount} 名智能体</span><details className="mm-hierarchy-disclosure"><summary>任务层级 · {parentLabel} · {childrenLabel}</summary><BusinessHierarchy detail={data} issues={issues} onSelectIssue={onSelectIssue}/></details></div>
      <TaskAttention monitor={taskMonitor} unavailable={unavailable || Boolean(error)} onSelectRun={openRun}/>
      <nav className="mm-detail-tabs mm-view-switcher" aria-label="展示模式">{[['graph','调用流程图'],['timeline','运行时间线']].map(([key,label]) => <button key={key} aria-current={view === key ? 'page' : undefined} onClick={() => { initialViewChosen.current = true; setView(key); setInspectorOpen(false); }}>{label}</button>)}<span className="mm-muted">{inspectorOpen ? '正在分析运行 · 可返回查看关系' : '选择运行查看输入、输出与耗时'}</span></nav>
      {defaultRelationshipView.current === 'timeline' && view === 'timeline' && <p className="mm-muted mm-call-notice">已加载运行之间暂无服务端确认的调用关系，先按时间查看各次运行；仍可切换到调用图核对来源。</p>}
      {data.runHistoryTruncated && <p className="mm-muted">运行历史存在截断或归属异常；当前只展示已核实的记录。</p>}
      {preferredRunId && selectedRun === preferredRunId && !run && <p role="status" className="mm-notice">指定运行未在已加载的任务历史中找到，可能已被截断或删除。可在 Multica 中核实，或选择其他运行。</p>}
      {data.warnings?.map((warning, index) => <p className="mm-muted" key={index}>{warning}</p>)}
      <div className={`mm-relation-workspace ${inspectorOpen && run ? 'has-inspector' : ''} ${traceFocused ? 'trace-focused' : ''}`}>
      <main className="mm-relation-canvas" ref={canvasRef}>
        {view === 'graph' ? <CallGraph settings={settings} runtimes={runtimes} unavailable={unavailable || Boolean(error)} api={api} detail={data} observedRuns={observedRuns} onSelectRun={openRun} selectedRunId={inspectorOpen ? selectedRun : ""}/> : <TaskMonitorTimeline settings={settings} monitor={taskMonitor} truncated={data.runHistoryTruncated} onSelectRun={openRun} selectedRunId={selectedRun}/>}
      </main>
      {inspectorOpen && run && <aside ref={inspectorRef} className="mm-run-inspector" aria-label="选中运行的进展"><div className="mm-section-heading"><h2 ref={inspectorHeading} tabIndex={-1}>所选运行</h2><button onClick={closeRun}>关闭详情，返回{view === 'graph' ? '调用图' : '时间线'}</button></div>
      <label className="mm-run-picker">运行记录<select value={selectedRun} onChange={event => setSelectedRun(event.target.value)} disabled={!data.runs.length}>
        {!data.runs.length && <option value="">暂无运行</option>}{data.runs.map(r => <option key={r.id} value={r.id}>{r.agentName || agents.find(agent => agent.id === r.agentId)?.name || '未知智能体'} · {runLabels[r.status] || r.status} · {time(r.createdAt)} · {r.id.slice(-8)}</option>)}
      </select></label>
        <div className="mm-run-action-strip"><span><AgentAvatar name={run.agentName || agents.find(a=>a.id===run.agentId)?.name} size={23}/>{run.agentName || agents.find(a => a.id === run.agentId)?.name || '智能体未提供'} · <Badge status={run.status}/></span><RunActions api={api} issueId={issue.id} run={run} onCompleted={() => setRefresh(value => value + 1)}/></div>
        {run.error && <FailureDiagnosis error={run.error}/>}
        <nav className="mm-evidence-switch" aria-label="运行展示方式"><button aria-pressed={evidenceTab === 'execution'} onClick={() => setEvidenceTab('execution')}>输入与输出</button><button aria-pressed={evidenceTab === 'waterfall'} onClick={() => setEvidenceTab('waterfall')}>时间瀑布图</button><button aria-pressed={evidenceTab === 'conversation'} onClick={() => setEvidenceTab('conversation')}>执行记录</button><button aria-pressed={evidenceTab === 'progress'} onClick={() => setEvidenceTab('progress')}>执行概览</button><button aria-pressed={!traceFocused} onClick={() => setTraceFocused(value => !value)}>{traceFocused ? '返回图与详情并排' : '展开运行详情'}</button></nav>
        <div ref={evidenceRef} className="mm-evidence-content">{['execution','waterfall'].includes(evidenceTab) ? <RunExecution waterfallOnly={evidenceTab === 'waterfall'} key={`execution:${run.id}:${revision}`} api={api} run={run} issue={issue} runs={data.runs} agents={agents} revision={revision} observedRun={observedRuns.find(item => item.id === run.id)} runtimeStatus={runtimes.find(item => item.id === run.runtimeId)?.status} settings={settings} unavailable={unavailable || Boolean(error)} url={url} onInspect={openRun}/> : evidenceTab === 'conversation' ? <RunConversation key={`conversation:${run.id}:${revision}`} api={api} run={run} issue={issue} agentName={run.agentName || agents.find(agent => agent.id === run.agentId)?.name} revision={revision} unavailable={unavailable || Boolean(error)}/> : <RunMessages key={`messages:${run.id}:${revision}`} api={api} run={run} revision={revision} observedRun={observedRuns.find(item => item.id === run.id)}/>}</div>
        <details className="mm-run-metadata" key={`metadata:${run.id}:${revision}`}><summary>运行时间</summary><dl className="mm-run-info"><div><dt>开始时间</dt><dd>{time(run.startedAt)}</dd></div><div><dt>结束时间</dt><dd>{time(run.completedAt)}</dd></div></dl></details>
        <p className="mm-muted">运行完成不代表业务任务已验收。</p>
      </aside>}
      </div>
    </>}
  </section>;
}

export function Monitor({ api, close, initialTab = 'runs' }) {
  const [settings, setSettings] = useState(null), [configOpen, setConfigOpen] = useState(false), [workspaces, setWorkspaces] = useState([]);
  const [settingsDirty, setSettingsDirty] = useState(false), [confirmSettingsClose, setConfirmSettingsClose] = useState('');
  const [data, setData] = useState(null), [monitor, setMonitor] = useState(null), [error, setError] = useState(''), [connectionError, setConnectionError] = useState('');
  const [loading, setLoading] = useState(false), [revision, setRevision] = useState(0), [selectedIssue, setSelectedIssue] = useState('');
  const [tab, setTab] = useState(new URLSearchParams(location.search).get('view') || initialTab);
  const [taskFilter, setTaskFilter] = useState(new URLSearchParams(location.search).get('filter')||'all'), [taskQuery, setTaskQuery] = useState(new URLSearchParams(location.search).get('q')||'');
  const scrollRef = useRef(null), taskListScrollTop = useRef(0);
  const motionRoot = useRef(null);
  useMotionController(motionRoot);
  useSurfaceMotion(scrollRef,`${tab}:${selectedIssue}:${configOpen}`,configOpen ? '.mm-settings' : selectedIssue ? '.mm-task-workspace' : tab === 'runs' ? '.v2-task-list' : tab === 'runtimes' ? '.mm-runtime-view' : '.mm-main');
  const [theme, setTheme] = useState(() => { try { return normalizeTheme(localStorage.getItem('multica-monitor.theme')); } catch { return normalizeTheme(null); } });
  const changeTheme = value => { const next = normalizeTheme(value); setTheme(next); try { localStorage.setItem('multica-monitor.theme', next); } catch { /* The theme remains usable when storage is unavailable. */ } };
  const [changingWorkspace, setChangingWorkspace] = useState(false);
  const [initialRunId, setInitialRunId] = useState('');
  const [alertIssue, setAlertIssue] = useState('');
  const settingsButton = useRef(null), discardConfirm = useRef(null);
  useEffect(() => { if (confirmSettingsClose) discardConfirm.current?.focus(); }, [confirmSettingsClose]);
  const requestConfigClose = () => { if (settingsDirty) setConfirmSettingsClose('config'); else setConfigOpen(false); };
  const requestMonitorClose = () => { if (settingsDirty) setConfirmSettingsClose('monitor'); else close(); };
  useEffect(()=>{const p=new URLSearchParams();if(tab!=='runs')p.set('view',tab);const task=data?.issues?.find(i=>i.id===selectedIssue);if(task)p.set('task',task.identifier);if(taskFilter!=='all')p.set('filter',taskFilter);if(taskQuery)p.set('q',taskQuery);history.replaceState(null,'',location.pathname+(p.size?'?'+p.toString():''));},[tab,selectedIssue,taskFilter,taskQuery,data]);
  const selectIssue = (issueId, runId = '') => {
    if (issueId && !selectedIssue && tab === 'runs') taskListScrollTop.current = scrollRef.current?.scrollTop || 0;
    setSelectedIssue(issueId); setInitialRunId(runId);
  };
  useEffect(() => {
    if (tab === 'runs' && !selectedIssue && scrollRef.current) scrollRef.current.scrollTop = taskListScrollTop.current;
  }, [selectedIssue, tab]);
  const initialFocus = useRef(null);
  useEffect(() => {
    let live = true;
    initialFocus.current?.focus();
    api('settings').then(next => { if (live) { setSettings(next); setConfigOpen(!next.hasToken); } }).catch(e => { if (live) setConnectionError(errorMessage(e)); });
    return () => { live = false; };
  }, [api]);
  useEffect(() => {
    let live = true;
    setWorkspaces([]);
    if (!settings?.hasToken) return;
    api('workspaces').then(items => { if (live) { setWorkspaces(items); setConnectionError(''); } }).catch(e => { if (live) setConnectionError(errorMessage(e)); });
    return () => { live = false; };
  }, [api, settings]);
  useEffect(() => {
    if (!settings?.hasToken || !settings.workspaceId) return;
    let live = true, timer, fallbackAt = 0;
    const controller = new AbortController();
    const sync = async () => {
      setLoading(true);
      try {
        const next = await api('monitor', {}, controller.signal);
        if (!live) return;
        setMonitor(next); setError(next.error || '');
        if (next.overview) setData({ ...next.overview, fetchedAt: next.lastSyncAt });
        else if (!next.enabled && Date.now() - fallbackAt >= 10000) {
          fallbackAt = Date.now();
          const overview = await api('overview', {}, controller.signal);
          if (live) setData(overview);
        }
      }
      catch (e) { if (live) setError(errorMessage(e)); }
      finally { if (live) { setLoading(false); timer = setTimeout(sync, 2000); } }
    };
    void sync();
    return () => { live = false; clearTimeout(timer); controller.abort(); };
  }, [api, settings, revision]);
  const saved = async next => {
    setData(null); setMonitor(null); setSelectedIssue(''); setError(''); setConnectionError('');
    setSettings(next); setConfigOpen(!next.hasToken); setSettingsDirty(false); setConfirmSettingsClose('');
  };
  const selectWorkspace = async id => {
    setChangingWorkspace(true);
    try { await saved(await api('saveSettings', { workspaceId: id })); }
    catch (e) { setConnectionError(errorMessage(e)); }
    finally { setChangingWorkspace(false); }
  };
  const workspace = workspaces.find(w => w.id === settings?.workspaceId);
  const statuses = data?.statuses || [];
  const unread = (monitor?.alerts || []).filter(alert => !alert.acknowledged && !alert.resolvedAt && !alert.historical).length;
  const monitorPaused = monitor?.enabled === false;
  const unavailable = Boolean(error || monitor?.error || monitor?.connectionStatus === 'error' || monitorPaused);
  const metricsReady = Boolean(monitor?.metrics) && !unavailable;
  const statusLabel = { live: '事件已连接 · HTTP 补偿', polling: 'HTTP 持续采集 · 10 秒兜底', error: '连接中断 · 数据可能过期', disabled: '持续采集已暂停' }[monitor?.connectionStatus] || '等待同步';
  const refresh = async () => {
    setLoading(true);
    try { setMonitor(await api('refreshMonitor')); setRevision(x => x + 1); }
    catch (e) { setError(errorMessage(e)); }
    finally { setLoading(false); }
  };
  return <section ref={motionRoot} className="mm mm-v2" data-theme={theme} role="region" aria-labelledby="mm-title" onKeyDown={event => { if (event.key === 'Escape' && !event.defaultPrevented && !event.target?.closest?.('[role="alertdialog"],dialog,[data-mm-escape-scope]')) { event.stopPropagation(); requestMonitorClose(); } }}>
    <aside className="v2-sidebar"><a className="v2-brand" href="./"><span className="v2-brand-mark">M</span><span>Multica<span className="v2-brand-sub">任务观测台</span></span></a><div className="v2-workspace"><span>当前工作区</span><strong>{workspace?.name || '正在读取…'}</strong></div><span className="v2-nav-label">工作台</span><nav className="mm-tabs v2-nav" aria-label="监控视图">{[['runs','任务监控'],['alerts','异常提醒'],['metrics','执行性能'],['runtimes','运行时']].map(([key,label]) => <button key={key} aria-current={tab === key ? 'page' : undefined} onClick={() => { setTab(key); setAlertIssue(''); setSelectedIssue(''); setInitialRunId(''); }}><TypeIcon type={key==='runs'?'task':key==='alerts'?'error':key==='metrics'?'activity':'system'}/>{label}{key === 'alerts' && !unavailable && unread > 0 && <span>{unread}</span>}</button>)}</nav><div className="v2-side-bottom"><span className="v2-snapshot-dot"/>真实数据静态快照<br/><small>2026-11-05 08:33</small><a href="http://127.0.0.1:55315/" target="_blank" rel="noreferrer">打开原版对比 ↗</a></div></aside>
    <header className="mm-header"><div><p className="v2-breadcrumb">工作区 / {workspace?.name || '…'} / {selectedIssue ? '任务详情' : {runs:'任务监控',alerts:'异常提醒',metrics:'执行性能',runtimes:'运行时'}[tab]}</p><h1 id="mm-title">{selectedIssue ? '任务运行详情' : {runs:'任务监控',alerts:'异常提醒',metrics:'执行性能',runtimes:'运行时'}[tab]}</h1></div><div className="mm-actions"><span className="v2-snapshot-label">静态快照 · 11 月 5 日</span><button ref={settingsButton} onClick={() => configOpen ? requestConfigClose() : setConfigOpen(true)} disabled={!settings || !settings.hasToken}>连接信息</button><a className="v2-original" href="http://127.0.0.1:55315/" target="_blank" rel="noreferrer">对照原版 ↗</a></div></header>
    <div className="mm-scroll" ref={scrollRef}>
      {connectionError && <p role="alert" className="mm-error">{connectionError}<button onClick={() => { if (settings) setSettings({ ...settings }); else api('settings').then(setSettings).catch(e => setConnectionError(errorMessage(e))); }}>重试</button></p>}
      {!settings && !connectionError && <p role="status">正在读取配置…</p>}
      {settings && (configOpen || !settings.hasToken) && <ConnectionForm key={settings.revision} api={api} settings={settings} onSaved={saved} onClose={requestConfigClose} onDirtyChange={() => setSettingsDirty(true)}/>}
      {confirmSettingsClose && <div className="mm-settings-discard" role="group" aria-label="确认放弃连接设置改动" data-mm-escape-scope onKeyDown={event => { if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); setConfirmSettingsClose(''); settingsButton.current?.focus(); } }}><p>连接设置有未保存的改动。{confirmSettingsClose === 'monitor' ? '退出监控' : '收起配置'}后这些改动会丢失。</p><div className="mm-actions"><button ref={discardConfirm} type="button" onClick={() => { const leaveMonitor = confirmSettingsClose === 'monitor'; setConfirmSettingsClose(''); setSettingsDirty(false); setConfigOpen(false); if (leaveMonitor) close(); else settingsButton.current?.focus(); }}>{confirmSettingsClose === 'monitor' ? '放弃改动并退出' : '放弃改动并收起'}</button><button type="button" onClick={() => { setConfirmSettingsClose(''); settingsButton.current?.focus(); }}>继续编辑</button></div></div>}
      {settings?.hasToken && <>
        <details className="mm-connection-details" open={!settings.workspaceId || undefined}><summary><span>{workspace?.name || '工作区与连接'}</span><span className={error ? 'mm-error-text' : 'mm-muted'}>静态快照 · 刷新仅重放已有数据</span></summary><div className="mm-toolbar"><label className="mm-workspace">工作区<select aria-label="工作区" value={settings.workspaceId} disabled={changingWorkspace} onChange={event => void selectWorkspace(event.target.value)}><option value="">选择工作区</option>{workspaces.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}</select></label><button disabled={!settings.workspaceId || loading} onClick={() => void refresh()}><Icon kind="refresh"/>重载快照</button></div></details>
        {error && <p role="alert" className="mm-error">{error}{data && '；以下保留上次快照。'}</p>}
        {(monitor?.warnings || data?.warnings)?.length > 0 && <div className="mm-notice" role="status">{(monitor?.warnings || data.warnings).map((warning, index) => <p key={index}>{typeof warning === 'string' ? warning : '采集警告，请检查连接状态。'}</p>)}</div>}
        {!settings.workspaceId ? <div className="mm-empty"><h2>选择要监控的工作区</h2><p>连接后开始持续观察任务、运行日志和异常。</p></div> : !data || !monitor ? <div className="mm-empty" role="status">{loading || monitor?.enabled ? '正在建立监控快照…' : '暂时没有可展示的数据，请检查连接后重试。'}</div> : <>
          {tab !== 'runs' && <div className="mm-summary" aria-label={metricsReady ? '当前监控快照' : '当前监控快照待核实'}><span>活动运行 <strong>{metricsReady ? monitor.metrics.active ?? '—' : '—'}</strong></span><span>排队 <strong>{metricsReady ? monitor.metrics.queued ?? '—' : '—'}</strong></span><span className={metricsReady && unread ? 'mm-error-text' : ''}>待关注 <strong>{metricsReady ? unread : '—'}</strong></span><span>已观测终态 <strong>{metricsReady ? (monitor.metrics.sampleSize ?? 0) + (monitor.metrics.cancelled ?? 0) : '—'}</strong></span>{!metricsReady && <span className="mm-muted">{monitorPaused ? '持续采集已暂停' : '采集待核实'}</span>}</div>}

          {tab === 'runs' && (selectedIssue ? <IssueDetail settings={settings} unavailable={unavailable} primary runtimes={data.runtimes || []} key={settings.revision + selectedIssue + initialRunId} onClose={() => selectIssue('')} onSelectIssue={selectIssue} issues={data.issues} preferredRunId={initialRunId} observedRuns={monitor.runs || []} api={api} issueId={selectedIssue} statuses={statuses} agents={data.agents} webUrl={settings.webUrl} workspaceSlug={workspace?.slug} revision={revision}/> : <TaskList alerts={monitor.alerts || []} historicalFailures={monitor.historicalFailures || []} unavailable={unavailable} unavailableLabel={monitorPaused ? '持续监控已暂停，当前状态待核实' : undefined} filter={taskFilter} query={taskQuery} onFilterChange={setTaskFilter} onQueryChange={setTaskQuery} onAlerts={id => { setAlertIssue(id); setTab('alerts'); }} issues={data.issues} runs={monitor.runs || []} agents={data.agents} statuses={statuses} issuesTruncated={data.issuesTruncated} onSelect={selectIssue}/>)}
          {['alerts','metrics'].includes(tab) && <div className="mm-body"><main className="mm-main">{tab === 'alerts' && <AlertsView scopedIssueId={alertIssue} onClearScope={() => setAlertIssue('')} monitor={monitor} api={api} settings={settings} issues={data.issues} agents={data.agents} onSettingsSaved={saved} onSelect={(id, runId) => { selectIssue(id,runId); setTab('runs'); }} onUpdate={setMonitor}/>} {tab === 'metrics' && <MetricsView monitor={monitor} agents={data.agents}/>}</main></div>}
          {tab === 'issues' && <RunsView monitor={monitor} issues={data.issues} issuesTruncated={data.issuesTruncated} onSelect={(id, runId) => { selectIssue(id,runId); setTab('runs'); }} Badge={Badge} businessStatusLabel={key => businessLabel(statuses, key)}/>}
          {tab === 'runtimes' && (
            <RuntimeView runtimes={data.runtimes} available={data.available?.runtimes !== false} Badge={Badge}/>
          )}
        </>}
      </>}
    </div>
    <footer className="mm-footer"><span>新版对照稿 · 所有系统写操作已隔离</span><span>真实快照 · 10 个任务 / 22 次运行 / 6,960 条日志</span></footer>
  </section>;
}

export function apply(ctx) {
  ctx.effect(() => { const style = document.createElement('style'); style.textContent = [css,timelineCss,graphCss,consoleCss,traceCss,conversationCss,executionCss,waterfallCss,taskMonitorCss,redesignCss,iconCss,polishCss].join('\n'); document.head.append(style); return () => style.remove(); }, 'multica-monitor: styles');
  let previousFocus = null, unread = 0, openView = 'runs';
  const panelId = 'multica-monitor';
  const panelInfo = ctx.layout.panelInfo;
  const isSelected = () => panelInfo.getSnapshot().activePanelId === panelId;
  const listeners = new Set();
  const open = (view = 'runs') => { previousFocus = document.activeElement; openView = view; ctx.layout.selectPanel(panelId); for (const listener of listeners) listener(); };
  const close = () => { ctx.layout.selectPanel(null); previousFocus?.focus?.(); };
  const createApi = () => {
    let connectionRevision = '';
    return async (action, payload = {}, signal) => {
      const transport = await fetch('api/multica-monitor', {
        method: 'POST', credentials: 'same-origin', signal,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ endpoint: action, payload: { ...payload, connectionRevision } }),
      });
      if (!transport.ok) throw new Error(transport.status === 401 || transport.status === 403 ? 'DSH 登录已失效或无访问权限，请重新打开 DSH' : `监控宿主返回 HTTP ${transport.status}`);
      const response = await transport.json();
      if (!response.ok) throw new Error(response.error?.message || response.error || '监控服务请求失败');
      if (action === 'settings' || action === 'saveSettings') connectionRevision = response.value.revision;
      return response.value;
    };
  };
  const api = createApi(), notificationApi = createApi();
  const subscribe = callback => { listeners.add(callback); return () => listeners.delete(callback); };
  function Button({ wide }) {
    const count = useSyncExternalStore(subscribe, () => unread);
    const selected = useSyncExternalStore(panelInfo.subscribe, isSelected);
    return <button className="mm-launch" aria-current={selected ? 'page' : undefined} title={`Multica 监控${count ? ` · ${count} 条待关注` : ''}`} aria-label="打开 Multica 监控" onClick={() => open()}><Icon/>{wide && <span>Multica 监控</span>}{count > 0 && <span className="mm-unread">{count}</span>}</button>;
  }
  function Notifications({ isOpen }) {
    const [alert, setAlert] = useState(null);
    const seen = useRef(new Set());
    useEffect(() => {
      let live = true, timer, scope = '';
      const controller = new AbortController();
      const poll = async () => {
        try {
          const settings = await notificationApi('settings', {}, controller.signal);
          if (!live) return;
          if (scope !== settings.revision) { scope = settings.revision; seen.current.clear(); setAlert(null); }
          const state = settings.hasToken && settings.workspaceId ? await notificationApi('alerts', {}, controller.signal) : { alerts: [] };
          if (!live) return;
          const pending = state.alerts.filter(item => !item.acknowledged && !item.resolvedAt && !item.historical);
          unread = pending.length; for (const listener of listeners) listener();
          const next = [...pending].reverse().find(item => !seen.current.has(item.id));
          for (const item of state.alerts) seen.current.add(item.id);
          while (seen.current.size > 400) seen.current.delete(seen.current.values().next().value);
          if (next) setAlert(next);
          else setAlert(previous => previous && pending.some(item => item.id === previous.id) ? previous : null);
        } catch { /* The panel exposes connection errors; background notifications never change tasks. */ }
        finally { if (live) timer = setTimeout(poll, 3000); }
      };
      void poll();
      return () => { live = false; controller.abort(); clearTimeout(timer); };
    }, []);
    return !isOpen && alert ? <aside className="mm-toast" role="status"><div><strong>Multica · {alert.title}</strong><p>{alert.suggestion}</p></div><button onClick={() => { setAlert(null); open('alerts'); }}>查看提醒</button><button aria-label="收起提醒" onClick={() => setAlert(null)}>×</button></aside> : null;
  }
  function Panel() {
    const view = useSyncExternalStore(subscribe, () => openView);
    return <div className="mm-panel"><Monitor key={view} api={api} close={close} initialTab={view}/></div>;
  }
  function NotificationLayer() {
    const isOpen = useSyncExternalStore(panelInfo.subscribe, isSelected);
    return <Notifications isOpen={isOpen}/>;
  }
  ctx.slots.inject('sidebar.footer.action', () => ctx.slots.register({ name: 'sidebar.footer.action', id: 'multica-monitor', order: 50 }, Button));
  ctx.slots.inject('main', () => ctx.slots.register({ name: 'main', key: panelId, id: panelId }, Panel));
  ctx.slots.inject('shell.overlay', () => ctx.slots.register({ name: 'shell.overlay', id: 'multica-monitor-notifications' }, NotificationLayer));
}
