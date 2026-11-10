// src/ui-icons.jsx
import React from "react";

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

// src/ui-icons.jsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function AgentAvatar({ name, size = 22 }) {
  return /* @__PURE__ */ jsx("span", { className: "ui-agent-avatar", "data-agent": name || "", title: name ? `\u667A\u80FD\u4F53\uFF1A${name}` : "\u667A\u80FD\u4F53", style: { "--avatar-size": `${size}px` }, "aria-hidden": "true", children: agentPortrait(name) });
}

// src/call-graph.jsx
import React2, { useEffect, useId, useMemo, useRef, useState } from "react";

// src/task-relationships.mjs
var TERMINAL = /* @__PURE__ */ new Set(["completed", "failed", "cancelled"]);
var WAITING = /* @__PURE__ */ new Set(["queued", "dispatched", "waiting_local_directory", "deferred"]);
var MAX_RUNS = 1e3;
var MAX_RELATIONS = 5e3;
var id = (value) => typeof value === "string" && value.length > 0 && value.length <= 256 ? value : null;
var object = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
var time = (value) => typeof value === "number" && Number.isFinite(value) ? value : typeof value === "string" && Number.isFinite(Date.parse(value)) ? Date.parse(value) : null;
var knownCoverage = /* @__PURE__ */ new Set(["complete", "partial", "failed", "unknown", "unsupported"]);
var coverageValue = (value) => knownCoverage.has(value) ? value : "unknown";
var orderedTime = (run) => run.startMs ?? time(run.startedAt) ?? time(run.createdAt) ?? Infinity;
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
function interval(run, now) {
  const startMs = time(run.startedAt), endMs = time(run.completedAt);
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
  const nowMs = time(now);
  const runs = selected.rows.map((run) => interval(run, nowMs)).sort(chronological);
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
function triggerExcerpt(value, limit = 24) {
  if (typeof value !== "string" || !value.trim()) return "\u6458\u8981\u672A\u63D0\u4F9B";
  const failure = /^Delegated task `[^`]+` ended in a final failure \(`[^`]+`\) and no automatic retry is pending\./.test(value);
  if (failure) return "\u59D4\u6D3E\u8FD0\u884C\u6700\u7EC8\u5931\u8D25\uFF0C\u672A\u5B89\u6392\u81EA\u52A8\u91CD\u8BD5";
  const lines = value.replace(/\[([^\]]+)\]\(mention:\/\/[^)]+\)/g, "$1").replace(/\*\*|`/g, "").split(/\r?\n/).map((line2) => line2.replace(/^[\s#*>-]+/, "").replace(/^(?:本次)?派给\s*@?[^\s：:]+[：:]\s*/, "").trim()).filter(Boolean);
  if (!lines.length) return "\u6458\u8981\u672A\u63D0\u4F9B";
  const line = lines.find((text) => /^(?:任务|要求|目标|请|负责|执行|检查|修复|审查|验证|实现)/.test(text)) || lines.find((text) => !/^(?:本次派给|派给|@|mention:)/.test(text)) || lines[0];
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

// src/run-conversation.mjs
var activeRunStates = /* @__PURE__ */ new Set(["running", "queued", "dispatched", "deferred", "waiting_local_directory"]);
function shortDuration(ms) {
  if (ms == null || !Number.isFinite(ms)) return "\u2014";
  const seconds = Math.floor(Math.max(0, ms) / 1e3);
  return seconds < 60 ? `${seconds} \u79D2` : seconds < 3600 ? `${Math.floor(seconds / 60)} \u5206 ${seconds % 60} \u79D2` : `${Math.floor(seconds / 3600)} \u5C0F\u65F6 ${Math.floor(seconds / 60) % 60} \u5206`;
}

// src/execution-trace.mjs
var timeMs = (value) => typeof value === "string" && Number.isFinite(Date.parse(value)) ? Date.parse(value) : null;
var traceDuration = (value) => value > 0 && value < 1e3 ? "\u5C11\u4E8E 1 \u79D2" : shortDuration(value);
var interval2 = (start, end) => start != null && end != null && end >= start ? end - start : null;
var threshold = (settings, key, fallback) => Number.isFinite(settings?.[key]) && settings[key] > 0 ? settings[key] * 6e4 : fallback * 6e4;
function executionMetrics(run, { now = Date.now(), observedRun, unavailable = false, settings = {}, runtimeStatus } = {}) {
  const active = activeRunStates.has(run.status), waiting = active && run.status !== "running";
  const sameIdentity = observedRun?.id === run.id && observedRun?.issueId === run.issueId;
  const stateConflict = Boolean(sameIdentity && observedRun.status !== run.status);
  const observationLost = Boolean(sameIdentity && observedRun.observationError);
  const stale = unavailable || active && (stateConflict || observationLost);
  const started = timeMs(run.startedAt), created = timeMs(run.createdAt), ended = timeMs(run.completedAt);
  const running = run.status === "running" && run.completedAt == null;
  const terminal = ["completed", "failed", "cancelled"].includes(run.status);
  const validStart = started != null && started <= now;
  const elapsed2 = validStart && (terminal && ended != null && ended <= now || running && !stale) ? interval2(started, terminal ? ended : now) : null;
  const waitEnd = (running || terminal) && validStart ? started : waiting && run.startedAt == null && run.completedAt == null && !stale ? now : null;
  const wait = created != null && created <= now ? interval2(created, waitEnd) : null;
  const observed = observedRun?.id === run.id && observedRun?.issueId === run.issueId && observedRun.status === run.status ? observedRun : null;
  const healthy = !stale && runtimeStatus !== "offline" && observed && !observed.logError && !observed.observationError && observed.logsCaughtUp === true && observed.workProgress?.coverage?.partial !== true && observed.workProgress?.coverage?.logsCaughtUp !== false;
  const silence = healthy && running && Number.isFinite(observed.silenceMs) && observed.silenceMs >= 0 ? observed.silenceMs : null;
  const alerts = [];
  if (active && stateConflict) alerts.push("\u8FD0\u884C\u72B6\u6001\u5C1A\u5F85\u6838\u5B9E");
  if (!unavailable && waiting && started == null && wait >= threshold(settings, "queueMinutes", 5)) alerts.push("\u542F\u52A8\u7B49\u5F85\u8F83\u957F");
  if (!unavailable && running && elapsed2 >= threshold(settings, "runMinutes", 60)) alerts.push("\u8FD0\u884C\u65F6\u95F4\u8F83\u957F");
  if (silence != null && silence >= threshold(settings, "noProgressMinutes", 10)) alerts.push("\u8F83\u4E45\u672A\u6536\u5230\u65B0\u53CD\u9988");
  return { active, running, waiting, started, created, ended, elapsed: elapsed2, wait, observed, healthy, silence, alerts, stateConflict, observationLost };
}

// src/call-graph.jsx
import { Fragment as Fragment2, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var MAX_NODES = 80;
var MAX_INPUT = 1e3;
var ACTIVE = /* @__PURE__ */ new Set(["running", "queued", "dispatched", "waiting_local_directory", "deferred"]);
var TYPES = { delegation: "\u59D4\u6D3E", rerun: "\u91CD\u8DD1", retry: "\u91CD\u8BD5", parent_run: "\u7236\u8FD0\u884C" };
var STATUS = { running: "\u8FD0\u884C\u4E2D", queued: "\u6392\u961F\u4E2D", dispatched: "\u5DF2\u6D3E\u53D1", waiting_local_directory: "\u7B49\u672C\u5730\u76EE\u5F55", deferred: "\u6682\u7F13", completed: "\u5DF2\u5B8C\u6210", failed: "\u5931\u8D25", cancelled: "\u5DF2\u53D6\u6D88", unknown: "\u5F85\u6838\u5B9E" };
var NODE_WIDTH = 244;
var NODE_HEIGHT = 104;
var shortId = (value) => String(value || "").slice(-8);
var parsedTime = (value) => typeof value === "string" && Number.isFinite(Date.parse(value)) ? Date.parse(value) : null;
var orderTime = (run) => parsedTime(run.startedAt) ?? parsedTime(run.createdAt) ?? 0;
var chronological2 = (a, b) => orderTime(a) - orderTime(b) || a.id.localeCompare(b.id);
var agentLabel = (run) => run.agentName || (run.agentId ? `\u667A\u80FD\u4F53 ${shortId(run.agentId)}` : "\u8EAB\u4EFD\u672A\u63D0\u4F9B");
var runLabel = (run) => `${agentLabel(run)} #${shortId(run.id)}`;
var clock = (ms) => Number.isFinite(ms) ? new Date(ms).toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", hour12: false }) : "\u65F6\u95F4\u672A\u77E5";
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
  return /* @__PURE__ */ jsx2("svg", { viewBox: "0 0 16 16", width: "16", height: "16", "aria-hidden": "true", children: /* @__PURE__ */ jsx2("path", { d: plus ? "M3 8h10M8 3v10" : "M3 8h10", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }) });
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
  const creation = when == null ? "\u521B\u5EFA\u672A\u63D0\u4F9B" : `\u521B\u5EFA ${clock(when)}`;
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
  const [expanded, setExpanded] = useState(false);
  const [filters, setFilters] = useState({ status: "all", agent: "", query: "", from: "", until: "" });
  const [summaries, setSummaries] = useState(false);
  const [focused, setFocused] = useState(false);
  const graphSection = useRef(null);
  useEffect(() => {
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
  const filtered = useMemo(() => filterGraphRuns(detail?.runs || [], filters), [detail, filters]);
  const filtering = filters.status !== "all" || Boolean(filters.agent || filters.query || filters.from || filters.until);
  const graph = useMemo(() => buildCallGraphLayout({ ...detail, runs: filtered.runs, knownRunIds: (detail?.runs || []).map((run) => run.id) }, Date.now(), filtered.runs.some((run) => run.id === selectedRunId) ? selectedRunId : "", expanded ? MAX_NODES : 30, filtering ? [...filtered.matchedIds] : []), [detail, filtered, filtering, selectedRunId, expanded]);
  const changeFilter = (key, value) => {
    setFilters((old) => ({ ...old, [key]: value }));
    setSelectedEdgeId("");
  };
  const roles = [...new Map((detail?.runs || []).filter((run) => run.agentId).map((run) => [run.agentId, agentLabel(run)])).entries()];
  const [scale, setScale] = useState(1);
  const [selectedEdgeId, setSelectedEdgeId] = useState("");
  const [commentTime, setCommentTime] = useState(null), [commentRetry, setCommentRetry] = useState(0);
  const [humanActivity, setHumanActivity] = useState({ status: "loading", items: [] });
  const [humanRetry, setHumanRetry] = useState(0);
  useEffect(() => {
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
  const viewport = useRef(null);
  useEffect(() => {
    if (viewport.current) {
      setScale(Math.min(1, Math.max(0.7, (viewport.current.clientWidth - 20) / graph.width)));
      viewport.current.scrollTop = 0;
      viewport.current.scrollLeft = 0;
    }
  }, [detail?.issue?.id, graph.width]);
  useEffect(() => {
    const node = graph.nodes.find((n) => n.id === selectedRunId);
    if (node && viewport.current) viewport.current.scrollTo({ top: Math.max(0, node.y * scale - 120), left: Math.max(0, node.x * scale - 100), behavior: "auto" });
  }, [selectedRunId]);
  const selectedEdge = graph.edges.find((edge) => edge.id === selectedEdgeId);
  const edgeInfo = selectedEdge ? describeCallEdge(selectedEdge, observedRuns, unavailable) : null;
  const targetIssueId = selectedEdge?.toNode.run.issueId || "";
  const commentId = selectedEdge?.toNode.run.triggerCommentId || "";
  const commentKey = `${selectedEdgeId}:${targetIssueId}:${commentId}`;
  useEffect(() => {
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
  const id2 = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const presentTypes = Object.entries(TYPES).filter(([type]) => graph.edges.some((edge) => edge.type === type));
  const fitWidth = () => setScale(Math.min(1.5, Math.max(0.25, ((viewport.current?.clientWidth || graph.width) - 20) / graph.width)));
  const selectedNode = graph.nodes.find((node) => node.id === selectedRunId);
  const revealSelected = () => {
    if (!selectedNode || !viewport.current) return;
    viewport.current.scrollIntoView({ block: "start", behavior: "auto" });
    viewport.current.scrollTo({ top: Math.max(0, selectedNode.y * scale - 36), left: Math.max(0, selectedNode.x * scale - 36), behavior: "auto" });
  };
  return /* @__PURE__ */ jsxs2("section", { ref: graphSection, className: `mm-call-graph ${focused ? "is-focused" : ""}`, "aria-label": "\u8FD0\u884C\u8C03\u7528\u56FE", children: [
    /* @__PURE__ */ jsxs2("div", { className: "mm-call-toolbar", children: [
      /* @__PURE__ */ jsxs2("div", { className: "mm-call-description", children: [
        /* @__PURE__ */ jsxs2("strong", { children: [
          detail?.issue?.identifier || "\u5F53\u524D\u4EFB\u52A1",
          " \xB7 ",
          graph.nodes.length,
          " \u6B21\u8FD0\u884C \xB7 ",
          graph.edges.length,
          " \u6761\u5173\u7CFB"
        ] }),
        /* @__PURE__ */ jsx2("button", { type: "button", onClick: () => setFocused((value) => !value), children: focused ? "\u9000\u51FA\u4E13\u6CE8" : "\u4E13\u6CE8\u56FE\u8C31" })
      ] }),
      graph.nodes.length > 0 && /* @__PURE__ */ jsxs2("div", { className: "mm-call-zoom", role: "group", "aria-label": "\u8C03\u7528\u56FE\u89C6\u56FE\u63A7\u5236", children: [
        /* @__PURE__ */ jsx2("button", { type: "button", onClick: () => setScale((value) => Math.max(0.25, Math.round((value - 0.1) * 100) / 100)), disabled: scale <= 0.25, "aria-label": "\u7F29\u5C0F\u8C03\u7528\u56FE", title: "\u7F29\u5C0F", children: /* @__PURE__ */ jsx2(ZoomIcon, {}) }),
        /* @__PURE__ */ jsxs2("button", { type: "button", onClick: () => setScale(1), "aria-label": "\u6062\u590D\u539F\u59CB\u5927\u5C0F", title: "\u6062\u590D 100%", children: [
          Math.round(scale * 100),
          "%"
        ] }),
        /* @__PURE__ */ jsx2("button", { type: "button", onClick: () => setScale((value) => Math.min(1.5, Math.round((value + 0.1) * 100) / 100)), disabled: scale >= 1.5, "aria-label": "\u653E\u5927\u8C03\u7528\u56FE", title: "\u653E\u5927", children: /* @__PURE__ */ jsx2(ZoomIcon, { plus: true }) }),
        /* @__PURE__ */ jsx2("button", { type: "button", onClick: fitWidth, children: "\u9002\u5E94\u5BBD\u5EA6" }),
        selectedNode && /* @__PURE__ */ jsx2("button", { type: "button", onClick: revealSelected, children: "\u5B9A\u4F4D\u9009\u4E2D\u8FD0\u884C" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs2("div", { className: "mm-graph-filters", children: [
      /* @__PURE__ */ jsxs2("select", { "aria-label": "\u7B5B\u9009\u8FD0\u884C\u72B6\u6001", value: filters.status, onChange: (event) => changeFilter("status", event.target.value), children: [
        /* @__PURE__ */ jsx2("option", { value: "all", children: "\u5168\u90E8\u72B6\u6001" }),
        /* @__PURE__ */ jsx2("option", { value: "failed", children: "\u5931\u8D25\u8FD0\u884C" }),
        /* @__PURE__ */ jsx2("option", { value: "active", children: "\u6D3B\u52A8\u8FD0\u884C" }),
        /* @__PURE__ */ jsx2("option", { value: "completed", children: "\u5DF2\u5B8C\u6210" }),
        /* @__PURE__ */ jsx2("option", { value: "cancelled", children: "\u5DF2\u53D6\u6D88" })
      ] }),
      /* @__PURE__ */ jsxs2("select", { "aria-label": "\u7B5B\u9009\u667A\u80FD\u4F53", value: filters.agent, onChange: (event) => changeFilter("agent", event.target.value), children: [
        /* @__PURE__ */ jsx2("option", { value: "", children: "\u5168\u90E8\u667A\u80FD\u4F53" }),
        roles.map(([id3, label]) => /* @__PURE__ */ jsx2("option", { value: id3, children: label }, id3))
      ] }),
      /* @__PURE__ */ jsx2("input", { "aria-label": "\u641C\u7D22\u8FD0\u884C\u6216\u89E6\u53D1\u5185\u5BB9", placeholder: "\u8FD0\u884C\u7F16\u53F7 / \u89E6\u53D1\u5185\u5BB9", value: filters.query, onChange: (event) => changeFilter("query", event.target.value) }),
      /* @__PURE__ */ jsxs2("details", { children: [
        /* @__PURE__ */ jsx2("summary", { children: "\u65F6\u95F4\u8303\u56F4" }),
        /* @__PURE__ */ jsxs2("label", { children: [
          "\u5F00\u59CB\u4E8E",
          /* @__PURE__ */ jsx2("input", { type: "datetime-local", "aria-label": "\u8FD0\u884C\u5F00\u59CB\u65F6\u95F4\u4E0B\u9650", value: filters.from, onChange: (event) => changeFilter("from", event.target.value) })
        ] }),
        /* @__PURE__ */ jsxs2("label", { children: [
          "\u622A\u81F3",
          /* @__PURE__ */ jsx2("input", { type: "datetime-local", "aria-label": "\u8FD0\u884C\u5F00\u59CB\u65F6\u95F4\u4E0A\u9650", value: filters.until, onChange: (event) => changeFilter("until", event.target.value) })
        ] }),
        /* @__PURE__ */ jsx2("small", { children: "\u6309\u8FD0\u884C\u5F00\u59CB\u65F6\u95F4\u7B5B\u9009\uFF1B\u672A\u5F00\u59CB\u65F6\u4F7F\u7528\u521B\u5EFA\u65F6\u95F4\u3002" })
      ] }),
      /* @__PURE__ */ jsxs2("label", { children: [
        /* @__PURE__ */ jsx2("input", { type: "checkbox", checked: summaries, onChange: (event) => setSummaries(event.target.checked) }),
        "\u8FDE\u7EBF\u6458\u8981"
      ] }),
      filtering && /* @__PURE__ */ jsx2("button", { onClick: () => setFilters({ status: "all", agent: "", query: "", from: "", until: "" }), children: "\u6E05\u9664\u7B5B\u9009" })
    ] }),
    filtering && /* @__PURE__ */ jsx2("p", { className: "mm-call-filter-result", role: "status", children: filtered.invalidRange ? "\u5F00\u59CB\u65F6\u95F4\u4E0D\u80FD\u665A\u4E8E\u622A\u6B62\u65F6\u95F4\u3002" : "\u5339\u914D " + filtered.matchedIds.size + " \u6B21\u8FD0\u884C\uFF0C\u56FE\u4E2D\u663E\u793A " + graph.nodes.filter((node) => filtered.matchedIds.has(node.id)).length + " \u6B21\u5339\u914D\u548C " + graph.nodes.filter((node) => !filtered.matchedIds.has(node.id)).length + " \u6B21\u76F8\u90BB\u8FD0\u884C\uFF1B\u76F8\u90BB\u8FD0\u884C\u4EC5\u4F9B\u4E0A\u4E0B\u6587\u3002" }),
    graph.omittedRuns > 0 && /* @__PURE__ */ jsxs2("p", { className: "mm-call-notice", children: [
      "\u5171\u8BFB\u53D6 ",
      graph.totalRuns,
      " \u6B21\u8FD0\u884C\uFF0C\u56FE\u4E2D\u5C55\u793A ",
      graph.nodes.length,
      " \u6B21\uFF0C\u4F18\u5148\u4FDD\u7559\u9009\u4E2D\u3001\u6D3B\u52A8\u53CA\u76F8\u90BB\u8FD0\u884C\u3002",
      graph.omittedActive > 0 && `\u53E6\u6709 ${graph.omittedActive} \u6B21\u6D3B\u52A8\u8FD0\u884C\u672A\u5C55\u793A\u3002`,
      "\u672A\u5C55\u793A\u7684\u4E0A\u6E38\u6765\u6E90\u5DF2\u6807\u6CE8\u3002"
    ] }),
    graph.totalRuns > 30 && /* @__PURE__ */ jsx2("p", { className: "mm-call-notice", children: !expanded ? /* @__PURE__ */ jsx2("button", { type: "button", onClick: () => setExpanded(true), children: "\u5C55\u5F00\u66F4\u591A\u8FD0\u884C\uFF08\u6700\u591A 80 \u6761\uFF09" }) : /* @__PURE__ */ jsx2("button", { type: "button", onClick: () => setExpanded(false), children: "\u6536\u8D77\u4E3A\u805A\u7126\u89C6\u56FE" }) }),
    (graph.inputTruncated || graph.historyTruncated) && /* @__PURE__ */ jsxs2("p", { className: "mm-call-notice", children: [
      "\u8FD0\u884C\u5386\u53F2\u5C1A\u672A\u5B8C\u6574\u8BFB\u53D6\uFF08\u4EFB\u52A1\u5386\u53F2\u6700\u591A 500 \u6761\uFF0C\u54CD\u5E94\u5927\u5C0F\u53D7\u9650\uFF09\uFF0C\u8C03\u7528\u56FE\u4EC5\u8986\u76D6",
      graph.inputTruncated ? "\u524D 1,000 \u6761" : "\u5DF2\u52A0\u8F7D",
      "\u8BB0\u5F55\u3002"
    ] }),
    graph.nodes.length === 0 ? /* @__PURE__ */ jsxs2("div", { className: "mm-call-empty", children: [
      /* @__PURE__ */ jsx2("strong", { children: filtering ? "\u6CA1\u6709\u7B26\u5408\u6761\u4EF6\u7684\u8FD0\u884C" : "\u8FD8\u6CA1\u6709\u53EF\u5C55\u793A\u7684\u8FD0\u884C" }),
      /* @__PURE__ */ jsx2("p", { children: filtering ? "\u8C03\u6574\u7B5B\u9009\u6761\u4EF6\u67E5\u770B\u5176\u4ED6\u8FD0\u884C\u3002" : "\u4EFB\u52A1\u4EA7\u751F\u8FD0\u884C\u8BB0\u5F55\u540E\uFF0C\u8FD9\u91CC\u4F1A\u663E\u793A\u667A\u80FD\u4F53\u4E4B\u95F4\u7684\u8C03\u7528\u8DEF\u5F84\u3002" })
    ] }) : /* @__PURE__ */ jsxs2(Fragment2, { children: [
      graph.edges.length === 0 && /* @__PURE__ */ jsx2("p", { className: "mm-call-notice", children: graph.unresolved.length ? "\u5F53\u524D\u8BB0\u5F55\u4E0D\u8DB3\u4EE5\u8FDE\u51FA\u8C03\u7528\u8DEF\u5F84\uFF0C\u4E0A\u6E38\u672A\u52A0\u8F7D\u6216\u6765\u6E90\u5F85\u6838\u5B9E\u7684\u8FD0\u884C\u5DF2\u6807\u6CE8\u3002" : graph.lineageKnown ? "\u5DF2\u52A0\u8F7D\u8FD0\u884C\u6CA1\u6709\u660E\u786E\u7684\u8C03\u7528\u5173\u8054\uFF1B\u4E0B\u65B9\u5206\u522B\u5C55\u793A\u5404\u6B21\u8FD0\u884C\u3002" : "\u5C1A\u672A\u8BFB\u5230\u660E\u786E\u7684\u8C03\u7528\u6765\u6E90\uFF1B\u5404\u6B21\u8FD0\u884C\u5206\u522B\u5C55\u793A\uFF0C\u4E0D\u6309\u65F6\u95F4\u63A8\u65AD\u8C03\u7528\u3002" }),
      /* @__PURE__ */ jsxs2("div", { className: "mm-call-legend", children: [
        /* @__PURE__ */ jsx2("span", { className: "mm-call-status-legend", children: [["running", "\u8FD0\u884C\u4E2D"], ["completed", "\u5DF2\u5B8C\u6210"], ["failed", "\u5931\u8D25"], ["waiting", "\u7B49\u5F85\u4E2D"]].map(([state, label]) => /* @__PURE__ */ jsxs2("span", { children: [
          /* @__PURE__ */ jsx2("i", { className: `status-${state}`, "aria-hidden": "true" }),
          label
        ] }, state)) }),
        presentTypes.map(([type, label]) => /* @__PURE__ */ jsxs2("span", { children: [
          /* @__PURE__ */ jsxs2("svg", { width: "28", height: "10", viewBox: "0 0 28 10", "aria-hidden": "true", children: [
            /* @__PURE__ */ jsx2("path", { d: "M1 5h24", className: `mm-call-edge ${type}`, fill: "none" }),
            /* @__PURE__ */ jsx2("path", { d: "m22 2 4 3-4 3", className: `mm-call-edge ${type}`, fill: "none" })
          ] }),
          label
        ] }, type)),
        /* @__PURE__ */ jsx2("span", { className: "mm-call-scroll-hint", children: "\u70B9\u51FB\u8FDE\u7EBF\u67E5\u770B\u5173\u7CFB\u548C\u65F6\u95F4 \xB7 \u70B9\u51FB\u8FD0\u884C\u67E5\u770B\u8FDB\u5C55" })
      ] }),
      /* @__PURE__ */ jsxs2("div", { className: `mm-call-workbench ${edgeInfo ? "has-edge" : ""}`, children: [
        /* @__PURE__ */ jsx2("div", { ref: viewport, className: "mm-call-viewport", tabIndex: 0, role: "region", "aria-label": "\u53EF\u6EDA\u52A8\u8C03\u7528\u56FE\uFF0C\u4F7F\u7528\u7F29\u653E\u63A7\u4EF6\u6216\u6EDA\u52A8\u67E5\u770B\u5B8C\u6574\u5185\u5BB9", children: /* @__PURE__ */ jsx2("div", { className: "mm-call-scaled-space", style: { width: graph.width * scale, height: graph.height * scale }, children: /* @__PURE__ */ jsxs2("div", { className: "mm-call-canvas", style: { width: graph.width, height: graph.height, transform: `scale(${scale})` }, children: [
          graph.sections?.map((section, index) => /* @__PURE__ */ jsx2("div", { className: "v2-graph-group", style: { left: section.x, width: section.width, height: graph.height - 16 }, children: /* @__PURE__ */ jsxs2("span", { children: [
            section.title,
            /* @__PURE__ */ jsxs2("small", { children: [
              section.count,
              " \u6B21\u8FD0\u884C"
            ] })
          ] }) }, index)),
          /* @__PURE__ */ jsxs2("svg", { className: "mm-call-lines", width: graph.width, height: graph.height, viewBox: `0 0 ${graph.width} ${graph.height}`, role: "group", "aria-label": `${graph.edges.length} \u6761\u670D\u52A1\u7AEF\u660E\u786E\u8BB0\u5F55\u7684\u8C03\u7528\u5173\u7CFB`, children: [
            /* @__PURE__ */ jsx2("defs", { children: Object.keys(TYPES).map((type) => /* @__PURE__ */ jsx2("marker", { id: `${id2}-${type}`, viewBox: "0 0 7 7", refX: "6", refY: "3.5", markerWidth: "6", markerHeight: "6", orient: "auto", children: /* @__PURE__ */ jsx2("path", { d: "M0 0 7 3.5 0 7Z", className: `mm-call-arrow ${type}` }) }, type)) }),
            graph.edges.map((edge) => /* @__PURE__ */ jsxs2("g", { className: selectedEdgeId === edge.id ? "is-connected" : edge.emphasis, role: "button", tabIndex: 0, "aria-label": `\u67E5\u770B${runLabel(edge.fromNode.run)}\u4E0E${runLabel(edge.toNode.run)}\u7684${TYPES[edge.type]}\u5173\u7CFB`, onClick: () => setSelectedEdgeId(edge.id), onKeyDown: (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setSelectedEdgeId(edge.id);
              }
            }, children: [
              /* @__PURE__ */ jsx2("title", { children: `${agentLabel(edge.fromNode.run)} (${edge.from}) ${TYPES[edge.type]} ${agentLabel(edge.toNode.run)} (${edge.to})\uFF1B\u670D\u52A1\u7AEF\u6765\u6E90\u5B57\u6BB5\uFF1A${edge.evidence.field}` }),
              /* @__PURE__ */ jsx2("path", { d: edge.path, className: "mm-call-edge-clearance", fill: "none", stroke: "var(--mm-bg)", strokeWidth: "6" }),
              /* @__PURE__ */ jsx2("path", { d: edge.path, className: `mm-call-edge ${edge.type}`, markerEnd: `url(#${id2}-${edge.type})` }),
              /* @__PURE__ */ jsx2("path", { d: edge.path, className: "mm-call-edge-hit" }),
              /* @__PURE__ */ jsx2("text", { x: edge.labelX, y: edge.labelY, className: "v2-edge-label", children: TYPES[edge.type] }),
              (summaries || selectedEdgeId === edge.id) && /* @__PURE__ */ jsxs2("g", { transform: "translate(" + Math.max(126, Math.min(graph.width - 126, edge.labelX)) + "," + edge.labelY + ")", className: "mm-call-edge-preview", children: [
                /* @__PURE__ */ jsx2("title", { children: callEdgePreview(edge) }),
                /* @__PURE__ */ jsx2("rect", { x: "-122", y: "-21", width: "244", height: "42", rx: "4" }),
                /* @__PURE__ */ jsxs2("text", { textAnchor: "middle", y: "-5", children: [
                  TYPES[edge.type],
                  " \xB7 ",
                  parsedTime(edge.toNode.run.createdAt) === null ? "\u521B\u5EFA\u65F6\u95F4\u672A\u63D0\u4F9B" : "\u521B\u5EFA " + clock(parsedTime(edge.toNode.run.createdAt))
                ] }),
                /* @__PURE__ */ jsx2("text", { textAnchor: "middle", y: "11", children: triggerExcerpt(edge.toNode.run.triggerSummary, 19) })
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
            return /* @__PURE__ */ jsxs2("button", { type: "button", "data-run-id": node.id, className: `mm-call-node status-${safeStatus(node.run.status)}${ACTIVE.has(node.run.status) ? " is-active" : ""}${node.run.status === "failed" ? " is-failed" : ""}${selectedRunId === node.id ? " is-selected" : ""}${note ? " has-unresolved" : ""}${timing.alerts.length ? " has-attention" : ""}`, style: { left: node.x, top: node.y, width: node.width, height: node.height }, title: `${title}${timing.alerts.length ? `
${timing.alerts.join(" \xB7 ")}` : ""}`, "aria-pressed": selectedRunId === node.id, "aria-label": `\u67E5\u770B${runLabel(node.run)}\u7684\u8FDB\u5C55\uFF0C${status}\uFF0C${timingLabel}${timing.alerts.length ? `\uFF0C${timing.alerts.join("\uFF0C")}` : ""}${note ? `\uFF0C${note}` : ""}`, onClick: () => onSelectRun?.(node.id), disabled: !onSelectRun, children: [
              /* @__PURE__ */ jsx2("span", { className: "mm-call-node-kicker", children: "\u6267\u884C\u8FD0\u884C" }),
              /* @__PURE__ */ jsxs2("span", { className: "mm-call-node-name", children: [
                /* @__PURE__ */ jsx2(AgentAvatar, { name: agentLabel(node.run), size: 20 }),
                /* @__PURE__ */ jsx2("span", { className: "ui-agent-name", children: agentLabel(node.run) }),
                filtering && !filtered.matchedIds.has(node.id) && /* @__PURE__ */ jsx2("small", { children: " \xB7 \u76F8\u90BB" })
              ] }),
              /* @__PURE__ */ jsxs2("span", { className: "mm-call-node-identity", children: [
                /* @__PURE__ */ jsxs2("span", { children: [
                  "#",
                  shortId(node.id)
                ] }),
                /* @__PURE__ */ jsx2("span", { className: "mm-call-node-status", children: status })
              ] }),
              /* @__PURE__ */ jsxs2("span", { className: "mm-call-node-foot", children: [
                /* @__PURE__ */ jsx2("span", { className: note ? "mm-call-source-note" : "", children: note || timing.alerts[0] || "\u5F00\u59CB " + clock(parsedTime(node.run.startedAt)) }),
                /* @__PURE__ */ jsxs2("span", { children: [
                  node.run.ongoing && !timing.waiting ? "\u5DF2\u8FD0\u884C " : "",
                  timingLabel
                ] })
              ] })
            ] }, node.id);
          })
        ] }) }) }),
        edgeInfo && /* @__PURE__ */ jsxs2("section", { tabIndex: 0, className: "mm-call-edge-detail", "aria-label": "\u8C03\u7528\u5173\u7CFB\u8BE6\u60C5", children: [
          /* @__PURE__ */ jsxs2("div", { className: "mm-call-edge-detail-head", children: [
            /* @__PURE__ */ jsxs2("strong", { children: [
              edgeInfo.type,
              "\u5173\u7CFB"
            ] }),
            /* @__PURE__ */ jsx2("button", { type: "button", onClick: () => setSelectedEdgeId(""), children: "\u5173\u95ED\u5173\u7CFB\u8BE6\u60C5" })
          ] }),
          /* @__PURE__ */ jsxs2("p", { children: [
            edgeInfo.source,
            " \u2192 ",
            edgeInfo.target
          ] }),
          /* @__PURE__ */ jsxs2("dl", { children: [
            /* @__PURE__ */ jsxs2("div", { children: [
              /* @__PURE__ */ jsx2("dt", { children: "\u76EE\u6807\u8FD0\u884C\u521B\u5EFA\u65F6\u95F4" }),
              /* @__PURE__ */ jsx2("dd", { children: edgeInfo.createdAt })
            ] }),
            /* @__PURE__ */ jsxs2("div", { children: [
              /* @__PURE__ */ jsx2("dt", { children: "\u76EE\u6807\u8FD0\u884C\u5F00\u59CB\u65F6\u95F4" }),
              /* @__PURE__ */ jsx2("dd", { children: edgeInfo.startedAt })
            ] }),
            /* @__PURE__ */ jsxs2("div", { children: [
              /* @__PURE__ */ jsx2("dt", { children: "\u89E6\u53D1\u8BC4\u8BBA\u521B\u5EFA\u65F6\u95F4" }),
              /* @__PURE__ */ jsxs2("dd", { children: [
                commentLabel,
                commentStatus === "error" && /* @__PURE__ */ jsx2("button", { type: "button", onClick: () => setCommentRetry((value) => value + 1), children: "\u91CD\u8BD5\u8BFB\u53D6\u8BC4\u8BBA\u65F6\u95F4" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs2("div", { children: [
              /* @__PURE__ */ jsx2("dt", { children: "\u76EE\u6807\u8FD0\u884C\u89E6\u53D1\u6458\u8981" }),
              /* @__PURE__ */ jsxs2("dd", { className: "mm-call-edge-summary", children: [
                /* @__PURE__ */ jsx2("strong", { children: triggerExcerpt(edgeInfo.triggerSummary, 100) }),
                /* @__PURE__ */ jsxs2("details", { children: [
                  /* @__PURE__ */ jsx2("summary", { children: "\u67E5\u770B\u5B8C\u6574\u89E6\u53D1\u539F\u6587" }),
                  /* @__PURE__ */ jsx2("p", { children: edgeInfo.triggerSummary })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs2("div", { children: [
              /* @__PURE__ */ jsx2("dt", { children: "\u76EE\u6807\u8FD0\u884C\u7684\u5DE5\u4F5C\u8BB0\u5F55" }),
              /* @__PURE__ */ jsxs2("dd", { children: [
                edgeInfo.activity,
                " \xB7 \u8BB0\u5F55\u65F6\u95F4 ",
                edgeInfo.activityAt,
                edgeInfo.stale ? " \xB7 \u91C7\u96C6\u5F02\u5E38\u6216\u65E5\u5FD7\u672A\u8865\u9F50\uFF0C\u4FE1\u606F\u53EF\u80FD\u8FC7\u671F" : ""
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx2("p", { className: "mm-muted", children: "\u8BC4\u8BBA\u6309 ID \u4E0E\u4EFB\u52A1\u5F52\u5C5E\u7CBE\u786E\u5339\u914D\uFF1B\u8BC4\u8BBA\u521B\u5EFA\u65F6\u95F4\u4E0D\u662F\u5173\u7CFB\u5199\u5165\u65F6\u95F4\u3002\u670D\u52A1\u672A\u63D0\u4F9B\u8FD9\u6761\u5173\u7CFB\u7684\u7CBE\u786E\u89E6\u53D1\u65F6\u95F4\uFF0C\u8FD0\u884C\u65F6\u95F4\u548C\u89E6\u53D1\u6458\u8981\u4E5F\u4E0D\u80FD\u8BC1\u660E\u4E0A\u6E38\u5177\u4F53\u6267\u884C\u4E86\u4EC0\u4E48\u3002" }),
          onSelectRun && /* @__PURE__ */ jsx2("button", { type: "button", onClick: () => onSelectRun(selectedEdge.to), children: "\u67E5\u770B\u76EE\u6807\u8FD0\u884C\u8FDB\u5C55" })
        ] })
      ] }),
      (graph.unresolved.length > 0 || graph.cycleEdges.length > 0) && /* @__PURE__ */ jsxs2("details", { className: "mm-call-unresolved", children: [
        /* @__PURE__ */ jsxs2("summary", { children: [
          graph.unresolved.length + graph.cycleEdges.length,
          " \u6761\u6765\u6E90\u672A\u8FDE\u5165\u8C03\u7528\u56FE"
        ] }),
        /* @__PURE__ */ jsxs2("ul", { children: [
          graph.unresolved.map((edge, index) => /* @__PURE__ */ jsxs2("li", { children: [
            /* @__PURE__ */ jsx2("strong", { children: runLabel(graph.nodes.find((node) => node.id === edge.to).run) }),
            "\uFF1A",
            TYPES[edge.type],
            "\u6765\u6E90 #",
            shortId(edge.from) || "\u672A\u77E5",
            "\uFF0C",
            edge.sourceOmitted ? "\u6765\u6E90\u8FD0\u884C\u672A\u5C55\u793A\u3002" : edge.reason === "missing_source" ? "\u6765\u6E90\u8FD0\u884C\u672A\u52A0\u8F7D\u3002" : "\u6307\u9488\u6216\u4EFB\u52A1\u5F52\u5C5E\u5F85\u6838\u5B9E\u3002"
          ] }, `${edge.type}:${edge.from}:${edge.to}:${index}`)),
          graph.cycleEdges.map((edge) => /* @__PURE__ */ jsxs2("li", { children: [
            "#",
            shortId(edge.from),
            " ",
            TYPES[edge.type],
            " #",
            shortId(edge.to),
            "\uFF1A\u5B58\u5728\u5FAA\u73AF\u5F15\u7528\uFF0C\u672A\u5C06\u5FAA\u73AF\u5C55\u793A\u4E3A\u8C03\u7528\u8D77\u70B9\u3002"
          ] }, edge.id))
        ] })
      ] }),
      presentTypes.some(([type]) => type === "parent_run") && /* @__PURE__ */ jsx2("p", { className: "mm-call-footnote", children: "\u7236\u8FD0\u884C\u8868\u793A\u8FD0\u884C\u6765\u6E90\u5173\u8054\uFF0C\u4E0D\u662F\u4E1A\u52A1\u7236\u5B50\u4EFB\u52A1\u3002" }),
      /* @__PURE__ */ jsx2("p", { className: "mm-call-footnote", children: "\u8FDE\u7EBF\u6765\u81EA\u670D\u52A1\u7AEF\u7684\u660E\u786E\u6765\u6E90\uFF1B\u4E0A\u4E0B\u4F4D\u7F6E\u4E0E\u95F4\u8DDD\u4E0D\u4EE3\u8868\u8017\u65F6\u3002" })
    ] }),
    /* @__PURE__ */ jsxs2("details", { className: "mm-call-participation", children: [
      /* @__PURE__ */ jsxs2("summary", { children: [
        "\u4EBA\u5458\u53C2\u4E0E \xB7 ",
        humanActivity.status === "ready" ? `${humanActivity.items.length} \u6761\u5DF2\u8BFB\u53D6\u8BC4\u8BBA${humanActivity.possiblyTruncated ? "\uFF0C\u53EF\u80FD\u672A\u8BFB\u5168" : ""}` : humanActivity.status === "loading" ? "\u8BFB\u53D6\u4E2D" : humanActivity.status === "error" ? "\u8BFB\u53D6\u5931\u8D25" : "\u6682\u4E0D\u53EF\u8BFB"
      ] }),
      /* @__PURE__ */ jsxs2("div", { className: "mm-call-edge-detail", "aria-label": "\u4EBA\u5458\u53C2\u4E0E\u8BB0\u5F55", children: [
        humanActivity.status === "loading" && /* @__PURE__ */ jsx2("p", { children: "\u6B63\u5728\u8BFB\u53D6\u4EBA\u5458\u8BC4\u8BBA\u2026" }),
        humanActivity.status === "error" && /* @__PURE__ */ jsxs2("p", { children: [
          "\u4EBA\u5458\u8BC4\u8BBA\u8BFB\u53D6\u5931\u8D25\uFF0C\u5F53\u524D\u65E0\u6CD5\u6838\u5B9E\u3002",
          /* @__PURE__ */ jsx2("button", { type: "button", onClick: () => setHumanRetry((value) => value + 1), children: "\u91CD\u65B0\u8BFB\u53D6" })
        ] }),
        humanActivity.status === "unavailable" && /* @__PURE__ */ jsx2("p", { children: "\u5F53\u524D\u65E0\u6CD5\u8BFB\u53D6\u4EBA\u5458\u8BC4\u8BBA\u3002" }),
        humanActivity.status === "ready" && !humanActivity.items.length && /* @__PURE__ */ jsx2("p", { children: "\u5DF2\u8BFB\u53D6\u7684\u8BC4\u8BBA\u4E2D\u6682\u65E0\u4EBA\u5458\u53C2\u4E0E\u8BB0\u5F55\u3002" }),
        humanActivity.items.map((item) => {
          const triggered = (detail?.runs || []).filter((run) => run.triggerCommentId === item.id);
          return /* @__PURE__ */ jsxs2("div", { children: [
            /* @__PURE__ */ jsxs2("p", { children: [
              /* @__PURE__ */ jsxs2("strong", { children: [
                "\u4EBA\u5458 #",
                shortId(item.authorId)
              ] }),
              " \xB7 ",
              displayTime(item.createdAt),
              " \xB7 \u8BC4\u8BBA"
            ] }),
            /* @__PURE__ */ jsx2("p", { children: item.content || "\u8BC4\u8BBA\u5185\u5BB9\u672A\u63D0\u4F9B" }),
            triggered.length > 0 && /* @__PURE__ */ jsxs2("p", { children: [
              "\u89E6\u53D1\u8FD0\u884C\uFF1A",
              triggered.map((run) => /* @__PURE__ */ jsxs2("button", { type: "button", onClick: () => onSelectRun?.(run.id), children: [
                agentLabel(run),
                " #",
                shortId(run.id)
              ] }, run.id))
            ] })
          ] }, item.id);
        }),
        humanActivity.possiblyTruncated && /* @__PURE__ */ jsx2("p", { children: "\u8BC4\u8BBA\u53EF\u80FD\u8D85\u8FC7\u8BFB\u53D6\u4E0A\u9650\uFF0C\u4EBA\u5458\u53C2\u4E0E\u8BB0\u5F55\u53EF\u80FD\u4E0D\u5B8C\u6574\u3002" }),
        /* @__PURE__ */ jsx2("p", { className: "mm-muted", children: "\u4EC5\u5C55\u793A\u8BE5\u4EFB\u52A1\u5DF2\u8BFB\u53D6\u7684\u4EBA\u7C7B\u8BC4\u8BBA\uFF1B\u53EA\u6709\u8BC4\u8BBA ID \u4E0E\u8FD0\u884C\u89E6\u53D1 ID \u4E00\u81F4\u65F6\u624D\u6807\u8BB0\u89E6\u53D1\uFF0C\u5176\u4ED6\u8BC4\u8BBA\u4E0D\u63A8\u65AD\u8C03\u7528\u5173\u7CFB\u3002\u4EBA\u5458\u540D\u79F0\u672A\u63D0\u4F9B\u65F6\u663E\u793A ID\u3002" })
      ] })
    ] })
  ] });
}
export {
  CallGraph,
  buildCallGraphLayout,
  callEdgePreview,
  describeCallEdge
};
