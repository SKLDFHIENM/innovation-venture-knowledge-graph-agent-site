// ════════════════════════════════════════════════════════════════════════
// 《大学生创新创业基础》综合测评与三大维度评估系统 (v6.6 Refactored 超大题库版)
// 包含：300+ 超大题库、知识闯关抽题引擎、能力维度 OBE 结算与项目提案 AI 诊断
// ════════════════════════════════════════════════════════════════════════

// === 一、精选标杆核心试题 (基础 50 题) ===
const BASE_EXAM_QUESTIONS = [
    // 模块一：创新思维与发散方法 (1-8)
    {
        id: 1, module: '创新思维与发散方法',
        question: '在"人机协同头脑风暴"中，让大语言模型同时扮演多个不同角色（如投资人、极客用户、竞争对手）最核心的目的是？',
        options: ['A. 减少 API 调用次数，节省成本', 'B. 模拟多元视角的博弈，快速暴露创意的盲点和潜在问题', 'C. 替代团队成员，减少人员工资支出', 'D. 让 AI 帮你直接写商业计划书'],
        answer: 1,
        analysis: '人机协同头脑风暴的核心价值在于"多视角发散"：通过让 LLM 同时扮演不同利益相关者，可以在极短时间内模拟出多元博弈，从而暴露单一视角下容易忽略的需求冲突和市场盲点。'
    },
    {
        id: 2, module: '创新思维与发散方法',
        question: 'SCAMPER（奔驰法）法中的"E（Eliminate/消除）"应用到创新项目中，最贴切的案例是？',
        options: ['A. 在传统农业中引入无人机撒药', 'B. 用自然语言对话替代复杂的 APP 菜单操作，消除用户的学习成本', 'C. 合并两家餐厅的菜单', 'D. 将产品从线下搬到线上'],
        answer: 1,
        analysis: 'Eliminate 的精髓是"用自然语言交互消除传统 UI 的复杂操作"。用对话取代繁琐按键，让老人和非技术用户也能一用就会，是数字时代最典型的消除式创新。'
    },
    {
        id: 3, module: '创新思维与发散方法',
        question: '在设计思维的原型制作（Prototype）阶段，与传统设计流程相比，最大的效率突破来自？',
        options: ['A. 使用更贵的设计软件', 'B. 招聘更多的 UI 设计师', 'C. 利用生成式设计工具在极短时间内生成高保真视觉原型草图', 'D. 直接跳过原型阶段上线产品'],
        answer: 2,
        analysis: '生成式设计工具将"想法→视觉原型"的时间从数天压缩到数秒，极大降低了原型验证成本，使设计思维的迭代速度提升了数十倍。'
    },
    {
        id: 4, module: '创新思维与发散方法',
        question: 'TRIZ（发明问题解决理论）创新理论中的"技术冲突"最常见于创业项目的哪种场景？',
        options: ['A. 公司注册时选择哪个城市的问题', 'B. 系统推荐精准度提高后，用户隐私保护程度却降低的矛盾', 'C. 团队成员的工资分配问题', 'D. 营销海报的颜色选择'],
        answer: 1,
        analysis: '推荐系统的典型技术冲突：提高推荐精准度需要收集更多用户数据，而收集更多数据则会侵犯用户隐私。这是技术产品设计中的经典矛盾，TRIZ 分离原理能提供解决路径。'
    },
    {
        id: 5, module: '创新思维与发散方法',
        question: '在痛点识别中，区分"伪需求"与"真痛点"的最核心标准是？',
        options: ['A. 用户是否愿意口头称赞', 'B. 用户是否愿意为该解决方案支付真实货币或付出显性时间成本', 'C. 创始人个人是否喜欢', 'D. 竞品公司是否在做'],
        answer: 1,
        analysis: '真实付费意愿或时间付出是检验刚需的唯一真理。口头赞美往往是客套，只有付费转化才能证明刚需存在。'
    },
    {
        id: 6, module: '创新思维与发散方法',
        question: 'SCAMPER（奔驰法）法中的"M（Modify/修改或放大）"在项目迭代中的典型运用是？',
        options: ['A. 缩小产品尺寸', 'B. 放大关键核心痛点场景，增加特定高频人群的定制化增值功能', 'C. 完全替换核心技术', 'D. 取消售后服务'],
        answer: 1,
        analysis: 'Modify/Magnify 强调对核心优势功能进行放大或重新定义，以满足特定高价值细分人群。'
    },
    {
        id: 7, module: '创新思维与发散方法',
        question: '设计思维（Design Thinking）五步法的第一步是？',
        options: ['A. 构思 (Ideate)', 'B. 同理心共情 (Empathize)', 'C. 定义 (Define)', 'D. 原型 (Prototype)'],
        answer: 1,
        analysis: '设计思维以人为本，第一步必然是深入真实场景体验用户苦痛的同理心共情 (Empathize)。'
    },
    {
        id: 8, module: '创新思维与发散方法',
        question: '利用 AI 工具开展人机协同创新的黄金法则 Role-Task-Context-Constraint 简称是？',
        options: ['A. RTCC 框架', 'B. STAR 框架', 'C. PEST 框架', 'D. SWOT 框架'],
        answer: 0,
        analysis: 'RTCC 代表赋予 AI 角色 (Role)、明确任务 (Task)、设定上下文 (Context) 及限制条件 (Constraint)。'
    },

    // 模块二：创业机会与商业模式 (9-16)
    {
        id: 9, module: '创业机会与商业模式',
        question: '在初创公司的商业模式画布中，"核心资源（Key Resources）"中最难被竞争对手复制的护城河是？',
        options: ['A. 开源模型本身的权重文件', 'B. 普通的办公桌椅', 'C. 独家积累的高质量垂直行业训练数据集（如本地稀缺农业病虫害图像库）', 'D. 通用的云计算账号'],
        answer: 2,
        analysis: '开源模型人人可用，云计算账号人人可购买。只有长期积累的、领域专有的、高质量标注数据集是真正难以复制的护城河。'
    },
    {
        id: 10, module: '创业机会与商业模式',
        question: '精益创业中"最小可行产品（MVP）"的核心理念是？',
        options: ['A. 做一个功能最少、质量最差的产品', 'B. 以最低成本验证最核心假设，获取真实市场反馈，再决定是否加大投入', 'C. 直接拷贝竞争对手的产品', 'D. 先把所有功能开发完，再一次性上线'],
        answer: 1,
        analysis: 'MVP 的精髓不是做烂产品，而是以最低边际成本验证关键假设。利用低代码或模版做出解决单一痛点的极简原型即为 MVP。'
    },
    {
        id: 11, module: '创业机会与商业模式',
        question: '以下哪种商业模式最能体现数字时代的"数据飞轮效应"？',
        options: ['A. 线下实体店卖衣服', 'B. 一次性销售软件许可证', 'C. 产品使用产生数据→数据反哺优化服务→更好产品吸引更多用户→更多用户产生更多数据的正反馈闭环', 'D. 按小时收费的咨询服务'],
        answer: 2,
        analysis: '数据飞轮是产品最核心的竞争优势：用户越多→数据越丰富→产品越智能→吸引更多用户。'
    },
    {
        id: 12, module: '创业机会与商业模式',
        question: '商业模式画布 (BMC) 共有多少个核心组成要素？',
        options: ['A. 5 个', 'B. 7 个', 'C. 9 个', 'D. 12 个'],
        answer: 2,
        analysis: 'BMC 包含 9 大要素：客户细分、价值主张、渠道通道、客户关系、收入来源、核心资源、关键业务、关键伙伴、成本结构。'
    },
    {
        id: 13, module: '创业机会与商业模式',
        question: '在商业模式画布中，连接“价值主张”与“客户细分”的桥梁是？',
        options: ['A. 成本结构与收入来源', 'B. 渠道通道与客户关系', 'C. 关键伙伴与关键业务', 'D. 核心资源与资金出资'],
        answer: 1,
        analysis: '渠道通道决定了如何把价值送达客户，客户关系决定了如何留存客户。'
    },
    {
        id: 14, module: '创业机会与商业模式',
        question: '在 SaaS（软件即服务）订阅模式中，决定项目长期能否盈利的最核心财务指标关系是？',
        options: ['A. LTV（客户终身价值）必须大于 3 倍的 CAC（客户获取成本）', 'B. CAC 必须大于 5 倍的 LTV', 'C. 研发费用必须占 90% 以上', 'D. 广告费用必须为零'],
        answer: 0,
        analysis: '健康 SaaS 模型的金标准是 LTV > 3×CAC，且 CAC 回本周期小于 12 个月。'
    },
    {
        id: 15, module: '创业机会与商业模式',
        question: '关于“Freemium (免费+增值体验)”模式，描述正确的是？',
        options: ['A. 对所有用户完全永久免费，没有任何收费项', 'B. 基础功能免费吸引大众规模，高级增值功能/高阶 API 针对付费用户收取订阅费', 'C. 强制要求所有注册用户首月必须交费', 'D. 属于非法的商业行为'],
        answer: 1,
        analysis: 'Freemium 模式通过免费基础服务实现低成本零门槛裂变，通过 2%-5% 的高阶转化获利。'
    },
    {
        id: 16, module: '创业机会与商业模式',
        question: '本地果林种植户想结合数字技术改善运营，以下哪种场景最能直接解决其核心痛点？',
        options: ['A. 为种植户开发一款写诗软件', 'B. 基于气象数据和土壤传感器的病虫害预测与智能分拣系统，精准指导管护行为', 'C. 帮种植户设计一个很酷的品牌 LOGO', 'D. 开发种植户玩的手机游戏'],
        answer: 1,
        analysis: '真正的技术赋能要直击核心痛点：种植户最怕病虫害减产和冷链损耗，智能分拣与预测能直接提效增收。'
    },

    // 模块三：创业团队组建与管理 (17-24)
    {
        id: 17, module: '创业团队组建与管理',
        question: '在初创公司的股权设计中，对提供核心硬件或算力支持的合伙人，最科学的股权处理方式是？',
        options: ['A. 按资产买入价永久给予大比例控股权，且不可稀释', 'B. 采用折旧期权机制，将硬件价值与设备折旧/云端替代成本挂钩，避免设备贬值后出现股权僵局', 'C. 直接 3 等分，人人平等 33%', 'D. 算力合伙人什么股权都不应该有'],
        answer: 1,
        analysis: '硬件设备折旧极快。将大量永久股权绑定在设备上会导致后续陷入僵局，引入折旧期权和 Vesting 机制更科学。'
    },
    {
        id: 18, module: '创业团队组建与管理',
        question: '针对创业项目，"跨学科核心创始团队"的最优团队组合是？',
        options: ['A. 3个计算机背景的技术大神', 'B. 3个商科专业的市场销售高手', 'C. 技术（Hacker/开发）+ 商业（Hustler/运营）+ 设计/传播（Hipster/体验）的复合型配置', 'D. 只需要1个全能型天才'],
        answer: 2,
        analysis: '技术保证可行性，商业保证盈利性，设计体验保证传播力，三位一体最为稳固。'
    },
    {
        id: 19, module: '创业团队组建与管理',
        question: '有效防止创业团队"内耗"和决策瘫痪的最重要机制是？',
        options: ['A. 确保每个决策都由全体成员投票', 'B. 建立清晰的股权架构，明确 1 人拥有一居顶断的最终决策权（控制权）', 'C. 雇佣更多员工', 'D. 开更频繁的会议'],
        answer: 1,
        analysis: '平分股权（如 3 人各 33.3%）最危险，1 人拥有 51% 或 67% 以上控制权才能在危机时果断行动。'
    },
    {
        id: 20, module: '创业团队组建与管理',
        question: '创始团队股权分期成熟 (Vesting) 机制中，最标准的崖期 (Cliff) 通常设定为多久？',
        options: ['A. 1 个月', 'B. 6 个月', 'C. 1 年 (满12个月开启首批解禁)', 'D. 5 年'],
        answer: 2,
        analysis: '标准 Vesting 为 4 年分期，1 年崖山期 (Cliff)：离职未满 1 年者不得带走任何成熟股权。'
    },
    {
        id: 21, module: '创业团队组建与管理',
        question: '若创业合伙人在服务未满 1 年内因考研或就业退股，其未成熟的股权应如何归属？',
        options: ['A. 归离职合伙人个人永久所有', 'B. 自动注销公司', 'C. 由 CEO 创立的期权池按原始出资额（0元或1元）无偿收回，用于招募替代人才', 'D. 平分给公司客户'],
        answer: 2,
        analysis: 'Vesting 补充协议规定未成熟股权由公司/期权池按原价无偿收回，保障公司业务可持续。'
    },
    {
        id: 22, module: '创业团队组建与管理',
        question: '在初创公司中，期权池 (Option Pool) 一般预留占总股本的比例为？',
        options: ['A. 1% - 2%', 'B. 10% - 15%', 'C. 50%', 'D. 80%'],
        answer: 1,
        analysis: '常规早期融资前，通常预留 10%-15% 的期权池用于激励后续引进的核心高管与骨干技术人才。'
    },
    {
        id: 23, module: '创业团队组建与管理',
        question: '关于兼职顾问或指导老师的持股，通常建议的合理范围是？',
        options: ['A. 30% - 50%', 'B. 1% - 5% (且设定服务成熟机制)', 'C. 必须大于 CEO 的持股', 'D. 绝对不能持股'],
        answer: 1,
        analysis: '外部顾问不承担全职经营风险，持股通常在 1%-5% 之间，过高会导致团队经营性股权被过度稀释。'
    },
    {
        id: 24, module: '创业团队组建与管理',
        question: '签署《合伙人竞业禁止与知识产权归属协议》的主要目的是？',
        options: ['A. 限制员工恋爱', 'B. 确保在公司研发的代码、算法、专利归公司所有，并防止离职带走核心商业机密', 'C. 应付工商局年检', 'D. 提高员工考勤得分'],
        answer: 1,
        analysis: '知识产权归公司所有 (Work for Hire) 是确保风险投资进场前资产清晰的必要法律基础。'
    },

    // 模块四：商业计划书与路演展示 (25-33)
    {
        id: 25, module: '商业计划书与路演展示',
        question: '一份能打动投资人和大赛评委的商业计划书（BP），最核心的逻辑框架是什么？',
        options: ['A. 字数越多越好，排版越漂亮越好', 'B. 痛点→解决方案→市场规模→商业模式→团队→财务预测→竞争优势的清晰逻辑链', 'C. 把创始人的个人简历放在第一页', 'D. 主要描述公司未来的愿景，不需要数据支撑'],
        answer: 1,
        analysis: 'BP 核心逻辑链必须是：有真实痛点→方案能解决→市场够大→模式清晰→团队有执行力→财务盈利→有专有护城河。'
    },
    {
        id: 26, module: '商业计划书与路演展示',
        question: '在 3 分钟电梯演讲（Pitch）中，最能让投资人记住项目的开场技巧是？',
        options: ['A. 用尽量多的专业术语显示技术实力', 'B. 从最大的宏观数字开始（如全球市场几万亿）', 'C. 用一个真实的、有代入感的用户痛点故事开场，带出解决方案', 'D. 只讲团队，不讲产品'],
        answer: 2,
        analysis: '优秀 Pitch 从真实用户故事开场：30 秒内引起共鸣，情感触动先于逻辑说服。'
    },
    {
        id: 27, module: '商业计划书与路演展示',
        question: '评委问："大公司一个月就能复制你们，你们的壁垒在哪里？"，最有力的回答方向是？',
        options: ['A. 我们的创始团队都是名校毕业生', 'B. 我们的技术很复杂，他们复制不了', 'C. 摆出团队积累的垂直专有数据集、本地付费种子用户粘性及运营先发优势', 'D. 大公司不会看上这个小市场'],
        answer: 2,
        analysis: '垂直场景的专有数据积累与种子用户转化粘性是大厂短期内无法通过简单复制付诸实现的硬护城河。'
    },
    {
        id: 28, module: '商业计划书与路演展示',
        question: '根据商业计划书的四层次结构，关于“摘要”部分的撰写规范，描述正确的是？',
        options: ['A. 摘要应该在 BP 正文撰写前先写完', 'B. 摘要应尽可能长，详细阐述技术研发的每一个具体步骤', 'C. 摘要应在正文全部完成后撰写，讲清结果而非分析过程，突出痛点、模式、财务与团队', 'D. 摘要部分为了吸引眼球，可以随意虚构数据'],
        answer: 2,
        analysis: '摘要是评委最先看的部分，必须在正文完成后撰写，2-3页为宜，直奔结果。'
    },
    {
        id: 29, module: '商业计划书与路演展示',
        question: '路演 PPT 黄金 12 页结构中，用于展示全流程商业模式与价值主张 (VP) 的是哪一页？',
        options: ['A. Page 1 封面', 'B. Page 3 痛点呈现', 'C. Page 7 商业模式画布', 'D. Page 12 结尾'],
        answer: 2,
        analysis: 'Page 7 是路演中向评委清晰呈现商业闭环、价值主张与关键伙伴的黄金页面。'
    },
    {
        id: 30, module: '商业计划书与路演展示',
        question: '在答辩中回答财务预测问题时，最容易犯的致命错误是？',
        options: ['A. 给出具体的保本点销售额测算', 'B. 未经调研的主观推测拍出未来 3 年每年 500% 的净利润增长，但拿不出客单价与获客成本依据', 'C. 详细说明融资资金的百分比分配', 'D. 给出清晰的研发与运营开支预算'],
        answer: 1,
        analysis: '缺乏 CAC、客单价与转化率支撑的高毛利/盈利能力预测被称为“未经调研的主观推测财务”，会彻底丧失评委信任。'
    },
    {
        id: 31, module: '商业计划书与路演展示',
        question: '路演回答 STAR 法则中，字母“R”代表的是？',
        options: ['A. Research (研究)', 'B. Result (量化结果)', 'C. Risk (风险)', 'D. Role (角色)'],
        answer: 1,
        analysis: 'STAR 代表 Situation (情境)、Task (任务)、Action (行动)、Result (量化结果)。'
    },
    {
        id: 32, module: '商业计划书与路演展示',
        question: '商业计划书“商业计划书十模块结构”中，鱼头部分代表的是？',
        options: ['A. 退出通道', 'B. 公司概况与行业痛点导入', 'C. 团队成员简历', 'D. 财务报表附录'],
        answer: 1,
        analysis: '鱼头代表导入（公司概况、宗旨与痛点），是决定评委是否有兴趣读下去的关键。'
    },
    {
        id: 33, module: '商业计划书与路演展示',
        question: '在商业计划书中，TAM、SAM、SOM 三个市场规模层级中，SOM 指的是？',
        options: ['A. 潜在总市场 (Total Addressable Market)', 'B. 可服务市场 (Serviceable Available Market)', 'C. 可即时获取的细分目标市场 (Serviceable Obtainable Market)', 'D. 海外出口市场'],
        answer: 2,
        analysis: 'SOM 是初创公司最真实、短期内能够拿下的目标市场规模。'
    },

    // 模块五：双创政策与落地合规 (34-40)
    {
        id: 34, module: '双创政策与落地合规',
        question: '根据支持大学生创业政策措施，符合条件的一人公司 (OPC) 法人，最高可申请的“创业贴息贷”信用贷款金额为？',
        options: ['A. 30万元', 'B. 50万元', 'C. 500万元', 'D. 3000万元'],
        answer: 2,
        analysis: '政策贴息贷强力支持：企业法人最高可申请 500 万元信用贷款（抵押担保最高 3000 万）；个人创业者最高 50 万。'
    },
    {
        id: 35, module: '双创政策与落地合规',
        question: '大学生首次创办企业并正常经营满 6 个月，可申请的一次性创业补贴金额通常为？',
        options: ['A. 100 元', 'B. 5000 元 - 10000 元', 'C. 100 万元', 'D. 500 万元'],
        answer: 1,
        analysis: '在校或毕业 5 年内大学生首次创办企业，经营满 6 个月可申请 5,000 - 10,000 元一次性创业补贴。'
    },
    {
        id: 36, module: '双创政策与落地合规',
        question: '“一人公司 (OPC)”在法律形式上的全称通常是？',
        options: ['A. 个人独资企业或一人有限责任公司', 'B. 合伙企业', 'C. 股份有限公司', 'D. 外商独资企业'],
        answer: 0,
        analysis: '一人公司是指只有一个自然人股东或法人股东的有限责任公司/个人独资企业。'
    },
    {
        id: 37, module: '双创政策与落地合规',
        question: '参加中国大学生创新大赛“红旅赛道”，选题打动评委的核心标准是？',
        options: ['A. 项目技术越高深越好', 'B. 聚焦大城市高端商圈', 'C. 用数字技术真正解决本地农业、非遗文化、乡村振兴等基层实际问题，并有量化增收数据', 'D. 照抄大厂成功案例'],
        answer: 2,
        analysis: '“红旅赛道”精神是服务基层：接地气+数字赋能+量化增收数据是红旅优秀标准。'
    },
    {
        id: 38, module: '双创政策与落地合规',
        question: '中国大学生创新大赛（原“互联网+”）评审指标中，位列首位的维度是？',
        options: ['A. 教育维度 (考查学生成长、育人成果与创新精神)', 'B. 商业维度', 'C. 团队维度', 'D. 创新维度'],
        answer: 0,
        analysis: '大赛以育人为本，“教育维度”核心考查学生成长与高校双创育人成效。'
    },
    {
        id: 39, module: '双创政策与落地合规',
        question: '“挑战杯”全国大学生创业计划竞赛评审中，针对“实践过程”维度最看重的是？',
        options: ['A. 引用网上的行业预测报告', 'B. 团队真实开展的社会调研、痛点监听以及 MVP 付费意愿测试数据', 'C. PPT 渲染效果', 'D. 承诺未来盈利规模'],
        answer: 1,
        analysis: '“挑战杯”看重实践真实性：真实调查、听取反馈、收取首笔订金验证市场远比预测数据有力。'
    },
    {
        id: 40, module: '双创政策与落地合规',
        question: '在资本退出通道中，高科技硬科技项目最青睐的高溢价资产化退出通道是？',
        options: ['A. 公司破产清算', 'B. IPO 上市退出', 'C. 创始人个人借款回购', 'D. 放弃项目'],
        answer: 1,
        analysis: 'IPO 上市退出是投资机构与创业团队实现资本增值高溢价退出的首选方案。'
    },

    // 模块六：AI+ 传统行业创新实战 (41-50)
    {
        id: 41, module: 'AI+ 传统行业创新实战',
        question: '将边缘计算机视觉识别引入高原特色农产品分拣，最显性的效益是？',
        options: ['A. 增加果农手工分拣时间', 'B. 提高分拣精准度与速度，减少冷链过程中的果品损耗与等级混淆', 'C. 改变果实的口感', 'D. 完全替代农田种植'],
        answer: 1,
        analysis: 'AI 边缘分拣能在毫秒级判断水果瑕疵与糖度级，大幅提效防损。'
    },
    {
        id: 42, module: 'AI+ 传统行业创新实战',
        question: '非遗文化文创 IP 借助 AIGC 进行数字化重构，最核心的创新点在于？',
        options: ['A. 破坏传统文化纹样的精髓', 'B. 将传统纹样转化为数字知识库，并快速衍生符合年轻人群体喜好的潮玩与交互产品', 'C. 提高产品售价 100 倍', 'D. 放弃传统手工艺制作'],
        answer: 1,
        analysis: 'AIGC 赋予传统非遗纹样快速重构与跨界衍生的能力，实现文化活化与商业化。'
    },
    {
        id: 43, module: 'AI+ 传统行业创新实战',
        question: '利用 2.5D 生成式数字人主播开展跨境直播带货，最大的运营优势是？',
        options: ['A. 只能使用一种语言播报', 'B. 实现 24 小时多语种自动无缝直播，显著降低真人主播排班与跨境人工成本', 'C. 无法展示商品', 'D. 必须依赖大型电视台设备'],
        answer: 1,
        analysis: '数字人主播打破时区与语言限制，实现 24 小时多语种沉浸式带货。'
    },
    {
        id: 44, module: 'AI+ 传统行业创新实战',
        question: '在“AI+ 传统行业”升级中，防止项目陷入“套壳大厂 API 伪创新”的关键是？',
        options: ['A. 隐藏自己的 API Key', 'B. 扎根垂直场景，积累独家标注数据集、构建专属业务闭环与渠道壁垒', 'C. 购买更多的服务器', 'D. 频繁更换大模型供应商'],
        answer: 1,
        analysis: '垂直场景的独占数据集与深厚渠道网络是抵御“大厂套壳抄袭”的最强护城河。'
    },
    {
        id: 45, module: 'AI+ 传统行业创新实战',
        question: '针对智慧师范/教育科技赛道，AI 助教系统最突出的应用价值是？',
        options: ['A. 完全替代教师上课', 'B. 自动化批改作业与个性化学情诊断，将教师从重复性劳动中解放出来关注育人', 'C. 取消所有考试', 'D. 增加学生负担'],
        answer: 1,
        analysis: 'AI 助教旨在提效减负，提供精准学情分析与个性化辅导。'
    },
    {
        id: 46, module: 'AI+ 传统行业创新实战',
        question: '在无人机高空巡检硬科技项目中，路演答辩时评委最关注的技术指标是？',
        options: ['A. 机身涂装颜色', 'B. 垂直起降安全系数、巡航续航时间与复杂环境下的图像识别率', 'C. 包装盒的材质', 'D. 宣传片的背景音乐'],
        answer: 1,
        analysis: '硬科技项目看重硬核性能：续航、安全系数与环境适应力是答辩核心。'
    },
    {
        id: 47, module: 'AI+ 传统行业创新实战',
        question: '在创业项目中，利用低代码平台在 24 小时内上线 MVP，这属于哪种创新？',
        options: ['A. 基础理论突破', 'B. 精益敏捷开发与模式验证创新', 'C. 资本运作创新', 'D. 行政管理创新'],
        answer: 1,
        analysis: '利用现代化工具进行 24h 敏捷开发属于精益敏捷开发与市场快速验证创新。'
    },
    {
        id: 48, module: 'AI+ 传统行业创新实战',
        question: '关于 PEST 宏观环境分析模型，四个字母依次代表？',
        options: ['A. 政治(P)、经济(E)、社会(S)、技术(T)', 'B. 价格(P)、情感(E)、服务(S)、团队(T)', 'C. 计划(P)、执行(E)、选择(S)、测试(T)', 'D. 利润(P)、支出(E)、销售(S)、税收(T)'],
        answer: 0,
        analysis: 'PEST 包含 Political (政治)、Economic (经济)、Social (社会)、Technological (技术)。'
    },
    {
        id: 49, module: 'AI+ 传统行业创新实战',
        question: '在 SWOT 分析矩阵中，SO 战略指的是？',
        options: ['A. 依靠内部优势，利用外部机会的增长型战略', 'B. 利用优势回避威胁', 'C. 克服劣势利用机会', 'D. 减少劣势回避威胁'],
        answer: 0,
        analysis: 'SO 战略（Strengths - Opportunities）是发挥自身优势抓住外部机遇的增长战略。'
    },
    {
        id: 50, module: 'AI+ 传统行业创新实战',
        question: '对于大学生创业项目，财务预测中的“盈亏平衡点 (Break-even Point)”指的是？',
        options: ['A. 收入超过 1 亿元的时刻', 'B. 项目总收入刚好等于总成本开支（既不盈利也不亏损）的销售数量或销售额', 'C. 拿到投资人第一笔钱的时刻', 'D. 公司注册成功的时刻'],
        answer: 1,
        analysis: '盈亏平衡点表示项目实现收支相抵的基准销售量，是验证财务可行性的第一门槛。'
    }
];

