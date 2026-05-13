# PT Analytics Dashboard

Browser-only dashboard for analyzing learner progress from a weekly Excel report.

The user uploads a `.xlsx` file locally in the browser. The app validates required columns, parses the first suitable sheet, normalizes report data, and renders:

- KPI summary for listeners.
- Listeners table sorted by progress.
- Closed/risk row highlighting with text badges.
- Materials matrix with per-listener progress and average progress by material.
- Resizable columns in both tables.

Uploaded report data is processed on the client side and is not sent to a backend.

## Tech Stack

- Vite
- React
- JavaScript
- Tailwind CSS
- SheetJS `xlsx`
- Vitest

## Architecture

The project uses Feature-Sliced Design:

- `src/app` - app shell, global styles, top-level composition.
- `src/pages` - screen-level components.
- `src/widgets` - dashboard blocks: upload panel, KPI cards, tables.
- `src/features` - user actions: upload report and replace report.
- `src/entities` - domain logic for reports, listeners, and materials.
- `src/shared` - reusable UI components and utility libraries.

Core patterns:

- Pure functions for domain rules and calculations.
- Excel parsing isolated in an adapter.
- Config-driven column aliases and status rules.
- React UI works with normalized domain models.
- Reusable table column resizing logic.

## CLI Commands

Install dependencies:

```bash
npm install
```

Start local development server:

```bash
npm run dev
```

Run unit tests:

```bash
npm test
```

Build production bundle:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

## Definition Of Done

For code changes, run:

```bash
npm test
npm run build
```

The change is ready when tests pass and the production build completes.

