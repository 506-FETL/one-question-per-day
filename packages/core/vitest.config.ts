import react from '@vitejs/plugin-react'
import vue from '@vitejs/plugin-vue'
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react(), vue()],
  test: {
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, '**/*.config.*', 'packages/problems/**'],
    include: ['**/*.{test,spec}.{js,ts,tsx}'],
    globals: true,
  },
  esbuild: {
    target: 'esnext',
  },
})
