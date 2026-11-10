import React from 'react';
import {agentPortrait,eventIconKind} from './ui-icon-map.mjs';
const shapes={
 task:<><path d="M9 5H6a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3"/><rect x="9" y="2" width="6" height="5" rx="1.5"/><path d="m8 12 1 1 2-2m-3 7 1 1 2-2m3-5h3m-3 6h3"/></>,
 thinking:<><path d="M12 5a3 3 0 0 0-5-2 4 4 0 0 0-4 5 4 4 0 0 0 0 7 4 4 0 0 0 4 5 3 3 0 0 0 5-2V5Zm0 0a3 3 0 0 1 5-2 4 4 0 0 1 4 5 4 4 0 0 1 0 7 4 4 0 0 1-4 5 3 3 0 0 1-5-2"/><path d="M7 7c2 0 3 1 3 3m-5 3c3 0 4 1 4 3m8-9c-2 0-3 1-3 3m5 3c-3 0-4 1-4 3"/></>,
 text:<><path d="M20 15a3 3 0 0 1-3 3H9l-5 3V6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v9Z"/><path d="M8 8h8M8 12h5"/></>,
 tool:<><path d="m14 6 4 4m-7 1-7 7a2.1 2.1 0 0 0 3 3l7-7a6 6 0 0 0 7-8l-4 4-3-3 4-4a6 6 0 0 0-7 8Z"/></>,
 result:<><rect x="4" y="4" width="16" height="16" rx="4"/><path d="m8 12 3 3 5-6"/></>,
 error:<><path d="m10.3 3.5-8 14A2 2 0 0 0 4 20h16a2 2 0 0 0 1.7-2.5l-8-14a2 2 0 0 0-3.4 0Z"/><path d="M12 8v5m0 3h.01"/></>,
 gap:<><circle cx="12" cy="12" r="9"/><path d="M10 8v8m4-8v8"/></>,
 wait:<><path d="M6 3h12M6 21h12M7 3v4c0 2 3 3 5 5-2 2-5 3-5 5v4m10-18v4c0 2-3 3-5 5 2 2 5 3 5 5v4"/></>,
 run:<><circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4V8Z"/></>,
 system:<><rect x="3" y="4" width="18" height="16" rx="3"/><path d="m7 9 3 3-3 3m6 0h4"/></>,
 activity:<><path d="M3 18h18M4 14l4-5 4 3 6-8 3 2"/></>,
 monitor:<><rect x="2.5" y="3.5" width="19" height="14" rx="2.5"/><path d="M6 11h3l2-3 2 5 2-2h3m-6 7v3m-4 0h8"/></>,
 history:<path d="M3 11a9 9 0 1 1 2.6 7.4M3 6v5h5m4-4v5l3 2"/>,
};
export function TypeIcon({type='system',isError=false,size=16,className=''}){
 const kind=eventIconKind(type,isError);
 return <svg className={`ui-type-icon icon-${kind} ${className}`} data-icon={kind} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{shapes[kind]}</svg>;
}
export function AgentAvatar({name,size=22}){
 return <span className="ui-agent-avatar" data-agent={name||''} title={name?`智能体：${name}`:'智能体'} style={{'--avatar-size':`${size}px`}} aria-hidden="true">{agentPortrait(name)}</span>;
}
