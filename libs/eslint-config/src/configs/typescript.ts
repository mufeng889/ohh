import { GLOB_SRC } from '../constants/glob';
import { interopDefault } from '../shared';
import type { FlatConfigItem } from '../types';

export async function createTsRules(): Promise<FlatConfigItem['rules']> {
  const pluginTs = await interopDefault(import('@typescript-eslint/eslint-plugin'));

  const { rules: recommendedRules } = pluginTs.configs['eslint-recommended'].overrides![0];

  const tsRules = {
    ...pluginTs.configs.base.rules,
    ...recommendedRules,
    ...pluginTs.configs.strict.rules,
    // off
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/consistent-type-imports': ['error', { disallowTypeAnnotations: false, prefer: 'type-imports' }],
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: true
      }
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-redeclare': 'error',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        ignoreRestSiblings: false,
        vars: 'all',
        varsIgnorePattern: '^_'
      }
    ],
    '@typescript-eslint/no-use-before-define': ['error', { classes: false, functions: false, variables: true }],
    '@typescript-eslint/unified-signatures': 'off',
    // Override JS
    'no-redeclare': 'off',
    'no-shadow': 'off',
    'no-unused-vars': 'off',
    'no-use-before-define': 'off'
  };

  return tsRules as unknown as FlatConfigItem['rules'];
}

export async function createTsConfig(overrides: Record<string, string> = {}) {
  const [pluginTs, parserTs] = await Promise.all([
    interopDefault(import('@typescript-eslint/eslint-plugin')),
    interopDefault(import('@typescript-eslint/parser'))
  ]);

  const tsRules = await createTsRules();

  const ts: FlatConfigItem[] = [
    {
      files: [GLOB_SRC],
      languageOptions: {
        parser: parserTs,
        parserOptions: {
          sourceType: 'module'
        }
      },
      plugins: {
        '@typescript-eslint': pluginTs
      },
      rules: {
        ...tsRules,
        ...(overrides as any)
      }
    },
    {
      files: ['**/*.js', '**/*.cjs'],
      rules: {
        '@typescript-eslint/no-require-imports': 'off',
        '@typescript-eslint/no-var-requires': 'off'
      }
    }
  ];

  return ts;
}
