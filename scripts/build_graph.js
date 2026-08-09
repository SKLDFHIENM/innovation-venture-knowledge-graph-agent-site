const fs = require('fs');

const htmlContent = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OBE 实战能力图谱 - 创新创业课程知识图谱智能体</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        .graph-viewport {
            flex: 1 !important;
            min-width: 0 !important;
            height: 100% !important;
            position: relative !important;
            background: #090D16 !important;
        }
        #graph-canvas {
            width: 100% !important;
            height: 100% !important;
            min-height: 450px !important;
        }

        .info-sidebar {
            width: 340px !important;
            min-width: 320px !important;
            flex-shrink: 0 !important;
            height: 100% !important;
            background: #111827 !important;
            border-left: 1px solid rgba(255, 255, 255, 0.08) !important;
            display: flex !important;
            flex-direction: column !important;
            overflow-y: auto !important;
            word-break: break-word !important;
        }

        .modal-overlay, .gp-modal-overlay {
            position: fixed !important;
            top: 0 !important; left: 0 !important;
            width: 100vw !important; height: 100vh !important;
            background: rgba(11, 15, 25, 0.85) !important;
            backdrop-filter: blur(8px) !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            z-index: 9999 !important;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.25s ease;
            padding: 20px;
        }
        .modal-overlay.open, .gp-modal-overlay.open {
            opacity: 1 !important;
            pointer-events: auto !important;
        }
        .modal-content-box, .gp-modal {
            background: #111827 !important;
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
            border-radius: 12px !important;
            width: 90% !important;
            max-width: 680px !important;
            padding: 24px !important;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5) !important;
            color: #f8fafc !important;
            position: relative !important;
            word-break: break-word !important;
        }

        @media (max-width: 1024px) {
            #pane-graph { flex-direction: column !important; }
            .info-sidebar {
                position: fixed !important;
                right: 0 !important;
                top: 65px !important;
                bottom: 0 !important;
                width: 100% !important;
                max-width: 360px !important;
                z-index: 999 !important;
                box-shadow: -10px 0 30px rgba(0,0,0,0.5) !important;
                transform: translateX(-100%);
                transition: transform 0.3s ease;
            }
            .info-sidebar.visible {
                transform: translateX(0) !important;
            }
        }

        .score-bar-bg {
            background: rgba(255, 255, 255, 0.08);
            border-radius: 6px;
            height: 8px;
            width: 100%;
            overflow: hidden;
            margin-top: 4px;
        }
        .score-bar-fill {
            height: 100%;
            border-radius: 6px;
            transition: width 0.5s ease;
        }
        .skill-chip {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 11.5px;
            margin: 3px;
            cursor: pointer;
            border: 1px solid rgba(255, 255, 255, 0.12);
            background: rgba(255, 255, 255, 0.04);
            transition: all 0.2s ease;
        }
        .skill-chip:hover {
            border-color: #00f2fe;
            background: rgba(0, 242, 254, 0.15);
            color: #00f2fe;
        }
    </style>
</head>
<body id="app-root" class="dark-mode">

<!-- 动态粒子背景画布 -->
<canvas id="particles-canvas"></canvas>

<!-- 顶部导航 Header -->
<header class="global-navbar">
    <div class="nav-brand">
        <a href="index.html" style="display:flex; align-items:center; gap:10px; text-decoration:none; color:inherit;">
            <i class="fas fa-microchip logo-icon" style="color:#00f2fe; font-size:22px;"></i>
            <span class="brand-text" style="font-weight:900; font-size:17px; background:linear-gradient(135deg,#00f2fe,#4facfe); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">专创融合知识图谱智能体</span>
            <span class="version-badge" style="background:rgba(0,242,254,0.15); color:#00f2fe; border:1px solid rgba(0,242,254,0.3); font-size:10px; padding:1px 6px; border-radius:10px;">v6.6</span>
        </a>
    </div>

    <div class="header-tools">
        <nav>
            <a class="nav-item" href="index.html"><i class="fas fa-home"></i><span class="nav-text"> 首页</span></a>
            <a class="nav-item" href="map.html"><i class="fas fa-map-marked-alt"></i><span class="nav-text"> 课程地图</span></a>
            <a class="nav-item" href="knowledge_graph.html"><i class="fas fa-brain"></i><span class="nav-text"> 理论知识图谱</span></a>
            <a class="nav-item active" href="graph.html"><i class="fas fa-chart-radar"></i><span class="nav-text"> 实战能力图谱</span></a>
            <a class="nav-item" href="chat.html"><i class="fas fa-comments"></i><span class="nav-text"> AI导师</span></a>
            <a class="nav-item" href="activities.html"><i class="fas fa-bolt"></i><span class="nav-text"> 闪电活动</span></a>
            <a class="nav-item" href="resources.html"><i class="fas fa-cubes"></i><span class="nav-text"> 任务资源</span></a>
            <a class="nav-item" href="admin.html" style="color:#fbbf24; font-weight:800;"><i class="fas fa-user-tie"></i><span class="nav-text"> 教师控制台</span></a>
            <a class="nav-item" href="student.html"><i class="fas fa-user-graduate"></i><span class="nav-text"> 我的档案</span></a>
            <div class="nav-dropdown">
                <span class="nav-item nav-dropdown-trigger"><i class="fas fa-ellipsis-h"></i> 更多 ▾</span>
                <div class="nav-dropdown-menu">
                    <a href="glossary.html"><i class="fas fa-book"></i> 术语词典</a>
                    <a href="presentation.html"><i class="fas fa-desktop"></i> 大屏演示</a>
                    <a href="exam.html"><i class="fas fa-poll-h"></i> 综合测评</a>
                </div>
            </div>
        </nav>
        <button class="nav-search-trigger" onclick="openCmdKModal()" title="全站快捷搜索 (Ctrl + K)">
            <i class="fas fa-search"></i> <span>搜索...</span> <kbd>Ctrl K</kbd>
        </button>
        <button id="theme-toggle-btn" onclick="toggleTheme()" title="切换日夜主题">🌙</button>
    </div>
