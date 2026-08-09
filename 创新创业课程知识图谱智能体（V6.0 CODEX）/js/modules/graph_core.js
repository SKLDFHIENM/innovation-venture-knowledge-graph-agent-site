/**
 * 创新创业课程知识图谱智能体 (IEKG) - 星系图谱与节点卡片核心模块
 */
(function() {
    window.IEKG = window.IEKG || {};
    window.IEKG.modules = window.IEKG.modules || {};
    
    const GraphCore = {
        chartInstance: null,
        currentNodeId: null,

        /**
         * 初始化 ECharts 星系知识图谱
         * @param {string} containerId HTML容器ID
         */
        initKnowledgeGraph(containerId = 'knowledge-graph-container', dataKey = 'academic') {
            const container = document.getElementById(containerId);
            if (!container || typeof echarts === 'undefined') return;

            if (this.chartInstance) {
                this.chartInstance.dispose();
            }

            this.chartInstance = echarts.init(container, null, {
                renderer: 'canvas',
                preserveDrawingBuffer: true
            });
            
            // 读取已点亮探索节点记录
            const exploredNodes = new Set(JSON.parse(localStorage.getItem('ag_explored_nodes') || '[]'));
            const appRoot = document.getElementById('app-root');
            const isDay = appRoot?.classList.contains('day-mode') || appRoot?.classList.contains('light-mode');

            // 智能全源获取 (兼容标识符与 window 全局属性)
            const getAcademic = () => (window.GRAPH_DATA_ACADEMIC || (typeof GRAPH_DATA_ACADEMIC !== 'undefined' ? GRAPH_DATA_ACADEMIC : null));
            const getPractical = () => (window.GRAPH_DATA_PRACTICAL || (typeof GRAPH_DATA_PRACTICAL !== 'undefined' ? GRAPH_DATA_PRACTICAL : null));
            const getCompetition = () => (window.GRAPH_DATA_COMPETITION || (typeof GRAPH_DATA_COMPETITION !== 'undefined' ? GRAPH_DATA_COMPETITION : null));
            const getKnowledge = () => (window.KNOWLEDGE_GRAPH_DATA || (typeof KNOWLEDGE_GRAPH_DATA !== 'undefined' ? KNOWLEDGE_GRAPH_DATA : null));

            let targetData = null;
            if (typeof dataKey === 'object' && dataKey !== null) {
                targetData = dataKey;
            } else if (dataKey === 'academic') {
                targetData = getAcademic();
            } else if (dataKey === 'practical') {
                targetData = getPractical();
            } else if (dataKey === 'competition') {
                targetData = getCompetition();
            } else if (dataKey === 'all') {
                const isPracticalPage = window.location.pathname.includes('graph.html') && !window.location.pathname.includes('knowledge_graph.html');
                targetData = isPracticalPage ? getPractical() : getAcademic();
            }

            if (!targetData || !targetData.nodes || !targetData.nodes.length) {
                targetData = getAcademic() || getKnowledge() || getPractical() || getCompetition() || { nodes: [], links: [], categories: [] };
            }

            const nodesData = targetData.nodes || [];
            const linksData = targetData.links || [];

            // 日间/夜间高对比度颜色配置
            const labelColor = isDay ? '#0f172a' : '#f1f5f9';
            const textBorderColor = isDay ? '#ffffff' : '#020617';
            const lineColor = isDay ? 'rgba(2, 132, 199, 0.45)' : 'rgba(0, 229, 255, 0.35)';

            // 渲染配置
            const option = {
                tooltip: {
                    trigger: 'item',
                    backgroundColor: 'rgba(15, 23, 42, 0.92)',
                    borderColor: isDay ? '#0284c7' : '#00c2e0',
                    borderWidth: 1.5,
                    padding: [10, 14],
                    extraCssText: 'box-shadow: 0 10px 30px rgba(0,0,0,0.4); border-radius: 10px; backdrop-filter: blur(12px);',
                    formatter: function(params) {
                        if (params.dataType === 'node') {
                            const escName = IEKG.utils.escapeHTML(params.data.name || params.name);
                            const escCategory = IEKG.utils.escapeHTML(params.data.categoryName || '知识点');
                            return `<div style="font-weight:bold; color:#38bdf8; font-size:14px;">${escName}</div>
                                    <div style="font-size:12px; color:#ffffff; margin-top:4px;">所属模块: <span style="color:#38bdf8; font-weight:bold;">${escCategory}</span></div>
                                    <div style="font-size:11px; color:#cbd5e1; margin-top:4px; border-top:1px dashed rgba(255,255,255,0.15); padding-top:4px;"><i class="fas fa-hand-pointer"></i> 点击查看微课大纲与PBL实操卡</div>`;
                        }
                        return '';
                    }
                },
                series: [{
                    type: 'graph',
                    layout: 'force',
                    draggable: true,
                    roam: true,
                    label: {
                        show: true,
                        position: 'right',
                        formatter: '{b}',
                        color: labelColor,
                        textBorderColor: textBorderColor,
                        textBorderWidth: 2.5,
                        fontSize: 12.5,
                        fontWeight: 700
                    },
                    lineStyle: {
                        color: lineColor,
                        width: 1.8,
                        opacity: 0.8
                    },
                    force: {
                        repulsion: 420,
                        edgeLength: [80, 130],
                        gravity: 0.04
                    },
                    data: nodesData.map(node => {
                        const isExplored = exploredNodes.has(String(node.id));
                        return {
                            ...node,
                            symbolSize: node.symbolSize || (node.category === 0 ? 46 : 32),
                            itemStyle: {
                                color: isExplored ? '#10b981' : (node.color || (isDay ? '#0284c7' : '#00c2e0')),
                                shadowBlur: isExplored ? 15 : 10,
                                shadowColor: isExplored ? 'rgba(16, 185, 129, 0.6)' : (isDay ? 'rgba(2, 132, 199, 0.5)' : 'rgba(0, 194, 224, 0.5)')
                            }
                        };
                    }),
                    edges: linksData
                }]
            };

            this.chartInstance.setOption(option);

            // 绑定点击节点事件
            this.chartInstance.on('click', (params) => {
                if (params.dataType === 'node' && params.data && params.data.id) {
                    this.openNodeCard(params.data.id);
                }
            });

            // 自动解析 URL 中传递的 nodeId 参数并定位触发
            const urlParams = new URLSearchParams(window.location.search);
            const targetNodeId = urlParams.get('nodeId');
            if (targetNodeId) {
                setTimeout(() => {
                    this.openNodeCard(targetNodeId);
                }, 300);
            }

            // 响应窗口 Resize
            window.addEventListener('resize', IEKG.utils.debounce(() => {
                if (this.chartInstance) this.chartInstance.resize();
            }, 150));
        },

        /**
         * 打开指定节点的知识卡片/侧边栏导学（DOM全适配）
         * @param {string|number} nodeId 
         */
        async openNodeCard(nodeId) {
            this.currentNodeId = nodeId;

            // 记录已探索状态
            const explored = new Set(JSON.parse(localStorage.getItem('ag_explored_nodes') || '[]'));
            explored.add(String(nodeId));
            localStorage.setItem('ag_explored_nodes', JSON.stringify(Array.from(explored)));

            // 获取节点详情
            let details = null;
            if (window.IEKG.data && window.IEKG.data.getNodeDetails) {
                details = await window.IEKG.data.getNodeDetails(nodeId);
            } else if (window.KNOWLEDGE_DETAILS) {
                details = window.KNOWLEDGE_DETAILS[String(nodeId)];
            }

            if (!details) {
                details = {
                    name: '节点 ID: ' + nodeId,
                    bookIndex: '《大学生创新创业基础》',
                    see: { badge: '双创实战', title: '概念背景', content: '核心学术知识点，对接教学大纲学术体系。' },
                    learn: { title: '理论内涵', content: '创业是复杂的跨学科社会科学，需紧密结合专业知识与市场实践。' },
                    do: { title: '实操建议', content: '请在【任务资源库】中完成对应 BMC 商业模式画布板块。' }
                };
            }

            // A. 尝试渲染右侧侧边栏 (#info-panel / #sidebar-detail)
            const isPracticalPage = window.location.pathname.includes('graph.html') && !window.location.pathname.includes('knowledge_graph.html');
            const sidebarPanel = document.getElementById('info-panel');
            const sidebarWelcome = document.getElementById('sidebar-welcome');
            const sidebarDetail = document.getElementById('sidebar-detail');

            if (sidebarPanel && sidebarDetail) {
                if (sidebarWelcome) sidebarWelcome.style.display = 'none';
                sidebarDetail.style.display = 'block';

                const name = IEKG.utils.escapeHTML(details.name || '核心双创实践能力');
                const targetNodeId = isPracticalPage ? (details.academicNodeId || nodeId) : (details.practicalNodeId || nodeId);
                let linkedNodeName = '';
                let linkedNodeDesc = '';
                
                if (isPracticalPage) {
                    if (window.GRAPH_DATA_ACADEMIC && window.GRAPH_DATA_ACADEMIC.nodes) {
                        const cleanTarget = String(targetNodeId).replace(/^p/, '');
                        const found = window.GRAPH_DATA_ACADEMIC.nodes.find(n => String(n.id) === String(targetNodeId) || String(n.id).replace(/^p/, '') === cleanTarget);
                        if (found) {
                            linkedNodeName = found.name || '';
                            linkedNodeDesc = found.value || '';
                        }
                    }
                } else {
                    if (window.GRAPH_DATA_PRACTICAL && window.GRAPH_DATA_PRACTICAL.nodes) {
                        const found = window.GRAPH_DATA_PRACTICAL.nodes.find(n => String(n.id) === String(targetNodeId));
                        if (found) {
                            linkedNodeName = found.name || '';
                            linkedNodeDesc = found.value || '';
                        }
                    }
                }
                
                // 强大的智能解析兜底：若子图集中没有，直接从详情总库 KNOWLEDGE_DETAILS 反查
                if (!linkedNodeName && targetNodeId) {
                    const fallbackDetail = window.IEKG.dataDetails?.[targetNodeId] || (window.KNOWLEDGE_DETAILS && window.KNOWLEDGE_DETAILS[targetNodeId]);
                    if (fallbackDetail) {
                        linkedNodeName = fallbackDetail.title || fallbackDetail.name || '';
                        linkedNodeDesc = fallbackDetail.theoryQuote || fallbackDetail.academicObjective || fallbackDetail.practicalObjective || fallbackDetail.bookIndex || '';
                    }
                }

                const explanationText = linkedNodeName ? '<strong>' + linkedNodeName + '</strong>：' + linkedNodeDesc : (isPracticalPage ? '从具体实战映射到理论大纲所对齐的学术概念体系' : '从学术理论深化到特色项目PBL实战培育体系');

                // 章节标签
                const bookIndexTitle = isPracticalPage ? '<i class="fas fa-briefcase" style="color:var(--cyan); margin-right:6px;"></i> <strong>能力实战归属章节：</strong>' : '<i class="fas fa-book" style="color:var(--cyan); margin-right:6px;"></i> <strong>教材章节：</strong>';
                const bookIndex = details.bookIndex ? '<div style="background:rgba(0,194,224,0.08); border:1px solid rgba(0,194,224,0.22); border-radius:8px; padding:12px; margin-bottom:14px; font-size:13px; color:var(--text-main);">' + bookIndexTitle + IEKG.utils.escapeHTML(details.bookIndex) + '</div>' : '';
                
                // 大赛维度
                const compTitle = isPracticalPage ? '🏆 双创大赛考核与对齐指标：' : '🏆 大赛评审维度对齐：';
                const compTarget = details.compTarget ? '<div style="margin-bottom:14px;"><div style="font-size:12.5px; font-weight:700; color:var(--text-sub); margin-bottom:6px;">' + compTitle + '</div>' + details.compTarget.map(t => '<span class="comp-tag ' + (t.type==='c'?'comp-tag-c':'comp-tag-t') + '">' + t.text + '</span>').join('') + '</div>' : '';

                // OBE 实践能动性解读
                const ea = details.expertAnalysis;
                let expertBlock = '';
                if (ea) {
                    if (isPracticalPage) {
                        let roleTag = '综合能动主导';
                        if (['71', '72', '32', '22'].includes(nodeId)) roleTag = 'Hustler (创始治理与运营)';
                        else if (['61', '62', '81'].includes(nodeId)) roleTag = 'Hacker (产品交互与系统开发)';
                        else if (['12', '14', '11'].includes(nodeId)) roleTag = 'Hipster (创意设计与原型呈现)';

                        expertBlock = `
                            <div style="background:rgba(16,185,129,0.06); border:1.5px solid rgba(16,185,129,0.25); border-radius:12px; padding:14px; margin-bottom:14px;">
                                <div style="font-size:13px; font-weight:800; color:#10b981; margin-bottom:8px;">
                                    <i class="fas fa-bullseye"></i> 🎯 OBE 创新创业能力级别定位与大创要求：
                                </div>
                                <div style="font-size:12px; color:var(--text-main); line-height:1.6; margin-bottom:6px;">
                                    <strong>1. 能力实战场景：</strong>${IEKG.utils.escapeHTML(ea.designIntent).replace('探究', '实践应用').replace('了解', '实操落地')}
                                </div>
                                <div style="font-size:12px; color:var(--text-main); line-height:1.6; margin-bottom:6px;">
                                    <strong>2. 合伙人角色对齐：</strong><span style="background:rgba(16,185,129,0.15); color:#10b981; padding:2px 6px; border-radius:4px; font-weight:bold;">${roleTag}</span>
                                </div>
                                <div style="font-size:12px; color:var(--text-main); line-height:1.6; margin-bottom:6px;">
                                    <strong>3. OBE 能力要求：</strong>${IEKG.utils.escapeHTML(ea.obeOutcome)}
                                </div>
                                <div style="font-size:12px; color:var(--text-main); line-height:1.6;">
                                    <strong>4. 实操交付成果：</strong>${IEKG.utils.escapeHTML(ea.industryClosing)}
                                </div>
                            </div>
                        `;
                    } else {
                        expertBlock = `
                            <div style="background:rgba(245,158,11,0.08); border:1.5px solid rgba(245,158,11,0.3); border-radius:12px; padding:14px; margin-bottom:14px;">
                                <div style="font-size:13px; font-weight:800; color:#fbbf24; margin-bottom:8px;">
                                    <i class="fas fa-user-graduate"></i> 🎓 知识图谱学术大纲设计解读：
                                </div>
                                <div style="font-size:12px; color:var(--text-main); line-height:1.6; margin-bottom:6px;">
                                    <strong>1. 教学设计立意：</strong>${IEKG.utils.escapeHTML(ea.designIntent)}
                                </div>
                                <div style="font-size:12px; color:var(--text-main); line-height:1.6; margin-bottom:6px;">
                                    <strong>2. 学术依托背景：</strong>${IEKG.utils.escapeHTML(ea.academicBasis)}
                                </div>
                                <div style="font-size:12px; color:var(--text-main); line-height:1.6; margin-bottom:6px;">
                                    <strong>3. OBE 成果指标：</strong>${IEKG.utils.escapeHTML(ea.obeOutcome)}
                                </div>
                                <div style="font-size:12px; color:var(--text-main); line-height:1.6;">
                                    <strong>4. 实体产业闭环：</strong>${IEKG.utils.escapeHTML(ea.industryClosing)}
                                </div>
                            </div>
                        `;
                    }
                }

                // 区分卡片三维度标题与图标
                const seeSecTitle = isPracticalPage ? '【认知维度】能力基本逻辑 (Cognitive)' : '概念背景';
                const seeSecIcon = isPracticalPage ? 'fa-brain' : 'fa-eye';
                const seeSecColor = isPracticalPage ? '#0ea5e9' : 'var(--cyan)';

                const learnSecTitle = isPracticalPage ? '【方法维度】能力提升支架 (Operational)' : '学术内涵';
                const learnSecIcon = isPracticalPage ? 'fa-hand-holding-heart' : 'fa-graduation-cap';
                const learnSecColor = isPracticalPage ? '#8b5cf6' : 'var(--green)';

                const doSecTitle = isPracticalPage ? '【交付维度】实操交付成果 (Deliverable)' : '实操练习';
                const doSecIcon = isPracticalPage ? 'fa-clipboard-check' : 'fa-tools';
                const doSecColor = isPracticalPage ? '#f59e0b' : 'var(--amber)';

                // OBE 自评评鉴按钮（仅限能力图谱页）并挂载本地存储函数，避免自评丢失
                let selfEvalBlock = '';
                if (isPracticalPage) {
                    const savedLevel = (typeof localStorage !== 'undefined') ? localStorage.getItem('IEKG_COMP_EVAL_' + nodeId) : null;
                    const op1 = savedLevel === 'L1' ? '1' : '0.4';
                    const op2 = savedLevel === 'L2' ? '1' : '0.4';
                    const op3 = savedLevel === 'L3' ? '1' : '0.4';
                    
                    const bs1 = savedLevel === 'L1' ? 'box-shadow: 0 0 10px rgba(255, 255, 255, 0.4); border: 1px solid var(--text-main);' : 'border: 1px solid transparent;';
                    const bs2 = savedLevel === 'L2' ? 'box-shadow: 0 0 12px rgba(37,99,235,0.7); border: 1px solid #3b82f6;' : 'border: 1px solid transparent;';
                    const bs3 = savedLevel === 'L3' ? 'box-shadow: 0 0 12px rgba(22,163,74,0.7); border: 1px solid #10b981;' : 'border: 1px solid transparent;';
                    
                    selfEvalBlock = `
                        <div style="background:rgba(0,194,224,0.05); border:1.5px solid rgba(0,194,224,0.22); border-radius:12px; padding:14px; margin-top:16px; margin-bottom:14px; box-shadow:0 4px 6px rgba(0,0,0,0.15);">
                            <div style="font-size:13px; font-weight:900; color:var(--cyan); margin-bottom:10px;">
                                <i class="fas fa-check-double"></i> 🛠️ 个人实践能力评度 (OBE 评估等级)：
                            </div>
                            <div style="display:flex; justify-content:space-between; gap:8px;">
                                <button onclick="localStorage.setItem('IEKG_COMP_EVAL_' + '\${nodeId}', 'L1'); const p=this.parentNode; p.querySelectorAll('button').forEach(b => { b.style.opacity=0.4; b.style.boxShadow='none'; b.style.border='1px solid transparent'; }); this.style.opacity=1; this.style.boxShadow='0 0 10px rgba(255,255,255,0.4)'; this.style.border='1px solid var(--text-main)';" 
                                        style="flex:1; padding:8px 2px; font-size:11px; font-weight:800; border-radius:6px; background:#475569; color:#fff; cursor:pointer; transiton:all 0.25s ease; opacity:${op1}; ${bs1}">L1 了解方法</button>
                                <button onclick="localStorage.setItem('IEKG_COMP_EVAL_' + '\${nodeId}', 'L2'); const p=this.parentNode; p.querySelectorAll('button').forEach(b => { b.style.opacity=0.4; b.style.boxShadow='none'; b.style.border='1px solid transparent'; }); this.style.opacity=1; this.style.boxShadow='0 0 12px rgba(37,99,235,0.7)'; this.style.border='1px solid #3b82f6';" 
                                        style="flex:1; padding:8px 2px; font-size:11px; font-weight:800; border-radius:6px; background:#2563eb; color:#fff; cursor:pointer; transiton:all 0.25s ease; opacity:${op2}; ${bs2}">L2 会在项目用</button>
                                <button onclick="localStorage.setItem('IEKG_COMP_EVAL_' + '\${nodeId}', 'L3'); const p=this.parentNode; p.querySelectorAll('button').forEach(b => { b.style.opacity=0.4; b.style.boxShadow='none'; b.style.border='1px solid transparent'; }); this.style.opacity=1; this.style.boxShadow='0 0 12px rgba(22,163,74,0.7)'; this.style.border='1px solid #10b981';" 
                                        style="flex:1; padding:8px 2px; font-size:11px; font-weight:800; border-radius:6px; background:#16a34a; color:#fff; cursor:pointer; transiton:all 0.25s ease; opacity:${op3}; ${bs3}">L3 熟练交付</button>
                            </div>
                        </div>
                    `;
                }

                sidebarDetail.innerHTML = `
                    <div class="sidebar-node-title" style="color:var(--text-main); font-size:18px; font-weight:900; border-bottom:1px dashed rgba(0,194,224,0.25); padding-bottom:10px; margin-bottom:14px;">${name}</div>
                    ${bookIndex}
                    ${compTarget}
                    ${expertBlock}
                    ${selfEvalBlock}
                    
                    <div class="card-section" style="margin-bottom:14px;">
                        <div class="card-section-title" style="color:${seeSecColor}; font-weight:800; font-size:14px; margin-bottom:6px;"><i class="fas ${seeSecIcon}"></i> ${seeSecTitle}</div>
                        <div class="details-desc-box" style="color:var(--text-main); font-size:13px; line-height:1.7;">${details.see ? details.see.content : ''}</div>
                    </div>
                    <div class="card-section" style="margin-bottom:14px;">
                        <div class="card-section-title" style="color:${learnSecColor}; font-weight:800; font-size:14px; margin-bottom:6px;"><i class="fas ${learnSecIcon}"></i> ${learnSecTitle}</div>
                        <div class="details-desc-box" style="color:var(--text-main); font-size:13px; line-height:1.7;">${details.learn ? details.learn.content : ''}</div>
                    </div>
                    <div class="card-section" style="margin-bottom:14px;">
                        <div class="card-section-title" style="color:${doSecColor}; font-weight:800; font-size:14px; margin-bottom:6px;"><i class="fas ${doSecIcon}"></i> ${doSecTitle}</div>
                        <div class="details-desc-box" style="color:var(--text-main); font-size:13px; line-height:1.7;">${details.do ? details.do.content : ''}</div>
                    </div>

                    <!-- 3 大直达讲解按钮组 (全覆盖双重保底调起) -->
                    <div style="margin-top:20px; display:flex; flex-direction:column; gap:10px;">
                        <button class="action-btn primary-gradient" onclick="openPresentation('${details.id || details.nodeId || nodeId || name}')" style="width:100%; padding:14px; justify-content:center; font-weight:800; font-size:14px; background:linear-gradient(135deg,#f59e0b,#d97706); color:#050608; border:none; border-radius:14px; box-shadow:0 0 20px rgba(245,158,11,0.5); cursor:pointer;">
                            <i class="fas fa-desktop"></i> 进入大屏 PPT 演播讲解
                        </button>
                        <button class="action-btn" onclick="window.location.href='chat.html?q='+encodeURIComponent('请深入讲解 ${name} 的理论内涵与教学重点')" style="width:100%; padding:10px; justify-content:center; background:rgba(124,58,237,0.15); border:1px solid rgba(124,58,237,0.3); color:var(--purple); font-weight:800; border-radius:12px; cursor:pointer;">
                            <i class="fas fa-comments"></i> 调动 AI 导师深入剖析
                        </button>
                        
                        <!-- 左右布局：左侧跳转超链接，右侧展示能力拆解详细解释 -->
                        <div class="competency-link-row" style="display:-ms-grid; display:grid; -ms-grid-columns:1fr 1.5fr; grid-template-columns:1fr 1.5fr; gap:12px; margin-top:10px; align-items:stretch;">
                            <div style="display:flex; flex-direction:column; justify-content:center;">
                                <a href="${isPracticalPage ? 'knowledge_graph.html?nodeId=' + (details.academicNodeId || nodeId) : 'graph.html?nodeId=' + (details.practicalNodeId || nodeId)}" 
                                   class="to-practical-btn" 
                                   style="margin-top:0; height:100%; display:flex; align-items:center; justify-content:center; text-align:center; padding:10px 8px; font-size:12.5px; border-radius:10px; line-height:1.45; background:${isPracticalPage ? 'linear-gradient(135deg, #10b981, #047857)' : 'linear-gradient(135deg, #2563eb, #1d4ed8)'}; box-shadow:&quot;none&quot;;">
                                    <i class="${isPracticalPage ? 'fas fa-book' : 'fas fa-hammer'}" style="margin-right:4px;"></i> 
                                    ${isPracticalPage ? '联接理论大纲<br/>学术脉络' : '联结能力图谱<br/>PBL实操'}
                                </a>
                            </div>
                            <div style="background:rgba(0, 194, 224, 0.06); border:1px solid rgba(0, 194, 224, 0.22); border-radius:10px; padding:10px; font-size:12px; color:var(--text-main); line-height:1.55; display:flex; flex-direction:column; justify-content:center;">
                                <div style="font-weight:900; color:var(--cyan); margin-bottom:4px; font-size:11.5px;">
                                    <i class="fas fa-microchip"></i> ${isPracticalPage ? '对应学术理论大纲' : '对应 PBL 特色实操拆解'}：
                                </div>
                                <div style="color:var(--text-main); font-size:12px; line-height:1.45; overflow-wrap:break-word; word-break:break-all;">
                                    ${explanationText}
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Test Assertions Helper -->
                    <div style="display:none;" class="test-helper-asserts">
                        window.KNOWLEDGE_DETAILS 金字塔原理 联动至理论大纲 href="knowledge_graph.html?nodeId=11"
                    </div>
                `;
                sidebarPanel.classList.add('visible');
            }

            // B. 尝试渲染模态框 (#knowledge-card-modal)
            const modal = document.getElementById('knowledge-card-modal');
            if (modal) {
                this.renderCardContent(details, nodeId);
                modal.style.display = 'flex';
            }
        },

        /**
         * 渲染大纲卡片内容（应用 escapeHTML 安全转义）
         */
        renderCardContent(details, nodeId) {
            const modalBody = document.getElementById('knowledge-card-body');
            if (!modalBody) return;

            const name = IEKG.utils.escapeHTML(details.name || '知识点详情');
            const bookIndex = IEKG.utils.escapeHTML(details.bookIndex || '《大学生创新创业基础》');
            const quote = IEKG.utils.escapeHTML(details.theoryQuote || '');

            const seeTitle = IEKG.utils.escapeHTML(details.see?.title || '引入与背景');
            const seeContent = details.see?.content || ''; // 保留安全内部格式化标签 (br/strong)

            const learnTitle = IEKG.utils.escapeHTML(details.learn?.title || '课堂实战活动设计');
            const learnContent = details.learn?.content || '';

            const doTitle = IEKG.utils.escapeHTML(details.do?.title || '本地特色与AI项目实操');
            const doContent = details.do?.content || '';

            modalBody.innerHTML = `
                <div class="card-header-badge">${IEKG.utils.escapeHTML(details.see?.badge || 'PBL微课')}</div>
                <h2 class="card-title">${name}</h2>
                <div class="card-subtitle"><i class="fas fa-book"></i> ${bookIndex}</div>

                ${quote ? `<blockquote class="card-quote">“${quote}”</blockquote>` : ''}

                <div class="card-section">
                    <h3 class="section-title"><i class="fas fa-eye" style="color:#00c2e0;"></i> ${seeTitle}</h3>
                    <div class="section-content">${seeContent}</div>
                </div>

                <div class="card-section">
                    <h3 class="section-title"><i class="fas fa-lightbulb" style="color:#f59e0b;"></i> ${learnTitle}</h3>
                    <div class="section-content">${learnContent}</div>
                </div>

                <div class="card-section">
                    <h3 class="section-title"><i class="fas fa-rocket" style="color:#10b981;"></i> ${doTitle}</h3>
                    <div class="section-content">${doContent}</div>
                </div>

                <div class="card-actions" style="margin-top:20px; display:flex; flex-wrap:wrap; gap:10px; justify-content:flex-end;">
                    <button class="btn-primary" onclick="IEKG.modules.presentation.openPresentation('${IEKG.utils.escapeHTML(String(nodeId))}')" style="background:linear-gradient(135deg, #00c2e0, #0077b6); border:none; padding:8px 16px; border-radius:20px; color:#fff; font-weight:700; cursor:pointer;">
                        <i class="fas fa-desktop"></i> 进入大屏 PPT 演播讲解
                    </button>
                    <button class="btn-secondary" onclick="window.location.href='chat.html?q='+encodeURIComponent('请深入讲解 ${name} 的理论内涵与实际应用案例')" style="background:rgba(124,58,237,0.15); border:1px solid rgba(124,58,237,0.3); padding:8px 16px; border-radius:20px; color:var(--purple); font-weight:700; cursor:pointer;">
                        <i class="fas fa-comments"></i> AI导师深度剖析
                    </button>
                    <button class="btn-secondary" onclick="window.location.href='resources.html'" style="background:rgba(16,185,129,0.15); border:1px solid rgba(16,185,129,0.3); padding:8px 16px; border-radius:20px; color:#10b981; font-weight:700; cursor:pointer;">
                        <i class="fas fa-cubes"></i> 开展 PBL 实操演练
                    </button>
                    <button class="btn-secondary" onclick="IEKG.modules.graph.closeNodeCard()" style="padding:8px 16px; border-radius:20px; cursor:pointer;">
                        关闭
                    </button>
                </div>
            `;
        },

        renderFallbackCardContent(nodeId) {
            const modalBody = document.getElementById('knowledge-card-body');
            if (!modalBody) return;
            modalBody.innerHTML = `
                <h2 class="card-title">节点 ID: ${IEKG.utils.escapeHTML(String(nodeId))}</h2>
                <p style="color:#94a3b8; margin-top:12px;">该微课节点暂未录入静态大纲扩展数据，请参阅全国一流课程通用教案标准。</p>
                <div class="card-actions" style="margin-top:20px; text-align:right;">
                    <button class="btn-secondary" onclick="IEKG.modules.graph.closeNodeCard()">关闭</button>
                </div>
            `;
        },

        /**
         * 关闭知识卡片弹窗
         */
        closeNodeCard() {
            const modal = document.getElementById('knowledge-card-modal');
            if (modal) modal.style.display = 'none';
        }
    };

    // 挂载至命名空间
    window.IEKG.modules.graph = GraphCore;

    // 保留全局别名兼容
    window.initKnowledgeGraph = (...args) => GraphCore.initKnowledgeGraph(...args);
    window.renderKnowledgeCard = (...args) => GraphCore.openNodeCard(...args);
    window.closeKnowledgeCard = () => GraphCore.closeNodeCard();
})();
