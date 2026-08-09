# -*- coding: utf-8 -*-
import os

js_enhancement = """
// ==========================================
// 专家评估落地：普通学生通俗速懂 + 专创融合多学科 + 高频踩坑风险雷达 增强数据层
// ==========================================
(function() {
    function applyEnhancements() {
        if (typeof window === 'undefined' || !window.KNOWLEDGE_DETAILS) return;
        const details = window.KNOWLEDGE_DETAILS;
        
        const nodeEnhancements = {
            'L1': {
                plainExplainer: {
                    title: '【普通学生通俗速懂】什么是效果推理？',
                    content: '效果推理就像“看冰箱里有什么菜就做什么菜”，而不是先定好豪华菜单再去买昂贵食材。大学生创业不要等资金全到位，先用手头现有的专业技能、同学人脉与开源工具极速试错！'
                },
                majorInnovation: [
                    { tag: '工科/硬科技', text: '盘点实验室开源算法与 3D 打印设备，快速输出样机原型。' },
                    { tag: '医科/生物医药', text: '梳理临床随访或健康管理中的微小痛点，用简易问卷与小程序先行验证。' },
                    { tag: '农科/乡村振兴', text: '对接家乡特色农产品或高校对口帮扶合作社，挖掘线上营销突破口。' },
                    { tag: 'AI/数字经济', text: '调用大模型 API 与 Agent 框架，1天内搭建自动化提效工作流。' }
                ],
                riskRadar: {
                    riskTitle: '⚠️ 高频踩坑预警：等靠要思维陷阱',
                    description: '90% 的大学生创业死于“等待资金全到位才敢行动”。记住：创业不是写完计划书等投资，而是先用极低成本迈出第一步！'
                }
            },
            'L2': {
                plainExplainer: {
                    title: '【普通学生通俗速懂】痛点与伪需求怎么区分？',
                    content: '伪需求是“我觉得大家可能需要”，真痛点是“用户不仅天天抱怨，还愿意掏钱或者花时间解决”。不要做创业者自嗨的产品，一定要去真实场景做访谈。'
                },
                majorInnovation: [
                    { tag: '工科/硬科技', text: '针对工业设备降噪或效率低下等明确指标进行物理参数量化检测。' },
                    { tag: '医科/生物医药', text: '聚焦老年人慢病管理或高校心理疏导的真实预约履约率。' },
                    { tag: '农科/乡村振兴', text: '实地调研生鲜冷链运输损耗率与农户直销价格差。' },
                    { tag: 'AI/数字经济', text: '用 AIGC 自动生成多套痛点海报，测试社交媒体点击量与转化率。' }
                ],
                riskRadar: {
                    riskTitle: '⚠️ 高频踩坑预警：问卷造假与客气陷阱',
                    description: '朋友口头说的“很好、会买”大多是礼貌客套。只有当他们愿意预付定金或留下手机号申请内测时，需求才算被初步验证！'
                }
            },
            'L6': {
                plainExplainer: {
                    title: '【普通学生通俗速懂】什么是 MVP（最小可行性产品）？',
                    content: 'MVP 就是“极简试用版”。不要一开始就想做一个功能无比强大的 APP。先画几张草图、做个小程序，甚至用几张 PPT 演示核心功能，能测试用户愿不愿意买单就够了。'
                },
                majorInnovation: [
                    { tag: '工科/硬科技', text: '使用 3D 打印外观 + 树莓派/Arduino 拼装核心功能模块。' },
                    { tag: '医科/生物医药', text: '制作高保真健康导诊服务流程图或图文内测小程序。' },
                    { tag: '农科/乡村振兴', text: '制作 10 份精装农产品手工样品，在校园社群或线下集市测试预售。' },
                    { tag: 'AI/数字经济', text: '用 Coze/Dify 等零代码平台 2 小时内搭出 AI 智能体 Demo。' }
                ],
                riskRadar: {
                    riskTitle: '⚠️ 高频踩坑预警：完美主义与闭门造车',
                    description: '花半年时间做了一个极其精致的产品，上线后发现没人用。MVP 必须秉持“快速上线、快速收集反馈、快速迭代”原则！'
                }
            },
            'L14': {
                plainExplainer: {
                    title: '【普通学生通俗速懂】股权成熟机制（Vesting）是什么？',
                    content: '股权成熟机制就像“合伙试婚协议”。股份不能第一天全给，一般按 4 年慢慢兑现。如果有人干了一年退出了，只能带走 25% 股份，剩余 75% 退还给公司，防止有人占着股份不干活。'
                },
                majorInnovation: [
                    { tag: '工科/硬科技', text: '明确专利成果转化归属，区分学校知识产权与创业团队持有比例。' },
                    { tag: '医科/生物医药', text: '引入医学顾问专家期权池（Option Pool），按实际指导工时结算。' },
                    { tag: '农科/乡村振兴', text: '建立“合作社+学生团队+村集体”的三方动态收益分红方案。' },
                    { tag: 'AI/数字经济', text: '根据核心算法工程师的数据贡献度与模型迭代阶段挂钩成熟。' }
                ],
                riskRadar: {
                    riskTitle: '⚠️ 高频踩坑预警：50%:50% 平分股权死局',
                    description: '两个创始人各占 50% 股份是最大的隐患！一旦遇到重大决策意见不合，公司就会陷入瘫痪。必须有一位主导创始人持有 51% 以上决议权。'
                }
            }
        };

        Object.keys(details).forEach(key => {
            const item = details[key];
            if (!item) return;

            const lookupId = item.id || key;
            const custom = nodeEnhancements[lookupId] || nodeEnhancements[key];

            item.plainExplainer = (custom && custom.plainExplainer) || {
                title: '【普通学生通俗速懂】' + (item.name || '知识节点'),
                content: (item.see && item.see.content) ? item.see.content : '将本知识点拆解为白话话术与生活化场景，方便快速理解与团队应用。'
            };

            item.majorInnovation = (custom && custom.majorInnovation) || [
                { tag: '工科/硬科技', text: '结合技术专利与硬件原型进行工程落地验证。' },
                { tag: '医科/生物医药', text: '围绕健康医疗场景完成合规防范与服务流测试。' },
                { tag: '农科/乡村振兴', text: '面向乡村产业痛点提供低成本高效解决方案。' },
                { tag: 'AI/数字经济', text: '运用大模型与数字工具提升项目运营流转效率。' }
            ];

            item.riskRadar = (custom && custom.riskRadar) || {
                riskTitle: '⚠️ 高频踩坑预警：实战防范指南',
                description: '避免过度理想化假设，务必通过真实数据与小规模测试进行风险防范。'
            };
        });
    }

    if (typeof window !== 'undefined') {
        window.applyNodeEnhancements = applyEnhancements;
        setTimeout(applyEnhancements, 50);
    }
})();
"""

with open('js/data_details.js', 'r', encoding='utf-8') as f:
    content = f.read()

if 'applyNodeEnhancements' not in content:
    with open('js/data_details.js', 'a', encoding='utf-8') as f:
        f.write('\n\n' + js_enhancement)
    print('Updated js/data_details.js successfully!')
else:
    print('Enhancement already present in js/data_details.js.')