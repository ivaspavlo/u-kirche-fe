# Ukrainische Kirche (ukrainische-kirche-be)

SPA application built with Angular, Angular SSR, PrimeNG and NGRX.

## Important features:

### Environments
  - Project has three environments: local, dev and prod. For each of the environments there are corresponding files in the `./environments` folder. Local environment uses API_URL from dev environment of Firebase function. However, it can be also connected to the Firebase emulator by replacing the API_URL.
  - In the Firebase console there are two projects for dev and prod environment correspondingly.
  - Deployment to the dev environment occurs after pushing to dev branch.
  - Deployment to the prod environment occurs after merging from dev to main branch.

### Formatting
  - Project is formatted with Prettier, rules can be found in `prettier.config.ts`.
  - Formatting can be configured to run on save, with `"editor.formatOnSave": true` in VS Code editor.
  - The formatting check is included into the pipeline in Git action.

## Project structure
to be updated
