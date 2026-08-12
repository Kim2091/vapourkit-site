---
title: Configuration
description: Where Vapourkit stores its configuration, models, filter templates, and workflows.
---

Vapourkit keeps user data under its application data directory. The exact root depends on the platform:

- **Windows:** a `data/` directory beside the installed executable.
- **Linux:** `~/.config/vapourkit-gui/data/` for packaged AppImage builds.

## App configuration

- **App config:** `data/config/app-config.json` - user preferences, model metadata, and encoding settings.
- **Filter templates:** `data/config/filter-templates/` - `.vkfilter` files copied from the bundled catalog or created by the user.
- **Queue:** stored in the application data directory and managed by the Queue pane.

## Workflows

Workflows are saved wherever you choose them through the **Export** dialog.

- **Format:** `.vkworkflow` (TOML)
- **Contents:** filters, model settings, backend, output settings, segment selection, and colorimetry settings

See [Templates & Workflows](/guides/templates-workflows) and [File Formats](/reference/file-formats).

## Models

- **Runtime location:** `data/models/`
- **Bundled models:** copied there during first-run setup
- **Imported models:** added there by the **Import Custom Model** flow
- **`.onnx`:** source model used directly by DirectML and NCNN Vulkan, or used to build a TensorRT engine
- **`.engine`:** GPU- and driver-specific TensorRT engine

The AppImage itself is read-only, so Linux stores writable application data outside the mounted image.