</header>

<main class="knowledge-main-viewport" style="display:flex; flex-direction:column; height:calc(100vh - 65px);">
    <!-- 顶部 Banner (与 knowledge_graph.html 对标区分) -->
    <div style="background:rgba(245, 158, 11, 0.08); border-bottom:1px solid rgba(245, 158, 11, 0.25); padding:8px 24px; display:flex; justify-content:space-between; align-items:center; flex-shrink:0; backdrop-filter:blur(10px);">
        <div style="font-size:12.5px; color:#e2e8f0; display:flex; align-items:center; gap:8px;">
            <span style="background:rgba(245, 158, 11, 0.2); color:#fbbf24; padding:2px 8px; border-radius:6px; font-weight:800; font-size:11px;"><i class="fas fa-chart-radar"></i> 能力域 (怎么做)</span>
            <span><strong>OBE 实战能力图谱 (大二通识版)：</strong>评估 6 大维度达标度，提供「警示提示 → 理论补修 → AI导师」轻量修复路径。</span>
        </div>
        <div style="display:flex; gap:10px; align-items:center;">
            <button onclick="window.print()" style="background:#2563eb; color:#fff; border:none; padding:4px 12px; border-radius:12px; font-size:12px; font-weight:800; cursor:pointer;">
                <i class="fas fa-file-pdf"></i> 📥 导出报告 (PDF)
            </button>
            <a href="knowledge_graph.html" style="background:rgba(0,242,254,0.15); border:1px solid #00f2fe; color:#00f2fe; padding:3px 12px; border-radius:12px; text-decoration:none; font-size:12px; font-weight:800;">
                <i class="fas fa-brain"></i> 切换至【📚 课程理论知识图谱】
            </a>
        </div>
    </div>

    <!-- 主体解耦区域 (对标 knowledge_graph.html pane-graph) -->
    <div class="view-pane active" id="pane-graph" style="flex:1; height:100%; display:flex;">
        
        <!-- 左侧/中间：雷达与技能拓扑画布 -->
        <div class="graph-viewport glass-panel" style="background:#090D16;">
            <!-- 科技网格背景 -->
            <div class="graph-bg-grid"></div>

            <!-- 视角选择器 -->
            <div class="graph-system-selector" style="background:rgba(19, 28, 46, 0.9); border:1px solid rgba(245, 158, 11, 0.4);">
                <i class="fas fa-layer-group" style="color:#fbbf24; font-size:14px;"></i>
                <label for="graph-select" style="color:#ffffff; font-weight:800; font-size:12.5px;">实战能力视角：</label>
                <select id="graph-select" onchange="switchCapabilityView(this.value)" style="background:#090D16; color:#ffffff; border:1px solid rgba(245, 158, 11, 0.4); border-radius:6px; padding:4px 8px;">
                    <option value="radar">📊 OBE 六维能力评估雷达 (胜任力层)</option>
                    <option value="pbl">🕸️ 18 项 PBL 实战技能拓扑 (技能层)</option>
                    <option value="benchmark">🏆 国金/省奖对标拓扑 (对标层)</option>
                </select>
            </div>

            <!-- 图谱搜索框 -->
            <div class="graph-search-wrap">
                <i class="fas fa-search graph-search-icon" style="color:#fbbf24;"></i>
                <input type="text" id="graph-search-input" placeholder="搜索 18 项 PBL 技能或 C1-C6 能力..." autocomplete="off" style="background:#131C2E; border:1px solid rgba(245, 158, 11, 0.4); color:#ffffff;">
                <div id="graph-search-results"></div>
            </div>

            <!-- 右下角控制面板 -->
            <div class="graph-controls" style="background:rgba(19,28,46,0.92); backdrop-filter:blur(16px); padding:6px 14px; border-radius:30px; border:1.5px solid rgba(245,158,11,0.4); box-shadow:0 8px 30px rgba(0,0,0,0.6); display:flex; gap:10px; align-items:center;">
                <button onclick="openExpertPanel()" style="background:rgba(245,158,11,0.2); border:1px solid #fbbf24; color:#fbbf24; padding:6px 12px; border-radius:20px; font-size:12px; font-weight:800; cursor:pointer; display:flex; align-items:center; gap:5px;" title="🎓 国家级双创实战示范课专家评审视角">
                    <i class="fas fa-user-graduate" style="font-size:14px;"></i> 专家视角
                </button>
                <button onclick="openCommandPalette()" style="background:rgba(0,242,254,0.15); border:1px solid rgba(0,242,254,0.4); color:#00f2fe; padding:6px 12px; border-radius:20px; font-size:12px; font-weight:800; cursor:pointer; display:flex; align-items:center; gap:5px;" title="⚡ Ctrl+K 专家命令罗盘">
                    <i class="fas fa-terminal" style="font-size:14px;"></i> ⚡ 罗盘 (Ctrl+K)
                </button>
                <button onclick="document.getElementById('info-panel').classList.toggle('visible')" style="background:rgba(59,130,246,0.2); border:1px solid #60a5fa; color:#60a5fa; padding:6px 12px; border-radius:20px; font-size:12px; font-weight:800; cursor:pointer; display:flex; align-items:center; gap:5px;" title="窄屏展开/收起能力诊断抽屉">
                    <i class="fas fa-bars" style="font-size:14px;"></i> ☰ 目录
                </button>
                <button onclick="resetCapabilityView()" style="background:rgba(52,211,153,0.15); border:1px solid rgba(52,211,153,0.4); color:#34d399; padding:6px 12px; border-radius:20px; font-size:12px; font-weight:800; cursor:pointer; display:flex; align-items:center; gap:5px;" title="重置图谱缩放与平移视图">
                    <i class="fas fa-crosshairs" style="font-size:14px;"></i> 🎯 重置
                </button>
                <button onclick="toggleFullscreen()" style="background:rgba(192,132,252,0.15); border:1px solid rgba(192,132,252,0.4); color:#c084fc; padding:6px 12px; border-radius:20px; font-size:12px; font-weight:800; cursor:pointer; display:flex; align-items:center; gap:5px;" title="全屏放映展示">
                    <i id="fullscreen-icon" class="fas fa-expand" style="font-size:14px;"></i> ⛶ 全屏
                </button>
            </div>

            <!-- 图例条 -->
            <div class="graph-legend-bar" style="background: rgba(19, 28, 46, 0.9); border: 1px solid rgba(245, 158, 11, 0.3); backdrop-filter: blur(10px);">
                <span style="color:#ffffff; font-size:11px; font-weight:800;">能力维度：</span>
                <span class="legend-item" style="color:#e2e8f0;"><span class="legend-dot" style="background:#34d399;"></span>C1 痛点洞察</span>
                <span class="legend-item" style="color:#e2e8f0;"><span class="legend-dot" style="background:#38bdf8;"></span>C2 MVP构建</span>
                <span class="legend-item" style="color:#e2e8f0;"><span class="legend-dot" style="background:#818cf8;"></span>C3 商业闭环</span>
                <span class="legend-item" style="color:#e2e8f0;"><span class="legend-dot" style="background:#c084fc;"></span>C4 答辩防御</span>
                <span class="legend-item" style="color:#e2e8f0;"><span class="legend-dot" style="background:#fbbf24;"></span>C5 股权治理</span>
                <span class="legend-item" style="color:#e2e8f0;"><span class="legend-dot" style="background:#f472b6;"></span>C6 政策落地</span>
            </div>

            <!-- ECharts 画布 -->
            <div id="graph-canvas"></div>
        </div>

        <!-- 右侧诊断与能力解析侧边栏 -->
        <aside class="info-sidebar glass-panel" id="info-panel" style="background:#131C2E; border-left:1px solid rgba(245,158,11,0.3); color:#ffffff;">
            <div class="sidebar-header" style="border-bottom:1px solid rgba(245,158,11,0.2); padding:16px 20px; display:flex; justify-content:space-between; align-items:center;">
                <h2 style="margin:0; font-size:17px; font-weight:800; color:#fbbf24; display:flex; align-items:center; gap:8px;">
                    <i class="fas fa-chart-radar" style="color:#fbbf24;"></i> 实战能力评估与诊断
                </h2>
                <button class="close-sidebar-btn" onclick="closeKnowledgeCard()" style="background:none; border:none; color:#94a3b8; cursor:pointer; font-size:16px;">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="sidebar-body" style="padding:20px;">
                <!-- 概览状态 -->
                <div class="sidebar-welcome-wrap" id="sidebar-welcome">
                    
                    <!-- C5 弱项警示卡 -->
                    <div style="background:rgba(245,158,11,0.12); border:1px solid rgba(245,158,11,0.3); border-radius:10px; padding:14px; margin-bottom:16px;">
                        <div style="font-size:13.5px; font-weight:800; color:#fbbf24; margin-bottom:6px; display:flex; align-items:center; gap:6px;">
                            <i class="fas fa-exclamation-triangle"></i> C5 团队领航与股权治理 (70分) 弱项提示
                        </div>
                        <div style="font-size:12px; color:#cbd5e1; line-height:1.5; margin-bottom:10px;">
                            合伙人股权分配与动态退股机制未达标。点击下方链接直接向 AI 导师提问定制规范合规协议。
                        </div>
                        <a href="chat.html?prompt=老师，我们是大二团队，合伙人没有出资全是技术，怎么设计退股回购协议才不会有矛盾？" style="display:inline-flex; align-items:center; gap:6px; background:linear-gradient(135deg,#fbbf24,#f59e0b); color:#090d16; padding:6px 12px; border-radius:6px; text-decoration:none; font-size:12px; font-weight:800;">
                            🤖 咨询 AI 导师退股风险防范 ➔
                        </a>
                    </div>

                    <!-- 六维达标度概览 -->
                    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:14px; margin-bottom:16px;">
                        <h4 style="margin:0 0 10px 0; font-size:13.5px; color:#00f2fe;">六维 OBE 能力达标度概览</h4>
                        
                        <div style="margin-bottom:10px;">
                            <div style="display:flex; justify-content:space-between; font-size:12px;">
                                <span>C1 痛点洞察力</span>
                                <strong style="color:#34d399;">88分 (达标)</strong>
                            </div>
                            <div class="score-bar-bg"><div class="score-bar-fill" style="width:88%; background:#34d399;"></div></div>
                        </div>

                        <div style="margin-bottom:10px;">
                            <div style="display:flex; justify-content:space-between; font-size:12px;">
                                <span>C2 MVP 构建力</span>
                                <strong style="color:#38bdf8;">75分 (达标)</strong>
                            </div>
                            <div class="score-bar-bg"><div class="score-bar-fill" style="width:75%; background:#38bdf8;"></div></div>
                        </div>

                        <div style="margin-bottom:10px;">
                            <div style="display:flex; justify-content:space-between; font-size:12px;">
                                <span>C3 商业模式闭环</span>
                                <strong style="color:#34d399;">92分 (优秀)</strong>
                            </div>
                            <div class="score-bar-bg"><div class="score-bar-fill" style="width:92%; background:#34d399;"></div></div>
                        </div>

                        <div style="margin-bottom:10px;">
                            <div style="display:flex; justify-content:space-between; font-size:12px;">
                                <span>C4 路演答辩防御</span>
                                <strong style="color:#c084fc;">82分 (达标)</strong>
                            </div>
                            <div class="score-bar-bg"><div class="score-bar-fill" style="width:82%; background:#c084fc;"></div></div>
                        </div>

                        <div style="margin-bottom:10px;">
                            <div style="display:flex; justify-content:space-between; font-size:12px; color:#fbbf24;">
                                <span>C5 团队与股权治理</span>
                                <strong>70分 (提示)</strong>
                            </div>
                            <div class="score-bar-bg"><div class="score-bar-fill" style="width:70%; background:#fbbf24;"></div></div>
                        </div>

                        <div>
                            <div style="display:flex; justify-content:space-between; font-size:12px;">
                                <span>C6 资金政策落地</span>
                                <strong style="color:#f472b6;">85分 (达标)</strong>
                            </div>
                            <div class="score-bar-bg"><div class="score-bar-fill" style="width:85%; background:#f472b6;"></div></div>
                        </div>
                    </div>

                    <!-- 18 项 PBL 实战技能节点 -->
                    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:14px;">
                        <h4 style="margin:0 0 10px 0; font-size:13.5px; color:#f8fafc;">18 项 PBL 实战技能节点</h4>
                        <div style="display:flex; flex-wrap:wrap; margin:-3px;">
                            <div class="skill-chip" onclick="selectSkillDetail('S01')">S01 痛点假说</div>
                            <div class="skill-chip" onclick="selectSkillDetail('S02')">S02 问卷与访谈</div>
                            <div class="skill-chip" onclick="selectSkillDetail('S03')">S03 竞品对比</div>
                            <div class="skill-chip" onclick="selectSkillDetail('S04')">S04 原型搭建</div>
                            <div class="skill-chip" onclick="selectSkillDetail('S05')">S05 测跑与留存</div>
                            <div class="skill-chip" onclick="selectSkillDetail('S06')">S06 成本核算</div>
                            <div class="skill-chip" onclick="selectSkillDetail('S07')">S07 BMC画布</div>
                            <div class="skill-chip" onclick="selectSkillDetail('S08')">S08 定价策略</div>
                            <div class="skill-chip" onclick="selectSkillDetail('S09')">S09 渠道推演</div>
                            <div class="skill-chip" onclick="selectSkillDetail('S10')">S10 Pitch Deck</div>
                            <div class="skill-chip" onclick="selectSkillDetail('S11')">S11 答辩Q&A</div>
                            <div class="skill-chip" onclick="selectSkillDetail('S12')">S12 视频Demo</div>
                            <div class="skill-chip" style="border-color:#fbbf24; color:#fbbf24;" onclick="selectSkillDetail('S13')">S13 股权结构 ⚠️</div>
                            <div class="skill-chip" onclick="selectSkillDetail('S14')">S14 团队分工</div>
                            <div class="skill-chip" onclick="selectSkillDetail('S15')">S15 激励契约</div>
                            <div class="skill-chip" onclick="selectSkillDetail('S16')">S16 补贴申请</div>
                            <div class="skill-chip" onclick="selectSkillDetail('S17')">S17 知识产权</div>
                            <div class="skill-chip" onclick="selectSkillDetail('S18')">S18 财税合规</div>
                        </div>
                    </div>

                </div>

                <!-- 动态详情渲染区 -->
                <div id="sidebar-detail" style="display:none;"></div>
            </div>
        </aside>
    </div>
