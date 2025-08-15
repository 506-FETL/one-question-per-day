#!/usr/bin/env node

import { readFileSync, existsSync } from 'fs'

/**
 * GitHub Release Notes Hook
 * 读取自动生成的 RELEASE_NOTES.md 文件内容，用于 GitHub Release
 */

const getReleaseNotes = () => {
  const releaseNotesPath = './RELEASE_NOTES.md'

  if (!existsSync(releaseNotesPath)) {
    // 如果没有发布说明文件，返回默认内容
    return `## 🎉 New Release!

Please check the [CHANGELOG.md](./CHANGELOG.md) for detailed changes.

---

💡 **Full Changelog**: [CHANGELOG.md](./CHANGELOG.md)
📦 **Installation**: \`git clone\` or download the latest version
🐛 **Found an issue?** Please submit an [Issue](../../issues)`
  }

  try {
    const releaseNotes = readFileSync(releaseNotesPath, 'utf8')
    return releaseNotes.trim()
  } catch (error) {
    console.error('Error reading release notes:', error.message)
    return `## 🎉 New Release!

Please check the [CHANGELOG.md](./CHANGELOG.md) for detailed changes.`
  }
}

// 输出发布说明供 release-it 使用
console.log(getReleaseNotes())
