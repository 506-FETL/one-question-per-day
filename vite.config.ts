import react from '@vitejs/plugin-react'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  publicDir: false,
  plugins: [vue(), react(), viteStaticCopy({
    targets: [
      { src: 'packages/problems', dest: '.' },
    ],
  })],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    lib: {
      entry: 'packages/utils/_empty.js',
      formats: ['es'],
      fileName: () => 'noop.js',
    },
  },
})
