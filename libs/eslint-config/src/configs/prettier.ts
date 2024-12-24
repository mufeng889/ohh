import prettierRules from 'eslint-config-prettier';

import { GLOB_PRETTIER_LINT } from '../constants/glob';
import { interopDefault } from '../shared';
import type { FlatConfigItem, PartialPrettierExtendedOptions } from '../types';

const { rules: eslintRules } = prettierRules;

export async function createPrettierConfig(rules: PartialPrettierExtendedOptions) {
  const pluginPrettier = await interopDefault(import('eslint-plugin-prettier'));

  const { plugins = [] } = rules;

  const pRules: PartialPrettierExtendedOptions = {
    ...rules,
    plugins: plugins.concat('prettier-plugin-jsdoc')
  };

  const configs: FlatConfigItem[] = [
    {
      files: GLOB_PRETTIER_LINT,
      plugins: {
        prettier: pluginPrettier
      },
      rules: {
        ...eslintRules,
        'arrow-body-style': 'off',
        'prefer-arrow-callback': 'off',
        'prettier/prettier': ['warn', pRules]
      }
    }
  ];

  return configs;
}
