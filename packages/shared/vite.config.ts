import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Shared',
    },
    sourcemap: true,
    rollupOptions: {
      external: [],
      output: [
        {
          format: 'es',
          dir: 'dist/es',
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: '[name].mjs',
          chunkFileNames: 'chunks/[name]-[hash].mjs',
          assetFileNames: 'assets/[name]-[hash][extname]',
        },
        {
          format: 'cjs',
          dir: 'dist/umd',
          exports: 'auto',
          inlineDynamicImports: true,
          entryFileNames: 'index.cjs',
        },
      ],
    },
    minify: true,
    outDir: 'dist',
    emptyOutDir: true,
  },
  plugins: [
    dts({
      tsconfigPath: resolve(__dirname, 'tsconfig.json'),
      outDir: 'dist/types',
      insertTypesEntry: true,
    }),
  ],
})
