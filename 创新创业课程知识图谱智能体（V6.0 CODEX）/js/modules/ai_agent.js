// ════════════════════════════════════════════════════════════════════════
// 《大学生创新创业基础》AI 导师智能体引擎 (v6.6 Refactored 预置问答+DeepSeek API 版)
// 包含：本地预置分类问答库、DeepSeek 导师级 System Prompt、API 调用与离线降级
// ════════════════════════════════════════════════════════════════════════

// === 一、 《创新创业基础》本地预置分类问答知识库 (LOCAL_AI_KNOWLEDGE_BASE) ===
const LOCAL_AI_KNOWLEDGE_BASE = [
    {
        keywords: ['SCAMPER', '奔驰法', '发散', '创新思维', '发散思维'],
        question: '如何使用 SCAMPER 奔驰法进行项目的创新发散实操？',
        reply: `🎯 <strong>导师解答：SCAMPER 奔驰法 7 维发散实操指南</strong><br/><br/>
📚 <strong>课程理论支撑：</strong> SCAMPER（奔驰法）是发散性思维的黄金工具，包含 7 个具体维度：
1. <strong>S (Substitute 替代)</strong>：用自然语言 UI 替代繁琐菜单；用无人机撒药替代人工喷洒。
2. <strong>C (Combine 合并)</strong>：将“本地非遗文创”与“AIGC 潮玩”合并，打造数字衍生品。
3. <strong>A (Adapt 调整)</strong>：将大厂的敏捷开发流程调整应用到高原特色农业供应链。
4. <strong>M (Modify 修改/放大)</strong>：放大特定高频人群的定制增值服务。
5. <strong>P (Put to other uses 挪作他用)</strong>：把工业视觉识别算子挪用于水果甜度与瑕疵检测。
6. <strong>E (Eliminate 消除)</strong>：消除繁琐的注册流程，消除中介环节。
7. <strong>R (Reverse 逆向)</strong>：将“先产后销”逆向改变为“C2M 反向预订”。<br/><br/>
⚡ <strong>敏捷实操步骤：</strong>
- 拿出一张大白纸，列出现有产品/服务的 5 个核心要素。
- 逐一运用以上 7 维法则强制进行交叉组合，筛选出 2 个最有颠覆刚需的改良点！`
    },
    {
        keywords: ['痛点', '伪需求', '假设', '刚需', '同理心'],
        question: '如何区分“真痛点刚需”与主观脑补的“假设型伪需求”？',
        reply: `🎯 <strong>导师解答：真痛点 vs 假设伪需求过滤法则</strong><br/><br/>
📚 <strong>课程理论支撑：</strong> 依据 JTBD (Job-to-be-Done) 待办任务理论与设计思维双飞钻模型：
- <strong>伪需求特征：</strong> 口头称赞（“这东西挺好的”），但在真实场景中不愿付费、不愿花显性时间使用。
- <strong>真痛点特征：</strong> 包含“显性痛苦 + 真实付费意愿 + 现有替代方案极其恶劣”。<br/><br/>
⚡ <strong>三拷问过滤模板：</strong>
1. <strong>付费意愿拷问：</strong> 客户是否愿意为该解决方案支付至少 1 元钱的预订金？
2. <strong>频率拷问：</strong> 该痛苦发生频率是否高于每周 1 次？
3. <strong>替代方案拷问：</strong> 客户目前是用什么极其繁琐的方式在艰难忍受？`
    },
    {
        keywords: ['Sarasvathy', '效果推理', '手段导向', '资源盘点'],
        question: '如何应用 Sarasvathy 效果推理法则（Effectuation）盘点资源？',
        reply: `🎯 <strong>导师解答：Sarasvathy 效果推理法则实践指南</strong><br/><br/>
📚 <strong>课程理论支撑：</strong> 区别于传统因果推理（根据目标找资源），初创团队应采用<strong>手段导向</strong>：
1. <strong>我是谁 (Identity)</strong>：创始人个人的专业背景、性格特长与热忱兴趣。
2. <strong>我知道什么 (Knowledge)</strong>：团队积累的专有数据、技术知识或行业洞察。
3. <strong>我认识谁 (Network)</strong>：导师资源、本地校友网络与合作社渠道。<br/><br/>
⚡ <strong>落地原则：</strong>
- <strong>可承受损失原则 (Affordable Loss)</strong>：不盲目借贷，按可承受的最大损失控制投入。
- <strong>疯狂缝纫机原则 (Crazy Quilt)</strong>：积极吸引首批关键合作伙伴入局共创！`
    },
    {
        keywords: ['画布', 'BMC', '商业模式', '九要素'],
        question: '如何设计与重构精益商业模式画布 (BMC)？',
        reply: `🎯 <strong>导师解答：商业模式画布 (BMC) 九要素重构方案</strong><br/><br/>
📚 <strong>课程理论支撑：</strong> 商业模式画布划分为四大逻辑块：
- <strong>提供物：</strong> 1. 价值主张 (VP)
- <strong>客户：</strong> 2. 客户细分 (CS)、3. 渠道通道 (CH)、4. 客户关系 (CR)
- <strong>基础设施：</strong> 5. 核心资源 (KR)、6. 关键业务 (KA)、7. 关键伙伴 (KP)
- <strong>财务：</strong> 8. 成本结构 (C$)、9. 收入来源 (R$)<br/><br/>
⚠️ <strong>防坑提示：</strong> 确保“价值主张”与“客户细分”精准耦合，LTV（客户生命周期价值）必须 > 3×CAC（获客成本）！`
    },
    {
        keywords: ['MVP', '最小可行产品', '24小时', '原型'],
        question: '如何用 24 小时完成极简 MVP 原型的敏捷构建？',
        reply: `🎯 <strong>导师解答：24 小时极简 MVP 原型构建战术</strong><br/><br/>
📚 <strong>课程理论支撑：</strong> 埃里克·莱斯 Build-Measure-Learn 敏捷循环。MVP 不是做烂产品，而是以最低成本验证核心假设。<br/>
⚡ <strong>24h 落地路线：</strong>
- <strong>0-4h 确定单一核心假设</strong>：摒弃复杂功能，只保留最解决痛点的唯一功能。
- <strong>4-16h 低代码/生成式搭建</strong>：使用 AI 快速生成前端页面与高保真 UI 草图。
- <strong>16-24h 冷启动测试</strong>：推给 20 位种子用户试用，收集吐槽与真金白银的反馈数据！`
    },
    {
        keywords: ['核心创始团队', '组队', '股权', 'Vesting', '成熟机制', '控制权'],
        question: '合伙人“核心创始团队”如何配置？如何设计动态 Vesting 股权成熟协议？',
        reply: `🎯 <strong>导师解答：核心创始团队组队与动态 Vesting 股权治理</strong><br/><br/>
📚 <strong>课程理论支撑：</strong>
- <strong>核心创始团队配置：</strong> Hacker (技术硬核) + Hipster (产品设计/体验) + Hustler (商务运营/路演)。
- <strong>控制权红线：</strong> CEO 必须保持 51%-67% 以上绝对控制权，切忌平等平分（如 33.3%）。
- <strong>Vesting 协议：</strong> 标准为“4 年分期成熟 + 1 年崖山期 (Cliff)”。离职未满 1 年者，未成熟股权由公司/期权池以 1 元名义无偿收回！`
    },
    {
        keywords: ['BP', '商业计划书', '路演', '答辩', '评委', '风险瓶颈'],
        question: '如何撰写 12 页黄金路演 BP 并进行评委核心风险应对？',
        reply: `🎯 <strong>导师解答：12 页黄金路演 BP 与答辩对答与质询应对方案话术</strong><br/><br/>
📚 <strong>路演 12 页骨架：</strong>
1.封面 2.痛点 3.解决方案 4.市场规模 5.商业模式 6.技术壁垒 7.竞品对比 8.运营数据 9.团队优势 10.财务预测 11.融资规划 12.愿景与结尾。<br/>
⚡ <strong>评委核心风险应对（应对“大公司复制怎么办”）：</strong>
- <strong>防御话术：</strong>“大公司有技术，但我们拥有 6 个月积累的垂直专有数据、本地种子用户的极高粘性与敏捷迭代先发优势。抄袭需要时间和资源成本，而那时我们已建立了品牌护城河。”`
    },
    {
        keywords: ['大创赛', '五维', '评审维度', '教育维度', '创新维度', '社会价值'],
        question: '中国大学生创新大赛（原“互联网+”）的 5 大核心评审维度是什么？如何进行诊断？',
        reply: `🎯 <strong>导师解答：中国大学生创新大赛 5 大维度诊断指南</strong><br/><br/>
📚 <strong>国赛 5 大指标深度拆解：</strong>
1. <strong>教育维度 (育人成效)</strong>：考核学生在项目中的实际成长、跨学科技能提升与专业课程知识的深度融合（非老师代劳）。
2. <strong>创新维度 (技术/模式)</strong>：考核核心技术突破、专利授权或商业模式的差异化创新（拒绝简单同质化模仿）。
3. <strong>团队维度 (核心创始团队)</strong>：考核 Hacker+Hipster+Hustler 跨学科配置，以及控制权红线与 Vesting 动态股权。
4. <strong>商业维度 (可延续性)</strong>：考核真实客户付费意愿、LTV/CAC 单元经济模型与保本盈亏线 (BEP)。
5. <strong>社会价值维度 (红旅/就业)</strong>：考核项目对本地特色产业的带动效应、乡村振兴赋能或提供的新增就业岗位。<br/><br/>
⚡ <strong>诊断整改战术：</strong>
- 在 BP 封面与第三页直观列出“成果指标对照表”；
- 用学生第一作者的专利、软著与比赛过程照片支撑“教育维度”；
- 测算并列出带有预订金支付的真实种子客户清单！`
    },
    {
        keywords: ['大公司复制', '巨头抄袭', '腾讯复制', '防守', '评审专家'],
        question: '评审专家拷问：“如果阿里/腾讯等大公司也抄袭做这个，你们怎么办？”',
        reply: `⚔️ <strong>评委防守金句：应对“大公司复制”高压质问</strong><br/><br/>
🎯 <strong>核心防御逻辑：垂直数据 + 敏捷粘性 + 战略放弃带</strong><br/><br/>
📚 <strong>标准化三分法防守说辞：</strong>
1. <strong>垂直数据壁垒：</strong>“大公司拥有通用算力，但我们拥有在本地垂直细分场景下积累的 6 个月专有标注数据与客户信任链，大模型通用算法无法直接替代细分小模型。”
2. <strong>敏捷与转换成本：</strong>“我们团队深入一线，与种子用户建立了高频交互，产品迭代周期仅为 7 天。客户切换到其他平台的迁移转换成本极高。”
3. <strong>战略放弃区 (Niche Market)：</strong>“对于大厂而言，该垂直细分市场规模（如 SOM 5000 万）不足以支撑其庞大的部门 KPI 成本，属于其战略放弃的边角市场，而这正是初创团队的最佳生存土壤！”`
    },
    {
        keywords: ['技术外包', '买的代码', '科研成果', '成果转化'],
        question: '评审专家拷问：“你们的核心技术是不是导师外包做出来的？学生懂代码吗？”',
        reply: `⚔️ <strong>评委防守金句：应对“技术外包/导师代劳”疑问</strong><br/><br/>
🎯 <strong>核心防御逻辑：学生自主知识产权 + 现场硬核拆解</strong><br/><br/>
📚 <strong>标准化防守说辞：</strong>
1. <strong>软著/专利第一发明人：</strong>“本项目的所有 3 项软件著作权与 1 项发明专利，学生合伙人均为第一、第二发明人（现场展现证书原件）。”
2. <strong>开发日志与 Git 提交：</strong>“团队 3 名技术成员均来自本校计算机/电子工程学院，从 MVP 原型到微调部署，共有 400+ 次真实 GitHub 提交记录与代码构建日志。”
3. <strong>导师定位：</strong>“指导教师主要在产业大方向和政策合规上提供点拨，核心算法调优与硬件路演样机完全由学生独立动手敲出来！”`
    },
    {
        keywords: ['财务假大空', '300%', '虚高', '财务预测'],
        question: '评审专家拷问：“你们预测未来 3 年营收每年增长 300%，凭什么让我们相信？”',
        reply: `⚔️ <strong>评委防守金句：应对“财务预测假大空”质问</strong><br/><br/>
🎯 <strong>核心防御逻辑：自下而上推算 + 真实意向订单支撑</strong><br/><br/>
📚 <strong>标准化防守说辞：</strong>
1. <strong>拒绝自上而下未经调研的主观推测：</strong>“我们放弃了‘假设占领中国 1% 市场’的未经调研的主观推测方法，而是采用自下而上单店/单客推算法。”
2. <strong>订单与合同存量：</strong>“第一年 120 万营收目标中，目前已签署真实的框架采购意向协议 4 份，锁定底线收入 45 万元。”
3. <strong>限制因素约束：</strong>“我们根据当前 Hacker/Hustler 的交付与服务产能上限做了约束，300% 的增长是以极低的 CAC 获客成本与高转介绍复购率作为基础算出来的。”`
    },
    {
        keywords: ['贴息贷', '贷款', '政策', '补贴', '一人公司', 'OPC'],
        question: '大学生创业贴息贷款与免租补贴政策如何申报？',
        reply: `🎯 <strong>导师解答：大学生创业红利政策申报指南</strong><br/><br/>
📚 <strong>政策红利要点：</strong>
1. <strong>创业担保贴息贷款：</strong> 符合条件的一人公司 (OPC) 或企业法人，最高可申请 <strong>500 万元</strong> 信用贴息贷款（个人创业最高 50 万）。
2. <strong>一次性创业补贴：</strong> 首次创办企业并正常经营满 6 个月，可申领 5000-10000 元补贴。
3. <strong>学校双创园支持：</strong> 提供免租实体办公室、算力与无偿孵化项目对接！`
    }
];

