---
title: Troubleshooting & FAQ
description: Common problems and how to fix them.
---

> This page is a work in progress. If you hit something that isn't covered here, ask in the [Discord](https://discord.gg/uYKMn2hGwB) or open an issue on [GitHub](https://github.com/Kim2091/vapourkit/issues).

## Setup fails

If the first-launch setup fails partway through, you can rerun setup from the menu without losing already-installed components.

## TensorRT errors

Make sure your NVIDIA driver is at least version `580.x`. Older drivers won't load the bundled TensorRT runtime.

## DirectML is slow

DirectML is more compatible but slower than TensorRT. If you have an NVIDIA GPU, prefer TensorRT.

## Out of memory

If processing fails with an out-of-memory error:

- Lower the input resolution by adding a Resize filter before the model.
- Process at smaller tile sizes (configurable in the model settings).
- Close other GPU-heavy applications.

## Missing plugins

If filter previews fail with errors about missing VapourSynth functions, the plugin install may have been skipped or interrupted. Reinstall plugins from the Plugins menu.
