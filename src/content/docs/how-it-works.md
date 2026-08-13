---
title: How Vapourkit Works
description: Vapourkit's pipeline, filters, models, and backends explained.
---

The mental model behind Vapourkit, end to end. Read this after [Process Your First Video](/first-upscale) if you want to understand what happens under the hood.

## VapourSynth

[VapourSynth](https://www.vapoursynth.com/) is a Python-based frame server and video processing framework. Every operation Vapourkit performs - decoding, filtering, AI upscaling, format conversion - is expressed in a VapourSynth graph and driven by a Python script (`.vpy`).

Vapourkit composes that script for you. When you press **Start processing**, the app creates a temporary `.vpy` file from its processing template and hands it to the installed VapourSynth runtime. The UI is a frontend over that script.

## The processing pipeline

Each run is a single ordered chain:

```
input video -> colorimetry setup -> filter 1 -> filter 2 -> ... -> encode -> output
```

- **Source decoding** uses BestSource on the input file.
- **Colorimetry** is applied before the filter chain according to the output settings.
- **The AI model is a filter.** It can run before or after other filters, in whatever order you set in the filter panel. You can also disable the model and run a filter-only pipeline.
- **Encoding** happens after the chain completes; the final clip is converted to the selected format and written to the chosen container. See [File Formats](/reference/file-formats).

## Backends by operating system

Vapourkit supports three inference backends. The backend picker only shows options supported by the current platform.

| Platform | Available backends | Default |
| --- | --- | --- |
| Windows | TensorRT, DirectML, NCNN Vulkan | TensorRT |
| Linux | NCNN Vulkan; TensorRT on NVIDIA with a compatible CUDA/TensorRT stack | NCNN Vulkan |

DirectML is Windows-only.

- **TensorRT (TRT)** is NVIDIA's optimizing inference runtime. Models are compiled into `.engine` files targeted to the GPU. The first build can take several minutes, but inference is usually fastest afterward. TensorRT is available on Windows and Linux, but Linux requires a compatible NVIDIA CUDA/TensorRT installation.
- **DirectML (DML)** is a Windows-native ONNX Runtime backend. It runs ONNX models directly on AMD, Intel, and NVIDIA GPUs with DirectX 12 support, without an engine build step.
- **NCNN Vulkan** runs ONNX models directly through Vulkan. It is available on Windows and Linux and requires a working Vulkan loader and GPU driver. It is the Linux default and provides the cross-vendor Linux path.

## Models: VSR vs image-based

Vapourkit ships two kinds of AI upscaling model.

- **VSR (Video Super-Resolution) models** are temporally aware: each output frame uses several neighbouring source frames, which improves stability over time.
- **Image-based models** process each frame independently. They still work on video, but can show frame-to-frame shimmer or flicker on fine detail.

For the bundled model list, see [Choose a Model](/models/included). For importing your own, see [Use Your Own Model](/models/custom-onnx).

## Filters

A filter in Vapourkit is a small piece of VapourSynth Python with a simple contract: it receives a variable named `clip` and reassigns `clip` to its output.

```python
# CAS Sharpen.vkfilter
clip = core.cas.CAS(clip, sharpness=0.5, planes=0)
```

Filters are persisted as [`.vkfilter`](/reference/file-formats) files - TOML wrappers with a name, category, description, and code block. You can mix filters freely, reorder them, or [write your own](/filters/writing).

## Templates vs workflows

Two save formats serve different scopes:

- **Filter templates (`.vkfilter`)** - one filter saved for reuse.
- **Workflows (`.vkworkflow`)** - the complete pipeline, including enabled filters, the selected model, output settings, and segment selection.

See [Save & Reuse Workflows](/guides/templates-workflows) for the current Open, Import, and Export flow.

## Single video vs queue

Both flows build and run the same kind of pipeline. The difference is when the configuration is captured:

- **Single video** uses the filters, model, and settings currently selected in the UI.
- **Queue** stores a workflow snapshot for each item when it is added. Editing the UI afterwards does not change that queued item. See [Process Multiple Videos](/guides/batch-processing).

## Next

- [Add Filters](/guides/custom-filters) - change the processing result
- [Save & Reuse Workflows](/guides/templates-workflows) - repeat a setup
- [Process Multiple Videos](/guides/batch-processing) - use the queue
- [Filter Reference](/filters/reference) - every bundled filter