</main>

<!-- 脚本引入 -->
<script src="js/echarts.min.js"></script>
<script src="js/data.js"></script>
<script src="js/data_details.js"></script>
<script src="js/app.js"></script>
<script src="js/modules/student_profile.js"></script>

<script>
// ── 18 项 PBL 实战技能与 C1-C6 能力完整数据集 ──
const CAPABILITY_DATA = {
    c1: {
        id: 'C1',
        name: 'C1 痛点洞察力',
        score: 88,
        status: '达标',
        color: '#34d399',
        desc: '对真实行业或校园场景痛点、真假需求辩析、目标用户精准画像的分析与验证能力。',
        standards: '教育部国家示范课标准：具备明确的真需求调研方法论与用户访谈验证记录。',
        skills: ['S01 痛点假说', 'S02 问卷与访谈', 'S03 竞品对比分析'],
        benchmark: '省奖/国奖对标：须包含不少于100份真实用户深度访谈样本及定量对比数据。',
        action: '已达到良好水平，建议补充长尾场景访谈以进一步巩固优势。',
        prompt: '老师，我想进一步提升C1痛点洞察力，如何从长尾用户场景提取高价值痛点？'
    },
    c2: {
        id: 'C2',
        name: 'C2 MVP 构建力',
        score: 75,
        status: '达标',
        color: '#38bdf8',
        desc: '使用低代码/无代码或轻量原型工具快速验证核心业务假设的敏捷开发与测跑能力。',
        standards: '教育部国家示范课标准：具备最小可行性产品(MVP)发布及留存数据测跑记录。',
        skills: ['S04 低代码原型', 'S05 测跑与留存', 'S06 基础成本核算'],
        benchmark: '省奖/国奖对标：必须展示MVP实际运行界面及初始种子用户留存曲线。',
        action: '当前达到中等达标线，建议补充MVP种子用户的留存与二次复购数据。',
        prompt: '老师，在没有开发团队的情况下，如何利用无代码工具快速构建可以测跑的MVP？'
    },
    c3: {
        id: 'C3',
        name: 'C3 商业模式闭环',
        score: 92,
        status: '优秀',
        color: '#818cf8',
        desc: '利用商业模式画布(BMC)设计清晰的成本结构、收入来源、渠道通路与价值主张的能力。',
        standards: '教育部国家示范课标准：能够完整绘制BMC九宫格并进行现金流收支平衡推导。',
        skills: ['S07 BMC九宫格', 'S08 阶梯定价策略', 'S09 渠道通路推演'],
        benchmark: '国奖对标标准：商业模式具备可扩展性与正向单位经济模型(Unit Economics)。',
        action: '表现优秀！具备冲刺创新创业大赛优秀奖的商业闭环完整度。',
        prompt: '老师，我们的商业模式BMC已经闭环，如何向竞赛评委阐述单位经济模型(UE)的可拓展性？'
    },
    c4: {
        id: 'C4',
        name: 'C4 路演答辩防御',
        score: 82,
        status: '达标',
        color: '#c084fc',
        desc: '制作高质量 Pitch Deck，应对评委质询、逻辑链条防御以及路演表达传达能力。',
        standards: '教育部国家示范课标准：演示文稿逻辑清晰，回答评委质询时不出现致命逻辑漏洞。',
        skills: ['S10 Pitch Deck', 'S11 评委答辩Q&A', 'S12 视频Demo制作'],
        benchmark: '省奖/国奖对标：能够针对竞品攻击、技术壁垒与财务真实性做出精准防御。',
        action: '达标状态。建议加强对评委常见陷阱问题（如技术门槛与抄袭防御）的模拟演练。',
        prompt: '老师，大赛路演答辩时，如果评委质疑“巨头如果抄你怎么办”，该如何完美应答？'
    },
    c5: {
        id: 'C5',
        name: 'C5 团队与股权治理',
        score: 70,
        status: '警示',
        color: '#fbbf24',
        desc: '团队跨学科分工、股权分配架构设计、动态退股机制与合伙人协议制定的治理能力。',
        standards: '教育部国家示范课标准：团队分工互补，具备规范的股权分配方案与风险隔离防范。',
        skills: ['S13 股权结构设计', 'S14 团队跨学科分工', 'S15 动态激励契约'],
        benchmark: '国奖对标标准：股权不均分、不出现平股陷阱，且具备完善的合伙人离职退股机制。',
        action: '⚠️ 弱项提醒：当前70分未达省奖推荐线。主要卡点在合伙人退股与技术股回购机制。',
        prompt: '老师，我们是大二团队，合伙人没有出资全是技术，怎么设计退股回购协议才不会有矛盾？'
    },
    c6: {
        id: 'C6',
        name: 'C6 资金政策落地',
        score: 85,
        status: '达标',
        color: '#f472b6',
        desc: '对接高校创业补贴、孵化器入驻、知识产权保护与财税合规操作的落地实施能力。',
        standards: '教育部国家示范课标准：了解高校及地方双创政策，能够完成基础知识产权申报。',
        skills: ['S16 双创补贴申请', 'S17 知识产权申报', 'S18 财税合规落地'],
        benchmark: '省奖/国奖对标：拥有至少1项已受理或授权的软件著作权/专利。',
        action: '达标表现良好，可配合校级孵化器进一步申请免租场地与创业补贴。',
        prompt: '老师，大学生创业团队申请学校孵化器场地和双创补贴需要准备哪些材料？'
    }
};

