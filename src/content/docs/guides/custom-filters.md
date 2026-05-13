---
title: Custom Filters
description: Add and chain VapourSynth filters in your processing pipeline.
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

Vapourkit ships with **150+ pre-made filters** covering antialiasing, denoising, sharpening, color correction, deinterlacing, and more. See the [Filter Reference](/filters/reference) for the full list.

## Writing your own

For details on filter authoring, see [Writing Custom Filters](/filters/writing).
