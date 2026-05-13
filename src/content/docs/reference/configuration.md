---
title: Configuration
description: Where Vapourkit stores its config, models, filter templates, and workflows.
---

## App configuration

- **App config:** `data/config/app-config.json` — user preferences and model metadata.

## Filter templates

- **Location:** `data/config/filter-templates/`
- **Format:** `.vkfilter` (TOML)

See [File Formats](/reference/file-formats) for the schema.

## Workflows

- **Location:** wherever you save them — the workflow Export dialog asks for a path.
- **Format:** `.vkworkflow` (TOML)

## Models

- **Built-in:** `include/models/` inside the Vapourkit install
- **User-imported:** `data/models/`
- **Formats:**
  - `.onnx` — universal, runs on any supported backend
  - `.engine` — NVIDIA TensorRT engine, GPU- and driver-bound

See [Custom ONNX Models](/models/custom-onnx) for importing your own.
