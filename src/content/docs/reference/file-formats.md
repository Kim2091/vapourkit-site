---
title: File Formats
description: Vapourkit's workflow files and supported input and output video containers.
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
description = "Contrast Limited Adaptive Histogram Equalization"

[metadata]
createdAt = "2025-11-03T16:54:24.466Z"
```

## `.vkworkflow`

A complete processing pipeline saved as TOML. A workflow can include:

- enabled filters and their order;
- the selected model and model type;
- the default inference backend and stream count;
- output format and FFmpeg encoding settings;
- segment selection and colorimetry settings.

Use **Export** in the app's **Workflow** controls to save the current pipeline. Use **Open** to apply a workflow temporarily, or **Import** to add selected filters from a workflow to the current chain. See [Save & Reuse Workflows](/guides/templates-workflows).

Workflow model references are portable names where possible, but the referenced model still needs to be installed on the loading machine.

## Supported video formats

**Input:** MP4, M4V, MKV, AVI, MOV, WebM, FLV, WMV

**Output containers:** MKV, MP4, MOV, AVI
