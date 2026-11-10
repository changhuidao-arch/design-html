import {printable} from './run-conversation.mjs';

export function waterfallSearchIndex(rows) {
  return new Map(rows.map(row => [row.id,[row.id,row.name,row.summary,row.seq == null ? '' : `#${row.seq}`,row.lastSeq == null ? '' : `#${row.lastSeq}`,printable(row.entry?.message?.content),printable(row.entry?.call?.input),printable(row.entry?.result?.output || row.entry?.result?.content)].join('\n').toLowerCase()]));
}

// Search the complete loaded run before choosing the rows to render.
export function waterfallView(rows,{kind='all',query='',mode='longest',page=0,pageSize=40,index=waterfallSearchIndex(rows)}={}) {
  const typed = rows.filter(row => kind === 'all' || row.kind === kind);
  const needle = query.trim().toLowerCase();
  const matches = needle ? typed.filter(row => index.get(row.id)?.includes(needle)) : typed;
  const ranked = matches.filter(row => row.duration > 0).slice().sort((a,b)=>b.duration-a.duration || a.offset-b.offset).slice(0,20);
  const paginated = mode === 'sequence' || Boolean(needle);
  const chosen = paginated ? matches : ranked.slice().sort((a,b)=>a.offset-b.offset);
  const pages = paginated ? Math.max(1,Math.ceil(chosen.length/pageSize)) : 1;
  const safePage = Math.max(0,Math.min(page,pages-1));
  return {typed,matches,ranked,chosen,paginated,pages,safePage,visible:paginated?chosen.slice(safePage*pageSize,(safePage+1)*pageSize):chosen};
}
