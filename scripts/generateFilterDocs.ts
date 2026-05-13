/**
 * Generate the filter reference doc from .vkfilter files in the Vapourkit repo.
 *
 * Reads:   <VAPOURKIT_REPO>/include/plugins/plugin_filters/*.vkfilter
 *          <VAPOURKIT_REPO>/include/filter_templates/*.vkfilter
 * Writes:  src/content/docs/filters/reference.md
 *
 * Source path: VAPOURKIT_REPO_PATH env var, or `../vapourkit` (sibling checkout).
 */

import { readFileSync, readdirSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import TOML from '@iarna/toml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const siteRoot = resolve(__dirname, '..');

interface VkFilter {
  name: string;
  categories: string[];
  description: string;
  code: string;
  source: 'plugin' | 'template';
  file: string;
}

function findRepoPath(): string {
  const fromEnv = process.env.VAPOURKIT_REPO_PATH;
  if (fromEnv && existsSync(fromEnv)) return resolve(fromEnv);

  const sibling = resolve(siteRoot, '..', 'vapourkit');
  if (existsSync(sibling) && existsSync(join(sibling, 'package.json'))) return sibling;

  throw new Error(
    'Vapourkit repo not found. Set VAPOURKIT_REPO_PATH or place the vapourkit repo as a sibling directory.',
  );
}

function normalizeCategories(raw: unknown): string[] {
  if (Array.isArray(raw)) {
    const cats = raw.map((c) => String(c).trim()).filter(Boolean);
    return cats.length > 0 ? cats : ['Uncategorized'];
  }
  if (typeof raw === 'string' && raw.trim()) return [raw.trim()];
  return ['Uncategorized'];
}

function readVkFilters(dir: string, source: 'plugin' | 'template'): VkFilter[] {
  if (!existsSync(dir) || !statSync(dir).isDirectory()) return [];

  const entries = readdirSync(dir).filter((f) => f.endsWith('.vkfilter'));
  return entries.map((file) => {
    const fullPath = join(dir, file);
    const text = readFileSync(fullPath, 'utf-8');
    const parsed = TOML.parse(text) as Record<string, unknown>;
    return {
      name: String(parsed.name ?? file.replace(/\.vkfilter$/, '')),
      categories: normalizeCategories(parsed.category),
      description: String(parsed.description ?? '').trim(),
      code: String(parsed.code ?? '').trim(),
      source,
      file,
    };
  });
}

function groupByCategory(filters: VkFilter[]): Map<string, VkFilter[]> {
  const groups = new Map<string, VkFilter[]>();
  for (const f of filters) {
    for (const cat of f.categories) {
      const existing = groups.get(cat) ?? [];
      existing.push(f);
      groups.set(cat, existing);
    }
  }
  for (const list of groups.values()) {
    list.sort((a, b) => a.name.localeCompare(b.name));
  }
  return new Map([...groups.entries()].sort(([a], [b]) => a.localeCompare(b)));
}

function escapeForMarkdown(s: string): string {
  return s.replace(/\|/g, '\\|');
}

function renderFilter(filter: VkFilter): string {
  const tag = filter.source === 'template' ? '_(bundled template)_' : '';
  const desc = filter.description
    ? `\n${escapeForMarkdown(filter.description)}\n`
    : '\n';
  const codeBlock = filter.code
    ? `\n<details>\n<summary>Show code</summary>\n\n\`\`\`python\n${filter.code}\n\`\`\`\n\n</details>\n`
    : '';
  return `### ${filter.name} ${tag}\n${desc}${codeBlock}`;
}

function buildMarkdown(groups: Map<string, VkFilter[]>, total: number): string {
  const tocEntries: string[] = [];
  for (const category of groups.keys()) {
    const anchor = category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    tocEntries.push(`- [${category}](#${anchor})`);
  }

  const body: string[] = [];
  for (const [category, list] of groups.entries()) {
    body.push(`## ${category}\n`);
    for (const f of list) body.push(renderFilter(f));
    body.push('');
  }

  return [
    '---',
    'title: Filter Reference',
    'description: Complete reference of bundled VapourSynth filters in Vapourkit.',
    '---',
    '',
    '> Auto-generated from `.vkfilter` files in the Vapourkit repo. Do not hand-edit — re-run `npm run gen:filters`.',
    '',
    `**${total} filters** across ${groups.size} categories.`,
    '',
    '## Categories',
    '',
    tocEntries.join('\n'),
    '',
    body.join('\n'),
  ].join('\n');
}

function main(): void {
  const repoPath = findRepoPath();
  console.log(`[gen:filters] reading from ${repoPath}`);

  const plugins = readVkFilters(
    join(repoPath, 'include', 'plugins', 'plugin_filters'),
    'plugin',
  );
  const templates = readVkFilters(
    join(repoPath, 'include', 'filter_templates'),
    'template',
  );
  const all = [...plugins, ...templates];

  if (all.length === 0) {
    throw new Error('No .vkfilter files found. Is the source path correct?');
  }

  const grouped = groupByCategory(all);
  const markdown = buildMarkdown(grouped, all.length);

  const outPath = join(siteRoot, 'src', 'content', 'docs', 'filters', 'reference.md');
  writeFileSync(outPath, markdown, 'utf-8');
  console.log(
    `[gen:filters] wrote ${all.length} filters across ${grouped.size} categories to ${outPath}`,
  );
}

main();
