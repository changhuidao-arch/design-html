import {sidebar} from './workspace-nav.js';
import {initWorkspaceShell} from './workspace-shell.js';
import {escapeHTML as e} from './payload-parser.js';
const $=s=>document.querySelector(s),main=$('#settings-main'),draftKey='multica-connection-draft-v1';
$('.side').innerHTML=sidebar('settings');initWorkspaceShell();
try{document.body.dataset.theme=localStorage.getItem('new-theme')||'cream';}catch{}
const returnValue=new URLSearchParams(location.search).get('return')||'new.html#tasks';
let returnURL='./new.html#tasks';try{const url=new URL(returnValue,location.href);if(url.origin===location.origin&&/\/(new|waterfall|process)\.html$/.test(url.pathname))returnURL=url.pathname+url.search+url.hash;}catch{}
let dirty=false,snapshot,storedAt='';
const thresholdNames=[['noProgressMinutes','无进展'],['toolMinutes','工具等待'],['queueMinutes','排队'],['runMinutes','运行总耗时']];
const keys=['baseUrl','webUrl','monitorEnabled','aiDiagnosis',...thresholdNames.map(x=>x[0])];
function status(text,error=false){$('#settings-status').textContent=text;$('#settings-status').dataset.error=String(error);}
function confirmAction(title,description,accept){const dialog=$('#settings-confirm'),focus=document.activeElement;$('#confirm-title').textContent=title;$('#confirm-description').textContent=description;$('#confirm-accept').textContent=accept;dialog.returnValue='';dialog.showModal();$('#confirm-cancel').focus();return new Promise(resolve=>{dialog.addEventListener('close',()=>{focus?.focus();resolve(dialog.returnValue==='accept');},{once:true});});}
$('#confirm-cancel').onclick=()=>$('#settings-confirm').close('cancel');$('#confirm-accept').onclick=()=>$('#settings-confirm').close('accept');
function readDraft(){try{const saved=JSON.parse(localStorage.getItem(draftKey));if(saved?.values&&keys.every(k=>k in saved.values))return saved;}catch{}return null;}
function populate(values){const form=$('#connection-form');for(const key of keys){const el=form.elements[key];if(el.type==='checkbox')el.checked=Boolean(values[key]);else el.value=values[key]??'';}form.elements.token.value='';form.elements.token.type='password';$('#toggle-token').textContent='显示';$('#clear-token').disabled=true;sync();dirty=false;}
function sync(){const form=$('#connection-form');form.elements.aiDiagnosis.disabled=!form.elements.monitorEnabled.checked;$('#draft-state').textContent=dirty?'有未保存改动':storedAt?'已保存本地草稿':'使用快照配置';}
async function load(){try{
 const [configResponse,dataResponse]=await Promise.all([fetch('./connection-data.json'),fetch('./new-data.json')]);if(!configResponse.ok||!dataResponse.ok)throw new Error();snapshot=await configResponse.json();const data=await dataResponse.json();$('#run-workspace-name').textContent=data.workspace;
 const draft=readDraft();storedAt=draft?.savedAt||'';
 main.innerHTML=`<div class="settings-heading"><div><h2>连接 Multica</h2><p>连接地址、监控选项与异常阈值</p></div><a class="button settings-return" href="${e(returnURL)}">← 返回原页面</a></div>
 <div class="settings-notice">当前为本地快照回放。这里保存的是本机浏览器中的配置草稿，不会连接服务或启动监控。</div>
 <div class="settings-layout"><form id="connection-form" class="panel settings-form"><h3>服务连接</h3><div class="connection-fields">
 <label>API 地址<input name="baseUrl" type="url" required spellcheck="false" autocomplete="off"><span class="settings-help">用于读取工作区、任务和运行记录。</span></label>
 <label>网页地址<input name="webUrl" type="url" required spellcheck="false" autocomplete="off"><span class="settings-help">Multica 网页入口，可与 API 使用不同端口。</span></label>
 <label>个人访问令牌<span class="token-field"><input name="token" type="password" autocomplete="new-password" placeholder="${snapshot.hasToken?'快照记录为已配置，未包含令牌原文':'输入个人访问令牌'}"><button id="toggle-token" type="button">显示</button><button id="clear-token" type="button" disabled>清空</button></span><span class="settings-help">令牌仅在当前表单中暂存；保存草稿时清空，不会写入浏览器存储或发送到网络。</span></label></div>
 <section class="settings-section"><h3>监控选项</h3><label class="settings-check"><input name="monitorEnabled" type="checkbox">持续监控</label><label class="settings-check"><input name="aiDiagnosis" type="checkbox">异常发生时自动 AI 诊断</label><p class="settings-help">以上为拟使用的配置。当前回放不会启动采集或调用 AI。</p></section>
 <details class="settings-section thresholds" open><summary>异常阈值</summary><div class="threshold-grid">${thresholdNames.map(([key,label])=>`<label>${label} · 分钟<input name="${key}" type="number" min="1" max="1440" step="1" required></label>`).join('')}</div></details>
 <div class="settings-actions"><button type="submit" class="settings-primary">保存配置草稿</button><button type="button" id="restore-snapshot">恢复快照配置</button></div><p id="settings-status" role="status" aria-live="polite"></p></form>
 <aside class="panel settings-summary"><h3>当前数据来源</h3><span class="summary-state">本地静态回放</span><dl><div><dt>工作区</dt><dd>${e(data.workspace)}</dd></div><div><dt>快照采集时间</dt><dd>2026-11-05 08:33</dd></div><div><dt>数据范围</dt><dd>10 个任务 · 22 次运行</dd></div><div><dt>配置状态</dt><dd id="draft-state"></dd></div></dl><p>修改配置草稿不会切换当前数据源；任务页面继续使用这份真实快照。</p></aside></div>`;
 populate(draft?.values||snapshot);
 const form=$('#connection-form');form.addEventListener('input',event=>{dirty=true;event.target.setCustomValidity?.('');$('#clear-token').disabled=!form.elements.token.value;sync();});form.addEventListener('change',()=>{dirty=true;sync();});
 $('#toggle-token').onclick=()=>{const token=form.elements.token;token.type=token.type==='password'?'text':'password';$('#toggle-token').textContent=token.type==='password'?'显示':'隐藏';};
 $('#clear-token').onclick=()=>{form.elements.token.value='';form.elements.token.type='password';$('#toggle-token').textContent='显示';$('#clear-token').disabled=true;dirty=true;sync();form.elements.token.focus();};
 form.onsubmit=event=>{event.preventDefault();for(const name of ['baseUrl','webUrl']){const el=form.elements[name];let valid=false;try{const url=new URL(el.value);valid=['http:','https:'].includes(url.protocol)&&!url.username&&!url.password;}catch{}if(!valid){el.setCustomValidity('请输入不含用户名或密码的 HTTP / HTTPS 地址');el.reportValidity();return;}}if(!form.reportValidity())return;
 const values={};for(const key of keys){const el=form.elements[key];values[key]=el.type==='checkbox'?el.checked:el.type==='number'?Number(el.value):el.value.trim().replace(/\/+$/,'');}if(!values.monitorEnabled)values.aiDiagnosis=false;
 try{storedAt=new Date().toISOString();localStorage.setItem(draftKey,JSON.stringify({values,savedAt:storedAt}));populate(values);status('配置草稿已保存在本机浏览器。当前仍为快照回放，未发起连接。');}catch{storedAt='';status('保存失败：浏览器存储不可用，改动仍保留在表单中。',true);}};
 $('#restore-snapshot').onclick=async()=>{if(!await confirmAction('恢复快照配置？','将移除本地配置草稿，并恢复采集时的地址、监控选项和阈值。','恢复配置'))return;try{localStorage.removeItem(draftKey);storedAt='';populate(snapshot);status('已恢复快照配置。');}catch{status('无法移除本地草稿，请检查浏览器存储。',true);}};
 }catch{main.innerHTML='<section class="panel"><h2>连接配置读取失败</h2><p>请确认本地服务仍在运行。</p><button id="retry-settings">重新读取</button></section>';$('#retry-settings').onclick=load;}}
let navigating=false;
document.addEventListener('click',async event=>{const anchor=event.target.closest('a');if(!anchor||anchor.target==='_blank'||event.ctrlKey||event.metaKey)return;if(anchor.classList.contains('connection-link')){event.preventDefault();return;}if(!dirty)return;event.preventDefault();if(navigating)return;navigating=true;const leave=await confirmAction('尚有未保存的改动','离开将丢弃当前表单改动；已经保存的本地草稿不受影响。','放弃改动并离开');navigating=false;if(leave){dirty=false;location.href=anchor.href;}});
window.addEventListener('beforeunload',event=>{if(dirty){event.preventDefault();event.returnValue='';}});
load();
