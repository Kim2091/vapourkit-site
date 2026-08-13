---
title: Installation
description: Download Vapourkit and install dependencies on first launch.
---

## Supported platforms

Vapourkit supports **Windows 10/11 (x64)** and **x86_64, glibc-based Linux distributions** that can run the AppImage.

The backend choices differ by platform:

| Platform | Backends |
| --- | --- |
| Windows | TensorRT (NVIDIA), DirectML (AMD/Intel/NVIDIA), NCNN Vulkan |
| Linux | NCNN Vulkan; TensorRT on NVIDIA with a compatible CUDA/TensorRT stack |

DirectML is available on Windows only.

## Download

[**Windows download**](https://ko-fi.com/s/2e5ebd456d)

Linux AppImages are available from the [nightly releases page](https://github.com/Kim2091/vapourkit-nightly/releases). The AppImage provides the complete Vapourkit desktop application; the stable Linux build will move to Ko-fi when it is released.

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

Linux uses NCNN Vulkan by default on every supported GPU vendor. NVIDIA systems can also use TensorRT when a compatible CUDA/TensorRT stack is installed. DirectML is not available on Linux. Side-by-side Video Compare is optional on Linux; install the `video-compare` command separately with your distribution's package manager or Linuxbrew if you want to use it.

If FUSE is unavailable, run the AppImage with `APPIMAGE_EXTRACT_AND_RUN=1 ./Vapourkit-*.AppImage`.

For Linux-specific diagnostics, see [Linux Setup & Troubleshooting](/reference/linux).

## System requirements

- **RAM:** 8 GB or more recommended.
- **Storage:** 5 GB minimum; 10 GB recommended for the application and dependencies.
- **GPU:** 6 GB VRAM or more recommended.
- **Linux host:** Python 3.12 or 3.13 with `venv`/`ensurepip`, `ffmpeg`, `ffprobe`, and a working Vulkan runtime.
- **Windows TensorRT:** NVIDIA 16-series or newer with a current compatible driver.
- **Windows DirectML:** AMD, Intel, or NVIDIA GPU with DirectX 12 support.
- **Linux NCNN Vulkan:** a working Vulkan loader and GPU driver.
- **Linux TensorRT:** NVIDIA GPU with a compatible CUDA/TensorRT installation.

## Linux filter availability

Linux setup installs a curated catalog of verified filters rather than every filter shipped by the Windows build. The Linux catalog covers VapourSynth core filters, compatible `vsjetpack` filters, supported PyPI-backed filters, and the Deep Deinterlace filter with its CPU fallback.

Filters that depend on Windows-native binaries, CUDA-only plugins, Hybrid scripts, or other unverified native dependencies are hidden on Linux. The [Filter Reference](/filters/reference) lists the complete catalog, while [Platform Support](/filters/platform-support) explains the platform split; the app's filter picker is the authoritative list for the current platform.

## Next

- [Process Your First Video](/first-upscale) - load, choose, and process
- [Start Here](/introduction) - the simple Vapourkit workflow
