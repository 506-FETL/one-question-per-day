#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

/**
 * 生成发布说明的脚本
 * 自动从 CHANGELOG.md 提取最新版本的内容，并生成格式化的发布说明
 */

function getCurrentVersion() {
  try {
    const packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
    return packageJson.version
  }
  catch (error) {
    console.error('无法读取 package.json:', error.message)
    process.exit(1)
  }
}

function getLatestChangelogEntry() {
  try {
    const changelog = readFileSync('CHANGELOG.md', 'utf8')

    // 直接提取第一个版本分节（release-it 总是把最新版本放在最前面）
    const lines = changelog.split(/\r?\n/)
    const headerIdx = lines.findIndex(l => /^#{1,2}\s*\[?\d+\.\d+\.\d+\]?/.test(l))
    if (headerIdx === -1)
      return null

    let endIdx = lines.length
    for (let i = headerIdx + 1; i < lines.length; i++) {
      if (/^#{1,2}\s*\[?\d+\.\d+\.\d+\]?/.test(lines[i])) {
        endIdx = i
        break
      }
    }
    return lines.slice(headerIdx, endIdx).join('\n').trim()
  }
  catch (error) {
    console.error('无法读取 CHANGELOG.md:', error.message)
    return null
  }
}

function formatReleaseNotes(changelogEntry, version) {
  if (!changelogEntry) {
    return `## Release v${version}\n\n🎉 新版本发布！\n\n详细更改请查看 [CHANGELOG.md](./CHANGELOG.md)`
  }

  // 移除版本标题，因为 GitHub Release 会自动添加
  // 支持多种格式：## [1.3.5], # [1.3.0], ## 1.3.5, # 1.3.0
  let notes = changelogEntry.replace(
    new RegExp(`^#{1,2}\\s*\\[?${version.replace(/\./g, '\\.')}\\]?.*\n\n?`, 'm'),
    '',
  )

  // 添加一些表情符号和格式化
  notes = notes
    .replace(/### Bug Fixes/g, '🐛 **Bug Fixes**')
    .replace(/### Features/g, '✨ **Features**')
    .replace(/### Performance Improvements/g, '⚡ **Performance Improvements**')
    .replace(/### BREAKING CHANGES/g, '💥 **BREAKING CHANGES**')
    .replace(/### Code Refactoring/g, '♻️ **Code Refactoring**')
    .replace(/### Documentation/g, '📚 **Documentation**')
    .replace(/### Tests/g, '🧪 **Tests**')
    .replace(/### Chore/g, '🔧 **Chore**')

  // 添加头部说明
  const header = `## 🎉 Release v${version}\n\n`
  const downloadSection = `\n\n## 📥 下载\n\n- **📦 完整项目**: 通过 GitHub Release 自动生成的源码压缩包\n- **📁 题目合集**: \`problems.zip\` - 仅包含每日题目和复习资料\n- **🔗 在线浏览**: 直接浏览仓库获取最新内容\n\n> 💡 **推荐**: 如果你只需要题目文件，下载 \`problems.zip\` 即可。`
  const footer = `\n\n---\n\n💡 **完整更改日志**: [CHANGELOG.md](./CHANGELOG.md)\n📦 **安装**: \`git clone\` 或下载最新版本\n🐛 **发现问题?** 请提交 [Issue](../../issues)`

  return header + notes + downloadSection + footer
}

function generateReleaseNotes() {
  console.log('🚀 正在生成发布说明...')

  const version = getCurrentVersion()
  console.log(`📋 当前版本: v${version}`)

  const changelogEntry = getLatestChangelogEntry()
  const releaseNotes = formatReleaseNotes(changelogEntry, version)

  // 将发布说明保存到文件
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
