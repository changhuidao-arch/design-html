import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { randomUUID } from 'node:crypto';
import { normalizeAllowedHttpOrigins, normalizeBaseUrl } from './multica-api.mjs';

export function checkedUrl(value, field, allowedHttpOrigins = []) {
  try { return normalizeBaseUrl(value, allowedHttpOrigins); }
  catch (error) { throw new Error(`${field}：${error.message}`); }
}

const defaults = { baseUrl: 'http://127.0.0.1:8080', webUrl: 'http://127.0.0.1:3000', workspaceId: '', token: '', allowedHttpOrigins: [], monitorEnabled: true, aiDiagnosis: true, noProgressMinutes: 10, toolMinutes: 5, queueMinutes: 5, runMinutes: 60 };

export class SettingsStore {
  constructor(path) { this.path = path; this.value = { ...defaults, allowedHttpOrigins: [] }; this.queue = Promise.resolve(); this.revision = randomUUID(); }
  async load() {
    try {
      const parsed = JSON.parse(await readFile(this.path, 'utf8'));
      this.value = this.validate(parsed, { ...defaults, baseUrl: parsed.baseUrl ?? defaults.baseUrl });
    } catch (error) {
      if (error.code !== 'ENOENT') throw new Error('无法读取监控配置，请检查宿主配置文件');
    }
    return this.public();
  }
  public() {
    const { baseUrl, webUrl, workspaceId, token } = this.value;
    const { monitorEnabled, aiDiagnosis, noProgressMinutes, toolMinutes, queueMinutes, runMinutes } = this.value;
    return { baseUrl, webUrl, workspaceId, hasToken: Boolean(token), allowedHttpOrigins: [...this.value.allowedHttpOrigins], revision: this.revision, monitorEnabled, aiDiagnosis, noProgressMinutes, toolMinutes, queueMinutes, runMinutes };
  }
  validate(input, previous) {
    if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('配置格式错误');
    const allowedHttpOrigins = normalizeAllowedHttpOrigins(input.allowedHttpOrigins ?? previous.allowedHttpOrigins ?? []);
    const baseUrl = checkedUrl(input.baseUrl ?? previous.baseUrl, 'API 地址', allowedHttpOrigins);
    const webUrl = checkedUrl(input.webUrl ?? previous.webUrl, '网页地址', allowedHttpOrigins);
    const workspaceId = String(input.workspaceId ?? previous.workspaceId).trim();
    if (workspaceId && !/^[a-zA-Z0-9-]{1,128}$/.test(workspaceId)) throw new Error('工作区 ID 格式错误');
    const supplied = typeof input.token === 'string' ? input.token.trim() : '';
    if (supplied && (supplied.length > 4096 || /\s/.test(supplied))) throw new Error('令牌格式错误');
    if (baseUrl !== previous.baseUrl && !supplied && !input.clearToken) throw new Error('切换 API 地址时，请填写该环境的令牌');
    const monitoring = {};
    for (const name of ['monitorEnabled', 'aiDiagnosis']) {
      const value = input[name] ?? previous[name];
      if (typeof value !== 'boolean') throw new Error('监控开关必须是布尔值');
      monitoring[name] = value;
    }
    for (const name of ['noProgressMinutes', 'toolMinutes', 'queueMinutes', 'runMinutes']) {
      const value = Number(input[name] ?? previous[name]);
      if (!Number.isInteger(value) || value < 1 || value > 1440) throw new Error('监控时限须为 1–1440 分钟之间的整数');
      monitoring[name] = value;
    }
    return { baseUrl, webUrl, workspaceId, token: input.clearToken ? '' : supplied || previous.token, allowedHttpOrigins, ...monitoring };
  }
  save(input, expectedRevision) {
    const operation = this.queue.then(async () => {
      if (expectedRevision !== undefined && expectedRevision !== this.revision) throw new Error('连接配置已在其他窗口更新，请关闭并重新打开监控面板');
      const next = this.validate(input, this.value);
      await mkdir(dirname(this.path), { recursive: true, mode: 0o700 });
      const temp = `${this.path}.${randomUUID()}.tmp`;
      await writeFile(temp, JSON.stringify(next, null, 2) + '\n', { mode: 0o600 });
      await rename(temp, this.path);
      this.value = next;
      this.revision = randomUUID();
      return this.public();
    });
    this.queue = operation.catch(() => {});
    return operation;
  }
}
