# 创业主题 Web 应用系统界面设计与架构规划方案

**设计执笔**：UI Designer（像素君）  
**工程目标**：构建兼具极简现代视觉质感、创业创新氛围、高响应速度及易用性的 Web 应用系统界面，支持嵌入式 HTML 动态 PPT 演播与雷达图能力图谱大屏分析。

---

## 一、 视觉与布局规范（Visual & Layout Foundations）

### 1. 创业视觉配色方案 (Vibrant Entrepreneurial Palette)
结合“创新、科技、活力与稳健”的创业氛围，建立统一的 CSS 设计 Token：
- **创业蓝 (Innovation Blue - `#0284c7`)**：象征科技信任、理性决策与稳健发展。
- **活力橙/金 (Venture Amber - `#f59e0b`)**：象征创业激情、创新突破与资本回报。
- **深海蓝黑 (Deep Navy - `#0f172a`)**：用于统一的全局页脚（Footer）与深色演播背景，提供沉浸式厚重感。
- **极简白/浅灰 (Academic Light - `#f8fafc` / `#ffffff`)**：全站主背景，保障信息清晰可读，拒绝花哨过度的渐变杂音。

### 2. 全站统一布局标准与全局页脚 (Global Layout & Footer)
- **统一版心宽度 (Container Standard)**：全站固定大屏最大物理宽度为 `1200px`（极窄屏降级为 `100% - 32px` padding），居中对齐，保证多端视觉对齐线一致。
- **统一全局页脚 (Global Footer)**：
  - 背景色锁定为 `#0f172a`（深海蓝黑），内嵌 4 栏响应式布局：
    1. **品牌愿景**：系统名称、创业使命口号。
    2. **核心导航**：首页、研判大屏、能力图谱、演示中心。
    3. **资源链接**：教学大纲、竞赛指南、开源代码。
    4. **版权与备案**：离线应用声明、高校教学使用许可。

---

## 二、 页面与组件划分（Page & Component Architecture）

### 1. 首页长页面布局（Long-page Structure）
首页采用纵向长流式页面布局，由上至下划分为 5 个核心视觉模块：
1. **Hero 首屏品牌区**：大字号标题“创智汇 · 创新创业项目全生命周期智能体”，搭配极简按钮与动态背景粒纹。
2. **关键指标看板 (KPI Metrics)**：4 栏平铺显示（项目申报数、孵化成功率、能力平均得分、累计专利量）。
3. **核心业务矩阵 (Core Modules)**：卡片化展示综合决策研判、能力图谱剖析、PPT 演播与资源下载。
4. **创业成果瀑布流 (Showcase Grid)**：展示优秀项目案例卡片，支持悬浮微动效。
5. **全局 Footer**：统一落底页脚。

### 2. HTML 动态 PPT 演示组件集成 (Embedded Presentation Component)
基于 `html-ppt-skill` 规范，设计嵌入式动态 PPT 播放器：
- **16:9 严格比例**：采用 `width: 100%; height: 56.25vw;`（打印状态为 `297mm x 167.0625mm`）。
- **Scroll-snap 翻页**：开启 `scroll-snap-type: y mandatory`，支持滚轮与触摸滑动平滑切页。
- **键盘与控制条**：支持左右/上下方向键切页，右侧悬浮 Dot 导航与全屏模式切换。

---

## 三、 核心可视化模块设计（Visual Analytics Modules）

### 1. 综合研判与决策分析界面（Decision Dashboard）
- **数据研判看板**：采用 3 栏弹性布局（知识掌握度、竞赛准备度、商业逻辑闭环率），直观反映项目投融资或答辩胜率预测。
- **动态风险预警**：基于卡片配色（绿色安全 / 黄色注意 / 红色预警）提示项目短板。

### 2. 6 维能力图谱蜘蛛网/雷达图（Radar / Capability Graph）
借鉴知识图谱节点维度，将创业者/团队多维能力细化拆解为 6 大联动维度：
1. **CLO1 创客思维 (Maker Mindset)**：创新敏锐度与痛点挖掘能力。
2. **CLO2 商业模式 (Business Model)**：成本结构与盈利逻辑闭环。
3. **CLO3 团队领导 (Leadership & Exec)**：跨学科协作与执行落地。
4. **CLO4 路演表达 (Pitching & Demo)**：答辩攻防与 3 分钟演讲质感。
5. **CLO5 财务风控 (Financial Control)**：现金流预测与估值模型。
6. **CLO6 社会价值 (Social Impact)**：红旅赛道与可持续社会效益。

