---
title: Building from Source
description: Build Vapourkit locally from the GitHub repository.
---

## Prerequisites

- Node.js 18+
- npm or yarn

## Setup

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build application
npm run build

# Build Windows installer (NSIS)
npm run build:setup

# Build portable 7z
npm run build:7z
```

Build artifacts land in the `release/` directory.

## Project layout

- `src/` — React/TypeScript renderer
- `electron/` — Electron main process
- `include/` — bundled assets (models, plugins, scripts)
- `scripts/` — build and maintenance scripts
- `docs/` — Markdown documentation (the source for this site)
