import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, '**/*.config.*', 'packages/problems/**'],
    include: ['packages/core/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    coverage: {
      provider: 'v8',
      include: ['packages/core/**'],
      exclude: ['**/answer.*', 'src/index.ts', '**/types.ts'],
      enabled: true,
    },
    globals: true,
  },
  esbuild: {
    target: 'esnext',
  },
})
