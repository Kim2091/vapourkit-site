---
title: Custom ONNX Models
description: Import your own ONNX models into Vapourkit.
---

Use the **Import Custom Model** action in Vapourkit to add an ONNX model:

1. Choose the `.onnx` file.
2. Enter the model name shown in the model picker.
3. Select the model type: **Image** or **VSR**.
4. Choose the inference backend and precision options shown for that backend.
5. Click **Import Model**.

Imported models are stored in Vapourkit's `data/models/` directory and appear in the model picker after import.

## Backend behavior

- **TensorRT** compiles the ONNX model into a GPU-specific `.engine` file. The build options include precision and input-shape settings.
- **DirectML** runs the ONNX file directly on Windows.
- **NCNN Vulkan** runs the ONNX file directly through Vulkan on Windows or Linux.

TensorRT engine files are tied to the GPU and driver environment that built them. Keep the original ONNX file if you may need to rebuild the engine or use the model with another backend.

## Supported architectures

Vapourkit supports model architectures accepted by `vs-mlrt`, subject to the selected backend. See the [vs-mlrt model documentation](https://github.com/AmusementClub/vs-mlrt/wiki).

## Finding models

[OpenModelDB](https://openmodeldb.info/) is a community catalog of image and video restoration models.

## Licensing

Check the license of any model you import. See [Licensing](/models/licensing) for the licenses of Vapourkit's bundled models.
