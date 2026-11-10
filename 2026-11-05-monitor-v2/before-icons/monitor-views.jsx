import React, { useEffect, useRef, useState } from 'react';
import { FailureDiagnosis } from './failure-diagnosis-view.jsx';
import { diagnoseFailure } from './failure-diagnosis.mjs';
import { RunProgressSummary } from './work-progress-view.jsx';
import { buildTaskGroups } from './task-relationships.mjs';

const active = new Set(['queued', 'dispatched', 'running', 'waiting_local_directory', 'deferred']);
const date = value => value && Number.isFinite(Date.parse(value)) ? new Date(value).toLocaleString('zh-CN', { hour12: false }) : '—';
const number = value => typeof value === 'number' && Number.isFinite(value) ? value.toLocaleString('zh-CN', { maximumFractionDigits: 1 }) : '—';
const latency = value => typeof value === 'number' && Number.isFinite(value) && value < 1000 ? `${Math.round(value)} 毫秒` : duration(value);
const timeValue = value => Number.isFinite(Date.parse(value)) ? Date.parse(value) : 0;
const alertRank = alert => (alert.acknowledged ? 2 : alert.severity === 'critical' ? 0 : 1);
export function duration(value) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return '—';
  const seconds = Math.floor(Math.max(0, value) / 1000);
  return seconds < 60 ? `${seconds} 秒` : seconds < 3600 ? `${Math.floor(seconds / 60)} 分 ${seconds % 60} 秒` : `${Math.floor(seconds / 3600)} 小时 ${Math.floor(seconds % 3600 / 60)} 分`;
}

export function RunsView({ monitor, issues = [], onSelect, Badge, businessStatusLabel = value => value, issuesTruncated = false }) {
  const model = buildTaskGroups(issues, monitor.runs || [], { coverage: { issues: issuesTruncated ? 'partial' : 'complete', runs: 'partial', dependencies: 'unsupported' } });
  const byId = new Map(model.groups.map(group => [group.id, group]));
  const activity = id => {
    const group = byId.get(id);
    return group.runs.filter(run => active.has(run.status)).length + group.children.reduce((sum, child) => sum + activity(child), 0);
  };
  const ordered = ids => [...ids].sort((a, b) => activity(b) - activity(a));
  const renderGroup = (id, depth = 0) => {
    const group = byId.get(id), issue = group.issue, issueId = issue?.id || group.issueId;
    const title = issue?.title || group.runs[0]?.issueTitle || '业务任务信息未加载';
    const count = group.runs.filter(run => active.has(run.status)).length;
    return <section className={`mm-task-group ${depth ? 'mm-task-child' : ''}`} key={id} aria-label={`${issue?.identifier || '关联任务'} ${title}`}>
      <header className="mm-task-heading">
        <button className="mm-issue-button" onClick={() => onSelect(issueId)} disabled={!issueId}><span>{depth ? '子任务 · ' : ''}{issue?.identifier || issueId?.slice(-8) || '任务归属未知'}</span><strong>{title}</strong></button>
        {issue && <Badge status={issue.status} label={businessStatusLabel(issue.status)}/>}
      </header>
      <div className="mm-task-counts"><span>已观测 {group.runs.length} 次运行</span><span>{group.agentGroups.filter(agent => agent.identityKnown).length} 名智能体</span>{count > 0 && <strong>活动 {count}</strong>}{group.children.length > 0 && <span>已加载 {group.children.length} 个子任务</span>}<button className="mm-text-button" disabled={!issueId} onClick={() => onSelect(issueId)}>关系与完整运行历史</button></div>
      {group.parent.status === 'missing' && <p className="mm-muted mm-parent-note">父任务未在当前列表：<button className="mm-text-button" onClick={() => onSelect(group.parent.id)}>查看父任务 {group.parent.id.slice(-8)}</button></p>}
      {group.parent.status === 'cycle' && <p className="mm-error-text mm-parent-note">父子关系出现循环，已停止嵌套展示。</p>}
      {group.parent.status === 'unknown' && <p className="mm-muted mm-parent-note">父子关系尚未确认。</p>}
      {group.stage.known && group.stage.value !== null && <p className="mm-muted mm-parent-note">父任务中的阶段 {group.stage.value} · 阶段编号不代表串行依赖</p>}
      {group.agentGroups.map(agent => <section className="mm-agent-group" key={agent.id} aria-label={agent.agentName || '智能体未提供'}><h3>{agent.agentName || '智能体未提供'}<span>{agent.runs.length} 次观测运行</span></h3>
        {[...agent.runs].sort((a, b) => Number(active.has(b.status)) - Number(active.has(a.status)) || (Date.parse(b.createdAt) || 0) - (Date.parse(a.createdAt) || 0)).map(run => <div className="mm-grouped-run" key={run.id}>
          <div className="mm-grouped-run-meta"><button className="mm-text-button mm-run-id" onClick={() => onSelect(issueId, run.id)} disabled={!issueId}>运行 {run.id.slice(-8)}</button><Badge status={run.status}/><span className="mm-muted mm-numeric">耗时 {duration(run.elapsedMs)}</span>{run.queueMs > 0 && <span className="mm-muted mm-numeric">排队 {duration(run.queueMs)}</span>}</div>
          {run.observationError || run.logError ? <p className="mm-error-text">{run.observationError || run.logError}</p> : null}
          <RunProgressSummary run={run} onOpen={issueId ? () => onSelect(issueId, run.id) : undefined}/>
        </div>)}
      </section>)}
      {!group.runs.length && <p className="mm-muted mm-parent-note">本次监控尚未观测到运行；可打开任务历史核实。</p>}
      {group.children.length > 0 && <div className="mm-task-children">{ordered(group.children).map(child => renderGroup(child, depth + 1))}</div>}
    </section>;
  };
  return <div className="mm-list mm-task-list">
    <div className="mm-section-heading"><h2>任务与协作</h2><span className="mm-muted">{monitor.enabled ? '宿主持续采集' : '持续采集已暂停'}</span></div>
    <p className="mm-muted mm-group-scope">按业务任务归组，运行列在对应智能体下面。这里显示最近任务与本次观测记录；完整历史和并行时间线在任务详情中。</p>
    {ordered(model.roots).map(id => renderGroup(id))}
    {!model.groups.length && <div className="mm-empty"><h3>当前没有可展示的任务</h3><p>选择工作区并开始采集后，这里会展示任务、协作成员与运行进展。</p></div>}
    {(issuesTruncated || model.coverage.missingParents || model.coverage.cyclicParents) ? <p className="mm-muted mm-list-note">当前列表最多 100 个业务任务，部分层级可能未加载。打开任务可读取直接父子关系。</p> : null}
    <p className="mm-muted mm-list-note">执行清单属于单次运行，不作为业务子任务。完成项数不等于整体完成比例。</p>
  </div>;
}

