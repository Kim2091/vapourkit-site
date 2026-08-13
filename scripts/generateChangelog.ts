/**
 * Generate the site changelog from the Vapourkit desktop repository.
 *
 * Reads:   <VAPOURKIT_REPO>/Changelog.md
 * Writes:  src/content/docs/changelog.md
 */

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const siteRoot = resolve(__dirname, '..');

function findRepoPath(): string {
  const fromEnv = process.env.VAPOURKIT_REPO_PATH;
  if (fromEnv && existsSync(join(fromEnv, 'Changelog.md'))) return resolve(fromEnv);

  const sibling = resolve(siteRoot, '..', 'vapourkit');
  if (existsSync(join(sibling, 'Changelog.md'))) return sibling;

  throw new Error(
    'Vapourkit repo not found. Set VAPOURKIT_REPO_PATH or place the vapourkit repo as a sibling directory.',
  );
}

function main(): void {
  const repoPath = findRepoPath();
  const sourcePath = join(repoPath, 'Changelog.md');
  const source = readFileSync(sourcePath, 'utf8')
    .replace(/^# Changelog\s*/i, '')
    .trim()
    .split(/\r?\n/)
    .map(line => line.trimEnd())
    .join('\n');
  const output = [
    '---',
    'title: Changelog',
    'description: Release notes and notable changes in Vapourkit.',
    '---',
    '',
    '> Auto-generated from the Vapourkit desktop repository. Do not hand-edit — update `Changelog.md` in the desktop repository instead.',
    '',
    source,
    '',
  ].join('\n');

  const outPath = join(siteRoot, 'src', 'content', 'docs', 'changelog.md');
  writeFileSync(outPath, output, 'utf8');
  console.log(`[gen:changelog] wrote ${outPath}`);
}

try {
  main();
} catch (err) {
  console.error(`[gen:changelog] FATAL: ${err instanceof Error ? err.message : err}`);
  process.exit(1);
}
