/**
 * 创新创业课程知识图谱智能体 (IEKG) - 全局命名空间定义
 * 统一治理全局变量，避免命名冲突与全局污染
 */
window.IEKG = window.IEKG || {};

// 架构子模块挂载点
window.IEKG.config = window.IEKG.config || {
    version: '5.2 Refactored',
    detailsJsonPath: 'data/data_details.json'
};

window.IEKG.utils = window.IEKG.utils || {};
window.IEKG.data = window.IEKG.data || {};
window.IEKG.modules = window.IEKG.modules || {
    graph: {},
    presentation: {},
    ai: {},
    tools: {}
};
