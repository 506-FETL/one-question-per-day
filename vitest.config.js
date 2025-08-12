import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, 'problems/**'],
    coverage: {
      provider: 'v8',
      include: ['src/**'],
      exclude: ['**/answer.js'],
      enabled: true,
    },
  },
})
