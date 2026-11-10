import React from 'react';

const active = new Set(['queued', 'dispatched', 'running', 'waiting_local_directory', 'deferred']);
const labels = { pending: '待处理', in_progress: '进行中', completed: '已完成' };
const toolLabels = { Bash: '执行命令', Read: '读取文件', Edit: '修改文件', Write: '写入文件', Glob: '查找文件', Grep: '搜索内容', TaskCreate: '创建计划项', TaskUpdate: '更新计划', TodoWrite: '更新执行清单' };
const time = value => value && Number.isFinite(Date.parse(value)) ? new Date(value).toLocaleString('zh-CN', { hour12: false }) : '时间未提供';

function PlanCounts({ counts }) {
  return <span className="mm-plan-counts">已完成 {counts.completed} · 进行中 {counts.inProgress} · 待处理 {counts.pending}{counts.unknown > 0 && ` · 待核实 ${counts.unknown}`}</span>;
}

function EvidenceButton({ evidence, onEvidence, label = '查看证据' }) {
  if (!Number.isInteger(evidence?.seq) || evidence.seq < 1) return null;
  return <button type="button" className="mm-evidence-link" onClick={() => onEvidence(evidence)} aria-label={`${label}，日志 ${evidence.seq}`}>日志 #{evidence.seq}</button>;
}

export function RunProgressSummary({ run, onOpen }) {
  const work = run.workProgress;
  const current = active.has(run.status) && !run.observationError && !run.logError ? work?.currentAction : null;
  const action = current || work?.latestAction;
  const counts = work?.counts;
  return <div className="mm-progress-summary">
    {action ? <><span className="mm-muted">{current ? '等待工具结果' : '最近动作'} · {toolLabels[action.tool] || action.tool}</span><strong className="mm-action-preview" title={action.summary}>{action.summary}</strong><small>{time(action.at)}</small></> : <span>{run.progress?.summary || (active.has(run.status) ? '等待可识别的工作记录' : '历史进展可在详情中读取')}</span>}
    {counts?.total > 0 && <PlanCounts counts={counts}/>}
    {active.has(run.status) && <small>距最近可见进展 {run.silenceMs == null ? '未知' : `${Math.max(0, Math.floor(run.silenceMs / 60000))} 分钟`}</small>}
    <button type="button" className="mm-evidence-link" onClick={onOpen} disabled={!run.issueId}>查看进展与证据</button>
    {run.logsCaughtUp === false && active.has(run.status) && <small>正在补齐历史记录</small>}
  </div>;
}

export function WorkProgressView({ work, progress, showWaiting, logsCaughtUp, onEvidence }) {
  const action = showWaiting ? work?.currentAction : null;
  const hasPlan = Boolean(work?.items.length);
  if (!action && !hasPlan && !progress?.summary) return null;

  return <section className="mm-work-progress mm-process-progress" aria-label="执行进度">
    <h3>执行进度</h3>
    {progress?.summary && <p><strong>服务端进度</strong> · {progress.summary}{progress.step != null && <span> · 步骤 {progress.step}{progress.total != null ? ` / ${progress.total}` : ''}</span>}</p>}
    {action && <div className="mm-process-wait">
      <strong>尚未收到工具返回 · {toolLabels[action.tool] || action.tool}</strong>
      <span>{action.summary}</span>
      <EvidenceButton evidence={action} onEvidence={onEvidence} label="定位工具调用"/>
      {work.pendingActions.length > 1 && <details className="mm-extra-actions">
        <summary>另有 {work.pendingActions.length - 1} 个调用尚未返回</summary>
        <ul>{work.pendingActions.slice(1).map(item => <li key={item.seq}><span>{item.summary}</span><EvidenceButton evidence={item} onEvidence={onEvidence}/></li>)}</ul>
      </details>}
    </div>}
    {hasPlan && <details className="mm-process-plan">
      <summary><strong>执行清单</strong><PlanCounts counts={work.counts}/></summary>
      <p className="mm-muted mm-plan-source">根据已确认的计划更新汇总，完成标记反映智能体上报进度。</p>
      {!logsCaughtUp && <p className="mm-muted">消息尚未同步完整，以下为已读取的计划。</p>}
      <ol className="mm-work-items">{work.items.map(item => <li key={item.id} className={`mm-work-item ${labels[item.status] ? item.status : 'unknown'}`}>
        <span className="mm-plan-status">{labels[item.status] || '待核实'}</span>
        <div><strong>{item.title}</strong>{!labels[item.status] && <small>原状态 · {item.status || '未提供'}</small>}
          <div className="mm-work-evidence"><time>{time(item.evidence?.at)}</time><EvidenceButton evidence={item.evidence} onEvidence={onEvidence} label={`定位「${item.title}」的证据`}/></div>
        </div>
      </li>)}</ol>
      {work.unconfirmedActions.length > 0 && <details className="mm-unconfirmed"><summary>{work.unconfirmedActions.length} 条计划更新待核实</summary><ul>{work.unconfirmedActions.map((item, index) => <li key={`${item.seq}-${index}`}><span>{item.summary}</span><small>{item.reason}</small><EvidenceButton evidence={item} onEvidence={onEvidence}/></li>)}</ul></details>}
      {work.warnings.length > 0 && <ul className="mm-work-warnings">{work.warnings.map((warning, index) => <li key={index}>{warning}</li>)}</ul>}
    </details>}
  </section>;
}
