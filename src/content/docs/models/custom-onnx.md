---
title: Use Your Own Model
description: Import your own ONNX model into Vapourkit.
---

Use the **Import Custom Model** action in Vapourkit to add an ONNX model:

1. Choose the `.onnx` file.
2. Enter the model name shown in the model picker.
3. Select the model type: **Image** or **VSR**.
4. Choose the inference backend and precision options shown for that backend.
5. Click **Import Model**.

Imported models are stored in Vapourkit's `data/models/` directory and appear in the model picker after import.

## Backend behavior

| Backend | Platform | Build behavior | Input file |
| --- | --- | --- | --- |
| TensorRT | Windows and Linux NVIDIA systems | Compiles a GPU-specific `.engine`; first use may take several minutes. | ONNX source is retained for rebuilding. |
| DirectML | Windows | No engine build. | ONNX file directly. |
| NCNN Vulkan | Windows and Linux | No engine build. | ONNX file directly. |

On Linux, TensorRT also requires a compatible NVIDIA CUDA/TensorRT stack on the host.

TensorRT engine files are tied to the GPU and driver environment that built them. Keep the original ONNX file if you may need to rebuild the engine or use the model with another backend.

## Supported architectures

Vapourkit supports model architectures accepted by `vs-mlrt`, subject to the selected backend. See the [vs-mlrt model documentation](https://github.com/AmusementClub/vs-mlrt/wiki).

## Finding models

[OpenModelDB](https://openmodeldb.info/) is a community catalog of image and video restoration models.

## Licensing

Check the license of any model you import. See [Model Licensing](/models/licensing) for the licenses of Vapourkit's bundled models.
