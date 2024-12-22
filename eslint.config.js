import { defineConfig } from '@ohh-889/eslint-config';
import sort from 'eslint-plugin-sort';

export default defineConfig(
  {
    prettierRules: {
      singleAttributePerLine: true,
      trailingCommas: 'none'
    },
    root: true
  },
  sort.configs['flat/recommended'],
  {
    rules: {
      'import/newline-after-import': 'error',
      'import/no-absolute-path': 'warn',
      'import/no-empty-named-blocks': ['error'],
      'import/no-useless-path-segments': [
        'error',
        {
          noUselessIndex: true
        }
      ],

      'import/order': [
        'error',
        {
          alphabetize: {
            order: 'asc'
          },
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
          'newlines-between': 'always',
          pathGroups: [{ group: 'internal', pattern: '{{@,~}/,#}**' }],
          pathGroupsExcludedImportTypes: ['builtin']
        }
      ],
      'sort/import-members': ['error', { caseSensitive: true, natural: true }],
      'sort/imports': ['off'],
      'sort/string-enums': ['error', { caseSensitive: false, natural: true }],
      'sort/string-unions': ['error', { caseSensitive: false, natural: true }],
      'sort/type-properties': ['warn', { caseSensitive: false, natural: true }],
      'sort/type-properties': ['error', { caseSensitive: false, natural: true }]
    }
  }
);
