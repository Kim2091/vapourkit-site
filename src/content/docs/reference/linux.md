---
title: Linux Setup & Troubleshooting
description: Install, configure, and diagnose the Vapourkit Linux AppImage.
---

Vapourkit's Linux build is an x86_64 AppImage. The AppImage contains the desktop application, while first-run setup uses a few tools supplied by your Linux distribution.

## Before first launch

Install these host prerequisites through your distribution's package manager:

- Python **3.12 or 3.13** with `venv`/`ensurepip` support.
- `ffmpeg` and `ffprobe` available on `PATH`.
- A working Vulkan runtime and GPU support.

Vapourkit creates its own virtual environment and does not install Python packages globally or require `sudo`.

## Launching the AppImage

Make the file executable and launch it:

```bash
chmod +x Vapourkit-*.AppImage
./Vapourkit-*.AppImage
```

If FUSE is unavailable, extract and run the AppImage in place:

```bash
APPIMAGE_EXTRACT_AND_RUN=1 ./Vapourkit-*.AppImage
```

The stable Linux build will be published through Ko-fi when it is released. Until then, Linux AppImages are available from the [nightly releases](https://github.com/Kim2091/vapourkit-nightly/releases).

## Backend selection

- **NCNN Vulkan** is the default Linux backend and works across supported GPU vendors with a working Vulkan runtime.
- **TensorRT** is available on NVIDIA systems with a compatible CUDA/TensorRT stack.
- **DirectML** is Windows-only.

The backend picker shows only the options supported by the current installation. TensorRT builds an engine the first time a model runs at a given shape; later runs reuse the cached engine.

## Common setup errors

### Python is not supported

Install Python 3.12 or 3.13 and the matching `venv`/`ensurepip` support, then restart Vapourkit. Confirm the interpreter reports the expected version with `python3 --version`.

### FFmpeg is missing

Install both `ffmpeg` and `ffprobe`, and make sure they are visible in the environment used to launch Vapourkit:

```bash
ffmpeg -version
ffprobe -version
```

### Vulkan inference fails

Confirm that Vulkan is visible to the session launching Vapourkit. `vulkaninfo --summary` is useful diagnostic output when reporting an issue. Update the Vulkan components through your distribution's normal system-maintenance process, then restart Vapourkit.

### Video comparison is unavailable

Video Compare is optional on Linux. Install the `video-compare` command through your distribution's package manager or Linuxbrew, then restart Vapourkit. Comparison is not available for segment-only output.

## Files and logs

Packaged Linux builds store application data under:

```text
~/.config/vapourkit-gui/data/
```

This contains the private Python environment, models, settings, workflows, filter templates, and logs. The main log is `logs/main.log`. The exact base follows your XDG configuration if `XDG_CONFIG_HOME` is set.

When reporting a Linux issue, include your distribution and kernel, desktop session, GPU, Python version, FFmpeg version, the exact AppImage version, and relevant log output.
