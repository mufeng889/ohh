import { versionBump } from 'bumpp';

export async function release(execute = 'npx soy changelog', push = true) {
  await versionBump({
    all: true,
    commit: 'chore(projects): release v%s',
    execute,
    files: ['**/package.json', '!**/node_modules'],
    push,
    tag: true
  });
}
