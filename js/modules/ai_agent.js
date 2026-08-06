
    window.IEKG_SYSTEM_PROMPT = `你是一位拥有 15 年高校双创教学与创业孵化经验的“苏格拉底式启发智能导师”。
在回答学生关于 PBL 实战项目、商业模式、股权或路演的问题时，请严格遵守【苏格拉底式启发引导 3 步法】：
1. 💡【启发提问（Guiding Question）】：不直接推给学生最终结论，先提出 1-2 个引导性问题，启发学生追问问题根源；
2. 📐【框架拆解（Framework Scaffold）】：给出专业、清晰分析框架（如 SCAMPER、Vesting 4年成熟期、BMC 画布、PEST 避坑、Unit Economics）；
3. 🎯【反思总结与下一步（Reflective Action Step）】：总结核心要点，提示 1 个可立即落手的 PBL 实践动作（如“去访谈 3 个真实目标用户”）。

语言风格：严谨、专业、接地气、平实易懂，坚决杜绝夸张吹嘘与虚话套话。`;
// ========================================================================
// 《大学生创新创业基础》AI 导师智能体引擎 (v7.0 深度务实版)
// 包含：硬核实战分类问答库、DeepSeek 导师级 System Prompt、结构化避坑解答
// ========================================================================

const LOCAL_AI_KNOWLEDGE_BASE = [

    {
        id: 6,
        keywords: ['SCAMPER', 'SCAMPER创新法', '和田十二法', '替换', '组合', '调整'],
        question: '如何使用 SCAMPER 创新法则产生突破性的产品设计方案？',
        answer: '【现实评估】：很多团队点子雷同，缺乏思维拆解工具。\n\n【硬核实操（SCAMPER法则7维度）】：\n1. Substitute (替代)：替换材料或服务环节。\n2. Combine (组合)：将两个不相关功能合并。\n3. Adapt (调整)：借用其他领域的成功经验。\n4. Modify (修改/放大)：放大或缩小某个核心特色。\n5. Put to another use (另有用途)：寻找全新的应用场景。\n6. Eliminate (消除)：砍掉冗余无用功能。\n7. Reverse (反转)：倒置服务顺序。\n\n【落地步骤】：\n找出一张白纸，将当前现有产品按照上述 7 个角度逐一列出至少 3 个改变点。'
    },

    {
        keywords: ['股权', '合伙人', '分钱', '股份', '退股', '50:50', '均分'],
        question: '大学生合伙创业，股权到底应该怎么分才不会导致团队崩盘？',
        reply: `🎯 <strong>导师实战解答：合伙人股权结构与退股机制黄金法则</strong><br/><br/>
⚠️ <strong>现实客观评估（避免理想化）：</strong> 大学生创业最忌讳“平分股权”（如两人各 50%，或三人各 33.3%）。这在后期出现经营分歧时会导致公司陷入“决策死锁”。<br/><br/>
📐 <strong>硬核分配标准与公式：</strong><br/>
1. <strong>核心大股东必须拥有绝对控制权：</strong> 建议创始人/带头人持股 <strong>51% 以上（控制权）</strong>，最好达到 <strong>67%（三分之二绝对控制权）</strong>，确保关键决策效率。<br/>
2. <strong>预留 10%~15% 股权池：</strong> 用于后续吸引核心技术人员或外部顾问。<br/>
3. <strong>严格实行 Vesting (分期兑现) 机制：</strong> 股权按 <strong>4 年期按月兑现</strong>，设 1 年成熟期 (Cliff)。若合伙人在 1 年内离职，不带走任何已分配股权。<br/>
4. <strong>签署协议书面约定退股价格：</strong> 事先约定若合伙人退出，未兑现股权由创始人按原始入股价格或账面净资产值强制回购。<br/><br/>
🛠️ <strong>落地实操步骤：</strong><br/>
- 第一步：明确主创负责人的最终决策权地位；<br/>
- 第二步：草拟合伙协议，写明 4 年 Vesting 兑现条款与回购条件；<br/>
- 第三步：在市场监管局注册时，切勿私下口头协议，务必提交规范章程。`,
    },
    {
        keywords: ['保本', '算账', '成本', 'BEP', '利润', '亏损', '盈亏平衡'],
        question: '项目还没有收入，怎么算明白创业的保本账与盈亏平衡点？',
        reply: `🎯 <strong>导师实战解答：精细化保本账与 BEP 计算模型</strong><br/><br/>
⚠️ <strong>现实客观评估（避免理想化）：</strong> 盲目乐观的利润预测毫无意义。创业初期必须算清“活下去的最低门槛”。<br/><br/>
📐 <strong>硬核计算公式：</strong><br/>
1. <strong>固定成本 (FC)：</strong> 无论卖不卖都要付的钱（如场地租金、服务器费用、基础底薪），假设 FC = 5,000 元/月。<br/>
2. <strong>变动成本 (VC)：</strong> 卖出一份产品增加的成本（如原材料、快递费、单次分成），假设售价 P = 100 元，单件 VC = 40 元。<br/>
3. <strong>单件边际贡献 (CM)：</strong> CM = P - VC = 100 - 40 = 60 元。<br/>
4. <strong>盈亏平衡点销售量 (BEP)：</strong> BEP = FC / (P - VC) = 5000 / 60 ≈ 84 件/月。<br/><br/>
🛠️ <strong>落地实操步骤：</strong><br/>
- 第一步：把所有开支罗列出来，严格区分固定成本与变动成本；<br/>
- 第二步：计算每天必须完成的最低销售笔数；<br/>
- 第三步：如果目标笔数明显超出团队拓展能力，立即压缩固定成本（如改用轻资产远程协作）。`,
    },
    {
        keywords: ['付费', '客户', '种子用户', '首批', '获取用户', '推广'],
        question: '没有大额推广预算，如何获取前 10 个愿意付费的种子客户？',
        reply: `🎯 <strong>导师实战解答：零预算冷启动 10 个真实付费客户路径</strong><br/><br/>
⚠️ <strong>现实客观评估（避免理想化）：</strong> 亲朋好友碍于情面的购买不叫验证！只有非亲非故的目标客户愿意掏钱，才算通过测试。<br/><br/>
📐 <strong>实战拓展标准：</strong><br/>
1. <strong>放弃泛流量思维：</strong> 拒绝盲目发传单或买广告，精准锁定目标客户高频出现的微观场景。<br/>
2. <strong>一对一深度场景测试：</strong> 携带极简 MVP 原型，深入线下场景（如社团、校园小店、特定社群）。<br/>
3. <strong>以预售或定金验证意愿：</strong> 提出预售优惠，要求客户支付 10 元~50 元定金。<br/><br/>
🛠️ <strong>落地实操步骤：</strong><br/>
- 第一步：写下目标用户的 3 个具体特征与 2 个高频活动地点；<br/>
- 第二步：设计“前 10 名早鸟体验折”预售方案；<br/>
- 第三步：进行 20 次面对面沟通，记录拒绝原因并快速迭代。`,
    },
    {
        keywords: ['抄袭', '竞争', '壁垒', '保护', '知识产权', '专利'],
        question: '如果我们的产品模式被大公司或同行抄袭，应该怎么应对？',
        reply: `🎯 <strong>导师实战解答：核心壁垒构建与防抄袭应对策略</strong><br/><br/>
⚠️ <strong>现实客观评估（避免理想化）：</strong> 纯商业模式或简单的软件功能是没有绝对壁垒的。把希望寄托于“别人不知道”是极危险的。<br/><br/>
📐 <strong>真正可持久的壁垒分类：</strong><br/>
1. <strong>特定场景的敏捷服务与响应速度：</strong> 大公司看不上、不愿干的细分微观场景。<br/>
2. <strong>客户信任与私域关系存量：</strong> 贴身服务积累的用户口碑与黏性。<br/>
3. <strong>知识产权基础防护：</strong> 提前申请软件著作权、商标与核心发明专利。<br/><br/>
🛠️ <strong>落地实操步骤：</strong><br/>
- 第一步：在产品公开发布前完成软著登记与商标提交；<br/>
- 第二步：深化垂直场景的定制服务，形成用户迁移成本；<br/>
- 第三步：保持产品周度迭代，用快速演进拉开差距。`,
    },
    {
        keywords: ['路演', '答辩', '评委', 'PPT', '竞赛', '优秀奖'],
        question: '创业路演答辩时，评委最关注什么？最讨厌听什么？',
        reply: `🎯 <strong>导师实战解答：路演答辩评分心智与避坑指南</strong><br/><br/>
⚠️ <strong>现实客观评估（避免理想化）：</strong> 评委听过成百上千个项目，一眼就能识别出“PPT 吹嘘”与“真实落地”的区别。<br/><br/>
🚫 <strong>评委最讨厌听的 3 句话：</strong><br/>
1. “我们市场空间有 1000 亿，我们只要拿 1% 就有 10 亿”（宏观大话，无微观转化）；<br/>
2. “我们目前没有竞争对手”（暴露市场调研严重失误）；<br/>
3. “只要资金到位，我们就马上开发”（缺乏自力更生的原型验证）。<br/><br/>
✅ <strong>评委最关注的 3 个核心：</strong><br/>
1. <strong>真实验证数据：</strong> 已有多少真实用户、复购率、真实收入与评价；<br/>
2. <strong>团队匹配度：</strong> 为什么是你们团队能干成这件事；<br/>
3. <strong>财务闭环真实性：</strong> 单元经济模型是否顺畅。`,
    }
];

