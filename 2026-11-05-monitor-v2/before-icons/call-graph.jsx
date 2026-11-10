import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { buildRunTimeline } from './task-relationships.mjs';
import { observedWork, triggerExcerpt, filterGraphRuns } from './monitor-presentation.mjs';
import { executionMetrics, traceDuration } from './execution-trace.mjs';

const MAX_NODES = 80;
const MAX_INPUT = 1000;
const ACTIVE = new Set(['running', 'queued', 'dispatched', 'waiting_local_directory', 'deferred']);
const TYPES = { delegation: '委派', rerun: '重跑', retry: '重试', parent_run: '父运行' };
const STATUS = { running: '运行中', queued: '排队中', dispatched: '已派发', waiting_local_directory: '等本地目录', deferred: '暂缓', completed: '已完成', failed: '失败', cancelled: '已取消', unknown: '待核实' };
const NODE_WIDTH = 244, NODE_HEIGHT = 104, TOP = 32;
const shortId = value => String(value || '').slice(-8);
const parsedTime = value => typeof value === 'string' && Number.isFinite(Date.parse(value)) ? Date.parse(value) : null;
const orderTime = run => parsedTime(run.startedAt) ?? parsedTime(run.createdAt) ?? 0;
const chronological = (a, b) => orderTime(a) - orderTime(b) || a.id.localeCompare(b.id);
const agentLabel = run => run.agentName || (run.agentId ? `智能体 ${shortId(run.agentId)}` : '身份未提供');
const runLabel = run => `${agentLabel(run)} #${shortId(run.id)}`;
const clock = ms => Number.isFinite(ms) ? new Date(ms).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false }) : '时间未知';
const safeStatus = status => ['running', 'completed', 'failed', 'cancelled'].includes(status) ? status : ACTIVE.has(status) ? 'waiting' : 'unknown';

function roundedPath(points) {
  let path = `M ${points[0].x} ${points[0].y}`;
  for (let index = 1; index < points.length - 1; index++) {
    const previous = points[index - 1], point = points[index], next = points[index + 1];
    const before = Math.hypot(point.x - previous.x, point.y - previous.y), after = Math.hypot(next.x - point.x, next.y - point.y);
    if (!before || !after) continue;
    const radius = Math.min(6, before / 2, after / 2);
    path += ` L ${point.x - (point.x - previous.x) / before * radius} ${point.y - (point.y - previous.y) / before * radius}`;
    path += ` Q ${point.x} ${point.y} ${point.x + (next.x - point.x) / after * radius} ${point.y + (next.y - point.y) / after * radius}`;
  }
  const last = points.at(-1);
  return `${path} L ${last.x} ${last.y}`;
}

