# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start Vite dev server
npm run build        # tsc + vite build
npm run test         # Run all tests once (Vitest)
npm run test:watch   # Vitest in watch mode
npm run typecheck    # tsc type-check only (no emit)
npm run lint         # ESLint
```

Run a single test file: `npx vitest run src/lib/locationLabel.test.ts`

## Architecture

**Single-page front-end prototype.** No router, no backend, no network calls. All state lives in `HomePage` and flows down as props — no global store.

```
App → HomePage (state owner)
         ├── HeaderShell → CombinedSearchBar
         ├── CategoryTabBar
         ├── MainContentShell → IconGrid
         └── LocationModal (portaled)
```

**Layout contract:** Everything sits inside `.app-container` (defined in `src/index.css`): `max-width: 768px`, `margin: 0 auto`, `padding: 0 24px`. Do not break this constraint.

**Data flow:**
- Taxonomy: `craigslist_taxonomy.json` (read-only) → `src/data/taxonomy.ts` (validated exports)
- Tab → sections: `src/data/tabMapping.ts` — `getItemsForTab(activeTab)` returns flat `{ item, sectionId }[]`
- Search filtering: `itemMatchesQuery` / `filterSectionsByQuery` from `src/lib/searchTaxonomy.ts`
- Location label: `computeHeaderLocationLabel(...)` from `src/lib/locationLabel.ts` (derived, not stored)
- Category icons: `getCategoryIconUrl(sectionId, itemId)` from `src/utils/categoryIcons.ts`

**State in HomePage** (the only stateful component):
`selectedCities`, `radiusMiles`, `hasEditedRadius`, `isLocationModalOpen`, `headerSearchQuery`, `modalCityQuery`, `activeTab`

## Key Conventions

**Design system** (`design_system.md`) is the source of truth for all tokens. Important ones:
- Link blue: `#0020E5`, visited purple: `#800080`
- Subtle bg/hover fill: `#EEEEEE`, border default: `#EEEEEE`, border lighter: `#D0D0D0`
- Text primary: `#191919`, text secondary / icons: `#727272`
- Motion fast: 100ms, default: 200ms; easing: `cubic-bezier(0.16, 1, 0.3, 1)` (hover), `cubic-bezier(0.4, 0, 0.2, 1)` (open/close)
- No pill buttons, no drop shadows, no focus rings, no decorative imagery

**`cursor_implementation_spec.md`** has full acceptance criteria and edge-case contracts (especially for `CombinedSearchBar` expand/collapse, hover layers, and `LocationModal`). Read it before touching those components.

**`sprint9_redesign.md`** covers `CombinedSearchBar`, `CategoryTabBar`, and `IconGrid` specs (the most recently redesigned components).

**`craigslist_taxonomy.json` is read-only.** Modify `src/data/taxonomy.ts` or `src/data/tabMapping.ts` for category/tab changes.

## Testing

Tests use Vitest + React Testing Library. Test files live alongside source (`*.test.ts` / `*.test.tsx`). Canvas APIs are stubbed in jsdom — see `src/test/setup.ts` or vitest config if adding canvas-dependent tests. Use `measureTextOverride` prop on components that call `computeHeaderLocationLabel` in tests.
