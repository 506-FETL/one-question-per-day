import react from '@vitejs/plugin-react'
import vue from '@vitejs/plugin-vue'
import copy from 'rollup-plugin-copy'
import { defineConfig } from 'vite'

export default defineConfig({
  publicDir: false,
  plugins: [vue(), react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    lib: {
      entry: 'packages/utils/_empty.js',
      formats: ['es'],
      fileName: () => 'noop.js',
    },
    rollupOptions: {
      plugins: [
        copy({
          targets: [
            { src: 'packages/problems/**', dest: 'dist' },
          ],
          hook: 'writeBundle',
          flatten: false,
        }),
      ],
    },
  },
})
