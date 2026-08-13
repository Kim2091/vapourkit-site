---
title: Filter Platform Support
description: Which bundled VapourSynth filters are available on Windows and Linux.
---

Vapourkit's filter picker is platform-aware. A filter is shown only when the dependencies needed to run it are part of the current installation.

## Windows

Windows receives the complete bundled filter catalog, including filters backed by the native plugin archives and bundled Hybrid scripts.

## Linux

Linux receives a curated catalog whose Python packages, VapourSynth plugins, and bundled scripts are verified by the Linux setup. The catalog includes:

- VapourSynth core filters that need no optional native dependency.
- Filters supported by the Linux `vsjetpack` package set.
- Supported PyPI-backed filters such as `vs_colorfix`, `vs_grain`, `vs_temporalfix`, `vs_tiletools`, and `vs_undistort`.
- Deep Deinterlace with the fallback appropriate to the selected backend.

Filters that depend on Windows-native binaries, CUDA-only plugins, Hybrid scripts, or other unverified native dependencies are hidden on Linux. This is intentional: a hidden filter is safer than a catalog entry that appears usable and fails during rendering.

The Linux allowlist is maintained in [`electron/pluginFilterCatalog.ts`](https://github.com/Kim2091/vapourkit/blob/main/electron/pluginFilterCatalog.ts) in the desktop repository. The [Filter Reference](/filters/reference) contains the complete catalog; the filter picker is authoritative for the installation you are using.

## Custom filters

You can write custom filters on either platform, but the code must use APIs and packages installed on that platform. A template that imports an unavailable Python module or native plugin fails when previewed or processed. See [Write Custom Filters](/filters/writing).
