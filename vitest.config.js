/*global __dirname*/
import { configDefaults, defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, '__SPEC__/*'],
    coverage: {
      provider: 'v8',
      include: ['.src/**'],
    },
    alias: {
      '@': resolve(__dirname, './__SPEC__'),
    },
  },
})
