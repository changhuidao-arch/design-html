import { useLayoutEffect, useRef } from 'react';

const controllers = new WeakMap();
const active = new WeakMap();
const easing = 'cubic-bezier(.23,1,.32,1)';

function enterSurface(element, state) {
  if (!element || !state || state.input !== 'pointer' || performance.now() - state.at > 700 || state.reduced.matches || !element.animate) return;
  const previous = active.get(element);
  const current = previous?.playState === 'running' ? getComputedStyle(element) : null;
  const from = current ? { opacity:current.opacity, transform:current.transform } : { opacity:.8, transform:'translateY(4px)' };
  previous?.cancel();
  const animation = element.animate([from,{ opacity:1,transform:'none' }],{ duration:180,easing });
  active.set(element,animation);
  state.animations.add(animation);
  const finish = () => { state.animations.delete(animation);if (active.get(element) === animation) active.delete(element); };
  animation.onfinish = finish;
  animation.oncancel = finish;
}

// Keyboard/reduced-motion changes stop motion immediately. Polling is excluded.
export function useMotionController(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const state = { input:'keyboard',at:0,reduced,animations:new Set() };
    const cancel = () => { for (const animation of state.animations) animation.cancel();state.animations.clear(); };
    const pointer = event => { if (event.isPrimary === false) return;state.input='pointer';state.at=performance.now();root.dataset.mmInput='pointer'; };
    const keyboard = () => { state.input='keyboard';root.dataset.mmInput='keyboard';cancel(); };
    const preference = () => { if (reduced.matches) cancel(); };
    const disclosure = event => {
      if (!event.target.matches?.('details[open]')) return;
      for (const child of event.target.children) if (child.tagName !== 'SUMMARY') enterSurface(child,state);
    };
    root.dataset.mmInput='keyboard';controllers.set(root,state);
    root.addEventListener('pointerdown',pointer,true);
    root.addEventListener('keydown',keyboard,true);
    root.addEventListener('toggle',disclosure,true);
    reduced.addEventListener('change',preference);
    return () => {
      cancel();controllers.delete(root);
      root.removeEventListener('pointerdown',pointer,true);
      root.removeEventListener('keydown',keyboard,true);
      root.removeEventListener('toggle',disclosure,true);
      reduced.removeEventListener('change',preference);
    };
  },[rootRef]);
}

// Keys contain intentional UI state, never response objects or polling counters.
export function useSurfaceMotion(elementRef, key, selector) {
  const previous = useRef(key);
  useLayoutEffect(() => {
    if (Object.is(previous.current,key)) return;
    previous.current=key;
    const element = selector ? elementRef.current?.querySelector(selector) : elementRef.current;
    enterSurface(element,controllers.get(element?.closest('.mm-v2')));
  },[elementRef,key,selector]);
}
