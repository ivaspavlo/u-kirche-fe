import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { CORE_ROUTES } from './app.routes';
import { CORE_PROVIDERS } from './services/providers';
import { PRIME_NG_GLOBAL_SERVICES } from './constants/primeng';

export const appConfig: ApplicationConfig = {
    providers: [
        ...CORE_PROVIDERS,
        ...PRIME_NG_GLOBAL_SERVICES,
        provideAnimations(),
        provideRouter(CORE_ROUTES, withComponentInputBinding()),
        provideHttpClient(withInterceptorsFromDi()),
        provideStore(),
        provideEffects()
    ]
};