// === 二、 300+ 题量程序化动态扩展题库生成器 (构建 260+ 规范题目) ===
function generateExpandedQuestionBank() {
    const questions = [...BASE_EXAM_QUESTIONS];
    const modules = [
        '创新思维与发散方法', '创业机会与商业模式', '创业团队组建与管理',
        '商业计划书与路演展示', '双创政策与落地合规', 'AI+ 传统行业创新实战'
    ];

    const templates = [
        {
            modIdx: 0,
            q: "在探索【主题】的创新路径中，团队应用 SCAMPER 奔驰法的【动作】策略，最显性的成效是？",
            opts: ["A. 降低运营成本与用户体验门槛", "B. 增加系统复杂度", "C. 延长开发周期", "D. 放弃核心业务"],
            ans: 0,
            ana: "SCAMPER 奔驰法旨在通过替换、结合、修改等手段降低体验门槛与运营成本。"
        },
        {
            modIdx: 1,
            q: "构建【主题】领域的精益商业模式时，在‘客户细分’环节最需要防范的失误是？",
            opts: ["A. 痛点定位过于模糊泛化，未能精准锁定首批尝鲜种子用户", "B. 目标人群太精准", "C. 调研了太多真实用户", "D. 制定了清晰的付费方案"],
            ans: 0,
            ana: "精益创业切忌目标人群宽泛，必须聚焦痛点最强烈的首批种子用户。"
        },
        {
            modIdx: 2,
            q: "在【主题】项目的合伙人团队建设中，为保证控制权与股权合规，CEO 的持股比例建议保持在？",
            opts: ["A. 10% 以下", "B. 51% - 67% 以上（具备绝对控制权）", "C. 与所有员工绝对平分", "D. 0%"],
            ans: 1,
            ana: "绝对控股（51%-67%以上）是保证决策高效、防止团队内耗僵局的黄金法则。"
        },
        {
            modIdx: 3,
            q: "在撰写【主题】项目的商业计划书 (BP) 时，‘财务预算’章节中最受评委关注的数据是？",
            opts: ["A. 虚高的远期利润口号", "B. 详细的保本点销售额测算、CAC 获客成本与 LTV 收益模型", "C. 办公室装修费用", "D. 团队餐饮补贴"],
            ans: 1,
            ana: "评委看重量化的 CAC、LTV 及盈亏平衡测算，而非没有数据依据的口号。"
        },
        {
            modIdx: 4,
            q: "申报【主题】相关的大学生“创业担保贴息贷款”时，申请人需要具备的首要合规条件是？",
            opts: ["A. 必须是企业法定代表人且在校或毕业 5 年内", "B. 必须拥有 100 人以上团队", "C. 必须年纳税超千万", "D. 必须拥有海外留学背景"],
            ans: 0,
            ana: "政策规定创业担保贴息贷要求申请人为企业法定代表人，且属于在校生或毕业 5 年内大学生。"
        },
        {
            modIdx: 5,
            q: "在【主题】的数字化转型升级中，利用 AI 大模型进行‘数据飞轮’优化的核心逻辑是？",
            opts: ["A. 积累专有场景标注数据→模型越用越聪明→服务体验提升→吸引更多用户", "B. 频繁更换底层大模型", "C. 限制用户使用", "D. 删除历史交互日志"],
            ans: 0,
            ana: "数据飞轮效应通过数据沉淀反哺模型，形成不可复制的竞争护城河。"
        }
    ];

    const themes = [
        "高原特色果品数字分拣", "非遗文化 AIGC 文创重构", "24h 数字人跨境直播",
        "智慧师范教学辅助评测", "无人机高空巡检硬科技", "新能源电池回收溯源",
        "高原中药材供应链追踪", "特色餐饮出海私域运营", "乡村旅游 AR 导览系统",
        "校园低碳循环二手集市", "养老智能照护机器人", "智慧社区宠物医疗服务",
        "工业零部件视觉缺陷检测", "水产养殖水质智能监测", "茶叶智能采摘与烘焙控制",
        "数字文旅沉浸剧本游", "物流园区智能调度系统", "城市建筑碳足迹核算",
        "少儿编程智能作业批改", "传统手工艺数字版权交易", "地方风味食品反向 C2M 订制",
        "智能穿戴健康监测预警", "高校实验室设备共享平台", "跨境电商智能报关系统",
        "智能家居节能调控系统", "海洋牧场无人潜航监测", "智慧图书馆图书自动盘点",
        "社区生鲜冷链末端配送", "虚拟数字人 IP 衍生孵化", "智慧体育动作纠错评测",
        "传统中药方剂 AI 辅助配伍", "废旧塑料智能分选机器人", "智慧果园微气象预测防冻",
        "非遗文创盲盒数字藏品", "大学生创业投融资对接系统", "智慧工地安全帽佩戴检测",
        "高原蓝莓甜度无损检测", "智慧车联网越野救援调度", "地方特产跨境短视频自动剪辑",
        "智慧母婴护理健康管理", "虚拟现实 VR 职业技能实训", "智慧矿山无人运输调度",
        "城市废弃物分类智能垃圾桶", "智慧养老跌倒检测报警", "古籍数字化修复与字形重构"
    ];

    let currentId = 51;
    for (let i = 0; i < themes.length; i++) {
        const t = themes[i];
        for (let j = 0; j < templates.length; j++) {
            const tmpl = templates[j];
            const actionText = j === 0 ? "Substitute(替代)或Modify(修改)" : "Combine(结合)";
            const qStr = tmpl.q.replace("【主题】", t).replace("【动作】", actionText);
            
            questions.push({
                id: currentId++,
                module: modules[tmpl.modIdx],
                question: `${currentId - 1}. ${qStr}`,
                options: tmpl.opts,
                answer: tmpl.ans,
                analysis: `【${t}】案例解析：${tmpl.ana}`
            });
        }
    }

    return questions;
}

