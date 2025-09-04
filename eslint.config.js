import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  reactHooks.configs['recommended-latest'],
  reactRefresh.configs.vite,
  eslintPluginPrettierRecommended,
  {
    ignores: [
      'dist',
      'eslint.config.js',
      'convex/_generated',
      // "postcss.config.js",
      'tailwind.config.js',
      'vite.config.ts',
    ],
  },
  {
    files: ['**/*.{js,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        project: [
          './tsconfig.node.json',
          './tsconfig.app.json',
          './convex/tsconfig.json',
        ],
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      indent: ['error', 2],
      'prettier/prettier': [
        'warn',
        {
          printWidth: 90,
          bracketSpacing: true,
          endOfLine: 'auto',
          singleQuote: true,
        },
      ],
    },
  },
];
