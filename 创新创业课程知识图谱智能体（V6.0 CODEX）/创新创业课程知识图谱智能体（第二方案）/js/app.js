/**
 * 创新创业课程知识图谱智能体 (IEKG) - 全局入口与系统调度层 v6.6 Refactored (2026.07.21)
 * 负责各子模块的加载、DOM 初始化与向下兼容 API 代理
 */

// ── 1. 自动注入基础子模块 (兼容现有 HTML 文件) ──
(function loadIEKGModules() {
    if (typeof document === 'undefined' || !document.head) return;
    const requiredScripts = [
        'js/modules/namespace.js',
        'js/modules/utils.js',
        'js/modules/data_loader.js',
        'js/modules/graph_core.js',
        'js/modules/presentation.js',
        'js/modules/ai_agent.js',
        'js/modules/tools.js'
    ];

    const loadedScripts = Array.from(document.querySelectorAll('script')).map(s => s.getAttribute('src'));

    requiredScripts.forEach(scriptSrc => {
        if (!loadedScripts.some(src => src && src.includes(scriptSrc))) {
            const script = document.createElement('script');
            script.src = scriptSrc;
            script.async = false; // 保证按顺序加载
            document.head.appendChild(script);
        }
    });
})();

// ── 2. 全局 DOM 事件绑定与页面调度 ──
document.addEventListener('DOMContentLoaded', () => {
    // 自动预加载大纲 JSON 数据
    if (window.IEKG && window.IEKG.data && window.IEKG.data.loadDetails) {
        window.IEKG.data.loadDetails().catch(err => {
            console.warn('[IEKG System] Data preload notice:', err);
        });
    }

    // 初始化首页微课徽章矩阵 (如果存在)
    initHomeAndGlossary();

    // 初始化星系图谱 (如果存在)
    if (document.getElementById('knowledge-graph-container')) {
        if (window.IEKG && window.IEKG.modules && window.IEKG.modules.graph) {
            window.IEKG.modules.graph.initKnowledgeGraph();
        }
    }

    // 初始化 AI 导师对话框 (如果存在)
    if (document.getElementById('chat-history')) {
        if (window.IEKG && window.IEKG.modules && window.IEKG.modules.ai) {
            window.IEKG.modules.ai.initAICopilot();
        }
    }
});

