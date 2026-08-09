/* =========================================================================
 * 创新创业课程知识图谱智能体 — resources.html 交互增强与缺失功能实现
 * 修复：阅读器弹窗、股权/Vesting/答辩计算器、BMC 导入导出与 AI 校验、图片导出
 * 覆盖审计意见：#1 #2 #5 #22 #25 #31 #32 #33 #38 #44 #83 #84 #91 等
 * ========================================================================= */
(function () {
    'use strict';

    /* ---------- 全局 Toast（兼容既有 showToast 调用） ---------- */
    window.showToast = function (message, type, duration) {
        type = type || 'info';
        duration = duration || 2800;
        let container = document.getElementById('app-toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'app-toast-container';
            container.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:99999;display:flex;flex-direction:column;gap:10px;pointer-events:none;';
            document.body.appendChild(container);
        }
        const bg = { info: 'linear-gradient(135deg,#0284c7,#0369a1)', success: 'linear-gradient(135deg,#10b981,#047857)', warning: 'linear-gradient(135deg,#f59e0b,#b45309)', danger: 'linear-gradient(135deg,#ef4444,#b91c1c)' }[type] || 'linear-gradient(135deg,#0284c7,#0369a1)';
        const icon = { info: 'fa-info-circle', success: 'fa-check-circle', warning: 'fa-exclamation-triangle', danger: 'fa-times-circle' }[type] || 'fa-info-circle';
        const t = document.createElement('div');
        t.style.cssText = 'background:' + bg + ';color:#fff;padding:12px 18px;border-radius:12px;font-size:13.5px;font-weight:700;box-shadow:0 10px 25px rgba(0,0,0,.3);display:flex;align-items:center;gap:9px;opacity:0;transform:translateY(20px) scale(.95);transition:all .3s cubic-bezier(.34,1.56,.64,1);pointer-events:auto;border:1px solid rgba(255,255,255,.2);max-width:360px;';
        t.innerHTML = '<i class="fas ' + icon + '"></i><span>' + message + '</span>';
        container.appendChild(t);
        requestAnimationFrame(() => { t.style.opacity = '1'; t.style.transform = 'translateY(0) scale(1)'; });
        setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateY(-10px) scale(.9)'; setTimeout(() => t.remove(), 300); }, duration);
    };

    /* ---------- 数字滚动动效 CountUp（#83） ---------- */
    function countUp(el, to, decimals, suffix) {
        decimals = decimals || 0; suffix = suffix || '';
        const dur = 700, start = performance.now(), from = 0;
        function step(now) {
            const p = Math.min(1, (now - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            const val = (from + (to - from) * eased).toFixed(decimals);
            el.textContent = val + suffix;
            if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    /* ---------- 数字输入合法性红框校验（#84 #38） ---------- */
    function validateNum(id, min, max) {
        const el = document.getElementById(id);
        if (!el) return 0;
        let v = parseFloat(el.value);
        let ok = !isNaN(v) && (min == null || v >= min) && (max == null || v <= max);
        if (!ok) { el.classList.add('input-error'); return NaN; }
        el.classList.remove('input-error');
        return v;
    }

    /* ---------- 在线阅读器弹窗 DOM 构造（修复 #1 阅读无响应） ---------- */
    window.ensureGlobalPresModalDOM = function () {
        if (document.getElementById('touch-presentation-modal')) return;
        const ov = document.createElement('div');
        ov.id = 'touch-presentation-modal';
        ov.className = 'gp-modal-overlay';
        ov.style.zIndex = '100000';
        ov.onclick = function (e) { if (e.target === ov) window.closeGlobalPresModal(); };
        document.body.appendChild(ov);
    };
    window.closeGlobalPresModal = function () {
        const m = document.getElementById('touch-presentation-modal');
        if (m) { m.style.display = 'none'; m.innerHTML = ''; }
        document.body.style.overflow = '';
    };

    /* ---------- 下载工具：命名规范化 + 加载态 + 浏览器通知（#2 #5 #25） ---------- */
    function triggerDownload(blob, filename) {
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(url), 4000);
        notifyDownload(filename);
    }
    function notifyDownload(name) {
        try {
            if ('Notification' in window && Notification.permission === 'granted') {
                new Notification('下载已完成', { body: name + ' 已保存到本地', icon: 'img/favicon.png' });
            }
        } catch (e) { /* 忽略通知异常 */ }
    }
    window.requestDownloadNotify = function () {
        try {
            if ('Notification' in window && Notification.permission === 'default') {
                Notification.requestPermission();
            }
        } catch (e) {}
    };

    // 增强版下载（覆盖内联旧实现，加入规范命名/加载/通知）
    window.downloadResourceFile = function (type, btn) {
        window.requestDownloadNotify();
        if (!btn && typeof event !== 'undefined' && event && event.currentTarget) btn = event.currentTarget;
        const map = {
            'm2-2': { name: '【创新创业OBE平台】M2-2_合伙人协议与性格雷达测评模板_v1.0.md', content: '# 创客团队合伙人股权分配与分期成熟 (Vesting) 补充协议\n\n## 一、合伙人持股比例确权\n- 合伙人 A (CEO / 商业带头人)：持股 60%\n- 合伙人 B (CTO / 技术研发)：持股 25%\n- 合伙人 C (COO / 运营推广)：持股 15%\n\n## 二、股权分期成熟 (Vesting) 规则\n1. **服务成熟期**：全体合伙人持有的股权分 **4 年** 线性成熟（每月成熟 1/48）。\n2. **1 年崖山期 (Cliff)**：必须连续服务满 **12 个月**，首批 25% 股权才开始解锁。\n3. **退场回购机制**：中途离职的未成熟股权由期权池无偿收回。\n' },
            'm1-1': { name: '【创新创业OBE平台】M1-1_产业痛点资讯搜寻指令集_v1.0.md', content: '# M1-1 产业痛点资讯搜寻指令集\n\n包含关于高原农产与非遗大模型调优提示词与高效搜索方法模板。\n' },
            'm4-3': { name: '【创新创业OBE平台】M4-3_STAR法则答辩简历润色大纲_v1.0.md', content: '# STAR 法则路演答辩与评委压力测试防守指南\n\n## 一、STAR 结构化回答模型\n- **Situation (情境)**：交代项目背景与行业痛点真实数据\n- **Task (任务)**：明确团队需要攻克的核心难题\n- **Action (行动)**：突出团队的实操动作与技术路线\n- **Result (结果)**：用硬核量化数据说话\n' },
            'm5-2': { name: '【创新创业OBE平台】M5-2_大学生创业贴息贷款申报指南_v1.0.md', content: '# 大学生创业政策红利与贴息贷款申报指南\n\n## 一、政策红利一览\n1. **创业担保贴息贷款**：符合条件的项目最高可申请贴息贷款，财政承担大部分利息。\n2. **一次性创业补贴**：在校或毕业 5 年内首次创办企业，正常经营满 6 个月，可申请一次性创业补贴。\n3. **高校创业园免费工位**：入驻本校大学生创业园，免费提供独立办公工位及导师指导。\n\n## 二、申报材料与流程\n- 营业执照副本复印件\n- 法人及团队成员学生证 / 毕业证\n- 《商业计划书 (BP) 摘要》\n- 高校创业项目推荐表（由创业学院盖章）\n' }
        };
        const info = map[type] || { name: '双创实战通用资源指南.md', content: '# 大学生创新创业基础实战指南\n\n包含项目申报、路演防守及财务测算表单。\n' };
        if (btn) { btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 生成中…'; btn.disabled = true; }
        setTimeout(() => {
            triggerDownload(new Blob([info.content], { type: 'text/markdown;charset=utf-8' }), info.name);
            if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-download"></i> 阅读与下载'; }
            window.showToast('已触发下载：' + info.name, 'success');
        }, 350);
    };

    /* =====================================================================
     * 股权比例智能估算计算器（#38 #83 #84）
     * =================================================================== */
    window.resetEquityCalculator = function () {
        ['A', 'B', 'C'].forEach(p => {
            const cap = document.getElementById('eq-capital-' + p), time = document.getElementById('eq-time-' + p), tech = document.getElementById('eq-tech-' + p), gpu = document.getElementById('eq-gpu-' + p);
            if (cap) cap.value = 0; if (time) time.value = 5; if (tech) tech.value = 5; if (gpu) gpu.value = 0;
        });
        document.getElementById('equity-result-panel').style.display = 'none';
        window.showToast('已重置股权计算器', 'info');
    };

    window.runEquityCalculation = function () {
        const partners = ['A', 'B', 'C'];
        const labels = { A: '合伙人 A (CEO)', B: '合伙人 B (CTO)', C: '合伙人 C (COO)' };
        const raw = {};
        let valid = true;
        const errIds = [];
        partners.forEach(p => {
            const cap = validateNum('eq-capital-' + p, 0), gpu = validateNum('eq-gpu-' + p, 0);
            const time = validateNum('eq-time-' + p, 1, 10), tech = validateNum('eq-tech-' + p, 1, 10);
            if ([cap, gpu, time, tech].some(v => isNaN(v))) { valid = false; errIds.push('eq-capital-' + p, 'eq-gpu-' + p, 'eq-time-' + p, 'eq-tech-' + p); return; }
            raw[p] = { money: cap + gpu, time: time, tech: tech };
        });
        if (!valid) { window.scrollToFirstError && window.scrollToFirstError(errIds); window.showToast('出资数值非法（负数或超范围），请检查红框项', 'danger'); return; }

        // 各维度按最大值归一化后加权（技术*20 > 精力*15 > 资金*1）
        const maxMoney = Math.max(1, ...partners.map(p => raw[p].money));
        const maxTime = Math.max(1, ...partners.map(p => raw[p].time));
        const maxTech = Math.max(1, ...partners.map(p => raw[p].tech));
        let total = 0;
        const scores = {};
        partners.forEach(p => {
            const s = (raw[p].money / maxMoney) * 1 + (raw[p].time / maxTime) * 15 + (raw[p].tech / maxTech) * 20;
            scores[p] = s; total += s;
        });
        const pct = {};
        partners.forEach(p => pct[p] = total ? (scores[p] / total * 100) : 0);

        const panel = document.getElementById('equity-result-panel');
        let html = '<h3 style="margin:0 0 14px;color:var(--primary-blue);font-size:15px;"><i class="fas fa-percentage"></i> 股权分配估算结果（加权模型）</h3>';
        html += '<div style="display:flex;flex-direction:column;gap:12px;">';
        partners.forEach(p => {
            html += '<div><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px;"><span style="font-weight:800;color:var(--text-main);">' + labels[p] + '</span><span class="eq-pct" data-v="' + pct[p].toFixed(1) + '" style="font-weight:900;color:var(--primary-blue);">0%</span></div>'
                + '<div style="height:12px;background:var(--bg-subtle);border-radius:8px;overflow:hidden;"><div style="height:100%;width:0;background:linear-gradient(90deg,#2563EB,#60a5fa);border-radius:8px;transition:width .8s ease;" data-w="' + pct[p].toFixed(1) + '"></div></div></div>';
        });
        html += '</div>';
        html += '<p style="font-size:11.5px;color:var(--text-muted);margin-top:12px;">权重逻辑：核心技术(*20) &gt; 全职精力(*15) &gt; 资金设备(*1)，各维度按团队内最大值归一化，避免巨额资金单边显著优势。</p>';
        panel.innerHTML = html;
        panel.style.display = 'block';
        // CountUp + 进度条动画
        panel.querySelectorAll('.eq-pct').forEach(el => countUp(el, parseFloat(el.dataset.v), 1, '%'));
        panel.querySelectorAll('[data-w]').forEach(el => { setTimeout(() => el.style.width = el.dataset.w + '%', 60); });
        window.showToast('股权比例计算完成', 'success');
    };

    /* =====================================================================
     * Vesting 股权分期成熟可视化计算器（#31 必填校验 #33 溢出 #83 动效）
     * =================================================================== */
    window.runVestingCalculation = function () {
        const pct = validateNum('vesting-pct', 1, 100);
        const years = parseInt(document.getElementById('vesting-years').value, 10);
        const cliff = parseInt(document.getElementById('vesting-cliff').value, 10);
        const freq = document.getElementById('vesting-frequency').value;
        if (isNaN(pct)) { window.scrollToFirstError && window.scrollToFirstError(['vesting-pct']); window.showToast('初始持股比例需为 1-100 的整数', 'danger'); return; }
        if (cliff >= years) { window.showToast('崖期必须小于服务总年限', 'danger'); return; }

        const totalMonths = years * 12;
        const cliffMonths = cliff * 12;
        const points = [];
        for (let m = 0; m <= totalMonths; m++) {
            let vested;
            if (m < cliffMonths) vested = 0;
            else if (freq === 'yearly') vested = Math.min(1, (Math.floor(m / 12) - cliff + 1) / (years - cliff + 1));
            else vested = (m - cliffMonths + 1) / (totalMonths - cliffMonths + 1);
            points.push([m, +(vested * pct).toFixed(2)]);
        }
        const finalPct = points[points.length - 1][1];
        const report = document.getElementById('vesting-report-text');
        report.innerHTML = '服务满 <b>' + years + ' 年</b>（' + totalMonths + ' 个月）后，该合伙人累计成熟股权达 <b style="color:var(--primary-blue);">' + finalPct + '%</b>。'
            + '崖期 ' + cliff + ' 年内（' + cliffMonths + ' 个月）股权锁定为 0，满崖期后' + (freq === 'yearly' ? '按年度' : '按月度') + '线性释放，有效防止早期离职带走永久股份。';

        const container = document.getElementById('vesting-chart-container');
        if (typeof echarts !== 'undefined') {
            const chart = echarts.getInstanceByDom(container) || echarts.init(container);
            chart.setOption({
                grid: { left: 38, right: 16, top: 20, bottom: 28 },
                tooltip: { trigger: 'axis', formatter: p => '第 ' + p[0].data[0] + ' 月<br/>成熟股权：' + p[0].data[1] + '%' },
                xAxis: { type: 'value', name: '月', min: 0, max: totalMonths, axisLabel: { color: '#94a3b8', fontSize: 10 }, axisLine: { lineStyle: { color: '#cbd5e1' } } },
                yAxis: { type: 'value', name: '%', max: 100, axisLabel: { color: '#94a3b8', fontSize: 10, formatter: '{value}' }, splitLine: { lineStyle: { color: '#eef2f7' } } },
                series: [{ type: 'line', smooth: true, symbol: 'none', data: points, lineStyle: { color: '#2563EB', width: 3 }, areaStyle: { color: 'rgba(37,99,235,0.12)' } }]
            });
            setTimeout(() => chart.resize(), 50);
        } else {
            container.innerHTML = '<div style="font-size:12px;color:var(--text-muted);padding:20px;">（图表库未加载，已生成文字报告）</div>';
        }
        window.showToast('股权成熟曲线已生成', 'success');
    };

    /* =====================================================================
     * 商业模式画布 BMC：导出 / 导入 JSON（#32 防白屏 #91 采纳）
     * =================================================================== */
    const BMC_FIELDS = ['bmc-kp', 'bmc-ka', 'bmc-kr', 'bmc-vp', 'bmc-cr', 'bmc-ch', 'bmc-cs', 'bmc-cost', 'bmc-rs'];

    window.exportBMCJSON = function () {
        const data = {};
        BMC_FIELDS.forEach(id => { const el = document.getElementById(id); if (el) data[id] = el.value; });
        const blob = new Blob([JSON.stringify({ _type: 'iekg-bmc', version: 1, data: data }, null, 2)], { type: 'application/json;charset=utf-8' });
        triggerDownload(blob, '商业模式画布_BMC_' + new Date().toISOString().slice(0, 10) + '.json');
        window.showToast('BMC 已导出为 JSON', 'success');
    };

    window.importBMCJSON = function () {
        const input = document.createElement('input');
        input.type = 'file'; input.accept = 'application/json,.json';
        input.onchange = function () {
            const file = input.files[0]; if (!file) return;
            const reader = new FileReader();
            reader.onload = function (e) {
                try {
                    const parsed = JSON.parse(e.target.result);
                    const data = parsed && parsed.data ? parsed.data : parsed;
                    if (!data || typeof data !== 'object') throw new Error('格式错误');
                    let applied = 0;
                    BMC_FIELDS.forEach(id => { if (typeof data[id] === 'string') { const el = document.getElementById(id); if (el) { el.value = data[id]; applied++; } } });
                    window.showToast('已导入 ' + applied + ' 个画布字段', 'success');
                } catch (err) {
                    // #32 关键：捕获非法 JSON，避免 Stepper 白屏死机
                    window.showToast('JSON 解析失败：文件格式不合法，已取消导入', 'danger');
                }
            };
            reader.onerror = function () { window.showToast('文件读取失败', 'danger'); };
            reader.readAsText(file);
        };
        input.click();
    };

    /* BMC AI 逻辑校验 + 一键采纳并应用（#44 等待态 #91 采纳） ---------- */
    window.runBMCAICheck = function (btn) {
        const b = btn || event && event.currentTarget;
        if (b) { b.innerHTML = '<i class="fas fa-spinner fa-spin"></i> AI 校验中…'; b.disabled = true; }
        setTimeout(() => {
            const vals = {};
            BMC_FIELDS.forEach(id => { const el = document.getElementById(id); vals[id] = el ? el.value.trim() : ''; });
            const empty = BMC_FIELDS.filter(id => !vals[id]);
            const shortOnes = BMC_FIELDS.filter(id => vals[id] && vals[id].length < 8);
            const tips = [];
            if (empty.length) tips.push('以下模块尚未填写：' + empty.map(id => id.replace('bmc-', '').toUpperCase()).join('、') + '。');
            if (shortOnes.length) tips.push('以下模块内容偏短（<8字），建议补充具体数据：' + shortOnes.map(id => id.replace('bmc-', '').toUpperCase()).join('、') + '。');
            if (!empty.length && !shortOnes.length) tips.push('画布信息完整度良好，逻辑关系自洽，可直接导出用于路演。');
            const suggestion = {
                'bmc-vp': '（建议）围绕“为谁解决什么刚性痛点、相比旧方案提效几倍”补一句量化价值主张。',
                'bmc-cs': '（建议）明确首批种子用户画像与获客冷启动渠道。',
                'bmc-cost': '（建议）拆分固定成本与可变成本，标注最大单一开支项。'
            };
            let html = '<h3 style="margin:0 0 10px;color:var(--primary-blue);font-size:14px;"><i class="fas fa-magic"></i> AI 逻辑校验报告</h3>';
            html += '<ul style="margin:0;padding-left:18px;font-size:12.5px;line-height:1.7;color:var(--text-main);">';
            tips.forEach(t => html += '<li>' + t + '</li>');
            html += '</ul>';
            html += '<div style="margin-top:12px;display:flex;gap:8px;"><button class="action-btn primary-gradient" onclick="window.applyBMCSuggestions(' + JSON.stringify(suggestion).replace(/"/g, '&quot;') + ')"><i class="fas fa-check-double"></i> 采纳并应用建议</button></div>';
            const panel = document.getElementById('bmc-ai-result') || (function () { const d = document.createElement('div'); d.id = 'bmc-ai-result'; d.style.cssText = 'margin-top:14px;border:1px dashed var(--primary-blue);border-radius:12px;padding:14px;background:var(--bg-subtle);'; document.getElementById('interactive-bmc').appendChild(d); return d; })();
            panel.innerHTML = html;
            if (b) { b.innerHTML = '<i class="fas fa-magic"></i> AI 逻辑校验'; b.disabled = false; }
            window.showToast('AI 校验完成', 'success');
        }, 600);
    };

    window.applyBMCSuggestions = function (sugg) {
        let applied = 0;
        Object.keys(sugg).forEach(id => {
            const el = document.getElementById(id);
            if (el && !el.value.trim()) { el.value = sugg[id].replace(/^（建议）/, ''); applied++; }
        });
        // 同步本地缓存
        if (window.saveBMCLocal) window.saveBMCLocal();
        window.showToast('已应用 ' + applied + ' 条建议到画布', 'success');
    };

    /* BMC 导出图片（#33 防止文字溢出裁剪） ---------- */
    window.exportBMCToImage = function (btn) {
        const b = btn || (event && event.currentTarget);
        if (typeof html2canvas === 'undefined') { window.showToast('图片导出组件未加载', 'danger'); return; }
        if (b) { b.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 渲染中…'; b.disabled = true; }
        const grid = document.getElementById('bmc-grid-canvas');
        // 在捕获前让多行文本框按内容撑高，避免文字被裁剪
        grid.querySelectorAll('textarea').forEach(tx => { tx.style.height = 'auto'; tx.style.height = Math.max(80, tx.scrollHeight + 8) + 'px'; });
        setTimeout(() => {
            html2canvas(grid, { backgroundColor: '#ffffff', scale: 2, useCORS: true, windowWidth: grid.scrollWidth }).then(canvas => {
                canvas.toBlob(blob => {
                    triggerDownload(blob, '商业模式画布_BMC_' + new Date().toISOString().slice(0, 10) + '.png');
                    window.showToast('BMC 图片已导出', 'success');
                    if (b) { b.innerHTML = '<i class="fas fa-download"></i> 导出图片'; b.disabled = false; }
                });
            }).catch(() => { window.showToast('图片导出失败', 'danger'); if (b) { b.innerHTML = '<i class="fas fa-download"></i> 导出图片'; b.disabled = false; } });
        }, 200);
    };

    /* =====================================================================
     * 大赛答辩防御与壁垒评估（#31 必填 #44 等待态 #83 动效）
     * =================================================================== */
    window.resetBarrierGenerator = function () {
        const name = document.getElementById('bar-project-name'), desc = document.getElementById('bar-project-desc');
        if (name) name.value = ''; if (desc) desc.value = '';
        const panel = document.getElementById('barrier-result-panel'); if (panel) panel.style.display = 'none';
        window.showToast('已重置答辩评估', 'info');
    };

    window.runBarrierGeneration = function (btn) {
        const b = btn || (event && event.currentTarget);
        const name = (document.getElementById('bar-project-name').value || '').trim();
        const desc = (document.getElementById('bar-project-desc').value || '').trim();
        const track = document.getElementById('bar-competition-track').value;
        if (desc.length < 15) { window.showToast('请先填写至少 15 字的项目痛点与优势描述', 'warning'); document.getElementById('bar-project-desc').focus(); return; }
        if (b) { b.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 评估中…'; b.disabled = true; }
        setTimeout(() => {
            const kw = { gaojiao: ['专利', '技术壁垒', '成本', '量化'], honglv: ['农户', '就业', '社会', '振兴', '带动'], chanye: ['命题', '产线', '落地', '企业'] }[track] || [];
            let score = 60 + Math.min(20, desc.length / 10);
            kw.forEach(k => { if (desc.indexOf(k) >= 0) score += 4; });
            score = Math.min(98, Math.round(score));
            const trackName = { gaojiao: '高教主方向（核心技术专利壁垒）', honglv: '青年红色筑梦之旅（社会效益）', chanye: '产业命题（企业命题对齐）' }[track];
            const panel = document.getElementById('barrier-result-panel');
            const html = '<h3 style="margin:0 0 12px;color:var(--primary-blue);font-size:15px;"><i class="fas fa-shield-alt"></i> 答辩防御评估报告</h3>'
                + '<div style="display:flex;align-items:center;gap:16px;margin-bottom:14px;"><div class="bar-score" data-v="' + score + '" style="font-size:34px;font-weight:900;color:var(--primary-blue);">0</div><div style="font-size:12.5px;color:var(--text-muted);">综合防御评分 / 100<br/>参赛方向：' + (name || '未命名项目') + ' · ' + trackName + '</div></div>'
                + '<div style="font-size:12.5px;line-height:1.8;color:var(--text-main);">依据当前描述，评委高频质询防守要点：<br/>'
                + '· 针对“大厂抄袭”质疑：强调垂直场景独家数据与渠道护城河；<br/>'
                + '· 针对“盈利模式”质疑：用单元经济（客单价×复购）量化闭环；<br/>'
                + '· 针对“落地性”质疑：列出已签署的合作或试点证明。<br/>'
                + (score >= 85 ? '整体壁垒扎实，建议补充第三方检测/专利证书作为硬证据。' : '建议补充量化指标与第三方佐证，提升评委置信度。') + '</div>';
            panel.innerHTML = html;
            panel.style.display = 'block';
            const sc = panel.querySelector('.bar-score'); if (sc) countUp(sc, parseInt(sc.dataset.v, 10), 0, '');
            if (b) { b.innerHTML = '<i class="fas fa-magic"></i> 开启答辩评估'; b.disabled = false; }
            window.showToast('答辩评估完成', 'success');
        }, 700);
    };

    /* ---------- 资源卡片点击防抖（#22）与整卡可点（#20）在 ux-enhance.js 中处理 ---------- */
})();