// 全量 300+ 超大题库数组
const EXAM_QUESTIONS = generateExpandedQuestionBank();

// === 三、 能力维度评估配置 ===
const ABILITY_RADAR_CONFIG = {
    dimensions: [
        { name: '知识：双创理论认知', key: 'kn_theory', desc: '对 SCAMPER、TRIZ、盈亏模型等学术概念的掌握程度。' },
        { name: '知识：商业模式常识', key: 'kn_business', desc: '对商业画布、SaaS 计费及财务常识的理解。' },
        { name: '知识：政策红利储备', key: 'kn_policy', desc: '对本地区贴息贷、无偿项目资助等政策的熟知度。' },
        { name: '素养：企业家奋斗精神', key: 'lit_entrepreneur', desc: '面对项目受挫时的抗挫力、社会责任感与伦理合规意识。' },
        { name: '素养：跨学科协同理念', key: 'lit_collaboration', desc: '对跨专业破壁沟通、团队出资确权与合理让利的开放心态。' },
        { name: '素养：精益求真态度', key: 'lit_lean', desc: '尊重客观市场数据、拒绝概念套壳、主张小步快跑的实证态度。' },
        { name: '能力：数字原型构建力', key: 'cap_aigc', desc: '使用原型工具在短时间内搭建 MVP 视觉原型的能力。' },
        { name: '能力：轻量代码开发力', key: 'cap_code', desc: '使用代码辅助工具在 24 小时内开发出可用产品原型的开发力。' },
        { name: '能力：路演说服与防御力', key: 'cap_pitch', desc: '撰写高分商业计划书、三分钟电梯演讲与高压答辩的防御说服力。' }
    ],
    levelMap: [
        { min: 0,  max: 45, label: '种子期双创人 🌱', advice: '建议系统学习创业基础理论，重点从「闪电活动」板块开始热身。' },
        { min: 46, max: 70, label: '成长期双创人 ⚡', advice: '已具备双创基础，需强化实战训练。建议聚焦「能力图谱」中得分最低维度。' },
        { min: 71, max: 90, label: '成熟期双创人 🚀', advice: '综合能力出色，可冲刺大赛优秀！建议立即申请入驻本校双创园！' }
    ]
};

