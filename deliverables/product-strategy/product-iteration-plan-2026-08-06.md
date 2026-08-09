# 创新创业课程知识图谱智能体产品迭代修改计划（融合最优版）

**日期**：2026-08-06  
**版本**：V6.0+ Unified CODEX Edition  
**类型**：产品迭代修改计划 / PRD标准化方案  
**参与成员**：方向明（主理人）、析客（需求分析师）、瑞思（用户研究员）、竞析（竞品分析师）、数析（数据分析师）、路径（路线图规划师）

---

## 📌 TL;DR（执行摘要）
- **核心目标**：参考 `prd-v6-merge-2026-08-06.md`，深度融合 `V6.0 CODEX` 源版本与目标主分支版本的最佳设计与功能优势，完成全站尤其是知识图谱板块的视觉、布局与交互标准化。
- **关键决策**：统一全站知识图谱板块容器规格为 `max-width: 1360px` 标准宽度与 `780px` 黄金视角高度；全面嵌入 OBE 成果导向课程 Footer 页脚；在逻辑层融合 V6.0 的 Agent 四角色协同与多维算法引擎（`graph_core.js`）。
- **下一步**：按功能模块与优先级顺序执行视觉改造、宽度标准化与代码合并测试。

---

## 🎯 核心结论卡片

| 项目 | 内容 |
|------|------|
| **融合方案** | **高能算力内核（V6.0） + 优雅UI/自适应宽度与自动化部署（主分支）** |
| **标准化重点** | 知识图谱双页面（`knowledge_graph.html` 与 `graph.html`）布局规格（1360px）、标准 Footer 页脚组件与交互调色盘 |
| **功能扩展** | 理论知识拓扑 + 实战能力拓扑双驱动、OBE 达成度热力图、快捷 AI 罗盘调优（Ctrl+K） |
| **优先级划分** | **P0**: 知识图谱样式与布局标准化；**P1**: Agent 与算法引擎解耦合入；**P2**: 全局缓存与异常容错 |
| **交付物** | `deliverables/product-strategy/product-iteration-plan-2026-08-06.md` |

---

## 一、版本提炼与融合方案

### 1. 两版本优势与劣势深度对比

| 评估维度 | 源版本（V6.0 CODEX） | 目标主分支版本 | 融合提炼的最优方案 |
| :--- | :--- | :--- | :--- |
| **Agent 架构** | 具备独立 `.agents/` 四角色协同配置与多 Agent 协议 | 集中于 `ai_agent.js` 统一调度逻辑 | 引入 `.agents/` 配置库并重构统一智能体调度中心 |
| **知识图谱内核** | 包含强解耦的算法引擎 `graph_core.js` 与多维索引 | 在页面中直接调用 ECharts 渲染 | 采用 `graph_core.js` 计算引擎 + ECharts 响应式渲染 |
| **视觉与布局** | 局部页面宽度不一，无统一 Footer | 全站统一 1360px 宽度容器与 OBE 标准 Footer | **知识图谱板块全面对齐主分支 1360px 与标准 Footer** |
| **部署与构建** | 静态纯本地运行 | 具备 GitHub Pages 自动发布（Actions） | 保留主分支的 GitHub Actions CI/CD 自动化构建流 |

### 2. 融合后的最优迭代版本目标架构
- **视图层（View Layer）**：全站统一采用 1360px 响应式网格容器，亮色/暗色主题无缝支持，规范化顶部导航与底部 4 栏式 Footer。
- **算法与数据层（Data & Graph Engine）**：由 `js/modules/graph_core.js` 统一管理理论知识节点（18学时学时矩阵）与实战能力节点（PBL 18项技能）。
- **协同与交互层（Agent & Interaction Layer）**：融合四角色 Agent 智能体，集成快捷 AI 罗盘（Ctrl+K）与知识点导学侧边栏。

---

## 二、知识图谱板块标准化规范

### 1. 视觉样式与交互风格统一
- **颜色体系**：
  - 主蓝（Primary Blue）：`#2563EB`（节点高亮、关键按钮与链接）
  - 辅助浅蓝（Light Blue）：`#EFF6FF`（背景高亮、提示框）
  - 文字主色：`#0F172A`；文字次色：`#475569`；边框颜色：`#E2E8F0` / `var(--border-color)`
- **控件样式**：
  - 按钮/选择框统一圆角 `var(--radius-md)`（8px）或 `var(--radius-lg)`（12px）。
  - 悬浮阴影统一采用 `box-shadow: var(--shadow-sm)` 至 `var(--shadow-md)`。

### 2. 页面宽度与布局规格标准
- **主体容器**：
  - 类名统一为 `.graph-container` 或 `.knowledge-main-viewport`。
  - 宽度规格：`max-width: 1360px; margin: 16px auto 24px auto; width: 100%;`。
  - 高度规格：高度固定或最小高度为 `780px`（或 `calc(100vh - 240px)`），确保图谱在桌面端拥有黄金观察视角。
- **两栏响应式布局**：
  - 左侧：图谱视口（`flex: 1`），包含控制罗盘、搜索框、分类图例与科技网格背景。
  - 右侧：知识卡片/侧边栏（宽度 `360px` 到 `400px`），平滑展开/收起。

