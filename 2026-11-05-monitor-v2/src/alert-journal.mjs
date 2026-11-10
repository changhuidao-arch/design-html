import { createHash, randomUUID } from 'node:crypto';
import { readFile, mkdir, writeFile, rename } from 'node:fs/promises';
import { dirname } from 'node:path';

export function monitoringScope(config) {
  return createHash('sha256').update(JSON.stringify([config.baseUrl, config.workspaceId, config.token || ''])).digest('hex');
}

export class AlertJournal {
  constructor(path) { this.path = path; this.scope = ''; this.events = []; this.queue = Promise.resolve(); this.error = ''; }
  async load() {
    try {
      const data = JSON.parse(await readFile(this.path, 'utf8'));
      if (typeof data.scope !== 'string' || !Array.isArray(data.events)) throw new Error('format');
      this.scope = data.scope; this.events = data.events.filter(event => event && typeof event.id === 'string').slice(-200);
    } catch (error) { if (error.code !== 'ENOENT') this.error = '历史提醒无法读取；当前监控仍可使用。'; }
  }
  sync(scope, alerts, diagnoses) {
    const changedScope = scope !== this.scope;
    if (changedScope) { this.scope = scope; this.events = []; }
    const entries = new Map(this.events.map(event => [event.id, { ...event, historical: true }]));
    for (const alert of alerts) entries.set(alert.id, { ...entries.get(alert.id), ...alert, historical: false, acknowledged: entries.get(alert.id)?.acknowledged || alert.acknowledged || false, diagnosis: diagnoses.get(alert.id) || entries.get(alert.id)?.diagnosis || null });
    const createdAt = event => Number.isFinite(Date.parse(event.createdAt)) ? Date.parse(event.createdAt) : 0;
    const next = [...entries.values()]
      .sort((a, b) => Number(!a.historical) - Number(!b.historical) || createdAt(a) - createdAt(b))
      .slice(-200).sort((a, b) => createdAt(a) - createdAt(b));
    if (changedScope || JSON.stringify(next) !== JSON.stringify(this.events)) { this.events = next; this.persist(); }
    return this.events;
  }
  acknowledge(id) {
    const event = this.events.find(item => item.id === id);
    if (!event) throw new Error('提醒已不存在，请刷新');
    event.acknowledged = true;
    this.persist();
  }
  persist() {
    const body = JSON.stringify({ scope: this.scope, events: this.events });
    this.queue = this.queue.then(async () => {
      await mkdir(dirname(this.path), { recursive: true, mode: 0o700 });
      const temp = `${this.path}.${randomUUID()}.tmp`;
      await writeFile(temp, body, { mode: 0o600 });
      await rename(temp, this.path);
      this.error = '';
    }).catch(() => { this.error = '提醒历史保存失败，请检查宿主数据目录权限。'; });
  }
}
