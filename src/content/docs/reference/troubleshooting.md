---
title: Troubleshooting & FAQ
description: Common problems and how to fix them.
---

> This page is a work in progress. If you hit something that isn't covered here, ask in the [Discord](https://discord.gg/uYKMn2hGwB) or open an issue on [GitHub](https://github.com/Kim2091/vapourkit/issues).

## Setup fails

If the first-launch setup fails partway through, restart Vapourkit and setup will resume from where it left off. The plugins-and-filters stage can also be re-run later from the **Plugins** menu in the header without losing other components.

## TensorRT errors

Make sure your NVIDIA driver is at least version `580.x`. Older drivers won't load the bundled TensorRT runtime.

## DirectML is slow

DirectML is more compatible but slower than TensorRT. If you have a supported NVIDIA GPU, prefer TensorRT.

## Out of memory

If processing fails with an out-of-memory error:

- Add a *Resize* filter before the model to lower the working resolution.
- Close other GPU-heavy applications.
- Try DirectML instead of TensorRT if you're on NVIDIA — it has different memory characteristics.

## Missing plugins

If filter previews fail with errors about missing VapourSynth functions, the plugin install may have been skipped or interrupted. Reinstall plugins from the **Plugins** menu in the header.
