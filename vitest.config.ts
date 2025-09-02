import react from '@vitejs/plugin-react'
import vue from '@vitejs/plugin-vue'
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react(), vue()],
  test: {
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, '**/*.config.*', 'packages/problems/**'],
    include: ['packages/core/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    coverage: {
      provider: 'v8',
      include: ['packages/core/**'],
      exclude: ['**/answer.*', '**/{src/index,types,vite-env.d,vite.config,main}.{ts,tsx}', '**/{App,index}.{tsx,vue}', '**/{lib,components}/**'],
      enabled: true,
    },
    globals: true,
  },
  esbuild: {
    target: 'esnext',
  },
})
