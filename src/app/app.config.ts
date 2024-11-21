import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { CORE_ROUTES } from './app.routes';
import { CORE_PROVIDERS } from './services/providers';

export const appConfig: ApplicationConfig = {
  providers: [
    ...CORE_PROVIDERS,
    provideRouter(CORE_ROUTES, withComponentInputBinding()),
    provideHttpClient(),
    provideStore(),
    provideEffects()
  ]
};
