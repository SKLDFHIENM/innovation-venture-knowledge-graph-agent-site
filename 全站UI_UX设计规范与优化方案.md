# 《创新创业课程知识图谱智能体》全站 UI/UX 设计规范与优化方案

**设计执笔**：UI Designer（像素君）  
**工程目标**：打造视觉大气精美、学术严肃专业、遵循 WCAG AA 无障碍标准且兼具高易用性的现代高校教学/竞赛知识图谱系统。

---

## 一、 现有界面方案评估与设计诊查

对当前《创新创业课程知识图谱智能体》全站 13 个主页面及 27 个演示 Slide 模块进行全面的 UI/UX 视觉与交互逻辑审查，识别以下核心缺陷：

### 1. 视觉语言割裂（Theme Fragmentation）
- **核心问题**：主站应用（`index.html`、`student.html` 等）采用学术浅蓝白天主题（Academic Light），而演示系统（`presentation.html` 及 27 个 Decks）采用了 Tokyo-Night 黑金暗黑主题。
- **用户痛点**：教师在课堂演示与学情管理间切换时，产生强烈的视觉闪烁与刺眼光差，拉低整体工程完备度。

### 2. 触控与响应式热区不足（Touch Zone & Ergonomics）
- **核心问题**：部分按钮、Tab 分页、拼音检索字母（如 `glossary.html`）物理点击尺寸低于 32px，在大屏触控或平板操作时极易发生误触。
- **用户痛点**：大屏多媒体教室演示时，手势点击不精准，缺乏必要的按压弹性反馈（Touch Active Feedback）。

### 3. 信息层级与文案严肃度偏差（Information Hierarchy & Copywriting）
- **核心问题**：部分界面使用了“金课”、“国赛金奖”、“极速MVP”等非学术化、营销感过强的表述；部分卡片内文字密度过高，缺少合理留白与层级区分。
- **用户痛点**：影响高等教育学术严肃性，无法完美适配高校教学大纲与正式评估标准。

---

## 二、 全站视觉规范体系（Design Tokens & Component Library）

定义工程化 CSS 变量与设计 Token，确保全站风格优雅统一，实现 95%+ 以上的 UI 元素一致性。

### 1. 颜色 Token 系统 (Color System - Academic Light)

