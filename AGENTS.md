# AGENTS.md

## Project Overview

This project is a browser-only Excel analytics dashboard for weekly learner progress reports.

The application lets a user upload a `.xlsx` report locally in the browser and displays:

- KPI summary for all learner rows.
- A listeners table sorted by overall progress.
- Conditional row status for closed access and risk cases.
- A materials matrix with per-learner progress and average progress per material.

The app must not send uploaded Excel data to a server or store source report data in `localStorage`.

## Stack

- Vite
- React
- JavaScript modules
- Tailwind CSS
- SheetJS `xlsx`
- Vitest

## Architecture

The codebase follows a pragmatic Feature-Sliced Design structure:

- `src/app` contains the application shell, global styles, and top-level composition.
- `src/pages` contains route-level screens: listeners and materials matrix.
- `src/widgets` contains larger UI blocks such as KPI cards and tables.
- `src/features` contains user actions such as uploading and replacing a report.
- `src/entities` contains domain rules for reports, listeners, and materials.
- `src/shared` contains reusable UI and low-level utilities.

Important architectural patterns:

- Pure domain functions for parsing, normalization, KPI calculation, material extraction, matrix building, and row-state detection.
- Excel parsing isolated behind `shared/lib/excel/parseWorkbook.js`.
- Column aliases and closed-status rules are configuration, not embedded in UI.
- UI components consume normalized domain objects, not raw Excel workbook structures.
- Resizable table behavior is reusable via `shared/lib/table/useResizableColumns.js` and `shared/ui/Table/ResizableHeaderCell.jsx`.

## Development Rules For Agents

- Keep business rules out of React components when practical.
- Prefer extending existing pure functions and configs before adding new UI-specific logic.
- Preserve duplicate learner rows; never merge rows by name or email.
- Treat uploaded files as private local data.
- Do not add backend, API calls, report persistence, or authentication unless explicitly requested.
- Keep table layout stable: wide tables should scroll horizontally, and text should not overlap.
- When changing parser behavior, update or add Vitest coverage for the affected rule.

## Definition Of Done

Before finishing a change, run:

```bash
npm run check
npm test
npm run build
```

Expected result:

- Biome check passes without diagnostics.
- All Vitest tests pass.
- Vite production build completes successfully.
- Existing Vite chunk-size warning caused by `xlsx` is acceptable unless the task specifically targets bundle optimization.
