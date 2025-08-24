import { defineConfig } from 'vitepress'
import { buildNumberedSidebarItems } from './util'

// 站点配置：聚焦每日一题 / 测试驱动 / 自动化发布
export default defineConfig({
  srcDir: 'docs',
  title: 'one-question-per-day',
  base: '/one-question-per-day/',
  description: '506 实验室「每日一题」：数据结构 / 算法 / JS 原理 / 工程实践。测试驱动 + 版本化积累。',
  lang: 'zh-CN',
  lastUpdated: true,
  cleanUrls: true,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/one-question-per-day/hero.svg' }],
  ],
  themeConfig: {
    logo: {
      light: '/hero.svg',
      dark: '/hero-dark.svg',
      alt: 'logo',
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '题目', link: '/days/index' },
      { text: '复习', link: '/review/index' },
      { text: '发布说明', link: 'https://github.com/506-FETL/one-question-per-day/blob/main/RELEASE_NOTES.md' },
      { text: 'Changelog', link: 'https://github.com/506-FETL/one-question-per-day/blob/main/CHANGELOG.md' },
    ],
    sidebar: [
      {
        text: '指南 Guide',
        items: [
          { text: '快速开始', link: '/#快速开始' },
        ],
      },
      // 题目天数索引（静态占位，实际页面 /days/index 里自动汇总）
      {
        text: '题目 (Days)',
        collapsed: true,
        items: buildNumberedSidebarItems({ dir: 'days', routeBase: '/days', linkStyle: 'day' }),
      },
      {
        text: '复习 (Reviews)',
        collapsed: true,
        items: buildNumberedSidebarItems({ dir: 'review', routeBase: '/review', linkStyle: 'plain', requireReadmeForDir: false }),
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/506-FETL/one-question-per-day' },
    ],
    footer: {
      message: '内容基于 MIT 许可 | 保持节奏 · 持续积累',
      copyright: `© ${new Date().getFullYear()} 506 Lab`,
    },
    outline: { label: '本页导航' },
    editLink: {
      pattern: 'https://github.com/506-FETL/one-question-per-day/tree/main/problems/docs/:path',
      text: '在 GitHub 上编辑此页',
    },
    search: {
      provider: 'local',
    },
  },
})
