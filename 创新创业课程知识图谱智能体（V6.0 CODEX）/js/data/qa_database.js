/**
 * 《大学生创新创业基础》108+ 本地预置 Q&A 数据库 (v6.6 Refactored)
 * 涵盖：1. 认识创新创业；2. 痛点识别；3. 财务保本与风险；4. BMC 画布；5. 24h MVP 构建；6. 路演与团队
 */
(function() {
    window.IEKG = window.IEKG || {};
    
    const categories = [
        { id: 'cat-1', name: '💡 认识创新与 Sarasvathy 效果推理', icon: 'fa-lightbulb' },
        { id: 'cat-2', name: '🔍 痛点识别与 JTBD 待办任务', icon: 'fa-search' },
        { id: 'cat-3', name: '📊 宏观 PEST 与 BEP 财务保本算盘', icon: 'fa-calculator' },
        { id: 'cat-4', name: '📋 精益商业模式画布 (BMC) 9 要素', icon: 'fa-th-large' },
        { id: 'cat-5', name: '⚡ 24 小时极简 MVP 原型与低代码', icon: 'fa-rocket' },
        { id: 'cat-6', name: '🤝 核心创始团队组队、股权与路演 Pitching', icon: 'fa-users' },
        { id: 'cat-7', name: '📜 云南/曲靖双创政策红利', icon: 'fa-landmark' }
    ];

    const qaList = [
        // ── 模块 1: 认识创新与 Sarasvathy 效果推理 (18条) ──
        {
            id: 1, catId: 'cat-1',
            question: "什么是萨拉斯瓦斯 (Sarasvathy) 的效果推理法则 (Effectuation)？",
            answer: "效果推理法则由 Sarasvathy 教授提出，区别于传统因果推理。它强调初创团队基于‘我是谁’(身份技能)、‘我知道什么’(知识经验)、‘我认识谁’(人脉资源)这 3 大现有资源展开手段导向的创新，而非盲目设定远大目标。"
        },
        {
            id: 2, catId: 'cat-1',
            question: "效果推理法则中的‘手头资源原则’(Bird-in-hand Principle)如何落地？",
            answer: "优先盘点团队成员现有的编程、设计、文案、本地特产渠道等资源。以现有的手头资源为起点设计第一代产品，而不是依赖尚未到位的外部投资。"
        },
        {
            id: 3, catId: 'cat-1',
            question: "效果推理法则中的‘可承受损失原则’(Affordable Loss)如何应用？",
            answer: "创业初期不要计算期望收益的最大化，而是计算自己和团队最大能承受多少时间与资金损失。将试错成本限制在零花钱或24小时内，即使失败也不影响生存。"
        },
        {
            id: 4, catId: 'cat-1',
            question: "效果推理法则中的‘疯狂织锦原则’(Crazy Quilt Principle)指的是什么？",
            answer: "指通过与早期愿意承诺投入的伙伴、客户及供应商建立合作网络（承诺），共同塑造新产品的方向，而不是花大量精力进行前置竞争分析。"
        },
        {
            id: 5, catId: 'cat-1',
            question: "效果推理法则中的‘柠檬水原则’(Lemonade Principle)是什么？",
            answer: "‘当生活给你柠檬时，做成柠檬水’。拥抱意外与不确定性，将突发的困难或反馈转变成创新和调整产品方向的契机。"
        },
        {
            id: 6, catId: 'cat-1',
            question: "效果推理法则中的‘飞行员原则’(Pilot-in-the-plane Principle)的核心是什么？",
            answer: "强调通过团队的可控行动来塑造未来，而不是试图去预测未来。未来的趋势取决于当下主动的实验和创造。"
        },
        {
            id: 7, catId: 'cat-1',
            question: "什么是 SCAMPER 奔驰法？7 个字母分别代表什么？",
            answer: "SCAMPER 是发散思维工具：Substitute(替代)、Combine(合并)、Adapt(调整)、Modify/Magnify(修改/放大)、Put to other uses(挪作他用)、Eliminate(消除)、Reverse(逆向)。"
        },
        {
            id: 8, catId: 'cat-1',
            question: "如何用 SCAMPER 奔驰法做‘特产 + AI’的创意发散？",
            answer: "例如 Combine(合并)：将本地特产包装与 AI 扫码生成非遗语音故事合并；Eliminate(消除)：消除传统繁琐的中介销售环节，用 AI 直播助手直连农户。"
        },
        {
            id: 9, catId: 'cat-1',
            question: "大学生创新与创业有什么区别与联系？",
            answer: "创新侧重于新思想、新产品或新技术的发明与突破（从0到1）；创业则是将创新成果商业化、落地为可持续运作的组织与商业模式。"
        },
        {
            id: 10, catId: 'cat-1',
            question: "创新思维和传统思维最大的差异在哪里？",
            answer: "传统思维依赖经验延续和风险回避；创新思维崇尚第一性原理拆解、批判性质疑与敏捷试错。"
        },
        {
            id: 11, catId: 'cat-1',
            question: "什么是第一性原理 (First Principles Thinking)？",
            answer: "第一性原理要求打破常识与比较思维，把事物剥离到最本质的物理或商业真理，再从最根本的真理出发向上推演建立新方案。"
        },
        {
            id: 12, catId: 'cat-1',
            question: "什么是‘破坏性创新’(Disruptive Innovation)？",
            answer: "由克里斯坦森提出，指初始性能可能不如主流产品，但凭借低成本、简单易用或全新维度切入边缘市场，最终颠覆行业巨头的创新。"
        },
        {
            id: 13, catId: 'cat-1',
            question: "大学生在选择创业赛道时常见的思维误区有哪些？",
            answer: "三大误区：1. 盲目追求大热赛道而忽视自身资源；2. 伪需求驱动（自嗨式创新）；3. 重研发轻销售，忽视商业闭环。"
        },
        {
            id: 14, catId: 'cat-1',
            question: "如何判断一个双创项目是否具备‘金课’学术深度？",
            answer: "看项目是否有明确的理论框架支撑（如效果推理、JTBD、BMC）、是否有高阶的实操产出（MVP、财务算盘）、以及是否实现了能力达成度测评。"
        },
        {
            id: 15, catId: 'cat-1',
            question: "什么是‘硬科技创业’与‘服务模式创业’的区别？",
            answer: "硬科技创业依赖核心技术突破与专利壁垒，研发周期长；服务模式创业依赖商业模式、渠道与用户体验创新，起步快但需快速建立规模壁垒。"
        },
        {
            id: 16, catId: 'cat-1',
            question: "在效果推理中，如何进行第一步的组员‘技能起底’？",
            answer: "让组员各自列出：1. 我最擅长的软件/工具；2. 我拥有的独特兴趣或圈子资源；3. 我做过最有成就感的一件事。汇总后交叉匹配。"
        },
        {
            id: 17, catId: 'cat-1',
            question: "为什么说创业是一场‘人机协同’的实验？",
            answer: "生成式 AI（大模型）大幅降低了脑暴、代码写作与 UI 设计的门槛，人类专注于痛点感知、同理心与商业决策，AI 负责敏捷执行。"
        },
        {
            id: 18, catId: 'cat-1',
            question: "怎样将专业所学知识转化为双创项目的核心壁垒？",
            answer: "将本专业的算法、农学、材料或艺术设计成果与 AI 工具结合，解决行业中的细分痛点，形成‘专业技术+AI+商业化’三位一体模式。"
        },

        // ── 模块 2: 痛点识别与 JTBD 待办任务 (18条) ──
        {
            id: 19, catId: 'cat-2',
            question: "什么是 JTBD (Job-to-be-Done) 客户待办任务理论？",
            answer: "JTBD 认为：用户买产品不是买产品本身，而是‘雇用’产品来帮他完成特定生活或工作中的待办任务（Job）。"
        },
        {
            id: 20, catId: 'cat-2',
            question: "如何区分‘真需求’与‘伪需求’？",
            answer: "看用户是否愿意为解决痛点付出一时间、二精力和三金钱。如果用户只说‘想法很好’但拒绝付费或试用，通常是伪需求。"
        },
        {
            id: 21, catId: 'cat-2',
            question: "设计思维 (Design Thinking) 的 5 个步骤是什么？",
            answer: "1. 同理心思考 (Empathize) -> 2. 需求定义 (Define) -> 3. 创意发散 (Ideate) -> 4. 原型制作 (Prototype) -> 5. 实际测试 (Test)。"
        },
        {
            id: 22, catId: 'cat-2',
            question: "什么是同理心地图 (Empathy Map)？包含哪 4 个象限？",
            answer: "同理心地图用于还原用户真实场景，包含：说 (Says)、想 (Thinks)、做 (Does)、感受 (Feels) 4 个象限。"
        },
        {
            id: 23, catId: 'cat-2',
            question: "如何进行高效的客户访谈？避免哪些陷阱？",
            answer: "陷阱：不要问‘你喜欢这个产品吗’（诱导性问题）。正确方式：让客户讲过去发生的具体事实（‘上周遇到这个问题时你具体是怎么解决的’）。"
        },
        {
            id: 24, catId: 'cat-2',
            question: "什么是《妈妈测试》(The Mom Test) 访谈法则？",
            answer: "即使问你妈妈，她也不会对你说谎的提问法则：1. 谈论他们的生活而非你的想法；2. 询问过去的具体事实而非未来的预言；3. 少说多听。"
        },
        {
            id: 25, catId: 'cat-2',
            question: "如何确定目标客户画像 (Persona)？",
            answer: "基于真实访谈数据，总结出人口统计特征、核心痛点、日常工作流、决策动机与常用渠道的代表性人物模型。"
        },
        {
            id: 26, catId: 'cat-2',
            question: "什么是‘痛点频率’与‘痛点强度’矩阵？",
            answer: "将痛点标在二维坐标轴上：优先选择‘高频 + 高强度’（如打车难、高并发渲染）的黄金切入点。"
        },
        {
            id: 27, catId: 'cat-2',
            question: "如何利用生成式 AI 辅助做痛点同理心脑暴？",
            answer: "使用 Prompt 让 AI 扮演目标角色（如‘你是一位云南高原农资合作社负责人’），提问其日常最头疼的 5 个流程，并对比真实访谈验证。"
        },
        {
            id: 28, catId: 'cat-2',
            question: "什么是‘用户旅程图’(User Journey Map)？",
            answer: "梳理用户从发现问题、搜寻方案、购买体验到售后分享的全过程，寻找各阶段的尴尬点 (Friction Points) 作为创新切入点。"
        },
        {
            id: 29, catId: 'cat-2',
            question: "本地实体产业有哪些常见的未满足痛点？",
            answer: "如：传统包装缺乏吸引力、农产品等级筛选依靠人工成本高、非遗手艺宣传渠道狭窄、实体门店缺乏线上精准留客工具等。"
        },
        {
            id: 30, catId: 'cat-2',
            question: "在痛点验证阶段，如何制作‘伪需求淘汰清单’？",
            answer: "列出项目假设，逐一用数据淘汰：如果10个目标访谈对象中少于 3 人遇到过该问题，或没人尝试寻找过替代方案，则将其列入淘汰清单。"
        },
        {
            id: 31, catId: 'cat-2',
            question: "什么是 B2B 与 B2C 痛点识别的最大差异？",
            answer: "B2C 痛点侧重于情感、便捷与性价比；B2B 痛点侧重于帮企业降本、增效、合规控风险与增加营收。"
        },
        {
            id: 32, catId: 'cat-2',
            question: "如何避免‘拿着锤子找钉子’（先有技术再找场景）的错误？",
            answer: "不要沉迷于技术本身的先进性，先深入场景寻找痛点，确保技术是帮客户解决具体问题的最优解。"
        },
        {
            id: 33, catId: 'cat-2',
            question: "什么是‘替代方案分析’(Alternatives Analysis)？",
            answer: "研究用户在没有你产品前，是用什么简陋方式应对问题的。你的方案必须比现有替代方案显著提升 10 倍效能。"
        },
        {
            id: 34, catId: 'cat-2',
            question: "怎样识别隐藏在客户抱怨中的商业契机？",
            answer: "客户的抱怨和吐槽往往代表期望与现实的差距，记录抱怨频次最高的细分步骤，针对性提供自动化解决方案。"
        },
        {
            id: 35, catId: 'cat-2',
            question: "什么是‘最小可售痛点’(Minimum Sellable Pain)？",
            answer: "足够痛到用户愿意立即打开钱包支付意向金的单一最核心痛点。"
        },
        {
            id: 36, catId: 'cat-2',
            question: "如何利用社交媒体（小红书、知乎）提取痛点关键字？",
            answer: "爬取或搜索话题下高频出现的词汇如‘太坑了’、‘怎么解决’、‘有无代替’，总结真实痛点词云。"
        },

        // ── 模块 3: 宏观 PEST 与 BEP 财务保本算盘 (18条) ──
        {
            id: 37, catId: 'cat-3',
            question: "什么是 PEST 宏观环境分析模型？",
            answer: "分析 Political(政治政策)、Economic(经济趋势)、Social(社会文化)、Technological(技术变革) 4 大宏观因素对项目的影响。"
        },
        {
            id: 38, catId: 'cat-3',
            question: "什么是盈亏平衡点 (Break-Even Point, BEP)？计算公式是什么？",
            answer: "BEP 指项目收益刚好等于总成本时的销量。公式：BEP 销量 = 固定成本 (CF) / (单价 P - 单位变动成本 CV)。"
        },
        {
            id: 39, catId: 'cat-3',
            question: "初创项目中的‘固定成本’包含哪些内容？",
            answer: "不随销量变化的开支，如：GPU/服务器固定租金、办公场地租金、基础软件订阅费、核心员工保底工资。"
        },
        {
            id: 40, catId: 'cat-3',
            question: "初创项目中的‘变动成本’包含哪些内容？",
            answer: "随产品产量或销售量直接增加的成本，如：LLM API Token 消耗费、包装快递费、云资源按量计费、销售提成。"
        },
        {
            id: 41, catId: 'cat-3',
            question: "什么是‘边际贡献’(Contribution Margin)？",
            answer: "单价减去单位变动成本（P - CV）。每一单位产品卖出后，用于偿还固定成本的资金贡献。"
        },
        {
            id: 42, catId: 'cat-3',
            question: "为什么大学生创业项目必须严格做保本划线？",
            answer: "绝大多数初创团队因资金断流而夭折。明确保本销量能让团队清晰知道‘每个月必须卖出多少份才能活下去’。"
        },
        {
            id: 43, catId: 'cat-3',
            question: "什么是现金流跑道 (Runway)？如何计算？",
            answer: "指当前银行账户现金储备能支撑公司在零收入状态下存活的时间。计算：现金储备 / 月度净烧钱额 (Net Burn Rate)。"
        },
        {
            id: 44, catId: 'cat-3',
            question: "什么是 CAC (客户获取成本) 与 LTV (客户生命周期价值)？",
            answer: "CAC 是获得一个新付费客户的总营销成本；LTV 是该客户在整个使用期内带来的净利润。健康的商业模式要求 LTV > 3 * CAC。"
        },
        {
            id: 45, catId: 'cat-3',
            question: "什么是‘保本销量算盘’在 AI 项目中的特殊性？",
            answer: "AI 项目的变动成本中包含大模型 Token 消耗。随着用户量激增，Token 成本线性上升，需精准测算单次调用的 API 成本。"
        },
        {
            id: 46, catId: 'cat-3',
            question: "政策环境 (P) 分析中，大学生创业可以享受哪些红利？",
            answer: "包括：高校孵化器免费场地、大学生创业无偿补贴、税收减免、创业担保贷款贴息等。"
        },
        {
            id: 47, catId: 'cat-3',
            question: "如何进行技术环境 (T) 研判与技术壁垒评估？",
            answer: "关注开源大模型（如 DeepSeek、Llama）演进速度，确保项目不会被大模型下一次原生功能更新直接替代。"
        },
        {
            id: 48, catId: 'cat-3',
            question: "什么是‘毛利率’(Gross Margin)？计算公式是什么？",
            answer: "毛利率 = (营业收入 - 营业成本) / 营业收入 * 100%。SaaS 软件毛利率通常高达 70%-90%。"
        },
        {
            id: 49, catId: 'cat-3',
            question: "如何设定合理的初期产品定价策略？",
            answer: "三种方法：1. 成本加成定价；2. 对标竞争对手折让定价；3. 价值导向定价（依据帮客户节省的金额分润）。推荐价值导向。"
        },
        {
            id: 50, catId: 'cat-3',
            question: "什么是安全边际 (Margin of Safety)？",
            answer: "实际销售量（或预计销售量）超出盈亏平衡销量的部分。安全边际越大，抗风险能力越强。"
        },
        {
            id: 51, catId: 'cat-3',
            question: "初创企业如何控制前期固定资产投入？",
            answer: "贯彻‘能租不买、能用云服务不上硬件、能用开源工具不自研’原则，保持资产轻量化。"
        },
        {
            id: 52, catId: 'cat-3',
            question: "如何在保本算盘中考虑‘团队人力成本’？",
            answer: "即使早期创始人不领薪水，也必须在财务模型中按市场基本工资折算机会成本，防止财务虚假盈利。"
        },
        {
            id: 53, catId: 'cat-3',
            question: "什么是敏感性分析 (Sensitivity Analysis)？",
            answer: "测试单价降低 10% 或 API 成本上升 20% 时，盈亏平衡点会受到多大冲击，找出对利润最敏感的变量。"
        },
        {
            id: 54, catId: 'cat-3',
            question: "如何为投资人展示清晰的财务预测表？",
            answer: "展示未来 12-24 个月的月度现金流预测，重点突出盈亏平衡点预计在哪一个月达成。"
        },

        // ── 模块 4: 精益商业模式画布 (BMC) 9 要素 (18条) ──
        {
            id: 55, catId: 'cat-4',
            question: "什么是商业模式画布 (Business Model Canvas, BMC)？",
            answer: "由奥斯特瓦德提出的结构化工具，通过 9 个方格（客户细分、价值主张、渠道、客户关系、收入来源、核心资源、关键业务、重要合作、成本结构）一页纸展示商业模式。"
        },
        {
            id: 56, catId: 'cat-4',
            question: "BMC 画布中的‘价值主张’(Value Proposition) 怎么写？",
            answer: "清晰阐述你为特定客户细分解决的痛点、提供的独特效益，以及为什么你比竞争对手更好。"
        },
        {
            id: 57, catId: 'cat-4',
            question: "BMC 画布中的‘客户细分’(Customer Segments) 如何精准定位？",
            answer: "切忌写‘所有人’。必须具体到：‘云南中小茶叶合作社老板’或‘高校大一需完成双创大纲的大学生’。"
        },
        {
            id: 58, catId: 'cat-4',
            question: "BMC 画布中的‘渠道通路’(Channels) 包含哪些阶段？",
            answer: "涵盖：认知（让客户知道）、评估（帮客户了解）、购买（如何下单）、交付（如何提供）及售后 5 个阶段。"
        },
        {
            id: 59, catId: 'cat-4',
            question: "BMC 画布中的‘客户关系’(Customer Relationships) 有哪些类型？",
            answer: "包括：自助服务、自动化服务 (AI Copilot)、个人专属服务、社区社群运营、共创关系。"
        },
        {
            id: 60, catId: 'cat-4',
            question: "BMC 画布中的‘收入来源’(Revenue Streams) 常见模式有哪些？",
            answer: "包括：产品销售、SaaS 软件订阅费、用量计费 (API Token)、授权费、广告中介费、定制服务费。"
        },
        {
            id: 61, catId: 'cat-4',
            question: "BMC 画布中的‘核心资源’(Key Resources) 包含哪几类？",
            answer: "实体资源（场地/硬件）、知识产权与数据资源、人力资源（核心创始团队团队）、财务资源。"
        },
        {
            id: 62, catId: 'cat-4',
            question: "BMC 画布中的‘关键业务’(Key Activities) 指什么？",
            answer: "企业为了保障商业模式运转所必须执行的最核心动作，如：软件迭代、数据清洗、客户开拓。"
        },
        {
            id: 63, catId: 'cat-4',
            question: "BMC 画布中的‘重要合作’(Key Partners) 包含哪些？",
            answer: "供应商、云资源赞助商、高校孵化器、行业协会、互补性渠道合作伙伴。"
        },
        {
            id: 64, catId: 'cat-4',
            question: "BMC 画布中的‘成本结构’(Cost Structure) 包含哪些？",
            answer: "驱动商业模式运转的最重大成本，区分固定成本与变现开销。"
        },
        {
            id: 65, catId: 'cat-4',
            question: "精益画布 (Lean Canvas) 与传统 BMC 画布有何区别？",
            answer: "精益画布由 Ash Maurya 修改，将‘重要合作/关键业务/核心资源/客户关系’替换为‘问题/解决方案/核心指标/独特卖点’，更适合初创企业。"
        },
        {
            id: 66, catId: 'cat-4',
            question: "在 AI 项目中，如何重构 BMC 的‘成本与收入’两大模块？",
            answer: "收入模式增加 Token 阶梯订阅；成本模式纳入 GPU 算力租赁与 API 消耗，确保单次用户调用的算力毛利为正。"
        },
        {
            id: 67, catId: 'cat-4',
            question: "什么是‘飞轮效应’(Flywheel Effect) 在 BMC 中的体现？",
            answer: "核心业务互为因果推动：用户增加 -> 积累更多数据 -> 模型与体验变好 -> 吸引更多用户与收入。"
        },
        {
            id: 68, catId: 'cat-4',
            question: "如何在 10 分钟内完成一张初始 BMC 画布的填报？",
            answer: "按顺序填写：1. 客户细分 -> 2. 价值主张 -> 3. 渠道 -> 4. 收入 -> 5. 成本，先写假设，后做校验。"
        },
        {
            id: 69, catId: 'cat-4',
            question: "什么是 BMC 画布的‘动态演进’？",
            answer: "BMC 不是一次性的报告，而是随客户访谈与 MVP 测试不断更新便利贴的活文档。"
        },
        {
            id: 70, catId: 'cat-4',
            question: "如何检验 BMC 画布逻辑是否自洽？",
            answer: "检查‘价值主张’是否完全匹配‘客户细分’的痛点；检查‘关键业务’是否足以支撑‘价值主张’的交付。"
        },
        {
            id: 71, catId: 'cat-4',
            question: "什么是免费增值 (Freemium) 商业模式？",
            answer: "基础功能免费吸引海量用户，高级功能或 API 超额使用收订阅费（如 Canva、GitHub）。"
        },
        {
            id: 72, catId: 'cat-4',
            question: "如何在 BMC 中体现项目的‘社会价值’与双创金课要求？",
            answer: "在价值主张中融入：助力本地实体产业升级、带动青年就业、传承非遗文化等社会效益。"
        },

        // ── 模块 5: 24 小时极简 MVP 原型与低代码 (18条) ──
        {
            id: 73, catId: 'cat-5',
            question: "什么是最小可行化产品 (Minimum Viable Product, MVP)？",
            answer: "MVP 是指用最低成本和最短时间开发出的、刚好包含核心价值主张的极简产品原型，用于在真实市场中验证商业假设。"
        },
        {
            id: 74, catId: 'cat-5',
            question: "埃里克·莱斯的精益创业循环 (Build-Measure-Learn) 是什么？",
            answer: "‘构建 (Build) -> 衡量 (Measure) -> 学习 (Learn)’。通过极速构建 MVP 投放到市场，获取数据，从而决定坚持还是转型 (Pivot)。"
        },
        {
            id: 75, catId: 'cat-5',
            question: "24 小时极简 MVP 构建的核心原则是什么？",
            answer: "只保留 1 个核心功能！杜绝完美主义，不写冗余后端，优先使用零代码工具与开源 API 快速拼装。"
        },
        {
            id: 76, catId: 'cat-5',
            question: "如何利用自然语言生成 UI 界面 (v0.dev / Bolt.new)？",
            answer: "在 prompt 中输入页面结构与风格（如‘黑金全景高对比 UI，包含 3 栏 Bento 盒’），工具即可在 1 分钟内自动生成高保真 React/HTML 代码。"
        },
        {
            id: 77, catId: 'cat-5',
            question: "如何利用 Dify / Coze 编排 LLM API 替代复杂后端开发？",
            answer: "在拖拽式画布中添加‘知识库检索 + Prompt 提示词 + DeepSeek API’节点，一键发布为 Web App 接口，免除代码后端部署。"
        },
        {
            id: 78, catId: 'cat-5',
            question: "常见的 MVP 表现形式有哪些？",
            answer: "包括：高保真交互 Demo、绿野仙踪 MVP (手动模拟后台)、单页 Landing Page、宣传短视频、纸质原型卡片。"
        },
        {
            id: 79, catId: 'cat-5',
            question: "什么是‘绿野仙踪 MVP’(Wizard of Oz MVP)？",
            answer: "前端看起来完全自动化，后端实际上由创始人手工处理（如 Zappos 早期手动去鞋店买鞋寄出），以验证需求是否存在。"
        },
        {
            id: 80, catId: 'cat-5',
            question: "什么是‘单页 Landing Page MVP’测试？",
            answer: "搭建一个仅介绍产品价值与价格的网页，放置‘预约体验’或‘立即购买’按钮，统计转化点击率以验证付费意向。"
        },
        {
            id: 81, catId: 'cat-5',
            question: "如何衡量 MVP 测试成功与否？",
            answer: "设定明确的量化指标：如投放后获得 >15% 的测试留资转化率，或 >30% 的用户愿意填写深度反馈表。"
        },
        {
            id: 82, catId: 'cat-5',
            question: "什么是‘原型’(Prototype) 与 ‘MVP’ 的区别？",
            answer: "原型用于测试内部技术可行性或 UX 交互；MVP 用于投放到真实市场测试用户是否愿意买单（商业可行性）。"
        },
        {
            id: 83, catId: 'cat-5',
            question: "在 MVP 构建中，如何处理代码与数据的安全性？",
            answer: "不要使用真实敏感数据，API Key 保存在本地 localStorage 或环境变量中，并设置单日额度上限。"
        },
        {
            id: 84, catId: 'cat-5',
            question: "如何收集 MVP 用户的真实反思与意见？",
            answer: "在原型弹窗末尾内置微型反馈框（‘1-5星打分 + 一句话建议’），或直接留下导师微信进行 1 对 1 追访。"
        },
        {
            id: 85, catId: 'cat-5',
            question: "什么是‘转型’(Pivot)？常见的转型类型有哪些？",
            answer: "基于 MVP 测量反馈改变战略：包括局部放大转型 (Zoom-in)、局部缩小转型 (Zoom-out)、客户细分转型、收益模式转型。"
        },
        {
            id: 86, catId: 'cat-5',
            question: "如何避免 MVP 变成‘过度设计的垃圾’？",
            answer: "砍掉 80% 可有可无的辅助功能（如复杂用户登录、注册、积分商城），只保留解决主痛点的单一路径。"
        },
        {
            id: 87, catId: 'cat-5',
            question: "什么是低代码 (Low-Code) 与无代码 (No-Code) 平台？",
            answer: "提供可视化拖拽组件与逻辑配置的开发工具，让非计算机专业学生也能在数小时内拼装出高颜值 Web 应用。"
        },
        {
            id: 88, catId: 'cat-5',
            question: "如何利用 HTML-PPT 技能制作包含 MVP 原型的放映 Deck？",
            answer: "使用 `guizang-ppt-skill` 框架，在 Slide 4 嵌入 MVP 的高保真截图与 Demo 跳转链接，搭配巨字数据表现展现给评委。"
        },
        {
            id: 89, catId: 'cat-5',
            question: "实体硬件类项目的 MVP 怎么做？",
            answer: "使用 3D 打印件 + 树莓派/Arduino 拼装控制器，或先拍摄一段真实渲染的效果动图视频进行意向征集。"
        },
        {
            id: 90, catId: 'cat-5',
            question: "MVP 阶段要不要申请专利和著作权？",
            answer: "如果包含关键核心算法可以先提交软件著作权或预申请；但不要因为等待证书而延迟 MVP 的市场验证速度。"
        },

        // ── 模块 6: 核心创始团队组队、股权与路演 Pitching (18条) ──
        {
            id: 91, catId: 'cat-6',
            question: "什么是初创团队组建的黄金‘核心创始团队’模型？",
            answer: "包含 3 大核心角色：1. Hacker (黑客: 负责技术与架构)；2. Hipster (潮人: 负责设计与 UX)；3. Hustler (哈斯勒: 负责商务与运营)。"
        },
        {
            id: 92, catId: 'cat-6',
            question: "为什么大学生创业团队最忌讳‘平分股权’(如 50%:50% 或 33%:33%:33%)？",
            answer: "平分股权极易导致决策僵局和推诿。团队必须有一位绝对的核心主导者（大股东持有 51% - 67% 以上投票权）。"
        },
        {
            id: 93, catId: 'cat-6',
            question: "什么是‘股权成熟/动态兑现机制’(Vesting Schedule)？",
            answer: "股权不是一次性发放，而是按服务年限分期兑现（通常为 4 年成熟期，设置 1 年 Cliff 锁定期），防止成员中途退出带走股权。"
        },
        {
            id: 94, catId: 'cat-6',
            question: "什么是 5 分钟路演 Pitching 的‘黄金 5 段式’叙事逻辑？",
            answer: "1. 痛点引爆 (Hook) -> 2. 解决方案与 MVP Demo -> 3. 商业模式与保本算盘 -> 4. 团队优势与壁垒 -> 5. 融资额度与资金用途。"
        },
        {
            id: 95, catId: 'cat-6',
            question: "路演 PPT 设计中最常见的 3 大败笔是什么？",
            answer: "1. 字号太小、密密麻麻全是字；2. 缺乏真实 MVP 数据与试用反馈；3. 避重就轻不讲商业模式和成本结构。"
        },
        {
            id: 96, catId: 'cat-6',
            question: "如何利用 `guizang-ppt-skill` 设计令人惊艳的路演幻灯片？",
            answer: "采用全景大屏暗黑金/赛博霓虹配色，使用 64px+ 巨幅发光金字标题、Bento 盒 3 栏网格卡片与 4rem 巨幅数据高亮。"
        },
        {
            id: 97, catId: 'cat-6',
            question: "路演中如何面对评委提出的尖锐问题（如‘如果腾讯也做你怎么办’）？",
            answer: "不回避！从 3 个维度回答：1. 聚焦垂直细分场景，巨头无瑕顾及；2. 具有本地化实体资源连结与服务壁垒；3. 团队敏捷与数据沉淀。"
        },
        {
            id: 98, catId: 'cat-6',
            question: "什么是创业项目的‘创始人契合度’(Founder-Market Fit)？",
            answer: "创始人自身的专业背景、个人经历或家族资源是否与该项目的赛道天然契合，决定了团队能否坚持到成功。"
        },
        {
            id: 99, catId: 'cat-6',
            question: "在高校双创大赛（如‘互联网+’、‘挑战杯’）中，评委最看重什么？",
            answer: "看重：1. 真实痛点与创新高阶性；2. 商业闭环与落地可能性；3. 团队分工与 OBE 成果达成。"
        },
        {
            id: 100, catId: 'cat-6',
            question: "初创团队如何设计合理的期权池 (Option Pool)？",
            answer: "通常预留 10%-15% 的股权作为期权池，用于未来吸引高级技术或商务合伙人。"
        },
        {
            id: 101, catId: 'cat-6',
            question: "什么是‘电梯演讲’(Elevator Pitch)？",
            answer: "在 30 秒至 1 分钟内，用最精炼的语言向投资人说清楚‘我们帮谁解决了什么痛点，模式是什么，为什么我们能赢’。"
        },
        {
            id: 102, catId: 'cat-6',
            question: "如何处理团队内部关于产品方向的严重分歧？",
            answer: "用数据说话！不要停留在口头争论，制作最简测试版投向用户，用真实测试转化数据作为决策依据。"
        },
        {
            id: 103, catId: 'cat-6',
            question: "路演答辩时，团队成员之间应该如何配合？",
            answer: "CEO 负责主答与全局调度，技术问题由 Hacker 补充，设计运营问题由 Hipster/Hustler 补充，展现默契团队形象。"
        },
        {
            id: 104, catId: 'cat-6',
            question: "什么是种子轮 (Seed Round) 融资与天使轮融资的区别？",
            answer: "种子轮发生在想法或 MVP 阶段，金额较小；天使轮发生在有了早期验证数据后，资金用于扩大团队和推广。"
        },
        {
            id: 105, catId: 'cat-6',
            question: "如何撰写一份专业的项目摘要 (Executive Summary)？",
            answer: "用 1 页纸概括：项目名称、痛点、解决方案、市场规模、竞争优势、财务预测与团队成员背景。"
        },
        {
            id: 106, catId: 'cat-6',
            question: "为什么说‘执行力远比想法更重要’？",
            answer: "好的点子在市场上成百上千，但能在 24 小时内落地 MVP、完成 50 个客户访谈并持续迭代的团队不到 1%。"
        },
        {
            id: 107, catId: 'cat-6',
            question: "大学生创业如何兼顾学业与项目推进？",
            answer: "将创业项目与课程大纲（如双创金课、毕业设计）深度结合，实现‘以赛促学、以项目代考核’。"
        },
        {
            id: 108, catId: 'cat-6',
            question: "结课后，如何将本课程的成果进一步申报国家级双创项目？",
            answer: "整理完善本课程产出的 BMC 画布、MVP 原型数据与 OBE 雷达达成报告，直接申报‘国创计划’或推报省赛。"
        },

        // ── 模块 7: 云南省与曲靖市双创政策红利 (12条) ──
        {
            id: 109, catId: 'cat-7',
            question: "云南省大学生“创业担保贷款”最高额度与免息条件是什么？",
            answer: "依据《云南省进一步支持高校毕业生等青年就业创业若干措施》（云南省人社厅政策专栏），毕业 5 年内高校毕业生在滇创业，个人创业担保贷款最高额度为 30 万元，合伙创业最高额度为 400 万元。财政部门按规定给予贴息，有效降低初期融资成本。"
        },
        {
            id: 110, catId: 'cat-7',
            question: "曲靖市针对高校毕业生首次创业的“一次性创业补贴”标准及申领流程？",
            answer: "毕业 5 年内高校毕业生在曲靖市首次创办小微企业或个体工商户（含一人公司 OPC），正常经营满 6 个月以上并按规定缴纳社会保险的，可向当地人社部门申领 5000 元至 10000 元一次性创业补贴。"
        },
        {
            id: 111, catId: 'cat-7',
            question: "毕业年度内在本省创办小微企业，如何享受社保补贴与税费减免？",
            answer: "云南省政策规定：招用毕业年度高校毕业生的小微企业，按规定给予最长 1 年的社会保险补贴。同时享受增值税小规模纳税人月销售额 10 万元以下免征增值税等税费优惠政策。"
        },
        {
            id: 112, catId: 'cat-7',
            question: "云南省“青年红色筑梦之旅”项目落地曲靖有哪些专属孵化场地支持？",
            answer: "曲靖市高校毕业生创业孵化基地（如曲靖师范学院双创园、曲靖经开区双创中心）对入驻的红旅项目提供 1-3 年免费独立办公工位、高速宽带、公共会议室及导师一对一孵化指导。"
        },
        {
            id: 113, catId: 'cat-7',
            question: "云南省大学生创新创业“创业金种子”遴选与资助标准？",
            answer: "云南省每年面向全省高校遴选优秀创业项目给予 5 万-20 万元不等的“金种子”项目直接资金资助，并优先推荐对接省级创投基金。"
        },
        {
            id: 114, catId: 'cat-7',
            question: "曲靖市特色农业与非遗文创项目“场租减免”申报条件？",
            answer: "在曲靖市创办特色农产品深加工、非遗文创或数字文旅项目的大学生团队，入驻市级以上创业孵化基地可享受第一年场租 100% 减免、第二年 50% 减免的优惠政策。"
        },
        {
            id: 115, catId: 'cat-7',
            question: "毕业 5 年内高校毕业生在滇创办一人公司 (OPC) 的税费返还政策？",
            answer: "在滇创办一人有限责任公司 (OPC)，符合国家鼓励类产业方向的，享受地方所得税留存部分定期返还及小微企业普惠性税收减免政策。"
        },
        {
            id: 116, catId: 'cat-7',
            question: "云南省人社厅“大学生创业孵化基地”认定与奖补标准？",
            answer: "经认定为省级大学生创业示范孵化基地的，云南省财政给予最高 100 万元一次性奖补资金，用以升级基地公共服务能力与算力设施。"
        },
        {
            id: 117, catId: 'cat-7',
            question: "曲靖市针对跨学科团队落地给予的科技型中小企业研发费用加计扣除？",
            answer: "科技型大学生初创企业研发费用享受 100% 加计扣除政策，并可申请曲靖市科技局科技型中小企业研发投入后补助资金。"
        },
        {
            id: 118, catId: 'cat-7',
            question: "云南省“滇中新区/曲靖开发区”高校毕业生创业绿色通道？",
            answer: "曲靖经开区设立高校毕业生创业政务办理“一站式绿色通道”，实现营业执照申领、税务登记、社保开户与政策申报 1 天内一网通办。"
        },
        {
            id: 119, catId: 'cat-7',
            question: "地方政策如何协助项目延长现金流 RunWay 3-6 个月？",
            answer: "通过组合申领“1 万元一次性创业补贴 + 50 万元创业担保贴息贷款 + 免费场租”，直接减少前期显性现金流支出，将初创团队的安全存活期（Runway）延长 3-6 个月。"
        },
        {
            id: 120, catId: 'cat-7',
            question: "PEST 政治法律分析中如何规避泛泛而谈并精确引用云政发文号？",
            answer: "拒绝使用‘国家鼓励创业’等泛泛空话，明文引用《云南省人民政府关于进一步做好当前和今后一个时期促进就业工作的实施意见》（云政发〔202X〕X号）及曲靖市具体条款，增强 BP 的说服力。"
        }
    ];

    window.IEKG.QADatabase = {
        categories,
        qaList,
        /**
         * 搜索问答
         */
        search(keyword, catId) {
            let results = qaList;
            if (catId && catId !== 'all') {
                results = results.filter(item => item.catId === catId);
            }
            if (keyword) {
                const kw = keyword.toLowerCase().trim();
                results = results.filter(item => 
                    item.question.toLowerCase().includes(kw) || 
                    item.answer.toLowerCase().includes(kw)
                );
            }
            return results;
        }
    };
})();
