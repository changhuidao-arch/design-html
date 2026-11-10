// Lifecycle checks for motion guards, interruption, and passive data refreshes.
import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import vm from 'node:vm';

let cursor=0, clock=100, effects=[];
const hooks=[];
const React={
  useRef(value){const i=cursor++;return hooks[i]??= {current:value};},
  useLayoutEffect(effect,deps){const i=cursor++,old=hooks[i];if (!old||deps.some((v,j)=>!Object.is(v,old.deps[j]))) effects.push(()=>{old?.cleanup?.();hooks[i]={deps,cleanup:effect()};});}
};
const events=new Map(), preferences=new Map(), animations=[];
const media={matches:false,addEventListener:(k,f)=>preferences.set(k,f),removeEventListener:k=>preferences.delete(k)};
const root={dataset:{},addEventListener:(k,f)=>events.set(k,f),removeEventListener:k=>events.delete(k)};
const element={
  closest:()=>root,
  animate(keyframes,options){
    const animation={keyframes,options,playState:'running',cancel(){this.playState='idle';this.oncancel?.();}};
    animations.push(animation);return animation;
  }
};
const source=(await readFile(new URL('./src/polish-motion.mjs',import.meta.url),'utf8'))
  .replace("import { useLayoutEffect, useRef } from 'react';",'const {useLayoutEffect,useRef}=React;')
  .replaceAll('export function','function');
const context=vm.createContext({React,matchMedia:()=>media,performance:{now:()=>clock},getComputedStyle:()=>({opacity:'.91',transform:'matrix(1,0,0,1,0,2)'})});
const api=vm.runInContext(source+'\n({useMotionController,useSurfaceMotion})',context);
const rootRef={current:root},elementRef={current:element};
const render=key=>{cursor=0;effects=[];api.useMotionController(rootRef);api.useSurfaceMotion(elementRef,key);for(const effect of effects)effect();};

render('graph');assert.equal(animations.length,0,'No initial-load animation');
events.get('pointerdown')({isPrimary:true});render('timeline');
assert.equal(animations.length,1);assert.equal(animations[0].options.duration,180);
render('timeline');render('timeline');assert.equal(animations.length,1,'Polling with unchanged UI state must stay still');
clock+=50;render('graph');assert.equal(animations[0].playState,'idle','Rapid selection interrupts the previous animation');
assert.equal(animations[1].keyframes[0].opacity,'.91','Interruption continues from the current rendered value');
events.get('keydown')();assert.equal(animations[1].playState,'idle');
render('timeline');assert.equal(animations.length,2,'Keyboard switching stays immediate');
events.get('pointerdown')({isPrimary:true});media.matches=true;render('graph');assert.equal(animations.length,2,'Reduced motion suppresses entries');
media.matches=false;events.get('pointerdown')({isPrimary:true});render('timeline');assert.equal(animations.length,3);
media.matches=true;preferences.get('change')();assert.equal(animations[2].playState,'idle','Enabling reduced motion cancels motion already running');
media.matches=false;clock+=701;render('graph');assert.equal(animations.length,3,'Delayed passive changes must not animate');
events.get('pointerdown')({isPrimary:true});events.get('toggle')({target:{matches:()=>true,children:[{tagName:'SUMMARY'},{...element,tagName:'DIV'}]}});
assert.equal(animations.length,4,'Disclosure animates its content only');
for(const hook of hooks)hook?.cleanup?.();assert.equal(events.size,0);assert.equal(preferences.size,0);assert.equal(animations[3].playState,'idle');
const result={initialLoadStill:true,pollingStill:true,keyboardImmediate:true,reducedMotionSuppressed:true,preferenceChangeCancels:true,rapidSwitchContinuesFromCurrent:true,latePassiveChangesStill:true,disclosureContentOnly:true,cleanupComplete:true};
await writeFile(new URL('./motion-verification.json',import.meta.url),JSON.stringify(result,null,2));
console.log(JSON.stringify(result));
