# Portland Civic Front Door — Master Spec

## What this is
A web app that makes civic engagement in Portland, Maine as accessible as possible.
It is **NOT** a replacement for the city's existing systems — it's a friendly, unified
layer that routes residents to the right service in plain language and surfaces public
tools people don't know exist.

## Stack (use exactly this unless told otherwise)
- Next.js (App Router) + TypeScript
- Tailwind CSS for styling; clean, modern, high-contrast, mobile-first, accessible (WCAG AA)
- Data: static curated JSON/Markdown in the repo for content; live fetches for city APIs where available
- No auth for v1. No database for v1 — file-based content is fine.

## Design principles
- Plain language over bureaucratic jargon
- Every answer ends with a clear next action (a link or form)
- Fast
- Works on a phone
- Readable by someone stressed and in a hurry

## Feature pillars (build incrementally, in this order)
1. **Ask & Route** — plain-language "What do you need?" box → explains the issue, names
   the responsible department, links to the right existing portal.
2. **Underutilized public tools** — a discoverable directory of public resources
   residents don't know about.
3. **Report & Track** — cleaner wrapper over SeeClickFix 311 with a map.
4. **Permits, demystified** — "do I even need a permit?" guide that deep-links into the
   city's portal.
5. **Meetings & reps** — plain-English meeting agendas + address-based lookup of your
   reps/districts.

## Rules for the model
- Follow the stack above.
- Build one feature at a time.
- Use real field names from any data source given; if a source is unknown, list
  assumptions rather than inventing endpoints.
- End each response by telling the user what to test.
