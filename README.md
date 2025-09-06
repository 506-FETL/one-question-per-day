# 506 实验室 · 每日一题🚀

<br />

<div align="center">
  <div style="display: flex; justify-content: center; gap: 16px; margin-bottom: 20px;">
    <a href="https://one-question-per-day-react-problem.vercel.app/">
      <img src="https://img.shields.io/badge/React-每日一题-61DAFB?logo=react&logoColor=white&labelColor=61DAFB" alt="React 每日一题" />
    </a>
    <a href="https://one-question-per-day-vue-problem.vercel.app/">
      <img src="https://img.shields.io/badge/Vue-每日一题-42b883?logo=vue.js&logoColor=white&labelColor=42b883" alt="Vue 每日一题" />
    </a>
    <a href="https://506-fetl.github.io/one-question-per-day/">
      <img src="https://img.shields.io/badge/文档中心-5C73E7?logo=vitepress&labelColor=5C73E7&logoColor=white" alt="VitePress 文档" />
    </a>
  </div>
</div>

<br />

> 数据结构 / 算法 / JS 原理实现 / 工程实践 的练习与复盘仓库。强调：小步快跑 · 测试驱动 · 渐进式类型 · 复盘沉淀。

## 🏗️ 概览

```
one-question-per-day/
├── packages/
│   ├── problems/              # 题库
│   ├── core/                  # 成员个人/分路线实现
│   │   └── <member>/Day XX/   # 各自的实现 & 练习
│   ├── docs/                  # 文档站
│   └── utils/                 # 工具脚本 / 产物打包辅助
├── assets/                    # 公共静态资源
├── dist/                      # 构建产物
├── pnpm-workspace.yaml        # Workspace 声明
├── vite.config.ts             # 构建配置
├── vitest.config.ts           # 测试配置
├── CHANGELOG.md / RELEASE_NOTES.md
└── README.md
```

## 🥅 目标

- 稳定的编程练习节奏
- 测试驱动、快速反馈与安全重构
- 多解策略对比（暴力 → 优化 / 空间换时间 / 结构变换）
- 渐进式引入 TypeScript，沉淀抽象边界
- 复盘体系化：错因 / 边界 / 优化思路可追溯

## 🚀 快速开始

```bash
pnpm install          # 安装所有 workspace 依赖
pnpm test             # 跑所有 Vitest 测试（仅 packages/core/** 下匹配 include 规则）
pnpm dev              # lint:fix -> lint -> vitest run 串行执行

# 文档站（packages/docs 子包，内部脚本已指向当前目录）
pnpm docs:dev
```

## 🧪 测试 & 质量

