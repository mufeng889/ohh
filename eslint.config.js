import { defineConfig } from '@ohh-889/eslint-config';

export default defineConfig({
  prettierRules: {
    singleAttributePerLine: true,
    trailingCommas: 'none'
  },
  react: {
    files: ['**/*.tsx']
  },
  root: true
});
