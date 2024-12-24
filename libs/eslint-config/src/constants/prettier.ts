import type { PartialPrettierExtendedOptions } from '../types';

export const DEFAULT_PRETTIER_RULES: PartialPrettierExtendedOptions = {
  arrowParens: 'avoid',
  htmlWhitespaceSensitivity: 'ignore',
  jsdocCapitalizeDescription: false,
  printWidth: 120,
  singleQuote: true,
  trailingComma: 'none'
};