function legacyRouteCalls(nodes, lanes, relations, selectedRunId) {
  const byId = new Map(nodes.map(node => [node.id, node]));
  const outgoing = new Map(nodes.map(node => [node.id, []]));
  const incoming = new Map(nodes.map(node => [node.id, []]));
  const edges = relations.map(edge => ({ ...edge, fromNode: byId.get(edge.from), toNode: byId.get(edge.to) }));
  for (const edge of edges) { outgoing.get(edge.from).push(edge); incoming.get(edge.to).push(edge); }
  for (const node of nodes) {
    const out = outgoing.get(node.id).sort((a, b) => a.toNode.lane - b.toNode.lane || a.toNode.rank - b.toNode.rank || a.id.localeCompare(b.id));
    const into = incoming.get(node.id).sort((a, b) => a.fromNode.lane - b.fromNode.lane || a.fromNode.rank - b.fromNode.rank || a.id.localeCompare(b.id));
    out.forEach((edge, index) => { edge.sourceOffset = 18 + (NODE_WIDTH - 36) * (index + 1) / (out.length + 1); });
    into.forEach((edge, index) => { edge.targetOffset = 18 + (NODE_WIDTH - 36) * (index + 1) / (into.length + 1); });
  }
  const channels = Array.from({ length: lanes.length + 1 }, () => []);
  const longEdges = edges.filter(edge => edge.toNode.rank > edge.fromNode.rank + 1).sort((a, b) => a.fromNode.rank - b.fromNode.rank || b.toNode.rank - a.toNode.rank || a.id.localeCompare(b.id));
  for (const edge of longEdges) {
    const from = edge.fromNode, to = edge.toNode;
    const boundary = from.lane === to.lane ? (from.lane === 0 ? 0 : from.lane + 1) : Math.min(from.lane, to.lane) + 1;
    const tracks = channels[boundary];
    let track = tracks.findIndex(spans => spans.every(span => edge.toNode.rank - 1 < span.start || edge.fromNode.rank > span.end));
    if (track < 0) { track = tracks.length; tracks.push([]); }
    tracks[track].push({ start: from.rank, end: to.rank - 1 });
    edge.channel = { boundary, track };
  }
  const gaps = channels.map((tracks, index) => (index === 0 || index === lanes.length ? 32 : 64) + tracks.length * 12);
  const xs = [];
  for (let index = 0; index < lanes.length; index++) xs[index] = index ? xs[index - 1] + NODE_WIDTH + gaps[index] : gaps[0];
  const width = lanes.length ? xs.at(-1) + NODE_WIDTH + gaps.at(-1) : 360;
  nodes.forEach(node => { node.x = xs[node.lane]; });
  lanes.forEach((lane, index) => {
    lane.x = index ? (xs[index - 1] + NODE_WIDTH + xs[index]) / 2 : 0;
    lane.width = (index === lanes.length - 1 ? width : (xs[index] + NODE_WIDTH + xs[index + 1]) / 2) - lane.x;
  });
  for (const edge of longEdges) {
    const { boundary, track } = edge.channel;
    edge.channelX = boundary === 0 ? xs[0] - 20 - track * 12 : boundary === lanes.length ? xs.at(-1) + NODE_WIDTH + 20 + track * 12 : (xs[boundary - 1] + NODE_WIDTH + xs[boundary]) / 2 + (track - (channels[boundary].length - 1) / 2) * 12;
  }
  const rowEvents = Array.from({ length: Math.max(0, ...nodes.map(node => node.rank)) }, () => []);
  for (const edge of edges) {
    edge.sourceX = edge.fromNode.x + edge.sourceOffset;
    edge.targetX = edge.toNode.x + edge.targetOffset;
    edge.depart = { edge, kind: 'depart', start: edge.sourceX, end: edge.channelX ?? edge.targetX };
    rowEvents[edge.fromNode.rank].push(edge.depart);
    if (edge.channel) {
      edge.arrive = { edge, kind: 'arrive', start: edge.channelX, end: edge.targetX };
      rowEvents[edge.toNode.rank - 1].push(edge.arrive);
    } else edge.arrive = edge.depart;
  }
  const rowYs = [TOP];
  rowEvents.forEach((events, row) => {
    events.sort((a, b) => Math.abs(b.end - b.start) - Math.abs(a.end - a.start) || a.edge.id.localeCompare(b.edge.id));
    let offset = 26;
    for (const event of events) {
      event.y = rowYs[row] + NODE_HEIGHT + offset;
      offset += 28;
    }
    rowYs.push(rowYs[row] + NODE_HEIGHT + Math.max(28, offset + 8));
  });
  nodes.forEach(node => { node.y = rowYs[node.rank]; });
  const relatedEdges = new Set();
  if (byId.has(selectedRunId)) {
    for (const [direction, endpoint] of [[incoming, 'from'], [outgoing, 'to']]) {
      const seen = new Set(), queue = [selectedRunId];
      while (queue.length) {
        const current = queue.pop();
        if (seen.has(current)) continue;
        seen.add(current);
        for (const edge of direction.get(current)) { relatedEdges.add(edge.id); queue.push(edge[endpoint]); }
      }
    }
  }
  for (const edge of edges) {
    const start = { x: edge.sourceX, y: edge.fromNode.y + NODE_HEIGHT }, end = { x: edge.targetX, y: edge.toNode.y - 5 };
    const points = [start, { x: start.x, y: edge.depart.y }];
    if (edge.channel) points.push({ x: edge.channelX, y: edge.depart.y }, { x: edge.channelX, y: edge.arrive.y });
    points.push({ x: end.x, y: edge.arrive.y }, end);
    edge.points = points.filter((point, index) => index === 0 || point.x !== points[index - 1].x || point.y !== points[index - 1].y);
    edge.path = roundedPath(edge.points);
    edge.showLabel = true;
    const labelEvent = Math.abs(edge.depart.end - edge.depart.start) >= Math.abs(edge.arrive.end - edge.arrive.start) ? edge.depart : edge.arrive;
    edge.labelX = Math.abs(labelEvent.end - labelEvent.start) < 46 ? labelEvent.start + 34 : (labelEvent.start + labelEvent.end) / 2;
    edge.labelY = labelEvent.y;
    edge.emphasis = byId.has(selectedRunId) ? relatedEdges.has(edge.id) ? 'is-connected' : 'is-dimmed' : '';
    delete edge.depart.edge;
    delete edge.arrive.edge;
  }
  return { edges, width, height: Math.max(250, (rowYs.at(-1) || TOP) + NODE_HEIGHT + 24) };
}

