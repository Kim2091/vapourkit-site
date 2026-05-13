---
title: Basic Usage
description: Common workflows for upscaling a single video.
---

The simplest Vapourkit workflow: drop in a video, pick a model, press go.

## Process a single video

1. **Add a video.** Drag and drop the file, or click the input area to browse.
2. **Pick a model.** Choose an upscaling model. Different models target different content types — see [Included Models](/models/included).
3. **Pick a backend.** TensorRT (NVIDIA) or DirectML (any GPU). The default is usually right.
4. **Configure output.** Set the save location and the container format.
5. **Upscale.** Click *Upscale Video*. Processing starts and the preview updates as frames complete.

## Preview and compare

While processing, the preview pane shows the latest output frame. Once it's done:

- *Preview Output* — plays the finished file.
- *Compare Videos* — opens the built-in side-by-side viewer with the original and upscaled file aligned frame-for-frame.

## Where to go next

- [Custom Filters](/guides/custom-filters) — chain VapourSynth filters into the pipeline
- [Templates & Workflows](/guides/templates-workflows) — save and share configurations
- [Batch Processing](/guides/batch-processing) — process many videos in a queue
