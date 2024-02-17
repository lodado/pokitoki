module.exports = {
  root: true,
  extends: ['custom'],
  plugins: [],
  rules: {
    'no-param-reassign': 'off',
    'import/prefer-default-export': 'off',
    'no-restricted-syntax': 'off',
  },

  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx'],
        moduleDirectory: ['src', 'node_modules'],
        project: ['**/tsconfig.json'],
        paths: ['src'],
      },
    },
  },
}
