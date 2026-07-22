# Portland Civic Front Door

A friendly, plain-language guide that helps residents of **Portland, Maine** find the
right city service fast. It is **not** an official city website and **not** a
replacement for the city's systems — it's a unified front door that explains things in
plain English and links out to the real, existing city services.

> ⚠️ Unofficial. Always confirm details with the City of Portland ([portlandmaine.gov](https://www.portlandmaine.gov/)).

## Features

Six sections, all reachable from the top navigation:

| Route | What it does |
|-------|--------------|
| `/ask` | Type a problem in plain words → get the responsible department + a direct link (keyword matcher, runs in the browser) |
| `/tools` | Searchable/filterable directory of underused public resources (tool library, museum passes, EV chargers, community gardens…) |
| `/report` | Recent 311 issues on a Leaflet + OpenStreetMap map, plus a deep link to report a new one (SeeClickFix) |
| `/permits` | "Do I even need a permit?" guide → verdict, checklist, timeline, and a link to the city's permit portal |
| `/meetings` | Upcoming City Council & board meetings in plain English, with how/when to submit public comment |
| `/reps` | Address lookup → your councilor, school board rep, state legislators, polling place, and trash day |

## Tech stack

- **Next.js (App Router) + TypeScript**
- **Tailwind CSS** with a small custom design system (`src/app/globals.css`)
- **react-leaflet + OpenStreetMap** for the map
- No database and no auth. Content is curated **static JSON** in `data/`.

## Data & data sources

All content lives in `data/` so it can be edited without touching code:

| File | Powers | Status |
|------|--------|--------|
| `data/services.json` | `/ask` routing | Curated, real city links |
| `data/public-tools.json` | `/tools` | Curated, real links |
| `data/sample-issues.json` | `/report` map | **Mock** — mirrors the SeeClickFix v2 `/issues` shape |
| `data/permits.json` | `/permits` | Curated guidance (not an official determination) |
| `data/meetings.json` | `/meetings` | **Sample** — a live version can pull from Portland's CivicClerk feed |
| `data/districts.json` | `/reps` | **Sample stub** — a live version should geocode + query Portland's ArcGIS district services |

Files marked **mock/sample** render with an on-page banner and note where a live data
source could plug in later. `/ask` runs a local keyword matcher (no external API, no
cost). `/report` and `/reps` are intentionally offline stubs for v1.

## Getting started

Requires **Node.js 18.18+** (built on Node 20/22/26).

```bash
npm install
npm run dev
```

Then open http://localhost:3000 (it redirects to `/ask`).

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Project structure

```
data/                 # curated/sample content (edit these to change the site)
src/
  app/
    ask/  tools/  report/  permits/  meetings/  reps/   # one folder per section
    layout.tsx        # shared header, footer, fonts
    globals.css       # design system (light-only civic theme)
  components/          # Header, Footer
  lib/                 # typed loaders + logic for each section
```

## Roadmap / where to go live

- `/report`: swap the mock loader in `src/lib/issues.ts` for a fetch of the SeeClickFix
  v2 endpoint (`https://seeclickfix.com/api/v2/issues?place_url=portland_2`, keyless) and
  flip `IS_MOCK` off — the UI already speaks that field shape.
- `/reps`: replace the keyword stub with a geocode + ArcGIS district query.
- `/meetings`: pull from Portland's CivicClerk agenda feed instead of the sample JSON.

## Disclaimer

This project is independent and unofficial. Content is provided as guidance only.
Verify anything important with the City of Portland before relying on it.
