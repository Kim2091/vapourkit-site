---
title: Installation
description: Download Vapourkit and install dependencies on first launch.
---

## Supported platforms

Vapourkit supports **Windows 10/11 (x64)** and **x86_64 Linux distributions** that can run the AppImage.

The backend choices differ by platform:

| Platform | Backends |
| --- | --- |
| Windows | TensorRT (NVIDIA), DirectML (AMD/Intel/NVIDIA), NCNN Vulkan |
| Linux | NCNN Vulkan; TensorRT on NVIDIA with a compatible CUDA/TensorRT stack |

DirectML is available on Windows only.

## Download

[**Free download**](https://ko-fi.com/s/2e5ebd456d)

Linux testing builds are available from the [nightly releases page](https://github.com/Kim2091/vapourkit-nightly/releases).

## Windows

1. Download Vapourkit and extract the archive or run the installer.
2. Launch Vapourkit.
3. On first launch, click **Start Setup** when prompted.

Windows setup installs the managed runtime, bundled models, FFmpeg, Video Compare, and the VapourSynth plugins and filters required by the detected GPU vendor. NVIDIA systems receive TensorRT, DirectML, and NCNN Vulkan; other Windows GPU vendors receive DirectML and NCNN Vulkan.

## Linux

Before launching Vapourkit, install these host prerequisites with your distribution's package manager:

- Python **3.12 or 3.13**, including its `venv`/`ensurepip` package.
- `ffmpeg` and `ffprobe` on `PATH`.
- The Vulkan loader and a working GPU driver/ICD.

Then:

1. Make the downloaded AppImage executable: `chmod +x Vapourkit-*.AppImage`.
2. Run it with `./Vapourkit-*.AppImage`.
3. Click **Start Setup** when prompted.

Linux setup creates a private Python virtual environment and installs VapourSynth, plugins, and models under `~/.config/vapourkit-gui/data/`. It does not install Python packages globally or require `sudo`.

Linux uses NCNN Vulkan by default. NVIDIA systems can also use TensorRT when a compatible CUDA/TensorRT stack is installed. Side-by-side Video Compare is optional on Linux; install the `video-compare` command separately if you want to use it.

If FUSE is unavailable, run the AppImage with `APPIMAGE_EXTRACT_AND_RUN=1 ./Vapourkit-*.AppImage`.

## System requirements

- **RAM:** 8 GB or more recommended.
- **Storage:** 5 GB minimum; 10 GB recommended for the application and dependencies.
- **GPU:** 6 GB VRAM or more recommended.
- **Windows TensorRT:** NVIDIA 16-series or newer with a current compatible driver.
- **Windows DirectML:** AMD, Intel, or NVIDIA GPU with DirectX 12 support.
- **Linux NCNN Vulkan:** a working Vulkan loader and GPU driver.
- **Linux TensorRT:** NVIDIA GPU with a compatible CUDA/TensorRT installation.

## Next

- [First Upscale](/first-upscale) - process your first video in five minutes
- [How it works](/how-it-works) - what's happening under the hood
- [Basic Usage](/guides/basic-usage) - the everyday workflow
