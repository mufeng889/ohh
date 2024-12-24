import process from 'node:process';

import { GLOB_EXCLUDE, GLOB_JSX, GLOB_TSX, GLOB_VUE } from './constants/glob';
import { DEFAULT_PRETTIER_RULES } from './constants/prettier';
import { loadPrettierConfig } from './shared';
import type { OnDemandRuleKey, Options, ParsedOptions, RequiredRuleBaseOptions, RequiredVueOptions } from './types';

export async function createOptions(options: Partial<Options> = {}) {
  const opts: ParsedOptions = {
    cwd: process.cwd(),
    formatter: {
      css: true,
      html: true,
      json: true
    },
    gitignore: true,
    ignores: GLOB_EXCLUDE,
    overrides: {},
    prettierRules: {
      ...DEFAULT_PRETTIER_RULES
    },
    usePrettierrc: true
  };

  const { cwd, formatter, gitignore, ignores, overrides, prettierRules, unocss, usePrettierrc, ...rest } = options;

  if (cwd) {
    opts.cwd = cwd;
  }

  if (ignores?.length) {
    opts.ignores = [...opts.ignores, ...ignores];
  }

  if (gitignore) {
    opts.gitignore = gitignore;
  }

  if (overrides) {
    opts.overrides = overrides;
  }

  if (prettierRules) {
    opts.prettierRules = { ...opts.prettierRules, ...prettierRules };
  }

  if (usePrettierrc !== undefined) {
    opts.usePrettierrc = usePrettierrc;
  }

  if (opts.usePrettierrc) {
    const prettierConfig = await loadPrettierConfig(opts.cwd);
    Object.assign(opts.prettierRules, prettierConfig);
  }

  if (formatter) {
    Object.assign(opts.formatter, formatter);
  }

  const onDemandKeys: OnDemandRuleKey[] = ['vue', 'react', 'react-native'];

  const onDemandFiles: Record<OnDemandRuleKey, string[]> = {
    react: [GLOB_JSX, GLOB_TSX],
    'react-native': [GLOB_JSX, GLOB_TSX],
    vue: [GLOB_VUE]
  };

  onDemandKeys.forEach(key => {
    if (key === 'vue') {
      opts[key] = createItemDemandOptions(key, rest[key], onDemandFiles[key]) as RequiredVueOptions;
    } else {
      opts[key] = createItemDemandOptions(key, rest[key], onDemandFiles[key]);
    }
  });

  // If react-native is enabled, react must be enabled
  if (rest['react-native'] && !rest.react) {
    opts.react = createItemDemandOptions('react', true, onDemandFiles.react);
  }

  opts.unocss = Boolean(unocss);

  return opts;
}

// Notice: why this function has a wrong return type
/**
 * Create on demand rule options
 *
 * @param key
 * @param options
 * @param files Default files
 */
function createItemDemandOptions<K extends OnDemandRuleKey>(key: K, options: Options[K], files: string[]) {
  if (!options) return undefined;

  if (key === 'vue') {
    const vueOptions: RequiredVueOptions = {
      files,
      version: 3
    };

    if (typeof options === 'object') {
      Object.assign(vueOptions, options);
    }

    return vueOptions;
  }

  const itemOptions: RequiredRuleBaseOptions = {
    files
  };

  if (typeof options === 'object') {
    Object.assign(itemOptions, options);
  }

  return itemOptions;
}
