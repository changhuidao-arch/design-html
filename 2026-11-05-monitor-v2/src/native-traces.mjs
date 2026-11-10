import { readdir, readFile, lstat, open, realpath } from 'node:fs/promises';
import { join, resolve, relative, isAbsolute } from 'node:path';
import { homedir } from 'node:os';

const uuid = value => typeof value === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
const stamp = value => typeof value === 'string' && Number.isFinite(Date.parse(value)) ? value : null;
const limited = (value, size = 256) => typeof value === 'string' ? value.slice(0, size) : '';
const integer = value => Number.isSafeInteger(value) && value >= 0 ? value : 0;
const serverKey = value => {
  try { const url = new URL(value); return url.origin + url.pathname.replace(/\/+$/, ''); } catch { return ''; }
};
const inside = (parent, child) => { const path = relative(parent, child); return path !== '..' && !path.startsWith(`..${process.platform === 'win32' ? '\\' : '/'}`) && !isAbsolute(path); };

export class NativeTraceReader {
  constructor({ root = join(homedir(), '.multica') } = {}) { this.root = resolve(root); }

  async #safeFile(path, maxBytes) {
    const actual = await realpath(path);
    if (!inside(this.root, actual)) throw new Error('采集记录路径超出了 Multica 数据目录');
    const info = await lstat(path);
    if (!info.isFile() || info.isSymbolicLink() || info.size > maxBytes) throw new Error('采集记录不是有效文件或超过读取上限');
    return actual;
  }

  async #roots() {
    const roots = [join(this.root, 'traces', 'v1')];
    try {
      const profiles = await readdir(join(this.root, 'profiles'), { withFileTypes: true });
      for (const entry of profiles.filter(entry => entry.isDirectory() && !entry.isSymbolicLink()).slice(0, 100)) roots.push(join(this.root, 'profiles', entry.name, 'traces', 'v1'));
    } catch (error) { if (error.code !== 'ENOENT') throw error; }
    return roots;
  }

  async read({ taskId, executionId = '', cursor = 0, baseUrl, workspaceId, token = '' }) {
    if (!uuid(taskId) || executionId && !uuid(executionId)) throw new Error('运行或采集标识无效');
    if (!Number.isSafeInteger(cursor) || cursor < 0 || cursor > 20 * 1024 * 1024) throw new Error('日志读取位置无效');
    const candidates = [], warnings = [];
    for (const root of await this.#roots()) {
      const dir = join(root, taskId);
      let entries;
      try { entries = await readdir(dir, { withFileTypes: true }); }
      catch (error) { if (error.code === 'ENOENT') continue; warnings.push('部分本机采集目录无法读取'); continue; }
      for (const entry of entries.filter(entry => entry.isFile() && entry.name.endsWith('.json') && uuid(entry.name.slice(0, -5))).slice(0, 100)) {
        try {
          const path = await this.#safeFile(join(dir, entry.name), 128 * 1024);
          const value = JSON.parse(await readFile(path, 'utf8'));
          const m = value.metadata;
          if (m?.version !== 1 || m.source !== 'cli_output' || m.task_id !== taskId || m.workspace_id !== workspaceId
            || serverKey(m.server_url) !== serverKey(baseUrl) || m.execution_id !== entry.name.slice(0, -5) || !stamp(m.started_at)) continue;
          candidates.push({ path: join(dir, `${m.execution_id}.jsonl`), value: {
            id: m.execution_id, taskId, workspaceId, issueId: limited(m.issue_id), chatSessionId: limited(m.chat_session_id),
            runtimeId: limited(m.runtime_id), daemonId: limited(m.daemon_id), agentId: limited(m.agent_id), provider: limited(m.provider, 40),
            requestedSessionId: limited(m.requested_session_id), startedAt: m.started_at, finishedAt: stamp(value.finished_at),
            lastEventAt: stamp(value.last_event_at), status: limited(value.status, 40), frames: integer(value.frames), dropped: integer(value.dropped),
            truncated: value.truncated === true, redacted: value.redacted === true, captureError: limited(value.capture_error, 300),
            sessions: Array.isArray(value.sessions) ? value.sessions.slice(0, 100).filter(s => typeof s.id === 'string' && stamp(s.at)).map(s => ({ id: limited(s.id), at: s.at, seq: integer(s.seq) })) : [],
            pids: Array.isArray(value.pids) ? value.pids.filter(Number.isSafeInteger).slice(0, 100) : [],
          } });
        } catch { warnings.push('一份采集记录尚未写完或无法读取'); }
      }
    }
    candidates.sort((a, b) => b.value.startedAt.localeCompare(a.value.startedAt));
    const selected = executionId ? candidates.find(c => c.value.id === executionId) : candidates[0];
    const base = { executions: candidates.slice(0, 30).map(c => c.value), records: [], cursor: 0, hasMore: false, warnings: [...new Set(warnings)], source: 'cli_output', available: Boolean(selected) };
    if (!selected) return { ...base, reason: executionId ? '所选采集记录已不可用，可能已清理。' : '本机还没有这次运行的 CLI 采集记录。历史运行、其他机器上的运行或尚未升级的执行端不会自动补出原始日志。' };
    const path = await this.#safeFile(selected.path, 20 * 1024 * 1024);
    const file = await open(path, 'r');
    try {
      const info = await file.stat();
      if (cursor > info.size) return { ...base, available: false, reason: '采集文件发生变化，请重新读取。' };
      const buffer = Buffer.alloc(Math.min(512 * 1024, info.size - cursor));
      const { bytesRead } = await file.read(buffer, 0, buffer.length, cursor);
      const end = buffer.subarray(0, bytesRead).lastIndexOf(10);
      const records = [];
      let consumed = 0;
      if (end >= 0) {
        for (const line of buffer.subarray(0, end + 1).toString('utf8').split('\n')) {
          if (!line) continue;
          consumed += Buffer.byteLength(line, 'utf8') + 1;
          try {
            const e = JSON.parse(line);
            if (e.kind === 'execution') continue;
            if (!Number.isSafeInteger(e.seq) || e.seq <= 0 || !stamp(e.at)) throw new Error('invalid record');
            const clean = text => token ? limited(text, 96 * 1024).split(token).join('[已隐藏凭据]') : limited(text, 96 * 1024);
            records.push({ seq: e.seq, at: e.at, kind: limited(e.kind, 40), stream: limited(e.stream, 20), data: clean(e.data), sessionId: limited(e.session_id),
              pid: integer(e.pid), status: limited(e.status, 40), dropped: integer(e.dropped), truncated: e.truncated === true, redacted: e.redacted === true });
          } catch { base.warnings.push('跳过了一条格式无效的采集记录，当前数据可能不完整。'); }
          if (records.length >= 150) break;
        }
      }
      return { ...base, execution: selected.value, records, cursor: cursor + consumed, hasMore: cursor + consumed < info.size, warnings: [...new Set(base.warnings)] };
    } finally { await file.close(); }
  }
}
