const RESPONSE_LIMIT = 4 * 1024 * 1024;
const TEXT_LIMIT = 8000;
const MESSAGE_LIMIT = 200;
const RUN_LIMIT = 500;
const CHILD_LIMIT = 200;
const RUN_SCOPE = '当前活动运行（含等待本地目录、唤醒延后）及每名智能体最近一次 completed/failed；不是完整执行历史，也不是任务完成数量。';

export class MulticaError extends Error {
  constructor(message, code = 'INVALID_RESPONSE', status = null) {
    super(message);
    this.name = 'MulticaError';
    this.code = code;
    this.status = status;
  }
}

const malformed = (field) => new MulticaError(`Multica 返回的数据格式不符合约定（${field}），请检查服务版本。`);
const object = (value, field) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw malformed(field);
  return value;
};
const array = (value, field) => {
  if (!Array.isArray(value)) throw malformed(field);
  return value;
};
const string = (value, field, fallback) => {
  if (value == null && fallback !== undefined) return fallback;
  if (typeof value !== 'string') throw malformed(field);
  return value;
};
const required = (value, field) => {
  const result = string(value, field);
  if (!result) throw malformed(field);
  return result;
};
const integer = (value, field) => {
  if (!Number.isSafeInteger(value) || value < 0) throw malformed(field);
  return value;
};
const nullableString = (value, field) => value == null ? null : string(value, field);
const record = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const optionalId = value => typeof value === 'string' && /^[A-Za-z0-9][A-Za-z0-9_-]{0,127}$/.test(value) ? value : null;
const optionalTag = value => typeof value === 'string' && /^[A-Za-z0-9][A-Za-z0-9_.:-]{0,79}$/.test(value) ? value : null;
const resourceId = (id) => {
  if (typeof id !== 'string' || !/^[A-Za-z0-9][A-Za-z0-9_-]{0,127}$/.test(id)) {
    throw new MulticaError('资源标识无效，请重新选择任务或运行。', 'INVALID_INPUT');
  }
  return id;
};