const SKILL_DETAILS = {
    S01: { name: 'S01 痛点假说', category: 'C1 痛点洞察力', desc: '提出可验证的行业/场景痛点假说。', detail: '基于用户真实场景，避免“伪需求”，构建假说-验证闭环。' },
    S02: { name: 'S02 问卷与访谈', category: 'C1 痛点洞察力', desc: '设计非诱导性问题并深入访谈。', detail: '获取用户真实行为数据而非口头承诺。' },
    S03: { name: 'S03 竞品对比分析', category: 'C1 痛点洞察力', desc: '多维度横向对比现存替代方案。', detail: '找到差异化切入点与性价比/效率壁垒。' },
    S04: { name: 'S04 低代码原型', category: 'C2 MVP 构建力', desc: '使用 Figma/墨刀/墨客等快速做交互原型。', detail: '以最低成本向种子用户展示核心价值流程。' },
    S05: { name: 'S05 测跑与留存', category: 'C2 MVP 构建力', desc: '投放种子用户并追踪次日/七日留存。', detail: '验证产品是否真正具备用户吸引力。' },
    S06: { name: 'S06 基础成本核算', category: 'C2 MVP 构建力', desc: '计算前期验证单用户获取成本(CAC)。', detail: '确保产品试错成本在可控预算内。' },
    S07: { name: 'S07 BMC九宫格', category: 'C3 商业模式闭环', desc: '梳理商业模式九大核心要素。', detail: '确保价值主张、客户关系与收入流高度协同。' },
    S08: { name: 'S08 阶梯定价策略', category: 'C3 商业模式闭环', desc: '设计免费增值(Freemium)或订阅制。', detail: '兼顾用户增长门槛与后期商业变现能力。' },
    S09: { name: 'S09 渠道通路推演', category: 'C3 商业模式闭环', desc: '规划自媒体、裂变与私域流量通路。', detail: '建立低成本持续获客机制。' },
    S10: { name: 'S10 Pitch Deck', category: 'C1-C4 综合', desc: '制作 10-15 页竞赛标准路演 PPT。', detail: '精炼语言，突出痛点、方案、壁垒与团队。' },
    S11: { name: 'S11 评委答辩Q&A', category: 'C4 路演答辩防御', desc: '准备预判题库与高频质询防御。', detail: '自信回答，数据说话，不规避核心弱点。' },
    S12: { name: 'S12 视频Demo制作', category: 'C4 路演答辩防御', desc: '制作 1 分钟产品核心功能实操视频。', detail: '直观证明产品真实存在且可用。' },
    S13: { name: 'S13 股权结构设计', category: 'C5 团队与股权治理', desc: '避免50:50平股，设立核心大股东。', detail: '防范后期决策死锁与合伙人决裂风险。' },
    S14: { name: 'S14 团队跨学科分工', category: 'C5 团队与股权治理', desc: '技术、商业、设计角色搭配。', detail: '形成能力互补的稳定三角色互补团队。' },
    S15: { name: 'S15 动态激励契约', category: 'C5 团队与股权治理', desc: '约定 4 年 Vesting 期与回购条文。', detail: '保障长期奉献者的公平回报。' },
    S16: { name: 'S16 双创补贴申请', category: 'C6 资金政策落地', desc: '梳理高校及地方大学生创业专项资金。', detail: '合规申请无偿资助与政策红利。' },
    S17: { name: 'S17 知识产权申报', category: 'C6 资金政策落地', desc: '申请软著、实用新型或发明专利。', detail: '建立法律层面的技术与品牌护城河。' },
    S18: { name: 'S18 财税合规落地', category: 'C6 资金政策落地', desc: '完成工商注册与基础对公账户办理。', detail: '保障合法合规合流经营。' }
};

