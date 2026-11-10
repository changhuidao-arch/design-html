const MAX_RECENT = 60, MAX_PENDING = 200, MAX_SLOW = 8, MAX_STATEMENTS = 12;
const active = new Set(['running', 'dispatched', 'queued', 'deferred', 'waiting_local_directory']);
const object = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const text = (value, max = 240) => typeof value === 'string' ? value.trim().slice(0, max) : '';
const time = value => typeof value === 'string' && value.length < 80 && Number.isFinite(Date.parse(value)) ? value : null;
const identity = value => typeof value === 'string' && value.length > 0 && value.length <= 256 ? value : null;

export const activityCategories = Object.freeze({ read: '读取文件', search: '查找与检索', test: '执行测试', build: '构建检查', write: '写入与修改', skill: '加载技能', plan: '更新计划', command: '命令检查', other: '其他工具' });

function categoryFor(message) {
  const tool = text(message.tool, 80), input = object(message.input) ? message.input : {};
  if (/^(Read|read_file)$/i.test(tool)) return 'read';
  if (/^(Grep|Glob|search|list_files)$/i.test(tool)) return 'search';
  if (/^(Write|Edit|apply_patch|write_file)$/i.test(tool)) return 'write';
  if (tool === 'Skill') return 'skill';
  if (/^(TaskCreate|TaskUpdate|TodoWrite)$/.test(tool)) return 'plan';
  if (/^(Bash|shell|exec_command)$/i.test(tool)) {
    const command = text(input.command ?? input.cmd, 8000);
    if (/(?:^|[\s;&|])(?:pytest|vitest|jest)\b|\bgo\s+test\b|\b(?:npm|pnpm|yarn)\s+(?:run\s+)?test\b|\b(?:mvn|mvnw|gradle|gradlew)\b[^\n;&|]*\btest\b|\bnode\s+--test\b/i.test(command)) return 'test';
    if (/\b(?:npm|pnpm|yarn)\s+(?:run\s+)?build\b|\b(?:go|cargo)\s+build\b|\b(?:mvn|gradle)\b[^\n;&|]*\b(?:package|compile|build)\b/i.test(command)) return 'build';
    return 'command';
  }
  return 'other';
}

export function createActivityState() {
  return { lastSeq: 0, calls: 0, returned: 0, failed: 0, unknown: 0, categories: {}, recent: [], slow: [], pending: new Map(), statements: [], gaps: false, dropped: false, orphanResults: 0, recentTruncated: false, statementsTruncated: false };
}

function failedResult(message) {
  return message.isError === true || message.is_error === true;
}

export function ingestActivityMessages(state, messages) {
  if (!Array.isArray(messages)) { state.gaps = true; return; }
  const ordered = messages.filter(message => object(message) && Number.isSafeInteger(message.seq) && message.seq > 0).sort((a, b) => a.seq - b.seq);
  if (ordered.length !== messages.length) state.gaps = true;
  for (const message of ordered) {
    if (message.seq <= state.lastSeq) continue;
    if (message.seq !== state.lastSeq + 1) state.gaps = true;
    state.lastSeq = message.seq;
    if (message.type === 'text' && text(message.content)) {
      state.statements.push({ seq: message.seq, at: time(message.createdAt), text: text(message.content, 600), truncated: message.contentTruncated === true || message.content.length > 600 });
      if (state.statements.length > MAX_STATEMENTS) { state.statements.shift(); state.statementsTruncated = true; }
    } else if (message.type === 'tool_use') {
      const input = object(message.input) ? message.input : {}, category = categoryFor(message), callId = identity(message.callId);
      const target = text(input.file_path ?? input.filePath ?? input.path ?? input.file, 240);
      const tool = text(message.tool, 80) || '未知工具';
      const summary = text(input.description ?? input.subject) || target || activityCategories[category];
      const entry = { seq: message.seq, useSeq: message.seq, callId, tool, category, summary, target, at: time(message.createdAt), resultAt: null, resultSeq: null, outcome: 'pending', durationMs: null };
      state.calls++; state.categories[category] = (state.categories[category] || 0) + 1;
      state.recent.push(entry);
      if (state.recent.length > MAX_RECENT) { state.recent.shift(); state.recentTruncated = true; }
      if (!callId || state.pending.has(callId) || state.pending.size >= MAX_PENDING) {
        entry.outcome = 'unknown'; state.unknown++; state.dropped = true;
        const prior = callId && state.pending.get(callId);
        if (prior) { prior.ambiguous = true; prior.outcome = 'unknown'; }
      } else state.pending.set(callId, entry);
    } else if (message.type === 'tool_result') {
      const callId = identity(message.callId), entry = callId && state.pending.get(callId);
      if (!entry) { state.orphanResults++; continue; }
      state.pending.delete(callId);
      entry.resultSeq = message.seq; entry.resultAt = time(message.createdAt);
      const mismatch = entry.ambiguous || message.tool && message.tool !== entry.tool;
      if (mismatch) state.dropped = true;
      entry.outcome = mismatch ? 'unknown' : failedResult(message) ? 'failed' : 'returned';
      state[entry.outcome === 'returned' ? 'returned' : entry.outcome === 'failed' ? 'failed' : 'unknown']++;
      const elapsed = Date.parse(entry.resultAt) - Date.parse(entry.at);
      entry.durationMs = !mismatch && Number.isFinite(elapsed) && elapsed >= 0 ? elapsed : null;
      if (entry.durationMs >= 30000) {
        state.slow.push({ ...entry }); state.slow.sort((a, b) => b.durationMs - a.durationMs); state.slow.length = Math.min(MAX_SLOW, state.slow.length);
      }
    }
  }
}

export function snapshotActivity(state, { status = 'unknown', logsCaughtUp = false, now = Date.now() } = {}) {
  const running = active.has(status), current = running && logsCaughtUp && !state.gaps, pending = [...state.pending.values()].filter(entry => !entry.ambiguous);
  const copy = entry => {
    const elapsed = Number.isFinite(now) && entry.at ? now - Date.parse(entry.at) : null;
    return { ...entry, outcome: entry.outcome === 'pending' && !current ? 'unconfirmed' : entry.outcome,
      waitingMs: entry.outcome === 'pending' && current && Number.isFinite(elapsed) && elapsed >= 0 ? elapsed : null };
  };
  return { calls: state.calls, returned: state.returned, failed: state.failed, unknown: state.unknown,
    categories: Object.entries(state.categories).map(([key, count]) => ({ key, label: activityCategories[key], count })),
    recent: state.recent.map(copy).reverse(), slow: state.slow.map(copy), pending: current ? pending.map(copy) : [], unresolvedCalls: running ? 0 : pending.length,
    statements: state.statements.map(entry => ({ ...entry })).reverse(), status,
    coverage: { partial: !logsCaughtUp || state.gaps || state.dropped || state.orphanResults > 0, logsCaughtUp, gaps: state.gaps, pairingIncomplete: state.dropped || state.orphanResults > 0, recentTruncated: state.recentTruncated, statementsTruncated: state.statementsTruncated } };
}
