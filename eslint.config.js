export default [
  {
    ignores: ['dist/**/*'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    rules: {
      // Basic rules to prevent common errors
      'no-unused-vars': 'warn',
      'no-console': 'warn',
    },
  },
]
