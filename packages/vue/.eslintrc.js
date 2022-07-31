module.exports = {
  root: true,
  extends: ['@ombro/eslint-config-vue3-typescript'],
  env: {
    'vue/setup-compiler-macros': true,
  },
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'vue/multi-word-component-names': 'off',
  },
}
