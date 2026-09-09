import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClient, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { providePrimeNG } from 'primeng/config';
import { definePreset } from '@primeng/themes';

import Lara from '@primeng/themes/lara';

import { CORE_ROUTES } from './app.routes';
import { PRIME_NG_GLOBAL_SERVICES } from './constants';
import { AuthInterceptorProvider, langInit, WindowProvider } from './services/providers';

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
    new TranslateHttpLoader(http, '../assets/i18n/', '.json');

const MyPreset = definePreset(Lara, {
    semantic: {
        primary: {
            50: '#fffbea',
            100: '#fdf3c4',
            200: '#f9e79a',
            300: '#f4dc7f',
            400: '#f0d46f',
            500: '#eed76f',
            600: '#d4be60',
            700: '#b9a553',
            800: '#9e8c46',
            900: '#827339'
        }
    }
});

export const appConfig: ApplicationConfig = {
    providers: [
        ...PRIME_NG_GLOBAL_SERVICES,

        WindowProvider,
        AuthInterceptorProvider,

        importProvidersFrom([
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: httpLoaderFactory,
                    deps: [HttpClient]
                }
            })
        ]),
        ...langInit,

        provideAnimations(), // Needed for PrimeNG, will be removed when they migrate
        provideAnimationsAsync(), // Needed for PrimeNG, will be removed when they migrate
        providePrimeNG({
            theme: {
                preset: MyPreset
            }
        }),
        provideRouter(CORE_ROUTES, withComponentInputBinding()),
        provideHttpClient(withInterceptorsFromDi(), withFetch()),
        provideStore(),
        provideEffects(),
        provideClientHydration()
    ]
};
