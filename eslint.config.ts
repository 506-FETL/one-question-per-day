import js from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'
import pluginVue from 'eslint-plugin-vue'
import { defineConfig } from 'eslint/config'
import globals from 'globals'

export default defineConfig([
  js.configs.recommended,
  {
    // 检查 src 目录下的 JavaScript 文件
    files: ['src/**/*.{js,mjs,cjs,vue}'],
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'error',
      'no-undef': 'error',
      'no-unused-private-class-members': 'warn',
      'no-sparse-arrays': 'off',
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    // 检查 src 目录下的 TypeScript 文件
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint as any,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
  {
    // 检查 problems 文件夹中的 answer.js 文件
    files: ['problems/**/answer.js'],
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'warn', // answer 文件允许 console，但给出警告
      'no-undef': 'error',
      'no-sparse-arrays': 'off',
      'no-redeclare': 'off',
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    // 检查 problems 文件夹中的 answer.ts 文件
    files: ['problems/**/answer.ts'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint as any,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
  {
    // 检查 scripts 目录下的 JavaScript 文件
    files: ['scripts/**/*.{js,mjs,cjs}'],
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off', // scripts 允许使用 console
      'no-undef': 'error',
    },
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  ...pluginVue.configs['flat/essential'],
])
