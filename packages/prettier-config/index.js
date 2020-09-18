'use strict'

module.exports = {
  printWidth: 80,
  useTabs: false,
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: false,
  trailingComma: 'es5',
  bracketSpacing: true,
  jsxBracketSameLine: false,
  arrowParens: 'avoid',
  endOfLine: 'lf',
  overrides: [
    {
      files: '*.{css,md,yml}',
      options: {
        singleQuote: false,
      },
    },
  ],
}
