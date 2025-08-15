import { defineConfig } from 'vite'
import { resolve } from 'path'
import { existsSync, rmSync, readFileSync, createWriteStream, mkdirSync } from 'fs'
import { fileURLToPath, URL } from 'node:url'
import archiver from 'archiver'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// 获取当前版本号
const getVersion = () => {
  try {
    const packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
    return packageJson.version
  } catch (error) {
    console.error('Cannot read package.json:', error.message)
    return '0.0.0'
  }
}

// 创建 ZIP 文件的函数
const createProblemsZip = async (version: string): Promise<void> => {
  // 确保 dist 目录存在
  const distDir = resolve('dist')
  if (!existsSync(distDir)) {
    mkdirSync(distDir, { recursive: true })
  }

  const outputPath = resolve('dist', `problems-v${version}.zip`)
  const output = createWriteStream(outputPath)
  const archive = archiver('zip', { zlib: { level: 9 } })

  return new Promise((resolve, reject) => {
    output.on('close', () => {
      const sizeKB = Math.round(archive.pointer() / 1024)
      console.log(`✅ 压缩包已创建: ${outputPath}`)
      console.log(`📁 包含内容: problems/ 文件夹`)
      console.log(`📊 压缩包大小: ${sizeKB}KB`)
      resolve()
    })

    archive.on('error', (err) => {
      reject(err)
    })

    archive.pipe(output)

    // 添加 problems 文件夹到压缩包
    archive.directory('problems/', false, (data) => {
      // 排除不需要的文件
      if (
        data.name.includes('.DS_Store') ||
        data.name.includes('node_modules') ||
        data.name.includes('.git')
      ) {
        return false
      }
      return data
    })

    archive.finalize()
  })
}

export default defineConfig({
  plugins: [
    // 专门用于创建 problems 压缩包的插件
    {
      name: 'problems-archiver',
      async buildStart() {
        const distPath = resolve('dist')

        // 清理 dist 目录
        if (existsSync(distPath)) {
          console.log('🧹 清理 dist 目录...')
          rmSync(distPath, { recursive: true, force: true })
          console.log('✅ dist 目录已清理')
        }

        console.log('📦 正在创建 problems 文件夹压缩包...')

        // 检查 problems 文件夹是否存在
        if (!existsSync('problems')) {
          throw new Error('❌ problems 文件夹不存在')
        }

        const version = getVersion()
        await createProblemsZip(version)

        // 由于我们只需要创建压缩包，可以提前退出
        console.log('🎉 压缩包创建完成！')
      },
    },
  ],

  // 简化的构建配置，主要用于触发插件
  build: {
    outDir: 'dist',
    emptyOutDir: false, // 不清空，因为我们的压缩包在里面

    rollupOptions: {
      // 使用实际的入口文件
      input: resolve(__dirname, 'src/index.ts'),
    },

    minify: false,
    sourcemap: false,
    reportCompressedSize: false,

    // 设置为 lib 模式避免 HTML 相关处理
    lib: {
      entry: resolve(__dirname, 'scripts/build-entry.js'),
      name: 'ProblemsArchive',
      formats: ['es'],
    },
  },
})
