# vapourkit-site

Marketing site and documentation for [Vapourkit](https://github.com/Kim2091/vapourkit).

Built with [Astro](https://astro.build/) and [Starlight](https://starlight.astro.build/), deployed to GitHub Pages.

## Local development

```bash
npm install

# Generate the filter reference from a sibling vapourkit checkout
npm run gen:filters

# Dev server (hot reload)
npm run dev

# Production build
npm run build

# Preview the production build
npm run preview
```

By default `gen:filters` looks for the Vapourkit repo at `../vapourkit`. Override with the `VAPOURKIT_REPO_PATH` environment variable:

```bash
VAPOURKIT_REPO_PATH=/path/to/vapourkit npm run gen:filters
```

## Structure

```
src/
  pages/
    index.astro              # Landing page (custom Astro, not Starlight)
  content/
    docs/                    # Starlight content collection
      introduction.md
      installation.md
      first-upscale.md
      guides/
      models/
      filters/               # `reference.md` is auto-generated
      reference/
      development/
  components/
    Icon.astro               # Inline SVG icon set (lucide-style)
  layouts/
    Layout.astro             # Landing page layout
  styles/
    tailwind.css             # Tailwind + custom utilities
    starlight.css            # Starlight theme overrides
  assets/
    wordmark.svg
scripts/
  generateFilterDocs.ts      # Reads .vkfilter files → src/content/docs/filters/reference.md
astro.config.mjs             # Starlight + Tailwind integrations + sidebar
tailwind.config.mjs          # Theme tokens
.github/workflows/deploy.yml # CI: build + deploy to GitHub Pages
```

The landing page lives outside the Starlight content collection so it can be fully custom. All docs live at root-level URLs (`/installation`, `/guides/basic-usage`, etc.) — there is no `/docs/` prefix.

## Deployment

GitHub Actions builds the site on every push to `main` and deploys to GitHub Pages. The workflow checks out the Vapourkit repo alongside this one so the filter generator has access to the `.vkfilter` sources.

## Refreshing the filter reference

The filter reference page is generated from `.vkfilter` files in the Vapourkit repo's `include/plugins/plugin_filters/` and `include/filter_templates/` directories. Re-run `npm run gen:filters` (or push to `main` to trigger CI) after adding or modifying filters upstream.

## License

GPL 3.0, matching Vapourkit.