let currentChart = null;
let currentView = 'radar';

function switchCapabilityView(view) {
    currentView = view;
    if (view === 'radar') {
        renderRadarView();
    } else if (view === 'pbl') {
        renderPBLView();
    } else if (view === 'benchmark') {
        renderBenchmarkView();
    }
}

function resetCapabilityView() {
    if (currentChart) {
        currentChart.dispatchAction({ type: 'restore' });
    }
    switchCapabilityView(currentView);
}

function renderRadarView() {
    const container = document.getElementById('graph-canvas');
    if (!container || typeof echarts === 'undefined') return;
    if (currentChart) currentChart.dispose();
    currentChart = echarts.init(container);

    const option = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                return '<div style="padding:6px; font-size:12px;">' +
                    '<strong>' + params.name + '</strong><br/>' +
                    'C1 痛点洞察: 88分<br/>' +
                    'C2 MVP构建: 75分<br/>' +
                    'C3 商业闭环: 92分<br/>' +
                    'C4 答辩防御: 82分<br/>' +
                    'C5 股权治理: 70分 ⚠️<br/>' +
                    'C6 政策落地: 85分' +
                    '</div>';
            }
        },
        legend: {
            bottom: '4%',
            textStyle: { color: '#cbd5e1', fontSize: 12 }
        },
        radar: {
            center: ['50%', '46%'],
            radius: '65%',
            indicator: [
                { name: 'C1 痛点洞察 (88分)', max: 100 },
                { name: 'C2 MVP构建 (75分)', max: 100 },
                { name: 'C3 商业闭环 (92分)', max: 100 },
                { name: 'C4 答辩防御 (82分)', max: 100 },
                { name: 'C5 股权治理 (70分)⚠️', max: 100 },
                { name: 'C6 政策落地 (85分)', max: 100 }
            ],
            axisName: { color: '#cbd5e1', fontSize: 12, fontWeight: 'bold' },
            splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } },
            splitArea: { show: true, areaStyle: { color: ['rgba(255,255,255,0.02)', 'rgba(255,255,255,0.05)'] } },
            axisLine: { lineStyle: { color: 'rgba(255,255,255,0.15)' } }
        },
        series: [{
            type: 'radar',
            data: [
                {
                    value: [88, 75, 92, 82, 70, 85],
                    name: '我的能力得分',
                    symbol: 'circle', symbolSize: 6,
                    itemStyle: { color: '#fbbf24' },
                    lineStyle: { color: '#fbbf24', width: 2.5 },
                    areaStyle: { color: 'rgba(245, 158, 11, 0.25)' }
                },
                {
                    value: [75, 75, 75, 75, 75, 75],
                    name: '75分 校/省铜奖达标线',
                    symbol: 'none',
                    lineStyle: { color: '#34d399', width: 1.5, type: 'dashed' }
                },
                {
                    value: [85, 85, 85, 85, 85, 85],
                    name: '85分 国奖对标标准',
                    symbol: 'none',
                    lineStyle: { color: '#00f2fe', width: 1.5, type: 'dashed' }
                }
            ]
        }]
    };

    currentChart.setOption(option);
    currentChart.on('click', function(params) {
        showRadarDimensionDetail('C5');
    });
}

