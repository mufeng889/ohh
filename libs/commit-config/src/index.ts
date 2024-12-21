#!/usr/bin/env node
import cac from 'cac'
import { blue, lightGreen } from 'kolorist'
import { version } from '../package.json'
import type { Lang } from './locales'
import { gitCommit, gitCommitVerify } from './git-commit'

type Command = 'git-commit' | 'git-commit-verify'

type CommandAction<A extends object> = (args?: A) => Promise<void> | void

type CommandWithAction<A extends object = object> = Record<
  Command,
  { action: CommandAction<A>; desc: string }
>
interface CommandArg {
  /**
   * The glob pattern of dirs to cleanup
   *
   * If not set, it will use the default value
   *
   * Multiple values use "," to separate them
   */
  cleanupDir?: string
  /** Execute additional command after bumping and before git commit. Defaults to 'pnpm sa changelog' */
  execute?: string
  /**
   * display lang of cli
   *
   * @default 'en-us'
   */
  lang?: Lang
  /** Indicates whether to push the git commit and tag. Defaults to true */
  push?: boolean
  /** Generate changelog by total tags */
  total?: boolean
}

export async function setupCli() {
  const cli = cac(blue('ohh'))

  cli
    .version(lightGreen(version))
    .option('-l, --lang <lang>', 'display lang of cli', {
      default: 'en-us',
      type: [String]
    })
    .help()

  const commands: CommandWithAction<CommandArg> = {
    'git-commit': {
      action: async (args) => {
        await gitCommit(args?.lang)
      },
      desc: 'git commit, generate commit message which match Conventional Commits standard'
    },
    'git-commit-verify': {
      action: async () => {
        await gitCommitVerify()
      },
      desc: 'verify git commit message, make sure it match Conventional Commits standard'
    }
  }

  for (const [command, { action, desc }] of Object.entries(commands)) {
    cli.command(command, lightGreen(desc)).action(action)
  }

  cli.parse()
}

setupCli()
