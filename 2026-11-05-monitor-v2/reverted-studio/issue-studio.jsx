import React,{useEffect,useRef,useState} from 'react';
import {CallGraph} from './call-graph.jsx';
import {RunExecution} from './run-execution.jsx';
import {RunConversation} from './run-conversation.jsx';
import {RunMessages} from './run-work-detail.jsx';
import {RunActions} from './monitor-views.jsx';
import {BusinessHierarchy} from './task-timeline.jsx';
import {TaskMonitorTimeline,useTaskMonitor} from './task-monitor.jsx';
import {FailureDiagnosis} from './failure-diagnosis-view.jsx';

const states={backlog:'待规划',todo:'待处理',in_progress:'处理中',blocked:'受阻',in_review:'待审核',done:'已完成',cancelled:'已取消'};
const runStates={completed:'运行完成',failed:'运行失败',cancelled:'已取消',running:'运行中',queued:'排队中',dispatched:'已派发',deferred:'暂缓',waiting_local_directory:'等待目录'};
const active=new Set(['running','queued','dispatched','deferred','waiting_local_directory']);
const tabs=[['execution','输入与输出'],['waterfall','时间瀑布图'],['graph','调用关系'],['conversation','执行记录'],['progress','执行概览']];
const clock=v=>v?new Date(v).toLocaleString('zh-CN',{timeZone:'Asia/Shanghai',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hour12:false}):'时间未提供';
const duration=r=>{if(!r?.startedAt)return '尚未开始';if(!r.completedAt)return '进行中';const ms=Date.parse(r.completedAt)-Date.parse(r.startedAt);if(!Number.isFinite(ms)||ms<0)return '耗时未提供';const n=Math.floor(ms/1000);return `${Math.floor(n/60)} 分 ${n%60} 秒`};
const short=r=>r?.id?.slice(-8)||'';

