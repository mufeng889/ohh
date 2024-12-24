import type {
  FlatConfigItem,
  FlatGitignoreOptions,
  OnDemandRuleKey,
  OnDemandRuleOptions,
  PartialPrettierExtendedOptions,
  PrettierParser,
  RequiredOnDemandRuleOptions,
  RequiredRuleBaseOptions,
  RequiredVueOptions,
  VueOptions
} from './rule';

export type Awaitable<T> = T | Promise<T>;

export interface BaseOptions {
  /**
   * The current working directory
   *
   * @default process.cwd()
   */
  cwd: string;
  /**
   * @default
   * {
   *  "html": true,
   *  "css": true,
   *  "json": true,
   * }
   */
  formatter: {
    css?: boolean;
    html?: boolean;
    json?: boolean;
    markdown?: boolean;
    toml?: boolean;
    yaml?: boolean;
  };
  /**
   * Enable gitignore support.
   *
   * Passing an object to configure the options.
   *
   * @default true
   * @see https://github.com/antfu/eslint-config-flat-gitignore
   */
  gitignore?: boolean | FlatGitignoreOptions;
  /** The globs to ignore lint */
  ignores: string[];
  /** The override rules */
  overrides: Record<string, string>;
  /**
   * Default prettier rules
   *
   * @default
   * ```json
   * {
   *   "printWidth": 120,
   *   "singleQuote": true,
   *   "trailingComma": "none",
   *   "arrowParens": "avoid",
   *   "htmlWhitespaceSensitivity": "ignore"
   * }
   * ```
   */
  prettierRules: PartialPrettierExtendedOptions;

  /**
   * Whether to use prettierrc
   *
   * If true, the rules in prettierrc will override the default rules
   *
   * @default true
   */
  usePrettierrc: boolean;
}

export type Options = Partial<BaseOptions> & {
  vue?: VueOptions | boolean;
} & OnDemandRuleOptions & {
    unocss?: boolean;
  };

export type ParsedOptions = BaseOptions & {
  vue?: RequiredVueOptions;
} & Partial<RequiredOnDemandRuleOptions> & {
    unocss?: boolean;
  };

export type {
  FlatConfigItem,
  OnDemandRuleKey,
  PartialPrettierExtendedOptions,
  PrettierParser,
  RequiredOnDemandRuleOptions,
  RequiredRuleBaseOptions,
  RequiredVueOptions
};