function routeCalls(nodes, lanes, relations, selectedRunId) {
 const byId=new Map(nodes.map(n=>[n.id,n]));const adj=new Map(nodes.map(n=>[n.id,new Set()]));
 for(const e of relations){adj.get(e.from)?.add(e.to);adj.get(e.to)?.add(e.from)}
 const seen=new Set(),groups=[],isolated=[];
 for(const node of [...nodes].sort((a,b)=>chronological(a.run,b.run))){if(seen.has(node.id))continue;const group=[],queue=[node.id];while(queue.length){const id=queue.shift();if(seen.has(id))continue;seen.add(id);group.push(byId.get(id));for(const other of adj.get(id)||[])queue.push(other)}if(group.length===1)isolated.push(group[0]);else groups.push(group)}
 groups.sort((a,b)=>b.length-a.length||chronological(a[0].run,b[0].run));
 let baseX=32,maxY=0;const sections=[];
 for(const [i,group] of groups.entries()){const minRank=Math.min(...group.map(n=>n.rank));const levels=new Map();for(const n of group){const rank=n.rank-minRank;if(!levels.has(rank))levels.set(rank,[]);levels.get(rank).push(n)}const width=Math.max(...[...levels.values()].map(l=>l.length))*(NODE_WIDTH+28)+16;
 for(const [rank,level]of levels){level.sort((a,b)=>chronological(a.run,b.run)).forEach((n,j)=>{n.x=baseX+j*(NODE_WIDTH+28);n.y=60+rank*164;maxY=Math.max(maxY,n.y+NODE_HEIGHT)})}sections.push({x:baseX-12,width,title:'调用链 '+(i+1),count:group.length});baseX+=width+24;}
 if(isolated.length){isolated.sort((a,b)=>chronological(a.run,b.run)).forEach((n,j)=>{n.x=baseX;n.y=60+j*164;maxY=Math.max(maxY,n.y+NODE_HEIGHT)});sections.push({x:baseX-12,width:NODE_WIDTH+28,title:'来源未关联',count:isolated.length});baseX+=NODE_WIDTH+44;}
 const selectedGroup=groups.find(g=>g.some(n=>n.id===selectedRunId));const related=new Set(selectedGroup?.map(n=>n.id)||[]);
 const edges=relations.map((edge,i)=>{const fromNode=byId.get(edge.from),toNode=byId.get(edge.to),sx=fromNode.x+NODE_WIDTH/2,sy=fromNode.y+NODE_HEIGHT,tx=toNode.x+NODE_WIDTH/2,ty=toNode.y;let points;
 if(toNode.rank===fromNode.rank+1)points=[{x:sx,y:sy},{x:sx,y:sy+24},{x:tx,y:ty-24},{x:tx,y:ty}];else{const side=Math.max(fromNode.x,toNode.x)+NODE_WIDTH+12+(i%2)*8;points=[{x:sx,y:sy},{x:sx,y:sy+20},{x:side,y:sy+20},{x:side,y:ty-20},{x:tx,y:ty-20},{x:tx,y:ty}]}
 return {...edge,fromNode,toNode,path:roundedPath(points),labelX:(sx+tx)/2+22,labelY:(sy+ty)/2,emphasis:selectedRunId?(related.has(edge.from)&&related.has(edge.to)?'is-connected':'is-dimmed'):''};});
 return {edges,width:Math.max(360,baseX),height:Math.max(260,maxY+32),sections};
}

