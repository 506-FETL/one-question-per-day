import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: true,
    typescript: true,
    markdown: false,
    rules: {
      'no-unused-vars': 'warn',
      'ts/no-unused-vars': 'warn',
      'no-console': 'warn',
      'no-useless-constructor': 'warn',
      'no-undef': 'error',
      'unused-imports/no-unused-vars': 'warn',
      'node/prefer-global/process': 'off',
      'ts/ban-ts-comment': 'warn',
      'unicorn/prefer-number-properties': 'warn',
    },
  },
)
