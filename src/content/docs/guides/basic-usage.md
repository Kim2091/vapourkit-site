---
title: Basic Usage
description: Common workflows for upscaling a single video.
---

The simplest Vapourkit workflow: drop in a video, pick a model, press go.

## Process a single video

1. **Add a video.** Drag and drop into the *Input Video* panel, or click to browse.
2. **Pick a model.** Choose an upscaling model. Different models target different content types — see [Included Models](/models/included).
3. **Pick a backend.** TensorRT (NVIDIA) or DirectML (AMD/Intel). The default is usually right.
4. **Configure output.** In *Output Settings*, set the save location and the container format.
5. **Process.** Click *Start Processing*. The *Output Preview* panel updates as frames complete.

## Preview and compare

While processing, the *Output Preview* panel shows the latest output frame. Once it's done:

- *Compare* — launches the bundled side-by-side video viewer with the original and upscaled file aligned frame-for-frame.
- *Open Folder* — opens File Explorer at the output location.

## Where to go next

- [Custom Filters](/guides/custom-filters) — chain VapourSynth filters into the pipeline
- [Templates & Workflows](/guides/templates-workflows) — save and share configurations
- [Batch Processing](/guides/batch-processing) — process many videos in a queue