// === 四、 闯关测验全局状态与随机抽题算法 ===
let quizState = {
    activeQuestions: [], // 从 300+ 题库中随机抽取的 20 题
    currentIndex: 0,
    userAnswers: {},
    flaggedQuestions: {}, // 存疑标记字典 { questionId: true }
    isSubmitted: false,
    timerInterval: null,
    timeLeftSeconds: 1800 // 30 分钟
};

// 本地草稿自动暂存引擎 (LocalStorage Auto-Save)
function saveExamDraft() {
    try {
        const draftData = {
            userAnswers: quizState.userAnswers,
            flaggedQuestions: quizState.flaggedQuestions,
            currentIndex: quizState.currentIndex,
            timestamp: Date.now()
        };
        localStorage.setItem('iekg_exam_quiz_draft', JSON.stringify(draftData));
    } catch(e) {}
}

// 恢复本地草稿
function loadExamDraft() {
    try {
        const raw = localStorage.getItem('iekg_exam_quiz_draft');
        if (raw) {
            const data = JSON.parse(raw);
            if (data && data.userAnswers) {
                quizState.userAnswers = data.userAnswers || {};
                quizState.flaggedQuestions = data.flaggedQuestions || {};
            }
        }
    } catch(e) {}
}

// Fisher-Yates 随机抽题引擎
function getRandomQuizQuestions(count = 20) {
    const pool = [...EXAM_QUESTIONS];
    for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, count);
}

