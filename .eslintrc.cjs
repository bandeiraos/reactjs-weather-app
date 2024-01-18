module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    // "@typescript-eslint/explicit-function-return-type": "off",
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
  // "overrides": [
  //   {
  //     // enable the rule specifically for TypeScript files
  //     "files": ["*.ts", "*.mts", "*.cts", "*.tsx"],
  //     "rules": {
  //       "@typescript-eslint/explicit-function-return-type": "error"
  //     }
  //   }
  // ]
}
