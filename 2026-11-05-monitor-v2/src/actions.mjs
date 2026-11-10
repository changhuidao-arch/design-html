import { createHash, randomUUID } from 'node:crypto';

const ACTIVE = new Set(['queued', 'dispatched', 'running', 'waiting_local_directory', 'deferred']);
const TERMINAL = new Set(['completed', 'failed', 'cancelled']);
const CONFIRMATION_TTL_MS = 60_000;
const MAX_CONFIRMATIONS = 256;

class ActionError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'ActionError';
    this.code = code;
  }
}

const fail = (message, code) => { throw new ActionError(message, code); };
const resourceId = (value) => {
  if (typeof value !== 'string' || !/^[A-Za-z0-9][A-Za-z0-9_-]{0,127}$/.test(value)) {
    fail('任务或运行标识无效，请重新选择。', 'INVALID_INPUT');
  }
  return value;
};

function connectionSnapshot(config) {
  if (!config || typeof config !== 'object' || !config.workspaceId || !config.revision || !config.baseUrl) {
    fail('请先完成连接配置并选择工作区。', 'INVALID_CONFIG');
  }
  if (['workspaceId', 'revision', 'baseUrl'].some(key => typeof config[key] !== 'string')) {
    fail('连接配置格式无效，请重新打开监控面板。', 'INVALID_CONFIG');
  }
  const tokenHash = typeof config.token === 'string' ? createHash('sha256').update(config.token).digest('hex') : null;
  return JSON.stringify([config.baseUrl, config.workspaceId, config.revision, tokenHash]);
}

function publicConnection(snapshot) {
  const [baseUrl, workspaceId, revision] = JSON.parse(snapshot);
  return { baseUrl, workspaceId, revision };
}

function inspect(detail, issueId, taskId, kind, canonical = false) {
  if (!detail || !detail.issue || !Array.isArray(detail.runs) || typeof detail.issue.title !== 'string') {
    fail('任务详情不完整，无法安全执行操作。', 'INVALID_RESPONSE');
  }
  const issue = detail.issue;
  resourceId(issue.id);
  if (canonical && issue.id !== issueId) fail('任务标识发生变化，请重新确认。', 'STATE_CHANGED');
  const matches = detail.runs.filter(run => run?.id === taskId);
  if (matches.length !== 1 || matches[0].issueId !== issue.id) {
    fail('未找到属于此任务的唯一运行，请刷新后重试。', 'RUN_NOT_FOUND');
  }
  const run = matches[0];
  if (kind === 'cancel' && !ACTIVE.has(run.status)) {
    fail('此运行已不处于活动状态，无需取消。', 'RUN_NOT_ACTIVE');
  }
  if (kind === 'rerun') {
    if (run.status !== 'failed' && run.status !== 'cancelled') {
      fail('只能重跑明确失败或已取消的运行。', 'RUN_NOT_RETRYABLE');
    }
    if (detail.runHistoryTruncated === true) {
      fail('运行历史未完整加载，无法排除仍有活动运行。请在 Multica 中核对。', 'INCOMPLETE_HISTORY');
    }
    if (detail.runs.some(row => !row || (!ACTIVE.has(row.status) && !TERMINAL.has(row.status)))) {
      fail('运行历史包含未知状态，无法确认任务是否空闲。', 'UNKNOWN_RUN_STATE');
    }
    if (detail.runs.some(row => ACTIVE.has(row.status))) {
      fail('此任务仍有活动运行。请等待结束，或单独确认取消后再重跑。', 'ACTIVE_RUN_EXISTS');
    }
  }
  const state = JSON.stringify({
    issue: [issue.id, issue.title, issue.status, issue.updatedAt ?? null],
    run: [run.id, run.issueId, run.agentId ?? null, run.runtimeId ?? null, run.status, run.createdAt ?? null, run.startedAt ?? null, run.completedAt ?? null],
  });
  return { issue, run, state };
}

function confirmationMessage(kind, issueTitle, taskId, status) {
  const target = `任务“${issueTitle}”的运行 ${taskId}（当前状态：${status}）`;
  return kind === 'cancel'
    ? `确认取消${target}？服务端记录取消后，守护进程仍需停止执行并收尾；记录变为 cancelled 不代表操作系统进程已经退出。此操作不会自动重跑。`
    : `确认重跑${target}？这会创建一次新运行，可能产生模型费用和外部操作。服务端会替换同一任务、智能体及评论线程中尚未开始的排队运行；原工作目录和会话可能被复用。当前未发现活动运行，提交前会再次检查。`;
}

// Only owner-authenticated UI RPC may expose this gate. It does not authenticate a caller itself.
export class ActionGate {
  #getClient;
  #getConfig;
  #now;
  #pending = new Map();
  #inFlight = new Set();

  constructor({ getClient, getConfig, now = Date.now } = {}) {
    if (typeof getClient !== 'function' || typeof getConfig !== 'function' || typeof now !== 'function') {
      fail('操作确认服务配置无效。', 'INVALID_CONFIG');
    }
    this.#getClient = getClient;
    this.#getConfig = getConfig;
    this.#now = now;
  }