function renderPBLView() {
    const container = document.getElementById('graph-canvas');
    if (!container || typeof echarts === 'undefined') return;
    if (currentChart) currentChart.dispose();
    currentChart = echarts.init(container);

    const nodes = [
        { id: 'C1', name: 'C1 痛点洞察', symbolSize: 45, itemStyle: { color: '#34d399' } },
        { id: 'C2', name: 'C2 MVP构建', symbolSize: 45, itemStyle: { color: '#38bdf8' } },
        { id: 'C3', name: 'C3 商业闭环', symbolSize: 45, itemStyle: { color: '#818cf8' } },
        { id: 'C4', name: 'C4 答辩防御', symbolSize: 45, itemStyle: { color: '#c084fc' } },
        { id: 'C5', name: 'C5 股权治理 ⚠️', symbolSize: 48, itemStyle: { color: '#fbbf24' } },
        { id: 'C6', name: 'C6 政策落地', symbolSize: 45, itemStyle: { color: '#f472b6' } }
    ];

    Object.keys(SKILL_DETAILS).forEach(key => {
        const item = SKILL_DETAILS[key];
        let color = '#94a3b8';
        if (key === 'S13') color = '#fbbf24';
        nodes.push({
            id: key,
            name: item.name,
            symbolSize: key === 'S13' ? 32 : 24,
            itemStyle: { color: color }
        });
    });

    const links = [
        { source: 'C1', target: 'S01' }, { source: 'C1', target: 'S02' }, { source: 'C1', target: 'S03' },
        { source: 'C2', target: 'S04' }, { source: 'C2', target: 'S05' }, { source: 'C2', target: 'S06' },
        { source: 'C3', target: 'S07' }, { source: 'C3', target: 'S08' }, { source: 'C3', target: 'S09' },
        { source: 'C4', target: 'S10' }, { source: 'C4', target: 'S11' }, { source: 'C4', target: 'S12' },
        { source: 'C5', target: 'S13' }, { source: 'C5', target: 'S14' }, { source: 'C5', target: 'S15' },
        { source: 'C6', target: 'S16' }, { source: 'C6', target: 'S17' }, { source: 'C6', target: 'S18' }
    ];

    const option = {
        backgroundColor: 'transparent',
        tooltip: {
            formatter: function(params) {
                if (SKILL_DETAILS[params.data.id]) {
                    const s = SKILL_DETAILS[params.data.id];
                    return '<strong>' + s.name + '</strong><br/>' + s.category + '<br/>' + s.desc;
                }
                return params.name;
            }
        },
        series: [{
            type: 'graph',
            layout: 'force',
            data: nodes,
            links: links,
            roam: true,
            label: { show: true, color: '#f8fafc', fontSize: 11 },
            force: { repulsion: 220, edgeLength: 90 },
            lineStyle: { color: 'rgba(255,255,255,0.2)', width: 1.5 }
        }]
    };

    currentChart.setOption(option);
    currentChart.on('click', function(params) {
        if (params.data && params.data.id) {
            if (params.data.id.startsWith('C')) {
                showRadarDimensionDetail(params.data.id.toLowerCase());
            } else if (SKILL_DETAILS[params.data.id]) {
                selectSkillDetail(params.data.id);
            }
        }
    });
}

