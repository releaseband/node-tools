module.exports = {
  extends: [
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'plugin:sonarjs/recommended',
  ],
  plugins: ['simple-import-sort', 'sonarjs'],
  rules: {
    'sort-imports': 'off',
    'simple-import-sort/sort': 'error',
  },
};
