// 双创大赛备赛体系图谱数据 (GRAPH_DATA_COMPETITION)
// 所有备赛节点的 ID 均完美对齐 data_details.js 中的 18 个微课核心节点，确保点击交互能正常弹窗

const GRAPH_DATA_COMPETITION = {
    categories: [
        { name: '备赛核心', itemStyle: { color: '#ade8f4' } },
        { name: '选题破局', itemStyle: { color: '#00b4d8' } },
        { name: '团队治理', itemStyle: { color: '#10b981' } },
        { name: '商业大纲', itemStyle: { color: '#7c3aed' } },
        { name: '路演防御', itemStyle: { color: '#ef4444' } }
    ],
    nodes: [
        { id: 'c0', name: '大创大赛备赛通关路线图', category: 0, symbolSize: 45, value: '优秀项目的孵化与申报全景路线' },
        
        { id: 'c1', name: '大创选题与痛点分析', category: 1, symbolSize: 34, value: '第一阶段：寻找具有社会价值与行业痛点的真实选题' },
        { id: '12', name: '创新思维与奔驰法发散', category: 1, symbolSize: 22 },
        { id: '21', name: '客户商机发掘与舆情监听', category: 1, symbolSize: 22 },
        
        { id: 'c2', name: '跨专业跨学院组队确权', category: 2, symbolSize: 34, value: '第二阶段：组建核心创始团队并完成合伙人契约设计' },
        { id: '11', name: '小组成员技能清单与角色连结', category: 2, symbolSize: 22 },
        { id: '71', name: '创始人控制权动态股权分配', category: 2, symbolSize: 22 },
        { id: '72', name: '合伙人期权分期成熟(Vesting（股权分期成熟机制）)协议', category: 2, symbolSize: 22 },

        { id: 'c3', name: '商业计划书 (BP) 撰写', category: 3, symbolSize: 34, value: '第三阶段：撰写财务预测与价值主张，拼合大纲' },
        { id: '51', name: '独特价值主张(UVP)提炼', category: 3, symbolSize: 22 },
        { id: '81', name: '首期PDCA财务预算', category: 3, symbolSize: 22 },
        { id: '91', name: 'BP商业大纲逻辑与PPT排版优化', category: 3, symbolSize: 22 },

        { id: 'c4', name: '现场路演与刁钻答辩', category: 4, symbolSize: 34, value: '第四阶段：现场高压演示与投资人条款对齐' },
        { id: '82', name: 'Term Sheet 模拟天使轮谈判', category: 4, symbolSize: 22 },
        { id: '92', name: '黄金电梯路演与模拟答辩演练', category: 4, symbolSize: 22 }
    ],
    links: [
        { source: 'c0', target: 'c1' },
        { source: 'c0', target: 'c2' },
        { source: 'c0', target: 'c3' },
        { source: 'c0', target: 'c4' },

        { source: 'c1', target: '12' },
        { source: 'c1', target: '21' },
        { source: '12', target: '21' },
        { source: '21', target: 'c2' }, 

        { source: 'c2', target: '11' },
        { source: 'c2', target: '71' },
        { source: 'c2', target: '72' },
        { source: '11', target: '71' },
        { source: '71', target: '72' },
        { source: '72', target: 'c3' }, 

        { source: 'c3', target: '51' },
        { source: 'c3', target: '81' },
        { source: 'c3', target: '91' },
        { source: '51', target: '81' },
        { source: '81', target: '91' },
        { source: '91', target: 'c4' }, 

        { source: 'c4', target: '82' },
        { source: 'cp41', target: 'cp42' },
        { source: 'cp51', target: 'cp52' }
    ]
};

// 显式挂载至 window 全局对象，确保 initKnowledgeGraph 绝对可读取
if (typeof window !== 'undefined') {
    window.GRAPH_DATA_COMPETITION = GRAPH_DATA_COMPETITION;
}