function elapsed(run) {
  if (run.timeStatus === 'not_started') return '尚未开始';
  if (!run.intervalKnown) return '耗时未知';
  const seconds = Math.max(0, Math.floor(run.durationMs / 1000));
  if (seconds < 60) return `${seconds} 秒`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)} 分 ${seconds % 60} 秒`;
  return `${Math.floor(seconds / 3600)} 小时 ${Math.floor(seconds % 3600 / 60)} 分`;
}

export function buildCallGraphLayout(detail, now = Date.now(), selectedRunId, nodeLimit = MAX_NODES, priorityIds = []) {
  const input = Array.isArray(detail?.runs) ? detail.runs : [];
  const unique = new Map();
  for (const run of input.slice(0, MAX_INPUT)) {
    if (run && typeof run.id === 'string' && run.id.length > 0 && run.id.length <= 256 && !unique.has(run.id)) unique.set(run.id, run);
  }
  const all = [...unique.values()];
  const limit = Math.min(MAX_NODES, Math.max(1, nodeLimit));
  const neighbours = new Map(all.map(run => [run.id, new Set()]));
  for (const run of all) for (const field of ['delegatedFromTaskId', 'retryOfTaskId', 'rerunOfTaskId', 'parentTaskId']) {
    const source = run[field];
    if (source && neighbours.has(source) && source !== run.id) { neighbours.get(run.id).add(source); neighbours.get(source).add(run.id); }
  }
  const selected = all.find(run => run.id === selectedRunId);
  const priority = priorityIds.map(id => unique.get(id)).filter(Boolean);
  const seeds = [selected, ...priority, ...all.filter(run => ACTIVE.has(run.status)).sort(chronological)].filter(Boolean);
  const retained = [], retainedIds = new Set(), queue = [];
  for (const seed of seeds) if (!retainedIds.has(seed.id) && retained.length < limit) { retained.push(seed); retainedIds.add(seed.id); queue.push(seed.id); }
  while (queue.length && retained.length < limit) {
    for (const id of neighbours.get(queue.shift()) || []) if (!retainedIds.has(id) && retained.length < limit) {
      retained.push(unique.get(id)); retainedIds.add(id); queue.push(id);
    }
  }
  for (const run of [...all].sort((a, b) => chronological(b, a))) if (!retainedIds.has(run.id) && retained.length < limit) { retained.push(run); retainedIds.add(run.id); }
  const timeline = buildRunTimeline(retained, now, { coverage: { runs: detail?.runHistoryTruncated || all.length > limit ? 'partial' : 'complete' }, relations: detail?.relations });
  const runs = [...timeline.runs].sort(chronological);
  const byId = new Map(runs.map(run => [run.id, run]));
  const explicit = timeline.relations.filter(edge => TYPES[edge.type]);
  const knownIds = new Set(detail?.knownRunIds || []);
  const unresolved = timeline.unresolvedRelations.map(edge => ({ ...edge, sourceOmitted: unique.has(edge.from) || knownIds.has(edge.from) }));
  const sourceNotes = new Map();
  for (const edge of unresolved) {
    if (!sourceNotes.has(edge.to)) sourceNotes.set(edge.to, []);
    sourceNotes.get(edge.to).push(edge);
  }
  const incoming = new Map(runs.map(run => [run.id, []]));
  const outgoing = new Map(runs.map(run => [run.id, []]));
  for (const edge of explicit) { incoming.get(edge.to).push(edge); outgoing.get(edge.from).push(edge); }
  const remaining = new Map(runs.map(run => [run.id, run]));
  const degree = new Map(runs.map(run => [run.id, incoming.get(run.id).length]));
  const nodes = [], placed = new Map(), brokenEdges = new Set();
  let isolatedCount = 0;
  const levelCounts = new Map();
  while (remaining.size) {
    let ready = [...remaining.values()].filter(run => degree.get(run.id) === 0).sort(chronological);
    if (!ready.length) {
      const earliest = [...remaining.values()].sort(chronological)[0];
      for (const edge of incoming.get(earliest.id)) if (remaining.has(edge.from)) brokenEdges.add(edge.id);
      ready = [earliest];
    }
    const run = ready[0];
    const parents = incoming.get(run.id).filter(edge => !brokenEdges.has(edge.id)).map(edge => placed.get(edge.from)).filter(Boolean);
    const isolated = incoming.get(run.id).length === 0 && outgoing.get(run.id).length === 0;
    let rank = parents.length ? Math.max(...parents.map(node => node.rank + 1)) : isolated ? Math.floor(isolatedCount++ / 4) + 1 : 0;
    while ((levelCounts.get(rank) || 0) >= 4) rank++;
    levelCounts.set(rank, (levelCounts.get(rank) || 0) + 1);
    const node = { id: run.id, run, rank, width: NODE_WIDTH, height: NODE_HEIGHT, sourceNotes: sourceNotes.get(run.id) || [] };
    nodes.push(node); placed.set(node.id, node);
    remaining.delete(run.id);
    for (const edge of outgoing.get(run.id)) degree.set(edge.to, degree.get(edge.to) - 1);
  }
  // Columns belong to layout positions, not roles. Connected nodes remain close to their parents.
  const levels = new Map();
  for (const node of nodes) { if (!levels.has(node.rank)) levels.set(node.rank, []); levels.get(node.rank).push(node); }
  for (const [rank, level] of [...levels].sort((a, b) => a[0] - b[0])) {
    const occupied = new Set();
    for (const node of level) {
      const parents = incoming.get(node.id).filter(edge => !brokenEdges.has(edge.id)).map(edge => placed.get(edge.from)).filter(parent => parent && parent.rank < rank);
      const preferred = parents.length ? Math.round(parents.reduce((sum, parent) => sum + parent.lane, 0) / parents.length) : 0;
      let col = preferred;
      while (occupied.has(col)) col++;
      node.lane = col; occupied.add(col);
    }
  }
  const columnCount = nodes.length ? Math.max(...nodes.map(node => node.lane)) + 1 : 0;
  const lanes = Array.from({ length: columnCount }, (_, index) => ({ id: `column-${index}`, runs: [] }));
  const routed = routeCalls(nodes, lanes, explicit.filter(edge => !brokenEdges.has(edge.id)), selectedRunId);
  const edges = routed.edges;
  return { nodes, lanes, edges, unresolved, cycleEdges: explicit.filter(edge => brokenEdges.has(edge.id)),
    width: routed.width, height: routed.height, sections: routed.sections,
    totalRuns: all.length, omittedRuns: Math.max(0, all.length - nodes.length), omittedActive: all.filter(run => ACTIVE.has(run.status) && !byId.has(run.id)).length,
    inputTruncated: input.length > MAX_INPUT, historyTruncated: detail?.runHistoryTruncated === true, lineageKnown: timeline.coverage.lineage === 'available' };
}

function ZoomIcon({ plus = false }) {
  return <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d={plus ? 'M3 8h10M8 3v10' : 'M3 8h10'} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
}

function sourceNote(node) {
  if (!node.sourceNotes.length) return null;
  if (node.sourceNotes.every(edge => edge.reason === 'missing_source')) return node.sourceNotes.every(edge => edge.sourceOmitted) ? '上游未展示' : '上游未加载';
  return '来源待核实';
}

const displayTime = value => parsedTime(value) == null ? '未提供' : new Date(value).toLocaleString('zh-CN', { hour12: false });

export function callEdgePreview(edge) {
  const target = edge.toNode.run;
  const when = parsedTime(target.createdAt);
  const creation = when == null ? '创建未提供' : `创建 ${clock(when)}`;
  const summary = triggerExcerpt(target.triggerSummary);
  return `${TYPES[edge.type]} · ${creation} · ${summary}`;
}

export function describeCallEdge(edge, observedRuns = [], unavailable = false) {
  const target = edge.toNode.run;
  const observed = observedRuns.find(run => run?.id === target.id && target.issueId && run.issueId === target.issueId);
  const { stale, current, action } = observedWork(target, observed, unavailable);
  return {
    type: TYPES[edge.type], source: runLabel(edge.fromNode.run), target: runLabel(target),
    createdAt: displayTime(target.createdAt), startedAt: displayTime(target.startedAt),
    triggerSummary: typeof target.triggerSummary === 'string' && target.triggerSummary.trim() ? target.triggerSummary : '未提供',
    activity: action?.summary ? `${current ? '等待工具结果' : '最近动作'}：${action.summary}` : '暂无可识别的工作记录',
    activityAt: displayTime(action?.at), stale,
  };
}

export function CallGraph({ detail, onSelectRun, selectedRunId, observedRuns = [], api, unavailable = false, settings = {}, runtimes = [] }) {
  const [expanded, setExpanded] = useState(false);
  const [filters, setFilters] = useState({ status: 'all', agent: '', query: '', from: '', until: '' });
  const [summaries, setSummaries] = useState(false);
  const [focused, setFocused] = useState(false);
  const graphSection = useRef(null);
  useEffect(() => {
    if (!focused) return;
    graphSection.current?.scrollIntoView({ block: 'start' });
    const escape = event => { if (event.key === 'Escape') { event.stopPropagation(); setFocused(false); } };
    document.addEventListener('keydown', escape, true);
    return () => document.removeEventListener('keydown', escape, true);
  }, [focused]);
  const filtered = useMemo(() => filterGraphRuns(detail?.runs || [], filters), [detail, filters]);
  const filtering = filters.status !== 'all' || Boolean(filters.agent || filters.query || filters.from || filters.until);
  const graph = useMemo(() => buildCallGraphLayout({ ...detail, runs: filtered.runs, knownRunIds: (detail?.runs || []).map(run => run.id) }, Date.now(), filtered.runs.some(run => run.id === selectedRunId) ? selectedRunId : '', expanded ? MAX_NODES : 30, filtering ? [...filtered.matchedIds] : []), [detail, filtered, filtering, selectedRunId, expanded]);
  const changeFilter = (key, value) => { setFilters(old => ({ ...old, [key]: value })); setSelectedEdgeId(''); };
  const roles = [...new Map((detail?.runs || []).filter(run => run.agentId).map(run => [run.agentId, agentLabel(run)])).entries()];
  const [scale, setScale] = useState(1);
  const [selectedEdgeId, setSelectedEdgeId] = useState('');
  const [commentTime, setCommentTime] = useState(null), [commentRetry, setCommentRetry] = useState(0);
  const [humanActivity, setHumanActivity] = useState({ status: 'loading', items: [] });
  const [humanRetry, setHumanRetry] = useState(0);
  useEffect(() => {
    const issueId = detail?.issue?.id;
    if (!issueId || typeof api !== 'function') { setHumanActivity({ status: 'unavailable', items: [] }); return; }
    const controller = new AbortController();
    setHumanActivity({ status: 'loading', items: [] });
    api('humanActivity', { issueId }, controller.signal).then(value => {
      if (!controller.signal.aborted) setHumanActivity({ status: 'ready', items: value?.items || [], possiblyTruncated: value?.possiblyTruncated });
    }).catch(() => { if (!controller.signal.aborted) setHumanActivity({ status: 'error', items: [] }); });
    return () => controller.abort();
  }, [api, detail?.issue?.id, humanRetry]);
  const viewport = useRef(null);
  useEffect(()=>{if(viewport.current){setScale(Math.min(1,Math.max(.7,(viewport.current.clientWidth-20)/graph.width)));viewport.current.scrollTop=0;viewport.current.scrollLeft=0;}},[detail?.issue?.id,graph.width]);
  useEffect(()=>{const node=graph.nodes.find(n=>n.id===selectedRunId);if(node&&viewport.current)viewport.current.scrollTo({top:Math.max(0,node.y*scale-120),left:Math.max(0,node.x*scale-100),behavior:'auto'});},[selectedRunId]);
  const selectedEdge = graph.edges.find(edge => edge.id === selectedEdgeId);
  const edgeInfo = selectedEdge ? describeCallEdge(selectedEdge, observedRuns, unavailable) : null;
  const targetIssueId = selectedEdge?.toNode.run.issueId || '';
  const commentId = selectedEdge?.toNode.run.triggerCommentId || '';
  const commentKey = `${selectedEdgeId}:${targetIssueId}:${commentId}`;
  useEffect(() => {
    if (!selectedEdgeId || !commentId || !targetIssueId || targetIssueId !== detail?.issue?.id || typeof api !== 'function') return;
    const controller = new AbortController();
    setCommentTime({ key: commentKey, status: 'loading' });
    api('triggerCommentTime', { issueId: targetIssueId, commentId }, controller.signal).then(value => {
      if (!controller.signal.aborted) setCommentTime({ key: commentKey, status: value?.status || 'unknown', createdAt: value?.createdAt });
    }).catch(() => { if (!controller.signal.aborted) setCommentTime({ key: commentKey, status: 'error' }); });
    return () => controller.abort();
  }, [api, commentId, targetIssueId, detail?.issue?.id, selectedEdgeId, commentKey, commentRetry]);
  const commentStatus = !commentId ? 'missing' : !targetIssueId || targetIssueId !== detail?.issue?.id ? 'wrong_issue' : typeof api !== 'function' ? 'unavailable' : commentTime?.key === commentKey ? commentTime.status : 'loading';
  const commentLabel = commentStatus === 'found' ? displayTime(commentTime?.createdAt) : ({ missing: '运行未提供触发评论 ID', wrong_issue: '运行任务归属未核实', unavailable: '暂不支持读取触发评论', loading: '正在读取…', not_found: '评论不可用、已删除或未包含在接口结果中', invalid_time: '评论创建时间未提供或无效', error: '读取失败，请重试' })[commentStatus] || '评论时间无法确认';
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const presentTypes = Object.entries(TYPES).filter(([type]) => graph.edges.some(edge => edge.type === type));
  const fitWidth = () => setScale(Math.min(1.5, Math.max(.25, ((viewport.current?.clientWidth || graph.width) - 20) / graph.width)));
  const selectedNode = graph.nodes.find(node => node.id === selectedRunId);
  const revealSelected = () => {
    if (!selectedNode || !viewport.current) return;
    viewport.current.scrollIntoView({ block: 'start', behavior: 'auto' });
    viewport.current.scrollTo({ top: Math.max(0, selectedNode.y * scale - 36), left: Math.max(0, selectedNode.x * scale - 36), behavior: 'auto' });
  };
  return <section ref={graphSection} className={`mm-call-graph ${focused ? 'is-focused' : ''}`} aria-label="运行调用图">
    <div className="mm-call-toolbar">
      <div className="mm-call-description"><strong>{detail?.issue?.identifier || '当前任务'} · {graph.nodes.length} 次运行 · {graph.edges.length} 条关系</strong><button type="button" onClick={() => setFocused(value => !value)}>{focused ? '退出专注' : '专注图谱'}</button></div>
      {graph.nodes.length > 0 && <div className="mm-call-zoom" role="group" aria-label="调用图视图控制"><button type="button" onClick={() => setScale(value => Math.max(.25, Math.round((value - .1) * 100) / 100))} disabled={scale <= .25} aria-label="缩小调用图" title="缩小"><ZoomIcon/></button><button type="button" onClick={() => setScale(1)} aria-label="恢复原始大小" title="恢复 100%">{Math.round(scale * 100)}%</button><button type="button" onClick={() => setScale(value => Math.min(1.5, Math.round((value + .1) * 100) / 100))} disabled={scale >= 1.5} aria-label="放大调用图" title="放大"><ZoomIcon plus/></button><button type="button" onClick={fitWidth}>适应宽度</button>{selectedNode && <button type="button" onClick={revealSelected}>定位选中运行</button>}</div>}
    </div>
    <div className="mm-graph-filters"><select aria-label="筛选运行状态" value={filters.status} onChange={event => changeFilter('status', event.target.value)}><option value="all">全部状态</option><option value="failed">失败运行</option><option value="active">活动运行</option><option value="completed">已完成</option><option value="cancelled">已取消</option></select><select aria-label="筛选智能体" value={filters.agent} onChange={event => changeFilter('agent', event.target.value)}><option value="">全部智能体</option>{roles.map(([id, label]) => <option key={id} value={id}>{label}</option>)}</select><input aria-label="搜索运行或触发内容" placeholder="运行编号 / 触发内容" value={filters.query} onChange={event => changeFilter('query', event.target.value)}/><details><summary>时间范围</summary><label>开始于<input type="datetime-local" aria-label="运行开始时间下限" value={filters.from} onChange={event => changeFilter('from', event.target.value)}/></label><label>截至<input type="datetime-local" aria-label="运行开始时间上限" value={filters.until} onChange={event => changeFilter('until', event.target.value)}/></label><small>按运行开始时间筛选；未开始时使用创建时间。</small></details><label><input type="checkbox" checked={summaries} onChange={event => setSummaries(event.target.checked)}/>连线摘要</label>{filtering && <button onClick={() => setFilters({ status: 'all', agent: '', query: '', from: '', until: '' })}>清除筛选</button>}</div>
    {filtering && <p className="mm-call-filter-result" role="status">{filtered.invalidRange ? '开始时间不能晚于截止时间。' : '匹配 ' + filtered.matchedIds.size + ' 次运行，图中显示 ' + graph.nodes.filter(node => filtered.matchedIds.has(node.id)).length + ' 次匹配和 ' + graph.nodes.filter(node => !filtered.matchedIds.has(node.id)).length + ' 次相邻运行；相邻运行仅供上下文。'}</p>}
    {graph.omittedRuns > 0 && <p className="mm-call-notice">共读取 {graph.totalRuns} 次运行，图中展示 {graph.nodes.length} 次，优先保留选中、活动及相邻运行。{graph.omittedActive > 0 && `另有 ${graph.omittedActive} 次活动运行未展示。`}未展示的上游来源已标注。</p>}
    {graph.totalRuns > 30 && <p className="mm-call-notice">{!expanded ? <button type="button" onClick={() => setExpanded(true)}>展开更多运行（最多 80 条）</button> : <button type="button" onClick={() => setExpanded(false)}>收起为聚焦视图</button>}</p>}
    {(graph.inputTruncated || graph.historyTruncated) && <p className="mm-call-notice">运行历史尚未完整读取（任务历史最多 500 条，响应大小受限），调用图仅覆盖{graph.inputTruncated ? '前 1,000 条' : '已加载'}记录。</p>}
    {graph.nodes.length === 0 ? <div className="mm-call-empty"><strong>{filtering ? '没有符合条件的运行' : '还没有可展示的运行'}</strong><p>{filtering ? '调整筛选条件查看其他运行。' : '任务产生运行记录后，这里会显示智能体之间的调用路径。'}</p></div> : <>
      {graph.edges.length === 0 && <p className="mm-call-notice">{graph.unresolved.length ? '当前记录不足以连出调用路径，上游未加载或来源待核实的运行已标注。' : graph.lineageKnown ? '已加载运行没有明确的调用关联；下方分别展示各次运行。' : '尚未读到明确的调用来源；各次运行分别展示，不按时间推断调用。'}</p>}
      <div className="mm-call-legend"><span className="mm-call-status-legend">{[['running', '运行中'], ['completed', '已完成'], ['failed', '失败'], ['waiting', '等待中']].map(([state, label]) => <span key={state}><i className={`status-${state}`} aria-hidden="true"/>{label}</span>)}</span>{presentTypes.map(([type, label]) => <span key={type}><svg width="28" height="10" viewBox="0 0 28 10" aria-hidden="true"><path d="M1 5h24" className={`mm-call-edge ${type}`} fill="none"/><path d="m22 2 4 3-4 3" className={`mm-call-edge ${type}`} fill="none"/></svg>{label}</span>)}<span className="mm-call-scroll-hint">点击连线查看关系和时间 · 点击运行查看进展</span></div>
      <div className={`mm-call-workbench ${edgeInfo ? 'has-edge' : ''}`}>
      <div ref={viewport} className="mm-call-viewport" tabIndex={0} role="region" aria-label="可滚动调用图，使用缩放控件或滚动查看完整内容">
        <div className="mm-call-scaled-space" style={{ width: graph.width * scale, height: graph.height * scale }}>
          <div className="mm-call-canvas" style={{ width: graph.width, height: graph.height, transform: `scale(${scale})` }}>
            {graph.sections?.map((section,index)=><div key={index} className="v2-graph-group" style={{left:section.x,width:section.width,height:graph.height-16}}><span>{section.title}<small>{section.count} 次运行</small></span></div>)}
            <svg className="mm-call-lines" width={graph.width} height={graph.height} viewBox={`0 0 ${graph.width} ${graph.height}`} role="group" aria-label={`${graph.edges.length} 条服务端明确记录的调用关系`}>
              <defs>{Object.keys(TYPES).map(type => <marker key={type} id={`${id}-${type}`} viewBox="0 0 7 7" refX="6" refY="3.5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 7 3.5 0 7Z" className={`mm-call-arrow ${type}`}/></marker>)}</defs>
              {graph.edges.map(edge => <g key={edge.id} className={selectedEdgeId === edge.id ? 'is-connected' : edge.emphasis} role="button" tabIndex={0} aria-label={`查看${runLabel(edge.fromNode.run)}与${runLabel(edge.toNode.run)}的${TYPES[edge.type]}关系`} onClick={() => setSelectedEdgeId(edge.id)} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setSelectedEdgeId(edge.id); } }}><title>{`${agentLabel(edge.fromNode.run)} (${edge.from}) ${TYPES[edge.type]} ${agentLabel(edge.toNode.run)} (${edge.to})；服务端来源字段：${edge.evidence.field}`}</title><path d={edge.path} className="mm-call-edge-clearance" fill="none" stroke="var(--mm-bg)" strokeWidth="6"/><path d={edge.path} className={`mm-call-edge ${edge.type}`} markerEnd={`url(#${id}-${edge.type})`}/><path d={edge.path} className="mm-call-edge-hit"/><text x={edge.labelX} y={edge.labelY} className="v2-edge-label">{TYPES[edge.type]}</text>{(summaries || selectedEdgeId === edge.id) && <g transform={'translate(' + Math.max(126, Math.min(graph.width - 126, edge.labelX)) + ',' + edge.labelY + ')'} className="mm-call-edge-preview"><title>{callEdgePreview(edge)}</title><rect x="-122" y="-21" width="244" height="42" rx="4"/><text textAnchor="middle" y="-5">{TYPES[edge.type]} · {parsedTime(edge.toNode.run.createdAt) === null ? '创建时间未提供' : '创建 ' + clock(parsedTime(edge.toNode.run.createdAt))}</text><text textAnchor="middle" y="11">{triggerExcerpt(edge.toNode.run.triggerSummary, 19)}</text></g>}</g>)}
            </svg>
            {graph.nodes.map(node => {
              const note = sourceNote(node), status = STATUS[node.run.status] || '状态待核实';
              const timing = executionMetrics(node.run, { observedRun: observedRuns.find(item => item.id === node.id), unavailable, settings, runtimeStatus: runtimes.find(item => item.id === node.run.runtimeId)?.status });
              const timingLabel = timing.waiting ? `启动等待 ${traceDuration(timing.wait)}` : elapsed(node.run);
              const title = `${runLabel(node.run)}\n${status} · ${elapsed(node.run)}\n开始：${node.run.startedAt || '未提供'}${note ? `\n${node.sourceNotes.map(edge => `${TYPES[edge.type]}来源 ${edge.from || '无效 ID'}：${edge.sourceOmitted ? '未展示' : '未加载或待核实'}`).join('\n')}` : ''}`;
              return <button key={node.id} type="button" className={`mm-call-node status-${safeStatus(node.run.status)}${ACTIVE.has(node.run.status) ? ' is-active' : ''}${node.run.status === 'failed' ? ' is-failed' : ''}${selectedRunId === node.id ? ' is-selected' : ''}${note ? ' has-unresolved' : ''}${timing.alerts.length ? ' has-attention' : ''}`} style={{ left: node.x, top: node.y, width: node.width, height: node.height }} title={`${title}${timing.alerts.length ? `\n${timing.alerts.join(' · ')}` : ''}`} aria-pressed={selectedRunId === node.id} aria-label={`查看${runLabel(node.run)}的进展，${status}，${timingLabel}${timing.alerts.length ? `，${timing.alerts.join('，')}` : ''}${note ? `，${note}` : ''}`} onClick={() => onSelectRun?.(node.id)} disabled={!onSelectRun}>
                <span className="mm-call-node-kicker">执行运行</span><span className="mm-call-node-name">{agentLabel(node.run)}{filtering && !filtered.matchedIds.has(node.id) && <small> · 相邻</small>}</span><span className="mm-call-node-identity"><span>#{shortId(node.id)}</span><span className="mm-call-node-status">{status}</span></span><span className="mm-call-node-foot"><span className={note ? 'mm-call-source-note' : ''}>{note || timing.alerts[0] || ('开始 ' + clock(parsedTime(node.run.startedAt)))}</span><span>{node.run.ongoing && !timing.waiting ? '已运行 ' : ''}{timingLabel}</span></span>
              </button>;
            })}
          </div>
        </div>
      </div>
      {edgeInfo && <section tabIndex={0} className="mm-call-edge-detail" aria-label="调用关系详情">
        <div className="mm-call-edge-detail-head"><strong>{edgeInfo.type}关系</strong><button type="button" onClick={() => setSelectedEdgeId('')}>关闭关系详情</button></div>
        <p>{edgeInfo.source} → {edgeInfo.target}</p>
        <dl><div><dt>目标运行创建时间</dt><dd>{edgeInfo.createdAt}</dd></div><div><dt>目标运行开始时间</dt><dd>{edgeInfo.startedAt}</dd></div><div><dt>触发评论创建时间</dt><dd>{commentLabel}{commentStatus === 'error' && <button type="button" onClick={() => setCommentRetry(value => value + 1)}>重试读取评论时间</button>}</dd></div><div><dt>目标运行触发摘要</dt><dd className="mm-call-edge-summary"><strong>{triggerExcerpt(edgeInfo.triggerSummary, 100)}</strong><details><summary>查看完整触发原文</summary><p>{edgeInfo.triggerSummary}</p></details></dd></div><div><dt>目标运行的工作记录</dt><dd>{edgeInfo.activity} · 记录时间 {edgeInfo.activityAt}{edgeInfo.stale ? ' · 采集异常或日志未补齐，信息可能过期' : ''}</dd></div></dl>
        <p className="mm-muted">评论按 ID 与任务归属精确匹配；评论创建时间不是关系写入时间。服务未提供这条关系的精确触发时间，运行时间和触发摘要也不能证明上游具体执行了什么。</p>
        {onSelectRun && <button type="button" onClick={() => onSelectRun(selectedEdge.to)}>查看目标运行进展</button>}
      </section>}
      </div>
      {(graph.unresolved.length > 0 || graph.cycleEdges.length > 0) && <details className="mm-call-unresolved"><summary>{graph.unresolved.length + graph.cycleEdges.length} 条来源未连入调用图</summary><ul>{graph.unresolved.map((edge, index) => <li key={`${edge.type}:${edge.from}:${edge.to}:${index}`}><strong>{runLabel(graph.nodes.find(node => node.id === edge.to).run)}</strong>：{TYPES[edge.type]}来源 #{shortId(edge.from) || '未知'}，{edge.sourceOmitted ? '来源运行未展示。' : edge.reason === 'missing_source' ? '来源运行未加载。' : '指针或任务归属待核实。'}</li>)}{graph.cycleEdges.map(edge => <li key={edge.id}>#{shortId(edge.from)} {TYPES[edge.type]} #{shortId(edge.to)}：存在循环引用，未将循环展示为调用起点。</li>)}</ul></details>}
      {presentTypes.some(([type]) => type === 'parent_run') && <p className="mm-call-footnote">父运行表示运行来源关联，不是业务父子任务。</p>}
      <p className="mm-call-footnote">连线来自服务端的明确来源；上下位置与间距不代表耗时。</p>
    </>}
    <details className="mm-call-participation">
      <summary>人员参与 · {humanActivity.status === 'ready' ? `${humanActivity.items.length} 条已读取评论${humanActivity.possiblyTruncated ? '，可能未读全' : ''}` : humanActivity.status === 'loading' ? '读取中' : humanActivity.status === 'error' ? '读取失败' : '暂不可读'}</summary>
      <div className="mm-call-edge-detail" aria-label="人员参与记录">
        {humanActivity.status === 'loading' && <p>正在读取人员评论…</p>}
        {humanActivity.status === 'error' && <p>人员评论读取失败，当前无法核实。<button type="button" onClick={() => setHumanRetry(value => value + 1)}>重新读取</button></p>}
        {humanActivity.status === 'unavailable' && <p>当前无法读取人员评论。</p>}
        {humanActivity.status === 'ready' && !humanActivity.items.length && <p>已读取的评论中暂无人员参与记录。</p>}
        {humanActivity.items.map(item => { const triggered = (detail?.runs || []).filter(run => run.triggerCommentId === item.id); return <div key={item.id}><p><strong>人员 #{shortId(item.authorId)}</strong> · {displayTime(item.createdAt)} · 评论</p><p>{item.content || '评论内容未提供'}</p>{triggered.length > 0 && <p>触发运行：{triggered.map(run => <button key={run.id} type="button" onClick={() => onSelectRun?.(run.id)}>{agentLabel(run)} #{shortId(run.id)}</button>)}</p>}</div>; })}
        {humanActivity.possiblyTruncated && <p>评论可能超过读取上限，人员参与记录可能不完整。</p>}
        <p className="mm-muted">仅展示该任务已读取的人类评论；只有评论 ID 与运行触发 ID 一致时才标记触发，其他评论不推断调用关系。人员名称未提供时显示 ID。</p>
      </div>
    </details>
  </section>;
}
