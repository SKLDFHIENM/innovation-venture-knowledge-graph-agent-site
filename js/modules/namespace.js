/**
 * 创新创业课程知识图谱智能体 (IEKG / IVKGA) - 全局命名空间定义
 * "use strict"; 严谨模式下治理全局变量，避免命名污染与作用域冲突
 */
"use strict";

window.IEKG = window.IEKG || {};
window.IVKGA = window.IVKGA || window.IEKG;

// 架构子模块挂载点
window.IEKG.config = window.IEKG.config || {
    version: '6.8 Refactored Enterprise',
    detailsJsonPath: 'data/data_details.json',
    apiTimeoutMs: 15000,
    retryCount: 3
};

window.IEKG.utils = window.IEKG.utils || {};
window.IEKG.data = window.IEKG.data || {};
window.IEKG.modules = window.IEKG.modules || {
    graph: {},
    presentation: {},
    agent: {},
    exam: {}
};
