module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'unused-imports'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:mdx/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  overrides: [
    {
      files: '*.mdx',
      parser: 'eslint-mdx',
    },
  ],
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'unused-imports/no-unused-imports': ['error'],
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
