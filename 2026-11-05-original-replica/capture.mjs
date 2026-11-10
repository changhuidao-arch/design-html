import { readFile, writeFile } from 'node:fs/promises';
import { MulticaClient } from '../../src/multica-api.mjs';
import { SettingsStore } from '../../src/settings.mjs';
import { MonitoringService } from '../../src/monitor.mjs';
const store = new SettingsStore('C:/Users/BW/.dsh/storages/multica-monitor/settings.json');
const settings = await store.load();
const config = {...store.value, revision: settings.revision};
const client = new MulticaClient({...config, fetchImpl:(url,opts)=>fetch(url,{...opts,signal:AbortSignal.any([opts?.signal,AbortSignal.timeout(20000)].filter(Boolean))})});
const snapshot = {capturedAt:new Date().toISOString(),version:'0.12.13',settings,issues:{},messages:{},humanActivity:{},runComments:{},errors:{}};
const capture = async (key,fn)=>{try{return await fn()}catch(e){snapshot.errors[key]=e.message;return null}};
snapshot.workspaces = await capture('workspaces',()=>client.workspaces());
snapshot.overview = await capture('overview',()=>client.overview());
if(!snapshot.overview) throw Error('Overview unavailable');
snapshot.participants=await capture('participants',()=>client.participants());
const monitor = new MonitoringService({getClient:()=>client,getConfig:()=>config,webSocketFactory:null});
monitor.start(); await monitor.refresh(); snapshot.monitor=monitor.snapshot(); monitor.stop();
for(const issue of snapshot.overview.issues){
 snapshot.issues[issue.id]=await capture('issue:'+issue.id,()=>client.issue(issue.id));
 snapshot.humanActivity[issue.id]=await capture('humanActivity:'+issue.id,()=>client.humanActivity(issue.id));
 snapshot.runComments[issue.id]=await capture('runComments:'+issue.id,()=>client.runComments(issue.id));
 console.log('Captured',issue.identifier,snapshot.issues[issue.id]?.runs.length,'runs');
}
const runs=[...new Map(Object.values(snapshot.issues).filter(Boolean).flatMap(d=>d.runs).map(r=>[r.id,r])).values()];
for(const run of runs){
 const messages=[];let since=0;let last;
 for(let p=0;p<100;p++){
  const page=await capture('messages:'+run.id,()=>client.messages(run.id,since));
  if(!page)break;last=page;messages.push(...page.messages);
  const next=page.nextSince??page.nextSeq??messages.at(-1)?.seq;
  if(!page.hasMore||!next||next<=since)break;since=next;
 }
 snapshot.messages[run.id]=last?{...last,messages,hasMore:false}:null;
}
let json=JSON.stringify(snapshot,null,2);
if(config.token && json.includes(config.token)) throw Error('Credential found in snapshot');
await writeFile(new URL('snapshot.json',import.meta.url),json);
console.log(JSON.stringify({issues:snapshot.overview.issues.length,runs:runs.length,messages:Object.values(snapshot.messages).filter(Boolean).reduce((n,p)=>n+p.messages.length,0),errors:snapshot.errors}));
