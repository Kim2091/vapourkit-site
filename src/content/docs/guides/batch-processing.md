---
title: Batch Processing
description: Queue multiple videos and process them sequentially.
---

Process multiple videos in a queue, each with its own settings captured at the time you select it.

## How it works

1. **Select multiple videos.** Click *Select Video* and choose multiple files.
2. **Configure.** Review the list, adjust output paths if needed.
3. **Add to queue.** Click *Add Videos to Queue*.
4. **Process.** Click *Start Queue* — videos process one at a time.

## Simple mode

Process multiple videos with the same upscaling model.

1. Select your upscaling model.
2. Choose output format and backend.
3. Select multiple videos.
4. Review output paths in the modal.
5. Click *Add Videos to Queue*.
6. Click *Start Queue*.

## Custom filter chains

Process videos with custom filter chains.

1. Enable filter mode (click the `<>` icon).
2. Build your filter pipeline — add and configure filters, optionally add AI models.
3. Choose output format and backend.
4. Select multiple videos.
5. Review the workflow summary and output paths.
6. Click *Add Videos to Queue*.
7. Click *Start Queue*.

## Key features

- **Workflow snapshots.** Each video captures your settings at selection time. Changing settings later won't affect queued videos.
- **Auto paths.** Output paths are auto-generated with the `_upscaled` suffix (e.g. `video.mp4` → `video_upscaled.mkv`). Existing files are overwritten without warning.
- **Queue management.** Reorder by dragging, cancel items, requeue failed videos, or clear completed items.
- **Persistent.** The queue saves automatically across sessions.

## Tips

- **Test first.** If processing multiple videos with the same workflow, always test one video before processing the rest.
- **Check paths.** Review output paths before confirming — existing files are overwritten without warning.
