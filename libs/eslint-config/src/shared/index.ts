import { readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

import { isPackageExists } from 'local-pkg';

import type { Awaitable, PartialPrettierExtendedOptions } from '../types';

export async function interopDefault<T>(m: Awaitable<T>): Promise<T extends { default: infer U } ? U : T> {
  const resolved = await m;
  return (resolved as any).default || resolved;
}

export async function ensurePackages(packages: string[]) {
  if (process.env.CI || process.stdout.isTTY === false) return;

  const nonExistingPackages = packages.filter(i => !isPackageExists(i));
  if (nonExistingPackages.length === 0) return;

  const { default: prompts } = await import('prompts');

  const message = `${
    nonExistingPackages.length === 1 ? 'Package is' : 'Packages are'
  } required for this config: ${nonExistingPackages.join(', ')}. Do you want to install them?`;

  const { result } = await prompts([
    {
      message,
      name: 'result',
      type: 'confirm'
    }
  ]);

  if (result) {
    const { installPackage } = await import('@antfu/install-pkg');
    await installPackage(nonExistingPackages, { dev: true });
  }
}

export async function loadPrettierConfig(cwd: string) {
  let prettierConfig: PartialPrettierExtendedOptions = {};

  try {
    const prettierrc = await readFile(path.join(cwd, '.prettierrc'), 'utf-8');

    prettierConfig = JSON.parse(prettierrc);
  } catch {}

  return prettierConfig;
}

type OverrideRuleKey = 'import' | 'n' | 'react' | 'react-native' | 'sort' | 'ts' | 'unicorn' | 'unocss' | 'vue';

export function getOverridesRules(overrides: Record<string, string> = {}) {
  const overrideRecord = {
    js: {}
  } as Record<OverrideRuleKey | 'js', Record<string, string>>;

  const rulePrefixes: Record<OverrideRuleKey, string> = {
    import: 'import/',
    n: 'n/',
    react: 'react/',
    'react-native': 'react-native/',
    sort: 'sort/',
    ts: '@typescript-eslint/',
    unicorn: 'unicorn/',
    unocss: 'unocss/',
    vue: 'vue/'
  };

  const overrideRuleKeys = Object.keys(rulePrefixes) as OverrideRuleKey[];

  overrideRuleKeys.forEach(key => {
    overrideRecord[key] = {};
  });

  const ruleKeys = Object.keys(overrides);

  ruleKeys.forEach(key => {
    const hasMatch = overrideRuleKeys.some(overrideKey => {
      const prefix = rulePrefixes[overrideKey];

      const matched = key.startsWith(prefix);

      if (matched) {
        overrideRecord[overrideKey][key] = overrides[key];
      }

      return matched;
    });

    if (!hasMatch) {
      overrideRecord.js[key] = overrides[key];
    }
  });

  return overrideRecord;
}
