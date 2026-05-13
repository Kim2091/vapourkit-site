---
title: File Formats
description: Vapourkit's file formats — .vkfilter, .vkworkflow — and supported input/output video containers.
---

## `.vkfilter`

A single VapourSynth filter, saved as TOML.

```toml
name = "CLAHE"
category = "Color Modification"
code = """
gray = core.std.ShufflePlanes(clip, planes=0, colorfamily=vs.GRAY)
clip = core.vszip.CLAHE(gray, limit=3000, tiles=10)
"""
description = "Contrast Limited Adaptive Histogram Equalization. Similar to Retinex"

[metadata]
createdAt = "2025-11-03T16:54:24.466Z"
```

## `.vkworkflow`

A complete processing pipeline — filters, model, output settings — saved as TOML.

Use the **Upload** icon in the Vapourkit header to export the current pipeline. Use **Download** to import. See [Templates & Workflows](/guides/templates-workflows) for the full flow.

## Supported video formats

**Input:** MP4, AVI, MKV, MOV, WebM, FLV, WMV

**Output:** MP4, MKV, AVI, MOV, WebM
