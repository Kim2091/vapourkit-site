---
title: Custom ONNX Models
description: Import your own ONNX models into Vapourkit.
---

Vapourkit supports any model that `vs-mlrt` supports. To use your own:

1. Place the `.onnx` file in `data/models/` inside your Vapourkit install directory.
2. Restart Vapourkit (or reload models from the menu).
3. Your model appears in the model picker.

## Supported architectures

Anything `vs-mlrt` accepts. See [vs-mlrt model documentation](https://github.com/AmusementClub/vs-mlrt/wiki).

## TensorRT engines

For NVIDIA users, Vapourkit can compile your ONNX model into a TensorRT engine (`.engine` file) for faster inference. This step is GPU- and driver-specific — you can't share `.engine` files across machines.

## Finding models

[OpenModelDB](https://openmodeldb.info/) is the most active community catalog.

## Licensing

Check the license of any model you import — most community models are CC BY-NC-SA. See [Licensing](/models/licensing).
