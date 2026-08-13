---
title: Process Multiple Videos
description: Queue multiple videos and process them one after another.
---

Process multiple videos in the **Queue** pane. Each item keeps the workflow that was selected when it was added.

## Add videos to the queue

1. Configure the model, filters, backend, and output settings you want to use.
2. Drop multiple videos into the **Source** panel, or click it and select several files.
3. Vapourkit adds the files directly to the queue and opens the **Queue** pane.
4. Review the generated output names. Select a queue item to inspect or edit its workflow if needed.
5. Click **Start queue**.

When the queue is open, adding a single video also adds it as a queue item instead of replacing the current source.

## Queue behavior

- **Workflow snapshots.** Each item stores its model, filters, backend, output settings, and segment selection when it is added. Later UI changes do not affect existing items.
- **Sequential processing.** The queue processes one pending item at a time.
- **Output names.** Descriptive naming is enabled by default. Generated names use tags such as `-4x`, `-denoise`, `-resize1080`, or `-processed`, depending on the workflow.
- **Queue management.** Reorder pending items, duplicate an item, cancel processing, retry completed or failed items, open an item's output folder, or clear finished items.
- **Persistence.** The queue is saved automatically and restored when Vapourkit starts.

## Tips

- Test one video first, especially when using a new model or filter chain.
- Check each output path before starting the queue.
- Use **Clear done** to remove completed and failed items while keeping pending work.
