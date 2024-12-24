import { isPackageExists } from 'local-pkg';

import { ensurePackages, interopDefault } from '../shared';
import type { FlatConfigItem, RequiredRuleBaseOptions } from '../types';

export async function createReactConfig(options?: RequiredRuleBaseOptions, overrides: Record<string, string> = {}) {
  if (!options) return [];

  const { files } = options;

  await ensurePackages(['eslint-plugin-react', 'eslint-plugin-react-hooks', 'eslint-plugin-react-refresh']);

  const [pluginReact, pluginReactHooks, pluginReactRefresh] = await Promise.all([
    interopDefault(import('eslint-plugin-react')),
    interopDefault(import('eslint-plugin-react-hooks')),
    interopDefault(import('eslint-plugin-react-refresh'))
  ] as const);

  // react refresh
  const ReactRefreshAllowConstantExportPackages = ['vite'];

  const isAllowConstantExport = ReactRefreshAllowConstantExportPackages.some(i => isPackageExists(i));

  const configs: FlatConfigItem[] = [
    {
      plugins: {
        react: pluginReact,
        'react-hooks': pluginReactHooks,
        'react-refresh': pluginReactRefresh
      },
      settings: {
        react: {
          version: 'detect'
        }
      }
    },
    {
      files,
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true
          }
        }
      },
      rules: {
        // recommended rules react-hooks
        'react-hooks/exhaustive-deps': 'warn',
        'react-hooks/rules-of-hooks': 'error',

        // react refresh
        'react-refresh/only-export-components': ['warn', { allowConstantExport: isAllowConstantExport }],

        ...pluginReact.configs.recommended.rules,
        'react/jsx-uses-react': 'off',
        // react runtime
        'react/react-in-jsx-scope': 'off',
        ...overrides
      }
    }
  ];

  return configs;
}

export async function createReactNativeConfig(
  options?: RequiredRuleBaseOptions,
  overrides: Record<string, string> = {}
) {
  if (!options) return [];

  const { files } = options;

  await ensurePackages(['eslint-plugin-react-native']);

  const pluginReactNative = await interopDefault(import('eslint-plugin-react-native'));

  const config: FlatConfigItem[] = [
    {
      plugins: {
        'react-native': pluginReactNative
      }
    },
    {
      files,
      languageOptions: {
        globals: {
          ...pluginReactNative.environments['react-native'].globals
        },
        parserOptions: {
          ecmaFeatures: {
            jsx: true
          }
        }
      },
      rules: {
        ...pluginReactNative.configs.all.rules,
        ...(overrides as any)
      }
    }
  ];

  return config;
}
