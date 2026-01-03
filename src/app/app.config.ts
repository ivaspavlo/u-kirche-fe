import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClient, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { providePrimeNG } from 'primeng/config';
import Lara from '@primeng/themes/lara';

import { CORE_ROUTES } from './app.routes';
import { CORE_PROVIDERS } from './services/providers';
import { PRIME_NG_GLOBAL_SERVICES } from './constants/primeng';

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
    new TranslateHttpLoader(http, '../assets/i18n/', '.json');

export const appConfig: ApplicationConfig = {
    providers: [
        ...CORE_PROVIDERS,
        ...PRIME_NG_GLOBAL_SERVICES,
        importProvidersFrom([
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: httpLoaderFactory,
                    deps: [HttpClient]
                }
            })
        ]),
        provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: Lara
            }
        }),
        provideRouter(CORE_ROUTES, withComponentInputBinding()),
        provideHttpClient(withInterceptorsFromDi(), withFetch()),
        provideAnimations(),
        provideStore(),
        provideEffects(),
        provideClientHydration()
    ]
};
