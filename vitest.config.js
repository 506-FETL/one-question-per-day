/*global __dirname*/
import { resolve } from 'path'
import { configDefaults, defineConfig } from 'vitest/config'

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
