---
title: Batch Processing
description: Queue multiple videos and process them sequentially.
---

Process multiple videos in a queue, each with its own settings captured at the time you select it.

## How it works

1. **Add multiple videos.** Drop multiple files into the *Input Video* panel, or click to browse and select more than one.
2. **Configure.** Review the list, adjust output paths in the modal if needed.
3. **Add to queue.** Click *Add {N} Video(s) to Queue*.
4. **Process.** Click *Start Queue* — videos process one at a time.

## Same model, many videos

The common case: upscale multiple videos with the same model and settings.

1. Select your upscaling model.
2. Choose output format and backend.
3. Add multiple videos via the *Input Video* panel.
4. Review output paths in the modal.
5. Click *Add Videos to Queue*.
6. Click *Start Queue*.

## With custom filters

If your pipeline includes filters, configure them once and they apply to every queued video.

1. Build your filter pipeline in the filter panel — add filters, optionally add an AI upscaling model.
2. Choose output format and backend.
3. Add multiple videos.
4. Review the workflow summary and output paths.
5. Click *Add Videos to Queue*.
6. Click *Start Queue*.

## Key features

- **Workflow snapshots.** Each video captures your settings at selection time. Changing settings later won't affect queued videos.
- **Auto paths.** Output paths are auto-generated with the `_upscaled` suffix (e.g. `video.mp4` → `video_upscaled.mkv`). Existing files are overwritten without warning.
- **Queue management.** Reorder by dragging, cancel items, requeue failed videos, or clear completed items.
- **Persistent.** The queue saves automatically across sessions.

## Tips

- **Test first.** If processing multiple videos with the same workflow, always test one video before processing the rest.
- **Check paths.** Review output paths before confirming — existing files are overwritten without warning.
