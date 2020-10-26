module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': [0, 'error', 'windows'],
    'max-len': 'off',
    'no-param-reassign': 0,
    'no-bitwise': 0,
    'global-require': 0,
  },
};
