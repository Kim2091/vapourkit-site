---
title: Add Filters
description: Add ready-made filters to your processing pipeline.
---

Vapourkit lets you write and chain custom VapourSynth filters before and after the AI upscaling step.

## Adding a filter

1. Click **+ Add Filter** in the filter panel.
2. Configure it:
   - Pick a filter template, or write custom VapourSynth code.
   - Enable or disable individual filters.
   - Reorder filters using the drag handles.
3. Filters are automatically applied during processing.

## Creating a filter template

Once you've written a filter you want to reuse:

1. Write the custom VapourSynth code in a filter.
2. Click **Save as Template**.
3. Name your template and optionally add a description.
4. Reuse the template in future projects.

Templates are stored as `.vkfilter` files — see [File Formats](/reference/file-formats).

## Pre-made filters

Vapourkit ships with **160+ pre-made filters on Windows**, covering antialiasing, denoising, sharpening, color correction, deinterlacing, and more. Linux exposes a curated subset whose Python and native dependencies are verified by Linux setup. See the [Filter Reference](/filters/reference) for the full catalog and [Platform Support](/filters/platform-support) for the platform split, then use the app's filter picker to see what is available on your platform.

## Linux filters

Linux does not install arbitrary third-party native plugins or Windows-only Hybrid scripts. A custom filter can use any API provided by the Linux setup, but it will fail during preview or processing if it imports a package or plugin that is not installed. See [Write Custom Filters](/filters/writing) for platform-specific guidance.

## Writing your own

For details on filter authoring, see [Write Custom Filters](/filters/writing).
