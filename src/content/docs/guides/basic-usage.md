---
title: Everyday Processing
description: Output, preview, and backend choices for a normal processing run.
---

This page explains the controls around the main three-step workflow. For the shortest path, start with [Process Your First Video](/first-upscale).

## Choose an inference backend

The backend menu only shows options supported by your operating system. Most people can leave it on the default:

- Windows: TensorRT, DirectML, and NCNN Vulkan.
- Linux: NCNN Vulkan, plus TensorRT when a compatible NVIDIA CUDA/TensorRT stack is installed.

See [How Vapourkit Works](/how-it-works) if you want to understand the differences.

## Configure output

In the **Output** panel, choose the container, save path, codec, pixel format, and encoding options.

You can click **Validate** first to process a short test segment, or **Preview** to open the current script in `vs-view` without creating the final output.

Linux shows the curated filter catalog installed and verified for Linux. If a workflow contains a filter that depends on a Windows-only binary or unavailable native plugin, replace it with a filter shown in the Linux filter picker.

## Preview and compare

After processing finishes:

- **Compare** launches the side-by-side viewer with the source and output aligned frame by frame.
- **Open Folder** opens the output directory.

On Linux, the comparison viewer is optional and must be installed separately as the `video-compare` command. See [Linux Setup & Troubleshooting](/reference/linux).
