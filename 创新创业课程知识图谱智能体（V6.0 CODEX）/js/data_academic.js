// 学科知识体系图谱数据 (GRAPH_DATA_ACADEMIC)
const GRAPH_DATA_ACADEMIC = {
    categories: [
        { name: '课程核心', itemStyle: { color: '#90e0ef' } },
        { name: '创新思维与方法', itemStyle: { color: '#00b4d8' } },
        { name: '创业机会与商业模式', itemStyle: { color: '#0077b6' } },
        { name: '创业团队组建与管理', itemStyle: { color: '#0096c7' } },
        { name: '创业计划书与路演展示', itemStyle: { color: '#48cae4' } },
        { name: '双创政策与法规', itemStyle: { color: '#ade8f4' } }
    ],
    nodes: [
        { id: '0', name: '新经济创新创业基础', category: 0, symbolSize: 50, value: '学校双创通识核心课（数字化赋能版）' },
        
        { id: '1', name: '创新思维与方法', category: 1, symbolSize: 38, value: '第一模块：打破思维定势，人机共创' },
        { id: '11', name: '人机协同头脑风暴', category: 1, symbolSize: 26, value: '利用大模型的多角色模拟发散点子' },
        { id: '12', name: 'AIGC 奔驰法改良', category: 1, symbolSize: 26, value: 'AI 算法加持下的7维度产品变体' },
        { id: '13', name: 'TRIZ（发明问题解决理论）发明理论', category: 1, symbolSize: 26, value: '技术冲突解决方法与物理冲突分离原理' },
        { id: '14', name: 'AI设计思维', category: 1, symbolSize: 28, value: '用大语言模型同理心画像与快速生图原型' },

        { id: '2', name: '创业机会与商业模式', category: 2, symbolSize: 38, value: '第二模块：发现 AI 商机与构建大模型模式' },
        { id: '34', name: 'AI+ 创业机会识别', category: 2, symbolSize: 26, value: '捕捉行业痛点，实施智能化产业重塑' },
        { id: 'p31', name: '数据驱动痛点分析', category: 2, symbolSize: 26, value: '用户深层刚需的精准提炼与定位' },
        { id: '43', name: 'AI 商业模式画布', category: 2, symbolSize: 30, value: '九要素构建以算力、数据、算法为核心的商业逻辑' },
        { id: '41', name: 'AI 编程极速 MVP（最小可行产品）', category: 2, symbolSize: 26, value: '使用代码辅助工具在 24 小时内零成本验证市场' },

        { id: '3', name: '创业团队组建与管理', category: 3, symbolSize: 38, value: '第三模块：团队协同与治理机制' },
        { id: 'p42', name: '新经济时代合伙人选择', category: 3, symbolSize: 26, value: '跨学科组合：开发工程师+商业专家' },
        { id: 'p43', name: '技术与出资股权划分', category: 3, symbolSize: 28, value: '硬件设备、私有数据集与核心代码的权属分配' },
        { id: 'c22', name: '团队协同管理', category: 3, symbolSize: 26, value: '以数字化工具提升日常沟通的提效管理' },

        { id: '4', name: '创业计划书与路演展示', category: 4, symbolSize: 38, value: '第四模块：项目呈现与商业路演' },
        { id: 'c31', name: 'AI 辅助 BP 撰写', category: 4, symbolSize: 28, value: '技术壁垒、商业闭环与财务预测的系统性表达' },
        { id: 'c32', name: '三分钟电梯演讲 (Pitch)', category: 4, symbolSize: 26, value: '快速向投资人传达核心价值的技巧' },
        { id: 'c41', name: '路演 PPT 视觉设计', category: 4, symbolSize: 26, value: '利用数字设计工具快速丰富 PPT 视觉质感' },
        { id: 'c42', name: '答辩应对技巧', category: 4, symbolSize: 26, value: '预测核心逻辑漏洞并真诚专业作答' },

        { id: '5', name: '双创政策与法规', category: 5, symbolSize: 38, value: '第五模块：校企孵化与政策红利' },
        { id: 'p51', name: '学校大学生创业园', category: 5, symbolSize: 28, value: '大学创业园团队入驻孵化指南' },
        { id: 'c52', name: '地方数字化专项扶持', category: 5, symbolSize: 26, value: '科技型企业扶持与青年创业贴息贷' },
        { id: 'c51', name: '大学生创新创业大赛', category: 5, symbolSize: 28, value: '高教主赛道评审与申报核心' },
        { id: '54', name: '挑战杯系列赛事', category: 5, symbolSize: 26, value: '全国大学生课外学术科技作品/创业计划竞赛' }
    ],
    links: [
        { source: '0', target: '1' },
        { source: '0', target: '2' },
        { source: '0', target: '3' },
        { source: '0', target: '4' },
        { source: '0', target: '5' },

        { source: '1', target: '11' },
        { source: '1', target: '12' },
        { source: '1', target: '13' },
        { source: '1', target: '14' },
        { source: '14', target: 'p31' },

        { source: '2', target: '34' },
        { source: '2', target: 'p31' },
        { source: '2', target: '43' },
        { source: '2', target: '41' },
        { source: '34', target: 'p31' },
        { source: 'p31', target: '43' },
        { source: '43', target: '41' },

        { source: '3', target: 'p42' },
        { source: '3', target: 'p43' },
        { source: '3', target: 'c22' },
        { source: 'p42', target: 'p43' },

        { source: '4', target: 'c31' },
        { source: '4', target: 'c32' },
        { source: '4', target: 'c41' },
        { source: '4', target: 'c42' },
        { source: 'c31', target: 'c41' },
        { source: 'c32', target: 'c42' },

        { source: '5', target: 'p51' },
        { source: '5', target: 'c52' },
        { source: '5', target: 'c51' },
        { source: '5', target: '54' },
        { source: 'p51', target: 'c52' },
        { source: 'c51', target: 'c31' }
    ]
};

// 显式挂载至 window 全局对象，确保 initKnowledgeGraph 绝对可读取
if (typeof window !== 'undefined') {
    window.GRAPH_DATA_ACADEMIC = GRAPH_DATA_ACADEMIC;
}