**层级与联动关系**：
- 雷达图中心为团队综合基准线，向外辐射 6 个顶点。
- 点击雷达图任意顶点，右侧动态联动显示该维度的关联知识图谱节点及历史考核扣分项。

---

## 四、 前端代码实现示例 (HTML & CSS & JS)

### 1. HTML 结构框架模板 (`index.html`)

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>创智汇 · 创新创业应用系统</title>
  <style>
    :root {
      --primary: #0284c7;
      --accent: #f59e0b;
      --bg-dark: #0f172a;
      --bg-light: #f8fafc;
      --text-main: #0f172a;
      --text-muted: #64748b;
      --container-w: 1200px;
    }
    body { margin: 0; font-family: system-ui, -apple-system, sans-serif; background: var(--bg-light); color: var(--text-main); }
    .container { max-width: var(--container-w); margin: 0 auto; padding: 0 24px; }
    
    /* Long Page Modules */
    .hero { padding: 80px 0; text-align: center; background: #fff; border-bottom: 1px solid #e2e8f0; }
    .hero h1 { font-size: 40px; margin-bottom: 16px; color: var(--primary); }
    
    .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin: 40px 0; }
    .kpi-card { background: #fff; padding: 24px; border-radius: 8px; border: 1px solid #e2e8f0; text-align: center; }
    .kpi-card .num { font-size: 32px; font-weight: bold; color: var(--primary); }

    /* PPT Embed Section */
    .ppt-wrapper { width: 100%; aspect-ratio: 16/9; background: #000; border-radius: 12px; overflow: hidden; margin: 40px 0; }

    /* Global Footer */
    footer { background: var(--bg-dark); color: #94a3b8; padding: 60px 0 30px; margin-top: 80px; }
    .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; }
    footer h4 { color: #fff; margin-bottom: 16px; }
  </style>
</head>
<body>

  <header style="background: #fff; border-bottom: 1px solid #e2e8f0; padding: 16px 0;">
    <div class="container" style="display: flex; justify-content: space-between; align-items: center;">
      <strong style="font-size: 20px; color: var(--primary);">VentureHub 创智汇</strong>
      <nav style="display: flex; gap: 24px;">
        <a href="#hero" style="color: var(--text-main); text-decoration: none;">首页</a>
        <a href="#ppt" style="color: var(--text-main); text-decoration: none;">路演演播</a>
        <a href="#radar" style="color: var(--text-main); text-decoration: none;">能力图谱</a>
        <a href="#decision" style="color: var(--text-main); text-decoration: none;">综合研判</a>
      </nav>
    </div>
  </header>

  <main class="container">
    <section class="hero" id="hero">
      <h1>创新创业项目全生命周期智能体</h1>
      <p style="color: var(--text-muted); max-width: 600px; margin: 0 auto 24px;">融合知识图谱、动态雷达评估与 HTML 演播的一站式创业孵化与教学平台。</p>
    </section>

    <section class="kpi-grid">
      <div class="kpi-card"><div class="num">128</div><div>累计孵化项目</div></div>
      <div class="kpi-card"><div class="num">89.4%</div><div>商业逻辑达成率</div></div>
      <div class="kpi-card"><div class="num">28</div><div>知识图谱核心节点</div></div>
      <div class="kpi-card"><div class="num">100%</div><div>离线数据安全</div></div>
    </section>

    <section id="ppt">
      <h2>动态路演演播组件 (HTML PPT)</h2>
      <div class="ppt-wrapper">
        <iframe src="presentation.html" style="width: 100%; height: 100%; border: none;"></iframe>
      </div>
    </section>
  </main>

  <footer>
    <div class="container footer-grid">
      <div>
        <h4>VentureHub 创智汇</h4>
        <p>专注高校创新创业教育与项目实战孵化，提供严谨可推演的数据研判与能力图谱分析。</p>
      </div>
      <div>
        <h4>核心功能</h4>
        <p>知识图谱<br>学情诊断<br>路演演播</p>
      </div>
      <div>
        <h4>教学资源</h4>
        <p>课程大纲<br>竞赛指南<br>开源代码</p>
      </div>
      <div>
        <h4>系统说明</h4>
        <p>支持纯离线运行<br>符合 WCAG AA 标准</p>
      </div>
    </div>
  </footer>

</body>
</html>
```

---

## 五、 交付与归档说明

本设计方案已同步更新至项目设计文档，并建立了标准的前端组件结构规则。可以此为基础进行具体的页面开发与交互落地。

**落盘文档路径**：`D:\创新创业课程知识图谱智能体20260608\创新创业课程知识图谱智能体\全站UI_UX设计规范与优化方案.md`
