import fs from 'node:fs'
import path from 'node:path'

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

export function buildNumberedSidebarItems(options: BuildNumberedItemsOptions) {
  const {
    dir,
    routeBase,
    linkStyle = 'day',
    requireReadmeForDir = true,
    padWidth = 2,
  } = options
  const absDir = path.resolve(__dirname, '../', dir)
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
