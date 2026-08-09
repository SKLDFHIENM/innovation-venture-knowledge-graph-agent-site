// 创业实战生命周期体系图谱数据 (GRAPH_DATA_PRACTICAL)
// 所有实操节点的 ID 均完美对齐 data_details.json 中的微课核心节点，确保点击交互能正常弹窗

const GRAPH_DATA_PRACTICAL = {
    categories: [
        { name: '实践能力核心', itemStyle: { color: '#0f172a' } },
        { name: '商机洞察与痛点过滤能力', itemStyle: { color: '#0284c7' } },
        { name: '原型开发与精益验证能力', itemStyle: { color: '#7c3aed' } },
        { name: '团队确权与股权治理能力', itemStyle: { color: '#10b981' } },
        { name: '财税精算与早期自造血能力', itemStyle: { color: '#d97706' } },
        { name: '计划书编制与辩证答辩表达力', itemStyle: { color: '#e11d48' } }
    ],
    nodes: [
        { id: 'p0', name: '双创核心实战能力矩阵', category: 0, symbolSize: 52, value: '大学生创新创业落地能力五维分解', fixed: true, x: 400, y: 300 },
        
        { id: 'p1', name: '商机洞察与痛点过滤能力', category: 1, symbolSize: 38, value: '能力维度一：用户诉求倾听、极限痛点筛选与方案迭代能力', fixed: true, x: 400, y: 140 },
        { id: '21', name: '舆情监听与真实商机识别', category: 1, symbolSize: 26, value: '利用舆情数据监听挖掘蓝海，科学识别用户刚需' },
        { id: '22', name: '客户痛点极限拷问能力', category: 1, symbolSize: 26, value: '对痛点进行高频次过滤与论证，确保解决真痛点' },
        { id: '12', name: '奔驰法改良创新应用能力', category: 1, symbolSize: 26, value: '熟练进行SCAMPER变换，以低成本开发产品变体' },
        
        { id: 'p2', name: '原型开发与精益验证能力', category: 2, symbolSize: 38, value: '能力维度二：系统原型交互打样、MVP测试与商业自洽设计', fixed: true, x: 230, y: 260 },
        { id: '61', name: '系统原型交互设计构建', category: 2, symbolSize: 28, value: '使用低代码或AI工具高效开发符合演示规范的原型' },
        { id: '62', name: 'MVP投放与付费测试能力', category: 2, symbolSize: 28, value: '针对首期用户展开真实付费行为测试，修正商业假设' },
        { id: '14', name: '产品快速数字化建模能力', category: 2, symbolSize: 26, value: '跨媒介设计思维导入，建立面向工业级的产品模型' },
        
        { id: 'p3', name: '团队确权与股权治理能力', category: 3, symbolSize: 38, value: '能力维度三：合伙分工矩阵评测、控制权红线与成熟归属契约设计', fixed: true, x: 570, y: 260 },
        { id: '11', name: '合伙团队角色测评与配置', category: 3, symbolSize: 28, value: '熟练组建Hacker/Hipster/Hustler核心团队，完成能力互补' },
        { id: '71', name: '控制权合理配置与分配', category: 3, symbolSize: 26, value: '设计健康的初创投票权与股权生命线结构，预防公司分裂' },
        { id: '72', name: 'Vesting分期归属契约设计', category: 3, symbolSize: 26, value: '起草具备法律效力的股权挂钩成熟协议，形成长期履约保障' },
        
        { id: 'p4', name: '财税精算与早期自造血能力', category: 4, symbolSize: 38, value: '能力维度四：量本利区间盈亏核算、首期现金防火墙与财税优选', fixed: true, x: 290, y: 460 },
        { id: '32', name: '盈亏平衡与保本销量预测', category: 4, symbolSize: 28, value: '独立进行保本保利点测算，把握产品生存保鲜期' },
        { id: '81', name: '现金流预算PDCA编制', category: 4, symbolSize: 26, value: '动态监测月度收支，预防出现首期运营过程中的资金枯涸' },
        { id: '82', name: '创业财税选优与扶持优惠', category: 4, symbolSize: 26, value: '结合政策减税安排，确定创业实战的最优财务制度' },
        
        { id: 'p5', name: '计划书编制与辩证答辩表达力', category: 5, symbolSize: 38, value: '能力维度五：优秀BP框架四层次拼装、路演演说技巧与质疑攻防辩驳力', fixed: true, x: 510, y: 460 },
        { id: '91', name: '标准计划书框架大纲编制', category: 5, symbolSize: 28, value: '规范十模块大纲撰写，实现商业故事与技术实操的闭环表现' },
        { id: '92', name: '路演表现与演说演练表达', category: 5, symbolSize: 26, value: '合理划分幻灯片板块，用感染力与数据事实主导演说现场' },
        { id: '52', name: '评审专家提问辩证性应答', category: 5, symbolSize: 26, value: '梳理专家核心拷问，运用规范应对法则化解结构性风险' }
    ],
    links: [
        { source: 'p0', target: 'p1' },
        { source: 'p0', target: 'p2' },
        { source: 'p0', target: 'p3' },
        { source: 'p0', target: 'p4' },
        { source: 'p0', target: 'p5' },
        
        // 维度1支链
        { source: 'p1', target: '21' },
        { source: 'p1', target: '22' },
        { source: 'p1', target: '12' },
        { source: '21', target: '22' },
        { source: '22', target: '12' },
        { source: '12', target: 'p2' },
        
        // 维度2支链
        { source: 'p2', target: '61' },
        { source: 'p2', target: '62' },
        { source: 'p2', target: '14' },
        { source: '61', target: '62' },
        { source: '14', target: '61' },
        { source: '62', target: 'p3' },
        
        // 维度3支链
        { source: 'p3', target: '11' },
        { source: 'p3', target: '71' },
        { source: 'p3', target: '72' },
        { source: '11', target: '71' },
        { source: '71', target: '72' },
        { source: '72', target: 'p4' },
        
        // 维度4支链
        { source: 'p4', target: '32' },
        { source: 'p4', target: '81' },
        { source: 'p4', target: '82' },
        { source: '32', target: '81' },
        { source: '81', target: '82' },
        { source: '82', target: 'p5' },
        
        // 维度5支链
        { source: 'p5', target: '91' },
        { source: 'p5', target: '92' },
        { source: 'p5', target: '52' },
        { source: '91', target: '92' },
        { source: '92', target: '52' }
    ]
};

// 显式挂载至 window 全局对象，确保 initKnowledgeGraph 绝对可读取
if (typeof window !== 'undefined') {
    window.GRAPH_DATA_PRACTICAL = GRAPH_DATA_PRACTICAL;
}
