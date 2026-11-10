import React from 'react';
import * as ReactDOM from 'react-dom';
import {createRoot} from 'react-dom/client';
import * as jsxRuntime from 'react/jsx-runtime';
import snapshot from './snapshot.json';
// Replay only captured read responses. No request can reach the live service.
window.fetch=async(url,options={})=>{
 if(!String(url).includes('api/multica-monitor')) throw Error('静态副本禁止访问实时接口');
 const {endpoint,payload={}}=JSON.parse(options.body||'{}');
 let value,error;
 const fail=key=>snapshot.errors[key]||'该数据未包含在本次快照中';
 switch(endpoint){
 case 'settings':value=snapshot.settings;break;
 case 'workspaces':value=snapshot.workspaces;break;
 case 'monitor':case 'refreshMonitor':value=snapshot.monitor;break;
 case 'overview':value=snapshot.overview;break;
 case 'alerts':value=snapshot.monitor;break;
 case 'issue':value=snapshot.issues[payload.issueId];error=value?null:fail('issue:'+payload.issueId);break;
 case 'humanActivity':value=snapshot.humanActivity[payload.issueId];error=value?null:fail('humanActivity:'+payload.issueId);break;
 case 'runComments':value=snapshot.runComments[payload.issueId];error=value?null:fail('runComments:'+payload.issueId);break;
 case 'participants':value=snapshot.participants;break;
 case 'triggerCommentTime':{const comment=snapshot.runComments[payload.issueId]?.comments.find(c=>c.id===payload.commentId);value=comment?{status:'found',createdAt:comment.createdAt}:{status:'not_found',createdAt:null};break;}
 case 'messages':{const page=snapshot.messages[payload.taskId];if(!page){error=fail('messages:'+payload.taskId);break;}value={...page,messages:page.messages.filter(m=>m.seq>(payload.since||0))};break;}
 case 'nativeTrace':value={available:false,reason:'本次静态快照未采集本机 CLI 原生记录。',executions:[],records:[],warnings:[]};break;
 default:error='这是静态数据副本；该操作需回到 DSH 插件中完成。';
 }
 return new Response(JSON.stringify(error?{ok:false,error}:{ok:true,value}),{headers:{'content-type':'application/json'}});
};
window.__SNAPSHOT_INFO__={capturedAt:snapshot.capturedAt,issues:snapshot.overview.issues.length,runs:Object.keys(snapshot.messages).length};
let Panel;
const ctx={effect:fn=>fn(),layout:{panelInfo:{getSnapshot:()=>({activePanelId:'multica-monitor'}),subscribe:()=>()=>{}},selectPanel:()=>{}},slots:{inject:(name,fn)=>fn(),register:(options,component)=>{if(options.name==='main')Panel=component;}}};
window.__ModuleLoader__={load:({factory})=>{const plugin=factory(name=>({'react':React,'react-dom':ReactDOM,'react/jsx-runtime':jsxRuntime}[name]));plugin.apply(ctx);createRoot(document.getElementById('root')).render(<Panel/>);}};
// Original components; the bundle changes only the remote widget URL to a local asset.
const script=document.createElement('script');script.src='./plugin.js';document.head.append(script);
// Restore a task link through the original controls, without modifying components.
const params=new URLSearchParams(location.search);
const initialTask=params.get('task');
let restored=!initialTask;
const observer=new MutationObserver(()=>{
 if(!restored){const button=[...document.querySelectorAll('.mm-business-open')].find(b=>b.querySelector('.mm-muted')?.textContent.split(' · ')[0]===initialTask);if(button){restored=true;button.click();}}
});observer.observe(document.getElementById('root'),{childList:true,subtree:true});
document.addEventListener('click',event=>{const button=event.target.closest('.mm-business-open');if(button){const task=button.querySelector('.mm-muted')?.textContent.split(' · ')[0];history.replaceState(null,'','?task='+encodeURIComponent(task));}if(event.target.closest('.mm-task-back'))history.replaceState(null,'',location.pathname);});
