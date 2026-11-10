import React, { useEffect, useMemo, useRef, useState } from 'react';

const widgetUrl = './1.0.59/waterfall.js';
const widgetLabels = {
  'Trace waterfall': '运行瀑布图',
  'Trace summary': '运行概览',
  'Trace overview. Drag to select a range; drag the selected range to pan.': '运行概览：拖动选择时间范围，拖动选中范围平移。',
  'Service colors': '记录类型颜色',
  'Search spans': '搜索片段',
  'Previous match': '上一个匹配项',
  'Next match': '下一个匹配项',
  'Trace options': '图表选项',
  'Timeline navigation': '时间轴导航',
  'Pan earlier': '向前平移',
  'Pan later': '向后平移',
  'Zoom out': '缩小',
  'Zoom in': '放大',
  'Fit trace': '显示全程',
  'Critical path': '关键路径',
  'Estimated critical path': '估算的关键路径',
  'Warnings': '异常记录',
  'Time measurement': '时间口径',
  'Total time': '片段跨度',
  'Direct time': '扣除子项覆盖',
  Total: '跨度',
  Direct: '扣除子片段后',
  Fields: '显示列',
  'Visible fields': '显示列',
  'Service name': '记录类型',
  'Bar labels': '条上标签',
  'Both time columns': '显示两种时长',
  'Request spans': '运行记录时间轴',
  Name: '片段',
  'Collapse all spans': '收起全部片段',
  'Expand all spans': '展开全部片段',
  'Timeline. Arrow keys pan; plus and minus zoom; Home fits the trace.': '时间轴：方向键平移，加减键缩放，Home 键显示全程。',
  'Sort by longest duration': '按最长跨度排序',
  'Sort by shortest duration': '按最短跨度排序',
  'Restore trace order': '恢复发生顺序',
  'Resize Name column': '调整片段列宽',
  'Resize Duration column': '调整跨度列宽',
  'Zoom to span': '定位片段',
  'Close span details': '关闭片段详情',
  Start: '距运行开始',
  Service: '记录类型',
  Status: '状态',
  Error: '错误',
  Warning: '警告',
  'No spans in this trace.': '没有可显示的片段。',
  'Scroll to zoom · drag to pan · Shift + scroll to pan · double-click to focus': '滚轮缩放 · 拖动平移 · Shift + 滚轮平移 · 双击定位'
};
const widgetStyle = `@container (max-width: 720px) {
  .wf-view .wf-frame { min-width: 420px; }
  .wf-view .trace-search-group { flex-basis: 100%; }
}`;

function formatWidgetTime(value, compact = false) {
  return value.replace(/(\d+(?:\.\d+)?)\s*(µs|ms|s)\b/g, (_, amount, unit) => {
    const number = Number(amount);
    if (unit === 'µs') return `${amount} 微秒`;
    if (unit === 'ms') return compact && number === 0 ? '0:00' : `${amount} 毫秒`;
    if (number < 60) return compact && Number.isInteger(number) ? `0:${String(number).padStart(2, '0')}` : `${amount} 秒`;
    const minutes = Math.floor(number / 60);
    const seconds = Number((number - minutes * 60).toFixed(2));
    if (compact) {
      const whole = String(Math.floor(seconds)).padStart(2, '0');
      const fraction = Number.isInteger(seconds) ? '' : String(seconds).slice(String(Math.floor(seconds)).length);
      return `${minutes}:${whole}${fraction}`;
    }
    return `${minutes} 分 ${seconds} 秒`;
  });
}

function translateWidgetLabel(value) {
  const label = widgetLabels[value];
  if (label) return label;
  const disclosure = /^(Expand|Collapse) (.+)$/.exec(value);
  if (disclosure) return `${disclosure[2]}，${disclosure[1] === 'Expand' ? '展开' : '收起'}`;
  const warnings = /^(\d+) (issue|issues|warning|warnings)$/.exec(value);
  if (warnings) return `${warnings[1]} 条异常记录`;
  const range = /^(Adjust range start|Adjust range end): (.+)$/.exec(value);
  if (range) return `${range[1] === 'Adjust range start' ? '调整范围起点' : '调整范围终点'}：${formatWidgetTime(range[2], true)}`;
  return formatWidgetTime(value);
}

