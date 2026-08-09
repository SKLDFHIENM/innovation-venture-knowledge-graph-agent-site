/**
 * 创新创业课程知识图谱智能体 - 现代前端响应式框架核心 (Framework Engine)
 * 特性：
 * 1. 100% 本地离线运行，零外部依赖
 * 2. 响应式 Store (Reactive State Management) 支持 LocalStorage 离线持久化
 * 3. 模态框与 Toast 消息通知 UI 引擎
 * 4. 全局主题与微动效交互控制器
 */

(function (window) {
    'use strict';

    // 全局框架命名空间
    const App = window.App || {};

    /**
     * 1. 响应式状态中心 (Reactive Store)
     */
    class Store {
        constructor(initialState = {}, storageKey = null) {
            this.listeners = new Set();
            this.storageKey = storageKey;
            
            // 从 LocalStorage 加载数据
            let savedState = {};
            if (storageKey) {
                try {
                    const localData = localStorage.getItem(storageKey);
                    if (localData) savedState = JSON.parse(localData);
                } catch (e) {
                    console.warn('[Framework Store] 加载 LocalStorage 失败:', e);
                }
            }

            const self = this;
            this.state = new Proxy({ ...initialState, ...savedState }, {
                set(target, property, value) {
                    target[property] = value;
                    if (self.storageKey) {
                        try {
                            localStorage.setItem(self.storageKey, JSON.stringify(target));
                        } catch (e) {
                            console.warn('[Framework Store] 保存 LocalStorage 失败:', e);
                        }
                    }
                    self.notify(property, value);
                    return true;
                }
            });
        }

        subscribe(listener) {
            this.listeners.add(listener);
            return () => this.listeners.delete(listener);
        }

        notify(property, value) {
            this.listeners.forEach(fn => fn(property, value, this.state));
        }

        get(key) {
            return this.state[key];
        }

        set(key, value) {
            this.state[key] = value;
        }

        update(updaterFn) {
            updaterFn(this.state);
        }
    }

    /**
     * 2. UI 交互组件（Toast、Modal 弹窗、通知）
     */
    const UI = {
        toast(message, type = 'info', duration = 3000) {
            let container = document.getElementById('app-toast-container');
            if (!container) {
                container = document.createElement('div');
                container.id = 'app-toast-container';
                container.style.cssText = `
                    position: fixed;
                    bottom: 24px;
                    right: 24px;
                    z-index: 99999;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    pointer-events: none;
                `;
                document.body.appendChild(container);
            }

            const toast = document.createElement('div');
            const bgMap = {
                info: 'linear-gradient(135deg, #0284c7, #0369a1)',
                success: 'linear-gradient(135deg, #10b981, #047857)',
                warning: 'linear-gradient(135deg, #f59e0b, #b45309)',
                danger: 'linear-gradient(135deg, #ef4444, #b91c1c)'
            };
            const iconMap = {
                info: 'fa-info-circle',
                success: 'fa-check-circle',
                warning: 'fa-exclamation-triangle',
                danger: 'fa-times-circle'
            };

            toast.style.cssText = `
                background: ${bgMap[type] || bgMap.info};
                color: #ffffff;
                padding: 12px 20px;
                border-radius: 12px;
                font-size: 14px;
                font-weight: 700;
                box-shadow: 0 10px 25px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                gap: 10px;
                opacity: 0;
                transform: translateY(20px) scale(0.95);
                transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                pointer-events: auto;
                backdrop-filter: blur(8px);
                border: 1px solid rgba(255,255,255,0.2);
            `;

            toast.innerHTML = `<i class="fas ${iconMap[type] || 'fa-info-circle'}"></i> <span>${message}</span>`;
            container.appendChild(toast);

            requestAnimationFrame(() => {
                toast.style.opacity = '1';
                toast.style.transform = 'translateY(0) scale(1)';
            });

            setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.transform = 'translateY(-10px) scale(0.9)';
                setTimeout(() => toast.remove(), 300);
            }, duration);
        },

        confirm(title, content, onConfirm) {
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0; left: 0; width: 100vw; height: 100vh;
                background: rgba(15, 23, 42, 0.75);
                backdrop-filter: blur(12px);
                z-index: 999999;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.25s ease;
            `;

            const box = document.createElement('div');
            box.style.cssText = `
                background: linear-gradient(145deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.98));
                border: 1px solid rgba(0, 194, 224, 0.3);
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
                border-radius: 20px;
                padding: 28px;
                max-width: 440px;
                width: 90%;
                color: #ffffff;
                text-align: center;
            `;

            box.innerHTML = `
                <div style="font-size: 40px; color: #00c2e0; margin-bottom: 12px;">
                    <i class="fas fa-question-circle"></i>
                </div>
                <h3 style="font-size: 20px; font-weight: 800; margin-bottom: 10px;">${title}</h3>
                <p style="color: #94a3b8; font-size: 14px; line-height: 1.6; margin-bottom: 24px;">${content}</p>
                <div style="display: flex; gap: 12px; justify-content: center;">
                    <button id="modal-cancel-btn" style="background: rgba(255,255,255,0.1); color: #cbd5e1; border: 1px solid rgba(255,255,255,0.2); padding: 9px 20px; border-radius: 10px; font-weight: 700; cursor: pointer;">取消</button>
                    <button id="modal-confirm-btn" style="background: linear-gradient(135deg, #0284c7, #00c2e0); color: #ffffff; border: none; padding: 9px 24px; border-radius: 10px; font-weight: 800; cursor: pointer; box-shadow: 0 4px 15px rgba(0,194,224,0.4);">确认执行</button>
                </div>
            `;

            overlay.appendChild(box);
            document.body.appendChild(overlay);

            document.getElementById('modal-cancel-btn').onclick = () => overlay.remove();
            document.getElementById('modal-confirm-btn').onclick = () => {
                overlay.remove();
                if (typeof onConfirm === 'function') onConfirm();
            };
        }
    };

    /**
     * 3. 粒子动态背景增强器 (解封点击事件防护)
     */
    function initParticlesEngine(canvasId = 'particles-canvas') {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        
        // 核心解封：强制粒子画布绝不影响鼠标点击
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '-9999';
        
        const ctx = canvas.getContext('2d');

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const numParticles = Math.min(Math.floor(width / 25), 60);
        const particles = [];

        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 2 + 1,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                alpha: Math.random() * 0.5 + 0.2
            });
        }

        function render() {
            ctx.clearRect(0, 0, width, height);

            const isLight = document.body.classList.contains('light-mode') || document.body.classList.contains('day-mode');
            const particleColor = isLight ? 'rgba(2, 132, 199, ' : 'rgba(0, 194, 224, ';

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = particleColor + p.alpha + ')';
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 130) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        const lineAlpha = (1 - dist / 130) * 0.25;
                        ctx.strokeStyle = particleColor + lineAlpha + ')';
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(render);
        }

        render();
    }

    // 挂载到 App 全局命名空间
    App.Store = Store;
    App.UI = UI;
    App.initParticlesEngine = initParticlesEngine;
    App.globalStore = new Store({
        exploredNodes: JSON.parse(localStorage.getItem('ag_explored_nodes') || '[]'),
        examScore: localStorage.getItem('ag_exam_score') || null,
        theme: localStorage.getItem('ag_theme') || 'night'
    }, 'ag_global_store');

    window.App = App;

    document.addEventListener('DOMContentLoaded', () => {
        initParticlesEngine();
    });

    // 全局专家视角与 Ctrl+K 罗盘控制器
    window.openExpertPanel = function() {
        let modal = document.getElementById('expert-eval-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'expert-eval-modal';
            document.body.appendChild(modal);
        }

        modal.style.cssText = `
            display: flex !important;
            position: fixed !important;
            top: 0; left: 0; width: 100vw; height: 100vh;
            z-index: 2147483640;
            background: rgba(5, 6, 8, 0.88);
            backdrop-filter: blur(16px);
            justify-content: center; align-items: center;
        `;

        modal.innerHTML = `
            <div style="background:rgba(15,23,42,0.95); border:1.5px solid #fbbf24; border-radius:24px; padding:32px; width:820px; max-width:92vw; max-height:85vh; overflow-y:auto; color:#fff; box-shadow:0 0 40px rgba(245,158,11,0.3);">
                <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1.5px solid rgba(245,158,11,0.3); padding-bottom:16px; margin-bottom:20px;">
                    <h2 style="margin:0; font-size:20px; color:#fbbf24; display:flex; align-items:center; gap:10px;">
                        <i class="fas fa-user-graduate"></i> 国家级双创金课专家评审与工程教育 OBE 雷达
                    </h2>
                    <button onclick="document.getElementById('expert-eval-modal').style.display='none'" style="background:none; border:none; color:#94a3b8; font-size:20px; cursor:pointer;"><i class="fas fa-times"></i></button>
                </div>

                <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:20px;">
                    <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(0,194,224,0.3); border-radius:14px; padding:16px;">
                        <div style="color:var(--cyan); font-weight:800; font-size:14px; margin-bottom:8px;"><i class="fas fa-award"></i> 金课申报四大亮点对齐：</div>
                        <ul style="margin:0; padding-left:18px; font-size:12.5px; color:#cbd5e1; line-height:1.7;">
                            <li>高阶性：引入 Sarasvathy 效果推理与 JTBD 模型</li>
                            <li>创新性：生成式 AI 辅助 24h MVP 极速构建</li>
                            <li>挑战度：BEP 盈亏平衡保本销量实操算盘</li>
                            <li>辐射度：本地云南非遗/高原农产品实体赋能</li>
                        </ul>
                    </div>

                    <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(245,158,11,0.3); border-radius:14px; padding:16px;">
                        <div style="color:#fbbf24; font-weight:800; font-size:14px; margin-bottom:8px;"><i class="fas fa-radar"></i> OBE 毕业要求指标点达成度：</div>
                        <div style="font-size:12.5px; color:#cbd5e1; line-height:1.8;">
                            <div>LO1 痛点识别与发散：<strong style="color:#10b981;">94.5%</strong></div>
                            <div>LO2 商业模式 BMC 设计：<strong style="color:#10b981;">91.2%</strong></div>
                            <div>LO3 MVP 原型与软件测试：<strong style="color:#10b981;">89.8%</strong></div>
                            <div>LO4 铁三角团队协作与 Pitch：<strong style="color:#10b981;">95.0%</strong></div>
                        </div>
                    </div>
                </div>

                <div style="text-align:right;">
                    <button onclick="document.getElementById('expert-eval-modal').style.display='none'" style="background:linear-gradient(135deg,#f59e0b,#d97706); color:#050608; border:none; padding:10px 24px; border-radius:20px; font-weight:800; cursor:pointer;">关闭面板</button>
                </div>
            </div>
        `;
    };

    window.openCommandPalette = function() {
        let modal = document.getElementById('cmd-palette-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'cmd-palette-modal';
            document.body.appendChild(modal);
        }

        modal.style.cssText = `
            display: flex !important;
            position: fixed !important;
            top: 0; left: 0; width: 100vw; height: 100vh;
            z-index: 2147483645;
            background: rgba(5, 6, 8, 0.85);
            backdrop-filter: blur(16px);
            justify-content: center; align-items: flex-start;
            padding-top: 12vh;
        `;

        modal.innerHTML = `
            <div style="background:rgba(15,23,42,0.96); border:1.5px solid var(--cyan); border-radius:20px; width:680px; max-width:92vw; padding:20px; box-shadow:0 0 35px rgba(0,194,224,0.3); color:#fff;">
                <div style="display:flex; align-items:center; gap:12px; border-bottom:1px solid rgba(0,194,224,0.25); padding-bottom:12px; margin-bottom:16px;">
                    <i class="fas fa-terminal" style="color:var(--cyan); font-size:18px;"></i>
                    <input type="text" id="cmd-input-field" placeholder="⚡ 专家命令罗盘：输入关键字搜索 27 个节点、108 题 Q&A 或放映..." style="flex:1; background:none; border:none; color:#fff; font-size:16px; outline:none;" oninput="filterCmdList(this.value)" />
                    <span style="background:rgba(255,255,255,0.1); padding:2px 8px; border-radius:6px; font-size:12px; color:#cbd5e1;">Esc 关闭</span>
                </div>

                <div id="cmd-results-box" style="max-height:50vh; overflow-y:auto; display:flex; flex-direction:column; gap:8px;">
                    <div class="cmd-item" onclick="openPresentation('11')" style="padding:10px 14px; background:rgba(255,255,255,0.04); border-radius:10px; cursor:pointer;">💻 放映：第一次课 认识创新创业与 Sarasvathy 效果推理</div>
                    <div class="cmd-item" onclick="openPresentation('21')" style="padding:10px 14px; background:rgba(255,255,255,0.04); border-radius:10px; cursor:pointer;">💻 放映：第二次课 商机捕捉与 JTBD 真实痛点过滤</div>
                    <div class="cmd-item" onclick="openPresentation('31')" style="padding:10px 14px; background:rgba(255,255,255,0.04); border-radius:10px; cursor:pointer;">💻 放映：第四次课 精益商业模式画布 (BMC) 设计</div>
                    <div class="cmd-item" onclick="openPresentation('33')" style="padding:10px 14px; background:rgba(255,255,255,0.04); border-radius:10px; cursor:pointer;">💻 放映：第五次课 24 小时零代码 MVP 原型构建</div>
                    <div class="cmd-item" onclick="openPresentation('52')" style="padding:10px 14px; background:rgba(255,255,255,0.04); border-radius:10px; cursor:pointer;">💻 放映：创业计划书与路演展示 (BP)</div>
                </div>
            </div>
        `;

        setTimeout(() => document.getElementById('cmd-input-field')?.focus(), 100);
    };

    window.filterCmdList = function(kw) {
        const box = document.getElementById('cmd-results-box');
        if (!box) return;

        const nodes = [
            { id: '11', name: '认识创新创业与发散思维' },
            { id: '21', name: '商机捕捉与真实痛点过滤' },
            { id: '23', name: '宏观环境研判与保本财务划线' },
            { id: '31', name: '精益商业模式画布 (BMC) 设计' },
            { id: '33', name: '最小可行化产品 (MVP) 极速构建' },
            { id: '41', name: '团队跨界融合与管理' },
            { id: '51', name: '大学生创新创业大赛' },
            { id: '52', name: '创业计划书与路演展示' }
        ];

        const filtered = nodes.filter(n => n.name.includes(kw) || n.id.includes(kw));
        box.innerHTML = filtered.map(f => `
            <div class="cmd-item" onclick="openPresentation('${f.id}')" style="padding:10px 14px; background:rgba(255,255,255,0.04); border-radius:10px; cursor:pointer;">💻 放映：${f.name}</div>
        `).join('');
    };

    // 绑定 Ctrl+K 全局快捷键
    window.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            openCommandPalette();
        } else if (e.key === 'Escape') {
            const m1 = document.getElementById('expert-eval-modal');
            if (m1) m1.style.display = 'none';
            const m2 = document.getElementById('cmd-palette-modal');
            if (m2) m2.style.display = 'none';
        }
    });

})(window);

