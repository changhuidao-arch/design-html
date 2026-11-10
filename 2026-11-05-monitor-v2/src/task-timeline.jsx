import React, { useState } from 'react';
import { buildRunTimeline } from './task-relationships.mjs';

const runLabels = { queued: '排队中', dispatched: '已派发', running: '运行中', waiting_local_directory: '等待本地目录', deferred: '暂缓', completed: '运行完成', failed: '运行失败', cancelled: '运行取消', unknown: '状态待核实' };
const relationLabels = { delegation: '委派', rerun: '重跑', retry: '重试', parent_run: '父运行' };
const incompleteLabels = { not_started: '尚未开始执行', missing_start: '缺少开始时间', missing_end: '缺少结束时间', unknown_time: '未提供执行时间', invalid_time: '执行时间待核实', unknown_status: '状态待核实，未绘制时长' };
const shortId = value => String(value || '').slice(-8);
const statusLabel = run => runLabels[run.status] || `状态待核实（${run.status || '未提供'}）`;
const dateLabel = ms => new Date(ms).toLocaleDateString('zh-CN');
const clockLabel = (ms, withDate = false) => new Date(ms).toLocaleString('zh-CN', { ...(withDate ? { month: '2-digit', day: '2-digit' } : {}), hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
const runName = run => `${run.agentName || (run.agentId ? `智能体 ${shortId(run.agentId)}` : '智能体未提供')} · #${shortId(run.id)}`;

function durationLabel(ms) {
  const seconds = Math.max(0, Math.floor(ms / 1000));
  if (seconds < 60) return `${seconds} 秒`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} 分 ${seconds % 60} 秒`;
  return `${Math.floor(minutes / 60)} 小时 ${minutes % 60} 分`;
}

function Arrow() {
  return <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9h11m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

function IssueLink({ issue, id, onSelectIssue, current = false }) {
  const body = <><span className="mm-task-node-key">{issue?.identifier || (id ? `任务 ${shortId(id)}` : '任务信息未读取')}{current && <span>当前任务</span>}</span><strong>{issue?.title || '任务详情未读取'}</strong>{issue?.stageKnown && Number.isSafeInteger(issue.stage) && <small>阶段 {issue.stage}</small>}</>;
  if (current || !id) return <div className="mm-task-node is-current">{body}</div>;
  return <button type="button" className="mm-task-node" onClick={() => onSelectIssue?.(id)} disabled={!onSelectIssue} aria-label={`查看${issue?.identifier || '任务'}：${issue?.title || id}`}>{body}</button>;
}

export function BusinessHierarchy({ detail, issues, onSelectIssue }) {
  const issue = detail.issue;
  const relations = detail.relations;
  const availability = relations?.availability;
  const parentItem = relations?.items?.find(item => item.kind === 'parent');
  const parentId = parentItem?.otherIssue?.id || (issue.parentIssueKnown ? issue.parentIssueId : null);
  const parent = parentItem?.otherIssue || issues.find(item => item.id === parentId);
  const parentIsSelf = parentId === issue.id;
  const children = (relations?.items || []).filter(item => item.kind === 'child' && item.otherIssue?.id !== issue.id).map(item => item.otherIssue);
  const childIsSelf = (relations?.items || []).some(item => item.kind === 'child' && item.otherIssue?.id === issue.id);
  const parentState = availability?.parent || (issue.parentIssueKnown && issue.parentIssueId === null ? 'none' : 'unknown');
  return <section className="mm-task-hierarchy" aria-label="业务任务层级">
    <h3>业务任务层级</h3>
    {parentIsSelf ? <p className="mm-task-coverage">父关系异常：服务端将当前任务指向自身。</p> : parentId ? <div className="mm-task-parent"><span className="mm-task-relation-label">父任务</span><IssueLink issue={parent} id={parentId} onSelectIssue={onSelectIssue}/></div> : <p className="mm-task-coverage">{parentState === 'none' ? '此任务没有父任务。' : parentState === 'unavailable' ? '父任务信息暂不可用。' : '服务端未提供可确认的父任务信息。'}</p>}
    <div className={`mm-task-current-branch${parentId && !parentIsSelf ? ' has-parent' : ''}`}>
      <IssueLink issue={issue} id={issue.id} current/>
      {children.length > 0 && <ol className="mm-hierarchy-children" aria-label="直接子任务">{children.map(child => <li key={child.id}><span className="mm-task-relation-label">子任务</span><IssueLink issue={child} id={child.id} onSelectIssue={onSelectIssue}/></li>)}</ol>}
    </div>
    {children.length === 0 && <p className="mm-task-coverage">{availability?.children === 'available' && !relations?.childrenTruncated ? '此任务没有业务子任务；下方各次运行都属于当前任务。' : availability?.children === 'unavailable' ? '子任务信息暂不可用，不能确认是否存在拆分。' : relations?.childrenTruncated ? '子任务尚未完整读取。' : '子任务信息尚未读取。'}</p>}
    {children.length > 0 && <p className="mm-task-coverage">{relations?.childrenTruncated ? `已读取 ${children.length} 个直接子任务，列表尚不完整。` : `${children.length} 个直接子任务；点击可查看各自的运行。`}</p>}
    {childIsSelf && <p className="mm-task-coverage">子任务关系包含当前任务自身，未重复展开。</p>}
  </section>;
}

function RunTimeline({ timeline, onSelectRun, selectedRunId }) {
  const { span, agentGroups, runs } = timeline;
  const multiDay = span && dateLabel(span.startMs) !== dateLabel(span.endMs);
  const maxConcurrency = timeline.maxObservedConcurrency;
  return <section className="mm-task-run-timeline" aria-label="智能体运行时间线">
    <h3>智能体运行时间线</h3>
    {runs.length === 0 ? <p className="mm-task-coverage">当前任务尚未读到运行记录。</p> : <>
      <p className="mm-task-timeline-note">条长表示执行时长；点击运行查看进展。</p>
      <div className="mm-task-concurrency">{maxConcurrency > 1 ? <strong>存在实际并行 · 最多同时 {maxConcurrency} 次运行</strong> : <span>{span ? '已加载运行中未观测到执行时间重叠' : '无可靠的执行区间，暂不能判断并行关系'}</span>}{span && <time>{dateLabel(span.startMs)}{multiDay ? ` — ${dateLabel(span.endMs)}` : ''}</time>}</div>
      <div className="mm-task-timeline-scroll" tabIndex={0} role="region" aria-label="运行时间轴，可横向滚动">
        <div className="mm-task-timeline-canvas">
          <div className="mm-timeline-axis"><span>运行 / 状态</span>{span ? <div><time>{clockLabel(span.startMs, multiDay)}</time><time>{clockLabel(span.startMs + span.durationMs / 2, multiDay)}</time><time>{clockLabel(span.endMs, multiDay)}</time></div> : <span>执行时间</span>}</div>
          <ol className="mm-timeline-agents">{agentGroups.map(group => <li key={group.id}>
            <div className="mm-timeline-agent-heading"><strong>{group.agentName || (group.agentId ? `智能体 ${shortId(group.agentId)}` : '智能体身份未提供')}</strong><span>{group.runs.length} 次运行</span></div>
            <ol className="mm-timeline-runs">{group.runs.map(run => <li key={run.id}>
              <button type="button" className={`mm-timeline-run${selectedRunId === run.id ? ' is-selected' : ''}`} aria-pressed={selectedRunId === run.id} aria-label={`查看${runName(run)}的进展，${statusLabel(run)}，${run.intervalKnown ? `执行${durationLabel(run.durationMs)}` : incompleteLabels[run.timeStatus]}`} onClick={() => onSelectRun?.(run.id)} disabled={!onSelectRun}>
                <span className="mm-timeline-run-label"><span title={run.id}>#{shortId(run.id)}</span><small className={run.status === 'failed' ? 'is-failed' : run.status === 'running' ? 'is-running' : ''}>{statusLabel(run)}</small></span>
                {run.intervalKnown ? <span className="mm-timeline-interval"><span className="mm-timeline-track" aria-hidden="true"><span className={`mm-timeline-bar${run.ongoing ? ' is-running' : ''}${run.status === 'failed' ? ' is-failed' : ''}${run.durationMs === 0 ? ' is-point' : ''}`} style={{ left: `${Math.max(0, Math.min(run.durationMs === 0 ? 99.7 : 100, run.offsetPercent))}%`, width: `${run.widthPercent}%` }}/></span><span className="mm-timeline-time"><span>{clockLabel(run.startMs, multiDay)} — {run.ongoing ? '现在' : clockLabel(run.endMs, multiDay)}</span><span>{run.ongoing ? '已运行 ' : ''}{durationLabel(run.durationMs)}</span></span></span> : <span className="mm-timeline-no-time">{incompleteLabels[run.timeStatus] || '执行时间待核实'}</span>}
              </button>
            </li>)}</ol>
          </li>)}</ol>
        </div>
      </div>
      {timeline.coverage.unknownIntervals > 0 && <p className="mm-task-coverage">{timeline.coverage.unknownIntervals} 次运行缺少可靠起止时间，未参与并行判断。</p>}
    </>}
  </section>;
}

function RunLink({ run, id, onSelectRun }) {
  return run ? <button type="button" className="mm-task-run-link" onClick={() => onSelectRun?.(run.id)} disabled={!onSelectRun} title={run.id}>{runName(run)}</button> : <span className="mm-task-unloaded-run" title={id || undefined}>{id ? `#${shortId(id)} · 来源未加载` : '来源待核实'}</span>;
}

function RelationRows({ relations, runsById, onSelectRun, mode = 'lineage' }) {
  const [expanded, setExpanded] = useState(false);
  const limit = mode === 'lineage' ? 6 : 3;
  const visible = expanded ? relations : relations.slice(0, limit);
  return <>
    <ol className={`mm-task-run-relations ${mode}`}>
      {visible.map(relation => <li key={relation.id || `${relation.type}:${relation.from}:${relation.to}`}>
        {mode === 'unresolved' ? <div className="mm-task-unresolved-source"><RunLink run={runsById.get(relation.to)} id={relation.to} onSelectRun={onSelectRun}/><span>{relationLabels[relation.type]}来源：{relation.from ? `#${shortId(relation.from)}` : '未提供有效 ID'} · 待核实</span></div> : <div className="mm-task-run-edge"><RunLink run={runsById.get(relation.from)} id={relation.from} onSelectRun={onSelectRun}/><span className="mm-task-edge-label">{mode === 'overlap' ? <span>时间重叠</span> : <><span>{relationLabels[relation.type] || '先后发生'}</span><Arrow/></>}</span><RunLink run={runsById.get(relation.to)} id={relation.to} onSelectRun={onSelectRun}/></div>}
        {mode === 'overlap' && <p className="mm-task-edge-evidence">{clockLabel(relation.evidence.startMs, true)} — {clockLabel(relation.evidence.endMs, true)} · 重叠 {durationLabel(relation.evidence.durationMs)}</p>}
        {mode === 'sequence' && <p className="mm-task-edge-evidence">前次结束后 {durationLabel(relation.evidence.gapMs)} 开始后次运行；不代表强制串行。</p>}
        {relation.reason && <p className="mm-task-edge-evidence">{relation.reason === 'cross_issue' ? '来源属于其他任务，未合并至当前任务。' : relation.reason === 'missing_source' ? '服务端提供了来源 ID，当前记录未覆盖来源运行。' : '来源指针或任务归属待核实，未确认为有效关联。'}</p>}
      </li>)}
    </ol>
    {relations.length > limit && <button type="button" className="mm-evidence-link" aria-expanded={expanded} onClick={() => setExpanded(value => !value)}>{expanded ? '收起关系' : `展开其余 ${relations.length - limit} 条关系`}</button>}
  </>;
}

export function TaskRelationships({ detail, issues = [], onSelectIssue, onSelectRun, selectedRunId, mode = 'all' }) {
  if (!detail?.issue) return <p className="mm-task-coverage">任务关系尚未读取。</p>;
  const timeline = buildRunTimeline(detail.runs || [], Date.now(), { coverage: { runs: detail.runHistoryTruncated ? 'partial' : 'complete' }, relations: detail.relations });
  const runsById = new Map(timeline.runs.map(run => [run.id, run]));
  const lineage = timeline.relations.filter(relation => relationLabels[relation.type]);
  const overlap = timeline.relations.filter(relation => relation.type === 'observed_overlap');
  const sequence = timeline.relations.filter(relation => relation.type === 'observed_sequence');
  const hasParentRun = lineage.some(relation => relation.type === 'parent_run');
  const knownAgents = timeline.agentGroups.filter(group => group.identityKnown).length;
  const lineageCounts = Object.entries(relationLabels).map(([type, label]) => ({ label, count: lineage.filter(relation => relation.type === type).length })).filter(item => item.count > 0);
  return <div className="mm-task-relationships">
    {mode === 'all' && <><p className="mm-task-relationship-summary"><strong>{timeline.runs.length} 次运行 · {knownAgents} 名智能体{knownAgents < timeline.agentGroups.length ? ' · 含身份未知的运行' : ''}</strong>{lineageCounts.length > 0 && <span>{lineageCounts.map(item => `${item.count} 条${item.label}`).join(' · ')}</span>}</p>
    <BusinessHierarchy detail={detail} issues={issues} onSelectIssue={onSelectIssue}/></>}
    <RunTimeline timeline={timeline} onSelectRun={onSelectRun} selectedRunId={selectedRunId}/>
    {overlap.length > 0 && <details className="mm-task-extra-relations" aria-label="实际并行证据"><summary>实际并行证据 · {overlap.length} 组时间重叠</summary><RelationRows key={detail.issue.id} relations={overlap} runsById={runsById} onSelectRun={onSelectRun} mode="overlap"/></details>}
    {mode === 'all' && <section className="mm-task-lineage" aria-label="明确的运行来源">
      <div className="mm-task-section-heading"><h3>明确的运行来源</h3>{lineage.length > 0 && <span>{lineage.length} 条已确认</span>}</div>
      {lineage.length > 0 ? <><p className="mm-task-timeline-note">由服务端记录确认，从来源运行指向后续运行。</p><RelationRows key={detail.issue.id} relations={lineage} runsById={runsById} onSelectRun={onSelectRun}/></> : <p className="mm-task-coverage">{timeline.coverage.lineage === 'available' ? '已加载运行中没有明确的委派、重试或重跑来源。' : '尚未读到可确认的运行来源关系。'}</p>}
      {hasParentRun && <p className="mm-task-coverage">“父运行”表示运行之间的关联，不是业务任务拆分。</p>}
      {timeline.unresolvedRelations.length > 0 && <details className="mm-task-extra-relations"><summary>另有 {timeline.unresolvedRelations.length} 条来源待核实</summary><RelationRows key={detail.issue.id} relations={timeline.unresolvedRelations} runsById={runsById} onSelectRun={onSelectRun} mode="unresolved"/></details>}
      {sequence.length > 0 && <details className="mm-task-extra-relations"><summary>查看仅由时间确认的先后关系（{sequence.length} 条）</summary><RelationRows key={detail.issue.id} relations={sequence} runsById={runsById} onSelectRun={onSelectRun} mode="sequence"/></details>}
    </section>}
    <p className="mm-task-dependency-note">{detail.relations?.availability?.dependencies === 'unsupported' ? '服务端未提供任务依赖，不能确认强制串行规则。' : '任务依赖未完整读取，不能确认强制串行规则。'}</p>
    {(detail.runHistoryTruncated || timeline.coverage.runsTruncated) && <p className="mm-task-coverage">运行历史尚未完整读取；时间线与关系只覆盖已加载记录。</p>}
    {timeline.coverage.relationsTruncated && <p className="mm-task-coverage">运行关系数量超过展示上限，当前显示前 {timeline.coverage.relationLimit} 条。</p>}
  </div>;
}
