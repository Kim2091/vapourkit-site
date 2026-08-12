---
title: Building from Source
description: Build Vapourkit locally from the GitHub repository.
---

## Prerequisites

- Node.js and npm
- A checkout of the Vapourkit repository

## Setup

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build the application
npm run build

# Build the Windows installer
npm run build:setup

# Build the Windows portable archive
npm run build:7z

# Build the Linux x86_64 AppImage
npm run build:linux
```

Build artifacts are written to `release/`.

## Project layout

- `src/` - React/TypeScript renderer
- `electron/` - Electron main process
- `include/` - bundled models, plugins, scripts, and filter templates
- `scripts/` - build and maintenance scripts

Documentation is maintained in the separate [vapourkit-site repository](https://github.com/Kim2091/vapourkit-site).
