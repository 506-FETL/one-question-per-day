import copy from 'rollup-plugin-copy'
import { defineConfig } from 'vite'

// 最小化配置：把 problems 当作静态资源目录拷贝到 dist/problems
export default defineConfig({
  publicDir: false,
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    lib: {
      entry: 'scripts/_empty.js',
      formats: ['es'],
      fileName: () => 'problems/noop.js',
    },
    rollupOptions: {
      output: {
        // 避免生成额外的资源文件名冲突
        assetFileNames: () => 'problems/noop.[ext]',
      },
      plugins: [
        copy({
          targets: [
            { src: 'problems/**', dest: 'dist/problems' },
          ],
          hook: 'writeBundle',
          flatten: false,
        }),
      ],
    },
  },
})