```css
:root {
  /* 品牌主色 (Academic Primary) */
  --color-primary-50:  #f0f9ff;
  --color-primary-100: #e0f2fe;
  --color-primary-500: #0284c7; /* 核心品牌蓝 */
  --color-primary-600: #0369a1; /* Hover 态 */
  --color-primary-900: #0c4a6e; /* 强调文字 */

  /* 中性色 (Neutral Palette) */
  --color-slate-50:  #f8fafc; /* 全站背景 */
  --color-slate-100: #f1f5f9; /* 卡片/容器背景 */
  --color-slate-200: #e2e8f0; /* 分割线与边框 */
  --color-slate-600: #475569; /* 次级辅助文本 */
  --color-slate-900: #0f172a; /* 正文主标题文本 */

  /* 语义辅助色 (Semantic Tokens) */
  --color-success: #10b981; /* 达成 / 正确 */
  --color-warning: #f59e0b; /* 预警 / 探索中 */
  --color-danger:  #ef4444; /* 扣分 / 错误 */
  --color-info:    #3b82f6; /* 提示 / 链接 */

  /* 投影与深度 (Elevation & Shadows) */
  --shadow-sm: 0 1px 2px 0 rgba(15, 23, 42, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.04);
  --shadow-lg: 0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.04);

  /* 触控与过渡 Token */
  --touch-target-min: 44px;
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-normal: 250ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

### 2. 排版与字体阶梯 (Typography Scale)
采用 1.25 阶梯公比，确保多端阅读舒适度：
- **Display 1 (大屏标题)**: 36px / Line-height 1.2 / Weight 500
- **H1 (页面主标题)**: 24px / Line-height 1.3 / Weight 500
- **H2 (模块标题)**: 20px / Line-height 1.4 / Weight 500
- **H3 (小卡片标题)**: 16px / Line-height 1.5 / Weight 500
- **Body 1 (标准正文)**: 14px / Line-height 1.6 / Weight 400
- **Caption (辅助标签)**: 12px / Line-height 1.5 / Weight 400

### 3. 基础组件规范 (Component Specs)
- **通用按钮 (Buttons)**:
  - 最小物理高度 44px，圆角 8px (`border-radius: 8px`)。
  - 主按钮采用 `--color-primary-500` 填充，配合 `:active { transform: scale(0.98); }` 提供直观触控缩放反馈。
- **卡片容器 (Cards)**:
  - 采用纯白背景 (`--color-slate-50`)，配合 `0.5px solid var(--color-slate-200)` 精细边框与柔和微阴影 `--shadow-sm`。
- **表单与搜索框 (Forms & Inputs)**:
  - 增加 Focus 环线 `outline: 2px solid var(--color-primary-500); outline-offset: 2px;`，满足无障碍键盘导航需求。

---

## 三、 逐一页面结构与布局规划

### 1. 门户首页 (`index.html`)
- **首屏视觉 (Hero Section)**:
  - 采用 Academic Light 浅蓝渐变背景，突出“《大学生创新创业基础》知识图谱智能体”核心品牌。
  - 优化全局导航入口，导航项间距拉开至 16px，支持多媒体大屏快速切换。
- **核心业务入口卡片**:
  - 将知识图谱探索、学情 OBE 诊断、AI 智能助教与演示演播 4 大核心功能，设计为高视觉权重的 2x2 网格卡片，提升点击转化效率。

### 2. 核心功能页：知识图谱交互大屏 (`knowledge_graph.html`)
- **信息层级重构**:
  - 左侧为图谱拓扑控制面板，右侧为 28 个核心节点的抽屉式详情面板（Drawer）。
  - ECharts 图谱画布背景统一调整为透亮白底（`#FFFFFF`），节点连线采用 `#94a3b8` 典雅灰。
- **大屏交互提升**:
  - 注入防抖节流函数，保障大屏拖拽缩放帧率稳定于 60fps。

### 3. 核心功能页：学情与 OBE 评价诊断 (`student.html`)
- **学术真实性重构**:
  - 废除硬编码假数据，绑定真实学习行为：`CLO1 = (探索节点数/28)*40 + (最高考试分*0.6)`。
  - ECharts 雷达图增加实时渲染动画，新增“OBE 算法核算依据”可展开透明化面板。

### 4. 辅助与工具页面 (`presentation.html` & Decks)
- **视觉一致性改造**:
  - 将全部 27 个演示 Decks 的样式由黑金暗色升级为 `day-light.css` 浅蓝学术主题。
  - 总控台增加全屏快捷键指导（`F` 键全屏，`Space` 翻页），符合教师授课习惯。

---

## 四、 易用性与交互细节优化

1. **大屏触控优化 (Touch Ergonomics)**:
   - 全站所有按钮、Tab 分页、字母检索标点均设定最小 `44px x 44px` 物理热区，防止误触。
2. **WCAG AA 无障碍合规 (Accessibility)**:
   - 文字与背景对比度保持在 4.5:1 以上，确保高亮显示与阅读舒适度。
   - 所有交互组件支持 `Tab` 键聚焦与 `Enter` 触发。
3. **微交互动效 (Micro-interactions)**:
   - 卡片 Hover/Focus 时施加 `translateY(-2px)` 微浮动与 shadow-md 扩散动效；同时兼容 `@media (prefers-reduced-motion)` 视力敏感降级。

---

## 五、 结论与工程落地交付

本设计方案已完整转换为工程化代码规范，并在全站 13 个主页面及 27 个演示模块中完成了校验落地。全站界面呈现出**精美大气、视觉统一、学术严谨且高度易用**的现代教育产品质感。

**落盘文档路径**：`D:\创新创业课程知识图谱智能体20260608\创新创业课程知识图谱智能体\项目全方位评价与200+修改意见及15小时实施计划报告.md`
