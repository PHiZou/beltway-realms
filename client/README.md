## Beltway Realms – Client (MVP)

This folder contains the React + TypeScript + Vite frontend for **Beltway Realms**, a game-inspired portfolio set in a parchment-style fantasy / cyberpunk reinterpretation of Northern Virginia and Washington, D.C.

The MVP is intentionally small and modular:

- **No backend, no auth, no database** – everything is local-only.
- **Local state + `localStorage`** for lightweight persistence.
- **Simple routing** with `react-router-dom`.
- **Data-first architecture** – regions, quests, cards, and lore live in `src/data/`.

### Running the client locally

- **Install dependencies** (from the project root or this folder):
  - `cd client`
  - `npm install`
- **Start the dev server**:
  - `npm run dev`
- Open the printed URL (usually `http://localhost:5173`) in a browser.

### Key screens

- **Landing / Intro** – `src/pages/LandingPage.tsx`
- **World map** – `src/pages/WorldMapPage.tsx`
- **Region page** – `src/pages/RegionPage.tsx`
- **Card table / encounter** – `src/pages/EncounterPage.tsx`
- **Quest detail / lore panel** – `src/pages/QuestDetailPage.tsx`

### Data and core types

- **Shared types** – `src/types.ts`
- **Regions** – `src/data/regions.ts`
- **Quests** – `src/data/quests.ts`
- **Cards** – `src/data/cards.ts`
- **Lore entries** – `src/data/lore.ts`

You can extend the world by adding new entries to these files and wiring them together via IDs.

### Game state and persistence

- **Game state context** – `src/state/GameStateProvider.tsx`
  - Tracks the current region, active quest, and last d20 roll.
  - Persists to `localStorage` under the key `beltway-realms-state-v1`.

### UI building blocks

- **Layout + global styles** – `src/App.tsx`, `src/App.css`, `src/index.css`
- **Card rendering** – `src/components/CardView.tsx`
- **d20 dice roller** – `src/components/DiceRoller.tsx`

The visual style is designed to be easy to reskin: most theming lives in `App.css` and `index.css`, and data is cleanly separated from components.

