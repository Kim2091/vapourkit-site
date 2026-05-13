import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://vapourkit.example',
  integrations: [
    starlight({
      title: 'Vapourkit Docs',
      description: 'Documentation for Vapourkit — AI video upscaling and enhancement.',
      logo: {
        src: './src/assets/wordmark.svg',
        replacesTitle: true,
      },
      social: {
        github: 'https://github.com/Kim2091/vapourkit',
        discord: 'https://discord.gg/uYKMn2hGwB',
      },
      editLink: {
        baseUrl: 'https://github.com/Kim2091/vapourkit-site/edit/main/',
      },
      customCss: ['./src/styles/tailwind.css', './src/styles/starlight.css'],
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Introduction', slug: 'introduction' },
            { label: 'Installation', slug: 'installation' },
            { label: 'First Upscale', slug: 'first-upscale' },
          ],
        },
        {
          label: 'Guides',
          items: [
            { label: 'Basic Usage', slug: 'guides/basic-usage' },
            { label: 'Batch Processing', slug: 'guides/batch-processing' },
            { label: 'Custom Filters', slug: 'guides/custom-filters' },
            { label: 'Templates & Workflows', slug: 'guides/templates-workflows' },
          ],
        },
        {
          label: 'Models',
          items: [
            { label: 'Included Models', slug: 'models/included' },
            { label: 'Custom ONNX Models', slug: 'models/custom-onnx' },
            { label: 'Licensing', slug: 'models/licensing' },
          ],
        },
        {
          label: 'Filters',
          items: [
            { label: 'Filter Reference', slug: 'filters/reference' },
            { label: 'Writing Custom Filters', slug: 'filters/writing' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: 'File Formats', slug: 'reference/file-formats' },
            { label: 'Configuration', slug: 'reference/configuration' },
            { label: 'Troubleshooting & FAQ', slug: 'reference/troubleshooting' },
          ],
        },
        {
          label: 'Development',
          items: [
            { label: 'Building from Source', slug: 'development/building' },
            { label: 'Contributing', slug: 'development/contributing' },
          ],
        },
      ],
      pagination: true,
      lastUpdated: true,
      head: [
        {
          tag: 'script',
          content: `(() => {
            try {
              const stored = localStorage.getItem('starlight-theme');
              if (stored !== 'light' && stored !== 'dark') {
                localStorage.setItem('starlight-theme', 'dark');
                document.documentElement.dataset.theme = 'dark';
              }
            } catch (e) {}
          })();`,
        },
      ],
    }),
    tailwind({ applyBaseStyles: false }),
  ],
});
