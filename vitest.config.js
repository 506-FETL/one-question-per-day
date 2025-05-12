import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, 'Problems/*'],
    coverage: {
      provider: 'v8',
      include: ['src/**'],
      enabled: true,
    },
  },
})