export function IssueStudio({api,issueId,statuses=[],agents=[],webUrl,workspaceSlug,revision,onClose,onSelectIssue,preferredRunId='',observedRuns=[],issues=[],runtimes=[],unavailable=false,settings={}}){
 const params=new URLSearchParams(location.search);
 const [data,setData]=useState(null),[error,setError]=useState(''),[retry,setRetry]=useState(0);
 const [selected,setSelected]=useState(preferredRunId||params.get('run')||'');
 const [tab,setTab]=useState(tabs.some(([id])=>id===params.get('evidence'))?params.get('evidence'):'execution');
 const [query,setQuery]=useState(''),[status,setStatus]=useState('all');
 const compare=useRef(null),list=useRef(null);
 useEffect(()=>{let live=true;const controller=new AbortController();api('issue',{issueId},controller.signal).then(next=>{if(!live)return;setData(next);setError('');setSelected(old=>next.runs.some(r=>r.id===old)?old:next.runs[0]?.id||'')}).catch(e=>{if(live)setError(e.message||'任务详情读取失败')});return()=>{live=false;controller.abort()}},[api,issueId,revision,retry]);
 const monitor=useTaskMonitor({runs:data?.runs||[],observedRuns,agents,runtimes,issueId,unavailable:unavailable||Boolean(error),settings});
 useEffect(()=>{if(!selected)return;const p=new URLSearchParams(location.search);p.set('run',selected);p.set('evidence',tab);history.replaceState(null,'',location.pathname+'?'+p.toString());list.current?.querySelector('[aria-pressed="true"]')?.scrollIntoView({block:'nearest'});},[selected,tab]);
 const runs=data?.runs||[],run=runs.find(r=>r.id===selected),issue=data?.issue||issues.find(i=>i.id===issueId);
 const select=id=>{setSelected(id);if(compare.current?.open)compare.current.close()};
 const name=r=>r.agentName||agents.find(a=>a.id===r.agentId)?.name||'身份未提供';
 const filtered=runs.filter(r=>(status==='all'||status==='failed'&&r.status==='failed'||status==='completed'&&r.status==='completed'||status==='active'&&active.has(r.status))&&`${name(r)} ${r.id} ${runStates[r.status]||r.status}`.toLowerCase().includes(query.trim().toLowerCase()));
 const url=workspaceSlug&&issue?`${webUrl}/${encodeURIComponent(workspaceSlug)}/issues/${encodeURIComponent(issue.identifier||issue.id)}`:null;
 const label=states[issue?.status]||statuses.find(s=>s.key===issue?.status)?.name||issue?.status;
 const countAgents=new Set(runs.map(r=>r.agentId).filter(Boolean)).size;
 const common=run?{api,run,issue,runs,agents,revision,observedRun:observedRuns.find(r=>r.id===run.id),runtimeStatus:runtimes.find(r=>r.id===run.runtimeId)?.status,settings,unavailable:unavailable||Boolean(error),url,onInspect:select}:{};
 return <section className="r3-studio" aria-label="任务运行工作台">
  <div className="r3-task-heading"><div className="r3-task-title"><button className="r3-back" onClick={onClose}>← 任务列表</button><h2>{issue?.title||'正在读取任务…'}</h2><p><code>{issue?.identifier||''}</code><span className={`v2-status state-${issue?.status}`}>{label||'读取中'}</span><span>业务状态独立于每次运行的结果</span></p></div><div className="r3-task-actions"><label>切换任务<select aria-label="选择业务任务" value={issueId} onChange={e=>onSelectIssue(e.target.value)}>{issues.map(i=><option key={i.id} value={i.id}>{i.identifier} · {i.title}</option>)}</select></label>{url&&<a href={url} target="_blank" rel="noreferrer">在 Multica 打开 ↗</a>}</div></div>
  {error&&<div className="mm-error" role="alert">{error}<button onClick={()=>setRetry(n=>n+1)}>重新读取</button></div>}
  <div className="r3-metrics" aria-label="本任务概况">{[['运行记录',runs.length,'本任务已读取记录','blue'],['参与智能体',countAgents,'按智能体去重','teal'],['当前活动',runs.filter(r=>active.has(r.status)).length,'正在执行或等待','amber'],['历史失败',runs.filter(r=>r.status==='failed').length,'保留历史，不表示当前故障','red']].map(([title,value,note,tone])=><div key={title}><span><i className={`r3-dot ${tone}`}/>{title}</span><strong>{data?value:'—'}</strong><small>{note}</small></div>)}</div>
  {!data?<div className="mm-empty" role="status">{error?'详情暂时不可用，请重新读取。':'正在读取任务与运行记录…'}</div>:<div className="r3-workbench">
   <aside className="r3-run-index" aria-label="运行记录列表"><div className="r3-index-heading"><h3>运行记录 <span>{runs.length}</span></h3><button onClick={()=>compare.current.showModal()} disabled={!runs.length}>耗时对比 ↗</button></div><p className="r3-index-caption">选择一次运行，在右侧查看结果与证据</p><div className="r3-index-filters"><input aria-label="搜索运行" placeholder="智能体或运行编号…" value={query} onChange={e=>setQuery(e.target.value)}/><select aria-label="筛选运行状态" value={status} onChange={e=>setStatus(e.target.value)}><option value="all">全部状态</option><option value="completed">运行完成</option><option value="failed">运行失败</option><option value="active">活动运行</option></select></div><div className="r3-run-list" ref={list}>{filtered.map((r,index)=><button key={r.id} className="r3-run-row" data-run-id={r.id} aria-pressed={selected===r.id} aria-label={`选择 ${name(r)} ${short(r)} ${runStates[r.status]||r.status}`} onClick={()=>select(r.id)}><span className={`r3-agent-icon ${r.status==='failed'?'failed':''}`} aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="6" width="14" height="14" rx="4"/><path d="M12 2v4M8 12h.01M16 12h.01M9 16h6M2 12h3m14 0h3"/></svg></span><span className="r3-row-main"><strong>{name(r)}</strong><small>{clock(r.startedAt||r.createdAt)} · <code>#{short(r)}</code></small><span className="r3-row-meta">{duration(r)}{r.id===runs[0]?.id?' · 最新运行':''}</span></span><span className={`r3-run-state ${r.status}`}>{runStates[r.status]||'待核实'}</span></button>)}{!filtered.length&&<div className="r3-index-empty"><p>{runs.length?'没有匹配的运行':'此任务尚无运行记录'}</p>{runs.length>0&&<button onClick={()=>{setStatus('all');setQuery('')}}>清空筛选</button>}</div>}</div><details className="r3-hierarchy"><summary>业务任务层级</summary><BusinessHierarchy detail={data} issues={issues} onSelectIssue={onSelectIssue}/></details></aside>
   <main className="r3-run-detail" aria-label="所选运行详情">{run?<><div className="r3-detail-heading"><div><div className="r3-run-title"><h3>{name(run)}</h3><code>#{short(run)}</code><span className={`r3-run-state ${run.status}`}>{runStates[run.status]||'待核实'}</span></div><p>{run.id===runs[0]?.id?'最新运行':'历史运行'} · {clock(run.startedAt||run.createdAt)}<span>执行 {duration(run)}</span></p></div><RunActions api={api} issueId={issueId} run={run} onCompleted={()=>setRetry(n=>n+1)}/></div>
   <nav className="r3-detail-tabs" aria-label="运行详情标签">{tabs.map(([id,title])=><button key={id} aria-current={tab===id?'page':undefined} onClick={()=>setTab(id)}>{title}</button>)}</nav>
   <div className="r3-detail-body" key={tab==='graph'?'graph':run.id+tab}>{tab==='graph'?<><div className="r3-context-note"><strong>本任务的运行调用关系</strong><span>连线回答“谁调用谁”；左侧高亮对应当前所选运行，位置不表示耗时。</span></div><CallGraph api={api} detail={data} settings={settings} runtimes={runtimes} unavailable={unavailable||Boolean(error)} observedRuns={observedRuns} onSelectRun={select} selectedRunId={selected}/></>:<>{run.error&&<FailureDiagnosis error={run.error}/>} {['execution','waterfall'].includes(tab)?<RunExecution {...common} waterfallOnly={tab==='waterfall'}/>:tab==='conversation'?<RunConversation api={api} run={run} issue={issue} agentName={name(run)} revision={revision} unavailable={unavailable||Boolean(error)}/>:<RunMessages api={api} run={run} revision={revision} observedRun={observedRuns.find(r=>r.id===run.id)}/>}</>}</div></>:<div className="mm-empty"><h3>等待任务产生运行记录</h3><p>运行开始后，可以在这里查看正式输出、时间瀑布图与调用关系。</p></div>}</main>
  </div>}
  <dialog className="r3-compare-dialog" ref={compare} aria-labelledby="r3CompareTitle"><header><div><h2 id="r3CompareTitle">跨运行耗时对比</h2><p>比较本任务各次运行的开始、结束与重叠；单次运行内部过程请使用“时间瀑布图”。</p></div><button onClick={()=>compare.current.close()} aria-label="关闭耗时对比">关闭 ×</button></header><TaskMonitorTimeline settings={settings} monitor={monitor} truncated={data?.runHistoryTruncated} selectedRunId={selected} onSelectRun={select}/></dialog>
 </section>;
}
