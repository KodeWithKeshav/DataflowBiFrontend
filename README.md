# DataFlow AI — Frontend (Demo)

This is a demo React frontend for the DataFlow AI concept. It uses a blue & white theme and dummy data to demonstrate a dynamic dashboard with KPIs and charts.

Quick start:

1. Install dependencies

```bash
npm install
```

2. Run dev server

```bash
npm run dev
```

Open http://localhost:3000

This demo uses Vite + React + Recharts and local dummy data in `src/data/dummy.js`.

Exporting charts to PDF
-----------------------

Click the "Export PDF" button in any chart card header to download a PDF of that chart. This feature uses `html2canvas` and `jspdf` — install dependencies with `npm install` before running.
