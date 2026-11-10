export function initWorkspaceShell(){
 const side=document.querySelector('.side,.run-sidebar');if(!side||side.querySelector('.sidebar-toggle'))return;
 side.id='workspace-sidebar';side.setAttribute('aria-label','工作区导航');
 let compact=false;try{compact=localStorage.getItem('new-sidebar-compact')==='true';}catch{}
 document.body.classList.toggle('sidebar-compact',compact);
 const mobile=matchMedia('(max-width:700px)');
 const toggle=document.createElement('button');toggle.className='sidebar-toggle';toggle.type='button';toggle.setAttribute('aria-controls',side.id);toggle.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/></svg>';side.append(toggle);
 const backdrop=document.createElement('button');backdrop.className='menu-backdrop';backdrop.type='button';backdrop.tabIndex=-1;backdrop.setAttribute('aria-label','关闭菜单');backdrop.hidden=true;side.after(backdrop);
 function sync(){const open=document.body.classList.contains('mobile-menu-open');const label=mobile.matches?(open?'关闭菜单':'打开菜单'):(compact?'展开侧栏':'收起侧栏');toggle.setAttribute('aria-label',label);toggle.title=label;toggle.setAttribute('aria-expanded',String(mobile.matches?open:!compact));backdrop.hidden=!(mobile.matches&&open);}
 function close(){document.body.classList.remove('mobile-menu-open');sync();}
 toggle.onclick=()=>{if(mobile.matches)document.body.classList.toggle('mobile-menu-open');else{compact=!compact;document.body.classList.toggle('sidebar-compact',compact);try{localStorage.setItem('new-sidebar-compact',String(compact));}catch{}}sync();};
 backdrop.onclick=()=>{close();toggle.focus();};
 side.addEventListener('click',event=>{
 const settings=event.target.closest('.connection-link');
 if(settings&&!location.pathname.endsWith('/settings.html')){
  const here=location.pathname.split('/').pop()+location.search+location.hash;
  settings.href='./settings.html?return='+encodeURIComponent(here);
  try{sessionStorage.setItem('workspace-return-position',JSON.stringify({href:here,y:scrollY,flow:document.querySelector('#flow-scroll')?.scrollTop||0,timeline:document.querySelector('#timeline-scroll')?.scrollTop||0}));}catch{}
 }
 if(event.target.closest('a')&&mobile.matches)close();
 });
 let saved;try{saved=JSON.parse(sessionStorage.getItem('workspace-return-position'));}catch{}
 const here=location.pathname.split('/').pop()+location.search+location.hash;
 if(saved?.href===here){
  const restore=()=>{const ready=document.querySelector('#main .filters,#main .detail-grid,#main .graph-grid,#main .alert-clear,#main .metric-strip,#main .runtime-strip,#process-workspace:not([hidden]),#workspace:not([hidden])');if(!ready)return;observer.disconnect();requestAnimationFrame(()=>{window.scrollTo(0,saved.y);const flow=document.querySelector('#flow-scroll'),timeline=document.querySelector('#timeline-scroll');if(flow)flow.scrollTop=saved.flow;if(timeline)timeline.scrollTop=saved.timeline;});try{sessionStorage.removeItem('workspace-return-position');}catch{}};
  const observer=new MutationObserver(restore);observer.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden']});restore();setTimeout(()=>observer.disconnect(),10000);
 }

 document.addEventListener('keydown',event=>{if(!mobile.matches||!document.body.classList.contains('mobile-menu-open'))return;if(event.key==='Escape'){event.preventDefault();close();toggle.focus();}if(event.key==='Tab'){const items=[...side.querySelectorAll('a,button,select')].filter(el=>el.getClientRects().length&&!el.disabled);const first=items[0],last=items.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}}});
 mobile.addEventListener('change',()=>{close();});sync();
}
