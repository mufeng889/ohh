import pluginNode from 'eslint-plugin-n';

import type { FlatConfigItem } from '../types';

export async function createNodeConfig(overrides: Record<string, string> = {}) {
  const configs: FlatConfigItem[] = [
    {
      plugins: {
        n: pluginNode
      },
      rules: {
        ...pluginNode.configs['flat/recommended-script'].rules,
        'n/handle-callback-err': ['error', '^(err|error)$'],
        'n/no-deprecated-api': 'error',
        'n/no-exports-assign': 'error',
        'n/no-extraneous-import': 'off',
        'n/no-missing-import': 'off',
        'n/no-new-require': 'error',
        'n/no-path-concat': 'error',
        'n/no-unpublished-import': 'off',
        'n/prefer-global/buffer': ['error', 'never'],
        'n/prefer-global/process': ['error', 'never'],
        'n/process-exit-as-throw': 'error',
        ...overrides
      }
    }
  ];

  return configs;
}
