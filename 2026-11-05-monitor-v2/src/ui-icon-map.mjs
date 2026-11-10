// Agent portraits transcribed from the user's Multica reference screenshot.
export const agentPortraits = {
 '项目经理':'🌞', '需求文档拆解分析师':'🦊', '需求评审员':'🐙',
 'Mika':'🦄', '工作区小助手':'🤖', '代码审查员':'🐵',
 '技术方案设计评审员':'🐯', '技术方案设计师':'🧠',
 '开发工程师':'🐼', '缺陷解决方案设计师':'🦉', 'Jenkins Build Agent':'⭐',
};
export const agentPortrait = name => agentPortraits[String(name || '').trim()] || '🤖';
export function eventIconKind(type, isError = false) {
 if (isError) return 'error';
 return ({thinking:'thinking',text:'text',tool_use:'tool',tool:'tool',tool_result:'result',result:'result',error:'error',gap:'gap',wait:'wait',waiting:'wait',run:'run',task:'task',system:'system',other:'system',activity:'activity',monitor:'monitor',history:'history'})[type] || 'system';
}
