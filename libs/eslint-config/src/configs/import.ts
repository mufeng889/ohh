import { interopDefault } from '../shared';
import type { FlatConfigItem } from '../types';

export async function createImportConfig(
  overrides: Record<string, string> = {},
  overridesSort: Record<string, string> = {}
) {
  const [pluginImport, pluginSort] = await Promise.all([
    interopDefault(import('eslint-plugin-import-x')),
    interopDefault(import('eslint-plugin-sort'))
  ]);

  const configs: FlatConfigItem[] = [
    {
      plugins: {
        import: pluginImport,
        sort: pluginSort
      },

      rules: {
        'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-absolute-path': 'warn',
        'import/no-duplicates': 'error',
        'import/no-empty-named-blocks': 'error',
        'import/no-mutable-exports': 'error',
        'import/no-named-default': 'error',
        'import/no-relative-packages': 'error',
        'import/no-self-import': 'error',
        'import/no-useless-path-segments': [
          'error',
          {
            noUselessIndex: true
          }
        ],
        'import/no-webpack-loader-syntax': 'error',
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
        'sort/destructuring-properties': 'warn',
        'sort/export-members': 'warn',
        'sort/exports': [
          'warn',
          {
            groups: [
              { order: 50, type: 'default' },
              { order: 40, type: 'sourceless' },
              { order: 30, regex: '^\\.+\\/' },
              { order: 10, type: 'dependency' },
              { order: 20, type: 'other' }
            ]
          }
        ],
        'sort/import-members': ['warn', { caseSensitive: true, natural: true }],
        'sort/imports': ['off'],
        'sort/object-properties': 'warn',
        'sort/string-enums': ['error', { caseSensitive: false, natural: true }],
        'sort/string-unions': ['error', { caseSensitive: false, natural: true }],
        'sort/type-properties': ['warn', { caseSensitive: false, natural: true }],
        ...overrides,
        ...overridesSort
      }
    }
  ];

  return configs;
}
