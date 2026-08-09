/**
 * 创新创业课程知识图谱智能体 (IEKG) - 工具与安全辅助模块
 * 防范 XSS 攻击，提供防抖、DOM转义与平滑动画辅助
 */
(function() {
    window.IEKG = window.IEKG || {};
    window.IEKG.utils = window.IEKG.utils || {};

    /**
     * 防范 XSS 攻击的 HTML 字符转义函数
     * @param {string|any} str 待转义的输入
     * @returns {string} 转义后的文本
     */
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

    /**
     * 防抖函数
     * @param {Function} func 回调函数
     * @param {number} wait 延迟毫秒数
     */
    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }

    /**
     * 数字渐变自增动效
     */
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

    /**
     * 页面平滑滚动到指定元素
     */
    function scrollToElement(elementId) {
        const el = document.getElementById(elementId);
        if (el) { el.scrollIntoView({ behavior: 'smooth' }); }
    }

    // 挂载方法至命名空间
    window.IEKG.utils.escapeHTML = escapeHTML;
    window.IEKG.utils.debounce = debounce;
    window.IEKG.utils.animateNumber = animateNumber;
    window.IEKG.utils.scrollToElement = scrollToElement;

    // 保留全局别名兼容
    window.escapeHTML = escapeHTML;
})();
