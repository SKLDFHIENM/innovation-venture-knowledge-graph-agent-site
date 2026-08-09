/* =========================================================================
 * 全局 UX 增强行为 — 搜索/筛选/面包屑/返回顶部/字数计数/自动保存/波纹 等
 * 覆盖审计意见：#20 #22 #27 #30 #46 #47 #48 #49 #50 #51 #52 #53 #54 #74 #82 #87 #89 #93 #100
 * ========================================================================= */
(function () {
    'use strict';

    function debounce(fn, wait) {
        let t; return function () { const a = arguments, c = this; clearTimeout(t); t = setTimeout(() => fn.apply(c, a), wait); };
    }
    function qs(s, r) { return (r || document).querySelector(s); }
    function qsa(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

    /* ---------- 波纹动效（#82） ---------- */
    function initRipple() {
        const sel = '.action-btn, .filter-btn, .resource-download-btn, .primary-gradient, .ripple-btn';
        document.addEventListener('click', function (e) {
            const btn = e.target.closest(sel);
            if (!btn || btn.disabled) return;
            const r = btn.getBoundingClientRect();
            const size = Math.max(r.width, r.height);
            const span = document.createElement('span');
            span.className = 'ripple';
            span.style.width = span.style.height = size + 'px';
            span.style.left = (e.clientX - r.left - size / 2) + 'px';
            span.style.top = (e.clientY - r.top - size / 2) + 'px';
            const host = btn.classList.contains('ripple-btn') ? btn : btn;
            if (getComputedStyle(host).overflow !== 'hidden') host.style.overflow = 'hidden';
            host.appendChild(span);
            setTimeout(() => span.remove(), 600);
        }, true);
    }

    /* ---------- 返回顶部（#74） ---------- */
    function initBackToTop() {
        const btn = document.createElement('button');
        btn.className = 'back-to-top'; btn.setAttribute('aria-label', '返回顶部');
        btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
        document.body.appendChild(btn);
        window.addEventListener('scroll', debounce(() => {
            btn.classList.toggle('show', window.scrollY > 400);
        }, 120), { passive: true });
    }

    /* ---------- 字数计数器（#30 #93） ---------- */
    function initWordCounters() {
        qsa('textarea').forEach(tx => {
            if (tx.closest('.counter-host')) return;
            if (tx.classList.contains('bmc-textarea')) return; // 画布单元格不强制字数上限，避免误报
            const host = document.createElement('div');
            host.className = 'counter-host';
            tx.parentNode.insertBefore(host, tx.nextSibling);
            const c = document.createElement('div');
            c.className = 'word-counter';
            const max = parseInt(tx.getAttribute('maxlength'), 10) || 500;
            c.textContent = '0 / ' + max + ' 字';
            host.appendChild(c);
            tx.addEventListener('input', () => {
                const len = tx.value.length;
                c.textContent = len + ' / ' + max + ' 字';
                c.classList.toggle('over', len > max);
            });
        });
    }

    /* ---------- 资源搜索 + 分类筛选（增强版：防抖/高亮/清空/历史/多选/动态计数/空态） ---------- */
    const HOT_TERMS = ['贴息贷款', '合伙人协议', '商业模式画布', '答辩', '股权', '路演', 'BP'];
    let selectedCats = new Set();
    let currentQuery = '';

    function originalText(el) {
        if (!el.dataset.orig) el.dataset.orig = el.textContent;
        return el.dataset.orig;
    }
    function highlightIn(el, q) {
        const txt = originalText(el);
        if (!q) { el.textContent = txt; return; }
        const idx = txt.toLowerCase().indexOf(q.toLowerCase());
        if (idx < 0) { el.textContent = txt; return; }
        el.innerHTML = txt.slice(0, idx) + '<mark class="search-hl">' + txt.slice(idx, idx + q.length) + '</mark>' + txt.slice(idx + q.length);
    }

    function applyFilter() {
        const cards = qsa('#main-resources-grid .resource-card');
        let visible = 0;
        const catCount = {};
        cards.forEach(card => {
            const cat = card.getAttribute('data-cat');
            const text = card.textContent.toLowerCase();
            const catOk = selectedCats.size === 0 || selectedCats.has(cat);
            const qOk = !currentQuery || (card.dataset.hay || (card.dataset.hay = text)).includes(currentQuery.toLowerCase());
            // 动态计数：仅按当前搜索词统计各分类命中数
            if (!currentQuery || text.includes(currentQuery.toLowerCase())) catCount[cat] = (catCount[cat] || 0) + 1;
            const show = catOk && qOk;
            card.style.display = show ? 'flex' : 'none';
            if (show) {
                visible++;
                highlightIn(qs('.resource-info h3', card), currentQuery);
                highlightIn(qs('.resource-info p', card), currentQuery);
            }
        });
        // 更新胶囊计数 + 零结果置灰（#51 #52 #89）
        qsa('#res-filter-capsules .filter-btn').forEach(btn => {
            const cat = btn.getAttribute('data-cat');
            if (cat === 'all') return;
            const n = catCount[cat] || 0;
            const label = btn.getAttribute('data-label');
            btn.innerHTML = '<i class="' + (btn.getAttribute('data-icon') || 'fas fa-tag') + '"></i> ' + label + ' (' + n + ')';
            btn.classList.toggle('disabled', !!currentQuery && n === 0);
        });
        // 空状态（#48）
        let empty = qs('#main-resources-grid .res-empty-state');
        if (visible === 0) {
            if (!empty) {
                empty = document.createElement('div');
                empty.className = 'res-empty-state';
                empty.innerHTML = '<i class="fas fa-search"></i><div>未找到相关资源，请换个关键词或咨询 <a href="chat.html" style="color:var(--primary-blue);font-weight:700;">AI 导师</a></div>';
                qs('#main-resources-grid').appendChild(empty);
            }
        } else if (empty) empty.remove();
    }

    function setupSearchBox() {
        const input = qs('#res-search-input');
        if (!input) return;
        // 清空按钮（#50）
        const clear = document.createElement('button');
        clear.className = 'res-search-clear'; clear.setAttribute('aria-label', '清空搜索');
        clear.innerHTML = '<i class="fas fa-times-circle"></i>';
        input.parentNode.appendChild(clear);
        clear.onclick = () => { input.value = ''; currentQuery = ''; clear.classList.remove('show'); applyFilter(); input.focus(); };
        input.addEventListener('input', debounce(function () {
            currentQuery = input.value.trim();
            clear.classList.toggle('show', !!input.value);
            applyFilter();
        }, 280)); // #46 防抖

        // 历史 / 热门标签（#47）
        const row = qs('#res-filter-capsules');
        if (row) {
            const tagsWrap = document.createElement('div');
            tagsWrap.className = 'res-search-tags';
            tagsWrap.style.width = '完整';
            const history = [];
            try { JSON.parse(localStorage.getItem('ivkga_search_history') || '[]').forEach(t => history.push(t)); } catch (e) {}
            const terms = history.length ? history : HOT_TERMS;
            const title = document.createElement('span');
            title.style.cssText = 'font-size:11.5px;color:var(--text-muted);align-self:center;margin-right:4px;';
            title.innerHTML = history.length ? '<i class="fas fa-history"></i> 搜索历史：' : '<i class="fas fa-fire"></i> 热门搜索：';
            tagsWrap.appendChild(title);
            terms.slice(0, 8).forEach(t => {
                const tag = document.createElement('span');
                tag.className = 'tag'; tag.textContent = t;
                tag.onclick = () => { input.value = t; currentQuery = t; clear.classList.add('show'); applyFilter(); };
                tagsWrap.appendChild(tag);
            });
            row.parentNode.insertBefore(tagsWrap, row.nextSibling);
        }
    }

    // 覆盖内联的全局筛选/搜索函数（支持多选 + 动态计数 + 高亮 + 空态）
    window.filterResourceCards = function (cat, btnEl) {
        if (cat === 'all') {
            selectedCats.clear();
        } else {
            if (selectedCats.has(cat)) selectedCats.delete(cat); else selectedCats.add(cat);
            if (selectedCats.size === 0) { /* 视为全选 */ }
        }
        qsa('#res-filter-capsules .filter-btn').forEach(b => {
            const c = b.getAttribute('data-cat');
            b.classList.toggle('active', c === 'all' ? selectedCats.size === 0 : selectedCats.has(c));
        });
        applyFilter();
    };
    window.searchResourceCards = function (q) {
        currentQuery = (q || '').trim();
        applyFilter();
        const input = qs('#res-search-input');
        if (input) {
            const clear = qs('.res-search-clear'); if (clear) clear.classList.toggle('show', !!input.value);
        }
        if (currentQuery) {
            let hist = [];
            try { hist = JSON.parse(localStorage.getItem('ivkga_search_history') || '[]'); } catch (e) {}
            hist = hist.filter(t => t !== currentQuery); hist.unshift(currentQuery); hist = hist.slice(0, 6);
            try { localStorage.setItem('ivkga_search_history', JSON.stringify(hist)); } catch (e) {}
        }
    };

    /* ---------- 卡片整卡可点 + 防抖（#20 #22） ---------- */
    function initCardClickable() {
        qsa('#main-resources-grid .resource-card').forEach(card => {
            card.classList.add('clickable', 'no-select');
            let lock = false;
            card.addEventListener('click', function (e) {
                if (e.target.closest('a, button')) return; // 按钮自身处理
                if (lock) return; lock = true; setTimeout(() => lock = false, 1200);
                const btn = qs('.resource-download-btn', card);
                if (btn) btn.click();
            });
        });
    }

    /* ---------- 自动保存指示 + Ctrl/Cmd+S（#27 #87） ---------- */
    function saveBMCLocal() {
        const data = {};
        qsa('.bmc-textarea').forEach(el => data[el.id] = el.value);
        try { localStorage.setItem('qnu_bmc_canvas_data', JSON.stringify(data)); } catch (e) {}
    }
    function saveBPLocal() {
        const data = {};
        ['bp-title', 'bp-subtitle', 'bp-m1', 'bp-m2', 'bp-m3', 'bp-m4', 'bp-m5', 'bp-m7', 'bp-m9'].forEach(id => {
            const el = document.getElementById(id); if (el) data[id] = el.value;
        });
        try { localStorage.setItem('qnu_bp_data', JSON.stringify(data)); } catch (e) {}
    }
    window.saveBMCLocal = saveBMCLocal; window.saveBPLocal = saveBPLocal;

    function initAutosave() {
        // BMC 自动暂存 + 指示
        qsa('.bmc-textarea').forEach(tx => tx.addEventListener('input', debounce(() => {
            saveBMCLocal(); updateSaveIndicator('bmc');
        }, 800)));
        // BP 自动暂存 + 指示
        ['bp-title', 'bp-subtitle', 'bp-m1', 'bp-m2', 'bp-m3', 'bp-m4', 'bp-m5', 'bp-m7', 'bp-m9'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.addEventListener('input', debounce(() => { saveBPLocal(); updateSaveIndicator('bp'); }, 800));
        });
        // 恢复 BP 草稿
        try {
            const bp = JSON.parse(localStorage.getItem('qnu_bp_data') || '{}');
            Object.keys(bp).forEach(id => { const el = document.getElementById(id); if (el && !el.value) el.value = bp[id]; });
        } catch (e) {}
        // Ctrl/Cmd+S 手动保存
        document.addEventListener('keydown', function (e) {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
                e.preventDefault();
                saveBMCLocal(); saveBPLocal(); updateSaveIndicator('all');
                if (window.showToast) window.showToast('已手动保存草稿 (Ctrl+S)', 'success');
            }
        });
    }
    function updateSaveIndicator(scope) {
        const now = new Date();
        const hh = String(now.getHours()).padStart(2, '0'), mm = String(now.getMinutes()).padStart(2, '0');
        const txt = '已于 ' + hh + ':' + mm + ' 自动保存';
        ['bmc', 'bp'].forEach(s => {
            if (scope !== 'all' && scope !== s) return;
            const el = document.getElementById('autosave-' + s);
            if (el) { el.textContent = txt; el.style.opacity = '1'; }
        });
    }

    /* ---------- 下载按钮 aria-label（#18） ---------- */
    function initAria() {
        qsa('#main-resources-grid .resource-download-btn').forEach(btn => {
            const card = btn.closest('.resource-card');
            const title = card ? qs('.resource-info h3', card) : null;
            const fmt = qs('.resource-info .meta-chip', card);
            btn.setAttribute('aria-label', '下载：' + (title ? title.textContent : '资源') + (fmt ? '，' + fmt.textContent : ''));
        });
    }

    /* ---------- 数字框越界红框（#84 #38） ---------- */
    function initNumberGuard() {
        qsa('.eq-input').forEach(inp => {
            inp.addEventListener('blur', () => {
                const min = inp.hasAttribute('min') ? parseFloat(inp.getAttribute('min')) : null;
                const max = inp.hasAttribute('max') ? parseFloat(inp.getAttribute('max')) : null;
                const v = parseFloat(inp.value);
                if (isNaN(v) || (min != null && v < min) || (max != null && v > max)) inp.classList.add('input-error');
                else inp.classList.remove('input-error');
            });
        });
    }

    /* ---------- 启动 ---------- */
    document.addEventListener('DOMContentLoaded', function () {
        initRipple();
        initBackToTop();
        initWordCounters();
        setupSearchBox();
        initCardClickable();
        initAutosave();
        initAria();
        initNumberGuard();
        // 为分类胶囊补充 data-cat / data-label / data-icon，供动态计数使用
        qsa('#res-filter-capsules .filter-btn').forEach(btn => {
            const m = btn.textContent.match(/^(.*?)\s*\(/);
            const label = (m ? m[1] : btn.textContent).trim();
            const icon = btn.querySelector('i');
            btn.setAttribute('data-cat', btn.getAttribute('onclick').match(/'([^']+)'/)[1]);
            btn.setAttribute('data-label', label);
            btn.setAttribute('data-icon', icon ? icon.className : 'fas fa-tag');
        });
    });
})();


/* --- Equity Normalization & Calculation Protection --- */
window.normalizeEquityShares = function(shares) {
    const total = shares.reduce((a, b) => a + (parseFloat(b) || 0), 0);
    if (total === 0) return shares.map(() => '0.00%');
    return shares.map(s => ((parseFloat(s) / total) * 100).toFixed(2) + '%');
};

window.copyToClipboardWithToast = function(text, successMessage = '文本已成功复制到剪贴板！') {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            if (window.showToast) window.showToast(successMessage);
            else alert(successMessage);
        });
    } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        if (window.showToast) window.showToast(successMessage);
        else alert(successMessage);
    }
};