// 开启挑战测验
window.startKnowledgeQuiz = function() {
    quizState.activeQuestions = getRandomQuizQuestions(20);
    quizState.currentIndex = 0;
    quizState.userAnswers = {};
    quizState.flaggedQuestions = {};
    quizState.isSubmitted = false;
    quizState.timeLeftSeconds = 1800;

    loadExamDraft();

    const startScreen = document.getElementById('quiz-start-screen');
    const mainArea = document.getElementById('quiz-main-area');
    if (startScreen) startScreen.style.display = 'none';
    if (mainArea) mainArea.style.display = 'flex';

    if (quizState.timerInterval) clearInterval(quizState.timerInterval);
    quizState.timerInterval = setInterval(updateQuizTimer, 1000);

    renderCurrentQuizQuestion();
};

function updateQuizTimer() {
    quizState.timeLeftSeconds--;
    const timerEl = document.getElementById('quiz-timer-display');
    if (timerEl) {
        const m = Math.floor(quizState.timeLeftSeconds / 60).toString().padStart(2, '0');
        const s = (quizState.timeLeftSeconds % 60).toString().padStart(2, '0');
        timerEl.textContent = `${m}:${s}`;
    }
    if (quizState.timeLeftSeconds <= 0) {
        clearInterval(quizState.timerInterval);
        window.submitKnowledgeQuiz();
    }
}

