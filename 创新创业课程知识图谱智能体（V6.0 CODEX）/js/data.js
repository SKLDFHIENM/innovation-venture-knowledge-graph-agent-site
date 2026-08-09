// 全国高校通用《大学生创新创业基础》PBL项目制知识图谱核心数据 (9次课/18学时版)
// 包含 9 次核心课程作为大课节点，以及 18 个 PBL 课堂实战任务节点

const KNOWLEDGE_GRAPH_DATA = {
    categories: [
        { name: 'L1: 认识双创 (M1)', itemStyle: { color: '#0077b6' } },
        { name: 'L2: 商机识别 (M2)', itemStyle: { color: '#00b4d8' } },
        { name: 'L3: 环境研判 (M3)', itemStyle: { color: '#48cae4' } },
        { name: 'L4: 客户定位 (M4)', itemStyle: { color: '#90e0ef' } },
        { name: 'L5: 画布设计 (M5)', itemStyle: { color: '#ade8f4' } },
        { name: 'L6: 原型设计 (M6)', itemStyle: { color: '#7c3aed' } },
        { name: 'L7: 股权治理 (M7)', itemStyle: { color: '#10b981' } },
        { name: 'L8: 融资谈判 (M8)', itemStyle: { color: '#f59e0b' } },
        { name: 'L9: 项目路演 (M9)', itemStyle: { color: '#ef4444' } }
    ],
    nodes: [
        // 核心根节点
        { id: '0', name: '大学生创新创业PBL项目制图谱', category: 0, symbolSize: 45, value: '通用高校 18学时极速实战金课' },
        
        // 9 次大课核心节点 (大圆圈，层级为对应课时)
        { id: 'L1', name: '第1课：认识创新创业', category: 0, symbolSize: 34, value: '第1阶段：确立创客身份与组建跨学科团队' },
        { id: 'L2', name: '第2课：商机捕捉与痛点识别', category: 1, symbolSize: 34, value: '第2阶段：锁定本地产业痛点与伪需求过滤' },
        { id: 'L3', name: '第3课：宏观环境与财务测算', category: 2, symbolSize: 34, value: '第3阶段：PEST（宏观环境分析）环境研判与盈亏平衡测算' },
        { id: 'L4', name: '第4课：用户画像与客户定位', category: 3, symbolSize: 34, value: '第4阶段：同理心画像绘制与种子用户触达' },
        { id: 'L5', name: '第5课：商业模式与价值主张', category: 4, symbolSize: 34, value: '第5阶段：精益画布九要素与竞争壁垒设计' },
        { id: 'L6', name: '第6课：原型设计与 MVP（最小可行产品） 验证', category: 5, symbolSize: 34, value: '第6阶段：产品原型开发与冷启动付费意愿测试' },
        { id: 'L7', name: '第7课：合伙人协议与股权治理', category: 6, symbolSize: 34, value: '第7阶段：团队核心创始团队融合与股权动态成熟' },
        { id: 'L8', name: '第8课：财务预算与融资谈判', category: 7, symbolSize: 34, value: '第8阶段：资金缺口测算与模拟Term Sheet谈判' },
        { id: 'L9', name: '第9课：路演答辩与商业计划书', category: 8, symbolSize: 34, value: '第9阶段：3分钟Elevator Pitch与答辩高防' },

        // 18 个 PBL 课堂实战子任务节点 (中圆圈，分别连向对应的课时节点)
        // 课时 1
        { id: '11', name: '小组成员技能清单与角色连结', category: 0, symbolSize: 22, value: 'PBL实战：提取并对接小组成员的专业与技能特长' },
        { id: '12', name: '创新思维与奔驰法发散', category: 0, symbolSize: 22, value: 'PBL实战：利用SCAMPER（奔驰法）奔驰法对本地特色产品进行创意设计重构' },
        // 课时 2
        { id: '21', name: '客户商机发掘与舆情监听', category: 1, symbolSize: 22, value: 'PBL实战：利用网络平台监听与挖掘特色产业的线上痛点数据' },
        { id: '22', name: '刚需识别与痛点极限拷问', category: 1, symbolSize: 22, value: 'PBL实战：极限拷问痛点真实性，排除未经实证的假设型伪需求' },
        // 课时 3
        { id: '31', name: '宏观环境研判与合规防错', category: 2, symbolSize: 22, value: 'PBL实战：研判项目政策合规与法律规范等宏观环境' },
        { id: '32', name: '创业盈亏平衡保本销量核算', category: 2, symbolSize: 22, value: 'PBL实战：核算固定/可变成本，划定销量温饱线' },
        // 课时 4
        { id: '41', name: '种子用户同理心画像绘制', category: 3, symbolSize: 22, value: 'PBL实战：细化描绘“听、看、想、说、做”的用户同理心画像' },
        { id: '42', name: '种子客群24h零成本触达路径', category: 3, symbolSize: 22, value: 'PBL实战：设计小范围社群零成本极速触达种子的渠道方案' },
        // 课时 5
        { id: '51', name: '独特价值主张(UVP)提炼', category: 4, symbolSize: 22, value: 'PBL实战: 提炼一句话讲清帮客户省什么钱、提什么效' },
        { id: '52', name: '项目竞争优势与壁垒设计', category: 4, symbolSize: 22, value: 'PBL实战：设计项目在技术、专有资源或品牌维度的特有壁垒' },
        // 课时 6
        { id: '61', name: '极简产品与服务原型开发', category: 5, symbolSize: 22, value: 'PBL实战：利用极简网页或模拟模型进行第一版交互原型上线展示' },
        { id: '62', name: '精益 MVP（最小可行产品） 与付费意愿测试', category: 5, symbolSize: 22, value: 'PBL实战：通过预订金或表单测试真实市场用户的付费意愿' },
        // 课时 7
        { id: '71', name: '创始人控制权动态股权分配', category: 6, symbolSize: 22, value: 'PBL实战：从精力/资金/技术维度测算初创团队持股比例' },
        { id: '72', name: '合伙人期权分期成熟(Vesting（股权分期成熟机制）)协议', category: 6, symbolSize: 22, value: 'PBL实战：签署分期成熟与回购条款，预防核心合伙人中途退股' },
        // 课时 8
        { id: '81', name: '首期PDCA财务预算', category: 7, symbolSize: 22, value: 'PBL实战: 规划项目首个PDCA周期的收支盈亏与财务预算' },
        { id: '82', name: 'Term Sheet 模拟天使轮谈判', category: 7, symbolSize: 22, value: 'PBL实战：就投票权、清算优先权等投资协议核心条款对齐谈判' },
        // 课时 9
        { id: '91', name: 'BP商业大纲逻辑与PPT排版优化', category: 8, symbolSize: 22, value: 'PBL实战：编写结构严谨、重点突出的商业计划书核心大纲与PPT' },
        { id: '92', name: '黄金电梯路演与模拟答辩演练', category: 8, symbolSize: 22, value: 'PBL实战：现场三分钟极速演讲展示，模拟评委提问防御' }
    ],
    links: [
        // 核心树干 (根节点连向9大课时)
        { source: '0', target: 'L1' },
        { source: '0', target: 'L2' },
        { source: '0', target: 'L3' },
        { source: '0', target: 'L4' },
        { source: '0', target: 'L5' },
        { source: '0', target: 'L6' },
        { source: '0', target: 'L7' },
        { source: '0', target: 'L8' },
        { source: '0', target: 'L9' },

        // 课时节点连向对应的子实战任务
        { source: 'L1', target: '11' },
        { source: 'L1', target: '12' },
        { source: 'L2', target: '21' },
        { source: 'L2', target: '22' },
        { source: 'L3', target: '31' },
        { source: 'L3', target: '32' },
        { source: 'L4', target: '41' },
        { source: 'L4', target: '42' },
        { source: 'L5', target: '51' },
        { source: 'L5', target: '52' },
        { source: 'L6', target: '61' },
        { source: 'L6', target: '62' },
        { source: 'L7', target: '71' },
        { source: 'L7', target: '72' },
        { source: 'L8', target: '81' },
        { source: 'L8', target: '82' },
        { source: 'L9', target: '91' },
        { source: 'L9', target: '92' },

        // 跨模块依赖连线 (表示知识点演进关系)
        { source: '11', target: '22' }, // 团队建立后进行痛点筛选
        { source: '21', target: '32' }, // 监听到痛点后算盈亏
        { source: '32', target: '51' }, // 盈亏计算影响价值主张
        { source: '41', target: '61' }, // 用户画像引导原型开发
        { source: '51', target: '61' }, // 价值主张对齐原型功能
        { source: '62', target: '71' }, // 验证真实意愿后进行股权确权
        { source: '72', target: '82' }, // 股权成熟协议签完进行投资谈判
        { source: '81', target: '91' }, // 财务预算直接写入 BP 财务部分
        { source: '91', target: '92' }  // 商业大纲逻辑完成后才能演讲答辩
    ]
};

// 显式挂载至 window 全局对象，确保 initKnowledgeGraph 绝对可读取
if (typeof window !== 'undefined') {
    window.KNOWLEDGE_GRAPH_DATA = KNOWLEDGE_GRAPH_DATA;
}
