---
title: Installation
description: Download Vapourkit and install dependencies on first launch.
---

## Download

[**Free download**](https://ko-fi.com/s/2e5ebd456d)

## Install

1. Download and extract or run the installer to your desired location.
2. Launch Vapourkit.
3. On first launch, click **Start Setup** when prompted to install dependencies.

The setup flow installs, in order:

- VapourSynth Portable
- BestSource (video reading library)
- The bundled Video Compare tool
- vs-mlrt ONNX Runtime (DirectML backend)
- vs-mlrt TensorRT (NVIDIA backend — only on supported GPUs)
- Python Embedded
- Bundled ONNX upscaling models
- FFmpeg
- Plugins & filters (PyTorch, vsjetpack, bundled VapourSynth plugins, helper scripts, filter templates)

Setup runs once. Subsequent launches go straight to the main app. The plugins-and-filters stage can also be re-run later from the **Plugins** menu in the header.

## System requirements

- **OS:** Windows 10/11 (x64)
- **RAM:** 8 GB or more
- **Storage:** 5 GB minimum, 10 GB recommended
- **GPU:**
  - 6 GB VRAM minimum
  - NVIDIA 16xx series or newer (TensorRT) with driver 580.x or newer
  - Or any AMD/Intel GPU with DirectX 12 support (DirectML)

## Next

- [First Upscale](/first-upscale)