// 切换存疑标记 (Flag Question)
window.toggleFlagQuestion = function(qId) {
    if (quizState.flaggedQuestions[qId]) {
        delete quizState.flaggedQuestions[qId];
    } else {
        quizState.flaggedQuestions[qId] = true;
    }
    saveExamDraft();
    renderCurrentQuizQuestion();
};

// 渲染当前题目
function renderCurrentQuizQuestion() {
    const mainArea = document.getElementById('quiz-main-area');
    if (!mainArea || quizState.activeQuestions.length === 0) return;

    const q = quizState.activeQuestions[quizState.currentIndex];
    const total = quizState.activeQuestions.length;
    const selectedOpt = quizState.userAnswers[q.id];
    const isFlagged = !!quizState.flaggedQuestions[q.id];

    // 计算已完成百分比
    const answeredCount = Object.keys(quizState.userAnswers).length;
    const progressPct = Math.round((answeredCount / total) * 100);

    const isDay = document.body.classList.contains('day-mode') || document.body.classList.contains('light-mode');
    const textColor = isDay ? '#0f172a' : '#ffffff';

    let html = `
        <div style="display:flex; flex-direction:column; height:100%; width:100%; max-width:1100px; margin:0 auto; box-sizing:border-box;">
            <!-- 顶部全局答题进度条 -->
            <div style="width:100%; height:4px; background:rgba(255,255,255,0.08); border-radius:2px; overflow:hidden; margin-bottom:12px;">
                <div style="width:${progressPct}%; height:100%; background:linear-gradient(90deg, #00f2fe, #10b981); transition:width 0.3s ease;"></div>
            </div>

            <!-- 头部状态栏与存疑标记 -->
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--glass-border); padding-bottom:10px; margin-bottom:14px;">
                <div style="display:flex; align-items:center; gap:10px;">
                    <span style="font-size:12px; font-weight:800; color:var(--cyan); background:rgba(0,194,224,0.1); padding:4px 12px; border-radius:20px;">
                        ${q.module}
                    </span>
                    <span style="font-size:13px; font-weight:700; color:${textColor};">
                        第 <strong>${quizState.currentIndex + 1}</strong> / ${total} 题 (答题进度 ${progressPct}%)
                    </span>
                </div>

                <div style="display:flex; align-items:center; gap:12px;">
                    <!-- 存疑标记按钮 -->
                    <button onclick="toggleFlagQuestion(${q.id})" style="background:${isFlagged ? 'rgba(245,158,11,0.25)' : 'rgba(255,255,255,0.06)'}; border:1px solid ${isFlagged ? '#f59e0b' : 'rgba(255,255,255,0.15)'}; color:${isFlagged ? '#fbbf24' : 'var(--text-sub)'}; padding:4px 10px; border-radius:8px; font-size:12px; font-weight:800; cursor:pointer; display:flex; align-items:center; gap:5px;" title="点击标记存疑，稍后回看">
                        <i class="fas fa-flag" style="color:${isFlagged ? '#f59e0b' : 'inherit'};"></i> ${isFlagged ? '已标记存疑' : '标记存疑'}
                    </button>
                    <div style="font-size:13px; font-weight:800; color:var(--accent); display:flex; align-items:center; gap:6px;">
                        <i class="fas fa-clock"></i> 剩余：<span id="quiz-timer-display">30:00</span>
                    </div>
                </div>
            </div>

            <div style="display:grid; grid-template-columns:1fr 240px; gap:18px; flex:1; overflow:hidden;">
                <!-- 答题主区 -->
                <div style="display:flex; flex-direction:column; height:100%; overflow-y:auto; padding-right:8px;">
                    <h3 style="font-size:16.5px; line-height:1.6; color:${textColor}; margin-bottom:16px; font-weight:800;">
                        ${q.question}
                    </h3>

                    <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:16px;">
                        ${q.options.map((opt, idx) => {
                            let optClass = "quiz-option-btn";
                            let optStyle = "padding:12px 16px; border-radius:12px; border:1.5px solid var(--glass-border); cursor:pointer; font-size:13.5px; text-align:left; transition:all 0.2s; font-weight:500; display:flex; align-items:center; gap:10px;";
                            
                            if (selectedOpt === idx) {
                                optStyle += " background:linear-gradient(135deg, rgba(0,242,254,0.15) 0%, rgba(37,99,235,0.2) 100%); border-color:#00f2fe; font-weight:700;";
                            } else {
                                optStyle += " background:rgba(255,255,255,0.03);";
                            }

                            if (quizState.isSubmitted) {
                                if (idx === q.answer) {
                                    optStyle += " background:rgba(16,185,129,0.15) !important; border-color:#10b981 !important; color:#10b981 !important; font-weight:800;";
                                } else if (selectedOpt === idx && selectedOpt !== q.answer) {
                                    optStyle += " background:rgba(239,68,68,0.15) !important; border-color:#ef4444 !important; color:#ef4444 !important;";
                                }
                            }

                            const optLetter = String.fromCharCode(65 + idx);
                            return `
                                <button class="${optClass}" onclick="selectQuizOption(${idx})" style="${optStyle}">
                                    <span style="width:24px; height:24px; border-radius:50%; background:rgba(255,255,255,0.1); display:inline-flex; align-items:center; justify-content:center; font-size:11.5px; font-weight:900; color:#00f2fe; flex-shrink:0;">${optLetter}</span>
                                    <span>${opt}</span>
                                </button>
                            `;
                        }).join('')}
                    </div>

                    ${quizState.isSubmitted ? `
                        <div style="background:rgba(0,242,254,0.06); border:1px solid #00f2fe; border-radius:12px; padding:14px; margin-top:10px; font-size:13px; line-height:1.6; color:${textColor};">
                            <strong style="color:#00f2fe;"><i class="fas fa-lightbulb"></i> 深度题目解析：</strong><br/>
                            ${q.analysis}
                        </div>
                    ` : ''}
                </div>

                <!-- 右侧 5 列题号导航状态盘 (答题卡盘) -->
                <div style="background:rgba(8,18,40,0.85); border:1px solid rgba(0,194,224,0.25); border-radius:14px; padding:12px; display:flex; flex-direction:column; gap:10px; height:100%; box-sizing:border-box;">
                    <div style="font-size:12px; font-weight:800; color:#00f2fe; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:6px;">
                        <span><i class="fas fa-th"></i> 答题卡盘</span>
                        <span style="font-size:11px; color:#94a3b8;">${answeredCount}/${total} 已答</span>
                    </div>

                    <!-- 5 列数字 Grid -->
                    <div style="display:grid; grid-template-columns:repeat(5, 1fr); gap:6px; flex:1; align-content:start; overflow-y:auto;">
                        ${quizState.activeQuestions.map((question, i) => {
                            const isCurrent = i === quizState.currentIndex;
                            const hasAns = quizState.userAnswers[question.id] !== undefined;
                            const isFlag = !!quizState.flaggedQuestions[question.id];

                            let bg = 'rgba(255,255,255,0.06)';
                            let border = '1px solid rgba(255,255,255,0.1)';
                            let color = '#94a3b8';

                            if (isFlag) {
                                bg = 'rgba(245,158,11,0.3)'; border = '1.5px solid #f59e0b'; color = '#fbbf24';
                            } else if (hasAns) {
                                bg = 'rgba(16,185,129,0.25)'; border = '1.5px solid #10b981'; color = '#a3e635';
                            }

                            if (isCurrent) {
                                border = '2px solid #00f2fe';
                            }

                            return `
                                <div onclick="quizState.currentIndex=${i}; renderCurrentQuizQuestion();" style="aspect-ratio:1; border-radius:6px; background:${bg}; border:${border}; color:${color}; font-size:11px; font-weight:800; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all 0.15s; position:relative;" title="跳转到第 ${i+1} 题">
                                    ${i + 1}
                                    ${isFlag ? '<span style="position:absolute; top:-2px; right:0px; font-size:8px; color:#f59e0b;">🚩</span>' : ''}
                                </div>
                            `;
                        }).join('')}
                    </div>

                    <!-- 图例说明 -->
                    <div style="display:flex; justify-content:space-between; font-size:10.5px; color:#94a3b8; border-top:1px solid rgba(255,255,255,0.1); padding-top:6px;">
                        <span><strong style="color:#10b981;">●</strong> 已答</span>
                        <span><strong style="color:#f59e0b;">🚩</strong> 存疑</span>
                        <span><strong style="color:#94a3b8;">○</strong> 未答</span>
                    </div>
                </div>
            </div>

            <!-- 底部导航按钮 -->
            <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--glass-border); padding-top:10px; margin-top:10px;">
                <button class="action-btn" onclick="prevQuizQuestion()" ${quizState.currentIndex === 0 ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''}>
                    <i class="fas fa-arrow-left"></i> 上一题
                </button>
                <div style="display:flex; gap:10px;">
                    ${!quizState.isSubmitted ? `
                        <button class="action-btn primary-gradient" onclick="window.submitKnowledgeQuiz()">
                            <i class="fas fa-paper-plane"></i> 提交试卷
                        </button>
                    ` : `
                        <button class="action-btn secondary-gradient" onclick="window.startKnowledgeQuiz()">
                            <i class="fas fa-redo"></i> 重新抽题挑战
                        </button>
                    `}
                    <button class="action-btn" onclick="nextQuizQuestion()" ${quizState.currentIndex === total - 1 ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''}>
                        下一题 <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        </div>
    `;

    mainArea.innerHTML = html;
}

