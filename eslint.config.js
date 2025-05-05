import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import { defineConfig } from 'eslint/config'
import globals from 'globals'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    plugins: { js },
    extends: ['js/recommended'],
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'error',
      'no-undef': 'error',
      'no-unused-private-class-members': 'warn',
    },
    settings: {
      'import/resolver': {
        alias: {
          map: [['@', './__SPEC__']],
          extensions: ['.js', 'mjs', 'cjs'],
        },
      },
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    languageOptions: { globals: globals.browser },
  },
  pluginVue.configs['flat/essential'],
])