// === 二、 DeepSeek 导师级 System Prompt 规范 (DEEPSEEK_SYSTEM_PROMPT) ===
const DEEPSEEK_SYSTEM_PROMPT = `
你是《大学生创新创业基础》国家级金课首席专家兼大奖赛总评委导师。
在回答用户的创新创业提问时，请遵循以下规范：

1. **核心语气**：专业、严谨、充满激励性与落地可行性。
2. **回答结构规范**（使用 Markdown 格式）：
   - 🎯 **核心诊断结论**：用 1-2 句话给出最直接的战术指导。
   - 📚 **课程理论支撑**：融合 Sarasvathy 效果推理、SCAMPER 奔驰法、JTBD 待办任务、Belbin 核心创始团队、Vesting 股权分期、邓立治 BP 商业计划书十模块结构、OBE 成果导向等学术概念。
   - ⚡ **敏捷实操落地步骤**：给出清晰可执行的 1、2、3 步骤。
   - ⚠️ **致命防坑提示**：指出学生创业者最容易犯的错误（如平分股权、伪需求脑补、虚高财务预测）。
3. **字数建议**：控制在 300-500 字，言之有物，条理清晰。
`;

// === 三、 智能混合匹配与 API / 本地引擎 ===
window.IEKG = window.IEKG || {};
window.IEKG.modules = window.IEKG.modules || {};

