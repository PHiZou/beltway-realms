## Beltway Realms – Web MVP

This repository contains a small, local-only web app called **Beltway Realms** – a game-inspired portfolio set in a parchment-style fantasy / cyberpunk reinterpretation of Northern Virginia and Washington, D.C.

- Frontend: React + TypeScript + Vite
- Routing: `react-router-dom`
- Persistence: local state + `localStorage`
- Backend: **none** (no auth, no database, no API)

### Getting started

From the project root:

1. Move into the client app:
   - `cd client`
2. Install dependencies:
   - `npm install`
3. Run the dev server:
   - `npm run dev`
4. Open the printed URL (usually `http://localhost:5173`) in your browser.

### Key screens

- **Landing / intro screen** – explains the Beltway Realms concept and how to use the prototype.
- **World map screen** – shows the parchment-style map and lets you pick a region.
- **Region page** – describes a realm and lists its quests.
- **Card table / encounter** – provides a small hand of cards and a d20 roller for story encounters.
- **Quest detail / lore panel** – shows a lore entry you can expand into a full case study or story.

All core game/portfolio content is stored as simple TypeScript data under `client/src/data/`, making it easy to extend or reskin later.

# The Beltway Realms (RPG Portfolio)

A game-inspired Astro + React app that turns a portfolio into a parchment overworld of Northern Virginia + Washington, D.C.

## Run locally

```bash
npm install
npm run dev
```

Open:
- http://localhost:4321/game/map

## What’s included (MVP)
- World map (SVG) with responsive clickable regions
- Region pages with crest panel + lore + nearby routes + quest list
- Quest pages rendered from Markdown with completion + XP
- Save state in localStorage (discovery + completions + XP)

## Cursor IDE workflow
1) Download and unzip this project
2) Open the folder in Cursor (File → Open Folder)
3) In Cursor terminal:
   - `npm install`
   - `npm run dev`
4) Start editing:
   - Map JSON: `src/data/map.nova-dc.json`
   - Quests: `src/content/quests/*.md`
   - UI: `src/pages/game/*` and `src/components/game/*`

## Next upgrades
- Interactive skill tree (graph layout + unlock visualization)
- Completed badges on region quest list
- Boss pages
- AI companion ("Atlas") with portfolio-aware chat
