import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import markdownItPrism from 'markdown-it-prism'
import { defineConfig } from 'vite'
import Markdown from 'vite-plugin-md'
import Pages from 'vite-plugin-pages'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    tailwindcss(),
    Pages({ dirs: 'solutions', exclude: ['lib', 'layout'] }),
    Markdown({
      markdownItSetup(md) {
        md.use(markdownItPrism)
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@layout': path.resolve(__dirname, './layout'),
    },
  },
})
