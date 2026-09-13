# AGENT instructions — quick orientation for automated coding agents

This repository is an Angular (v20) Single Page Application with Server-Side Rendering (Angular Universal). This file is a compact, action-oriented guide for automated agents (and humans using them) to make safe, correct edits quickly.

- Architecture summary
  - Frontend: Angular app in `src/` (browser entry: `src/main.ts`).
  - SSR: `@angular/ssr` with server bootstrap at `src/main.server.ts` and an Express server in `server.ts` that serves `dist/u-kirche/browser` and `dist/u-kirche/server` at runtime.
  - Build output: `dist/u-kirche` (see `angular.json` -> `outputPath`).
  - State: feature-scoped NgRx under `src/app/features/*/store` (look for `*.actions.ts`, `*.effects.ts`, `*.reducer.ts`, `*.select.ts`, `*.state.ts`).
  - Services: HTTP clients in `src/app/services/api/*.ts`. Providers and interceptors under `src/app/services/providers`.

- Key files to consult before editing
  - `package.json` — npm scripts (dev server, builds, deploys, e2e).
  - `angular.json` — build/serve/ssr configurations and environment file replacements.
  - `server.ts` — Express SSR server (CommonEngine) and static serving behavior.
  - `src/main.server.ts` — Angular SSR bootstrap.
  - `src/environments/*` — environment-specific values (API_URL, flags).
  - `src/assets/i18n/*.json` — translations (de.json, ru.json, ua.json).

- Project conventions (follow these exactly)
  - Feature-first layout: add new pages/components under `src/app/features/<feature>/` and mirror the existing `store/` pattern for NgRx.
  - API naming: services follow `*-api.service.ts`. Put new HTTP clients in `src/app/services/api/` and wire providers in `src/app/services/providers` when necessary.
  - Auth: reuse `auth-interceptor.provider.ts` for auth headers; check `src/app/services/guards` for route guard patterns.
  - Styles: SCSS with shared includes under `src/assets/styles` (see `angular.json` -> `stylePreprocessorOptions`). Use component-level SCSS and import variables/mixins.
  - Routing: top-level `src/app/app.routes.ts` plus feature `*.routes.ts`. Prefer registering routes inside the feature `index.ts` if present.

- Common tasks + exact files/commands
  - Start dev server (local): `npm start` (uses `ng serve`, defaultConfiguration `local` per `angular.json`).
  - Dev build: `npm run build:dev` (uses `development` config).
  - Prod build: `npm run build:prod` (uses `production` config and file replacements).
  - Serve SSR build: `npm run serve:ssr:u-kirche` (runs `node dist/u-kirche/server/server.mjs`).
  - E2E tests: `npm run test:e2e` (Playwright; `playwright.config.ts`).
  - Deploy: `npm run deploy:dev` / `npm run deploy:prod` (invokes Firebase CLI; check `firebase.json`).

- Integration points
  - Firebase hosting/functions: environment mappings live in `src/environments/*`. Check `firebase.json` and deploy scripts when changing hosting or cloud functions.
  - Playwright: E2E tests in `tests/` and configuration in `playwright.config.ts`.
  - UI libs: PrimeNG, PrimeFlex, and PrimeIcons are used; test styles in `angular.json` test configuration.

- Concrete examples
  - Change API base URL: edit `src/environments/environment.dev.ts` (and other envs) and validate usage in `src/app/services/api/*`.
  - Add a new NgRx feature: copy `src/app/features/home/store/` pattern (actions, effects, reducer, select, state) and register it inside the feature folder.
  - Adjust SSR rendering or providers: edit `src/main.server.ts` or `server.ts`. The Express server uses `CommonEngine` and `index.server.html` for rendering.

- Guardrails (do not do these)
  - Never edit built artifacts: do not commit changes in `dist/` or `.angular/cache/`.
  - Avoid global refactors that bypass feature boundaries; prefer localized, feature-scoped changes.
  - When adding runtime environment values, update `src/environments/*` and `angular.json` file replacements.

If you want CI/CD or secret-handling specifics added (workflow names, where deploy tokens live), tell me and I'll scan `.github/workflows/` and extend this doc.
