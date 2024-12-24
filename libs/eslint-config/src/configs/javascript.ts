import jsRules from '@eslint/js';
import globals from 'globals';

import { GLOB_SRC, GLOB_SRC_EXT, GLOB_TESTS } from '../constants/glob';
import type { FlatConfigItem } from '../types';

export function createJsConfig(overrides: Record<string, string> = {}) {
  const js: FlatConfigItem[] = [
    {
      languageOptions: {
        ecmaVersion: 2023,
        globals: {
          ...globals.browser,
          ...globals.es2025,
          ...globals.node,
          document: 'readonly',
          navigator: 'readonly',
          window: 'readonly'
        },
        parserOptions: {
          ecmaFeatures: {
            jsx: true
          },
          ecmaVersion: 2022,
          sourceType: 'module'
        },
        sourceType: 'module'
      },
      linterOptions: {
        reportUnusedDisableDirectives: false
      },
      rules: {
        ...jsRules.configs.all.rules,
        'accessor-pairs': ['error', { enforceForClassMembers: true, setWithoutGet: true }],
        'array-callback-return': 'error',
        'block-scoped-var': 'error',
        camelcase: 'off',
        'capitalized-comments': 'off',
        'constructor-super': 'error',
        'default-case-last': 'error',
        'dot-notation': ['error', { allowKeywords: true }],
        eqeqeq: ['error', 'smart'],
        'func-style': 'off',
        'id-length': 'off',
        'init-declarations': 'off',
        'line-comment-position': 'off',
        'max-classes-per-file': 'off',
        'max-lines': 'off',
        'max-lines-per-function': 'off',
        'max-statements': 'off',
        'max-statements-per-line': 'off',
        'multiline-comment-style': 'off',
        'no-alert': 'error',
        'no-array-constructor': 'error',
        'no-async-promise-executor': 'error',
        'no-caller': 'error',
        'no-case-declarations': 'error',
        'no-class-assign': 'error',
        'no-compare-neg-zero': 'error',
        'no-cond-assign': ['error', 'always'],
        'no-console': 'warn',
        'no-const-assign': 'error',
        'no-control-regex': 'error',
        'no-debugger': 'error',
        'no-delete-var': 'error',
        'no-dupe-args': 'error',
        'no-dupe-class-members': 'error',
        'no-dupe-keys': 'error',
        'no-duplicate-case': 'error',
        'no-duplicate-imports': 'off',
        'no-empty': ['error', { allowEmptyCatch: true }],
        'no-empty-character-class': 'error',
        'no-empty-function': 'off',
        'no-empty-pattern': 'error',
        'no-eval': 'error',
        'no-ex-assign': 'error',
        'no-extend-native': 'error',
        'no-extra-bind': 'error',
        'no-extra-boolean-cast': 'error',
        'no-fallthrough': 'error',
        'no-func-assign': 'error',
        'no-global-assign': 'error',
        'no-implied-eval': 'error',
        'no-import-assign': 'error',
        'no-inline-comments': 'off',
        'no-invalid-regexp': 'error',
        'no-irregular-whitespace': 'error',
        'no-iterator': 'error',
        'no-labels': ['error', { allowLoop: false, allowSwitch: false }],
        'no-lone-blocks': 'error',
        'no-loss-of-precision': 'error',
        'no-magic-numbers': 'off',
        'no-misleading-character-class': 'error',
        'no-mixed-operators': [
          'error',
          {
            allowSamePrecedence: true,
            groups: [
              ['+', '-', '*', '/', '%', '**'],
              ['&', '|', '^', '~', '<<', '>>', '>>>'],
              ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
              ['&&', '||'],
              ['in', 'instanceof']
            ]
          }
        ],
        'no-multi-str': 'error',
        'no-negated-condition': 'off',
        'no-new': 'error',
        'no-new-func': 'error',
        'no-new-native-nonconstructor': 'error',
        'no-new-wrappers': 'error',
        'no-obj-calls': 'error',
        'no-octal': 'error',
        'no-octal-escape': 'error',
        'no-proto': 'error',
        'no-prototype-builtins': 'error',
        'no-redeclare': ['error', { builtinGlobals: false }],
        'no-regex-spaces': 'error',
        'no-restricted-globals': [
          'error',
          { message: 'Use `globalThis` instead.', name: 'global' },
          { message: 'Use `globalThis` instead.', name: 'self' }
        ],
        'no-restricted-properties': [
          'error',
          {
            message: 'Use `Object.getPrototypeOf` or `Object.setPrototypeOf` instead.',
            property: '__proto__'
          },
          {
            message: 'Use `Object.defineProperty` instead.',
            property: '__defineGetter__'
          },
          {
            message: 'Use `Object.defineProperty` instead.',
            property: '__defineSetter__'
          },
          {
            message: 'Use `Object.getOwnPropertyDescriptor` instead.',
            property: '__lookupGetter__'
          },
          {
            message: 'Use `Object.getOwnPropertyDescriptor` instead.',
            property: '__lookupSetter__'
          }
        ],
        'no-restricted-syntax': [
          'error',
          'DebuggerStatement',
          'LabeledStatement',
          'WithStatement',
          'TSEnumDeclaration[const=true]',
          'TSExportAssignment'
        ],
        'no-self-assign': ['error', { props: true }],
        'no-self-compare': 'error',
        'no-sequences': 'error',
        'no-shadow-restricted-names': 'error',
        'no-sparse-arrays': 'error',
        'no-template-curly-in-string': 'error',
        'no-ternary': 'off',
        'no-this-before-super': 'error',
        'no-throw-literal': 'error',
        'no-undef': 'error',
        'no-undef-init': 'error',
        'no-undefined': 'off',
        'no-unexpected-multiline': 'error',
        'no-unmodified-loop-condition': 'error',
        'no-unneeded-ternary': ['error', { defaultAssignment: false }],
        'no-unreachable': 'error',
        'no-unreachable-loop': 'error',
        'no-unsafe-finally': 'error',
        'no-unsafe-negation': 'error',
        'no-unused-expressions': [
          'error',
          {
            allowShortCircuit: true,
            allowTaggedTemplates: true,
            allowTernary: true
          }
        ],
        'no-unused-vars': [
          'error',
          {
            args: 'all',
            argsIgnorePattern: '^_',
            ignoreRestSiblings: false,
            vars: 'all',
            varsIgnorePattern: '^_'
          }
        ],
        'no-use-before-define': ['error', { classes: false, functions: false, variables: true }],
        'no-useless-assignment': 'off',
        'no-useless-backreference': 'error',
        'no-useless-call': 'error',
        'no-useless-catch': 'error',
        'no-useless-computed-key': 'error',
        'no-useless-constructor': 'error',
        'no-useless-rename': 'error',
        'no-useless-return': 'error',
        'no-var': 'error',
        'no-with': 'error',
        'object-shorthand': [
          'error',
          'always',
          {
            avoidQuotes: true,
            ignoreConstructors: false
          }
        ],
        'one-var': ['error', 'never'],
        'prefer-arrow-callback': [
          'error',
          {
            allowNamedFunctions: false,
            allowUnboundThis: true
          }
        ],
        'prefer-const': [
          'error',
          {
            destructuring: 'all',
            ignoreReadBeforeAssign: true
          }
        ],
        'prefer-destructuring': 'off',
        'prefer-named-capture-group': 'off',
        'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
        'require-atomic-updates': 'off',
        'require-await': 'off',
        'require-unicode-regexp': 'off',
        'sort-imports': [
          'error',
          {
            allowSeparatedGroups: false,
            ignoreCase: false,
            ignoreDeclarationSort: true,
            ignoreMemberSort: false,
            memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single']
          }
        ],
        'sort-keys': 'off',
        'spaced-comment': [
          'error',
          'always',
          {
            block: {
              balanced: true,
              exceptions: ['*'],
              markers: ['*package', '!', ',', ':', '::', 'flow-include']
            },
            line: { markers: ['*package', '!', '/', ',', '='] }
          }
        ],
        'unicode-bom': ['error', 'never'],
        ...overrides
      }
    },
    {
      files: [`**/scripts/${GLOB_SRC}`, `**/cli.${GLOB_SRC_EXT}`],
      rules: {
        'no-console': 'off'
      }
    },
    {
      files: GLOB_TESTS,
      rules: {
        'no-unused-expressions': 'off'
      }
    }
  ];

  return js;
}
