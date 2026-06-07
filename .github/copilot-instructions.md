## Quick orientation for AI coding agents

This repository is an Angular (v20) Single Page Application with Server-Side Rendering (Angular Universal). Use this file to get productive quickly. Keep edits concise and reference files below when making suggestions or edits.

- Architecture summary
  - Frontend: Angular app at `src/` (entry: `src/main.ts`).
  - SSR: `@angular/ssr` with server entry `src/main.server.ts` and an Express server in `server.ts` which loads `dist/u-kirche/browser` and `dist/u-kirche/server` at runtime.
  - Build output: `dist/u-kirche` (see `angular.json` -> `outputPath`).
  - State: NgRx used per feature under `src/app/features/*/store` (files: `*.actions.ts`, `*.effects.ts`, `*.reducer.ts`, `*.select.ts`, `*.state.ts`).
  - Services: API services are in `src/app/services/api/*.ts`. Providers and interceptors live under `src/app/services/providers`.

- Important files to reference when making changes
  - `package.json` — useful npm scripts (dev server, build, deploy, e2e).
  - `angular.json` — canonical build/serve/ssr configurations (environments, server entry, prerender settings).
  - `server.ts` — Express SSR server; use it when changing runtime SSR behavior or static serving.
  - `src/main.server.ts` — Angular server bootstrap.
  - `src/environments/*` — environment-specific API_URL and flags. Update these when endpoints or feature flags change.
  - `src/assets/i18n/*.json` — translations (de.json, ru.json, ua.json).

- Project conventions and patterns (do this, not that)
  - Feature-first layout: look under `src/app/features/<feature>/` for pages, components and `store/`. Follow existing naming and file grouping when adding a new feature.
  - API services use the `*-api.service.ts` convention. Place new HTTP client code under `src/app/services/api/` and add provider wiring in `src/app/services/providers` if needed.
  - Guards and interceptors: see `src/app/services/guards` and `src/app/services/providers/index.ts` for examples. Reuse existing `auth-interceptor.provider.ts` when adding auth-related headers.
  - Styling: SCSS with a global `src/assets/styles` include path (see `angular.json` -> `stylePreprocessorOptions`). Use component-level SCSS and import variables/mixins from `src/assets/styles`.
  - Routing: top-level `src/app/app.routes.ts` plus per-feature `*.routes.ts`. Prefer adding routes in the feature's `index.ts` where that pattern is followed.
  - NgRx: follow existing action/effect/reducer/select/state file patterns. Keep reducers pure and side-effects in effects.

- Developer workflows / commands
  - Start dev server (local): `npm start` (runs `ng serve`, default configuration `local` per `angular.json`).
  - Build dev: `npm run build:dev` — uses `development` config.
  - Build prod: `npm run build:prod` — production build with file replacements.
  - Serve SSR build: `npm run serve:ssr:u-kirche` (runs `node dist/u-kirche/server/server.mjs`).
  - E2E tests: `npm run test:e2e` (Playwright). Use `playwright.config.ts` for test configuration.
  - Deploy: `npm run deploy:dev` or `npm run deploy:prod` (uses Firebase CLI; check `firebase.json`).

- Integration & external systems
  - Firebase: repository includes `firebase.json` and README notes about Firebase projects (dev/prod). When updating hosting or functions, check `package.json` deploy scripts and `src/environments` mappings.
  - Playwright for e2e: `playwright.config.ts` present.
  - Uses PrimeNG and PrimeFlex for UI (themes in `angular.json` test config and `src/assets/styles`).

- Concrete examples
  - To change an API URL for staging/dev: edit `src/environments/environment.dev.ts` and verify `src/app/services/api/*` uses `environment.API_URL`.
  - To add a new feature with NgRx: copy pattern from `src/app/features/home/store/` or `admin/store/` and register reducers/selectors in the same feature folder.
  - To change SSR rendering options: update `src/main.server.ts` or `server.ts` (server uses `CommonEngine` and reads `index.server.html`).

- Quick guardrails for AI edits
  - Do not modify compiled outputs in `dist/` or files under `.angular/cache/`.
  - Prefer minimal, localized edits and include file references in PR descriptions (example: "Change API base URL — edited `src/environments/environment.dev.ts` and `src/app/services/api/user-api.service.ts`").
  - When adding runtime environment values, update `src/environments/*` and `angular.json` file replacements if necessary.

If anything in these instructions is unclear or you want more specifics (CI steps, secret management, deployment gating), tell me which area to expand and I will update this file.
