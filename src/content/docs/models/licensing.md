---
title: Model Licensing
description: Licenses for bundled and imported AI models.
---

**All included models follow the original licenses they were published with.** Most are CC BY-NC-SA 4.0 unless otherwise noted.

## Bundled model licenses

Each bundled model retains its upstream license. The current bundled families are grouped as follows:

- **CC BY-NC-SA 4.0:** AniRemaster TSPAN, AnimeUpV2 TSPAN, AniRestore TFDAT, AnimeJaNai variants, and AnimeSharpV4.
- **CC BY-NC 4.0:** AniSD AC/DC SPAN.
- **CC BY 4.0:** the `2x_bndl_animefilm_v1.5` model.

The licensing data lives in [`src/data/modelLicenses.ts`](https://github.com/Kim2091/vapourkit/blob/main/src/data/modelLicenses.ts) in the Vapourkit repo and is the authoritative source.

## Imported models

If you import your own ONNX model, you are responsible for honoring its license. Vapourkit does not enforce or validate model licensing on import.

## Vapourkit itself

The Vapourkit application is licensed **GPL 3.0**.
