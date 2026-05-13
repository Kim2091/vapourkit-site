---
title: Templates & Workflows
description: Save, share, and restore filter configurations and full processing pipelines.
---

Vapourkit has two reusable artifacts:

- **Filter templates** (`.vkfilter`) — a single filter you've configured and saved.
- **Workflows** (`.vkworkflow`) — a complete processing pipeline: filters, model, settings.

## Working with workflows

### Export a workflow

1. Configure your complete processing pipeline (filters, model, settings).
2. Click the **Upload** icon in the header.
3. Choose the save location for the `.vkworkflow` file.

### Import a workflow

1. Click the **Download** icon in the header.
2. Select a `.vkworkflow` file.
3. All settings are restored.

> Note: model paths inside a workflow must be valid on the loading machine, or the workflow will fail to apply.

### Load a workflow

Click the **folder** icon in the header to *temporarily load* a workflow. Loading completely replaces your current configuration with the saved pipeline; unlike Import, the loaded workflow isn't merged into your current state.

## Filter templates

A filter template is a single `.vkfilter` file — useful for reusing a specific configured filter across many workflows. See [Custom Filters](/guides/custom-filters) for creating them.

## File formats

- `.vkfilter` — TOML-formatted single-filter definition.
- `.vkworkflow` — TOML-formatted full workflow.

See [File Formats](/reference/file-formats) for the full schema.
