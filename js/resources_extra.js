/* =========================================================================
 * 创新创业课程知识图谱智能体 — resources.html 进阶交互增强（续 100 项审计）
 * 覆盖：收藏星标 / 本地下载计数+排序 / 方向联动占位符 / 重置二次确认 /
 *      滚动到首个校验错误 / 步进器滑动切换 / Tooltip 大纲 / 批量打包下载 /
 *      阅读器 Markdown 渲染+缩放 / BMC Markdown 导出 / Service Worker 离线
 * ========================================================================= */
(function () {
    'use strict';

    /* ---------- localStorage 工具 ---------- */
    var LS = { fav: 'ivk_res_fav', dl: 'ivk_res_dlcnt', dir: 'ivk_bp_direction' };
    function lsGet(k, d) { try { var v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } }
    function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
    function $(s, r) { return (r || document).querySelector(s); }
    function $all(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

    /* ---------- 资源内容库（阅读/下载/批量打包共用） ---------- */
    window.RESOURCE_LIB = {
        'm1-1': {
            title: 'M1-1 产业痛点资讯搜寻指令集',
            file: '【创新创业OBE】M1-1_产业痛点资讯搜寻指令集.md',
            content: '# 产业痛点资讯搜寻指令集\n\n## 通用提示词框架 (Role - Task - Context - Constraint)\n\n### 1. 高原特色农业痛点监听 Prompt\n> "你是一名精通农业供应链的产业咨询专家。请针对地方高原特色蓝莓/野生菌/特产药材产业，分析过去 12 个月中农户在采摘、冷链运输、品质分级及跨境销售环节面临的前 3 个核心卡脖子痛点..."\n\n### 2. 非遗文化文创 IP 升级 Prompt\n> "你是一名资深的文化创新（文创）IP 品牌策划师。请针对地方特色手工艺，设计 3 组针对年轻消费群体的数字化转型方案..."\n\n### 3. 本地特色餐饮跨境出海 Prompt\n> "你是一名跨境电商与餐饮品牌出海顾问。请针对地方非遗火腿/特色风味食品，设计数字人主播方案..."\n'
        },
        'm2-2': {
            title: 'M2-2 合伙人协议与性格雷达测评模板',
            file: '【创新创业OBE】M2-2_合伙人协议与性格雷达测评模板.md',
            content: '# 创客团队合伙人股权分配与分期成熟 (Vesting) 补充协议\n\n## 一、合伙人持股比例确权\n- 合伙人 A (CEO / 商业带头人)：持股 60%\n- 合伙人 B (CTO / 技术研发)：持股 25%\n- 合伙人 C (COO / 运营推广)：持股 15%\n\n## 二、股权分期成熟 (Vesting) 规则\n1. **服务成熟期**：全体合伙人持有的股权分 **4 年** 线性成熟（每月成熟 1/48）。\n2. **1 年崖山期 (Cliff)**：必须连续服务满 **12 个月**，首批 25% 股权才开始解锁。\n3. **退场回购机制**：中途离职的未成熟股权由期权池无偿收回。\n'
        },
        'm4-3': {
            title: 'M4-3 STAR 法则路演答辩简历与防御话术手册',
            file: '【创新创业OBE】M4-3_STAR法则答辩简历润色大纲.md',
            content: '# STAR 法则路演答辩与评委压力测试防守指南\n\n## 一、STAR 结构化回答模型\n- **Situation (情境)**：交代项目背景与行业痛点真实数据\n- **Task (任务)**：明确团队需要攻克的核心难题\n- **Action (行动)**：突出团队的实操动作与技术路线\n- **Result (结果)**：用硬核量化数据说话\n\n## 二、评委高频风险瓶颈质问应对\n\n### 质疑："大厂一旦抄袭你们怎么办？"\n- **防御策略**：\n> "我们拥有垂直场景的独家标注数据集与独占渠道网络，通过数据飞轮积累了本地特有数据。大厂无法通过单纯的代码复制这种扎根泥巴路的数据与渠道护城河。"\n'
        },
        'm5-2': {
            title: 'M5-2 大学生创业贴息贷款与一次性补贴申报指南',
            file: '【创新创业OBE】M5-2_大学生创业贴息贷款申报指南.md',
            content: '# 大学生创业政策红利与贴息贷款申报指南\n\n## 一、政策红利一览\n1. **创业担保贴息贷款**：符合条件的项目最高可申请贴息贷款，财政承担大部分利息。\n2. **一次性创业补贴**：在校或毕业 5 年内首次创办企业，正常经营满 6 个月，可申请一次性创业补贴。\n3. **高校创业园免费工位**：入驻本校大学生创业园，免费提供独立办公工位及导师指导。\n\n## 二、申报材料与流程\n- 营业执照副本复印件\n- 法人及团队成员学生证 / 毕业证\n- 《商业计划书 (BP) 摘要》\n- 高校创业项目推荐表（由创业学院盖章）\n'
        }
    };

    /* =====================================================================
     * 1) 收藏星标（localStorage 持久化）
     * =================================================================== */
    function getFavs() { return lsGet(LS.fav, {}); }
    window.toggleResourceFavorite = function (type, el) {
        var f = getFavs();
        f[type] = !f[type];
        lsSet(LS.fav, f);
        if (el) el.classList.toggle('faved', !!f[type]);
        window.showToast(f[type] ? '已加入收藏 ★' : '已取消收藏', 'info');
        syncFavCapsule();
        var cap = $('.filter-btn.fav-capsule.active');
        if (cap) applyFilter('fav', cap);
    };
    function syncFavCapsule() {
        var cap = $('.filter-btn.fav-capsule');
        if (!cap) return;
        var n = Object.keys(getFavs()).length;
        var label = cap.querySelector('.fav-count');
        if (label) label.textContent = n;
    }

    /* =====================================================================
     * 2) 本地下载计数 + 分类筛选 + 排序（覆盖内联旧版 filterResourceCards）
     * =================================================================== */
    var currentCat = 'all', currentSort = 'default';
    function getCards() { return $all('#main-resources-grid .resource-card'); }
    function totalDL(type) {
        var card = $('.resource-card[data-type="' + type + '"]');
        var base = card ? parseInt(card.getAttribute('data-dl') || '0', 10) : 0;
        var inc = (lsGet(LS.dl, {}))[type] || 0;
        return base + inc;
    }
    function applyFilter(cat, btn) {
        currentCat = cat;
        $all('#res-filter-capsules .filter-btn').forEach(function (b) { b.classList.remove('active'); });
        if (btn) btn.classList.add('active');
        renderCards();
    }
    window.filterResourceCards = function (cat, btn) { applyFilter(cat, btn); };
    function renderCards() {
        var favs = getFavs();
        getCards().forEach(function (card) {
            var t = card.getAttribute('data-type'), c = card.getAttribute('data-cat');
            var show = currentCat === 'all' || (currentCat === 'fav' ? !!favs[t] : c === currentCat);
            card.style.display = show ? 'flex' : 'none';
        });
        sortCards();
    }
    function sortCards() {
        var grid = document.getElementById('main-resources-grid');
        if (!grid) return;
        var cards = getCards().filter(function (c) { return c.style.display !== 'none'; });
        if (currentSort === 'dl') {
            cards.sort(function (a, b) { return totalDL(b.getAttribute('data-type')) - totalDL(a.getAttribute('data-type')); });
        } else if (currentSort === 'update') {
            cards.sort(function (a, b) { return (b.getAttribute('data-update') || '').localeCompare(a.getAttribute('data-update') || ''); });
        } else if (currentSort === 'fav') {
            var favs = getFavs();
            cards.sort(function (a, b) { return (favs[b.getAttribute('data-type')] ? 1 : 0) - (favs[a.getAttribute('data-type')] ? 1 : 0); });
        }
        cards.forEach(function (c) { grid.appendChild(c); });
    }
    window.changeResSort = function (sel) {
        currentSort = sel.value;
        renderCards();
        window.showToast('已按「' + sel.options[sel.selectedIndex].text + '」排序', 'info');
    };
    window.bumpDownloadCount = function (type) {
        var c = lsGet(LS.dl, {});
        c[type] = (c[type] || 0) + 1;
        lsSet(LS.dl, c);
        var card = $('.resource-card[data-type="' + type + '"]');
        if (card) {
            var span = card.querySelector('.res-dl-count');
            if (span) span.textContent = '下载 ' + totalDL(type).toLocaleString();
        }
    };

    /* =====================================================================
     * 3) 批量打包下载（合并勾选资源为单个 .md）
     * =================================================================== */
    var batchMode = false;
    window.toggleBatchMode = function (btn) {
        batchMode = !batchMode;
        getCards().forEach(function (c) { c.classList.toggle('batch-mode', batchMode); });
        var bar = document.getElementById('batch-toolbar');
        if (bar) bar.style.display = batchMode ? 'flex' : 'none';
        if (btn) btn.classList.toggle('active', batchMode);
        if (!batchMode) $all('.res-batch-cb').forEach(function (cb) { cb.checked = false; });
        updateBatchBtn();
    };
    window.toggleBatchCheck = function () { updateBatchBtn(); };
    function updateBatchBtn() {
        var n = $all('.res-batch-cb:checked').length;
        var b = document.getElementById('batch-download-btn');
        if (b) b.innerHTML = '<i class="fas fa-download"></i> 打包下载选中 (' + n + ')';
        var bar = document.getElementById('batch-toolbar');
        if (bar) bar.style.opacity = n ? '1' : '0.5';
    }
    window.batchDownload = function () {
        var checked = $all('.res-batch-cb:checked');
        if (!checked.length) { window.showToast('请先勾选要下载的资源', 'warning'); return; }
        var parts = [];
        checked.forEach(function (cb) {
            var t = cb.getAttribute('data-type');
            var r = window.RESOURCE_LIB[t];
            if (r) parts.push('# ' + r.title + '\n\n' + r.content + '\n');
        });
        if (!parts.length) { window.showToast('所选资源暂无可导出文档', 'warning'); return; }
        var blob = new Blob([parts.join('\n---\n\n')], { type: 'text/markdown;charset=utf-8' });
        var link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = '双创实战资源打包_' + new Date().toISOString().slice(0, 10) + '.md';
        document.body.appendChild(link); link.click(); document.body.removeChild(link);
        window.showToast('已打包下载 ' + checked.length + ' 个资源', 'success');
    };

    /* =====================================================================
     * 4) 鱼型向导：方向联动占位符（高教/红旅/产业）
     * =================================================================== */
    var DIR_PLACEHOLDER = {
        gaojiao: {
            'bp-title': '如：基于大模型的工业级 3D 打印振镜控制系统',
            'bp-subtitle': '如：突破国外垄断的国产高端振镜引领者',
            'bp-m1': '填写公司法律类型、核心专利壁垒与未来 3-5 年技术路线图...',
            'bp-m2': '分析真实刚需痛点、TAM/SAM/SOM 与技术替代窗口...',
            'bp-m3': '填写 MVP 原型功能，并列出硬科技验证与第三方检测报告...',
            'bp-m4': '产品定价策略、ToB 直销与大客户标杆案例打法...',
            'bp-m5': '设备开支、自研产线与供应链管控...',
            'bp-m7': '填写首期 3 年研发预算、盈亏平衡销量 (BEP) 与融资出让股份...',
            'bp-m9': '选择大企业并购退出时，请列出 1-2 家产业链目标收购企业...'
        },
        honglv: {
            'bp-title': '如：富硒农产品区块链溯源与农户增收赋能平台',
            'bp-subtitle': '如：扎根县域、带动农户共同富裕的红色筑梦项目',
            'bp-m1': '填写社会组织性质、帮扶宗旨与乡村振兴 3-5 年规划...',
            'bp-m2': '分析农户/村集体真实痛点、受益覆盖面与区域市场...',
            'bp-m3': '填写助农 MVP 落地成果，并列出已带动农户数与增收数据...',
            'bp-m4': '公益传播策略、政府/合作社对接与志愿者裂变渠道...',
            'bp-m5': '基地共建、冷链共配与合作社联营的日常运营流...',
            'bp-m7': '填写首期 3 年帮扶预算、可持续造血模型与补贴依赖度...',
            'bp-m9': '选择社会影响力退出时，请列出 1-2 家可承接的国资/龙头企业...'
        },
        chanye: {
            'bp-title': '如：面向 XX 龙头企业命题的工业质检大模型',
            'bp-subtitle': '如：精准对齐产业命题、可快速复制落地的解决方案',
            'bp-m1': '填写公司法律类型、命题方对接机制与交付路线图...',
            'bp-m2': '分析命题方真实产线痛点、降本空间与竞争格局...',
            'bp-m3': '填写 POC 原型功能，并列出命题方试点验证与采纳证明...',
            'bp-m4': '企业采购定价、标杆复制与生态渠道策略...',
            'bp-m5': '产线集成、API 对接与运维交付流...',
            'bp-m7': '填写首期 3 年交付预算、ROI 测算与回款节奏...',
            'bp-m9': '选择并购/续约退出时，请列出 1-2 家命题承接龙头企业...'
        }
    };
    function applyDirection(dir) {
        var map = DIR_PLACEHOLDER[dir];
        if (!map) return;
        Object.keys(map).forEach(function (id) {
            var el = document.getElementById(id);
            if (el && !el.value.trim()) el.setAttribute('placeholder', map[id]);
        });
        lsSet(LS.dir, dir);
    }
    window.changeBPDirection = function (sel) {
        applyDirection(sel.value);
        window.showToast('已切换参赛方向：' + sel.options[sel.selectedIndex].text, 'info');
    };

    /* =====================================================================
     * 5) 重置二次确认（通用确认弹窗）
     * =================================================================== */
    var pendingConfirm = null;
    function ensureConfirmModal() {
        if ($('#app-confirm-modal')) return;
        var ov = document.createElement('div');
        ov.id = 'app-confirm-modal';
        ov.className = 'gp-modal-overlay';
        ov.style.cssText = 'display:none;z-index:100001;align-items:center;justify-content:center;';
        ov.innerHTML = '<div class="confirm-box">' +
            '<div class="confirm-icon"><i class="fas fa-exclamation-triangle"></i></div>' +
            '<div class="confirm-title" id="confirm-title">确认操作</div>' +
            '<div class="confirm-msg" id="confirm-msg"></div>' +
            '<div class="confirm-actions">' +
            '<button class="action-btn" id="confirm-cancel"><i class="fas fa-times"></i> 取消</button>' +
            '<button class="action-btn primary-gradient" id="confirm-ok" style="background:linear-gradient(135deg,#dc2626,#b91c1c);"><i class="fas fa-check"></i> 确认重置</button>' +
            '</div></div>';
        document.body.appendChild(ov);
        ov.onclick = function (e) { if (e.target === ov) closeConfirm(); };
        $('#confirm-cancel').onclick = closeConfirm;
        $('#confirm-ok').onclick = function () { closeConfirm(); if (typeof pendingConfirm === 'function') { var fn = pendingConfirm; pendingConfirm = null; fn(); } };
    }
    function closeConfirm() { var m = $('#app-confirm-modal'); if (m) m.style.display = 'none'; }
    window.confirmReset = function (msg, fn) {
        ensureConfirmModal();
        $('#confirm-msg').textContent = msg || '此操作不可撤销，确定继续吗？';
        pendingConfirm = fn;
        $('#app-confirm-modal').style.display = 'flex';
    };

    /* =====================================================================
     * 6) 步进器触摸滑动切换
     * =================================================================== */
    function currentStep() {
        var a = $('#bp-stepper-nav .filter-btn.active');
        if (!a) return 1;
        return Array.prototype.indexOf.call($all('#bp-stepper-nav .filter-btn'), a) + 1;
    }
    function goStep(n) {
        n = Math.max(1, Math.min(3, n));
        var btns = $all('#bp-stepper-nav .filter-btn');
        if (btns[n - 1]) window.switchBPStep(n, btns[n - 1]);
    }
    function initSwipeStepper() {
        if (!$('#bp-stepper-nav')) return;
        var sx = 0, sy = 0, tracking = false;
        $all('.bp-step-panel').forEach(function (p) {
            p.addEventListener('touchstart', function (e) { var t = e.changedTouches[0]; sx = t.clientX; sy = t.clientY; tracking = true; }, { passive: true });
            p.addEventListener('touchend', function (e) {
                if (!tracking) return; tracking = false;
                var t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy;
                if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) { dx < 0 ? goStep(currentStep() + 1) : goStep(currentStep() - 1); }
            }, { passive: true });
        });
    }

    /* =====================================================================
     * 7) Tooltip 大纲（跟随鼠标的浮动提示）
     * =================================================================== */
    var BMC_TIPS = {
        'bmc-kp': '重要合作伙伴：供应商、技术合作方、渠道商',
        'bmc-ka': '关键业务：让商业模式跑通每天必做之事',
        'bmc-kr': '核心资源：专利、数据、独家渠道等护城河',
        'bmc-vp': '价值主张：为谁解决什么刚性痛点、提效几倍',
        'bmc-cr': '客户关系：如何维系与裂变种子用户',
        'bmc-ch': '渠道通路：客户如何触达与快速体验',
        'bmc-cs': '客户细分：谁最急切地需要这个痛点解决',
        'bmc-cost': '成本结构：最大单一开支项是什么',
        'bmc-rs': '收入来源：客户如何付费、客单价多少'
    };
    function initTooltips() {
        var tip = document.createElement('div');
        tip.id = 'app-tooltip';
        document.body.appendChild(tip);
        function show(el) {
            tip.textContent = el.getAttribute('data-tip');
            tip.style.opacity = '1';
            var r = el.getBoundingClientRect();
            var top = r.top - tip.offsetHeight - 8;
            if (top < 8) top = r.bottom + 8;
            tip.style.top = top + 'px';
            tip.style.left = Math.min(window.innerWidth - 250, r.left) + 'px';
        }
        document.addEventListener('mouseover', function (e) { var el = e.target.closest('[data-tip]'); if (el) show(el); });
        document.addEventListener('mouseout', function (e) { if (e.target.closest('[data-tip]')) tip.style.opacity = '0'; });
        // 为 BMC 字段注入 Tooltip
        Object.keys(BMC_TIPS).forEach(function (id) {
            var el = document.getElementById(id);
            if (el) el.setAttribute('data-tip', BMC_TIPS[id]);
        });
        // 为计算器数字输入注入 Tooltip
        $all('#equity-calculator input[type="number"], #vesting-calculator input').forEach(function (el) {
            if (!el.getAttribute('data-tip')) el.setAttribute('data-tip', '输入数值后点击「计算」生成结果，非法值将标红');
        });
    }

    /* =====================================================================
     * 8) 阅读器升级：Markdown 渲染 + 缩放（按钮/滚轮/捏合）
     * =================================================================== */
    function escMd(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
    function renderMarkdown(md) {
        var lines = md.split('\n'), html = '', i = 0;
        function inline(t) { t = escMd(t); return t.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>'); }
        while (i < lines.length) {
            var line = lines[i];
            if (/^### /.test(line)) { html += '<h3>' + inline(line.slice(4)) + '</h3>'; i++; }
            else if (/^## /.test(line)) { html += '<h2>' + inline(line.slice(3)) + '</h2>'; i++; }
            else if (/^# /.test(line)) { html += '<h1>' + inline(line.slice(2)) + '</h1>'; i++; }
            else if (/^>\s?/.test(line)) { var q = []; while (i < lines.length && /^>\s?/.test(lines[i])) { q.push(inline(lines[i].replace(/^>\s?/, ''))); i++; } html += '<blockquote>' + q.join('<br>') + '</blockquote>'; }
            else if (/^[-*]\s+/.test(line)) { var ul = []; while (i < lines.length && /^[-*]\s+/.test(lines[i])) { ul.push('<li>' + inline(lines[i].replace(/^[-*]\s+/, '')) + '</li>'); i++; } html += '<ul>' + ul.join('') + '</ul>'; }
            else if (line.trim() === '') { i++; }
            else { html += '<p>' + inline(line) + '</p>'; i++; }
        }
        return html;
    }
    window.readerZoom = function (delta) {
        var b = document.getElementById('reader-body');
        if (!b) return;
        var z = parseFloat(b.getAttribute('data-zoom') || '1') + delta;
        z = Math.max(0.7, Math.min(2.2, z));
        b.setAttribute('data-zoom', z);
        b.style.fontSize = (13.5 * z).toFixed(1) + 'px';
        var lbl = document.getElementById('reader-zoom-label');
        if (lbl) lbl.textContent = Math.round(z * 100) + '%';
    };
    window.openResourceReader = function (type) {
        if (typeof window.ensureGlobalPresModalDOM === 'function') window.ensureGlobalPresModalDOM();
        var modal = document.getElementById('touch-presentation-modal');
        if (!modal) return;
        var r = window.RESOURCE_LIB[type];
        var title = r ? r.title : (type || '资源');
        var content = r ? r.content : '# 暂无在线内容\n\n该资源请使用「下载」按钮获取完整文档。';
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        modal.innerHTML =
            '<div class="presentation-modal-content reader-modal" style="width:92%; height:92%; margin:3% auto; display:flex; flex-direction:column; background:var(--bg-card); border:1px solid var(--primary-blue); border-radius:16px; padding:22px; box-sizing:border-box; color:var(--text-main); position:relative; box-shadow:0 20px 50px rgba(0,0,0,0.18);">' +
            '<div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:12px; margin-bottom:12px; gap:10px; flex-wrap:wrap;">' +
            '<h2 style="margin:0; font-size:17px; color:var(--primary-blue); flex:1; min-width:200px;"><i class="fas fa-book-open"></i> ' + title + '</h2>' +
            '<div style="display:flex; gap:8px; align-items:center;">' +
            '<div class="reader-zoom-group">' +
            '<button class="action-btn" onclick="window.readerZoom(-0.1)" title="缩小"><i class="fas fa-search-minus"></i></button>' +
            '<span id="reader-zoom-label" style="font-size:12px; min-width:42px; text-align:center; color:var(--text-muted);">完整</span>' +
            '<button class="action-btn" onclick="window.readerZoom(0.1)" title="放大"><i class="fas fa-search-plus"></i></button>' +
            '</div>' +
            '<button class="action-btn primary-gradient" onclick="downloadResourceFile(\'' + type + '\', this)"><i class="fas fa-download"></i> 下载</button>' +
            '<button class="action-btn" onclick="window.openOfficePreview(\'' + type + '\')" title="用 Office 在线查看器打开（若已托管文件）"><i class="fas fa-external-link-alt"></i> 在线预览</button>' +
            '<button class="action-btn" style="color:#dc2626; border-color:#dc2626;" onclick="window.closeGlobalPresModal()"><i class="fas fa-times"></i> 关闭</button>' +
            '</div></div>' +
            '<div style="flex:1; overflow:auto; border-radius:12px; background:var(--bg-subtle); padding:22px; line-height:1.85;" id="reader-body" data-zoom="1">' + renderMarkdown(content) + '</div>' +
            '<div style="font-size:11px; color:var(--text-muted); padding-top:8px;">提示：按住 Ctrl + 滚轮可缩放；移动端双指捏合缩放。</div>' +
            '</div>';
        var body = document.getElementById('reader-body');
        if (body) {
            body.addEventListener('wheel', function (e) { if (e.ctrlKey) { e.preventDefault(); window.readerZoom(e.deltaY < 0 ? 0.1 : -0.1); } }, { passive: false });
            var d0 = 0, z0 = 1;
            body.addEventListener('touchmove', function (e) {
                if (e.touches.length === 2) {
                    e.preventDefault();
                    var dx = e.touches[0].clientX - e.touches[1].clientX, dy = e.touches[0].clientY - e.touches[1].clientY;
                    var d = Math.sqrt(dx * dx + dy * dy);
                    if (!d0) { d0 = d; z0 = parseFloat(body.getAttribute('data-zoom') || '1'); }
                    var z = z0 * (d / d0);
                    z = Math.max(0.7, Math.min(2.2, z));
                    body.setAttribute('data-zoom', z);
                    body.style.fontSize = (13.5 * z).toFixed(1) + 'px';
                    var lbl = document.getElementById('reader-zoom-label'); if (lbl) lbl.textContent = Math.round(z * 100) + '%';
                }
            }, { passive: false });
            body.addEventListener('touchend', function () { d0 = 0; });
        }
    };

    /* Office 在线查看器 + 站内 Markdown 独立预览页（真正可用的"在线预览"） */
    window.openOfficePreview = function (type) {
        var r = window.RESOURCE_LIB[type];
        var url = r && r.officeUrl;
        // 场景 1：若资源托管了真实 .docx/.xlsx/.pptx，使用 Office Online 查看器
        if (url) {
            var viewer = 'https://view.officeapps.live.com/op/embed.aspx?src=' + encodeURIComponent(url);
            var w = window.open(viewer, '_blank', 'noopener');
            if (!w) window.showToast('预览被浏览器拦截，请允许本站点弹出窗口后重试', 'warning');
            return;
        }
        // 场景 2：站内 Markdown 文档 → 生成独立、可打印、可另存的 HTML 预览页并在新标签页打开
        var title = r ? r.title : (type || '资源');
        var md = r ? r.content : '# 暂无在线内容\n\n请使用「下载」按钮获取完整文档。';
        var safeTitle = title.replace(/[<>&]/g, '');
        var html =
            '<!DOCTYPE html><html lang="zh-CN"><head><meta charset="utf-8">' +
            '<title>' + safeTitle + ' · 在线预览</title>' +
            '<style>body{font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif;max-width:880px;margin:42px auto;padding:0 26px;line-height:1.95;color:#1f2937;background:#fff;}' +
            'h1{color:#2563EB;border-bottom:2px solid #2563EB;padding-bottom:10px;font-size:26px;}' +
            'h2{color:#1e40af;font-size:20px;margin-top:26px;}h3{color:#1e3a8a;font-size:16px;margin-top:18px;}' +
            'p{margin:10px 0;}ul{padding-left:24px;}li{margin:5px 0;}' +
            'blockquote{background:#eff6ff;border-left:4px solid #2563EB;padding:12px 18px;color:#475569;border-radius:8px;margin:14px 0;}' +
            'strong{color:#111827;}hr{border:none;border-top:1px solid #e5e7eb;margin-top:34px;}' +
            '.meta{color:#9ca3af;font-size:12px;}@media print{body{margin:0;}}</style></head><body>' +
            renderMarkdown(md) +
            '<hr><p class="meta">由《大学生创新创业基础》实战资源库 · 在线预览生成 · ' + new Date().toLocaleString('zh-CN') + '</p>' +
            '</body></html>';
        var blob = new Blob([html], { type: 'text/html;charset=utf-8' });
        var a = window.open(URL.createObjectURL(blob), '_blank', 'noopener');
        if (!a) window.showToast('预览被浏览器拦截，请允许本站点弹出窗口后重试', 'warning');
    };

    /* =====================================================================
     * 9) BMC 导出 Markdown（与 JSON 导出并列）
     * =================================================================== */
    window.exportBMCMarkdown = function () {
        var map = { 'bmc-kp': '重要合作伙伴', 'bmc-ka': '关键业务', 'bmc-kr': '核心资源', 'bmc-vp': '价值主张', 'bmc-cr': '客户关系', 'bmc-ch': '渠道通路', 'bmc-cs': '客户细分', 'bmc-cost': '成本结构', 'bmc-rs': '收入来源' };
        var md = '# 商业模式画布 (BMC) 导出\n\n> 导出时间：' + new Date().toLocaleString('zh-CN') + '\n\n';
        Object.keys(map).forEach(function (id) {
            var el = document.getElementById(id);
            md += '## ' + map[id] + '\n' + (el ? el.value.trim() : '') + '\n\n';
        });
        var blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
        var link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = '商业模式画布_BMC_' + new Date().toISOString().slice(0, 10) + '.md';
        document.body.appendChild(link); link.click(); document.body.removeChild(link);
        window.showToast('BMC 已导出为 Markdown', 'success');
    };

    /* =====================================================================
     * 10) 下载重试（增强 downloadResourceFile：加载态 + 失败重试）
     * =================================================================== */
    function wrapDownload() {
        var orig = window.downloadResourceFile;
        if (typeof orig !== 'function') return;
        window.downloadResourceFile = function (type, btn) {
            if (!btn && typeof window.event !== 'undefined' && window.event && window.event.currentTarget) btn = window.event.currentTarget;
            var prevHtml = null;
            if (btn) { prevHtml = btn.innerHTML; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 生成中…'; btn.disabled = true; }
            window.requestDownloadNotify && window.requestDownloadNotify();
            var done = false;
            function finish() {
                if (done) return; done = true;
                if (btn) { btn.disabled = false; btn.innerHTML = prevHtml || btn.innerHTML; }
                window.bumpDownloadCount && window.bumpDownloadCount(type);
            }
            try {
                var ret = orig(type, btn);
                setTimeout(finish, 450);
                return ret;
            } catch (err) {
                if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-redo"></i> 重试下载'; btn.onclick = function () { btn.onclick = null; window.downloadResourceFile(type, btn); }; }
                window.showToast('下载生成失败，请点击按钮重试', 'danger');
                return null;
            }
        };
    }

    /* =====================================================================
     * 11) 滚动到首个校验错误（股权/答辩校验统一调用）
     * =================================================================== */
    window.scrollToFirstError = function (ids) {
        for (var i = 0; i < ids.length; i++) {
            var el = document.getElementById(ids[i]);
            if (el && el.classList.contains('input-error')) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                try { el.focus({ preventScroll: true }); } catch (e) { el.focus(); }
                break;
            }
        }
    };

    /* =====================================================================
     * 12) Service Worker 离线缓存（network-first，避免陈旧资源）
     * =================================================================== */
    function initServiceWorker() {
        if (!('serviceWorker' in navigator)) return;
        if (location.protocol !== 'https:' && location.hostname !== 'localhost') return;
        navigator.serviceWorker.register('sw.js').then(function () { /* 离线缓存已启用 */ }).catch(function () {});
    }

    /* =====================================================================
     * 初始化：注入 DOM 钩子并绑定
     * =================================================================== */
    function injectCardExtras() {
        getCards().forEach(function (card) {
            var type = card.getAttribute('data-type');
            if (!type) return;
            // 收藏星标
            if (!card.querySelector('.res-fav-btn')) {
                var fav = getFavs()[type];
                var star = document.createElement('button');
                star.className = 'res-fav-btn' + (fav ? ' faved' : '');
                star.setAttribute('data-type', type);
                star.setAttribute('data-tip', '收藏 / 取消收藏');
                star.innerHTML = fav ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
                star.onclick = function (e) { e.stopPropagation(); var f = getFavs()[type]; star.classList.toggle('faved', !f); star.innerHTML = star.classList.contains('faved') ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>'; window.toggleResourceFavorite(type, star); };
                card.appendChild(star);
            }
            // 批量勾选
            if (!card.querySelector('.res-batch-label')) {
                var lab = document.createElement('label');
                lab.className = 'res-batch-label';
                lab.innerHTML = '<input type="checkbox" class="res-batch-cb" data-type="' + type + '" onchange="window.toggleBatchCheck()">';
                card.insertBefore(lab, card.firstChild);
            }
            // 标记下载计数 chip 以便更新
            var chip = Array.prototype.slice.call(card.querySelectorAll('span')).filter(function (s) { return /下载/.test(s.textContent); })[0];
            if (chip) chip.classList.add('res-dl-count');
        });
    }
    function injectBMCMarkdownBtn() {
        var box = $('#interactive-bmc .bmc-actions');
        if (box && !$('#bmc-export-md-btn')) {
            var b = document.createElement('button');
            b.id = 'bmc-export-md-btn';
            b.className = 'action-btn';
            b.innerHTML = '<i class="fas fa-file-export"></i> 导出 Markdown';
            b.onclick = function () { window.exportBMCMarkdown(); };
            box.appendChild(b);
        }
    }
    function initDirectionRestore() {
        var sel = document.getElementById('bp-direction-select');
        if (!sel) return;
        var saved = lsGet(LS.dir, '');
        if (saved) { sel.value = saved; applyDirection(saved); }
    }

    function init() {
        injectCardExtras();
        injectBMCMarkdownBtn();
        syncFavCapsule();
        initSwipeStepper();
        initTooltips();
        initDirectionRestore();
        initServiceWorker();
        wrapDownload();
        window.addEventListener('beforeunload', function () { var m = $('#app-confirm-modal'); if (m) m.style.display = 'none'; });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