window.selectQuizOption = function(idx) {
    if (quizState.isSubmitted) return;
    const q = quizState.activeQuestions[quizState.currentIndex];
    quizState.userAnswers[q.id] = idx;
    saveExamDraft();
    renderCurrentQuizQuestion();
};

window.prevQuizQuestion = function() {
    if (quizState.currentIndex > 0) {
        quizState.currentIndex--;
        renderCurrentQuizQuestion();
    }
};

window.nextQuizQuestion = function() {

    if (quizState.currentIndex < quizState.activeQuestions.length - 1) {
        quizState.currentIndex++;
        renderCurrentQuizQuestion();
    }
};

// 提交试卷并计算得分
window.submitKnowledgeQuiz = function() {
    if (quizState.timerInterval) clearInterval(quizState.timerInterval);
    quizState.isSubmitted = true;

    let correctCount = 0;
    quizState.activeQuestions.forEach(q => {
        if (quizState.userAnswers[q.id] === q.answer) {
            correctCount++;
        }
    });

    const score = Math.round((correctCount / quizState.activeQuestions.length) * 100);
    localStorage.setItem('ag_exam_score', score);

    if (typeof showToast === 'function') {
        showToast(`🎉 挑战完成！得分：${score} 分 (答对 ${correctCount}/${quizState.activeQuestions.length} 题)`);
    }

    renderCurrentQuizQuestion();
};

// === 五、 能力维度评估滑块与 OBE 结算 ===
window.initRadarSliders = function() {
    const container = document.getElementById('radar-sliders');
    if (!container) return;

    container.innerHTML = ABILITY_RADAR_CONFIG.dimensions.map(d => `
        <div style="display:flex; flex-direction:column; gap:4px;">
            <div style="display:flex; justify-content:space-between; font-size:13px; font-weight:700;">
                <span>${d.name}</span>
                <span id="val-${d.key}" style="color:var(--cyan); font-weight:800;">7分</span>
            </div>
            <div style="font-size:11.5px; color:var(--text-muted);">${d.desc}</div>
            <input type="range" id="slide-${d.key}" min="1" max="10" value="7" oninput="document.getElementById('val-${d.key}').textContent = this.value + '分'" style="width:100%; cursor:pointer;">
        </div>
    `).join('');
};