function renderBenchmarkView() {
    const container = document.getElementById('graph-canvas');
    if (!container || typeof echarts === 'undefined') return;
    if (currentChart) currentChart.dispose();
    currentChart = echarts.init(container);

    const option = {
        backgroundColor: 'transparent',
        tooltip: { trigger: 'axis' },
        legend: { textStyle: { color: '#cbd5e1' }, top: '3%' },
        grid: { left: '8%', right: '5%', bottom: '10%', top: '15%' },
        xAxis: {
            type: 'category',
            data: ['C1 痛点', 'C2 MVP', 'C3 商业闭环', 'C4 答辩防御', 'C5 股权治理', 'C6 政策落地'],
            axisLabel: { color: '#cbd5e1' },
            axisLine: { lineStyle: { color: 'rgba(255,255,255,0.2)' } }
        },
        yAxis: {
            type: 'value',
            max: 100,
            axisLabel: { color: '#cbd5e1' },
            splitLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } }
        },
        series: [
            {
                name: '我的项目得分',
                type: 'bar',
                data: [88, 75, 92, 82, 70, 85],
                itemStyle: {
                    color: function(params) {
                        return params.dataIndex === 4 ? '#fbbf24' : '#00f2fe';
                    }
                },
                barWidth: '35%'
            },
            {
                name: '校/省铜奖门槛 (75分)',
                type: 'line',
                data: [75, 75, 75, 75, 75, 75],
                lineStyle: { color: '#34d399', type: 'dashed', width: 2 }
            },
            {
                name: '国奖对标标准 (85分)',
                type: 'line',
                data: [85, 85, 85, 85, 85, 85],
                lineStyle: { color: '#fbbf24', type: 'dashed', width: 2 }
            }
        ]
    };

    currentChart.setOption(option);
    currentChart.on('click', function(params) {
        const key = 'c' + (params.dataIndex + 1);
        showRadarDimensionDetail(key);
    });
}

function showRadarDimensionDetail(key) {
    const k = key.toLowerCase();
    const data = CAPABILITY_DATA[k] || CAPABILITY_DATA['c5'];

    document.getElementById('sidebar-welcome').style.display = 'none';
    const detailEl = document.getElementById('sidebar-detail');
    detailEl.style.display = 'block';

    detailEl.innerHTML = `
        <div style="border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:12px; margin-bottom:14px;">
            <span style="background:${data.color}; color:#090d16; font-size:11px; font-weight:900; padding:2px 8px; border-radius:4px;">${data.id} 评分: ${data.score}分 (${data.status})</span>
            <h3 style="margin:8px 0 4px 0; font-size:16px; color:#ffffff;">${data.name}</h3>
            <p style="margin:0; font-size:12.5px; color:#a1a1aa; line-height:1.6;">${data.desc}</p>
        </div>

        <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:12px; margin-bottom:12px;">
            <h4 style="margin:0 0 6px 0; font-size:12.5px; color:#00f2fe;">📜 国家示范课评测标准</h4>
            <p style="margin:0; font-size:12px; color:#cbd5e1; line-height:1.5;">${data.standards}</p>
        </div>

        <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:12px; margin-bottom:12px;">
            <h4 style="margin:0 0 6px 0; font-size:12.5px; color:#fbbf24;">🏆 省奖/国奖对标要求</h4>
            <p style="margin:0; font-size:12px; color:#cbd5e1; line-height:1.5;">${data.benchmark}</p>
        </div>

        <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:12px; margin-bottom:14px;">
            <h4 style="margin:0 0 6px 0; font-size:12.5px; color:#34d399;">🛠️ 建议提升路径</h4>
            <p style="margin:0; font-size:12px; color:#cbd5e1; line-height:1.5;">${data.action}</p>
        </div>

        <a href="chat.html?prompt=${encodeURIComponent(data.prompt)}" style="display:block; text-align:center; background:linear-gradient(135deg,#fbbf24,#f59e0b); color:#090d16; padding:10px; border-radius:8px; text-decoration:none; font-weight:800; font-size:12.5px;">
            🤖 向 AI 导师咨询该维度方案 ➔
        </a>
        <button onclick="closeKnowledgeCard()" style="margin-top:10px; width:100%; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#94a3b8; padding:8px; border-radius:6px; font-size:12px; cursor:pointer;">
            返回概览列表
        </button>
    `;
}

