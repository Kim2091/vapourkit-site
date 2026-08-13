import { readdirSync, readFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const siteRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const docsRoot = join(siteRoot, 'src', 'content', 'docs');

function collectMarkdown(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return collectMarkdown(path);
    return entry.isFile() && entry.name.endsWith('.md') ? [path] : [];
  });
}

function routeKey(value: string): string {
  const path = value.split(/[?#]/, 1)[0].replace(/\/$/, '');
  return path || '/';
}

const routes = new Set(['/']);
for (const file of collectMarkdown(docsRoot)) {
  const route = '/' + relative(docsRoot, file).replace(/\\/g, '/').replace(/\.md$/, '');
  routes.add(routeKey(route));
}

const markdownLink = /\]\((\/[^)\s]+)\)/g;
const missing: string[] = [];
for (const file of collectMarkdown(docsRoot)) {
  const content = readFileSync(file, 'utf8');
  for (const match of content.matchAll(markdownLink)) {
    const target = routeKey(match[1]);
    if (!routes.has(target)) {
      missing.push(`${relative(siteRoot, file)} -> ${match[1]}`);
    }
  }
}

if (missing.length > 0) {
  console.error('Broken internal documentation links:');
  for (const link of missing) console.error(`  ${link}`);
  process.exit(1);
}

console.log(`[check:links] checked ${routes.size - 1} documentation routes`);