export function AlertsView({ scopedIssueId = '', onClearScope, monitor, api, onSelect, onUpdate, settings = {}, issues = [], agents = [], onSettingsSaved }) {
  const [error, setError] = useState(''), [busy, setBusy] = useState(''), [editing, setEditing] = useState(false), [saving, setSaving] = useState(false), [settingsError, setSettingsError] = useState('');
  const alerts = [...(monitor.alerts || [])].filter(alert => !scopedIssueId || alert.issueId === scopedIssueId).sort((a, b) => Number(Boolean(a.resolvedAt || a.historical)) - Number(Boolean(b.resolvedAt || b.historical)) || alertRank(a) - alertRank(b) || timeValue(b.createdAt) - timeValue(a.createdAt));
  const acknowledge = async id => {
    setBusy(id); setError('');
    try { onUpdate(await api('acknowledgeAlert', { alertId: id })); }
    catch (e) { setError(e.message); }
    finally { setBusy(''); }
  };
  const current = alerts.filter(alert => !alert.historical && !alert.resolvedAt);
  const currentFailedRuns = new Set(current.filter(alert => alert.kind === 'failed').map(alert => alert.taskId));
  const historicalFailures = (Array.isArray(monitor.historicalFailures) ? monitor.historicalFailures : []).filter(failure => failure && failure.runId && (!scopedIssueId || failure.issueId === scopedIssueId) && !currentFailedRuns.has(failure.runId));
  const historicalGroups = [...historicalFailures.reduce((groups, failure) => {
    const diagnosis = diagnoseFailure(failure.error);
    const cause = diagnosis?.title || '错误未提供';
    const key = JSON.stringify([failure.issueId || failure.runId, cause === '暂未识别具体原因' || cause === '错误未提供' ? failure.error || failure.runId : cause]);
    if (!groups.has(key)) groups.set(key, { key, issueId: failure.issueId, cause, failures: [] });
    groups.get(key).failures.push(failure);
    return groups;
  }, new Map()).values()].map(group => ({ ...group, failures: group.failures.sort((a, b) => timeValue(b.failedAt || b.discoveredAt) - timeValue(a.failedAt || a.discoveredAt)) })).sort((a, b) => timeValue(b.failures[0]?.failedAt || b.failures[0]?.discoveredAt) - timeValue(a.failures[0]?.failedAt || a.failures[0]?.discoveredAt));
  const historicalRunIds = new Set(historicalFailures.map(failure => failure.runId));
  const historyCoverage = monitor.failureHistoryCoverage;
  const past = alerts.filter(alert => (alert.historical || alert.resolvedAt) && !(alert.kind === 'failed' && historicalRunIds.has(alert.taskId)));
  const threshold = name => Number.isFinite(settings[name]) ? `${settings[name]} 分钟` : '未提供';
  const blindRuns = (monitor.runs || []).filter(run => run.status === 'running' && (!scopedIssueId || run.issueId === scopedIssueId) && run.workProgress?.warnings?.includes('部分工具缺少可关联的调用标识'));
  const rules = [
    ['超长运行关注', `运行中，服务端开始时间距今达到 ${threshold('runMinutes')}`, '耗时长不代表故障'],
    ['长时间无进展', `运行中连续 ${threshold('noProgressMinutes')} 未观察到新日志、状态变化或进度事件`, '日志未追平、读取失败或运行时离线时不判断'],
    ['工具调用等待', `已观察 ${threshold('toolMinutes')} 未收到相同调用标识的结果`, '无调用标识的工具无法计时；日志未追平、读取失败或运行时离线时不判断'],
    ['排队时间较长', `进入监控后持续等待达到 ${threshold('queueMinutes')}`, '从开始观察等待状态计时'],
    ['运行失败', '监控期间确认运行进入失败状态', '启动前的失败单独作为历史记录展示'],
    ['运行时离线', '活动运行关联的运行时状态为离线', '离线不等于任务失败'],
  ];
  const renderAlert = alert => {
    const run = (monitor.runs || []).find(item => item.id === alert.taskId && (!alert.issueId || item.issueId === alert.issueId));
    const issueId = alert.issueId || run?.issueId;
    const issue = issues.find(item => item.id === issueId);
    const agent = agents.find(item => item.id === run?.agentId);
    const issueName = issue ? [issue.identifier, issue.title].filter(Boolean).join(' · ') : run?.issueTitle || '任务信息未提供';
    const agentName = run?.agentName || agent?.name || '智能体未提供';
    return <article key={alert.id} className={`mm-alert ${alert.resolvedAt || alert.historical ? 'is-past' : ''}`}>
      <div className="mm-section-heading"><h3><span className={`mm-alert-dot ${alert.severity === 'critical' ? 'critical' : ''}`}/>{alert.title}</h3><span className="mm-badge">{alert.resolvedAt ? '触发条件已消失' : alert.historical ? '历史提醒 · 当前未复核' : alert.verificationWarning ? '暂无法复核' : alert.acknowledged ? '已阅 · 仍在观察' : alert.severity === 'critical' ? '严重 · 待关注' : '待关注'}</span></div>
      <p className="mm-alert-context"><strong>{issueName}</strong><span>{agentName}</span><span>运行 ID：{alert.taskId || '未提供'}</span></p>
      <p className="mm-muted">触发时间 {date(alert.createdAt)}</p>
      {alert.verificationWarning && !alert.resolvedAt && !alert.historical && <p className="mm-alert-verification" role="status">暂无法复核：{alert.verificationWarning}</p>}
      <ul className="mm-evidence">{alert.evidence?.map((item, i) => <li key={i}>{item}</li>)}</ul>
      {alert.kind === 'failed' && run?.error && <FailureDiagnosis error={run.error}/>}
      <div className="mm-diagnosis"><span className="mm-eyebrow">{alert.diagnosis?.source === 'model' ? 'AI 诊断建议' : '规则诊断'}{alert.diagnosis?.status === 'pending' ? ' · 等待 AI 分析' : ''}</span><p>{alert.diagnosis?.source === 'model' ? alert.diagnosis.summary : alert.suggestion}</p>{alert.diagnosis?.reason && <p className="mm-muted">{alert.diagnosis.reason}</p>}{alert.diagnosis?.model && <p className="mm-muted">模型：{alert.diagnosis.model}</p>}</div>
      <div className="mm-actions">{alert.issueId && <button onClick={() => onSelect(alert.issueId, alert.taskId)}>查看任务与日志</button>}{!alert.acknowledged && <button disabled={Boolean(busy)} onClick={() => void acknowledge(alert.id)}>{busy === alert.id ? '正在标记…' : '标为已阅'}</button>}</div>
    </article>;
  };
  return <div className="mm-list mm-alert-list"><div className="mm-section-heading"><h2>异常提醒</h2><span className="mm-muted">保留最近 200 条提醒</span></div>
    {scopedIssueId && <div className="mm-alert-scope">仅查看 {issues.find(issue => issue.id === scopedIssueId)?.identifier || scopedIssueId} 的提醒 <button onClick={onClearScope}>查看全部任务</button></div>}
    {error && <p className="mm-error" role="alert">{error}</p>}
    {monitor.journalError && <p className="mm-error" role="alert">{monitor.journalError}</p>}
    {blindRuns.length > 0 && <section className="mm-alert-verification" aria-label="监控覆盖缺口"><strong>工具耗时检测存在盲区</strong><p>{blindRuns.length} 次运行的部分工具日志缺少调用标识，无法可靠计算这些工具的耗时或触发工具等待提醒。运行总耗时、运行失败和日志更新仍可监控。</p>{blindRuns.map(run => <button key={run.id} onClick={() => onSelect(run.issueId, run.id)}>{issues.find(issue => issue.id === run.issueId)?.identifier || '任务'} · {run.agentName || '智能体'} · 查看日志</button>)}</section>}
    {current.length > 0 && <section><h3 className="mm-alert-group-title">当前提醒 · {current.length}</h3>{current.map(renderAlert)}</section>}
    {(monitor.error || monitor.journalError) && <div className="mm-alert-current-state mm-alert-verification" role="status"><strong>当前提醒待核实</strong><p>提醒记录读取不完整，不能据此判断当前没有异常。检查连接，等待下次同步；仍失败时可在连接设置中重连。</p></div>}
    {!current.length && !monitor.error && !monitor.journalError && monitor.enabled === false && <div className="mm-alert-current-state mm-empty"><h3>持续监控已暂停</h3><p>恢复采集后才能继续确认当前异常。</p></div>}
    {!current.length && !monitor.error && !monitor.journalError && monitor.enabled !== false && <div className="mm-alert-current-state mm-empty"><h3>当前无异常提醒</h3><p>本次已读取的提醒中没有待处理项；历史失败与已恢复提醒列在下方。</p></div>}
    {(historicalFailures.length > 0 || historyCoverage) && <section aria-label="历史运行失败"><h3 className="mm-alert-group-title">历史运行失败 · {historicalFailures.length}</h3>
      <p className="mm-muted mm-list-note">按最近 100 个业务任务分批补采，每个任务最多读取 500 次运行、保留最近 50 次失败，历史失败合计最多保留 500 条；发现时间不是失败发生时间。补采未完成或读取失败时，结果可能不完整。</p>
      {historyCoverage && <div className="mm-muted mm-list-note" role="status">
        <p>历史补采：成功读取 {number(historyCoverage.checkedIssues)} / {number(historyCoverage.totalIssues)} 个任务{Number.isFinite(historyCoverage.checkedIssues) && Number.isFinite(historyCoverage.failedIssues) && Number.isFinite(historyCoverage.totalIssues) && historyCoverage.checkedIssues + historyCoverage.failedIssues < historyCoverage.totalIssues ? ' · 正在分批补采' : ''}</p>
        {historyCoverage.failedIssues > 0 && <p>{number(historyCoverage.failedIssues)} 个任务读取失败，历史结果不完整。</p>}
        {historyCoverage.conflictingIssues > 0 && <p>{number(historyCoverage.conflictingIssues)} 个任务的运行状态存在冲突，失败记录暂不确认。</p>}
        {historyCoverage.truncatedIssues > 0 && <p>{number(historyCoverage.truncatedIssues)} 个任务的运行历史已截断或失败记录超过单任务 50 条上限，历史结果不完整。</p>}
        {historyCoverage.failuresTruncated && <p>历史失败记录超过总数 500 条上限，部分记录未展示。</p>}
        {historyCoverage.issuesTruncated && <p>业务任务列表已截断，未覆盖全部任务。</p>}
      </div>}
      {!historicalFailures.length && <p className="mm-muted">尚未读到历史失败，补采可能仍在进行。</p>}
      {historicalGroups.map(group => {
        const issue = issues.find(item => item.id === group.issueId);
        const issueName = issue ? [issue.identifier, issue.title].filter(Boolean).join(' · ') : '任务信息未提供';
        const latest = group.failures[0];
        return <details key={group.key} className="mm-history-group">
          <summary className="mm-history-group-summary"><strong>{issueName}</strong><span>{group.cause}</span><span>{group.failures.length} 次失败</span><time>最近失败 {date(latest.failedAt) === '—' ? '时间未提供' : date(latest.failedAt)}</time></summary>
          <div className="mm-history-group-body">{group.failures.map(failure => {
            const agent = agents.find(item => item.id === failure.agentId);
            return <article key={failure.runId} className="mm-alert mm-alert-historical">
              <div className="mm-section-heading"><h3>运行 {failure.runId.slice(-8)}</h3><span className="mm-badge">历史失败（服务端确认）</span></div>
              <p className="mm-alert-context"><strong>{issueName}</strong><span>{failure.agentName || agent?.name || '智能体未提供'}</span><span>运行 ID：{failure.runId}</span></p>
              <p className="mm-muted">失败时间（服务端结束时间）：{date(failure.failedAt) === '—' ? '未提供' : date(failure.failedAt)} · 发现时间：{date(failure.discoveredAt) === '—' ? '未提供' : date(failure.discoveredAt)}</p>
              {failure.error && <FailureDiagnosis error={failure.error}/>}
              {failure.issueId && <div className="mm-actions"><button onClick={() => onSelect(failure.issueId, failure.runId)}>查看任务与日志</button></div>}
            </article>;
          })}</div>
        </details>;
      })}
    </section>}
    {past.length > 0 && <section><h3 className="mm-alert-group-title">历史与已恢复 · {past.length}</h3>{past.map(alert => <details key={alert.id} className="mm-history-group"><summary className="mm-history-group-summary"><strong>{alert.title}</strong><span>{alert.resolvedAt ? '已恢复' : '当前未复核'}</span><time>{date(alert.createdAt)}</time></summary><div className="mm-history-group-body">{renderAlert(alert)}</div></details>)}</section>}
    <details className="mm-alert-rules" aria-label="异常提醒规则"><summary className="mm-alert-rules-summary"><strong>监控规则与阈值</strong><span>{rules.length} 条规则 · {monitor.enabled ? '持续监控已开启' : '持续监控已暂停'}</span></summary><div className="mm-alert-rules-body">
      <div className="mm-alert-rules-head"><span className="mm-muted">触发条件与不判断的情况</span>{onSettingsSaved && <button type="button" onClick={() => { setEditing(value => !value); setSettingsError(''); }}>{editing ? '收起阈值设置' : '调整阈值'}</button>}</div>
      <div className="mm-alert-rule-list">{rules.map(([name, condition, note]) => <div className="mm-alert-rule" key={name}><strong>{name}</strong><div><span>{condition}</span><small>{note}</small></div></div>)}</div>
      {editing && <form className="mm-alert-rule-form" onSubmit={async event => { event.preventDefault(); const form = event.currentTarget; const fields = ['noProgressMinutes', 'toolMinutes', 'queueMinutes', 'runMinutes']; const values = Object.fromEntries(fields.map(key => [key, Number(form.elements[key].value)])); setSaving(true); setSettingsError(''); try { await onSettingsSaved(await api('saveSettings', values)); setEditing(false); } catch (error) { setSettingsError(error?.message || '保存失败，请重试'); } finally { setSaving(false); } }}>
        <div className="mm-form-grid">{[['runMinutes','运行总耗时'],['noProgressMinutes','无进展'],['toolMinutes','工具等待'],['queueMinutes','排队等待']].map(([key,label]) => <label key={key}>{label} · 分钟<input type="number" name={key} min="1" max="1440" required defaultValue={settings[key]}/></label>)}</div>
        <p className="mm-muted">保存仅修改提醒阈值；取值为 1–1440 分钟。</p>{settingsError && <p className="mm-error" role="alert">{settingsError}</p>}<div className="mm-actions"><button className="mm-primary" type="submit" disabled={saving}>{saving ? '正在保存…' : '保存阈值'}</button><button type="button" disabled={saving} onClick={() => setEditing(false)}>取消</button></div>
      </form>}
      <p className="mm-muted mm-alert-rule-note">规则覆盖当前最多 100 次被追踪运行；取消或重跑需要人工确认。</p>
    </div></details>
  </div>;
}

