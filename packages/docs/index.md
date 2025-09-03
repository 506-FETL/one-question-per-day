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

## 📚 文档总览

欢迎来到每日一题文档站！本页面收录了所有题目、参考答案、复盘总结及辅助资源，助你高效查找、学习与复盘。

## 🗂️ 题目与答案

- **题目索引**：
  - 通过左侧导航栏或 [题目总览](/days/)快速定位，每天一题，结构清晰。
  - 每个 Day 页面包含题干、约束、示例，支持关键词搜索。
- **参考答案**：
  - 每题下方展示多种解法，便于对比思路与性能。
  - 答案区块高亮，便于快速定位核心代码。

## 📝 复盘与总结

- [复盘索引](/review/) 收录阶段总结、错因分析、优化策略。
- 每篇复盘文档结构清晰，便于吸收经验。
- 支持标签/主题筛选，查找常见误区与进阶思路。

## 🚦 使用建议

- 练习前：先浏览题目描述，明确输入输出与边界。
- 做题后：对照参考答案，理解多解思路与优化点。
- 复盘时：查阅 review 文档，吸收常见错误与进阶经验。
- 交流反馈：有疑问或建议欢迎在仓库 Issue 区留言。

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>Team</template>
    <template #lead>协作 · 对比 · 演进</template>
  </VPTeamPageTitle>
  <VPTeamMembers size="small" :members="members" />
</VPTeamPage>
