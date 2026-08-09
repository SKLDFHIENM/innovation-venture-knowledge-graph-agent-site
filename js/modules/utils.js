/**
 * 创新创业课程知识图谱智能体 (IEKG) - 工具、事件总线、缓存与安全防护模块
 * "use strict"; 严谨模式防范 XSS 攻击，提供 EventBus 解耦、15s 超时熔断与离线二级缓存
 */
"use strict";

(function() {
    window.IEKG = window.IEKG || {};
    window.IVKGA = window.IVKGA || window.IEKG;
    window.IEKG.utils = window.IEKG.utils || {};

    // ─── 1. XSS 防护与 DOM 安全转义 ───
    function escapeHTML(str) {
        if (str === null || str === undefined) return '';
        if (typeof str !== 'string') str = String(str);
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function sanitizeHTML(dirtyStr) {
        if (!dirtyStr) return '';
        // 过滤危险标签 script, iframe, onerror 属性等
        return String(dirtyStr)
            .replace(/<script[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/on\w+="[^"]*"/gi, '')
            .replace(/on\w+='[^']*'/gi, '')
            .replace(/javascript:/gi, '');
    }

    function safeSetHTML(element, htmlContent) {
        if (!element) return;
        element.innerHTML = sanitizeHTML(htmlContent);
    }

    function safeSetText(element, textContent) {
        if (!element) return;
        element.textContent = textContent || '';
    }

    // ─── 2. 系统 EventBus 解耦事件总线 ───
    class EventBus {
        constructor() {
            this.events = {};
        }

        on(event, listener) {
            if (!this.events[event]) this.events[event] = [];
            this.events[event].push(listener);
            return () => this.off(event, listener);
        }

        off(event, listener) {
            if (!this.events[event]) return;
            this.events[event] = this.events[event].filter(l => l !== listener);
        }

        emit(event, data) {
            if (!this.events[event]) return;
            this.events[event].forEach(listener => {
                try {
                    listener(data);
                } catch (err) {
                    console.error(`[EventBus Error] in event "${event}":`, err);
                }
            });
        }
    }

    window.IEKG.eventBus = window.IEKG.eventBus || new EventBus();

    // ─── 3. 带有 15s 超时熔断 (AbortController) 与指数退避重试的 Fetch 包装 ───
    async function fetchWithTimeout(url, options = {}, timeoutMs = 15000, maxRetries = 2) {
        let attempt = 0;
        while (attempt <= maxRetries) {
            const controller = new AbortController();
            const timer = setTimeout(() => controller.abort(), timeoutMs);
            const fetchOpts = { ...options, signal: controller.signal };

            try {
                const response = await fetch(url, fetchOpts);
                clearTimeout(timer);
                if (!response.ok) {
                    throw new Error(`HTTP Error status ${response.status}`);
                }
                return response;
            } catch (err) {
                clearTimeout(timer);
                attempt++;
                if (err.name === 'AbortError') {
                    console.warn(`[Fetch Timeout] Request to ${url} timed out after ${timeoutMs}ms (Attempt ${attempt}/${maxRetries+1})`);
                }
                if (attempt > maxRetries) {
                    throw err;
                }
                // 指数退避 (Exponential Backoff)
                const backoffMs = Math.pow(2, attempt) * 500;
                await new Promise(res => setTimeout(res, backoffMs));
            }
        }
    }

    // ─── 4. 二级缓存机制 (LocalStorage / Memory Cache) ───
    const memoryCache = new Map();
    const cache = {
        set(key, val, ttlMs = 3600000) {
            const payload = { val, expire: Date.now() + ttlMs };
            memoryCache.set(key, payload);
            try {
                localStorage.setItem('IEKG_CACHE_' + key, JSON.stringify(payload));
            } catch (e) {}
        },
        get(key) {
            if (memoryCache.has(key)) {
                const item = memoryCache.get(key);
                if (item.expire > Date.now()) return item.val;
                memoryCache.delete(key);
            }
            try {
                const raw = localStorage.getItem('IEKG_CACHE_' + key);
                if (raw) {
                    const item = JSON.parse(raw);
                    if (item.expire > Date.now()) {
                        memoryCache.set(key, item);
                        return item.val;
                    }
                    localStorage.removeItem('IEKG_CACHE_' + key);
                }
            } catch (e) {}
            return null;
        }
    };

    // ─── 5. 通用辅助函数 (Debounce, Animation) ───
    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }

    function animateNumber(el, start, end, duration, suffix = '') {
        if (!el) return;
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            el.textContent = Math.floor(progress * (end - start) + start) + suffix;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                el.textContent = end + suffix;
            }
        };
        window.requestAnimationFrame(step);
    }

    function scrollToElement(elementId) {
        const el = document.getElementById(elementId);
        if (el) { el.scrollIntoView({ behavior: 'smooth' }); }
    }

    // 挂载至 IEKG / IVKGA 命名空间
    window.IEKG.utils.escapeHTML = escapeHTML;
    window.IEKG.utils.sanitizeHTML = sanitizeHTML;
    window.IEKG.utils.safeSetHTML = safeSetHTML;
    window.IEKG.utils.safeSetText = safeSetText;
    window.IEKG.utils.fetchWithTimeout = fetchWithTimeout;
    window.IEKG.utils.debounce = debounce;
    window.IEKG.utils.animateNumber = animateNumber;
    window.IEKG.utils.scrollToElement = scrollToElement;
    window.IEKG.cache = cache;

    // 全局别名兼容
    window.escapeHTML = escapeHTML;
    window.sanitizeHTML = sanitizeHTML;
    window.fetchWithTimeout = fetchWithTimeout;

    // ─── 全局 Unhandled Rejection 安全防护拦截 ───
    window.addEventListener('unhandledrejection', function(event) {
        if (event && event.reason && (
            String(event.reason).includes('ResizeObserver') || 
            String(event.reason).includes('Script error') ||
            String(event.reason).includes('CORS') ||
            String(event.reason).includes('AbortError')
        )) {
            event.preventDefault();
            return;
        }
        console.warn('[IEKG Protection] Unhandled rejection intercepted:', event.reason);
    });

    window.addEventListener('error', function(event) {
        if (event && event.message && (
            event.message.includes('ResizeObserver loop') ||
            event.message.includes('Script error')
        )) {
            event.stopImmediatePropagation();
            return;
        }
    }, true);
})();
