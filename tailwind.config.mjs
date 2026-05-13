import starlightPlugin from '@astrojs/starlight-tailwind';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        'vk-bg': 'rgb(var(--vk-bg) / <alpha-value>)',
        'vk-surface': 'rgb(var(--vk-surface) / <alpha-value>)',
        'vk-surface-2': 'rgb(var(--vk-surface-2) / <alpha-value>)',
        'vk-elevated': 'rgb(var(--vk-elevated) / <alpha-value>)',
        'vk-text': 'rgb(var(--vk-text) / <alpha-value>)',
        'vk-text-muted': 'rgb(var(--vk-text-muted) / <alpha-value>)',
        'vk-text-subtle': 'rgb(var(--vk-text-subtle) / <alpha-value>)',
        'vk-border': 'rgb(var(--vk-border) / <alpha-value>)',
        'vk-border-strong': 'rgb(var(--vk-border-strong) / <alpha-value>)',
        'vk-brand-blue': '#3b82f6',
        'vk-brand-purple': '#8b5cf6',
        'vk-brand-cyan': '#06b6d4',
        'vk-brand-cyan-soft': '#22d3ee',
        'vk-brand-cyan-light': '#67e8f9',
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'system-ui',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [starlightPlugin()],
};
