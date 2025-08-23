import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vitepress'

interface BuildNumberedItemsOptions {
  /** 相对 docs 根的目录，如 'days' / 'review' */
  dir: string
  /** 链接前缀（不含结尾斜杠），如 '/days' */
  routeBase: string
  /** 链接命名模式：'day' -> /Day-01, 'plain' -> /01 */
  linkStyle?: 'day' | 'plain'
  /** 目录是否需要 README.md/index.md 才算有效 */
  requireReadmeForDir?: boolean
  /** 填充宽度，默认 2 */
  padWidth?: number
}

function buildNumberedSidebarItems(options: BuildNumberedItemsOptions) {
  const {
    dir,
    routeBase,
    linkStyle = 'day',
    requireReadmeForDir = true,
    padWidth = 2,
  } = options
  const absDir = path.resolve(__dirname, '../problems/docs', dir)
  let entries: string[] = []
  try {
    entries = fs.readdirSync(absDir)
  }
  catch {
    return []
  }
  const items: { num: number, text: string, link: string }[] = []
  for (const name of entries) {
    // 支持：Day-01 / Day 01 / Day-01.md / 01.md
    let numStr: string | null = null
    if (/^Day[-\s]?\d+/i.test(name)) {
      const m = name.match(/^Day[-\s]?(\d{1,3})/i)
      if (m)
        numStr = m[1]
    }
    else if (/^\d{1,3}\.md$/.test(name)) {
      numStr = name.replace(/\.md$/, '')
    }
    else if (/^\d{1,3}$/.test(name)) { // 纯数字目录
      numStr = name
    }
    if (!numStr)
      continue
    const num = Number(numStr)
    const padded = numStr.padStart(padWidth, '0')

    if (name.endsWith('.md')) {
      // 文件：直接加入
      const link = linkStyle === 'day'
        ? `${routeBase}/Day-${padded}`
        : `${routeBase}/${padded}`
      items.push({ num, text: `Day ${padded}`, link })
      continue
    }
    // 目录：可选检测 README / index
    const dirPath = path.join(absDir, name)
    if (!fs.statSync(dirPath).isDirectory())
      continue
    if (requireReadmeForDir) {
      const hasEntry = fs.existsSync(path.join(dirPath, 'README.md')) || fs.existsSync(path.join(dirPath, 'index.md'))
      if (!hasEntry)
        continue
    }
    const link = linkStyle === 'day'
      ? `${routeBase}/Day-${padded}`
      : `${routeBase}/${padded}`
    items.push({ num, text: `Day ${padded}`, link })
  }
  items.sort((a, b) => a.num - b.num)
  return items.map(i => ({ text: i.text, link: i.link }))
}

// 站点配置：聚焦每日一题 / 测试驱动 / 自动化发布
export default defineConfig({
  srcDir: 'problems/docs',
  // GitHub Pages 项目页需要设置 base 为仓库名，否则静态资源以根路径 /assets 加载导致 404
  // 若将来使用自定义域名或放在根用户页，可改为 '/'
  base: '/one-question-per-day/',
  title: 'one-question-per-day',
  description: '506 实验室「每日一题」：数据结构 / 算法 / JS 原理 / 工程实践。测试驱动 + 版本化积累。',
  lang: 'zh-CN',
  lastUpdated: true,
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '题目', link: '/days/index' },
      { text: '复盘', link: '/review/index' },
      { text: '发布说明', link: 'https://github.com/506-FETL/one-question-per-day/blob/main/RELEASE_NOTES.md' },
      { text: 'Changelog', link: 'https://github.com/506-FETL/one-question-per-day/blob/main/CHANGELOG.md' },
    ],
    sidebar: [
      {
        text: '指南 Guide',
        items: [
          { text: '快速开始', link: '/#🏁-快速开始' },
          { text: '目录结构', link: '/#📂-目录结构' },
          { text: '题目类型', link: '/#🧠-题目类型' },
          { text: '版本与发布', link: '/#🔄-版本与发布' },
          { text: '贡献约定', link: '/#🤝-贡献约定' },
          { text: '常见命令', link: '/#🧩-常见命令' },
          { text: '后续规划', link: '/#🗺-后续规划' },
        ],
      },
      // 题目天数索引（静态占位，实际页面 /days/index 里自动汇总）
      {
        text: '题目 (Days)',
        collapsed: true,
        items: buildNumberedSidebarItems({ dir: 'days', routeBase: '/days', linkStyle: 'day' }),
      },
      {
        text: '复盘 (Reviews)',
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
      pattern: 'https://github.com/506-FETL/one-question-per-day/edit/main/:path',
      text: '在 GitHub 上编辑此页',
    },
    search: {
      provider: 'local',
    },
  },
})
