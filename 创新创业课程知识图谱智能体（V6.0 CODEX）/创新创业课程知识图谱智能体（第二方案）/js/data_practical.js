// 创业实战生命周期体系图谱数据 (GRAPH_DATA_PRACTICAL)
// 所有实操节点的 ID 均完美对齐 data_details.js 中的 18 个微课核心节点，确保点击交互能正常弹窗

const GRAPH_DATA_PRACTICAL = {
    categories: [
        { name: '实战核心', itemStyle: { color: '#0077b6' } },
        { name: '商机捕获阶段', itemStyle: { color: '#00b4d8' } },
        { name: '原型验证阶段', itemStyle: { color: '#7c3aed' } },
        { name: '初创治理阶段', itemStyle: { color: '#10b981' } },
        { name: '商业化成长阶段', itemStyle: { color: '#f59e0b' } }
    ],
    nodes: [
        { id: 'p0', name: 'PBL项目实战生命周期', category: 0, symbolSize: 45, value: '大学生创业落地实战方法论' },
        
        { id: 'p1', name: '需求捕捉与商机聚焦', category: 1, symbolSize: 34, value: '第一阶段：用舆情监听和极限拷问锁定真实刚需' },
        { id: '21', name: '客户商机发掘与舆情监听', category: 1, symbolSize: 22 },
        { id: '22', name: '刚需识别与痛点极限拷问', category: 1, symbolSize: 22 },
        
        { id: 'p2', name: '精益 MVP（最小可行产品） 快速验证', category: 2, symbolSize: 34, value: '第二阶段：快速做出产品原型并测试真实付费意愿' },
        { id: '61', name: '极简产品与服务原型开发', category: 2, symbolSize: 22 },
        { id: '62', name: '精益 MVP（最小可行产品） 与付费意愿测试', category: 2, symbolSize: 22 },
 
        { id: 'p3', name: '初创确权与股权治理', category: 3, symbolSize: 34, value: '第三阶段：团队角色熔炼，科学设计合伙股权' },
        { id: '11', name: '小组成员技能清单与角色连结', category: 3, symbolSize: 22 },
        { id: '71', name: '创始人控制权动态股权分配', category: 3, symbolSize: 22 },
        { id: '72', name: '合伙人期权分期成熟(Vesting（股权分期成熟机制）)协议', category: 3, symbolSize: 22 },
 
        { id: 'p4', name: '财务测算与资金安全研判', category: 4, symbolSize: 34, value: '第四阶段：核算保本温饱销量，防范资金断裂' },
        { id: '32', name: '创业盈亏平衡保本销量核算', category: 4, symbolSize: 22 },
        { id: '81', name: '首期PDCA财务预算', category: 4, symbolSize: 22 }
    ],
    links: [
        { source: 'p0', target: 'p1' },
        { source: 'p0', target: 'p2' },
        { source: 'p0', target: 'p3' },
        { source: 'p0', target: 'p4' },
 
        { source: 'p1', target: '21' },
        { source: 'p1', target: '22' },
        { source: '21', target: '22' },
        { source: '22', target: 'p2' }, 
 
        { source: 'p2', target: '61' },
        { source: 'p2', target: '62' },
        { source: '61', target: '62' },
        { source: '62', target: 'p3' }, 
 
        { source: 'p3', target: '11' },
        { source: 'p3', target: '71' },
        { source: 'p3', target: '72' },
        { source: '11', target: '71' },
        { source: '71', target: '72' },
        { source: '72', target: 'p4' }, 
 
        { source: 'p4', target: '32' },
        { source: 'pr21', target: 'pr22' },
        { source: 'pr31', target: 'pr32' }
    ]
};

// 显式挂载至 window 全局对象，确保 initKnowledgeGraph 绝对可读取
if (typeof window !== 'undefined') {
    window.GRAPH_DATA_PRACTICAL = GRAPH_DATA_PRACTICAL;
}
