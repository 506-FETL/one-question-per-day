#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

/**
 * 从 CHANGELOG.md 读取最新版本的发布说明
 * 用于 GitHub Release 的描述
 */

function getLatestChangelogEntry() {
  try {
    const changelogPath = join(process.cwd(), 'CHANGELOG.md')
    const changelog = readFileSync(changelogPath, 'utf8')

    // 提取第一个版本分节（最新版本）
    const lines = changelog.split(/\r?\n/)
    const headerIdx = lines.findIndex(l => /^#{1,2}\s*\[?\d+\.\d+\.\d+\]?/.test(l))

    if (headerIdx === -1) {
      return null
    }

    // 提取版本号
    const versionMatch = lines[headerIdx].match(/(\d+\.\d+\.\d+)/)
    const version = versionMatch ? versionMatch[1] : 'Unknown'

    // 找到下一个版本分节的开始位置
    let endIdx = lines.length
    for (let i = headerIdx + 1; i < lines.length; i++) {
      if (/^#{1,2}\s*\[?\d+\.\d+\.\d+\]?/.test(lines[i])) {
        endIdx = i
        break
      }
    }

    // 提取变更内容（去掉版本标题）
    const content = lines.slice(headerIdx + 1, endIdx).join('\n').trim()

    return { version, content }
  }
  catch (error) {
    console.error('无法读取 CHANGELOG.md:', error.message)
    return null
  }
}

function formatReleaseNotes(changelogData) {
  if (!changelogData) {
    return '🎉 新版本发布！\n\n详细更改请查看 [CHANGELOG.md](./CHANGELOG.md)'
  }

  const { version, content } = changelogData

  // 格式化变更内容
  const notes = content
    .replace(/### Bug Fixes/g, '🐛 **Bug Fixes**')
    .replace(/### Features/g, '✨ **Features**')
    .replace(/### Performance Improvements/g, '⚡ **Performance Improvements**')
    .replace(/### BREAKING CHANGES/g, '💥 **BREAKING CHANGES**')
    .replace(/### Code Refactoring/g, '♻️ **Code Refactoring**')
    .replace(/### Documentation/g, '📚 **Documentation**')
    .replace(/### Tests/g, '🧪 **Tests**')
    .replace(/### Chore/g, '🔧 **Chore**')

  // 添加下载说明
  const downloadSection = `\n\n## 📥 下载\n\n- **📦 完整项目**: 通过 GitHub Release 自动生成的源码压缩包\n- **📁 题目合集**: \`problems.zip\` - 仅包含每日题目和复习资料\n- **🔗 在线浏览**: 直接浏览仓库获取最新内容\n\n> 💡 **推荐**: 如果你只需要题目文件，下载 \`problems.zip\` 即可。`

  const footer = `\n\n---\n\n💡 **完整更改日志**: [CHANGELOG.md](./CHANGELOG.md)\n📦 **安装**: \`git clone\` 或下载最新版本\n🐛 **发现问题?** 请提交 [Issue](../../issues)`

  return notes + downloadSection + footer
}

function generateReleaseNotes() {
  console.log('🚀 正在生成发布说明...')

  const changelogData = getLatestChangelogEntry()
  const releaseNotes = formatReleaseNotes(changelogData)
  const outputPath = join(process.cwd(), 'RELEASE_NOTES.md')
  writeFileSync(outputPath, releaseNotes, 'utf8')

  console.log(`✅ 发布说明已生成: ${outputPath}`)
  console.log('\n预览:')
  console.log('─'.repeat(50))
  console.log(releaseNotes)
  console.log('─'.repeat(50))

  return releaseNotes
}

generateReleaseNotes()
