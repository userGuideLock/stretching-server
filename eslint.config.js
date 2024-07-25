const globals = require('globals');
const pluginJs = require('@eslint/js');
const prettier = require('eslint-config-prettier');
const pluginPrettier = require('eslint-plugin-prettier');

module.exports = [
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      ...pluginPrettier.configs.recommended.rules,
      'prettier/prettier': ['error', require('./prettier.config.js')],
      'no-unused-vars': 'off', // 사용하지 않는 변수와 함수 허용
    },
  },
  pluginJs.configs.recommended,
  prettier,
];
