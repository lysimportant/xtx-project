module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['plugin:vue/vue3-recommended', 'prettier'],
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    allowImportExportEverywhere: true,
    ecmaVersion: 2019,
    sourceType: 'module'
  },
  plugins: ['@babel/plugin-syntax-dynamic-import', 'vue', 'html', 'prettier'],
  rules: {
    'prettier/prettier': 'error'
  }
};
