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
│   │   ├── base                # js&ts基础题目
│   │   ├── vue                 # vue题目
│   │   └── react               # react题目
│   ├── core/                  # 成员个人/分路线实现
│   │   └── <member>           # 各自的实现 & 练习
│   ├── docs/                  # 文档站
│   └── utils/                 # 工具脚本
├── CHANGELOG.md               # 版本日志
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
> 1. 将项目拉取到本地后，请在 `packages/core` 目录下为自己创建一个文件夹做为自己的练习空间
> 2. 每日一题的题目均在 `packages/problems` 目录下，包含 `react` 和 `vue` 以及 `base` 三种类型题目
> 3. 基础题可直接将 `base` 目录下的题目复制到自己的练习空间进行练习；**值得注意的是**：对于 `vue` 和 `react` 版本的题目，**首次使用时先将整个文件夹复制到自己的练习空间，并且将 `package.json` 中的 `name` 字段改为其他任意你喜欢的名称，避免冲突**，以后只需要将每日更新的题目复制到自己的练习空间即可。

### 4. 脚本

| 命令                  | 作用                                    | 备注                                |
| --------------------- | --------------------------------------- | ----------------------------------- |
| `pnpm dev`            | 按序执行 lint:fix -> lint -> run vitest | 快速本地反馈                        |
| `pnpm test`           | 运行 Vitest                             | 仅匹配 `packages/core` 中的测试     |
| `pnpm build:problems` | 打包题库                                | 构建后产物：`dist/problems.zip`     |
| `pnpm docs:dev`       | 启动 VitePress 文档                     | -                                   |
| `pnpm docs:build`     | 构建静态文档                            | -                                   |
| `pnpm release`        | 发布 release                            | 受 `.release-it.json` 驱动          |
| `pnpm problem:react`  | 查看 React 题目                         | 对应 `packages/problems/react` 子包 |
| `pnpm problem:vue`    | 查看 Vue 题目                           | 对应 `packages/problems/vue` 子包   |

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
