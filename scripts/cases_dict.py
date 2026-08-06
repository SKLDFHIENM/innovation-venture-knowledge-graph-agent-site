cases_data = {}
print('Cases dict initialized!')
cases_data = {
    'agri_ai_01': {
        'id': 'agri_ai_01',
        'title': '基于乡村振兴的富硒农产品供应链数字赋能平台',
        'track': '青年红色筑梦之旅赛道',
        'award': '第十届中国国际大学生创新大赛全国金奖',
        'tag': '乡村振兴 / 数字农业 / 供应链',
        'background': '富硒农产品缺乏标准与溯源体系，传统供应链损耗率高。项目针对硒资源富集地区，构建防伪溯源与智能配货网络。',
        'techPoint': '区块链双重防伪溯源 + IoT 农残感知终端 + 供应链冷链调度算法',
        'businessModel': 'B2B 农企 SaaS 软件服务费 + 优质富硒农产品品牌直采分成 + 溯源追溯防伪标签',
        'financeModel': '首年运营资金 120 万元，实现营收 380 万元，硬件成本占 35%，毛利率达到 42%。',
        'team': '技术负责人（计算机博士）+ 商业运营（工商管理硕士）+ 农学专家（顾问）',
        'highlights': '已覆盖 12 个国家级贫困县，带动 3200 农户增收，获得 5 项发明专利。'
    },
    '3d_print_02': {
        'id': '3d_print_02',
        'title': '高精度工业级 3D 打印激光扫描检头',
        'track': '高教主赛道',
        'award': '第十届中国国际大学生创新大赛全国金奖',
        'tag': '硬科技 / 工业制造 / 激光控制',
        'background': '工业级 3D 打印高端振镜长期被国外垄断，国产设备在动态闭环反馈和高频扫描精度存在瓶颈。',
        'techPoint': '超高频压电驱动光路 + 闭环光斑感知控制算法 + 毫米级振镜温漂补偿',
        'businessModel': '核心振镜模组硬件销售 + 高阶光路控制算法授权 + 工业设备定制化改造型服务',
        'financeModel': '单套设备售价 18 万元，BOM 硬件成本 6.5 万元，软件毛利 > 70%，已实现年销售额 1200 万元。',
        'team': '光学工程博士后 + 机械自动化硕士团队 + 工业制造资深顾问',
        'highlights': '打破国外进口垄断，扫描速度提升 40%，获得 12 项国家发明专利授权。'
    },
    'industry_robot_03': {
        'id': 'industry_robot_03',
        'title': '基于国产大模型的智能制造车间排程优化系统',
        'track': '产业命题赛道',
        'award': '第十届中国国际大学生创新大赛全国金奖',
        'tag': 'AI人工智能 / 智能制造 / 车间排程',
        'background': '针对离散型制造车间插单频繁、工序复杂、设备利用率低的痛点，面向龙头企业命题开发大模型调度引擎。',
        'techPoint': '混合整数线性规划算法 + 大模型自然语言排程指令解析 + 实时设备状态数字孪生',
        'businessModel': '软件许可 License + 算法年订阅服务 + 按生产效率提升比例抽成',
        'financeModel': '部署单车间收费 25 万元，续订率 88%，毛利率 78%，项目投产首年实现净利润 280 万元。',
        'team': '运筹学博士团队 + 工业大模型算法工程师 + 500强制造企业前生产总监',
        'highlights': '为 8 家头部汽车零部件企业落地部署，换线时间缩短 35%，设备利用率提升 22%。'
    },
    'campus_cycle_04': {
        'id': 'campus_cycle_04',
        'title': '高校校园循环经济与二手数码智能回收智能体',
        'track': '职教/校园创客赛道',
        'award': '第十届中国国际大学生创新大赛全国金奖',
        'tag': '绿色低碳 / 校园生态 / 智能回收',
        'background': '高校学生闲置电子产品处置难、回收价格不透明，缺少安全可信的校园循环经济服务设施。',
        'techPoint': '边缘 AI 视觉分拣评估 + 自动化数据深度清除擦除算法 + 智能柜终端物联网控制',
        'businessModel': '二手数码回收转售差价 + 智能回收柜广告分成 + 绿色碳积分兑换商城运营',
        'financeModel': '硬件回收柜成本 3.2 万元/台，采用租赁与加盟运营，回收转售综合毛利率 32%，单柜 8 个月收回成本。',
        'team': '嵌入式开发组长 + 校园运营团队（覆盖50所高校）+ 环保供应链合伙人',
        'highlights': '进驻全国 45 所高校，累计回收处置电子设备 6.8 万件，减少碳排放 120 吨。'
    }
}
print('Cases dict populated! Count:', len(cases_data))
import json, re
with open('resources.html', 'r', encoding='utf-8') as f: res = f.read()
with open('index.html', 'r', encoding='utf-8') as f: idx = f.read()
cases_json = json.dumps(cases_data, ensure_ascii=False, indent=2)
new_res_cases = 'const CASE_DETAILS_DATA = ' + cases_json + ';'
res = re.sub(r'const CASE_DETAILS_DATA = \{[\s\S]*?\};', new_res_cases, res)
with open('resources.html', 'w', encoding='utf-8') as f: f.write(res)
print('Updated resources.html successfully!')
