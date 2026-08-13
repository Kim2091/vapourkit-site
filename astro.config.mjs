import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.vapourkit.app',
  integrations: [
    starlight({
      title: 'Vapourkit Docs',
      description: 'Documentation for Vapourkit — AI video upscaling and enhancement.',
      components: {
        Footer: './src/components/StarlightFooter.astro',
        ThemeProvider: './src/components/StarlightThemeProvider.astro',
        ThemeSelect: './src/components/StarlightThemeSelect.astro',
      },
      favicon: '/favicon.svg',
      logo: {
        src: './src/assets/icon.svg',
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/Kim2091/vapourkit' },
        { icon: 'discord', label: 'Discord', href: 'https://discord.gg/uYKMn2hGwB' },
      ],
      editLink: {
        baseUrl: 'https://github.com/Kim2091/vapourkit-site/edit/main/',
      },
      customCss: ['./src/styles/tailwind.css', './src/styles/starlight.css'],
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Start Here', slug: 'introduction' },
            { label: 'Installation', slug: 'installation' },
            { label: 'Process Your First Video', slug: 'first-upscale' },
          ],
        },
        {
          label: 'Workflows',
          items: [
            { label: 'Process Multiple Videos', slug: 'guides/batch-processing' },
            { label: 'Save & Reuse Workflows', slug: 'guides/templates-workflows' },
          ],
        },
        {
          label: 'More Control',
          items: [
            { label: 'Add Filters', slug: 'guides/custom-filters' },
            { label: 'Write Custom Filters', slug: 'filters/writing' },
            { label: 'Choose a Model', slug: 'models/included' },
            { label: 'Use Your Own Model', slug: 'models/custom-onnx' },
            { label: 'Model Licensing', slug: 'models/licensing' },
            { label: 'How Vapourkit Works', slug: 'how-it-works' },
          ],
        },
        {
          label: 'Help',
          items: [
            { label: 'Linux Setup & Troubleshooting', slug: 'reference/linux' },
            { label: 'Troubleshooting & FAQ', slug: 'reference/troubleshooting' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: 'Filter Reference', slug: 'filters/reference' },
            { label: 'Platform Support', slug: 'filters/platform-support' },
            { label: 'File Formats', slug: 'reference/file-formats' },
            { label: 'Configuration', slug: 'reference/configuration' },
            { label: 'Changelog', slug: 'changelog' },
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
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
