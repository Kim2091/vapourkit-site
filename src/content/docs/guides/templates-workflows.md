---
title: Save & Reuse Workflows
description: Save, share, and restore your processing setup.
---

Vapourkit has two reusable artifacts:

- **Filter templates** (`.vkfilter`) - a single filter you've configured and saved.
- **Workflows** (`.vkworkflow`) - a complete processing pipeline, including filters, model, and settings.

## Working with workflows

### Export a workflow

1. Configure the processing pipeline you want to save.
2. Click **Export** in the **Workflow** controls at the top of the app.
3. Choose where to save the `.vkworkflow` file.

Exported workflows include enabled filters, model settings, backend, output settings, segment selection, and colorimetry settings. Model references are stored in a portable form when possible.

### Import filters from a workflow

1. Click **Import** in the **Workflow** controls.
2. Select a `.vkworkflow` file.
3. Choose the filters you want in the import dialog, then confirm.

Import adds selected filters to the current chain. It does not replace the current workflow or output settings.

### Open a workflow

1. Click **Open** in the **Workflow** controls.
2. Select a `.vkworkflow` file.

Open temporarily applies the workflow to the app. Click **Clear workflow** beside the active workflow name to restore the settings that were active before it was opened.

If a workflow refers to a model that is not installed on the current machine, the affected model filter must be reconfigured.

## Filter templates

A filter template is a single `.vkfilter` file - useful for reusing one configured filter across many workflows. See [Add Filters](/guides/custom-filters) for creating them.

## File formats

- `.vkfilter` - TOML-formatted single-filter definition.
- `.vkworkflow` - TOML-formatted full workflow.

See [File Formats](/reference/file-formats) for the format details.