function selectSkillDetail(skillId) {
    const s = SKILL_DETAILS[skillId];
    if (!s) return;

    document.getElementById('sidebar-welcome').style.display = 'none';
    const detailEl = document.getElementById('sidebar-detail');
    detailEl.style.display = 'block';

    const prompt = '老师，我想了解关于【' + s.name + '】在项目中的实战落地方法。';

    detailEl.innerHTML = `
        <div style="border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:12px; margin-bottom:14px;">
            <span style="background:rgba(0,242,254,0.15); color:#00f2fe; border:1px solid rgba(0,242,254,0.3); font-size:11px; font-weight:800; padding:2px 8px; border-radius:4px;">${s.category}</span>
            <h3 style="margin:8px 0 4px 0; font-size:16px; color:#ffffff;">${s.name}</h3>
            <p style="margin:0; font-size:12.5px; color:#a1a1aa; line-height:1.6;">${s.desc}</p>
        </div>

        <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:12px; margin-bottom:14px;">
            <h4 style="margin:0 0 6px 0; font-size:12.5px; color:#fbbf24;">🔍 实战落地要点</h4>
            <p style="margin:0; font-size:12px; color:#cbd5e1; line-height:1.5;">${s.detail}</p>
        </div>

        <a href="chat.html?prompt=${encodeURIComponent(prompt)}" style="display:block; text-align:center; background:linear-gradient(135deg,#00f2fe,#4facfe); color:#090d16; padding:10px; border-radius:8px; text-decoration:none; font-weight:800; font-size:12.5px;">
            🤖 向 AI 导师咨询该技能 ➔
        </a>
        <button onclick="closeKnowledgeCard()" style="margin-top:10px; width:100%; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#94a3b8; padding:8px; border-radius:6px; font-size:12px; cursor:pointer;">
            返回概览列表
        </button>
    `;
}

function closeKnowledgeCard() {
    document.getElementById('sidebar-welcome').style.display = 'block';
    document.getElementById('sidebar-detail').style.display = 'none';
    const sidebar = document.getElementById('info-panel');
    if (sidebar) sidebar.classList.remove('visible');
}

// 搜索框自动补全与跳转
function setupSearch() {
    const input = document.getElementById('graph-search-input');
    const results = document.getElementById('graph-search-results');
    if (!input || !results) return;

    input.addEventListener('input', function() {
        const val = this.value.trim().toLowerCase();
        if (!val) {
            results.style.display = 'none';
            results.innerHTML = '';
            return;
        }

        const matchedSkills = Object.keys(SKILL_DETAILS).filter(key => {
            const item = SKILL_DETAILS[key];
            return item.name.toLowerCase().includes(val) || item.desc.toLowerCase().includes(val) || key.toLowerCase().includes(val);
        });

        const matchedCaps = Object.keys(CAPABILITY_DATA).filter(key => {
            const item = CAPABILITY_DATA[key];
            return item.name.toLowerCase().includes(val) || item.desc.toLowerCase().includes(val);
        });

        let html = '';
        matchedCaps.forEach(key => {
            const item = CAPABILITY_DATA[key];
            html += '<div style="padding:8px 12px; cursor:pointer; border-bottom:1px solid rgba(255,255,255,0.05); color:#fbbf24; font-size:12px;" onclick="showRadarDimensionDetail(\'' + key + '\'); clearSearchResults();">' +
                '<i class="fas fa-chart-radar"></i> ' + item.name + ' (' + item.score + '分)' +
                '</div>';
        });

        matchedSkills.forEach(key => {
            const item = SKILL_DETAILS[key];
            html += '<div style="padding:8px 12px; cursor:pointer; border-bottom:1px solid rgba(255,255,255,0.05); color:#cbd5e1; font-size:12px;" onclick="selectSkillDetail(\'' + key + '\'); clearSearchResults();">' +
                '<i class="fas fa-bolt"></i> ' + item.name + ' - <span style="color:#94a3b8;">' + item.category + '</span>' +
                '</div>';
        });

        if (html) {
            results.innerHTML = html;
            results.style.display = 'block';
        } else {
            results.innerHTML = '<div style="padding:10px; color:#94a3b8; font-size:12px;">未匹配到相关技能或能力</div>';
            results.style.display = 'block';
        }
    });
}

function clearSearchResults() {
    const input = document.getElementById('graph-search-input');
    const results = document.getElementById('graph-search-results');
    if (input) input.value = '';
    if (results) {
        results.style.display = 'none';
        results.innerHTML = '';
    }
}

window.addEventListener('DOMContentLoaded', function() {
    setTimeout(renderRadarView, 150);
    setupSearch();
    window.addEventListener('resize', function() {
        if (currentChart) currentChart.resize();
    });
});
</script>
</body>
</html>
`;

fs.writeFileSync('graph.html', htmlContent, 'utf8');
console.log('Successfully written graph.html, length:', htmlContent.length);