function localizeWidget(root) {
  if (!root?.querySelector('.wf-view')) return;
  if (!root.querySelector('style[data-mm-localization]')) {
    const style = document.createElement('style');
    style.dataset.mmLocalization = '';
    style.textContent = widgetStyle;
    root.append(style);
  }
  const controlSelector = '.wf-view, .wf-summary, .wf-minimap, .wf-legend, .wf-actions, .trace-navigation, .wf-menu, .wf-table, .wf-axis, .trace-search, .wf-range-handle, .wf-toolbar button, .wf-name-heading button, .wf-disclosure, .wf-sort, .wf-resizer, .wf-warning-icon, .wf-detail-actions button';
  for (const node of root.querySelectorAll(controlSelector)) {
    for (const attribute of ['aria-label', 'data-tooltip', 'placeholder', 'title']) {
      const value = node.getAttribute(attribute);
      if (value == null) continue;
      const translated = translateWidgetLabel(value);
      if (translated !== value) node.setAttribute(attribute, translated);
    }
  }
  for (const track of root.querySelectorAll('.wf-track[aria-label]')) {
    const value = track.getAttribute('aria-label');
    const translated = formatWidgetTime(value);
    if (translated !== value) track.setAttribute('aria-label', translated);
  }
  const selectors = [
    '.wf-name-heading > span', '.wf-service-cell', 'th.wf-alternate-cell', '.wf-metric-label',
    '.wf-menu-item > span', '.wf-footer > span:last-child', '.wf-empty', '.wf-detail-data dt',
    '.wf-detail-actions > button:first-child'
  ];
  for (const node of root.querySelectorAll(selectors.join(','))) {
    const translated = translateWidgetLabel(node.textContent);
    if (translated !== node.textContent) node.textContent = translated;
  }
  for (const node of root.querySelectorAll('.wf-tick, .wf-range-label, .wf-row .wf-value, .wf-row .wf-alternate-cell')) {
    const translated = formatWidgetTime(node.textContent, node.matches('.wf-tick, .wf-range-label'));
    if (translated !== node.textContent) node.textContent = translated;
  }
  for (const term of root.querySelectorAll('.wf-detail-data dt')) {
    if (!['距运行开始', '跨度', '扣除子片段后', '状态'].includes(term.textContent)) continue;
    const value = term.nextElementSibling;
    if (!value) continue;
    const translated = term.textContent === '状态' && value.textContent === 'error' ? '失败' : formatWidgetTime(value.textContent);
    if (translated !== value.textContent) value.textContent = translated;
  }
  const meta = root.querySelector('.wf-meta');
  if (meta) {
    const translated = formatWidgetTime(meta.textContent).replace(/\b(\d+) spans\b/, '$1 个图中条目');
    if (translated !== meta.textContent) meta.textContent = translated;
  }
  const count = root.querySelector('.wf-row-count');
  if (count) {
    const translated = count.textContent.replace(/^(\d+) of (\d+) spans$/, '已显示 $1 / $2 项');
    if (translated !== count.textContent) count.textContent = translated;
  }
}
let widgetPromise;
function loadWidget() {
  if (customElements.get('viz-waterfall')) return Promise.resolve();
  if (!widgetPromise) widgetPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.type = 'module'; script.src = widgetUrl;
    script.onload = () => customElements.whenDefined('viz-waterfall').then(resolve, reject);
    script.onerror = () => { script.remove(); widgetPromise = null; reject(new Error('瀑布图组件加载失败，请检查网络后重试。')); };
    document.head.appendChild(script);
  });
  return widgetPromise;
}

