import {build} from '../../node_modules/esbuild/lib/main.js';
import {readFile,writeFile} from 'node:fs/promises';import assert from 'node:assert/strict';import {createHash} from 'node:crypto';
const root=new URL('.',import.meta.url).pathname.slice(1);
await build({entryPoints:[root+'src/call-graph.jsx'],outfile:root+'verify-graph.mjs',bundle:true,platform:'node',format:'esm',packages:'external',jsx:'automatic'});
const {buildCallGraphLayout}=await import('./verify-graph.mjs?verify='+Date.now());
const snapshot=JSON.parse(await readFile(root+'snapshot.json','utf8'));let graphs=0,selectionChecks=0;
for(const detail of Object.values(snapshot.issues)){
 const graph=buildCallGraphLayout(detail);assert.equal(graph.nodes.length,detail.runs.length);
 for(let i=0;i<graph.nodes.length;i++){const n=graph.nodes[i];assert.ok(n.x>=0&&n.y>=0);assert.ok(n.x+n.width<=graph.width&&n.y+n.height<=graph.height);for(const m of graph.nodes.slice(i+1)){assert.ok(n.x+n.width<=m.x||m.x+m.width<=n.x||n.y+n.height<=m.y||m.y+m.height<=n.y,'Nodes overlap')}}
 for(const edge of graph.edges){const run=detail.runs.find(r=>r.id===edge.to);assert.ok([run.delegatedFromTaskId,run.rerunOfTaskId,run.retryOfTaskId,run.parentTaskId].includes(edge.from),'Invented relation')}
 for(const run of detail.runs){const selected=buildCallGraphLayout(detail,Date.now(),run.id);for(const node of graph.nodes){const actual=selected.nodes.find(n=>n.id===node.id);assert.equal(actual.x,node.x);assert.equal(actual.y,node.y)}selectionChecks++}graphs++;
}
const cx4=Object.values(snapshot.issues).find(d=>d.issue.identifier==='CXTE-4');assert.equal(buildCallGraphLayout(cx4).edges.length,5);assert.equal(buildCallGraphLayout(cx4).nodes.length,9);
const originalBase=new URL('../2026-11-05-original-replica/',import.meta.url);const hashes=JSON.parse(await readFile(new URL('../2026-11-05-monitor-redesign/baseline-hashes.json',import.meta.url),'utf8'));for(const [file,hash]of Object.entries(hashes))assert.equal(createHash('sha256').update(await readFile(new URL(file,originalBase))).digest('hex'),hash);
const records=snapshot.messages[Object.keys(snapshot.messages).find(id=>id.endsWith('e451fb6a'))];assert.equal(records.messages.length,385);
const result={graphs,selectionChecks,cx4Nodes:9,cx4Relations:5,rawLogs:385,overlaps:0,inventedRelations:0,selectionLayoutStable:true,originalUnchanged:true,at:new Date().toISOString()};
await writeFile(root+'verification.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result));
