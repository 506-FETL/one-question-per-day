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

> 算法 / JS 原理实现 / 工程实践 的练习与复盘仓库。

## 🏗️ 概览

```
one-question-per-day/
├── packages/
│   ├── problems/                # 题库（官方题目源）
│   │   ├── base/                # JS & TS 基础实现题
│   │   ├── vue/                 # Vue 版本题目（含演练页面）
│   │   └── react/               # React 版本题目（含演练页面）
│   ├── core/                    # 成员/路线解答与实验空间
│   │   ├── base/                # JS/TS 题目实现
│   │   ├── react/               # React 个人路线实现
│   │   │   └── solutions/       # 解答界面：<solver>/<day>/ 结构（例如 seam/01、gcy/01）
│   │   └── vue/                 # Vue 个人或路线实现（结构与 react 类似）
│   ├── docs/                    # 文档站（VitePress）
│   └── utils/                   # 构建/发布等脚本
├── CHANGELOG.md                 # 版本日志
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
pnpm install

pnpm test             # 跑所有成员测试（packages/core/**）
pnpm dev              # 格式化 -> 代码检查 -> 测试
pnpm docs:dev         # 启用文档
```

## 🧪 测试 & 质量

| 维度     | 工具                                                           | 说明                    |
| -------- | -------------------------------------------------------------- | ----------------------- |
| 单元测试 | Vitest                                                         | 快速反馈 / 快速定位回归 |
| 代码质量 | [@antfu/eslint-config](https://github.com/antfu/eslint-config) | 统一风格与潜在错误检测  |

## 📘 使用手册

### 1. 环境准备

> [!IMPORTANT]
> **请确保你的环境中已安装以下版本：**
>
> [![Node.js](https://img.shields.io/badge/Node.js-%3E%3D22.19-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
> [![pnpm](https://img.shields.io/badge/pnpm-%3E%3D10.15-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)

验证：

```bash
node -v
pnpm -v
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 初次使用

> [!WARNING]
> **初次使用请务必阅读此部分内容**
>
> 1. 将项目拉取到本地后，直接在 `packages/core/react/solutions` 下按你的身份或路线新增一个 solver 文件夹（例如 `my`），然后复制官方题库（`packages/problems/react/problems/`）对应 Day 的题目，放到 `solutions/my/` 下进行实现与测试。
> 2. React 端题库演练入口：`packages/problems/react`；个人/路线解法集中在：`packages/core/react/solutions/<solver>/<day>`。
> 3. 如果需要 Vue 版本，结构与 React 类似，参考 `packages/problems/vue` 与 `packages/core/vue`。

### 4. 脚本

| 命令                  | 作用                                               | 备注                              |
| --------------------- | -------------------------------------------------- | --------------------------------- |
| `pnpm dev`            | 运行统一开发例程（修复 Lint -> Lint -> 单测）      | 主要面向 core 下的解答与题目验证  |
| `pnpm test:run`       | 跑所有单元测试                                     | 侧重 `packages/core/**`           |
| `pnpm build:problems` | 打包题库（可能用于分发或归档）                     | 产物：`dist/problems.zip`         |
| `pnpm docs:dev`       | 启动文档站（VitePress）                            | 实时预览                          |
| `pnpm docs:build`     | 构建静态文档                                       | -                                 |
| `pnpm release`        | 发布版本（自动生成 CHANGELOG / tag / npm publish） | 受 `.release-it.json` 驱动        |
| `pnpm problem:react`  | 启动 React 题库演练站                              | 题目源：`packages/problems/react` |
| `pnpm problem:vue`    | 启动 Vue 题库演练站                                | 题目源：`packages/problems/vue`   |

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

## ⚖️ License

MIT © 506 Lab

> Keep shipping small improvements. Solve · Reflect · Evolve.
