import { readFileSync } from 'node:fs';
import path from 'node:path';

import enquirer from 'enquirer';

import { locales } from '../locales';
import type { Lang } from '../locales';
import { execCommand } from '../shared';

const { prompt } = enquirer;

interface PromptObject {
  description: string;
  gitEmoji: string;
  scopes: string;
  types: string;
}

/**
 * Git commit with Conventional Commits standard
 *
 * @param lang
 */
export async function gitCommit(lang: Lang = 'en-us', gitCommitEmoji = true) {
  const { gitCommitMessages, gitCommitScopes, gitCommitTypes, gitEmojiMap } = locales[lang];

  const typesChoices = gitCommitTypes.map(([value, msg]) => {
    const nameWithSuffix = `${value}:`;

    const message = `${nameWithSuffix.padEnd(12)}${msg}`;

    return {
      message,
      name: value
    };
  });

  const scopesChoices = gitCommitScopes.map(([value, msg]) => ({
    message: `${value.padEnd(30)} (${msg})`,
    name: value
  }));

  const gitEmojiChoices = gitEmojiMap.map(([value, msg]) => ({
    message: `${value} ${msg}`,
    name: value
  }));

  const gitWorkFlow = [
    {
      choices: typesChoices,
      message: gitCommitMessages.types,
      name: 'types',
      type: 'select'
    },
    {
      choices: scopesChoices,
      message: gitCommitMessages.scopes,
      name: 'scopes',
      type: 'select'
    },
    {
      choices: gitEmojiChoices,
      message: gitCommitMessages.gitEmoji,
      name: 'gitEmoji',
      type: 'select'
    },
    {
      message: gitCommitMessages.description,
      name: 'description',
      type: 'text'
    }
  ];

  if (!gitCommitEmoji) {
    gitWorkFlow.splice(2, 1);
  }

  const result = await prompt<PromptObject>(gitWorkFlow);

  const breaking = result.description.startsWith('!') ? '!' : '';

  const gitEmoji = result.gitEmoji;

  const description = gitEmoji + result.description.replace(/^!/, '').trim();

  const commitMsg = `${result.types}(${result.scopes})${breaking}: ${description}`;

  await execCommand('git', ['commit', '-m', commitMsg], { stdio: 'inherit' });
}

/** Git commit message verify */
export async function gitCommitVerify(lang: Lang = 'en-us', ignores: RegExp[] = []) {
  const gitPath = await execCommand('git', ['rev-parse', '--show-toplevel']);

  const gitMsgPath = path.join(gitPath, '.git', 'COMMIT_EDITMSG');

  const commitMsg = readFileSync(gitMsgPath, 'utf8').trim();

  if (ignores.some(regExp => regExp.test(commitMsg))) return;

  const REG_EXP = /(?<type>[a-z]+)(?:\((?<scope>.+)\))?(?<breaking>!)?: (?<description>.+)/i;

  if (!REG_EXP.test(commitMsg)) {
    const errorMsg = locales[lang].gitCommitVerify;

    throw new Error(errorMsg);
  }
}
