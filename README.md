# vapourkit-site

Marketing site and documentation for [Vapourkit](https://github.com/Kim2091/vapourkit).

Built with [Astro](https://astro.build/) and [Starlight](https://starlight.astro.build/).

## Local development

```bash
npm install

# Generate the filter reference from a sibling vapourkit checkout
npm run gen:filters

# Dev server (hot reload)
npm run dev

# Production build (auto-runs gen:filters via prebuild)
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
    Icon.astro               # 16 inline SVG icons (lucide-style, aria-hidden)
    FloatingToggle.astro     # Fixed bottom-right theme toggle + scroll-to-top
    StarlightFooter.astro    # Wraps Starlight footer + FloatingToggle
    Lightbox.astro           # Fullscreen image modal with focus trap
    ComparisonSlider.astro   # Before/after CSS range-input slider
    SectionHeading.astro     # Reusable section header (overline + title + description)
  layouts/
    Layout.astro             # Landing page layout
  lib/
    base.ts                  # Normalized BASE_URL helper
  styles/
    tailwind.css             # Tailwind + custom utilities (grain, section-overline, hero-glow, etc.)
    starlight.css            # Starlight theme overrides + grain safety net
  assets/
    wordmark.svg
scripts/
  generateFilterDocs.ts      # Reads .vkfilter files -> src/content/docs/filters/reference.md
astro.config.mjs             # Starlight + Tailwind integrations + sidebar
tailwind.config.mjs          # Theme tokens (RGB triplets for opacity modifiers)
.github/workflows/deploy.yml  # CI: checkout -> gen:filters -> build -> deploy to GitHub Pages
```

The landing page lives outside the Starlight content collection so it can be fully custom. All docs live at root-level URLs (`/installation`, `/guides/basic-usage`, etc.) — there is no `/docs/` prefix.

## CI

GitHub Actions builds and deploys on push to `main`, and validates on PRs. The workflow:
1. Checks out the Vapourkit desktop repo alongside this one
2. Installs deps with npm cache enabled
3. Runs `gen:filters` and `astro build`
4. Uploads the Pages artifact and deploys to GitHub Pages (push to main only; PRs validate without deploying)

## Refreshing the filter reference

The filter reference page is generated from `.vkfilter` files in the Vapourkit repo's `include/plugins/plugin_filters/` and `include/filter_templates/` directories. Re-run `npm run gen:filters` (or push/PR to `main` to trigger CI) after adding or modifying filters upstream.

## License

GPL 3.0, matching Vapourkit.
