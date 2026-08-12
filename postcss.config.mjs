// Keep an ancestor repository's PostCSS configuration from being loaded when
// this site is checked out inside another workspace. Tailwind v4 is handled by
// the @tailwindcss/vite plugin in astro.config.mjs.
export default { plugins: {} };