export function MetricsView({ monitor, agents }) {
  const m = monitor.metrics || {}, tokens = m.tokens || {};
  const terminalSamples = Number.isFinite(m.sampleSize) ? m.sampleSize : 0;
  const durationSamples = Number.isFinite(m.durationSampleSize) ? m.durationSampleSize : 0;
  const queueSamples = Number.isFinite(m.queueSampleSize) ? m.queueSampleSize : 0;
  return <div className="mm-list mm-metrics-view">
    <div className="mm-section-heading"><h2>执行性能</h2><span className="mm-muted">观测开始于 {date(monitor.startedAt)}</span></div>
    {monitor.error && <p className="mm-error" role="alert">本次采集未成功，以下数值可能是上次快照；请检查连接并等待重新同步。</p>}
    <section className="mm-metric-panel" aria-label="运行观测指标">
      <div className="mm-metric-coverage" role="status"><strong>{terminalSamples > 0 ? `${number(terminalSamples)} 次已确认终态` : '暂无终态样本'}</strong><span>本次监控从 {date(monitor.startedAt)} 开始；启动前的历史终态不计入耗时和失败率。</span></div>
      <div className="mm-metrics mm-metrics-primary">
        <div><span>当前活动运行</span><strong>{number(m.active)}</strong><small>排队 {number(m.queued)} · 状态待核实 {number(m.unknown)}</small></div>
        {terminalSamples > 0 && <div><span>本次失败率</span><strong>{typeof m.failureRate === 'number' ? `${number(m.failureRate * 100)}%` : '—'}</strong><small>失败 {number(m.failures)} / 终态 {number(m.sampleSize)} · 取消 {number(m.cancelled)}</small></div>}
        {durationSamples > 0 && <div><span>运行耗时 P95</span><strong>{duration(m.p95DurationMs)}</strong><small>{number(durationSamples)} 个耗时样本 · 均值 {duration(m.averageDurationMs)}</small></div>}
      </div>
      {!terminalSamples && <p className="mm-muted mm-metric-empty">本次还没有运行进入完成或失败状态。出现终态后，这里才会比较失败率与耗时。</p>}
      <details className="mm-metric-details"><summary>查看排队耗时与采集数据</summary><div className="mm-metrics">
        <div><span>平均排队耗时</span><strong>{queueSamples > 0 ? duration(m.averageQueueMs) : '样本不足'}</strong><small>P95 {queueSamples > 0 ? duration(m.p95QueueMs) : '—'} · {number(queueSamples)} 个样本</small></div>
        <div><span>增量日志</span><strong>{number(m.incrementalLogMessages)}</strong><small>平均 {number(m.logsPerMinute)} 条 / 分钟</small></div>
        <div><span>一轮采集耗时</span><strong>{latency(monitor.syncLatencyMs)}</strong><small>包括 API 与日志补偿读取</small></div>
      </div></details>
      <p className="mm-muted mm-metric-note">本次最多保留 1,000 次终态样本，当前追踪最多 100 次运行；重启或修改配置会重新计时。</p>
    </section>
    <section className="mm-metric-section mm-metric-panel"><div className="mm-metric-panel-heading"><h3>模型用量与成本</h3><span className="mm-muted">{tokens.available ? `${number(tokens.sampleSize)} 次运行有用量记录` : '当前没有用量样本'}</span></div>{tokens.available ? <><div className="mm-metrics compact"><div><span>输入 / 输出 Token</span><strong>{number(tokens.inputTokens)} / {number(tokens.outputTokens)}</strong></div><div><span>缓存读取 / 写入 Token</span><strong>{number(tokens.cacheReadTokens)} / {number(tokens.cacheWriteTokens)}</strong></div><div><span>已上报成本 · USD</span><strong>{typeof tokens.costUsd === 'number' ? `$${tokens.costUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })}` : '—'}</strong></div></div><p className="mm-muted mm-metric-note">{tokens.scope}；缺失用量不按零费用估算。</p></> : <p className="mm-muted mm-metric-note">当前样本没有可用的模型用量；需要执行器向 Multica 上报。这里不包含本插件的 AI 诊断费用。</p>}</section>
    <details className="mm-metric-section mm-metric-panel mm-metric-connection"><summary className="mm-metric-panel-heading"><strong>智能体并发</strong><span className="mm-muted">{agents.length} 个智能体 · 展开查看各自上限</span></summary><div className="mm-table-wrap" role="region" aria-label="智能体并发表" tabIndex={0}><table><thead><tr><th>智能体</th><th>当前活动 / 配置上限</th></tr></thead><tbody>{agents.map(agent => <tr key={agent.id}><td>{agent.name}</td><td>{(monitor.runs || []).filter(run => run.agentId === agent.id && active.has(run.status) && !['queued','deferred'].includes(run.status)).length} / {agent.maxConcurrentTasks ?? '未提供'}</td></tr>)}</tbody></table></div>{!agents.length && <p className="mm-muted mm-metric-note">没有可见的智能体记录。</p>}</details>
    <section className="mm-metric-section mm-metric-panel mm-resource-panel"><div className="mm-metric-panel-heading"><h3>机器资源</h3><span className="mm-badge pending">采集能力未接入</span></div><dl><div><dt>CPU</dt><dd>{m.cpu?.reason || '当前 Multica API 未提供每次运行的 CPU 数据。'}</dd></div><div><dt>内存</dt><dd>{m.memory?.reason || '当前 Multica API 未提供每次运行的内存数据。'}</dd></div></dl><p className="mm-muted mm-metric-note">进程级性能采样需要后续在执行机器的守护进程中增加采集能力。</p></section>
  </div>;
}