window.IEKG.modules.ai = {
    apiKeyLocalStorageKey: 'ag_deepseek_api_key',

    getApiKey() {
        return localStorage.getItem(this.apiKeyLocalStorageKey) || '';
    },

    setApiKey(key) {
        localStorage.setItem(this.apiKeyLocalStorageKey, key.trim());
    },

    openKeyConfigModal() {
        const currentKey = this.getApiKey();
        const inputKey = prompt('🔑 请输入你的 DeepSeek API Key (例如 sk-xxxx)：\n（若留空，系统将自动使用预置的高清导师知识库进行秒级响应）', currentKey);
        if (inputKey !== null) {
            this.setApiKey(inputKey);
            if (inputKey.trim()) {
                alert('✅ DeepSeek API Key 保存成功！已开启深度大模型实时诊断服务。');
            } else {
                alert('ℹ️ 已切换至预置高清导师知识库模式。');
            }
        }
    },

    // 优先本地知识库模糊匹配，若无匹配或有 Key 则发起调用
    async askDeepSeek(userQuery) {
        const key = this.getApiKey();

        // 1. 本地匹配检查
        const normalizedQuery = userQuery.toLowerCase();
        for (const item of LOCAL_AI_KNOWLEDGE_BASE) {
            const isMatch = item.keywords.some(kw => normalizedQuery.includes(kw.toLowerCase()));
            if (isMatch && !key) {
                return item.reply;
            }
        }

        // 2. 若配置了 API Key，调用 DeepSeek API
        if (key) {
            try {
                const response = await fetch('https://api.deepseek.com/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${key}`
                    },
                    body: JSON.stringify({
                        model: 'deepseek-chat',
                        messages: [
                            { role: 'system', content: DEEPSEEK_SYSTEM_PROMPT },
                            { role: 'user', content: userQuery }
                        ],
                        temperature: 0.7,
                        max_tokens: 800
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.choices && data.choices[0] && data.choices[0].message) {
                        return data.choices[0].message.content;
                    }
                }
            } catch (err) {
                console.warn('DeepSeek API 调用失败，自动降级至本地导师回答:', err);
            }
        }

        // 3. 降级匹配或兜底导师回复
        for (const item of LOCAL_AI_KNOWLEDGE_BASE) {
            const isMatch = item.keywords.some(kw => normalizedQuery.includes(kw.toLowerCase()));
            if (isMatch) return item.reply;
        }

        return `🎯 <strong>导师建议：</strong><br/><br/>
针对你的问题 <em>"${userQuery}"</em>，建议重点结合《创新创业基础》的精益商业模式画布 (BMC) 与 MVP 敏捷验证进行剖析。<br/><br/>
📚 <strong>核心指导思想：</strong><br/>
1. <strong>痛点验证：</strong> 深入客户场景，使用同理心地图验证是否为真实刚需。<br/>
2. <strong>团队匹配：</strong> 组建 Hacker + Hipster + Hustler 核心创始团队，锁定 CEO 绝对控制权。<br/>
3. <strong>商业闭环：</strong> 确保 LTV > 3×CAC，并充分利用本地创业贴息贷款与学校双创园免租政策！`;
    }
};