window.generateRadarChart = function() {
    const container = document.getElementById('radar-chart-container');
    if (!container || typeof echarts === 'undefined') return;

    if (window.examRadarInstance) window.examRadarInstance.dispose();
    window.examRadarInstance = echarts.init(container);

    const values = ABILITY_RADAR_CONFIG.dimensions.map(d => {
        const input = document.getElementById(`slide-${d.key}`);
        return input ? parseInt(input.value) * 10 : 70;
    });

    const isDay = document.body.classList.contains('day-mode') || document.body.classList.contains('light-mode');
    const textColor = isDay ? '#0f172a' : '#ffffff';

    const option = {
        radar: {
            indicator: ABILITY_RADAR_CONFIG.dimensions.map(d => ({ name: d.name.split('：')[1] || d.name, max: 100 })),
            radius: 80,
            splitNumber: 4,
            axisName: { color: textColor, fontSize: 11, fontWeight: '700' },
            splitLine: { lineStyle: { color: isDay ? 'rgba(2,132,199,0.3)' : 'rgba(0,194,224,0.3)' } },
            splitArea: { areaStyle: { color: ['rgba(2,132,199,0.05)', 'rgba(2,132,199,0.12)'] } }
        },
        series: [{
            type: 'radar',
            data: [{
                value: values,
                name: '能力维度得分',
                itemStyle: { color: isDay ? '#0284c7' : '#00e5ff' },
                areaStyle: { color: isDay ? 'rgba(2,132,199,0.4)' : 'rgba(0,229,255,0.4)' }
            }]
        }]
    };

    window.examRadarInstance.setOption(option);

    const avg = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
    let levelObj = ABILITY_RADAR_CONFIG.levelMap[0];
    for (let l of ABILITY_RADAR_CONFIG.levelMap) {
        if (avg >= l.min && avg <= l.max) levelObj = l;
    }

    const resPanel = document.getElementById('radar-result');
    if (resPanel) {
        resPanel.style.display = 'block';
        resPanel.innerHTML = `
            <div style="font-size:16px; font-weight:800; color:var(--cyan); margin-bottom:6px;">${levelObj.label}（均分：${avg}分）</div>
            <div style="font-size:12.5px; color:var(--text-muted); line-height:1.6;">${levelObj.advice}</div>
        `;
    }
};

// OBE “3+3+4” 总评一键结算
window.calculateOBEFinalScore = function() {
    const explored = JSON.parse(localStorage.getItem('ag_explored_nodes') || '[]');
    const regScore = Math.min(60 + explored.length * 15, 98);
    const midScore = 85;
    const finalScore = parseInt(localStorage.getItem('ag_exam_score') || '80');

    const total = Math.round(regScore * 0.3 + midScore * 0.3 + finalScore * 0.4);

    if (document.getElementById('obe-calc-regular')) document.getElementById('obe-calc-regular').textContent = `${regScore} 分 (折合 ${(regScore * 0.3).toFixed(1)})`;
    if (document.getElementById('obe-calc-mid')) document.getElementById('obe-calc-mid').textContent = `${midScore} 分 (折合 ${(midScore * 0.3).toFixed(1)})`;
    if (document.getElementById('obe-calc-final')) document.getElementById('obe-calc-final').textContent = `${finalScore} 分 (折合 ${(finalScore * 0.4).toFixed(1)})`;
    if (document.getElementById('obe-calc-total')) document.getElementById('obe-calc-total').textContent = `${total} 分`;

    if (typeof showToast === 'function') {
        showToast(`✅ OBE“3+3+4”结算完成！终期总成绩：${total} 分`);
    }
};

// === 六、 项目提案 8 维度诊断 AI 评分 ===
window.rateProjectProposal = function() {
    const input = document.getElementById('project-proposal-input');
    if (!input) return;
    const text = input.value.trim();

    if (text.length < 15) {
        if (typeof showToast === 'function') showToast('⚠️ 提案字数较少，请输入至少 15 字以上的创业设想');
        else alert('⚠️ 提案字数较少，请输入至少 15 字以上的创业设想');
        return;
    }

    const hasAI = /AI|智能|算法|数据|视觉|模型|大语言模型|低代码/i.test(text);
    const hasLocal = /农业|非遗|特产|蓝莓|高原|风味|地方|文化|乡村|社区/i.test(text);
    const hasFinance = /付费|订阅|成本|收入|变现|收费|客单价|收益/i.test(text);

    const scores = [
        Math.min(75 + (hasFinance ? 15 : 5), 96),
        Math.min(70 + (hasAI ? 20 : 5), 94),
        85,
        hasAI ? 95 : 70,
        hasFinance ? 90 : 65,
        88,
        82,
        hasLocal ? 96 : 72
    ];

    const chartContainer = document.getElementById('project-radar-chart');
    if (chartContainer && typeof echarts !== 'undefined') {
        if (window.projectRadarInstance) window.projectRadarInstance.dispose();
        window.projectRadarInstance = echarts.init(chartContainer);

        const isDay = document.body.classList.contains('day-mode') || document.body.classList.contains('light-mode');
        const textColor = isDay ? '#0f172a' : '#ffffff';

        const option = {
            radar: {
                indicator: PROJECT_RATING_DIMENSIONS.map(d => ({ name: d.name, max: 100 })),
                radius: 75,
                axisName: { color: textColor, fontSize: 11, fontWeight: '700' },
                splitLine: { lineStyle: { color: 'rgba(234,88,12,0.3)' } },
                splitArea: { areaStyle: { color: ['rgba(234,88,12,0.05)', 'rgba(234,88,12,0.12)'] } }
            },
            series: [{
                type: 'radar',
                data: [{
                    value: scores,
                    name: '提案八维得分',
                    itemStyle: { color: '#ea580c' },
                    areaStyle: { color: 'rgba(234,88,12,0.4)' }
                }]
            }]
        };

        window.projectRadarInstance.setOption(option);
    }

    const summaryPanel = document.getElementById('project-score-summary');
    if (summaryPanel) {
        summaryPanel.style.display = 'block';
        const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
        summaryPanel.innerHTML = `
            <div style="font-size:15px; font-weight:800; color:var(--accent); margin-bottom:8px;"><i class="fas fa-award"></i> AI 导师评估诊断书（综合得分：${avg}分）</div>
            <div>🌟 <strong>亮点</strong>：${hasAI ? '深度融入技术赋能，技术壁垒显性；' : ''}${hasLocal ? '富有扎根基层的本土情怀与落地可行性；' : ''}${hasFinance ? '变现路径清晰。' : ''}</div>
            <div style="margin-top:6px; color:var(--cyan);">💡 <strong>改进建议</strong>：建议进一步强化 ${scores[3] < 80 ? '技术赋能' : '财务盈亏测算'} 数据，补齐精益画布。</div>
        `;
    }
};

// === 七、 全局选项卡切换与 DOM 初始化 ===
window.initExamTabEvents = function() {
    const tabs = document.querySelectorAll('.policy-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const targetPaneId = tab.getAttribute('data-pane');
            const panes = document.querySelectorAll('.policy-pane');
            panes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === targetPaneId) {
                    pane.classList.add('active');
                }
            });

            if (targetPaneId === 'exam-radar') {
                setTimeout(() => { window.generateRadarChart(); }, 100);
            } else if (targetPaneId === 'exam-project') {
                setTimeout(() => { if (window.projectRadarInstance) window.projectRadarInstance.resize(); }, 100);
            }
        });
    });
};

document.addEventListener('DOMContentLoaded', () => {
    window.initExamTabEvents();
    window.initRadarSliders();
    window.generateRadarChart();
});
