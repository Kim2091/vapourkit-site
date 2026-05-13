---
title: How it works
description: Vapourkit's pipeline, filters, models, and backends explained.
---

The mental model behind Vapourkit, end-to-end. If you've already followed [First Upscale](/first-upscale) and want to understand what's happening under the hood, start here. Everything else in the docs is a closer look at one piece of this picture.

## VapourSynth

[VapourSynth](https://www.vapoursynth.com/) is a Python-based frame server and video processing framework. Every operation Vapourkit performs — decoding, filtering, AI upscaling, format conversion — is expressed as a node in a VapourSynth graph and driven by a Python script (`.vpy`).

Vapourkit's job is to compose that script for you. When you press *Start Processing*, the app fills in a template at `include/vapoursynth_template.vpy`, writes a temporary `.vpy` file, and hands it to the bundled VapourSynth runtime. The UI is a frontend over that script.

## The processing pipeline

Each run is a single ordered chain:

```
input video → colorimetry setup → filter 1 → filter 2 → … → encode → output
```

A few things worth knowing about how this is wired:

- **Source decoding** uses `bs.VideoSource` (BestSource) on the input file.
- **Colorimetry** is tagged before the filter chain runs, using your [Output Settings](/guides/basic-usage) defaults. The clip is converted to a YUV integer format for filter compatibility.
- **The AI model is just another filter.** Internally, the upscaling step is treated as one entry in the filter list with `filterType: 'aiModel'`. That means filters can run **before** the model, **after** the model, or both — whatever order you set in the [filter panel](/guides/custom-filters). You can also disable the model entirely and run a filter-only pipeline.
- **Encoding** happens after the chain completes; the final clip is converted to your selected output format and muxed into the chosen container (see [File Formats](/reference/file-formats)).

## Backends: TensorRT and DirectML

Vapourkit supports two inference backends, toggled from the **DML | TRT** switch in the header.

- **TensorRT (TRT)** — NVIDIA's optimizing inference runtime. Each model is compiled into a `.engine` file targeted at your specific GPU. Compilation takes 5–15 minutes per model the first time depending on the card, but inference is faster afterward. NVIDIA GPUs only.
- **DirectML (DML)** — A Windows-native inference layer that runs on AMD, Intel, and NVIDIA GPUs via ONNX Runtime. No engine build step; models run directly from `.onnx`. Broader hardware support, generally slower than TensorRT on the same NVIDIA card.

If you have an NVIDIA GPU, TensorRT is usually the right pick. On AMD, Intel, or older NVIDIA cards without TensorRT support, use DirectML.

## Models: VSR vs image-based

Vapourkit ships two kinds of AI upscaling model.

- **VSR (Video Super-Resolution) models** are temporally aware: at each output frame, the model sees several neighbouring source frames and produces a result that's stable across time. Less shimmer on video, but only certain architectures support this mode.
- **Image-based models** process each frame independently. They still work on video, but you may see frame-to-frame instability (shimmer, flicker on detail).

For the full list of bundled models and their categories, see [Included Models](/models/included). For importing your own, see [Custom ONNX Models](/models/custom-onnx).

## Filters

A filter in Vapourkit is a small piece of VapourSynth Python with a simple contract: it receives a variable named `clip` and reassigns `clip` to its output. Anything in between is yours.

```python
# CAS Sharpen.vkfilter
clip = core.cas.CAS(clip, sharpness=0.5, planes=0)
```

Filters are persisted as [`.vkfilter`](/reference/file-formats) files — TOML wrappers with a `name`, `category`, `description`, and the `code` block above.

Vapourkit ships with **~157 pre-made filters** across roughly **34 categories** (Anti-Aliasing, Denoising, Sharpening, Dehalo, Deinterlacing, Masking, Restoration, and more), built on top of VapourSynth plugins like `vszip`, `vsrgtools`, `vs-mlrt`, and others. You can mix these freely, reorder them, or [write your own](/filters/writing) from scratch.

## Templates vs workflows

Two save formats serve different scopes:

- **Filter templates (`.vkfilter`)** — one filter saved for reuse. Useful when you've tuned a single step (a specific denoise, a custom crop) and want it back later.
- **Workflows (`.vkworkflow`)** — the entire pipeline saved together: every enabled filter, the selected model, output settings, segment selection. Useful for reproducing a complete recipe or sharing it with someone else.

See [Templates & Workflows](/guides/templates-workflows) for the export/import flow, and [File Formats](/reference/file-formats) for the on-disk structure.

## Single video vs queue

Both flows build and run the same kind of pipeline. The difference is when the configuration is captured.

- **Single video** uses whatever filters, model, and settings are currently selected in the UI.
- **Queue** snapshots the full workflow (filters, model, output settings, segment) per item at the moment you add it. Editing the UI afterwards doesn't retroactively change queued items — each one keeps the configuration it was added with. See [Batch Processing](/guides/batch-processing).

## Next

- [Basic Usage](/guides/basic-usage) — the everyday workflow
- [Custom Filters](/guides/custom-filters) — write and chain your own
- [Templates & Workflows](/guides/templates-workflows) — save and share full pipelines
- [Filter Reference](/filters/reference) — every bundled filter
