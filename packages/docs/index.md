---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: OneQuestionPerDay
  text: 506 · 每日一题
  tagline: 聚焦 数据结构 / 算法 / JS 基础实现 / 工程实践 · 小步快跑 + 测试驱动 + 渐进复盘
  image:
    light: /hero.svg
    dark: /hero-dark.svg
    alt: 每日一题
    width: 620
  actions:
    - theme: brand
      text: 🚀 快速开始
      link: /days
    - theme: alt
      text: 📂 目录结构
      link: /#📂-目录结构
    - theme: alt
      text: 🧾 复盘索引
      link: /review/
    - theme: alt
      text: 📝 更新日志
      link: https://github.com/506-FETL/one-question-per-day/blob/main/CHANGELOG.md
    - theme: alt
      text: 📦 Release 下载
      link: https://github.com/506-FETL/one-question-per-day/releases

features:
  - title: ✅ 测试先行
    details: 每题配套 Vitest 测试，最小回归半径，快速验证正确性。
  - title: 📅 日更归档
    details: problems/Day XX 结构清晰，便于检索与阶段复盘。
  - title: 🧬 渐进 TS
    details: 为高价值题目补充类型与推导，沉淀范式。
  - title: 🔄 发布自动化
    details: Conventional Commits + release-it 生成版本与日志。
  - title: ✨ 多解对比
    details: 支持在 answer.js 中并列多策略输出。
  - title: 📚 复盘沉淀
    details: review/ 汇总思路演进、边界与常见误区。
---

<script setup>
import { VPTeamPage, VPTeamPageTitle, VPTeamMembers } from 'vitepress/theme'

const members = [
  { avatar: 'https://avatars.githubusercontent.com/u/87215099?v=4', name: 'lll', title: '斯人若彩虹，遇上方知有', links: [{ icon: 'github', link: 'https://github.com/seaeam' }] },
  { avatar: 'https://avatars.githubusercontent.com/u/104177657?v=4', name: 'peng chang', title: '好想进大厂', links: [{ icon: 'github', link: 'https://github.com/pcppp' }] },
  { avatar: 'https://avatars.githubusercontent.com/u/74220172?v=4', name: 'Gong Che Yu', title: 'xiersiki', links: [{ icon: 'github', link: 'https://github.com/xiersiki' }] },
  { avatar: 'https://avatars.githubusercontent.com/u/103992756?v=4', name: 'Dc9309', title: 'Dc9309', links: [{ icon: 'github', link: 'https://github.com/Dc9309' }] },
  { avatar: 'https://avatars.githubusercontent.com/u/105473589?v=4', name: 'Peng Liang', title: 'CQUPT · CS & Tech', links: [{ icon: 'github', link: 'https://github.com/notshine' }] },
  { avatar: 'https://avatars.githubusercontent.com/u/126050206?v=4', name: 'wang-danni', title: 'CQUPT · Computer Tech', links: [{ icon: 'github', link: 'https://github.com/wang-danni' }] }
]
</script>

## 🎯 项目定位

一个以“每日小步”驱动的算法 / 基础实现 / 工程习惯巩固与复盘仓库。强调：

- 短反馈回路（测试 + 覆盖率）
- 多解并列 & 边界输入意识
- 渐进式 TypeScript 增量
- 复盘文档记录“思路演进 → 抽象归纳”

## 📂 目录结构

```
one-question-per-day/
├── packages/
│   ├── problems/            # 每日题目主目录
│   │   ├── Day 01/
│   │   │   ├── README.md        # 题目描述 / 约束
│   │   │   ├── answer.js        # 参考 / 多解（可并列多策略）
│   │   │   ├── <topic>.js       # 拆分子实现（可选）
│   │   │   ├── <topic>.spec.js  # Vitest 测试
│   │   │   └── ts/              # TS / 类型探索 & 推导
│   │   └── ...
│   ├── docs/                # VitePress 文档（当前页面）
│   │   ├── index.md
│   │   ├── days/            # Day 索引 & 汇总
│   │   ├── review/          # 复盘 / 思路演进记录
│   │   └── others/          # 发布 / 约定说明
│   ├── core/                # 成员个性实现聚合（按成员分子目录）
│   ├── utils/               # 辅助脚本（发布 / 生成等）
│   └── (未来扩展...)
├── assets/                  # 仓库级静态资源（文档引用）
├── coverage/                # 测试覆盖率报告（CI 生成）
├── pnpm-workspace.yaml      # 工作区定义
├── package.json             # 根脚本 / 统一依赖
├── CHANGELOG.md             # 版本变更
└── README.md                # 顶层说明
```

> 🔎 快速浏览：重点关注 `packages/problems/` 与 `packages/docs/review/`。

## 🔄 一题流转

| 阶段    | 说明                                         |
| ------- | -------------------------------------------- |
| 📥 获取 | 查看 / 新建 `problems/Day XX/`               |
| 🧠 分析 | 阅读题干 + 约束 + 边界假设                   |
| ✍️ 编码 | 支持多方案对比（暴力 / 优化 / 空间换时间等） |
| ✅ 验证 | `pnpm test` / `pnpm dev`（含 lint & format） |
| 📊 观察 | 复杂度 & 覆盖率 & 可读性                     |
| 🧾 复盘 | 在 review 中记录踩坑 / 策略取舍              |

## ⚡ 快速开始

```bash
pnpm install
pnpm dev        # Lint + Format + Test
# 或仅测试
pnpm test
```

## 🧪 质量要点

- Vitest 单元测试：最小可信回归
- 覆盖率输出：聚焦未测路径
- ESLint + 格式化：统一风格
- TS 增量：长期收益 > 一次性成本

## 🧬 TS 增量策略

- 只为“泛化潜力”题目补类型
- 利用测试反推类型边界
- 避免过度类型体操 → 可读性优先

## 🗂️ 复盘结构建议

```
// review 模板建议
标题：问题名称 / 场景标签
1. 直觉解法 & 时间 / 空间
2. 核心瓶颈 / 边界用例
3. 优化策略对比（数据结构 / 变换）
4. 最终方案 & 取舍理由
5. 后续可探索方向
```

## 🤝 参与方式

1. 选题 / 新建 Day 目录
2. 编写多解（如适用）+ 测试通过
3. 追加复盘要点（若有启发）

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>Solvers</template>
    <template #lead>协作 · 对比 · 演进</template>
  </VPTeamPageTitle>
  <VPTeamMembers size="small" :members="members" />
</VPTeamPage>
