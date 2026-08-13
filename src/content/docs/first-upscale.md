---
title: Process Your First Video
description: Load a video, choose a model or filter, and process the result.
---

This is the normal Vapourkit workflow. You can start with an AI model, a filter, or both.

## 1. Load a video

Drop a video into the **Source** panel, or click the panel to browse for a file.

## 2. Choose a model or filter

Choose an upscaling model in the model filter, or click **+ Add Filter** to add a filter from the catalog. You can use either one by itself or combine them in the order you want.

See [Choose a Model](/models/included) for the models that ship with Vapourkit. You can always change the filter chain later.

## 3. Process the video

In the **Output** panel, choose a save location and container. Vapourkit supports MKV, MP4, MOV, and AVI.

Click **Start processing**. The **Preview** panel updates while Vapourkit works.

## Review the result

When processing finishes, click **Compare** to open the side-by-side viewer, or **Open Folder** to find the output file.

On Linux, **Compare** requires the optional `video-compare` command to be installed separately.

## Want more control?

- [Process Multiple Videos](/guides/batch-processing) with the queue.
- [Save and Reuse Workflows](/guides/templates-workflows) for repeatable settings.
- [Add Filters](/guides/custom-filters) for more control over the image.
- [Use Your Own Model](/models/custom-onnx) to import an ONNX model.