export function RuntimeView({ runtimes = [], available = true, Badge }) {
  if (available === false) return <div className="mm-list mm-runtime-view"><div className="mm-section-heading"><h2>运行时</h2><span className="mm-muted">当前工作区快照</span></div><div className="mm-alert-verification" role="status"><strong>运行时状态暂不可用</strong><p>当前无法核实连接数和离线数。检查 Multica 连接，等待下一次同步；仍失败时请在连接设置中重连。</p></div></div>;
  const counts = runtimes.reduce((value, runtime) => { value[runtime.status] = (value[runtime.status] || 0) + 1; return value; }, {});
  const connected = (counts.online || 0) + (counts.busy || 0);
  const oldestSeenAt = runtimes.map(runtime => runtime.lastSeenAt).filter(value => value && Number.isFinite(Date.parse(value))).sort((a, b) => Date.parse(a) - Date.parse(b))[0];
  const missingSeenAt = runtimes.some(runtime => !runtime.lastSeenAt || !Number.isFinite(Date.parse(runtime.lastSeenAt)));
  const orderedRuntimes = [...runtimes].sort((a, b) => {
    const rank = status => status === 'offline' ? 0 : status === 'busy' ? 2 : status === 'online' ? 3 : 1;
    return rank(a.status) - rank(b.status) || (timeValue(a.lastSeenAt) || -1) - (timeValue(b.lastSeenAt) || -1);
  });
  return <div className="mm-list mm-runtime-view">
    <div className="mm-section-heading"><h2>运行时</h2><span className="mm-muted">当前工作区快照</span></div>
    <div className="mm-runtime-overview" aria-label="运行时状态汇总"><div><span>运行时</span><strong>{runtimes.length}</strong><small>当前可见节点</small></div><div><span>已连接</span><strong>{connected}</strong><small>{counts.online || 0} 可接收 · {counts.busy || 0} 执行中{runtimes.length - connected - (counts.offline || 0) > 0 ? ` · ${runtimes.length - connected - (counts.offline || 0)} 待核实` : ''}</small></div><div><span>离线</span><strong>{counts.offline || 0}</strong><small>{counts.offline ? '检查对应守护进程' : '当前无离线节点'}</small></div><div><span>最久未上报</span><strong className="mm-runtime-latest">{missingSeenAt ? '时间未提供' : date(oldestSeenAt)}</strong><small>以服务端最后在线时间为准</small></div></div>
    <section className="mm-runtime-panel" aria-label="运行时连接"><div className="mm-runtime-panel-heading"><div><h3>运行时连接</h3><p className="mm-muted">离线和状态待核实的节点排在前面；状态来自工作区快照，不代表 CPU 或内存健康度。</p></div><span className="mm-muted">{runtimes.length} 条记录</span></div>{runtimes.length > 0 && <p className="mm-table-scroll-hint">左右滑动表格查看最后在线时间</p>}<div className="mm-table-wrap" role="region" aria-label="运行时连接表，左右滚动查看全部列" tabIndex={0}><table><thead><tr><th>运行时</th><th>提供方</th><th>连接状态</th><th>最后在线</th></tr></thead><tbody>{orderedRuntimes.map(runtime => <tr key={runtime.id} data-status={runtime.status}><td><strong>{runtime.name}</strong></td><td>{runtime.provider || '—'}</td><td><Badge status={runtime.status} label={{online:'在线',offline:'离线',busy:'忙碌'}[runtime.status] || '待核实'}/></td><td>{date(runtime.lastSeenAt)}</td></tr>)}</tbody></table></div>{!runtimes.length && <div className="mm-empty">没有可见的运行时。启动并连接 Multica 守护进程后，这里才会出现记录。</div>}</section>
  </div>;
}

