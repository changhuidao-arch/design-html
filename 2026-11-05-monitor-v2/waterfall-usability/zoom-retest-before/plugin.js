window.__ModuleLoader__.load({id:'dsh-multica-monitor-v2',factory:(require)=>{var module={exports:{}};var exports=module.exports;
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client.jsx
var client_exports = {};
__export(client_exports, {
  Monitor: () => Monitor,
  apply: () => apply,
  defaultTaskView: () => defaultTaskView,
  inject: () => inject,
  normalizeTheme: () => normalizeTheme,
  selectAvailableRun: () => selectAvailableRun
});
module.exports = __toCommonJS(client_exports);

// src/ui-icons.css
var ui_icons_default = ".mm-v2 .ui-type-icon{display:inline-block;vertical-align:middle;flex-shrink:0;color:#758aa4;overflow:visible}.mm-v2 .icon-task{color:#6195ca}.mm-v2 .icon-thinking{color:#3f9c95}.mm-v2 .icon-text{color:#5c8ac1}.mm-v2 .icon-tool{color:#bf9064}.mm-v2 .icon-result{color:#629c7f}.mm-v2 .icon-error{color:#c17872}.mm-v2 .icon-gap,.mm-v2 .icon-wait{color:#b29b75}.mm-v2 .ui-agent-avatar{--avatar-size:22px;display:inline-flex;align-items:center;justify-content:center;flex:0 0 auto;vertical-align:middle;width:calc(var(--avatar-size) + 6px);height:calc(var(--avatar-size) + 6px);font-size:var(--avatar-size);line-height:1;font-family:'Segoe UI Emoji','Apple Color Emoji','Noto Color Emoji',sans-serif;font-weight:400;font-style:normal}.mm-v2 .v2-task-name .v2-task-title-line{display:flex;align-items:center;gap:9px;max-width:100%;min-width:0}.mm-v2 .v2-task-title-line strong{min-width:0}.mm-v2 .v2-view-label,.mm-v2 .v2-page-heading h2{display:flex;align-items:center;gap:8px}.mm-v2 .v2-agent{display:flex;align-items:center;gap:5px}.mm.mm-v2 .v2-nav button::before{display:none}.mm-v2 .v2-nav .ui-type-icon{margin-right:2px}.mm-v2 .mm-call-node-name{display:flex;align-items:center;gap:6px;min-width:0}.mm-v2 .mm-call-node-name .ui-agent-avatar{width:23px;height:23px}.mm-v2 .mm-call-node-name .ui-agent-name{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mm-v2 .mm-run-action-strip>span{display:inline-flex;align-items:center;gap:6px}.mm-v2 .mm-exec-summary>strong{display:flex;align-items:center;gap:6px;flex-wrap:wrap}.mm-v2 .mm-chat-status-line>strong{display:inline-flex;align-items:center;gap:5px}.mm-v2 .mm-chat-avatar{display:inline-flex;align-items:center;justify-content:center;background:#f2f6fa;color:#778da8}.mm-v2 .mm-chat-avatar:has(.ui-agent-avatar){background:none}.mm-v2 .mm-chat-avatar .ui-agent-avatar{width:30px;height:30px}.mm-v2 .mm-chat-avatar.is-tool{background:#fbf6f0}.mm-v2 .mm-chat-avatar.is-thinking{background:#eff8f5}.mm-v2 .mm-chat-event.is-error .mm-chat-avatar{background:#fff3f1}.mm-v2 .mm-exec-record-body>strong{display:flex;align-items:center;gap:7px}.mm-v2 .mm-exec-record-body>strong .ui-type-icon{width:15px;height:15px}.mm-v2 .mm-exec-title h3,.mm-v2 .mm-wf-detail .mm-wf-heading h3{display:flex;align-items:center;gap:7px}.mm-v2 .mm-wf-total-items>span>.ui-type-icon{width:15px;height:15px;margin-right:2px}.mm-v2 .mm-wf-ranking li>button>.ui-type-icon{width:15px;height:15px}.mm-v2 .mm-message-head>span{display:inline-flex;align-items:center;gap:7px}.mm-v2 .mm-monitor-agent-name>strong{display:flex;align-items:center;gap:6px}.mm-v2 .mm-monitor-agent-name .ui-agent-avatar{width:23px;height:23px}\r\n\r\n.mm-v2 .mm-chat-chip{display:inline-flex;align-items:center;gap:4px}.mm-v2 .mm-chat-payload>div>strong,.mm-v2 .mm-chat-message>header>strong,.mm-v2 .ui-agent-label{display:inline-flex;align-items:center;gap:6px}.mm-v2 .mm-agent-group>h3{display:flex;align-items:center;gap:7px}.mm-v2 .ui-agent-label{line-height:1.5}\r\n\r\n.mm-v2 .mm-waterfall .icon-thinking{color:var(--wf-thinking)}.mm-v2 .mm-waterfall .icon-text{color:var(--wf-text)}.mm-v2 .mm-waterfall .icon-tool{color:var(--wf-tool)}.mm-v2 .mm-waterfall .icon-gap{color:var(--wf-gap)}.mm-v2 .mm-wf-ranking li button{grid-template-columns:18px 18px minmax(0,1fr) auto;gap:6px 9px}\r\n";

// src/polish.css
var polish_default = "/* Readability and interaction polish; existing layout and data stay intact. */\n.mm.mm-v2 {\n  --mm-text:#202a38;--mm-muted:#566579;--mm-secondary:#566579;--mm-label:#566579;\n  --mm-control-border:#8593a5;--mm-border-strong:#8593a5;\n  --mm-good-text:#11694f;--mm-wait-text:#805515;--mm-history-text:#805515;\n  --mm-attention:#805515;--mm-edge-line:#627a99;--mm-scroll:#8e9bad;\n  --polish-caption:#5b6b80;--polish-ease:cubic-bezier(.23,1,.32,1);\n}\n.mm-v2 :is(.v2-brand-sub,.v2-workspace>span,.v2-nav-label,.v2-side-bottom,\n  .v2-side-bottom small,.v2-breadcrumb,.v2-snapshot-label,.mm-connection-details,\n  .mm-footer,.v2-page-heading p,.v2-page-heading>span,.v2-kpis span,.v2-kpis small,\n  .v2-muted,.v2-table-foot,.mm-task-workspace-heading label,.mm-task-facts,\n  .mm-run-picker,.mm-exec-note,.v2-section-title span,.v2-scroll-hint) { color:var(--polish-caption); }\n.mm.mm-v2 .mm-muted { color:var(--mm-muted); }\n.mm-v2 .v2-task-name .mm-muted { color:var(--polish-caption);font-size:11px; }\n.mm-v2 .v2-kpis small { font-size:11px; }\n.mm-v2 th { color:#536278;background:#f3f5f8;font-weight:600;border-bottom-color:#d6dde7; }\n.mm-v2 td { border-bottom-color:#e3e8ef; }\n.mm.mm-v2 :is(input:not([type=checkbox]):not([type=range]),select) { border-color:var(--mm-control-border);background-color:#fff; }\n.mm-v2 input::placeholder { color:#5b6b80;opacity:1; }\n.mm-v2 .v2-nav button { color:#4d5f77; }\n.mm-v2 .v2-nav button[aria-current] { color:#1c4481;border-color:#a6bde0;background:#eaf1fc;box-shadow:none;font-weight:600; }\n.mm.mm-v2 .v2-open-task { color:#245fb5;font-weight:500; }\n.mm-v2 .mm-task-back { color:#245fb5; }\n.mm-v2 .v2-status { color:#536075; }\n.mm-v2 .state-in_review { color:#785512; }\n.mm-v2 .state-in_progress { color:#235c9c; }\n.mm-v2 .state-done { color:#11694f; }\n.mm-v2 .v2-health.history { color:#805515; }\n.mm-v2 .mm-exec-source { color:#4b607d; }\n.mm-v2 .mm-run-surface { min-width:0; }\n.mm-v2 .mm-wf-workspace { display:grid;grid-template-columns:minmax(0,1fr);gap:16px;align-items:start;min-width:0; }\n.mm-v2 .mm-wf-detail { scroll-margin-top:90px;max-height:560px;display:flex;flex-direction:column;min-height:0; }\n.mm-v2 .mm-wf-detail-body { min-height:0;overflow:auto;overscroll-behavior:contain;padding-right:4px;scrollbar-width:thin; }\n.mm-v2 .mm-wf-detail>.mm-wf-heading { flex-shrink:0; }\n.mm-v2 .mm-wf-ranking-disclosure { border:1px solid var(--mm-line);border-radius:6px;background:#fff; }\n.mm-v2 .mm-wf-ranking-disclosure>summary { cursor:pointer;padding:12px;font-size:12px;color:var(--mm-muted); }\n.mm-v2 .mm-wf-ranking-disclosure .mm-wf-ranking { border:0;margin:0; }\n.mm-v2 .mm-wf-usage { font-size:12px;color:var(--mm-muted); }\n.mm-v2 .mm-wf-search { display:grid;gap:5px;font-size:12px;color:var(--mm-muted); }\n@container (min-width:900px) { .mm-v2 .mm-wf-workspace.has-selection { grid-template-columns:minmax(0,1fr) minmax(300px,34%); } }\n.mm-v2 .mm-view-switcher button { color:#52647c; }\n.mm-v2 :is(.mm-view-switcher button[aria-current],.mm-evidence-switch button[aria-pressed=true]) { color:#1e55a4;border-color:#91add8;box-shadow:inset 0 -2px 0 #2463d1; }\n.mm.mm-v2 button.mm-call-node { border-color:#a5b3c5; }\n.mm-v2 .mm-call-node-kicker { color:#5b6b80;font-size:10px; }\n.mm-v2 :is(.mm-call-node-identity,.mm-call-node-foot) { color:#52647c; }\n.mm-v2 .mm-call-node-status { color:#11694f; }\n.mm-v2 .status-failed .mm-call-node-status { color:#a53030; }\n.mm-v2 .status-waiting .mm-call-node-status { color:#805515; }\n.mm.mm-v2 button.mm-call-node.is-selected { border-color:#2463d1!important;box-shadow:0 0 0 3px #2463d11a; }\n.mm-v2 .mm-call-edge { stroke:#627a99; }\n.mm-v2 .mm-call-edge.rerun { stroke:#92703c; }\n.mm-v2 .v2-graph-group { border-color:#cbd6e3; }\n.mm-v2 .v2-graph-group>span { color:#4e617b; }\n.mm-v2 .v2-graph-group small { color:#5b6b80; }\n.mm-v2 .v2-edge-label { fill:#536781; }\n.mm-v2 .mm-monitor-span.is-execution { background:#527fba; }\n.mm-v2 .ui-type-icon { color:#526b8c; }\n.mm-v2 :is(.icon-task,.icon-text) { color:#3774b6; }\n.mm-v2 .icon-thinking { color:#217b75; }\n.mm-v2 .icon-tool { color:#956033; }\n.mm-v2 .icon-result { color:#287550; }\n.mm-v2 .icon-error { color:#ad4842; }\n.mm-v2 :is(.icon-gap,.icon-wait) { color:#8b6938; }\n.mm-v2 .mm-waterfall { --wf-thinking:#247e79;--wf-text:#37834f;--wf-tool:#b9612b;--wf-gap:#ac4e85;--wf-run:#8d7018; }\n.mm-v2 :is(button,a,input,select,summary):focus-visible { outline:2px solid #245fb5;outline-offset:3px; }\n.mm-v2 button:disabled { opacity:.5; }\n\n/* Only compositor properties move. Selection colors and focus update immediately. */\n.mm-v2 :is(.v2-nav button,.mm-header button,.mm-evidence-switch button,\n  .mm-view-switcher button,.v2-open-task,.mm-call-zoom button,.mm-chat-toolbar button) {\n  transition:transform 120ms var(--polish-ease);\n}\n.mm-v2[data-mm-input=pointer] :is(.v2-nav button,.mm-header button,\n  .mm-evidence-switch button,.mm-view-switcher button,.v2-open-task,\n  .mm-call-zoom button,.mm-chat-toolbar button):active:not(:disabled) { transform:translateY(1px); }\n.mm-v2 .mm-chat-tool-heading:before { transition:transform 160ms var(--polish-ease); }\n@media (hover:hover) and (pointer:fine) {\n  .mm-v2 .v2-open-task:hover { text-decoration:underline;text-underline-offset:3px; }\n  .mm-v2 :is(input,select):hover:not(:disabled) { border-color:#617794; }\n}\n@media (prefers-reduced-motion:reduce) {\n  .mm-v2 *, .mm-v2 *::before, .mm-v2 *::after { transition:none!important;animation:none!important;scroll-behavior:auto!important; }\n  .mm-v2[data-mm-input=pointer] button:active { transform:none; }\n}\n.mm-v2[data-mm-input=keyboard] *, .mm-v2[data-mm-input=keyboard] *::before { transition:none!important; }\n";

// src/polish-motion.mjs
var import_react = require("react");
var controllers = /* @__PURE__ */ new WeakMap();
var active = /* @__PURE__ */ new WeakMap();
var easing = "cubic-bezier(.23,1,.32,1)";
function enterSurface(element, state) {
  if (!element || !state || state.input !== "pointer" || performance.now() - state.at > 700 || state.reduced.matches || !element.animate) return;
  const previous = active.get(element);
  const current = previous?.playState === "running" ? getComputedStyle(element) : null;
  const from = current ? { opacity: current.opacity, transform: current.transform } : { opacity: 0.8, transform: "translateY(4px)" };
  previous?.cancel();
  const animation = element.animate([from, { opacity: 1, transform: "none" }], { duration: 180, easing });
  active.set(element, animation);
  state.animations.add(animation);
  const finish = () => {
    state.animations.delete(animation);
    if (active.get(element) === animation) active.delete(element);
  };
  animation.onfinish = finish;
  animation.oncancel = finish;
}
function useMotionController(rootRef) {
  (0, import_react.useLayoutEffect)(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const state = { input: "keyboard", at: 0, reduced, animations: /* @__PURE__ */ new Set() };
    const cancel = () => {
      for (const animation of state.animations) animation.cancel();
      state.animations.clear();
    };
    const pointer = (event) => {
      if (event.isPrimary === false) return;
      state.input = "pointer";
      state.at = performance.now();
      root.dataset.mmInput = "pointer";
    };
    const keyboard = () => {
      state.input = "keyboard";
      root.dataset.mmInput = "keyboard";
      cancel();
    };
    const preference = () => {
      if (reduced.matches) cancel();
    };
    const disclosure = (event) => {
      if (!event.target.matches?.("details[open]")) return;
      for (const child of event.target.children) if (child.tagName !== "SUMMARY") enterSurface(child, state);
    };
    root.dataset.mmInput = "keyboard";
    controllers.set(root, state);
    root.addEventListener("pointerdown", pointer, true);
    root.addEventListener("keydown", keyboard, true);
    root.addEventListener("toggle", disclosure, true);
    reduced.addEventListener("change", preference);
    return () => {
      cancel();
      controllers.delete(root);
      root.removeEventListener("pointerdown", pointer, true);
      root.removeEventListener("keydown", keyboard, true);
      root.removeEventListener("toggle", disclosure, true);
      reduced.removeEventListener("change", preference);
    };
  }, [rootRef]);
}
function useSurfaceMotion(elementRef, key, selector) {
  const previous = (0, import_react.useRef)(key);
  (0, import_react.useLayoutEffect)(() => {
    if (Object.is(previous.current, key)) return;
    previous.current = key;
    const element = selector ? elementRef.current?.querySelector(selector) : elementRef.current;
    enterSurface(element, controllers.get(element?.closest(".mm-v2")));
  }, [elementRef, key, selector]);
}

// src/ui-icons.jsx
var import_react2 = __toESM(require("react"), 1);

// src/ui-icon-map.mjs
var agentPortraits = {
  "\u9879\u76EE\u7ECF\u7406": "\u{1F31E}",
  "\u9700\u6C42\u6587\u6863\u62C6\u89E3\u5206\u6790\u5E08": "\u{1F98A}",
  "\u9700\u6C42\u8BC4\u5BA1\u5458": "\u{1F419}",
  "Mika": "\u{1F984}",
  "\u5DE5\u4F5C\u533A\u5C0F\u52A9\u624B": "\u{1F916}",
  "\u4EE3\u7801\u5BA1\u67E5\u5458": "\u{1F435}",
  "\u6280\u672F\u65B9\u6848\u8BBE\u8BA1\u8BC4\u5BA1\u5458": "\u{1F42F}",
  "\u6280\u672F\u65B9\u6848\u8BBE\u8BA1\u5E08": "\u{1F9E0}",
  "\u5F00\u53D1\u5DE5\u7A0B\u5E08": "\u{1F43C}",
  "\u7F3A\u9677\u89E3\u51B3\u65B9\u6848\u8BBE\u8BA1\u5E08": "\u{1F989}",
  "Jenkins Build Agent": "\u2B50"
};
var agentPortrait = (name) => agentPortraits[String(name || "").trim()] || "\u{1F916}";
function eventIconKind(type, isError = false) {
  if (isError) return "error";
  return { thinking: "thinking", text: "text", tool_use: "tool", tool: "tool", tool_result: "result", result: "result", error: "error", gap: "gap", wait: "wait", waiting: "wait", run: "run", task: "task", system: "system", other: "system", activity: "activity" }[type] || "system";
}

// src/ui-icons.jsx
var import_jsx_runtime = require("react/jsx-runtime");
var shapes = {
  task: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9 5H6a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "9", y: "2", width: "6", height: "5", rx: "1.5" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m8 12 1 1 2-2m-3 7 1 1 2-2m3-5h3m-3 6h3" })
  ] }),
  thinking: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 5a3 3 0 0 0-5-2 4 4 0 0 0-4 5 4 4 0 0 0 0 7 4 4 0 0 0 4 5 3 3 0 0 0 5-2V5Zm0 0a3 3 0 0 1 5-2 4 4 0 0 1 4 5 4 4 0 0 1 0 7 4 4 0 0 1-4 5 3 3 0 0 1-5-2" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M7 7c2 0 3 1 3 3m-5 3c3 0 4 1 4 3m8-9c-2 0-3 1-3 3m5 3c-3 0-4 1-4 3" })
  ] }),
  text: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20 15a3 3 0 0 1-3 3H9l-5 3V6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v9Z" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8 8h8M8 12h5" })
  ] }),
  tool: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m14 6 4 4m-7 1-7 7a2.1 2.1 0 0 0 3 3l7-7a6 6 0 0 0 7-8l-4 4-3-3 4-4a6 6 0 0 0-7 8Z" }) }),
  result: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "4", y: "4", width: "16", height: "16", rx: "4" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m8 12 3 3 5-6" })
  ] }),
  error: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m10.3 3.5-8 14A2 2 0 0 0 4 20h16a2 2 0 0 0 1.7-2.5l-8-14a2 2 0 0 0-3.4 0Z" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 8v5m0 3h.01" })
  ] }),
  gap: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "12", r: "9" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M10 8v8m4-8v8" })
  ] }),
  wait: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6 3h12M6 21h12M7 3v4c0 2 3 3 5 5-2 2-5 3-5 5v4m10-18v4c0 2-3 3-5 5 2 2 5 3 5 5v4" }) }),
  run: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "12", r: "9" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m10 8 6 4-6 4V8Z" })
  ] }),
  system: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "3", y: "4", width: "18", height: "16", rx: "3" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m7 9 3 3-3 3m6 0h4" })
  ] }),
  activity: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 18h18M4 14l4-5 4 3 6-8 3 2" }) })
};
function TypeIcon({ type = "system", isError = false, size = 16, className = "" }) {
  const kind = eventIconKind(type, isError);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { className: `ui-type-icon icon-${kind} ${className}`, "data-icon": kind, width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", focusable: "false", children: shapes[kind] });
}
function AgentAvatar({ name, size = 22 }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ui-agent-avatar", "data-agent": name || "", title: name ? `\u667A\u80FD\u4F53\uFF1A${name}` : "\u667A\u80FD\u4F53", style: { "--avatar-size": `${size}px` }, "aria-hidden": "true", children: agentPortrait(name) });
}

// src/redesign.css
var redesign_default = "/* The new design is scoped to the independent v2 shell. */\r\n.mm.mm-v2{--mm-bg:#fff;--mm-text:#202a38;--mm-muted:#667487;--mm-line:#e3e7ed;--mm-hover:#f2f5f9;--mm-accent:#2463d1;--mm-input:#fff;--mm-control-border:#dce2e9;--mm-button:#fff;--mm-button-hover:#f3f6fa;--mm-chrome:#fff;--mm-header-button:#fff;--mm-border-strong:#d9e0e9;--mm-secondary:#667487;--mm-selected:#2463d1;--mm-selected-line:#2463d1;--mm-surface:#fff;--mm-surface-border:#e3e7ed;--mm-label:#667487;--mm-divider:#e3e7ed;--mm-number:#202a38;--mm-attention:#a56a18;--mm-row:#fff;--mm-row-line:#edf0f4;--mm-row-hover:#f6f8fb;--mm-child:#fff;--mm-activity:#43536b;--mm-link:#2463d1;--mm-history-border:#eadcbe;--mm-history-bg:#fffaf0;--mm-history-text:#936625;--mm-danger-bg:#fff2f2;--mm-danger-text:#b83c3c;--mm-danger-border:#f0cccc;--mm-badge-bg:#f4f6f9;--mm-badge-text:#536177;--mm-badge-border:#e1e6ee;--mm-good-bg:#eef8f4;--mm-good-text:#147e61;--mm-good-border:#cee9de;--mm-wait-bg:#fff9eb;--mm-wait-text:#99691e;--mm-wait-border:#eddfbb;--mm-canvas:#f5f7fa;--mm-canvas-border:#e0e6ee;--mm-scroll:#bac3cf;--mm-scroll-track:#f6f7f9;--mm-edge-bg:#fff;--mm-edge-line:#96a5b9;--mm-active-bg:#f0f5fd;--mm-active-text:#28518a;--mm-active-border:#d7e3f4;--mm-error:#b83c3c;--mm-primary-bg:#2463d1;--mm-primary-text:#fff;display:grid;grid-template-columns:208px minmax(0,1fr);grid-template-rows:88px minmax(0,1fr) 30px;color-scheme:light;font-family:system-ui,-apple-system,'Segoe UI','Microsoft YaHei',sans-serif;font-size:14px;line-height:1.6;background:#fff}\r\n.mm-v2 h1,.mm-v2 h2,.mm-v2 h3,.mm-v2 h4,.mm-v2 strong{font-weight:600}.mm-v2 button,.mm-v2 input,.mm-v2 select{font-size:13px;border-radius:6px}.mm-v2 button{min-height:34px}.mm-v2 a{color:#2463d1}.mm-v2 .mm-muted{font-size:12px;color:#667487}.mm-v2 .mm-header{grid-column:2;grid-row:1;padding:16px 28px;min-height:0;background:#fff;border-bottom:1px solid #e3e7ed}.mm-v2 .mm-header h1{font-size:20px;line-height:1.5;margin-top:3px}.mm-v2 .mm-header p{margin:0}.mm-v2 .v2-breadcrumb{font-size:12px;color:#7d8897}.mm-v2 .mm-scroll{grid-column:2;grid-row:2;min-height:0;overflow:auto;overscroll-behavior:contain;container-type:inline-size;background:#fcfcfd}.mm-v2 .mm-footer{grid-column:2;grid-row:3;min-height:0;padding:5px 28px;font-size:10px;background:#fff;border-top:1px solid #e3e7ed;color:#7a8795}.mm-v2 .v2-sidebar{grid-column:1;grid-row:1/4;background:#f7f8fa;border-right:1px solid #e3e7ed;display:flex;flex-direction:column;min-height:0;overflow:auto;padding:0 12px;overscroll-behavior:contain}.mm-v2 .v2-brand{display:flex;align-items:center;gap:10px;min-height:88px;padding:16px 8px;text-decoration:none;color:#242f3f;font-size:18px;font-weight:600;line-height:1.35}.mm-v2 .v2-brand-sub{display:block;font-size:11px;font-weight:400;color:#8290a1}.v2-brand-mark{display:grid;place-items:center;width:32px;height:34px;border:1px solid #cbd9ed;background:#eaf1fc;color:#2463d1;border-radius:9px;font:600 19px Consolas,monospace}.mm-v2 .v2-workspace{display:grid;gap:4px;padding:16px 10px;margin-bottom:12px;border-top:1px solid #e4e8ef;border-bottom:1px solid #e4e8ef}.v2-workspace>span,.v2-nav-label{font-size:11px;color:#7d8999}.mm-v2 .v2-workspace strong{font-size:13px}.v2-nav-label{padding:0 10px 8px}.mm-v2 .v2-nav{position:static;display:grid;gap:6px;padding:0;background:none;border:0}.mm-v2 .v2-nav button{justify-content:flex-start;gap:9px;padding:11px 12px;border:1px solid transparent;border-radius:7px;background:none;color:#687589;font-size:13px}.mm-v2 .v2-nav button::before{content:'\u25A6';font-size:17px;color:#8d99a8}.mm-v2 .v2-nav button:nth-child(2)::before{content:'\u2667'}.mm-v2 .v2-nav button:nth-child(3)::before{content:'\u25A5'}.mm-v2 .v2-nav button:nth-child(4)::before{content:'\u25A4'}.mm-v2 .v2-nav button[aria-current]{background:#fff;border-color:#e0e5ec;color:#22314b;box-shadow:0 1px 2px #21354b08}.mm-v2 .v2-nav button[aria-current]::before{color:#2463d1}.v2-side-bottom{margin-top:auto;padding:24px 8px 18px;color:#63758b;font-size:11px;line-height:1.8}.v2-side-bottom small{color:#8c97a4;margin-left:12px}.v2-side-bottom a{display:block;margin-top:14px;text-decoration:none}.v2-snapshot-dot{display:inline-block;width:6px;height:6px;background:#9aaabd;border-radius:50%;margin-right:6px}.v2-snapshot-label{font-size:11px;color:#7a8798}.mm-v2 .v2-original{background:#2463d1;color:#fff;text-decoration:none;padding:7px 12px;border-radius:6px;font-size:12px}.mm-v2 .mm-connection-details{padding:0 28px;background:#fff;border-bottom:1px solid #edf0f4;color:#7b8796;font-size:11px}.mm-v2 .mm-summary{background:#fff;padding:16px 28px;border-bottom:1px solid #e3e7ed;margin:0;font-size:12px}.mm-v2 .mm-body{padding-top:24px}.mm-v2 .mm-main{padding:0 28px 28px}.mm-v2 .mm-list,.mm-v2 .mm-runtime-table{padding:24px 28px;max-width:none}.mm-v2 .mm-section-heading{margin-bottom:18px}.mm-v2 .mm-badge{font-size:11px;font-weight:400;border-radius:5px}.mm-v2 .mm-runtime-panel,.mm-v2 .mm-alerts-overview,.mm-v2 .mm-alert-rule-panel,.mm-v2 .mm-metric-card,.mm-v2 .mm-usage-panel{border-color:#e3e7ed;background:#fff;box-shadow:none}.mm-v2 table{border-collapse:collapse;width:100%;font-size:13px}.mm-v2 th{background:#fafbfc;color:#7a8698;text-align:left;font-size:11px;font-weight:500;padding:12px 16px;border-bottom:1px solid #e3e7ed;white-space:nowrap}.mm-v2 td{padding:13px 16px;border-bottom:1px solid #edf0f4;vertical-align:middle}.mm-v2 tr:hover td{background:#f9fbfd}.mm-v2 td+td,.mm-v2 th+th{border-left:1px solid #f2f4f7}.mm-v2 .v2-task-list{padding:24px 28px}.v2-page-heading{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:20px}.mm-v2 .v2-page-heading h2{font-size:18px}.v2-page-heading p{font-size:12px;color:#748195;margin-top:4px!important}.v2-page-heading>span{font-size:11px;color:#7c8898}.v2-kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:24px}.v2-kpis>div{display:grid;grid-template-columns:1fr auto;gap:8px;border:1px solid #e3e7ed;padding:16px 18px;border-radius:9px;background:#fff}.v2-kpis span{color:#6d7a8d;font-size:12px}.v2-kpis strong{font-size:24px;font-variant-numeric:tabular-nums;grid-column:1;grid-row:2}.v2-kpis small{font-size:10px;color:#8a95a3;grid-column:1/-1}.v2-table-toolbar{display:flex;gap:10px;align-items:center;padding:12px 0}.v2-view-label{font-size:13px;font-weight:600;margin-right:auto;white-space:nowrap}.mm-v2 .v2-table-toolbar input{width:270px;min-height:34px}.mm-v2 .v2-table-toolbar select{width:150px;min-height:34px}.v2-data-table{background:#fff;border:1px solid #e3e7ed;border-radius:8px;overflow:auto}.v2-data-table table{min-width:780px}.v2-data-table th:first-child{width:44%}.v2-data-table td:first-child{padding:0}.mm-v2 .v2-task-name{display:flex;align-items:flex-start;flex-direction:column;gap:4px;border:0;background:transparent;width:100%;padding:14px 12px;min-height:68px;white-space:normal;text-align:left}.v2-task-name .mm-muted{font-size:10px;color:#8591a2}.v2-task-name strong{font-size:13px;line-height:1.55}.mm-v2 .v2-task-name:hover{background:#f3f7fc}.v2-muted{font-size:11px;color:#8591a0}.v2-number{text-align:right!important;white-space:nowrap;font-variant-numeric:tabular-nums}.v2-agent{display:block;font-size:12px}.v2-status{font-size:11px;display:inline-block;white-space:nowrap;border-radius:4px;padding:2px 7px;background:#f3f5f7;color:#6c788a;border:1px solid #e5e9ef}.state-in_review{color:#896821;background:#fff9e9;border-color:#f2e6c3}.state-in_progress{color:#2566a9;background:#edf5ff;border-color:#d5e6f9}.state-done{color:#168269;background:#eef8f4;border-color:#d1eade}.mm-v2 .v2-health{font-size:11px;padding:3px 7px;min-height:26px;background:#fff;white-space:nowrap}.v2-health.history{color:#9a6c28;border-color:#eadcbe;background:#fffbf3}.v2-health.attention{color:#b44242}.mm-v2 .v2-open-task{font-size:11px;padding:4px 8px;min-height:28px;border:0;color:#73849b;background:none}.v2-table-foot{display:flex;justify-content:space-between;font-size:11px;color:#8b96a5;padding-top:12px}.v2-sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)}\r\n.mm-v2 .mm-task-workspace{padding:20px 24px}.mm-v2 .mm-task-back{margin-bottom:14px;color:#667e9c;padding:0;min-height:24px;font-size:12px}.mm-v2 .mm-task-workspace-heading{border:1px solid #e3e7ed;border-radius:8px;background:#fff;padding:15px 18px;margin-bottom:12px}.mm-v2 .mm-task-workspace-heading label{font-size:11px;color:#8290a1}.mm-v2 .mm-task-workspace-heading select{font-size:14px;font-weight:600;background:#fff;border-color:#e3e7ed;max-width:720px}.mm-v2 .mm-task-facts{padding:4px 2px 14px;margin-bottom:0;color:#7c899a;font-size:11px}.mm-v2 .mm-task-attention{border:1px solid #e4e9f0;border-radius:7px;padding:11px 16px;background:#f6f9fd;margin:0 0 18px}.mm-v2 .mm-task-attention-heading{font-size:12px}.mm-v2 .mm-view-switcher{background:#fff;border:1px solid #e2e7ee;border-radius:8px 8px 0 0;margin:0;padding:10px 14px;gap:8px}.mm-v2 .mm-view-switcher button{border:1px solid transparent;background:none;border-radius:5px;padding:6px 12px;color:#6d7e94}.mm-v2 .mm-view-switcher button[aria-current]{background:#eef4fd;color:#2463d1;border-color:#dae6f7}.mm-v2 .mm-view-switcher>.mm-muted{margin-left:auto;font-size:10px}.mm-v2 .mm-relation-workspace{display:block;background:#fff;border:1px solid #e2e7ee;border-top:0;border-radius:0 0 8px 8px;padding:16px;min-height:540px}.mm-v2 .mm-relation-workspace.has-inspector:not(.trace-focused){display:grid;grid-template-columns:minmax(300px,1fr) minmax(400px,48%);gap:18px;align-items:start}.mm-v2 .mm-relation-canvas{min-width:0;min-height:0}.mm-v2 .mm-run-inspector{min-width:0;margin:0;border:1px solid #dce5f1;border-radius:8px;background:#fff;padding:18px;max-height:calc(100dvh - 195px);overflow:auto;overscroll-behavior:contain;scroll-margin-top:20px}.mm-v2 .mm-relation-workspace.trace-focused .mm-run-inspector{max-height:none;overflow:visible}.mm-v2 .mm-run-inspector>.mm-section-heading{border-bottom:1px solid #e4e9f1;padding-bottom:12px;margin-bottom:14px}.mm-v2 .mm-run-inspector h2{font-size:16px}.mm-v2 .mm-run-inspector>.mm-section-heading button{font-size:10px;padding:4px 7px;min-height:28px}.mm-v2 .mm-run-picker{font-size:10px;color:#718199;margin-bottom:10px}.mm-v2 .mm-run-picker select{font-size:11px;font-weight:500}.mm-v2 .mm-run-action-strip{border:1px solid #e6ebf2;border-radius:6px;background:#f8fafc;padding:10px;margin-bottom:14px;font-size:12px}.mm-v2 .mm-evidence-switch{display:flex;gap:5px;flex-wrap:wrap;border-bottom:1px solid #e5eaf2;padding-bottom:10px;margin:0 0 16px}.mm-v2 .mm-evidence-switch button{font-size:11px;padding:6px 9px;min-height:30px}.mm-v2 .mm-evidence-switch button[aria-pressed=true]{background:#eef4fd;color:#2463d1;border-color:#d5e3f8}.mm-v2 .mm-exec-io{display:grid;grid-template-columns:1fr;gap:14px;margin:18px 0 24px}.mm-v2 .mm-exec-io>section{border:1px solid #e3e9f1;border-radius:8px;background:#fff;padding:16px;min-width:0}.mm-v2 .mm-exec-io>section:nth-child(1){background:#f9fafc}.mm-v2 .mm-exec-io h3{font-size:14px;margin:0 0 10px;color:#263a55}.mm-v2 .mm-exec-source{color:#73849b;background:#f0f5fb;border-radius:4px;padding:5px 7px}.mm-v2 .mm-exec-note{color:#728198;font-size:11px}.mm-v2 .mm-exec-text{font-size:13px}.mm-v2 .mm-exec-summary{border:1px solid #e5eaf1;background:#f6f9fc;border-radius:6px;padding:12px}.mm-v2 .mm-exec-last{border-bottom:1px solid #e7edf4;padding:10px 0}.mm-v2 .v2-section-title{display:flex;justify-content:space-between;gap:10px;align-items:center;margin-bottom:12px}.v2-section-title h3{font-size:15px}.v2-section-title span{font-size:10px;color:#8190a5}.v2-evidence-section{border-top:1px solid #dfe6f0;padding-top:18px;margin-top:14px}.mm-v2 .mm-waterfall{border:1px solid #e0e7f0;border-radius:8px;padding:14px;background:#fafcfe}.mm-v2 .mm-waterfall-stats{background:#fff;border:1px solid #e4ebf2;border-radius:5px;padding:10px}.mm-v2 .mm-waterfall-top-list{border-color:#e2e8f0}.mm-v2 .mm-waterfall-top-list button{background:#fff}.mm-v2 .mm-call-viewport{background:#f5f7fa;border-color:#e1e7ef;border-radius:8px;height:560px;min-height:300px}.mm-v2 .mm-call-toolbar{margin-bottom:12px}.mm-v2 .mm-graph-filters{padding:9px;border:1px solid #e6ebf1;background:#fafbfc;border-radius:6px;margin:10px 0}.mm-v2 .mm-graph-filters select,.mm-v2 .mm-graph-filters input{font-size:11px}.mm-v2 .mm-call-description strong{font-size:13px}.mm-v2 .mm-call-legend{font-size:10px;gap:8px 10px;padding:6px 0}.mm-v2 .mm-call-legend .mm-call-scroll-hint{display:none}.mm-v2 button.mm-call-node{--node-bg:#fff;--node-border:#d5dde8;--node-ink:#33465f;display:flex;justify-content:flex-start;padding:11px 13px;background:#fff!important;border-radius:9px;box-shadow:0 2px 5px #26395106;gap:6px}.mm-v2 .mm-call-node-kicker{font-size:9px;letter-spacing:.04em;color:#8b98aa}.mm-v2 .mm-call-node-name{font-size:14px;font-weight:600;color:#25374f}.mm-v2 .mm-call-node-identity{font-size:11px;font-family:Consolas,'Microsoft YaHei',monospace;color:#78869b}.mm-v2 .mm-call-node-status{padding:2px 7px;border-radius:4px;background:#edf7f2;color:#168269;font-family:system-ui,'Microsoft YaHei',sans-serif;font-size:10px}.mm-v2 .status-failed .mm-call-node-status{background:#fff0f0;color:#b74040}.mm-v2 .status-waiting .mm-call-node-status{background:#fff7e8;color:#9e6e1e}.mm-v2 .mm-call-node-foot{font-size:10px;color:#8390a3;margin-top:auto}.mm-v2 .mm-call-node.is-selected{border:2px solid #417adb!important;outline:0;background:#f2f7ff!important;box-shadow:0 3px 10px #2463d114}.mm-v2 .mm-call-node.is-failed{border-color:#e4cbcb}.mm-v2 .mm-call-edge{stroke:#7d95b5;stroke-width:1.6}.mm-v2 .mm-call-edge.rerun{stroke:#b08a50;stroke-dasharray:4 4}.mm-v2 .mm-call-edge-clearance{stroke:#f5f7fa}.mm-v2 .mm-call-edge-preview rect{fill:#fff;stroke:#dce4ef}.mm-v2 .mm-call-edge-preview text{font-size:10px;fill:#566c8a}.mm-v2 .mm-call-edge-detail{background:#f7faff;border-color:#d8e4f6;color:#405777}.mm-v2 .mm-monitor-timeline{background:#fff}.mm-v2 .mm-monitor-table{border-color:#e0e7f0}.mm-v2 .mm-monitor-row[aria-pressed=true]{background:#eff5fd}.mm-v2 .mm-monitor-span.is-execution{background:#9db9df}.mm-v2 .mm-call-notice{padding:10px 14px;background:#f7f9fc;border:1px solid #e7ecf3;border-radius:5px;margin:12px 0}.mm-v2 :focus-visible{outline:2px solid #417adb;outline-offset:3px}\r\n@media(max-width:1200px){.mm.mm-v2{grid-template-columns:174px minmax(0,1fr)}.mm-v2 .mm-relation-workspace.has-inspector:not(.trace-focused){grid-template-columns:minmax(260px,1fr) minmax(340px,48%)}.mm-v2 .v2-task-list{padding:20px}.v2-kpis{gap:10px}.v2-kpis>div{padding:12px}.v2-snapshot-label{display:none}}\r\n@media(max-width:1000px){.mm-v2 .mm-relation-workspace.has-inspector:not(.trace-focused){display:block}.mm-v2 .mm-run-inspector{max-height:none;margin-top:18px}.mm-v2 .mm-call-viewport{height:420px}}\r\n@media(max-width:700px){.mm.mm-v2{grid-template-columns:1fr;grid-template-rows:auto auto minmax(0,1fr) 28px}.mm-v2 .v2-sidebar{grid-column:1;grid-row:1;display:block;padding:8px;border-right:0;border-bottom:1px solid #e3e7ed;overflow:visible}.mm-v2 .v2-brand,.mm-v2 .v2-workspace,.mm-v2 .v2-nav-label,.mm-v2 .v2-side-bottom{display:none}.mm-v2 .v2-nav{display:grid;grid-template-columns:repeat(4,1fr);gap:4px}.mm-v2 .v2-nav button{font-size:11px;padding:6px 4px;justify-content:center;gap:3px}.mm-v2 .v2-nav button::before{display:none}.mm-v2 .mm-header{grid-column:1;grid-row:2;padding:12px 16px;gap:8px}.mm-v2 .mm-header h1{font-size:18px}.mm-v2 .v2-breadcrumb{font-size:10px}.mm-v2 .mm-header .mm-actions{gap:5px}.mm-v2 .mm-header .mm-actions button,.mm-v2 .v2-original{font-size:10px;padding:5px 7px;min-height:30px}.mm-v2 .mm-scroll{grid-column:1;grid-row:3}.mm-v2 .mm-footer{grid-column:1;grid-row:4;padding:5px 12px}.mm-v2 .mm-footer span:last-child{display:none}.mm-v2 .mm-connection-details{padding:0 16px;font-size:10px}.mm-v2 .v2-task-list,.mm-v2 .mm-task-workspace,.mm-v2 .mm-main,.mm-v2 .mm-runtime-table{padding:16px}.v2-page-heading{display:block}.v2-page-heading>span{display:block;margin-top:6px}.v2-kpis{grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:10px}.v2-kpis strong{font-size:21px}.v2-kpis>div{padding:10px 12px}.v2-table-toolbar{flex-wrap:wrap}.v2-view-label{width:100%}.mm-v2 .v2-table-toolbar input{flex:1;min-width:120px;width:0}.mm-v2 .v2-table-toolbar select{width:116px}.v2-data-table table{min-width:730px}.v2-table-foot span:last-child{display:none}.mm-v2 .mm-task-workspace-heading{padding:12px;display:block}.mm-v2 .mm-task-workspace-heading .mm-actions{margin-top:10px}.mm-v2 .mm-task-facts{flex-wrap:wrap;gap:8px}.mm-v2 .mm-view-switcher{flex-wrap:wrap}.mm-v2 .mm-view-switcher>.mm-muted{margin-left:0;width:100%}.mm-v2 .mm-relation-workspace{padding:10px}.mm-v2 .mm-call-viewport{height:380px}.mm-v2 .mm-run-inspector{padding:12px}.mm-v2 .mm-exec-io>section{padding:12px}.mm-v2 .mm-exec-io{gap:10px}.mm-v2 .mm-summary{padding:12px 16px;gap:12px}.mm-v2 .v2-section-title{display:block}.mm-v2 .mm-waterfall{padding:8px}}\r\n@media(prefers-reduced-motion:reduce){.mm-v2 *{animation-duration:.01ms!important;transition-duration:.01ms!important;scroll-behavior:auto!important}}\r\n\r\n.mm.mm-v2 button.v2-task-name{display:flex;flex-direction:column;align-items:flex-start;justify-content:center;gap:4px;padding:12px;min-height:68px}.mm.mm-v2 button.v2-task-name strong{max-width:100%;white-space:normal;overflow-wrap:anywhere}.mm.mm-v2 .v2-data-table table{table-layout:fixed}.mm.mm-v2 .v2-data-table th:first-child{width:44%}.mm.mm-v2 .v2-data-table th:nth-child(2){width:10%}.mm.mm-v2 .v2-data-table th:nth-child(3){width:13%}.mm.mm-v2 .v2-data-table th:nth-child(4){width:9%}.mm.mm-v2 .v2-data-table th:nth-child(5){width:15%}.mm.mm-v2 .v2-data-table th:nth-child(6){width:9%}.mm.mm-v2 .mm-header button{background:#fff;color:#55677f;border-color:#e1e6ed}.mm-v2 .mm-relation-workspace.has-inspector>.mm-relation-canvas{display:block}.mm.mm-v2 button.mm-call-node{--node-bg:#fff;--node-border:#d5dde8;--node-ink:#33465f;border-color:#d5dde8}.mm.mm-v2 button.mm-call-node.is-failed{border-color:#e6cccc}.v2-graph-group{position:absolute;top:8px;border:1px solid #e8edf4;border-radius:10px;background:#ffffff6b;pointer-events:none}.v2-graph-group>span{display:flex;justify-content:space-between;padding:10px 12px;color:#647a96;font-size:11px}.v2-graph-group small{color:#99a6b7;font-size:10px}.v2-edge-label{font-family:inherit;font-size:10px;fill:#7d8fa7;pointer-events:none;paint-order:stroke;stroke:#f5f7fa;stroke-width:4px;stroke-linejoin:round}.mm-v2 .mm-call-canvas{overflow:visible}.mm-v2 .mm-relation-workspace.has-inspector:not(.trace-focused){height:650px}.mm-v2 .mm-relation-workspace.trace-focused .mm-relation-canvas{display:none}.mm-v2 .mm-call-viewport{position:relative}\r\n@media(max-width:1000px){.mm-v2 .mm-relation-workspace.has-inspector:not(.trace-focused){height:auto}.mm-v2 .mm-relation-workspace.has-inspector>.mm-relation-canvas{display:block}.mm-v2 .mm-relation-workspace.trace-focused>.mm-relation-canvas{display:none}}\r\n\r\n.mm.mm-v2{grid-template-rows:72px minmax(0,1fr) 30px}.mm-v2 .v2-brand{min-height:72px}.mm-v2 .mm-header{padding:10px 24px}.mm-v2 .mm-task-workspace{padding:16px 24px}.mm-v2 .mm-task-back{margin-bottom:8px;min-height:20px}.mm-v2 .mm-task-workspace-heading{padding:10px 14px;margin-bottom:8px}.mm-v2 .mm-task-facts{padding:0 2px 8px}.mm-v2 .mm-task-attention{padding:7px 12px;margin-bottom:12px}.mm-v2 .mm-view-switcher{padding:7px 12px}.mm-v2 .mm-call-toolbar{margin-bottom:7px}.mm-v2 .mm-graph-filters{padding:7px;margin:8px 0}.mm-v2 .mm-relation-workspace{padding:12px}.mm-v2 .mm-waterfall{margin-top:0}.mm-v2 .mm-wf-heading{padding-bottom:10px;border-bottom:1px solid #e1e8f1;margin-bottom:12px}.mm-v2 .mm-wf-heading h3{font-size:15px}.mm-v2 .mm-wf-totals{padding:12px;background:#fff;border:1px solid #e2e9f1;border-radius:6px;margin:12px 0}.mm-v2 .mm-wf-controls{padding:12px 0}.mm-v2 .mm-wf-ranking{border:1px solid #e2e9f1;border-radius:7px;padding:12px;background:#fff}.mm-v2 .mm-wf-inspector{margin-bottom:18px}.mm-v2 .mm-wf-ranking li button{background:#fff;border-bottom:1px solid #edf1f6}.mm-v2 .mm-wf-ranking li button[aria-pressed=true]{background:#edf4fd}.mm-v2 .mm-wf-detail{background:#f1f6fe;border-color:#d2e2f8}.mm-v2 .mm-call-people{margin-top:16px}\r\n@media(max-width:700px){.mm.mm-v2{grid-template-rows:auto auto minmax(0,1fr) 28px}.mm-v2 .mm-header{padding:10px 14px}.mm-v2 .mm-task-workspace{padding:12px}.mm-v2 .mm-relation-workspace{padding:8px}}\r\n\r\n.mm.mm-v2 .mm-header .mm-actions>button{background:#fff!important;color:#55677f!important;flex:0 0 auto!important;width:auto!important;border-color:#dce3ec}.mm.mm-v2 .mm-header .mm-actions{flex-wrap:nowrap}.v2-scroll-hint{display:none}\r\n@media(max-width:700px){.mm.mm-v2 .mm-header .mm-actions{justify-content:flex-end;gap:6px}.v2-scroll-hint{display:block;font-size:10px;color:#8593a6;padding:0 0 10px}.mm-v2 .mm-call-legend .mm-call-scroll-hint{display:block;width:100%;font-size:10px}}\r\n\r\n.mm.mm-v2 .mm-header .mm-actions{display:flex!important}\r\n";

// src/task-table.jsx
var import_react3 = __toESM(require("react"), 1);

// src/monitor-presentation.mjs
var activeStates = /* @__PURE__ */ new Set(["queued", "dispatched", "running", "waiting_local_directory", "deferred"]);
var timestamp = (value) => typeof value === "string" && Number.isFinite(Date.parse(value)) ? Date.parse(value) : null;
function observedWork(target, observed, unavailable = false) {
  const match = target?.id && target?.issueId && observed?.id === target.id && observed?.issueId === target.issueId;
  const value = match ? observed : null;
  const stale = Boolean(unavailable || value?.observationError || value?.logError || value?.logsCaughtUp === false || value?.workProgress?.coverage?.logsCaughtUp === false || value?.status && target?.status && value.status !== target.status);
  const current = !stale && activeStates.has(target?.status) ? value?.workProgress?.currentAction : null;
  return { stale, current, action: current || value?.workProgress?.latestAction || null };
}
function taskSignals(issueId, runs = [], alerts = [], failures = [], now = Date.now(), unavailable = false) {
  const related = runs.filter((run) => run.issueId === issueId);
  const pending = alerts.filter((alert) => alert.issueId === issueId && !alert.resolvedAt && !alert.historical);
  const verified = pending.filter((alert) => !unavailable && !alert.verificationWarning);
  const currentFailed = new Set(pending.filter((alert) => alert.kind === "failed").map((alert) => alert.taskId));
  const historical = new Set(failures.filter((item) => item.issueId === issueId).map((item) => item.runId));
  for (const alert of alerts) if (alert.issueId === issueId && alert.kind === "failed" && (alert.resolvedAt || alert.historical)) historical.add(alert.taskId);
  for (const id2 of currentFailed) historical.delete(id2);
  const durations = related.filter((run) => run.status === "running" && !run.observationError).map((run) => timestamp(run.startedAt)).filter((value) => value !== null && value <= now).map((value) => now - value);
  const actions = related.flatMap((run) => {
    const { action } = observedWork(run, run, unavailable);
    const at = timestamp(action?.at);
    return at !== null && at <= now ? [at] : [];
  });
  return {
    active: related.filter((run) => activeStates.has(run.status)).length,
    running: related.filter((run) => run.status === "running").length,
    waiting: related.filter((run) => activeStates.has(run.status) && run.status !== "running").length,
    current: verified.length,
    uncertain: pending.length - verified.length,
    titles: [...new Set(verified.map((alert) => alert.title))],
    historical: historical.size,
    longestMs: !unavailable && durations.length ? Math.max(...durations) : null,
    latestActionAt: actions.length ? new Date(Math.max(...actions)).toISOString() : null
  };
}
function triggerExcerpt(value, limit = 24) {
  if (typeof value !== "string" || !value.trim()) return "\u6458\u8981\u672A\u63D0\u4F9B";
  const failure = /^Delegated task `[^`]+` ended in a final failure \(`[^`]+`\) and no automatic retry is pending\./.test(value);
  if (failure) return "\u59D4\u6D3E\u8FD0\u884C\u6700\u7EC8\u5931\u8D25\uFF0C\u672A\u5B89\u6392\u81EA\u52A8\u91CD\u8BD5";
  const lines = value.replace(/\[([^\]]+)\]\(mention:\/\/[^)]+\)/g, "$1").replace(/\*\*|`/g, "").split(/\r?\n/).map((line2) => line2.replace(/^[\s#*>-]+/, "").replace(/^(?:本次)?派给\s*@?[^\s：:]+[：:]\s*/, "").trim()).filter(Boolean);
  if (!lines.length) return "\u6458\u8981\u672A\u63D0\u4F9B";
  const line = lines.find((text5) => /^(?:任务|要求|目标|请|负责|执行|检查|修复|审查|验证|实现)/.test(text5)) || lines.find((text5) => !/^(?:本次派给|派给|@|mention:)/.test(text5)) || lines[0];
  const plain = line.replace(/\s+/g, " ");
  const chars = [...plain];
  return chars.slice(0, limit).join("") + (chars.length > limit ? "\u2026" : "");
}
function filterGraphRuns(runs, { status = "all", agent = "", query = "", from = "", until = "" } = {}) {
  const start = timestamp(from), end = timestamp(until);
  const invalidRange = start !== null && end !== null && start > end;
  const needle = query.trim().toLowerCase();
  const matches = invalidRange ? [] : runs.filter((run) => {
    const at = timestamp(run.startedAt) ?? timestamp(run.createdAt);
    return (status === "all" || (status === "active" ? activeStates.has(run.status) : run.status === status)) && (!agent || run.agentId === agent) && (!needle || [run.id, run.agentName, run.triggerSummary].some((value) => typeof value === "string" && value.toLowerCase().includes(needle))) && (start === null || at !== null && at >= start) && (end === null || at !== null && at <= end);
  });
  const ids = new Set(matches.map((run) => run.id)), retained = new Set(ids);
  const fields = ["delegatedFromTaskId", "retryOfTaskId", "rerunOfTaskId", "parentTaskId"];
  for (const run of runs) for (const field of fields) {
    if (ids.has(run.id) && run[field]) retained.add(run[field]);
    if (ids.has(run[field])) retained.add(run.id);
  }
  return { runs: runs.filter((run) => retained.has(run.id)), matchedIds: ids, invalidRange };
}

// src/task-table.jsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var states = { backlog: "\u5F85\u89C4\u5212", todo: "\u5F85\u5904\u7406", in_progress: "\u5904\u7406\u4E2D", blocked: "\u53D7\u963B", in_review: "\u5F85\u5BA1\u6838", done: "\u5DF2\u5B8C\u6210", cancelled: "\u5DF2\u53D6\u6D88" };
var active2 = /* @__PURE__ */ new Set(["queued", "dispatched", "running", "waiting_local_directory", "deferred"]);
function TaskList({ issues = [], runs = [], agents = [], statuses = [], onSelect, onAlerts, alerts = [], historicalFailures = [], unavailable = false, issuesTruncated = false, filter = "all", query = "", onFilterChange, onQueryChange }) {
  const signals = new Map(issues.map((issue) => [issue.id, taskSignals(issue.id, runs, alerts, historicalFailures, Date.now(), unavailable)]));
  const shown = issues.filter((i) => `${i.identifier} ${i.title}`.toLowerCase().includes(query.trim().toLowerCase()) && (filter === "all" || filter === "active" && signals.get(i.id).active || filter === "attention" && (signals.get(i.id).current || signals.get(i.id).uncertain) || filter === "history" && signals.get(i.id).historical));
  const order = [], seen = /* @__PURE__ */ new Set();
  const visit = (i, depth = 0) => {
    if (seen.has(i.id)) return;
    seen.add(i.id);
    order.push([i, depth]);
    shown.filter((child) => child.parentIssueId === i.id).forEach((c) => visit(c, depth + 1));
  };
  shown.filter((i) => !shown.some((p) => p.id === i.parentIssueId)).forEach((i) => visit(i));
  shown.forEach((i) => visit(i));
  const totalActive = issues.filter((i) => signals.get(i.id).active).length, totalAttention = issues.filter((i) => signals.get(i.id).current || signals.get(i.id).uncertain).length;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: "v2-task-list", "aria-label": "\u4E1A\u52A1\u4EFB\u52A1\u5217\u8868", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "v2-page-heading", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("h2", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(TypeIcon, { type: "task", size: 19 }),
          "\u4E1A\u52A1\u4EFB\u52A1"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: "\u67E5\u770B\u4E1A\u52A1\u8FDB\u5C55\uFF0C\u8FDB\u5165\u4EFB\u52A1\u8FFD\u8E2A\u8FD0\u884C\u4E0E\u6267\u884C\u8BC1\u636E\u3002" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { children: [
        issues.length,
        " \u4E2A\u4EFB\u52A1 \xB7 \u540C\u4E00\u5DE5\u4F5C\u533A\u5FEB\u7167"
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "v2-kpis", "aria-label": "\u4EFB\u52A1\u72B6\u6001\u6982\u89C8", children: [["\u4E1A\u52A1\u4EFB\u52A1", issues.length, "\u5F53\u524D\u5DE5\u4F5C\u533A"], ["\u6D3B\u52A8\u8FD0\u884C\u4EFB\u52A1", totalActive, "\u6B63\u5728\u6267\u884C\u6216\u7B49\u5F85"], ["\u5F53\u524D\u9700\u5173\u6CE8", totalAttention, "\u544A\u8B66\u6216\u72B6\u6001\u5F85\u6838\u5B9E"], ["\u6709\u5386\u53F2\u5931\u8D25", issues.filter((i) => signals.get(i.id).historical).length, "\u4E0D\u8868\u793A\u5F53\u524D\u4ECD\u5728\u6545\u969C"]].map(([label, value, note]) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: label }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("strong", { children: value }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("small", { children: note })
    ] }, label)) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "v2-table-toolbar", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "v2-view-label", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(TypeIcon, { type: "task" }),
        "\u4EFB\u52A1\u5217\u8868"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { "aria-label": "\u641C\u7D22\u4E1A\u52A1\u4EFB\u52A1", placeholder: "\u641C\u7D22\u4EFB\u52A1\u540D\u79F0\u6216\u7F16\u53F7\u2026", value: query, onChange: (e) => onQueryChange?.(e.target.value) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("select", { "aria-label": "\u4EFB\u52A1\u5173\u6CE8\u8303\u56F4", value: filter, onChange: (e) => onFilterChange?.(e.target.value), children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "all", children: "\u5168\u90E8\u4EFB\u52A1" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "attention", children: "\u5F53\u524D\u9700\u5173\u6CE8" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "active", children: "\u6D3B\u52A8\u8FD0\u884C" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "history", children: "\u6709\u5386\u53F2\u5931\u8D25" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "v2-scroll-hint", children: "\u5DE6\u53F3\u6ED1\u52A8\u8868\u683C\uFF0C\u67E5\u770B\u4E1A\u52A1\u72B6\u6001\u3001\u8FD0\u884C\u8BB0\u5F55\u548C\u5173\u6CE8\u60C5\u51B5\u3002" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "v2-data-table", role: "region", "aria-label": "\u4E1A\u52A1\u4EFB\u52A1\u6570\u636E\u8868", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("table", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { children: "\u4EFB\u52A1 / \u5C42\u7EA7" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { children: "\u4E1A\u52A1\u72B6\u6001" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { children: "\u5F53\u524D\u6267\u884C" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { className: "v2-number", children: "\u8FD0\u884C\u8BB0\u5F55" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { children: "\u5173\u6CE8\u60C5\u51B5" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "v2-sr-only", children: "\u64CD\u4F5C" }) })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("tbody", { children: order.map(([issue, depth]) => {
          const signal = signals.get(issue.id), related = runs.filter((r) => r.issueId === issue.id), running = related.find((r) => active2.has(r.status)), parent = issues.find((i) => i.id === issue.parentIssueId);
          const status = states[issue.status] || statuses.find((s) => s.key === issue.status)?.name || issue.status;
          return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("tr", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { className: "mm-business-open v2-task-name", onClick: () => onSelect(issue.id), style: { paddingInlineStart: 12 + Math.min(depth, 4) * 16 }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "mm-muted", children: [
                depth ? "\u21B3 " : "",
                issue.identifier,
                parent ? ` \xB7 ${parent.identifier} \u7684\u5B50\u4EFB\u52A1` : ""
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "v2-task-title-line", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(TypeIcon, { type: "task", size: 18 }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("strong", { children: issue.title })
              ] })
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: `v2-status state-${issue.status}`, children: status }) }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("td", { children: running ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("strong", { className: "v2-agent", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(AgentAvatar, { name: running.agentName || agents.find((a) => a.id === running.agentId)?.name, size: 18 }),
                running.agentName || agents.find((a) => a.id === running.agentId)?.name || "\u667A\u80FD\u4F53"
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "mm-muted", children: running.status === "running" ? "\u6B63\u5728\u6267\u884C" : "\u7B49\u5F85\u6267\u884C" })
            ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "v2-muted", children: "\u65E0\u6D3B\u52A8\u8FD0\u884C" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("td", { className: "v2-number", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("strong", { children: issue.snapshotRunCount ?? related.length }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "v2-muted", children: " \u6B21" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("td", { children: signal.current || signal.uncertain ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: "v2-health attention", onClick: () => onAlerts?.(issue.id), children: "\u67E5\u770B\u5173\u6CE8\u9879" }) : signal.historical ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { className: "v2-health history", onClick: () => onAlerts?.(issue.id), children: [
              "\u5386\u53F2\u5931\u8D25 ",
              signal.historical,
              " \u6B21"
            ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "v2-muted", children: "\u65E0\u5F53\u524D\u544A\u8B66" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: "v2-open-task", "aria-label": `\u67E5\u770B ${issue.identifier} \u4EFB\u52A1\u8BE6\u60C5`, onClick: () => onSelect(issue.id), children: "\u67E5\u770B \u2197" }) })
          ] }, issue.id);
        }) })
      ] }),
      !order.length && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "mm-empty", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h3", { children: issues.length ? "\u6CA1\u6709\u7B26\u5408\u6761\u4EF6\u7684\u4EFB\u52A1" : "\u6682\u65E0\u4E1A\u52A1\u4EFB\u52A1" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: "\u53EF\u4EE5\u6E05\u7A7A\u641C\u7D22\u6761\u4EF6\u6216\u5207\u6362\u5173\u6CE8\u8303\u56F4\u3002" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { onClick: () => {
          onQueryChange?.("");
          onFilterChange?.("all");
        }, children: "\u6E05\u7A7A\u7B5B\u9009" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "v2-table-foot", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { children: [
        "\u663E\u793A ",
        order.length,
        " / ",
        issues.length,
        " \u4E2A\u4EFB\u52A1"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { children: [
        "\u4E1A\u52A1\u72B6\u6001\u4E0E\u8FD0\u884C\u7ED3\u679C\u72EC\u7ACB\u8BB0\u5F55",
        issuesTruncated ? " \xB7 \u5F53\u524D\u5217\u8868\u672A\u5B8C\u6574\u8BFB\u53D6" : ""
      ] })
    ] })
  ] });
}

// src/client.jsx
var import_react16 = __toESM(require("react"), 1);

// src/style.css
var style_default = ".mm-panel{flex:1;width:100%;max-width:100%;min-height:0;min-width:0;overflow:hidden;position:relative;container-type:inline-size}\r\n.mm{--mm-bg:#e8edf1;--mm-text:#243346;--mm-muted:#536579;--mm-line:#cbd6df;--mm-hover:#dce6ee;--mm-accent:#315c9f;display:flex;flex-direction:column;width:100%;max-width:100%;height:100%;min-width:0;overflow:hidden;color:var(--mm-text);background:var(--mm-bg);font-family:inherit;font-size:14px;line-height:1.55;isolation:isolate}\r\n.mm *{box-sizing:border-box}\r\n.mm ::selection{background:#d5e4ff;color:#19355c}\r\n.mm :focus-visible,.mm-launch:focus-visible{outline:2px solid #5279cf;outline-offset:3px}\r\n.mm input,.mm select{caret-color:var(--mm-accent)}\r\n.mm ::placeholder{color:var(--mm-muted);opacity:1}\r\n.mm button,.mm input,.mm select{font:inherit;color:inherit}\r\n.mm button{display:inline-flex;align-items:center;justify-content:center;gap:7px;border:1px solid var(--mm-line);background:var(--mm-bg);border-radius:7px;padding:7px 11px;min-height:36px;cursor:pointer;white-space:nowrap}\r\n.mm button:hover{background:var(--mm-hover)}\r\n.mm button:disabled{opacity:.55;cursor:not-allowed}\r\n.mm input,.mm select{min-height:39px;padding:8px 10px;border:1px solid var(--mm-line);border-radius:6px;background:var(--mm-bg);width:100%;min-width:0}\r\n.mm a{color:var(--mm-accent);text-underline-offset:3px}\r\n.mm h1,.mm h2,.mm h3,.mm p{margin:0}\r\n.mm h1{font-size:22px;line-height:1.3;font-weight:650}\r\n.mm h2{font-size:17px;font-weight:650}\r\n.mm h3{font-size:15px;font-weight:650}\r\n.mm .mm-muted{color:var(--mm-muted);font-size:12px}\r\n.mm-header{display:flex;align-items:center;justify-content:space-between;gap:20px;max-width:100%;min-width:0;padding:12px 22px;border-bottom:1px solid var(--mm-line)}\r\n.mm-header p{margin-top:5px}\r\n.mm-actions{display:flex;gap:10px;align-items:center;min-width:0;max-width:100%;flex-wrap:wrap}\r\n.mm-scroll{flex:1;overflow:auto;min-height:0;scrollbar-color:var(--dsw-alias-scrollbar-bg-l2,#b6bdca) transparent;scrollbar-width:thin;overscroll-behavior:contain}\r\n.mm-toolbar{display:flex;align-items:center;gap:14px;padding:18px 28px}\r\n.mm-connection-details{padding:0 22px;border-bottom:1px solid var(--mm-line);font-size:12px}\r\n.mm-connection-details>summary{cursor:pointer;padding:7px 0;width:fit-content}\r\n.mm-connection-details>summary span+span{margin-left:14px}\r\n.mm-connection-details .mm-toolbar{padding:6px 0 12px}\r\n.mm-workspace{display:flex;align-items:center;gap:10px;min-width:200px;max-width:390px;white-space:nowrap}\r\n.mm-workspace select{min-width:160px}\r\n.mm-sync{font-size:12px;color:var(--mm-muted);margin-left:auto}\r\n.mm-summary{display:flex;gap:20px;align-items:center;flex-wrap:wrap;padding:3px 28px 19px;font-size:13px}\r\n.mm-summary strong{font-variant-numeric:tabular-nums;font-size:17px;font-weight:650;margin-left:5px}\r\n.mm-summary .mm-muted{flex-basis:100%}\r\n.mm-tabs{position:sticky;top:0;z-index:12;display:flex;gap:20px;border-bottom:1px solid var(--mm-line);padding:0 28px;overscroll-behavior-inline:contain}\r\n.mm-tabs button{border:0;border-bottom:2px solid transparent;border-radius:0;padding:7px 2px;color:var(--mm-muted);gap:8px}\r\n.mm-tabs button[aria-current]{border-bottom-color:var(--mm-accent);color:var(--mm-text);font-weight:650}\r\n.mm-tabs span{font-size:12px;font-variant-numeric:tabular-nums}\r\n.mm-body{display:grid;grid-template-columns:minmax(0,1fr)}\r\n.mm-body.has-detail{grid-template-columns:minmax(320px,1fr) minmax(360px,1fr)}\r\n.mm-list{min-width:0;padding:20px 28px}\r\n.mm-filters{display:flex;gap:10px;margin-bottom:17px}\r\n.mm-filters select{max-width:150px}\r\n.mm-table-wrap{overflow:auto;scrollbar-width:thin;overscroll-behavior-inline:contain}\r\n.mm table{border-collapse:collapse;width:100%;text-align:left;font-size:14px}\r\n.mm th{font-weight:500;font-size:12px;color:var(--mm-muted);white-space:nowrap;border-bottom:1px solid var(--mm-line);padding:0 10px 10px}\r\n.mm td{border-bottom:1px solid var(--mm-line);padding:13px 10px;vertical-align:middle}\r\n.mm tbody tr:hover{background:var(--mm-hover)}\r\n.mm tbody tr.selected{background:var(--mm-hover);box-shadow:inset 0 0 0 1px var(--mm-line)}\r\n.mm td:first-child,.mm th:first-child{padding-left:2px}\r\n.mm td small{display:block;font-size:11px;margin-top:4px;color:var(--mm-muted)}\r\n.mm button.mm-issue-button{display:flex;flex-direction:column;gap:3px;align-items:flex-start;text-align:left;white-space:normal;padding:0;border:0;background:transparent;width:100%;min-width:120px;overflow-wrap:anywhere}\r\n.mm-issue-button span{font-size:11px;color:var(--mm-muted)}\r\n.mm-issue-button strong{font-weight:550;line-height:1.5}\r\n.mm-list-note{padding-top:16px}\r\n.mm-badge{display:inline-flex;white-space:nowrap;font-size:12px;line-height:1.5;padding:2px 7px;border-radius:5px;background:var(--mm-hover);color:var(--mm-muted)}\r\n.mm-badge.good{color:#1d694e;background:#eaf6ef}\r\n.mm-badge.pending{color:#865310;background:#fff3d9}\r\n.mm-badge.danger{color:#a23a38;background:#fff0ee}\r\n.mm-detail{min-width:0;padding:22px 24px;border-left:1px solid var(--mm-line)}\r\n.mm-section-heading{display:flex;justify-content:space-between;align-items:center;gap:10px;min-width:0;margin-bottom:18px;flex-wrap:wrap}\r\n.mm-section-heading .mm-muted{text-align:right}\r\n.mm-issue-title{font-size:18px!important;line-height:1.5;margin:6px 0 15px!important;overflow-wrap:anywhere}\r\n.mm-detail>.mm-muted{margin-top:12px}\r\n.mm-run-picker{display:flex;flex-direction:column;gap:8px;margin-top:24px;font-size:12px;color:var(--mm-muted)}\r\n.mm-run-picker select{color:var(--mm-text)}\r\n.mm-run-metadata{margin:20px 0;font-size:12px;border-top:1px solid var(--mm-line);padding-top:16px}\r\n.mm-run-metadata>summary{cursor:pointer;padding:6px 0}\r\n.mm-run-info{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:18px 0 26px;font-size:12px}\r\n.mm-run-info dt{color:var(--mm-muted);margin-bottom:5px}\r\n.mm-run-info dd{margin:0;overflow-wrap:anywhere;font-variant-numeric:tabular-nums}\r\n.mm-log-section{border-top:1px solid var(--mm-line);padding-top:20px}\r\n.mm-logs{max-height:570px;overflow:auto;scrollbar-width:thin}\r\n.mm-message{padding:14px 0;border-bottom:1px solid var(--mm-line);font-size:12px}\r\n.mm-message-head{display:flex;justify-content:space-between;gap:10px;color:var(--mm-muted);margin-bottom:7px;flex-wrap:wrap}\r\n.mm-message pre{font:12px/1.65 ui-monospace,SFMono-Regular,Consolas,monospace;white-space:pre-wrap;overflow-wrap:anywhere;margin:8px 0;tab-size:2}\r\n.mm-message summary{cursor:pointer;color:var(--mm-muted);padding:4px 0}\r\n.mm-empty{padding:44px 24px;text-align:center;color:var(--mm-muted);font-size:13px}\r\n.mm-empty h2{color:var(--mm-text);margin-bottom:9px}\r\n.mm-error,.mm-notice{margin:0 28px 15px!important;padding:12px 14px;border:1px solid var(--mm-line);border-radius:6px;font-size:13px;overflow-wrap:anywhere}\r\n.mm-error{color:#a23a38}\r\n.mm-error button{margin-left:12px}\r\n.mm-error-text{color:#a23a38}\r\n.mm-detail .mm-error,.mm-settings .mm-error,.mm-log-section .mm-error{margin:12px 0!important}\r\n.mm-notice{color:var(--mm-muted)}\r\n.mm-notice p+p{margin-top:5px}\r\n.mm-runtime-table{padding:24px 28px}\r\n.mm-runtime-table td{font-variant-numeric:tabular-nums}\r\n.mm-runtime-table td:first-child{overflow-wrap:anywhere}\r\n.mm-settings{padding:24px 28px;background:var(--mm-hover);border-bottom:1px solid var(--mm-line)}\r\n.mm-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}\r\n.mm-form-grid label{display:flex;flex-direction:column;gap:6px;font-size:13px}\r\n.mm-token{grid-column:1/-1}\r\n.mm-settings>.mm-muted{margin:12px 0 18px;max-width:75ch}\r\n.mm button.mm-primary{background:var(--mm-primary-bg,var(--mm-accent));border-color:var(--mm-primary-bg,var(--mm-accent));color:var(--mm-primary-text,#fff)}\r\n.mm button.mm-primary:hover:not(:disabled){background:var(--mm-primary-hover,#284f9f);border-color:var(--mm-primary-hover,#284f9f)}\r\n.mm-footer{display:flex;justify-content:space-between;gap:12px;padding:12px 28px;color:var(--mm-muted);font-size:11px;border-top:1px solid var(--mm-line)}\r\n.mm-launch{display:flex;align-items:center;gap:10px;min-height:36px;padding:8px;border:0;background:transparent;border-radius:7px;color:var(--dsw-alias-label-primary,#20232b);cursor:pointer;font:inherit;text-align:left}\r\n.mm-launch:hover{background:var(--dsw-alias-interactive-bg-hover,#f2f4f8)}\r\n.mm-main{min-width:0}\r\n.mm-business-rows{list-style:none;margin:0;padding:0;border-top:1px solid var(--mm-line)}\r\n.mm-task-overview{display:flex;gap:0;margin:0 0 16px;padding:10px 0;background:#edf3fb;border:1px solid #dce6f3;border-radius:8px;overflow:auto}\r\n.mm-task-overview span{display:flex;align-items:baseline;gap:6px;padding:0 16px;white-space:nowrap;color:#41536c;font-size:12px}\r\n.mm-task-overview span+span{border-left:1px solid #cfdbea}\r\n.mm-task-overview strong{font-size:19px;line-height:1.2;color:#1e3655;font-variant-numeric:tabular-nums}\r\n.mm-task-overview .mm-overview-attention strong{color:#a13e2d}\r\n.mm-business-rows .mm-business-row{background:#f1f4f5;transition:background .15s ease}\r\n.mm-business-rows .mm-business-row:hover{background:#dfe9ef}\r\n.mm-business-rows .mm-business-signals{padding-bottom:9px}\r\n.mm-business-rows button.mm-business-open{padding-top:10px;padding-bottom:10px}\r\n.mm-business-title strong{color:#1d2d44}\r\n.mm-alert-list .mm-alert{margin:10px 0;padding:15px 16px;background:#f1f4f5;border:1px solid #cbd6df;border-radius:8px}\r\n.mm-alert-list .mm-alert:has(.critical){background:#fff8f6;border-color:#ebc5bd}\r\n.mm-business-row{border-bottom:1px solid var(--mm-line)}\r\n.mm-list-filters{display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap}\r\n.mm-list-filters input{flex:1;min-width:130px}\r\n.mm-business-signals{padding:0 8px 14px;display:grid;gap:7px;font-size:12px}\r\n.mm-business-health,.mm-business-observation{display:flex;gap:8px 16px;flex-wrap:wrap;align-items:center}\r\n.mm-business-observation{color:var(--mm-muted);font-variant-numeric:tabular-nums}\r\n.mm-business-health button{padding:3px 7px;min-height:28px;font-size:12px;background:#fff3e7;color:#784714;border-color:#d7b590}\r\n.mm-business-health button.mm-signal-danger{background:#ffe8e3;color:#932d23;border-color:#d69a90}\r\n.mm-signal-warning{color:#765319;background:#fff3d9;padding:4px 7px;border-radius:4px}\r\n.mm-alert-scope{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:10px 0;font-size:13px}\r\n.mm button.mm-business-open{display:grid;grid-template-columns:minmax(200px,1.3fr) minmax(130px,.6fr) minmax(200px,1fr) auto;gap:10px 18px;width:100%;padding:16px 8px;border:0;border-radius:0;background:transparent;text-align:left;white-space:normal;align-items:center;justify-content:stretch}\r\n.mm button.mm-business-open:hover{background:var(--mm-hover)}\r\n.mm-business-title,.mm-business-activity{display:flex;flex-direction:column;gap:4px;min-width:0;overflow-wrap:anywhere}\r\n.mm-business-title strong{font-size:15px;font-weight:650}\r\n.mm-business-state{display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:12px;color:var(--mm-muted)}\r\n.mm-business-activity{font-size:12px;color:var(--mm-muted)}\r\n.mm-business-activity strong{color:var(--mm-text)}\r\n.mm-business-link{font-size:12px;color:var(--mm-accent);white-space:nowrap}\r\n.mm button.mm-task-back{min-height:32px;margin-bottom:10px;padding:4px 0;border:0;background:transparent;color:var(--mm-accent)}\r\n.mm button.mm-task-back:hover{text-decoration:underline}\r\n@media(max-width:800px){.mm button.mm-business-open{grid-template-columns:minmax(0,1fr) auto}.mm-business-activity{grid-column:1/-1}.mm-business-link{grid-column:1/-1}}\r\n@media(max-width:480px){.mm button.mm-business-open{grid-template-columns:minmax(0,1fr);gap:7px}.mm-business-activity,.mm-business-link{grid-column:auto}}\r\n.mm .mm-task-workspace{border-left:0;padding:12px 22px 22px}\r\n.mm-task-workspace-heading{display:flex;align-items:center;justify-content:space-between;gap:16px}\r\n.mm-task-workspace-heading>label{display:flex;align-items:center;gap:12px;min-width:0;flex:1;max-width:720px;font-size:12px;color:var(--mm-muted);white-space:nowrap}\r\n.mm-task-workspace-heading select{font-size:15px;font-weight:600;color:var(--mm-text);flex:1;max-width:620px}\r\n.mm-task-workspace-heading>.mm-actions{font-size:12px}\r\n.mm-task-facts{display:flex;gap:5px 14px;align-items:center;flex-wrap:wrap;margin:7px 0 9px;font-size:12px;color:var(--mm-muted)}\r\n.mm-task-facts>strong{font-weight:550;color:var(--mm-text)}\r\n.mm-hierarchy-disclosure{font-size:12px;margin-left:auto}\r\n.mm-hierarchy-disclosure>summary{cursor:pointer;display:list-item;width:fit-content;padding:4px 0}\r\n.mm-hierarchy-disclosure[open]{flex-basis:100%;margin-left:0;padding-bottom:14px;border-bottom:1px solid var(--mm-line)}\r\n.mm-hierarchy-disclosure .mm-task-hierarchy{margin-top:12px;max-width:700px;color:var(--mm-text)}\r\n.mm-active-work{padding:6px 11px;background:#e8f0fe;color:#23477d;border:1px solid #c9dafa;border-radius:6px;font-size:12px;margin:0 0 8px;min-width:0}\r\n.mm-active-work>div{display:grid;grid-template-columns:minmax(120px,max-content) minmax(0,1fr) auto;align-items:center;gap:8px 16px}\r\n.mm-active-work>div+div{margin-top:10px}\r\n.mm-active-work>div>div{display:flex;gap:10px;align-items:center;flex-wrap:wrap}\r\n.mm-active-work p{min-width:0;overflow-wrap:anywhere;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}\r\n.mm .mm-view-switcher{margin:5px 0 10px;align-items:center;gap:24px}\r\n.mm .mm-view-switcher button{border:0;border-radius:5px;padding:6px 12px;min-height:32px}\r\n.mm .mm-view-switcher button[aria-current]{background:#e5edfc;color:#214d9e;font-weight:650}\r\n.mm .mm-view-switcher button[aria-current]:hover{background:#dbe7fb}\r\n.mm-view-switcher>.mm-muted{margin-left:auto}\r\n.mm-relation-workspace{min-width:0}\r\n.mm-relation-workspace.has-inspector{display:grid;grid-template-columns:minmax(260px,2fr) minmax(540px,3fr);gap:24px;align-items:start}\r\n.mm-relation-workspace.has-inspector.trace-focused{display:block}\r\n.mm-relation-workspace.has-inspector.trace-focused>.mm-relation-canvas{display:none}\r\n.mm-relation-workspace.has-inspector.trace-focused>.mm-run-inspector{border-left:0;padding-left:0}\r\n.mm-relation-workspace.has-inspector:not(.trace-focused){height:clamp(440px,calc(100dvh - 310px),900px);grid-template-rows:minmax(0,1fr);align-items:stretch}\r\n.mm-relation-workspace.has-inspector:not(.trace-focused)>.mm-relation-canvas,.mm-relation-workspace.has-inspector:not(.trace-focused)>.mm-run-inspector{min-height:0;max-height:100%;overflow:auto;overscroll-behavior:contain;scrollbar-width:thin}\r\n.mm-relation-canvas{min-width:0}\r\n.mm-run-inspector{min-width:0;border-left:1px solid var(--mm-line);padding-left:24px}\r\n.mm-run-inspector>.mm-section-heading{margin-bottom:16px;scroll-margin-top:10px}\r\n.mm-run-inspector h2{scroll-margin-top:12px}\r\n.mm-run-inspector .mm-run-picker{margin:0 0 20px}\r\n.mm-run-inspector .mm-error{margin:12px 0!important}\r\n@container(max-width:1000px){.mm-relation-workspace.has-inspector,.mm-relation-workspace.has-inspector:not(.trace-focused){display:block;height:auto}.mm-relation-workspace.has-inspector>.mm-relation-canvas{display:none}.mm-relation-workspace.has-inspector>.mm-run-inspector{max-height:none;overflow:visible;overscroll-behavior:auto;border-left:0;padding-left:0}.mm-evidence-switch button:last-child{display:none}}\r\n@media(max-width:640px){.mm .mm-task-workspace{padding:16px}.mm-task-workspace-heading{align-items:flex-start;flex-direction:column;gap:10px}.mm-task-workspace-heading>label{width:100%;gap:8px}.mm-task-workspace-heading select{font-size:14px}.mm-task-facts{gap:6px 12px}.mm-active-work>div{grid-template-columns:minmax(0,1fr) auto;gap:8px}.mm-active-work>div>p{grid-column:1/-1;grid-row:2}.mm .mm-view-switcher{gap:22px;flex-wrap:wrap}.mm-view-switcher>.mm-muted{flex-basis:100%;margin:0 0 7px}.mm-run-inspector>.mm-section-heading{align-items:center}}\r\n.mm-group-scope{max-width:75ch;margin-bottom:20px!important}\r\n.mm-task-group{padding:20px 0 24px;border-top:1px solid var(--mm-line);min-width:0}\r\n.mm-task-heading{display:flex;align-items:flex-start;gap:14px}\r\n.mm-task-heading .mm-issue-button{flex:1}\r\n.mm-task-heading .mm-issue-button strong{font-size:16px;font-weight:650}\r\n.mm-task-heading>.mm-badge{margin-top:20px;flex-shrink:0}\r\n.mm-task-counts{display:flex;align-items:center;gap:5px 14px;flex-wrap:wrap;font-size:12px;color:var(--mm-muted);margin:10px 0 16px}\r\n.mm-task-counts strong{color:var(--mm-text);font-weight:550}\r\n.mm button.mm-text-button{border:0;background:transparent;padding:4px 0;min-height:32px;color:var(--mm-accent);white-space:normal;text-align:left;justify-content:flex-start}\r\n.mm button.mm-text-button:hover{text-decoration:underline;text-underline-offset:3px}\r\n.mm-agent-group{margin-top:20px}\r\n.mm-agent-group>h3{display:flex;align-items:baseline;gap:12px;flex-wrap:wrap;margin-bottom:4px;font-size:14px;overflow-wrap:anywhere}\r\n.mm-agent-group>h3>span{font-size:11px;font-weight:400;color:var(--mm-muted)}\r\n.mm-grouped-run{padding:10px 0 12px 14px;border-left:1px solid var(--mm-line);min-width:0}\r\n.mm-grouped-run+.mm-grouped-run{margin-top:6px}\r\n.mm-grouped-run-meta{display:flex;gap:4px 12px;align-items:center;flex-wrap:wrap;margin-bottom:7px}\r\n.mm-grouped-run-meta .mm-run-id{font-size:12px;font-variant-numeric:tabular-nums}\r\n.mm-grouped-run .mm-run-progress{font-size:12px}\r\n.mm-parent-note{padding:6px 0;font-size:12px;overflow-wrap:anywhere}\r\n.mm-task-children{margin:24px 0 0 8px;border-left:1px solid var(--mm-line);padding-left:18px}\r\n.mm-task-child:last-child{padding-bottom:0}\r\n.mm-task-children .mm-task-children .mm-task-children{margin-left:0;padding-left:8px}\r\n.mm-detail-tabs{display:flex;gap:18px;margin:20px 0;border-bottom:1px solid var(--mm-line)}\r\n.mm-detail-tabs button{border:0;border-radius:0;border-bottom:2px solid transparent;padding:8px 0;color:var(--mm-muted)}\r\n.mm-detail-tabs button[aria-current]{border-bottom-color:var(--mm-accent);color:var(--mm-text);font-weight:650}\r\n@media(max-width:640px){.mm-task-heading{gap:8px}.mm-task-heading .mm-issue-button strong{font-size:15px}.mm-task-counts{gap:4px 10px}.mm-task-children{margin-left:3px;padding-left:10px}.mm-grouped-run{padding-left:10px}}\r\n.mm-runs-table{table-layout:fixed;min-width:640px}\r\n.mm-runs-table th:nth-child(1){width:26%}\r\n.mm-runs-table th:nth-child(2){width:12%}\r\n.mm-runs-table th:nth-child(3){width:18%}\r\n.mm-runs-table th:nth-child(4){width:44%}\r\n.mm-progress-summary{display:flex;flex-direction:column;align-items:flex-start;gap:4px;min-width:0;overflow-wrap:anywhere}\r\n.mm-progress-summary>small{margin-top:0}\r\n.mm-action-preview{font-weight:550;line-height:1.6;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}\r\n.mm-plan-counts{font-size:12px;color:var(--mm-muted);font-variant-numeric:tabular-nums}\r\n.mm button.mm-evidence-link{min-height:28px;border:0;border-radius:3px;background:transparent;color:var(--mm-accent);font-size:12px;padding:3px 0;text-align:left;text-decoration:underline;text-underline-offset:3px;white-space:normal}\r\n.mm button.mm-evidence-link:hover{color:var(--mm-text);background:var(--mm-hover)}\r\n.mm-work-progress{margin:24px 0;font-size:13px;overflow-wrap:anywhere}\r\n.mm-work-progress .mm-section-heading{gap:12px;align-items:flex-start;flex-wrap:wrap}\r\n.mm-work-progress .mm-section-heading>.mm-muted{font-size:11px}\r\n.mm-work-progress h4{font-size:13px;font-weight:600;margin:0}\r\n.mm-work-progress p{max-width:75ch}\r\n.mm-current-action{background:var(--mm-hover);padding:14px 16px;margin:16px 0}\r\n.mm-current-action .mm-section-heading{margin-bottom:6px}\r\n.mm-current-action>p{font-size:14px;line-height:1.7;white-space:pre-wrap;margin:0 0 7px}\r\n.mm-work-evidence{display:flex;gap:10px;align-items:center;flex-wrap:wrap;font-size:11px;color:var(--mm-muted);font-variant-numeric:tabular-nums}\r\n.mm-work-evidence time{overflow-wrap:anywhere}\r\n.mm-agent-statement{margin:18px 0;color:var(--mm-muted)}\r\n.mm-agent-statement summary,.mm-extra-actions summary,.mm-unconfirmed summary{cursor:pointer;padding:6px 0}\r\n.mm-agent-statement p{white-space:pre-wrap;color:var(--mm-text);margin:10px 0}\r\n.mm-plan-heading{display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;align-items:baseline;margin-top:24px}\r\n.mm-plan-source{font-size:12px;margin:8px 0 12px}\r\n.mm-work-items{list-style:none;padding:0;margin:0}\r\n.mm-work-item{display:grid;grid-template-columns:58px minmax(0,1fr);align-items:start;gap:12px;padding:13px 0;border-bottom:1px solid var(--mm-line)}\r\n.mm-work-item strong{font-weight:550;line-height:1.65}\r\n.mm-work-item small{display:block;color:var(--mm-muted)}\r\n.mm-plan-status{font-size:12px;padding:2px 0;color:var(--mm-muted)}\r\n.mm-work-item.in_progress .mm-plan-status{color:var(--mm-accent);font-weight:600}\r\n.mm-work-item.completed .mm-plan-status{color:var(--mm-text)}\r\n.mm-work-item.unknown .mm-plan-status{color:var(--mm-text);text-decoration:underline;text-decoration-style:dotted;text-underline-offset:4px}\r\n.mm-plan-empty{padding:16px 0;color:var(--mm-muted)}\r\n.mm-work-warnings{padding-left:18px;margin:14px 0;font-size:12px;color:var(--mm-muted)}\r\n.mm-unconfirmed,.mm-extra-actions{font-size:12px;margin:12px 0}\r\n.mm-unconfirmed ul,.mm-extra-actions ul{padding-left:18px}\r\n.mm-unconfirmed li,.mm-extra-actions li{padding:7px 0}\r\n.mm-unconfirmed small{display:block;color:var(--mm-muted)}\r\n.mm-extra-actions .mm-evidence-link{margin-left:8px}\r\n.mm-reported-progress{padding:12px 0;border-bottom:1px solid var(--mm-line)}\r\n.mm-reported-progress p{margin:8px 0}\r\n.mm-selected-evidence{border:1px solid var(--mm-line);padding:16px;margin:20px 0;scroll-margin:16px;overflow-wrap:anywhere}\r\n.mm-selected-evidence:focus{outline:2px solid var(--mm-accent);outline-offset:3px}\r\n.mm-evidence-content{max-height:420px;overflow:auto;scrollbar-width:thin}\r\n.mm-raw-log-section>summary{cursor:pointer;padding:8px 0;font-weight:550;display:list-item}\r\n.mm-raw-log-section>summary .mm-muted{display:block;font-size:11px;font-weight:400;margin-top:4px}\r\n.mm-raw-log-section .mm-muted{font-size:12px}\r\n.mm-work-progress ::selection,.mm-selected-evidence ::selection{background:var(--mm-accent);color:var(--mm-bg)}\r\n@media(min-width:1051px) and (max-width:1250px){.mm-body.has-detail{grid-template-columns:minmax(0,1fr)}.mm-body.has-detail .mm-main{display:none}.mm-detail{border-left:0}}\r\n@media(max-width:640px){.mm-work-item{grid-template-columns:52px minmax(0,1fr);gap:8px}.mm-work-progress .mm-section-heading{display:block}.mm-work-progress .mm-section-heading>.mm-muted{display:block;margin-top:5px}.mm-current-action{padding:12px}.mm-selected-evidence{padding:12px}.mm-work-evidence{gap:4px 10px}}\r\n.mm-numeric{font-variant-numeric:tabular-nums;white-space:nowrap}\r\n.mm-checks{display:flex;gap:24px;flex-wrap:wrap;margin:18px 0 8px}\r\n.mm-checks label{display:flex;align-items:center;gap:8px}\r\n.mm-checks input{width:16px;min-height:16px;height:16px;accent-color:var(--mm-accent)}\r\n.mm-thresholds{margin:18px 0}\r\n.mm-thresholds summary{cursor:pointer;margin-bottom:12px}\r\n.mm-alert{padding:22px 0;border-bottom:1px solid var(--mm-line)}\r\n.mm-alert-rules{margin:4px 0 26px;padding:16px 18px;background:#f3f6fc;border:1px solid #d9e2f0;border-radius:8px}\r\n.mm-alert-current-state{margin:12px 0 18px;padding:12px 14px;border:1px solid var(--mm-line);border-radius:6px;background:var(--mm-surface,var(--mm-bg));font-size:14px;line-height:1.55}\r\n.mm-history-group{margin-top:10px;border:1px solid var(--mm-line);border-radius:6px;background:var(--mm-surface,var(--mm-bg));overflow:hidden}\r\n.mm-history-group-summary{display:flex;align-items:center;gap:6px 14px;flex-wrap:wrap;list-style:none;cursor:pointer;padding:11px 14px;font-size:13px;line-height:1.5;overflow-wrap:anywhere}\r\n.mm-history-group-summary::-webkit-details-marker{display:none}\r\n.mm-history-group-summary::before{content:'\u25B8';color:var(--mm-muted);font-size:12px;flex:none}\r\n.mm-history-group[open]>.mm-history-group-summary::before{transform:rotate(90deg)}\r\n.mm-history-group-summary>strong{flex:1 1 220px;min-width:0}\r\n.mm-history-group-summary>span:first-of-type{flex:1 1 170px;min-width:0}\r\n.mm-history-group-summary>span:not(:first-of-type),.mm-history-group-summary>time{color:var(--mm-muted);font-size:12px;font-variant-numeric:tabular-nums}\r\n.mm-history-group-summary:hover{background:var(--mm-hover)}\r\n.mm-history-group[open]>.mm-history-group-summary{border-bottom:1px solid var(--mm-line);font-weight:600}\r\n.mm-history-group-body{padding:8px 14px 14px}\r\n.mm-history-group-body .mm-alert{margin:8px 0}\r\n.mm-alert-rules-summary{display:flex;align-items:center;gap:8px 12px;flex-wrap:wrap;list-style:none;cursor:pointer;padding:11px 14px;font-size:13px;font-weight:600;line-height:1.5}\r\n.mm-alert-rules-summary::-webkit-details-marker{display:none}\r\n.mm-alert-rules-summary::before{content:'\u25B8';color:var(--mm-muted);font-size:12px;flex:none}\r\n.mm-alert-rules[open]>.mm-alert-rules-summary::before{transform:rotate(90deg)}\r\n.mm-alert-rules-summary>strong{flex:1 1 150px}\r\n.mm-alert-rules-summary>span{color:var(--mm-muted);font-size:12px;font-weight:400}\r\n.mm-alert-rules-summary:hover{background:var(--mm-hover)}\r\n.mm-alert-rules-body{padding:14px}\r\ndetails.mm-alert-rules{padding:0;overflow:hidden}\r\ndetails.mm-alert-rules[open]>.mm-alert-rules-summary{border-bottom:1px solid var(--mm-line)}\r\n.mm-alert-rules-head{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:12px}\r\n.mm-alert-rules-head p{margin-top:3px}\r\n.mm-alert-rule-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 24px}\r\n.mm-alert-rule{display:grid;grid-template-columns:100px minmax(0,1fr);gap:10px;padding:10px 0;border-top:1px solid #dce4ef;font-size:12px;line-height:1.5}\r\n.mm-alert-rule strong{font-weight:650;color:#273f66}\r\n.mm-alert-rule small{display:block;margin-top:3px;color:#546276;font-size:11px}\r\n.mm-alert-rule-note{margin-top:12px!important}\r\n.mm-alert-rule-form{padding-top:16px;margin-top:8px;border-top:1px solid #dce4ef}\r\n.mm-alert-rule-form label{display:flex;flex-direction:column;gap:5px;font-size:12px}\r\n.mm-alert-rule-form p{margin:10px 0!important}\r\n.mm-alert-rule-form .mm-actions{margin-top:12px}\r\n.mm-alert-group-title{margin:24px 0 0!important;font-size:14px!important}\r\n.mm-alert-context{display:flex;gap:5px 12px;flex-wrap:wrap;margin:7px 0!important;font-size:12px;overflow-wrap:anywhere}\r\n.mm-alert-context strong{font-weight:600}\r\n.mm-alert-context span{color:var(--mm-muted)}\r\n.mm-alert-verification{padding:8px 10px;background:#fff3d9;color:#765319;border-radius:4px;font-size:12px;margin:10px 0!important}\r\n@container(max-width:740px){.mm-alert-rule-list{grid-template-columns:1fr}.mm-alert-rules{padding:14px}.mm-alert-rules-head{align-items:flex-start}}\r\n.mm-alert .mm-section-heading{margin-bottom:7px}\r\n.mm-alert h3{display:flex;align-items:center;gap:8px}\r\n.mm-alert.resolved{opacity:.8}\r\n.mm-alert-dot{display:inline-block;width:8px;height:8px;flex-shrink:0;border-radius:50%;background:#b67c26}\r\n.mm-alert-dot.critical{background:#bd4941}\r\n.mm-evidence{padding-left:19px;margin:14px 0;font-size:13px}\r\n.mm-evidence li+li{margin-top:5px}\r\n.mm-diagnosis{border:1px solid var(--mm-line);border-radius:5px;padding:12px 14px;margin:16px 0;font-size:13px;white-space:pre-wrap;overflow-wrap:anywhere}\r\n.mm-diagnosis p+p{margin-top:8px}\r\n.mm-eyebrow{display:block;font-size:11px;color:var(--mm-muted);margin-bottom:5px}\r\n.mm-metrics{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px 18px;padding:12px 0 20px}\r\n.mm-metrics-primary{grid-template-columns:repeat(auto-fit,minmax(180px,1fr))}\r\n.mm-metrics>div{display:flex;flex-direction:column;gap:5px;min-width:0}\r\n.mm-metrics span,.mm-metrics small{font-size:12px;color:var(--mm-muted)}\r\n.mm-metrics strong{font-size:24px;line-height:1.4;font-weight:600;font-variant-numeric:tabular-nums;overflow-wrap:anywhere}\r\n.mm-metrics.compact strong{font-size:19px}\r\n.mm-metric-coverage{margin:10px 0 14px;padding:10px 13px;border:1px solid var(--mm-line);border-radius:6px;background:var(--mm-surface,var(--mm-bg));font-size:13px;line-height:1.55}\r\n.mm-metric-empty{margin:0 0 12px;color:var(--mm-muted);font-size:12px;line-height:1.55}\r\n.mm-metric-details{margin-top:12px;border-top:1px solid var(--mm-line)}\r\n.mm-metric-details>summary{cursor:pointer;padding:10px 0;color:var(--mm-text);font-size:13px;font-weight:600}\r\n.mm-metric-details>summary:hover{color:var(--mm-accent)}\r\n.mm-metric-section{margin-top:28px;padding-top:22px;border-top:1px solid var(--mm-line)}\r\n.mm-metric-section h3{margin-bottom:16px}\r\n.mm-metric-section p+p{margin-top:7px}\r\n.mm-run-actions{margin:18px 0}\r\n.mm-run-action-strip{display:flex;align-items:center;justify-content:space-between;gap:8px 12px;flex-wrap:wrap;margin:12px 0;padding:10px 12px;border:1px solid var(--mm-line);border-radius:5px;background:var(--mm-surface,var(--mm-bg))}\r\n.mm-run-action-strip>span{display:flex;align-items:center;gap:6px;flex-wrap:wrap;min-width:0;font-size:13px}\r\n.mm-run-action-strip .mm-run-actions{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:0}\r\n.mm-settings-danger{margin-top:24px;padding-top:14px;border-top:1px solid var(--mm-line)}\r\n.mm-settings-danger>button{border-color:var(--mm-danger-border);color:var(--mm-danger-text);background:transparent}\r\n.mm-settings-confirm,.mm-settings-discard{padding:13px 15px;border:1px solid var(--mm-wait-border);border-radius:6px;background:var(--mm-wait-bg);color:var(--mm-text);font-size:13px;line-height:1.55}\r\n.mm-settings-confirm{margin-top:12px}\r\n.mm-settings-discard{margin:0 28px 16px}\r\n.mm-settings-confirm p,.mm-settings-discard p{margin:0 0 10px}\r\n.mm-settings-confirm .mm-actions button:first-child{border-color:var(--mm-danger-border);background:var(--mm-danger-bg);color:var(--mm-danger-text)}\r\n.mm-settings-confirm .mm-actions button:last-child,.mm-settings-discard .mm-actions button:last-child{background:var(--mm-surface,var(--mm-bg));color:var(--mm-text)}\r\n.mm-table-scroll-hint{display:none;color:var(--mm-muted);font-size:12px;margin:0 18px 5px!important}\r\n@container(max-width:640px){.mm-table-scroll-hint{display:block}.mm-settings-discard{margin-inline:16px}}\r\n.mm-confirm{padding:16px;border:1px solid var(--mm-line);border-radius:7px;margin-top:14px;background:var(--mm-hover)}\r\n.mm-confirm-backdrop{position:fixed;inset:0;z-index:1000;display:grid;place-items:center;padding:24px;background:rgba(0,0,0,.56);overscroll-behavior:contain}\r\n.mm-confirm-backdrop .mm-confirm{width:min(100%,480px);max-height:calc(100dvh - 48px);overflow:auto;margin:0;background:var(--mm-surface,var(--mm-bg));box-shadow:0 16px 48px rgba(0,0,0,.24)}\r\n.mm-confirm p{margin:10px 0;overflow-wrap:anywhere;font-size:13px}\r\n.mm-unread{font-size:11px;background:#fff0ee;color:#a23a38;padding:0 5px;border-radius:9px;font-variant-numeric:tabular-nums}\r\n.mm-toast{position:absolute;z-index:79;bottom:24px;right:24px;max-width:min(540px,calc(100% - 32px));padding:16px;display:flex;gap:12px;align-items:center;background:var(--dsw-alias-bg-base,#fff);color:var(--dsw-alias-label-primary,#20232b);border:1px solid var(--dsw-alias-border-l2,#e1e4e9);border-radius:10px;box-shadow:0 5px 24px #0002;font:13px/1.5 inherit;pointer-events:auto}\r\n.mm-toast p{margin:5px 0 0;font-size:12px;overflow-wrap:anywhere}\r\n.mm-toast button{flex-shrink:0;background:transparent;color:inherit;border:1px solid var(--dsw-alias-border-l2,#e1e4e9);border-radius:5px;padding:7px;cursor:pointer}\r\n\r\n/* Monitoring workspace: dark navigation and muted, high-contrast data surfaces. */\r\n.mm-header{background:#25374b;color:#f3f7fb;border-color:#3a4e63}\r\n.mm-header p,.mm-header .mm-muted{color:#c1cfdd}\r\n.mm-header button{background:#344a60;border-color:#52677b;color:#f3f7fb}\r\n.mm-header button:hover{background:#435e76}\r\n.mm-connection-details{background:#30455a;color:#e0eaf3;border-color:#40586d}\r\n.mm-connection-details .mm-muted{color:#c4d2df}\r\n.mm-tabs{background:#30455a;border-color:#40586d;gap:22px}\r\n.mm-tabs button{background:transparent;color:#c4d2df;border-bottom-color:transparent}\r\n.mm-tabs button:hover{background:#3d556b;color:#fff}\r\n.mm-tabs button[aria-current]{color:#fff;border-bottom-color:#80b4ff}\r\n.mm-task-overview{background:#d5e1eb;border-color:#b9cbd9}\r\n.mm-business-rows{border:1px solid #c4d1da;border-radius:8px;overflow:hidden}\r\n.mm-business-rows .mm-business-row{background:#e7eef2;border-color:#cbd7df}\r\n.mm-business-rows .mm-business-row:hover{background:#d7e5ee}\r\n.mm-list-filters input,.mm-list-filters select{background:#f0f4f6;border-color:#b8c9d5}\r\n.mm-footer{background:#dce6ec}\r\n@media(max-width:1050px){.mm-body.has-detail{grid-template-columns:minmax(0,1fr)}.mm-body.has-detail .mm-list{display:none}.mm-detail{border-left:0}.mm-logs{max-height:none}}\r\n@media(max-width:1050px){.mm-body.has-detail .mm-main{display:none}}\r\n@container(max-width:720px){.mm-metrics{grid-template-columns:repeat(2,minmax(0,1fr))}.mm-tabs{overflow:auto;gap:18px}.mm-tabs button{flex-shrink:0}.mm-toast{bottom:16px;right:16px;flex-wrap:wrap}.mm-toast div{flex-basis:100%}}\r\n@container(max-width:640px){.mm-header{padding:18px 16px;gap:10px}.mm h1{font-size:19px}.mm-header .mm-actions{gap:5px}.mm-toolbar{padding:16px;flex-wrap:wrap}.mm-workspace{flex:1;max-width:none}.mm-sync{order:3;width:100%;margin:0}.mm-summary,.mm-tabs{padding-left:16px;padding-right:16px}.mm-summary{gap:12px}.mm-list,.mm-detail,.mm-runtime-table,.mm-settings{padding:18px 16px}.mm-form-grid{grid-template-columns:1fr}.mm-token{grid-column:auto}.mm-footer{padding:10px 16px}.mm-footer span:last-child{max-width:65%}.mm-error,.mm-notice{margin-left:16px!important;margin-right:16px!important}.mm-run-info{gap:12px}.mm td{padding-left:7px;padding-right:7px}}\r\n";

// src/task-timeline.css
var task_timeline_default = '.mm-task-relationships{font-size:13px;min-width:0;overflow-wrap:anywhere}\n.mm .mm-task-relationship-summary{display:flex;flex-wrap:wrap;gap:4px 14px;margin:0 0 22px;font-size:12px;font-variant-numeric:tabular-nums}\n.mm-task-relationship-summary strong{font-weight:550}\n.mm-task-relationship-summary>span{color:var(--mm-muted)}\n.mm-task-relationships>section+section{margin-top:28px;padding-top:23px;border-top:1px solid var(--mm-line)}\n.mm-task-relationships h3{margin:0 0 12px}\n.mm-task-section-heading{display:flex;align-items:baseline;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-bottom:10px}\n.mm-task-section-heading h3{margin:0}\n.mm-task-section-heading>span,.mm-task-coverage,.mm-task-timeline-note,.mm-task-edge-evidence{font-size:12px;color:var(--mm-muted)}\n.mm .mm-task-coverage{margin:10px 0;max-width:75ch}\n.mm .mm-task-timeline-note{margin:0 0 12px;max-width:75ch}\n.mm-task-parent{display:flex;align-items:flex-start;gap:12px;margin:15px 0 8px}\n.mm-task-relation-label{display:block;color:var(--mm-muted);font-size:11px;white-space:nowrap;padding-top:8px;flex-shrink:0}\n.mm .mm-task-node{display:flex;flex:1;flex-direction:column;align-items:flex-start;justify-content:flex-start;text-align:left;gap:3px;padding:7px 9px;min-width:0;min-height:0;white-space:normal;border:0;border-radius:4px;font-size:13px;line-height:1.5;background:transparent}\n.mm button.mm-task-node:hover{background:var(--mm-hover)}\n.mm-task-node strong{font-weight:550;overflow-wrap:anywhere}\n.mm-task-node small,.mm-task-node-key{font-size:11px;color:var(--mm-muted)}\n.mm-task-node-key{display:flex;align-items:center;gap:8px;flex-wrap:wrap}\n.mm-task-node-key>span{font-weight:550;color:var(--mm-text)}\n.mm .mm-task-node.is-current{background:var(--mm-hover)}\n.mm-task-current-branch{margin-top:10px}\n.mm-task-current-branch.has-parent{margin-left:22px;border-left:1px solid var(--mm-line);padding-left:16px}\n.mm-hierarchy-children{list-style:none;padding:0 0 0 16px;margin:5px 0 0 17px;border-left:1px solid var(--mm-line)}\n.mm-hierarchy-children>li{display:flex;gap:10px;align-items:flex-start;position:relative;padding-top:5px}\n.mm-hierarchy-children>li:before{content:"";position:absolute;left:-17px;top:24px;width:12px;height:1px;background:var(--mm-line)}\n.mm-task-concurrency{display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;margin:14px 0 12px;font-size:12px}\n.mm-task-concurrency strong{font-weight:550}\n.mm-task-concurrency time{color:var(--mm-muted);font-variant-numeric:tabular-nums}\n.mm-task-timeline-scroll{overflow:auto;scrollbar-color:var(--dsw-alias-scrollbar-bg-l2,#b6bdca) transparent;scrollbar-width:thin;padding-bottom:7px}\n.mm-task-timeline-canvas{min-width:460px}\n.mm-timeline-axis{display:grid;grid-template-columns:114px minmax(0,1fr);gap:12px;font-size:10px;color:var(--mm-muted);padding:0 8px 8px;border-bottom:1px solid var(--mm-line);font-variant-numeric:tabular-nums}\n.mm-timeline-axis>div{display:flex;justify-content:space-between;gap:8px;white-space:nowrap}\n.mm-timeline-agents,.mm-timeline-runs{list-style:none;padding:0;margin:0}\n.mm-timeline-agents>li+li{margin-top:14px}\n.mm-timeline-agent-heading{display:flex;align-items:baseline;gap:10px;padding:13px 8px 7px}\n.mm-timeline-agent-heading strong{font-weight:550;font-size:13px;overflow-wrap:anywhere}\n.mm-timeline-agent-heading>span{color:var(--mm-muted);font-size:11px;flex-shrink:0}\n.mm button.mm-timeline-run{display:grid;grid-template-columns:114px minmax(0,1fr);width:100%;align-items:center;justify-content:normal;text-align:left;gap:12px;min-height:59px;padding:8px;border:0;border-radius:4px;white-space:normal;background:transparent}\n.mm button.mm-timeline-run:hover{background:var(--mm-hover)}\n.mm button.mm-timeline-run.is-selected{background:var(--mm-hover);box-shadow:inset 0 0 0 1px var(--mm-line)}\n.mm button.mm-timeline-run.is-selected .mm-timeline-run-label>span{font-weight:650}\n.mm-timeline-run-label{display:flex;flex-direction:column;align-items:flex-start;gap:2px;min-width:0;font-size:12px;font-variant-numeric:tabular-nums}\n.mm-timeline-run-label small{font-size:11px;color:var(--mm-muted)}\n.mm-timeline-run-label .is-running{color:var(--mm-accent)}\n.mm-timeline-run-label .is-failed{color:#a23a38}\n.mm-timeline-interval{min-width:0;display:flex;flex-direction:column;gap:6px}\n.mm-timeline-track{display:block;position:relative;height:12px;width:100%}\n.mm-timeline-track:before{content:"";position:absolute;inset:6px 0 auto;height:1px;background:var(--mm-line)}\n.mm-timeline-bar{position:absolute;top:1px;height:10px;min-width:2px;border-radius:2px;background:var(--mm-muted)}\n.mm-timeline-bar.is-running{background:var(--mm-accent)}\n.mm-timeline-bar.is-failed{background:#a23a38}\n.mm-timeline-bar.is-point{width:2px!important;border-radius:0}\n.mm-timeline-time{display:flex;gap:6px;justify-content:space-between;align-items:baseline;color:var(--mm-muted);font-size:10px;font-variant-numeric:tabular-nums;flex-wrap:wrap}\n.mm-timeline-no-time{font-size:12px;color:var(--mm-muted)}\n.mm-task-run-relations{list-style:none;margin:0;padding:0}\n.mm-task-run-relations>li{padding:10px 0;border-bottom:1px solid var(--mm-line)}\n.mm-task-run-relations>li:last-child{border-bottom:0}\n.mm-task-run-edge{display:grid;grid-template-columns:minmax(0,1fr) 52px minmax(0,1fr);gap:10px;align-items:center}\n.mm .mm-task-run-link{display:block;min-height:32px;text-align:left;padding:2px 0;border:0;border-radius:3px;background:transparent;white-space:normal;overflow-wrap:anywhere;font-size:12px;line-height:1.6;color:var(--mm-accent);text-decoration:underline;text-underline-offset:3px}\n.mm .mm-task-run-link:hover{background:var(--mm-hover);color:var(--mm-text)}\n.mm-task-edge-label{display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:11px;color:var(--mm-muted);gap:1px}\n.mm-task-unloaded-run{font-size:12px;color:var(--mm-muted)}\n.mm-task-unresolved-source{display:flex;flex-direction:column;align-items:flex-start;gap:3px}\n.mm-task-unresolved-source>span{font-size:11px;color:var(--mm-muted)}\n.mm .mm-task-edge-evidence{margin:4px 0 0;font-size:11px;font-variant-numeric:tabular-nums}\n.mm-task-extra-relations{margin-top:15px;font-size:12px}\n.mm-task-extra-relations>summary{cursor:pointer;padding:7px 0;color:var(--mm-muted)}\n.mm .mm-task-dependency-note{margin-top:22px;padding-top:16px;border-top:1px solid var(--mm-line);font-size:12px;color:var(--mm-muted);max-width:75ch}\n@media(max-width:640px){.mm-task-run-edge{grid-template-columns:minmax(0,1fr) 46px minmax(0,1fr);gap:6px}.mm-task-current-branch.has-parent{margin-left:12px;padding-left:12px}.mm-hierarchy-children{margin-left:12px;padding-left:12px}.mm-hierarchy-children>li:before{left:-13px;width:8px}.mm-task-parent{gap:8px}.mm-hierarchy-children>li{gap:6px}.mm-task-section-heading{gap:4px 8px}.mm-task-relationships>section+section{margin-top:24px;padding-top:20px}}\n';

// src/call-graph.css
var call_graph_default = '.mm-call-graph{min-width:0;font-size:13px}\n.mm-call-participation{margin-bottom:10px;border:1px solid var(--mm-line);border-radius:5px;background:var(--mm-surface,var(--mm-bg));overflow:hidden}\n.mm-call-participation>summary{cursor:pointer;padding:8px 12px;color:var(--mm-muted);font-size:12px}\n.mm-call-participation>summary:hover{background:var(--mm-hover);color:var(--mm-text)}\n.mm-call-participation[open]>summary{border-bottom:1px solid var(--mm-line);color:var(--mm-text)}\n.mm .mm-call-participation .mm-call-edge-detail{max-height:360px;overflow:auto;margin:0;border:0;border-radius:0;background:transparent}\n.mm-call-toolbar{display:flex;align-items:center;justify-content:space-between;gap:8px 16px;flex-wrap:wrap;margin-bottom:8px}\n.mm-call-description strong{font-size:14px;font-weight:600;font-variant-numeric:tabular-nums}\n.mm-call-description p{margin-top:4px!important;font-size:12px;color:var(--mm-muted)}\n.mm-call-zoom{display:flex;align-items:center;gap:5px;flex-wrap:wrap}\n.mm .mm-call-zoom button{min-height:32px;border-radius:5px;padding:5px 8px;font-size:12px;font-variant-numeric:tabular-nums}\n.mm-call-legend{display:flex;align-items:center;gap:8px 15px;flex-wrap:wrap;font-size:12px;margin-bottom:8px;color:var(--mm-muted)}\n.mm-call-legend>span{display:inline-flex;align-items:center;gap:5px}\n.mm-call-legend .mm-call-scroll-hint{margin-left:auto}\n.mm-call-viewport{height:clamp(260px,calc(100dvh - 310px),640px);overflow:auto;border:1px solid #d5dce8;border-radius:9px;background:#f5f7fb;scrollbar-color:#8998af #e8edf4;scrollbar-width:auto;overscroll-behavior:contain;scroll-margin-top:8px}\n.mm-call-scaled-space{position:relative;min-width:100%}\n.mm-call-canvas{position:absolute;inset:0 auto auto 0;transform-origin:top left}\n.mm-call-lines{position:absolute;inset:0;overflow:visible;pointer-events:none}\n.mm-call-edge-hit{fill:none;stroke:transparent;stroke-width:20;pointer-events:stroke;cursor:pointer}\n.mm-call-edge-hit:focus-visible{stroke:#245cc6;stroke-opacity:.35;outline:none}\n.mm-call-edge-preview{pointer-events:all;cursor:pointer}\n.mm-call-lines g[role=button]:focus-visible{outline:none}\n.mm-call-lines g[role=button]:focus-visible .mm-call-edge-hit{stroke:#245cc6;stroke-opacity:.35}\n.mm-call-edge-preview rect{fill:#f5f7fb;stroke:#c8d2e1;stroke-width:1}\n.is-connected .mm-call-edge-preview rect{fill:#e7f0ff;stroke:#8cabdf}\n.mm-graph-filters{display:flex;gap:6px 10px;flex-wrap:wrap;align-items:center;margin:8px 0;font-size:12px}\n.mm .mm-graph-filters select{width:auto;max-width:190px;min-height:32px;padding:5px 8px;font-size:12px}\n.mm .mm-graph-filters input:not([type=checkbox]){min-height:32px;padding:5px 8px;font-size:12px}\n.mm .mm-graph-filters input[type=checkbox]{width:15px;min-height:15px;margin:0}\n.mm-graph-filters input:not([type=checkbox]){max-width:200px;min-width:100px}\n.mm-graph-filters label{display:flex;gap:6px;align-items:center}\n.mm-graph-filters details{position:relative}\n.mm-graph-filters details label{margin:6px 0}\n.mm-graph-filters small{max-width:240px;display:block;color:var(--mm-muted)}\n.mm-call-filter-result{font-size:12px;color:var(--mm-muted);margin:8px 0!important}\n.mm-call-workbench{display:grid;min-width:0;gap:10px}\n.mm-call-workbench.has-edge{grid-template-columns:minmax(0,1fr) minmax(280px,340px);align-items:stretch}\n.mm-call-workbench .mm-call-edge-detail{margin:0;max-height:clamp(260px,calc(100dvh - 310px),640px);overflow:auto;padding:12px}\n.mm-call-workbench .mm-call-edge-detail dl div{grid-template-columns:1fr;gap:3px}\n.mm-call-workbench .mm-call-edge-summary{max-height:none;overflow:visible}\n.mm-call-edge-summary details{margin-top:6px}\n.mm-call-edge-summary details p{font-weight:400;max-height:180px;overflow:auto}\n.mm-call-node-name small{font-size:11px;font-weight:400}\n.mm-call-description{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap}\n.mm-call-description button{font-size:12px;min-height:30px;padding:4px 8px}\n.mm:has(.mm-call-graph.is-focused) .mm-header,.mm:has(.mm-call-graph.is-focused) .mm-footer,.mm:has(.mm-call-graph.is-focused) .mm-tabs,.mm:has(.mm-call-graph.is-focused) .mm-connection-details,.mm:has(.mm-call-graph.is-focused) .mm-task-back,.mm:has(.mm-call-graph.is-focused) .mm-task-workspace-heading,.mm:has(.mm-call-graph.is-focused) .mm-task-facts,.mm:has(.mm-call-graph.is-focused) .mm-active-work,.mm:has(.mm-call-graph.is-focused) .mm-view-switcher{display:none}\n.mm:has(.mm-call-graph.is-focused) .mm-task-workspace{padding:12px}\n.mm-call-graph.is-focused .mm-call-viewport{height:max(260px,calc(100dvh - 250px))}\n.mm-call-graph.is-focused .mm-call-workbench.has-edge .mm-call-viewport{height:max(200px,calc(100dvh - 450px))}\n@media(max-width:1100px){.mm-call-workbench.has-edge{grid-template-columns:minmax(0,1fr)}.mm-call-workbench.has-edge .mm-call-viewport{height:300px}.mm-call-workbench.has-edge .mm-call-edge-detail{max-height:240px}}\n.mm-call-edge-preview text{fill:#173e7c;font-family:inherit;font-size:11px;font-weight:600}\n.mm-call-edge-detail{margin:8px 0 12px;padding:14px 16px;border:1px solid #b9cce9;border-radius:8px;background:#f4f8ff;color:#203a60;font-size:13px;overflow-wrap:anywhere}\n.mm-call-edge-detail-head{display:flex;align-items:center;justify-content:space-between;gap:12px}\n.mm .mm-call-edge-detail-head button{min-height:30px;padding:4px 8px;font-size:12px}\n.mm-call-edge-detail>p{margin:8px 0!important}\n.mm-call-edge-detail dl{display:grid;gap:8px;margin:12px 0}\n.mm-call-edge-detail dl div{display:grid;grid-template-columns:128px minmax(0,1fr);gap:8px}\n.mm-call-edge-detail dt{font-weight:600}\n.mm-call-edge-detail dd{margin:0;white-space:pre-wrap}\n.mm-call-edge-summary{max-height:160px;overflow:auto}\n.mm-call-edge-detail .mm-muted{color:#4b5e78}\n@media(max-width:480px){.mm-call-edge-detail dl div{grid-template-columns:1fr;gap:2px}}\n.mm-call-edge-clearance{fill:none;stroke:#f5f7fb;stroke-width:6;stroke-linejoin:round;stroke-linecap:round}\n.mm-call-edge{fill:none;stroke:#64758e;stroke-width:1.7;stroke-linejoin:round;stroke-linecap:round}\n.mm-call-edge.rerun{stroke:#96601c;stroke-dasharray:5 3}\n.mm-call-edge.retry{stroke:#96601c;stroke-dasharray:2 3}\n.mm-call-edge.parent_run{stroke:#695b8a;stroke-dasharray:7 3 2 3}\n.mm-call-arrow{fill:#64758e}\n.mm-call-arrow.rerun,.mm-call-arrow.retry{fill:#96601c}\n.mm-call-arrow.parent_run{fill:#695b8a}\n.mm-call-edge-label-bg{fill:#f5f7fb}\n.mm-call-edge-text{fill:var(--mm-muted);font-family:inherit;font-size:11px;line-height:1}\n.mm-call-edge-text.rerun,.mm-call-edge-text.retry{fill:#96601c}\n.mm-call-edge-text.parent_run{fill:#695b8a}\n.mm-call-lines .is-connected .mm-call-edge{stroke-width:2.8;stroke:#245cc6}\n.mm-call-lines .is-connected .mm-call-edge.rerun,.mm-call-lines .is-connected .mm-call-edge.retry{stroke:#9a590c}\n.mm-call-lines .is-dimmed{opacity:.6}\n.mm-call-lines .is-connected .mm-call-edge-text{font-weight:650}\n.mm button.mm-call-node{--node-bg:#edf0f5;--node-border:#a7b1c0;--node-ink:#414e62;position:absolute;display:flex;flex-direction:column;align-items:stretch;justify-content:center;gap:4px;padding:9px 12px;text-align:left;white-space:normal;border:1px solid var(--node-border);border-radius:8px;background:var(--node-bg);color:var(--node-ink);line-height:1.2;overflow:hidden}\n.mm button.mm-call-node.status-running{--node-bg:#dbe9ff;--node-border:#6b99e9;--node-ink:#153f88}\n.mm button.mm-call-node.status-completed{--node-bg:#dff1e5;--node-border:#7db592;--node-ink:#215937}\n.mm button.mm-call-node.status-failed{--node-bg:#ffe0dc;--node-border:#db8a80;--node-ink:#9b2d25}\n.mm button.mm-call-node.status-waiting{--node-bg:#fff0ca;--node-border:#c9a653;--node-ink:#775313}\n.mm button.mm-call-node.status-cancelled{--node-bg:#e8ebf0;--node-border:#a9b1be;--node-ink:#4c586b}\n.mm button.mm-call-node:hover{background:var(--node-bg);border-color:var(--node-ink);filter:brightness(.98)}\n.mm button.mm-call-node.is-selected{outline:2px solid #245cc6;outline-offset:3px;border-color:#245cc6}\n.mm button.mm-call-node.is-selected:hover{outline-color:#245cc6}\n.mm button.mm-call-node:focus-visible{outline:2px solid #245cc6;outline-offset:4px}\n.mm-call-node-name{font-size:14px;font-weight:650;line-height:18px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}\n.mm-call-node-identity,.mm-call-node-foot{display:flex;align-items:baseline;justify-content:space-between;gap:8px;font-size:12px;line-height:15px;font-variant-numeric:tabular-nums;color:var(--node-ink)}\n.mm-call-node-identity>span:first-child{white-space:nowrap}\n.mm-call-node-status{white-space:nowrap;font-weight:650}\n.mm-call-node-foot>span:last-child{white-space:nowrap}\n.mm-call-node.status-running .mm-call-node-status:before{content:"";display:inline-block;width:6px;height:6px;border-radius:50%;background:currentColor;vertical-align:1px;margin-right:5px}\n.mm-call-status-legend{display:flex;gap:6px 13px;align-items:center;flex-wrap:wrap;font-size:12px;margin-bottom:8px;color:#42516a}\n.mm-call-status-legend span{display:inline-flex;align-items:center;gap:5px}\n.mm-call-legend>.mm-call-status-legend{gap:12px;margin:0}\n.mm-call-status-legend i{width:12px;height:12px;border-radius:3px;border:1px solid #a7b1c0;background:#e8ebf0}\n.mm-call-status-legend .status-running{background:#dbe9ff;border-color:#6b99e9}\n.mm-call-status-legend .status-completed{background:#dff1e5;border-color:#7db592}\n.mm-call-status-legend .status-failed{background:#ffe0dc;border-color:#db8a80}\n.mm-call-status-legend .status-waiting{background:#fff0ca;border-color:#c9a653}\n.mm-call-source-note{color:#865310}\n.mm .mm-call-notice{font-size:12px;line-height:1.6;color:var(--mm-muted);margin:10px 0 14px;max-width:90ch}\n.mm-call-unresolved{font-size:12px;margin-top:12px;color:var(--mm-muted)}\n.mm-call-unresolved summary{padding:6px 0;cursor:pointer}\n.mm-call-unresolved ul{margin:6px 0 0;padding-left:18px}\n.mm-call-unresolved li{padding:5px 0;overflow-wrap:anywhere}\n.mm-call-unresolved strong{font-weight:550}\n.mm .mm-call-footnote{margin-top:12px;font-size:12px;color:var(--mm-muted)}\n.mm-call-empty{padding:48px 24px;text-align:center;background:var(--mm-hover);border-radius:7px}\n.mm-call-empty strong{font-size:14px;font-weight:550}\n.mm-call-empty p{margin-top:8px!important;color:var(--mm-muted);font-size:12px}\n@media(max-width:640px){.mm-call-toolbar{gap:12px}.mm-call-zoom{gap:4px}.mm-call-legend .mm-call-scroll-hint{margin-left:0;flex-basis:100%}.mm-call-viewport{max-height:600px}.mm-call-description p{max-width:40ch}}\n';

// src/console.css
var console_default = `/* The host owns panel geometry, sidebar clearance, and native title controls. */\r
.mm-panel{background:var(--mm-bg)}\r
.mm{--mm-bg:#16181d;--mm-text:#e4e7ec;--mm-muted:#a4adbc;--mm-line:#343944;--mm-hover:#2b303a;--mm-accent:#91baff;--mm-input:#20242c;--mm-control-border:#424956;--mm-button:#222731;--mm-button-hover:#303745;--mm-chrome:#1c1f26;--mm-header-button:#292e38;--mm-border-strong:#454d5b;--mm-secondary:#bec7d5;--mm-selected:#b6d1ff;--mm-selected-line:#80aaff;--mm-surface:#22262e;--mm-surface-border:#3b414c;--mm-label:#b8c1cf;--mm-divider:#434b58;--mm-number:#eef1f5;--mm-attention:#f5bd71;--mm-row:#20242b;--mm-row-line:#363c47;--mm-row-hover:#292f39;--mm-child:#1b1f26;--mm-activity:#d8e2f0;--mm-link:#a8c8ff;--mm-history-border:#63503a;--mm-history-bg:#382d20;--mm-history-text:#f2c98c;--mm-danger-bg:#49272d;--mm-danger-text:#ffb7ba;--mm-danger-border:#85515a;--mm-badge-bg:#353e50;--mm-badge-text:#ccd9f4;--mm-badge-border:#4e5e77;--mm-good-bg:#1c3e32;--mm-good-text:#a1dec0;--mm-good-border:#396952;--mm-wait-bg:#44351f;--mm-wait-text:#f2cf91;--mm-wait-border:#6b5432;--mm-critical-bg:#302328;--mm-critical-border:#65424c;--mm-rule-title:#c6d7f3;--mm-diagnosis-line:#636f81;--mm-diagnosis-bg:#ffffff05;--mm-error:#ffb0b3;--mm-canvas:#1c2027;--mm-canvas-border:#444d5d;--mm-scroll:#61708a;--mm-scroll-track:#242b36;--mm-edge-bg:#282f3b;--mm-edge-line:#66758a;--mm-active-bg:#253449;--mm-active-text:#dbe8ff;--mm-active-border:#455d7e;--mm-empty-border:#4b5564;--mm-history-dot:#d7a867;color-scheme:dark;font-family:"Segoe UI","Microsoft YaHei",system-ui,sans-serif;font-size:13px;line-height:1.5}\r
.mm :focus-visible{outline:2px solid var(--mm-accent);outline-offset:3px}\r
.mm input,.mm select{background:var(--mm-input);border-color:var(--mm-control-border);min-height:36px}\r
.mm button{border-radius:5px;background:var(--mm-button)}\r
.mm button:hover{background:var(--mm-button-hover)}\r
.mm-header{background:var(--mm-chrome);border-color:var(--mm-line);padding:18px 28px;min-height:82px}\r
.mm{--mm-primary-bg:#91baff;--mm-primary-text:#16181d;--mm-primary-hover:#b0ccff;font-size:14px}\r
.mm h1{font-size:20px;letter-spacing:.01em}\r
.mm h2{font-size:18px}\r
.mm-header p{color:var(--mm-muted);margin-top:6px}\r
.mm-header button{background:var(--mm-header-button);color:var(--mm-text);border-color:var(--mm-border-strong)}\r
.mm-connection-details{background:var(--mm-chrome);color:var(--mm-secondary);border-color:var(--mm-line);padding:0 28px}\r
.mm-tabs{background:var(--mm-chrome);border-color:var(--mm-line);padding:0 28px;gap:28px}\r
.mm-tabs button{background:transparent;color:var(--mm-muted);padding:12px 0}\r
.mm-tabs button[aria-current]{color:var(--mm-selected);border-bottom-color:var(--mm-selected-line)}\r
.mm-tabs button:hover{background:transparent;color:var(--mm-text)}\r
.mm-list,.mm-runtime-table{width:100%;max-width:1480px;margin-inline:auto;padding:26px 28px}\r
.mm-task-workspace{padding:24px 28px}\r
.mm-section-heading{margin-bottom:18px}\r
.mm-task-overview{background:var(--mm-surface);border-color:var(--mm-surface-border);padding:16px 0;margin-bottom:20px;border-radius:6px}\r
.mm-task-overview span{color:var(--mm-label);padding:0 24px;font-size:12px}\r
.mm-task-overview span+span{border-color:var(--mm-divider)}\r
.mm-task-overview strong{color:var(--mm-number);font-size:24px;font-weight:600}\r
.mm-task-overview .mm-overview-attention strong{color:var(--mm-attention)}\r
.mm-list-filters{display:grid;grid-template-columns:minmax(220px,440px) 170px;justify-content:space-between;gap:12px;margin-bottom:14px}\r
.mm-list-filters input,.mm-list-filters select{background:var(--mm-surface);border-color:var(--mm-control-border);width:100%}\r
.mm-business-rows{border:1px solid var(--mm-surface-border);border-radius:6px;overflow:hidden}\r
.mm-business-rows .mm-business-row{display:grid;grid-template-columns:minmax(0,1fr) 190px;align-items:center;background:var(--mm-row);border-color:var(--mm-row-line);min-height:82px}\r
.mm-business-rows .mm-business-row:last-child{border-bottom:0}\r
.mm-business-rows .mm-business-row:hover{background:var(--mm-row-hover)}\r
.mm-business-rows .mm-business-row[data-child]{background:var(--mm-child)}\r
.mm-business-rows .mm-business-row[data-child]:hover{background:var(--mm-row-hover)}\r
.mm .mm-business-rows button.mm-business-open{grid-template-columns:minmax(180px,1.5fr) 100px minmax(130px,1fr) 80px;gap:16px;padding:15px 18px;min-height:80px;background:transparent;color:var(--mm-text)}\r
.mm-business-title{gap:5px}\r
.mm-business-title strong{color:var(--mm-text);font-size:14px;font-weight:600}\r
.mm-business-title .mm-muted{font-size:11px;color:var(--mm-muted)}\r
.mm-business-state{flex-direction:column;align-items:flex-start;font-size:11px}\r
.mm-business-activity{color:var(--mm-muted);font-size:12px}\r
.mm-business-activity>span{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}\r
.mm-business-activity strong{color:var(--mm-activity)}\r
.mm-business-link{color:var(--mm-link);font-size:12px}\r
.mm-business-rows .mm-business-signals{padding:10px 14px 10px 0;gap:6px;font-size:11px}\r
.mm-business-health{gap:5px}\r
.mm-business-health button{border-color:var(--mm-history-border);background:var(--mm-history-bg);color:var(--mm-history-text);font-size:11px;min-height:27px;padding:3px 7px;white-space:normal;text-align:left}\r
.mm-business-health button.mm-signal-danger{background:var(--mm-danger-bg);color:var(--mm-danger-text);border-color:var(--mm-danger-border)}\r
.mm .mm-badge{background:var(--mm-badge-bg);color:var(--mm-badge-text);border:1px solid var(--mm-badge-border);font-size:11px}\r
.mm .mm-badge.good{background:var(--mm-good-bg);color:var(--mm-good-text);border-color:var(--mm-good-border)}\r
.mm .mm-badge.danger{background:var(--mm-danger-bg);color:var(--mm-danger-text);border-color:var(--mm-danger-border)}\r
.mm .mm-badge.pending,.mm .mm-signal-warning{background:var(--mm-wait-bg);color:var(--mm-wait-text);border-color:var(--mm-wait-border)}\r
.mm-list-note{font-size:11px!important;line-height:1.7;max-width:90ch;padding-top:14px}\r
.mm-footer{background:var(--mm-chrome);padding:10px 28px;color:var(--mm-muted)}\r
.mm .mm-alert{background:var(--mm-surface);border-color:var(--mm-surface-border)}\r
.mm .mm-alert:has(.critical){background:var(--mm-critical-bg);border-color:var(--mm-critical-border)}\r
.mm .mm-alert.is-past,.mm .mm-alert.is-past:has(.critical){background:var(--mm-surface);border-color:var(--mm-surface-border)}\r
.mm .mm-alert-current-state.mm-empty{padding:14px 16px;text-align:left;border-style:solid;background:var(--mm-surface)}\r
.mm .mm-alert-current-state.mm-empty h3{margin-bottom:4px}\r
.mm .mm-alert-rules,.mm .mm-confirm,.mm .mm-settings{background:var(--mm-surface);border-color:var(--mm-divider);color:var(--mm-text)}\r
.mm .mm-alert-rule strong{color:var(--mm-rule-title)}\r
.mm .mm-alert-rule small{color:var(--mm-muted)}\r
.mm .mm-diagnosis{border-color:var(--mm-diagnosis-line);background:var(--mm-diagnosis-bg);padding:12px 14px}\r
.mm .mm-error,.mm .mm-error-text{color:var(--mm-error)}\r
.mm .mm-alert-verification{background:var(--mm-wait-bg);color:var(--mm-wait-text)}\r
.mm .mm-call-viewport{background:var(--mm-canvas);border-color:var(--mm-canvas-border);scrollbar-color:var(--mm-scroll) var(--mm-scroll-track)}\r
.mm .mm-call-edge-detail{background:var(--mm-surface);color:var(--mm-text);border-color:var(--mm-divider)}\r
.mm .mm-call-edge-preview rect{fill:var(--mm-edge-bg);stroke:var(--mm-edge-line)}\r
.mm .mm-call-edge-preview text{fill:var(--mm-text)}\r
.mm .mm-call-legend{color:var(--mm-label)}\r
.mm .mm-current-action,.mm .mm-active-work{background:var(--mm-active-bg);color:var(--mm-active-text);border-color:var(--mm-active-border)}\r
.mm .mm-empty{padding:32px 20px;background:var(--mm-row);border:1px dashed var(--mm-empty-border);border-radius:6px}\r
@container(max-width:1050px){.mm .mm-business-rows button.mm-business-open{grid-template-columns:minmax(140px,1fr) 90px 74px}.mm-business-open .mm-business-activity{grid-column:1/-1;grid-row:2}.mm-business-open .mm-idle{display:none}.mm-business-open .mm-business-link{grid-column:3;grid-row:1}.mm-business-rows .mm-business-row{grid-template-columns:minmax(0,1fr) 150px}}\r
@container(max-width:640px){.mm-header,.mm-list,.mm-runtime-table,.mm-task-workspace{padding:16px}.mm-tabs,.mm-connection-details{padding-inline:16px}.mm-task-overview span{padding:0 12px}.mm-list-filters{grid-template-columns:minmax(0,1fr) 125px}.mm-business-rows .mm-business-row{grid-template-columns:minmax(0,1fr)}.mm .mm-business-rows button.mm-business-open{grid-template-columns:minmax(0,1fr) auto;padding:12px;gap:8px}.mm-business-open .mm-business-link{display:none}.mm-business-rows .mm-business-signals{padding:0 12px 10px}.mm-header .mm-actions{gap:6px}.mm h1{font-size:18px}.mm-footer{padding:10px 16px}}\r
.mm-business-columns{display:grid;grid-template-columns:minmax(0,1fr) 190px;color:var(--mm-muted);font-size:11px;padding:0 0 9px}\r
.mm-business-columns>div{display:grid;grid-template-columns:minmax(180px,1.5fr) 100px minmax(130px,1fr) 80px;gap:16px;padding-inline:18px}\r
.mm .mm-call-status-legend,.mm .mm-call-edge-detail .mm-muted{color:var(--mm-muted)}\r
.mm .mm-alert.mm-alert-historical{background:var(--mm-surface);border-color:var(--mm-surface-border)}\r
.mm .mm-alert-historical .mm-alert-dot{background:var(--mm-history-dot)}\r
.mm .mm-alert.is-past .mm-alert-dot{background:var(--mm-history-dot)}\r
.mm .mm-timeline-run-label .is-failed{color:var(--mm-error)}\r
.mm .mm-call-node.is-selected{outline-color:var(--mm-accent);border-color:var(--mm-accent)}\r
@container(max-width:1050px){.mm-business-columns{grid-template-columns:minmax(0,1fr) 150px}.mm-business-columns>div{grid-template-columns:minmax(140px,1fr) 90px 74px}.mm-business-columns>div>span:nth-child(3){display:none}}\r
@container(max-width:640px){.mm-business-columns{display:none}}\r
\r
.mm[data-theme="paper"]{--mm-bg:#f6f4ee;--mm-text:#393428;--mm-muted:#70695d;--mm-line:#ded9ce;--mm-hover:#ece7dc;--mm-accent:#82623c;--mm-input:#fcfbf7;--mm-control-border:#c8c0b1;--mm-button:#f1ede3;--mm-button-hover:#e8e0d1;--mm-chrome:#f8f6f0;--mm-header-button:#eee9df;--mm-border-strong:#c9c0af;--mm-secondary:#696151;--mm-selected:#6e522f;--mm-selected-line:#a77b4b;--mm-surface:#fbfaf6;--mm-surface-border:#dcd6ca;--mm-label:#6d6557;--mm-divider:#d4ccbd;--mm-number:#3f392b;--mm-attention:#95632c;--mm-row:#fdfcf9;--mm-row-line:#e3ded4;--mm-row-hover:#efeadf;--mm-child:#f8f6f0;--mm-activity:#60513c;--mm-link:#7b5a31;--mm-history-border:#d9c6ad;--mm-history-bg:#f4eadb;--mm-history-text:#835b2e;--mm-danger-bg:#f5e3de;--mm-danger-text:#994a40;--mm-danger-border:#d8aaa1;--mm-badge-bg:#ece8e0;--mm-badge-text:#655c4c;--mm-badge-border:#d1c7b7;--mm-good-bg:#e7eddf;--mm-good-text:#506341;--mm-good-border:#b9c6a9;--mm-wait-bg:#f3ebda;--mm-wait-text:#7c6236;--mm-wait-border:#d3c29c;--mm-critical-bg:#fbefea;--mm-critical-border:#d7b3a6;--mm-rule-title:#6d644c;--mm-diagnosis-line:#b8ad98;--mm-diagnosis-bg:#92744908;--mm-error:#9c493e;--mm-canvas:#f0eee7;--mm-canvas-border:#d2cabc;--mm-scroll:#a59a86;--mm-scroll-track:#ede9df;--mm-edge-bg:#fcfaf4;--mm-edge-line:#b4a68d;--mm-active-bg:#e9edf0;--mm-active-text:#4e6374;--mm-active-border:#bbc7cf;--mm-empty-border:#cfc7b7;--mm-history-dot:#ac7c4b;color-scheme:light}\r
.mm[data-theme="strata"]{--mm-bg:#f8f8f7;--mm-text:#18181b;--mm-muted:#71717a;--mm-line:#e4e4e7;--mm-hover:#f4f4f5;--mm-accent:#ea580c;--mm-input:#fff;--mm-control-border:#dedee2;--mm-button:#fff;--mm-button-hover:#f4f4f5;--mm-chrome:#fff;--mm-header-button:#fff;--mm-border-strong:#d4d4d8;--mm-secondary:#52525b;--mm-selected:#18181b;--mm-selected-line:#ea580c;--mm-surface:#fff;--mm-surface-border:#e4e4e7;--mm-label:#71717a;--mm-divider:#e4e4e7;--mm-number:#18181b;--mm-attention:#d97706;--mm-row:#fff;--mm-row-line:#ececee;--mm-row-hover:#fafafa;--mm-child:#fcfcfc;--mm-activity:#52525b;--mm-link:#18181b;--mm-history-border:#f3d19c;--mm-history-bg:#fffbeb;--mm-history-text:#92400e;--mm-danger-bg:#fef2f2;--mm-danger-text:#b91c1c;--mm-danger-border:#fecaca;--mm-badge-bg:#f4f4f5;--mm-badge-text:#3f3f46;--mm-badge-border:#d4d4d8;--mm-good-bg:#ecfdf5;--mm-good-text:#047857;--mm-good-border:#a7f3d0;--mm-wait-bg:#fffbeb;--mm-wait-text:#a16207;--mm-wait-border:#fde68a;--mm-critical-bg:#fff1f2;--mm-critical-border:#fecdd3;--mm-rule-title:#27272a;--mm-diagnosis-line:#d4d4d8;--mm-diagnosis-bg:#fafafa;--mm-error:#b91c1c;--mm-canvas:#fafafa;--mm-canvas-border:#e4e4e7;--mm-scroll:#a1a1aa;--mm-scroll-track:#f4f4f5;--mm-edge-bg:#fff;--mm-edge-line:#a1a1aa;--mm-active-bg:#eff6ff;--mm-active-text:#1e3a5f;--mm-active-border:#bfdbfe;--mm-empty-border:#d4d4d8;--mm-history-dot:#f59e0b;color-scheme:light}\r
.mm[data-theme="paper"]{--mm-primary-bg:#82623c;--mm-primary-text:#fff;--mm-primary-hover:#6a4e2f}\r
.mm[data-theme="strata"]{--mm-primary-bg:#18181b;--mm-primary-text:#fff;--mm-primary-hover:#27272a}\r
.mm-header{color:var(--mm-text)}\r
.mm-header .mm-muted,.mm-connection-details .mm-muted{color:var(--mm-muted)}\r
.mm-theme-picker{display:flex;align-items:center;gap:8px;color:var(--mm-muted);font-size:12px;white-space:nowrap}\r
.mm .mm-theme-picker select{width:100px;min-height:36px;padding:6px 9px;color:var(--mm-text)}\r
.mm-header button:hover{background:var(--mm-button-hover)}\r
.mm ::selection{background:var(--mm-badge-bg);color:var(--mm-text)}\r
.mm-scroll{scrollbar-color:var(--mm-scroll) transparent}\r
.mm[data-theme="paper"] h1,.mm[data-theme="paper"] h2{font-family:Georgia,"Noto Serif SC","Source Han Serif SC","Songti SC",SimSun,serif;font-weight:700}\r
.mm[data-theme="paper"] h1{font-size:23px}\r
.mm[data-theme="paper"] .mm-call-node.status-running{--node-bg:#e5ebef;--node-border:#9cabb6;--node-ink:#425a6b}\r
.mm[data-theme="paper"] .mm-call-node.status-completed{--node-bg:#e7eddf;--node-border:#a6b596;--node-ink:#48603a}\r
.mm[data-theme="paper"] .mm-call-node.status-failed{--node-bg:#f3e2dc;--node-border:#d0a59b;--node-ink:#934d40}\r
.mm[data-theme="paper"] .mm-call-node.status-waiting{--node-bg:#f1e8d7;--node-border:#c4b18b;--node-ink:#796137}\r
.mm[data-theme="strata"]{font-family:"Segoe UI Variable Text","Microsoft YaHei UI","Microsoft YaHei",system-ui,sans-serif;font-variant-numeric:tabular-nums}\r
.mm[data-theme="strata"] .mm-header{min-height:72px;padding:14px 24px}\r
.mm[data-theme="strata"] h1{font-size:18px;font-weight:650;letter-spacing:-.01em}\r
.mm[data-theme="strata"] h2{font-size:17px;font-weight:650;letter-spacing:-.01em}\r
.mm[data-theme="strata"] .mm-header .mm-actions>button:not([aria-label]){background:#18181b;color:#fff;border-color:#18181b}\r
.mm[data-theme="strata"] .mm-header .mm-actions>button:not([aria-label]):hover{background:#27272a}\r
.mm[data-theme="strata"] .mm-theme-picker select{width:132px}\r
.mm[data-theme="strata"] .mm-task-overview{border-radius:10px;padding:14px 0}\r
.mm[data-theme="strata"] .mm-task-overview strong{font-size:22px}\r
.mm[data-theme="strata"] .mm-business-rows{border-radius:10px}\r
.mm[data-theme="strata"] .mm-business-rows .mm-business-row{min-height:70px}\r
.mm[data-theme="strata"] .mm-business-rows button.mm-business-open{min-height:68px;padding:12px 16px}\r
.mm[data-theme="strata"] .mm-alert,.mm[data-theme="strata"] .mm-alert-rules,.mm[data-theme="strata"] .mm-call-viewport{border-radius:10px}\r
.mm[data-theme="strata"] .mm-business-link{text-decoration:underline;text-decoration-color:#d4d4d8;text-underline-offset:3px}\r
.mm[data-theme="strata"] .mm-call-node.status-running{--node-bg:#eff6ff;--node-border:#93c5fd;--node-ink:#1d4ed8}\r
.mm[data-theme="strata"] .mm-call-node.status-completed{--node-bg:#ecfdf5;--node-border:#86efac;--node-ink:#047857}\r
.mm[data-theme="strata"] .mm-call-node.status-failed{--node-bg:#fef2f2;--node-border:#fca5a5;--node-ink:#b91c1c}\r
.mm[data-theme="strata"] .mm-call-node.status-waiting{--node-bg:#fffbeb;--node-border:#fcd34d;--node-ink:#a16207}\r
.mm[data-theme="strata"] .mm-metrics-view,.mm[data-theme="strata"] .mm-runtime-view{max-width:1280px}\r
.mm[data-theme="strata"] .mm-metrics-view,.mm[data-theme="strata"] .mm-runtime-view,.mm[data-theme="strata"] .mm-header,.mm[data-theme="strata"] .mm-actions{min-width:0;max-width:100%}\r
.mm[data-theme="strata"] .mm-metric-panel,.mm[data-theme="strata"] .mm-runtime-panel{margin-top:16px;padding:0;background:var(--mm-surface);border:1px solid var(--mm-surface-border);border-radius:10px;overflow:hidden}\r
.mm[data-theme="strata"] .mm-metrics-view>.mm-metric-panel:first-of-type{margin-top:0}\r
.mm[data-theme="strata"] .mm-metric-panel>.mm-metrics{gap:0;padding:0}\r
.mm[data-theme="strata"] .mm-metric-panel>.mm-metric-coverage{display:flex;align-items:baseline;gap:5px 14px;flex-wrap:wrap;margin:0;padding:13px 18px;border:0;border-bottom:1px solid var(--mm-row-line);border-radius:0;background:var(--mm-surface)}\r
.mm[data-theme="strata"] .mm-metric-panel>.mm-metric-coverage>strong{font-size:14px}\r
.mm[data-theme="strata"] .mm-metric-panel>.mm-metric-coverage>span{color:var(--mm-muted);font-size:12px}\r
.mm[data-theme="strata"] .mm-metric-panel>.mm-metrics.mm-metrics-primary{grid-template-columns:repeat(auto-fit,minmax(180px,1fr))}\r
.mm[data-theme="strata"] .mm-metric-panel>.mm-metrics.mm-metrics-primary>div{min-height:78px}\r
.mm[data-theme="strata"] .mm-metric-panel>.mm-metrics.mm-metrics-primary>div:last-child{border-right:0}\r
.mm[data-theme="strata"] .mm-metric-panel>.mm-metric-empty{margin:0;padding:10px 18px;border-top:1px solid var(--mm-row-line);font-size:12px}\r
.mm[data-theme="strata"] .mm-metric-panel>.mm-metric-details{margin:0;border-top:1px solid var(--mm-row-line)}\r
.mm[data-theme="strata"] .mm-metric-panel>.mm-metric-details>summary{padding:11px 18px;font-weight:500}\r
.mm[data-theme="strata"] .mm-metric-panel>.mm-metric-details>.mm-metrics{padding:0 18px}\r
.mm[data-theme="strata"] .mm-metric-connection>summary{cursor:pointer}\r
.mm[data-theme="strata"] .mm-metric-connection>summary:hover{background:var(--mm-hover)}\r
.mm[data-theme="strata"] .mm-metric-connection>summary:after{content:'\u25BE';color:var(--mm-muted);font-size:13px;margin-left:4px}\r
.mm[data-theme="strata"] .mm-metric-connection[open]>summary:after{transform:rotate(180deg)}\r
.mm[data-theme="strata"] .mm-metric-panel>.mm-metrics>div{min-height:104px;padding:17px 18px;border-right:1px solid var(--mm-row-line);border-bottom:1px solid var(--mm-row-line);justify-content:center}\r
.mm[data-theme="strata"] .mm-metric-panel>.mm-metrics>div:nth-child(3n){border-right:0}\r
.mm[data-theme="strata"] .mm-metric-panel>.mm-metrics>div:nth-last-child(-n+3){border-bottom:0}\r
.mm[data-theme="strata"] .mm-metric-panel>.mm-metrics.compact>div{min-height:86px;border-bottom:0}\r
.mm[data-theme="strata"] .mm-metrics strong{color:var(--mm-number);font-size:25px;font-weight:650}\r
.mm[data-theme="strata"] .mm-metrics.compact strong{font-size:18px}\r
.mm[data-theme="strata"] .mm-metric-section{border-top:0}\r
.mm[data-theme="strata"] .mm-metric-panel-heading,.mm[data-theme="strata"] .mm-runtime-panel-heading{display:flex;align-items:flex-start;justify-content:space-between;gap:20px;padding:15px 18px;border-bottom:1px solid var(--mm-row-line)}\r
.mm[data-theme="strata"] .mm-metric-panel-heading h3,.mm[data-theme="strata"] .mm-runtime-panel-heading h3{margin:0;font-size:14px}\r
.mm[data-theme="strata"] .mm-runtime-panel-heading p{margin-top:4px;max-width:72ch;font-size:11px}\r
.mm[data-theme="strata"] .mm-metric-note{max-width:none;margin:0;padding:11px 18px;border-top:1px solid var(--mm-row-line);background:#fafafa;font-size:11px;line-height:1.65}\r
.mm[data-theme="strata"] .mm-metric-panel>.mm-table-wrap,.mm[data-theme="strata"] .mm-runtime-panel>.mm-table-wrap{padding:0 18px 8px}\r
.mm[data-theme="strata"] .mm-resource-panel dl{display:grid;grid-template-columns:1fr 1fr;margin:0}\r
.mm[data-theme="strata"] .mm-resource-panel dl>div{padding:16px 18px}\r
.mm[data-theme="strata"] .mm-resource-panel dl>div+div{border-left:1px solid var(--mm-row-line)}\r
.mm[data-theme="strata"] .mm-resource-panel dt{color:var(--mm-label);font-size:11px}\r
.mm[data-theme="strata"] .mm-resource-panel dd{margin:5px 0 0;color:var(--mm-text)}\r
.mm[data-theme="strata"] .mm-runtime-overview{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));background:var(--mm-surface);border:1px solid var(--mm-surface-border);border-radius:10px;overflow:hidden}\r
.mm[data-theme="strata"] .mm-runtime-overview>div{display:flex;flex-direction:column;justify-content:center;min-height:92px;padding:15px 18px;border-right:1px solid var(--mm-row-line)}\r
.mm[data-theme="strata"] .mm-runtime-overview>div:last-child{border-right:0}\r
.mm[data-theme="strata"] .mm-runtime-overview span,.mm[data-theme="strata"] .mm-runtime-overview small{color:var(--mm-label);font-size:11px}\r
.mm[data-theme="strata"] .mm-runtime-overview strong{margin:3px 0;color:var(--mm-number);font-size:24px;font-weight:650}\r
.mm[data-theme="strata"] .mm-runtime-overview .mm-runtime-latest{font-size:15px}\r
.mm[data-theme="strata"] .mm-runtime-panel>.mm-table-wrap{max-width:100%;overflow-x:auto}\r
.mm[data-theme="strata"] .mm-runtime-panel table{min-width:640px;font-variant-numeric:tabular-nums}\r
.mm[data-theme="strata"] .mm-runtime-panel tbody tr[data-status="offline"]{background:#fffafa}\r
.mm[data-theme="strata"] .mm-runtime-panel tbody tr[data-status="offline"]:hover{background:#fff4f4}\r
.mm[data-theme="strata"] .mm-runtime-panel tbody tr[data-status="online"]:hover{background:#f7fcfa}\r
.mm[data-theme="strata"] .mm-tabs,.mm[data-theme="strata"] .mm-task-overview{scrollbar-width:thin;scrollbar-color:var(--mm-scroll) transparent}\r
.mm[data-theme="strata"] .mm-tabs::-webkit-scrollbar,.mm[data-theme="strata"] .mm-task-overview::-webkit-scrollbar{height:5px}\r
.mm[data-theme="strata"] .mm-tabs::-webkit-scrollbar-thumb,.mm[data-theme="strata"] .mm-task-overview::-webkit-scrollbar-thumb{background:var(--mm-scroll);border-radius:999px}\r
@container(max-width:640px){.mm-header{flex-wrap:wrap;gap:12px}.mm-header>.mm-actions{margin-left:auto}}\r
@container(max-width:640px){.mm[data-theme="strata"] .mm-header{display:grid;grid-template-columns:minmax(0,1fr);align-items:start;padding:14px 16px}.mm[data-theme="strata"] .mm-header>div:first-child{width:100%;min-width:0}.mm[data-theme="strata"] .mm-header>div:first-child p{overflow-wrap:anywhere}.mm[data-theme="strata"] .mm-header>.mm-actions{display:grid;grid-template-columns:minmax(0,1fr) auto auto;width:100%;min-width:0;margin-left:0}.mm[data-theme="strata"] .mm-header .mm-actions>button{position:static;min-width:36px}.mm[data-theme="strata"] .mm-header .mm-actions>button:not([aria-label]){flex:0 0 auto}.mm[data-theme="strata"] .mm-theme-picker{min-width:0}.mm[data-theme="strata"] .mm-theme-picker select{width:100%;min-width:0}.mm[data-theme="strata"] .mm-section-heading .mm-muted{max-width:100%;text-align:left;overflow-wrap:anywhere}}\r
@container(max-width:760px){.mm[data-theme="strata"] .mm-metric-panel>.mm-metrics{grid-template-columns:repeat(2,minmax(0,1fr))}.mm[data-theme="strata"] .mm-metric-panel>.mm-metrics>div,.mm[data-theme="strata"] .mm-metric-panel>.mm-metrics>div:nth-child(3n){border-right:1px solid var(--mm-row-line);border-bottom:1px solid var(--mm-row-line)}.mm[data-theme="strata"] .mm-metric-panel>.mm-metrics>div:nth-child(2n){border-right:0}.mm[data-theme="strata"] .mm-metric-panel>.mm-metrics>div:nth-last-child(-n+2){border-bottom:0}.mm[data-theme="strata"] .mm-metric-panel>.mm-metrics.compact>div:last-child{grid-column:1/-1;border-top:1px solid var(--mm-row-line)}.mm[data-theme="strata"] .mm-resource-panel dl,.mm[data-theme="strata"] .mm-runtime-overview{grid-template-columns:1fr 1fr}.mm[data-theme="strata"] .mm-runtime-overview>div:nth-child(2){border-right:0}.mm[data-theme="strata"] .mm-runtime-overview>div:nth-child(-n+2){border-bottom:1px solid var(--mm-row-line)}.mm[data-theme="strata"] .mm-resource-panel dl>div+div{border-left:0;border-top:1px solid var(--mm-row-line)}}\r
@container(max-width:420px){.mm .mm-tabs{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 8px;overflow:visible;padding-inline:16px}.mm .mm-tabs button{min-width:0;flex-shrink:1;text-align:center;white-space:nowrap;padding:9px 2px}}\r
@container(max-width:420px){.mm .mm-task-overview{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));overflow:visible;padding:0}.mm .mm-task-overview span{min-width:0;padding:10px 8px;white-space:normal;flex-wrap:wrap;gap:3px}.mm .mm-task-overview span+span{border-left:0}.mm .mm-task-overview span:nth-child(even){border-left:1px solid var(--mm-divider)}.mm .mm-task-overview span:nth-child(n+3){border-top:1px solid var(--mm-divider)}}\r
`;

// src/native-trace.css
var native_trace_default = `.mm-trace{container-type:inline-size;min-width:0;margin-top:20px}\r
.mm-trace-title{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:20px}\r
.mm-trace-eyebrow{color:var(--mm-muted);font-size:10px;letter-spacing:.14em;font-family:Consolas,monospace}\r
.mm-trace-title h3{font-size:19px;font-weight:600;line-height:1.5;margin:6px 0 0}\r
.mm-trace-live{display:flex;align-items:center;gap:6px;font-size:11px;color:var(--mm-good-text);white-space:nowrap}\r
.mm-trace-live:before{content:'';width:6px;height:6px;border-radius:50%;background:currentColor}\r
.mm-trace-live.is-paused{color:var(--mm-wait-text)}\r
.mm-trace-chain{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));background:var(--mm-surface);border:1px solid var(--mm-surface-border);border-radius:8px;overflow:hidden}\r
.mm-trace-chain>div{position:relative;display:flex;flex-direction:column;align-items:flex-start;gap:7px;padding:16px;min-width:0}\r
.mm-trace-chain>div+div{border-left:1px solid var(--mm-line)}\r
.mm-trace-chain>div+div:before{content:'\u203A';position:absolute;left:-5px;top:43%;background:var(--mm-surface);color:var(--mm-muted)}\r
.mm-trace-chain span,.mm-trace-chain small{font-size:11px;color:var(--mm-muted)}\r
.mm .mm-trace-chain button{padding:0;min-height:24px;background:transparent;border:0;color:var(--mm-text);font:12px Consolas,monospace;max-width:100%;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}\r
.mm-trace-chain .is-confirmed button,.mm-trace-chain .is-confirmed small{color:var(--mm-good-text)}\r
.mm-trace-context{display:flex;flex-wrap:wrap;gap:10px 18px;padding:12px 0;color:var(--mm-muted);font-size:11px}\r
.mm-trace-context strong{color:var(--mm-text);text-transform:uppercase;letter-spacing:.04em}\r
.mm-trace-bindings,.mm-trace-source{font-size:11px;color:var(--mm-muted);margin:6px 0 18px}\r
.mm-trace-bindings summary,.mm-trace-source summary{cursor:pointer}\r
.mm-trace-bindings dl{padding:12px;background:var(--mm-surface);border-radius:6px}\r
.mm-trace-bindings dl>div{display:grid;grid-template-columns:75px minmax(0,1fr);gap:12px;padding:5px 0}\r
.mm-trace-bindings dd{font:11px/1.7 Consolas,monospace;white-space:pre-wrap;overflow-wrap:anywhere;margin:0;color:var(--mm-text)}\r
.mm-trace-toolbar{display:flex;gap:8px;margin-top:16px}.mm-trace-toolbar input{flex:1;min-width:0}.mm-trace-toolbar button{white-space:nowrap}\r
.mm-trace-filters{display:flex;gap:5px;flex-wrap:wrap;padding:12px 0}\r
.mm .mm-trace-filters button{border:1px solid transparent;background:transparent;padding:5px 9px;min-height:28px;color:var(--mm-muted);font-size:11px}\r
.mm .mm-trace-filters button[aria-pressed=true]{background:var(--mm-active-bg);border-color:var(--mm-active-border);color:var(--mm-active-text)}\r
.mm-trace-filters button span{font-size:10px;opacity:.8;margin-left:5px}\r
.mm-trace-console{border:1px solid var(--mm-surface-border);border-radius:7px;overflow:hidden;background:var(--mm-canvas)}\r
.mm-trace-feed{max-height:430px;overflow:auto;min-width:0;scrollbar-width:thin;scrollbar-color:var(--mm-scroll) var(--mm-scroll-track)}\r
.mm-trace-column-head{position:sticky;top:0;z-index:1;background:var(--mm-chrome);display:grid;grid-template-columns:92px minmax(0,1fr);gap:12px;padding:10px 14px;font-size:10px;letter-spacing:.04em;color:var(--mm-muted);border-bottom:1px solid var(--mm-line)}\r
.mm button.mm-trace-event{display:grid;grid-template-columns:92px minmax(0,1fr);align-items:start;gap:12px;width:100%;text-align:left;border:0;border-bottom:1px solid var(--mm-line);border-radius:0;padding:11px 14px;background:transparent}\r
.mm button.mm-trace-event:hover{background:var(--mm-row-hover)}\r
.mm button.mm-trace-event.is-selected{background:var(--mm-active-bg);box-shadow:inset 0 0 0 1px var(--mm-accent)}\r
.mm-trace-event-time{display:flex;flex-direction:column;gap:4px;color:var(--mm-muted);font:11px/1.5 Consolas,monospace}\r
.mm-trace-event-time small{font-size:9px;color:var(--mm-muted)}\r
.mm-trace-event-body{min-width:0;display:flex;flex-direction:column;gap:5px;font:12px/1.6 Consolas,"Microsoft YaHei",monospace;overflow-wrap:anywhere}\r
.mm-trace-event-body>span:last-child{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}\r
.mm-trace-event-label{font:10px/1.4 "Segoe UI","Microsoft YaHei",sans-serif;color:var(--mm-muted)}\r
.mm-trace-event[data-kind=tool] .mm-trace-event-label{color:var(--mm-accent)}\r
.mm-trace-event[data-kind=error] .mm-trace-event-label{color:var(--mm-error)}\r
.mm-trace-event[data-kind=session] .mm-trace-event-label{color:var(--mm-good-text)}\r
.mm-trace-record{min-width:0;border-top:1px solid var(--mm-line);background:var(--mm-surface);padding:16px}\r
.mm-trace-record header{display:flex;justify-content:space-between;gap:12px;align-items:center}.mm-trace-record h4{margin:5px 0;font-size:14px}\r
.mm-trace-record-facts{display:flex;gap:12px;align-items:center;color:var(--mm-muted);font-size:11px;margin:12px 0}.mm-trace-record-facts button{margin-left:auto;font-size:11px}\r
.mm-trace-record pre{max-height:360px;overflow:auto;font:11px/1.7 Consolas,"Microsoft YaHei",monospace;white-space:pre-wrap;overflow-wrap:anywhere;background:var(--mm-canvas);padding:14px;border-radius:5px;margin:0;tab-size:2}\r
.mm-trace-foot{display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;color:var(--mm-muted);font-size:10px;padding:10px 0}\r
.mm-trace-source{margin:10px 0}.mm-trace-source p{line-height:1.8;max-width:90ch}\r
.mm-trace-empty{padding:30px 20px;border:1px dashed var(--mm-empty-border);border-radius:8px;text-align:center;background:var(--mm-surface)}.mm-trace-empty>span{font-size:30px;color:var(--mm-accent)}.mm-trace-empty h4{margin:12px 0;font-size:15px}.mm-trace-empty p{max-width:62ch;margin:12px auto 20px;font-size:12px;line-height:1.8;color:var(--mm-muted)}\r
.mm-trace-no-results{padding:30px 18px;color:var(--mm-muted);font-size:12px;text-align:center}\r
.mm-trace-capture-picker{display:flex;align-items:center;gap:12px;font-size:11px}.mm-trace-capture-picker select{flex:1;min-width:0}\r
.mm-evidence-switch{display:flex;gap:6px;align-items:center;border-bottom:1px solid var(--mm-line);padding-bottom:12px}\r
.mm .mm-evidence-switch button[aria-pressed=true]{background:var(--mm-active-bg);border-color:var(--mm-active-border);color:var(--mm-active-text)}\r
.mm-evidence-switch button:last-child{margin-left:auto}\r
.mm-relation-workspace.trace-focused.has-inspector{display:block}.mm-relation-workspace.trace-focused.has-inspector>.mm-relation-canvas{display:none}.mm-relation-workspace.trace-focused.has-inspector>.mm-run-inspector{border:0;padding:0}\r
@container(min-width:760px){.mm-trace-console.has-selection{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr)}.mm-trace-console.has-selection .mm-trace-record{border-top:0;border-left:1px solid var(--mm-line)}.mm-trace-console.has-selection .mm-trace-feed{max-height:520px}}\r
@container(max-width:450px){.mm-trace-chain>div{padding:12px 8px}.mm-trace-title{align-items:flex-start}.mm-trace-title h3{font-size:16px}.mm-trace-event-time{font-size:10px}.mm button.mm-trace-event,.mm-trace-column-head{grid-template-columns:75px minmax(0,1fr);gap:8px;padding-inline:10px}.mm-trace-live{font-size:10px}}\r
`;

// src/run-conversation.css
var run_conversation_default = `.mm-conversation{min-width:0;container-type:inline-size;margin-top:18px;border:1px solid var(--mm-surface-border);border-radius:10px;background:var(--mm-surface);overflow:hidden}
.mm-chat-overview{padding:20px 24px 16px;display:flex;justify-content:space-between;gap:16px;align-items:center;flex-wrap:wrap}
.mm-chat-status-line{display:flex;align-items:center;gap:10px}.mm-chat-status-line>strong{font-size:14px}.mm-chat-run-id{font:11px Consolas,monospace;color:var(--mm-muted)}
.mm-chat-chip{display:inline-block;white-space:nowrap;font-size:10px;font-weight:500;border-radius:4px;padding:3px 7px;color:var(--mm-secondary);background:var(--mm-hover)}
.mm-chat-chip[data-tone=returned]{color:var(--mm-good-text);background:var(--mm-good-bg)}.mm-chat-chip[data-tone=pending]{color:var(--mm-wait-text);background:var(--mm-wait-bg)}.mm-chat-chip[data-tone=error]{color:var(--mm-danger-text);background:var(--mm-danger-bg)}
.mm-chat-facts{display:flex;gap:18px;flex-wrap:wrap;font-size:11px;color:var(--mm-muted)}.mm-chat-facts strong{color:var(--mm-text);font-weight:500;font-variant-numeric:tabular-nums;margin-left:4px}
.mm-chat-current{display:flex;align-items:center;gap:12px;margin:0 24px 16px;padding:13px 16px;border:1px solid var(--mm-accent);background:var(--mm-canvas);border-radius:5px}.mm-chat-current>div{min-width:0;flex:1}.mm-chat-current strong{font-size:12px}.mm-chat-current p{font-size:11px;color:var(--mm-muted);margin-top:4px;overflow-wrap:anywhere}.mm-chat-state-dot{width:6px;height:6px;border-radius:50%;background:var(--mm-accent);flex:none}.mm-chat-current[data-uncertain]{border-color:var(--mm-attention);background:var(--mm-wait-bg)}
.mm-chat-current details{max-width:48%;font-size:11px;color:var(--mm-muted)}.mm-chat-current summary{cursor:pointer;text-align:right}.mm-chat-current details[open]{flex:1}
.mm-chat-toolbar{display:flex;align-items:center;gap:8px;padding:0 24px 16px}.mm .mm-chat-toolbar input{min-height:32px;height:32px;font-size:12px;flex:1;background:var(--mm-canvas)}.mm .mm-chat-toolbar button{min-height:32px;padding:5px 10px;font-size:11px;background:transparent}.mm .mm-chat-toolbar button[aria-pressed=true]{color:var(--mm-accent);border-color:var(--mm-active-border);background:var(--mm-active-bg)}
.mm-chat-feed{height:560px;max-height:70vh;min-height:280px;overflow:auto;padding:28px max(24px,calc((100% - 860px)/2));border-top:1px solid var(--mm-line);border-bottom:1px solid var(--mm-line);scrollbar-width:thin;scrollbar-color:var(--mm-scroll) transparent;overflow-anchor:none;background:var(--mm-surface)}
.mm-chat-context{margin:0 0 32px 42px;padding:18px 20px;background:var(--mm-canvas);border:1px solid var(--mm-line);border-radius:9px 2px 9px 9px}.mm-chat-context-label{display:flex;justify-content:space-between;font-size:10px;color:var(--mm-muted);margin-bottom:9px;letter-spacing:.04em}.mm .mm-chat-context h3{font-size:14px;font-weight:600;line-height:1.7;overflow-wrap:anywhere}.mm-chat-context>p{font-size:10px;color:var(--mm-muted);margin-top:12px}.mm-chat-context details{margin-top:12px}.mm-chat-context summary{font-size:11px;color:var(--mm-muted);cursor:pointer}
.mm-chat-event{display:flex;align-items:flex-start;gap:13px;margin-bottom:24px;min-width:0}.mm-chat-avatar{flex:none;display:flex;align-items:center;justify-content:center;width:29px;height:29px;border-radius:8px;background:var(--mm-active-bg);color:var(--mm-active-text);border:1px solid var(--mm-active-border);font-size:12px;font-weight:600}.mm-chat-avatar.is-tool{background:var(--mm-canvas);color:var(--mm-muted);border-color:var(--mm-line);font:16px Consolas,monospace}.mm-chat-avatar.is-thinking{background:transparent;border-color:var(--mm-line);color:var(--mm-muted)}
.mm-chat-message{min-width:0;flex:1}.mm-chat-message>header{display:flex;gap:12px;align-items:center;min-height:29px;margin-bottom:8px}.mm-chat-message>header strong{font-size:12px;font-weight:600}.mm-chat-message>header time,.mm-chat-message>header>span{font-size:10px;color:var(--mm-muted);font-variant-numeric:tabular-nums}.mm-chat-message>header>span{margin-left:auto}
.mm .mm-chat-prose{font-size:14px;line-height:1.8;overflow-wrap:anywhere;word-break:break-word}.mm .mm-chat-prose p{white-space:pre-wrap;margin:3px 0}.mm .mm-chat-prose h4{margin:16px 0 6px;font-size:14px;font-weight:600}.mm-chat-prose h4:first-child{margin-top:4px}.mm-chat-paragraph-gap{height:7px}.mm-chat-list-line{display:flex;gap:10px;margin:5px 0}.mm-chat-list-line>span:first-child{color:var(--mm-muted)}.mm-chat-prose code{font:12px/1.7 Consolas,monospace;padding:2px 4px;border-radius:3px;background:var(--mm-canvas)}.mm-chat-prose pre{white-space:pre-wrap;overflow-wrap:anywhere;font:12px/1.7 Consolas,"Microsoft YaHei",monospace;background:var(--mm-canvas);padding:14px;border-radius:6px;max-height:320px;overflow:auto}
.mm-chat-tool-event{margin-bottom:12px}.mm-chat-tool{flex:1;min-width:0;border:1px solid var(--mm-line);border-radius:7px;background:var(--mm-canvas)}.mm-chat-tool>summary{cursor:pointer;padding:11px 14px;list-style:none}.mm-chat-tool>summary::-webkit-details-marker{display:none}.mm-chat-tool-heading{display:flex;gap:9px;align-items:center}.mm-chat-tool-heading:before{content:'\u203A';color:var(--mm-muted);font-size:16px;line-height:1;transition:transform .12s}.mm-chat-tool[open] .mm-chat-tool-heading:before{transform:rotate(90deg)}.mm-chat-tool-heading>strong{font:600 11px Consolas,"Microsoft YaHei",monospace;overflow-wrap:anywhere}.mm-chat-tool-heading>time{margin-left:auto;color:var(--mm-muted);font-size:10px;font-variant-numeric:tabular-nums}.mm-chat-tool-preview{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;color:var(--mm-secondary);font:11px/1.6 Consolas,"Microsoft YaHei",monospace;margin:6px 0 0 14px;overflow-wrap:anywhere}.mm-chat-tool>summary:hover{background:var(--mm-row-hover);border-radius:7px}.mm-chat-tool-body{padding:0 14px 14px;border-top:1px solid var(--mm-line)}
.mm-chat-payload{margin-top:14px}.mm-chat-payload>div{display:flex;justify-content:space-between;gap:8px;font-size:10px;color:var(--mm-muted);margin-bottom:7px}.mm-chat-payload strong{font-weight:500}.mm-chat-payload pre{margin:0;background:var(--mm-surface);padding:12px;border:1px solid var(--mm-line);border-radius:5px;max-height:300px;overflow:auto;white-space:pre-wrap;overflow-wrap:anywhere;font:11px/1.75 Consolas,"Microsoft YaHei",monospace}.mm-chat-evidence{display:flex;gap:16px;flex-wrap:wrap;color:var(--mm-muted);font-size:10px;margin-top:12px}
.mm-chat-thinking{color:var(--mm-muted);font-size:12px}.mm-chat-thinking summary{cursor:pointer;line-height:1.7}.mm-chat-thinking[open] summary{margin-bottom:12px}.mm-chat-event.is-error .mm-chat-avatar{color:var(--mm-danger-text);background:var(--mm-danger-bg);border-color:var(--mm-danger-border)}.mm-chat-event.is-error .mm-chat-message{border:1px solid var(--mm-danger-border);border-radius:5px;background:var(--mm-danger-bg);padding:12px 14px}.mm-chat-event.is-error header strong{color:var(--mm-danger-text)}
.mm-chat-end{text-align:center;color:var(--mm-muted);font-size:10px;margin:30px 0 3px}.mm-chat-bottom{display:flex;align-items:center;justify-content:space-between;padding:9px 24px;gap:8px;background:var(--mm-canvas);font-size:11px;color:var(--mm-muted)}.mm .mm-chat-bottom button{border:0;background:transparent;color:var(--mm-accent);padding:4px 0;font-size:11px;min-height:28px}.mm-chat-source{display:flex;justify-content:space-between;gap:8px;padding:10px 24px;font-size:10px;color:var(--mm-muted);flex-wrap:wrap}.mm-chat-note{font-size:11px;color:var(--mm-muted);line-height:1.7;margin-top:10px!important}.mm-chat-coverage{padding:0 24px 12px}.mm-chat-notices{font-size:11px;color:var(--mm-muted);padding:0 24px 12px}.mm-chat-notices summary{cursor:pointer}.mm-chat-notices p{margin-top:8px}.mm-chat-alert{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:0 24px 16px;padding:12px;background:var(--mm-danger-bg);color:var(--mm-danger-text);border-radius:5px;font-size:12px}.mm-chat-empty{display:flex;flex-direction:column;align-items:center;gap:12px;padding:36px 16px;text-align:center;color:var(--mm-muted)}.mm-chat-empty>span{font-size:28px}.mm-chat-empty strong{color:var(--mm-text);font-size:13px}.mm-chat-empty p{font-size:12px}.mm .mm-chat-text-action{font-size:11px;min-height:28px;margin-top:8px;background:transparent;color:var(--mm-accent)}
@container(max-width:560px){.mm-chat-overview{padding:16px;gap:12px}.mm-chat-current{margin:0 16px 12px}.mm-chat-toolbar{padding:0 16px 12px;flex-wrap:wrap}.mm-chat-toolbar input{flex-basis:100%!important}.mm-chat-feed{padding:20px 14px;height:520px}.mm-chat-context{margin-left:0;padding:14px}.mm-chat-event{gap:8px}.mm-chat-avatar{width:25px;height:25px;font-size:11px}.mm-chat-tool-heading{flex-wrap:wrap;gap:6px}.mm-chat-tool-heading time{font-size:9px}.mm-chat-tool>summary{padding:10px}.mm-chat-bottom,.mm-chat-source{padding-inline:16px}.mm-chat-current details{max-width:36%}.mm-chat-facts{gap:10px}.mm-chat-run-id{display:none}}
@media(prefers-reduced-motion:reduce){.mm-chat-tool-heading:before{transition:none}}
`;

// src/run-conversation.jsx
var import_react4 = __toESM(require("react"), 1);

// src/run-conversation.mjs
var activeRunStates = /* @__PURE__ */ new Set(["running", "queued", "dispatched", "deferred", "waiting_local_directory"]);
var conversationStatusLabels = { running: "\u8FD0\u884C\u4E2D", queued: "\u6392\u961F\u4E2D", dispatched: "\u5DF2\u6D3E\u53D1", deferred: "\u6682\u7F13\u6267\u884C", waiting_local_directory: "\u7B49\u5F85\u672C\u5730\u76EE\u5F55", completed: "\u8FD0\u884C\u5B8C\u6210", failed: "\u8FD0\u884C\u5931\u8D25", cancelled: "\u5DF2\u53D6\u6D88", unknown: "\u72B6\u6001\u5F85\u6838\u5B9E" };
var printable = (value) => typeof value === "string" ? value : value == null ? "" : JSON.stringify(value, null, 2);
var validTime = (value) => Number.isFinite(Date.parse(value)) ? Date.parse(value) : null;
function mergeConversation(previous, incoming, limit = 1e3) {
  if (!incoming.length) return { messages: previous, trimmed: false };
  const map = new Map(previous.map((message) => [message.seq, message]));
  for (const message of incoming) map.set(message.seq, message);
  const all = [...map.values()].sort((a, b) => a.seq - b.seq);
  let bytes = 0, start = all.length;
  while (start > 0 && all.length - start < limit) {
    const size = new TextEncoder().encode(JSON.stringify(all[start - 1])).byteLength;
    if (bytes + size > 8e6) break;
    bytes += size;
    start--;
  }
  return { messages: all.slice(start), trimmed: start > 0 };
}
function conversationEntries(messages) {
  const entries = [], calls = /* @__PURE__ */ new Map(), ambiguous = /* @__PURE__ */ new Set();
  let gaps = false, previous = 0, previousType = "";
  for (const message of messages) {
    const contiguous = message.seq === previous + 1, priorType = previousType;
    if (!contiguous) gaps = true;
    previous = message.seq;
    previousType = message.type;
    if (message.type === "tool_use") {
      const entry = { kind: "tool", seq: message.seq, call: message, result: null, ambiguous: false };
      entries.push(entry);
      if (message.callId) {
        if (calls.has(message.callId)) {
          calls.get(message.callId).ambiguous = true;
          ambiguous.add(message.callId);
        }
        entry.ambiguous = ambiguous.has(message.callId);
        calls.set(message.callId, entry);
      }
    } else if (message.type === "tool_result") {
      const entry = message.callId && calls.get(message.callId);
      if (entry && !entry.result && !entry.ambiguous && (!message.tool || message.tool === entry.call.tool)) entry.result = message;
      else entries.push({ kind: "tool", seq: message.seq, call: null, result: message, ambiguous: true });
    } else {
      const prior = entries.at(-1);
      if (contiguous && ["text", "thinking"].includes(message.type) && priorType === message.type && prior?.kind === message.type) {
        prior.message = { ...prior.message, content: printable(prior.message.content) + printable(message.content), contentTruncated: prior.message.contentTruncated || message.contentTruncated };
        prior.lastSeq = message.seq;
        prior.lastAt = message.createdAt;
      } else entries.push({ kind: message.type, seq: message.seq, message });
    }
  }
  return { entries, gaps };
}
function toolSummary(entry) {
  const input = entry.call?.input || {};
  return printable(input.description || input.command || input.cmd || input.file_path || input.filePath || input.path || input.query || input.subject || !entry.call && (entry.result?.output || entry.result?.content) || entry.call?.tool || entry.result?.tool || "\u5DE5\u5177\u8BB0\u5F55").replace(/\s+/g, " ").slice(0, 240);
}
function conversationActivity({ messages, run, loading = false, hasMore = false, error = "", unavailable = false, now = Date.now() }) {
  const last = messages.at(-1), active6 = activeRunStates.has(run.status);
  const { entries, gaps } = conversationEntries(messages);
  const lastAt = validTime(last?.createdAt), startedAt = validTime(run.startedAt), endedAt = validTime(run.completedAt);
  const elapsed2 = startedAt != null && (endedAt != null || active6) ? Math.max(0, (endedAt ?? now) - startedAt) : null;
  const silence = active6 && (lastAt ?? startedAt) != null ? Math.max(0, now - (lastAt ?? startedAt)) : null;
  let title, detail;
  if (error || unavailable) {
    title = "\u8FDE\u63A5\u5F02\u5E38 \xB7 \u5F53\u524D\u8FDB\u5C55\u5F85\u6838\u5B9E";
    detail = "\u4FDD\u7559\u4E0A\u6B21\u8BFB\u53D6\u7684\u8BB0\u5F55\uFF0C\u6062\u590D\u8FDE\u63A5\u540E\u7EE7\u7EED\u540C\u6B65\u3002";
  } else if (loading || hasMore) {
    title = "\u6B63\u5728\u8BFB\u53D6\u6267\u884C\u8BB0\u5F55";
    detail = "\u5386\u53F2\u6D88\u606F\u5C1A\u672A\u8865\u9F50\uFF0C\u6682\u4E0D\u5224\u65AD\u5F53\u524D\u505C\u5728\u54EA\u91CC\u3002";
  } else if (!active6) {
    title = conversationStatusLabels[run.status] || "\u72B6\u6001\u5F85\u6838\u5B9E";
    detail = run.status === "completed" ? "\u672C\u6B21\u8FD0\u884C\u5DF2\u7ED3\u675F\uFF0C\u4EE5\u4E0B\u662F\u5DF2\u4E0A\u62A5\u7684\u6267\u884C\u8FC7\u7A0B\u3002" : run.status === "failed" ? "\u672C\u6B21\u8FD0\u884C\u5931\u8D25\uFF0C\u53EF\u5C55\u5F00\u9519\u8BEF\u548C\u6700\u540E\u7684\u5DE5\u5177\u8BB0\u5F55\u3002" : "\u4EE5\u4E0B\u5C55\u793A\u5DF2\u8BFB\u53D6\u7684\u8BB0\u5F55\u3002";
  } else if (run.status !== "running") {
    title = conversationStatusLabels[run.status];
    detail = "\u5C1A\u672A\u8FDB\u5165\u8FD0\u884C\u72B6\u6001\u3002";
  } else {
    title = last ? "\u7B49\u5F85\u65B0\u53CD\u9988" : "\u7B49\u5F85\u9996\u6761\u53CD\u9988";
    detail = "\u6700\u8FD1\u6CA1\u6709\u65B0\u7684\u6267\u884C\u6D88\u606F\uFF0C\u5177\u4F53\u6D3B\u52A8\u5C1A\u672A\u786E\u8BA4\u3002";
  }
  let lastAction = "\u5C1A\u672A\u6536\u5230\u6267\u884C\u6D88\u606F";
  if (last?.type === "tool_result") {
    const entry = entries.find((item) => item.result?.seq === last.seq);
    lastAction = `\u5DE5\u5177\u5DF2\u8FD4\u56DE \xB7 ${entry?.call?.tool || last.tool || "\u5DE5\u5177"}`;
  } else if (last?.type === "tool_use") lastAction = `\u6536\u5230\u5DE5\u5177\u8C03\u7528 \xB7 ${last.tool || "\u5DE5\u5177"}${last.callId ? "\uFF08\u7ED3\u679C\u5C1A\u672A\u6536\u5230\uFF09" : ""}`;
  else if (last?.type === "text") lastAction = "\u6536\u5230\u667A\u80FD\u4F53\u56DE\u590D";
  else if (last?.type === "thinking") lastAction = "\u6536\u5230\u601D\u8003\u5185\u5BB9";
  else if (last?.type === "error") lastAction = "\u6536\u5230\u9519\u8BEF\u4FE1\u606F";
  else if (last) lastAction = "\u6536\u5230\u6267\u884C\u4E8B\u4EF6";
  return { active: active6, title, detail, lastAction, lastAt: last?.createdAt || null, elapsed: elapsed2, silence, partial: gaps, uncertain: Boolean(error || unavailable || loading || hasMore) };
}
function shortDuration(ms) {
  if (ms == null || !Number.isFinite(ms)) return "\u2014";
  const seconds = Math.floor(Math.max(0, ms) / 1e3);
  return seconds < 60 ? `${seconds} \u79D2` : seconds < 3600 ? `${Math.floor(seconds / 60)} \u5206 ${seconds % 60} \u79D2` : `${Math.floor(seconds / 3600)} \u5C0F\u65F6 ${Math.floor(seconds / 60) % 60} \u5206`;
}

// src/run-conversation.jsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var clock = (value) => value && Number.isFinite(Date.parse(value)) ? new Date(value).toLocaleTimeString("zh-CN", { hour12: false }) : "\u65F6\u95F4\u672A\u63D0\u4F9B";
var inline = (text5) => text5.split(/(\*\*[^*\n]+\*\*|`[^`\n]+`|\[[^\]\n]+\]\([^\s)]+\))/g).map((part, i) => {
  if (part.startsWith("**") && part.endsWith("**")) return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("strong", { children: part.slice(2, -2) }, i);
  if (part.startsWith("`") && part.endsWith("`")) return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("code", { children: part.slice(1, -1) }, i);
  const link = part.match(/^\[([^\]]+)\]\(([^\s)]+)\)$/);
  if (link) {
    try {
      const url = new URL(link[2]);
      if (["http:", "https:"].includes(url.protocol)) return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("a", { href: url.href, target: "_blank", rel: "noreferrer", children: link[1] }, i);
    } catch {
    }
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: link[1] }, i);
  }
  return part;
});
function ReadableText({ text: text5 = "", limit = 5e3 }) {
  const [expanded, setExpanded] = (0, import_react4.useState)(false);
  const boundary = text5.lastIndexOf("\n\n", limit);
  const shown = text5.length > limit && !expanded ? text5.slice(0, boundary > limit / 2 ? boundary : limit) : text5;
  const blocks = shown.split(/(```[\s\S]*?(?:```|$))/g).filter(Boolean).map((block, i) => {
    if (block.startsWith("```")) return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("pre", { children: block.replace(/^```[^\n]*\n?/, "").replace(/```$/, "") }, i);
    const lines = block.split("\n"), nodes = [];
    const cells = (line) => line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim());
    for (let j = 0; j < lines.length; j++) {
      const line = lines[j];
      if (line.includes("|") && lines[j + 1]?.includes("|") && cells(lines[j + 1]).every((cell) => /^:?-{3,}:?$/.test(cell))) {
        const headings = cells(line), rows = [], key = j;
        j += 2;
        while (j < lines.length && lines[j].includes("|") && lines[j].trim()) {
          rows.push(cells(lines[j]));
          j++;
        }
        j--;
        nodes.push(/* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "mm-chat-table-wrap", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("table", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("tr", { children: headings.map((cell, k) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("th", { children: inline(cell) }, k)) }) }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("tbody", { children: rows.map((row, k) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("tr", { children: headings.map((_, n) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("td", { children: inline(row[n] || "") }, n)) }, k)) })
        ] }) }, key));
      } else if (/^#{1,6}\s/.test(line)) nodes.push(/* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h4", { children: inline(line.replace(/^#{1,6}\s+/, "")) }, j));
      else if (/^\s*(?:[-*]|\d+[.)])\s/.test(line)) nodes.push(/* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "mm-chat-list-line", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { "aria-hidden": "true", children: line.trim().match(/^\d+[.)]/)?.[0] || "\u2022" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: inline(line.replace(/^\s*(?:[-*]|\d+[.)])\s+/, "")) })
      ] }, j));
      else if (/^>\s?/.test(line)) nodes.push(/* @__PURE__ */ (0, import_jsx_runtime3.jsx)("blockquote", { children: inline(line.replace(/^>\s?/, "")) }, j));
      else if (line.trim()) nodes.push(/* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: inline(line) }, j));
      else nodes.push(/* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "mm-chat-paragraph-gap" }, j));
    }
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { children: nodes }, i);
  });
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "mm-chat-prose", children: [
    blocks,
    text5.length > limit && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { className: "mm-chat-text-action", onClick: () => setExpanded((value) => !value), children: expanded ? "\u6536\u8D77\u957F\u5185\u5BB9" : "\u5C55\u5F00\u5B8C\u6574\u5185\u5BB9" })
  ] });
}
function Payload({ label, value, note }) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("section", { className: "mm-chat-payload", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("strong", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(TypeIcon, { type: label === "\u8C03\u7528\u53C2\u6570" ? "tool_use" : "tool_result", size: 14 }),
        label
      ] }),
      note && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: note })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("pre", { children: printable(value) || "\uFF08\u7A7A\u8F93\u51FA\uFF09" })
  ] });
}
function ConversationEntry({ entry, agentName }) {
  if (entry.kind === "tool") {
    const { call, result } = entry;
    const failed = result?.isError === true;
    const unidentified = !(call?.callId || result?.callId);
    const label = unidentified ? result ? "\u8FD4\u56DE\u8BB0\u5F55" : "\u8C03\u7528\u8BB0\u5F55" : entry.ambiguous ? "\u914D\u5BF9\u5F85\u6838\u5B9E" : result ? failed ? "\u8FD4\u56DE\u9519\u8BEF" : "\u5DF2\u8FD4\u56DE" : "\u7ED3\u679C\u5C1A\u672A\u6536\u5230";
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("article", { className: "mm-chat-event mm-chat-tool-event", "data-seq": entry.seq, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "mm-chat-avatar is-tool", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(TypeIcon, { type: "tool", isError: failed, size: 18 }) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("details", { className: "mm-chat-tool", "data-failed": failed || void 0, children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("summary", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "mm-chat-tool-heading", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("strong", { children: call?.tool || result?.tool || "\u5DE5\u5177\u7ED3\u679C" }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "mm-chat-chip", "data-tone": failed ? "error" : unidentified ? "neutral" : result ? "returned" : "pending", children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(TypeIcon, { type: result ? "tool_result" : "wait", isError: failed, size: 12 }),
              label
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("time", { children: clock(call?.createdAt || result?.createdAt) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "mm-chat-tool-preview", children: toolSummary(entry) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "mm-chat-tool-body", children: [
          call?.input != null && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Payload, { label: "\u8C03\u7528\u53C2\u6570", value: call.input, note: call.inputTruncated ? "\u8F93\u5165\u5DF2\u622A\u65AD" : void 0 }),
          result && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Payload, { label: "\u8FD4\u56DE\u5185\u5BB9", value: result.output || result.content, note: result.outputTruncated === true ? "\u8F93\u51FA\u5DF2\u622A\u65AD" : result.outputTruncated == null ? "\u8F93\u51FA\u5B8C\u6574\u6027\u672A\u63D0\u4F9B" : void 0 }),
          unidentified ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "mm-chat-note", children: "\u670D\u52A1\u7AEF\u672A\u63D0\u4F9B\u5173\u8054\u6807\u8BC6\uFF0C\u8C03\u7528\u4E0E\u8FD4\u56DE\u5206\u522B\u5C55\u793A\u3002" }) : !result && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "mm-chat-note", children: "\u5DF2\u6536\u5230\u8C03\u7528\u8BB0\u5F55\uFF0C\u5C1A\u672A\u6536\u5230\u5BF9\u5E94\u7ED3\u679C\uFF1B\u4E0D\u4EE3\u8868\u5DE5\u5177\u6B64\u523B\u4ECD\u5728\u6267\u884C\u3002" }),
          entry.ambiguous && !unidentified && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "mm-chat-note", children: "\u8C03\u7528\u4E0E\u7ED3\u679C\u65E0\u6CD5\u552F\u4E00\u914D\u5BF9\uFF0C\u6309\u72EC\u7ACB\u8BB0\u5F55\u5C55\u793A\u3002" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "mm-chat-evidence", children: [
            call && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { children: [
              "\u8C03\u7528 #",
              call.seq,
              " \xB7 ",
              clock(call.createdAt)
            ] }),
            result && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { children: [
              "\u8FD4\u56DE #",
              result.seq,
              " \xB7 ",
              clock(result.createdAt)
            ] })
          ] })
        ] })
      ] })
    ] });
  }
  const message = entry.message, thinking = entry.kind === "thinking", failure = entry.kind === "error";
  const content = message.content || message.output || "";
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("article", { className: `mm-chat-event ${failure ? "is-error" : ""}`, "data-seq": entry.seq, children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: `mm-chat-avatar ${thinking ? "is-thinking" : ""}`, "aria-hidden": "true", children: thinking || failure || entry.kind !== "text" ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(TypeIcon, { type: entry.kind, isError: failure, size: 18 }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(AgentAvatar, { name: agentName, size: 24 }) }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "mm-chat-message", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("header", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("strong", { children: [
          entry.kind === "text" && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(TypeIcon, { type: "text", size: 14 }),
          " ",
          failure ? "\u6267\u884C\u9519\u8BEF" : thinking ? "\u601D\u8003\u8BB0\u5F55" : entry.kind === "text" ? agentName || "\u667A\u80FD\u4F53" : "\u6267\u884C\u4E8B\u4EF6"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("time", { children: clock(entry.lastAt || message.createdAt) }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { children: [
          "#",
          message.seq,
          entry.lastSeq ? `\u2013${entry.lastSeq}` : ""
        ] })
      ] }),
      thinking ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("details", { className: "mm-chat-thinking", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("summary", { children: content.trim().split("\n")[0]?.slice(0, 90) || "\u67E5\u770B\u601D\u8003\u5185\u5BB9" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ReadableText, { text: content })
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ReadableText, { text: content || "\u670D\u52A1\u7AEF\u672A\u63D0\u4F9B\u4E8B\u4EF6\u6B63\u6587" }),
      message.contentTruncated && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "mm-chat-note", children: "\u5185\u5BB9\u5DF2\u622A\u65AD" })
    ] })
  ] });
}
function ConversationPanel({ run, issue, agentName, messages, loading, error, hasMore, trimmed, warnings = [], updated, unavailable, onRetry }) {
  const [now, setNow] = (0, import_react4.useState)(Date.now()), [following, setFollowing] = (0, import_react4.useState)(true), [query, setQuery] = (0, import_react4.useState)("");
  const feed = (0, import_react4.useRef)(null), acknowledged = (0, import_react4.useRef)(0);
  const status = conversationActivity({ messages, run, loading, error, hasMore, unavailable, now });
  const { entries } = conversationEntries(messages);
  const lastSeq = messages.at(-1)?.seq || 0;
  const visible = query.trim() ? entries.filter((entry) => printable(entry).toLowerCase().includes(query.trim().toLowerCase())) : entries;
  const unseen = messages.filter((message) => message.seq > acknowledged.current).length;
  (0, import_react4.useEffect)(() => {
    const timer = setInterval(() => setNow(Date.now()), 1e3);
    return () => clearInterval(timer);
  }, []);
  (0, import_react4.useEffect)(() => {
    if (following && !query && feed.current) {
      feed.current.scrollTop = feed.current.scrollHeight;
      acknowledged.current = lastSeq;
      const frame = requestAnimationFrame(() => {
        if (feed.current) feed.current.scrollTop = feed.current.scrollHeight;
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [lastSeq, following, query]);
  const pause = () => {
    if (following) {
      acknowledged.current = lastSeq;
      setFollowing(false);
    }
  };
  const latest = () => {
    setQuery("");
    acknowledged.current = lastSeq;
    setFollowing(true);
    if (feed.current) feed.current.scrollTop = feed.current.scrollHeight;
  };
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("section", { className: "mm-conversation", "aria-label": "\u6267\u884C\u5BF9\u8BDD", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "mm-chat-overview", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "mm-chat-status-line", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "mm-chat-chip", "data-tone": run.status === "failed" ? "error" : run.status === "completed" ? "returned" : "pending", children: unavailable ? "\u72B6\u6001\u5F85\u6838\u5B9E" : conversationStatusLabels[run.status] || run.status }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("strong", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(AgentAvatar, { name: agentName, size: 21 }),
          agentName || "\u667A\u80FD\u4F53"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "mm-chat-run-id", children: run.id.slice(-8) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "mm-chat-facts", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { children: [
          status.active ? "\u5DF2\u8FD0\u884C" : "\u8FD0\u884C\u8017\u65F6",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("strong", { children: shortDuration(status.elapsed) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { children: [
          "\u6700\u8FD1\u53CD\u9988 ",
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("strong", { children: status.lastAt ? clock(status.lastAt) : "\u6682\u65E0" })
        ] }),
        status.active && !status.uncertain && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { children: [
          "\u65E0\u65B0\u6D88\u606F ",
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("strong", { children: shortDuration(status.silence) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "mm-chat-current", "data-uncertain": status.uncertain || void 0, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "mm-chat-state-dot" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("strong", { children: status.title }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: status.lastAction })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("details", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("summary", { "aria-label": "\u72B6\u6001\u8BF4\u660E", children: "\u8BF4\u660E" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: status.detail })
      ] })
    ] }),
    error && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { role: "alert", className: "mm-chat-alert", children: [
      error,
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { onClick: onRetry, children: "\u91CD\u65B0\u8FDE\u63A5" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "mm-chat-toolbar", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("input", { "aria-label": "\u641C\u7D22\u6267\u884C\u5BF9\u8BDD", placeholder: "\u641C\u7D22\u56DE\u590D\u3001\u5DE5\u5177\u6216\u8F93\u51FA\u2026", value: query, onChange: (event) => {
        pause();
        setQuery(event.target.value);
      } }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { "aria-pressed": following && !query, onClick: () => following ? pause() : latest(), children: following && !query ? "\u6682\u505C\u8DDF\u968F" : "\u8DDF\u968F\u6700\u65B0" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { onClick: () => {
        pause();
        setQuery("");
        if (feed.current) feed.current.scrollTop = 0;
      }, children: "\u56DE\u5230\u5F00\u5934" })
    ] }),
    (trimmed || status.partial) && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("p", { className: "mm-chat-note mm-chat-coverage", children: [
      trimmed ? "\u5F53\u524D\u7A97\u53E3\u4FDD\u7559\u6700\u8FD1 1000 \u6761\u4EE5\u5185\u3001\u6700\u591A 8 MB \u7684\u6D88\u606F\u3002" : "\u6D88\u606F\u5E8F\u53F7\u5B58\u5728\u7F3A\u53E3\u3002",
      " \u90E8\u5206\u8F83\u65E9\u8BB0\u5F55\u53EF\u80FD\u672A\u5C55\u793A\u3002"
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "mm-chat-feed", ref: feed, tabIndex: 0, "aria-label": "\u6267\u884C\u6D88\u606F\u5217\u8868", onWheel: (event) => {
      if (event.deltaY < 0) pause();
    }, onTouchMove: pause, onKeyDown: (event) => {
      if (["ArrowUp", "PageUp", "Home"].includes(event.key)) pause();
    }, onPointerDown: (event) => {
      if (event.target === feed.current) pause();
    }, onClick: (event) => {
      if (event.target.closest("summary,button")) pause();
    }, children: [
      !query && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("article", { className: "mm-chat-context", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "mm-chat-context-label", children: [
          "\u4EFB\u52A1\u4E0A\u4E0B\u6587 ",
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: issue?.identifier })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h3", { children: issue?.title || "\u4EFB\u52A1\u6807\u9898\u672A\u63D0\u4F9B" }),
        run.triggerSummary && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("details", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("summary", { children: "\u672C\u6B21\u89E6\u53D1\u6458\u8981" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ReadableText, { text: run.triggerSummary })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: "\u6765\u81EA Multica \u7684\u4EFB\u52A1\u4E0E\u89E6\u53D1\u8BB0\u5F55\uFF0C\u5B8C\u6574 CLI \u63D0\u793A\u8BCD\u672A\u63D0\u4F9B\u3002" })
      ] }),
      visible.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ConversationEntry, { entry, agentName }, entry.seq)),
      !visible.length && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "mm-chat-empty", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { "aria-hidden": "true", children: query ? "\u2315" : "\u2026" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("strong", { children: query ? "\u6CA1\u6709\u5339\u914D\u7684\u6267\u884C\u8BB0\u5F55" : loading ? "\u6B63\u5728\u8BFB\u53D6\u6267\u884C\u8FC7\u7A0B" : error ? "\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u6267\u884C\u8BB0\u5F55" : "\u5C1A\u672A\u6536\u5230\u6267\u884C\u6D88\u606F" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: query ? "\u8BD5\u8BD5\u5DE5\u5177\u540D\u79F0\u3001\u547D\u4EE4\u6216\u56DE\u590D\u4E2D\u7684\u5173\u952E\u8BCD\u3002" : loading || error ? "\u7B49\u5F85\u4ECE Multica \u8BFB\u53D6\u672C\u6B21\u8FD0\u884C\u7684\u8BB0\u5F55\u3002" : activeRunStates.has(run.status) ? "\u6536\u5230\u65B0\u6D88\u606F\u540E\u4F1A\u81EA\u52A8\u663E\u793A\u5728\u8FD9\u91CC\u3002" : "\u8FD9\u6B21\u8FD0\u884C\u6CA1\u6709\u8FD4\u56DE\u53EF\u5C55\u793A\u7684\u6D88\u606F\u3002" })
      ] }),
      !query && messages.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "mm-chat-end", children: hasMore ? "\u6B63\u5728\u8865\u9F50\u66F4\u65E9\u7684\u8BB0\u5F55\u2026" : status.active ? "\u7B49\u5F85\u4E0B\u4E00\u6761\u6267\u884C\u6D88\u606F" : "\u672C\u6B21\u5DF2\u8BFB\u53D6\u7684\u8BB0\u5F55\u5230\u6B64\u7ED3\u675F" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "mm-chat-bottom", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { children: [
        hasMore ? "\u6B63\u5728\u8865\u9F50\u5386\u53F2" : `${entries.length} \u6761\u8FC7\u7A0B\u8BB0\u5F55`,
        " \xB7 ",
        following && !query ? "\u8DDF\u968F\u6700\u65B0" : "\u6B63\u5728\u9605\u8BFB\u5386\u53F2"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("button", { onClick: latest, children: [
        !following && unseen > 0 ? `${unseen} \u6761\u65B0\u6D88\u606F \xB7 ` : "",
        "\u56DE\u5230\u6700\u65B0 \u2193"
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "mm-chat-source", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: "\u6765\u81EA Multica \u6267\u884C\u6D88\u606F \xB7 \u6BCF 2 \u79D2\u540C\u6B65" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: updated ? `\u68C0\u67E5\u4E8E ${clock(updated)}` : "\u7B49\u5F85\u9996\u6B21\u540C\u6B65" })
    ] }),
    warnings.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("details", { className: "mm-chat-notices", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("summary", { children: "\u8BB0\u5F55\u5B8C\u6574\u6027\u8BF4\u660E" }),
      warnings.map((warning, i) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: warning }, i))
    ] })
  ] });
}
function useRunTranscript({ api, run, revision, enabled = true }) {
  const [data, setData] = (0, import_react4.useState)({ messages: [], waterfallMessages: [], waterfallTrimmed: false, hasMore: true, trimmed: false, warnings: [] });
  const [loading, setLoading] = (0, import_react4.useState)(true), [error, setError] = (0, import_react4.useState)(""), [updated, setUpdated] = (0, import_react4.useState)(""), [retry, setRetry] = (0, import_react4.useState)(0);
  (0, import_react4.useEffect)(() => {
    if (!enabled) return;
    let live = true, timer, cursor = 0;
    const controller = new AbortController();
    setData({ messages: [], waterfallMessages: [], waterfallTrimmed: false, hasMore: true, trimmed: false, warnings: [] });
    setLoading(true);
    setError("");
    setUpdated("");
    const sync = async () => {
      let delay = 2e3;
      try {
        if (document.visibilityState === "hidden") return;
        const result = await api("messages", { taskId: run.id, since: cursor }, controller.signal);
        if (!live) return;
        if (result.hasMore && result.lastSeq <= cursor) throw new Error("\u6D88\u606F\u8BFB\u53D6\u672A\u80FD\u524D\u8FDB\uFF0C\u8BF7\u91CD\u65B0\u8FDE\u63A5");
        cursor = result.lastSeq;
        setData((previous) => {
          const merged = mergeConversation(previous.messages, result.messages);
          const history2 = mergeConversation(previous.waterfallMessages, result.messages, 1e4);
          return { ...result, ...merged, waterfallMessages: history2.messages, waterfallTrimmed: previous.waterfallTrimmed || history2.trimmed, trimmed: previous.trimmed || merged.trimmed, warnings: [.../* @__PURE__ */ new Set([...previous.warnings, ...(result.warnings || []).filter((w) => !w.includes("\u7EE7\u7EED\u52A0\u8F7D"))])].slice(-8) };
        });
        setError("");
        setUpdated((/* @__PURE__ */ new Date()).toISOString());
        if (result.hasMore) delay = 100;
      } catch (reason) {
        if (live) setError(reason.message || "\u6267\u884C\u6D88\u606F\u8BFB\u53D6\u5931\u8D25");
      } finally {
        if (live) {
          setLoading(false);
          timer = setTimeout(sync, delay);
        }
      }
    };
    void sync();
    return () => {
      live = false;
      controller.abort();
      clearTimeout(timer);
    };
  }, [api, run.id, revision, retry, enabled]);
  return { ...data, loading, error, updated, onRetry: () => setRetry((value) => value + 1) };
}
function RunConversation({ api, run, issue, agentName, revision, unavailable = false }) {
  const data = useRunTranscript({ api, run, revision });
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ConversationPanel, { ...data, run, issue, agentName, unavailable });
}

// src/run-execution.css
var run_execution_default = ".mm-execution{container-type:inline-size;min-width:0;color:var(--mm-text);margin-top:16px}\n.mm-exec-summary{display:flex;align-items:baseline;justify-content:space-between;gap:12px 24px;flex-wrap:wrap;padding:14px 0;border-block:1px solid var(--mm-line)}\n.mm-exec-summary>strong{display:flex;align-items:center;gap:10px;font-size:14px;flex-wrap:wrap}.mm-exec-summary>strong>span{font-size:12px;font-weight:400;color:var(--mm-secondary)}\n.mm-exec-summary dl{display:flex;gap:16px;flex-wrap:wrap;margin:0}.mm-exec-summary dl>div{display:flex;gap:8px;align-items:baseline}.mm-exec-summary dt{color:var(--mm-secondary);font-size:12px}.mm-exec-summary dd{font-size:13px;font-variant-numeric:tabular-nums;margin:0}\n.mm-exec-last{display:flex;gap:6px 12px;align-items:baseline;flex-wrap:wrap;margin:12px 0!important;font-size:12px;color:var(--mm-secondary);overflow-wrap:anywhere}.mm-exec-last>strong{color:var(--mm-text);font-weight:500}.mm-exec-last-detail{flex-basis:100%;line-height:1.6;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}\n.mm-exec-note{color:var(--mm-secondary);font-size:12px;line-height:1.7;overflow-wrap:anywhere}.mm-exec-source{font-size:11px;color:var(--mm-secondary);margin:10px 0 6px!important;font-variant-numeric:tabular-nums}\n.mm-exec-io{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:24px;margin:22px 0}.mm-exec-io>section{min-width:0}.mm-exec-io h3{margin-bottom:8px;font-size:14px}.mm .mm-exec-io .mm-chat-prose{font-size:13px;line-height:1.7}.mm-exec-io details{margin-top:10px}.mm-exec-io summary{cursor:pointer;font-size:12px;min-height:30px}.mm-exec-boundary{margin-top:12px!important}.mm-exec-published+.mm-exec-published{margin-top:14px;border-top:1px solid var(--mm-line)}\n.mm-exec-origin{font-size:12px;display:inline-block;margin-top:12px}.mm-exec-next{margin-top:16px}.mm .mm-exec-next button{display:flex;background:transparent;white-space:normal;text-align:left;font-size:12px;margin-top:8px;min-height:32px}.mm-exec-next h4,.mm-exec-payloads h4{font-size:12px;margin:0 0 8px}\n.mm-exec-evidence{margin-top:16px}.mm-exec-important{margin-bottom:12px}.mm-exec-important h3{display:flex;gap:8px;align-items:baseline;margin:0 0 8px;font-size:13px}.mm-exec-important h3>span{font-size:12px;font-weight:400;color:var(--mm-secondary)}\n.mm-exec-slowest{margin-bottom:16px;padding:14px 0;border-block:1px solid var(--mm-line)}.mm-exec-slowest-heading{display:flex;align-items:baseline;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:4px}.mm-exec-slowest-heading h3{margin:0;font-size:13px}.mm-exec-slowest-heading span{font-size:11px;color:var(--mm-secondary)}.mm-exec-slowest ol{list-style:none;margin:10px 0 0;padding:0}.mm-exec-slowest li+li{border-top:1px solid var(--mm-line)}.mm .mm-exec-slowest li>button{display:grid;grid-template-columns:24px minmax(0,1fr) auto;gap:10px;align-items:center;width:100%;padding:10px 8px;border:0;border-radius:0;background:transparent;text-align:left;white-space:normal}.mm .mm-exec-slowest li>button:hover{background:var(--mm-hover)}.mm .mm-exec-slowest li>button[aria-pressed=true]{background:var(--mm-active-bg);box-shadow:inset 0 0 0 1px var(--mm-active-border)}.mm-exec-slow-rank{font-size:12px;color:var(--mm-secondary);font-variant-numeric:tabular-nums}.mm-exec-slow-body{min-width:0}.mm-exec-slow-body strong{display:block;font-size:12px;font-weight:500}.mm-exec-slow-body span{display:block;margin-top:3px;font-size:11px;color:var(--mm-secondary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mm-exec-slow-time{text-align:right;font-variant-numeric:tabular-nums}.mm-exec-slow-time strong{display:block;font-size:12px;font-weight:600}.mm-exec-slow-time small{display:block;margin-top:2px;color:var(--mm-secondary);font-size:10px}\n.mm .mm-exec-disclosure{display:flex;justify-content:space-between;align-items:center;gap:12px;width:100%;padding:10px 0;border:0;border-block:1px solid var(--mm-line);border-radius:0;background:transparent;font-size:12px;text-align:left;color:var(--mm-secondary)}.mm .mm-exec-disclosure:hover{background:var(--mm-hover);color:var(--mm-text)}.mm .mm-exec-disclosure[aria-expanded=true]{color:var(--mm-text)}.mm-exec-disclosure svg{flex:none}\n.mm-exec-records{padding-top:12px}.mm-exec-controls{display:flex;align-items:center;gap:8px 16px;flex-wrap:wrap;margin-bottom:10px}.mm-exec-controls label{display:flex;align-items:center;gap:8px;color:var(--mm-secondary);font-size:12px}.mm .mm-exec-controls select{width:auto;font-size:12px;min-height:32px;padding:5px 8px;background:var(--mm-surface)}\n.mm-exec-record-list{border-top:1px solid var(--mm-line)}.mm .mm-exec-record{display:grid;grid-template-columns:70px minmax(0,1fr) auto;align-items:start;gap:6px 12px;width:100%;border:0;border-bottom:1px solid var(--mm-line);border-radius:0;padding:12px 10px;text-align:left;white-space:normal;background:transparent;color:var(--mm-text)}.mm .mm-exec-record:hover{background:var(--mm-hover)}.mm .mm-exec-record[aria-pressed=true]{background:var(--mm-active-bg);box-shadow:inset 0 0 0 1px var(--mm-active-border)}.mm-exec-record time{font-size:11px;color:var(--mm-secondary);font-variant-numeric:tabular-nums;line-height:1.8}.mm-exec-record-body{min-width:0}.mm-exec-record-body>strong{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap;font-size:12px;font-weight:500}.mm-exec-record-body>strong>span{font-size:11px;font-weight:400;color:var(--mm-secondary)}.mm-exec-record-summary{display:block;font-size:12px;color:var(--mm-secondary);line-height:1.6;margin-top:4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mm-exec-record-open{grid-column:3;grid-row:1;font-size:11px;color:var(--mm-secondary);line-height:1.8}.mm-exec-observed{grid-column:2;grid-row:2;font-size:12px;color:var(--mm-wait-text)}.mm .mm-exec-record.is-error{background:var(--mm-danger-bg)}.mm .mm-exec-record.is-error .mm-exec-record-body>strong,.mm .mm-exec-record.is-error .mm-exec-record-body>strong>span{color:var(--mm-danger-text)}.mm .mm-exec-record.is-warning{background:var(--mm-wait-bg)}.mm .mm-exec-record.is-warning .mm-exec-record-body>strong{color:var(--mm-wait-text)}.mm .mm-exec-record:is(.is-error,.is-warning)[aria-pressed=true]{background:var(--mm-active-bg)}\n.mm .mm-exec-more{font-size:12px;margin:10px 0;background:transparent}.mm-exec-empty{padding:12px 0}.mm-exec-title{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:12px}.mm-exec-title h3{font-size:14px}.mm .mm-exec-title button{font-size:12px;background:transparent;min-height:32px}.mm-exec-event-detail{margin-top:16px;border-top:1px solid var(--mm-line);padding-top:16px;scroll-margin-block:16px}.mm-exec-event-detail:focus{outline:2px solid var(--mm-active-border);outline-offset:4px}\n.mm-exec-payloads{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:20px;margin-top:14px}.mm-exec-payloads section{min-width:0}.mm-exec-payloads pre{padding:12px;background:var(--mm-canvas);border-radius:6px;white-space:pre-wrap;overflow-wrap:anywhere;max-height:300px;overflow:auto;font-size:12px;line-height:1.7;margin:0 0 8px;scrollbar-width:thin;scrollbar-color:var(--mm-scroll) transparent}.mm-exec-event-detail .mm-chat-prose{font-size:13px;line-height:1.7;margin-top:12px}.mm-exec-timing-note{margin-top:12px!important}\n.mm-exec-notes{margin:18px 0;font-size:12px;color:var(--mm-secondary)}.mm-exec-notes summary{cursor:pointer;min-height:32px}.mm-exec-notes p{margin:8px 0}.mm-exec-attention{margin:12px 0!important;padding:10px 12px;background:var(--mm-wait-bg);color:var(--mm-wait-text);font-size:12px;line-height:1.6}.mm-exec-error{display:flex;justify-content:space-between;gap:10px;align-items:center;margin:12px 0!important;padding:10px 12px;background:var(--mm-danger-bg);color:var(--mm-danger-text);font-size:12px}.mm .mm-exec-error button{font-size:12px;min-height:30px;background:transparent;color:inherit}.mm-execution :is(button,summary,select,a):focus-visible{outline:2px solid var(--mm-accent);outline-offset:2px}\n.mm-active-timing{color:var(--mm-secondary);font-size:12px;font-variant-numeric:tabular-nums}.mm-active-work>div>div{grid-column:1;grid-row:1/3}.mm-active-work>div>p:not(.mm-active-timing){grid-column:2;grid-row:1}.mm-active-work>div>.mm-active-timing{grid-column:2;grid-row:2}.mm-active-work>div>button{grid-column:3;grid-row:1/3}.mm .mm-call-node.has-attention .mm-call-node-foot{color:var(--mm-wait-text)}\n@container(max-width:680px){.mm-exec-io,.mm-exec-payloads{grid-template-columns:minmax(0,1fr);gap:20px}.mm-exec-summary{gap:10px}.mm-exec-title{flex-wrap:wrap}.mm-exec-error{align-items:flex-start;flex-wrap:wrap}}\n@container(max-width:640px){.mm-active-work>div{grid-template-columns:minmax(0,1fr) auto}.mm-active-work>div>div{grid-column:1;grid-row:1}.mm-active-work>div>button{grid-column:2;grid-row:1}.mm-active-work>div>p:not(.mm-active-timing){grid-column:1/-1;grid-row:2}.mm-active-work>div>.mm-active-timing{grid-column:1/-1;grid-row:3}}\n@container(max-width:420px){.mm .mm-exec-slowest li>button{grid-template-columns:20px minmax(0,1fr);align-items:start}.mm-exec-slow-rank{grid-row:1/3}.mm-exec-slow-time{grid-column:2;display:flex;align-items:baseline;gap:6px;text-align:left}.mm-exec-slow-time small{margin:0}.mm-exec-slow-body span{white-space:normal;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}.mm .mm-exec-record{grid-template-columns:minmax(0,1fr) auto;gap:6px 10px;padding:10px 8px}.mm-exec-record time{grid-column:1;grid-row:1}.mm-exec-record-open{grid-column:2;grid-row:1}.mm-exec-record-body{grid-column:1/-1;grid-row:2}.mm-exec-observed{grid-column:1/-1;grid-row:3}.mm-exec-record-summary{white-space:normal;overflow-wrap:anywhere;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}.mm-exec-summary dl{gap:12px}}\n";

// src/run-waterfall.css
var run_waterfall_default = ".mm-waterfall{--wf-thinking:#3aaaa3;--wf-text:#62b97d;--wf-tool:#ee975f;--wf-gap:#dc78ad;--wf-task:#3269be;--wf-run:#dfb83e;margin:22px 0 28px;display:grid;grid-template-columns:minmax(0,1fr);min-width:0;gap:12px;font-variant-numeric:tabular-nums;container-type:inline-size}\r\n.mm-waterfall>*{min-width:0}\r\n.mm-wf-widget{--background:var(--mm-bg);--foreground:var(--mm-text);--muted-foreground:var(--mm-muted);--border:var(--mm-line);--border-strong:var(--mm-line);--primary:var(--mm-accent);--ring:var(--mm-accent);--secondary:var(--mm-hover);--accent:var(--mm-hover);--accent-foreground:var(--mm-text);--popover:var(--mm-bg);--popover-foreground:var(--mm-text);--font-size-base:14px;--btn-size:28px;--viz-series-1:#3269be;--viz-series-2:#dfb83e;--viz-series-3:#3aaaa3;--viz-series-4:#ee975f;--viz-series-5:#dc78ad;--viz-series-6:#62b97d;min-width:0;overflow-x:auto;overscroll-behavior-inline:contain}\r\n.wf-view .btn{display:inline-flex;align-items:center;justify-content:center;gap:4px;min-height:var(--btn-size,28px);border:1px solid transparent;border-radius:5px;background:transparent;color:var(--foreground);cursor:pointer;font:inherit}\r\n.wf-view .btn:hover:not(:disabled){background:var(--secondary)}.wf-view .btn:disabled{opacity:.4;cursor:default}\r\n.mm-waterfall [data-kind=thinking]{--wf-color:var(--wf-thinking)}.mm-waterfall [data-kind=text]{--wf-color:var(--wf-text)}.mm-waterfall [data-kind=tool]{--wf-color:var(--wf-tool)}.mm-waterfall [data-kind=gap]{--wf-color:var(--wf-gap)}.mm-waterfall [data-kind=other]{--wf-color:#768395}.mm-waterfall [data-kind=task]{--wf-color:var(--wf-task)}.mm-waterfall [data-kind=run]{--wf-color:var(--wf-run)}\r\n.mm-wf-heading{display:flex;align-items:baseline;justify-content:space-between;gap:12px;flex-wrap:wrap}.mm-wf-heading h3{font-size:16px;margin:0}.mm-wf-heading>span,.mm-wf-footer,.mm-wf-axis-note,.mm-wf-pan,.mm-wf-notes{color:var(--mm-muted);font-size:12px}.mm-wf-axis-note{margin:0}\r\n.mm-wf-totals{display:grid;gap:10px;border-block:1px solid var(--mm-line);padding:12px 0}.mm-wf-total-intro{display:flex;align-items:baseline;gap:8px 16px;flex-wrap:wrap}.mm-wf-total-intro>strong{font-size:13px;font-weight:600}.mm-wf-total-intro>span{font-size:12px;color:var(--mm-muted);line-height:1.5}.mm-wf-total-items{display:flex;gap:8px 24px;flex-wrap:wrap}.mm-wf-total-items>span{display:flex;gap:7px;align-items:center;font-size:13px}.mm-wf-total-items strong{margin-left:4px;font-size:14px;font-weight:600}.mm-waterfall i{width:9px;height:9px;border-radius:2px;display:inline-block;flex:none;background:var(--wf-color)}\r\n.mm-wf-controls{display:flex;align-items:end;flex-wrap:wrap;gap:12px}.mm-wf-controls label{display:grid;gap:4px;flex:1 1 210px;min-width:0;font-size:12px}.mm-wf-controls select{width:100%;max-width:100%;padding:6px 8px;min-height:34px;background:var(--mm-surface,var(--mm-bg));border:1px solid var(--mm-line);border-radius:4px}.mm-wf-zoom{display:flex;gap:5px;margin-left:auto}.mm-waterfall button{cursor:pointer}.mm-waterfall button:disabled{opacity:.45;cursor:default}.mm-wf-zoom button,.mm-wf-footer button,.mm-wf-detail button,.mm-wf-ranking>button{border:1px solid var(--mm-line);border-radius:4px;padding:5px 10px;background:transparent;min-height:32px}.mm-waterfall button:hover:not(:disabled){background:var(--mm-hover)}\r\n.mm-wf-minimap{height:44px;border:1px solid var(--mm-line);position:relative;overflow:hidden;cursor:crosshair;border-radius:3px}.mm-wf-minimap>span{position:absolute;height:6px;background:var(--wf-color);opacity:.8}.mm-wf-window{position:absolute;inset-block:0;border:2px solid var(--mm-accent);background:color-mix(in srgb,var(--mm-accent) 7%,transparent);pointer-events:none;min-width:2px}.mm-wf-pan{display:flex;gap:12px;align-items:center}.mm-wf-pan input{flex:1;min-width:60px;accent-color:var(--mm-accent)}\r\n.mm-wf-scroll{overflow:auto;max-height:clamp(180px,calc(100dvh - 180px),570px);scrollbar-width:thin;scrollbar-color:var(--mm-line) transparent;border:1px solid var(--mm-line);border-radius:5px}.mm-wf-table{min-width:540px}.mm-wf-row{display:grid;grid-template-columns:minmax(190px,26%) minmax(240px,1fr) 100px;min-height:40px;align-items:stretch;border-bottom:1px solid var(--mm-line);font-size:12px}.mm-wf-row:last-child{border-bottom:0}.mm-wf-row>[role=cell]:first-child,.mm-wf-row>[role=columnheader]:first-child{padding:8px 12px;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mm-wf-row>[role=cell]:last-child,.mm-wf-row>[role=columnheader]:last-child{padding:8px 10px;text-align:right;align-self:center;white-space:nowrap}.mm-wf-axis{position:sticky;top:0;z-index:2;background:var(--mm-bg);min-height:38px;color:var(--mm-muted)}.mm-wf-ticks{display:flex;justify-content:space-between;align-items:center;font-size:11px}.mm-wf-track{position:relative;min-width:0;background-image:linear-gradient(to right,var(--mm-line) 1px,transparent 1px);background-size:25% 100%}.mm-wf-bar{position:absolute;height:18px;top:50%;transform:translateY(-50%);min-width:2px;background:var(--wf-color);border-radius:2px;overflow:hidden;display:flex;align-items:center;justify-content:center;color:white;font-size:10px;white-space:nowrap}.mm-wf-bar>span{padding:0 4px;overflow:hidden;text-overflow:ellipsis}.mm-wf-bar.is-point{min-width:3px;width:3px!important;height:12px}.mm-wf-root,.mm-wf-run{background:color-mix(in srgb,var(--mm-accent) 5%,transparent)}.mm-wf-root{font-weight:600}.mm-wf-run button{border:0;background:transparent;text-align:left;display:flex;align-items:center;gap:7px;font:inherit;padding-left:20px!important}.mm-wf-record.is-selected{background:color-mix(in srgb,var(--mm-accent) 14%,var(--mm-bg));box-shadow:inset 0 0 0 1px var(--mm-accent)}.mm-wf-label{padding:0!important}.mm-wf-label button{display:flex;align-items:center;gap:8px;border:0;width:100%;height:100%;padding:7px 10px 7px 32px;background:transparent;text-align:left;min-width:0;font:inherit}.mm-wf-label button>span{overflow:hidden;min-width:0}.mm-wf-label strong,.mm-wf-label small{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mm-wf-label strong{font-size:12px;font-weight:500}.mm-wf-label small{color:var(--mm-muted);font-size:10px}.mm-wf-hit{position:absolute;inset:0;width:100%;height:100%;padding:0;border:0;background:transparent}.mm-wf-hit:hover .mm-wf-bar{filter:brightness(1.12)}.mm-wf-footer{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap}.mm-wf-footer button+button{margin-left:6px}\r\n.mm-wf-inspector{display:grid;grid-template-columns:minmax(0,1fr);gap:12px;align-items:start;min-width:0}.mm-wf-inspector>*{min-width:0}\r\n.mm-wf-detail{border:1px solid var(--mm-line);padding:16px;border-radius:5px;overflow:hidden;background:color-mix(in srgb,var(--mm-accent) 2%,var(--mm-bg))}.mm-wf-detail-time{display:flex;align-items:center;gap:12px;flex-wrap:wrap;font-size:13px;margin-top:10px}.mm-wf-detail h4{margin:12px 0 8px;font-size:13px}.mm-wf-payloads{display:grid;grid-template-columns:1fr 1fr;gap:16px;min-width:0}.mm-wf-payloads>section{min-width:0}.mm-wf-detail pre{font-size:12px;white-space:pre-wrap;overflow-wrap:anywhere;max-height:360px;overflow:auto;margin:0;padding:12px;background:color-mix(in srgb,var(--mm-text) 4%,transparent);scrollbar-width:thin}.mm-wf-detail .mm-readable{overflow-wrap:anywhere}.mm-wf-boundary p{margin:0;font-size:13px;line-height:1.55;overflow-wrap:anywhere}.mm-wf-boundary details{margin-top:8px}.mm-wf-boundary summary{cursor:pointer;font-size:12px;color:var(--mm-accent)}.mm-wf-boundary pre{margin-top:8px}\r\n.mm-wf-ranking{border:1px solid var(--mm-line);border-radius:6px;padding:12px 14px}.mm-wf-ranking ol{list-style:none;padding:0;margin:10px 0}.mm-wf-ranking li+li{border-top:1px solid var(--mm-line)}.mm-wf-ranking li button{display:grid;grid-template-columns:20px 9px minmax(0,1fr) auto;width:100%;align-items:center;gap:5px 12px;text-align:left;background:transparent;border:0;padding:10px 8px;font-size:13px}.mm-wf-ranking li button[aria-pressed=true]{background:var(--mm-hover);outline:1px solid var(--mm-accent)}.mm-wf-rank{color:var(--mm-muted)}.mm-wf-rank-name{min-width:0}.mm-wf-rank-name strong,.mm-wf-rank-name small{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mm-wf-rank-name small{color:var(--mm-muted);font-size:12px;margin-top:3px}.mm-wf-ranking li button>strong{white-space:nowrap}.mm-wf-rank-action{grid-column:3/5;justify-self:end;color:var(--mm-accent);font-size:12px;white-space:nowrap}.mm-wf-empty{border:1px dashed var(--mm-line);border-radius:6px;padding:20px;line-height:1.5}.mm-wf-empty strong{font-size:14px}.mm-wf-empty p{margin:8px 0 0;color:var(--mm-muted);font-size:12px}.mm-wf-notes{border-top:1px solid var(--mm-line);padding-top:10px}.mm-wf-notes summary{cursor:pointer}.mm-wf-notes p{max-width:85ch}\r\n@container (min-width:860px){.mm-wf-inspector.has-selection{grid-template-columns:minmax(300px,.9fr) minmax(0,1.1fr)}}\r\n@container (max-width:700px){.mm-wf-zoom{margin-left:0}.mm-wf-payloads{grid-template-columns:1fr}.mm-wf-heading>span{font-size:11px}.mm-wf-total-items{gap:8px 16px}.mm-wf-ranking li button{grid-template-columns:16px 9px minmax(0,1fr) auto;gap:5px 8px}.mm-wf-ranking{padding:10px}}\r\n";

// src/run-execution.jsx
var import_react7 = __toESM(require("react"), 1);

// src/run-waterfall.jsx
var import_react6 = __toESM(require("react"), 1);

// src/waterfall-view.mjs
function waterfallSearchIndex(rows) {
  return new Map(rows.map((row) => [row.id, [row.id, row.name, row.summary, row.seq == null ? "" : `#${row.seq}`, row.lastSeq == null ? "" : `#${row.lastSeq}`, printable(row.entry?.message?.content), printable(row.entry?.call?.input), printable(row.entry?.result?.output || row.entry?.result?.content)].join("\n").toLowerCase()]));
}
function waterfallView(rows, { kind = "all", query = "", mode = "longest", page = 0, pageSize = 40, index = waterfallSearchIndex(rows) } = {}) {
  const typed = rows.filter((row) => kind === "all" || row.kind === kind);
  const needle = query.trim().toLowerCase();
  const matches = needle ? typed.filter((row) => index.get(row.id)?.includes(needle)) : typed;
  const ranked = matches.filter((row) => row.duration > 0).slice().sort((a, b) => b.duration - a.duration || a.offset - b.offset).slice(0, 20);
  const paginated = mode === "sequence" || Boolean(needle);
  const chosen = paginated ? matches : ranked.slice().sort((a, b) => a.offset - b.offset);
  const pages = paginated ? Math.max(1, Math.ceil(chosen.length / pageSize)) : 1;
  const safePage = Math.max(0, Math.min(page, pages - 1));
  return { typed, matches, ranked, chosen, paginated, pages, safePage, visible: paginated ? chosen.slice(safePage * pageSize, (safePage + 1) * pageSize) : chosen };
}

// src/run-waterfall.mjs
var waterfallKinds = { thinking: "\u601D\u8003\u8F93\u51FA", text: "\u6587\u5B57\u8F93\u51FA", tool: "\u5DE5\u5177", gap: "\u65E0\u65E5\u5FD7\u95F4\u9694", other: "\u5176\u4ED6\u8BB0\u5F55" };
var logMessageKinds = { thinking: "\u601D\u8003\u8F93\u51FA", text: "\u6587\u5B57\u8F93\u51FA", tool_use: "\u5DE5\u5177\u8C03\u7528", tool_result: "\u5DE5\u5177\u8FD4\u56DE", error: "\u9519\u8BEF\u8BB0\u5F55" };
var logMessageKind = (type) => logMessageKinds[type] || type || "\u8BB0\u5F55";
var time = (value) => value != null && Number.isFinite(Date.parse(value)) ? Date.parse(value) : null;
function spanDuration(ms) {
  if (!Number.isFinite(ms)) return "\u8DE8\u5EA6\u672A\u77E5";
  if (ms === 0) return "\u65F6\u95F4\u70B9";
  if (ms < 1e3) return `${Math.round(ms)} \u6BEB\u79D2`;
  const seconds = Math.round(ms / 1e3);
  return seconds < 60 ? `${seconds} \u79D2` : `${Math.floor(seconds / 60)} \u5206 ${seconds % 60} \u79D2`;
}
function unionIntervals(intervals) {
  const merged = [];
  for (const [a, b] of [...intervals].sort((a2, b2) => a2[0] - b2[0])) {
    const prior = merged.at(-1);
    if (prior && a <= prior[1]) prior[1] = Math.max(prior[1], b);
    else merged.push([a, b]);
  }
  return merged;
}
function buildRunWaterfall({ run, messages = [], partial = false }) {
  const { entries, gaps } = conversationEntries(messages);
  const started = time(run.startedAt), completed = time(run.completedAt);
  const terminal = ["completed", "failed", "cancelled"].includes(run.status);
  const times = messages.map((message) => time(message.createdAt));
  const validTimes = times.filter((value) => value != null);
  const start = started ?? Math.min(...validTimes);
  const end = terminal && completed != null ? completed : Math.max(start, ...validTimes);
  const boundsValid = Number.isFinite(start) && Number.isFinite(end) && end >= start;
  const total = boundsValid ? end - start : 0;
  let invalid = times.some((value, index) => value == null || value < start || value > end || index > 0 && value < times[index - 1]);
  const counts = /* @__PURE__ */ new Map();
  for (const message of messages) if (message.callId && ["tool_use", "tool_result"].includes(message.type)) {
    const key = `${message.callId}:${message.type}`;
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  const rows = [];
  for (const entry of entries) {
    const a = time(entry.call?.createdAt ?? entry.message?.createdAt ?? entry.result?.createdAt);
    const b = time(entry.result?.createdAt ?? entry.lastAt ?? entry.message?.createdAt ?? entry.call?.createdAt);
    const tool = entry.kind === "tool";
    const paired = tool && entry.call && entry.result && !entry.ambiguous && counts.get(`${entry.call.callId}:tool_use`) === 1 && counts.get(`${entry.call.callId}:tool_result`) === 1;
    const measurable = !tool || paired;
    const valid = boundsValid && a != null && b != null && a >= start && b >= a && b <= end;
    if (!valid) invalid = true;
    const kind = waterfallKinds[entry.kind] ? entry.kind : "other";
    rows.push({
      id: `record-${entry.seq}`,
      kind,
      seq: entry.seq,
      lastSeq: entry.result?.seq ?? entry.lastSeq ?? entry.seq,
      name: tool ? entry.call?.tool || entry.result?.tool || "\u5DE5\u5177" : waterfallKinds[kind],
      summary: tool ? toolSummary(entry) : printable(entry.message?.content || entry.message?.output).replace(/\s+/g, " ").slice(0, 180),
      start: a,
      end: valid && measurable ? b : a,
      offset: valid ? a - start : null,
      duration: valid && measurable ? b - a : null,
      entry,
      failed: entry.result?.isError === true || entry.result?.is_error === true || entry.kind === "error",
      note: tool ? paired ? "\u8C03\u7528\u8BB0\u5F55\u81F3\u5339\u914D\u8FD4\u56DE\uFF0C\u5305\u542B\u53EF\u80FD\u7684\u4E0A\u62A5\u5EF6\u8FDF\u3002" : "\u672A\u80FD\u552F\u4E00\u914D\u5BF9\u8C03\u7528\u4E0E\u8FD4\u56DE\uFF0C\u8DE8\u5EA6\u672A\u77E5\u3002" : "\u8FDE\u7EED\u540C\u7C7B\u8F93\u51FA\u7684\u9996\u6761\u81F3\u672B\u6761\u8BB0\u5F55\uFF0C\u4E0D\u4EE3\u8868\u5B8C\u6574\u6A21\u578B\u8BF7\u6C42\u8017\u65F6\u3002"
    });
  }
  const complete = !partial && !gaps && !invalid && boundsValid && started != null && messages.length > 0 && (!terminal || completed != null);
  if (complete) {
    const occupied = unionIntervals(rows.filter((row) => row.offset != null).map((row) => [row.offset, row.offset + (row.duration ?? 0)]));
    let cursor = 0, number2 = 0;
    for (const [a, b] of [...occupied, [total, total]]) {
      if (a > cursor) {
        const before = messages.findLast((message) => time(message.createdAt) <= start + cursor);
        const after = messages.find((message) => time(message.createdAt) >= start + a);
        rows.push({
          id: `gap-${++number2}`,
          kind: "gap",
          name: "\u65E0\u65E5\u5FD7\u95F4\u9694",
          summary: `${before ? `#${before.seq} ${logMessageKind(before.type)}` : "\u8FD0\u884C\u5F00\u59CB"} \u2192 ${after ? `#${after.seq} ${logMessageKind(after.type)}` : "\u8FD0\u884C\u7ED3\u675F"}`,
          start: start + cursor,
          end: start + a,
          offset: cursor,
          duration: a - cursor,
          before,
          after,
          note: "\u8FD9\u4E00\u6BB5\u6CA1\u6709\u65B0\u7684\u65E5\u5FD7\u8BB0\u5F55\uFF0C\u539F\u56E0\u672A\u77E5\uFF1B\u4E0D\u5F52\u5165\u601D\u8003\u6216\u5DE5\u5177\u6267\u884C\u3002"
        });
      }
      cursor = Math.max(cursor, b);
    }
  }
  rows.sort((a, b) => (a.offset ?? Infinity) - (b.offset ?? Infinity) || (a.seq ?? 0) - (b.seq ?? 0));
  const totals = Object.fromEntries(Object.keys(waterfallKinds).map((kind) => [kind, unionIntervals(rows.filter((row) => row.kind === kind && row.duration != null && row.offset != null).map((row) => [row.offset, row.offset + row.duration])).reduce((sum, [a, b]) => sum + b - a, 0)]));
  const ranked = rows.filter((row) => row.duration > 0).slice().sort((a, b) => b.duration - a.duration || a.offset - b.offset).slice(0, 20);
  return { start, end, total, rows, totals, ranked, complete, terminal, invalid, rawCount: messages.length };
}

// src/waterfall-chart.jsx
var import_react5 = __toESM(require("react"), 1);
var import_jsx_runtime4 = require("react/jsx-runtime");
var widgetUrl = "./1.0.59/waterfall.js";
var widgetLabels = {
  "Trace waterfall": "\u8FD0\u884C\u7011\u5E03\u56FE",
  "Trace summary": "\u8FD0\u884C\u6982\u89C8",
  "Trace overview. Drag to select a range; drag the selected range to pan.": "\u8FD0\u884C\u6982\u89C8\uFF1A\u62D6\u52A8\u9009\u62E9\u65F6\u95F4\u8303\u56F4\uFF0C\u62D6\u52A8\u9009\u4E2D\u8303\u56F4\u5E73\u79FB\u3002",
  "Service colors": "\u8BB0\u5F55\u7C7B\u578B\u989C\u8272",
  "Search spans": "\u641C\u7D22\u7247\u6BB5\u540D\u79F0\u6216\u65E5\u5FD7\u7F16\u53F7",
  "Previous match": "\u4E0A\u4E00\u4E2A\u5339\u914D\u9879",
  "Next match": "\u4E0B\u4E00\u4E2A\u5339\u914D\u9879",
  "Trace options": "\u56FE\u8868\u9009\u9879",
  "Timeline navigation": "\u65F6\u95F4\u8F74\u5BFC\u822A",
  "Pan earlier": "\u5411\u524D\u5E73\u79FB",
  "Pan later": "\u5411\u540E\u5E73\u79FB",
  "Zoom out": "\u7F29\u5C0F",
  "Zoom in": "\u653E\u5927",
  "Fit trace": "\u663E\u793A\u5168\u7A0B",
  "Critical path": "\u5173\u952E\u8DEF\u5F84",
  "Estimated critical path": "\u4F30\u7B97\u7684\u5173\u952E\u8DEF\u5F84",
  "Warnings": "\u5F02\u5E38\u8BB0\u5F55",
  "Time measurement": "\u65F6\u95F4\u53E3\u5F84",
  "Total time": "\u7247\u6BB5\u8DE8\u5EA6",
  "Direct time": "\u6263\u9664\u5B50\u9879\u8986\u76D6",
  Total: "\u8DE8\u5EA6",
  Direct: "\u6263\u9664\u5B50\u7247\u6BB5\u540E",
  Fields: "\u663E\u793A\u5217",
  "Visible fields": "\u663E\u793A\u5217",
  "Service name": "\u8BB0\u5F55\u7C7B\u578B",
  "Bar labels": "\u6761\u4E0A\u6807\u7B7E",
  "Both time columns": "\u663E\u793A\u4E24\u79CD\u65F6\u957F",
  "Request spans": "\u8FD0\u884C\u8BB0\u5F55\u65F6\u95F4\u8F74",
  Name: "\u7247\u6BB5",
  "Collapse all spans": "\u6536\u8D77\u5168\u90E8\u7247\u6BB5",
  "Expand all spans": "\u5C55\u5F00\u5168\u90E8\u7247\u6BB5",
  "Timeline. Arrow keys pan; plus and minus zoom; Home fits the trace.": "\u65F6\u95F4\u8F74\uFF1A\u65B9\u5411\u952E\u5E73\u79FB\uFF0C\u52A0\u51CF\u952E\u7F29\u653E\uFF0CHome \u952E\u663E\u793A\u5168\u7A0B\u3002",
  "Sort by longest duration": "\u6309\u6700\u957F\u8DE8\u5EA6\u6392\u5E8F",
  "Sort by shortest duration": "\u6309\u6700\u77ED\u8DE8\u5EA6\u6392\u5E8F",
  "Restore trace order": "\u6062\u590D\u53D1\u751F\u987A\u5E8F",
  "Resize Name column": "\u8C03\u6574\u7247\u6BB5\u5217\u5BBD",
  "Resize Duration column": "\u8C03\u6574\u8DE8\u5EA6\u5217\u5BBD",
  "Zoom to span": "\u5B9A\u4F4D\u7247\u6BB5",
  "Close span details": "\u5173\u95ED\u7247\u6BB5\u8BE6\u60C5",
  Start: "\u8DDD\u8FD0\u884C\u5F00\u59CB",
  Service: "\u8BB0\u5F55\u7C7B\u578B",
  Status: "\u72B6\u6001",
  Error: "\u9519\u8BEF",
  Warning: "\u8B66\u544A",
  "No spans in this trace.": "\u6CA1\u6709\u53EF\u663E\u793A\u7684\u7247\u6BB5\u3002",
  "Scroll to zoom \xB7 drag to pan \xB7 Shift + scroll to pan \xB7 double-click to focus": "\u6EDA\u8F6E\u6EDA\u52A8\u5217\u8868 \xB7 Ctrl / \u2318 + \u6EDA\u8F6E\u7F29\u653E \xB7 \u62D6\u52A8\u6216 Shift + \u6EDA\u8F6E\u5E73\u79FB \xB7 \u53CC\u51FB\u5B9A\u4F4D"
};
var widgetStyle = `
.wf-view .trace-search-group { display:none; }
.wf-view .wf-table-wrap { min-height:0;max-height:420px;overflow:auto;overscroll-behavior:contain;scrollbar-width:thin; }
.wf-view .wf-table thead { position:sticky;top:0;z-index:3;background:var(--background); }
.wf-view .wf-bar-total { background:var(--wf-series); }
.wf-view[data-time=direct] .wf-bar-total { opacity:.18; }
.wf-view .wf-bar-label[data-inside=true] { color:var(--foreground);background:var(--background);border-radius:2px; }
@media (prefers-reduced-motion:reduce) {
  .wf-view *, .wf-view *::before { transition:none!important;animation:none!important;scroll-behavior:auto!important; }
}
@container (max-width: 720px) {
  .wf-view .wf-frame { min-width: 420px; }
  .wf-view .trace-search-group { flex-basis: 100%; }
}`;
function formatWidgetTime(value, compact = false) {
  return value.replace(/(\d+(?:\.\d+)?)\s*(µs|ms|s)\b/g, (_, amount, unit) => {
    const number2 = Number(amount);
    if (unit === "\xB5s") return `${amount} \u5FAE\u79D2`;
    if (unit === "ms") return compact && number2 === 0 ? "0:00" : `${amount} \u6BEB\u79D2`;
    if (number2 < 60) return compact && Number.isInteger(number2) ? `0:${String(number2).padStart(2, "0")}` : `${amount} \u79D2`;
    const minutes = Math.floor(number2 / 60);
    const seconds = Number((number2 - minutes * 60).toFixed(2));
    if (compact) {
      const whole = String(Math.floor(seconds)).padStart(2, "0");
      const fraction = Number.isInteger(seconds) ? "" : String(seconds).slice(String(Math.floor(seconds)).length);
      return `${minutes}:${whole}${fraction}`;
    }
    return `${minutes} \u5206 ${seconds} \u79D2`;
  });
}
function translateWidgetLabel(value) {
  const label = widgetLabels[value];
  if (label) return label;
  const disclosure = /^(Expand|Collapse) (.+)$/.exec(value);
  if (disclosure) return `${disclosure[2]}\uFF0C${disclosure[1] === "Expand" ? "\u5C55\u5F00" : "\u6536\u8D77"}`;
  const warnings = /^(\d+) (issue|issues|warning|warnings)$/.exec(value);
  if (warnings) return `${warnings[1]} \u6761\u5F02\u5E38\u8BB0\u5F55`;
  const range = /^(Adjust range start|Adjust range end): (.+)$/.exec(value);
  if (range) return `${range[1] === "Adjust range start" ? "\u8C03\u6574\u8303\u56F4\u8D77\u70B9" : "\u8C03\u6574\u8303\u56F4\u7EC8\u70B9"}\uFF1A${formatWidgetTime(range[2], true)}`;
  return formatWidgetTime(value);
}
function localizeWidget(root) {
  if (!root?.querySelector(".wf-view")) return;
  if (!root.querySelector("style[data-mm-localization]")) {
    const style = document.createElement("style");
    style.dataset.mmLocalization = "";
    style.textContent = widgetStyle;
    root.append(style);
  }
  const controlSelector = ".wf-view, .wf-summary, .wf-minimap, .wf-legend, .wf-actions, .trace-navigation, .wf-menu, .wf-table, .wf-axis, .trace-search, .wf-range-handle, .wf-toolbar button, .wf-name-heading button, .wf-disclosure, .wf-sort, .wf-resizer, .wf-warning-icon, .wf-detail-actions button";
  for (const node of root.querySelectorAll(controlSelector)) {
    for (const attribute of ["aria-label", "data-tooltip", "placeholder", "title"]) {
      const value = node.getAttribute(attribute);
      if (value == null) continue;
      const translated = translateWidgetLabel(value);
      if (translated !== value) node.setAttribute(attribute, translated);
    }
  }
  for (const track of root.querySelectorAll(".wf-track[aria-label]")) {
    const value = track.getAttribute("aria-label");
    const translated = formatWidgetTime(value);
    if (translated !== value) track.setAttribute("aria-label", translated);
  }
  const selectors = [
    ".wf-name-heading > span",
    ".wf-service-cell",
    "th.wf-alternate-cell",
    ".wf-metric-label",
    ".wf-menu-item > span",
    ".wf-footer > span:last-child",
    ".wf-empty",
    ".wf-detail-data dt",
    ".wf-detail-actions > button:first-child"
  ];
  for (const node of root.querySelectorAll(selectors.join(","))) {
    const translated = translateWidgetLabel(node.textContent);
    if (translated !== node.textContent) node.textContent = translated;
  }
  for (const node of root.querySelectorAll(".wf-tick, .wf-range-label, .wf-row .wf-value, .wf-row .wf-alternate-cell")) {
    const translated = formatWidgetTime(node.textContent, node.matches(".wf-tick, .wf-range-label"));
    if (translated !== node.textContent) node.textContent = translated;
  }
  for (const term of root.querySelectorAll(".wf-detail-data dt")) {
    if (!["\u8DDD\u8FD0\u884C\u5F00\u59CB", "\u8DE8\u5EA6", "\u6263\u9664\u5B50\u7247\u6BB5\u540E", "\u72B6\u6001"].includes(term.textContent)) continue;
    const value = term.nextElementSibling;
    if (!value) continue;
    const translated = term.textContent === "\u72B6\u6001" && value.textContent === "error" ? "\u5931\u8D25" : formatWidgetTime(value.textContent);
    if (translated !== value.textContent) value.textContent = translated;
  }
  const meta = root.querySelector(".wf-meta");
  if (meta) {
    const translated = formatWidgetTime(meta.textContent).replace(/\b(\d+) spans\b/, "$1 \u4E2A\u56FE\u4E2D\u6761\u76EE");
    if (translated !== meta.textContent) meta.textContent = translated;
  }
  const count = root.querySelector(".wf-row-count");
  if (count) {
    const translated = count.textContent.replace(/^(\d+) of (\d+) spans$/, "\u5DF2\u663E\u793A $1 / $2 \u9879");
    if (translated !== count.textContent) count.textContent = translated;
  }
}
var widgetPromise;
function loadWidget() {
  if (customElements.get("viz-waterfall")) return Promise.resolve();
  if (!widgetPromise) widgetPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.type = "module";
    script.src = widgetUrl;
    script.onload = () => customElements.whenDefined("viz-waterfall").then(resolve, reject);
    script.onerror = () => {
      script.remove();
      widgetPromise = null;
      reject(new Error("\u7011\u5E03\u56FE\u7EC4\u4EF6\u52A0\u8F7D\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u540E\u91CD\u8BD5\u3002"));
    };
    document.head.appendChild(script);
  });
  return widgetPromise;
}
function WaterfallChart({ data, issue, run, rows, selectedId, focusRequest, onSelect }) {
  const chart = (0, import_react5.useRef)(null), select = (0, import_react5.useRef)(onSelect);
  const committedSpans = (0, import_react5.useRef)("");
  const [status, setStatus] = (0, import_react5.useState)("loading"), [retry, setRetry] = (0, import_react5.useState)(0);
  select.current = onSelect;
  const spans = (0, import_react5.useMemo)(() => [
    { id: "task", name: `${issue?.identifier || "\u4EFB\u52A1"} \xB7 \u672C\u6B21\u8FD0\u884C\u7A97\u53E3`, service: "\u4EFB\u52A1", startMs: 0, durationMs: data.total },
    { id: "run", parentId: "task", name: `${run.agentName || "\u667A\u80FD\u4F53"} \xB7 #${run.id.slice(-8)}`, service: "\u8FD0\u884C", startMs: 0, durationMs: data.total },
    ...rows.filter((row) => row.offset != null && row.duration != null).map((row) => ({ id: row.id, parentId: "run", name: `${row.name} \xB7 ${row.seq ? `#${row.seq}${row.lastSeq !== row.seq ? `\u2013${row.lastSeq}` : ""}` : row.summary}`, service: { thinking: "\u601D\u8003\u8F93\u51FA", text: "\u6587\u5B57\u8F93\u51FA", tool: "\u5DE5\u5177", gap: "\u65E0\u65E5\u5FD7\u95F4\u9694", other: "\u5176\u4ED6\u8BB0\u5F55" }[row.kind], startMs: row.offset, durationMs: row.duration ?? 0, ...row.failed ? { status: "error" } : {}, attributes: { "\u8BB0\u5F55\u7C7B\u578B": row.name, "\u8BE6\u60C5": "\u8BF7\u67E5\u770B\u56FE\u8868\u4E0A\u65B9\u7684\u539F\u6587\u4E0E\u8F93\u5165\u8F93\u51FA" } }))
  ], [data.total, issue?.identifier, run.id, run.agentName, rows]);
  (0, import_react5.useEffect)(() => {
    let active6 = true;
    committedSpans.current = "";
    setStatus("loading");
    loadWidget().then(() => {
      if (active6) setStatus("ready");
    }, () => {
      if (active6) setStatus("error");
    });
    return () => {
      active6 = false;
    };
  }, [retry]);
  (0, import_react5.useEffect)(() => {
    const element = chart.current;
    if (status !== "ready" || !element) return;
    const listener = (event) => {
      const state = element.viewState;
      if (state?.details) element.viewState = { ...state, details: false };
      select.current(event.detail.selection?.spanId || "");
    };
    const wheel = (event) => {
      if (!event.ctrlKey && !event.metaKey && !event.shiftKey) event.stopPropagation();
    };
    const failed = () => setStatus("error");
    const palette = getComputedStyle(element);
    const series = { "\u4EFB\u52A1": "task", "\u8FD0\u884C": "run", "\u601D\u8003\u8F93\u51FA": "thinking", "\u6587\u5B57\u8F93\u51FA": "text", "\u5DE5\u5177": "tool", "\u65E0\u65E5\u5FD7\u95F4\u9694": "gap" };
    const colors = Object.fromEntries(Object.entries(series).map(([label, key]) => [label, palette.getPropertyValue(`--wf-${key}`).trim()]));
    colors["\u5176\u4ED6\u8BB0\u5F55"] = "#627184";
    const syncColors = () => {
      for (const item of element.shadowRoot?.querySelectorAll(".wf-legend-item") || []) {
        const index = item.querySelector(".wf-swatch")?.style.getPropertyValue("--wf-series").match(/--viz-series-(\d+)/)?.[1];
        const color = colors[item.textContent.trim()];
        if (index && color && element.style.getPropertyValue(`--viz-series-${index}`) !== color) element.style.setProperty(`--viz-series-${index}`, color);
      }
    };
    let scheduled = false;
    const refresh = () => {
      if (scheduled) return;
      scheduled = true;
      queueMicrotask(() => {
        scheduled = false;
        syncColors();
        localizeWidget(element.shadowRoot);
      });
    };
    const observer = new MutationObserver(refresh);
    if (element.shadowRoot) observer.observe(element.shadowRoot, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["aria-label", "data-tooltip", "placeholder", "title"] });
    refresh();
    element.addEventListener("viz-state-change", listener);
    element.addEventListener("viz-error", failed);
    element.addEventListener("wheel", wheel, { capture: true, passive: true });
    return () => {
      observer.disconnect();
      element.removeEventListener("viz-state-change", listener);
      element.removeEventListener("viz-error", failed);
      element.removeEventListener("wheel", wheel, true);
    };
  }, [status]);
  (0, import_react5.useEffect)(() => {
    if (status !== "ready" || !chart.current || data.total <= 0) return;
    const signature = JSON.stringify(spans);
    if (committedSpans.current === signature) return;
    committedSpans.current = signature;
    chart.current.criticalPath = [];
    chart.current.spans = spans;
    chart.current.durationMs = data.total;
  }, [status, spans, data.total]);
  (0, import_react5.useEffect)(() => {
    const element = chart.current;
    if (status !== "ready" || !element?.viewState) return;
    const state = element.viewState;
    if (state.selectedSpanId !== (selectedId || null) || state.details) element.viewState = { ...state, selectedSpanId: selectedId || null, details: false };
  }, [status, selectedId]);
  (0, import_react5.useEffect)(() => {
    if (status !== "ready" || !chart.current || !focusRequest) return;
    const row = data.rows.find((item) => item.id === focusRequest.id);
    if (!row || row.offset == null) return;
    const pad = Math.max(1e3, (row.duration || 0) * 0.15);
    chart.current.viewState = { ...chart.current.viewState, selectedSpanId: row.id, details: false, startMs: Math.max(0, row.offset - pad), endMs: Math.min(data.total, row.offset + (row.duration || 0) + pad) };
    if (focusRequest.revealChart) chart.current.scrollIntoView({ block: "nearest" });
  }, [status, focusRequest, data.rows, data.total]);
  if (status === "error") return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "mm-exec-error", role: "alert", children: [
    "\u7011\u5E03\u56FE\u7EC4\u4EF6\u52A0\u8F7D\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u540E\u91CD\u8BD5\u3002",
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { onClick: () => setRetry((value) => value + 1), children: "\u91CD\u8BD5" })
  ] });
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "mm-wf-widget", children: [
    status === "loading" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { role: "status", children: "\u6B63\u5728\u52A0\u8F7D\u7011\u5E03\u56FE\u2026" }),
    import_react5.default.createElement("viz-waterfall", { ref: chart, title: "\u4EFB\u52A1 \u2192 \u672C\u6B21\u8FD0\u884C \u2192 \u8FC7\u7A0B\u8BB0\u5F55", description: "\u6761\u957F\u8868\u793A\u8BB0\u5F55\u8DE8\u5EA6\uFF1B\u65E0\u65E5\u5FD7\u95F4\u9694\u4E0D\u8BA1\u5165\u601D\u8003\u3002\u201C\u6263\u9664\u5B50\u7247\u6BB5\u540E\u201D\u4EC5\u662F\u56FE\u5C42\u5DEE\u503C\uFF0C\u4E0D\u7B49\u4E8E\u5B9E\u9645\u5DE5\u4F5C\u65F6\u957F\u3002", "aria-label": "\u8FD0\u884C\u4E0E\u65E5\u5FD7\u7247\u6BB5\u65F6\u95F4\u8F74" })
  ] });
}

// src/run-waterfall.jsx
var import_jsx_runtime5 = require("react/jsx-runtime");
var clock2 = (value) => Number.isFinite(value) ? new Date(value).toLocaleString("zh-CN", { hour12: false }) : "\u65F6\u95F4\u672A\u63D0\u4F9B";
var previewLimit = 180;
var previewKeys = ["preview", "content", "output", "input", "text"];
var previewPrefixLimit = 2048;
var previewParseLimit = 16 * 1024;
var previewDepthLimit = 12;
var boundedPreview = (value) => printable(value).slice(0, previewPrefixLimit).replace(/\s+/g, " ").trim().slice(0, previewLimit);
function jsonStringPrefix(source, start) {
  const end = Math.min(source.length, start + previewPrefixLimit);
  let decoded = "";
  for (let index = start; index < end && decoded.length <= previewLimit; index++) {
    const character = source[index];
    if (character === '"') return decoded;
    if (character !== "\\") {
      if (character.charCodeAt(0) < 32) return decoded || null;
      decoded += character;
      continue;
    }
    if (++index >= end) break;
    const escape = source[index];
    if (escape === "u") {
      const digits = source.slice(index + 1, index + 5);
      if (!/^[\da-fA-F]{4}$/.test(digits) || index + 4 >= end) break;
      decoded += String.fromCharCode(parseInt(digits, 16));
      index += 4;
    } else {
      const escaped = { '"': '"', "\\": "\\", "/": "/", b: "\b", f: "\f", n: "\n", r: "\r", t: "	" }[escape];
      if (escaped == null) break;
      decoded += escaped;
    }
  }
  return decoded || null;
}
function previewText(value) {
  let current = value;
  for (let depth = 0; depth < previewDepthLimit; depth++) {
    if (typeof current === "string") {
      const source = current.trimStart();
      if (source.length <= previewParseLimit && /^(?:\{|\[|")/.test(source)) {
        try {
          const parsed = JSON.parse(source);
          if (parsed !== current) {
            current = parsed;
            continue;
          }
        } catch {
        }
      }
      const wrapper = /^\{\s*"(?:preview|content|output|input|text)"\s*:\s*"/.exec(source.slice(0, previewPrefixLimit));
      const prefix = wrapper ? jsonStringPrefix(source, wrapper[0].length) : source.startsWith('"') ? jsonStringPrefix(source, 1) : null;
      if (prefix && (wrapper || /^(?:\{|\[|")/.test(prefix))) {
        current = prefix;
        continue;
      }
      return boundedPreview(source);
    }
    if (Array.isArray(current)) {
      const first = current.find((item) => item != null && item !== "");
      if (first !== void 0) {
        current = first;
        continue;
      }
    } else if (current && typeof current === "object") {
      const key = previewKeys.find((candidate) => current[candidate] != null && current[candidate] !== "");
      if (key) {
        current = current[key];
        continue;
      }
    }
    return boundedPreview(current);
  }
  return boundedPreview(current);
}
function BoundaryRecord({ label, message }) {
  const content = message?.content || message?.output || message?.input;
  const raw = message ? printable(content) : "";
  const preview = previewText(content);
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("section", { className: "mm-wf-boundary", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("h4", { children: [
      label,
      message ? ` \xB7 #${message.seq} \xB7 ${logMessageKind(message.type)}${message.tool ? ` \xB7 ${message.tool}` : ""}` : ""
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("p", { children: [
      message ? preview || "\u672A\u63D0\u4F9B\u8BB0\u5F55\u5185\u5BB9" : label === "\u524D\u4E00\u8BB0\u5F55" ? "\u8FD0\u884C\u5F00\u59CB" : "\u8FD0\u884C\u7ED3\u675F",
      raw.length > 180 ? "\u2026" : ""
    ] }),
    raw.length > 180 && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("details", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("summary", { children: "\u67E5\u770B\u5B8C\u6574\u8BB0\u5F55" }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("pre", { children: raw })
    ] })
  ] });
}
function WaterfallDetail({ row, onFocus, onClose, autoFocus = true }) {
  const entry = row.entry;
  const element = (0, import_react6.useRef)(null);
  (0, import_react6.useEffect)(() => {
    if (!autoFocus) return;
    const bounds = element.current?.getBoundingClientRect();
    if (bounds && (bounds.top < 85 || bounds.top > window.innerHeight - 160)) element.current?.scrollIntoView({ block: "start" });
    element.current?.focus({ preventScroll: true });
  }, [row.id, autoFocus]);
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("section", { className: "mm-wf-detail", "aria-label": "\u65E5\u5FD7\u7247\u6BB5\u8BE6\u60C5", ref: element, tabIndex: -1, children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "mm-wf-heading", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("h3", { children: [
        row.name,
        row.seq ? ` \xB7 #${row.seq}${row.lastSeq !== row.seq ? `\u2013${row.lastSeq}` : ""}` : ""
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { onClick: onClose, children: "\u5173\u95ED\u8BE6\u60C5" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "mm-wf-detail-body", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "mm-wf-detail-time", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { children: [
          clock2(row.start),
          " \u2014 ",
          clock2(row.end)
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("strong", { children: spanDuration(row.duration) }),
        row.offset != null && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { onClick: onFocus, children: "\u5728\u65F6\u95F4\u8F74\u5B9A\u4F4D" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("p", { className: "mm-exec-note", children: [
        row.note,
        row.failed ? " \u5DE5\u5177\u6216\u6267\u884C\u8BB0\u5F55\u62A5\u544A\u4E86\u9519\u8BEF\u3002" : ""
      ] }),
      entry?.kind === "tool" ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "mm-wf-payloads", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("section", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h4", { children: "\u8C03\u7528\u8F93\u5165" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("pre", { children: entry.call ? printable(entry.call.input) || "\uFF08\u7A7A\u53C2\u6570\uFF09" : "\u672A\u8BFB\u5230\u8C03\u7528\u8BB0\u5F55" }),
          entry.call?.inputTruncated && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { children: "\u8F93\u5165\u5DF2\u622A\u65AD" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("section", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h4", { children: "\u8FD4\u56DE\u8F93\u51FA" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("pre", { children: entry.result ? printable(entry.result.output || entry.result.content) || "\uFF08\u7A7A\u8FD4\u56DE\uFF09" : "\u5C1A\u672A\u8BFB\u5230\u5339\u914D\u8FD4\u56DE" }),
          entry.result?.outputTruncated && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { children: "\u8F93\u51FA\u5DF2\u622A\u65AD" })
        ] })
      ] }) : entry ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(ReadableText, { text: printable(entry.message?.content || entry.message?.output), limit: 2400 }),
        entry.message?.contentTruncated && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { children: "\u6B63\u6587\u5DF2\u622A\u65AD" })
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "mm-wf-payloads", children: [["\u524D\u4E00\u8BB0\u5F55", row.before], ["\u540E\u4E00\u8BB0\u5F55", row.after]].map(([label, message]) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(BoundaryRecord, { label, message }, label)) })
    ] })
  ] });
}
function RunWaterfall({ run, issue, messages = [], partial, loading, error, onRetry }) {
  const data = (0, import_react6.useMemo)(() => buildRunWaterfall({ run, messages, partial }), [run.startedAt, run.completedAt, run.status, messages, partial]);
  const [mode, setMode] = (0, import_react6.useState)("longest"), [kind, setKind] = (0, import_react6.useState)("all"), [count, setCount] = (0, import_react6.useState)(3), [page, setPage] = (0, import_react6.useState)(0), [query, setQuery] = (0, import_react6.useState)("");
  const deferredQuery = (0, import_react6.useDeferredValue)(query);
  const [selectedId, setSelectedId] = (0, import_react6.useState)(""), [focusRequest, setFocusRequest] = (0, import_react6.useState)(null);
  const returnFocus = (0, import_react6.useRef)(null);
  const index = (0, import_react6.useMemo)(() => waterfallSearchIndex(data.rows), [data.rows]);
  const view = (0, import_react6.useMemo)(() => waterfallView(data.rows, { kind, query: deferredQuery, mode, page, index }), [data.rows, kind, deferredQuery, mode, page, index]);
  const { ranked, visible: rows, safePage, pages, paginated } = view;
  const selected = view.matches.find((row) => row.id === selectedId);
  const hasLogs = data.rawCount > 0;
  const rememberFocus = () => {
    const active6 = document.activeElement;
    returnFocus.current = active6?.shadowRoot?.activeElement || active6;
  };
  const focus = (row, revealChart = false) => {
    if (!revealChart) rememberFocus();
    if (paginated) setPage(Math.max(0, Math.floor(view.chosen.findIndex((item) => item.id === row.id) / 40)));
    setSelectedId(row.id);
    setFocusRequest(revealChart ? { id: row.id, revealChart: true } : null);
  };
  const changeKind = (value) => {
    setKind(value);
    setPage(0);
    setCount(3);
    setSelectedId("");
    setFocusRequest(null);
  };
  const changePage = (value) => {
    setPage(value);
    setSelectedId("");
    setFocusRequest(null);
  };
  const closeDetail = () => {
    returnFocus.current?.focus?.({ preventScroll: true });
    setSelectedId("");
    setFocusRequest(null);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("section", { className: "mm-waterfall", "aria-label": "\u672C\u6B21\u8FD0\u884C\u65E5\u5FD7\u7011\u5E03\u56FE", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "mm-wf-heading", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h3", { children: "\u8FD0\u884C\u8FC7\u7A0B\u7011\u5E03\u56FE" }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { children: [
        data.rawCount,
        " \u6761\u539F\u59CB\u65E5\u5FD7 \xB7 ",
        data.total > 0 ? spanDuration(data.total) : "\u8FD0\u884C\u65F6\u957F\u672A\u786E\u8BA4"
      ] })
    ] }),
    loading && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { role: "status", className: "mm-exec-note", children: hasLogs ? "\u6B63\u5728\u8865\u9F50\u65E5\u5FD7\uFF0C\u56FE\u8868\u548C\u6392\u540D\u4F1A\u968F\u4E4B\u66F4\u65B0\u2026" : "\u6B63\u5728\u8BFB\u53D6\u8FC7\u7A0B\u65E5\u5FD7\u2026" }),
    error && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("p", { role: "alert", className: "mm-exec-error", children: [
      hasLogs ? "\u65E5\u5FD7\u8BFB\u53D6\u5931\u8D25\uFF0C\u4FDD\u7559\u5DF2\u8BFB\u7247\u6BB5\u3002" : "\u65E5\u5FD7\u8BFB\u53D6\u5931\u8D25\uFF0C\u5C1A\u65E0\u53EF\u5206\u6790\u7684\u7247\u6BB5\u3002",
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { onClick: onRetry, children: "\u91CD\u8BD5\u8BFB\u53D6" })
    ] }),
    !hasLogs && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "mm-wf-empty", role: "status", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("strong", { children: loading ? "\u6B63\u5728\u8BFB\u53D6\u8FC7\u7A0B\u65E5\u5FD7" : "\u6682\u65E0\u53EF\u5206\u6790\u7684\u8FC7\u7A0B\u65E5\u5FD7" }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("p", { children: [
        data.total > 0 ? `\u5DF2\u77E5\u672C\u6B21\u8FD0\u884C\u6301\u7EED ${spanDuration(data.total)}\uFF0C\u4F46\u6CA1\u6709\u65E5\u5FD7\u53EF\u4EE5\u62C6\u5206\u5404\u6B65\u9AA4\u8017\u65F6\u3002` : "\u5C1A\u672A\u53D6\u5F97\u53EF\u7528\u4E8E\u5206\u6790\u7684\u8FD0\u884C\u65F6\u95F4\u548C\u65E5\u5FD7\u3002",
        error ? "\u8BF7\u91CD\u8BD5\u8BFB\u53D6\u3002" : ""
      ] })
    ] }),
    hasLogs && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "mm-wf-totals", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "mm-wf-total-intro", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("strong", { children: "\u8BB0\u5F55\u533A\u95F4\u7EDF\u8BA1" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: "\u8DE8\u7C7B\u578B\u53EF\u91CD\u53E0\uFF0C\u4E0D\u80FD\u76F8\u52A0\u4E3A\u8FD0\u884C\u8017\u65F6\uFF1B\u4E5F\u4E0D\u662F\u6A21\u578B\u6216\u5DE5\u5177\u7684\u5B9E\u9645\u8017\u65F6\u3002" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "mm-wf-total-items", children: Object.entries(waterfallKinds).filter(([key]) => key !== "other" || data.totals[key] > 0).map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(TypeIcon, { type: key }),
          label,
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("strong", { children: key === "gap" && !data.complete ? "\u5F85\u6838\u5B9E" : data.totals[key] === 0 ? "0 \u79D2" : spanDuration(data.totals[key]) })
        ] }, key)) })
      ] }),
      !data.complete && !loading && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "mm-exec-note", children: "\u65E5\u5FD7\u6216\u8D77\u6B62\u65F6\u95F4\u4E0D\u5B8C\u6574\uFF0C\u4EC5\u5C55\u793A\u5DF2\u8BFB\u7247\u6BB5\uFF0C\u6682\u4E0D\u8BA1\u7B97\u65E0\u65E5\u5FD7\u95F4\u9694\u3002" }),
      !data.terminal && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "mm-exec-note", children: "\u8FD0\u884C\u5C1A\u672A\u7ED3\u675F\uFF0C\u6A2A\u8F74\u622A\u81F3\u6700\u540E\u4E00\u6761\u5DF2\u6536\u5230\u7684\u65E5\u5FD7\u3002" }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "mm-wf-controls", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("label", { children: [
          "\u65E5\u5FD7\u7C7B\u578B",
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("select", { "aria-label": "\u65E5\u5FD7\u7C7B\u578B", value: kind, onChange: (event) => changeKind(event.target.value), children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("option", { value: "all", children: "\u5168\u90E8\u7C7B\u578B" }),
            Object.entries(waterfallKinds).map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("option", { value: key, children: label }, key))
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("label", { children: [
          "\u65F6\u95F4\u8F74\u663E\u793A",
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("select", { "aria-label": "\u65F6\u95F4\u8F74\u663E\u793A", value: mode, onChange: (event) => {
            setMode(event.target.value);
            setSelectedId("");
            setFocusRequest(null);
          }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("option", { value: "sequence", children: "\u9010\u6761\u67E5\u9605 \xB7 \u6BCF\u6279 40 \u6761" }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("option", { value: "longest", children: "\u8F83\u957F\u7247\u6BB5\u524D 20 \xB7 \u6309\u53D1\u751F\u987A\u5E8F" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("label", { className: "mm-wf-search", children: [
        "\u641C\u7D22\u672C\u6B21\u8FD0\u884C\u7684\u7247\u6BB5",
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("input", { "aria-label": "\u641C\u7D22\u672C\u6B21\u8FD0\u884C\u7684\u7247\u6BB5", placeholder: "\u641C\u7D22\u65E5\u5FD7\u7F16\u53F7\u3001\u5DE5\u5177\u540D\u6216\u539F\u6587\u2026", value: query, onChange: (event) => {
          setQuery(event.target.value);
          setPage(0);
          setSelectedId("");
          setFocusRequest(null);
        } })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("p", { className: "mm-wf-usage", children: [
        "\u641C\u7D22\u8986\u76D6\u5F53\u524D\u7C7B\u578B\u7684\u5168\u90E8 ",
        view.typed.length,
        " \u4E2A\u7247\u6BB5\uFF1B",
        query.trim() ? `\u5339\u914D ${view.matches.length} \u6761\uFF0C` : "",
        "\u56FE\u4E2D",
        paginated ? `\u663E\u793A\u7B2C ${safePage + 1} / ${pages} \u6279\uFF0C\u6BCF\u6279\u6700\u591A 40 \u6761` : `\u663E\u793A\u8DE8\u5EA6\u6700\u957F\u7684 ${rows.length} \u6761`,
        "\u3002\u70B9\u9009\u67E5\u770B\u8BC1\u636E\uFF0CCtrl / \u2318 + \u6EDA\u8F6E\u7F29\u653E\u3002"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: `mm-wf-workspace${selected ? " has-selection" : ""}`, children: [
        data.total > 0 && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(WaterfallChart, { data, issue, run, rows, selectedId, focusRequest, onSelect: (id2) => {
          if (id2 && id2 !== selectedId) rememberFocus();
          setSelectedId(id2);
          setFocusRequest(null);
        } }, `${kind}-${mode}-${safePage}`),
        selected && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(WaterfallDetail, { row: selected, onFocus: () => focus(selected, true), onClose: closeDetail })
      ] }),
      ranked.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("details", { className: "mm-wf-ranking-disclosure", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("summary", { children: [
          "\u8DE8\u5EA6\u6700\u957F\u7684\u7247\u6BB5 \xB7 \u524D ",
          ranked.length,
          " \u6761"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("section", { className: "mm-wf-ranking", "aria-label": "\u8DE8\u5EA6\u6700\u957F\u7684\u7247\u6BB5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "mm-wf-heading", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h3", { children: "\u8DE8\u5EA6\u6700\u957F\u7684\u7247\u6BB5" }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { children: [
              "\u663E\u793A ",
              Math.min(count, ranked.length),
              " / ",
              ranked.length,
              " \u6761"
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("ol", { children: ranked.slice(0, count).map((row, index2) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("button", { onClick: () => focus(row), "aria-pressed": selectedId === row.id, children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "mm-wf-rank", children: index2 + 1 }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(TypeIcon, { type: row.kind }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "mm-wf-rank-name", children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("strong", { children: row.name }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("small", { children: row.kind === "gap" ? `\u672A\u6536\u5230\u65B0\u65E5\u5FD7 \xB7 \u539F\u56E0\u5F85\u6838\u5B9E \xB7 ${row.summary}` : row.summary || (row.seq ? `#${row.seq}\u2013${row.lastSeq}` : "\u8FD0\u884C\u8BB0\u5F55\u4E4B\u95F4") })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("strong", { children: spanDuration(row.duration) }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "mm-wf-rank-action", children: "\u67E5\u770B\u8BC1\u636E" })
          ] }) }, row.id)) }),
          count < ranked.length && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("button", { onClick: () => setCount((value) => Math.min(20, value + 5)), children: [
            "\u518D\u770B ",
            Math.min(5, ranked.length - count),
            " \u6761"
          ] })
        ] })
      ] }),
      rows.some((row) => row.duration == null) && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "mm-exec-note", children: "\u672A\u80FD\u786E\u8BA4\u65F6\u957F\u7684\u8BB0\u5F55\u4E0D\u5728\u56FE\u4E0A\u7ED8\u5236\uFF0C\u53EF\u5728\u6267\u884C\u8BB0\u5F55\u4E2D\u67E5\u770B\u3002" }),
      !rows.length && !loading && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "mm-exec-note", children: data.rawCount ? "\u6CA1\u6709\u5339\u914D\u7684\u7247\u6BB5\u3002\u53EF\u6E05\u7A7A\u641C\u7D22\u6216\u5207\u6362\u65E5\u5FD7\u7C7B\u578B\u3002" : "\u672C\u6B21\u8FD0\u884C\u5C1A\u672A\u8BFB\u5230\u8FC7\u7A0B\u65E5\u5FD7\u3002" }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "mm-wf-footer", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: paginated ? `${view.matches.length} \u4E2A\u7247\u6BB5 \xB7 \u7B2C ${safePage + 1} / ${pages} \u6279 \xB7 \u6309\u53D1\u751F\u987A\u5E8F\u6392\u5217` : `\u663E\u793A\u8F83\u957F\u7684 ${rows.length} / ${view.matches.length} \u4E2A\u7247\u6BB5 \xB7 \u6309\u53D1\u751F\u987A\u5E8F\u6392\u5217` }),
        paginated && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { disabled: safePage === 0, onClick: () => changePage(safePage - 1), children: "\u4E0A\u4E00\u6279" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { disabled: safePage === pages - 1, onClick: () => changePage(safePage + 1), children: "\u4E0B\u4E00\u6279" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("details", { className: "mm-wf-notes", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("summary", { children: "\u6570\u636E\u8303\u56F4\u548C\u65F6\u95F4\u53E3\u5F84" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("p", { children: [
          clock2(data.start),
          " \u2014 ",
          clock2(data.end),
          "\u3002\u53EA\u8986\u76D6\u8FD9\u4E00\u6B21\u8FD0\u884C\u3002"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { children: "\u601D\u8003\u3001\u6587\u5B57\u6309\u8FDE\u7EED\u540C\u7C7B\u8F93\u51FA\u7684\u9996\u672B\u65E5\u5FD7\u8BA1\u65F6\uFF1B\u5DE5\u5177\u6309\u552F\u4E00\u5339\u914D\u7684\u8C03\u7528\u4E0E\u8FD4\u56DE\u8BA1\u65F6\u3002\u989C\u8272\u8868\u793A\u7C7B\u578B\uFF0C\u4E0D\u8868\u793A\u6162\u6216\u5F02\u5E38\u3002\u65F6\u95F4\u70B9\u6CA1\u6709\u53EF\u8BA1\u7B97\u7684\u65F6\u957F\u3002" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { children: "\u65E0\u65E5\u5FD7\u95F4\u9694\u662F\u5DF2\u77E5\u8BB0\u5F55\u533A\u95F4\u4E4B\u5916\u7684\u65F6\u95F4\uFF0C\u539F\u56E0\u672A\u77E5\u3002\u5404\u7C7B\u5408\u8BA1\u5BF9\u540C\u7C7B\u91CD\u53E0\u533A\u95F4\u53BB\u91CD\uFF1B\u4E0D\u540C\u7C7B\u578B\u53EF\u80FD\u5E76\u884C\uFF0C\u4E0D\u80FD\u76F4\u63A5\u76F8\u52A0\u89C6\u4E3A\u603B\u8017\u65F6\u3002" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { children: "\u5206\u6790\u7A97\u53E3\u6700\u591A\u4FDD\u7559 10000 \u6761\u30018 MB \u539F\u59CB\u65E5\u5FD7\uFF0C\u8D85\u51FA\u6216\u7F3A\u5931\u65F6\u4F1A\u6807\u660E\u4E0D\u5B8C\u6574\u3002" })
      ] })
    ] })
  ] });
}

// src/execution-trace.mjs
var eventLabels = { tool: "\u5DE5\u5177", thinking: "\u601D\u8003\u8BB0\u5F55", text: "\u6587\u5B57\u53CD\u9988", error: "\u9519\u8BEF", system: "\u4E8B\u4EF6" };
var timeMs = (value) => typeof value === "string" && Number.isFinite(Date.parse(value)) ? Date.parse(value) : null;
var traceDuration = (value) => value > 0 && value < 1e3 ? "\u5C11\u4E8E 1 \u79D2" : shortDuration(value);
var interval = (start, end) => start != null && end != null && end >= start ? end - start : null;
var threshold = (settings, key, fallback) => Number.isFinite(settings?.[key]) && settings[key] > 0 ? settings[key] * 6e4 : fallback * 6e4;
function executionMetrics(run, { now = Date.now(), observedRun, unavailable = false, settings = {}, runtimeStatus } = {}) {
  const active6 = activeRunStates.has(run.status), waiting = active6 && run.status !== "running";
  const sameIdentity = observedRun?.id === run.id && observedRun?.issueId === run.issueId;
  const stateConflict = Boolean(sameIdentity && observedRun.status !== run.status);
  const observationLost = Boolean(sameIdentity && observedRun.observationError);
  const stale = unavailable || active6 && (stateConflict || observationLost);
  const started = timeMs(run.startedAt), created = timeMs(run.createdAt), ended = timeMs(run.completedAt);
  const running = run.status === "running" && run.completedAt == null;
  const terminal = ["completed", "failed", "cancelled"].includes(run.status);
  const validStart = started != null && started <= now;
  const elapsed2 = validStart && (terminal && ended != null && ended <= now || running && !stale) ? interval(started, terminal ? ended : now) : null;
  const waitEnd = (running || terminal) && validStart ? started : waiting && run.startedAt == null && run.completedAt == null && !stale ? now : null;
  const wait = created != null && created <= now ? interval(created, waitEnd) : null;
  const observed = observedRun?.id === run.id && observedRun?.issueId === run.issueId && observedRun.status === run.status ? observedRun : null;
  const healthy = !stale && runtimeStatus !== "offline" && observed && !observed.logError && !observed.observationError && observed.logsCaughtUp === true && observed.workProgress?.coverage?.partial !== true && observed.workProgress?.coverage?.logsCaughtUp !== false;
  const silence = healthy && running && Number.isFinite(observed.silenceMs) && observed.silenceMs >= 0 ? observed.silenceMs : null;
  const alerts = [];
  if (active6 && stateConflict) alerts.push("\u8FD0\u884C\u72B6\u6001\u5C1A\u5F85\u6838\u5B9E");
  if (!unavailable && waiting && started == null && wait >= threshold(settings, "queueMinutes", 5)) alerts.push("\u542F\u52A8\u7B49\u5F85\u8F83\u957F");
  if (!unavailable && running && elapsed2 >= threshold(settings, "runMinutes", 60)) alerts.push("\u8FD0\u884C\u65F6\u95F4\u8F83\u957F");
  if (silence != null && silence >= threshold(settings, "noProgressMinutes", 10)) alerts.push("\u8F83\u4E45\u672A\u6536\u5230\u65B0\u53CD\u9988");
  return { active: active6, running, waiting, started, created, ended, elapsed: elapsed2, wait, observed, healthy, silence, alerts, stateConflict, observationLost };
}
function buildExecutionTrace({ run, messages = [], now = Date.now(), observedRun, unavailable = false, settings = {}, partial = false, runtimeStatus }) {
  const metrics = executionMetrics(run, { now, observedRun: partial && observedRun ? { ...observedRun, logsCaughtUp: false } : observedRun, unavailable, settings, runtimeStatus });
  const { entries, gaps } = conversationEntries(messages);
  const phases = [];
  if (metrics.wait != null) phases.push({ id: "wait", kind: "wait", name: "\u542F\u52A8\u524D\u7B49\u5F85", start: metrics.created, end: metrics.created + metrics.wait, duration: metrics.wait, measurement: "\u521B\u5EFA\u81F3\u5F00\u59CB", pending: metrics.waiting && metrics.started == null, tone: metrics.alerts.includes("\u542F\u52A8\u7B49\u5F85\u8F83\u957F") ? "warning" : "neutral" });
  phases.push({ id: "execution", kind: "execution", name: conversationStatusLabels[run.status] || "\u72B6\u6001\u5F85\u6838\u5B9E", start: metrics.started, end: metrics.elapsed == null ? null : metrics.started + metrics.elapsed, duration: metrics.elapsed, measurement: "\u8FD0\u884C\u8D77\u6B62", pending: metrics.running, tone: run.status === "failed" ? "error" : metrics.alerts.includes("\u8FD0\u884C\u65F6\u95F4\u8F83\u957F") ? "warning" : "normal" });
  const events = entries.map((entry) => {
    const call = entry.call, result = entry.result, message = entry.message;
    const start2 = timeMs(call?.createdAt || result?.createdAt || message?.createdAt);
    const resultAt = timeMs(result?.createdAt);
    const paired = entry.kind === "tool" && call && result && !entry.ambiguous;
    const gap = paired ? interval(timeMs(call.createdAt), resultAt) : null;
    const pending = entry.kind === "tool" && call?.callId && !result && !entry.ambiguous;
    const observed = pending && metrics.healthy && !partial && !gaps && metrics.running ? metrics.observed.pendingTools?.find((tool) => tool.callId === call.callId && tool.tool === call.tool) : null;
    const observedAt = observed && Number.isFinite(observed.observedAt) && observed.observedAt <= now ? observed.observedAt : null;
    const observedWait = observedAt == null ? null : now - observedAt;
    const range = gap > 0 ? { start: start2, end: resultAt, duration: gap, measurement: "\u8BB0\u5F55\u95F4\u9694" } : observedWait != null ? { start: observedAt, end: now, duration: observedWait, measurement: "\u5DF2\u89C2\u5BDF\u7B49\u5F85" } : { start: start2, end: null, duration: null, measurement: entry.kind === "tool" ? "\u8017\u65F6\u672A\u77E5" : "\u8BB0\u5F55\u65F6\u523B" };
    const state = entry.kind !== "tool" ? eventLabels[entry.kind] || "\u6267\u884C\u4E8B\u4EF6" : entry.ambiguous ? "\u914D\u5BF9\u5F85\u6838\u5B9E" : !call ? "\u4EC5\u6709\u8FD4\u56DE\u8BB0\u5F55" : result ? "\u5DF2\u8FD4\u56DE" : metrics.active ? "\u672A\u6536\u5230\u8FD4\u56DE" : "\u7ED3\u675F\u65F6\u672A\u8BFB\u5230\u8FD4\u56DE";
    return {
      ...range,
      id: `event:${entry.seq}`,
      kind: entry.kind,
      name: entry.kind === "tool" ? call?.tool || result?.tool || "\u5DE5\u5177" : eventLabels[entry.kind] || "\u6267\u884C\u4E8B\u4EF6",
      summary: entry.kind === "tool" ? toolSummary(entry) : (message?.content || "").replace(/\s+/g, " ").slice(0, 160),
      seq: entry.seq,
      lastSeq: entry.lastSeq || result?.seq || entry.seq,
      state,
      entry,
      tone: entry.kind === "error" ? "error" : observedWait != null && observedWait >= threshold(settings, "toolMinutes", 5) ? "warning" : "neutral",
      pending: observedWait != null,
      uncertain: entry.kind === "tool" && observedWait == null,
      note: gap > 0 ? "\u8C03\u7528\u4E0E\u8FD4\u56DE\u7684\u8BB0\u5F55\u65F6\u95F4\u5DEE\uFF0C\u53EF\u80FD\u5305\u542B\u4E0A\u62A5\u5EF6\u8FDF\uFF0C\u4E0D\u4EE3\u8868\u7CBE\u786E\u5DE5\u5177\u6267\u884C\u8017\u65F6\u3002" : observedWait != null ? "\u4ECE\u76D1\u63A7\u9996\u6B21\u89C2\u5BDF\u5230\u8C03\u7528\u5F00\u59CB\u8BA1\u65F6\uFF1B\u5C1A\u672A\u6536\u5230\u8FD4\u56DE\uFF0C\u4E0D\u8BC1\u660E\u5DE5\u5177\u4ECD\u5728\u6267\u884C\u3002" : entry.kind === "tool" ? "\u7F3A\u5C11\u53EF\u4FE1\u8D77\u6B62\u8FB9\u754C\uFF0C\u65E0\u6CD5\u8BA1\u7B97\u771F\u5B9E\u5DE5\u5177\u8017\u65F6\uFF1B\u540C\u6279\u8FD4\u56DE\u4E5F\u4E0D\u663E\u793A\u4E3A 0 \u79D2\u3002" : entry.kind === "thinking" ? "\u8FD9\u662F\u5DF2\u4E0A\u62A5\u7684\u601D\u8003\u5185\u5BB9\uFF0C\u4E0D\u4EE3\u8868\u4E00\u6B21\u6A21\u578B\u8BF7\u6C42\u7684\u5B8C\u6574\u601D\u8003\u65F6\u6BB5\u3002" : "\u65F6\u95F4\u70B9\u8868\u793A\u8FD9\u6BB5\u5185\u5BB9\u7684\u8BB0\u5F55\u65F6\u523B\uFF0C\u4E0D\u8868\u793A\u5B8C\u6574\u8F93\u51FA\u8017\u65F6\u3002"
    };
  });
  const times = [...phases, ...events].flatMap((row) => [row.start, row.end]).filter((value) => value != null && Number.isFinite(value));
  const start = times.length ? Math.min(...times) : null, end = times.length ? Math.max(...times) : null;
  return { phases, events, metrics, gaps, domain: start == null ? null : { start, end, duration: Math.max(1e3, end - start) } };
}
function runExchange({ run, comments = [], runs = [] }) {
  const scoped = comments.filter((comment) => comment.issueId === run.issueId);
  const input = scoped.find((comment) => comment.id === run.triggerCommentId) || null;
  const outputs = scoped.filter((comment) => comment.sourceTaskId === run.id && comment.authorType === "agent" && comment.authorId === run.agentId).sort((a, b) => (timeMs(a.createdAt) || 0) - (timeMs(b.createdAt) || 0));
  const next = runs.filter((item) => item.id !== run.id && item.issueId === run.issueId && item.lineageKnown && [item.delegatedFromTaskId, item.retryOfTaskId, item.rerunOfTaskId, item.parentTaskId].includes(run.id));
  return { input, outputs, next };
}

// src/run-execution.jsx
var import_jsx_runtime6 = require("react/jsx-runtime");
var clock3 = (value) => value != null && Number.isFinite(typeof value === "number" ? value : Date.parse(value)) ? new Date(value).toLocaleTimeString("zh-CN", { hour12: false }) : "\u65F6\u95F4\u672A\u63D0\u4F9B";
function TextBlock({ value, empty, limit = 180 }) {
  return value ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ReadableText, { text: value, limit }) : /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "mm-exec-note", children: empty });
}
var failedEvent = (row) => row.kind === "error" || row.entry?.result?.isError === true || row.entry?.result?.is_error === true;
var eventState = (row) => failedEvent(row) ? row.kind === "tool" ? "\u5DE5\u5177\u8FD4\u56DE\u9519\u8BEF" : "\u9519\u8BEF\u8BB0\u5F55" : row.state;
var observedWaiting = (row) => row.pending && row.measurement === "\u5DF2\u89C2\u5BDF\u7B49\u5F85" && row.duration != null;
function EvidenceRow({ row, selected, onSelect, attention = false }) {
  const failed = failedEvent(row);
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("button", { type: "button", className: `mm-exec-record${failed ? " is-error" : attention ? " is-warning" : ""}`, "aria-pressed": selected, onClick: () => onSelect(row.id), "aria-label": `\u67E5\u770B${row.name}\u8BB0\u5F55\uFF0C${eventState(row)}${observedWaiting(row) ? `\uFF0C\u5DF2\u89C2\u5BDF\u7B49\u5F85 ${traceDuration(row.duration)}` : ""}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("time", { children: clock3(row.entry?.call?.createdAt || row.entry?.result?.createdAt || row.entry?.message?.createdAt || row.start) }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "mm-exec-record-body", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("strong", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(TypeIcon, { type: row.kind, isError: failed }),
        row.name,
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: eventState(row) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "mm-exec-record-summary", children: row.summary || "\u67E5\u770B\u8BB0\u5F55\u5185\u5BB9" })
    ] }),
    observedWaiting(row) && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "mm-exec-observed", children: [
      "\u5DF2\u89C2\u5BDF\u7B49\u5F85 ",
      traceDuration(row.duration)
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "mm-exec-record-open", children: "\u67E5\u770B\u8BC1\u636E" })
  ] });
}
function TraceEventDetail({ row, run, onClose }) {
  const call = row.entry?.call, result = row.entry?.result, message = row.entry?.message;
  const element = (0, import_react7.useRef)(null);
  (0, import_react7.useEffect)(() => {
    element.current?.scrollIntoView({ block: "nearest" });
    element.current?.focus({ preventScroll: true });
  }, [row.id]);
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("section", { className: "mm-exec-event-detail", "aria-label": "\u9009\u4E2D\u4E8B\u4EF6\u8BE6\u60C5", ref: element, tabIndex: -1, children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "mm-exec-title", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("h3", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(TypeIcon, { type: row.kind, isError: failedEvent(row) }),
        row.name
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { onClick: onClose, children: "\u5173\u95ED\u8BE6\u60C5" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("p", { className: "mm-exec-note", children: [
      eventState(row) || row.measurement,
      row.seq ? ` \xB7 #${row.seq}${row.lastSeq !== row.seq ? `\u2013${row.lastSeq}` : ""}` : ""
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("p", { className: "mm-exec-note", children: [
      call ? `\u8C03\u7528\u8BB0\u5F55 ${clock3(call.createdAt)}` : `\u8BB0\u5F55\u65F6\u95F4 ${clock3(row.start)}`,
      result ? ` \xB7 \u8FD4\u56DE\u8BB0\u5F55 ${clock3(result.createdAt)}` : ""
    ] }),
    observedWaiting(row) && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("p", { className: "mm-exec-attention", children: [
      "\u5DF2\u89C2\u5BDF\u7B49\u5F85 ",
      traceDuration(row.duration),
      "\uFF0C\u5C1A\u672A\u6536\u5230\u8FD4\u56DE\u3002"
    ] }),
    row.kind === "tool" ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "mm-exec-payloads", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("section", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h4", { children: "\u8C03\u7528\u8F93\u5165" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("pre", { children: call ? printable(call.input) || "\u53C2\u6570\u672A\u63D0\u4F9B" : "\u672A\u8BFB\u5230\u8C03\u7528\u8BB0\u5F55" }),
        call?.inputTruncated && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "mm-exec-note", children: "\u8F93\u5165\u5DF2\u622A\u65AD" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("section", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h4", { children: "\u8FD4\u56DE\u8F93\u51FA" }),
        result ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("pre", { children: result.output || result.content || "\uFF08\u7A7A\u8FD4\u56DE\uFF09" }) : /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "mm-exec-note", children: row.state }),
        result && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "mm-exec-note", children: result.outputTruncated === true ? "\u8F93\u51FA\u5DF2\u622A\u65AD" : result.outputTruncated == null ? "\u8F93\u51FA\u5B8C\u6574\u6027\u672A\u63D0\u4F9B" : "\u5F53\u524D\u8BB0\u5F55\u672A\u6807\u8BB0\u622A\u65AD" })
      ] })
    ] }) : row.entry ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(TextBlock, { value: message?.content || message?.output, empty: "\u8BB0\u5F55\u672A\u63D0\u4F9B\u6B63\u6587", limit: 2200 }) : /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "mm-exec-note", children: row.kind === "wait" ? "\u4ECE\u8FD0\u884C\u521B\u5EFA\u5230\u5B9E\u9645\u5F00\u59CB\uFF1B\u5305\u542B\u8C03\u5EA6\u3001\u6D3E\u53D1\u6216\u5176\u4ED6\u542F\u52A8\u524D\u7B49\u5F85\u3002\u7B49\u5F85\u539F\u56E0\u9700\u7ED3\u5408\u8FD0\u884C\u72B6\u6001\u6838\u5B9E\u3002" : run.error || "\u8FD0\u884C\u65F6\u95F4\u6765\u81EA\u670D\u52A1\u7AEF\u7684\u5F00\u59CB\u548C\u7ED3\u675F\u8BB0\u5F55\uFF1B\u8FD0\u884C\u5B8C\u6210\u4E0D\u4EE3\u8868\u4EFB\u52A1\u9A8C\u6536\u901A\u8FC7\u3002" }),
    message?.contentTruncated && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "mm-exec-note", children: "\u6B63\u6587\u5DF2\u622A\u65AD" }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "mm-exec-note mm-exec-timing-note", children: row.kind === "tool" ? observedWaiting(row) ? "\u4ECE\u76D1\u63A7\u9996\u6B21\u89C2\u5BDF\u5230\u8C03\u7528\u5F00\u59CB\u8BA1\u65F6\uFF1B\u5C1A\u672A\u6536\u5230\u8FD4\u56DE\uFF0C\u4E0D\u8BC1\u660E\u5DE5\u5177\u4ECD\u5728\u6267\u884C\u3002" : "\u8FD9\u91CC\u53EA\u5C55\u793A\u8C03\u7528\u4E0E\u8FD4\u56DE\u7684\u8BB0\u5F55\u65F6\u95F4\uFF1B\u6CA1\u6709\u53EF\u4FE1\u6267\u884C\u8FB9\u754C\uFF0C\u4E0D\u80FD\u636E\u6B64\u8BA1\u7B97\u5DE5\u5177\u8017\u65F6\u3002" : row.kind === "thinking" ? "\u8FD9\u662F\u5DF2\u4E0A\u62A5\u7684\u601D\u8003\u5185\u5BB9\uFF0C\u4E0D\u4EE3\u8868\u4E00\u6B21\u6A21\u578B\u8BF7\u6C42\u7684\u5B8C\u6574\u601D\u8003\u65F6\u6BB5\u3002" : "\u8BB0\u5F55\u65F6\u95F4\u4E0D\u8868\u793A\u5B8C\u6574\u8F93\u51FA\u8017\u65F6\u3002" })
  ] });
}
function ExecutionEvidence({ trace, run, loading, error, hasMore, trimmed, onRetry }) {
  const [expanded, setExpanded] = (0, import_react7.useState)(false), [filter, setFilter] = (0, import_react7.useState)("all"), [limit, setLimit] = (0, import_react7.useState)(40), [selectedId, setSelectedId] = (0, import_react7.useState)("");
  const important = trace.events.filter((row) => failedEvent(row) || observedWaiting(row) && row.tone === "warning");
  const events = filter === "all" ? trace.events : trace.events.filter((row) => filter === "error" ? failedEvent(row) : row.kind === filter);
  const selected = trace.events.find((row) => row.id === selectedId);
  const select = (id2) => setSelectedId((previous) => previous === id2 ? "" : id2);
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("section", { className: "mm-exec-evidence", "aria-label": "\u6267\u884C\u8BC1\u636E", children: [
    error && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "mm-exec-error", role: "alert", children: [
      "\u6267\u884C\u6D88\u606F\u8BFB\u53D6\u5931\u8D25\uFF0C\u4FDD\u7559\u5DF2\u8BFB\u8BB0\u5F55\u3002",
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { onClick: onRetry, children: "\u91CD\u8BD5\u8BFB\u53D6" })
    ] }),
    (hasMore || loading) && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "mm-exec-note", role: "status", children: "\u6B63\u5728\u8865\u9F50\u6267\u884C\u6D88\u606F\u2026" }),
    (trace.gaps || trimmed) && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "mm-exec-note", children: "\u5F53\u524D\u6D88\u606F\u4E0D\u5B8C\u6574\uFF0C\u4EC5\u5C55\u793A\u5DF2\u8BFB\u53D6\u7684\u8BC1\u636E\u3002" }),
    important.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "mm-exec-important", "aria-label": "\u9700\u8981\u67E5\u770B\u7684\u6267\u884C\u8BC1\u636E", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("h3", { children: [
        "\u9700\u8981\u67E5\u770B\u7684\u8BB0\u5F55 ",
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: important.length })
      ] }),
      important.slice(-4).map((row) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(EvidenceRow, { row, selected: selectedId === row.id, onSelect: select, attention: true }, row.id)),
      important.length > 4 && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("button", { className: "mm-exec-more", onClick: () => {
        setExpanded(true);
        setFilter("all");
      }, children: [
        "\u53E6\u6709 ",
        important.length - 4,
        " \u6761\uFF0C\u5C55\u5F00\u5168\u90E8\u8BB0\u5F55"
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("button", { type: "button", className: "mm-exec-disclosure", "aria-expanded": expanded, onClick: () => setExpanded((value) => !value), children: [
      expanded ? "\u6536\u8D77\u6267\u884C\u8BB0\u5F55" : `\u67E5\u770B\u6267\u884C\u8BB0\u5F55\uFF08${trace.events.length}\uFF09`,
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("svg", { "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 16 16", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { d: expanded ? "M4 10 8 6l4 4" : "M4 6l4 4 4-4", fill: "none", stroke: "currentColor", strokeWidth: "1.5" }) })
    ] }),
    expanded && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "mm-exec-records", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "mm-exec-controls", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("label", { children: [
          "\u8BB0\u5F55\u7C7B\u578B",
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("select", { "aria-label": "\u7B5B\u9009\u6267\u884C\u8BB0\u5F55", value: filter, onChange: (event) => {
            setFilter(event.target.value);
            setLimit(40);
          }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("option", { value: "all", children: "\u5168\u90E8" }),
            Object.entries(eventLabels).filter(([key]) => key !== "system").map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("option", { value: key, children: label }, key))
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "mm-exec-note", children: "\u6309\u8BB0\u5F55\u987A\u5E8F \xB7 \u65F6\u95F4\u4E3A\u4E0A\u62A5\u8BB0\u5F55\u65F6\u523B" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "mm-exec-record-list", children: events.slice(0, limit).map((row) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(EvidenceRow, { row, selected: selectedId === row.id, onSelect: select }, row.id)) }),
      events.length > limit && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("button", { className: "mm-exec-more", onClick: () => setLimit((value) => value + 40), children: [
        "\u518D\u663E\u793A ",
        Math.min(40, events.length - limit),
        " \u6761\u8BB0\u5F55"
      ] }),
      !events.length && !loading && !hasMore && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "mm-exec-note mm-exec-empty", children: filter === "all" ? "\u672C\u6B21\u8FD0\u884C\u5C1A\u672A\u8BFB\u5230\u8FC7\u7A0B\u6D88\u606F\u3002" : "\u6CA1\u6709\u8FD9\u4E00\u7C7B\u578B\u7684\u8BB0\u5F55\u3002" })
    ] }),
    selected && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(TraceEventDetail, { row: selected, run, onClose: () => setSelectedId("") })
  ] });
}
function RunExecutionPanel({ waterfallOnly = false, run, issue, runs = [], comments = [], commentsError = "", commentsLoading = false, commentsIncomplete = false, commentWarnings = [], participants = [], agents = [], onInspect, onRetryComments, url, settings, observedRun, unavailable, runtimeStatus, now, ...transcript }) {
  const messages = transcript.waterfallMessages || transcript.messages || [];
  const historyTrimmed = transcript.waterfallTrimmed ?? transcript.trimmed;
  const trace = buildExecutionTrace({ run, messages, now, settings, observedRun, unavailable, runtimeStatus, partial: transcript.loading || transcript.hasMore || historyTrimmed || Boolean(transcript.error) });
  const exchange = runExchange({ run, runs, comments });
  const author = (comment) => comment?.authorType === "member" ? participants.find((item) => item.id === comment.authorId)?.name || "\u4EBA\u5458\u56DE\u590D" : agents.find((item) => item.id === comment?.authorId)?.name || "\u667A\u80FD\u4F53\u56DE\u590D";
  const last = messages.at(-1);
  const lastEntry = last && trace.events.find((row) => row.entry?.result?.seq === last.seq || row.seq === last.seq || row.lastSeq === last.seq);
  const lastAction = last?.type === "tool_use" ? `\u6536\u5230\u5DE5\u5177\u8C03\u7528 \xB7 ${last.tool || "\u5DE5\u5177"}` : last?.type === "tool_result" ? `\u6536\u5230\u5DE5\u5177${last.isError || last.is_error ? "\u9519\u8BEF\u8FD4\u56DE" : "\u8FD4\u56DE"} \xB7 ${lastEntry?.name || last.tool || "\u5DE5\u5177"}` : last?.type === "thinking" ? "\u6536\u5230\u601D\u8003\u5185\u5BB9" : last?.type === "text" ? "\u6536\u5230\u6587\u5B57\u53CD\u9988" : last?.type === "error" ? "\u6536\u5230\u9519\u8BEF\u8BB0\u5F55" : last ? "\u6536\u5230\u6267\u884C\u4E8B\u4EF6" : "\u5C1A\u672A\u6536\u5230\u6267\u884C\u6D88\u606F";
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("section", { className: "mm-execution", "aria-label": "\u8FD0\u884C\u76D1\u63A7\u8BE6\u60C5", children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "mm-exec-summary", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("strong", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(AgentAvatar, { name: run.agentName || agents.find((a) => a.id === run.agentId)?.name, size: 22 }),
        run.agentName || agents.find((item) => item.id === run.agentId)?.name || "\u667A\u80FD\u4F53",
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: unavailable ? "\u72B6\u6001\u5F85\u6838\u5B9E" : conversationStatusLabels[run.status] || run.status })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("dl", { children: [
        (trace.metrics.waiting || trace.metrics.wait >= 6e4) && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("dt", { children: trace.metrics.waiting ? "\u7B49\u5F85\u542F\u52A8" : "\u542F\u52A8\u524D\u7B49\u5F85" }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("dd", { children: traceDuration(trace.metrics.wait) })
        ] }),
        !trace.metrics.waiting && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("dt", { children: trace.metrics.running ? "\u5DF2\u8FD0\u884C" : "\u8FD0\u884C\u8017\u65F6" }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("dd", { children: traceDuration(trace.metrics.elapsed) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("p", { className: "mm-exec-last", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("strong", { children: "\u6700\u8FD1\u786E\u8BA4" }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { children: [
        lastAction,
        last ? ` \xB7 ${clock3(last.createdAt)}` : "",
        transcript.error || transcript.hasMore || transcript.loading ? " \xB7 \u8BB0\u5F55\u5C1A\u5F85\u6838\u5B9E" : ""
      ] }),
      lastEntry?.kind === "tool" && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "mm-exec-last-detail", children: lastEntry.summary.slice(0, 160) })
    ] }),
    unavailable && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "mm-exec-error", role: "alert", children: "\u8FD0\u884C\u72B6\u6001\u6682\u65E0\u6CD5\u540C\u6B65\uFF0C\u5F53\u524D\u663E\u793A\u4E0A\u6B21\u8BB0\u5F55\uFF0C\u52A8\u6001\u8BA1\u65F6\u5DF2\u6682\u505C\u3002" }),
    !unavailable && (trace.metrics.stateConflict || trace.metrics.observationLost) && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "mm-exec-error", role: "status", children: "\u8FD0\u884C\u4FE1\u606F\u6B63\u5728\u6838\u5B9E\uFF0C\u52A8\u6001\u8BA1\u65F6\u548C\u65E0\u8FDB\u5C55\u5224\u65AD\u5DF2\u6682\u505C\u3002" }),
    !unavailable && runtimeStatus === "offline" && trace.metrics.active && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "mm-exec-error", role: "status", children: "\u8FD0\u884C\u65F6\u79BB\u7EBF\uFF0C\u6682\u4E0D\u5224\u65AD\u65E0\u8FDB\u5C55\u6216\u5DE5\u5177\u7B49\u5F85\u3002" }),
    trace.metrics.alerts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("p", { className: "mm-exec-attention", role: "status", children: [
      trace.metrics.alerts.map((value) => value === "\u8F83\u4E45\u672A\u6536\u5230\u65B0\u53CD\u9988" ? "\u8F83\u4E45\u672A\u89C2\u5BDF\u5230\u65B0\u8FDB\u5C55" : value).join(" \xB7 "),
      trace.metrics.silence != null ? ` \xB7 \u6301\u7EED ${traceDuration(trace.metrics.silence)}\u672A\u89C2\u5BDF\u5230\u65B0\u8FDB\u5C55` : ""
    ] }),
    !waterfallOnly && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "mm-exec-io", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("section", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h3", { children: "\u672C\u8F6E\u8F93\u5165" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("p", { className: "mm-exec-note", children: [
          issue.identifier,
          " \xB7 ",
          issue.title
        ] }),
        exchange.input ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_jsx_runtime6.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("p", { className: "mm-exec-source", children: [
            author(exchange.input),
            " \xB7 ",
            clock3(exchange.input.createdAt)
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(TextBlock, { value: exchange.input.deleted ? "\u89E6\u53D1\u6D88\u606F\u5DF2\u5220\u9664" : exchange.input.content, empty: "\u89E6\u53D1\u6D88\u606F\u6CA1\u6709\u6B63\u6587" }),
          exchange.input.contentTruncated && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "mm-exec-note", children: "\u89E6\u53D1\u6D88\u606F\u5DF2\u622A\u65AD" })
        ] }) : run.triggerCommentId && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "mm-exec-note", children: commentsLoading ? "\u6B63\u5728\u8BFB\u53D6\u89E6\u53D1\u6D88\u606F\u2026" : commentsError ? "\u89E6\u53D1\u6D88\u606F\u6682\u65F6\u8BFB\u53D6\u5931\u8D25" : "\u5173\u8054\u7684\u89E6\u53D1\u6D88\u606F\u672A\u5728\u5F53\u524D\u8BB0\u5F55\u4E2D\u8FD4\u56DE" }),
        run.triggerSummary ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("details", { open: !exchange.input, children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("summary", { children: "\u672C\u8F6E\u89E6\u53D1\u6458\u8981" }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ReadableText, { text: run.triggerSummary, limit: 180 })
        ] }) : !exchange.input && !run.triggerCommentId && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "mm-exec-note", children: "\u672C\u6B21\u8FD0\u884C\u672A\u63D0\u4F9B\u89E6\u53D1\u6458\u8981\u6216\u5173\u8054\u8BC4\u8BBA\u3002" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "mm-exec-note mm-exec-boundary", children: "\u4EE5\u4E0A\u6765\u81EA\u4EFB\u52A1\u89E6\u53D1\u8BB0\u5F55\uFF1B\u5B8C\u6574 CLI \u63D0\u793A\u8BCD\u672A\u63D0\u4F9B\u3002" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("section", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h3", { children: "\u672C\u8F6E\u8F93\u51FA" }),
        commentsLoading && !exchange.outputs.length ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "mm-exec-note", children: "\u6B63\u5728\u8BFB\u53D6\u6B63\u5F0F\u56DE\u590D\u2026" }) : exchange.outputs.length ? exchange.outputs.map((comment) => /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "mm-exec-published", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("p", { className: "mm-exec-source", children: [
            "\u6B63\u5F0F\u56DE\u590D \xB7 ",
            clock3(comment.createdAt)
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(TextBlock, { value: comment.deleted ? "\u8FD9\u6761\u6B63\u5F0F\u56DE\u590D\u5DF2\u5220\u9664" : comment.content, empty: comment.attachmentCount ? "\u6B64\u56DE\u590D\u5305\u542B\u9644\u4EF6\uFF0C\u8BF7\u5728 Multica \u67E5\u770B\u3002" : "\uFF08\u7A7A\u56DE\u590D\uFF09" }),
          comment.contentTruncated && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "mm-exec-note", children: "\u56DE\u590D\u5185\u5BB9\u5DF2\u622A\u65AD" })
        ] }, comment.id)) : /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "mm-exec-note", children: commentsError ? "\u6B63\u5F0F\u56DE\u590D\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u3002" : trace.metrics.active ? "\u5C1A\u672A\u8BFB\u5230\u672C\u8F6E\u53D1\u5E03\u7684\u6B63\u5F0F\u56DE\u590D\uFF0C\u53EF\u5C55\u5F00\u6267\u884C\u8BB0\u5F55\u67E5\u770B\u8FC7\u7A0B\u53CD\u9988\u3002" : run.error ? `\u8FD0\u884C\u672A\u6210\u529F\u7ED3\u675F\uFF1A${run.error}` : "\u5F53\u524D\u8BB0\u5F55\u4E2D\u6CA1\u6709\u4E0E\u672C\u6B21\u8FD0\u884C\u660E\u786E\u5173\u8054\u7684\u6B63\u5F0F\u56DE\u590D\uFF0C\u53EF\u5C55\u5F00\u6267\u884C\u8BB0\u5F55\u67E5\u770B\u6587\u5B57\u53CD\u9988\u3002" }),
        exchange.next.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "mm-exec-next", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h4", { children: "\u540E\u7EED\u5173\u8054\u8FD0\u884C" }),
          exchange.next.map((next) => /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("button", { onClick: () => onInspect(next.id), children: [
            next.agentName || "\u667A\u80FD\u4F53",
            " \xB7 ",
            conversationStatusLabels[next.status] || next.status,
            " \xB7 #",
            next.id.slice(-8)
          ] }, next.id))
        ] }),
        url && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("a", { className: "mm-exec-origin", href: url, target: "_blank", rel: "noreferrer", children: "\u5728 Multica \u67E5\u770B\u4EFB\u52A1" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "v2-evidence-section", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "v2-section-title", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h3", { children: waterfallOnly ? "\u6267\u884C\u8FC7\u7A0B\u4E0E\u8017\u65F6" : "\u6267\u884C\u8BC1\u636E" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: waterfallOnly ? "\u65E5\u5FD7\u65F6\u95F4\u7011\u5E03\u56FE\u4E0E\u9010\u6761\u8BC1\u636E" : "\u539F\u59CB\u8FC7\u7A0B\u8BB0\u5F55\uFF0C\u6309\u9700\u5C55\u5F00" })
      ] }),
      waterfallOnly && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(RunWaterfall, { run, issue, messages: transcript.waterfallMessages || messages, partial: transcript.loading || transcript.hasMore || (transcript.waterfallTrimmed ?? transcript.trimmed) || Boolean(transcript.error), loading: transcript.loading || transcript.hasMore, error: transcript.error, onRetry: transcript.onRetry }, run.id),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ExecutionEvidence, { trace, run, ...transcript, trimmed: historyTrimmed })
    ] }),
    commentsError && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "mm-exec-error", role: "alert", children: [
      "\u8F93\u5165\u8F93\u51FA\u540C\u6B65\u5931\u8D25\uFF0C\u5DF2\u4FDD\u7559\u8BFB\u53D6\u7684\u5185\u5BB9\u3002",
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { onClick: onRetryComments, children: "\u91CD\u65B0\u8BFB\u53D6" })
    ] }),
    commentsIncomplete && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "mm-exec-note", children: "\u4EFB\u52A1\u8BC4\u8BBA\u672A\u5B8C\u6574\u8FD4\u56DE\uFF0C\u8F93\u5165\u4E0E\u6B63\u5F0F\u8F93\u51FA\u53EF\u80FD\u7F3A\u5931\u3002" }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("details", { className: "mm-exec-notes", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("summary", { children: "\u6570\u636E\u8303\u56F4\u4E0E\u65F6\u95F4\u8BF4\u660E" }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { children: "\u6B63\u5F0F\u8F93\u51FA\u4EC5\u5173\u8054\u672C\u4EFB\u52A1\u3001\u672C\u667A\u80FD\u4F53\u4E14\u6765\u6E90\u8FD0\u884C ID \u5339\u914D\u7684\u8BC4\u8BBA\u3002\u8BB0\u5F55\u65F6\u95F4\u4E0D\u4EE3\u8868\u5DE5\u5177\u6216\u6A21\u578B\u8BF7\u6C42\u8017\u65F6\uFF1B\u672A\u6536\u5230\u7ED3\u679C\u4E0D\u4EE3\u8868\u5DE5\u5177\u4ECD\u5728\u6267\u884C\u3002" }),
      [...transcript.warnings || [], ...commentWarnings].map((warning, index) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { children: warning }, index))
    ] })
  ] });
}
function RunExecution({ api, run, revision, ...props }) {
  const transcript = useRunTranscript({ api, run, revision });
  const [now, setNow] = (0, import_react7.useState)(Date.now()), [comments, setComments] = (0, import_react7.useState)({ comments: [], warnings: [] }), [members, setMembers] = (0, import_react7.useState)([]), [loading, setLoading] = (0, import_react7.useState)(true), [error, setError] = (0, import_react7.useState)(""), [retry, setRetry] = (0, import_react7.useState)(0);
  (0, import_react7.useEffect)(() => {
    const timer = setInterval(() => setNow(Date.now()), 1e3);
    return () => clearInterval(timer);
  }, []);
  (0, import_react7.useEffect)(() => {
    let live = true, timer;
    const controller = new AbortController();
    const sync = async () => {
      try {
        if (document.visibilityState === "hidden") return;
        const result = await api("runComments", { issueId: run.issueId }, controller.signal);
        if (live) {
          setComments(result);
          setError("");
        }
      } catch (reason) {
        if (live) setError(reason.message || "\u8BFB\u53D6\u5931\u8D25");
      } finally {
        if (live) {
          setLoading(false);
          timer = setTimeout(sync, 5e3);
        }
      }
    };
    void sync();
    api("participants", {}, controller.signal).then((result) => {
      if (live) setMembers(result.members);
    }).catch(() => {
    });
    return () => {
      live = false;
      controller.abort();
      clearTimeout(timer);
    };
  }, [api, run.issueId, revision, retry]);
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(RunExecutionPanel, { ...props, ...transcript, run, now, comments: comments.comments, commentWarnings: comments.warnings, commentsIncomplete: comments.incomplete, commentsError: error, commentsLoading: loading, participants: members, onRetryComments: () => setRetry((value) => value + 1) });
}

// src/task-timeline.jsx
var import_react8 = __toESM(require("react"), 1);

// src/task-relationships.mjs
var TERMINAL = /* @__PURE__ */ new Set(["completed", "failed", "cancelled"]);
var WAITING = /* @__PURE__ */ new Set(["queued", "dispatched", "waiting_local_directory", "deferred"]);
var MAX_ISSUES = 1e3;
var MAX_RUNS = 1e3;
var MAX_RELATIONS = 5e3;
var id = (value) => typeof value === "string" && value.length > 0 && value.length <= 256 ? value : null;
var object = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
var time2 = (value) => typeof value === "number" && Number.isFinite(value) ? value : typeof value === "string" && Number.isFinite(Date.parse(value)) ? Date.parse(value) : null;
var knownCoverage = /* @__PURE__ */ new Set(["complete", "partial", "failed", "unknown", "unsupported"]);
var coverageValue = (value) => knownCoverage.has(value) ? value : "unknown";
var orderedTime = (run) => run.startMs ?? time2(run.startedAt) ?? time2(run.createdAt) ?? Infinity;
var chronological = (a, b) => orderedTime(a) - orderedTime(b) || a.id.localeCompare(b.id);
function uniqueRows(values, limit) {
  const rows = /* @__PURE__ */ new Map();
  let malformed = 0, duplicates = 0, omitted = 0;
  for (const row of Array.isArray(values) ? values : []) {
    if (!object(row) || !id(row.id)) {
      malformed++;
      continue;
    }
    if (rows.has(row.id)) {
      duplicates++;
      continue;
    }
    if (rows.size >= limit) {
      omitted++;
      continue;
    }
    rows.set(row.id, row);
  }
  return { rows: [...rows.values()], malformed, duplicates, omitted, invalidInput: !Array.isArray(values) };
}
function baseCoverage(input = {}, relationResult) {
  const source = object(input) ? input : {};
  const relationAvailability = relationResult?.availability;
  const dependencies = relationAvailability?.dependencies === "unsupported" ? "unsupported" : coverageValue(source.dependencies);
  let relations = coverageValue(source.relations);
  if (object(relationAvailability)) {
    const parentFailed = relationAvailability.parent === "unavailable";
    const childrenFailed = relationAvailability.children === "unavailable";
    if (parentFailed && childrenFailed) relations = "failed";
    else if (parentFailed || childrenFailed || relationAvailability.parent === "unknown" || relationResult.childrenTruncated === true) relations = "partial";
    else if (relations === "unknown" && ["available", "none"].includes(relationAvailability.parent) && relationAvailability.children === "available") relations = "complete";
  }
  return {
    issues: coverageValue(source.issues),
    runs: coverageValue(source.runs),
    dependencies,
    relations,
    relationAvailability: object(relationAvailability) ? { ...relationAvailability } : null,
    childrenTruncated: relationResult?.childrenTruncated === true,
    partial: false
  };
}
function interval2(run, now) {
  const startMs = time2(run.startedAt), endMs = time2(run.completedAt);
  let timeStatus, effectiveEnd = endMs, eligible = false;
  if (WAITING.has(run.status)) timeStatus = "not_started";
  else if (run.status === "running") {
    if (startMs == null) timeStatus = run.startedAt ? "invalid_time" : "missing_start";
    else if (now == null || startMs > now || run.completedAt != null) timeStatus = "invalid_time";
    else {
      timeStatus = "ongoing";
      effectiveEnd = now;
      eligible = true;
    }
  } else if (TERMINAL.has(run.status)) {
    if (startMs == null && endMs == null) timeStatus = run.startedAt || run.completedAt ? "invalid_time" : "unknown_time";
    else if (startMs == null) timeStatus = run.startedAt ? "invalid_time" : "missing_start";
    else if (endMs == null) timeStatus = run.completedAt ? "invalid_time" : "missing_end";
    else if (endMs < startMs) timeStatus = "invalid_time";
    else {
      timeStatus = "complete";
      eligible = true;
    }
  } else timeStatus = "unknown_status";
  return {
    ...run,
    sourceRun: { ...run },
    startMs: WAITING.has(run.status) ? null : startMs,
    endMs: WAITING.has(run.status) ? null : effectiveEnd,
    timeStatus,
    intervalKnown: eligible,
    ongoing: timeStatus === "ongoing",
    endEstimated: timeStatus === "ongoing",
    durationMs: eligible ? effectiveEnd - startMs : null,
    lane: null,
    offsetPercent: null,
    widthPercent: null
  };
}
function groupAgents(runs) {
  const groups = /* @__PURE__ */ new Map();
  for (const run of runs) {
    const agentId = id(run.agentId);
    const key = agentId || "__unknown_agent__";
    if (!groups.has(key)) groups.set(key, { id: key, agentId, agentName: run.agentName || "", identityKnown: Boolean(agentId), runs: [] });
    groups.get(key).runs.push(run);
  }
  for (const group of groups.values()) group.runs.sort(chronological);
  return [...groups.values()].sort((a, b) => a.agentName.localeCompare(b.agentName) || a.id.localeCompare(b.id));
}
function buildRunTimeline(inputRuns, now = Date.now(), options = {}) {
  const selected = uniqueRows(inputRuns, MAX_RUNS);
  const coverage = baseCoverage(options.coverage, options.relations);
  const warnings = [];
  const nowMs = time2(now);
  const runs = selected.rows.map((run) => interval2(run, nowMs)).sort(chronological);
  const byId = new Map(runs.map((run) => [run.id, run]));
  const intervals = runs.filter((run) => run.intervalKnown).sort(chronological);
  const laneEnds = [];
  for (const run of intervals) {
    if (run.durationMs === 0) {
      run.lane = 0;
      continue;
    }
    let lane = laneEnds.findIndex((end) => end <= run.startMs);
    if (lane < 0) lane = laneEnds.length;
    laneEnds[lane] = run.endMs;
    run.lane = lane;
  }
  const span = intervals.length ? { startMs: Math.min(...intervals.map((run) => run.startMs)), endMs: Math.max(...intervals.map((run) => run.endMs)) } : null;
  if (span) {
    span.durationMs = span.endMs - span.startMs;
    for (const run of intervals) {
      run.offsetPercent = span.durationMs ? (run.startMs - span.startMs) / span.durationMs * 100 : 0;
      run.widthPercent = span.durationMs ? run.durationMs / span.durationMs * 100 : 0;
    }
  }
  const relations = [], unresolvedRelations = [];
  let relationCount = 0;
  const addRelation = (relation) => {
    relationCount++;
    if (relations.length < MAX_RELATIONS) relations.push({ id: `${relation.type}:${relation.from}:${relation.to}`, ...relation, isDependency: false });
  };
  const pointers = [["rerunOfTaskId", "rerun"], ["retryOfTaskId", "retry"], ["parentTaskId", "parent_run"], ["delegatedFromTaskId", "delegation"]];
  for (const run of runs) for (const [field, type] of pointers) {
    if (run[field] == null || run[field] === "") continue;
    const sourceId = id(run[field]);
    const source = sourceId && byId.get(sourceId);
    let reason = null;
    if (!sourceId) reason = "invalid_pointer";
    else if (sourceId === run.id) reason = "self_reference";
    else if (!source) reason = options.allRunIssueIds?.has(sourceId) && options.allRunIssueIds.get(sourceId) !== run.issueId ? "cross_issue" : "missing_source";
    else if (type !== "delegation" && (!id(source.issueId) || !id(run.issueId))) reason = "unknown_issue_scope";
    else if (type !== "delegation" && source.issueId !== run.issueId) reason = "cross_issue";
    if (reason) {
      if (unresolvedRelations.length < MAX_RELATIONS) unresolvedRelations.push({ type, from: sourceId, to: run.id, field, reason });
    } else addRelation({
      type,
      from: sourceId,
      to: run.id,
      evidence: { source: "explicit_pointer", field },
      label: { rerun: "\u660E\u786E\u91CD\u8DD1\u6765\u6E90", retry: "\u660E\u786E\u91CD\u8BD5\u6765\u6E90", parent_run: "\u8FD0\u884C\u7236\u6307\u9488\uFF0C\u975E\u4E1A\u52A1\u7236\u5B50\u4EFB\u52A1", delegation: "\u660E\u786E\u59D4\u6D3E\u6765\u6E90" }[type]
    });
  }
  for (let index = 0; index < intervals.length; index++) {
    const from = intervals[index];
    for (let next2 = index + 1; next2 < intervals.length && intervals[next2].startMs < from.endMs; next2++) {
      const to = intervals[next2], startMs = Math.max(from.startMs, to.startMs), endMs = Math.min(from.endMs, to.endMs);
      if (endMs > startMs) addRelation({
        type: "observed_overlap",
        from: from.id,
        to: to.id,
        evidence: { source: "timestamps", startMs, endMs, durationMs: endMs - startMs, ongoing: from.ongoing || to.ongoing },
        label: "\u89C2\u6D4B\u5230\u6267\u884C\u65F6\u95F4\u91CD\u53E0"
      });
    }
    const next = intervals[index + 1];
    if (next && !from.ongoing && from.endMs <= next.startMs) addRelation({
      type: "observed_sequence",
      from: from.id,
      to: next.id,
      evidence: { source: "timestamps", completedAtMs: from.endMs, nextStartedAtMs: next.startMs, gapMs: next.startMs - from.endMs },
      label: "\u4EC5\u89C2\u6D4B\u5230\u5148\u540E\u53D1\u751F\uFF0C\u975E\u5F3A\u5236\u4E32\u884C"
    });
  }
  coverage.inputRuns = Array.isArray(inputRuns) ? inputRuns.length : 0;
  coverage.retainedRuns = runs.length;
  coverage.runsTruncated = selected.omitted > 0;
  coverage.invalidRuns = selected.malformed;
  coverage.duplicateRuns = selected.duplicates;
  coverage.relationsTruncated = relationCount > MAX_RELATIONS;
  coverage.relationCount = relationCount;
  coverage.relationLimit = MAX_RELATIONS;
  coverage.lineage = runs.length && runs.every((run) => run.lineageKnown === true) ? "available" : "unknown";
  coverage.unknownIntervals = runs.filter((run) => !run.intervalKnown && !WAITING.has(run.status)).length;
  coverage.partial = coverage.runs !== "complete" || coverage.dependencies !== "complete" || ["failed", "partial"].includes(coverage.relations) || selected.invalidInput || selected.malformed > 0 || selected.duplicates > 0 || coverage.runsTruncated || coverage.relationsTruncated || coverage.unknownIntervals > 0 || unresolvedRelations.length > 0;
  if (coverage.dependencies === "unsupported") warnings.push("\u5F53\u524D\u670D\u52A1\u672A\u63D0\u4F9B\u4E1A\u52A1\u4F9D\u8D56\u8BFB\u53D6\u63A5\u53E3\uFF1B\u65F6\u95F4\u5173\u7CFB\u4E0D\u80FD\u66FF\u4EE3\u4F9D\u8D56\u5173\u7CFB\u3002");
  else if (coverage.dependencies !== "complete") warnings.push("\u4E1A\u52A1\u4F9D\u8D56\u5173\u7CFB\u672A\u5B8C\u6574\u8BFB\u53D6\uFF0C\u4E0D\u80FD\u636E\u6B64\u8BA4\u5B9A\u6CA1\u6709\u4F9D\u8D56\u3002");
  if (coverage.runs !== "complete" || coverage.runsTruncated) warnings.push("\u65F6\u95F4\u7EBF\u53EA\u8986\u76D6\u5F53\u524D\u5DF2\u52A0\u8F7D\u7684\u8FD0\u884C\u3002");
  if (coverage.unknownIntervals) warnings.push("\u90E8\u5206\u8FD0\u884C\u7F3A\u5C11\u53EF\u9760\u8D77\u6B62\u65F6\u95F4\uFF0C\u672A\u53C2\u4E0E\u5E76\u884C\u6216\u5148\u540E\u5224\u65AD\u3002");
  if (unresolvedRelations.length) warnings.push("\u90E8\u5206\u660E\u786E\u8FD0\u884C\u6307\u9488\u7684\u6765\u6E90\u672A\u52A0\u8F7D\u6216\u4F5C\u7528\u57DF\u4E0D\u7B26\uFF0C\u672A\u81EA\u52A8\u8FDE\u8FB9\u3002");
  if (coverage.relationsTruncated) warnings.push(`\u5173\u7CFB\u5C55\u793A\u6700\u591A ${MAX_RELATIONS} \u6761\uFF0C\u5F53\u524D\u7ED3\u679C\u5DF2\u622A\u65AD\u3002`);
  if (["failed", "partial"].includes(coverage.relations)) warnings.push("\u4EFB\u52A1\u5173\u7CFB\u8BFB\u53D6\u5931\u8D25\u6216\u4E0D\u5B8C\u6574\uFF1B\u672A\u663E\u793A\u7684\u7236\u5B50\u5173\u7CFB\u4E0D\u80FD\u89C6\u4E3A\u4E0D\u5B58\u5728\u3002");
  if (selected.invalidInput || selected.malformed || selected.duplicates) warnings.push("\u8FD0\u884C\u8F93\u5165\u5B58\u5728\u65E0\u6548\u6216\u91CD\u590D\u8BB0\u5F55\uFF0C\u5DF2\u62AB\u9732\u8986\u76D6\u9650\u5236\u3002");
  return {
    runs,
    agentGroups: groupAgents(runs),
    relations,
    unresolvedRelations,
    coverage,
    warnings,
    span,
    laneCount: Math.max(laneEnds.length, intervals.length ? 1 : 0),
    maxObservedConcurrency: laneEnds.length,
    semantics: { overlap: "\u5B9E\u9645\u6267\u884C\u65F6\u95F4\u91CD\u53E0\uFF0C\u4E0D\u8868\u793A\u4EFB\u52A1\u4F9D\u8D56", sequence: "\u4EC5\u8868\u793A\u5148\u540E\u53D1\u751F\uFF0C\u4E0D\u8868\u793A\u5F3A\u5236\u4E32\u884C", width: "\u6761\u5F62\u5BBD\u5EA6\u4EE3\u8868\u6267\u884C\u65F6\u95F4\uFF0C\u4E0D\u4EE3\u8868\u5B8C\u6210\u767E\u5206\u6BD4" }
  };
}
function buildTaskGroups(inputIssues, inputRuns, options = {}) {
  const issues = uniqueRows(inputIssues, MAX_ISSUES), runs = uniqueRows(inputRuns, MAX_RUNS);
  const coverage = baseCoverage(options.coverage, options.relations);
  const byId = /* @__PURE__ */ new Map();
  for (const issue of issues.rows) {
    let parent;
    if (issue.parentIssueKnown !== true) parent = { id: id(issue.parentIssueId), status: "unknown" };
    else if (issue.parentIssueId === null) parent = { id: null, status: "root" };
    else if (id(issue.parentIssueId)) parent = { id: issue.parentIssueId, status: "linked" };
    else parent = { id: null, status: "unknown" };
    byId.set(issue.id, {
      id: issue.id,
      issue: { ...issue },
      parent,
      orphan: false,
      children: [],
      runs: [],
      agentGroups: [],
      timeline: null,
      stage: { known: issue.stageKnown === true && (issue.stage === null || Number.isSafeInteger(issue.stage) && issue.stage >= 0), value: Number.isSafeInteger(issue.stage) && issue.stage >= 0 ? issue.stage : null }
    });
  }
  const allRunIssueIds = new Map(runs.rows.map((run) => [run.id, id(run.issueId)]));
  for (const run of runs.rows) {
    const issueId = id(run.issueId), key = issueId || `__unknown_issue_for_run__:${run.id}`;
    if (!byId.has(key)) byId.set(key, {
      id: key,
      issue: null,
      issueId,
      parent: { id: null, status: "unknown" },
      orphan: true,
      children: [],
      runs: [],
      agentGroups: [],
      timeline: null,
      stage: { known: false, value: null }
    });
    byId.get(key).runs.push(run);
  }
  for (const group of byId.values()) if (group.parent.status === "linked" && !byId.get(group.parent.id)?.issue) group.parent.status = "missing";
  const done = /* @__PURE__ */ new Set();
  for (const start of byId.keys()) {
    const path = [], positions = /* @__PURE__ */ new Map();
    let current = start;
    while (!done.has(current) && byId.get(current)?.parent.status === "linked") {
      if (positions.has(current)) {
        for (const cyclic of path.slice(positions.get(current))) byId.get(cyclic).parent.status = "cycle";
        break;
      }
      positions.set(current, path.length);
      path.push(current);
      current = byId.get(current).parent.id;
    }
    for (const visited of path) done.add(visited);
  }
  const roots = [];
  for (const group of byId.values()) {
    if (group.parent.status === "linked") byId.get(group.parent.id).children.push(group.id);
    else roots.push(group.id);
    group.timeline = buildRunTimeline(group.runs, options.now ?? Date.now(), { coverage: options.coverage, relations: options.relations, allRunIssueIds });
    group.runs = group.timeline.runs;
    group.agentGroups = group.timeline.agentGroups;
  }
  const groups = [...byId.values()];
  coverage.issuesTruncated = issues.omitted > 0;
  coverage.runsTruncated = runs.omitted > 0;
  coverage.invalidIssues = issues.malformed;
  coverage.duplicateIssues = issues.duplicates;
  coverage.invalidRuns = runs.malformed;
  coverage.duplicateRuns = runs.duplicates;
  coverage.unknownParents = groups.filter((group) => group.parent.status === "unknown").length;
  coverage.missingParents = groups.filter((group) => group.parent.status === "missing").length;
  coverage.cyclicParents = groups.filter((group) => group.parent.status === "cycle").length;
  coverage.orphanGroups = groups.filter((group) => group.orphan).length;
  coverage.partial = coverage.issues !== "complete" || coverage.runs !== "complete" || coverage.dependencies !== "complete" || ["failed", "partial"].includes(coverage.relations) || issues.invalidInput || runs.invalidInput || issues.malformed > 0 || issues.duplicates > 0 || runs.malformed > 0 || runs.duplicates > 0 || coverage.issuesTruncated || coverage.runsTruncated || coverage.unknownParents > 0 || coverage.missingParents > 0 || coverage.cyclicParents > 0 || coverage.orphanGroups > 0;
  const warnings = [];
  if (coverage.issues !== "complete" || coverage.issuesTruncated) warnings.push("\u53EA\u5C55\u793A\u5F53\u524D\u5DF2\u52A0\u8F7D\u7684\u4E1A\u52A1\u4EFB\u52A1\uFF1B\u7F3A\u5C11\u7236\u4EFB\u52A1\u4E0D\u4EE3\u8868\u5B83\u4E0D\u5B58\u5728\u3002");
  if (coverage.unknownParents) warnings.push("\u90E8\u5206\u4EFB\u52A1\u672A\u8FD4\u56DE\u53EF\u786E\u8BA4\u7684\u7236\u5173\u7CFB\uFF0C\u5C55\u793A\u5165\u53E3\u4E0D\u7B49\u4E8E\u5DF2\u786E\u8BA4\u9876\u5C42\u4EFB\u52A1\u3002");
  if (coverage.missingParents) warnings.push("\u90E8\u5206\u660E\u786E\u7236\u4EFB\u52A1\u4E0D\u5728\u5F53\u524D\u5217\u8868\u4E2D\uFF0C\u7236\u5B50\u7ED3\u6784\u663E\u793A\u4E0D\u5B8C\u6574\u3002");
  if (coverage.cyclicParents) warnings.push("\u68C0\u6D4B\u5230\u7236\u5173\u7CFB\u5FAA\u73AF\uFF0C\u5DF2\u65AD\u5F00\u5C55\u793A\u5FAA\u73AF\u5E76\u4FDD\u7559\u5F02\u5E38\u6807\u8BB0\u3002");
  if (coverage.orphanGroups) warnings.push("\u90E8\u5206\u8FD0\u884C\u7684\u4E1A\u52A1\u4EFB\u52A1\u4FE1\u606F\u7F3A\u5931\uFF0C\u5DF2\u5355\u72EC\u5206\u7EC4\uFF0C\u4E0D\u5C06\u8FD0\u884C\u5192\u5145\u65B0\u4EFB\u52A1\u3002");
  if (coverage.dependencies !== "complete") warnings.push(coverage.dependencies === "unsupported" ? "\u5F53\u524D\u670D\u52A1\u4E0D\u652F\u6301\u8BFB\u53D6\u4E1A\u52A1\u4F9D\u8D56\uFF0C\u4E0D\u80FD\u63A8\u65AD\u4EFB\u52A1\u5FC5\u987B\u4E32\u884C\u6216\u53EF\u4EE5\u5E76\u884C\u3002" : "\u4E1A\u52A1\u4F9D\u8D56\u672A\u5B8C\u6574\u8BFB\u53D6\uFF0C\u4E0D\u80FD\u636E\u6B64\u8BA4\u5B9A\u6CA1\u6709\u4F9D\u8D56\u3002");
  return { groups, roots, coverage, warnings, semantics: { roots: "\u68EE\u6797\u5C55\u793A\u5165\u53E3\uFF1B\u53EA\u6709parent.status=root\u624D\u786E\u8BA4\u65E0\u7236\u4EFB\u52A1", stage: "\u7236\u4EFB\u52A1\u5185\u9636\u6BB5\u5206\u7EC4\uFF0C\u4E0D\u81EA\u52A8\u4EA7\u751F\u4F9D\u8D56\u8FB9" } };
}

// src/task-timeline.jsx
var import_jsx_runtime7 = require("react/jsx-runtime");
var shortId = (value) => String(value || "").slice(-8);
function IssueLink({ issue, id: id2, onSelectIssue, current = false }) {
  const body = /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_jsx_runtime7.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("span", { className: "mm-task-node-key", children: [
      issue?.identifier || (id2 ? `\u4EFB\u52A1 ${shortId(id2)}` : "\u4EFB\u52A1\u4FE1\u606F\u672A\u8BFB\u53D6"),
      current && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { children: "\u5F53\u524D\u4EFB\u52A1" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("strong", { children: issue?.title || "\u4EFB\u52A1\u8BE6\u60C5\u672A\u8BFB\u53D6" }),
    issue?.stageKnown && Number.isSafeInteger(issue.stage) && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("small", { children: [
      "\u9636\u6BB5 ",
      issue.stage
    ] })
  ] });
  if (current || !id2) return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "mm-task-node is-current", children: body });
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("button", { type: "button", className: "mm-task-node", onClick: () => onSelectIssue?.(id2), disabled: !onSelectIssue, "aria-label": `\u67E5\u770B${issue?.identifier || "\u4EFB\u52A1"}\uFF1A${issue?.title || id2}`, children: body });
}
function BusinessHierarchy({ detail, issues, onSelectIssue }) {
  const issue = detail.issue;
  const relations = detail.relations;
  const availability = relations?.availability;
  const parentItem = relations?.items?.find((item) => item.kind === "parent");
  const parentId = parentItem?.otherIssue?.id || (issue.parentIssueKnown ? issue.parentIssueId : null);
  const parent = parentItem?.otherIssue || issues.find((item) => item.id === parentId);
  const parentIsSelf = parentId === issue.id;
  const children = (relations?.items || []).filter((item) => item.kind === "child" && item.otherIssue?.id !== issue.id).map((item) => item.otherIssue);
  const childIsSelf = (relations?.items || []).some((item) => item.kind === "child" && item.otherIssue?.id === issue.id);
  const parentState = availability?.parent || (issue.parentIssueKnown && issue.parentIssueId === null ? "none" : "unknown");
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("section", { className: "mm-task-hierarchy", "aria-label": "\u4E1A\u52A1\u4EFB\u52A1\u5C42\u7EA7", children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("h3", { children: "\u4E1A\u52A1\u4EFB\u52A1\u5C42\u7EA7" }),
    parentIsSelf ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "mm-task-coverage", children: "\u7236\u5173\u7CFB\u5F02\u5E38\uFF1A\u670D\u52A1\u7AEF\u5C06\u5F53\u524D\u4EFB\u52A1\u6307\u5411\u81EA\u8EAB\u3002" }) : parentId ? /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "mm-task-parent", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "mm-task-relation-label", children: "\u7236\u4EFB\u52A1" }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(IssueLink, { issue: parent, id: parentId, onSelectIssue })
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "mm-task-coverage", children: parentState === "none" ? "\u6B64\u4EFB\u52A1\u6CA1\u6709\u7236\u4EFB\u52A1\u3002" : parentState === "unavailable" ? "\u7236\u4EFB\u52A1\u4FE1\u606F\u6682\u4E0D\u53EF\u7528\u3002" : "\u670D\u52A1\u7AEF\u672A\u63D0\u4F9B\u53EF\u786E\u8BA4\u7684\u7236\u4EFB\u52A1\u4FE1\u606F\u3002" }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: `mm-task-current-branch${parentId && !parentIsSelf ? " has-parent" : ""}`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(IssueLink, { issue, id: issue.id, current: true }),
      children.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("ol", { className: "mm-hierarchy-children", "aria-label": "\u76F4\u63A5\u5B50\u4EFB\u52A1", children: children.map((child) => /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("li", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "mm-task-relation-label", children: "\u5B50\u4EFB\u52A1" }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(IssueLink, { issue: child, id: child.id, onSelectIssue })
      ] }, child.id)) })
    ] }),
    children.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "mm-task-coverage", children: availability?.children === "available" && !relations?.childrenTruncated ? "\u6B64\u4EFB\u52A1\u6CA1\u6709\u4E1A\u52A1\u5B50\u4EFB\u52A1\uFF1B\u4E0B\u65B9\u5404\u6B21\u8FD0\u884C\u90FD\u5C5E\u4E8E\u5F53\u524D\u4EFB\u52A1\u3002" : availability?.children === "unavailable" ? "\u5B50\u4EFB\u52A1\u4FE1\u606F\u6682\u4E0D\u53EF\u7528\uFF0C\u4E0D\u80FD\u786E\u8BA4\u662F\u5426\u5B58\u5728\u62C6\u5206\u3002" : relations?.childrenTruncated ? "\u5B50\u4EFB\u52A1\u5C1A\u672A\u5B8C\u6574\u8BFB\u53D6\u3002" : "\u5B50\u4EFB\u52A1\u4FE1\u606F\u5C1A\u672A\u8BFB\u53D6\u3002" }),
    children.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "mm-task-coverage", children: relations?.childrenTruncated ? `\u5DF2\u8BFB\u53D6 ${children.length} \u4E2A\u76F4\u63A5\u5B50\u4EFB\u52A1\uFF0C\u5217\u8868\u5C1A\u4E0D\u5B8C\u6574\u3002` : `${children.length} \u4E2A\u76F4\u63A5\u5B50\u4EFB\u52A1\uFF1B\u70B9\u51FB\u53EF\u67E5\u770B\u5404\u81EA\u7684\u8FD0\u884C\u3002` }),
    childIsSelf && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "mm-task-coverage", children: "\u5B50\u4EFB\u52A1\u5173\u7CFB\u5305\u542B\u5F53\u524D\u4EFB\u52A1\u81EA\u8EAB\uFF0C\u672A\u91CD\u590D\u5C55\u5F00\u3002" })
  ] });
}

// src/task-monitor.jsx
var import_react9 = __toESM(require("react"), 1);

// src/task-monitor-model.mjs
var waitingStates = /* @__PURE__ */ new Set(["queued", "dispatched", "deferred", "waiting_local_directory"]);
var terminalStates = /* @__PURE__ */ new Set(["completed", "failed", "cancelled"]);
var text = (value, limit = 240) => typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, limit) : "";
var timestamp2 = (value) => typeof value === "string" && Number.isFinite(Date.parse(value)) ? Date.parse(value) : null;
var list = (value) => Array.isArray(value) ? value : [];
var duration = (start, end) => start != null && end != null && end >= start ? end - start : null;
var threshold2 = (settings, key, fallback) => Number.isFinite(settings?.[key]) && settings[key] > 0 ? settings[key] * 6e4 : fallback * 6e4;
var seq = (value) => Number.isSafeInteger(value) && value >= 0 ? value : null;
function lastRecord(observed, now) {
  if (!observed) return { text: "\u6267\u884C\u8BB0\u5F55\u5C1A\u672A\u8BFB\u53D6", at: null };
  const candidates = [];
  const add = (body, at, order, failed = false) => {
    if (!body) return;
    const atMs = timestamp2(at);
    candidates.push({ text: body, at: atMs != null && (!Number.isFinite(now) || atMs <= now) ? at : null, order: seq(order), atMs, failed });
  };
  for (const log of list(observed.logs)) {
    if (!log || typeof log !== "object") continue;
    const tool = text(log.tool, 60) || "\u5DE5\u5177";
    if (log.type === "tool_use") {
      const input = log.input && typeof log.input === "object" ? log.input : {};
      const summary = text(input.description || input.command || input.cmd || input.file_path || input.path || input.subject, 160);
      add(`\u5DE5\u5177\u8C03\u7528\u8BB0\u5F55 \xB7 ${tool}${summary ? ` \xB7 ${summary}` : ""}`, log.createdAt, log.seq);
    } else if (log.type === "tool_result") {
      const failed = log.isError === true || log.is_error === true;
      add(`${failed ? "\u5DE5\u5177\u62A5\u9519" : "\u5DE5\u5177\u8FD4\u56DE"} \xB7 ${tool}`, log.createdAt, log.seq, failed);
    } else if (["text", "thinking", "error"].includes(log.type)) {
      const label = { text: "\u6587\u5B57\u53CD\u9988", thinking: "\u601D\u8003\u8BB0\u5F55", error: "\u9519\u8BEF\u8BB0\u5F55" }[log.type];
      const body = text(log.content || log.output, 180);
      add(`${label}${body ? ` \xB7 ${body}` : ""}`, log.createdAt, log.seq);
    } else add("\u6267\u884C\u4E8B\u4EF6\u8BB0\u5F55", log.createdAt, log.seq);
  }
  const action = observed.workProgress?.latestAction;
  if (action) {
    const returned = ["returned", "failed"].includes(action.outcome);
    const label = action.outcome === "failed" ? "\u5DE5\u5177\u62A5\u9519" : returned ? "\u5DE5\u5177\u8FD4\u56DE" : "\u5DE5\u5177\u8C03\u7528\u8BB0\u5F55";
    const tool = text(action.tool, 60) || "\u5DE5\u5177", summary = text(action.summary, 160);
    add(`${label} \xB7 ${tool}${summary && summary !== tool ? ` \xB7 ${summary}` : ""}`, returned ? action.resultAt || action.at : action.at, returned ? action.resultSeq ?? action.seq : action.seq, action.outcome === "failed");
  }
  const statement = observed.workProgress?.latestStatement;
  if (statement && text(statement.text)) add(`\u6587\u5B57\u53CD\u9988 \xB7 ${text(statement.text, 180)}`, statement.at, statement.seq);
  candidates.sort((a, b) => a.order != null && b.order != null ? b.order - a.order || Number(b.failed) - Number(a.failed) : a.order != null ? -1 : b.order != null ? 1 : (b.atMs ?? -Infinity) - (a.atMs ?? -Infinity));
  return candidates[0] || { text: "\u5C1A\u65E0\u6267\u884C\u8BB0\u5F55", at: null };
}
function lifecycle(run, now, unavailable) {
  const createdAtMs = timestamp2(run.createdAt), startedAtMs = timestamp2(run.startedAt), completedAtMs = timestamp2(run.completedAt);
  const active6 = activeRunStates.has(run.status), running = run.status === "running", waiting = waitingStates.has(run.status), terminal = terminalStates.has(run.status);
  const invalidProvided = [["createdAt", createdAtMs], ["startedAt", startedAtMs], ["completedAt", completedAtMs]].some(([key, value]) => run[key] != null && run[key] !== "" && value == null);
  const inFuture = Number.isFinite(now) && [createdAtMs, startedAtMs, completedAtMs].some((value) => value != null && value > now);
  const reversed = createdAtMs != null && startedAtMs != null && createdAtMs > startedAtMs || startedAtMs != null && completedAtMs != null && startedAtMs > completedAtMs || createdAtMs != null && completedAtMs != null && createdAtMs > completedAtMs;
  const contradictory = waiting && (startedAtMs != null || completedAtMs != null) || running && completedAtMs != null;
  const invalid = invalidProvided || inFuture || reversed || contradictory || !active6 && !terminal;
  let waitSpan = null, executionSpan = null;
  if (!invalid) {
    if (createdAtMs != null && startedAtMs != null) waitSpan = { start: createdAtMs, end: startedAtMs, pending: false };
    else if (waiting && !unavailable && Number.isFinite(now) && createdAtMs != null) waitSpan = { start: createdAtMs, end: now, pending: true };
    if (terminal && startedAtMs != null && completedAtMs != null) executionSpan = { start: startedAtMs, end: completedAtMs, pending: false };
    else if (running && !unavailable && Number.isFinite(now) && startedAtMs != null) executionSpan = { start: startedAtMs, end: now, pending: true };
  }
  const missing = waiting ? createdAtMs == null : running ? startedAtMs == null : terminal && (startedAtMs == null || completedAtMs == null);
  return {
    active: active6,
    running,
    waiting,
    createdAtMs,
    startedAtMs,
    completedAtMs,
    waitSpan,
    executionSpan,
    invalid,
    missing,
    waitMs: waitSpan ? duration(waitSpan.start, waitSpan.end) : null,
    elapsedMs: executionSpan ? duration(executionSpan.start, executionSpan.end) : null
  };
}
function buildTaskMonitor({ runs = [], observedRuns = [], agents = [], runtimes = [], now = Date.now(), unavailable = false, settings = {}, issueId } = {}) {
  const agentNames = new Map(list(agents).filter((agent) => agent?.id).map((agent) => [agent.id, agent.name]));
  const runtimeById = new Map(list(runtimes).filter((runtime) => runtime?.id).map((runtime) => [runtime.id, runtime]));
  const observedById = new Map(list(observedRuns).filter((run) => run?.id).map((run) => [run.id, run]));
  const seen = /* @__PURE__ */ new Set();
  const rows = list(runs).filter((run) => {
    if (!run || !text(run.id) || seen.has(run.id) || issueId && run.issueId !== issueId) return false;
    seen.add(run.id);
    return true;
  }).map((run) => {
    const candidate = observedById.get(run.id);
    const identityMatches = Boolean(run.issueId && candidate?.issueId === run.issueId);
    const statusConflict = identityMatches && candidate.status !== run.status;
    const observationError = identityMatches && Boolean(candidate.observationError);
    const stateUnavailable = unavailable || statusConflict || observationError;
    const state = lifecycle(run, now, stateUnavailable);
    const observed = identityMatches && !statusConflict ? candidate : null;
    const runtimeOffline = !stateUnavailable && state.active && runtimeById.get(run.runtimeId)?.status === "offline";
    const coverage = observed?.workProgress?.coverage;
    const healthy = Boolean(!stateUnavailable && !runtimeOffline && observed && !observed.logError && observed.logsCaughtUp === true && coverage?.logsCaughtUp !== false && coverage?.partial !== true && coverage?.gaps !== true);
    const observationUnknown = Boolean(state.invalid || state.missing || state.active && (stateUnavailable || runtimeOffline) || state.running && !healthy);
    const silenceMs = healthy && state.running && !state.invalid && Number.isFinite(observed.silenceMs) && observed.silenceMs >= 0 ? observed.silenceMs : null;
    const reasons = [];
    if (state.active && unavailable) reasons.push("\u72B6\u6001\u540C\u6B65\u4E2D\u65AD");
    else if (state.active && statusConflict) reasons.push("\u8FD0\u884C\u72B6\u6001\u6682\u4E0D\u540C\u6B65");
    else if (state.active && observationError) reasons.push("\u8FD0\u884C\u72B6\u6001\u89C2\u6D4B\u5F02\u5E38");
    else if (state.invalid) reasons.push("\u8FD0\u884C\u72B6\u6001\u6216\u65F6\u95F4\u5F85\u6838\u5B9E");
    else if (state.missing) reasons.push("\u8FD0\u884C\u65F6\u95F4\u672A\u5B8C\u6574\u63D0\u4F9B");
    if (runtimeOffline) reasons.push("\u8FD0\u884C\u65F6\u79BB\u7EBF");
    else if (state.running && !stateUnavailable && !healthy) reasons.push(observed?.logError ? "\u6267\u884C\u8BB0\u5F55\u8BFB\u53D6\u5F02\u5E38" : observed && (observed.logsCaughtUp === false || coverage?.partial === true || coverage?.logsCaughtUp === false || coverage?.gaps === true) ? "\u6267\u884C\u8BB0\u5F55\u672A\u5B8C\u6574\u8865\u9F50" : "\u8FD0\u884C\u89C2\u6D4B\u5C1A\u672A\u6838\u5B9E");
    const warnings = [];
    if (!stateUnavailable && state.waiting && state.waitMs != null && state.waitMs >= threshold2(settings, "queueMinutes", 5)) warnings.push("\u542F\u52A8\u7B49\u5F85\u8F83\u957F");
    if (!stateUnavailable && state.running && state.elapsedMs != null && state.elapsedMs >= threshold2(settings, "runMinutes", 60)) warnings.push("\u8FD0\u884C\u65F6\u95F4\u8F83\u957F");
    if (silenceMs != null && silenceMs >= threshold2(settings, "noProgressMinutes", 10)) warnings.push("\u6301\u7EED\u672A\u89C2\u5BDF\u5230\u65B0\u8FDB\u5C55");
    if (run.status === "failed") reasons.unshift("\u8FD0\u884C\u5931\u8D25");
    reasons.push(...warnings);
    const tone = run.status === "failed" ? "error" : warnings.length ? "warning" : observationUnknown ? "unknown" : "normal";
    const severity = run.status === "failed" ? 4 : runtimeOffline || warnings.includes("\u6301\u7EED\u672A\u89C2\u5BDF\u5230\u65B0\u8FDB\u5C55") ? 3 : warnings.length ? 2 : observationUnknown ? 1 : 0;
    const record = lastRecord(observed, now);
    return {
      id: run.id,
      run,
      agentName: text(run.agentName) || text(agentNames.get(run.agentId)) || "\u667A\u80FD\u4F53\u672A\u63D0\u4F9B",
      statusLabel: stateUnavailable && state.active ? "\u72B6\u6001\u5F85\u6838\u5B9E" : conversationStatusLabels[run.status] || "\u72B6\u6001\u5F85\u6838\u5B9E",
      active: state.active,
      running: state.running,
      waiting: state.waiting,
      createdAtMs: state.createdAtMs,
      startedAtMs: state.startedAtMs,
      completedAtMs: state.completedAtMs,
      waitMs: state.waitMs,
      elapsedMs: state.elapsedMs,
      waitSpan: state.waitSpan,
      executionSpan: state.executionSpan,
      tone,
      reasons,
      lastAction: record.text,
      lastActionAt: record.at,
      silenceMs,
      observationUnknown,
      severity
    };
  });
  rows.sort((a, b) => (a.createdAtMs ?? a.startedAtMs ?? a.completedAtMs ?? Infinity) - (b.createdAtMs ?? b.startedAtMs ?? b.completedAtMs ?? Infinity) || a.id.localeCompare(b.id));
  const attention = rows.filter((row) => row.active && row.severity > 0).sort((a, b) => b.severity - a.severity || Math.max(b.waitMs ?? 0, b.elapsedMs ?? 0) - Math.max(a.waitMs ?? 0, a.elapsedMs ?? 0) || a.id.localeCompare(b.id));
  return {
    rows,
    attention,
    activeCount: rows.filter((row) => row.active).length,
    failureCount: rows.filter((row) => row.run.status === "failed").length,
    unknownCount: rows.filter((row) => row.observationUnknown).length
  };
}

// src/task-monitor.jsx
var import_jsx_runtime8 = require("react/jsx-runtime");
var DAY = 864e5;
var shortId2 = (value) => String(value || "").slice(-8);
var clock4 = (value) => value == null ? "\u2014" : new Date(value).toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", hour12: false });
var date = (value) => new Date(value).toLocaleDateString("zh-CN", { month: "2-digit", day: "2-digit" });
var duration2 = (value) => value == null ? "\u672A\u63D0\u4F9B" : traceDuration(value);
var waitLabel = (value) => value === 0 ? "\u65E0\u7B49\u5F85" : duration2(value);
function useTaskMonitor(props) {
  const [now, setNow] = (0, import_react9.useState)(Date.now());
  (0, import_react9.useEffect)(() => {
    const timer = setInterval(() => setNow(Date.now()), 1e3);
    return () => clearInterval(timer);
  }, []);
  return (0, import_react9.useMemo)(() => buildTaskMonitor({ ...props, now }), [props.runs, props.observedRuns, props.agents, props.runtimes, props.issueId, props.unavailable, props.settings, now]);
}
function TaskAttention({ monitor, onSelectRun, unavailable }) {
  const [expanded, setExpanded] = (0, import_react9.useState)(false);
  const rows = expanded ? monitor.attention : monitor.attention.slice(0, 3);
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("section", { className: "mm-task-attention", "aria-label": "\u5F53\u524D\u9700\u8981\u5173\u6CE8\u7684\u8FD0\u884C", children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "mm-task-attention-heading", children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("strong", { children: unavailable ? "\u540C\u6B65\u4E2D\u65AD \xB7 \u5F53\u524D\u72B6\u6001\u5F85\u6838\u5B9E" : monitor.attention.length ? `${monitor.attention.length} \u6B21\u8FD0\u884C\u9700\u8981\u5173\u6CE8` : monitor.activeCount ? `${monitor.activeCount} \u6B21\u6D3B\u52A8\u8FD0\u884C \xB7 \u6682\u672A\u89E6\u53D1\u5173\u6CE8\u9608\u503C` : monitor.unknownCount ? `${monitor.unknownCount} \u6B21\u8FD0\u884C\u4FE1\u606F\u5F85\u6838\u5B9E` : "\u5F53\u524D\u6CA1\u6709\u6D3B\u52A8\u8FD0\u884C" }),
      monitor.failureCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { children: [
        "\u53E6\u6709 ",
        monitor.failureCount,
        " \u6B21\u5386\u53F2\u5931\u8D25"
      ] })
    ] }),
    rows.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("ul", { children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("button", { type: "button", onClick: () => onSelectRun(row.id), children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { className: "mm-task-attention-name", children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("strong", { children: row.agentName }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("small", { children: [
          "#",
          shortId2(row.id)
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: `mm-task-attention-reason tone-${row.tone}`, children: row.reasons.join(" \xB7 ") }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { className: "mm-task-attention-time", children: [
        row.waiting ? `\u542F\u52A8\u7B49\u5F85 ${duration2(row.waitMs)}` : `\u5DF2\u8FD0\u884C ${duration2(row.elapsedMs)}`,
        row.silenceMs != null && ` \xB7 \u672A\u89C1\u65B0\u8FDB\u5C55 ${duration2(row.silenceMs)}`
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "mm-task-attention-action", children: row.lastAction }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "mm-task-attention-open", children: "\u67E5\u770B\u8FD0\u884C \u2192" })
    ] }) }, row.id)) }),
    monitor.attention.length > 3 && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("button", { className: "mm-text-button", "aria-expanded": expanded, onClick: () => setExpanded((value) => !value), children: expanded ? "\u6536\u8D77\u5173\u6CE8\u8FD0\u884C" : `\u5C55\u5F00\u5176\u4F59 ${monitor.attention.length - 3} \u6B21\u5173\u6CE8\u8FD0\u884C` })
  ] });
}
function Span({ span, domain, kind, tone, status }) {
  if (!span || !domain) return null;
  const left = Math.max(0, (span.start - domain.start) / domain.duration * 100);
  const width = Math.max(0, (span.end - span.start) / domain.duration * 100);
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: `mm-monitor-span is-${kind} tone-${tone} status-${status}${span.pending ? " is-pending" : ""}`, style: { left: `${Math.min(99.6, left)}%`, width: `${Math.min(100 - left, width)}%` } });
}
function TaskMonitorTimeline({ monitor, onSelectRun, selectedRunId, truncated = false, now = Date.now(), settings = {} }) {
  const [window2, setWindow] = (0, import_react9.useState)("all"), [scope, setScope] = (0, import_react9.useState)("all"), [zoom, setZoom] = (0, import_react9.useState)(1), [order, setOrder] = (0, import_react9.useState)("oldest");
  const recent = (row) => row.active || row.observationUnknown && !["completed", "failed", "cancelled"].includes(row.run.status) || Math.max(row.completedAtMs || 0, row.startedAtMs || 0, row.createdAtMs || 0) >= now - DAY;
  const withinWindow = monitor.rows.filter((row) => window2 === "all" || recent(row));
  const rows = withinWindow.filter((row) => scope === "all" || scope === "active" && row.active || scope === "attention" && monitor.attention.some((item) => item.id === row.id) || scope === "failed" && row.run.status === "failed");
  const times = rows.flatMap((row) => [row.waitSpan?.start, row.waitSpan?.end, row.executionSpan?.start, row.executionSpan?.end]).filter((value) => value != null);
  const start = times.length ? Math.min(...times) : null, end = times.length ? Math.max(...times) : null;
  const domain = start == null ? null : { start, end, duration: Math.max(1e3, end - start) };
  const multiDay = domain && date(start) !== date(end);
  const groups = [];
  for (const row of rows) {
    const key = row.run.agentId || `unknown:${row.id}`;
    let group = groups.find((item) => item.id === key);
    if (!group) {
      group = { id: key, name: row.agentName, rows: [] };
      groups.push(group);
    }
    group.rows.push(row);
  }
  const timeOf = (row) => row.startedAtMs ?? row.createdAtMs ?? null;
  for (const group of groups) group.rows.sort((a, b) => {
    const av = order === "longest" ? a.elapsedMs : timeOf(a), bv = order === "longest" ? b.elapsedMs : timeOf(b);
    if (av == null) return bv == null ? a.id.localeCompare(b.id) : 1;
    if (bv == null) return -1;
    return (order === "oldest" ? av - bv : bv - av) || a.id.localeCompare(b.id);
  });
  const maxDuration = Math.max(0, ...rows.map((row) => row.elapsedMs || 0));
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("section", { className: "mm-monitor-timeline", "aria-label": "\u4EFB\u52A1\u8FD0\u884C\u8017\u65F6\u65F6\u95F4\u7EBF", children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "mm-monitor-heading", children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("h3", { children: "\u8FD0\u884C\u65F6\u95F4\u7EBF" }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("p", { children: domain ? `${date(start)} ${clock4(start)} \u2014 ${multiDay ? `${date(end)} ` : ""}${clock4(end)}` : !rows.length && monitor.rows.length ? window2 === "recent" ? `\u6700\u8FD1 24 \u5C0F\u65F6\u6CA1\u6709\u8FD0\u884C\uFF0C\u53E6\u6709 ${monitor.rows.length} \u6B21\u5386\u53F2\u8FD0\u884C` : "\u5F53\u524D\u7B5B\u9009\u6CA1\u6709\u5339\u914D\u7684\u8FD0\u884C" : "\u6682\u65E0\u53EF\u9760\u7684\u8FD0\u884C\u8D77\u6B62\u8BB0\u5F55" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { children: [
        rows.length,
        " / ",
        monitor.rows.length,
        " \u6B21\u8FD0\u884C",
        maxDuration > 0 && ` \xB7 \u6700\u957F\u8FD0\u884C ${duration2(maxDuration)}`
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "mm-monitor-controls", children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("label", { children: [
        "\u8303\u56F4",
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("select", { "aria-label": "\u8FD0\u884C\u65F6\u95F4\u8303\u56F4", value: window2, onChange: (event) => {
          setWindow(event.target.value);
          setZoom(1);
        }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("option", { value: "recent", children: "\u6700\u8FD1 24 \u5C0F\u65F6" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("option", { value: "all", children: "\u5168\u90E8\u5386\u53F2" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("label", { children: [
        "\u663E\u793A",
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("select", { "aria-label": "\u7B5B\u9009\u76D1\u63A7\u8FD0\u884C", value: scope, onChange: (event) => setScope(event.target.value), children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("option", { value: "all", children: "\u5168\u90E8\u8FD0\u884C" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("option", { value: "attention", children: "\u9700\u8981\u5173\u6CE8" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("option", { value: "active", children: "\u6B63\u5728\u7B49\u5F85\u6216\u6267\u884C" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("option", { value: "failed", children: "\u5386\u53F2\u5931\u8D25" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("label", { children: [
        "\u7EC4\u5185\u6392\u5E8F",
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("select", { "aria-label": "\u8FD0\u884C\u6392\u5E8F", value: order, onChange: (event) => setOrder(event.target.value), children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("option", { value: "oldest", children: "\u65F6\u95F4\u4ECE\u65E9\u5230\u665A" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("option", { value: "newest", children: "\u6700\u8FD1\u8FD0\u884C\u4F18\u5148" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("option", { value: "longest", children: "\u6267\u884C\u8017\u65F6\u6700\u957F" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("button", { disabled: zoom >= 4 || !domain, onClick: () => setZoom((value) => value * 2), children: "\u653E\u5927\u65F6\u95F4\u8F74" }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("button", { disabled: zoom === 1, onClick: () => setZoom(1), children: "\u5168\u89C8" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "mm-monitor-legend", children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("i", { className: "is-wait" }),
        "\u542F\u52A8\u524D\u7B49\u5F85"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("i", {}),
        "\u6267\u884C\u533A\u95F4"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("i", { className: "is-warning" }),
        "\u9700\u8981\u5173\u6CE8"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("i", { className: "is-error" }),
        "\u5931\u8D25"
      ] })
    ] }),
    rows.length ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "mm-monitor-scroll", tabIndex: 0, role: "region", "aria-label": "\u4EFB\u52A1\u8FD0\u884C\u65F6\u95F4\u8F74\uFF0C\u53EF\u6A2A\u5411\u6EDA\u52A8", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "mm-monitor-canvas", style: { "--mm-monitor-zoom": zoom }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "mm-monitor-axis", children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { children: "\u667A\u80FD\u4F53 / \u672C\u6B21\u8FD0\u884C" }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { children: [0, 0.25, 0.5, 0.75, 1].map((fraction) => {
          const at = domain ? start + domain.duration * fraction : null;
          return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("time", { style: { left: `${fraction * 100}%` }, children: at === null ? "\u2014" : multiDay ? `${date(at)} ${clock4(at)}` : clock4(at) }, fraction);
        }) }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { children: "\u7B49\u5F85 / \u6267\u884C" })
      ] }),
      groups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("section", { className: "mm-monitor-agent", "aria-label": group.name, children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "mm-monitor-agent-name", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("strong", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(AgentAvatar, { name: group.name, size: 20 }),
            group.name
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { children: [
            group.rows.length,
            " \u6B21\u8FD0\u884C"
          ] })
        ] }),
        group.rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("button", { type: "button", className: `mm-monitor-run tone-${row.tone}`, "aria-pressed": row.id === selectedRunId, "aria-label": `\u67E5\u770B${row.agentName} #${shortId2(row.id)}\uFF0C${row.statusLabel}\uFF0C\u7B49\u5F85 ${duration2(row.waitMs)}\uFF0C\u6267\u884C ${duration2(row.elapsedMs)}${row.reasons.length ? `\uFF0C${row.reasons.join("\uFF0C")}` : ""}`, onClick: () => onSelectRun(row.id), children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { className: "mm-monitor-run-name", children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("strong", { children: row.statusLabel }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("small", { children: [
              "#",
              shortId2(row.id)
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { children: row.reasons.join(" \xB7 ") || (row.run.triggerSummary || "").replace(/\s+/g, " ").slice(0, 70) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { className: "mm-monitor-track", "aria-hidden": "true", children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Span, { span: row.waitSpan, domain, kind: "wait", tone: row.waiting ? row.tone : "normal", status: row.run.status }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Span, { span: row.executionSpan, domain, kind: "execution", tone: row.tone, status: row.run.status }),
            !row.waitSpan && !row.executionSpan && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "mm-monitor-unknown", children: "\u8D77\u6B62\u65F6\u95F4\u5F85\u6838\u5B9E" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { className: "mm-monitor-duration", children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { children: [
              row.waitMs === 0 ? "" : "\u7B49 ",
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("strong", { children: waitLabel(row.waitMs) })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { children: row.waiting ? "\u5C1A\u672A\u5F00\u59CB" : /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_jsx_runtime8.Fragment, { children: [
              row.running ? "\u5DF2\u8FD0\u884C" : "\u6267\u884C",
              " ",
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("strong", { children: duration2(row.elapsedMs) })
            ] }) })
          ] }),
          row.active && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { className: "mm-monitor-last", children: [
            "\u6700\u8FD1\u8BB0\u5F55\uFF1A",
            row.lastAction,
            row.silenceMs != null ? ` \xB7 ${duration2(row.silenceMs)}\u672A\u89C1\u65B0\u8FDB\u5C55` : row.observationUnknown ? " \xB7 \u53CD\u9988\u72B6\u6001\u5F85\u6838\u5B9E" : ""
          ] })
        ] }, row.id))
      ] }, group.id))
    ] }) }) : /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "mm-monitor-empty", children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("p", { children: monitor.rows.length ? "\u5F53\u524D\u8303\u56F4\u6CA1\u6709\u7B26\u5408\u6761\u4EF6\u7684\u8FD0\u884C\u3002" : "\u8FD9\u4E2A\u4EFB\u52A1\u5C1A\u672A\u8BFB\u53D6\u5230\u8FD0\u884C\u8BB0\u5F55\u3002" }),
      monitor.rows.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("button", { onClick: () => {
        setWindow("all");
        setScope("all");
      }, children: "\u67E5\u770B\u5168\u90E8\u8FD0\u884C" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("p", { className: "mm-monitor-footnote", children: "\u540C\u4E00\u65F6\u95F4\u8F74\u5BF9\u9F50\u5404\u6B21\u8FD0\u884C\uFF0C\u6761\u957F\u8868\u793A\u7B49\u5F85\u6216\u6267\u884C\u65F6\u95F4\u3002\u70B9\u9009\u8FD0\u884C\u67E5\u770B\u8F93\u5165\u8F93\u51FA\u4E0E\u6700\u540E\u786E\u8BA4\u7684\u6267\u884C\u8BB0\u5F55\u3002" }),
    truncated && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("p", { className: "mm-monitor-footnote", children: "\u5386\u53F2\u8BB0\u5F55\u672A\u5B8C\u6574\u8BFB\u53D6\uFF0C\u5F53\u524D\u4EC5\u5C55\u793A\u5DF2\u52A0\u8F7D\u7684\u8FD0\u884C\u3002" }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("details", { className: "mm-monitor-method", children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("summary", { children: "\u65F6\u95F4\u4E0E\u5173\u6CE8\u89C4\u5219" }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("p", { children: "\u7B49\u5F85\u4ECE\u8FD0\u884C\u521B\u5EFA\u8BA1\u81F3\u5F00\u59CB\uFF0C\u6267\u884C\u4ECE\u5F00\u59CB\u8BA1\u81F3\u7ED3\u675F\u3002\u6D3B\u52A8\u8FD0\u884C\u8BA1\u81F3\u5F53\u524D\uFF1B\u72B6\u6001\u65E0\u6CD5\u540C\u6B65\u65F6\u4E0D\u7EE7\u7EED\u63A8\u7B97\u3002\u4F4D\u7F6E\u91CD\u53E0\u53EA\u8BF4\u660E\u65F6\u95F4\u91CD\u53E0\uFF0C\u4E0D\u8BC1\u660E\u4F9D\u8D56\u5173\u7CFB\u3002" }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("p", { children: [
        "\u5F53\u524D\u5173\u6CE8\u9608\u503C\uFF1A\u542F\u52A8\u7B49\u5F85 ",
        settings.queueMinutes || 5,
        " \u5206\u949F\u3001\u8FD0\u884C ",
        settings.runMinutes || 60,
        " \u5206\u949F\u3001\u6301\u7EED\u672A\u89C2\u5BDF\u5230\u65B0\u8FDB\u5C55 ",
        settings.noProgressMinutes || 10,
        " \u5206\u949F\u3002\u957F\u65F6\u95F4\u4E0D\u76F4\u63A5\u5224\u4E3A\u6545\u969C\uFF1B\u5DE5\u5177\u8BB0\u5F55\u7684\u4E0A\u62A5\u65F6\u95F4\u5DEE\u4E0D\u53C2\u4E0E\u8017\u65F6\u6BD4\u8F83\u3002"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("p", { children: "\u201C\u6700\u8FD1 24 \u5C0F\u65F6\u201D\u59CB\u7EC8\u5305\u542B\u4ECD\u6D3B\u52A8\u7684\u8FD0\u884C\u3002\u5C1A\u672A\u521B\u5EFA\u8FD0\u884C\u7684\u4E1A\u52A1\u4EFB\u52A1\u4E0D\u8BA1\u4F5C\u6392\u961F\u3002" })
    ] })
  ] });
}

// src/task-monitor.css
var task_monitor_default = ".mm-task-attention{container-type:inline-size;margin:14px 0 20px;border-block:1px solid var(--mm-line);padding:12px 0}\n.mm-task-attention-heading{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;font-size:13px}.mm-task-attention-heading>span{color:var(--mm-secondary);font-size:12px}\n.mm-task-attention ul{list-style:none;margin:10px 0 0;padding:0}.mm-task-attention li+li{border-top:1px solid var(--mm-line)}\n.mm .mm-task-attention li>button{width:100%;display:grid;grid-template-columns:minmax(140px,.8fr) minmax(140px,1fr) auto;gap:4px 18px;text-align:left;justify-content:stretch;border:0;border-radius:0;background:transparent;padding:12px 0;white-space:normal}\n.mm-task-attention-name{grid-column:1;grid-row:1/3;display:flex;flex-direction:column;gap:3px}.mm-task-attention-name small{color:var(--mm-secondary);font-size:11px}.mm-task-attention-reason{font-weight:600}.mm-task-attention-reason.tone-warning{color:var(--mm-wait-text)}.mm-task-attention-reason.tone-unknown{color:var(--mm-secondary)}.mm-task-attention-time{grid-column:2;font-variant-numeric:tabular-nums;font-size:12px}.mm-task-attention-action{grid-column:1/-1;font-size:12px;color:var(--mm-secondary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mm-task-attention-open{grid-column:3;grid-row:1/3;color:var(--mm-link);font-size:12px}\n.mm-monitor-timeline{container-type:inline-size;min-width:0;margin-top:18px}.mm-monitor-heading{display:flex;justify-content:space-between;align-items:baseline;gap:16px;flex-wrap:wrap;margin-bottom:16px}.mm-monitor-heading p{font-size:12px;color:var(--mm-secondary);margin-top:5px}.mm-monitor-heading>span{font-size:12px;color:var(--mm-secondary)}\n.mm-monitor-controls{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:12px}.mm-monitor-controls label{display:flex;align-items:center;gap:7px;font-size:12px;color:var(--mm-secondary)}.mm .mm-monitor-controls select{width:auto;max-width:190px;font-size:12px;padding:5px 8px;min-height:32px}.mm .mm-monitor-controls button{font-size:12px;min-height:32px;padding:5px 9px}\n.mm-monitor-legend{display:flex;gap:10px 20px;flex-wrap:wrap;font-size:11px;color:var(--mm-secondary);margin:12px 0}.mm-monitor-legend span{display:flex;align-items:center;gap:7px}.mm-monitor-legend i{height:8px;width:20px;border-radius:2px;background:var(--mm-active-border)}.mm-monitor-legend i.is-wait{background:transparent;border:1px dashed var(--mm-secondary)}.mm-monitor-legend i.is-warning{background:var(--mm-wait-text)}.mm-monitor-legend i.is-error{background:var(--mm-danger-text)}\n.mm-monitor-scroll{overflow:auto;max-height:650px;border:1px solid var(--mm-line);border-radius:6px;scrollbar-width:thin;scrollbar-color:var(--mm-scroll) transparent}.mm-monitor-canvas{width:100%;min-width:calc(100% * var(--mm-monitor-zoom,1));background:var(--mm-surface)}\n.mm-monitor-axis,.mm .mm-monitor-run{display:grid;grid-template-columns:170px minmax(100px,1fr) 150px;gap:10px 20px;align-items:center;padding:12px 16px}\n.mm-monitor-axis{position:sticky;top:0;z-index:2;background:var(--mm-canvas);font-size:11px;color:var(--mm-secondary);border-bottom:1px solid var(--mm-line);min-height:45px}.mm-monitor-axis>div{position:relative;height:18px}.mm-monitor-axis time{position:absolute;transform:translateX(-50%);white-space:nowrap;font-variant-numeric:tabular-nums}.mm-monitor-axis time:first-child{transform:none}.mm-monitor-axis time:last-child{transform:translateX(-100%)}.mm-monitor-axis>span:last-child{text-align:right}\n.mm-monitor-agent-name{display:flex;align-items:center;gap:12px;padding:10px 16px;background:var(--mm-canvas);font-size:12px;border-bottom:1px solid var(--mm-line)}.mm-monitor-agent-name span{font-weight:400;color:var(--mm-secondary);font-size:11px}\n.mm .mm-monitor-run{width:100%;border:0;border-bottom:1px solid var(--mm-line);border-radius:0;white-space:normal;text-align:left;background:transparent;color:var(--mm-text);min-height:66px}.mm .mm-monitor-run:hover{background:var(--mm-hover)}.mm .mm-monitor-run[aria-pressed=true]{background:var(--mm-active-bg);box-shadow:inset 0 0 0 1px var(--mm-active-border)}.mm .mm-monitor-run[aria-pressed=true]:hover{background:var(--mm-active-bg)}\n.mm-monitor-run-name{min-width:0;display:flex;align-items:baseline;flex-wrap:wrap;gap:3px 10px}.mm-monitor-run-name>strong{font-size:12px;font-weight:500}.mm-monitor-run-name small{font-size:11px;color:var(--mm-secondary)}.mm-monitor-run-name>span{flex-basis:100%;font-size:11px;color:var(--mm-secondary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mm-monitor-run.tone-warning .mm-monitor-run-name>span{color:var(--mm-wait-text)}.mm-monitor-run.tone-error .mm-monitor-run-name>strong{color:var(--mm-danger-text)}\n.mm-monitor-track{height:26px;position:relative;background:linear-gradient(to right,var(--mm-line) 1px,transparent 1px);background-size:25% 100%}.mm-monitor-span{position:absolute;top:4px;height:18px;min-width:3px;border-radius:2px;background:var(--mm-active-border)}.mm-monitor-span.is-wait{top:7px;height:12px;background:var(--mm-hover);border:1px dashed var(--mm-secondary)}.mm-monitor-span.tone-warning{background:var(--mm-wait-text)}.mm-monitor-span.is-wait.tone-warning{background:var(--mm-wait-bg);border-color:var(--mm-wait-text)}.mm-monitor-span.tone-error{background:var(--mm-danger-text)}.mm-monitor-span.is-pending{border-right:2px dashed var(--mm-text);border-radius:2px 0 0 2px}.mm-monitor-span.tone-unknown{background:var(--mm-secondary);opacity:.5}.mm-monitor-unknown{display:block;color:var(--mm-secondary);font-size:11px;padding-top:4px;text-align:center}\n.mm-monitor-duration{display:flex;flex-direction:column;gap:3px;text-align:right;font-size:11px;color:var(--mm-secondary);font-variant-numeric:tabular-nums}.mm-monitor-duration strong{font-weight:500;color:var(--mm-text);font-size:12px}.mm-monitor-run.tone-warning .mm-monitor-duration strong{color:var(--mm-wait-text)}.mm-monitor-last{grid-column:1/-1;font-size:11px;color:var(--mm-secondary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}\n.mm-monitor-footnote{font-size:12px;color:var(--mm-secondary);line-height:1.65;margin:12px 0!important}.mm-monitor-method{font-size:12px;color:var(--mm-secondary);margin-top:12px}.mm-monitor-method summary{cursor:pointer;min-height:32px}.mm-monitor-method p{margin:8px 0!important}.mm-monitor-empty{padding:32px 16px;text-align:center;background:var(--mm-canvas);font-size:13px}.mm-monitor-empty button{margin-top:14px}\n@container(max-width:680px){.mm-monitor-axis,.mm .mm-monitor-run{grid-template-columns:minmax(0,1fr) 140px;gap:8px 16px;padding:12px}.mm-monitor-axis>div{grid-column:1/-1;grid-row:2;margin-top:6px}.mm-monitor-axis>span:last-child{grid-column:2;grid-row:1}.mm-monitor-track{grid-column:1/-1;grid-row:2}.mm-monitor-duration{grid-column:2;grid-row:1}.mm-monitor-last{grid-row:3}.mm-monitor-axis time:nth-child(2),.mm-monitor-axis time:nth-child(4){display:none}.mm-monitor-agent-name{padding:10px 12px}.mm .mm-task-attention li>button{grid-template-columns:minmax(0,1fr) auto;gap:6px 10px}.mm-task-attention-name{grid-row:1;grid-column:1;flex-direction:row;flex-wrap:wrap;align-items:center;gap:8px}.mm-task-attention-reason{grid-row:2;grid-column:1/-1}.mm-task-attention-time{grid-row:3;grid-column:1/-1}.mm-task-attention-open{grid-row:1;grid-column:2}.mm-task-attention-action{grid-row:4}.mm-monitor-heading{gap:8px}}\n";

// src/call-graph.jsx
var import_react10 = __toESM(require("react"), 1);
var import_jsx_runtime9 = require("react/jsx-runtime");
var MAX_NODES = 80;
var MAX_INPUT = 1e3;
var ACTIVE = /* @__PURE__ */ new Set(["running", "queued", "dispatched", "waiting_local_directory", "deferred"]);
var TYPES = { delegation: "\u59D4\u6D3E", rerun: "\u91CD\u8DD1", retry: "\u91CD\u8BD5", parent_run: "\u7236\u8FD0\u884C" };
var STATUS = { running: "\u8FD0\u884C\u4E2D", queued: "\u6392\u961F\u4E2D", dispatched: "\u5DF2\u6D3E\u53D1", waiting_local_directory: "\u7B49\u672C\u5730\u76EE\u5F55", deferred: "\u6682\u7F13", completed: "\u5DF2\u5B8C\u6210", failed: "\u5931\u8D25", cancelled: "\u5DF2\u53D6\u6D88", unknown: "\u5F85\u6838\u5B9E" };
var NODE_WIDTH = 244;
var NODE_HEIGHT = 104;
var shortId3 = (value) => String(value || "").slice(-8);
var parsedTime = (value) => typeof value === "string" && Number.isFinite(Date.parse(value)) ? Date.parse(value) : null;
var orderTime = (run) => parsedTime(run.startedAt) ?? parsedTime(run.createdAt) ?? 0;
var chronological2 = (a, b) => orderTime(a) - orderTime(b) || a.id.localeCompare(b.id);
var agentLabel = (run) => run.agentName || (run.agentId ? `\u667A\u80FD\u4F53 ${shortId3(run.agentId)}` : "\u8EAB\u4EFD\u672A\u63D0\u4F9B");
var runLabel = (run) => `${agentLabel(run)} #${shortId3(run.id)}`;
var clock5 = (ms) => Number.isFinite(ms) ? new Date(ms).toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", hour12: false }) : "\u65F6\u95F4\u672A\u77E5";
var safeStatus = (status) => ["running", "completed", "failed", "cancelled"].includes(status) ? status : ACTIVE.has(status) ? "waiting" : "unknown";
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
function routeCalls(nodes, lanes, relations, selectedRunId) {
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const adj = new Map(nodes.map((n) => [n.id, /* @__PURE__ */ new Set()]));
  for (const e of relations) {
    adj.get(e.from)?.add(e.to);
    adj.get(e.to)?.add(e.from);
  }
  const seen = /* @__PURE__ */ new Set(), groups = [], isolated = [];
  for (const node of [...nodes].sort((a, b) => chronological2(a.run, b.run))) {
    if (seen.has(node.id)) continue;
    const group = [], queue = [node.id];
    while (queue.length) {
      const id2 = queue.shift();
      if (seen.has(id2)) continue;
      seen.add(id2);
      group.push(byId.get(id2));
      for (const other of adj.get(id2) || []) queue.push(other);
    }
    if (group.length === 1) isolated.push(group[0]);
    else groups.push(group);
  }
  groups.sort((a, b) => b.length - a.length || chronological2(a[0].run, b[0].run));
  let baseX = 32, maxY = 0;
  const sections = [];
  for (const [i, group] of groups.entries()) {
    const minRank = Math.min(...group.map((n) => n.rank));
    const levels = /* @__PURE__ */ new Map();
    for (const n of group) {
      const rank = n.rank - minRank;
      if (!levels.has(rank)) levels.set(rank, []);
      levels.get(rank).push(n);
    }
    const width = Math.max(...[...levels.values()].map((l) => l.length)) * (NODE_WIDTH + 28) + 16;
    for (const [rank, level] of levels) {
      level.sort((a, b) => chronological2(a.run, b.run)).forEach((n, j) => {
        n.x = baseX + j * (NODE_WIDTH + 28);
        n.y = 60 + rank * 164;
        maxY = Math.max(maxY, n.y + NODE_HEIGHT);
      });
    }
    sections.push({ x: baseX - 12, width, title: "\u8C03\u7528\u94FE " + (i + 1), count: group.length });
    baseX += width + 24;
  }
  if (isolated.length) {
    isolated.sort((a, b) => chronological2(a.run, b.run)).forEach((n, j) => {
      n.x = baseX;
      n.y = 60 + j * 164;
      maxY = Math.max(maxY, n.y + NODE_HEIGHT);
    });
    sections.push({ x: baseX - 12, width: NODE_WIDTH + 28, title: "\u6765\u6E90\u672A\u5173\u8054", count: isolated.length });
    baseX += NODE_WIDTH + 44;
  }
  const selectedGroup = groups.find((g) => g.some((n) => n.id === selectedRunId));
  const related = new Set(selectedGroup?.map((n) => n.id) || []);
  const edges = relations.map((edge, i) => {
    const fromNode = byId.get(edge.from), toNode = byId.get(edge.to), sx = fromNode.x + NODE_WIDTH / 2, sy = fromNode.y + NODE_HEIGHT, tx = toNode.x + NODE_WIDTH / 2, ty = toNode.y;
    let points;
    if (toNode.rank === fromNode.rank + 1) points = [{ x: sx, y: sy }, { x: sx, y: sy + 24 }, { x: tx, y: ty - 24 }, { x: tx, y: ty }];
    else {
      const side = Math.max(fromNode.x, toNode.x) + NODE_WIDTH + 12 + i % 2 * 8;
      points = [{ x: sx, y: sy }, { x: sx, y: sy + 20 }, { x: side, y: sy + 20 }, { x: side, y: ty - 20 }, { x: tx, y: ty - 20 }, { x: tx, y: ty }];
    }
    return { ...edge, fromNode, toNode, path: roundedPath(points), labelX: (sx + tx) / 2 + 22, labelY: (sy + ty) / 2, emphasis: selectedRunId ? related.has(edge.from) && related.has(edge.to) ? "is-connected" : "is-dimmed" : "" };
  });
  return { edges, width: Math.max(360, baseX), height: Math.max(260, maxY + 32), sections };
}
function elapsed(run) {
  if (run.timeStatus === "not_started") return "\u5C1A\u672A\u5F00\u59CB";
  if (!run.intervalKnown) return "\u8017\u65F6\u672A\u77E5";
  const seconds = Math.max(0, Math.floor(run.durationMs / 1e3));
  if (seconds < 60) return `${seconds} \u79D2`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)} \u5206 ${seconds % 60} \u79D2`;
  return `${Math.floor(seconds / 3600)} \u5C0F\u65F6 ${Math.floor(seconds % 3600 / 60)} \u5206`;
}
function buildCallGraphLayout(detail, now = Date.now(), selectedRunId, nodeLimit = MAX_NODES, priorityIds = []) {
  const input = Array.isArray(detail?.runs) ? detail.runs : [];
  const unique = /* @__PURE__ */ new Map();
  for (const run of input.slice(0, MAX_INPUT)) {
    if (run && typeof run.id === "string" && run.id.length > 0 && run.id.length <= 256 && !unique.has(run.id)) unique.set(run.id, run);
  }
  const all = [...unique.values()];
  const limit = Math.min(MAX_NODES, Math.max(1, nodeLimit));
  const neighbours = new Map(all.map((run) => [run.id, /* @__PURE__ */ new Set()]));
  for (const run of all) for (const field of ["delegatedFromTaskId", "retryOfTaskId", "rerunOfTaskId", "parentTaskId"]) {
    const source = run[field];
    if (source && neighbours.has(source) && source !== run.id) {
      neighbours.get(run.id).add(source);
      neighbours.get(source).add(run.id);
    }
  }
  const selected = all.find((run) => run.id === selectedRunId);
  const priority = priorityIds.map((id2) => unique.get(id2)).filter(Boolean);
  const seeds = [selected, ...priority, ...all.filter((run) => ACTIVE.has(run.status)).sort(chronological2)].filter(Boolean);
  const retained = [], retainedIds = /* @__PURE__ */ new Set(), queue = [];
  for (const seed of seeds) if (!retainedIds.has(seed.id) && retained.length < limit) {
    retained.push(seed);
    retainedIds.add(seed.id);
    queue.push(seed.id);
  }
  while (queue.length && retained.length < limit) {
    for (const id2 of neighbours.get(queue.shift()) || []) if (!retainedIds.has(id2) && retained.length < limit) {
      retained.push(unique.get(id2));
      retainedIds.add(id2);
      queue.push(id2);
    }
  }
  for (const run of [...all].sort((a, b) => chronological2(b, a))) if (!retainedIds.has(run.id) && retained.length < limit) {
    retained.push(run);
    retainedIds.add(run.id);
  }
  const timeline = buildRunTimeline(retained, now, { coverage: { runs: detail?.runHistoryTruncated || all.length > limit ? "partial" : "complete" }, relations: detail?.relations });
  const runs = [...timeline.runs].sort(chronological2);
  const byId = new Map(runs.map((run) => [run.id, run]));
  const explicit = timeline.relations.filter((edge) => TYPES[edge.type]);
  const knownIds = new Set(detail?.knownRunIds || []);
  const unresolved = timeline.unresolvedRelations.map((edge) => ({ ...edge, sourceOmitted: unique.has(edge.from) || knownIds.has(edge.from) }));
  const sourceNotes = /* @__PURE__ */ new Map();
  for (const edge of unresolved) {
    if (!sourceNotes.has(edge.to)) sourceNotes.set(edge.to, []);
    sourceNotes.get(edge.to).push(edge);
  }
  const incoming = new Map(runs.map((run) => [run.id, []]));
  const outgoing = new Map(runs.map((run) => [run.id, []]));
  for (const edge of explicit) {
    incoming.get(edge.to).push(edge);
    outgoing.get(edge.from).push(edge);
  }
  const remaining = new Map(runs.map((run) => [run.id, run]));
  const degree = new Map(runs.map((run) => [run.id, incoming.get(run.id).length]));
  const nodes = [], placed = /* @__PURE__ */ new Map(), brokenEdges = /* @__PURE__ */ new Set();
  let isolatedCount = 0;
  const levelCounts = /* @__PURE__ */ new Map();
  while (remaining.size) {
    let ready = [...remaining.values()].filter((run2) => degree.get(run2.id) === 0).sort(chronological2);
    if (!ready.length) {
      const earliest = [...remaining.values()].sort(chronological2)[0];
      for (const edge of incoming.get(earliest.id)) if (remaining.has(edge.from)) brokenEdges.add(edge.id);
      ready = [earliest];
    }
    const run = ready[0];
    const parents = incoming.get(run.id).filter((edge) => !brokenEdges.has(edge.id)).map((edge) => placed.get(edge.from)).filter(Boolean);
    const isolated = incoming.get(run.id).length === 0 && outgoing.get(run.id).length === 0;
    let rank = parents.length ? Math.max(...parents.map((node2) => node2.rank + 1)) : isolated ? Math.floor(isolatedCount++ / 4) + 1 : 0;
    while ((levelCounts.get(rank) || 0) >= 4) rank++;
    levelCounts.set(rank, (levelCounts.get(rank) || 0) + 1);
    const node = { id: run.id, run, rank, width: NODE_WIDTH, height: NODE_HEIGHT, sourceNotes: sourceNotes.get(run.id) || [] };
    nodes.push(node);
    placed.set(node.id, node);
    remaining.delete(run.id);
    for (const edge of outgoing.get(run.id)) degree.set(edge.to, degree.get(edge.to) - 1);
  }
  const levels = /* @__PURE__ */ new Map();
  for (const node of nodes) {
    if (!levels.has(node.rank)) levels.set(node.rank, []);
    levels.get(node.rank).push(node);
  }
  for (const [rank, level] of [...levels].sort((a, b) => a[0] - b[0])) {
    const occupied = /* @__PURE__ */ new Set();
    for (const node of level) {
      const parents = incoming.get(node.id).filter((edge) => !brokenEdges.has(edge.id)).map((edge) => placed.get(edge.from)).filter((parent) => parent && parent.rank < rank);
      const preferred = parents.length ? Math.round(parents.reduce((sum, parent) => sum + parent.lane, 0) / parents.length) : 0;
      let col = preferred;
      while (occupied.has(col)) col++;
      node.lane = col;
      occupied.add(col);
    }
  }
  const columnCount = nodes.length ? Math.max(...nodes.map((node) => node.lane)) + 1 : 0;
  const lanes = Array.from({ length: columnCount }, (_, index) => ({ id: `column-${index}`, runs: [] }));
  const routed = routeCalls(nodes, lanes, explicit.filter((edge) => !brokenEdges.has(edge.id)), selectedRunId);
  const edges = routed.edges;
  return {
    nodes,
    lanes,
    edges,
    unresolved,
    cycleEdges: explicit.filter((edge) => brokenEdges.has(edge.id)),
    width: routed.width,
    height: routed.height,
    sections: routed.sections,
    totalRuns: all.length,
    omittedRuns: Math.max(0, all.length - nodes.length),
    omittedActive: all.filter((run) => ACTIVE.has(run.status) && !byId.has(run.id)).length,
    inputTruncated: input.length > MAX_INPUT,
    historyTruncated: detail?.runHistoryTruncated === true,
    lineageKnown: timeline.coverage.lineage === "available"
  };
}
function ZoomIcon({ plus = false }) {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("svg", { viewBox: "0 0 16 16", width: "16", height: "16", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("path", { d: plus ? "M3 8h10M8 3v10" : "M3 8h10", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }) });
}
function sourceNote(node) {
  if (!node.sourceNotes.length) return null;
  if (node.sourceNotes.every((edge) => edge.reason === "missing_source")) return node.sourceNotes.every((edge) => edge.sourceOmitted) ? "\u4E0A\u6E38\u672A\u5C55\u793A" : "\u4E0A\u6E38\u672A\u52A0\u8F7D";
  return "\u6765\u6E90\u5F85\u6838\u5B9E";
}
var displayTime = (value) => parsedTime(value) == null ? "\u672A\u63D0\u4F9B" : new Date(value).toLocaleString("zh-CN", { hour12: false });
function callEdgePreview(edge) {
  const target = edge.toNode.run;
  const when = parsedTime(target.createdAt);
  const creation = when == null ? "\u521B\u5EFA\u672A\u63D0\u4F9B" : `\u521B\u5EFA ${clock5(when)}`;
  const summary = triggerExcerpt(target.triggerSummary);
  return `${TYPES[edge.type]} \xB7 ${creation} \xB7 ${summary}`;
}
function describeCallEdge(edge, observedRuns = [], unavailable = false) {
  const target = edge.toNode.run;
  const observed = observedRuns.find((run) => run?.id === target.id && target.issueId && run.issueId === target.issueId);
  const { stale, current, action } = observedWork(target, observed, unavailable);
  return {
    type: TYPES[edge.type],
    source: runLabel(edge.fromNode.run),
    target: runLabel(target),
    createdAt: displayTime(target.createdAt),
    startedAt: displayTime(target.startedAt),
    triggerSummary: typeof target.triggerSummary === "string" && target.triggerSummary.trim() ? target.triggerSummary : "\u672A\u63D0\u4F9B",
    activity: action?.summary ? `${current ? "\u7B49\u5F85\u5DE5\u5177\u7ED3\u679C" : "\u6700\u8FD1\u52A8\u4F5C"}\uFF1A${action.summary}` : "\u6682\u65E0\u53EF\u8BC6\u522B\u7684\u5DE5\u4F5C\u8BB0\u5F55",
    activityAt: displayTime(action?.at),
    stale
  };
}
function CallGraph({ detail, onSelectRun, selectedRunId, observedRuns = [], api, unavailable = false, settings = {}, runtimes = [] }) {
  const [expanded, setExpanded] = (0, import_react10.useState)(false);
  const [filters, setFilters] = (0, import_react10.useState)({ status: "all", agent: "", query: "", from: "", until: "" });
  const [summaries, setSummaries] = (0, import_react10.useState)(false);
  const [focused, setFocused] = (0, import_react10.useState)(false);
  const graphSection = (0, import_react10.useRef)(null);
  (0, import_react10.useEffect)(() => {
    if (!focused) return;
    graphSection.current?.scrollIntoView({ block: "start" });
    const escape = (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        setFocused(false);
      }
    };
    document.addEventListener("keydown", escape, true);
    return () => document.removeEventListener("keydown", escape, true);
  }, [focused]);
  const filtered = (0, import_react10.useMemo)(() => filterGraphRuns(detail?.runs || [], filters), [detail, filters]);
  const filtering = filters.status !== "all" || Boolean(filters.agent || filters.query || filters.from || filters.until);
  const graph = (0, import_react10.useMemo)(() => buildCallGraphLayout({ ...detail, runs: filtered.runs, knownRunIds: (detail?.runs || []).map((run) => run.id) }, Date.now(), filtered.runs.some((run) => run.id === selectedRunId) ? selectedRunId : "", expanded ? MAX_NODES : 30, filtering ? [...filtered.matchedIds] : []), [detail, filtered, filtering, selectedRunId, expanded]);
  const changeFilter = (key, value) => {
    setFilters((old) => ({ ...old, [key]: value }));
    setSelectedEdgeId("");
  };
  const roles = [...new Map((detail?.runs || []).filter((run) => run.agentId).map((run) => [run.agentId, agentLabel(run)])).entries()];
  const [scale, setScale] = (0, import_react10.useState)(1);
  const [selectedEdgeId, setSelectedEdgeId] = (0, import_react10.useState)("");
  const [commentTime, setCommentTime] = (0, import_react10.useState)(null), [commentRetry, setCommentRetry] = (0, import_react10.useState)(0);
  const [humanActivity, setHumanActivity] = (0, import_react10.useState)({ status: "loading", items: [] });
  const [humanRetry, setHumanRetry] = (0, import_react10.useState)(0);
  (0, import_react10.useEffect)(() => {
    const issueId = detail?.issue?.id;
    if (!issueId || typeof api !== "function") {
      setHumanActivity({ status: "unavailable", items: [] });
      return;
    }
    const controller = new AbortController();
    setHumanActivity({ status: "loading", items: [] });
    api("humanActivity", { issueId }, controller.signal).then((value) => {
      if (!controller.signal.aborted) setHumanActivity({ status: "ready", items: value?.items || [], possiblyTruncated: value?.possiblyTruncated });
    }).catch(() => {
      if (!controller.signal.aborted) setHumanActivity({ status: "error", items: [] });
    });
    return () => controller.abort();
  }, [api, detail?.issue?.id, humanRetry]);
  const viewport = (0, import_react10.useRef)(null);
  (0, import_react10.useEffect)(() => {
    if (viewport.current) {
      setScale(Math.min(1, Math.max(0.7, (viewport.current.clientWidth - 20) / graph.width)));
      viewport.current.scrollTop = 0;
      viewport.current.scrollLeft = 0;
    }
  }, [detail?.issue?.id, graph.width]);
  (0, import_react10.useEffect)(() => {
    const node = graph.nodes.find((n) => n.id === selectedRunId);
    if (node && viewport.current) viewport.current.scrollTo({ top: Math.max(0, node.y * scale - 120), left: Math.max(0, node.x * scale - 100), behavior: "auto" });
  }, [selectedRunId]);
  const selectedEdge = graph.edges.find((edge) => edge.id === selectedEdgeId);
  const edgeInfo = selectedEdge ? describeCallEdge(selectedEdge, observedRuns, unavailable) : null;
  const targetIssueId = selectedEdge?.toNode.run.issueId || "";
  const commentId = selectedEdge?.toNode.run.triggerCommentId || "";
  const commentKey = `${selectedEdgeId}:${targetIssueId}:${commentId}`;
  (0, import_react10.useEffect)(() => {
    if (!selectedEdgeId || !commentId || !targetIssueId || targetIssueId !== detail?.issue?.id || typeof api !== "function") return;
    const controller = new AbortController();
    setCommentTime({ key: commentKey, status: "loading" });
    api("triggerCommentTime", { issueId: targetIssueId, commentId }, controller.signal).then((value) => {
      if (!controller.signal.aborted) setCommentTime({ key: commentKey, status: value?.status || "unknown", createdAt: value?.createdAt });
    }).catch(() => {
      if (!controller.signal.aborted) setCommentTime({ key: commentKey, status: "error" });
    });
    return () => controller.abort();
  }, [api, commentId, targetIssueId, detail?.issue?.id, selectedEdgeId, commentKey, commentRetry]);
  const commentStatus = !commentId ? "missing" : !targetIssueId || targetIssueId !== detail?.issue?.id ? "wrong_issue" : typeof api !== "function" ? "unavailable" : commentTime?.key === commentKey ? commentTime.status : "loading";
  const commentLabel = commentStatus === "found" ? displayTime(commentTime?.createdAt) : { missing: "\u8FD0\u884C\u672A\u63D0\u4F9B\u89E6\u53D1\u8BC4\u8BBA ID", wrong_issue: "\u8FD0\u884C\u4EFB\u52A1\u5F52\u5C5E\u672A\u6838\u5B9E", unavailable: "\u6682\u4E0D\u652F\u6301\u8BFB\u53D6\u89E6\u53D1\u8BC4\u8BBA", loading: "\u6B63\u5728\u8BFB\u53D6\u2026", not_found: "\u8BC4\u8BBA\u4E0D\u53EF\u7528\u3001\u5DF2\u5220\u9664\u6216\u672A\u5305\u542B\u5728\u63A5\u53E3\u7ED3\u679C\u4E2D", invalid_time: "\u8BC4\u8BBA\u521B\u5EFA\u65F6\u95F4\u672A\u63D0\u4F9B\u6216\u65E0\u6548", error: "\u8BFB\u53D6\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5" }[commentStatus] || "\u8BC4\u8BBA\u65F6\u95F4\u65E0\u6CD5\u786E\u8BA4";
  const id2 = (0, import_react10.useId)().replace(/[^a-zA-Z0-9_-]/g, "");
  const presentTypes = Object.entries(TYPES).filter(([type]) => graph.edges.some((edge) => edge.type === type));
  const fitWidth = () => setScale(Math.min(1.5, Math.max(0.25, ((viewport.current?.clientWidth || graph.width) - 20) / graph.width)));
  const selectedNode = graph.nodes.find((node) => node.id === selectedRunId);
  const revealSelected = () => {
    if (!selectedNode || !viewport.current) return;
    viewport.current.scrollIntoView({ block: "start", behavior: "auto" });
    viewport.current.scrollTo({ top: Math.max(0, selectedNode.y * scale - 36), left: Math.max(0, selectedNode.x * scale - 36), behavior: "auto" });
  };
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("section", { ref: graphSection, className: `mm-call-graph ${focused ? "is-focused" : ""}`, "aria-label": "\u8FD0\u884C\u8C03\u7528\u56FE", children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "mm-call-toolbar", children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "mm-call-description", children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("strong", { children: [
          detail?.issue?.identifier || "\u5F53\u524D\u4EFB\u52A1",
          " \xB7 ",
          graph.nodes.length,
          " \u6B21\u8FD0\u884C \xB7 ",
          graph.edges.length,
          " \u6761\u5173\u7CFB"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", onClick: () => setFocused((value) => !value), children: focused ? "\u9000\u51FA\u4E13\u6CE8" : "\u4E13\u6CE8\u56FE\u8C31" })
      ] }),
      graph.nodes.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "mm-call-zoom", role: "group", "aria-label": "\u8C03\u7528\u56FE\u89C6\u56FE\u63A7\u5236", children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", onClick: () => setScale((value) => Math.max(0.25, Math.round((value - 0.1) * 100) / 100)), disabled: scale <= 0.25, "aria-label": "\u7F29\u5C0F\u8C03\u7528\u56FE", title: "\u7F29\u5C0F", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(ZoomIcon, {}) }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("button", { type: "button", onClick: () => setScale(1), "aria-label": "\u6062\u590D\u539F\u59CB\u5927\u5C0F", title: "\u6062\u590D 100%", children: [
          Math.round(scale * 100),
          "%"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", onClick: () => setScale((value) => Math.min(1.5, Math.round((value + 0.1) * 100) / 100)), disabled: scale >= 1.5, "aria-label": "\u653E\u5927\u8C03\u7528\u56FE", title: "\u653E\u5927", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(ZoomIcon, { plus: true }) }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", onClick: fitWidth, children: "\u9002\u5E94\u5BBD\u5EA6" }),
        selectedNode && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", onClick: revealSelected, children: "\u5B9A\u4F4D\u9009\u4E2D\u8FD0\u884C" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "mm-graph-filters", children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("select", { "aria-label": "\u7B5B\u9009\u8FD0\u884C\u72B6\u6001", value: filters.status, onChange: (event) => changeFilter("status", event.target.value), children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("option", { value: "all", children: "\u5168\u90E8\u72B6\u6001" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("option", { value: "failed", children: "\u5931\u8D25\u8FD0\u884C" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("option", { value: "active", children: "\u6D3B\u52A8\u8FD0\u884C" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("option", { value: "completed", children: "\u5DF2\u5B8C\u6210" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("option", { value: "cancelled", children: "\u5DF2\u53D6\u6D88" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("select", { "aria-label": "\u7B5B\u9009\u667A\u80FD\u4F53", value: filters.agent, onChange: (event) => changeFilter("agent", event.target.value), children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("option", { value: "", children: "\u5168\u90E8\u667A\u80FD\u4F53" }),
        roles.map(([id3, label]) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("option", { value: id3, children: label }, id3))
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("input", { "aria-label": "\u641C\u7D22\u8FD0\u884C\u6216\u89E6\u53D1\u5185\u5BB9", placeholder: "\u8FD0\u884C\u7F16\u53F7 / \u89E6\u53D1\u5185\u5BB9", value: filters.query, onChange: (event) => changeFilter("query", event.target.value) }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("details", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("summary", { children: "\u65F6\u95F4\u8303\u56F4" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("label", { children: [
          "\u5F00\u59CB\u4E8E",
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("input", { type: "datetime-local", "aria-label": "\u8FD0\u884C\u5F00\u59CB\u65F6\u95F4\u4E0B\u9650", value: filters.from, onChange: (event) => changeFilter("from", event.target.value) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("label", { children: [
          "\u622A\u81F3",
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("input", { type: "datetime-local", "aria-label": "\u8FD0\u884C\u5F00\u59CB\u65F6\u95F4\u4E0A\u9650", value: filters.until, onChange: (event) => changeFilter("until", event.target.value) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("small", { children: "\u6309\u8FD0\u884C\u5F00\u59CB\u65F6\u95F4\u7B5B\u9009\uFF1B\u672A\u5F00\u59CB\u65F6\u4F7F\u7528\u521B\u5EFA\u65F6\u95F4\u3002" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("label", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("input", { type: "checkbox", checked: summaries, onChange: (event) => setSummaries(event.target.checked) }),
        "\u8FDE\u7EBF\u6458\u8981"
      ] }),
      filtering && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { onClick: () => setFilters({ status: "all", agent: "", query: "", from: "", until: "" }), children: "\u6E05\u9664\u7B5B\u9009" })
    ] }),
    filtering && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "mm-call-filter-result", role: "status", children: filtered.invalidRange ? "\u5F00\u59CB\u65F6\u95F4\u4E0D\u80FD\u665A\u4E8E\u622A\u6B62\u65F6\u95F4\u3002" : "\u5339\u914D " + filtered.matchedIds.size + " \u6B21\u8FD0\u884C\uFF0C\u56FE\u4E2D\u663E\u793A " + graph.nodes.filter((node) => filtered.matchedIds.has(node.id)).length + " \u6B21\u5339\u914D\u548C " + graph.nodes.filter((node) => !filtered.matchedIds.has(node.id)).length + " \u6B21\u76F8\u90BB\u8FD0\u884C\uFF1B\u76F8\u90BB\u8FD0\u884C\u4EC5\u4F9B\u4E0A\u4E0B\u6587\u3002" }),
    graph.omittedRuns > 0 && /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("p", { className: "mm-call-notice", children: [
      "\u5171\u8BFB\u53D6 ",
      graph.totalRuns,
      " \u6B21\u8FD0\u884C\uFF0C\u56FE\u4E2D\u5C55\u793A ",
      graph.nodes.length,
      " \u6B21\uFF0C\u4F18\u5148\u4FDD\u7559\u9009\u4E2D\u3001\u6D3B\u52A8\u53CA\u76F8\u90BB\u8FD0\u884C\u3002",
      graph.omittedActive > 0 && `\u53E6\u6709 ${graph.omittedActive} \u6B21\u6D3B\u52A8\u8FD0\u884C\u672A\u5C55\u793A\u3002`,
      "\u672A\u5C55\u793A\u7684\u4E0A\u6E38\u6765\u6E90\u5DF2\u6807\u6CE8\u3002"
    ] }),
    graph.totalRuns > 30 && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "mm-call-notice", children: !expanded ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", onClick: () => setExpanded(true), children: "\u5C55\u5F00\u66F4\u591A\u8FD0\u884C\uFF08\u6700\u591A 80 \u6761\uFF09" }) : /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", onClick: () => setExpanded(false), children: "\u6536\u8D77\u4E3A\u805A\u7126\u89C6\u56FE" }) }),
    (graph.inputTruncated || graph.historyTruncated) && /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("p", { className: "mm-call-notice", children: [
      "\u8FD0\u884C\u5386\u53F2\u5C1A\u672A\u5B8C\u6574\u8BFB\u53D6\uFF08\u4EFB\u52A1\u5386\u53F2\u6700\u591A 500 \u6761\uFF0C\u54CD\u5E94\u5927\u5C0F\u53D7\u9650\uFF09\uFF0C\u8C03\u7528\u56FE\u4EC5\u8986\u76D6",
      graph.inputTruncated ? "\u524D 1,000 \u6761" : "\u5DF2\u52A0\u8F7D",
      "\u8BB0\u5F55\u3002"
    ] }),
    graph.nodes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "mm-call-empty", children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("strong", { children: filtering ? "\u6CA1\u6709\u7B26\u5408\u6761\u4EF6\u7684\u8FD0\u884C" : "\u8FD8\u6CA1\u6709\u53EF\u5C55\u793A\u7684\u8FD0\u884C" }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { children: filtering ? "\u8C03\u6574\u7B5B\u9009\u6761\u4EF6\u67E5\u770B\u5176\u4ED6\u8FD0\u884C\u3002" : "\u4EFB\u52A1\u4EA7\u751F\u8FD0\u884C\u8BB0\u5F55\u540E\uFF0C\u8FD9\u91CC\u4F1A\u663E\u793A\u667A\u80FD\u4F53\u4E4B\u95F4\u7684\u8C03\u7528\u8DEF\u5F84\u3002" })
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_jsx_runtime9.Fragment, { children: [
      graph.edges.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "mm-call-notice", children: graph.unresolved.length ? "\u5F53\u524D\u8BB0\u5F55\u4E0D\u8DB3\u4EE5\u8FDE\u51FA\u8C03\u7528\u8DEF\u5F84\uFF0C\u4E0A\u6E38\u672A\u52A0\u8F7D\u6216\u6765\u6E90\u5F85\u6838\u5B9E\u7684\u8FD0\u884C\u5DF2\u6807\u6CE8\u3002" : graph.lineageKnown ? "\u5DF2\u52A0\u8F7D\u8FD0\u884C\u6CA1\u6709\u660E\u786E\u7684\u8C03\u7528\u5173\u8054\uFF1B\u4E0B\u65B9\u5206\u522B\u5C55\u793A\u5404\u6B21\u8FD0\u884C\u3002" : "\u5C1A\u672A\u8BFB\u5230\u660E\u786E\u7684\u8C03\u7528\u6765\u6E90\uFF1B\u5404\u6B21\u8FD0\u884C\u5206\u522B\u5C55\u793A\uFF0C\u4E0D\u6309\u65F6\u95F4\u63A8\u65AD\u8C03\u7528\u3002" }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "mm-call-legend", children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "mm-call-status-legend", children: [["running", "\u8FD0\u884C\u4E2D"], ["completed", "\u5DF2\u5B8C\u6210"], ["failed", "\u5931\u8D25"], ["waiting", "\u7B49\u5F85\u4E2D"]].map(([state, label]) => /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("span", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("i", { className: `status-${state}`, "aria-hidden": "true" }),
          label
        ] }, state)) }),
        presentTypes.map(([type, label]) => /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("span", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("svg", { width: "28", height: "10", viewBox: "0 0 28 10", "aria-hidden": "true", children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("path", { d: "M1 5h24", className: `mm-call-edge ${type}`, fill: "none" }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("path", { d: "m22 2 4 3-4 3", className: `mm-call-edge ${type}`, fill: "none" })
          ] }),
          label
        ] }, type)),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "mm-call-scroll-hint", children: "\u70B9\u51FB\u8FDE\u7EBF\u67E5\u770B\u5173\u7CFB\u548C\u65F6\u95F4 \xB7 \u70B9\u51FB\u8FD0\u884C\u67E5\u770B\u8FDB\u5C55" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: `mm-call-workbench ${edgeInfo ? "has-edge" : ""}`, children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { ref: viewport, className: "mm-call-viewport", tabIndex: 0, role: "region", "aria-label": "\u53EF\u6EDA\u52A8\u8C03\u7528\u56FE\uFF0C\u4F7F\u7528\u7F29\u653E\u63A7\u4EF6\u6216\u6EDA\u52A8\u67E5\u770B\u5B8C\u6574\u5185\u5BB9", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "mm-call-scaled-space", style: { width: graph.width * scale, height: graph.height * scale }, children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "mm-call-canvas", style: { width: graph.width, height: graph.height, transform: `scale(${scale})` }, children: [
          graph.sections?.map((section, index) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "v2-graph-group", style: { left: section.x, width: section.width, height: graph.height - 16 }, children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("span", { children: [
            section.title,
            /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("small", { children: [
              section.count,
              " \u6B21\u8FD0\u884C"
            ] })
          ] }) }, index)),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("svg", { className: "mm-call-lines", width: graph.width, height: graph.height, viewBox: `0 0 ${graph.width} ${graph.height}`, role: "group", "aria-label": `${graph.edges.length} \u6761\u670D\u52A1\u7AEF\u660E\u786E\u8BB0\u5F55\u7684\u8C03\u7528\u5173\u7CFB`, children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("defs", { children: Object.keys(TYPES).map((type) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("marker", { id: `${id2}-${type}`, viewBox: "0 0 7 7", refX: "6", refY: "3.5", markerWidth: "6", markerHeight: "6", orient: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("path", { d: "M0 0 7 3.5 0 7Z", className: `mm-call-arrow ${type}` }) }, type)) }),
            graph.edges.map((edge) => /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("g", { className: selectedEdgeId === edge.id ? "is-connected" : edge.emphasis, role: "button", tabIndex: 0, "aria-label": `\u67E5\u770B${runLabel(edge.fromNode.run)}\u4E0E${runLabel(edge.toNode.run)}\u7684${TYPES[edge.type]}\u5173\u7CFB`, onClick: () => setSelectedEdgeId(edge.id), onKeyDown: (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setSelectedEdgeId(edge.id);
              }
            }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("title", { children: `${agentLabel(edge.fromNode.run)} (${edge.from}) ${TYPES[edge.type]} ${agentLabel(edge.toNode.run)} (${edge.to})\uFF1B\u670D\u52A1\u7AEF\u6765\u6E90\u5B57\u6BB5\uFF1A${edge.evidence.field}` }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("path", { d: edge.path, className: "mm-call-edge-clearance", fill: "none", stroke: "var(--mm-bg)", strokeWidth: "6" }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("path", { d: edge.path, className: `mm-call-edge ${edge.type}`, markerEnd: `url(#${id2}-${edge.type})` }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("path", { d: edge.path, className: "mm-call-edge-hit" }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("text", { x: edge.labelX, y: edge.labelY, className: "v2-edge-label", children: TYPES[edge.type] }),
              (summaries || selectedEdgeId === edge.id) && /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("g", { transform: "translate(" + Math.max(126, Math.min(graph.width - 126, edge.labelX)) + "," + edge.labelY + ")", className: "mm-call-edge-preview", children: [
                /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("title", { children: callEdgePreview(edge) }),
                /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("rect", { x: "-122", y: "-21", width: "244", height: "42", rx: "4" }),
                /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("text", { textAnchor: "middle", y: "-5", children: [
                  TYPES[edge.type],
                  " \xB7 ",
                  parsedTime(edge.toNode.run.createdAt) === null ? "\u521B\u5EFA\u65F6\u95F4\u672A\u63D0\u4F9B" : "\u521B\u5EFA " + clock5(parsedTime(edge.toNode.run.createdAt))
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("text", { textAnchor: "middle", y: "11", children: triggerExcerpt(edge.toNode.run.triggerSummary, 19) })
              ] })
            ] }, edge.id))
          ] }),
          graph.nodes.map((node) => {
            const note = sourceNote(node), status = STATUS[node.run.status] || "\u72B6\u6001\u5F85\u6838\u5B9E";
            const timing = executionMetrics(node.run, { observedRun: observedRuns.find((item) => item.id === node.id), unavailable, settings, runtimeStatus: runtimes.find((item) => item.id === node.run.runtimeId)?.status });
            const timingLabel = timing.waiting ? `\u542F\u52A8\u7B49\u5F85 ${traceDuration(timing.wait)}` : elapsed(node.run);
            const title = `${runLabel(node.run)}
${status} \xB7 ${elapsed(node.run)}
\u5F00\u59CB\uFF1A${node.run.startedAt || "\u672A\u63D0\u4F9B"}${note ? `
${node.sourceNotes.map((edge) => `${TYPES[edge.type]}\u6765\u6E90 ${edge.from || "\u65E0\u6548 ID"}\uFF1A${edge.sourceOmitted ? "\u672A\u5C55\u793A" : "\u672A\u52A0\u8F7D\u6216\u5F85\u6838\u5B9E"}`).join("\n")}` : ""}`;
            return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("button", { type: "button", className: `mm-call-node status-${safeStatus(node.run.status)}${ACTIVE.has(node.run.status) ? " is-active" : ""}${node.run.status === "failed" ? " is-failed" : ""}${selectedRunId === node.id ? " is-selected" : ""}${note ? " has-unresolved" : ""}${timing.alerts.length ? " has-attention" : ""}`, style: { left: node.x, top: node.y, width: node.width, height: node.height }, title: `${title}${timing.alerts.length ? `
${timing.alerts.join(" \xB7 ")}` : ""}`, "aria-pressed": selectedRunId === node.id, "aria-label": `\u67E5\u770B${runLabel(node.run)}\u7684\u8FDB\u5C55\uFF0C${status}\uFF0C${timingLabel}${timing.alerts.length ? `\uFF0C${timing.alerts.join("\uFF0C")}` : ""}${note ? `\uFF0C${note}` : ""}`, onClick: () => onSelectRun?.(node.id), disabled: !onSelectRun, children: [
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "mm-call-node-kicker", children: "\u6267\u884C\u8FD0\u884C" }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("span", { className: "mm-call-node-name", children: [
                /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(AgentAvatar, { name: agentLabel(node.run), size: 20 }),
                /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "ui-agent-name", children: agentLabel(node.run) }),
                filtering && !filtered.matchedIds.has(node.id) && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("small", { children: " \xB7 \u76F8\u90BB" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("span", { className: "mm-call-node-identity", children: [
                /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("span", { children: [
                  "#",
                  shortId3(node.id)
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "mm-call-node-status", children: status })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("span", { className: "mm-call-node-foot", children: [
                /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: note ? "mm-call-source-note" : "", children: note || timing.alerts[0] || "\u5F00\u59CB " + clock5(parsedTime(node.run.startedAt)) }),
                /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("span", { children: [
                  node.run.ongoing && !timing.waiting ? "\u5DF2\u8FD0\u884C " : "",
                  timingLabel
                ] })
              ] })
            ] }, node.id);
          })
        ] }) }) }),
        edgeInfo && /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("section", { tabIndex: 0, className: "mm-call-edge-detail", "aria-label": "\u8C03\u7528\u5173\u7CFB\u8BE6\u60C5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "mm-call-edge-detail-head", children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("strong", { children: [
              edgeInfo.type,
              "\u5173\u7CFB"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", onClick: () => setSelectedEdgeId(""), children: "\u5173\u95ED\u5173\u7CFB\u8BE6\u60C5" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("p", { children: [
            edgeInfo.source,
            " \u2192 ",
            edgeInfo.target
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("dl", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("dt", { children: "\u76EE\u6807\u8FD0\u884C\u521B\u5EFA\u65F6\u95F4" }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("dd", { children: edgeInfo.createdAt })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("dt", { children: "\u76EE\u6807\u8FD0\u884C\u5F00\u59CB\u65F6\u95F4" }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("dd", { children: edgeInfo.startedAt })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("dt", { children: "\u89E6\u53D1\u8BC4\u8BBA\u521B\u5EFA\u65F6\u95F4" }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("dd", { children: [
                commentLabel,
                commentStatus === "error" && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", onClick: () => setCommentRetry((value) => value + 1), children: "\u91CD\u8BD5\u8BFB\u53D6\u8BC4\u8BBA\u65F6\u95F4" })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("dt", { children: "\u76EE\u6807\u8FD0\u884C\u89E6\u53D1\u6458\u8981" }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("dd", { className: "mm-call-edge-summary", children: [
                /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("strong", { children: triggerExcerpt(edgeInfo.triggerSummary, 100) }),
                /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("details", { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("summary", { children: "\u67E5\u770B\u5B8C\u6574\u89E6\u53D1\u539F\u6587" }),
                  /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { children: edgeInfo.triggerSummary })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("dt", { children: "\u76EE\u6807\u8FD0\u884C\u7684\u5DE5\u4F5C\u8BB0\u5F55" }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("dd", { children: [
                edgeInfo.activity,
                " \xB7 \u8BB0\u5F55\u65F6\u95F4 ",
                edgeInfo.activityAt,
                edgeInfo.stale ? " \xB7 \u91C7\u96C6\u5F02\u5E38\u6216\u65E5\u5FD7\u672A\u8865\u9F50\uFF0C\u4FE1\u606F\u53EF\u80FD\u8FC7\u671F" : ""
              ] })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "mm-muted", children: "\u8BC4\u8BBA\u6309 ID \u4E0E\u4EFB\u52A1\u5F52\u5C5E\u7CBE\u786E\u5339\u914D\uFF1B\u8BC4\u8BBA\u521B\u5EFA\u65F6\u95F4\u4E0D\u662F\u5173\u7CFB\u5199\u5165\u65F6\u95F4\u3002\u670D\u52A1\u672A\u63D0\u4F9B\u8FD9\u6761\u5173\u7CFB\u7684\u7CBE\u786E\u89E6\u53D1\u65F6\u95F4\uFF0C\u8FD0\u884C\u65F6\u95F4\u548C\u89E6\u53D1\u6458\u8981\u4E5F\u4E0D\u80FD\u8BC1\u660E\u4E0A\u6E38\u5177\u4F53\u6267\u884C\u4E86\u4EC0\u4E48\u3002" }),
          onSelectRun && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", onClick: () => onSelectRun(selectedEdge.to), children: "\u67E5\u770B\u76EE\u6807\u8FD0\u884C\u8FDB\u5C55" })
        ] })
      ] }),
      (graph.unresolved.length > 0 || graph.cycleEdges.length > 0) && /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("details", { className: "mm-call-unresolved", children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("summary", { children: [
          graph.unresolved.length + graph.cycleEdges.length,
          " \u6761\u6765\u6E90\u672A\u8FDE\u5165\u8C03\u7528\u56FE"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("ul", { children: [
          graph.unresolved.map((edge, index) => /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("li", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("strong", { children: runLabel(graph.nodes.find((node) => node.id === edge.to).run) }),
            "\uFF1A",
            TYPES[edge.type],
            "\u6765\u6E90 #",
            shortId3(edge.from) || "\u672A\u77E5",
            "\uFF0C",
            edge.sourceOmitted ? "\u6765\u6E90\u8FD0\u884C\u672A\u5C55\u793A\u3002" : edge.reason === "missing_source" ? "\u6765\u6E90\u8FD0\u884C\u672A\u52A0\u8F7D\u3002" : "\u6307\u9488\u6216\u4EFB\u52A1\u5F52\u5C5E\u5F85\u6838\u5B9E\u3002"
          ] }, `${edge.type}:${edge.from}:${edge.to}:${index}`)),
          graph.cycleEdges.map((edge) => /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("li", { children: [
            "#",
            shortId3(edge.from),
            " ",
            TYPES[edge.type],
            " #",
            shortId3(edge.to),
            "\uFF1A\u5B58\u5728\u5FAA\u73AF\u5F15\u7528\uFF0C\u672A\u5C06\u5FAA\u73AF\u5C55\u793A\u4E3A\u8C03\u7528\u8D77\u70B9\u3002"
          ] }, edge.id))
        ] })
      ] }),
      presentTypes.some(([type]) => type === "parent_run") && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "mm-call-footnote", children: "\u7236\u8FD0\u884C\u8868\u793A\u8FD0\u884C\u6765\u6E90\u5173\u8054\uFF0C\u4E0D\u662F\u4E1A\u52A1\u7236\u5B50\u4EFB\u52A1\u3002" }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "mm-call-footnote", children: "\u8FDE\u7EBF\u6765\u81EA\u670D\u52A1\u7AEF\u7684\u660E\u786E\u6765\u6E90\uFF1B\u4E0A\u4E0B\u4F4D\u7F6E\u4E0E\u95F4\u8DDD\u4E0D\u4EE3\u8868\u8017\u65F6\u3002" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("details", { className: "mm-call-participation", children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("summary", { children: [
        "\u4EBA\u5458\u53C2\u4E0E \xB7 ",
        humanActivity.status === "ready" ? `${humanActivity.items.length} \u6761\u5DF2\u8BFB\u53D6\u8BC4\u8BBA${humanActivity.possiblyTruncated ? "\uFF0C\u53EF\u80FD\u672A\u8BFB\u5168" : ""}` : humanActivity.status === "loading" ? "\u8BFB\u53D6\u4E2D" : humanActivity.status === "error" ? "\u8BFB\u53D6\u5931\u8D25" : "\u6682\u4E0D\u53EF\u8BFB"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "mm-call-edge-detail", "aria-label": "\u4EBA\u5458\u53C2\u4E0E\u8BB0\u5F55", children: [
        humanActivity.status === "loading" && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { children: "\u6B63\u5728\u8BFB\u53D6\u4EBA\u5458\u8BC4\u8BBA\u2026" }),
        humanActivity.status === "error" && /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("p", { children: [
          "\u4EBA\u5458\u8BC4\u8BBA\u8BFB\u53D6\u5931\u8D25\uFF0C\u5F53\u524D\u65E0\u6CD5\u6838\u5B9E\u3002",
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", onClick: () => setHumanRetry((value) => value + 1), children: "\u91CD\u65B0\u8BFB\u53D6" })
        ] }),
        humanActivity.status === "unavailable" && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { children: "\u5F53\u524D\u65E0\u6CD5\u8BFB\u53D6\u4EBA\u5458\u8BC4\u8BBA\u3002" }),
        humanActivity.status === "ready" && !humanActivity.items.length && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { children: "\u5DF2\u8BFB\u53D6\u7684\u8BC4\u8BBA\u4E2D\u6682\u65E0\u4EBA\u5458\u53C2\u4E0E\u8BB0\u5F55\u3002" }),
        humanActivity.items.map((item) => {
          const triggered = (detail?.runs || []).filter((run) => run.triggerCommentId === item.id);
          return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("p", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("strong", { children: [
                "\u4EBA\u5458 #",
                shortId3(item.authorId)
              ] }),
              " \xB7 ",
              displayTime(item.createdAt),
              " \xB7 \u8BC4\u8BBA"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { children: item.content || "\u8BC4\u8BBA\u5185\u5BB9\u672A\u63D0\u4F9B" }),
            triggered.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("p", { children: [
              "\u89E6\u53D1\u8FD0\u884C\uFF1A",
              triggered.map((run) => /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("button", { type: "button", onClick: () => onSelectRun?.(run.id), children: [
                agentLabel(run),
                " #",
                shortId3(run.id)
              ] }, run.id))
            ] })
          ] }, item.id);
        }),
        humanActivity.possiblyTruncated && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { children: "\u8BC4\u8BBA\u53EF\u80FD\u8D85\u8FC7\u8BFB\u53D6\u4E0A\u9650\uFF0C\u4EBA\u5458\u53C2\u4E0E\u8BB0\u5F55\u53EF\u80FD\u4E0D\u5B8C\u6574\u3002" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "mm-muted", children: "\u4EC5\u5C55\u793A\u8BE5\u4EFB\u52A1\u5DF2\u8BFB\u53D6\u7684\u4EBA\u7C7B\u8BC4\u8BBA\uFF1B\u53EA\u6709\u8BC4\u8BBA ID \u4E0E\u8FD0\u884C\u89E6\u53D1 ID \u4E00\u81F4\u65F6\u624D\u6807\u8BB0\u89E6\u53D1\uFF0C\u5176\u4ED6\u8BC4\u8BBA\u4E0D\u63A8\u65AD\u8C03\u7528\u5173\u7CFB\u3002\u4EBA\u5458\u540D\u79F0\u672A\u63D0\u4F9B\u65F6\u663E\u793A ID\u3002" })
      ] })
    ] })
  ] });
}

// src/monitor-views.jsx
var import_react13 = __toESM(require("react"), 1);

// src/failure-diagnosis-view.jsx
var import_react11 = __toESM(require("react"), 1);

// src/failure-diagnosis.mjs
function diagnoseFailure(error) {
  if (typeof error !== "string" || !error.trim()) return null;
  if (/ECONNRESET/i.test(error)) return { title: "\u8FDE\u63A5\u4E2D\u9014\u88AB\u91CD\u7F6E", summary: "\u8FD0\u884C\u65F6\u7684\u7F51\u7EDC\u8FDE\u63A5\u610F\u5916\u65AD\u5F00\uFF0C\u5BFC\u81F4\u672C\u6B21\u8FD0\u884C\u5931\u8D25\u3002\u4EC5\u51ED\u8BE5\u9519\u8BEF\u65E0\u6CD5\u786E\u5B9A\u662F\u6A21\u578B\u670D\u52A1\u3001\u7F51\u5173\u3001\u4EE3\u7406\u8FD8\u662F\u7F51\u7EDC\u4E2D\u7684\u54EA\u4E00\u7AEF\u5173\u95ED\u4E86\u8FDE\u63A5\u3002", steps: "\u6838\u5BF9\u5931\u8D25\u65F6\u95F4\u9644\u8FD1\u7684\u8FD0\u884C\u65F6\u548C\u6A21\u578B\u7F51\u5173\u65E5\u5FD7\uFF0C\u68C0\u67E5\u670D\u52A1\u662F\u5426\u91CD\u542F\u3001\u8D85\u65F6\u6216\u4E3B\u52A8\u65AD\u5F00\uFF1B\u786E\u8BA4\u670D\u52A1\u6062\u590D\u540E\uFF0C\u518D\u7531\u4F60\u51B3\u5B9A\u662F\u5426\u91CD\u8BD5\u3002" };
  if (/not allowed for this API key|unauthorized|invalid.api.key/i.test(error)) return { title: "\u6A21\u578B\u8BBF\u95EE\u88AB\u62D2\u7EDD", summary: "\u670D\u52A1\u62D2\u7EDD\u4E86\u672C\u6B21\u6A21\u578B\u8BBF\u95EE\uFF1B\u53EF\u80FD\u662F\u5BC6\u94A5\u6743\u9650\u6216\u6A21\u578B\u6807\u8BC6\u4E0D\u5339\u914D\u3002", steps: "\u6838\u5BF9\u7F51\u5173\u5141\u8BB8\u7684\u6A21\u578B ID \u548C\u5BC6\u94A5\u6743\u9650\uFF0C\u518D\u51B3\u5B9A\u662F\u5426\u91CD\u8BD5\u3002" };
  if (/no.route|model unavailable/i.test(error)) return { title: "\u6A21\u578B\u8DEF\u7531\u4E0D\u53EF\u7528", summary: "\u670D\u52A1\u672A\u627E\u5230\u53EF\u7528\u7684\u6A21\u578B\u8DEF\u7531\u3002", steps: "\u68C0\u67E5\u6A21\u578B ID\u3001\u7F51\u5173\u8DEF\u7531\u53CA\u4E0A\u6E38\u670D\u52A1\u72B6\u6001\uFF0C\u518D\u51B3\u5B9A\u662F\u5426\u91CD\u8BD5\u3002" };
  return { title: "\u6682\u672A\u8BC6\u522B\u5177\u4F53\u539F\u56E0", summary: "\u670D\u52A1\u7AEF\u62A5\u544A\u8FD0\u884C\u5931\u8D25\uFF0C\u73B0\u6709\u9519\u8BEF\u4E0D\u8DB3\u4EE5\u786E\u5B9A\u539F\u56E0\u3002", steps: "\u67E5\u770B\u8BE5\u8FD0\u884C\u7684\u5B8C\u6574\u65E5\u5FD7\uFF0C\u7ED3\u5408\u8FD0\u884C\u65F6\u548C\u670D\u52A1\u7AEF\u65E5\u5FD7\u5B9A\u4F4D\u3002" };
}

// src/failure-diagnosis-view.jsx
var import_jsx_runtime10 = require("react/jsx-runtime");
function FailureDiagnosis({ error }) {
  const diagnosis = diagnoseFailure(error);
  if (!diagnosis) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "mm-diagnosis", children: [
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("strong", { children: [
      "\u5931\u8D25\u8BCA\u65AD\uFF1A",
      diagnosis.title
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { children: diagnosis.summary }),
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { children: diagnosis.steps }),
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("details", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("summary", { children: "\u67E5\u770B\u539F\u59CB\u9519\u8BEF" }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "mm-evidence", children: error })
    ] })
  ] });
}

// src/work-progress-view.jsx
var import_react12 = __toESM(require("react"), 1);
var import_jsx_runtime11 = require("react/jsx-runtime");
var active3 = /* @__PURE__ */ new Set(["queued", "dispatched", "running", "waiting_local_directory", "deferred"]);
var labels = { pending: "\u5F85\u5904\u7406", in_progress: "\u8FDB\u884C\u4E2D", completed: "\u5DF2\u5B8C\u6210" };
var toolLabels = { Bash: "\u6267\u884C\u547D\u4EE4", Read: "\u8BFB\u53D6\u6587\u4EF6", Edit: "\u4FEE\u6539\u6587\u4EF6", Write: "\u5199\u5165\u6587\u4EF6", Glob: "\u67E5\u627E\u6587\u4EF6", Grep: "\u641C\u7D22\u5185\u5BB9", TaskCreate: "\u521B\u5EFA\u8BA1\u5212\u9879", TaskUpdate: "\u66F4\u65B0\u8BA1\u5212", TodoWrite: "\u66F4\u65B0\u6267\u884C\u6E05\u5355" };
var time3 = (value) => value && Number.isFinite(Date.parse(value)) ? new Date(value).toLocaleString("zh-CN", { hour12: false }) : "\u65F6\u95F4\u672A\u63D0\u4F9B";
function PlanCounts({ counts }) {
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("span", { className: "mm-plan-counts", children: [
    "\u5DF2\u5B8C\u6210 ",
    counts.completed,
    " \xB7 \u8FDB\u884C\u4E2D ",
    counts.inProgress,
    " \xB7 \u5F85\u5904\u7406 ",
    counts.pending,
    counts.unknown > 0 && ` \xB7 \u5F85\u6838\u5B9E ${counts.unknown}`
  ] });
}
function EvidenceButton({ evidence: evidence2, onEvidence, label = "\u67E5\u770B\u8BC1\u636E" }) {
  if (!Number.isInteger(evidence2?.seq) || evidence2.seq < 1) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("button", { type: "button", className: "mm-evidence-link", onClick: () => onEvidence(evidence2), "aria-label": `${label}\uFF0C\u65E5\u5FD7 ${evidence2.seq}`, children: [
    "\u65E5\u5FD7 #",
    evidence2.seq
  ] });
}
function RunProgressSummary({ run, onOpen }) {
  const work = run.workProgress;
  const current = active3.has(run.status) && !run.observationError && !run.logError ? work?.currentAction : null;
  const action = current || work?.latestAction;
  const counts = work?.counts;
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "mm-progress-summary", children: [
    action ? /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_jsx_runtime11.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("span", { className: "mm-muted", children: [
        current ? "\u7B49\u5F85\u5DE5\u5177\u7ED3\u679C" : "\u6700\u8FD1\u52A8\u4F5C",
        " \xB7 ",
        toolLabels[action.tool] || action.tool
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("strong", { className: "mm-action-preview", title: action.summary, children: action.summary }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("small", { children: time3(action.at) })
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { children: run.progress?.summary || (active3.has(run.status) ? "\u7B49\u5F85\u53EF\u8BC6\u522B\u7684\u5DE5\u4F5C\u8BB0\u5F55" : "\u5386\u53F2\u8FDB\u5C55\u53EF\u5728\u8BE6\u60C5\u4E2D\u8BFB\u53D6") }),
    counts?.total > 0 && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(PlanCounts, { counts }),
    active3.has(run.status) && /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("small", { children: [
      "\u8DDD\u6700\u8FD1\u53EF\u89C1\u8FDB\u5C55 ",
      run.silenceMs == null ? "\u672A\u77E5" : `${Math.max(0, Math.floor(run.silenceMs / 6e4))} \u5206\u949F`
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("button", { type: "button", className: "mm-evidence-link", onClick: onOpen, disabled: !run.issueId, children: "\u67E5\u770B\u8FDB\u5C55\u4E0E\u8BC1\u636E" }),
    run.logsCaughtUp === false && active3.has(run.status) && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("small", { children: "\u6B63\u5728\u8865\u9F50\u5386\u53F2\u8BB0\u5F55" })
  ] });
}
function WorkProgressView({ work, progress, onEvidence, loading, error }) {
  const action = work.currentAction || work.latestAction;
  const terminal = ["completed", "failed", "cancelled"].includes(work.runStatus);
  const uncertain = !terminal && !active3.has(work.runStatus);
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("section", { className: "mm-work-progress", "aria-label": "\u5DE5\u4F5C\u8FDB\u5C55", children: [
    /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "mm-section-heading", children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("h3", { children: "\u5DE5\u4F5C\u8FDB\u5C55" }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "mm-muted", children: work.lastEvidenceAt ? `\u6700\u8FD1\u8BC1\u636E ${time3(work.lastEvidenceAt)}` : "\u5C1A\u65E0\u5DE5\u4F5C\u8BB0\u5F55" })
    ] }),
    loading && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { role: "status", className: "mm-muted", children: "\u6B63\u5728\u8BFB\u53D6\u8BA1\u5212\u4E0E\u5DE5\u4F5C\u8BB0\u5F55\u2026" }),
    error && /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("p", { className: "mm-error", role: "alert", children: [
      error,
      "\uFF1B\u5DF2\u663E\u793A\u7684\u8FDB\u5C55\u4E3A\u4E0A\u6B21\u8BFB\u53D6\u7ED3\u679C\u3002"
    ] }),
    progress?.summary && /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "mm-reported-progress", children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("h4", { children: "\u670D\u52A1\u7AEF\u62A5\u544A" }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { children: progress.summary }),
      progress.step != null && /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("p", { className: "mm-muted", children: [
        "\u6B65\u9AA4 ",
        progress.step,
        progress.total != null ? ` / ${progress.total}` : ""
      ] })
    ] }),
    uncertain && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { className: "mm-muted", children: "\u5F53\u524D\u8FD0\u884C\u72B6\u6001\u6682\u4E0D\u53EF\u786E\u8BA4\uFF0C\u4EE5\u4E0B\u4FDD\u7559\u6700\u540E\u8BFB\u53D6\u7684\u5DE5\u4F5C\u8BB0\u5F55\u3002" }),
    action && /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "mm-current-action", children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "mm-section-heading", children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("h4", { children: !terminal && !uncertain && work.currentAction ? "\u7B49\u5F85\u5DE5\u5177\u7ED3\u679C" : "\u6700\u8FD1\u52A8\u4F5C" }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "mm-muted", children: toolLabels[action.tool] || action.tool })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { children: action.summary }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "mm-work-evidence", children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("time", { children: time3(action.at) }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(EvidenceButton, { evidence: action, onEvidence, label: "\u67E5\u770B\u6700\u8FD1\u52A8\u4F5C\u7684\u8BC1\u636E" }),
        action.resultSeq && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(EvidenceButton, { evidence: { seq: action.resultSeq }, onEvidence, label: "\u67E5\u770B\u5DE5\u5177\u8FD4\u56DE" })
      ] }),
      !terminal && !uncertain && work.pendingActions.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("details", { className: "mm-extra-actions", children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("summary", { children: [
          "\u8FD8\u6709 ",
          work.pendingActions.length - 1,
          " \u4E2A\u5DE5\u5177\u8C03\u7528\u672A\u8FD4\u56DE"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("ul", { children: work.pendingActions.filter((item) => item.callId !== work.currentAction?.callId).map((item) => /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { children: item.summary }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(EvidenceButton, { evidence: item, onEvidence })
        ] }, item.callId)) })
      ] })
    ] }),
    !loading && !action && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { className: "mm-muted", children: terminal ? "\u672C\u6B21\u8FD0\u884C\u5DF2\u7ED3\u675F\uFF0C\u672A\u8BFB\u5230\u53EF\u8BC6\u522B\u7684\u5DE5\u5177\u52A8\u4F5C\u3002" : uncertain ? "\u672A\u8BFB\u5230\u53EF\u8BC6\u522B\u7684\u5DE5\u5177\u52A8\u4F5C\u3002" : "\u5C1A\u65E0\u53EF\u8BC6\u522B\u7684\u5DE5\u5177\u52A8\u4F5C\uFF1B\u4E0D\u80FD\u636E\u6B64\u5224\u65AD\u5DE5\u4F5C\u5DF2\u505C\u6B62\u3002" }),
    work.latestStatement && /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("details", { className: "mm-agent-statement", children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("summary", { children: [
        "\u667A\u80FD\u4F53\u6700\u8FD1\u8BF4\u660E \xB7 ",
        time3(work.latestStatement.at)
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { children: work.latestStatement.text }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(EvidenceButton, { evidence: work.latestStatement, onEvidence, label: "\u67E5\u770B\u667A\u80FD\u4F53\u8BF4\u660E\u7684\u539F\u6587" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "mm-plan-heading", children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("h4", { children: "\u6267\u884C\u6E05\u5355" }),
      work.counts.total > 0 && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(PlanCounts, { counts: work.counts })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { className: "mm-muted mm-plan-source", children: "\u6765\u81EA\u667A\u80FD\u4F53\u7684\u8BA1\u5212\u66F4\u65B0\uFF0C\u5B8C\u6210\u6807\u8BB0\u4E0D\u4EE3\u8868\u4E1A\u52A1\u9A8C\u6536\u3002" }),
    work.items.length ? /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("ol", { className: "mm-work-items", children: work.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("li", { className: `mm-work-item ${labels[item.status] ? item.status : "unknown"}`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "mm-plan-status", children: labels[item.status] || "\u5F85\u6838\u5B9E" }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("strong", { children: item.title }),
        !labels[item.status] && /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("small", { children: [
          "\u539F\u72B6\u6001\uFF1A",
          item.status || "\u672A\u63D0\u4F9B"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "mm-work-evidence", children: [
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("time", { children: time3(item.evidence?.at) }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(EvidenceButton, { evidence: item.evidence, onEvidence, label: `\u67E5\u770B${item.title}\u7684\u8BC1\u636E` })
        ] })
      ] })
    ] }, item.id)) }) : !loading && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { className: "mm-plan-empty", children: "\u5C1A\u672A\u8BFB\u5230\u5DF2\u786E\u8BA4\u7684\u6267\u884C\u6E05\u5355\u3002\u53EF\u4EE5\u67E5\u770B\u6700\u8FD1\u52A8\u4F5C\u548C\u539F\u59CB\u65E5\u5FD7\u3002" }),
    terminal && work.items.some((item) => item.status !== "completed") && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { className: "mm-muted", children: "\u8FD0\u884C\u5DF2\u4E0D\u5728\u6D3B\u52A8\u72B6\u6001\uFF0C\u6E05\u5355\u4FDD\u7559\u6700\u540E\u4E0A\u62A5\u7ED3\u679C\uFF0C\u672A\u5C06\u672A\u5B8C\u6210\u9879\u81EA\u52A8\u6539\u4E3A\u5B8C\u6210\u3002" }),
    work.unconfirmedActions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("details", { className: "mm-unconfirmed", children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("summary", { children: [
        work.unconfirmedActions.length,
        " \u6761\u8BA1\u5212\u66F4\u65B0\u5F85\u6838\u5B9E"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("ul", { children: work.unconfirmedActions.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("li", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { children: item.summary }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("small", { children: item.reason }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(EvidenceButton, { evidence: item, onEvidence })
      ] }, `${item.seq}-${index}`)) })
    ] }),
    work.warnings.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("ul", { className: "mm-work-warnings", children: work.warnings.map((warning, index) => /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("li", { children: warning }, index)) })
  ] });
}

// src/monitor-views.jsx
var import_jsx_runtime12 = require("react/jsx-runtime");
var active4 = /* @__PURE__ */ new Set(["queued", "dispatched", "running", "waiting_local_directory", "deferred"]);
var date2 = (value) => value && Number.isFinite(Date.parse(value)) ? new Date(value).toLocaleString("zh-CN", { hour12: false }) : "\u2014";
var number = (value) => typeof value === "number" && Number.isFinite(value) ? value.toLocaleString("zh-CN", { maximumFractionDigits: 1 }) : "\u2014";
var latency = (value) => typeof value === "number" && Number.isFinite(value) && value < 1e3 ? `${Math.round(value)} \u6BEB\u79D2` : duration3(value);
var timeValue = (value) => Number.isFinite(Date.parse(value)) ? Date.parse(value) : 0;
var alertRank = (alert) => alert.acknowledged ? 2 : alert.severity === "critical" ? 0 : 1;
function duration3(value) {
  if (typeof value !== "number" || !Number.isFinite(value)) return "\u2014";
  const seconds = Math.floor(Math.max(0, value) / 1e3);
  return seconds < 60 ? `${seconds} \u79D2` : seconds < 3600 ? `${Math.floor(seconds / 60)} \u5206 ${seconds % 60} \u79D2` : `${Math.floor(seconds / 3600)} \u5C0F\u65F6 ${Math.floor(seconds % 3600 / 60)} \u5206`;
}
function RunsView({ monitor, issues = [], onSelect, Badge: Badge2, businessStatusLabel = (value) => value, issuesTruncated = false }) {
  const model = buildTaskGroups(issues, monitor.runs || [], { coverage: { issues: issuesTruncated ? "partial" : "complete", runs: "partial", dependencies: "unsupported" } });
  const byId = new Map(model.groups.map((group) => [group.id, group]));
  const activity = (id2) => {
    const group = byId.get(id2);
    return group.runs.filter((run) => active4.has(run.status)).length + group.children.reduce((sum, child) => sum + activity(child), 0);
  };
  const ordered = (ids) => [...ids].sort((a, b) => activity(b) - activity(a));
  const renderGroup = (id2, depth = 0) => {
    const group = byId.get(id2), issue = group.issue, issueId = issue?.id || group.issueId;
    const title = issue?.title || group.runs[0]?.issueTitle || "\u4E1A\u52A1\u4EFB\u52A1\u4FE1\u606F\u672A\u52A0\u8F7D";
    const count = group.runs.filter((run) => active4.has(run.status)).length;
    return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("section", { className: `mm-task-group ${depth ? "mm-task-child" : ""}`, "aria-label": `${issue?.identifier || "\u5173\u8054\u4EFB\u52A1"} ${title}`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("header", { className: "mm-task-heading", children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("button", { className: "mm-issue-button", onClick: () => onSelect(issueId), disabled: !issueId, children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("span", { children: [
            depth ? "\u5B50\u4EFB\u52A1 \xB7 " : "",
            issue?.identifier || issueId?.slice(-8) || "\u4EFB\u52A1\u5F52\u5C5E\u672A\u77E5"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("strong", { children: title })
        ] }),
        issue && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(Badge2, { status: issue.status, label: businessStatusLabel(issue.status) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "mm-task-counts", children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("span", { children: [
          "\u5DF2\u89C2\u6D4B ",
          group.runs.length,
          " \u6B21\u8FD0\u884C"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("span", { children: [
          group.agentGroups.filter((agent) => agent.identityKnown).length,
          " \u540D\u667A\u80FD\u4F53"
        ] }),
        count > 0 && /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("strong", { children: [
          "\u6D3B\u52A8 ",
          count
        ] }),
        group.children.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("span", { children: [
          "\u5DF2\u52A0\u8F7D ",
          group.children.length,
          " \u4E2A\u5B50\u4EFB\u52A1"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("button", { className: "mm-text-button", disabled: !issueId, onClick: () => onSelect(issueId), children: "\u5173\u7CFB\u4E0E\u5B8C\u6574\u8FD0\u884C\u5386\u53F2" })
      ] }),
      group.parent.status === "missing" && /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("p", { className: "mm-muted mm-parent-note", children: [
        "\u7236\u4EFB\u52A1\u672A\u5728\u5F53\u524D\u5217\u8868\uFF1A",
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("button", { className: "mm-text-button", onClick: () => onSelect(group.parent.id), children: [
          "\u67E5\u770B\u7236\u4EFB\u52A1 ",
          group.parent.id.slice(-8)
        ] })
      ] }),
      group.parent.status === "cycle" && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: "mm-error-text mm-parent-note", children: "\u7236\u5B50\u5173\u7CFB\u51FA\u73B0\u5FAA\u73AF\uFF0C\u5DF2\u505C\u6B62\u5D4C\u5957\u5C55\u793A\u3002" }),
      group.parent.status === "unknown" && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: "mm-muted mm-parent-note", children: "\u7236\u5B50\u5173\u7CFB\u5C1A\u672A\u786E\u8BA4\u3002" }),
      group.stage.known && group.stage.value !== null && /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("p", { className: "mm-muted mm-parent-note", children: [
        "\u7236\u4EFB\u52A1\u4E2D\u7684\u9636\u6BB5 ",
        group.stage.value,
        " \xB7 \u9636\u6BB5\u7F16\u53F7\u4E0D\u4EE3\u8868\u4E32\u884C\u4F9D\u8D56"
      ] }),
      group.agentGroups.map((agent) => /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("section", { className: "mm-agent-group", "aria-label": agent.agentName || "\u667A\u80FD\u4F53\u672A\u63D0\u4F9B", children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("h3", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(AgentAvatar, { name: agent.agentName, size: 21 }),
          agent.agentName || "\u667A\u80FD\u4F53\u672A\u63D0\u4F9B",
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("span", { children: [
            agent.runs.length,
            " \u6B21\u89C2\u6D4B\u8FD0\u884C"
          ] })
        ] }),
        [...agent.runs].sort((a, b) => Number(active4.has(b.status)) - Number(active4.has(a.status)) || (Date.parse(b.createdAt) || 0) - (Date.parse(a.createdAt) || 0)).map((run) => /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "mm-grouped-run", children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "mm-grouped-run-meta", children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("button", { className: "mm-text-button mm-run-id", onClick: () => onSelect(issueId, run.id), disabled: !issueId, children: [
              "\u8FD0\u884C ",
              run.id.slice(-8)
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(Badge2, { status: run.status }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("span", { className: "mm-muted mm-numeric", children: [
              "\u8017\u65F6 ",
              duration3(run.elapsedMs)
            ] }),
            run.queueMs > 0 && /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("span", { className: "mm-muted mm-numeric", children: [
              "\u6392\u961F ",
              duration3(run.queueMs)
            ] })
          ] }),
          run.observationError || run.logError ? /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: "mm-error-text", children: run.observationError || run.logError }) : null,
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(RunProgressSummary, { run, onOpen: issueId ? () => onSelect(issueId, run.id) : void 0 })
        ] }, run.id))
      ] }, agent.id)),
      !group.runs.length && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: "mm-muted mm-parent-note", children: "\u672C\u6B21\u76D1\u63A7\u5C1A\u672A\u89C2\u6D4B\u5230\u8FD0\u884C\uFF1B\u53EF\u6253\u5F00\u4EFB\u52A1\u5386\u53F2\u6838\u5B9E\u3002" }),
      group.children.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "mm-task-children", children: ordered(group.children).map((child) => renderGroup(child, depth + 1)) })
    ] }, id2);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "mm-list mm-task-list", children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "mm-section-heading", children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("h2", { children: "\u4EFB\u52A1\u4E0E\u534F\u4F5C" }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "mm-muted", children: monitor.enabled ? "\u5BBF\u4E3B\u6301\u7EED\u91C7\u96C6" : "\u6301\u7EED\u91C7\u96C6\u5DF2\u6682\u505C" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: "mm-muted mm-group-scope", children: "\u6309\u4E1A\u52A1\u4EFB\u52A1\u5F52\u7EC4\uFF0C\u8FD0\u884C\u5217\u5728\u5BF9\u5E94\u667A\u80FD\u4F53\u4E0B\u9762\u3002\u8FD9\u91CC\u663E\u793A\u6700\u8FD1\u4EFB\u52A1\u4E0E\u672C\u6B21\u89C2\u6D4B\u8BB0\u5F55\uFF1B\u5B8C\u6574\u5386\u53F2\u548C\u5E76\u884C\u65F6\u95F4\u7EBF\u5728\u4EFB\u52A1\u8BE6\u60C5\u4E2D\u3002" }),
    ordered(model.roots).map((id2) => renderGroup(id2)),
    !model.groups.length && /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "mm-empty", children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("h3", { children: "\u5F53\u524D\u6CA1\u6709\u53EF\u5C55\u793A\u7684\u4EFB\u52A1" }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { children: "\u9009\u62E9\u5DE5\u4F5C\u533A\u5E76\u5F00\u59CB\u91C7\u96C6\u540E\uFF0C\u8FD9\u91CC\u4F1A\u5C55\u793A\u4EFB\u52A1\u3001\u534F\u4F5C\u6210\u5458\u4E0E\u8FD0\u884C\u8FDB\u5C55\u3002" })
    ] }),
    issuesTruncated || model.coverage.missingParents || model.coverage.cyclicParents ? /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: "mm-muted mm-list-note", children: "\u5F53\u524D\u5217\u8868\u6700\u591A 100 \u4E2A\u4E1A\u52A1\u4EFB\u52A1\uFF0C\u90E8\u5206\u5C42\u7EA7\u53EF\u80FD\u672A\u52A0\u8F7D\u3002\u6253\u5F00\u4EFB\u52A1\u53EF\u8BFB\u53D6\u76F4\u63A5\u7236\u5B50\u5173\u7CFB\u3002" }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: "mm-muted mm-list-note", children: "\u6267\u884C\u6E05\u5355\u5C5E\u4E8E\u5355\u6B21\u8FD0\u884C\uFF0C\u4E0D\u4F5C\u4E3A\u4E1A\u52A1\u5B50\u4EFB\u52A1\u3002\u5B8C\u6210\u9879\u6570\u4E0D\u7B49\u4E8E\u6574\u4F53\u5B8C\u6210\u6BD4\u4F8B\u3002" })
  ] });
}
function AlertsView({ scopedIssueId = "", onClearScope, monitor, api, onSelect, onUpdate, settings = {}, issues = [], agents = [], onSettingsSaved }) {
  const [error, setError] = (0, import_react13.useState)(""), [busy, setBusy] = (0, import_react13.useState)(""), [editing, setEditing] = (0, import_react13.useState)(false), [saving, setSaving] = (0, import_react13.useState)(false), [settingsError, setSettingsError] = (0, import_react13.useState)("");
  const alerts = [...monitor.alerts || []].filter((alert) => !scopedIssueId || alert.issueId === scopedIssueId).sort((a, b) => Number(Boolean(a.resolvedAt || a.historical)) - Number(Boolean(b.resolvedAt || b.historical)) || alertRank(a) - alertRank(b) || timeValue(b.createdAt) - timeValue(a.createdAt));
  const acknowledge = async (id2) => {
    setBusy(id2);
    setError("");
    try {
      onUpdate(await api("acknowledgeAlert", { alertId: id2 }));
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy("");
    }
  };
  const current = alerts.filter((alert) => !alert.historical && !alert.resolvedAt);
  const currentFailedRuns = new Set(current.filter((alert) => alert.kind === "failed").map((alert) => alert.taskId));
  const historicalFailures = (Array.isArray(monitor.historicalFailures) ? monitor.historicalFailures : []).filter((failure) => failure && failure.runId && (!scopedIssueId || failure.issueId === scopedIssueId) && !currentFailedRuns.has(failure.runId));
  const historicalGroups = [...historicalFailures.reduce((groups, failure) => {
    const diagnosis = diagnoseFailure(failure.error);
    const cause = diagnosis?.title || "\u9519\u8BEF\u672A\u63D0\u4F9B";
    const key = JSON.stringify([failure.issueId || failure.runId, cause === "\u6682\u672A\u8BC6\u522B\u5177\u4F53\u539F\u56E0" || cause === "\u9519\u8BEF\u672A\u63D0\u4F9B" ? failure.error || failure.runId : cause]);
    if (!groups.has(key)) groups.set(key, { key, issueId: failure.issueId, cause, failures: [] });
    groups.get(key).failures.push(failure);
    return groups;
  }, /* @__PURE__ */ new Map()).values()].map((group) => ({ ...group, failures: group.failures.sort((a, b) => timeValue(b.failedAt || b.discoveredAt) - timeValue(a.failedAt || a.discoveredAt)) })).sort((a, b) => timeValue(b.failures[0]?.failedAt || b.failures[0]?.discoveredAt) - timeValue(a.failures[0]?.failedAt || a.failures[0]?.discoveredAt));
  const historicalRunIds = new Set(historicalFailures.map((failure) => failure.runId));
  const historyCoverage = monitor.failureHistoryCoverage;
  const past = alerts.filter((alert) => (alert.historical || alert.resolvedAt) && !(alert.kind === "failed" && historicalRunIds.has(alert.taskId)));
  const threshold3 = (name) => Number.isFinite(settings[name]) ? `${settings[name]} \u5206\u949F` : "\u672A\u63D0\u4F9B";
  const blindRuns = (monitor.runs || []).filter((run) => run.status === "running" && (!scopedIssueId || run.issueId === scopedIssueId) && run.workProgress?.warnings?.includes("\u90E8\u5206\u5DE5\u5177\u7F3A\u5C11\u53EF\u5173\u8054\u7684\u8C03\u7528\u6807\u8BC6"));
  const rules = [
    ["\u8D85\u957F\u8FD0\u884C\u5173\u6CE8", `\u8FD0\u884C\u4E2D\uFF0C\u670D\u52A1\u7AEF\u5F00\u59CB\u65F6\u95F4\u8DDD\u4ECA\u8FBE\u5230 ${threshold3("runMinutes")}`, "\u8017\u65F6\u957F\u4E0D\u4EE3\u8868\u6545\u969C"],
    ["\u957F\u65F6\u95F4\u65E0\u8FDB\u5C55", `\u8FD0\u884C\u4E2D\u8FDE\u7EED ${threshold3("noProgressMinutes")} \u672A\u89C2\u5BDF\u5230\u65B0\u65E5\u5FD7\u3001\u72B6\u6001\u53D8\u5316\u6216\u8FDB\u5EA6\u4E8B\u4EF6`, "\u65E5\u5FD7\u672A\u8FFD\u5E73\u3001\u8BFB\u53D6\u5931\u8D25\u6216\u8FD0\u884C\u65F6\u79BB\u7EBF\u65F6\u4E0D\u5224\u65AD"],
    ["\u5DE5\u5177\u8C03\u7528\u7B49\u5F85", `\u5DF2\u89C2\u5BDF ${threshold3("toolMinutes")} \u672A\u6536\u5230\u76F8\u540C\u8C03\u7528\u6807\u8BC6\u7684\u7ED3\u679C`, "\u65E0\u8C03\u7528\u6807\u8BC6\u7684\u5DE5\u5177\u65E0\u6CD5\u8BA1\u65F6\uFF1B\u65E5\u5FD7\u672A\u8FFD\u5E73\u3001\u8BFB\u53D6\u5931\u8D25\u6216\u8FD0\u884C\u65F6\u79BB\u7EBF\u65F6\u4E0D\u5224\u65AD"],
    ["\u6392\u961F\u65F6\u95F4\u8F83\u957F", `\u8FDB\u5165\u76D1\u63A7\u540E\u6301\u7EED\u7B49\u5F85\u8FBE\u5230 ${threshold3("queueMinutes")}`, "\u4ECE\u5F00\u59CB\u89C2\u5BDF\u7B49\u5F85\u72B6\u6001\u8BA1\u65F6"],
    ["\u8FD0\u884C\u5931\u8D25", "\u76D1\u63A7\u671F\u95F4\u786E\u8BA4\u8FD0\u884C\u8FDB\u5165\u5931\u8D25\u72B6\u6001", "\u542F\u52A8\u524D\u7684\u5931\u8D25\u5355\u72EC\u4F5C\u4E3A\u5386\u53F2\u8BB0\u5F55\u5C55\u793A"],
    ["\u8FD0\u884C\u65F6\u79BB\u7EBF", "\u6D3B\u52A8\u8FD0\u884C\u5173\u8054\u7684\u8FD0\u884C\u65F6\u72B6\u6001\u4E3A\u79BB\u7EBF", "\u79BB\u7EBF\u4E0D\u7B49\u4E8E\u4EFB\u52A1\u5931\u8D25"]
  ];
  const renderAlert = (alert) => {
    const run = (monitor.runs || []).find((item) => item.id === alert.taskId && (!alert.issueId || item.issueId === alert.issueId));
    const issueId = alert.issueId || run?.issueId;
    const issue = issues.find((item) => item.id === issueId);
    const agent = agents.find((item) => item.id === run?.agentId);
    const issueName = issue ? [issue.identifier, issue.title].filter(Boolean).join(" \xB7 ") : run?.issueTitle || "\u4EFB\u52A1\u4FE1\u606F\u672A\u63D0\u4F9B";
    const agentName = run?.agentName || agent?.name || "\u667A\u80FD\u4F53\u672A\u63D0\u4F9B";
    return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("article", { className: `mm-alert ${alert.resolvedAt || alert.historical ? "is-past" : ""}`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "mm-section-heading", children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("h3", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: `mm-alert-dot ${alert.severity === "critical" ? "critical" : ""}` }),
          alert.title
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "mm-badge", children: alert.resolvedAt ? "\u89E6\u53D1\u6761\u4EF6\u5DF2\u6D88\u5931" : alert.historical ? "\u5386\u53F2\u63D0\u9192 \xB7 \u5F53\u524D\u672A\u590D\u6838" : alert.verificationWarning ? "\u6682\u65E0\u6CD5\u590D\u6838" : alert.acknowledged ? "\u5DF2\u9605 \xB7 \u4ECD\u5728\u89C2\u5BDF" : alert.severity === "critical" ? "\u4E25\u91CD \xB7 \u5F85\u5173\u6CE8" : "\u5F85\u5173\u6CE8" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("p", { className: "mm-alert-context", children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("strong", { children: issueName }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("span", { className: "ui-agent-label", children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(AgentAvatar, { name: agentName, size: 19 }),
          agentName
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("span", { children: [
          "\u8FD0\u884C ID\uFF1A",
          alert.taskId || "\u672A\u63D0\u4F9B"
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("p", { className: "mm-muted", children: [
        "\u89E6\u53D1\u65F6\u95F4 ",
        date2(alert.createdAt)
      ] }),
      alert.verificationWarning && !alert.resolvedAt && !alert.historical && /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("p", { className: "mm-alert-verification", role: "status", children: [
        "\u6682\u65E0\u6CD5\u590D\u6838\uFF1A",
        alert.verificationWarning
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("ul", { className: "mm-evidence", children: alert.evidence?.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("li", { children: item }, i)) }),
      alert.kind === "failed" && run?.error && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(FailureDiagnosis, { error: run.error }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "mm-diagnosis", children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("span", { className: "mm-eyebrow", children: [
          alert.diagnosis?.source === "model" ? "AI \u8BCA\u65AD\u5EFA\u8BAE" : "\u89C4\u5219\u8BCA\u65AD",
          alert.diagnosis?.status === "pending" ? " \xB7 \u7B49\u5F85 AI \u5206\u6790" : ""
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { children: alert.diagnosis?.source === "model" ? alert.diagnosis.summary : alert.suggestion }),
        alert.diagnosis?.reason && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: "mm-muted", children: alert.diagnosis.reason }),
        alert.diagnosis?.model && /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("p", { className: "mm-muted", children: [
          "\u6A21\u578B\uFF1A",
          alert.diagnosis.model
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "mm-actions", children: [
        alert.issueId && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("button", { onClick: () => onSelect(alert.issueId, alert.taskId), children: "\u67E5\u770B\u4EFB\u52A1\u4E0E\u65E5\u5FD7" }),
        !alert.acknowledged && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("button", { disabled: Boolean(busy), onClick: () => void acknowledge(alert.id), children: busy === alert.id ? "\u6B63\u5728\u6807\u8BB0\u2026" : "\u6807\u4E3A\u5DF2\u9605" })
      ] })
    ] }, alert.id);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "mm-list mm-alert-list", children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "mm-section-heading", children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("h2", { children: "\u5F02\u5E38\u63D0\u9192" }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "mm-muted", children: "\u4FDD\u7559\u6700\u8FD1 200 \u6761\u63D0\u9192" })
    ] }),
    scopedIssueId && /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "mm-alert-scope", children: [
      "\u4EC5\u67E5\u770B ",
      issues.find((issue) => issue.id === scopedIssueId)?.identifier || scopedIssueId,
      " \u7684\u63D0\u9192 ",
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("button", { onClick: onClearScope, children: "\u67E5\u770B\u5168\u90E8\u4EFB\u52A1" })
    ] }),
    error && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: "mm-error", role: "alert", children: error }),
    monitor.journalError && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: "mm-error", role: "alert", children: monitor.journalError }),
    blindRuns.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("section", { className: "mm-alert-verification", "aria-label": "\u76D1\u63A7\u8986\u76D6\u7F3A\u53E3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("strong", { children: "\u5DE5\u5177\u8017\u65F6\u68C0\u6D4B\u5B58\u5728\u76F2\u533A" }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("p", { children: [
        blindRuns.length,
        " \u6B21\u8FD0\u884C\u7684\u90E8\u5206\u5DE5\u5177\u65E5\u5FD7\u7F3A\u5C11\u8C03\u7528\u6807\u8BC6\uFF0C\u65E0\u6CD5\u53EF\u9760\u8BA1\u7B97\u8FD9\u4E9B\u5DE5\u5177\u7684\u8017\u65F6\u6216\u89E6\u53D1\u5DE5\u5177\u7B49\u5F85\u63D0\u9192\u3002\u8FD0\u884C\u603B\u8017\u65F6\u3001\u8FD0\u884C\u5931\u8D25\u548C\u65E5\u5FD7\u66F4\u65B0\u4ECD\u53EF\u76D1\u63A7\u3002"
      ] }),
      blindRuns.map((run) => /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("button", { onClick: () => onSelect(run.issueId, run.id), children: [
        issues.find((issue) => issue.id === run.issueId)?.identifier || "\u4EFB\u52A1",
        " \xB7 ",
        run.agentName || "\u667A\u80FD\u4F53",
        " \xB7 \u67E5\u770B\u65E5\u5FD7"
      ] }, run.id))
    ] }),
    current.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("section", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("h3", { className: "mm-alert-group-title", children: [
        "\u5F53\u524D\u63D0\u9192 \xB7 ",
        current.length
      ] }),
      current.map(renderAlert)
    ] }),
    (monitor.error || monitor.journalError) && /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "mm-alert-current-state mm-alert-verification", role: "status", children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("strong", { children: "\u5F53\u524D\u63D0\u9192\u5F85\u6838\u5B9E" }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { children: "\u63D0\u9192\u8BB0\u5F55\u8BFB\u53D6\u4E0D\u5B8C\u6574\uFF0C\u4E0D\u80FD\u636E\u6B64\u5224\u65AD\u5F53\u524D\u6CA1\u6709\u5F02\u5E38\u3002\u68C0\u67E5\u8FDE\u63A5\uFF0C\u7B49\u5F85\u4E0B\u6B21\u540C\u6B65\uFF1B\u4ECD\u5931\u8D25\u65F6\u53EF\u5728\u8FDE\u63A5\u8BBE\u7F6E\u4E2D\u91CD\u8FDE\u3002" })
    ] }),
    !current.length && !monitor.error && !monitor.journalError && monitor.enabled === false && /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "mm-alert-current-state mm-empty", children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("h3", { children: "\u6301\u7EED\u76D1\u63A7\u5DF2\u6682\u505C" }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { children: "\u6062\u590D\u91C7\u96C6\u540E\u624D\u80FD\u7EE7\u7EED\u786E\u8BA4\u5F53\u524D\u5F02\u5E38\u3002" })
    ] }),
    !current.length && !monitor.error && !monitor.journalError && monitor.enabled !== false && /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "mm-alert-current-state mm-empty", children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("h3", { children: "\u5F53\u524D\u65E0\u5F02\u5E38\u63D0\u9192" }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { children: "\u672C\u6B21\u5DF2\u8BFB\u53D6\u7684\u63D0\u9192\u4E2D\u6CA1\u6709\u5F85\u5904\u7406\u9879\uFF1B\u5386\u53F2\u5931\u8D25\u4E0E\u5DF2\u6062\u590D\u63D0\u9192\u5217\u5728\u4E0B\u65B9\u3002" })
    ] }),
    (historicalFailures.length > 0 || historyCoverage) && /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("section", { "aria-label": "\u5386\u53F2\u8FD0\u884C\u5931\u8D25", children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("h3", { className: "mm-alert-group-title", children: [
        "\u5386\u53F2\u8FD0\u884C\u5931\u8D25 \xB7 ",
        historicalFailures.length
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: "mm-muted mm-list-note", children: "\u6309\u6700\u8FD1 100 \u4E2A\u4E1A\u52A1\u4EFB\u52A1\u5206\u6279\u8865\u91C7\uFF0C\u6BCF\u4E2A\u4EFB\u52A1\u6700\u591A\u8BFB\u53D6 500 \u6B21\u8FD0\u884C\u3001\u4FDD\u7559\u6700\u8FD1 50 \u6B21\u5931\u8D25\uFF0C\u5386\u53F2\u5931\u8D25\u5408\u8BA1\u6700\u591A\u4FDD\u7559 500 \u6761\uFF1B\u53D1\u73B0\u65F6\u95F4\u4E0D\u662F\u5931\u8D25\u53D1\u751F\u65F6\u95F4\u3002\u8865\u91C7\u672A\u5B8C\u6210\u6216\u8BFB\u53D6\u5931\u8D25\u65F6\uFF0C\u7ED3\u679C\u53EF\u80FD\u4E0D\u5B8C\u6574\u3002" }),
      historyCoverage && /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "mm-muted mm-list-note", role: "status", children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("p", { children: [
          "\u5386\u53F2\u8865\u91C7\uFF1A\u6210\u529F\u8BFB\u53D6 ",
          number(historyCoverage.checkedIssues),
          " / ",
          number(historyCoverage.totalIssues),
          " \u4E2A\u4EFB\u52A1",
          Number.isFinite(historyCoverage.checkedIssues) && Number.isFinite(historyCoverage.failedIssues) && Number.isFinite(historyCoverage.totalIssues) && historyCoverage.checkedIssues + historyCoverage.failedIssues < historyCoverage.totalIssues ? " \xB7 \u6B63\u5728\u5206\u6279\u8865\u91C7" : ""
        ] }),
        historyCoverage.failedIssues > 0 && /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("p", { children: [
          number(historyCoverage.failedIssues),
          " \u4E2A\u4EFB\u52A1\u8BFB\u53D6\u5931\u8D25\uFF0C\u5386\u53F2\u7ED3\u679C\u4E0D\u5B8C\u6574\u3002"
        ] }),
        historyCoverage.conflictingIssues > 0 && /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("p", { children: [
          number(historyCoverage.conflictingIssues),
          " \u4E2A\u4EFB\u52A1\u7684\u8FD0\u884C\u72B6\u6001\u5B58\u5728\u51B2\u7A81\uFF0C\u5931\u8D25\u8BB0\u5F55\u6682\u4E0D\u786E\u8BA4\u3002"
        ] }),
        historyCoverage.truncatedIssues > 0 && /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("p", { children: [
          number(historyCoverage.truncatedIssues),
          " \u4E2A\u4EFB\u52A1\u7684\u8FD0\u884C\u5386\u53F2\u5DF2\u622A\u65AD\u6216\u5931\u8D25\u8BB0\u5F55\u8D85\u8FC7\u5355\u4EFB\u52A1 50 \u6761\u4E0A\u9650\uFF0C\u5386\u53F2\u7ED3\u679C\u4E0D\u5B8C\u6574\u3002"
        ] }),
        historyCoverage.failuresTruncated && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { children: "\u5386\u53F2\u5931\u8D25\u8BB0\u5F55\u8D85\u8FC7\u603B\u6570 500 \u6761\u4E0A\u9650\uFF0C\u90E8\u5206\u8BB0\u5F55\u672A\u5C55\u793A\u3002" }),
        historyCoverage.issuesTruncated && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { children: "\u4E1A\u52A1\u4EFB\u52A1\u5217\u8868\u5DF2\u622A\u65AD\uFF0C\u672A\u8986\u76D6\u5168\u90E8\u4EFB\u52A1\u3002" })
      ] }),
      !historicalFailures.length && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: "mm-muted", children: "\u5C1A\u672A\u8BFB\u5230\u5386\u53F2\u5931\u8D25\uFF0C\u8865\u91C7\u53EF\u80FD\u4ECD\u5728\u8FDB\u884C\u3002" }),
      historicalGroups.map((group) => {
        const issue = issues.find((item) => item.id === group.issueId);
        const issueName = issue ? [issue.identifier, issue.title].filter(Boolean).join(" \xB7 ") : "\u4EFB\u52A1\u4FE1\u606F\u672A\u63D0\u4F9B";
        const latest = group.failures[0];
        return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("details", { className: "mm-history-group", children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("summary", { className: "mm-history-group-summary", children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("strong", { children: issueName }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { children: group.cause }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("span", { children: [
              group.failures.length,
              " \u6B21\u5931\u8D25"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("time", { children: [
              "\u6700\u8FD1\u5931\u8D25 ",
              date2(latest.failedAt) === "\u2014" ? "\u65F6\u95F4\u672A\u63D0\u4F9B" : date2(latest.failedAt)
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "mm-history-group-body", children: group.failures.map((failure) => {
            const agent = agents.find((item) => item.id === failure.agentId);
            return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("article", { className: "mm-alert mm-alert-historical", children: [
              /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "mm-section-heading", children: [
                /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("h3", { children: [
                  "\u8FD0\u884C ",
                  failure.runId.slice(-8)
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "mm-badge", children: "\u5386\u53F2\u5931\u8D25\uFF08\u670D\u52A1\u7AEF\u786E\u8BA4\uFF09" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("p", { className: "mm-alert-context", children: [
                /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("strong", { children: issueName }),
                /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("span", { className: "ui-agent-label", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(AgentAvatar, { name: failure.agentName || agent?.name, size: 19 }),
                  failure.agentName || agent?.name || "\u667A\u80FD\u4F53\u672A\u63D0\u4F9B"
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("span", { children: [
                  "\u8FD0\u884C ID\uFF1A",
                  failure.runId
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("p", { className: "mm-muted", children: [
                "\u5931\u8D25\u65F6\u95F4\uFF08\u670D\u52A1\u7AEF\u7ED3\u675F\u65F6\u95F4\uFF09\uFF1A",
                date2(failure.failedAt) === "\u2014" ? "\u672A\u63D0\u4F9B" : date2(failure.failedAt),
                " \xB7 \u53D1\u73B0\u65F6\u95F4\uFF1A",
                date2(failure.discoveredAt) === "\u2014" ? "\u672A\u63D0\u4F9B" : date2(failure.discoveredAt)
              ] }),
              failure.error && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(FailureDiagnosis, { error: failure.error }),
              failure.issueId && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "mm-actions", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("button", { onClick: () => onSelect(failure.issueId, failure.runId), children: "\u67E5\u770B\u4EFB\u52A1\u4E0E\u65E5\u5FD7" }) })
            ] }, failure.runId);
          }) })
        ] }, group.key);
      })
    ] }),
    past.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("section", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("h3", { className: "mm-alert-group-title", children: [
        "\u5386\u53F2\u4E0E\u5DF2\u6062\u590D \xB7 ",
        past.length
      ] }),
      past.map((alert) => /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("details", { className: "mm-history-group", children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("summary", { className: "mm-history-group-summary", children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("strong", { children: alert.title }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { children: alert.resolvedAt ? "\u5DF2\u6062\u590D" : "\u5F53\u524D\u672A\u590D\u6838" }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("time", { children: date2(alert.createdAt) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "mm-history-group-body", children: renderAlert(alert) })
      ] }, alert.id))
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("details", { className: "mm-alert-rules", "aria-label": "\u5F02\u5E38\u63D0\u9192\u89C4\u5219", children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("summary", { className: "mm-alert-rules-summary", children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("strong", { children: "\u76D1\u63A7\u89C4\u5219\u4E0E\u9608\u503C" }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("span", { children: [
          rules.length,
          " \u6761\u89C4\u5219 \xB7 ",
          monitor.enabled ? "\u6301\u7EED\u76D1\u63A7\u5DF2\u5F00\u542F" : "\u6301\u7EED\u76D1\u63A7\u5DF2\u6682\u505C"
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "mm-alert-rules-body", children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "mm-alert-rules-head", children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "mm-muted", children: "\u89E6\u53D1\u6761\u4EF6\u4E0E\u4E0D\u5224\u65AD\u7684\u60C5\u51B5" }),
          onSettingsSaved && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("button", { type: "button", onClick: () => {
            setEditing((value) => !value);
            setSettingsError("");
          }, children: editing ? "\u6536\u8D77\u9608\u503C\u8BBE\u7F6E" : "\u8C03\u6574\u9608\u503C" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "mm-alert-rule-list", children: rules.map(([name, condition, note]) => /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "mm-alert-rule", children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("strong", { children: name }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { children: condition }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("small", { children: note })
          ] })
        ] }, name)) }),
        editing && /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("form", { className: "mm-alert-rule-form", onSubmit: async (event) => {
          event.preventDefault();
          const form = event.currentTarget;
          const fields = ["noProgressMinutes", "toolMinutes", "queueMinutes", "runMinutes"];
          const values = Object.fromEntries(fields.map((key) => [key, Number(form.elements[key].value)]));
          setSaving(true);
          setSettingsError("");
          try {
            await onSettingsSaved(await api("saveSettings", values));
            setEditing(false);
          } catch (error2) {
            setSettingsError(error2?.message || "\u4FDD\u5B58\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5");
          } finally {
            setSaving(false);
          }
        }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "mm-form-grid", children: [["runMinutes", "\u8FD0\u884C\u603B\u8017\u65F6"], ["noProgressMinutes", "\u65E0\u8FDB\u5C55"], ["toolMinutes", "\u5DE5\u5177\u7B49\u5F85"], ["queueMinutes", "\u6392\u961F\u7B49\u5F85"]].map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("label", { children: [
            label,
            " \xB7 \u5206\u949F",
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("input", { type: "number", name: key, min: "1", max: "1440", required: true, defaultValue: settings[key] })
          ] }, key)) }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: "mm-muted", children: "\u4FDD\u5B58\u4EC5\u4FEE\u6539\u63D0\u9192\u9608\u503C\uFF1B\u53D6\u503C\u4E3A 1\u20131440 \u5206\u949F\u3002" }),
          settingsError && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: "mm-error", role: "alert", children: settingsError }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "mm-actions", children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("button", { className: "mm-primary", type: "submit", disabled: saving, children: saving ? "\u6B63\u5728\u4FDD\u5B58\u2026" : "\u4FDD\u5B58\u9608\u503C" }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("button", { type: "button", disabled: saving, onClick: () => setEditing(false), children: "\u53D6\u6D88" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: "mm-muted mm-alert-rule-note", children: "\u89C4\u5219\u8986\u76D6\u5F53\u524D\u6700\u591A 100 \u6B21\u88AB\u8FFD\u8E2A\u8FD0\u884C\uFF1B\u53D6\u6D88\u6216\u91CD\u8DD1\u9700\u8981\u4EBA\u5DE5\u786E\u8BA4\u3002" })
      ] })
    ] })
  ] });
}
function MetricsView({ monitor, agents }) {
  const m = monitor.metrics || {}, tokens = m.tokens || {};
  const terminalSamples = Number.isFinite(m.sampleSize) ? m.sampleSize : 0;
  const durationSamples = Number.isFinite(m.durationSampleSize) ? m.durationSampleSize : 0;
  const queueSamples = Number.isFinite(m.queueSampleSize) ? m.queueSampleSize : 0;
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "mm-list mm-metrics-view", children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "mm-section-heading", children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("h2", { children: "\u6267\u884C\u6027\u80FD" }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("span", { className: "mm-muted", children: [
        "\u89C2\u6D4B\u5F00\u59CB\u4E8E ",
        date2(monitor.startedAt)
      ] })
    ] }),
    monitor.error && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: "mm-error", role: "alert", children: "\u672C\u6B21\u91C7\u96C6\u672A\u6210\u529F\uFF0C\u4EE5\u4E0B\u6570\u503C\u53EF\u80FD\u662F\u4E0A\u6B21\u5FEB\u7167\uFF1B\u8BF7\u68C0\u67E5\u8FDE\u63A5\u5E76\u7B49\u5F85\u91CD\u65B0\u540C\u6B65\u3002" }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("section", { className: "mm-metric-panel", "aria-label": "\u8FD0\u884C\u89C2\u6D4B\u6307\u6807", children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "mm-metric-coverage", role: "status", children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("strong", { children: terminalSamples > 0 ? `${number(terminalSamples)} \u6B21\u5DF2\u786E\u8BA4\u7EC8\u6001` : "\u6682\u65E0\u7EC8\u6001\u6837\u672C" }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("span", { children: [
          "\u672C\u6B21\u76D1\u63A7\u4ECE ",
          date2(monitor.startedAt),
          " \u5F00\u59CB\uFF1B\u542F\u52A8\u524D\u7684\u5386\u53F2\u7EC8\u6001\u4E0D\u8BA1\u5165\u8017\u65F6\u548C\u5931\u8D25\u7387\u3002"
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "mm-metrics mm-metrics-primary", children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { children: "\u5F53\u524D\u6D3B\u52A8\u8FD0\u884C" }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("strong", { children: number(m.active) }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("small", { children: [
            "\u6392\u961F ",
            number(m.queued),
            " \xB7 \u72B6\u6001\u5F85\u6838\u5B9E ",
            number(m.unknown)
          ] })
        ] }),
        terminalSamples > 0 && /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { children: "\u672C\u6B21\u5931\u8D25\u7387" }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("strong", { children: typeof m.failureRate === "number" ? `${number(m.failureRate * 100)}%` : "\u2014" }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("small", { children: [
            "\u5931\u8D25 ",
            number(m.failures),
            " / \u7EC8\u6001 ",
            number(m.sampleSize),
            " \xB7 \u53D6\u6D88 ",
            number(m.cancelled)
          ] })
        ] }),
        durationSamples > 0 && /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { children: "\u8FD0\u884C\u8017\u65F6 P95" }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("strong", { children: duration3(m.p95DurationMs) }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("small", { children: [
            number(durationSamples),
            " \u4E2A\u8017\u65F6\u6837\u672C \xB7 \u5747\u503C ",
            duration3(m.averageDurationMs)
          ] })
        ] })
      ] }),
      !terminalSamples && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: "mm-muted mm-metric-empty", children: "\u672C\u6B21\u8FD8\u6CA1\u6709\u8FD0\u884C\u8FDB\u5165\u5B8C\u6210\u6216\u5931\u8D25\u72B6\u6001\u3002\u51FA\u73B0\u7EC8\u6001\u540E\uFF0C\u8FD9\u91CC\u624D\u4F1A\u6BD4\u8F83\u5931\u8D25\u7387\u4E0E\u8017\u65F6\u3002" }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("details", { className: "mm-metric-details", children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("summary", { children: "\u67E5\u770B\u6392\u961F\u8017\u65F6\u4E0E\u91C7\u96C6\u6570\u636E" }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "mm-metrics", children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { children: "\u5E73\u5747\u6392\u961F\u8017\u65F6" }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("strong", { children: queueSamples > 0 ? duration3(m.averageQueueMs) : "\u6837\u672C\u4E0D\u8DB3" }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("small", { children: [
              "P95 ",
              queueSamples > 0 ? duration3(m.p95QueueMs) : "\u2014",
              " \xB7 ",
              number(queueSamples),
              " \u4E2A\u6837\u672C"
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { children: "\u589E\u91CF\u65E5\u5FD7" }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("strong", { children: number(m.incrementalLogMessages) }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("small", { children: [
              "\u5E73\u5747 ",
              number(m.logsPerMinute),
              " \u6761 / \u5206\u949F"
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { children: "\u4E00\u8F6E\u91C7\u96C6\u8017\u65F6" }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("strong", { children: latency(monitor.syncLatencyMs) }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("small", { children: "\u5305\u62EC API \u4E0E\u65E5\u5FD7\u8865\u507F\u8BFB\u53D6" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: "mm-muted mm-metric-note", children: "\u672C\u6B21\u6700\u591A\u4FDD\u7559 1,000 \u6B21\u7EC8\u6001\u6837\u672C\uFF0C\u5F53\u524D\u8FFD\u8E2A\u6700\u591A 100 \u6B21\u8FD0\u884C\uFF1B\u91CD\u542F\u6216\u4FEE\u6539\u914D\u7F6E\u4F1A\u91CD\u65B0\u8BA1\u65F6\u3002" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("section", { className: "mm-metric-section mm-metric-panel", children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "mm-metric-panel-heading", children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("h3", { children: "\u6A21\u578B\u7528\u91CF\u4E0E\u6210\u672C" }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "mm-muted", children: tokens.available ? `${number(tokens.sampleSize)} \u6B21\u8FD0\u884C\u6709\u7528\u91CF\u8BB0\u5F55` : "\u5F53\u524D\u6CA1\u6709\u7528\u91CF\u6837\u672C" })
      ] }),
      tokens.available ? /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(import_jsx_runtime12.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "mm-metrics compact", children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { children: "\u8F93\u5165 / \u8F93\u51FA Token" }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("strong", { children: [
              number(tokens.inputTokens),
              " / ",
              number(tokens.outputTokens)
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { children: "\u7F13\u5B58\u8BFB\u53D6 / \u5199\u5165 Token" }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("strong", { children: [
              number(tokens.cacheReadTokens),
              " / ",
              number(tokens.cacheWriteTokens)
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { children: "\u5DF2\u4E0A\u62A5\u6210\u672C \xB7 USD" }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("strong", { children: typeof tokens.costUsd === "number" ? `$${tokens.costUsd.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 6 })}` : "\u2014" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("p", { className: "mm-muted mm-metric-note", children: [
          tokens.scope,
          "\uFF1B\u7F3A\u5931\u7528\u91CF\u4E0D\u6309\u96F6\u8D39\u7528\u4F30\u7B97\u3002"
        ] })
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: "mm-muted mm-metric-note", children: "\u5F53\u524D\u6837\u672C\u6CA1\u6709\u53EF\u7528\u7684\u6A21\u578B\u7528\u91CF\uFF1B\u9700\u8981\u6267\u884C\u5668\u5411 Multica \u4E0A\u62A5\u3002\u8FD9\u91CC\u4E0D\u5305\u542B\u672C\u63D2\u4EF6\u7684 AI \u8BCA\u65AD\u8D39\u7528\u3002" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("details", { className: "mm-metric-section mm-metric-panel mm-metric-connection", children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("summary", { className: "mm-metric-panel-heading", children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("strong", { children: "\u667A\u80FD\u4F53\u5E76\u53D1" }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("span", { className: "mm-muted", children: [
          agents.length,
          " \u4E2A\u667A\u80FD\u4F53 \xB7 \u5C55\u5F00\u67E5\u770B\u5404\u81EA\u4E0A\u9650"
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "mm-table-wrap", role: "region", "aria-label": "\u667A\u80FD\u4F53\u5E76\u53D1\u8868", tabIndex: 0, children: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("table", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("th", { children: "\u667A\u80FD\u4F53" }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("th", { children: "\u5F53\u524D\u6D3B\u52A8 / \u914D\u7F6E\u4E0A\u9650" })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("tbody", { children: agents.map((agent) => /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("span", { className: "ui-agent-label", children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(AgentAvatar, { name: agent.name, size: 24 }),
            agent.name
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("td", { children: [
            (monitor.runs || []).filter((run) => run.agentId === agent.id && active4.has(run.status) && !["queued", "deferred"].includes(run.status)).length,
            " / ",
            agent.maxConcurrentTasks ?? "\u672A\u63D0\u4F9B"
          ] })
        ] }, agent.id)) })
      ] }) }),
      !agents.length && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: "mm-muted mm-metric-note", children: "\u6CA1\u6709\u53EF\u89C1\u7684\u667A\u80FD\u4F53\u8BB0\u5F55\u3002" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("section", { className: "mm-metric-section mm-metric-panel mm-resource-panel", children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "mm-metric-panel-heading", children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("h3", { children: "\u673A\u5668\u8D44\u6E90" }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "mm-badge pending", children: "\u91C7\u96C6\u80FD\u529B\u672A\u63A5\u5165" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("dl", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("dt", { children: "CPU" }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("dd", { children: m.cpu?.reason || "\u5F53\u524D Multica API \u672A\u63D0\u4F9B\u6BCF\u6B21\u8FD0\u884C\u7684 CPU \u6570\u636E\u3002" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("dt", { children: "\u5185\u5B58" }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("dd", { children: m.memory?.reason || "\u5F53\u524D Multica API \u672A\u63D0\u4F9B\u6BCF\u6B21\u8FD0\u884C\u7684\u5185\u5B58\u6570\u636E\u3002" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: "mm-muted mm-metric-note", children: "\u8FDB\u7A0B\u7EA7\u6027\u80FD\u91C7\u6837\u9700\u8981\u540E\u7EED\u5728\u6267\u884C\u673A\u5668\u7684\u5B88\u62A4\u8FDB\u7A0B\u4E2D\u589E\u52A0\u91C7\u96C6\u80FD\u529B\u3002" })
    ] })
  ] });
}
function RuntimeView({ runtimes = [], available = true, Badge: Badge2 }) {
  if (available === false) return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "mm-list mm-runtime-view", children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "mm-section-heading", children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("h2", { children: "\u8FD0\u884C\u65F6" }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "mm-muted", children: "\u5F53\u524D\u5DE5\u4F5C\u533A\u5FEB\u7167" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "mm-alert-verification", role: "status", children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("strong", { children: "\u8FD0\u884C\u65F6\u72B6\u6001\u6682\u4E0D\u53EF\u7528" }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { children: "\u5F53\u524D\u65E0\u6CD5\u6838\u5B9E\u8FDE\u63A5\u6570\u548C\u79BB\u7EBF\u6570\u3002\u68C0\u67E5 Multica \u8FDE\u63A5\uFF0C\u7B49\u5F85\u4E0B\u4E00\u6B21\u540C\u6B65\uFF1B\u4ECD\u5931\u8D25\u65F6\u8BF7\u5728\u8FDE\u63A5\u8BBE\u7F6E\u4E2D\u91CD\u8FDE\u3002" })
    ] })
  ] });
  const counts = runtimes.reduce((value, runtime) => {
    value[runtime.status] = (value[runtime.status] || 0) + 1;
    return value;
  }, {});
  const connected = (counts.online || 0) + (counts.busy || 0);
  const oldestSeenAt = runtimes.map((runtime) => runtime.lastSeenAt).filter((value) => value && Number.isFinite(Date.parse(value))).sort((a, b) => Date.parse(a) - Date.parse(b))[0];
  const missingSeenAt = runtimes.some((runtime) => !runtime.lastSeenAt || !Number.isFinite(Date.parse(runtime.lastSeenAt)));
  const orderedRuntimes = [...runtimes].sort((a, b) => {
    const rank = (status) => status === "offline" ? 0 : status === "busy" ? 2 : status === "online" ? 3 : 1;
    return rank(a.status) - rank(b.status) || (timeValue(a.lastSeenAt) || -1) - (timeValue(b.lastSeenAt) || -1);
  });
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "mm-list mm-runtime-view", children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "mm-section-heading", children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("h2", { children: "\u8FD0\u884C\u65F6" }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "mm-muted", children: "\u5F53\u524D\u5DE5\u4F5C\u533A\u5FEB\u7167" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "mm-runtime-overview", "aria-label": "\u8FD0\u884C\u65F6\u72B6\u6001\u6C47\u603B", children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { children: "\u8FD0\u884C\u65F6" }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("strong", { children: runtimes.length }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("small", { children: "\u5F53\u524D\u53EF\u89C1\u8282\u70B9" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { children: "\u5DF2\u8FDE\u63A5" }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("strong", { children: connected }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("small", { children: [
          counts.online || 0,
          " \u53EF\u63A5\u6536 \xB7 ",
          counts.busy || 0,
          " \u6267\u884C\u4E2D",
          runtimes.length - connected - (counts.offline || 0) > 0 ? ` \xB7 ${runtimes.length - connected - (counts.offline || 0)} \u5F85\u6838\u5B9E` : ""
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { children: "\u79BB\u7EBF" }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("strong", { children: counts.offline || 0 }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("small", { children: counts.offline ? "\u68C0\u67E5\u5BF9\u5E94\u5B88\u62A4\u8FDB\u7A0B" : "\u5F53\u524D\u65E0\u79BB\u7EBF\u8282\u70B9" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { children: "\u6700\u4E45\u672A\u4E0A\u62A5" }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("strong", { className: "mm-runtime-latest", children: missingSeenAt ? "\u65F6\u95F4\u672A\u63D0\u4F9B" : date2(oldestSeenAt) }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("small", { children: "\u4EE5\u670D\u52A1\u7AEF\u6700\u540E\u5728\u7EBF\u65F6\u95F4\u4E3A\u51C6" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("section", { className: "mm-runtime-panel", "aria-label": "\u8FD0\u884C\u65F6\u8FDE\u63A5", children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "mm-runtime-panel-heading", children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("h3", { children: "\u8FD0\u884C\u65F6\u8FDE\u63A5" }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: "mm-muted", children: "\u79BB\u7EBF\u548C\u72B6\u6001\u5F85\u6838\u5B9E\u7684\u8282\u70B9\u6392\u5728\u524D\u9762\uFF1B\u72B6\u6001\u6765\u81EA\u5DE5\u4F5C\u533A\u5FEB\u7167\uFF0C\u4E0D\u4EE3\u8868 CPU \u6216\u5185\u5B58\u5065\u5EB7\u5EA6\u3002" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("span", { className: "mm-muted", children: [
          runtimes.length,
          " \u6761\u8BB0\u5F55"
        ] })
      ] }),
      runtimes.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: "mm-table-scroll-hint", children: "\u5DE6\u53F3\u6ED1\u52A8\u8868\u683C\u67E5\u770B\u6700\u540E\u5728\u7EBF\u65F6\u95F4" }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "mm-table-wrap", role: "region", "aria-label": "\u8FD0\u884C\u65F6\u8FDE\u63A5\u8868\uFF0C\u5DE6\u53F3\u6EDA\u52A8\u67E5\u770B\u5168\u90E8\u5217", tabIndex: 0, children: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("table", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("th", { children: "\u8FD0\u884C\u65F6" }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("th", { children: "\u63D0\u4F9B\u65B9" }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("th", { children: "\u8FDE\u63A5\u72B6\u6001" }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("th", { children: "\u6700\u540E\u5728\u7EBF" })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("tbody", { children: orderedRuntimes.map((runtime) => /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("tr", { "data-status": runtime.status, children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("strong", { children: runtime.name }) }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("td", { children: runtime.provider || "\u2014" }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(Badge2, { status: runtime.status, label: { online: "\u5728\u7EBF", offline: "\u79BB\u7EBF", busy: "\u5FD9\u788C" }[runtime.status] || "\u5F85\u6838\u5B9E" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("td", { children: date2(runtime.lastSeenAt) })
        ] }, runtime.id)) })
      ] }) }),
      !runtimes.length && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "mm-empty", children: "\u6CA1\u6709\u53EF\u89C1\u7684\u8FD0\u884C\u65F6\u3002\u542F\u52A8\u5E76\u8FDE\u63A5 Multica \u5B88\u62A4\u8FDB\u7A0B\u540E\uFF0C\u8FD9\u91CC\u624D\u4F1A\u51FA\u73B0\u8BB0\u5F55\u3002" })
    ] })
  ] });
}
function RunActions({ api, issueId, run, onCompleted }) {
  const [ticket, setTicket] = (0, import_react13.useState)(null), [result, setResult] = (0, import_react13.useState)(null), [error, setError] = (0, import_react13.useState)(""), [busy, setBusy] = (0, import_react13.useState)(false);
  const locked = (0, import_react13.useRef)(false), triggerRef = (0, import_react13.useRef)(null), dialogRef = (0, import_react13.useRef)(null), cancelRef = (0, import_react13.useRef)(null), restoreFocus = (0, import_react13.useRef)(false);
  (0, import_react13.useEffect)(() => {
    if (ticket) {
      cancelRef.current?.focus();
      return;
    }
    if (restoreFocus.current && !busy) {
      triggerRef.current?.focus();
      restoreFocus.current = false;
    }
  }, [ticket, busy]);
  const prepare = async (kind, trigger) => {
    if (locked.current) return;
    triggerRef.current = trigger;
    locked.current = true;
    setBusy(true);
    setError("");
    setTicket(null);
    setResult(null);
    try {
      const next = await api("prepareAction", { kind, issueId, taskId: run.id });
      restoreFocus.current = true;
      setTicket(next);
    } catch (e) {
      setError(e.message);
    } finally {
      locked.current = false;
      setBusy(false);
    }
  };
  const execute = async () => {
    if (!ticket || locked.current) return;
    locked.current = true;
    setBusy(true);
    setError("");
    const confirmationId = ticket.confirmationId;
    setTicket(null);
    try {
      const next = await api("executeAction", { confirmationId });
      setResult(next);
      onCompleted();
    } catch (e) {
      setError(e.message);
    } finally {
      locked.current = false;
      setBusy(false);
    }
  };
  const onDialogKeyDown = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      setTicket(null);
      return;
    }
    if (event.key !== "Tab") return;
    const controls = [...dialogRef.current?.querySelectorAll("button:not(:disabled)") || []];
    if (!controls.length) {
      event.preventDefault();
      return;
    }
    if (event.shiftKey && document.activeElement === controls[0]) {
      event.preventDefault();
      controls.at(-1).focus();
    } else if (!event.shiftKey && document.activeElement === controls.at(-1)) {
      event.preventDefault();
      controls[0].focus();
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("section", { className: "mm-run-actions", "aria-label": "\u8FD0\u884C\u64CD\u4F5C", children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "mm-actions", children: [
      active4.has(run.status) && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("button", { disabled: busy, onClick: (event) => void prepare("cancel", event.currentTarget), children: "\u53D6\u6D88\u8FD0\u884C\u2026" }),
      ["failed", "cancelled"].includes(run.status) && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("button", { disabled: busy, onClick: (event) => void prepare("rerun", event.currentTarget), children: "\u91CD\u8DD1\u6B64\u4EFB\u52A1\u2026" }),
      busy && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { role: "status", className: "mm-muted", children: "\u6B63\u5728\u6838\u5B9E\u6216\u63D0\u4EA4\uFF0C\u8BF7\u52FF\u91CD\u590D\u64CD\u4F5C\u2026" })
    ] }),
    ticket && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "mm-confirm-backdrop", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "mm-confirm", role: "alertdialog", "aria-modal": "true", "aria-labelledby": `mm-confirm-title-${run.id}`, "aria-describedby": `mm-confirm-message-${run.id}`, ref: dialogRef, onKeyDown: onDialogKeyDown, children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("h3", { id: `mm-confirm-title-${run.id}`, children: ticket.kind === "cancel" ? "\u786E\u8BA4\u53D6\u6D88\u8FD0\u884C" : "\u786E\u8BA4\u91CD\u8DD1\u4EFB\u52A1" }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { id: `mm-confirm-message-${run.id}`, children: ticket.message }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("p", { className: "mm-muted", children: [
        "\u76EE\u6807\uFF1A",
        ticket.connection.baseUrl,
        " \xB7 \u5DE5\u4F5C\u533A ",
        ticket.connection.workspaceId
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("p", { className: "mm-muted", children: [
        "\u672C\u6B21\u786E\u8BA4\u6709\u6548\u81F3 ",
        date2(ticket.expiresAt),
        "\uFF0C\u63D0\u4EA4\u524D\u4F1A\u590D\u6838\u72B6\u6001\u3002"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "mm-actions", children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("button", { className: "mm-primary", disabled: busy, onClick: () => void execute(), children: ticket.kind === "cancel" ? "\u786E\u8BA4\u53D6\u6D88\u8FD0\u884C" : "\u786E\u8BA4\u521B\u5EFA\u65B0\u8FD0\u884C" }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("button", { ref: cancelRef, disabled: busy, onClick: () => setTicket(null), children: "\u6682\u4E0D\u64CD\u4F5C" })
      ] })
    ] }) }),
    result && /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "mm-confirm", role: "status", children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("h3", { children: result.outcomeUncertain ? "\u63D0\u4EA4\u7ED3\u679C\u5F85\u6838\u5B9E" : "\u64CD\u4F5C\u7ED3\u679C" }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { children: result.message }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("p", { className: "mm-muted", children: [
        "\u76EE\u6807\uFF1A",
        result.connection.baseUrl,
        " \xB7 \u5DE5\u4F5C\u533A ",
        result.connection.workspaceId
      ] })
    ] }),
    error && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: "mm-error", role: "alert", children: error })
  ] });
}

// src/run-work-detail.jsx
var import_react15 = __toESM(require("react"), 1);

// src/work-progress.mjs
var ACTIVE2 = /* @__PURE__ */ new Set(["queued", "dispatched", "running", "waiting_local_directory", "deferred"]);
var LIMITS = Object.freeze({ items: 100, pending: 200, unconfirmed: 50, title: 300, action: 400, statement: 1200, id: 256, result: 16e3, pendingProposalBytes: 64 * 1024 });
var encoder = new TextEncoder();
var PLANNING = /* @__PURE__ */ new Set(["TaskCreate", "TaskUpdate", "TodoWrite"]);
var object2 = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
var text2 = (value, limit = LIMITS.action) => typeof value === "string" ? value.trim().slice(0, limit) : "";
var identifier = (value) => typeof value === "number" && Number.isSafeInteger(value) && value >= 0 ? String(value) : typeof value === "string" && value.trim() && value.trim().length <= LIMITS.id ? value.trim() : null;
var timestamp3 = (value) => typeof value === "string" && value.length <= 80 && Number.isFinite(Date.parse(value)) ? value : null;
var evidence = (message, call) => ({ seq: message.seq, useSeq: call.seq, at: timestamp3(message.createdAt), source: call.tool });
var own = (value, key) => object2(value) && Object.hasOwn(value, key) ? value[key] : void 0;
function createWorkProgressState() {
  return {
    version: 1,
    items: /* @__PURE__ */ new Map(),
    pending: /* @__PURE__ */ new Map(),
    unconfirmed: [],
    reasons: /* @__PURE__ */ new Set(),
    lastSeq: 0,
    latestAction: null,
    latestStatement: null,
    lastEvidenceAt: null,
    itemsTruncated: false,
    pendingTruncated: false,
    unconfirmedTruncated: false,
    pendingProposalBytes: 0,
    pendingProposalTruncated: false
  };
}
function unconfirmed(state, call, message, reason, outcome = "unknown") {
  state.unconfirmed.push({
    tool: call.tool,
    callId: call.callId,
    summary: call.summary,
    seq: message.seq,
    useSeq: call.seq,
    at: timestamp3(message.createdAt),
    reason,
    outcome
  });
  if (state.unconfirmed.length > LIMITS.unconfirmed) {
    state.unconfirmed.shift();
    state.unconfirmedTruncated = true;
  }
}
function actionFor(message) {
  const input = object2(message.input) ? message.input : {};
  const tool = text2(message.tool, 100) || "\u672A\u77E5\u5DE5\u5177";
  const detail = ["description", "subject", "file_path", "filePath", "path", "file", "command"].map((key) => text2(own(input, key))).find(Boolean);
  return {
    tool,
    callId: identifier(message.callId),
    summary: detail || tool,
    seq: message.seq,
    at: timestamp3(message.createdAt),
    source: "tool_call",
    outcome: "pending",
    resultSeq: null,
    resultAt: null
  };
}
function proposalFor(message) {
  const input = message.input;
  if (!object2(input) || message.inputTruncated) return { invalid: "\u5DE5\u5177\u8F93\u5165\u7F3A\u5931\u3001\u7578\u5F62\u6216\u5DF2\u622A\u65AD\uFF0C\u65E0\u6CD5\u786E\u8BA4\u8BA1\u5212\u53D8\u66F4" };
  if (message.tool === "TaskCreate") {
    const title = text2(own(input, "subject"), LIMITS.title);
    return title ? { title, status: "pending" } : { invalid: "TaskCreate \u6CA1\u6709\u6709\u6548 subject" };
  }
  if (message.tool === "TaskUpdate") {
    const id2 = identifier(own(input, "taskId"));
    if (!id2) return { invalid: "TaskUpdate \u6CA1\u6709\u6709\u6548 taskId" };
    const proposedStatus = own(input, "status");
    if (proposedStatus !== void 0 && (typeof proposedStatus !== "string" || !proposedStatus.trim() || proposedStatus.length > 80)) return { invalid: "TaskUpdate \u7684 status \u683C\u5F0F\u65E0\u6548" };
    const proposedTitle = own(input, "subject");
    if (proposedTitle !== void 0 && (typeof proposedTitle !== "string" || !proposedTitle.trim())) return { invalid: "TaskUpdate \u7684 subject \u683C\u5F0F\u65E0\u6548" };
    return { id: id2, ...proposedStatus !== void 0 ? { status: proposedStatus.trim() } : {}, ...proposedTitle !== void 0 ? { title: text2(proposedTitle, LIMITS.title) } : {} };
  }
  if (message.tool === "TodoWrite") {
    const todos = own(input, "todos");
    if (!Array.isArray(todos)) return { invalid: "TodoWrite \u6CA1\u6709\u6709\u6548 todos \u6570\u7EC4" };
    if (todos.some((todo) => !object2(todo) || typeof own(todo, "content") !== "string" || !todo.content.trim() || typeof own(todo, "status") !== "string" || !todo.status.trim() || todo.status.length > 80)) return { invalid: "TodoWrite \u4E2D\u6709\u7578\u5F62\u4E8B\u9879\uFF0C\u672A\u5E94\u7528\u66FF\u6362" };
    return { todos: todos.slice(0, LIMITS.items).map((todo) => ({ title: text2(todo.content, LIMITS.title), status: todo.status.trim() })), truncated: todos.length > LIMITS.items };
  }
  return null;
}
function resultFor(message) {
  let output = typeof message.output === "string" ? message.output : "";
  if (message.isError === true || message.is_error === true) return { failed: true };
  if (message.outputTruncated === true || output.length > LIMITS.result) return { unknown: "\u5DE5\u5177\u7ED3\u679C\u5DF2\u622A\u65AD\uFF0C\u65E0\u6CD5\u786E\u8BA4\u8BA1\u5212\u53D8\u66F4" };
  let value;
  try {
    value = JSON.parse(output);
  } catch {
  }
  if (typeof value === "string") {
    output = value;
    value = void 0;
  }
  if (object2(value) && (value.isError === true || value.is_error === true || value.success === false || value.error != null && value.error !== false)) return { failed: true };
  if (/^\s*(?:error\b|failed\b|failure\b|exception\b|<tool_use_error>)/i.test(output)) return { failed: true };
  return { value, output: output.trim() };
}
function confirmedResult(call, result) {
  const value = result.value;
  if (call.tool === "TaskCreate") {
    if (object2(value) && value.success === true) {
      const id3 = identifier(value.taskId ?? value.task_id ?? value.id ?? value.task?.id);
      if (id3) return { id: id3 };
    }
    const match = /^Task #([^\s]+) created successfully(?::[^\r\n]*)?\s*$/i.exec(result.output);
    const id2 = match && identifier(match[1]);
    return id2 ? { id: id2 } : null;
  }
  if (call.tool === "TaskUpdate") {
    if (object2(value) && value.success === true) {
      const id3 = identifier(value.taskId ?? value.task_id ?? value.id ?? value.task?.id);
      if (id3 === call.proposal.id) return { id: id3 };
    }
    const match = /^Updated task #([^\s]+)(?: ((?:status|subject|description|activeForm|owner|metadata|addBlocks|addBlockedBy|deleted)(?:, (?:status|subject|description|activeForm|owner|metadata|addBlocks|addBlockedBy))*))?\s*$/i.exec(result.output);
    const id2 = match && identifier(match[1]);
    const fields = match?.[2]?.split(", ") || [];
    const confirmsStatus = call.proposal.status === void 0 || fields.includes("status") || call.proposal.status === "deleted" && fields.includes("deleted");
    const confirmsTitle = call.proposal.title === void 0 || fields.includes("subject");
    return id2 === call.proposal.id && confirmsStatus && confirmsTitle ? { id: id2 } : null;
  }
  if (call.tool === "TodoWrite") {
    if (object2(value) && value.success === true) return {};
    if (/^Todos have been modified successfully\.(?:\s+[^\r\n]*)?$/i.test(result.output)) return {};
  }
  return null;
}
function putItem(state, item) {
  const key = `${item.kind}:${item.id}`;
  if (!state.items.has(key) && state.items.size >= LIMITS.items) {
    state.itemsTruncated = true;
    return;
  }
  state.items.set(key, item);
}
function applyPlan(state, call, message) {
  if (call.proposal.invalid) {
    unconfirmed(state, call, message, call.proposal.invalid);
    return;
  }
  const result = resultFor(message);
  if (result.failed) {
    unconfirmed(state, call, message, "\u5DE5\u5177\u660E\u786E\u8FD4\u56DE\u5931\u8D25\uFF0C\u672A\u5E94\u7528\u8BA1\u5212\u53D8\u66F4", "failed");
    return;
  }
  if (result.unknown) {
    unconfirmed(state, call, message, result.unknown);
    return;
  }
  const confirmed = confirmedResult(call, result);
  if (!confirmed) {
    unconfirmed(state, call, message, "\u5DE5\u5177\u7ED3\u679C\u6CA1\u6709\u53EF\u8BC6\u522B\u7684\u6210\u529F\u786E\u8BA4\uFF0C\u672A\u5E94\u7528\u8BA1\u5212\u53D8\u66F4");
    return;
  }
  const proof = evidence(message, call);
  if (call.tool === "TaskCreate") {
    putItem(state, { id: confirmed.id, title: call.proposal.title, status: "pending", kind: "task", evidence: proof });
  } else if (call.tool === "TaskUpdate") {
    if (call.proposal.status === "deleted") state.items.delete(`task:${confirmed.id}`);
    else {
      const previous = state.items.get(`task:${confirmed.id}`);
      if (!previous) state.reasons.add("\u90E8\u5206\u4E8B\u9879\u4EC5\u89C2\u5BDF\u5230\u66F4\u65B0\uFF0C\u672A\u89C2\u5BDF\u5230\u521B\u5EFA");
      putItem(state, {
        id: confirmed.id,
        title: previous?.title || `\u4EFB\u52A1 ${confirmed.id}`,
        status: previous?.status || "unknown",
        kind: "task",
        ...call.proposal,
        evidence: proof
      });
    }
  } else if (call.tool === "TodoWrite") {
    for (const [id2, item] of state.items) if (item.kind === "todo") state.items.delete(id2);
    call.proposal.todos.forEach((todo, index) => putItem(state, { id: `todo:${call.seq}:${index}`, ...todo, kind: "todo", evidence: proof }));
    state.itemsTruncated ||= call.proposal.truncated;
  }
}
function ingestWorkMessages(state, messages) {
  if (!Array.isArray(messages)) {
    state.reasons.add("\u6536\u5230\u65E0\u6548\u6D88\u606F\u6279\u6B21");
    return state;
  }
  const ordered = messages.filter((message) => object2(message) && Number.isSafeInteger(message.seq) && message.seq > 0).sort((a, b) => a.seq - b.seq);
  if (ordered.length !== messages.length) state.reasons.add("\u90E8\u5206\u6D88\u606F\u7F3A\u5C11\u6709\u6548\u5E8F\u53F7");
  for (const message of ordered) {
    if (message.seq <= state.lastSeq) continue;
    if (message.seq > state.lastSeq + 1) state.reasons.add("\u6D88\u606F\u5E8F\u5217\u4E0D\u5B8C\u6574\uFF0C\u8BA1\u5212\u53EF\u80FD\u7F3A\u5C11\u65E9\u671F\u8BB0\u5F55");
    state.lastSeq = message.seq;
    const observedAt = timestamp3(message.createdAt);
    if (observedAt && (!state.lastEvidenceAt || Date.parse(observedAt) > Date.parse(state.lastEvidenceAt))) state.lastEvidenceAt = observedAt;
    if (message.type === "text" && typeof message.content === "string" && message.content.trim()) {
      state.latestStatement = {
        text: text2(message.content, LIMITS.statement),
        seq: message.seq,
        at: timestamp3(message.createdAt),
        source: "agent_statement",
        truncated: message.contentTruncated === true || message.content.length > LIMITS.statement
      };
    } else if (message.type === "tool_use") {
      const action = actionFor(message);
      let proposal = PLANNING.has(action.tool) ? proposalFor(message) : null;
      let proposalBytes = proposal && !proposal.invalid ? encoder.encode(JSON.stringify(proposal)).byteLength : 0;
      if (proposalBytes + state.pendingProposalBytes > LIMITS.pendingProposalBytes) {
        proposal = { invalid: "\u5F85\u786E\u8BA4\u8BA1\u5212\u8F93\u5165\u8D85\u8FC7\u5BB9\u91CF\u9884\u7B97\uFF0C\u672A\u5E94\u7528\u53D8\u66F4" };
        proposalBytes = 0;
        state.pendingProposalTruncated = true;
      }
      state.latestAction = { ...action };
      if (!action.callId) {
        state.latestAction.outcome = "unknown";
        state.reasons.add("\u90E8\u5206\u5DE5\u5177\u7F3A\u5C11\u53EF\u5173\u8054\u7684\u8C03\u7528\u6807\u8BC6");
        if (proposal) unconfirmed(state, action, message, "\u7F3A\u5C11\u8C03\u7528\u6807\u8BC6\uFF0C\u4E0D\u80FD\u5173\u8054\u6210\u529F\u7ED3\u679C");
      } else if (state.pending.has(action.callId)) {
        state.reasons.add("\u8C03\u7528\u6807\u8BC6\u91CD\u590D\uFF0C\u65E0\u6CD5\u53EF\u9760\u5173\u8054\u540E\u7EED\u7ED3\u679C");
        const previous = state.pending.get(action.callId);
        previous.ambiguous = true;
        if (proposal) unconfirmed(state, action, message, "\u8C03\u7528\u6807\u8BC6\u91CD\u590D\uFF0C\u672A\u786E\u8BA4\u672C\u6B21\u8BA1\u5212\u53D8\u66F4");
      } else if (state.pending.size >= LIMITS.pending) {
        state.pendingTruncated = true;
        state.latestAction.outcome = "unknown";
        if (proposal) unconfirmed(state, action, message, "\u5E76\u884C\u8C03\u7528\u8FFD\u8E2A\u8FBE\u5230\u4E0A\u9650");
      } else {
        state.pending.set(action.callId, { ...action, proposal, proposalBytes });
        state.pendingProposalBytes += proposalBytes;
      }
    } else if (message.type === "tool_result") {
      const id2 = identifier(message.callId);
      const call = id2 && state.pending.get(id2);
      if (!call) {
        if (PLANNING.has(message.tool)) {
          state.reasons.add("\u90E8\u5206\u8BA1\u5212\u5DE5\u5177\u7ED3\u679C\u7F3A\u5C11\u5BF9\u5E94\u8F93\u5165");
          unconfirmed(state, actionFor(message), message, "\u672A\u89C2\u5BDF\u5230\u5BF9\u5E94\u8C03\u7528\u8F93\u5165");
        }
        continue;
      }
      state.pending.delete(id2);
      state.pendingProposalBytes -= call.proposalBytes;
      const result = resultFor(message);
      if (state.latestAction?.callId === id2) Object.assign(state.latestAction, { resultSeq: message.seq, resultAt: timestamp3(message.createdAt), outcome: result.failed ? "failed" : result.unknown || call.ambiguous ? "unknown" : "returned" });
      if (call.proposal) {
        if (call.ambiguous || message.tool && message.tool !== call.tool) unconfirmed(state, call, message, "\u8C03\u7528\u6807\u8BC6\u6216\u5DE5\u5177\u540D\u79F0\u51B2\u7A81\uFF0C\u672A\u5E94\u7528\u8BA1\u5212\u53D8\u66F4");
        else applyPlan(state, call, message);
      }
    }
  }
  return state;
}
function snapshotWorkProgress(state, { status = "unknown", progress = null, logsCaughtUp = false } = {}) {
  const items = [...state.items.values()].map((item) => ({ ...item, evidence: { ...item.evidence } }));
  const pendingActions = ACTIVE2.has(status) ? [...state.pending.values()].filter((call) => !call.ambiguous).map(({ proposal, proposalBytes, ambiguous, ...action }) => ({ ...action })) : [];
  const counts = { total: items.length, pending: 0, inProgress: 0, completed: 0, unknown: 0 };
  for (const item of items) {
    if (item.status === "pending") counts.pending++;
    else if (item.status === "in_progress") counts.inProgress++;
    else if (item.status === "completed") counts.completed++;
    else counts.unknown++;
  }
  const warnings = [...state.reasons];
  if (!logsCaughtUp) warnings.push("\u65E5\u5FD7\u5C1A\u672A\u5B8C\u6574\u8865\u9F50\uFF0C\u8BA1\u5212\u53EA\u53CD\u6620\u5DF2\u8BFB\u53D6\u8BC1\u636E");
  if (state.itemsTruncated) warnings.push(`\u8BA1\u5212\u4E8B\u9879\u6700\u591A\u4FDD\u7559 ${LIMITS.items} \u9879\uFF0C\u5F53\u524D\u6E05\u5355\u53EF\u80FD\u4E0D\u5B8C\u6574`);
  if (state.pendingTruncated) warnings.push(`\u5E76\u884C\u5DE5\u5177\u6700\u591A\u8FFD\u8E2A ${LIMITS.pending} \u4E2A\uFF0C\u5F53\u524D\u52A8\u4F5C\u53EF\u80FD\u4E0D\u5B8C\u6574`);
  if (state.unconfirmedTruncated) warnings.push(`\u672A\u786E\u8BA4\u53D8\u66F4\u4EC5\u4FDD\u7559\u6700\u8FD1 ${LIMITS.unconfirmed} \u6761`);
  if (state.pendingProposalTruncated) warnings.push("\u5F85\u786E\u8BA4\u8BA1\u5212\u8F93\u5165\u5DF2\u8FBE\u5230\u6BCF\u8FD0\u884C64KiB\u9884\u7B97\uFF0C\u90E8\u5206\u53D8\u66F4\u672A\u89E3\u6790");
  if (state.unconfirmed.length) warnings.push("\u5B58\u5728\u5931\u8D25\u6216\u672A\u786E\u8BA4\u7684\u8BA1\u5212\u53D8\u66F4\uFF0C\u672A\u8BA1\u5165\u5DF2\u786E\u8BA4\u4E8B\u9879");
  const latestAction = state.latestAction ? { ...state.latestAction } : null;
  if (latestAction?.outcome === "pending" && !ACTIVE2.has(status)) latestAction.outcome = "unknown";
  const step = Number.isSafeInteger(progress?.step) && progress.step >= 0 ? progress.step : null;
  const total = Number.isSafeInteger(progress?.total) && progress.total >= 0 ? progress.total : null;
  return {
    items,
    counts,
    currentAction: pendingActions[0] ?? null,
    latestAction,
    latestStatement: state.latestStatement ? { ...state.latestStatement } : null,
    pendingActions,
    unconfirmedActions: state.unconfirmed.map((action) => ({ ...action })),
    coverage: { partial: warnings.length > 0, logsCaughtUp: logsCaughtUp === true, itemsTruncated: state.itemsTruncated, pendingTruncated: state.pendingTruncated, unconfirmedTruncated: state.unconfirmedTruncated, pendingProposalTruncated: state.pendingProposalTruncated },
    warnings,
    lastEvidenceAt: state.lastEvidenceAt,
    planSource: "agent_tools",
    notMulticaSubtasks: true,
    runStatus: text2(status, 80) || "unknown",
    reportedProgress: object2(progress) && text2(progress.summary) && (step == null || total == null || step <= total) ? { summary: text2(progress.summary, LIMITS.statement), step, total, reportedAt: timestamp3(progress.reportedAt) } : null
  };
}

// src/work-activity.mjs
var MAX_RECENT = 60;
var MAX_PENDING = 200;
var MAX_SLOW = 8;
var MAX_STATEMENTS = 12;
var active5 = /* @__PURE__ */ new Set(["running", "dispatched", "queued", "deferred", "waiting_local_directory"]);
var object3 = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
var text3 = (value, max = 240) => typeof value === "string" ? value.trim().slice(0, max) : "";
var time4 = (value) => typeof value === "string" && value.length < 80 && Number.isFinite(Date.parse(value)) ? value : null;
var identity = (value) => typeof value === "string" && value.length > 0 && value.length <= 256 ? value : null;
var activityCategories = Object.freeze({ read: "\u8BFB\u53D6\u6587\u4EF6", search: "\u67E5\u627E\u4E0E\u68C0\u7D22", test: "\u6267\u884C\u6D4B\u8BD5", build: "\u6784\u5EFA\u68C0\u67E5", write: "\u5199\u5165\u4E0E\u4FEE\u6539", skill: "\u52A0\u8F7D\u6280\u80FD", plan: "\u66F4\u65B0\u8BA1\u5212", command: "\u547D\u4EE4\u68C0\u67E5", other: "\u5176\u4ED6\u5DE5\u5177" });
function categoryFor(message) {
  const tool = text3(message.tool, 80), input = object3(message.input) ? message.input : {};
  if (/^(Read|read_file)$/i.test(tool)) return "read";
  if (/^(Grep|Glob|search|list_files)$/i.test(tool)) return "search";
  if (/^(Write|Edit|apply_patch|write_file)$/i.test(tool)) return "write";
  if (tool === "Skill") return "skill";
  if (/^(TaskCreate|TaskUpdate|TodoWrite)$/.test(tool)) return "plan";
  if (/^(Bash|shell|exec_command)$/i.test(tool)) {
    const command = text3(input.command ?? input.cmd, 8e3);
    if (/(?:^|[\s;&|])(?:pytest|vitest|jest)\b|\bgo\s+test\b|\b(?:npm|pnpm|yarn)\s+(?:run\s+)?test\b|\b(?:mvn|mvnw|gradle|gradlew)\b[^\n;&|]*\btest\b|\bnode\s+--test\b/i.test(command)) return "test";
    if (/\b(?:npm|pnpm|yarn)\s+(?:run\s+)?build\b|\b(?:go|cargo)\s+build\b|\b(?:mvn|gradle)\b[^\n;&|]*\b(?:package|compile|build)\b/i.test(command)) return "build";
    return "command";
  }
  return "other";
}
function createActivityState() {
  return { lastSeq: 0, calls: 0, returned: 0, failed: 0, unknown: 0, categories: {}, recent: [], slow: [], pending: /* @__PURE__ */ new Map(), statements: [], gaps: false, dropped: false, orphanResults: 0, recentTruncated: false, statementsTruncated: false };
}
function failedResult(message) {
  return message.isError === true || message.is_error === true;
}
function ingestActivityMessages(state, messages) {
  if (!Array.isArray(messages)) {
    state.gaps = true;
    return;
  }
  const ordered = messages.filter((message) => object3(message) && Number.isSafeInteger(message.seq) && message.seq > 0).sort((a, b) => a.seq - b.seq);
  if (ordered.length !== messages.length) state.gaps = true;
  for (const message of ordered) {
    if (message.seq <= state.lastSeq) continue;
    if (message.seq !== state.lastSeq + 1) state.gaps = true;
    state.lastSeq = message.seq;
    if (message.type === "text" && text3(message.content)) {
      state.statements.push({ seq: message.seq, at: time4(message.createdAt), text: text3(message.content, 600), truncated: message.contentTruncated === true || message.content.length > 600 });
      if (state.statements.length > MAX_STATEMENTS) {
        state.statements.shift();
        state.statementsTruncated = true;
      }
    } else if (message.type === "tool_use") {
      const input = object3(message.input) ? message.input : {}, category = categoryFor(message), callId = identity(message.callId);
      const target = text3(input.file_path ?? input.filePath ?? input.path ?? input.file, 240);
      const tool = text3(message.tool, 80) || "\u672A\u77E5\u5DE5\u5177";
      const summary = text3(input.description ?? input.subject) || target || activityCategories[category];
      const entry = { seq: message.seq, useSeq: message.seq, callId, tool, category, summary, target, at: time4(message.createdAt), resultAt: null, resultSeq: null, outcome: "pending", durationMs: null };
      state.calls++;
      state.categories[category] = (state.categories[category] || 0) + 1;
      state.recent.push(entry);
      if (state.recent.length > MAX_RECENT) {
        state.recent.shift();
        state.recentTruncated = true;
      }
      if (!callId || state.pending.has(callId) || state.pending.size >= MAX_PENDING) {
        entry.outcome = "unknown";
        state.unknown++;
        state.dropped = true;
        const prior = callId && state.pending.get(callId);
        if (prior) {
          prior.ambiguous = true;
          prior.outcome = "unknown";
        }
      } else state.pending.set(callId, entry);
    } else if (message.type === "tool_result") {
      const callId = identity(message.callId), entry = callId && state.pending.get(callId);
      if (!entry) {
        state.orphanResults++;
        continue;
      }
      state.pending.delete(callId);
      entry.resultSeq = message.seq;
      entry.resultAt = time4(message.createdAt);
      const mismatch = entry.ambiguous || message.tool && message.tool !== entry.tool;
      if (mismatch) state.dropped = true;
      entry.outcome = mismatch ? "unknown" : failedResult(message) ? "failed" : "returned";
      state[entry.outcome === "returned" ? "returned" : entry.outcome === "failed" ? "failed" : "unknown"]++;
      const elapsed2 = Date.parse(entry.resultAt) - Date.parse(entry.at);
      entry.durationMs = !mismatch && Number.isFinite(elapsed2) && elapsed2 >= 0 ? elapsed2 : null;
      if (entry.durationMs >= 3e4) {
        state.slow.push({ ...entry });
        state.slow.sort((a, b) => b.durationMs - a.durationMs);
        state.slow.length = Math.min(MAX_SLOW, state.slow.length);
      }
    }
  }
}
function snapshotActivity(state, { status = "unknown", logsCaughtUp = false, now = Date.now() } = {}) {
  const running = active5.has(status), current = running && logsCaughtUp && !state.gaps, pending = [...state.pending.values()].filter((entry) => !entry.ambiguous);
  const copy = (entry) => {
    const elapsed2 = Number.isFinite(now) && entry.at ? now - Date.parse(entry.at) : null;
    return {
      ...entry,
      outcome: entry.outcome === "pending" && !current ? "unconfirmed" : entry.outcome,
      waitingMs: entry.outcome === "pending" && current && Number.isFinite(elapsed2) && elapsed2 >= 0 ? elapsed2 : null
    };
  };
  return {
    calls: state.calls,
    returned: state.returned,
    failed: state.failed,
    unknown: state.unknown,
    categories: Object.entries(state.categories).map(([key, count]) => ({ key, label: activityCategories[key], count })),
    recent: state.recent.map(copy).reverse(),
    slow: state.slow.map(copy),
    pending: current ? pending.map(copy) : [],
    unresolvedCalls: running ? 0 : pending.length,
    statements: state.statements.map((entry) => ({ ...entry })).reverse(),
    status,
    coverage: { partial: !logsCaughtUp || state.gaps || state.dropped || state.orphanResults > 0, logsCaughtUp, gaps: state.gaps, pairingIncomplete: state.dropped || state.orphanResults > 0, recentTruncated: state.recentTruncated, statementsTruncated: state.statementsTruncated }
  };
}

// src/work-activity-view.jsx
var import_react14 = __toESM(require("react"), 1);
var import_jsx_runtime13 = require("react/jsx-runtime");
var time5 = (value) => value ? new Date(value).toLocaleTimeString("zh-CN", { hour12: false }) : "\u65F6\u95F4\u672A\u63D0\u4F9B";
var duration4 = (value) => value == null ? "\u8017\u65F6\u672A\u77E5" : value < 6e4 ? `${Math.floor(value / 1e3)} \u79D2` : `${Math.floor(value / 6e4)} \u5206 ${Math.floor(value / 1e3) % 60} \u79D2`;
var outcomes = { pending: "\u7B49\u5F85\u8FD4\u56DE", returned: "\u5DF2\u8FD4\u56DE", failed: "\u8FD4\u56DE\u5931\u8D25", unknown: "\u5F85\u6838\u5B9E", unconfirmed: "\u7ED3\u679C\u672A\u786E\u8BA4" };
function ActivityRow({ item, onEvidence }) {
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("li", { className: "mm-work-item", children: [
    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { className: "mm-plan-status", children: outcomes[item.outcome] || "\u5F85\u6838\u5B9E" }),
    /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("strong", { children: item.summary }),
      item.target && item.target !== item.summary && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("small", { children: item.target }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "mm-work-evidence", children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("time", { children: time5(item.at) }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { children: item.tool }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { children: item.waitingMs != null ? `\u5DF2\u7B49\u5F85 ${duration4(item.waitingMs)}` : `\u8C03\u7528\u8017\u65F6 ${duration4(item.durationMs)}` }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("button", { type: "button", className: "mm-evidence-link", onClick: () => onEvidence({ seq: item.resultSeq || item.seq, useSeq: item.seq }), children: [
          "\u67E5\u770B\u8C03\u7528\u8BC1\u636E #",
          item.seq
        ] })
      ] })
    ] })
  ] });
}
function WorkActivityView({ activity, onEvidence }) {
  if (!activity?.calls && !activity?.statements?.length) return null;
  const statements = activity.statements || [];
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("section", { "aria-label": "\u5DE5\u4F5C\u8FC7\u7A0B", className: "mm-work-progress", children: [
    /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "mm-plan-heading", children: [
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("h4", { children: "\u5DE5\u4F5C\u8FC7\u7A0B" }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("span", { className: "mm-muted", children: [
        "\u5DF2\u89C2\u5BDF ",
        activity.calls,
        " \u6B21\u5DE5\u5177\u8C03\u7528"
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "mm-muted", children: activity.categories.map((item) => `${item.label} ${item.count} \u6B21`).join(" \xB7 ") }),
    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "mm-muted", children: "\u8BB0\u5F55\u6765\u81EA\u5DE5\u5177\u8F93\u5165\u548C\u8FD4\u56DE\uFF1B\u201C\u5DF2\u8FD4\u56DE\u201D\u4E0D\u7B49\u4E8E\u6D4B\u8BD5\u901A\u8FC7\u6216\u4E1A\u52A1\u5B8C\u6210\uFF0C\u4E5F\u4E0D\u7528\u4E8E\u63A8\u7B97\u5B8C\u6210\u767E\u5206\u6BD4\u3002" }),
    !activity.coverage.logsCaughtUp && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "mm-muted", children: "\u65E5\u5FD7\u6B63\u5728\u8865\u91C7\uFF1B\u4EE5\u4E0B\u53EA\u53CD\u6620\u5DF2\u8BFB\u53D6\u8BC1\u636E\u3002" }),
    activity.coverage.logsCaughtUp && activity.coverage.partial && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "mm-muted", children: "\u65E5\u5FD7\u5DF2\u8FFD\u5E73\uFF0C\u4F46\u5DE5\u5177\u8C03\u7528\u4E0E\u7ED3\u679C\u5B58\u5728\u914D\u5BF9\u7F3A\u53E3\uFF1B\u65E0\u6CD5\u786E\u8BA4\u90E8\u5206\u8C03\u7528\u7ED3\u679C\u548C\u8017\u65F6\uFF0C\u4E0D\u4EE3\u8868\u5DE5\u5177\u4ECD\u5728\u7B49\u5F85\u3002" }),
    activity.pending.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_jsx_runtime13.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "mm-plan-heading", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("h4", { children: "\u4ECD\u5728\u7B49\u5F85\u7684\u8C03\u7528" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("ol", { className: "mm-work-items", children: activity.pending.slice(0, 5).map((item) => /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(ActivityRow, { item, onEvidence }, item.seq)) }),
      activity.pending.length > 5 && /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("p", { className: "mm-muted", children: [
        "\u53E6\u6709 ",
        activity.pending.length - 5,
        " \u4E2A\u8C03\u7528\u5C1A\u672A\u8FD4\u56DE\u3002"
      ] })
    ] }),
    activity.unresolvedCalls > 0 && /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("p", { className: "mm-muted", children: [
      "\u8FD0\u884C\u5DF2\u7ED3\u675F\u6216\u72B6\u6001\u5F85\u6838\u5B9E\uFF0C\u4ECD\u6709 ",
      activity.unresolvedCalls,
      " \u4E2A\u5DE5\u5177\u7ED3\u679C\u672A\u786E\u8BA4\uFF1B\u4E0D\u7EE7\u7EED\u7D2F\u8BA1\u7B49\u5F85\u65F6\u95F4\u3002"
    ] }),
    activity.slow.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("details", { className: "mm-extra-actions", children: [
      /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("summary", { children: [
        "\u8017\u65F6\u8F83\u957F\u7684\u8C03\u7528 \xB7 \u6700\u957F ",
        duration4(activity.slow[0].durationMs)
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("ol", { className: "mm-work-items", children: activity.slow.map((item) => /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(ActivityRow, { item, onEvidence }, item.seq)) }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "mm-muted", children: "\u6309\u5F00\u59CB\u548C\u8FD4\u56DE\u65F6\u95F4\u8BA1\u7B97\uFF0C\u5305\u542B\u6267\u884C\u53CA\u4F20\u8F93\u7B49\u5F85\uFF1B\u5E76\u884C\u8C03\u7528\u8017\u65F6\u4E0D\u80FD\u76F4\u63A5\u76F8\u52A0\u3002" })
    ] }),
    statements.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("details", { className: "mm-agent-statement", children: [
      /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("summary", { children: [
        "\u9636\u6BB5\u8BF4\u660E \xB7 \u667A\u80FD\u4F53\u81EA\u8FF0 \xB7 ",
        time5(statements[0].at)
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("ol", { className: "mm-work-items", children: statements.map((item) => /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("li", { className: "mm-work-item", children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("time", { className: "mm-plan-status", children: time5(item.at) }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("p", { children: [
            item.text,
            item.truncated && "\u2026"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("button", { type: "button", className: "mm-evidence-link", onClick: () => onEvidence({ seq: item.seq }), children: [
            "\u67E5\u770B\u8BF4\u660E\u539F\u6587 #",
            item.seq
          ] })
        ] })
      ] }, item.seq)) }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "mm-muted", children: "\u6700\u591A\u4FDD\u7559\u6700\u8FD1 12 \u6761\u8BF4\u660E\uFF1B\u81EA\u8FF0\u4E0D\u4F5C\u4E3A\u5DF2\u9A8C\u8BC1\u7ED3\u679C\u3002" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "mm-plan-heading", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("h4", { children: "\u6700\u8FD1\u6267\u884C\u7684\u5DE5\u4F5C" }) }),
    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("ol", { className: "mm-work-items", children: activity.recent.slice(0, 6).map((item) => /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(ActivityRow, { item, onEvidence }, item.seq)) }),
    activity.recent.length > 6 && /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("details", { className: "mm-extra-actions", children: [
      /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("summary", { children: [
        "\u67E5\u770B\u66F4\u65E9\u7684\u5DE5\u4F5C\u8BB0\u5F55 \xB7 ",
        activity.recent.length - 6,
        " \u6761"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("ol", { className: "mm-work-items", children: activity.recent.slice(6).map((item) => /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(ActivityRow, { item, onEvidence }, item.seq)) })
    ] }),
    activity.coverage.recentTruncated && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "mm-muted", children: "\u5DE5\u4F5C\u6D41\u6C34\u4FDD\u7559\u6700\u8FD1 60 \u6B21\u8C03\u7528\uFF0C\u6570\u91CF\u7EDF\u8BA1\u7EE7\u7EED\u7D2F\u8BA1\uFF1B\u66F4\u65E9\u8BB0\u5F55\u8BF7\u5728 Multica \u8FD0\u884C\u65E5\u5FD7\u4E2D\u67E5\u770B\u3002" })
  ] });
}

// src/run-work-detail.jsx
var import_jsx_runtime14 = require("react/jsx-runtime");
var time6 = (value) => value && Number.isFinite(Date.parse(value)) ? new Date(value).toLocaleString("zh-CN", { hour12: false }) : "\u65F6\u95F4\u672A\u63D0\u4F9B";
var text4 = (value) => typeof value === "string" ? value : value == null ? "" : JSON.stringify(value, null, 2);
function LogMessage({ message, expand = false }) {
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("article", { className: "mm-message", children: [
    /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "mm-message-head", children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("span", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(TypeIcon, { type: message.type, isError: message.isError === true || message.is_error === true }),
        "#",
        message.seq,
        " \xB7 ",
        message.type,
        message.tool ? ` \xB7 ${message.tool}` : ""
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("time", { children: time6(message.createdAt) })
    ] }),
    message.content && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("pre", { children: text4(message.content) }),
    message.input != null && /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("details", { open: expand || void 0, children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("summary", { children: "\u5DE5\u5177\u8F93\u5165" }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("pre", { children: text4(message.input) })
    ] }),
    (message.output || message.type === "tool_result") && /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("details", { open: expand || void 0, children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("summary", { children: [
        "\u5DE5\u5177\u8F93\u51FA",
        message.outputTruncated === true ? "\uFF08\u5DF2\u622A\u65AD\uFF09" : message.outputTruncated == null ? "\uFF08\u5B8C\u6574\u6027\u672A\u77E5\uFF09" : ""
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("pre", { children: text4(message.output) || "\uFF08\u7A7A\u8F93\u51FA\uFF09" })
    ] })
  ] });
}
function EvidenceReader({ api, taskId, selection, revision, onClose }) {
  const [messages, setMessages] = (0, import_react15.useState)([]), [error, setError] = (0, import_react15.useState)(""), [loading, setLoading] = (0, import_react15.useState)(true), [retry, setRetry] = (0, import_react15.useState)(0);
  const panel = (0, import_react15.useRef)(null);
  (0, import_react15.useEffect)(() => {
    let live = true;
    const controller = new AbortController();
    setLoading(true);
    setError("");
    setMessages([]);
    const sequences = [...new Set([selection.useSeq, selection.seq].filter((seq2) => Number.isInteger(seq2) && seq2 > 0))].sort((a, b) => a - b);
    void Promise.all(sequences.map(async (seq2) => {
      const batch = await api("messages", { taskId, since: seq2 - 1 }, controller.signal);
      const message = batch.messages.find((item) => item.seq === seq2);
      if (!message) throw new Error(`\u670D\u52A1\u7AEF\u672A\u8FD4\u56DE\u65E5\u5FD7 #${seq2}\uFF0C\u8BB0\u5F55\u53EF\u80FD\u5DF2\u6E05\u7406`);
      return message;
    })).then((result) => {
      if (live) setMessages(result);
    }).catch((reason) => {
      if (live) setError(reason.message || "\u8BC1\u636E\u8BFB\u53D6\u5931\u8D25");
    }).finally(() => {
      if (live) setLoading(false);
    });
    panel.current?.focus({ preventScroll: true });
    panel.current?.scrollIntoView({ block: "nearest" });
    return () => {
      live = false;
      controller.abort();
    };
  }, [api, taskId, selection, revision, retry]);
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("section", { className: "mm-selected-evidence", "aria-label": "\u539F\u59CB\u8BC1\u636E", tabIndex: -1, ref: panel, children: [
    /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "mm-section-heading", children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("h4", { children: [
        "\u539F\u59CB\u8BC1\u636E \xB7 #",
        selection.seq
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("button", { type: "button", onClick: onClose, children: "\u6536\u8D77\u8BC1\u636E" })
    ] }),
    loading && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { role: "status", children: "\u6B63\u5728\u8BFB\u53D6\u539F\u59CB\u8BB0\u5F55\u2026" }),
    error && /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("p", { role: "alert", className: "mm-error", children: [
      error,
      "\u3002",
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("button", { type: "button", onClick: () => setRetry((value) => value + 1), children: "\u91CD\u8BD5\u8BFB\u53D6" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "mm-evidence-content", children: messages.map((message) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(LogMessage, { message, expand: true }, message.seq)) })
  ] });
}
function RunMessages({ api, run, revision, observedRun }) {
  const [data, setData] = (0, import_react15.useState)({ messages: [], lastSeq: 0, hasMore: true });
  const [error, setError] = (0, import_react15.useState)(""), [loading, setLoading] = (0, import_react15.useState)(true), [updated, setUpdated] = (0, import_react15.useState)("");
  const [selection, setSelection] = (0, import_react15.useState)(null);
  const workState = (0, import_react15.useRef)(createWorkProgressState());
  const activityState = (0, import_react15.useRef)(createActivityState());
  (0, import_react15.useEffect)(() => {
    let live = true, timer, cursor = 0;
    const controller = new AbortController();
    workState.current = createWorkProgressState();
    activityState.current = createActivityState();
    setData({ messages: [], lastSeq: 0, hasMore: true });
    setError("");
    setLoading(true);
    setUpdated("");
    setSelection(null);
    const sync = async () => {
      try {
        if (document.visibilityState === "hidden") return;
        const result = await api("messages", { taskId: run.id, since: cursor }, controller.signal);
        if (!live) return;
        cursor = result.lastSeq;
        ingestWorkMessages(workState.current, result.messages);
        ingestActivityMessages(activityState.current, result.messages);
        setData((previous) => {
          const merged = new Map(previous.messages.map((message) => [message.seq, message]));
          for (const message of result.messages) merged.set(message.seq, message);
          const all = [...merged.values()].sort((a, b) => a.seq - b.seq);
          return { ...result, messages: all.slice(-300), truncated: result.truncated || previous.truncated || all.length > 300 };
        });
        setUpdated((/* @__PURE__ */ new Date()).toISOString());
        setError("");
      } catch (reason) {
        if (live) setError(reason.message || "\u65E5\u5FD7\u8BFB\u53D6\u5931\u8D25");
      } finally {
        if (live) {
          setLoading(false);
          timer = setTimeout(sync, 2e3);
        }
      }
    };
    void sync();
    return () => {
      live = false;
      clearTimeout(timer);
      controller.abort();
    };
  }, [api, run.id, revision]);
  const observedStatus = error || observedRun?.observationError || observedRun?.logError ? "unknown" : observedRun?.status || run.status;
  const work = snapshotWorkProgress(workState.current, { status: observedStatus, progress: observedRun?.progress, logsCaughtUp: !loading && !error && !data.hasMore });
  const activity = snapshotActivity(activityState.current, { status: observedStatus, logsCaughtUp: !loading && !error && !data.hasMore });
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_jsx_runtime14.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(WorkProgressView, { work, progress: observedRun?.progress, onEvidence: setSelection, loading, error }),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(WorkActivityView, { activity, onEvidence: setSelection }),
    selection && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(EvidenceReader, { api, taskId: run.id, selection, revision, onClose: () => setSelection(null) }),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("details", { className: "mm-log-section mm-raw-log-section", children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("summary", { children: [
        "Multica \u6267\u884C\u6D88\u606F ",
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "mm-muted", children: updated ? `\u540C\u6B65\u4E8E ${time6(updated)}` : "\u6BCF 2 \u79D2\u540C\u6B65" })
      ] }),
      data.truncated && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { className: "mm-muted", children: "\u5F53\u524D\u4EC5\u4FDD\u7559\u6700\u8FD1 300 \u6761\u5DF2\u8BFB\u53D6\u6D88\u606F\uFF1B\u8BA1\u5212\u8BC1\u636E\u4ECD\u53EF\u5355\u72EC\u8BFB\u53D6\u3002" }),
      data.hasMore && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { className: "mm-muted", children: "\u6B63\u5728\u7EE7\u7EED\u8865\u9F50\u5386\u53F2\u8BB0\u5F55\uFF0C\u6E05\u5355\u53EF\u80FD\u4E0D\u5B8C\u6574\u3002" }),
      data.warnings?.map((warning, index) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { className: "mm-muted", children: warning }, index)),
      !data.messages.length && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { className: "mm-muted", children: loading ? "\u6B63\u5728\u8BFB\u53D6\u2026" : error ? "\u65E5\u5FD7\u6682\u65F6\u4E0D\u53EF\u7528" : "\u8FD9\u6B21\u8FD0\u884C\u8FD8\u6CA1\u6709\u65E5\u5FD7" }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "mm-logs", children: data.messages.map((message) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(LogMessage, { message }, message.seq)) })
    ] })
  ] });
}

// src/client.jsx
var import_jsx_runtime15 = require("react/jsx-runtime");
var inject = ["slots", "connection", "layout"];
var monitorThemes = /* @__PURE__ */ new Set(["graphite", "paper", "strata"]);
var defaultMonitorTheme = "strata";
var normalizeTheme = (value) => monitorThemes.has(value) ? value : defaultMonitorTheme;
var activeStates2 = /* @__PURE__ */ new Set(["queued", "dispatched", "running", "waiting_local_directory", "deferred"]);
var runLabels = { queued: "\u6392\u961F\u4E2D", dispatched: "\u5DF2\u6D3E\u53D1", running: "\u8FD0\u884C\u4E2D", waiting_local_directory: "\u7B49\u5F85\u672C\u5730\u76EE\u5F55", deferred: "\u6682\u7F13", completed: "\u8FD0\u884C\u5B8C\u6210", failed: "\u8FD0\u884C\u5931\u8D25", cancelled: "\u8FD0\u884C\u53D6\u6D88", unknown: "\u72B6\u6001\u5F85\u6838\u5B9E" };
var issueLabels = { backlog: "\u5F85\u89C4\u5212", todo: "\u5F85\u5904\u7406", in_progress: "\u5904\u7406\u4E2D", blocked: "\u53D7\u963B", in_review: "\u5F85\u5BA1\u6838", done: "\u5DF2\u5B8C\u6210", cancelled: "\u5DF2\u53D6\u6D88" };
var time7 = (value) => value && Number.isFinite(Date.parse(value)) ? new Date(value).toLocaleString("zh-CN", { hour12: false }) : "\u2014";
var errorMessage = (error) => error?.message || "\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5";
var businessLabel = (statuses, key) => {
  const name = statuses.find((status) => status.key === key)?.name;
  return !name || name.toLowerCase().replaceAll(" ", "_") === key ? issueLabels[key] || name || key : name;
};
function selectAvailableRun(currentId, preferredId, runs) {
  if (runs.some((run) => run.id === currentId) || preferredId && currentId === preferredId) return currentId;
  return runs.find((run) => activeStates2.has(run.status))?.id || runs[0]?.id || "";
}
function defaultTaskView(detail) {
  if (!detail?.runs?.length) return "graph";
  const confirmed = buildRunTimeline(detail.runs, Date.now(), { relations: detail.relations }).relations.some((relation) => ["delegation", "rerun", "retry", "parent_run"].includes(relation.type));
  return confirmed ? "graph" : "timeline";
}
function Icon({ kind = "monitor", ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", ...props, children: kind === "close" ? /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("path", { d: "m6 6 12 12M6 18 18 6" }) : kind === "refresh" ? /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(import_jsx_runtime15.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("path", { d: "M20 7v5h-5M4 17v-5h5" }),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("path", { d: "M6 7a7 7 0 0 1 12-2l2 7M4 12l2 7a7 7 0 0 0 12-2" })
  ] }) : /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(import_jsx_runtime15.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("rect", { x: "3", y: "4", width: "18", height: "13", rx: "2" }),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("path", { d: "M8 21h8m-4-4v4M6 11h3l2-4 3 7 2-3h2" })
  ] }) });
}
function Badge({ status, label }) {
  const tone = ["failed", "blocked", "offline", "error"].includes(status) ? "danger" : ["running", "in_progress", "online", "completed", "done"].includes(status) ? "good" : activeStates2.has(status) ? "pending" : "";
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { className: `mm-badge ${tone}`, children: label || runLabels[status] || status || "\u672A\u77E5" });
}
function ConnectionForm({ api, settings, onSaved, onClose, onDirtyChange }) {
  const [busy, setBusy] = (0, import_react16.useState)(false);
  const [error, setError] = (0, import_react16.useState)("");
  const [confirmClear, setConfirmClear] = (0, import_react16.useState)(false);
  const clearTrigger = (0, import_react16.useRef)(null), clearConfirm = (0, import_react16.useRef)(null);
  (0, import_react16.useEffect)(() => {
    if (confirmClear) clearConfirm.current?.focus();
  }, [confirmClear]);
  const cancelClear = () => {
    setConfirmClear(false);
    clearTrigger.current?.focus();
  };
  const clearToken = async () => {
    setBusy(true);
    setError("");
    try {
      await onSaved(await api("saveSettings", { clearToken: true, workspaceId: "" }));
    } catch (e) {
      setError(errorMessage(e));
      setConfirmClear(false);
      clearTrigger.current?.focus();
    } finally {
      setBusy(false);
    }
  };
  const submit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    for (const key of ["monitorEnabled", "aiDiagnosis"]) values[key] = form.elements[key].checked;
    for (const key of ["noProgressMinutes", "toolMinutes", "queueMinutes", "runMinutes"]) values[key] = Number(values[key]);
    setBusy(true);
    setError("");
    try {
      const next = await api("saveSettings", { ...values, workspaceId: values.baseUrl.replace(/\/+$/, "") === settings.baseUrl ? settings.workspaceId : "" });
      form.elements.token.value = "";
      await onSaved(next);
    } catch (error2) {
      setError(errorMessage(error2));
    } finally {
      setBusy(false);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("form", { className: "mm-settings", onSubmit: submit, onChange: onDirtyChange, children: [
    /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "mm-section-heading", children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("h2", { children: "\u8FDE\u63A5 Multica" }),
      settings.hasToken && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("button", { type: "button", onClick: onClose, children: "\u6536\u8D77\u914D\u7F6E" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "mm-form-grid", children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("label", { children: [
        "API \u5730\u5740",
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("input", { name: "baseUrl", type: "url", required: true, defaultValue: settings.baseUrl, spellCheck: "false" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("label", { children: [
        "\u7F51\u9875\u5730\u5740",
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("input", { name: "webUrl", type: "url", required: true, defaultValue: settings.webUrl, spellCheck: "false" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("label", { className: "mm-token", children: [
        "\u4E2A\u4EBA\u8BBF\u95EE\u4EE4\u724C",
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("input", { name: "token", type: "password", autoComplete: "new-password", required: !settings.hasToken, placeholder: settings.hasToken ? "\u5DF2\u4FDD\u5B58\uFF1B\u7559\u7A7A\u4FDD\u7559\u5F53\u524D\u4EE4\u724C" : "\u5728 Multica \u4E2A\u4EBA\u8BBE\u7F6E\u4E2D\u521B\u5EFA" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { className: "mm-muted", children: "\u672C\u5730\u5F00\u53D1\u7684 API \u4E0E\u7F51\u9875\u53EF\u80FD\u4F7F\u7528\u4E0D\u540C\u7AEF\u53E3\u3002\u5207\u6362\u73AF\u5883\u65F6\u586B\u5199\u65B0\u4EE4\u724C\uFF1B\u4EE4\u724C\u4FDD\u5B58\u5728 DSH \u5BBF\u4E3B\u672C\u5730\u914D\u7F6E\u4E2D\u3002" }),
    settings.allowedHttpOrigins?.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("p", { className: "mm-muted", children: [
      "\u5DF2\u660E\u786E\u5141\u8BB8\u4EE5\u4E0B HTTP \u5730\u5740\uFF1A",
      settings.allowedHttpOrigins.join("\u3001"),
      "\u3002\u8FD9\u4E9B\u8FDE\u63A5\u4F7F\u7528\u660E\u6587 HTTP\uFF0C\u8BB8\u53EF\u4E0D\u9002\u7528\u4E8E\u5176\u4ED6\u5730\u5740\u3002"
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "mm-checks", children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("label", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("input", { type: "checkbox", name: "monitorEnabled", defaultChecked: settings.monitorEnabled }),
        "\u6301\u7EED\u76D1\u63A7"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("label", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("input", { type: "checkbox", name: "aiDiagnosis", defaultChecked: settings.aiDiagnosis }),
        "\u5F02\u5E38\u53D1\u751F\u65F6\u81EA\u52A8 AI \u8BCA\u65AD"
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { className: "mm-muted", children: "AI \u8BCA\u65AD\u4F1A\u628A\u8131\u654F\u540E\u7684\u5C11\u91CF\u8FD0\u884C\u4FE1\u606F\u53D1\u9001\u7ED9 DSH \u9ED8\u8BA4\u6A21\u578B\uFF0C\u53EF\u80FD\u4EA7\u751F\u8D39\u7528\uFF1B\u6CA1\u6709\u53EF\u7528\u6A21\u578B\u65F6\u4FDD\u7559\u89C4\u5219\u8BCA\u65AD\u3002\u53D6\u6D88\u6216\u91CD\u8DD1\u59CB\u7EC8\u9700\u8981\u4F60\u786E\u8BA4\u3002" }),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("details", { className: "mm-thresholds", children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("summary", { children: "\u5F02\u5E38\u9608\u503C" }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "mm-form-grid", children: [["noProgressMinutes", "\u65E0\u8FDB\u5C55"], ["toolMinutes", "\u5DE5\u5177\u7B49\u5F85"], ["queueMinutes", "\u6392\u961F"], ["runMinutes", "\u8FD0\u884C\u603B\u8017\u65F6"]].map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("label", { children: [
        label,
        " \xB7 \u5206\u949F",
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("input", { type: "number", min: "1", max: "1440", required: true, name: key, defaultValue: settings[key] })
      ] }, key)) })
    ] }),
    error && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { role: "alert", className: "mm-error", children: error }),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "mm-actions", children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("button", { className: "mm-primary", disabled: busy, type: "submit", children: busy ? "\u6B63\u5728\u8FDE\u63A5\u2026" : "\u4FDD\u5B58\u5E76\u8FDE\u63A5" }) }),
    settings.hasToken && /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "mm-settings-danger", children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("button", { ref: clearTrigger, type: "button", disabled: busy, onClick: () => setConfirmClear(true), children: "\u6E05\u9664\u4EE4\u724C" }),
      confirmClear && /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "mm-settings-confirm", role: "group", "aria-label": "\u786E\u8BA4\u6E05\u9664\u4EE4\u724C", "data-mm-escape-scope": true, onKeyDown: (event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          event.stopPropagation();
          cancelClear();
        }
      }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { children: "\u6E05\u9664\u672C\u673A\u4EE4\u724C\u540E\uFF0C\u5F53\u524D\u8FDE\u63A5\u548C\u6301\u7EED\u76D1\u63A7\u5C06\u505C\u6B62\uFF1B\u91CD\u65B0\u8FDE\u63A5\u9700\u8981\u586B\u5199\u4EE4\u724C\u3002" }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "mm-actions", children: [
          /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("button", { ref: clearConfirm, type: "button", disabled: busy, onClick: () => void clearToken(), children: busy ? "\u6B63\u5728\u6E05\u9664\u2026" : "\u786E\u8BA4\u6E05\u9664\u4EE4\u724C" }),
          /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("button", { type: "button", disabled: busy, onClick: cancelClear, children: "\u4FDD\u7559\u8FDE\u63A5" })
        ] })
      ] })
    ] })
  ] });
}
function IssueDetail({ api, issueId, statuses, agents, webUrl, workspaceSlug, revision, onClose, onSelectIssue, preferredRunId = "", observedRuns = [], issues = [], runtimes = [], unavailable = false, primary = false, settings = {} }) {
  const [evidenceTab, setEvidenceTab] = (0, import_react16.useState)("execution"), [traceFocused, setTraceFocused] = (0, import_react16.useState)(false);
  const [data, setData] = (0, import_react16.useState)(null), [error, setError] = (0, import_react16.useState)(""), [selectedRun, setSelectedRun] = (0, import_react16.useState)(preferredRunId);
  const [refresh, setRefresh] = (0, import_react16.useState)(0);
  const [view, setView] = (0, import_react16.useState)("graph"), [inspectorOpen, setInspectorOpen] = (0, import_react16.useState)(Boolean(preferredRunId));
  const initialViewChosen = (0, import_react16.useRef)(false), defaultRelationshipView = (0, import_react16.useRef)("graph");
  const inspectorHeading = (0, import_react16.useRef)(null), canvasRef = (0, import_react16.useRef)(null), restoreSelection = (0, import_react16.useRef)(false);
  const inspectorRef = (0, import_react16.useRef)(null), evidenceRef = (0, import_react16.useRef)(null);
  useSurfaceMotion(canvasRef, view);
  useSurfaceMotion(inspectorRef, `${inspectorOpen}:${traceFocused}:${selectedRun}`);
  useSurfaceMotion(evidenceRef, evidenceTab);
  const openRun = (id2) => {
    setSelectedRun(id2);
    setInspectorOpen(true);
    setTraceFocused(false);
  };
  const closeRun = () => {
    restoreSelection.current = true;
    setInspectorOpen(false);
  };
  (0, import_react16.useEffect)(() => {
    if (inspectorOpen) {
      if (window.innerWidth < 900) inspectorHeading.current?.scrollIntoView({ block: "nearest", behavior: "auto" });
      inspectorHeading.current?.focus({ preventScroll: true });
    } else if (restoreSelection.current) {
      restoreSelection.current = false;
      const selected = canvasRef.current?.querySelector('[aria-pressed="true"], [aria-current="true"]');
      selected?.scrollIntoView({ block: "center", inline: "nearest", behavior: "auto" });
      selected?.focus({ preventScroll: true });
    }
  }, [inspectorOpen, selectedRun]);
  (0, import_react16.useEffect)(() => {
    let live = true, timer;
    const controller = new AbortController();
    setError("");
    const sync = async () => {
      try {
        const next = await api("issue", { issueId }, controller.signal);
        if (live) {
          setData(next);
          setError("");
          setSelectedRun((old) => selectAvailableRun(old, preferredRunId, next.runs));
          defaultRelationshipView.current = defaultTaskView(next);
          if (!initialViewChosen.current) {
            setView(defaultRelationshipView.current);
            initialViewChosen.current = true;
          }
        }
      } catch (error2) {
        if (live) setError(errorMessage(error2));
      } finally {
        if (live) timer = setTimeout(sync, 1e4);
      }
    };
    void sync();
    return () => {
      live = false;
      clearTimeout(timer);
      controller.abort();
    };
  }, [api, issueId, revision, refresh]);
  const run = data?.runs.find((item) => item.id === selectedRun);
  const taskMonitor = useTaskMonitor({ runs: data?.runs || [], observedRuns, agents, runtimes, issueId, unavailable: unavailable || Boolean(error), settings });
  const issue = data?.issue;
  const sourceIssue = issue || issues.find((item) => item.id === issueId);
  const url = workspaceSlug && sourceIssue ? `${webUrl}/${encodeURIComponent(workspaceSlug)}/issues/${encodeURIComponent(sourceIssue.identifier || sourceIssue.id)}` : null;
  const agentCount = new Set((data?.runs || []).map((item) => item.agentId).filter(Boolean)).size;
  const childCount = data?.relations?.items.filter((item) => item.kind === "child").length || 0;
  const parentLabel = issue?.parentIssueKnown ? issue.parentIssueId ? "\u6709\u7236\u4EFB\u52A1" : "\u65E0\u7236\u4EFB\u52A1" : "\u7236\u5173\u7CFB\u5F85\u6838\u5B9E";
  const childrenLabel = data?.relations?.availability.children === "available" && !data?.relations?.childrenTruncated ? childCount ? `${childCount} \u4E2A\u5B50\u4EFB\u52A1` : "\u65E0\u4E1A\u52A1\u5B50\u4EFB\u52A1" : "\u5B50\u4EFB\u52A1\u5C1A\u672A\u5B8C\u6574\u8BFB\u53D6";
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("section", { className: `mm-detail ${primary ? "mm-task-workspace" : ""}`, "aria-label": "\u4EFB\u52A1\u8BE6\u60C5", children: [
    primary ? /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(import_jsx_runtime15.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("button", { className: "mm-task-back", onClick: onClose, children: "\u8FD4\u56DE\u4EFB\u52A1\u5217\u8868" }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "mm-task-workspace-heading", children: [
        /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("label", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(TypeIcon, { type: "task" }),
          "\u4E1A\u52A1\u4EFB\u52A1",
          /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("select", { "aria-label": "\u9009\u62E9\u4E1A\u52A1\u4EFB\u52A1", value: issueId, onChange: (event) => onSelectIssue(event.target.value), children: [
            !issues.some((item) => item.id === issueId) && /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("option", { value: issueId, children: [
              issue?.identifier || issueId,
              " \xB7 ",
              issue?.title || "\u6B63\u5728\u8BFB\u53D6"
            ] }),
            issues.map((item) => /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("option", { value: item.id, children: [
              item.identifier || item.id.slice(-8),
              " \xB7 ",
              item.title
            ] }, item.id))
          ] })
        ] }),
        issue && /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "mm-actions", children: [
          /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Badge, { status: issue.status, label: businessLabel(statuses, issue.status) }),
          url && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("a", { href: url, target: "_blank", rel: "noreferrer", children: "\u5728 Multica \u6253\u5F00" })
        ] })
      ] })
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "mm-section-heading", children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("h2", { children: issue ? `${issue.identifier || ""} ${issue.title}` : "\u4EFB\u52A1\u8BE6\u60C5" }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("button", { onClick: onClose, "aria-label": "\u5173\u95ED\u4EFB\u52A1\u8BE6\u60C5", children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Icon, { kind: "close" }) })
    ] }),
    error && /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("p", { role: "alert", className: "mm-error", children: [
      error,
      data ? "\uFF1B\u5F53\u524D\u663E\u793A\u4E0A\u6B21\u6210\u529F\u8BFB\u53D6\u7684\u6570\u636E\u3002" : ""
    ] }),
    !data ? /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { role: "status", className: "mm-empty", children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { children: error ? "\u8BE6\u60C5\u6682\u65F6\u4E0D\u53EF\u7528\uFF0C\u8BF7\u91CD\u65B0\u8BFB\u53D6\u6216\u5728 Multica \u67E5\u770B\u3002" : "\u6B63\u5728\u8BFB\u53D6\u4EFB\u52A1\u2026" }),
      error && /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "mm-actions", children: [
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("button", { type: "button", onClick: () => setRefresh((value) => value + 1), children: "\u91CD\u65B0\u8BFB\u53D6" }),
        url && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("a", { href: url, target: "_blank", rel: "noreferrer", children: "\u5728 Multica \u6253\u5F00" })
      ] })
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(import_jsx_runtime15.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "mm-task-facts", children: [
        /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("span", { children: [
          data.runs.length,
          " \u6B21\u8FD0\u884C"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("span", { children: [
          agentCount,
          " \u540D\u667A\u80FD\u4F53"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("details", { className: "mm-hierarchy-disclosure", children: [
          /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("summary", { children: [
            "\u4EFB\u52A1\u5C42\u7EA7 \xB7 ",
            parentLabel,
            " \xB7 ",
            childrenLabel
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(BusinessHierarchy, { detail: data, issues, onSelectIssue })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(TaskAttention, { monitor: taskMonitor, unavailable: unavailable || Boolean(error), onSelectRun: openRun }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("nav", { className: "mm-detail-tabs mm-view-switcher", "aria-label": "\u5C55\u793A\u6A21\u5F0F", children: [
        [["graph", "\u8C03\u7528\u6D41\u7A0B\u56FE"], ["timeline", "\u8FD0\u884C\u65F6\u95F4\u7EBF"]].map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("button", { "aria-current": view === key ? "page" : void 0, onClick: () => {
          initialViewChosen.current = true;
          setView(key);
          setInspectorOpen(false);
        }, children: label }, key)),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { className: "mm-muted", children: inspectorOpen ? "\u6B63\u5728\u5206\u6790\u8FD0\u884C \xB7 \u53EF\u8FD4\u56DE\u67E5\u770B\u5173\u7CFB" : "\u9009\u62E9\u8FD0\u884C\u67E5\u770B\u8F93\u5165\u3001\u8F93\u51FA\u4E0E\u8017\u65F6" })
      ] }),
      defaultRelationshipView.current === "timeline" && view === "timeline" && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { className: "mm-muted mm-call-notice", children: "\u5DF2\u52A0\u8F7D\u8FD0\u884C\u4E4B\u95F4\u6682\u65E0\u670D\u52A1\u7AEF\u786E\u8BA4\u7684\u8C03\u7528\u5173\u7CFB\uFF0C\u5148\u6309\u65F6\u95F4\u67E5\u770B\u5404\u6B21\u8FD0\u884C\uFF1B\u4ECD\u53EF\u5207\u6362\u5230\u8C03\u7528\u56FE\u6838\u5BF9\u6765\u6E90\u3002" }),
      data.runHistoryTruncated && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { className: "mm-muted", children: "\u8FD0\u884C\u5386\u53F2\u5B58\u5728\u622A\u65AD\u6216\u5F52\u5C5E\u5F02\u5E38\uFF1B\u5F53\u524D\u53EA\u5C55\u793A\u5DF2\u6838\u5B9E\u7684\u8BB0\u5F55\u3002" }),
      preferredRunId && selectedRun === preferredRunId && !run && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { role: "status", className: "mm-notice", children: "\u6307\u5B9A\u8FD0\u884C\u672A\u5728\u5DF2\u52A0\u8F7D\u7684\u4EFB\u52A1\u5386\u53F2\u4E2D\u627E\u5230\uFF0C\u53EF\u80FD\u5DF2\u88AB\u622A\u65AD\u6216\u5220\u9664\u3002\u53EF\u5728 Multica \u4E2D\u6838\u5B9E\uFF0C\u6216\u9009\u62E9\u5176\u4ED6\u8FD0\u884C\u3002" }),
      data.warnings?.map((warning, index) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { className: "mm-muted", children: warning }, index)),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: `mm-relation-workspace ${inspectorOpen && run ? "has-inspector" : ""} ${traceFocused ? "trace-focused" : ""}`, children: [
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("main", { className: "mm-relation-canvas", ref: canvasRef, children: view === "graph" ? /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(CallGraph, { settings, runtimes, unavailable: unavailable || Boolean(error), api, detail: data, observedRuns, onSelectRun: openRun, selectedRunId: inspectorOpen ? selectedRun : "" }) : /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(TaskMonitorTimeline, { settings, monitor: taskMonitor, truncated: data.runHistoryTruncated, onSelectRun: openRun, selectedRunId: selectedRun }) }),
        inspectorOpen && run && /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("aside", { ref: inspectorRef, className: "mm-run-inspector", "aria-label": "\u9009\u4E2D\u8FD0\u884C\u7684\u8FDB\u5C55", children: [
          /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "mm-section-heading", children: [
            /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("h2", { ref: inspectorHeading, tabIndex: -1, children: "\u6240\u9009\u8FD0\u884C" }),
            /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("button", { onClick: closeRun, children: [
              "\u5173\u95ED\u8BE6\u60C5\uFF0C\u8FD4\u56DE",
              view === "graph" ? "\u8C03\u7528\u56FE" : "\u65F6\u95F4\u7EBF"
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("label", { className: "mm-run-picker", children: [
            "\u8FD0\u884C\u8BB0\u5F55",
            /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("select", { value: selectedRun, onChange: (event) => setSelectedRun(event.target.value), disabled: !data.runs.length, children: [
              !data.runs.length && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("option", { value: "", children: "\u6682\u65E0\u8FD0\u884C" }),
              data.runs.map((r) => /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("option", { value: r.id, children: [
                r.agentName || agents.find((agent) => agent.id === r.agentId)?.name || "\u672A\u77E5\u667A\u80FD\u4F53",
                " \xB7 ",
                runLabels[r.status] || r.status,
                " \xB7 ",
                time7(r.createdAt),
                " \xB7 ",
                r.id.slice(-8)
              ] }, r.id))
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "mm-run-action-strip", children: [
            /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("span", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(AgentAvatar, { name: run.agentName || agents.find((a) => a.id === run.agentId)?.name, size: 23 }),
              run.agentName || agents.find((a) => a.id === run.agentId)?.name || "\u667A\u80FD\u4F53\u672A\u63D0\u4F9B",
              " \xB7 ",
              /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Badge, { status: run.status })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(RunActions, { api, issueId: issue.id, run, onCompleted: () => setRefresh((value) => value + 1) })
          ] }),
          run.error && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(FailureDiagnosis, { error: run.error }),
          /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("nav", { className: "mm-evidence-switch", "aria-label": "\u8FD0\u884C\u5C55\u793A\u65B9\u5F0F", children: [
            /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("button", { "aria-pressed": evidenceTab === "execution", onClick: () => setEvidenceTab("execution"), children: "\u8F93\u5165\u4E0E\u8F93\u51FA" }),
            /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("button", { "aria-pressed": evidenceTab === "waterfall", onClick: () => setEvidenceTab("waterfall"), children: "\u65F6\u95F4\u7011\u5E03\u56FE" }),
            /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("button", { "aria-pressed": evidenceTab === "conversation", onClick: () => setEvidenceTab("conversation"), children: "\u6267\u884C\u8BB0\u5F55" }),
            /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("button", { "aria-pressed": evidenceTab === "progress", onClick: () => setEvidenceTab("progress"), children: "\u6267\u884C\u6982\u89C8" }),
            /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("button", { "aria-pressed": !traceFocused, onClick: () => setTraceFocused((value) => !value), children: traceFocused ? "\u8FD4\u56DE\u56FE\u4E0E\u8BE6\u60C5\u5E76\u6392" : "\u5C55\u5F00\u8FD0\u884C\u8BE6\u60C5" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { ref: evidenceRef, className: "mm-run-surface", children: ["execution", "waterfall"].includes(evidenceTab) ? /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(RunExecution, { waterfallOnly: evidenceTab === "waterfall", api, run, issue, runs: data.runs, agents, revision, observedRun: observedRuns.find((item) => item.id === run.id), runtimeStatus: runtimes.find((item) => item.id === run.runtimeId)?.status, settings, unavailable: unavailable || Boolean(error), url, onInspect: openRun }, `execution:${run.id}:${revision}`) : evidenceTab === "conversation" ? /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(RunConversation, { api, run, issue, agentName: run.agentName || agents.find((agent) => agent.id === run.agentId)?.name, revision, unavailable: unavailable || Boolean(error) }, `conversation:${run.id}:${revision}`) : /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(RunMessages, { api, run, revision, observedRun: observedRuns.find((item) => item.id === run.id) }, `messages:${run.id}:${revision}`) }),
          /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("details", { className: "mm-run-metadata", children: [
            /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("summary", { children: "\u8FD0\u884C\u65F6\u95F4" }),
            /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("dl", { className: "mm-run-info", children: [
              /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("dt", { children: "\u5F00\u59CB\u65F6\u95F4" }),
                /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("dd", { children: time7(run.startedAt) })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("dt", { children: "\u7ED3\u675F\u65F6\u95F4" }),
                /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("dd", { children: time7(run.completedAt) })
              ] })
            ] })
          ] }, `metadata:${run.id}:${revision}`),
          /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { className: "mm-muted", children: "\u8FD0\u884C\u5B8C\u6210\u4E0D\u4EE3\u8868\u4E1A\u52A1\u4EFB\u52A1\u5DF2\u9A8C\u6536\u3002" })
        ] })
      ] })
    ] })
  ] });
}
function Monitor({ api, close, initialTab = "runs" }) {
  const [settings, setSettings] = (0, import_react16.useState)(null), [configOpen, setConfigOpen] = (0, import_react16.useState)(false), [workspaces, setWorkspaces] = (0, import_react16.useState)([]);
  const [settingsDirty, setSettingsDirty] = (0, import_react16.useState)(false), [confirmSettingsClose, setConfirmSettingsClose] = (0, import_react16.useState)("");
  const [data, setData] = (0, import_react16.useState)(null), [monitor, setMonitor] = (0, import_react16.useState)(null), [error, setError] = (0, import_react16.useState)(""), [connectionError, setConnectionError] = (0, import_react16.useState)("");
  const [loading, setLoading] = (0, import_react16.useState)(false), [revision, setRevision] = (0, import_react16.useState)(0), [selectedIssue, setSelectedIssue] = (0, import_react16.useState)("");
  const [tab, setTab] = (0, import_react16.useState)(new URLSearchParams(location.search).get("view") || initialTab);
  const [taskFilter, setTaskFilter] = (0, import_react16.useState)(new URLSearchParams(location.search).get("filter") || "all"), [taskQuery, setTaskQuery] = (0, import_react16.useState)(new URLSearchParams(location.search).get("q") || "");
  const scrollRef = (0, import_react16.useRef)(null), taskListScrollTop = (0, import_react16.useRef)(0);
  const motionRoot = (0, import_react16.useRef)(null);
  useMotionController(motionRoot);
  useSurfaceMotion(scrollRef, `${tab}:${selectedIssue}:${configOpen}`, configOpen ? ".mm-settings" : selectedIssue ? ".mm-task-workspace" : tab === "runs" ? ".v2-task-list" : tab === "runtimes" ? ".mm-runtime-view" : ".mm-main");
  const [theme, setTheme] = (0, import_react16.useState)(() => {
    try {
      return normalizeTheme(localStorage.getItem("multica-monitor.theme"));
    } catch {
      return normalizeTheme(null);
    }
  });
  const changeTheme = (value) => {
    const next = normalizeTheme(value);
    setTheme(next);
    try {
      localStorage.setItem("multica-monitor.theme", next);
    } catch {
    }
  };
  const [changingWorkspace, setChangingWorkspace] = (0, import_react16.useState)(false);
  const [initialRunId, setInitialRunId] = (0, import_react16.useState)("");
  const [alertIssue, setAlertIssue] = (0, import_react16.useState)("");
  const settingsButton = (0, import_react16.useRef)(null), discardConfirm = (0, import_react16.useRef)(null);
  (0, import_react16.useEffect)(() => {
    if (confirmSettingsClose) discardConfirm.current?.focus();
  }, [confirmSettingsClose]);
  const requestConfigClose = () => {
    if (settingsDirty) setConfirmSettingsClose("config");
    else setConfigOpen(false);
  };
  const requestMonitorClose = () => {
    if (settingsDirty) setConfirmSettingsClose("monitor");
    else close();
  };
  (0, import_react16.useEffect)(() => {
    const p = new URLSearchParams();
    if (tab !== "runs") p.set("view", tab);
    const task = data?.issues?.find((i) => i.id === selectedIssue);
    if (task) p.set("task", task.identifier);
    if (taskFilter !== "all") p.set("filter", taskFilter);
    if (taskQuery) p.set("q", taskQuery);
    history.replaceState(null, "", location.pathname + (p.size ? "?" + p.toString() : ""));
  }, [tab, selectedIssue, taskFilter, taskQuery, data]);
  const selectIssue = (issueId, runId = "") => {
    if (issueId && !selectedIssue && tab === "runs") taskListScrollTop.current = scrollRef.current?.scrollTop || 0;
    setSelectedIssue(issueId);
    setInitialRunId(runId);
  };
  (0, import_react16.useEffect)(() => {
    if (tab === "runs" && !selectedIssue && scrollRef.current) scrollRef.current.scrollTop = taskListScrollTop.current;
  }, [selectedIssue, tab]);
  const initialFocus = (0, import_react16.useRef)(null);
  (0, import_react16.useEffect)(() => {
    let live = true;
    initialFocus.current?.focus();
    api("settings").then((next) => {
      if (live) {
        setSettings(next);
        setConfigOpen(!next.hasToken);
      }
    }).catch((e) => {
      if (live) setConnectionError(errorMessage(e));
    });
    return () => {
      live = false;
    };
  }, [api]);
  (0, import_react16.useEffect)(() => {
    let live = true;
    setWorkspaces([]);
    if (!settings?.hasToken) return;
    api("workspaces").then((items) => {
      if (live) {
        setWorkspaces(items);
        setConnectionError("");
      }
    }).catch((e) => {
      if (live) setConnectionError(errorMessage(e));
    });
    return () => {
      live = false;
    };
  }, [api, settings]);
  (0, import_react16.useEffect)(() => {
    if (!settings?.hasToken || !settings.workspaceId) return;
    let live = true, timer, fallbackAt = 0;
    const controller = new AbortController();
    const sync = async () => {
      setLoading(true);
      try {
        const next = await api("monitor", {}, controller.signal);
        if (!live) return;
        setMonitor(next);
        setError(next.error || "");
        if (next.overview) setData({ ...next.overview, fetchedAt: next.lastSyncAt });
        else if (!next.enabled && Date.now() - fallbackAt >= 1e4) {
          fallbackAt = Date.now();
          const overview = await api("overview", {}, controller.signal);
          if (live) setData(overview);
        }
      } catch (e) {
        if (live) setError(errorMessage(e));
      } finally {
        if (live) {
          setLoading(false);
          timer = setTimeout(sync, 2e3);
        }
      }
    };
    void sync();
    return () => {
      live = false;
      clearTimeout(timer);
      controller.abort();
    };
  }, [api, settings, revision]);
  const saved = async (next) => {
    setData(null);
    setMonitor(null);
    setSelectedIssue("");
    setError("");
    setConnectionError("");
    setSettings(next);
    setConfigOpen(!next.hasToken);
    setSettingsDirty(false);
    setConfirmSettingsClose("");
  };
  const selectWorkspace = async (id2) => {
    setChangingWorkspace(true);
    try {
      await saved(await api("saveSettings", { workspaceId: id2 }));
    } catch (e) {
      setConnectionError(errorMessage(e));
    } finally {
      setChangingWorkspace(false);
    }
  };
  const workspace = workspaces.find((w) => w.id === settings?.workspaceId);
  const statuses = data?.statuses || [];
  const unread = (monitor?.alerts || []).filter((alert) => !alert.acknowledged && !alert.resolvedAt && !alert.historical).length;
  const monitorPaused = monitor?.enabled === false;
  const unavailable = Boolean(error || monitor?.error || monitor?.connectionStatus === "error" || monitorPaused);
  const metricsReady = Boolean(monitor?.metrics) && !unavailable;
  const statusLabel = { live: "\u4E8B\u4EF6\u5DF2\u8FDE\u63A5 \xB7 HTTP \u8865\u507F", polling: "HTTP \u6301\u7EED\u91C7\u96C6 \xB7 10 \u79D2\u515C\u5E95", error: "\u8FDE\u63A5\u4E2D\u65AD \xB7 \u6570\u636E\u53EF\u80FD\u8FC7\u671F", disabled: "\u6301\u7EED\u91C7\u96C6\u5DF2\u6682\u505C" }[monitor?.connectionStatus] || "\u7B49\u5F85\u540C\u6B65";
  const refresh = async () => {
    setLoading(true);
    try {
      setMonitor(await api("refreshMonitor"));
      setRevision((x) => x + 1);
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("section", { ref: motionRoot, className: "mm mm-v2", "data-theme": theme, role: "region", "aria-labelledby": "mm-title", onKeyDown: (event) => {
    if (event.key === "Escape" && !event.defaultPrevented && !event.target?.closest?.('[role="alertdialog"],dialog,[data-mm-escape-scope]')) {
      event.stopPropagation();
      requestMonitorClose();
    }
  }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("aside", { className: "v2-sidebar", children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("a", { className: "v2-brand", href: "./", children: [
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { className: "v2-brand-mark", children: "M" }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("span", { children: [
          "Multica",
          /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { className: "v2-brand-sub", children: "\u4EFB\u52A1\u89C2\u6D4B\u53F0" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "v2-workspace", children: [
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { children: "\u5F53\u524D\u5DE5\u4F5C\u533A" }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("strong", { children: workspace?.name || "\u6B63\u5728\u8BFB\u53D6\u2026" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { className: "v2-nav-label", children: "\u5DE5\u4F5C\u53F0" }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("nav", { className: "mm-tabs v2-nav", "aria-label": "\u76D1\u63A7\u89C6\u56FE", children: [["runs", "\u4EFB\u52A1\u76D1\u63A7"], ["alerts", "\u5F02\u5E38\u63D0\u9192"], ["metrics", "\u6267\u884C\u6027\u80FD"], ["runtimes", "\u8FD0\u884C\u65F6"]].map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("button", { "aria-current": tab === key ? "page" : void 0, onClick: () => {
        setTab(key);
        setAlertIssue("");
        setSelectedIssue("");
        setInitialRunId("");
      }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(TypeIcon, { type: key === "runs" ? "task" : key === "alerts" ? "error" : key === "metrics" ? "activity" : "system" }),
        label,
        key === "alerts" && !unavailable && unread > 0 && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { children: unread })
      ] }, key)) }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "v2-side-bottom", children: [
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { className: "v2-snapshot-dot" }),
        "\u771F\u5B9E\u6570\u636E\u9759\u6001\u5FEB\u7167",
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("br", {}),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("small", { children: "2026-11-05 08:33" }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("a", { href: "http://127.0.0.1:55315/", target: "_blank", rel: "noreferrer", children: "\u6253\u5F00\u539F\u7248\u5BF9\u6BD4 \u2197" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("header", { className: "mm-header", children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("p", { className: "v2-breadcrumb", children: [
          "\u5DE5\u4F5C\u533A / ",
          workspace?.name || "\u2026",
          " / ",
          selectedIssue ? "\u4EFB\u52A1\u8BE6\u60C5" : { runs: "\u4EFB\u52A1\u76D1\u63A7", alerts: "\u5F02\u5E38\u63D0\u9192", metrics: "\u6267\u884C\u6027\u80FD", runtimes: "\u8FD0\u884C\u65F6" }[tab]
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("h1", { id: "mm-title", children: selectedIssue ? "\u4EFB\u52A1\u8FD0\u884C\u8BE6\u60C5" : { runs: "\u4EFB\u52A1\u76D1\u63A7", alerts: "\u5F02\u5E38\u63D0\u9192", metrics: "\u6267\u884C\u6027\u80FD", runtimes: "\u8FD0\u884C\u65F6" }[tab] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "mm-actions", children: [
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { className: "v2-snapshot-label", children: "\u9759\u6001\u5FEB\u7167 \xB7 11 \u6708 5 \u65E5" }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("button", { ref: settingsButton, onClick: () => configOpen ? requestConfigClose() : setConfigOpen(true), disabled: !settings || !settings.hasToken, children: "\u8FDE\u63A5\u4FE1\u606F" }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("a", { className: "v2-original", href: "http://127.0.0.1:55315/", target: "_blank", rel: "noreferrer", children: "\u5BF9\u7167\u539F\u7248 \u2197" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "mm-scroll", ref: scrollRef, children: [
      connectionError && /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("p", { role: "alert", className: "mm-error", children: [
        connectionError,
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("button", { onClick: () => {
          if (settings) setSettings({ ...settings });
          else api("settings").then(setSettings).catch((e) => setConnectionError(errorMessage(e)));
        }, children: "\u91CD\u8BD5" })
      ] }),
      !settings && !connectionError && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { role: "status", children: "\u6B63\u5728\u8BFB\u53D6\u914D\u7F6E\u2026" }),
      settings && (configOpen || !settings.hasToken) && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(ConnectionForm, { api, settings, onSaved: saved, onClose: requestConfigClose, onDirtyChange: () => setSettingsDirty(true) }, settings.revision),
      confirmSettingsClose && /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "mm-settings-discard", role: "group", "aria-label": "\u786E\u8BA4\u653E\u5F03\u8FDE\u63A5\u8BBE\u7F6E\u6539\u52A8", "data-mm-escape-scope": true, onKeyDown: (event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          event.stopPropagation();
          setConfirmSettingsClose("");
          settingsButton.current?.focus();
        }
      }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("p", { children: [
          "\u8FDE\u63A5\u8BBE\u7F6E\u6709\u672A\u4FDD\u5B58\u7684\u6539\u52A8\u3002",
          confirmSettingsClose === "monitor" ? "\u9000\u51FA\u76D1\u63A7" : "\u6536\u8D77\u914D\u7F6E",
          "\u540E\u8FD9\u4E9B\u6539\u52A8\u4F1A\u4E22\u5931\u3002"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "mm-actions", children: [
          /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("button", { ref: discardConfirm, type: "button", onClick: () => {
            const leaveMonitor = confirmSettingsClose === "monitor";
            setConfirmSettingsClose("");
            setSettingsDirty(false);
            setConfigOpen(false);
            if (leaveMonitor) close();
            else settingsButton.current?.focus();
          }, children: confirmSettingsClose === "monitor" ? "\u653E\u5F03\u6539\u52A8\u5E76\u9000\u51FA" : "\u653E\u5F03\u6539\u52A8\u5E76\u6536\u8D77" }),
          /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("button", { type: "button", onClick: () => {
            setConfirmSettingsClose("");
            settingsButton.current?.focus();
          }, children: "\u7EE7\u7EED\u7F16\u8F91" })
        ] })
      ] }),
      settings?.hasToken && /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(import_jsx_runtime15.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("details", { className: "mm-connection-details", open: !settings.workspaceId || void 0, children: [
          /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("summary", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { children: workspace?.name || "\u5DE5\u4F5C\u533A\u4E0E\u8FDE\u63A5" }),
            /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { className: error ? "mm-error-text" : "mm-muted", children: "\u9759\u6001\u5FEB\u7167 \xB7 \u5237\u65B0\u4EC5\u91CD\u653E\u5DF2\u6709\u6570\u636E" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "mm-toolbar", children: [
            /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("label", { className: "mm-workspace", children: [
              "\u5DE5\u4F5C\u533A",
              /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("select", { "aria-label": "\u5DE5\u4F5C\u533A", value: settings.workspaceId, disabled: changingWorkspace, onChange: (event) => void selectWorkspace(event.target.value), children: [
                /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("option", { value: "", children: "\u9009\u62E9\u5DE5\u4F5C\u533A" }),
                workspaces.map((w) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("option", { value: w.id, children: w.name }, w.id))
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("button", { disabled: !settings.workspaceId || loading, onClick: () => void refresh(), children: [
              /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Icon, { kind: "refresh" }),
              "\u91CD\u8F7D\u5FEB\u7167"
            ] })
          ] })
        ] }),
        error && /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("p", { role: "alert", className: "mm-error", children: [
          error,
          data && "\uFF1B\u4EE5\u4E0B\u4FDD\u7559\u4E0A\u6B21\u5FEB\u7167\u3002"
        ] }),
        (monitor?.warnings || data?.warnings)?.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "mm-notice", role: "status", children: (monitor?.warnings || data.warnings).map((warning, index) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { children: typeof warning === "string" ? warning : "\u91C7\u96C6\u8B66\u544A\uFF0C\u8BF7\u68C0\u67E5\u8FDE\u63A5\u72B6\u6001\u3002" }, index)) }),
        !settings.workspaceId ? /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "mm-empty", children: [
          /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("h2", { children: "\u9009\u62E9\u8981\u76D1\u63A7\u7684\u5DE5\u4F5C\u533A" }),
          /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { children: "\u8FDE\u63A5\u540E\u5F00\u59CB\u6301\u7EED\u89C2\u5BDF\u4EFB\u52A1\u3001\u8FD0\u884C\u65E5\u5FD7\u548C\u5F02\u5E38\u3002" })
        ] }) : !data || !monitor ? /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "mm-empty", role: "status", children: loading || monitor?.enabled ? "\u6B63\u5728\u5EFA\u7ACB\u76D1\u63A7\u5FEB\u7167\u2026" : "\u6682\u65F6\u6CA1\u6709\u53EF\u5C55\u793A\u7684\u6570\u636E\uFF0C\u8BF7\u68C0\u67E5\u8FDE\u63A5\u540E\u91CD\u8BD5\u3002" }) : /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(import_jsx_runtime15.Fragment, { children: [
          tab !== "runs" && /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "mm-summary", "aria-label": metricsReady ? "\u5F53\u524D\u76D1\u63A7\u5FEB\u7167" : "\u5F53\u524D\u76D1\u63A7\u5FEB\u7167\u5F85\u6838\u5B9E", children: [
            /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("span", { children: [
              "\u6D3B\u52A8\u8FD0\u884C ",
              /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("strong", { children: metricsReady ? monitor.metrics.active ?? "\u2014" : "\u2014" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("span", { children: [
              "\u6392\u961F ",
              /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("strong", { children: metricsReady ? monitor.metrics.queued ?? "\u2014" : "\u2014" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("span", { className: metricsReady && unread ? "mm-error-text" : "", children: [
              "\u5F85\u5173\u6CE8 ",
              /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("strong", { children: metricsReady ? unread : "\u2014" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("span", { children: [
              "\u5DF2\u89C2\u6D4B\u7EC8\u6001 ",
              /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("strong", { children: metricsReady ? (monitor.metrics.sampleSize ?? 0) + (monitor.metrics.cancelled ?? 0) : "\u2014" })
            ] }),
            !metricsReady && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { className: "mm-muted", children: monitorPaused ? "\u6301\u7EED\u91C7\u96C6\u5DF2\u6682\u505C" : "\u91C7\u96C6\u5F85\u6838\u5B9E" })
          ] }),
          tab === "runs" && (selectedIssue ? /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(IssueDetail, { settings, unavailable, primary: true, runtimes: data.runtimes || [], onClose: () => selectIssue(""), onSelectIssue: selectIssue, issues: data.issues, preferredRunId: initialRunId, observedRuns: monitor.runs || [], api, issueId: selectedIssue, statuses, agents: data.agents, webUrl: settings.webUrl, workspaceSlug: workspace?.slug, revision }, settings.revision + selectedIssue + initialRunId) : /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(TaskList, { alerts: monitor.alerts || [], historicalFailures: monitor.historicalFailures || [], unavailable, unavailableLabel: monitorPaused ? "\u6301\u7EED\u76D1\u63A7\u5DF2\u6682\u505C\uFF0C\u5F53\u524D\u72B6\u6001\u5F85\u6838\u5B9E" : void 0, filter: taskFilter, query: taskQuery, onFilterChange: setTaskFilter, onQueryChange: setTaskQuery, onAlerts: (id2) => {
            setAlertIssue(id2);
            setTab("alerts");
          }, issues: data.issues, runs: monitor.runs || [], agents: data.agents, statuses, issuesTruncated: data.issuesTruncated, onSelect: selectIssue })),
          ["alerts", "metrics"].includes(tab) && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "mm-body", children: /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("main", { className: "mm-main", children: [
            tab === "alerts" && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(AlertsView, { scopedIssueId: alertIssue, onClearScope: () => setAlertIssue(""), monitor, api, settings, issues: data.issues, agents: data.agents, onSettingsSaved: saved, onSelect: (id2, runId) => {
              selectIssue(id2, runId);
              setTab("runs");
            }, onUpdate: setMonitor }),
            " ",
            tab === "metrics" && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(MetricsView, { monitor, agents: data.agents })
          ] }) }),
          tab === "issues" && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(RunsView, { monitor, issues: data.issues, issuesTruncated: data.issuesTruncated, onSelect: (id2, runId) => {
            selectIssue(id2, runId);
            setTab("runs");
          }, Badge, businessStatusLabel: (key) => businessLabel(statuses, key) }),
          tab === "runtimes" && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(RuntimeView, { runtimes: data.runtimes, available: data.available?.runtimes !== false, Badge })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("footer", { className: "mm-footer", children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { children: "\u65B0\u7248\u5BF9\u7167\u7A3F \xB7 \u6240\u6709\u7CFB\u7EDF\u5199\u64CD\u4F5C\u5DF2\u9694\u79BB" }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { children: "\u771F\u5B9E\u5FEB\u7167 \xB7 10 \u4E2A\u4EFB\u52A1 / 22 \u6B21\u8FD0\u884C / 6,960 \u6761\u65E5\u5FD7" })
    ] })
  ] });
}
function apply(ctx) {
  ctx.effect(() => {
    const style = document.createElement("style");
    style.textContent = [style_default, task_timeline_default, call_graph_default, console_default, native_trace_default, run_conversation_default, run_execution_default, run_waterfall_default, task_monitor_default, redesign_default, ui_icons_default, polish_default].join("\n");
    document.head.append(style);
    return () => style.remove();
  }, "multica-monitor: styles");
  let previousFocus = null, unread = 0, openView = "runs";
  const panelId = "multica-monitor";
  const panelInfo = ctx.layout.panelInfo;
  const isSelected = () => panelInfo.getSnapshot().activePanelId === panelId;
  const listeners = /* @__PURE__ */ new Set();
  const open = (view = "runs") => {
    previousFocus = document.activeElement;
    openView = view;
    ctx.layout.selectPanel(panelId);
    for (const listener of listeners) listener();
  };
  const close = () => {
    ctx.layout.selectPanel(null);
    previousFocus?.focus?.();
  };
  const createApi = () => {
    let connectionRevision = "";
    return async (action, payload = {}, signal) => {
      const transport = await fetch("api/multica-monitor", {
        method: "POST",
        credentials: "same-origin",
        signal,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ endpoint: action, payload: { ...payload, connectionRevision } })
      });
      if (!transport.ok) throw new Error(transport.status === 401 || transport.status === 403 ? "DSH \u767B\u5F55\u5DF2\u5931\u6548\u6216\u65E0\u8BBF\u95EE\u6743\u9650\uFF0C\u8BF7\u91CD\u65B0\u6253\u5F00 DSH" : `\u76D1\u63A7\u5BBF\u4E3B\u8FD4\u56DE HTTP ${transport.status}`);
      const response = await transport.json();
      if (!response.ok) throw new Error(response.error?.message || response.error || "\u76D1\u63A7\u670D\u52A1\u8BF7\u6C42\u5931\u8D25");
      if (action === "settings" || action === "saveSettings") connectionRevision = response.value.revision;
      return response.value;
    };
  };
  const api = createApi(), notificationApi = createApi();
  const subscribe = (callback) => {
    listeners.add(callback);
    return () => listeners.delete(callback);
  };
  function Button({ wide }) {
    const count = (0, import_react16.useSyncExternalStore)(subscribe, () => unread);
    const selected = (0, import_react16.useSyncExternalStore)(panelInfo.subscribe, isSelected);
    return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("button", { className: "mm-launch", "aria-current": selected ? "page" : void 0, title: `Multica \u76D1\u63A7${count ? ` \xB7 ${count} \u6761\u5F85\u5173\u6CE8` : ""}`, "aria-label": "\u6253\u5F00 Multica \u76D1\u63A7", onClick: () => open(), children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Icon, {}),
      wide && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { children: "Multica \u76D1\u63A7" }),
      count > 0 && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { className: "mm-unread", children: count })
    ] });
  }
  function Notifications({ isOpen }) {
    const [alert, setAlert] = (0, import_react16.useState)(null);
    const seen = (0, import_react16.useRef)(/* @__PURE__ */ new Set());
    (0, import_react16.useEffect)(() => {
      let live = true, timer, scope = "";
      const controller = new AbortController();
      const poll = async () => {
        try {
          const settings = await notificationApi("settings", {}, controller.signal);
          if (!live) return;
          if (scope !== settings.revision) {
            scope = settings.revision;
            seen.current.clear();
            setAlert(null);
          }
          const state = settings.hasToken && settings.workspaceId ? await notificationApi("alerts", {}, controller.signal) : { alerts: [] };
          if (!live) return;
          const pending = state.alerts.filter((item) => !item.acknowledged && !item.resolvedAt && !item.historical);
          unread = pending.length;
          for (const listener of listeners) listener();
          const next = [...pending].reverse().find((item) => !seen.current.has(item.id));
          for (const item of state.alerts) seen.current.add(item.id);
          while (seen.current.size > 400) seen.current.delete(seen.current.values().next().value);
          if (next) setAlert(next);
          else setAlert((previous) => previous && pending.some((item) => item.id === previous.id) ? previous : null);
        } catch {
        } finally {
          if (live) timer = setTimeout(poll, 3e3);
        }
      };
      void poll();
      return () => {
        live = false;
        controller.abort();
        clearTimeout(timer);
      };
    }, []);
    return !isOpen && alert ? /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("aside", { className: "mm-toast", role: "status", children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("strong", { children: [
          "Multica \xB7 ",
          alert.title
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { children: alert.suggestion })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("button", { onClick: () => {
        setAlert(null);
        open("alerts");
      }, children: "\u67E5\u770B\u63D0\u9192" }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("button", { "aria-label": "\u6536\u8D77\u63D0\u9192", onClick: () => setAlert(null), children: "\xD7" })
    ] }) : null;
  }
  function Panel() {
    const view = (0, import_react16.useSyncExternalStore)(subscribe, () => openView);
    return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "mm-panel", children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Monitor, { api, close, initialTab: view }, view) });
  }
  function NotificationLayer() {
    const isOpen = (0, import_react16.useSyncExternalStore)(panelInfo.subscribe, isSelected);
    return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Notifications, { isOpen });
  }
  ctx.slots.inject("sidebar.footer.action", () => ctx.slots.register({ name: "sidebar.footer.action", id: "multica-monitor", order: 50 }, Button));
  ctx.slots.inject("main", () => ctx.slots.register({ name: "main", key: panelId, id: panelId }, Panel));
  ctx.slots.inject("shell.overlay", () => ctx.slots.register({ name: "shell.overlay", id: "multica-monitor-notifications" }, NotificationLayer));
}

return module.exports;}});