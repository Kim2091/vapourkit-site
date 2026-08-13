---
title: Choose a Model
description: Choose an AI model that fits your video.
---

Vapourkit ships several model families. Choose one based on the kind of video you are processing; the exact filenames and metadata are maintained in the desktop repository's bundled model configuration.

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

## Backend compatibility

The included ONNX models can be used with the backend available for your platform:

| Backend | Platform | Model behavior |
| --- | --- | --- |
| TensorRT | Windows and Linux NVIDIA systems | Builds a GPU-specific engine on first use; later runs reuse it. |
| DirectML | Windows | Runs the ONNX model directly on a DirectX 12 GPU. |
| NCNN Vulkan | Windows and Linux | Runs the ONNX model directly through Vulkan. |

The model, output resolution, precision, and inference stream count all affect memory use. The 6 GB VRAM recommendation is a starting point rather than a guarantee; reduce streams or process at a lower resolution when a model runs out of memory. TensorRT engines are tied to the GPU and software environment that built them.

## Model support

Vapourkit supports models accepted by `vs-mlrt`, subject to the selected backend's requirements. See the [vs-mlrt wiki](https://github.com/AmusementClub/vs-mlrt/wiki) for model-specific details.

For licensing information, see [Model Licensing](/models/licensing). Check the license of any model before redistributing it.

## Where models live

At runtime, bundled and imported models are stored in `data/models/` under Vapourkit's application data directory. On Linux, the default data directory is under `~/.config/vapourkit-gui/data/`.

For bringing your own model, see [Use Your Own Model](/models/custom-onnx).
