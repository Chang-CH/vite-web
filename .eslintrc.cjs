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
    'plugin:storybook/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  overrides: [
    {
      files: '*.mdx',
      parser: 'eslint-mdx',
      extends: ['plugin:mdx/recommended', 'plugin:mdx/overrides'],
      rules: {
        indent: 'off',
        semi: 'off',
      },
    },
  ],
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'unused-imports/no-unused-imports': ['error'],
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
