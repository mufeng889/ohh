import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  external: [
    '@antfu/eslint-define-config',
    'eslint-plugin-vue',
    'vue-eslint-parser',
    'eslint-plugin-react',
    'eslint-plugin-react-hooks',
    'eslint-plugin-react-refresh',
    'eslint-plugin-react-native',
    'svelte-eslint-parser',
    'prettier-plugin-toml',
    '@toml-tools/parser'
  ],
  format: ['cjs', 'esm'],
  minify: false,
  shims: true,
  sourcemap: false,
  target: 'node14'
});
