// ════════════════════════════════════════════════════════════════════════
// 《大学生创新创业基础》双创与 AI 核心术语权威词典 (GLOSSARY_DATA)
// 包含 32 条专业学术与工程落地词条，覆盖 5 大核心领域
// ════════════════════════════════════════════════════════════════════════

const GLOSSARY_DATA = [
    // === 1. 创新思维与解题 (思维) ===
    {
        id: 'scamper',
        name: 'SCAMPER 奔驰法',
        en: 'SCAMPER Checklists',
        cat: '思维',
        desc: '由罗伯特·埃伯尔提出的发散性思维改进切入法，通过替代(Substitute)、合并(Combine)、调整(Adapt)、修改(Modify)、挪用(Put to other uses)、消除(Eliminate)、逆向(Reverse) 7 维法则强制思维发散。',
        application: '在 M1 模块用于对传统农业、非遗文创或服务流程进行发散式创新改良。',
        example: '用自然语言对话 (Substitute) 替代复杂的软件菜单操作，消除 (Eliminate) 老年用户的学习成本。'
    },
    {
        id: 'triz',
        name: 'TRIZ 发明问题解决理论',
        en: 'Theory of Inventive Problem Solving',
        cat: '思维',
        desc: '阿奇舒勒创立的基于技术演进规律与矛盾消解的技术创新理论，通过 40 个发明原理消解物理矛盾与技术冲突。',
        application: '用于解决硬科技项目中“系统推荐精准度提升”与“用户隐私泄露”等技术矛盾。',
        example: '利用空间分离原理，将敏感隐私数据保留在终端边缘计算处理，云端仅传输加密特征值。'
    },
    {
        id: 'effectuation',
        name: 'Sarasvathy 效果推理理论',
        en: 'Effectuation Theory',
        cat: '思维',
        desc: '萨拉斯瓦斯教授提出的创业决策理论，区别于传统的“根据目标找资源”因果推理，强调初创团队基于“我是谁、我知道什么、我认识谁”开展手段导向创新。',
        application: '指导大学生在零资金背景下，优先利用自身专业、身边同学与学校实验室开展创业。',
        example: '基于团队现有的无人机编程特长，去联系本地高原果园合作社展开免费测绘试用。'
    },
    {
        id: 'design_thinking',
        name: '设计思维双飞钻模型',
        en: 'Design Thinking Double Diamond',
        cat: '思维',
        desc: '包含同理心共情 (Empathize)、定义 (Define)、构思 (Ideate)、原型 (Prototype)、测试 (Test) 的以人为本创新框架。',
        application: '指导团队深入用户真实场景，绘制“说、想、做、感受”同理心画像。',
        example: '通过跟随体验老人使用智能手机的全过程，捕捉其看清字体但看不懂专业术语的真实痛点。'
    },
    {
        id: 'jtbd',
        name: 'JTBD 客户待办任务理论',
        en: 'Jobs-to-be-Done',
        cat: '思维',
        desc: '克莱顿·克里斯坦森提出，用户买的不是产品本身，而是购买产品帮他完成特定的生活/工作待办任务。',
        application: '用于排除未经实证的假设型“伪需求”，聚焦客户真正的雇佣动机。',
        example: '用户买 1/4 英寸的钻头，不是想要钻头，而是想要墙上有一个 1/4 英寸的孔来挂全家福照片。'
    },
    {
        id: 'rtcc',
        name: 'RTCC 人机协同提问框架',
        en: 'Role-Task-Context-Constraint Framework',
        cat: '思维',
        desc: '人机协同头脑风暴的 Prompt 黄金法则，依次明确 AI 的角色 (Role)、任务 (Task)、上下文 (Context) 与限制条件 (Constraint)。',
        application: '在 AI 导师提示词设计中让 LLM 模拟投资人、极客或竞争对手进行多视角拷问。',
        example: '“你现在是硬科技 VC 投资人(Role)，请审阅我关于数字分拣的摘要(Task)，在考虑资金回本的前提下(Context)，提出3个致命拷问(Constraint)。”'
    },

    // === 2. 商业模式与精益 (商业) ===
    {
        id: 'bmc',
        name: '精益商业模式画布',
        en: 'Business Model Canvas (BMC)',
        cat: '商业',
        desc: '亚历山大·奥斯特瓦德提出的九要素商业模型图表，涵盖客户细分、价值主张、渠道通道、客户关系、收入来源、核心资源、关键业务、关键伙伴与成本结构。',
        application: '在 M2/M4 模块用于将抽象的项目构思整理为一页纸的清晰商业闭环。',
        example: '在画布中清晰标明：价值主张是降本 30%，关键伙伴是本地农贸合作社。'
    },
    {
        id: 'mvp',
        name: '最小可行化产品',
        en: 'Minimum Viable Product (MVP)',
        cat: '商业',
        desc: '埃里克·莱斯精益创业理论的核心概念，指以最低成本、最快速度制作出包含核心价值主张的极简产品原型投入市场测试。',
        application: '在 M3 模块要求团队在 24 小时内利用低代码或模版搭建可用原型获取种子反馈。',
        example: '在未写任何复杂代码前，先用小程序搭建一个静态预约页面测试用户的真实付费点击率。'
    },
    {
        id: 'freemium',
        name: 'Freemium 免费增值模式',
        en: 'Freemium Model',
        cat: '商业',
        desc: '基础功能面向广大用户永久免费，通过 2%-5% 转化率的高阶高级功能或高阶 API 针对付费订阅用户收费的互联网商业模式。',
        application: '广泛应用于 SaaS 软件、AI 智能体工具及数字文创赛道。',
        example: '基础智能生成每天免费 10 次，高级多模态高清导出收取 29 元/月订阅费。'
    },
    {
        id: 'saas_ltv_cac',
        name: 'LTV/CAC 客户价值模型',
        en: 'Life Time Value / Customer Acquisition Cost',
        cat: '商业',
        desc: '评估订阅制或软件项目长期能否盈利的黄金财务指标，LTV 指客户终身价值，CAC 指获客成本。健康模型的金标准为 LTV > 3×CAC。',
        application: '商业计划书财务预测章节中向投资人证明盈利能力的核心依据。',
        example: '单个客户获取成本 CAC 为 100 元，平均留存 24 个月贡献毛利 480 元，LTV/CAC = 4.8 > 3，财务模型健康。'
    },
    {
        id: 'bep',
        name: '盈亏平衡保本点',
        en: 'Break-Even Point (BEP)',
        cat: '商业',
        desc: '项目总销售收入刚好等于总成本开支（固定成本+边际可变成本）的基准销售数量或销售额，既不盈利也不亏损。',
        application: 'M2 模块保本算盘核算，划定项目月度生存底线。',
        example: '月固定开支 2 万元，单件产品边际利润 50 元，盈亏平衡保本销量为 400 件/月。'
    },
    {
        id: 'data_flywheel',
        name: '数据飞轮效应',
        en: 'Data Flywheel Effect',
        cat: '商业',
        desc: '产品被越多用户使用产生越多专有数据，数据反哺训练优化服务体验，更好的服务吸引更多用户正向循环的竞争壁垒。',
        application: 'AI+ 传统行业项目构建不可复制的技术护城河。',
        example: '果农使用分拣软件越多，积累的高原果品病虫害标注图片越丰富，分拣模型精度越高。'
    },
    {
        id: 'tam_sam_som',
        name: 'TAM/SAM/SOM 市场三层级',
        en: 'Total/Serviceable/Obtainable Market',
        cat: '商业',
        desc: '市场规模的三层量化模型：TAM 为潜在总市场，SAM 为可服务的目标市场，SOM 为初创公司即时可拿下的目标市场。',
        application: 'BP 市场规模章节中防止未经调研的主观推测写“千亿市场”的防错框架。',
        example: 'TAM 农业信息化 1000 亿，SAM 高原果品智慧管理 50 亿，SOM 本省前 3 年目标 2000 万。'
    },

    // === 3. 团队组建与治理 (团队) ===
    {
        id: 'hacker_hipster_hustler',
        name: '合伙人铁三角结构',
        en: '3H Team Model (Hacker, Hipster, Hustler)',
        cat: '团队',
        desc: '硅谷与双创大赛最青睐的跨学科黄金团队组合：Hacker (技术硬核开发)、Hipster (产品体验设计) 与 Hustler (商务运营路演)。',
        application: 'M4 模块指导计算机、艺术设计与商科同学跨学科组队。',
        example: '计算机系做算法 + 艺术系做 UI 与文创 + 经管系做市场拓展与路演答辩。'
    },
    {
        id: 'vesting',
        name: 'Vesting 动态股权成熟协议',
        en: 'Equity Vesting Agreement',
        cat: '团队',
        desc: '合伙人股权按时间（常规 4 年）或里程碑分期成熟的法律机制，通常包含 1 年崖山期 (Cliff)。全职服务未满 1 年离职者，未成熟股权被无偿收回。',
        application: '防止技术合伙人或团队成员中途考研、离职带走核心股权导致公司瘫痪。',
        example: '合伙人持股 20%，服务满 1 年成熟 5%，剩余 15% 在后 3 年按月均匀成熟。'
    },
    {
        id: 'voting_control',
        name: '股权控制权红线',
        en: 'Voting Control Threshold',
        cat: '团队',
        desc: '初创公司必须由 CEO 保持绝对控制权（控制 51% 或 67% 以上投票权），避免团队股权按 33.3% 平分导致的决策僵局。',
        application: '规避初创团队重大事项因平分股权而无法表决瘫痪的致命陷阱。',
        example: 'CEO 持股 60%，CTO 20%，CMO 10%，预留 10% 期权池，决策权高度集中。'
    },
    {
        id: 'option_pool',
        name: '期权池',
        en: 'Option Pool',
        cat: '团队',
        desc: '初创公司在天使或 A 轮融资前，预留占总股本 10%-15% 的股权池，用于后续引进核心高管与骨干技术人才激励。',
        application: '初创公司股权架构设计的标准配置。',
        example: '在公司注册时由 CEO 代持 15% 的期权池，待后续招募高端 CTO 时分期授予。'
    },
    {
        id: 'belbin',
        name: '贝尔宾团队角色理论',
        en: 'Belbin Team Roles',
        cat: '团队',
        desc: '英国梅雷迪思·贝尔宾提出的团队角色模型，指出高绩效团队需具备智多星、协调者、推进者、实干家等 9 种互补角色。',
        application: '在团队组建阶段帮助组员识别个人优势与岗位匹配。',
        example: '让思维敏捷但缺乏细心的组员担任“智多星”，让严谨沉稳的组员担任“完善者”。'
    },

    // === 4. 政策红利与合规 (政策) ===
    {
        id: 'opc',
        name: '一人有限责任公司 (OPC)',
        en: 'One-Person Company',
        cat: '政策',
        desc: '由一个自然人或一个法人股东投资设立的有限责任公司，具备独立法人资格，股东以出资额为限承担有限责任。',
        application: '大学生个人独立创业、成立独立核算项目的法定注册组织形式。',
        example: '毕业大学生设立个人独资科技公司，申请创业贷款并享受税收优惠。'
    },
    {
        id: 'subsidy_loan',
        name: '创业担保贴息贷款',
        en: 'Subsidized Entrepreneurship Loan',
        cat: '政策',
        desc: '国家面向在校及毕业 5 年内大学生等群体提供的贴息政策贷款，企业法人最高可申请 500 万元，个人最高可申请 50 万元。',
        application: 'M5 模块指导项目获取免抵押低成本政策资金支持。',
        example: '一人公司法人凭借创业计划书与园区推荐，向合作银行申请 50 万元信用贴息贷款。'
    },
    {
        id: 'one_off_subsidy',
        name: '一次性创业补贴',
        en: 'One-time Entrepreneurship Subsidy',
        cat: '政策',
        desc: '符合条件的大学生首次创办企业并正常经营满 6 个月、缴纳社会保险，可申请的 5000 元 - 10000 元无偿财政补贴。',
        application: '初创公司成立初期的第一笔政府现金流红利。',
        example: '在校学生注册公司并运营半个学期后，凭营业执照与社保证明申领 8000 元补贴。'
    },
    {
        id: 'ip_work_for_hire',
        name: '职务发明与 IP 归属协议',
        en: 'Work for Hire / IP Assignment Agreement',
        cat: '政策',
        desc: '明确约定合伙人及员工在服务期间研发的代码、算法、外观与专利资产无条件归公司所有的书面法律协议。',
        application: '融资前确保公司资产产权清晰、无个人离职纠纷的必要法律步骤。',
        example: '签署《知识产权归属协议》，规定技术合伙人编写的代码 100% 属于公司资产。'
    },
    {
        id: 'cie_competition',
        name: '中国大学生创新大赛',
        en: 'China College Students Innovation Competition',
        cat: '政策',
        desc: '原“互联网+”大学生创新创业大赛，国家级最高规格双创赛事，将“教育维度（育人成果与学生成长）”置于评审指标首位。',
        application: '指导项目按照教育、创新、团队、商业、社会价值五大维度准备路演大纲。',
        example: '在答辩中突出展现团队成员通过项目实践获得的跨学科成长与专利研发成效。'
    },
    {
        id: 'challenge_cup',
        name: '“挑战杯”创业计划竞赛',
        en: 'Challenge Cup Competition',
        cat: '政策',
        desc: '共青团中央主办的全国大学生创业计划竞赛，极其看重“实践过程的真实性”与“社会基层服务效果”。',
        application: '指导“红旅”与社会服务类项目展示真实社会调研与基层带货数据。',
        example: '展出在 3 个偏远乡村开展的 200 份农户痛点访谈录音与真实的带货账单。'
    },

    // === 5. AI+ 硬科技前沿 (AI硬科技) ===
    {
        id: 'aigc',
        name: '生成式人工智能 (AIGC)',
        en: 'AI-Generated Content',
        cat: 'AI硬科技',
        desc: '基于深度学习大模型，通过提示词交互自动生成文本、图像、代码、音频及 3D 原型的前沿数字生产力技术。',
        application: '应用于 24h 数字人直播、文创 IP 自动生成与零代码 MVP 搭建。',
        example: '利用 AIGC 生图工具在 10 秒内生成符合非遗风格的高保真包装效果图。'
    },
    {
        id: 'llm',
        name: '大语言模型 (LLM)',
        en: 'Large Language Model',
        cat: 'AI硬科技',
        desc: '基于 Transformer 架构、经过海量文本数据预训练的超大规模神经网络模型，具备强大的自然语言理解与推理决策能力。',
        application: '作为 AI 导师 Agent 的底层推理大脑，进行人机协同头脑风暴与路演防御拷问。',
        example: '调用 DeepSeek API 为项目提案进行 8 个维度的自动诊断评分。'
    },
    {
        id: 'prompt_engineering',
        name: '提示词工程',
        en: 'Prompt Engineering',
        cat: 'AI硬科技',
        desc: '通过设计、优化给大语言模型的输入指令，引导 LLM 输出更精准、高质量、结构化回答的跨学科工程技术。',
        application: '在 M1 模块设计产业痛点搜索指令集与角色扮演提示词。',
        example: '使用 CoT (思维链) 提示词：“请一步步思考并罗列出该商业模式的 3 个潜在财务风险。”'
    },
    {
        id: 'rag',
        name: '检索增强生成 (RAG)',
        en: 'Retrieval-Augmented Generation',
        cat: 'AI硬科技',
        desc: '在 LLM 生成回答前，先从外部专有知识库中检索相关文档，将其作为上下文喂给模型，彻底解决大模型幻觉问题。',
        application: '用于将《创新创业基础》专属教材、政策法规与题库精准注入导师对话。',
        example: 'AI 导师先检索本地 300+ 题库与创业贴息贷条文，再生成准确合规的政策解答。'
    },
    {
        id: 'edge_cv',
        name: '边缘计算机视觉 (Edge CV)',
        en: 'Edge Computer Vision',
        cat: 'AI硬科技',
        desc: '将轻量化视觉识别算法直接部署在树莓派、Jetson 等边缘硬件终端，实现无需联网的毫秒级实时图像检测。',
        application: '应用于高原农产品智能分拣硬件、无人机巡检与工业缺陷检测。',
        example: '嵌入式视觉相机在传送带上以 50 帧/秒的速度精准识别苹果表面的病斑与瑕疵。'
    },
    {
        id: 'digital_human',
        name: '2.5D/3D 数字人主播',
        en: 'Digital Human Streamer',
        cat: 'AI硬科技',
        desc: '结合语音合成 (TTS) 与面部驱动算法构建的虚拟数字人，支持 24 小时多语种实时互动与电商直播带货。',
        application: '帮助本地实体店与农产品合作社降低跨境带货主播的人工排班成本。',
        example: '数字人主播用英语、泰语 24 小时流利介绍本地特色非遗茶饮与手工艺品。'
    },
    {
        id: 'low_code',
        name: '零代码/低代码开发',
        en: 'No-Code / Low-Code Development',
        cat: 'AI硬科技',
        desc: '通过拖拽可视化组件或利用自然语言生成代码，使非计算机专业人员也能快速搭建应用系统的开发模式。',
        application: '降低文科、商科同学的 MVP 原型构建门槛，实现全员皆可做出可用产品。',
        example: '经管系同学用拖拽工具在 3 小时内做出一个可在线接收订金的小程序。'
    }
];
