---
title: Write Custom Filters
description: Author your own VapourSynth filters for use inside Vapourkit.
---

A Vapourkit filter is a snippet of VapourSynth Python that transforms `clip` into a new `clip`. The filter runs inside Vapourkit's processing pipeline alongside AI upscaling.

## Minimum example

```python
# Inside a filter, `clip` is the input and you reassign it to apply changes.
clip = core.std.Crop(clip, left=4, right=4, top=0, bottom=0)
```

## Available APIs

Anything `core.*` from VapourSynth and any plugin loaded by Vapourkit is fair game. Loaded plugins include `vszip`, `vs-mlrt`, `vs-jetpack`, and many others — see the existing [Filter Reference](/filters/reference) for examples of plugin usage. The loaded set depends on the platform: Windows includes the complete bundled catalog, while Linux includes only plugins verified by its PyPI-based setup. A custom filter that imports an unavailable module or native plugin will fail when previewed or processed.

## Filter metadata

When you save a filter as a template, Vapourkit serializes it to `.vkfilter` (TOML) with these fields:

- `name` — display name in the UI
- `category` — used for grouping in the filter picker
- `code` — the Python snippet
- `description` — short summary shown on hover
- `[metadata]` block — timestamps and bookkeeping

See [File Formats](/reference/file-formats) for the schema.

## Sharing

Filter templates live in `data/config/filter-templates/` by default. On Linux this is under the AppImage's external application-data directory, not inside the read-only AppImage. You can email or paste templates — they are plain text TOML — but the recipient still needs every referenced plugin and Python module installed on their platform.
