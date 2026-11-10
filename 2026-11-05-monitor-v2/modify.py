from pathlib import Path
root=Path(__file__).parent
p=root/'src/client.jsx';s=p.read_text(encoding='utf8')
s="import redesignCss from './redesign.css';\nimport {TaskList} from './task-table.jsx';\n"+s
s=s.replace('export function TaskList(', 'function LegacyTaskList(')
s=s.replace('executionCss,waterfallCss,taskMonitorCss]', 'executionCss,waterfallCss,taskMonitorCss,redesignCss]')
s=s.replace("[traceFocused, setTraceFocused] = useState(true)","[traceFocused, setTraceFocused] = useState(false)")
s=s.replace('setInspectorOpen(true); setTraceFocused(true);','setInspectorOpen(true); setTraceFocused(false);')
s=s.replace("inspectorHeading.current?.scrollIntoView({ block: 'start', behavior: 'auto' });","if (window.innerWidth < 900) inspectorHeading.current?.scrollIntoView({ block: 'nearest', behavior: 'auto' });")
s=s.replace('className="mm" data-theme={theme}', 'className="mm mm-v2" data-theme={theme}')
nav_start=s.index('          <nav className="mm-tabs" aria-label="监控视图">',s.index('export function Monitor'))
nav_end=s.index('</nav>',nav_start)+len('</nav>')
nav=s[nav_start:nav_end].strip().replace('className="mm-tabs"','className="mm-tabs v2-nav"')
s=s[:nav_start]+s[nav_end:]
start=s.index('    <header className="mm-header">',s.index('export function Monitor'))
end=s.index('</header>',start)+len('</header>')
head='''    <aside className="v2-sidebar"><a className="v2-brand" href="./"><span className="v2-brand-mark">M</span><span>Multica<span className="v2-brand-sub">任务观测台</span></span></a><div className="v2-workspace"><span>当前工作区</span><strong>{workspace?.name || '正在读取…'}</strong></div><span className="v2-nav-label">工作台</span>'''+nav+'''<div className="v2-side-bottom"><span className="v2-snapshot-dot"/>真实数据静态快照<br/><small>2026-11-05 08:33</small><a href="http://127.0.0.1:55315/" target="_blank" rel="noreferrer">打开原版对比 ↗</a></div></aside>
    <header className="mm-header"><div><p className="v2-breadcrumb">工作区 / {workspace?.name || '…'} / {selectedIssue ? '任务详情' : {runs:'任务监控',alerts:'异常提醒',metrics:'执行性能',runtimes:'运行时'}[tab]}</p><h1 id="mm-title">{selectedIssue ? '任务运行详情' : {runs:'任务监控',alerts:'异常提醒',metrics:'执行性能',runtimes:'运行时'}[tab]}</h1></div><div className="mm-actions"><span className="v2-snapshot-label">静态快照 · 11 月 5 日</span><button ref={settingsButton} onClick={() => configOpen ? requestConfigClose() : setConfigOpen(true)} disabled={!settings || !settings.hasToken}>连接信息</button><a className="v2-original" href="http://127.0.0.1:55315/" target="_blank" rel="noreferrer">对照原版 ↗</a></div></header>'''
s=s[:start]+head+s[end:]
s=s.replace('{statusLabel}</span></summary>','静态快照 · 刷新仅重放已有数据</span></summary>')
s=s.replace('>立即采集</button>','>重载快照</button>')
s=s.replace("{settings?.aiDiagnosis ? 'AI 诊断已开启；无可用模型时使用规则' : '使用规则诊断'} · 退出 DSH 后停止采集","真实快照 · 10 个任务 / 22 次运行 / 6,960 条日志")
s=s.replace('自动诊断与提醒 · 操作由你确认','新版对照稿 · 所有系统写操作已隔离')
s=s.replace('>运行进展</h2>','>所选运行</h2>').replace('>返回{view ===', '>关闭详情，返回{view ===')
s=s.replace("['graph','调用图']","['graph','调用流程图']")
s=s.replace('>输入输出与证据</button>','>输入与输出</button>').replace('>执行概览</button>','>执行概览</button>')
s=s.replace("traceFocused ? '并排查看调用图' : '只看运行详情'", "traceFocused ? '返回图与详情并排' : '展开运行详情'")
p.write_text(s,encoding='utf8')
p=root/'src/task-monitor.jsx';s=p.read_text(encoding='utf8').replace("[window, setWindow] = useState('recent')", "[window, setWindow] = useState('all')");p.write_text(s,encoding='utf8')
p=root/'src/call-graph.jsx';s=p.read_text(encoding='utf8');s=s.replace('NODE_WIDTH = 216, NODE_HEIGHT = 80, TOP = 60','NODE_WIDTH = 244, NODE_HEIGHT = 104, TOP = 32');s=s.replace('offset += 50','offset += 28');s=s.replace('[summaries, setSummaries] = useState(true)','[summaries, setSummaries] = useState(false)');s=s.replace("https://persistent.oaistatic.com/plugins/visualize/widgets/1.0.59/waterfall.js","./1.0.59/waterfall.js")
s=s.replace('<span className="mm-call-node-name">','<span className="mm-call-node-kicker">执行运行</span><span className="mm-call-node-name">')
s=s.replace("note || timing.alerts[0] || clock(node.run.startMs)", "note || timing.alerts[0] || ('开始 ' + clock(parsedTime(node.run.startedAt)))")
p.write_text(s,encoding='utf8')
p=root/'src/waterfall-chart.jsx';s=p.read_text(encoding='utf8').replace('https://persistent.oaistatic.com/plugins/visualize/widgets/1.0.59/waterfall.js','./1.0.59/waterfall.js');p.write_text(s,encoding='utf8')
p=root/'src/run-execution.jsx';s=p.read_text(encoding='utf8');start=s.index('    <RunWaterfall key={run.id}');end=s.index('    <div className="mm-exec-io">',start);charts=s[start:end];s=s[:start]+s[end:];insert=s.index('    {commentsError && <div className="mm-exec-error"',start);s=s[:insert]+'    <div className="v2-evidence-section"><div className="v2-section-title"><h3>执行过程与耗时</h3><span>日志时间瀑布图与逐条证据</span></div>\n'+charts+'    </div>\n'+s[insert:];p.write_text(s,encoding='utf8')
p=root/'boot.jsx';s=p.read_text(encoding='utf8');s=s.replace("const originalFetch=window.fetch.bind(window);",'');s=s.replace("const originalFetch=", "const ignoredFetch=");s=s.replace("// Replay only", "for (const list of [snapshot.overview.issues,snapshot.monitor.overview?.issues || []]) for (const issue of list) issue.snapshotRunCount=snapshot.issues[issue.id]?.runs.length ?? null;\n// Replay only")
p.write_text(s,encoding='utf8')
print('Fork modified; original source untouched')