| 维度     | 工具                                                           | 说明                    |
| -------- | -------------------------------------------------------------- | ----------------------- |
| 单元测试 | Vitest                                                         | 快速反馈 / 快速定位回归 |
| 代码质量 | [@antfu/eslint-config](https://github.com/antfu/eslint-config) | 统一风格与潜在错误检测  |

## 📘 使用手册

### 1. 环境准备

- Node.js >= 22.19（建议保持最新 LTS）
- 已全局安装 pnpm（如未安装：`npm i -g pnpm`）
- Git 工作区干净（发布需保证工作区无未提交变更）

验证：

```bash
node -v
pnpm -v
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 常用脚本一览

| 命令                  | 作用                                            | 备注                                                    |
| --------------------- | ----------------------------------------------- | ------------------------------------------------------- |
| `pnpm dev`            | 按序执行 lint:fix -> lint -> run vitest         | 快速本地反馈（不进入 watch）                            |
| `pnpm test`           | 运行 Vitest（含 UI 关闭，使用配置 include）     | 仅匹配 `packages/core/**/*.{spec,test}.{js,ts,jsx,tsx}` |
| `pnpm build:problems` | 打包题库（复制 problems → dist/problems + zip） | 构建后产物：`dist/problems.zip`                         |
| `pnpm docs:dev`       | 启动 VitePress 文档站                           | 默认端口 5173（或空闲端口）                             |
| `pnpm docs:build`     | 构建静态文档                                    | 产物位于 `packages/docs/.vitepress/dist`                |
| `pnpm release`        | 自动化版本号 & 生成 CHANGELOG & GitHub Release  | 受 `.release-it.json` 驱动                              |
| `pnpm type-check`     | 仅做 TS 类型检查                                | 渐进式引入类型时使用                                    |
| `pnpm problem:react`  | 启动 React 题目交互                             | 对应 `packages/problems/react` 子包                     |
| `pnpm problem:vue`    | 启动 Vue 题目交互                               | 对应 `packages/problems/vue` 子包                       |

### 4. 新增一题（Day XX）

以“Day 20”为例：

1. 在 `packages/problems/base/` 下创建名为 `Day 20` 的目录（命名保持与其它 Day 一致，含空格）。
2. 在该目录中新建 `README.md`，包含：
   - 题目：一句话概述或背景描述。
   - 要求：输入 / 输出格式、复杂度约束、边界情况（如空数组、极值、重复值等）。
   - 示例：给出 1~2 组代表性“输入 → 输出”示例，可再补充一个边界或反例。
3. 新建 `answer.js`：
   - 导出一个或多个策略函数（例如 `solutionA`、`solutionB`），命名体现策略差异（暴力 / 双指针 / 递归 / DP 等）。
   - 在文件顶部可用注释简述每个策略的时间 / 空间复杂度、适用场景或取舍。
   - 若存在通用辅助函数，可放同目录单独文件后在 `answer.js` 中聚合导出。
4. 若该题需要类型支持，可在同目录创建 `ts/` 子目录，并加入 `index.ts` 做类型体操 / 条件类型推导；不影响主 JS 可读性。
5. 成员（例如 seam）准备自己的一份实现：
   - 在 `packages/core/seam/base/` 下复制问题文件
   - 删除 `README.md、answer.{ts,js}`(可选)
6. 运行测试：使用 Vitest 的路径过滤或测试名过滤方式，仅执行“Day 20”相关文件，或者在根目录下直接运行`pnpm test`。
7. 测试会监测文件变化，给出答案直到所有测试跑通

## 📖 复盘内容

集中收录在：

- `packages/docs/review/`：阶段总结、共性错误、优化策略
- `packages/docs/days/`：题目索引 / 进度概览

> 🧠 建议：复盘时写下 “初始直觉 → 复杂点 → 最终取舍”。

## 🧬 渐进式 TS 策略

原则：价值优先 & 可读性第一。

- 只为具有“复用 / 抽象潜力”的题目补类型
- 用测试反演类型边界（失败用例驱动补充）
- 避免过度复杂条件类型；必要时在 `ts/` 子目录里做实验版本

## 🤝 贡献者

<!-- readme: contributors -start -->
<table>
	<tbody>
		<tr>
            <td align="center">
                <a href="https://github.com/seaeam">
                    <img src="https://avatars.githubusercontent.com/u/87215099?v=4" width="100;" alt="seaeam"/>
                    <br />
                    <sub><b>lll</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/pcppp">
                    <img src="https://avatars.githubusercontent.com/u/104177657?v=4" width="100;" alt="pcppp"/>
                    <br />
                    <sub><b>peng chang</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/xiersiki">
                    <img src="https://avatars.githubusercontent.com/u/74220172?v=4" width="100;" alt="xiersiki"/>
                    <br />
                    <sub><b>Gong Che Yu</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/Dc9309">
                    <img src="https://avatars.githubusercontent.com/u/103992756?v=4" width="100;" alt="Dc9309"/>
                    <br />
                    <sub><b>Dc9309</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/notshine">
                    <img src="https://avatars.githubusercontent.com/u/105473589?v=4" width="100;" alt="notshine"/>
                    <br />
                    <sub><b>Peng Liang</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/wang-danni">
                    <img src="https://avatars.githubusercontent.com/u/126050206?v=4" width="100;" alt="wang-danni"/>
                    <br />
                    <sub><b>wang-danni</b></sub>
                </a>
            </td>
		</tr>
	<tbody>
</table>
<!-- readme: contributors -end -->

---

## ⚖️ License

MIT © 506 Lab

> Keep shipping small improvements. Solve · Reflect · Evolve.
