---
title: Included Models
description: AI upscaling models that ship with Vapourkit.
---

Vapourkit currently ships these model families. The exact filenames and metadata are maintained in the desktop repository's bundled model configuration.

## Video models (VSR)

Temporally aware models for video. They use neighbouring frames to improve stability over time.

- **AniRestore TFDAT** - LQ anime or cartoons, including dot crawl and rainbowing
- **AniRemaster TSPAN** - classic anime
- **AnimeUpV2 TSPAN** - low-quality anime

## Image-based models

Frame-by-frame models. They work on video but may show shimmer or flicker on fine detail.

- **AnimeJaNai HD V3** - modern anime
- **AnimeJaNai HD V3 Sharp 1** - modern, higher-detail anime
- **AnimeJaNai SD V1** - classic high-quality anime
- **AnimeJaNai V2** - modern anime
- **AniSD AC SPAN** - classic high-quality SD anime
- **AniSD DC SPAN** - classic low-quality SD anime
- **AnimeSharpV4 Fast** - low-quality anime
- **Animefilm bundle** - low-quality SD anime

The model picker shows the full model name, scale, precision, and display tag where available.

## Model support

Vapourkit supports models accepted by `vs-mlrt`, subject to the selected backend's requirements. See the [vs-mlrt wiki](https://github.com/AmusementClub/vs-mlrt/wiki) for model-specific details.

For licensing information, see [Licensing](/models/licensing). Check the license of any model before redistributing it.

## Where models live

At runtime, bundled and imported models are stored in `data/models/` under Vapourkit's application data directory. On Linux, the default data directory is under `~/.config/vapourkit-gui/data/`.

For bringing your own model, see [Custom ONNX Models](/models/custom-onnx).
