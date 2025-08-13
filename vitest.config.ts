import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, '**/*.config.*', 'problems/**'],
    include: ['**/*.{test,spec}.{js,ts,jsx,tsx}'],
    coverage: {
      provider: 'v8',
      include: ['src/**'],
      exclude: ['**/answer.*'],
      enabled: true,
    },
    globals: true,
  },
  esbuild: {
    target: 'esnext',
  },
})
