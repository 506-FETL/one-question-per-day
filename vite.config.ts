import { defineConfig } from 'vite'
import { resolve } from 'path'
import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

// 自定义插件：复制 problems 目录并创建压缩包
function copyProblemsPlugin() {
  return {
    name: 'copy-problems',
    generateBundle() {
      // 这个方法在构建过程中会被调用
    },
    writeBundle() {
      // 这个方法在文件写入完成后被调用
      buildProblemsPackage()
    },
  }
}

async function buildProblemsPackage() {
  const packageInfo = JSON.parse(fs.readFileSync('package.json', 'utf-8'))
  const version = packageInfo.version
  const packageName = `506-lab-daily-questions-v${version}`

  console.log('🏗️  开始构建 problems 发布包...')

  // 清理 dist 目录
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true })
  }
  fs.mkdirSync('dist', { recursive: true })

  // 创建临时构建目录
  const tempDir = path.join('dist', 'temp')
  const packageDir = path.join(tempDir, packageName)

  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true })
  }
  fs.mkdirSync(tempDir, { recursive: true })
  fs.mkdirSync(packageDir, { recursive: true })

  // 复制 problems 目录
  if (fs.existsSync('problems')) {
    copyRecursive('problems', path.join(packageDir, 'problems'))
  }

  // 统计项目信息
  const totalDays = countDays()
  const contributors = countContributors()

  // 创建 README.md
  const readmeContent = generateReadme(version, totalDays, contributors)
  fs.writeFileSync(path.join(packageDir, 'README.md'), readmeContent)

  try {
    // 创建压缩包
    process.chdir(tempDir)

    // 创建 tar.gz
    execSync(`tar -czf "../${packageName}.tar.gz" "${packageName}"`, { stdio: 'inherit' })

    // 创建 zip
    execSync(`zip -r "../${packageName}.zip" "${packageName}"`, { stdio: 'inherit' })

    // 回到原目录
    process.chdir('../..')

    // 计算文件信息
    const tarFile = `dist/${packageName}.tar.gz`
    const zipFile = `dist/${packageName}.zip`

    const tarStats = fs.statSync(tarFile)
    const zipStats = fs.statSync(zipFile)

    const tarSize = formatFileSize(tarStats.size)
    const zipSize = formatFileSize(zipStats.size)

    // 计算 SHA256
    const tarSha256 = execSync(`shasum -a 256 "${tarFile}"`, { encoding: 'utf-8' }).split(
      ' ',
    )[0]
    const zipSha256 = execSync(`shasum -a 256 "${zipFile}"`, { encoding: 'utf-8' }).split(
      ' ',
    )[0]

    // 生成 Release Notes
    const releaseNotes = generateReleaseNotes(version, totalDays, contributors, {
      tarFile: path.basename(tarFile),
      zipFile: path.basename(zipFile),
      tarSize,
      zipSize,
      tarSha256,
      zipSha256,
    })

    fs.writeFileSync(`dist/release-notes-v${version}.md`, releaseNotes)

    // 清理临时目录
    fs.rmSync(tempDir, { recursive: true, force: true })

    console.log('✅ 构建完成！')
    console.log(`📦 ${packageName}.tar.gz (${tarSize})`)
    console.log(`📦 ${packageName}.zip (${zipSize})`)
    console.log(`📝 release-notes-v${version}.md`)
    console.log('🔐 SHA256 校验码已生成')

    return {
      tarFile: path.basename(tarFile),
      zipFile: path.basename(zipFile),
      tarSize,
      zipSize,
      tarSha256,
      zipSha256,
    }
  } catch (error) {
    console.error('❌ 构建失败:', error)
    throw error
  }
}

// 递归复制目录
function copyRecursive(src: string, dest: string) {
  const stats = fs.statSync(src)

  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true })
    }

    const files = fs.readdirSync(src)
    for (const file of files) {
      // 跳过隐藏文件和一些不需要的文件
      if (file.startsWith('.') || file === 'node_modules') {
        continue
      }

      const srcPath = path.join(src, file)
      const destPath = path.join(dest, file)
      copyRecursive(srcPath, destPath)
    }
  } else {
    fs.copyFileSync(src, dest)
  }
}

// 统计题目数量
function countDays(): number {
  try {
    const daysDir = path.join('problems', 'days')
    if (!fs.existsSync(daysDir)) return 0

    const dirs = fs.readdirSync(daysDir).filter((item) => {
      const fullPath = path.join(daysDir, item)
      return fs.statSync(fullPath).isDirectory() && item.startsWith('Day ')
    })

    return dirs.length
  } catch {
    return 0
  }
}

