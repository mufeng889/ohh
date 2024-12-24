import {
  createFormatterConfig,
  createGitignoreRule,
  createImportConfig,
  createJsConfig,
  createNodeConfig,
  createPrettierConfig,
  createReactConfig,
  createReactNativeConfig,
  createTsConfig,
  createUnicornConfig,
  createUnocssConfig,
  createVueConfig
} from './configs';
import { createOptions } from './options';
import { getOverridesRules } from './shared';
import type { Awaitable, FlatConfigItem, Options } from './types';

export * from './types';

export async function defineConfig(options: Partial<Options> = {}, ...userConfigs: Awaitable<FlatConfigItem>[]) {
  const opts = await createOptions(options);

  const ignore: FlatConfigItem = {
    ignores: opts.ignores
  };

  const overrideRecord = getOverridesRules(opts.overrides);

  const gitignore = await createGitignoreRule(opts.gitignore);
  const js = createJsConfig(overrideRecord.js);
  const node = await createNodeConfig(overrideRecord.n);
  const imp = await createImportConfig(overrideRecord.import, overrideRecord.sort);
  const unicorn = await createUnicornConfig(overrideRecord.unicorn);
  const ts = await createTsConfig(overrideRecord.ts);
  const vue = await createVueConfig(opts.vue, overrideRecord.vue);
  const react = await createReactConfig(opts.react, overrideRecord.react);
  const reactNative = await createReactNativeConfig(opts['react-native'], overrideRecord['react-native']);
  const unocss = await createUnocssConfig(opts.unocss, overrideRecord.unocss);
  const prettier = await createPrettierConfig(opts.prettierRules);
  const formatter = await createFormatterConfig(opts.formatter, opts.prettierRules);

  const userResolved = await Promise.all(userConfigs);

  const configs: FlatConfigItem[] = [
    ...gitignore,
    ignore,
    ...js,
    ...node,
    ...imp,
    ...unicorn,
    ...ts,
    ...vue,
    ...react,
    ...reactNative,
    ...unocss,
    ...userResolved,
    ...prettier,
    ...formatter
  ];

  return configs;
}
