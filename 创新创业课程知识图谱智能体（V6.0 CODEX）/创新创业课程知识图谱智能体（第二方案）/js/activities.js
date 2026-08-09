/**
 * 创新创业课程知识图谱智能体 · 24 个 45分钟启发微课闪电活动中心
 * 覆盖：团队搭建、痛点发散、商业模式、市场可行、精益验证、大赛答辩 6 大模块
 * 均装备【活动规则】与【老师/学生/小组】3 角色标准化操作流程看板
 */

(function(window) {
    'use strict';

    window.ACTIVITIES_DATA = [
        // ── 模块 1：团队搭建与创业者特质 ──
        {
            id: 'wordchain',
            category: 'team',
            categoryName: '团队搭建',
            title: '闪电团队技能匹配接龙',
            time: '10分钟',
            pblNode: '#11 团队构建与技能互补',
            badge: '⚡ 限时互动接龙',
            desc: '在 10 分钟内完成小组成员跨学科技能清单盘点与角色补位接龙。',
            rules: '1. 每位成员轮流列出 1 项核心硬核技能与 1 项软实力短板；2. 队长负责将技能填入互补矩阵；3. 最终形成完整跨学科项目组。',
            workflows: {
                teacher: '公布接龙规则 ➔ 启动 10 分钟倒计时 ➔ 巡视各组互补性 ➔ 点评典型团队组合',
                student: '个人自我盘点 ➔ 依次在看板上发布技能词 ➔ 认领项目职责角色 ➔ 确认补位策略',
                group: '创建团队看板 ➔ 整理硬核/软实力分布 ➔ 标记短板盲区 ➔ 提交小组技能图谱'
            },
            type: 'wordchain'
        },
        {
            id: 'founder-profile',
            category: 'team',
            categoryName: '团队搭建',
            title: '创业者九型人格与自我认知自测',
            time: '15分钟',
            pblNode: '#11 创业特质与自我评估',
            badge: '👤 创始人画像',
            desc: '自测创始人领导力风格，识别团队中的“开拓者、分析师与执行官”。',
            rules: '1. 快速完成 6 道创业特质倾向单选题；2. 计算得分定位九型风格；3. 匹配最佳 C-Level 岗位。',
            workflows: {
                teacher: '讲解三类创始人经典案例 ➔ 发起问卷自测 ➔ 分析团队角色失衡风险',
                student: '独立完成倾向答题 ➔ 生成个人能力雷达 ➔ 与组员比对特质重叠度',
                group: '汇总组内风格分布 ➔ 选举 CEO/CTO/CMO ➔ 制定分工决策机制'
            },
            type: 'ai-index'
        },
        {
            id: 'cross-field',
            category: 'team',
            categoryName: '团队搭建',
            title: '跨学科团队协同攻防卡牌',
            time: '10分钟',
            pblNode: '#12 跨学科协同',
            badge: '🃏 协同攻防',
            desc: '模拟理工、文管与艺术背景成员在项目遭遇危机时的协同决策。',
            rules: '1. 抽取危机卡片（如技术延期、预算削减）；2. 跨学科成员分别提出专业解法；3. 合成最佳应对策略。',
            workflows: {
                teacher: '随机投放突发危机卡 ➔ 限时 5 分钟协同讨论 ➔ 评价多视角方案落地性',
                student: '从专业视角阐述应对举措 ➔ 倾听非专业组员建议 ➔ 达成跨界共识',
                group: '合并各专业方案 ➔ 形成联合应急预案 ➔ 记录跨界协同经验'
            },
            type: 'ai-index'
        },
        {
            id: 'equity-split',
            category: 'team',
            categoryName: '团队搭建',
            title: '动态股权分配与控制权预演',
            time: '10分钟',
            pblNode: '#13 团队股权设计',
            badge: '⚖️ 股权分割',
            desc: '基于资金、技术、时间与资源投入，预演初创团队动态股权架构。',
            rules: '1. 输入各成员要素贡献权重；2. 设定 Vesting 4 年成熟期与 1 年 Cliff 限制；3. 导出股权协议草案。',
            workflows: {
                teacher: '剖析平均分配股权踩坑案例 ➔ 演示动态计算公式 ➔ 辅导预估创始人控制权',
                student: '如实填写个人资源投入量 ➔ 参与股权成熟期谈判 ➔ 签署虚拟承诺书',
                group: '录入成员贡献权重 ➔ 导出股权分配比例饼图 ➔ 检查控制权防旁落机制'
            },
            type: 'ai-index'
        },

        // ── 模块 2：痛点识别与发散思维 ──
        {
            id: 'rural-match',
            category: 'painpoint',
            categoryName: '痛点发散',
            title: '红旅与乡村振兴痛点精准配对',
            time: '10分钟',
            pblNode: '#21 痛点挖掘与社会价值',
            badge: '🌾 乡村振兴配对',
            desc: '将高校科研成果/商业方案与真实农村产业痛点进行精准连线配对。',
            rules: '1. 查看左侧农业/文旅痛点卡片；2. 拖拽右侧技术/商业解决方案；3. 配对成功后获得契合度评分。',
            workflows: {
                teacher: '发布 5 大现实乡村发展瓶颈 ➔ 引导学生用新质生产力赋能 ➔ 评选最佳对口项目',
                student: '分析农户/景区真实诉求 ➔ 匹配团队技术落地场景 ➔ 撰写落地可行性',
                group: '讨论技术降本增效空间 ➔ 完善红旅赛道申报材料 ➔ 提交对接方案'
            },
            type: 'rural-match'
        },
        {
            id: 'scamper-storm',
            category: 'painpoint',
            categoryName: '痛点发散',
            title: '奔驰法 SCAMPER 7维发散风暴',
            time: '15分钟',
            pblNode: '#22 创新思维与发散',
            badge: '🌪️ SCAMPER 风暴',
            desc: '运用替代、合并、改造等 7 个维度对传统产品进行颠覆式重构。',
            rules: '1. 选择一传统产品（如水杯）；2. 依次应用 S-C-A-M-P-E-R 7 维度；3. 产出至少 3 个创意方案。',
            workflows: {
                teacher: '出示标的物产品 ➔ 依次引导 7 维度思考 ➔ 挑选最具商业价值创想',
                student: '在风暴板上快速贴出脑洞 ➔ 尝试颠覆常理组合 ➔ 投票选出前 3 创想',
                group: '汇总 7 维发散脑洞 ➔ 剔除不可行项 ➔ 形成全新概念产品定义'
            },
            type: 'ai-index'
        },
        {
            id: 'empathy-map',
            category: 'painpoint',
            categoryName: '痛点发散',
            title: '目标客户同理心地图绘制',
            time: '10分钟',
            pblNode: '#23 客户同理心',
            badge: '🗺️ 同理心地图',
            desc: '深度沉浸于种子用户视听感想，还原真实使用场景与隐性挫败感。',
            rules: '1. 设定典型用户 Persona；2. 填报“看、听、想、做、挫败、期望” 6 大象限；3. 提炼核心痛点。',
            workflows: {
                teacher: '讲解同理心访谈要领 ➔ 监督 6 象限填写规范 ➔ 纠正“伪需求”臆想',
                student: '代入目标用户角色的日常 ➔ 填写挫败感 Pain 与收益 Gain ➔ 还原真实场景',
                group: '合成组员调查素材 ➔ 绘制全景同理心地图 ➔ 归纳第一优先攻克痛点'
            },
            type: 'ai-index'
        },
        {
            id: 'extreme-question',
            category: 'painpoint',
            categoryName: '痛点发散',
            title: '痛点伪需求极限拷问路演',
            time: '10分钟',
            pblNode: '#24 伪需求识别',
            badge: '❓ 极限拷问',
            desc: '模拟高压质询环境，验证痛点是否属于“刚需、高频、高付费意愿”。',
            rules: '1. 提出项目痛点假设；2. 接受 3 轮“为什么用户不选择替代品”质问；3. 修正痛点定义。',
            workflows: {
                teacher: '扮演评审专家投资人强攻质问 ➔ 检验数据真实性 ➔ 指出伪需求漏洞',
                student: '用实调数据据理力争 ➔ 暴露假设漏洞时即时记录 ➔ 修正痛点切入角',
                group: '梳理防御说辞 ➔ 剔除无法证伪的伪命题 ➔ 重构问题定义语句'
            },
            type: 'ai-index'
        },

        // ── 模块 3：商业模式与价值主张 ──
        {
            id: 'ai-index',
            category: 'bm',
            categoryName: '商业模式',
            title: '精益 MVP 商业模式自测评估',
            time: '10分钟',
            pblNode: '#31 商业模式闭环',
            badge: '🤖 AI 自测评分',
            desc: '在线评估项目的客户细分、价值主张、渠道与收入结构闭环度。',
            rules: '1. 依次回答商业模式 8 项自测指标；2. 点击生成 AI 导师诊断报告；3. 查看改进建议。',
            workflows: {
                teacher: '讲解 BMC 9 模块勾稽关系 ➔ 组织全班自测 ➔ 分析普遍薄弱环节',
                student: '如实填写自测选项 ➔ 查看诊断得分与瓶颈 ➔ 查阅推荐导学 Deck',
                group: '对照测评报告 ➔ 补齐断层模块（如渠道或成本） ➔ 优化商业逻辑'
            },
            type: 'ai-index'
        },
        {
            id: 'uvp-pitch',
            category: 'bm',
            categoryName: '商业模式',
            title: '独特价值主张 15秒电梯演讲',
            time: '10分钟',
            pblNode: '#32 价值主张提炼',
            badge: '⚡ UVP 电梯演讲',
            desc: '使用“我们帮助[目标群]在[场景下]解决[痛点]实现[价值]”公式精炼价值主张。',
            rules: '1. 套用 UVP 极简句式；2. 限时 15 秒口头路演；3. 组员匿名打分清晰度。',
            workflows: {
                teacher: '演示标准 15 秒电梯 Pitch ➔ 计时并叫停冗长表述 ➔ 点评辨识度',
                student: '反复磨炼一句话介绍 ➔ 剔除行业虚无形容词 ➔ 进行 15 秒限时挑战',
                group: '互相评测说辞 ➔ 保留最抓眼球的关键词 ➔ 决定 Pitch 开场白'
            },
            type: 'wordchain'
        },
        {
            id: 'bmc-puzzle',
            category: 'bm',
            categoryName: '商业模式',
            title: '9格商业模式画布逻辑拼图',
            time: '15分钟',
            pblNode: '#33 商业模式画布',
            badge: '🧩 BMC 拼图',
            desc: '将混乱的商业要素卡片归位至商业模式画布 9 大区块并建立勾稽关联。',
            rules: '1. 拖拽 12 个商业要素卡；2. 准确放入客户、价值、成本等 9 区；3. 校验价值流向。',
            workflows: {
                teacher: '发放混淆版要素卡片 ➔ 限时 10 分钟拼图 ➔ 检查价值与财务联动',
                student: '辨析要素归属区块 ➔ 匹配核心资源与关键业务 ➔ 完善成本收入对齐',
                group: '共同完成 9 格画布拼图 ➔ 检查逻辑闭环 ➔ 拍照上传作答成果'
            },
            type: 'rural-match'
        },
        {
            id: 'revenue-stream',
            category: 'bm',
            categoryName: '商业模式',
            title: '盈利模式与多元变现链匹配',
            time: '10分钟',
            pblNode: '#34 变现机制设计',
            badge: '🔗 变现链设计',
            desc: '探索订阅制、抽成制、免费增值 (Freemium) 等多元盈利模式的匹配度。',
            rules: '1. 选择项目所属行业类别；2. 尝试 3 种不同变现模型；3. 计算预期毛利率。',
            workflows: {
                teacher: '剖析经典软件/硬件/平台变现陷阱 ➔ 引导探索复合盈利 ➔ 评价可扩展性',
                student: '推算不同变现路径的客户接受度 ➔ 测算客单价与复购率 ➔ 选择主次模式',
                group: '绘制项目收入流示意图 ➔ 评估现金流回款周期 ➔ 形成商业变现章节'
            },
            type: 'ai-index'
        },

        // ── 模块 4：市场研判与可行性分析 ──
        {
            id: 'pest-matrix',
            category: 'feasibility',
            categoryName: '市场可行',
            title: 'PEST 宏观环境合规红线大扫描',
            time: '10分钟',
            pblNode: '#41 宏观环境与合规',
            badge: '🚨 PEST 红线扫描',
            desc: '扫描政治 (P)、经济 (E)、社会 (S)、技术 (T) 层的合规政策与红线风险。',
            rules: '1. 选择涉及政策/隐私/数据敏感点；2. 进行合规避雷筛查；3. 导出风控对策。',
            workflows: {
                teacher: '解读最新行业监管政策 ➔ 投放法规避雷清单 ➔ 指导合规备案流程',
                student: '核查项目数据采集合规性 ➔ 排查资质牌照要求 ➔ 撰写合规承诺书',
                group: '梳理 PEST 4 维风险矩阵 ➔ 制定风控防范预案 ➔ 补充合规证明附件'
            },
            type: 'ai-index'
        },
        {
            id: 'bep-calc',
            category: 'feasibility',
            categoryName: '市场可行',
            title: '盈亏平衡点 (BEP) 临界销量极速测算',
            time: '10分钟',
            pblNode: '#42 财务保本测算',
            badge: '📈 BEP 临界测算',
            desc: '输入固定成本、变动成本与单价，极速计算项目保本销售量与月保本额。',
            rules: '1. 录入月租金、薪酬等固定成本；2. 录入单件变动成本；3. 实时生成 BEP 交叉图。',
            workflows: {
                teacher: '讲解 BEP = 固定成本 / (单价 - 变动成本) ➔ 演示动态保本图 ➔ 强调安全边际',
                student: '盘点项目真实开支数据 ➔ 尝试调优单价与成本 ➔ 测算真实保本天数',
                group: '汇总财务测算表 ➔ 验证保本销量是否超越产能上限 ➔ 调整定价策略'
            },
            type: 'ai-index'
        },
        {
            id: 'compete-wall',
            category: 'feasibility',
            categoryName: '市场可行',
            title: '竞争优势与非对称壁垒设计',
            time: '10分钟',
            pblNode: '#43 竞争壁垒与护城河',
            badge: '🛡️ 非对称壁垒',
            desc: '识别专利、网络效应、独家资源、转换成本等非对称壁垒，打造护城河。',
            rules: '1. 列出 2 家直接竞品；2. 对比 5 大竞争维度；3. 提炼不可被短期复制的壁垒。',
            workflows: {
                teacher: '剖析“先发优势≠护城河”反例 ➔ 引导打造专利与数据壁垒 ➔ 评估防抄袭力',
                student: '深挖掘团队独家技术/资源 ➔ 绘制四象限竞品定位图 ➔ 强调非对称优势',
                group: '完成竞品对比矩阵 ➔ 梳理核心知识产权成果 ➔ 写入路演防御说辞'
            },
            type: 'ai-index'
        },
        {
            id: 'tam-sam-som',
            category: 'feasibility',
            categoryName: '市场可行',
            title: 'TAM/SAM/SOM 市场规模倒金字塔推算',
            time: '10分钟',
            pblNode: '#44 市场规模测算',
            badge: '🔺 市场金字塔',
            desc: '采用自上而下或自下而上法，推算潜在总市场 (TAM)、可服务市场 (SAM) 与可获得市场 (SOM)。',
            rules: '1. 选择测算逻辑；2. 填入行业总规模与渗透率；3. 生成 SOM 3 年目标。',
            workflows: {
                teacher: '讲解大市场假象陷阱 ➔ 演示自下而上单店/单客推算法 ➔ 检验逻辑合理性',
                student: '查阅权威行业报告数据 ➔ 设定合理的市场渗透率 ➔ 计算第一年 SOM 目标',
                group: '推演 3 年 SOM 扩张曲线 ➔ 校验市场空间与融资额匹配度 ➔ 导出展示图表'
            },
            type: 'ai-index'
        },

        // ── 模块 5：产品原型与精益验证 ──
        {
            id: 'mvp-smoke',
            category: 'mvp',
            categoryName: '精益验证',
            title: '冒烟测试与假门 (Fake Door) 实验设计',
            time: '10分钟',
            pblNode: '#51 MVP原型与实验',
            badge: '🧪 假门冒烟测试',
            desc: '用零代码 Landing Page 或海报进行假门实验，低成本验证用户真实意向。',
            rules: '1. 设计预售/预约按钮；2. 投放 100 位目标受众；3. 统计点击意向率。',
            workflows: {
                teacher: '讲解精益创业“Build-Measure-Learn”环 ➔ 介绍假门实验伦理 ➔ 评估实验方案',
                student: '制作极简产品概念展示图 ➔ 设定预购/报名触发器 ➔ 收集真实点击数据',
                group: '设计实验统计表 ➔ 分析用户意向转化率 ➔ 决定继续推进或 Pivot 转向'
            },
            type: 'ai-index'
        },
        {
            id: 'landing-page',
            category: 'mvp',
            categoryName: '精益验证',
            title: '核心卖点 Landing Page 转化率测算',
            time: '10分钟',
            pblNode: '#52 获客与转化分析',
            badge: '💻 落地页转化',
            desc: '优化产品落地页的头图、卖点文案与 CTA 按钮，提升访客留资率。',
            rules: '1. A/B 测试两套 Headline；2. 计算 PV 到 Lead 转化率；3. 找到最佳获客文案。',
            workflows: {
                teacher: '演示高转化落地页 5 元素 ➔ 组织 A/B 测试实验 ➔ 点评文案吸睛度',
                student: '撰写两套不同切入点文案 ➔ 进行组内限时点击测试 ➔ 优化 CTA 按钮字样',
                group: '搭建落地页原型 ➔ 测算预估 CAC 获客成本 ➔ 完善用户触达闭环'
            },
            type: 'wordchain'
        },
        {
            id: 'cohort-retention',
            category: 'mvp',
            categoryName: '精益验证',
            title: '种子用户留存与 Cohort 漏斗推演',
            time: '10分钟',
            pblNode: '#53 种子用户留存',
            badge: '📊 留存漏斗推演',
            desc: '分析首批 100 名种子用户的次日、7日与 30日留存率，判断 Product-Market Fit。',
            rules: '1. 输入各阶段流失率；2. 绘制留存曲线 (Retention Curve)；3. 校验平坦期。',
            workflows: {
                teacher: '讲解 PMF (产品与市场匹配) 判定标准 ➔ 示范 Cohort 矩阵分析 ➔ 评估留存风险瓶颈',
                student: '追踪首批测试用户行为数据 ➔ 找出致命流失节点 ➔ 设计用户复购/留存机制',
                group: '绘制项目 Cohort 漏斗图 ➔ 制定种子用户社群激活计划 ➔ 提交 PMF 验证证据'
            },
            type: 'ai-index'
        },
        {
            id: 'unit-economy',
            category: 'mvp',
            categoryName: '精益验证',
            title: '单元经济学 Unit Economics (CAC/LTV) 计算',
            time: '10分钟',
            pblNode: '#54 商业模式健康度',
            badge: '💰 单元经济学',
            desc: '计算客户获客成本 (CAC) 与生命周期价值 (LTV)，验证 LTV > 3*CAC 健康度。',
            rules: '1. 输入预估 CAC 与月 ARPPU；2. 计算 LTV/CAC 比值；3. 评估回本周期 (Payback Period)。',
            workflows: {
                teacher: '讲解 LTV/CAC 黄金法则 ➔ 演示动态单元经济计算器 ➔ 预警失血风险',
                student: '推算获得单个付费用户的全部开销 ➔ 测算用户生命周期与客单价 ➔ 校验 LTV/CAC>3',
                group: '完成 Unit Economics 评估 ➔ 优化投放与变现路径 ➔ 填入商业计划书财务章节'
            },
            type: 'ai-index'
        },

        // ── 模块 6：双创大赛与路演答辩 ──
        {
            id: 'pitch-defense',
            category: 'competition',
            categoryName: '大赛答辩',
            title: '“互联网+”评委 60秒高压防御复盘',
            time: '15分钟',
            pblNode: '#61 答辩高压防御',
            badge: '⚔️ 60s 评委防御',
            desc: '模拟“互联网+”国赛专家提出 5 大尖锐质问，限时 60 秒简洁精准反驳。',
            rules: '1. 抽取评委刁难问题（如技术外包、市场太小）；2. 60秒内完成逻辑自洽防御；3. 评委打分。',
            workflows: {
                teacher: '扮演国赛资深专家连环追问 ➔ 计时叫停废话 ➔ 教授高情商与专业答辩技巧',
                student: '冷静直击问题核心 ➔ 拿数据与合规证明说话 ➔ 展示团队自信与务实',
                group: '汇总高频质问 Q&A 库 ➔ 编制答辩防守卡片 ➔ 进行全真路演模拟试演'
            },
            type: 'ai-index'
        },
        {
            id: 'bp-diagnose',
            category: 'competition',
            categoryName: '大赛答辩',
            title: '商业计划书 10大风险瓶颈诊断自查',
            time: '10分钟',
            pblNode: '#62 BP质量诊断',
            badge: '📋 BP 10大风险瓶颈自查',
            desc: '自查逻辑脱节、财务假大空、团队分工模糊等商业计划书常见风险瓶颈。',
            rules: '1. 逐项勾选 BP 10 大避雷指标；2. 获得 BP 健康度得分；3. 导出整改清单。',
            workflows: {
                teacher: '发布国赛网评淘汰率 10 大原因 ➔ 指导自查表比对 ➔ 严查假数据与夸大表述',
                student: '逐页核对 BP 逻辑连贯性 ➔ 检查财务与市场数据是否矛盾 ➔ 完善证明材料',
                group: '完成 BP 全套逻辑自查 ➔ 修正文字与排版瑕疵 ➔ 生成优质 BP 提交件'
            },
            type: 'ai-index'
        },
        {
            id: 'finance-forecast',
            category: 'competition',
            categoryName: '大赛答辩',
            title: '3年财务预测与现金流断裂预警',
            time: '10分钟',
            pblNode: '#63 财务预测',
            badge: '💸 现金流断裂预警',
            desc: '推算初创项目未来 3 年损益表 (P&L) 与现金流，预警最低资金储备保障线。',
            rules: '1. 填入 3 年营收增长曲线；2. 录入人工与运营成本；3. 预警现金流断裂月份。',
            workflows: {
                teacher: '讲解创业死亡谷 (Valley of Death) ➔ 演示现金流滚算模型 ➔ 强调安全跑道 (Runway)',
                student: '推算月度 Burn Rate 烧钱率 ➔ 计算至少保障 12 个月的现金储备 ➔ 制定融资节点',
                group: '完成未来 3 年财务预测表 ➔ 绘制现金流走势图 ➔ 写入 BP 融资计划章节'
            },
            type: 'ai-index'
        },
        {
            id: 'roadshow-deck',
            category: 'competition',
            categoryName: '大赛答辩',
            title: '10页工业级路演 Deck 逻辑拆解',
            time: '10分钟',
            pblNode: '#64 工业级 Deck 制作',
            badge: '🎬 10页路演 Deck',
            desc: '拆解金奖项目标准 10 页 Pitch Deck 逻辑链（痛点-方案-市场-产品-模式-壁垒-团队-财务）。',
            rules: '1. 匹配 10 页 Deck 逻辑骨架；2. 检查单页字数与视觉重点；3. 生成标准 Pitch 纲要。',
            workflows: {
                teacher: '展示国赛金奖项目 10 页 Deck 原件 ➔ 讲解一页一主旨原则 ➔ 指导视觉美化',
                student: '提炼每页 Slide 核心标题句 ➔ 替换冗长段落为可视化图表 ➔ 精简路演 PPT',
                group: '组装 10 页 Pitch Deck 骨架 ➔ 校验全篇叙事逻辑（Storytelling） ➔ 输出高清演播 Deck'
            },
            type: 'ai-index'
        }
    ];

})(window);