// 统计贡献者数量（简化版）
function countContributors(): number {
  try {
    const output = execSync('git shortlog -sne --all', {
      encoding: 'utf-8',
      cwd: process.cwd(), // 确保在正确的目录下执行
    })
    const lines = output.split('\n').filter(
      (line) =>
        line.trim() &&
        !line.includes('GitHub Action') &&
        !line.includes('action@github.com') &&
        !line.includes('copilot-swe-agent[bot]'), // 过滤掉机器人账户
    )
    console.log(`🔍 统计到 ${lines.length} 位贡献者`)
    return lines.length
  } catch (error) {
    console.error('❌ 统计贡献者失败:', error)
    return 0
  }
}

// 格式化文件大小
function formatFileSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB']
  let size = bytes
  let unitIndex = 0

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex++
  }

  return `${size.toFixed(1)}${units[unitIndex]}`
}

// 生成 README 内容
function generateReadme(
  version: string,
  totalDays: number,
  contributors: number,
): string {
  return `# 506实验室每日一题 - v${version}

📚 **题目总数**: ${totalDays} 题  
👥 **贡献者**: ${contributors} 人  
📅 **发布日期**: ${new Date().toISOString().split('T')[0]}  

## 📁 目录结构

\`\`\`
problems/
├── days/           # 每日题目
│   ├── Day 01/     # 第1天题目
│   ├── Day 02/     # 第2天题目
│   └── ...
└── review/         # 复习总结
    ├── 01.md       # 第1天复习
    ├── 02.md       # 第2天复习  
    └── ...
\`\`\`

## 🚀 使用说明

1. 每个 Day 目录包含：
   - \`README.md\` - 题目描述
   - \`answer.js\` - 参考答案
   - 题目相关的 JavaScript 文件
   - 对应的测试文件 (\`*.spec.js\`)
   - \`ts/\` 目录 - TypeScript 版本实现

2. review 目录包含每天的复习总结

## 🌐 项目地址

- GitHub: https://github.com/506-FETL/one-question-per-day
- 完整项目包含测试环境、开发工具等，请访问 GitHub 获取

---

**506实验室** - 让学习成为习惯 ✨`
}

// 生成 Release Notes
function generateReleaseNotes(
  version: string,
  totalDays: number,
  contributors: number,
  fileInfo: any,
): string {
  return `# 📚 506实验室每日一题 Release v${version}

## 🎯 本次更新概览

本版本包含 ${totalDays} 道精心设计的每日编程题目，由 ${contributors} 位贡献者共同完成。

## 📊 项目统计

- 📚 总题目数量: **${totalDays}** 题
- 👥 贡献者数量: **${contributors}** 人

## 📦 发布包下载

本版本提供以下发布包（仅包含题目文件）：

| 格式 | 文件名 | 大小 | SHA256 |
|------|--------|------|--------|
| ZIP | \`${fileInfo.zipFile}\` | ${fileInfo.zipSize} | \`${fileInfo.zipSha256}\` |
| TAR.GZ | \`${fileInfo.tarFile}\` | ${fileInfo.tarSize} | \`${fileInfo.tarSha256}\` |

📁 **包含内容**：
- \`problems/days/\` - 所有每日题目（Day 01 - Day ${totalDays}）
- \`problems/review/\` - 复习总结文档
- \`README.md\` - 使用说明和目录结构

💡 **注意**：发布包仅包含题目文件，如需完整开发环境请克隆 GitHub 仓库。

## 🛠️ 技术栈

- **语言**: JavaScript, TypeScript
- **测试**: Vitest
- **代码质量**: ESLint, Prettier
- **包管理**: pnpm
- **构建工具**: Vite

## 🚀 快速开始

\`\`\`bash
# 克隆项目
git clone https://github.com/506-FETL/one-question-per-day.git

# 安装依赖
pnpm install

# 运行测试
pnpm test

# 开发模式（包含代码检查、格式化、测试）
pnpm dev

# 构建发布包
pnpm build
\`\`\`

## 🤝 参与贡献

欢迎加入506实验室每日一题！请查看 [README.md](https://github.com/506-FETL/one-question-per-day/blob/main/README.md) 了解详细的参与指南。

---

*此发布包由 Vite 自动构建生成*`
}

export default defineConfig({
  // Vite 构建配置
  build: {
    // 输出目录
    outDir: 'dist',
    // 清空输出目录
    emptyOutDir: true,
    // 不生成源码映射
    sourcemap: false,
    // 自定义构建目标（这里我们主要用插件来处理）
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ProblemsPackage',
      fileName: 'index',
    },
    rollupOptions: {
      // 外部依赖
      external: ['fs', 'path', 'child_process'],
      output: {
        // 全局变量
        globals: {},
      },
    },
  },
  plugins: [copyProblemsPlugin()],
})
