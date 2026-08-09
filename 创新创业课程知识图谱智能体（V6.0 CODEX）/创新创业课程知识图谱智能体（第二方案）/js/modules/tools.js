/**
 * 创新创业课程知识图谱智能体 (IEKG) - 双创工具箱与辅助功能模块
 * 包含 BMC（商业模式画布） 商业模式画布、股权出资计算器、OBE（成果导向教育） 雷达图与主题切换
 */
(function() {
    window.IEKG = window.IEKG || {};
    window.IEKG.modules = window.IEKG.modules || {};

    const ToolsModule = {
        /**
         * 自动填充预设 AI 模式 BMC（商业模式画布） 画布模板
         */
        autoFillBMCCanvas() {
            const presets = {
                'bmc-vp': 'AI+非遗文创智能高精建模与自动化排版系统，秒级产出3D打印纹样',
                'bmc-cs': '非遗文化馆、高校双创实验室、文创衍生品开发商与海外国潮爱好者',
                'bmc-ch': '微信小程序端 API 订阅、SaaS 网页工作台、高校产教融合路演展会',
                'bmc-cr': '算法模型微调定制、独家设计版权分润、社区开发者生态提成',
                'bmc-rs': 'API 接口订阅费、定制化企业级服务费、硬件3D文创衍生品销售收入',
                'bmc-kr': '独家非遗纹样向量数据库、自研 Diffusion 风格微调模型、跨学科开发团队',
                'bmc-ka': 'AIGC 模型微调训练、算法防伪标记嵌入、产学研赛事路演拓展',
                'bmc-kp': '本校非遗研究中心、本地3D打印供应链工厂、高校双创孵化基地',
                'bmc-cs-cost': 'GPU 算力服务器租赁费、模型 API 消耗、专利软件著作权申请费与团队出资'
            };

            for (const [id, val] of Object.entries(presets)) {
                const el = document.getElementById(id);
                if (el) el.value = val;
            }
        },

        clearBMCCanvas() {
            const ids = ['bmc-vp', 'bmc-cs', 'bmc-ch', 'bmc-cr', 'bmc-rs', 'bmc-kr', 'bmc-ka', 'bmc-kp', 'bmc-cs-cost'];
            ids.forEach(id => {
                const el = document.getElementById(id);
                if (el) el.value = '';
            });
        },

        /**
         * 导出学生全量学情档案 JSON 数据
         */
        exportStudentJSON() {
            const explored = JSON.parse(localStorage.getItem('ag_explored_nodes') || '[]');
            const lastQuizScore = parseInt(localStorage.getItem('ag_last_quiz_score') || '0');
            const activityCount = parseInt(localStorage.getItem('ag_activity_count') || '0');
            const theme = localStorage.getItem('ag_theme') || 'night';

            const reportData = {
                courseName: "《大学生创新创业基础》PBL金课",
                systemVersion: "v6.6 Refactored (2026.07.21)",
                exportTime: new Date().toLocaleString(),
                studentMetrics: {
                    exploredNodeCount: explored.length,
                    totalNodes: 18,
                    explorationRate: Math.round((explored.length / 18) * 100) + '%',
                    exploredNodesList: explored,
                    lastQuizScore: lastQuizScore,
                    activityCount: activityCount,
                    suggestedRegularScore: Math.min(100, Math.round(explored.length * 2.5 + activityCount * 5 + lastQuizScore * 0.4))
                },
                obeMetrics: typeof calculateOBEMetrics === 'function' ? calculateOBEMetrics() : [20, 20, 20, 20, 20, 20],
                themePreference: theme
            };

            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(reportData, null, 2));
            const downloadAnchor = document.createElement('a');
            downloadAnchor.setAttribute("href", dataStr);
            downloadAnchor.setAttribute("download", `双创金课_学情档案_${new Date().toISOString().slice(0, 10)}.json`);
            document.body.appendChild(downloadAnchor);
            downloadAnchor.click();
            downloadAnchor.remove();
        },

        /**
         * 打开可打印/下载的任课教师平时成绩学情诊断书 Modal
         */
        openStudentReportModal() {
            const explored = JSON.parse(localStorage.getItem('ag_explored_nodes') || '[]');
            const quizScore = parseInt(localStorage.getItem('ag_last_quiz_score') || '0');
            const actCount = parseInt(localStorage.getItem('ag_activity_count') || '0');
            
            // 折算建议平时分：图谱探索(最高45) + 闪电活动(最高15) + 综合测评(最高40)
            const nodeScore = Math.min(45, Math.round((explored.length / 18) * 45));
            const actScore = Math.min(15, actCount * 3);
            const examScore = Math.min(40, Math.round((quizScore / 100) * 40));
            const totalRegularScore = Math.min(100, nodeScore + actScore + examScore);

            let modal = document.getElementById('student-report-modal');
            if (!modal) {
                modal = document.createElement('div');
                modal.id = 'student-report-modal';
                modal.className = 'presentation-modal';
                document.body.appendChild(modal);
            }

            // 18 项节点清单状态
            const ALL_NODES = [
                { id: '11', name: '1.1 产业痛点资讯搜寻' }, { id: '12', name: '1.2 SCAMPER（奔驰法） 奔驰法发散' }, { id: '13', name: '1.3 同理心痛点地图构建' },
                { id: '21', name: '2.1 TAM/SAM/SOM（总体/可服务/可获得市场） 测算' }, { id: '22', name: '2.2 PEST（宏观环境分析） 宏观合规研判' }, { id: '23', name: '2.3 竞争 SWOT（态势分析） 四象限' }, { id: '24', name: '2.4 BEP（盈亏平衡点） 盈亏保本划线' },
                { id: '31', name: '3.1 精益 BMC（商业模式画布） 画布九要素' }, { id: '32', name: '3.2 MVP（最小可行产品） 极速原型构建' }, { id: '33', name: '3.3 用户 WTP（付费意愿） 意愿测试' }, { id: '34', name: '3.4 产品三层次五步迭代' },
                { id: '41', name: '4.1 铁三角分工与测评' }, { id: '42', name: '4.2 股权与控制权生命线' }, { id: '43', name: '4.3 Vesting（股权分期成熟机制） 动态成熟协议' },
                { id: '51', name: '5.1 鱼型 BP 十模块拼装' }, { id: '52', name: '5.2 路演 12 页与资本退出' }, { id: '53', name: '5.3 深度答辩防御答辩防御' }, { id: '54', name: '5.4 创业园免租与补贴申报' }
            ];

            const nodeGridHtml = ALL_NODES.map(n => {
                const done = explored.includes(n.id);
                return `
                    <div style="font-size:11px; padding:4px 8px; border-radius:6px; background:${done ? 'rgba(16,185,129,0.12)' : 'rgba(255,255,255,0.04)'}; border:1px solid ${done ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.1)'}; color:${done ? '#10b981' : '#94a3b8'}; display:flex; align-items:center; gap:4px;">
                        <i class="fas ${done ? 'fa-check-circle' : 'fa-circle'}"></i> ${n.name}
                    </div>
                `;
            }).join('');

            modal.style.display = 'flex';
            modal.innerHTML = `
                <div class="report-paper-container" style="background:#0f172a; border:1px solid rgba(0,194,224,0.3); border-radius:16px; width:90%; max-width:850px; max-height:90vh; overflow-y:auto; padding:30px; box-sizing:border-box; color:#e2e8f0; position:relative; box-shadow:0 20px 50px rgba(0,0,0,0.8);">
                    
                    <!-- 顶部关闭与操作工具条 -->
                    <div class="no-print" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:12px;">
                        <span style="font-size:13px; color:#00c2e0; font-weight:700;"><i class="fas fa-file-invoice"></i> 《大学生创新创业基础》学情评估诊断书</span>
                        <div style="display:flex; gap:10px;">
                            <button onclick="IEKG.modules.tools.printStudentReport()" style="background:#00c2e0; color:#0f172a; border:none; padding:6px 14px; border-radius:8px; font-weight:800; font-size:12.5px; cursor:pointer;"><i class="fas fa-print"></i> 打印 / 导出 PDF 诊断书</button>
                            <button onclick="IEKG.modules.tools.exportStudentJSON()" style="background:rgba(255,255,255,0.1); color:#fff; border:1px solid rgba(255,255,255,0.2); padding:6px 12px; border-radius:8px; font-size:12.5px; cursor:pointer;"><i class="fas fa-download"></i> 下载 JSON 档案</button>
                            <button onclick="document.getElementById('student-report-modal').style.display='none'" style="background:none; border:none; color:#94a3b8; font-size:18px; cursor:pointer; padding:0 6px;">✕</button>
                        </div>
                    </div>

                    <!-- 诊断书正文区域 -->
                    <div id="print-area">
                        <!-- 页眉 header -->
                        <div style="text-align:center; border-bottom:2px solid #00c2e0; padding-bottom:15px; margin-bottom:20px;">
                            <h2 style="margin:0 0 6px; font-size:22px; color:#fff; letter-spacing:1px;">《大学生创新创业基础》PBL金课 · 学情诊断评估报告</h2>
                            <p style="margin:0; font-size:12px; color:#94a3b8;">教育部“人工智能+”双创金课系统生成 · 生成时间：${new Date().toLocaleString()}</p>
                        </div>

                        <!-- 个人学情与平时成绩折算建议 -->
                        <div style="display:grid; grid-template-columns: 2fr 1fr; gap:15px; margin-bottom:20px; background:rgba(255,255,255,0.02); border:1px solid rgba(0,194,224,0.2); border-radius:12px; padding:18px;">
                            <div>
                                <h4 style="margin:0 0 10px; color:#00c2e0; font-size:14px;"><i class="fas fa-user-graduate"></i> 学生学情汇总明细</h4>
                                <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; font-size:12.5px; color:#cbd5e1;">
                                    <div>• 图谱任务节点完成：<strong style="color:#fff;">${explored.length} / 18 个 (${Math.round((explored.length/18)*100)}%)</strong></div>
                                    <div>• 随堂闪电活动参与：<strong style="color:#fff;">${actCount} 次</strong></div>
                                    <div>• 综合测评最近得分：<strong style="color:#f59e0b;">${quizScore > 0 ? quizScore + '分' : '暂未测试'}</strong></div>
                                    <div>• 学习环境：<strong style="color:#fff;">PBL项目制智能体 v6.6 Refactored (2026.07.21)</strong></div>
                                </div>
                            </div>
                            <div style="text-align:center; border-left:1px solid rgba(255,255,255,0.1); padding-left:15px; display:flex; flex-direction:column; justify-content:center;">
                                <span style="font-size:11px; color:#94a3b8;">建议平时成绩折算</span>
                                <div style="font-size:32px; font-weight:900; color:#10b981; line-height:1.2; margin:2px 0;">${totalRegularScore}<span style="font-size:14px;">分</span></div>
                                <span style="font-size:10px; color:#64748b;">(图谱30%+闪电30%+测评40%)</span>
                            </div>
                        </div>

                        <!-- 18 项实战任务完成状态清单 -->
                        <div style="margin-bottom:20px; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:16px;">
                            <h4 style="margin:0 0 10px; color:#fff; font-size:13.5px;"><i class="fas fa-tasks"></i> 18 项 PBL 实战大纲任务打卡清单 (${explored.length}/18)</h4>
                            <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap:6px;">
                                ${nodeGridHtml}
                            </div>
                        </div>

                        <!-- 导师评语与盖章留白 -->
                        <div style="display:grid; grid-template-columns: 2fr 1fr; gap:15px; margin-top:20px; border-top:1px dashed rgba(255,255,255,0.15); padding-top:16px;">
                            <div style="font-size:12px; color:#94a3b8; line-height:1.6;">
                                <strong style="color:#fff;">📌 导师系统评语：</strong><br>
                                该生在《大学生创新创业基础》PBL项目制学习中表现突出，成功完成了 ${explored.length} 项实战演练任务，并在闪电活动中展现了优秀的创新思维与动手能力。建议给予【${totalRegularScore >= 85 ? '优秀 (A)' : totalRegularScore >= 75 ? '良好 (B)' : '合格 (C)'}】评价！
                            </div>
                            <div style="border:1px dashed rgba(0,194,224,0.3); border-radius:8px; padding:10px; text-align:center; font-size:11px; color:#64748b; display:flex; flex-direction:column; justify-content:center;">
                                <span>任课教师审核签章处</span>
                                <div style="height:35px;"></div>
                                <span>日期：2026年___月___日</span>
                            </div>
                        </div>

                    </div>
                </div>
            `;
        },

        /**
         * 触发打印模式
         */
        printStudentReport() {
            window.print();
        },

        /**
         * 动态主题切换（日间/夜间模式）
         */
        toggleTheme() {
            const root = document.getElementById('app-root') || document.body;
            const body = document.body;
            const isDay = root.classList.contains('day-mode') || body.classList.contains('day-mode') || body.classList.contains('light-mode');
            
            if (isDay) {
                root.classList.remove('day-mode', 'light-mode');
                body.classList.remove('day-mode', 'light-mode');
                localStorage.setItem('ag_theme', 'night');
            } else {
                root.classList.add('day-mode');
                body.classList.add('day-mode');
                localStorage.setItem('ag_theme', 'day');
            }

            const newIsDay = !isDay;
            const btn = document.getElementById('theme-toggle-btn');
            if (btn) btn.textContent = newIsDay ? '☀️' : '🌙';

            if (typeof showToast === 'function') {
                showToast(newIsDay ? '☀️ 已切换至白天明亮高对比模式' : '🌙 已切换至夜间赛博霓虹模式');
            }

            // 触发图谱和雷达图主题更新
            if (window.IEKG && window.IEKG.modules && window.IEKG.modules.graph && window.IEKG.modules.graph.chartInstance) {
                window.IEKG.modules.graph.initKnowledgeGraph();
            }
            if (typeof window.initHomeOBERadar === 'function') {
                window.initHomeOBERadar();
            }
            if (typeof window.generateRadarChart === 'function') {
                window.generateRadarChart();
            }
        }
    };

    // 挂载至命名空间
    window.IEKG.modules.tools = ToolsModule;

    // 保留全局别名兼容
    window.autoFillBMCCanvas = () => ToolsModule.autoFillBMCCanvas();
    window.clearBMCCanvas = () => ToolsModule.clearBMCCanvas();
    window.toggleTheme = () => ToolsModule.toggleTheme();
    window.exportStudentJSON = () => ToolsModule.exportStudentJSON();
    window.openStudentReportModal = () => ToolsModule.openStudentReportModal();
    window.printStudentReport = () => ToolsModule.printStudentReport();
})();

