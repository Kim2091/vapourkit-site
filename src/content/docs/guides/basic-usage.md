---
title: Basic Usage
description: Common workflows for upscaling a single video.
---

The simplest Vapourkit workflow: drop in a video, configure the pipeline, and start processing.

## Process a single video

1. **Add a video.** Drop one into the **Source** panel, or click it to browse.
2. **Pick a model.** Choose an upscaling model that matches your content. See [Included Models](/models/included).
3. **Choose an inference backend.** The backend menu only shows options supported by your operating system:
   - Windows: TensorRT, DirectML, and NCNN Vulkan.
   - Linux: NCNN Vulkan, plus TensorRT when a compatible NVIDIA CUDA/TensorRT stack is installed.
4. **Configure output.** In the **Output** panel, choose the container, save path, codec, pixel format, and encoding options.
5. **Process.** Click **Start processing**. The **Preview** panel updates as the output is produced.

You can click **Validate** first to process a short test segment, or **Preview** to open the current script in `vs-view` without creating the final output.

## Preview and compare

After processing finishes:

- **Compare** launches the side-by-side viewer with the source and output aligned frame by frame.
- **Open Folder** opens the output directory.

On Linux, the comparison viewer is optional and must be installed separately as the `video-compare` command.

## Next

- [How it works](/how-it-works) - what's happening under the hood
- [Custom Filters](/guides/custom-filters) - chain VapourSynth filters into the pipeline
- [Templates & Workflows](/guides/templates-workflows) - save and share configurations
- [Batch Processing](/guides/batch-processing) - process many videos in a queue
