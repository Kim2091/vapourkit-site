---
title: Introduction
description: What Vapourkit is and who it's for.
---

**Vapourkit** is a free, open-source application for upscaling and enhancing videos with VapourSynth and AI models. It runs on **Windows and Linux**. The available inference backends depend on the operating system:

- **Windows:** TensorRT for NVIDIA GPUs, DirectML for AMD/Intel/NVIDIA GPUs, and NCNN Vulkan.
- **Linux:** NCNN Vulkan on systems with a working Vulkan driver, and TensorRT on NVIDIA systems with a compatible CUDA/TensorRT installation. DirectML is Windows-only.

## What it does

- **AI video upscaling.** Process videos with high-quality AI upscaling models.
- **Multiple inference backends.** Use the backend supported by your operating system and GPU.
- **Real-time preview.** See results while processing.
- **Video comparison.** Compare the source and output side by side.
- **Batch processing.** Queue multiple videos for sequential processing.
- **Pre-made filters.** Use ready-to-run VapourSynth filters.
- **Custom VapourSynth filters.** Write and chain your own processing filters.
- **Templates and workflows.** Save and share filter configs (`.vkfilter`) and complete workflows (`.vkworkflow`).
- **Custom models.** Import your own ONNX models.

## Who it's for

- Restoration enthusiasts working with archival video.
- Anime and film communities upscaling SD or low-quality sources.
- Anyone who wants AI-driven video enhancement without writing VapourSynth scripts by hand.

## Next

- [Installation](/installation) - download and first-launch setup
- [First Upscale](/first-upscale) - process your first video in five minutes
- [How it works](/how-it-works) - the conceptual model behind the app
- [Basic Usage](/guides/basic-usage) - the everyday workflow
