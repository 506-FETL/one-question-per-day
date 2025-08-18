#!/usr/bin/env node

import { readFileSync } from 'node:fs'
import { join } from 'node:path'

/**
 * 读取 RELEASE_NOTES.md 文件内容用于 GitHub Release
 * 用于 GitHub Release 的描述
 */

function getReleaseNotesFromFile() {
  try {
    const releaseNotesPath = join(process.cwd(), 'RELEASE_NOTES.md')
    const releaseNotes = readFileSync(releaseNotesPath, 'utf8')

    return releaseNotes.trim()
  }
  catch (error) {
    console.error('无法读取 RELEASE_NOTES.md:', error.message)

    // 如果读取失败，返回默认内容
    return `## 🎉 新版本发布！

本次更新包含了最新的改进和优化。

##  下载

- **📦 完整项目**: 通过 GitHub Release 自动生成的源码压缩包
- **📁 题目合集**: \`problems.zip\` - 仅包含每日题目和复习资料
- **🔗 在线浏览**: 直接浏览仓库获取最新内容

> 💡 **推荐**: 如果你只需要题目文件，下载 \`problems.zip\` 即可。

---

💡 **完整更改日志**: [CHANGELOG.md](./CHANGELOG.md)
📦 **安装**: \`git clone\` 或下载最新版本
🐛 **发现问题?** 请提交 [Issue](../../issues)`
  }
}

// 主逻辑：读取 RELEASE_NOTES.md 并输出到 stdout
const releaseNotes = getReleaseNotesFromFile()
console.log(releaseNotes)