  #time() {
    const value = this.#now();
    if (!Number.isFinite(value)) fail('无法读取确认有效期，请重新打开监控面板。', 'INVALID_CLOCK');
    return value;
  }

  #assertConnection(snapshot) {
    if (snapshot !== connectionSnapshot(this.#getConfig())) {
      fail('连接配置或工作区已变化，请重新获取操作确认。', 'CONFIG_CHANGED');
    }
  }

  #scope(connection, issueId) { return JSON.stringify([connection, issueId]); }

  async prepare(input = {}) {
    if (!input || typeof input !== 'object' || Array.isArray(input)) fail('操作参数必须是对象。', 'INVALID_INPUT');
    const { kind, issueId, taskId } = input;
    if (kind !== 'cancel' && kind !== 'rerun') fail('仅支持取消运行或重跑失败运行。', 'INVALID_ACTION');
    resourceId(issueId);
    resourceId(taskId);
    const connection = connectionSnapshot(this.#getConfig());
    const client = await this.#getClient();
    this.#assertConnection(connection);
    const detail = await client.issue(issueId);
    this.#assertConnection(connection);
    const current = inspect(detail, issueId, taskId, kind);
    const scope = this.#scope(connection, current.issue.id);
    if (this.#inFlight.has(scope)) fail('此任务正在提交操作，请等待结果后刷新。', 'ACTION_IN_PROGRESS');
    const issuedAt = this.#time();
    for (const [id, ticket] of this.#pending) if (ticket.expiresAtMs <= issuedAt) this.#pending.delete(id);
    if (this.#pending.size >= MAX_CONFIRMATIONS) fail('待确认操作过多，请等待已有确认过期后重试。', 'TOO_MANY_CONFIRMATIONS');
    const confirmationId = randomUUID();
    const expiresAtMs = issuedAt + CONFIRMATION_TTL_MS;
    this.#pending.set(confirmationId, {
      connection, scope, kind, issueId: current.issue.id, taskId, state: current.state,
      previousStatus: current.run.status, expiresAtMs,
    });
    const issueTitle = current.issue.title.slice(0, 500);
    return {
      confirmationId, kind, issueId: current.issue.id, taskId, issueTitle,
      connection: publicConnection(connection),
      previousStatus: current.run.status,
      expiresAt: new Date(expiresAtMs).toISOString(),
      message: confirmationMessage(kind, issueTitle, taskId, current.run.status),
    };
  }

  async execute(input = {}) {
    const confirmationId = input && typeof input === 'object' && !Array.isArray(input) ? input.confirmationId : null;
    const ticket = typeof confirmationId === 'string' ? this.#pending.get(confirmationId) : null;
    if (!ticket) fail('没有有效的一次性确认，请重新打开确认窗口。', 'CONFIRMATION_REQUIRED');
    // Consume before any await so simultaneous submissions cannot share a ticket.
    this.#pending.delete(confirmationId);
    const assertFresh = () => {
      if (this.#time() >= ticket.expiresAtMs) fail('操作确认已超过 60 秒，请重新确认。', 'CONFIRMATION_EXPIRED');
      this.#assertConnection(ticket.connection);
    };
    assertFresh();
    if (this.#inFlight.has(ticket.scope)) fail('此任务正在提交操作，请等待结果后刷新。', 'ACTION_IN_PROGRESS');
    this.#inFlight.add(ticket.scope);
    try {
      const client = await this.#getClient();
      assertFresh();
      const detail = await client.issue(ticket.issueId);
      assertFresh();
      const current = inspect(detail, ticket.issueId, ticket.taskId, ticket.kind, true);
      if (current.state !== ticket.state) fail('任务或运行状态已变化，请刷新并重新确认。', 'STATE_CHANGED');
      if (typeof client[ticket.kind === 'cancel' ? 'cancelRun' : 'rerunIssue'] !== 'function') {
        fail('当前客户端未提供此操作，请更新插件后重新确认。', 'ACTION_UNAVAILABLE');
      }
      // A second confirmation prepared before this write must not replay it later.
      for (const [id, other] of this.#pending) if (other.scope === ticket.scope) this.#pending.delete(id);
      const base = { kind: ticket.kind, issueId: ticket.issueId, taskId: ticket.taskId, previousStatus: ticket.previousStatus, connection: publicConnection(ticket.connection) };
      let result;
      try {
        result = ticket.kind === 'cancel'
          ? await client.cancelRun(ticket.taskId)
          : await client.rerunIssue(ticket.issueId, ticket.taskId);
        if (!result || typeof result.id !== 'string' || typeof result.status !== 'string' || !result.status ||
            (result.issueId != null && result.issueId !== ticket.issueId) ||
            (ticket.kind === 'cancel' ? result.id !== ticket.taskId : result.id === ticket.taskId)) {
          throw new ActionError('操作响应不完整。', 'INVALID_RESPONSE');
        }
        resourceId(result.id);
      } catch (error) {
        if ([401, 403, 404].includes(error?.status)) {
          fail('服务器拒绝了此操作，请检查权限和任务是否仍存在，再重新确认。', 'ACTION_REJECTED');
        }
        return {
          ...base, runId: null, status: null, outcomeUncertain: true,
          message: '操作请求的结果尚无法确认。请求不会自动重发，确认已失效；请刷新运行历史核实结果，再决定是否重新操作。',
        };
      }
      return {
        ...base, runId: result.id, status: result.status, outcomeUncertain: false,
        message: ticket.kind === 'cancel'
          ? (result.status === 'cancelled'
            ? '服务端已记录取消。守护进程可能仍在停止执行和收尾，尚不能据此确认操作系统进程已退出。'
            : `服务器返回的实际运行状态为 ${result.status}；未将其认定为取消成功，请刷新记录。`)
          : `服务端已返回新运行 ${result.id}，当前状态为 ${result.status}。请继续监控执行结果。`,
      };
    } finally {
      this.#inFlight.delete(ticket.scope);
    }
  }
}
