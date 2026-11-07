import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],

      'react/self-closing-comp': 'error',
      'react/jsx-boolean-value': ['error', 'never'],
      'react/no-array-index-key': 'error',
    },
  },

  {
    files: ['src/components/**/*.tsx', 'src/views/**/components/**/*.tsx'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            { name: '@/lib/db', message: 'Prisma is server-only. Query through a service.' },
            { name: '@/lib/auth', message: 'Session helpers are server-only. Call /api/auth/*.' },
            { name: '@/lib/env', message: 'Environment secrets are server-only.' },
          ],
          patterns: [
            {
              group: ['@/server/*'],
              message: 'Domain services are server-only. Use /api/* from client code.',
            },
            {
              group: ['@prisma/client'],
              message: 'Prisma is server-only. Query through a service.',
            },
          ],
        },
      ],
    },
  },

  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
])

export default eslintConfig