export function normalizeAllowedHttpOrigins(values = []) {
  if (!Array.isArray(values) || values.length > 16) throw new MulticaError('HTTP 例外必须是最多 16 个明确来源地址的列表。', 'INVALID_CONFIG');
  const origins = values.map(value => {
    if (typeof value !== 'string' || !/^http:\/\/[^\s/?#\\*]+\/?$/i.test(value)) {
      throw new MulticaError('HTTP 例外只接受完整的 http://主机:端口 来源，不能包含通配符、路径、账号或查询参数。', 'INVALID_CONFIG');
    }
    let url;
    try { url = new URL(value); } catch { throw new MulticaError('HTTP 例外来源地址无效。', 'INVALID_CONFIG'); }
    if (url.protocol !== 'http:' || url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
      throw new MulticaError('HTTP 例外来源地址不能包含账号、路径、查询参数或片段。', 'INVALID_CONFIG');
    }
    return url.origin;
  });
  return [...new Set(origins)];
}

export function normalizeBaseUrl(value, allowedHttpOrigins = []) {
  const allowed = normalizeAllowedHttpOrigins(allowedHttpOrigins);
  let url;
  if (typeof value !== 'string' || /[\\\u0000-\u0020\u007f]/.test(value.trim())) {
    throw new MulticaError('Multica 地址格式不正确。', 'INVALID_CONFIG');
  }
  try { url = new URL(value.trim()); } catch { throw new MulticaError('请输入完整的 Multica HTTP 或 HTTPS 地址。', 'INVALID_CONFIG'); }
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || /[?#]/.test(value)) {
    throw new MulticaError('Multica 地址仅支持 HTTP/HTTPS，不能包含账号、密码、查询参数或锚点。', 'INVALID_CONFIG');
  }
  const hostname = url.hostname.toLowerCase();
  const loopback = hostname === 'localhost' || hostname === '[::1]' || /^127\.\d+\.\d+\.\d+$/.test(hostname);
  if (url.protocol !== 'https:' && !loopback && !allowed.includes(url.origin)) {
    throw new MulticaError('本地回环地址可使用 HTTP；其他 Multica 地址需 HTTPS，或为该来源单独配置明确的 HTTP 例外。', 'INVALID_CONFIG');
  }
  let decoded;
  try { decoded = decodeURIComponent(value.trim()); } catch { throw new MulticaError('Multica 地址编码不正确。', 'INVALID_CONFIG'); }
  if (/(?:^|\/)\.\.?($|\/)/.test(decoded) || /%2f|%5c/i.test(url.pathname)) {
    throw new MulticaError('Multica 地址不能包含路径跳转。', 'INVALID_CONFIG');
  }
  return url.href.replace(/\/+$/, '');
}

function normalizeIssue(value) {
  const row = object(value, 'issue');
  const parentIssueId = optionalId(row.parent_issue_id);
  const stage = Number.isSafeInteger(row.stage) && row.stage >= 1 ? row.stage : null;
  return {
    id: required(row.id, 'issue.id'),
    identifier: string(row.identifier, 'issue.identifier', ''),
    title: string(row.title, 'issue.title'),
    status: required(row.status, 'issue.status'),
    statusName: string(row.status_name, 'issue.status_name', ''),
    statusCategory: string(row.status_category, 'issue.status_category', ''),
    assigneeId: nullableString(row.assignee_id, 'issue.assignee_id'),
    assigneeType: nullableString(row.assignee_type, 'issue.assignee_type'),
    parentIssueId,
    parentIssueKnown: row.parent_issue_id === null || parentIssueId !== null,
    stage, stageKnown: row.stage === null || stage !== null,
    projectId: optionalId(row.project_id),
    createdAt: typeof row.created_at === 'string' ? row.created_at : '',
    updatedAt: string(row.updated_at, 'issue.updated_at', ''),
  };
}

function normalizeAgent(value) {
  const row = object(value, 'agent');
  return { id: required(row.id, 'agent.id'), name: string(row.name, 'agent.name'), status: required(row.status, 'agent.status'), maxConcurrentTasks: row.max_concurrent_tasks == null ? null : integer(row.max_concurrent_tasks, 'agent.max_concurrent_tasks') };
}

function normalizeRuntime(value) {
  const row = object(value, 'runtime');
  const name = string(row.name, 'runtime.name');
  return {
    id: required(row.id, 'runtime.id'),
    name: nullableString(row.custom_name, 'runtime.custom_name') || name,
    provider: string(row.provider, 'runtime.provider', ''),
    status: required(row.status, 'runtime.status'),
    lastSeenAt: nullableString(row.last_seen_at, 'runtime.last_seen_at'),
  };
}

function normalizeStatus(value) {
  const row = object(value, 'status');
  return { id: required(row.id, 'status.id'), key: required(row.key, 'status.key'), name: string(row.name, 'status.name'), category: required(row.category, 'status.category') };
}

function normalizeRun(value, issueNames, agentNames, token) {
  const row = object(value, 'run');
  const issueId = string(row.issue_id, 'run.issue_id', '');
  const agentId = required(row.agent_id, 'run.agent_id');
  const error = nullableString(row.error, 'run.error');
  const attributionRow = record(row.attribution) ? row.attribution : null;
  const summary = typeof row.trigger_summary === 'string' ? row.trigger_summary.trim().split(token).join('[已隐藏凭据]') : '';
  const triggerSummary = summary.length > 2000 ? `${summary.slice(0, 2000)}…[插件已截断]` : summary || null;
  const attributionSource = optionalTag(attributionRow?.source);
  const attributionEvidence = attributionRow?.evidence;
  const evidenceKind = optionalTag(attributionEvidence?.kind), evidenceRef = optionalId(attributionEvidence?.ref_id);
  const attribution = attributionRow ? {
    source: attributionSource,
    precise: typeof attributionRow.precise === 'boolean' ? attributionRow.precise : null,
    evidence: record(attributionEvidence) && evidenceKind && evidenceRef ? { kind: evidenceKind, refId: evidenceRef } : null,
  } : null;
  const pointers = [row.parent_task_id, attributionRow?.delegated_from_task_id, attributionRow?.retry_of_task_id, attributionRow?.rerun_of_task_id];
  return {
    id: required(row.id, 'run.id'), issueId,
    runtimeId: string(row.runtime_id, 'run.runtime_id', ''),
    attempt: row.attempt == null ? null : integer(row.attempt, 'run.attempt'),
    parentTaskId: optionalId(row.parent_task_id),
    delegatedFromTaskId: optionalId(attributionRow?.delegated_from_task_id),
    retryOfTaskId: optionalId(attributionRow?.retry_of_task_id),
    rerunOfTaskId: optionalId(attributionRow?.rerun_of_task_id),
    lineageKnown: Boolean(attribution && attributionSource && attribution.precise !== null
      && pointers.every(value => value == null || optionalId(value) !== null)
      && (attributionEvidence == null || attribution.evidence !== null)),
    attribution, kind: optionalTag(row.kind), triggerSummary, triggerCommentId: optionalId(row.trigger_comment_id), wakeupId: optionalId(row.wakeup_id),
    usage: row.usage == null ? null : array(row.usage, 'run.usage').map(value => {
      const usage = object(value, 'usage');
      return { provider: string(usage.provider, 'usage.provider', ''), model: string(usage.model, 'usage.model', ''),
        inputTokens: integer(usage.input_tokens, 'usage.input_tokens'), outputTokens: integer(usage.output_tokens, 'usage.output_tokens'),
        cacheReadTokens: integer(usage.cache_read_tokens ?? 0, 'usage.cache_read_tokens'), cacheWriteTokens: integer(usage.cache_write_tokens ?? 0, 'usage.cache_write_tokens'),
        costUsd: usage.cost_usd_ticks == null ? null : integer(usage.cost_usd_ticks, 'usage.cost_usd_ticks') / 1e10 };
    }),
    issueTitle: issueNames.get(issueId) ?? '',
    agentId, agentName: agentNames.get(agentId) ?? '',
    status: required(row.status, 'run.status'),
    error: error && error.length > TEXT_LIMIT ? `${error.slice(0, TEXT_LIMIT)}\n[插件已截断]` : error,
    createdAt: string(row.created_at, 'run.created_at', ''),
    startedAt: nullableString(row.started_at, 'run.started_at'),
    completedAt: nullableString(row.completed_at, 'run.completed_at'),
  };
}

function normalizedMessages(value, since) {
  const rows = array(value, 'messages');
  const warnings = [];
  const seen = new Set();
  const ordered = rows.map((value) => {
    const row = object(value, 'message');
    integer(row.seq, 'message.seq');
    if (seen.has(row.seq)) throw malformed('message.seq 重复');
    seen.add(row.seq);
    return row;
  }).filter((row) => row.seq > since).sort((a, b) => a.seq - b.seq);
  const hasMore = ordered.length > MESSAGE_LIMIT;
  const messages = ordered.slice(0, MESSAGE_LIMIT).map((row) => {
    let truncated = false;
    const clip = (value, field) => {
      const text = string(value, field, '');
      if (text.length > TEXT_LIMIT) { truncated = true; return `${text.slice(0, TEXT_LIMIT)}\n[插件已截断]`; }
      return text;
    };
    const content = clip(row.content, 'message.content');
    const contentTruncated = truncated;
    truncated = false;
    const output = clip(row.output, 'message.output');
    if (row.output_truncated != null && typeof row.output_truncated !== 'boolean') throw malformed('message.output_truncated');
    const outputTruncated = truncated ? true : (row.output_truncated ?? null);
    for (const key of ['is_error', 'isError']) if (row[key] != null && typeof row[key] !== 'boolean') throw malformed(`message.${key}`);
    if (row.is_error != null && row.isError != null && row.is_error !== row.isError) throw malformed('message.is_error/isError');
    const isError = row.is_error ?? row.isError ?? null;
    let input = row.input == null ? null : object(row.input, 'message.input');
    let inputTruncated = false;
    if (input && JSON.stringify(input).length > TEXT_LIMIT) {
      input = { preview: JSON.stringify(input).slice(0, TEXT_LIMIT), notice: '插件已截断工具输入' };
      inputTruncated = true;
    }
    return {
      seq: row.seq, callId: string(row.call_id, 'message.call_id', ''), type: required(row.type, 'message.type'), tool: string(row.tool, 'message.tool', ''),
      content, input, output, outputTruncated, contentTruncated, inputTruncated, isError,
      createdAt: string(row.created_at, 'message.created_at', ''),
    };
  });
  if (hasMore) warnings.push(`单次仅展示 ${MESSAGE_LIMIT} 条消息，继续加载将从已显示的最后序号读取。`);
  if (messages.some((row) => row.contentTruncated || row.inputTruncated || row.outputTruncated === true)) {
    warnings.push(`部分日志不完整：工具原始输出可能已截断；插件另将每段内容限制为 ${TEXT_LIMIT} 字符。`);
  }
  return { messages, lastSeq: messages.at(-1)?.seq ?? since, hasMore, warnings };
}

export class MulticaClient {
  #baseUrl;
  #token;
  #workspaceId;
  #fetch;
  #signal;
  #agentNames = new Map();

  constructor({ baseUrl, token, workspaceId = '', allowedHttpOrigins = [], fetchImpl = globalThis.fetch, signal } = {}) {
    this.#baseUrl = normalizeBaseUrl(baseUrl, allowedHttpOrigins);
    if (typeof token !== 'string' || !token.trim() || /[\r\n\u0000]/.test(token)) {
      throw new MulticaError('请先在插件设置中填写 Multica 个人访问令牌（PAT）。', 'INVALID_CONFIG');
    }
    if (workspaceId) resourceId(workspaceId);
    if (typeof fetchImpl !== 'function') throw new MulticaError('当前 DSH 不支持网络请求，请升级 Node.js。', 'INVALID_CONFIG');
    this.#token = token.trim();
    this.#workspaceId = workspaceId;
    this.#fetch = fetchImpl;
    if (signal != null && !(signal instanceof AbortSignal)) throw new MulticaError('取消请求信号无效。', 'INVALID_CONFIG');
    this.#signal = signal;
  }

  #clean(value) {
    if (typeof value === 'string') return value.split(this.#token).join('[已隐藏凭据]');
    if (Array.isArray(value)) return value.map((entry) => this.#clean(entry));
    if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, entry]) => [this.#clean(key), this.#clean(entry)]));
    return value;
  }

  async #request(path, scoped = true, write, includeMetadata = false) {
    if (scoped && !this.#workspaceId) throw new MulticaError('请先选择 Multica 工作空间。', 'INVALID_CONFIG');
    const headers = { accept: 'application/json', authorization: `Bearer ${this.#token}` };
    if (scoped) headers['X-Workspace-ID'] = this.#workspaceId;
    if (write?.body !== undefined) headers['content-type'] = 'application/json';
    let response;
    try {
      response = await this.#fetch(`${this.#baseUrl}${path}`, {
        method: write ? 'POST' : 'GET', headers, ...(write?.body !== undefined ? { body: JSON.stringify(write.body) } : {}), redirect: 'error', signal: this.#signal ? AbortSignal.any([this.#signal, AbortSignal.timeout(10_000)]) : AbortSignal.timeout(10_000), cache: 'no-store',
      });
      if (response.status === 401) throw new MulticaError('Multica 认证失败：请在插件设置中更新个人访问令牌（PAT），然后重新连接。', 'UNAUTHORIZED', 401);
      if (response.status === 403) throw new MulticaError('没有读取权限：请检查所选工作空间和令牌账号的成员权限。', 'FORBIDDEN', 403);
      if (response.status >= 300 && response.status < 400) throw new MulticaError('Multica 返回重定向；请直接配置最终服务地址，插件不会转发令牌。', 'REDIRECT', response.status);
      if (!response.ok) throw new MulticaError(`Multica 请求失败（HTTP ${response.status}），请检查服务地址、权限或稍后重试。`, 'HTTP_ERROR', response.status);
      const length = response.headers.get('content-length');
      if (length && Number(length) > RESPONSE_LIMIT) throw new MulticaError('Multica 响应超过 4 MiB 限制，无法完整读取；请在 Multica 中查看该记录。', 'RESPONSE_TOO_LARGE');
      if (!response.body) throw malformed('空响应');
      const chunks = [];
      let bytes = 0;
      for await (const chunk of response.body) {
        bytes += chunk.byteLength;
        if (bytes > RESPONSE_LIMIT) throw new MulticaError('Multica 响应超过 4 MiB 限制，无法完整读取；请在 Multica 中查看该记录。', 'RESPONSE_TOO_LARGE');
        chunks.push(chunk);
      }
      let data;
      try { data = JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch { throw malformed('JSON'); }
      return includeMetadata ? { data, truncated: response.headers.get('X-Comments-Truncated') === 'true' } : data;
    } catch (error) {
      if (error instanceof MulticaError) throw error;
      if (this.#signal?.aborted) throw new MulticaError('Multica 请求已取消。', 'CANCELLED');
      if (error?.name === 'TimeoutError' || error?.name === 'AbortError') throw new MulticaError('Multica 请求超时（10 秒），请检查本地服务或网络后重试。', 'TIMEOUT');
      throw new MulticaError('无法连接 Multica。请检查地址、服务是否启动、网络及证书；插件不会跟随重定向。', 'NETWORK_ERROR');
    } finally {
      if (response?.body && !response.body.locked) await response.body.cancel().catch(() => {});
    }
  }

  async humanActivity(issueId) {
    const safeId = resourceId(issueId);
    const data = await this.#request(`/api/issues/${safeId}/comments?limit=100`);
    const rows = array(data, 'comments');
    const items = rows.filter(row => record(row) && row.issue_id === safeId && row.author_type === 'member' && typeof row.id === 'string' && typeof row.author_id === 'string').slice(0, 100).map(row => ({ id: row.id, authorId: row.author_id, createdAt: typeof row.created_at === 'string' ? row.created_at : null, content: typeof row.content === 'string' ? row.content.slice(0, 500) : '', parentId: optionalId(row.parent_id) }));
    return this.#clean({ items, possiblyTruncated: rows.length >= 100 });
  }

  async runComments(issueId) {
    const safeId = resourceId(issueId);
    const response = await this.#request(`/api/issues/${safeId}/comments`, true, undefined, true);
    const rows = array(response.data, 'comments'), seen = new Set(), comments = [], warnings = [];
    let incomplete = response.truncated || rows.length > 300;
    for (const value of rows) {
      const row = object(value, 'comment');
      const id = required(row.id, 'comment.id');
      if (row.issue_id !== safeId || seen.has(id)) { incomplete = true; continue; }
      seen.add(id);
      const content = string(row.content, 'comment.content', '');
      comments.push({ id, issueId: safeId, authorId: string(row.author_id, 'comment.author_id', ''),
        authorType: required(row.author_type, 'comment.author_type'), type: string(row.type, 'comment.type', ''),
        parentId: optionalId(row.parent_id), sourceTaskId: optionalId(row.source_task_id),
        content: content.slice(0, 24000), contentTruncated: content.length > 24000,
        createdAt: string(row.created_at, 'comment.created_at', ''), updatedAt: string(row.updated_at, 'comment.updated_at', ''),
        deleted: Boolean(row.deleted_at), attachmentCount: Array.isArray(row.attachments) ? row.attachments.length : 0 });
    }
    comments.sort((a, b) => (Date.parse(a.createdAt) || 0) - (Date.parse(b.createdAt) || 0) || a.id.localeCompare(b.id));
    if (incomplete) warnings.push('对话记录未完整返回；当前仅展示已读取的最近 300 条以内的评论。');
    if (comments.some(item => item.contentTruncated)) warnings.push('部分长回复已截断，可在 Multica 查看完整内容。');
    return this.#clean({ comments: comments.slice(-300), incomplete, warnings });
  }

  async participants() {
    const rows = array(await this.#request(`/api/workspaces/${resourceId(this.#workspaceId)}/members`), 'members');
    return this.#clean({ members: rows.map(value => {
      const row = object(value, 'member');
      if (row.workspace_id !== this.#workspaceId) throw malformed('member.workspace_id');
      return { id: required(row.user_id, 'member.user_id'), name: string(row.name, 'member.name', '') };
    }) });
  }

  async triggerCommentTime(issueId, commentId) {
    const safeIssueId = resourceId(issueId);
    const safeCommentId = resourceId(commentId);
    let data;
    try {
      data = await this.#request(`/api/issues/${safeIssueId}/comments?thread=${safeCommentId}&summary=true`);
    } catch (error) {
      if (error instanceof MulticaError && error.status === 404) return { status: 'not_found', createdAt: null };
      throw error;
    }
    const rows = array(data, 'comments');
    const matching = rows.filter(row => record(row) && row.id === safeCommentId && row.issue_id === safeIssueId);
    if (matching.length !== 1) return { status: 'not_found', createdAt: null };
    const timestamp = matching[0].created_at;
    if (typeof timestamp !== 'string' || !/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d+)?(?:Z|[+-]\d\d:\d\d)$/.test(timestamp) || !Number.isFinite(Date.parse(timestamp))) {
      return { status: 'invalid_time', createdAt: null };
    }
    return this.#clean({ status: 'found', createdAt: timestamp });
  }

  async workspaces() {
    const rows = array(await this.#request('/api/workspaces', false), 'workspaces');
    return this.#clean(rows.map((value) => {
      const row = object(value, 'workspace');
      return { id: required(row.id, 'workspace.id'), name: string(row.name, 'workspace.name'), slug: string(row.slug, 'workspace.slug', '') };
    }));
  }

  async overview() {
    const paths = ['/api/issues?limit=100&offset=0&sort=updated_at&direction=desc', '/api/agent-task-snapshot', '/api/agents', '/api/runtimes', '/api/issue-statuses'];
    const results = await Promise.allSettled(paths.map((path) => this.#request(path)));
    if (this.#signal?.aborted) throw new MulticaError('Multica 请求已取消。', 'CANCELLED');
    for (const index of [0, 1]) if (results[index].status === 'rejected') throw results[index].reason;
    const issuePage = object(results[0].value, 'issues page');
    const issueRows = array(issuePage.issues, 'issues');
    const issueTotal = integer(issuePage.total, 'issues.total');
    if (issueTotal < issueRows.length) throw malformed('issues.total');
    const issues = issueRows.slice(0, 100).map(normalizeIssue);
    const issuesTruncated = issueTotal > issues.length || issueRows.length > 100;
    const warnings = [];
    const available = { agents: false, runtimes: false, statuses: false };
    if (issuesTruncated) warnings.push(`当前仅显示最近更新的 ${issues.length} 个任务，共 ${issueTotal} 个；统计仅覆盖已加载任务。`);
    const optional = (index, key, label, normalize) => {
      const result = results[index];
      try {
        if (result.status === 'rejected') throw result.reason;
        const value = normalize(result.value);
        available[key] = true;
        return value;
      } catch (error) {
        warnings.push(`${label}暂不可用：${error instanceof MulticaError ? error.message : '数据格式不符合约定。'}`);
        return [];
      }
    };
    const agents = optional(2, 'agents', '智能体列表', (value) => array(value, 'agents').map(normalizeAgent));
    const runtimes = optional(3, 'runtimes', '运行时列表', (value) => array(value, 'runtimes').map(normalizeRuntime));
    const statuses = optional(4, 'statuses', '任务状态目录', (value) => array(object(value, 'status catalog').statuses, 'statuses').map(normalizeStatus));
    this.#agentNames = new Map(agents.map((agent) => [agent.id, agent.name]));
    const issueNames = new Map(issues.map((issue) => [issue.id, issue.title]));
    const runs = array(results[1].value, 'agent task snapshot').map((row) => normalizeRun(row, issueNames, this.#agentNames, this.#token));
    return this.#clean({ fetchedAt: new Date().toISOString(), issues, agents, runtimes, runs, statuses, warnings, available, issueTotal, issuesTruncated, runScope: RUN_SCOPE });
  }

  async issue(id, { includeRelations = true } = {}) {
    const safeId = resourceId(id);
    const includeAgents = this.#agentNames.size === 0;
    const results = await Promise.allSettled([
      this.#request(`/api/issues/${safeId}`), this.#request(`/api/issues/${safeId}/task-runs`),
      ...(includeAgents ? [this.#request('/api/agents')] : []),
    ]);
    if (this.#signal?.aborted) throw new MulticaError('Multica 请求已取消。', 'CANCELLED');
    for (const index of [0, 1]) if (results[index].status === 'rejected') throw results[index].reason;
    const issue = normalizeIssue(results[0].value);
    const uuidRequest = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(safeId);
    if ((uuidRequest ? issue.id : issue.identifier).toLowerCase() !== safeId.toLowerCase()) throw malformed('requested issue identity');
    const rows = array(results[1].value, 'task runs');
    const warnings = [];
    if (includeAgents) {
      try {
        if (results[2].status === 'rejected') throw results[2].reason;
        const agents = array(results[2].value, 'agents').map(normalizeAgent);
        this.#agentNames = new Map(agents.map((agent) => [agent.id, agent.name]));
      } catch (error) {
        warnings.push(`智能体名称暂不可用：${error instanceof MulticaError ? error.message : '数据格式不符合约定。'}`);
      }
    }
    const runs = [], seenRuns = new Set();
    let inconsistentRuns = false;
    const issueNames = new Map([[issue.id, issue.title]]);
    for (const row of rows.slice(0, RUN_LIMIT)) {
      const run = normalizeRun(row, issueNames, this.#agentNames, this.#token);
      if (run.issueId !== issue.id || seenRuns.has(run.id)) { inconsistentRuns = true; continue; }
      seenRuns.add(run.id);
      runs.push(run);
    }
    if (rows.length > RUN_LIMIT) warnings.push(`仅展示最近 ${RUN_LIMIT} 次运行，请在 Multica 中查看更早的历史。`);
    if (inconsistentRuns) warnings.push('部分运行的任务归属不一致或运行标识重复，已忽略；运行历史可能不完整。');
    const relations = includeRelations ? await this.#issueRelations(issue, safeId, warnings) : undefined;
    return this.#clean({ issue, runs, relations, runHistoryTruncated: rows.length > RUN_LIMIT || inconsistentRuns, warnings });
  }

  async #issueRelations(issue, safeId, warnings) {
    const relations = { items: [], availability: {
      parent: issue.parentIssueKnown ? issue.parentIssueId ? 'unavailable' : 'none' : 'unknown',
      children: 'unavailable', dependencies: 'unsupported',
    }, childrenTruncated: false };
    const results = await Promise.allSettled([
      issue.parentIssueId ? this.#request(`/api/issues/${issue.parentIssueId}`) : Promise.resolve(null),
      this.#request(`/api/issues/${safeId}/children`),
    ]);
    if (this.#signal?.aborted) throw new MulticaError('Multica 请求已取消。', 'CANCELLED');
    if (issue.parentIssueId) {
      try {
        if (results[0].status === 'rejected') throw results[0].reason;
        const parent = normalizeIssue(results[0].value);
        if (parent.id !== issue.parentIssueId || parent.id === issue.id) throw malformed('parent issue identity');
        relations.items.push({ kind: 'parent', otherIssue: parent });
        relations.availability.parent = 'available';
      } catch (error) {
        warnings.push(`父任务关系暂不可用：${error instanceof MulticaError ? error.message : '数据格式不符合约定。'}`);
      }
    }
    try {
      if (results[1].status === 'rejected') throw results[1].reason;
      const rows = array(object(results[1].value, 'children').issues, 'children.issues');
      const children = [], seen = new Set();
      let invalid = false;
      for (const row of rows.slice(0, CHILD_LIMIT)) {
        try {
          const child = normalizeIssue(row);
          if (!optionalId(child.id) || child.id === issue.id || seen.has(child.id)
            || child.parentIssueKnown && child.parentIssueId !== issue.id
            || row.parent_issue_id != null && !child.parentIssueKnown) throw malformed('child issue identity');
          seen.add(child.id);
          children.push({ kind: 'child', otherIssue: child });
        } catch { invalid = true; }
      }
      relations.items.push(...children);
      relations.availability.children = 'available';
      relations.childrenTruncated = rows.length > CHILD_LIMIT || invalid;
      if (invalid) warnings.push('部分子任务记录的格式或父任务归属不一致，已忽略；关系清单可能不完整。');
      if (rows.length > CHILD_LIMIT) warnings.push(`仅展示前 ${CHILD_LIMIT} 个直接子任务，请在 Multica 中查看完整层级。`);
    } catch (error) {
      warnings.push(`子任务关系暂不可用：${error instanceof MulticaError ? error.message : '数据格式不符合约定。'}`);
    }
    return relations;
  }

  async messages(taskId, since = 0) {
    const safeId = resourceId(taskId);
    if (!Number.isInteger(since) || since < 0 || since > 2_147_483_647) throw new MulticaError('消息序号必须是有效的非负整数。', 'INVALID_INPUT');
    const data = await this.#request(`/api/tasks/${safeId}/messages?since=${since}`);
    return this.#clean(normalizedMessages(data, since));
  }

  async cancelRun(taskId) {
    return this.#clean(normalizeRun(await this.#request(`/api/tasks/${resourceId(taskId)}/cancel`, true, {}), new Map(), new Map(), this.#token));
  }

  async rerunIssue(issueId, taskId) {
    return this.#clean(normalizeRun(await this.#request(`/api/issues/${resourceId(issueId)}/rerun`, true, { body: { task_id: resourceId(taskId) } }), new Map(), new Map(), this.#token));
  }
}
