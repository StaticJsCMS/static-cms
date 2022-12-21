module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier',
    'plugin:import/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@next/next/recommended'
  ],
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true,
  },
  globals: {
    STATIC_CMS_CORE_VERSION: false,
    CMS_ENV: false,
  },
  rules: {
    'no-restricted-imports': 'off',
    '@typescript-eslint/no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['@mui/*/*/*', '!@mui/material/test-utils/*'],
            message: 'Do not import material imports as 3rd level imports',
            allowTypeImports: true,
          },
          {
            group: ['@mui/material', '!@mui/material/'],
            message: 'Please import material imports as defaults or 2nd level imports',
            allowTypeImports: true,
          },
        ],
      },
    ],
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    'no-console': [0],
    'react/prop-types': [0],
    'react/require-default-props': 0,
    'import/no-named-as-default': 0,
    'react/react-in-jsx-scope': 'off',
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: [['builtin', 'external'], ['internal', 'parent', 'sibling', 'index'], ['type']],
      },
    ],
    'no-duplicate-imports': 'error',
    '@emotion/no-vanilla': 'off',
    '@emotion/import-from-emotion': 'error',
    '@emotion/styled-import': 'error',
    'require-atomic-updates': [0],
    'object-shorthand': ['error', 'always'],
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
      },
    ],
    'unicorn/prefer-string-slice': 'error',
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
  },
  plugins: ['babel', '@emotion', 'unicorn', 'react-hooks', '@typescript-eslint'],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    'import/core-modules': ['src'],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'plugin:import/recommended',
        'plugin:import/typescript',
      ],
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': [0],
        'react/require-default-props': 0,
        'no-duplicate-imports': [0], // handled by @typescript-eslint
        '@typescript-eslint/ban-types': [0], // TODO enable in future
        '@typescript-eslint/no-non-null-assertion': [0],
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/explicit-function-return-type': [0],
        '@typescript-eslint/explicit-module-boundary-types': [0],
        '@typescript-eslint/no-duplicate-imports': 'error',
        '@typescript-eslint/no-use-before-define': [
          'error',
          { functions: false, classes: true, variables: true },
        ],
      },
    },
    {
      files: ['website/**/*'],
      rules: {
        'import/no-unresolved': [0],
      },
    },
  ],
};
