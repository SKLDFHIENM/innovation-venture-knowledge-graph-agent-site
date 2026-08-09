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
                        repulsion: 240,
                        edgeLength: [70, 150],
                        gravity: 0.1
                    },
                    data: nodesData.map(node => {
                        const isExplored = exploredNodes.has(String(node.id));
                        const isAGI = node.isAIGenerated || (node.name && (node.name.includes('AI') || node.name.includes('MVP') || node.name.includes('AIGC') || node.name.includes('黑客')));
                        return {
                            ...node,
                            symbol: isAGI ? 'diamond' : 'circle',
                            symbolSize: node.symbolSize || (node.category === 0 ? 48 : 34),
                            itemStyle: {
                                color: isExplored ? '#10b981' : (node.color || (isDay ? '#0284c7' : '#00f2fe')),
                                shadowBlur: isExplored ? 25 : 18,
                                shadowColor: isExplored ? 'rgba(16, 185, 129, 0.7)' : (isDay ? 'rgba(2, 132, 199, 0.5)' : 'rgba(0, 242, 254, 0.6)')
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
                    
                    // 在 ECharts 星系图中定位高亮该节点
                    if (this.chartInstance && nodesData.length > 0) {
                        const cleanTarget = String(targetNodeId).replace(/[^0-9]/g, '');
                        const foundNode = nodesData.find(n => 
                            String(n.id) === String(targetNodeId) || 
                            String(n.id).replace(/[^0-9]/g, '') === cleanTarget ||
                            (n.name && n.name.includes(targetNodeId))
                        );
                        if (foundNode) {
                            this.chartInstance.dispatchAction({
                                type: 'highlight',
                                name: foundNode.name
                            });
                        }
                    }
                }, 300);
            }

            // 响应窗口 Resize
            window.addEventListener('resize', IEKG.utils.debounce(() => {
                if (this.chartInstance) this.chartInstance.resize();
            }, 150));
        },

        /**
         * 智能寻找节点详情对象 (强力多重容错与精准ID/名称防混淆解算)
         */
        resolveDetails(nodeId, nodeObj) {
            if (!nodeId && !nodeObj) return null;
            
            const strId = String(nodeId || (nodeObj ? nodeObj.id : '')).trim();
            const nodeName = nodeObj ? nodeObj.name : (typeof nodeId === 'object' ? nodeId.name : '');
            const kd = window.KNOWLEDGE_DETAILS || {};

            // 1. 【核心第一优先级】优先按节点的真实名称 nodeName 去 KNOWLEDGE_DETAILS 做精准/清洗后文本对齐
            if (nodeName) {
                const cleanInputName = String(nodeName).replace(/[\(（\)\）\s]/g, '').replace(/（最小可行产品）/g, '').replace(/\(Pitch\)/g, '').toLowerCase();
                for (const k in kd) {
                    if (kd[k] && kd[k].name) {
                        const cleanItemName = String(kd[k].name).replace(/[\(（\)\）\s]/g, '').replace(/（最小可行产品）/g, '').replace(/\(Pitch\)/g, '').toLowerCase();
                        if (cleanInputName === cleanItemName || cleanInputName.includes(cleanItemName) || cleanItemName.includes(cleanInputName)) {
                            return { ...kd[k], id: k };
                        }
                    }
                }
            }

            // 2. ID 完全 100% 相同 (例如 "c31", "L6", "p42")
            if (kd[strId]) return { ...kd[strId], id: strId };

            // 3. 特殊扩展节点映射表 (专门精准对齐 c31, c32, c41, c42, p31 等大赛/实践衍生节点)
            const customMap = {
                'c31': '52', // AI 辅助 BP 撰写 -> 52 (创业计划书与路演展示)
                'c32': '53', // 三分钟电梯演讲 -> 53 (三分钟电梯演讲)
                'c41': '52', // 路演 PPT 视觉设计 -> 52
                'c42': '54', // 答辩应对技巧 -> 54
                'p31': '24', // 数据驱动痛点分析 -> 24
                'p42': '42', // 微型团队代理人挑战 -> 42
                'p43': '43', // 技术与出路能效分析 -> 43
                'c22': '41', // 团队协同管理 -> 41
                '61': '33',  // 原型开发 -> 33
                '62': '33',  // 精益 MVP -> 33
                '71': '41',  // 动态股权分配 -> 41
                '72': '42',  // 股权分期成熟 -> 42
                '81': '23',  // 财务预算 -> 23
                '82': '54',  // 模拟谈判 -> 54
                '91': '52',  // BP商业大纲 -> 52
                '92': '53'   // 黄金电梯路演 -> 53
            };

            if (customMap[strId] && kd[customMap[strId]]) {
                return { ...kd[customMap[strId]], id: strId };
            }

            // 4. 名称包含关系模糊匹配
            for (const k in kd) {
                const item = kd[k];
                if (item && item.name && (item.name.includes(strId) || strId.includes(item.name))) {
                    return { ...item, id: k };
                }
            }

            // 5. 只有在上述匹配都失效时，才使用剔除字母后的数字匹配 (排除容易混淆的特定衍生 ID)
            const cleanId = strId.replace(/[^0-9]/g, '');
            if (cleanId && kd[cleanId] && !['c31','c32','c41','c42','p31','p42'].includes(strId)) {
                return { ...kd[cleanId], id: cleanId };
            }

            return null;
        },

        /**
         * 打开指定节点的知识卡片/侧边栏导学（DOM全适配）
         * @param {string|number|object} nodeId 
         * @param {object} [nodeObj]
         */
        async openNodeCard(nodeId, nodeObj) {
            this.currentNodeId = typeof nodeId === 'object' ? (nodeId.id || nodeId.name) : nodeId;

            // 记录已探索状态
            const explored = new Set(JSON.parse(localStorage.getItem('ag_explored_nodes') || '[]'));
            explored.add(String(this.currentNodeId));
            localStorage.setItem('ag_explored_nodes', JSON.stringify(Array.from(explored)));

            // 获取节点详情
            let details = this.resolveDetails(nodeId, nodeObj);
            if (!details && window.IEKG.data && window.IEKG.data.getNodeDetails) {
                details = await window.IEKG.data.getNodeDetails(nodeId);
            }

            if (!details) {
                details = {
                    id: nodeId,
                    name: '双创项目节点 #' + nodeId,
                    bookIndex: '《大学生创新创业基础》· 实战大纲',
                    see: { badge: '双创实战', title: '概念背景与需求引入', content: '对应双创教学大纲中的核心实践环节，引导学生进行小组敏捷迭代。' },
                    learn: { title: '理论内涵与方法', content: '创业是复杂的跨学科社会科学实践，需紧密结合专业知识与市场需求验证。' },
                    do: { title: '实操步骤与建议', content: '请在【任务资源库】中协同团队完成对应的项目模式画布与实操演练。' }
                };
            }

            // A. 尝试渲染右侧侧边栏 (#info-panel / #sidebar-detail)
            const sidebarPanel = document.getElementById('info-panel');
            const sidebarWelcome = document.getElementById('sidebar-welcome');
            const sidebarDetail = document.getElementById('sidebar-detail');

            if (sidebarPanel && sidebarDetail) {
                if (sidebarWelcome) sidebarWelcome.style.display = 'none';
                sidebarDetail.style.display = 'block';

                const name = IEKG.utils.escapeHTML(details.name || '知识点');
                const bookIndex = details.bookIndex ? `<div style="background:rgba(0,194,224,0.1); border:1px solid rgba(0,194,224,0.25); border-radius:8px; padding:12px; margin-bottom:14px; font-size:13px; color:var(--text-main);"><i class="fas fa-book" style="color:var(--cyan); margin-right:6px;"></i> <strong>教材章节：</strong>${IEKG.utils.escapeHTML(details.bookIndex)}</div>` : '';
                const compTarget = details.compTarget ? `
                    <div style="margin-bottom:14px;">
                        <div style="font-size:12.5px; font-weight:700; color:var(--text-sub); margin-bottom:6px;"><i class="fas fa-trophy" style="color:var(--accent); margin-right:6px;"></i> <strong>大赛评审维度对齐：</strong></div>
                        ${details.compTarget.map(t => `<span class="comp-tag ${t.type==='c'?'comp-tag-c':'comp-tag-t'}">${t.text}</span>`).join('')}
                    </div>
                ` : '';

                const ea = details.expertAnalysis;
                const expertBlock = ea ? `
                    <div style="background:rgba(245,158,11,0.08); border:1.5px solid rgba(245,158,11,0.3); border-radius:12px; padding:14px; margin-bottom:14px;">
                        <div style="font-size:13px; font-weight:800; color:#fbbf24; margin-bottom:8px;"><i class="fas fa-user-graduate"></i> 🎯 知识图谱末端节点专家设计解读：</div>
                        <div style="font-size:12px; color:var(--text-main); line-height:1.6; margin-bottom:6px;"><strong>1. 教学设计立意：</strong>${IEKG.utils.escapeHTML(ea.designIntent)}</div>
                        <div style="font-size:12px; color:var(--text-main); line-height:1.6; margin-bottom:6px;"><strong>2. 学术依托：</strong>${IEKG.utils.escapeHTML(ea.academicBasis)}</div>
                        <div style="font-size:12px; color:var(--text-main); line-height:1.6; margin-bottom:6px;"><strong>3. OBE 成果指标：</strong>${IEKG.utils.escapeHTML(ea.obeOutcome)}</div>
                        <div style="font-size:12px; color:var(--text-main); line-height:1.6;"><strong>4. 实体产业闭环：</strong>${IEKG.utils.escapeHTML(ea.industryClosing)}</div>
                    </div>
                ` : '';

                const safeNodeId = String(details.id || details.practicalNodeId || nodeId || '11').replace(/[^a-zA-Z0-9]/g, '') || '11';

                const isAGINode = name.includes('AI') || name.includes('MVP') || name.includes('AIGC') || name.includes('黑客');

                sidebarDetail.innerHTML = `
                    <div style="margin-bottom:12px;">
                        <span style="font-size:11px; background:${isAGINode?'rgba(0,242,254,0.15)':'rgba(245,158,11,0.15)'}; color:${isAGINode?'#00f2fe':'#fbbf24'}; padding:2px 8px; border-radius:6px; font-weight:800;">
                            ${isAGINode ? '◆ 2026 AGI 数字前沿节点' : '● 教育部《基本要求》经典理论'}
                        </span>
                    </div>

                    <div style="color:var(--text-main); font-size:19px; font-weight:900; line-height:1.35; margin-bottom:14px; border-bottom:1px dashed rgba(0,194,224,0.25); padding-bottom:10px;">
                        ${name}
                    </div>

                    <!-- 1. 标准定义与考纲出处 (顶部) -->
                    <div style="background:rgba(0,194,224,0.08); border:1px solid rgba(0,194,224,0.25); border-radius:12px; padding:14px; margin-bottom:14px;">
                        <div style="font-size:13px; font-weight:800; color:#00f2fe; margin-bottom:6px;">
                            <i class="fas fa-book-bookmark"></i> 1. 标准定义与考纲出处
                        </div>
                        <div style="font-size:12.5px; color:var(--text-main); line-height:1.6;">
                            <strong>对应大纲：</strong>${IEKG.utils.escapeHTML(details.bookIndex || '教育部《基本要求》· 第二模块 创业机会识别')}<br>
                            <strong>考纲定位：</strong><span style="color:#fbbf24; font-weight:800;">支撑毕业要求指标点 2.1：具备复杂工程/商业痛点识别与敏捷验证能力</span>
                        </div>
                    </div>

                    <!-- 2. 2026 产业实战场景映射 (核心区) -->
                    <div style="background:rgba(16,185,129,0.08); border:1px solid rgba(16,185,129,0.25); border-radius:12px; padding:14px; margin-bottom:14px;">
                        <div style="font-size:13px; font-weight:800; color:#10b981; margin-bottom:6px;">
                            <i class="fas fa-robot"></i> 2. 2026 产业实战场景映射 (AGI 赋能)
                        </div>
                        <div style="font-size:12.5px; color:var(--text-main); line-height:1.6;">
                            本知识点已结合大模型数据分析技术，要求学生不再依赖主观推测，而是通过系统内置爬虫完成 500 条真实客诉情感分析与痛点挖掘。
                        </div>
                    </div>

                    <!-- 3. 赛事考核与评估指标 (评估区) -->
                    <div style="background:rgba(245,158,11,0.08); border:1px solid rgba(245,158,11,0.25); border-radius:12px; padding:14px; margin-bottom:14px;">
                        <div style="font-size:13px; font-weight:800; color:#fbbf24; margin-bottom:6px;">
                            <i class="fas fa-trophy"></i> 3. 赛事考核与评估指标
                        </div>
                        <div style="font-size:12.5px; color:var(--text-main); line-height:1.6;">
                            <strong>国赛评审权重：</strong>高教主赛道 15% · 红旅赛道 20%<br>
                            <strong>期末综合测评：</strong>主观论述必考项与商业计划书 (BP) 核心评分点
                        </div>
                    </div>

                    <!-- 4. 一键直达操作区 (底部按钮组) -->
                    <div style="display:flex; flex-direction:column; gap:10px;">
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                            <button onclick="downloadResourceFile('m1-1')" style="background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.2); color:#ffffff; padding:10px; border-radius:10px; font-size:12px; font-weight:800; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:6px;">
                                <i class="fas fa-file-pdf" style="color:#ef4444;"></i> 📄 查阅标准理论教案
                            </button>
                            <button onclick="window.location.href='resources.html';" style="background:rgba(0,242,254,0.15); border:1px solid rgba(0,242,254,0.4); color:#00f2fe; padding:10px; border-radius:10px; font-size:12px; font-weight:800; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:6px;">
                                <i class="fas fa-rocket"></i> 🚀 进入 PBL 实战任务
                            </button>
                        </div>
                        <button onclick="window.location.href='presentation.html?nodeId=${safeNodeId}';" style="width:100%; padding:14px; background:linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color:#050b18; font-size:14.5px; font-weight:900; border:none; border-radius:14px; cursor:pointer; box-shadow:0 8px 25px rgba(0,242,254,0.4); display:flex; align-items:center; justify-content:center; gap:8px;">
                            <i class="fas fa-desktop"></i> 🖥️ 将此节点投屏演播
                        </button>
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
                    <button class="btn-primary" onclick="if(window.openPresentation){window.openPresentation('${String(nodeId).replace(/[^a-zA-Z0-9]/g,'')}');}else{window.location.href='presentation.html?nodeId=${String(nodeId).replace(/[^a-zA-Z0-9]/g,'')}';}" style="background:linear-gradient(135deg, #00c2e0, #0077b6); border:none; padding:8px 16px; border-radius:20px; color:#fff; font-weight:700; cursor:pointer;">
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
