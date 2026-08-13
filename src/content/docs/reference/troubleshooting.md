---
title: Troubleshooting & FAQ
description: Common problems and how to fix them.
---

If something is not covered here, ask in the [Discord](https://discord.gg/uYKMn2hGwB) or open an issue on [GitHub](https://github.com/Kim2091/vapourkit/issues).

For Linux-specific setup and diagnostic steps, see [Linux Setup & Troubleshooting](/reference/linux).

## Setup fails

Restart Vapourkit and run setup again. The plugins-and-filters stage can also be retried later from the **Plugins** menu. If you continue without plugins, install them from that menu before using filters that depend on them.

On Linux, setup requires Python 3.12 or 3.13 with `venv`/`ensurepip` support, `ffmpeg` and `ffprobe` on `PATH`, and a working Vulkan loader and GPU driver. Vapourkit does not install these host prerequisites for you. The AppImage is intended for x86_64 glibc-based distributions.

## TensorRT errors

TensorRT is available only on NVIDIA GPUs. Confirm that the NVIDIA driver and CUDA/TensorRT installation meet the current requirements, then try rebuilding the model for the current GPU. TensorRT engine files are tied to the GPU and environment that built them.

## DirectML is unavailable or slow

DirectML is a Windows-only backend. It supports AMD, Intel, and NVIDIA GPUs with DirectX 12 support and does not require an engine build. On a supported NVIDIA system, TensorRT is usually faster.

## NCNN Vulkan errors

NCNN Vulkan is available on Windows and Linux, but requires a working Vulkan loader and GPU driver. Update or reinstall the GPU driver's Vulkan components, then restart Vapourkit.

## Out of memory

If processing fails with an out-of-memory error:

- Add a **Resize** filter before the model to lower the working resolution.
- Close other GPU-heavy applications.
- Reduce the number of inference streams in the relevant settings.
- Try a different backend if your platform provides one.

## Missing plugins

If filter previews fail with errors about missing VapourSynth functions, reinstall plugins from the **Plugins** menu and restart Vapourkit.

## Video comparison is unavailable

The bundled comparison viewer is available on Windows. On Linux, install the optional `video-compare` command with your distribution's package manager or Linuxbrew, then restart Vapourkit. Comparison is not available for segment-only output.

## A filter is missing on Linux

Linux intentionally shows only the curated filter catalog whose dependencies are installed and verified by Vapourkit. Windows-only binaries, CUDA-only plugins, Hybrid scripts, and other unverified native dependencies are hidden rather than listed and allowed to fail. The complete catalog is still visible in the [Filter Reference](/filters/reference), but the app's filter picker is authoritative for Linux.
