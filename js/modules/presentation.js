/**
 * 创新创业课程知识图谱智能体 (IEKG) - 全屏大屏演播霸屏 Modal 模块 v6.6 Refactored (2026.07.21)
 * 深度整合 guizang-ppt-skill 全景大屏高对比黑金/赛博霓虹大屏演播系统
 * 包含：1. 中文节点名智能反向解析；2. 36 套风格手动切换；3. 100% 霸屏全屏响应保底
 */
(function() {
    window.IEKG = window.IEKG || {};
    window.IEKG.modules = window.IEKG.modules || {};

    const PresentationModule = {
        currentNodeId: null,

        /**
         * 全套 18 学时 PBL 精品课程大屏放映目录索引 (提供一键全景检索)
         */
        pblIndexList: [
            { id: '11', title: '💻 放映：第一次课 认识创新创业与 Sarasvathy 效果推理', hours: '2学时', tag: '重点理论与痛点咖啡馆模拟' },
            { id: '12', title: '💻 放映：第一次课 (下) SCAMPER 奔驰法 7 维发散演练', hours: '2学时', tag: '创新构思风暴与冲突消解' },
            { id: '21', title: '💻 放映：第二次课 商机捕捉与 JTBD 真实痛点过滤', hours: '2学时', tag: '痛点过滤与同理心地图' },
            { id: '22', title: '💻 放映：第三次课 创业者特质与生涯规划技能拼图', hours: '2学时', tag: 'Hacker/Hipster/Hustler核心创始团队' },
            { id: '31', title: '💻 放映：第四次课 精益商业模式画布 (BMC) 9要素设计', hours: '2学时', tag: '奥斯特瓦德画布解构' },
            { id: '33', title: '💻 放映：第五次课 数字化辅助精益 MVP 原型构建', hours: '2学时', tag: '高效原型与冷启动测试' },
            { id: '34', title: '💻 放映：第六次课 基于生成式 AI 的低代码原型开发与软硬件联调规范', hours: '2学时', tag: '数据飞轮与算法落地' },
            { id: '42', title: '💻 放映：第七次课 跨学科创始团队架构设计与股权分期成熟归属协议', hours: '2学时', tag: '67%控制权与退场契约' },
            { id: '52', title: '💻 放映：第八次课 商业计划书十要素骨骼结构与 12 页路演汇报规范', hours: '2学时', tag: '路演黄金 12 页' },
            { id: '53', title: '💻 放映：第九次课 路演答辩高频质询应对策略与资本退出路径规划', hours: '2学时', tag: '电梯路演与高压质询' }
        ],

        /**
         * 打开 18 学时大屏演播快捷放映罗盘 (Presentation Command Palette)
         */
        openQuickDrawer() {
            let drawer = document.getElementById('global-pres-quick-drawer');
            if (!drawer) {
                drawer = document.createElement('div');
                drawer.id = 'global-pres-quick-drawer';
                document.body.appendChild(drawer);
            }
            drawer.style.cssText = `
                display: flex !important;
                position: fixed !important;
                top: 0; left: 0; width: 100vw; height: 100vh;
                background: rgba(5, 6, 8, 0.85);
                backdrop-filter: blur(16px);
                z-index: 2147483646;
                justify-content: center;
                align-items: center;
                padding: 20px;
                box-sizing: border-box;
            `;

            const listHtml = this.pblIndexList.map(item => `
                <div onclick="window.IEKG.modules.presentation.openPresentation('${item.id}'); document.getElementById('global-pres-quick-drawer').style.display='none';" style="padding:14px 18px; background:rgba(255,255,255,0.04); border:1px solid rgba(0,194,224,0.2); border-radius:12px; cursor:pointer; display:flex; justify-content:space-between; align-items:center; transition:all 0.25s ease;" onmouseover="this.style.background='rgba(0,194,224,0.12)'; this.style.borderColor='rgba(0,194,224,0.5)';" onmouseout="this.style.background='rgba(255,255,255,0.04)'; this.style.borderColor='rgba(0,194,224,0.2)';">
                    <div style="display:flex; align-items:center; gap:12px;">
                        <span style="background:linear-gradient(135deg,#f59e0b,#d97706); color:#050608; font-weight:900; padding:4px 10px; border-radius:8px; font-size:12px;">PBL #${item.id}</span>
                        <div>
                            <div style="font-size:15px; font-weight:800; color:#ffffff; margin-bottom:3px;">${item.title}</div>
                            <div style="font-size:12px; color:rgba(255,255,255,0.5);">${item.tag}</div>
                        </div>
                    </div>
                    <div style="display:flex; align-items:center; gap:10px;">
                        <span style="font-size:11.5px; background:rgba(16,185,129,0.15); color:#10b981; padding:3px 8px; border-radius:6px; font-weight:700;">${item.hours}</span>
                        <i class="fas fa-play-circle" style="color:var(--cyan); font-size:18px;"></i>
                    </div>
                </div>
            `).join('');

            drawer.innerHTML = `
                <div style="width:100%; max-width:850px; background:#0b1120; border:1px solid rgba(0,194,224,0.3); border-radius:24px; padding:30px; box-shadow:0 20px 50px rgba(0,0,0,0.6); display:flex; flex-direction:column; max-height:85vh;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:15px;">
                        <div>
                            <h2 style="margin:0; font-size:20px; font-weight:900; color:#ffffff; display:flex; align-items:center; gap:10px;">
                                <i class="fas fa-desktop" style="color:#f59e0b;"></i> 💻 全套 18 学时 PBL 精品课程大屏演播快捷放映中心
                            </h2>
                            <p style="margin:5px 0 0; font-size:12.5px; color:rgba(255,255,255,0.6);">点击下方任意课程放映卡片，即可瞬间调起高清全屏 33 Slide 演示与计时控制台</p>
                        </div>
                        <button onclick="document.getElementById('global-pres-quick-drawer').style.display='none';" style="background:rgba(255,255,255,0.1); border:none; color:#fff; width:36px; height:36px; border-radius:50%; cursor:pointer; font-size:16px;"><i class="fas fa-times"></i></button>
                    </div>
                    <div style="overflow-y:auto; display:flex; flex-direction:column; gap:12px; padding-right:6px;">
                        ${listHtml}
                    </div>
                </div>
            `;
        },

        /**
         * 课时 ID / 关键字 智能反向转换映射表
         */
        nodeNameMap: {
            '1': '11', '2': '21', '3': '23',
            '4': '31', '5': '33', '6': '41',
            '7': '43', '8': '51', '9': '53',
            '认识创新创业': '11', '发散思维': '11', 'Sarasvathy': '11',
            'AI+ 创业机会识别': '12', '机会识别': '12',
            '商机捕捉': '21', '真实痛点过滤': '21', '痛点': '21',
            '人机协同头脑风暴': '22', '头脑风暴': '22',
            '宏观环境研判': '23', '保本财务划线': '23', 'PEST': '23', 'BEP': '23',
            '数据驱动痛点分析': '24',
            '精益商业模式画布': '31', '商业模式画布': '31', 'BMC': '31',
            'AI 商业模式画布': '32',
            '最小可行化产品': '33', 'MVP': '33', 'AI 编程快速 MVP': '33',
            '创意思维与方法': '34',
            '团队跨界融合与管理': '41', '团队管理': '41',
            '微型团队代理人挑战': '42', '代理人': '42',
            '技术与出路能效分析': '43', '技术分析': '43',
            '挑战杯系列赛事': '44', '挑战杯': '44',
            '大学生创新创业大赛': '51', '双创大赛': '51',
            '创业计划书与路演展示': '52', '路演展示': '52', '创业计划书': '52', 'BP': '52',
            '三分钟电梯演讲': '53', '电梯演讲': '53', 'Pitch': '53',
            '答辩应对技巧': '54', '答辩技巧': '54'
        },

        /**
         * 智能解析输入的节点 ID 或中文名称 (支持带有前缀的 p42, cp41, k31, PBL-21 等)
         */
        resolveNodeId(nameOrId) {
            if (!nameOrId) return '11';
            const raw = String(nameOrId).replace(/\s+/g, '').replace(/[\(（\)\）]/g, '').trim();
            
            // 1. 纯数字 ID 直接匹配 (如 '11', '21')
            if (/^\d{2}$/.test(raw)) return raw;

            // 2. 提取带有字母前缀的节点编号 (如 'p42' -> '42', 'cp41' -> '41', 'pbl31' -> '31')
            const extractedNums = raw.replace(/[^0-9]/g, '');
            if (extractedNums && extractedNums.length >= 2) {
                const candidate = extractedNums.substring(0, 2);
                if (['11','12','13','21','22','23','24','31','32','33','34','41','42','43','44','51','52','53','54','61','62','63','64','65'].includes(candidate)) {
                    return candidate;
                }
                // 只有1位数时 (如 '9' -> '53', '4' -> '31')
                if (candidate === '1') return '11';
                if (candidate === '2') return '21';
                if (candidate === '3') return '31';
                if (candidate === '4') return '42';
                if (candidate === '5') return '52';
            }

            // 3. 映射表精确与包含匹配
            for (const key in this.nodeNameMap) {
                const cleanKey = key.replace(/\s+/g, '').replace(/[\(（\)\）]/g, '');
                if (raw === cleanKey || raw.includes(cleanKey) || cleanKey.includes(raw)) {
                    return this.nodeNameMap[key];
                }
            }

            // 4. 关键字打分兜底判定
            if (raw.includes('合伙人') || raw.includes('选择') || raw.includes('团队确权')) return '42';
            if (raw.includes('痛点') || raw.includes('商机') || raw.includes('JTBD')) return '21';
            if (raw.includes('发散') || raw.includes('SCAMPER') || raw.includes('奔驰')) return '12';
            if (raw.includes('特质') || raw.includes('生涯')) return '13';
            if (raw.includes('风暴') || raw.includes('头脑')) return '22';
            if (raw.includes('宏观') || raw.includes('保本')) return '23';
            if (raw.includes('画布') || raw.includes('BMC')) return '31';
            if (raw.includes('MVP') || raw.includes('原型')) return '33';
            if (raw.includes('团队') || raw.includes('股权')) return '41';
            if (raw.includes('大赛') || raw.includes('互联网+')) return '51';
            if (raw.includes('路演') || raw.includes('计划书') || raw.includes('BP')) return '52';
            if (raw.includes('演讲') || raw.includes('电梯')) return '53';
            if (raw.includes('答辩') || raw.includes('防御')) return '54';

            // 默认保底 11
            return '11';
        },

        /**
         * 启动霸屏大屏演播 Modal (支持中文节点名与 ID)
         */
        openPresentation(nodeId) {
            const mappedId = this.resolveNodeId(nodeId);
            this.currentNodeId = mappedId;

            // 统一全功能全景演播路径
            const deckUrl = `presentation.html?nodeId=${mappedId}`;

            this.renderFullscreenModal(deckUrl, mappedId, nodeId);
            this.bindKeyboardNav();
        },

        /**
         * 构建 z-index: 2147483647 的霸屏 iFrame 演播 Modal
         */
        renderFullscreenModal(deckUrl, mappedId, originalNodeId) {
            let modal = document.getElementById('touch-presentation-modal');
            if (!modal) {
                modal = document.createElement('div');
                modal.id = 'touch-presentation-modal';
                document.body.appendChild(modal);
            } else if (modal.parentNode !== document.body) {
                document.body.appendChild(modal);
            }

            modal.style.cssText = `
                display: flex !important;
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                bottom: 0 !important;
                width: 100vw !important;
                height: 100vh !important;
                z-index: 2147483647 !important;
                background: #050608 !important;
                color: #ffffff !important;
                overflow: hidden !important;
                box-sizing: border-box !important;
                pointer-events: auto !important;
            `;

            modal.innerHTML = `
                <div style="position:relative; width:100%; height:100%; display:flex; flex-direction:column;">
                    
                    <!-- 右上角极简浮动演播控制组件 (避免与 iframe 内部 Header 重叠遮挡) -->
                    <div style="position:absolute; top:12px; right:20px; z-index:2147483647; pointer-events:auto; display:flex; gap:10px; align-items:center; background:rgba(8,18,50,0.85); backdrop-filter:blur(16px); padding:6px 14px; border-radius:30px; border:1px solid rgba(0,194,224,0.4); box-shadow:0 8px 30px rgba(0,0,0,0.6);">
                        <button onclick="window.open('${deckUrl}', '_blank')" style="background:rgba(245,158,11,0.2); border:1px solid #fbbf24; color:#fbbf24; padding:5px 14px; border-radius:20px; font-size:12px; cursor:pointer; font-weight:800;" title="在新标签页独立打开演播">
                            <i class="fas fa-external-link-alt"></i> 独立窗口
                        </button>
                        <button onclick="window.IEKG.modules.presentation.closePresentation()" style="background:rgba(239,68,68,0.25); border:1px solid #ef4444; color:#ef4444; padding:5px 14px; border-radius:20px; font-size:12px; cursor:pointer; font-weight:800;" title="按 Esc 键退出演播">
                            <i class="fas fa-times"></i> 退出演播 (Esc)
                        </button>
                    </div>

                    <!-- 高清演播 iFrame 容器 -->
                    <iframe id="ppt-iframe-player" src="${deckUrl}" style="width:100%; height:100%; border:none; background:#050608;"></iframe>

                </div>
            `;
        },

        toggleFullscreen() {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(err => console.log(err));
            } else {
                if (document.exitFullscreen) document.exitFullscreen();
            }
        },

        closePresentation() {
            const modal = document.getElementById('touch-presentation-modal');
            if (modal) modal.style.display = 'none';
            this.unbindKeyboardNav();
        },

        keyboardHandler: null,
        bindKeyboardNav() {
            this.unbindKeyboardNav();
            this.keyboardHandler = (e) => {
                if (e.key === 'Escape') {
                    this.closePresentation();
                } else if (e.key === 'f' || e.key === 'F') {
                    this.toggleFullscreen();
                }
            };
            if (typeof window.addEventListener === 'function') {
                window.addEventListener('keydown', this.keyboardHandler);
            }
        },

        unbindKeyboardNav() {
            if (this.keyboardHandler && typeof window.removeEventListener === 'function') {
                window.removeEventListener('keydown', this.keyboardHandler);
                this.keyboardHandler = null;
            }
        }
    };

    // 挂载至命名空间 (干净无死循环引用)
    window.IEKG.modules.presentation = PresentationModule;

    // 全局别名代理
    window.openPresentation = function(nodeId) {
        PresentationModule.openPresentation(nodeId);
    };
    window.closePresentation = function() {
        PresentationModule.closePresentation();
    };
})();
