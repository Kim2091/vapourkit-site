import { readdirSync, readFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const siteRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const sourceRoot = join(siteRoot, 'src');

function collectAstro(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return collectAstro(path);
    return entry.isFile() && entry.name.endsWith('.astro') ? [path] : [];
  });
}

const failures: string[] = [];
for (const file of collectAstro(sourceRoot)) {
  const content = readFileSync(file, 'utf8');
  const label = relative(siteRoot, file);

  for (const match of content.matchAll(/<(img|iframe)\b[^>]*>/gi)) {
    const tag = match[0];
    const required = match[1].toLowerCase() === 'img' ? 'alt' : 'title';
    if (!new RegExp(`\\b${required}\\s*=`).test(tag)) {
      failures.push(`${label}: <${match[1]}> is missing ${required}`);
    }
  }

  for (const match of content.matchAll(/<a\b[^>]*target=["']_blank["'][^>]*>/gi)) {
    if (!/\brel=["'][^"']*noopener[^"']*["']/.test(match[0])) {
      failures.push(`${label}: target="_blank" link is missing rel="noopener"`);
    }
  }
}

if (failures.length > 0) {
  console.error('Accessibility checks failed:');
  for (const failure of failures) console.error(`  ${failure}`);
  process.exit(1);
}

console.log('[check:accessibility] image, iframe, and external-link checks passed');