### 3. 标准页脚（Footer）结构与组件嵌入
必须在 `knowledge_graph.html` 与 `graph.html` 页面底部无缝嵌入全站标准 Footer：
```html
<footer style="background:var(--bg-card); border-top:1px solid var(--border-color); padding:48px 0 32px 0; margin-top:auto;">
    <div style="max-width:1360px; margin:0 auto; padding:0 24px; display:grid; grid-template-columns:1.5fr 1fr 1fr 1.2fr; gap:36px;">
        <!-- 栏目1：品牌与OBE认证说明 -->
        <!-- 栏目2：课程核心体系链接 (CLOs, 理论图谱, 实战图谱, 大纲地图, PBL) -->
        <!-- 栏目3：教学资源与评估 (AI导师, 学情看板, 资源下载, 词典, 考试) -->
        <!-- 栏目4：系统状态与数据指标 (实时数据与隐私保障) -->
    </div>
    <div style="max-width:1360px; margin:36px auto 0 auto; padding:20px 24px 0 24px; border-top:1px solid var(--border-color); display:flex; align-items:center; justify-content:space-between;">
        <div>Copyright (C) 2026 《大学生创新创业基础》课程智能体平台. All Rights Reserved.</div>
        <div>Antigravity Engine 运行正常 | 首页 | 使用说明 | 教师入口</div>
    </div>
</footer>
```

---

## 三、分模块具体修改与优化内容清单

### 模块 1：理论知识图谱（`knowledge_graph.html`）
1. **结构与样式**：
   - 确认容器宽度统一为 `1360px`，去除局部不规范内边距。
   - 保持视图切换下拉框（18学时理论、理论应用与AI工具、大赛考核）样式与 CSS 变量对齐。
2. **交互逻辑**：
   - 节点点击事件绑定 `openKnowledgeCard(node)`，并在右侧侧边栏平滑渲染出处、案例与前置知识点。
   - 支持快捷键 `Ctrl+K` 调出全局 AI 调度中心，对节点按关键词执行模糊遮罩与高亮。
3. **Footer 标准化**：
   - 确保完整嵌入 OBE 成果导向 Footer，与其他全站页面保持完全一致的视觉落脚。

### 模块 2：实战能力图谱（`graph.html`）
1. **结构与样式**：
   - 统一顶部切换 Banner 样式，提供“理论知识图谱”与“实战能力图谱”的双向快速无缝跳转按钮。
   - 容器统一采用 `.knowledge-main-viewport`，保证与 `knowledge_graph.html` 的 `780px` 高度一致。
2. **交互逻辑**：
   - 支持多视图切换模式：`OBE 六维能力雷达`、`18 项 PBL 技能拓扑`、`能力标杆对比`。
   - 结合学生能力诊断，一键生成 AI 导师 1v1 弱项补修路线图。
3. **Footer 标准化**：
   - 页脚布局规格为 `max-width: 1360px`，确保页面拉至底部时组件过度自然完备。

### 模块 3：核心算法与 Agent 协同模块（`js/modules/graph_core.js` & `js/ai_agent.js`）
1. **算法引擎重构**：
   - 将 V6.0 CODEX 中的多维关联算法接入 `graph_core.js`，支持按照模块（M1-M9）、难度、CLO 映射关系进行动态切片。
2. **Agent 协同引入**：
   - 将 `.agents/` 目录合入项目根目录。
   - 在 `js/ai_agent.js` 中实现 Agent 消息监听与异步响应分发，支持四角色 Agent 跨模块数据查询与方案推送。

---

## 四、行动清单与实施计划

| # | 行动项 | 负责角色 | 时间窗 | 验收标准 |
|---|--------|----------|--------|----------|
| 1 | 知识图谱 HTML/CSS 宽度与 Footer 标准化校验 | 析客 / UI工程 | Day 1 | `knowledge_graph.html` & `graph.html` 容器统一 1360px，Footer 完全完备 |
| 2 | 合入 `.agents/` 目录与 Agent 配置体系 | 路径 / Agent架构 | Day 2 | Agent 角色定义与通信协议成功加载 |
| 3 | 重构 `graph_core.js` 算法引擎与数据解耦 | 数析 / 算法工程 | Day 3 | 理论与实战节点拓扑图谱平滑渲染与秒级切换 |
| 4 | 快捷键 AI 罗盘 (Ctrl+K) 与诊断导学卡连调 | 瑞思 / 交互工程 | Day 4 | Ctrl+K 节点检索高亮正常，侧边栏导学卡精准渲染 |
| 5 | 全站自动化测试与 GitHub Pages 发布 | 竞析 / DevOps | Day 5 | CI/CD 自动部署成功，公开站点正确呈现最佳融合版 |

---

## ⚠️ 待确认 / 假设 / Non-goals

- **假设**：用户端浏览器均支持现代 ES6 Modules 与 CSS 自定义变量。
- **Non-goals**：不改动底层 HTML 5 结构基础，不引入昂贵的第三方重型 WebGL 库（保持 ECharts 5+ 优雅离线渲染）。

---

## 📚 成员产出索引

- **析客（需求分析师）**：制定知识图谱板块标准化规格书与修改清单。
- **瑞思（用户研究员）**：提交知识点导学卡与 Ctrl+K 快捷罗盘用户体验设计。
- **竞析（竞品分析师）**：分析并验证两版本优劣势，提炼最佳实践融合方案。
- **数析（数据分析师）**：设计知识节点拓扑多维算法与关联权重。
- **路径（路线图规划师）**：制定 5 日合并与落地发布实施路线图。

---

> 本报告由产品战略团队 AI 协作生成，重要决策请由产品负责人审定。