export function RunActions({ api, issueId, run, onCompleted }) {
  const [ticket, setTicket] = useState(null), [result, setResult] = useState(null), [error, setError] = useState(''), [busy, setBusy] = useState(false);
  const locked = useRef(false), triggerRef = useRef(null), dialogRef = useRef(null), cancelRef = useRef(null), restoreFocus = useRef(false);
  useEffect(() => {
    if (ticket) { cancelRef.current?.focus(); return; }
    if (restoreFocus.current && !busy) { triggerRef.current?.focus(); restoreFocus.current = false; }
  }, [ticket, busy]);
  const prepare = async (kind, trigger) => {
    if (locked.current) return;
    triggerRef.current = trigger;
    locked.current = true; setBusy(true); setError(''); setTicket(null); setResult(null);
    try { const next = await api('prepareAction', { kind, issueId, taskId: run.id }); restoreFocus.current = true; setTicket(next); }
    catch (e) { setError(e.message); }
    finally { locked.current = false; setBusy(false); }
  };
  const execute = async () => {
    if (!ticket || locked.current) return;
    locked.current = true; setBusy(true); setError('');
    const confirmationId = ticket.confirmationId;
    setTicket(null);
    try { const next = await api('executeAction', { confirmationId }); setResult(next); onCompleted(); }
    catch (e) { setError(e.message); }
    finally { locked.current = false; setBusy(false); }
  };
  const onDialogKeyDown = event => {
    if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); setTicket(null); return; }
    if (event.key !== 'Tab') return;
    const controls = [...(dialogRef.current?.querySelectorAll('button:not(:disabled)') || [])];
    if (!controls.length) { event.preventDefault(); return; }
    if (event.shiftKey && document.activeElement === controls[0]) { event.preventDefault(); controls.at(-1).focus(); }
    else if (!event.shiftKey && document.activeElement === controls.at(-1)) { event.preventDefault(); controls[0].focus(); }
  };
  return <section className="mm-run-actions" aria-label="运行操作">
    <div className="mm-actions">{active.has(run.status) && <button disabled={busy} onClick={event => void prepare('cancel', event.currentTarget)}>取消运行…</button>}{['failed','cancelled'].includes(run.status) && <button disabled={busy} onClick={event => void prepare('rerun', event.currentTarget)}>重跑此任务…</button>}{busy && <span role="status" className="mm-muted">正在核实或提交，请勿重复操作…</span>}</div>
    {ticket && <div className="mm-confirm-backdrop"><div className="mm-confirm" role="alertdialog" aria-modal="true" aria-labelledby={`mm-confirm-title-${run.id}`} aria-describedby={`mm-confirm-message-${run.id}`} ref={dialogRef} onKeyDown={onDialogKeyDown}><h3 id={`mm-confirm-title-${run.id}`}>{ticket.kind === 'cancel' ? '确认取消运行' : '确认重跑任务'}</h3><p id={`mm-confirm-message-${run.id}`}>{ticket.message}</p><p className="mm-muted">目标：{ticket.connection.baseUrl} · 工作区 {ticket.connection.workspaceId}</p><p className="mm-muted">本次确认有效至 {date(ticket.expiresAt)}，提交前会复核状态。</p><div className="mm-actions"><button className="mm-primary" disabled={busy} onClick={() => void execute()}>{ticket.kind === 'cancel' ? '确认取消运行' : '确认创建新运行'}</button><button ref={cancelRef} disabled={busy} onClick={() => setTicket(null)}>暂不操作</button></div></div></div>}
    {result && <div className="mm-confirm" role="status"><h3>{result.outcomeUncertain ? '提交结果待核实' : '操作结果'}</h3><p>{result.message}</p><p className="mm-muted">目标：{result.connection.baseUrl} · 工作区 {result.connection.workspaceId}</p></div>}
    {error && <p className="mm-error" role="alert">{error}</p>}
  </section>;
}