export function WaterfallChart({ data, issue, run, rows, selectedId, focusRequest, onSelect }) {
  const chart = useRef(null), select = useRef(onSelect);
  const [status, setStatus] = useState('loading'), [retry, setRetry] = useState(0);
  select.current = onSelect;
  const spans = useMemo(() => [
    { id: 'task', name: `${issue?.identifier || '任务'} · 本次运行窗口`, service: '任务', startMs: 0, durationMs: data.total },
    { id: 'run', parentId: 'task', name: `${run.agentName || '智能体'} · #${run.id.slice(-8)}`, service: '运行', startMs: 0, durationMs: data.total },
    ...rows.filter(row => row.offset != null && row.duration != null).map(row => ({ id: row.id, parentId: 'run', name: `${row.name} · ${row.seq ? `#${row.seq}${row.lastSeq !== row.seq ? `–${row.lastSeq}` : ''}` : row.summary}`, service: ({ thinking: '思考输出', text: '文字输出', tool: '工具', gap: '无日志间隔', other: '其他记录' })[row.kind], startMs: row.offset, durationMs: row.duration ?? 0, ...(row.failed ? { status: 'error' } : {}), attributes: { '记录类型': row.name, '详情': '请查看图表上方的原文与输入输出' } }))
  ], [data.total, issue?.identifier, run.id, run.agentName, rows]);
  useEffect(() => { let active = true; setStatus('loading'); loadWidget().then(() => { if (active) setStatus('ready'); }, () => { if (active) setStatus('error'); }); return () => { active = false; }; }, [retry]);
  useEffect(() => {
    const element = chart.current;
    if (status !== 'ready' || !element) return;
    const listener = event => select.current(event.detail.selection?.spanId || '');
    const failed = () => setStatus('error');
    const colors = { '任务': '#3269be', '运行': '#dfb83e', '思考输出': '#3aaaa3', '文字输出': '#62b97d', '工具': '#ee975f', '无日志间隔': '#dc78ad', '其他记录': '#768395' };
    const syncColors = () => {
      for (const item of element.shadowRoot?.querySelectorAll('.wf-legend-item') || []) {
        const index = item.querySelector('.wf-swatch')?.style.getPropertyValue('--wf-series').match(/--viz-series-(\d+)/)?.[1];
        const color = colors[item.textContent.trim()];
        if (index && color && element.style.getPropertyValue(`--viz-series-${index}`) !== color) element.style.setProperty(`--viz-series-${index}`, color);
      }
    };
    let scheduled = false;
    const refresh = () => {
      if (scheduled) return;
      scheduled = true;
      queueMicrotask(() => { scheduled = false; syncColors(); localizeWidget(element.shadowRoot); });
    };
    const observer = new MutationObserver(refresh);
    if (element.shadowRoot) observer.observe(element.shadowRoot, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['aria-label', 'data-tooltip', 'placeholder', 'title'] });
    refresh();
    element.addEventListener('viz-state-change', listener); element.addEventListener('viz-error', failed);
    return () => { observer.disconnect(); element.removeEventListener('viz-state-change', listener); element.removeEventListener('viz-error', failed); };
  }, [status]);
  useEffect(() => {
    if (status !== 'ready' || !chart.current || data.total <= 0) return;
    // These log intervals do not establish causal dependencies.
    chart.current.criticalPath = [];
    chart.current.spans = spans;
    chart.current.durationMs = data.total;
  }, [status, spans, data.total]);
  useEffect(() => {
    if (status !== 'ready' || !chart.current || !focusRequest) return;
    const row = data.rows.find(item => item.id === focusRequest.id);
    if (!row || row.offset == null) return;
    const pad = Math.max(1000, (row.duration || 0) * .15);
    chart.current.viewState = { ...chart.current.viewState, selectedSpanId: row.id, details: false, startMs: Math.max(0, row.offset - pad), endMs: Math.min(data.total, row.offset + (row.duration || 0) + pad) };
    if (focusRequest.revealChart) chart.current.scrollIntoView({ block: 'nearest' });
  }, [status, focusRequest, data.rows, data.total]);
  if (status === 'error') return <div className="mm-exec-error" role="alert">瀑布图组件加载失败，请检查网络后重试。<button onClick={() => setRetry(value => value + 1)}>重试</button></div>;
  return <div className="mm-wf-widget">{status === 'loading' && <p role="status">正在加载瀑布图…</p>}{React.createElement('viz-waterfall', { ref: chart, title: '任务 → 本次运行 → 过程记录', description: '条长表示记录跨度；无日志间隔不计入思考。“扣除子片段后”仅是图层差值，不等于实际工作时长。', 'aria-label': '运行与日志片段时间轴' })}</div>;
}