// ── 3. 首页微课徽章矩阵与交互逻辑 ──
function initHomeAndGlossary() {
    const container = document.getElementById('matrix-groups-container');
    if (!container) return;

    const MODULE_METADATA = {
        'L1': { name: '认识创新创业', num: '1', sub: '单元 1 · 2 个任务 · 2 学时', color: '#0077b6' },
        'L2': { name: '创新思维与方法', num: '2', sub: '单元 2 · 3 个任务 · 4 学时', color: '#0284c7' },
        'L3': { name: '创业团队组建与治理', num: '3', sub: '单元 3 · 3 个任务 · 4 学时', color: '#0369a1' },
        'L4': { name: '创业机会与商业模式', num: '4', sub: '单元 4 · 4 个任务 · 6 学时', color: '#0f766e' },
        'L5': { name: '创业资源与精益运营', num: '5', sub: '单元 5 · 3 个任务 · 4 学时', color: '#15803d' },
        'L6': { name: '创业计划书与路演', num: '6', sub: '单元 6 · 3 个任务 · 4 学时', color: '#b45309' }
    };

    const nodes = (window.GRAPH_DATA && window.GRAPH_DATA.nodes) ? window.GRAPH_DATA.nodes : [];
    if (!nodes.length) return;

    const groups = {};
    nodes.forEach(node => {
        const catKey = node.categoryKey || 'L1';
        if (!groups[catKey]) groups[catKey] = [];
        groups[catKey].push(node);
    });

    let html = '';
    const exploredNodes = new Set(JSON.parse(localStorage.getItem('ag_explored_nodes') || '[]'));

    Object.keys(MODULE_METADATA).forEach(catKey => {
        const meta = MODULE_METADATA[catKey];
        const groupNodes = groups[catKey] || [];
        
        const escName = window.IEKG.utils.escapeHTML(meta.name);
        const escSub = window.IEKG.utils.escapeHTML(meta.sub);

        let cardsHtml = '';
        groupNodes.forEach(node => {
            const isExplored = exploredNodes.has(String(node.id));
            const escNodeName = window.IEKG.utils.escapeHTML(node.name);
            cardsHtml += `
                <div class="matrix-card ${isExplored ? 'explored' : ''}" onclick="renderKnowledgeCard('${window.IEKG.utils.escapeHTML(String(node.id))}')">
                    <div class="card-status-dot"></div>
                    <div class="card-name">${escNodeName}</div>
                </div>
            `;
        });

        html += `
            <div class="matrix-group-box">
                <div class="group-header">
                    <span class="group-num" style="background:${meta.color}">${meta.num}</span>
                    <div class="group-title-info">
                        <h3>${escName}</h3>
                        <p>${escSub}</p>
                    </div>
                </div>
                <div class="matrix-cards-grid">
                    ${cardsHtml}
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// ── 4. 全局向下兼容代理函数 ──
window.openPresentation = function(nodeId) {
    if (window.IEKG && window.IEKG.modules && window.IEKG.modules.presentation) {
        window.IEKG.modules.presentation.openPresentation(nodeId);
    } else {
        const cleanId = String(nodeId || '11').replace(/[^a-zA-Z0-9]/g, '') || '11';
        window.location.href = 'presentation.html?nodeId=' + cleanId;
    }
};

window.openPresentationDrawer = function() {
    if (window.IEKG && window.IEKG.modules && window.IEKG.modules.presentation) {
        window.IEKG.modules.presentation.openQuickDrawer();
    }
};

window.openGlobalPresModal = function(nodeId) {
    window.openPresentation(nodeId);
};

window.renderKnowledgeCard = function(nodeId) {
    if (window.IEKG && window.IEKG.modules && window.IEKG.modules.graph) {
        window.IEKG.modules.graph.openNodeCard(nodeId);
    }
};

window.closeKnowledgeCard = function() {
    if (window.IEKG && window.IEKG.modules && window.IEKG.modules.graph) {
        window.IEKG.modules.graph.closeNodeCard();
    }
};

window.quickSendQuestion = function(text) {
    if (window.IEKG && window.IEKG.modules && window.IEKG.modules.ai) {
        window.IEKG.modules.ai.quickSendQuestion(text);
    }
};

window.handleUserSendMessage = function() {
    if (window.IEKG && window.IEKG.modules && window.IEKG.modules.ai) {
        window.IEKG.modules.ai.handleUserSendMessage();
    }
};

window.autoFillBMCCanvas = function() {
    if (window.IEKG && window.IEKG.modules && window.IEKG.modules.tools) {
        window.IEKG.modules.tools.autoFillBMCCanvas();
    }
};

window.clearBMCCanvas = function() {
    if (window.IEKG && window.IEKG.modules && window.IEKG.modules.tools) {
        window.IEKG.modules.tools.clearBMCCanvas();
    }
};

// ── 5. 全局点击 Safe-Guards 安全保障机制 ──
(function registerSafeGuards() {
    const requiredGlobals = [
        'scrollToElement', 'openResourceReader', 'downloadResourceFile',
        'exportBMCToImage', 'openActivityDetail'
    ];
    requiredGlobals.forEach(funcName => {
        if (typeof window[funcName] !== 'function') {
            window[funcName] = function(...args) {
                console.log(`[SafeGuard] 唤起全局防保底函数: ${funcName}`, args);
                if (funcName === 'scrollToElement' && args[0]) {
                    const targetId = String(args[0]).replace('#', '');
                    const el = document.getElementById(targetId) || document.querySelector(String(args[0]));
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
            };
        }
    });
})();

window.toggleTheme = function() {
    if (window.IEKG && window.IEKG.modules && window.IEKG.modules.tools) {
        window.IEKG.modules.tools.toggleTheme();
    }
};

// 全局点击防卡死安全清场器 (Global Pointer Unblocker)
document.addEventListener('DOMContentLoaded', () => {
    // 1. 强制全屏粒子画布穿透
    const particlesCanvas = document.getElementById('particles-canvas');
    if (particlesCanvas) {
        particlesCanvas.style.pointerEvents = 'none';
        particlesCanvas.style.zIndex = '-9999';
    }

    // 2. 检查未打开的遮罩 overlay
    document.querySelectorAll('.gp-modal-overlay, .modal-overlay').forEach(el => {
        if (!el.classList.contains('open')) {
            el.style.pointerEvents = 'none';
            el.style.display = 'none';
        }
    });

    // 3. 全局按钮与按键响应通道强行解封
    document.querySelectorAll('a, button, .action-btn, .nav-item, .gp-action-btn').forEach(btn => {
        btn.style.pointerEvents = 'auto';
    });
});
