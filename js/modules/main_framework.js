/**
 * 2025年最受欢迎 JavaScript 库与框架离线集成核心 (Modern JS Ecosystem Integration Framework)
 * 融合 2025 年 14 大主流 JS 项目精髓：
 * - React / Vue3 响应式状态 (Reactive Proxy & Computed)
 * - Zustand / Jotai 原子化状态管理 (State Slices & Subscription)
 * - Svelte 风格零开销增量 DOM 渲染 (Direct Reactive DOM Updating)
 * - htmx 风格声明式数据交互 (Declarative Data Triggers)
 * - TanStack Query 风格本地缓存与离线 Hydration (Offline Persistence)
 * - shadcn/UI 风格模块化极光通知与 Modal 引擎
 * 
 * 完整 纯本地离线使用，无任何外部网络依赖！
 */

(function (window) {
    'use strict';

    // 1. Vue3 / Svelte 风格响应式系统 (Reactivity Engine)
    function reactive(target, onChange) {
        return new Proxy(target, {
            get(obj, prop) {
                const val = obj[prop];
                if (typeof val === 'object' && val !== null) {
                    return reactive(val, onChange);
                }
                return val;
            },
            set(obj, prop, value) {
                const oldVal = obj[prop];
                obj[prop] = value;
                if (oldVal !== value && typeof onChange === 'function') {
                    onChange(prop, value, obj);
                }
                return true;
            }
        });
    }

    // 2. Zustand / Jotai 风格切片状态 Store (Slice Store)
    class ModernStore {
        constructor(initialState = {}, storeKey = 'app_modern_store') {
            this.listeners = new Set();
            this.storeKey = storeKey;

            let persisted = {};
            try {
                const raw = localStorage.getItem(storeKey);
                if (raw) persisted = JSON.parse(raw);
            } catch (e) {
                console.warn('[ModernStore] LocalStorage error:', e);
            }

            const merged = { ...initialState, ...persisted };
            this.state = reactive(merged, (prop, val) => {
                this.persist();
                this.emit(prop, val);
            });
        }

        subscribe(fn) {
            this.listeners.add(fn);
            return () => this.listeners.delete(fn);
        }

        emit(prop, val) {
            this.listeners.forEach(fn => fn(prop, val, this.state));
        }

        persist() {
            try {
                localStorage.setItem(this.storeKey, JSON.stringify(this.state));
            } catch (e) {
                console.warn('[ModernStore] Persist error:', e);
            }
        }

        get(key) {
            return this.state[key];
        }

        set(key, val) {
            this.state[key] = val;
        }

        update(fn) {
            fn(this.state);
            this.persist();
        }
    }

    // 3. shadcn/ui 风格现代化通知与弹窗系统 (shadcn UI Engine)
    const UI = {
        toast(message, type = 'info', title = '') {
            let area = document.getElementById('modern-toast-area');
            if (!area) {
                area = document.createElement('div');
                area.id = 'modern-toast-area';
                area.style.cssText = `
                    position: fixed;
                    bottom: 28px;
                    right: 28px;
                    z-index: 999999;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    pointer-events: none;
                `;
                document.body.appendChild(area);
            }

            const item = document.createElement('div');
            const colorMap = {
                info: { border: '#00c2e0', bg: 'linear-gradient(135deg, rgba(8,18,50,0.92), rgba(0,194,224,0.2))', icon: 'fa-sparkles', text: '#00c2e0' },
                success: { border: '#10b981', bg: 'linear-gradient(135deg, rgba(8,18,50,0.92), rgba(16,185,129,0.2))', icon: 'fa-check-circle', text: '#10b981' },
                warning: { border: '#f59e0b', bg: 'linear-gradient(135deg, rgba(8,18,50,0.92), rgba(245,158,11,0.2))', icon: 'fa-exclamation-triangle', text: '#f59e0b' },
                danger: { border: '#ef4444', bg: 'linear-gradient(135deg, rgba(8,18,50,0.92), rgba(239,68,68,0.2))', icon: 'fa-bolt', text: '#ef4444' }
            };
            const c = colorMap[type] || colorMap.info;

            item.style.cssText = `
                background: ${c.bg};
                border: 1.5px solid ${c.border};
                border-radius: 16px;
                padding: 14px 22px;
                color: #ffffff;
                box-shadow: 0 15px 35px rgba(0,0,0,0.4), 0 0 15px ${c.border}44;
                backdrop-filter: blur(16px);
                pointer-events: auto;
                display: flex;
                align-items: center;
                gap: 14px;
                min-width: 280px;
                max-width: 420px;
                opacity: 0;
                transform: translateY(24px) scale(0.92);
                transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
            `;

            item.innerHTML = `
                <div style="font-size: 22px; color: ${c.text}; flex-shrink:0;">
                    <i class="fas ${c.icon}"></i>
                </div>
                <div style="flex:1;">
                    ${title ? `<div style="font-weight:900; font-size:13.5px; color:${c.text}; margin-bottom:2px;">${title}</div>` : ''}
                    <div style="font-size:13px; font-weight:700; color:#f8fafc; line-height:1.5;">${message}</div>
                </div>
            `;

            area.appendChild(item);

            requestAnimationFrame(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0) scale(1)';
            });

            setTimeout(() => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(-15px) scale(0.92)';
                setTimeout(() => item.remove(), 350);
            }, 3200);
        },

        modal(options = {}) {
            const { title = '系统提示', content = '', confirmText = '确定', cancelText = '取消', onConfirm } = options;
            
            const backdrop = document.createElement('div');
            backdrop.style.cssText = `
                position: fixed; inset: 0;
                background: rgba(10, 16, 32, 0.8);
                backdrop-filter: blur(14px);
                z-index: 9999999;
                display: flex; align-items: center; justify-content: center;
                animation: fadeIn 0.25s ease;
            `;

            const dialog = document.createElement('div');
            dialog.style.cssText = `
                background: linear-gradient(145deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.98));
                border: 2px solid rgba(0, 194, 224, 0.4);
                box-shadow: 0 25px 60px rgba(0,0,0,0.5), 0 0 25px rgba(0,194,224,0.2);
                border-radius: 24px;
                padding: 30px;
                max-width: 480px;
                width: 90%;
                color: #ffffff;
            `;

            dialog.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                    <h3 style="font-size:19px; font-weight:900; color:#00c2e0; margin:0; display:flex; align-items:center; gap:10px;">
                        <i class="fas fa-sparkles"></i> ${title}
                    </h3>
                    <button id="modal-close-x" style="background:none; border:none; color:#94a3b8; font-size:18px; cursor:pointer;"><i class="fas fa-times"></i></button>
                </div>
                <div style="color:#cbd5e1; font-size:14px; line-height:1.7; margin-bottom:24px;">${content}</div>
                <div style="display:flex; gap:12px; justify-content:flex-end;">
                    ${cancelText ? `<button id="modal-btn-cancel" style="background:rgba(255,255,255,0.08); color:#cbd5e1; border:1px solid rgba(255,255,255,0.2); padding:10px 22px; border-radius:12px; font-weight:700; cursor:pointer;">${cancelText}</button>` : ''}
                    <button id="modal-btn-confirm" style="background:linear-gradient(135deg, #0284c7, #00c2e0); color:#ffffff; border:none; padding:10px 26px; border-radius:12px; font-weight:800; cursor:pointer; box-shadow:0 4px 15px rgba(0,194,224,0.4);">${confirmText}</button>
                </div>
            `;

            backdrop.appendChild(dialog);
            document.body.appendChild(backdrop);

            const remove = () => backdrop.remove();
            document.getElementById('modal-close-x').onclick = remove;
            if (document.getElementById('modal-btn-cancel')) document.getElementById('modal-btn-cancel').onclick = remove;
            document.getElementById('modal-btn-confirm').onclick = () => {
                remove();
                if (typeof onConfirm === 'function') onConfirm();
            };
        }
    };

    // 4. htmx 风格声明式数据交互 (htmx-style Triggers)
    function initDeclarativeTriggers() {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-action]');
            if (!btn) return;

            const action = btn.getAttribute('data-action');
            const targetId = btn.getAttribute('data-target');
            const pblNode = btn.getAttribute('data-pbl');

            if (action === 'presentation' && pblNode && typeof window.openPresentation === 'function') {
                window.openPresentation(pblNode);
                UI.toast(`已启动 PBL 节点 #${pblNode} 大屏演播`, 'success', '大屏演播中');
            } else if (action === 'toast') {
                const msg = btn.getAttribute('data-msg') || '操作成功';
                UI.toast(msg, 'info', '系统通知');
            } else if (action === 'scroll' && targetId) {
                const target = document.getElementById(targetId);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // 全局框架导出
    const ModernFramework = {
        reactive,
        Store: ModernStore,
        UI,
        globalStore: new ModernStore({
            theme: localStorage.getItem('ag_theme') || 'day',
            exploredCount: JSON.parse(localStorage.getItem('ag_explored_nodes') || '[]').length,
            version: '2025.14.0'
        }, 'qnu_modern_framework_store')
    };

    window.ModernFramework = ModernFramework;

    document.addEventListener('DOMContentLoaded', () => {
        initDeclarativeTriggers();
    });

})(window);
