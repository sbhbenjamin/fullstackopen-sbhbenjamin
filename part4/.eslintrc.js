module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es2021': true,
    'jest': true
  },
  'globals': {
    'process': 'readonly'
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 13
  },
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ]
  }
}
