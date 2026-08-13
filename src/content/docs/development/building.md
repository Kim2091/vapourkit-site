---
title: Building from Source
description: Build Vapourkit locally from the GitHub repository.
---

## Prerequisites

- Node.js **20+** and npm
- A checkout of the Vapourkit repository
- For Linux builds: an x86_64 glibc-based host with Python 3.12 or 3.13, `venv`/`ensurepip`, `ffmpeg`, `ffprobe`, and a working Vulkan runtime and GPU driver

## Setup

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build the application
npm run build

# Build the Windows installer
npm run build:setup

# Build the Windows portable archive
npm run build:7z

# Build the Linux x86_64 AppImage (run this on Linux)
npm run build:linux
```

Build artifacts are written to `release/`.

The Linux AppImage bundles the Electron application, but first-run setup uses the host's Python, FFmpeg, and Vulkan driver. If FUSE is unavailable, smoke-test the result with:

```bash
chmod +x release/Vapourkit-*.AppImage
APPIMAGE_EXTRACT_AND_RUN=1 ./release/Vapourkit-*.AppImage --version
```

## Project layout

- `src/` - React/TypeScript renderer
- `electron/` - Electron main process
- `include/` - bundled models, plugins, scripts, and filter templates
- `scripts/` - build and maintenance scripts

Documentation is maintained in the separate [vapourkit-site repository](https://github.com/Kim2091/vapourkit-site).