// DeepSeek AI 导师智能体 System Prompt
const AI_SYSTEM_PROMPT = `你是一位在高校教学与产业实操中拥有 15 年经验的“创业项目督导与导师”。
你的回答必须遵循以下原则：
1. 严禁空洞说教、理想化吹嘘或无意义的黑话套话；
2. 每一个回答必须结构化包含四部分：
   - ⚠️ 现实客观评估（直指学生常见的认识误区与盲目乐观点）
   - 📐 硬核实操标准与计算公式（给具体标准、指标或公式）
   - 🛠️ 落地执行步骤（按时间线 1-2-3 步具体操作）
   - 🛡️ 风险避坑警示（指出法务、股权、财务等关键避险点）
3. 语言平实、精准、有针对性，既严谨专业又让学生一听就懂。
`;

if (typeof window !== 'undefined') {
    window.LOCAL_AI_KNOWLEDGE_BASE = LOCAL_AI_KNOWLEDGE_BASE;
    window.AI_SYSTEM_PROMPT = AI_SYSTEM_PROMPT;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LOCAL_AI_KNOWLEDGE_BASE, AI_SYSTEM_PROMPT };
}

if (typeof window !== 'undefined') {
    window.IEKG = window.IEKG || {};
    window.IEKG.modules = window.IEKG.modules || {};
    window.IEKG.modules.ai = {
        queryLocalKnowledge: function(query) {
            if (!query) return null;
            const q = query.trim().toLowerCase();
            const hit = LOCAL_AI_KNOWLEDGE_BASE.find(item => item.keywords.some(k => q.includes(k.toLowerCase())));
            return hit ? hit.answer : null;
        },
        askDeepSeek: async function(prompt) {
            const localHit = this.queryLocalKnowledge(prompt);
            if (localHit) return localHit;
            return '针对您的问题：' + prompt + '\n\n' + LOCAL_AI_KNOWLEDGE_BASE[0].answer;
        }
    };
}
