import react from '@vitejs/plugin-react'
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, '**/*.config.*', 'packages/problems/**'],
    include: ['packages/core/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    coverage: {
      provider: 'v8',
      include: ['packages/core/**'],
      exclude: ['**/answer.*', '**/{src/index,types,vite-env.d,vite.config,main}.{ts,tsx}', '**/{App,index}.{tsx,vue}', '**/lib/**'],
      enabled: true,
    },
    globals: true,
  },
  esbuild: {
    target: 'esnext',
  },
})
