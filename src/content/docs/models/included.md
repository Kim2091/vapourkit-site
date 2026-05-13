---
title: Included Models
description: AI upscaling models that ship with Vapourkit.
---

> This page mirrors the auto-generated section from `src/data/modelLicenses.ts` in the Vapourkit repo. Re-run `npm run update-docs` upstream to refresh.

All included models follow the original licenses they were published with. Most are licensed CC BY-NC-SA 4.0 unless stated otherwise — see [Licensing](/models/licensing) for full details.

## Video models (VSR)

Temporally-aware models for video. Best stability across frames.

- **AniRemaster TSPAN** — Classic Anime
- **AnimeUpV2 TSPAN** — Low Quality Anime
- **AniRestore TFDAT** — LQ Anime or Cartoons (Dot Crawl, Rainbows)

## Image-based models

Frame-by-frame processing. Still works on video but is not temporally stable — you may see shimmer.

- **AnimeJaNai HD V3** — Modern Anime
- **AnimeJaNai SD V1** — Classic HQ Anime
- **AniSD AC/DC SPAN** — Classic SD Anime *(License: CC BY-NC 4.0)*
- **AnimeSharpV4** — Low Quality Anime
- **2x_bndl_animefilm_v1.5** — Low Quality SD Anime *(License: CC BY 4.0)*

## Model support

Vapourkit supports any model that `vs-mlrt` supports. See the [vs-mlrt wiki](https://github.com/AmusementClub/vs-mlrt/wiki) for details.

A great place to find supported models is the [OpenModelDB](https://openmodeldb.info/).

## Where models live

- Built-in: `include/models/` inside the Vapourkit install
- Runtime: `data/models/` for user-imported models

For bringing your own, see [Custom ONNX Models](/models/custom-onnx).
