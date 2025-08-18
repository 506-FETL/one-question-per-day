import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: true,
    vue: true,
    react: true,
    typescript: true,
    markdown: false,
    rules: {
      'no-unused-vars': 'warn',
      'ts/no-unused-vars': 'warn',
      'no-console': 'error',
      'no-useless-constructor': 'warn',
      'no-undef': 'error',
      'unused-imports/no-unused-vars': 'warn',
      'unicorn/no-new-array': 'off',
      'node/prefer-global/process': 'off',
      'no-extend-native': 'off',
      'ts/ban-ts-comment': 'warn',
      'unicorn/prefer-number-properties': 'warn',
      'no-proto': 'off',
      'no-restricted-properties': 'off',
      'style/no-tabs': 'off',
      'prefer-spread': 'off',
      'node/handle-callback-err': 'off',
      'prefer-rest-params': 'off',
      'eqeqeq': 'off',
      'no-sparse-arrays': 'off',
    },
  },
  {
    files: ['**/*.{test,spec}.{js,ts}', 'scripts/**/*.js', 'problems/**'],
    rules: {
      'no-console': 'off',
      'no-unused-vars': 'off',
      'ts/no-unused-vars': 'off',
      'unused-imports/no-unused-vars': 'off',
    },
  },
)
