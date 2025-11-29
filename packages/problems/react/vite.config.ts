import type { Plugin } from 'vite'
import path from 'node:path'
import mdx from '@mdx-js/rollup'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import rehypeStarryNight from 'rehype-starry-night'
import remarkGfm from 'remark-gfm'
import { defineConfig } from 'vite'
import Pages from 'vite-plugin-pages'

function mdToJs(): Plugin {
  return {
    name: 'md-to-js',
    transform(code, id) {
      if (id.endsWith('.md')) {
        const content = JSON.stringify(code)
          .replace(/\u2028/g, '\\u2028') // 转义 Unicode 分段符
          .replace(/\u2029/g, '\\u2029') // 转义 Unicode 段落分隔符
        return `export default ${content}`
      }
    },
  }
}

export default defineConfig({
  plugins: [
    { enforce: 'pre', ...mdx({ remarkPlugins: [remarkGfm], rehypePlugins: [rehypeStarryNight] }) },
    react(),
    mdToJs(),
    tailwindcss(),
    Pages({
      dirs: 'problems',
      exclude: ['lib', 'layout', '**/*.spec.*', '**/*.test.*', '**/__tests__/**'],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (/[\\/](?:react|react-dom|react-router|react-router-dom)[\\/]/.test(id))
              return 'react-vendor'

            if (/[\\/]@radix-ui[\\/](?:react-select|react-dropdown-menu|react-scroll-area|react-slot)[\\/]/.test(id))
              return 'radix-ui'

            if (id.includes('/lucide-react/'))
              return 'icons'
          }

          if (id.includes('/packages/shared/'))
            return 'shared'
        },
      },
    },
  },
})
