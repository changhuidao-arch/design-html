import {TypeIcon,AgentAvatar} from './ui-icons.jsx';
import React from 'react';
import {taskSignals} from './monitor-presentation.mjs';
const states={backlog:'待规划',todo:'待处理',in_progress:'处理中',blocked:'受阻',in_review:'待审核',done:'已完成',cancelled:'已取消'};
const active=new Set(['queued','dispatched','running','waiting_local_directory','deferred']);
export function TaskList({issues=[],runs=[],agents=[],statuses=[],onSelect,onAlerts,alerts=[],historicalFailures=[],failureHistoryCoverage,unavailable=false,issuesTruncated=false,filter='all',query='',onFilterChange,onQueryChange}){
 const now = Date.now();
 const signals=new Map(issues.map(issue=>[issue.id,taskSignals(issue.id,runs,alerts,historicalFailures,now,unavailable)]));
 const search = query.trim().toLowerCase();
 const matching = issues.filter(issue => `${issue.identifier} ${issue.title}`.toLowerCase().includes(search));
 const scopes = [
  {key:'all', label:'全部任务', items:matching},
  {key:'active', label:'活动运行', icon:'run', items:matching.filter(issue => signals.get(issue.id).active)},
  {key:'attention', label:'运行需关注', icon:'error', items:matching.filter(issue => signals.get(issue.id).current || signals.get(issue.id).uncertain)},
  {key:'history', label:'有历史失败', icon:'history', items:matching.filter(issue => signals.get(issue.id).historical)},
 ];
 const selectedScope = scopes.find(scope => scope.key === filter) || scopes[0];
 const shown = selectedScope.items;
 const coverage = failureHistoryCoverage;
 const historyPartial = coverage && (coverage.checkedIssues < coverage.totalIssues || coverage.failedIssues > 0 ||
  coverage.truncatedIssues > 0 || coverage.conflictingIssues > 0 || coverage.issuesTruncated || coverage.failuresTruncated);
 const order=[],seen=new Set();const visit=(i,depth=0)=>{if(seen.has(i.id))return;seen.add(i.id);order.push([i,depth]);shown.filter(child=>child.parentIssueId===i.id).forEach(c=>visit(c,depth+1));};shown.filter(i=>!shown.some(p=>p.id===i.parentIssueId)).forEach(i=>visit(i));shown.forEach(i=>visit(i));
 return <section className="v2-task-list" aria-label="业务任务列表"><div className="v2-page-heading"><div><h2><TypeIcon type="task" size={19}/>业务任务</h2><p>查看业务进展，进入任务追踪运行与执行证据。</p></div></div>
 <div className="v2-table-toolbar v2-task-controls">
  <div className="v2-task-filters" role="group" aria-label="筛选业务任务">
   {scopes.map(scope => <button type="button" key={scope.key} aria-pressed={selectedScope.key === scope.key} onClick={() => onFilterChange?.(scope.key)}>
    <span className="v2-task-filter-label">{scope.icon && <TypeIcon type={scope.icon} size={15}/>}<span>{scope.label}</span></span>
    <span className="v2-task-filter-count">{scope.key === 'history' && historyPartial && <small>已确认 </small>}<strong>{scope.items.length}</strong></span>
   </button>)}
  </div>
  <input aria-label="搜索业务任务" placeholder="搜索任务名称或编号…" value={query} onChange={e=>onQueryChange?.(e.target.value)}/>
 </div>
 {historyPartial && <p className="v2-history-coverage">历史记录已核对 {coverage.checkedIssues}/{coverage.totalIssues} 个任务，结果可能不完整。</p>}
 <p className="v2-scroll-hint">左右滑动表格，查看业务状态、运行记录和关注情况。</p><div className="v2-data-table" role="region" aria-label="业务任务数据表"><table><thead><tr><th>任务 / 层级</th><th>业务状态</th><th>当前执行</th><th className="v2-number">运行记录</th><th>关注情况</th></tr></thead><tbody>{order.map(([issue,depth])=>{const signal=signals.get(issue.id),related=runs.filter(r=>r.issueId===issue.id),running=related.find(r=>active.has(r.status)),parent=issues.find(i=>i.id===issue.parentIssueId);const status=states[issue.status]||statuses.find(s=>s.key===issue.status)?.name||issue.status;return <tr key={issue.id}><td><button className="mm-business-open v2-task-name" onClick={()=>onSelect(issue.id)} style={{paddingInlineStart:12+Math.min(depth,4)*16}}><span className="mm-muted">{depth?'↳ ':''}{issue.identifier}{parent?` · ${parent.identifier} 的子任务`:''}</span><span className="v2-task-title-line"><TypeIcon type="task" size={18}/><strong>{issue.title}</strong><span className="v2-task-open-indicator" aria-hidden="true">↗</span></span></button></td><td><span className={`v2-status state-${issue.status}`}>{status}</span></td><td>{running?<><strong className="v2-agent"><AgentAvatar name={running.agentName||agents.find(a=>a.id===running.agentId)?.name} size={18}/>{running.agentName||agents.find(a=>a.id===running.agentId)?.name||'智能体'}</strong><span className="mm-muted">{running.status==='running'?'正在执行':'等待执行'}</span></>:<span className="v2-muted">无活动运行</span>}</td><td className="v2-number"><strong>{issue.snapshotRunCount??related.length}</strong><span className="v2-muted"> 次</span></td><td>{signal.current||signal.uncertain?<button className="v2-health attention" onClick={()=>onAlerts?.(issue.id)}>查看关注项</button>:signal.historical?<button className="v2-health history" onClick={()=>onAlerts?.(issue.id)}>历史失败 {signal.historical} 次</button>:<span className="v2-muted">无当前告警</span>}</td></tr>})}</tbody></table>{!order.length&&<div className="mm-empty"><h3>{issues.length?'没有符合条件的任务':'暂无业务任务'}</h3><p>可以清空搜索条件或切换关注范围。</p><button onClick={()=>{onQueryChange?.('');onFilterChange?.('all')}}>清空筛选</button></div>}</div><div className="v2-table-foot">{(filter !== 'all' || query.trim()) && <span>显示 {order.length} / {issues.length} 个任务</span>}<span>业务状态与运行结果独立记录{issuesTruncated?' · 当前列表未完整读取':''}</span></div></section>;
}
