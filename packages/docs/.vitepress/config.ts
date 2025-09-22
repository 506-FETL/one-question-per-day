import { defineConfig } from 'vitepress'
import {
  groupIconMdPlugin,
  groupIconVitePlugin,
  localIconLoader,
} from 'vitepress-plugin-group-icons'
import { buildNumberedSidebarItems } from './utils/sidebar'

export default defineConfig({
  title: 'one-question-per-day',
  base: '/one-question-per-day/',
  description: '506 实验室「每日一题」：数据结构 / 算法 / JS 原理 / 工程实践。测试驱动 + 版本化积累。',
  lang: 'zh-CN',
  lastUpdated: true,
  cleanUrls: true,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/one-question-per-day/hero.svg' }],
  ],
  markdown: {
    config(md) {
      md.use(groupIconMdPlugin, {
        titleBar: { includeSnippet: true },
      })
    },
  },
  themeConfig: {
    logo: {
      light: '/hero.svg',
      dark: '/hero-dark.svg',
      alt: 'logo',
    },
    nav: [
      // 导航：使用更贴切的 Emoji，并统一加空格提升可读性
      { text: '🏠 首页', link: '/' },
      { text: '🧩 基础题目', link: '/base/index' },
      { text: '👾 框架题目', link: '/framework/index' },
      { text: '📖 复习', link: '/review/index' },
      { text: '🧾 Changelog', link: 'https://github.com/506-FETL/one-question-per-day/blob/main/CHANGELOG.md' },
    ],
    sidebar: [
      {
        text: 'problems-base',
        collapsed: true,
        items: buildNumberedSidebarItems({ dir: 'base' }),
      },
      {
        text: 'problems-framework',
        collapsed: true,
        items: buildNumberedSidebarItems({ dir: 'framework' }),
      },
      {
        text: 'reviews-basic',
        collapsed: true,
        items: buildNumberedSidebarItems({ dir: 'review/base' }),
      },
      {
        text: 'reviews-framework',
        collapsed: true,
        items: buildNumberedSidebarItems({ dir: 'review/framework' }),
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
      pattern: 'https://github.com/506-FETL/one-question-per-day/tree/main/docs/:path',
      text: '在 GitHub 上编辑此页',
    },
    search: {
      provider: 'local',
    },
  },
  vite: {
    plugins: [
      groupIconVitePlugin({
        customIcon: {
          '.spec.js': localIconLoader(import.meta.url, '../assets/test-js.svg'),
          '.spec.ts': localIconLoader(import.meta.url, '../assets/test-ts.svg'),
          '.tsx': localIconLoader(import.meta.url, '../assets/tsx.svg'),
          '.spec.tsx': localIconLoader(import.meta.url, '../assets/test-tsx.svg'),
        },
      }),
    ],
  },
})
