import {
    EnvironmentProviders,
    FactoryProvider,
    inject,
    InjectionToken,
    provideAppInitializer,
    REQUEST
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGE } from '@app/constants';

export const INITIAL_LANG = new InjectionToken<string>('InitialLang');

export function setLangCookie(lang: string): void {
    document.cookie = `lang=${lang};path=/;max-age=31536000`;
}

export function getInitialLang(): string {
    const translate = inject(TranslateService);

    const existingLang = document.cookie.match(/lang=([^;]+)/)?.[1];
    if (existingLang) return existingLang;

    const browserLang = translate.getBrowserLang();
    const lang = browserLang?.match(/de|ua|ru/) ? browserLang : LANGUAGE.DE;

    setLangCookie(lang);

    return lang;
}

export function getInitialLangServer(): string {
    const request = inject(REQUEST, { optional: true });
    if (!request) return LANGUAGE.DE;

    const cookie = request.headers.get('cookie') ?? '';
    const match = cookie.match(/lang=([^;]+)/);
    return match?.[1] ?? LANGUAGE.DE;
}

const langInitializer: EnvironmentProviders = provideAppInitializer(() => {
    const translate = inject(TranslateService);
    const initialLang = inject(INITIAL_LANG);

    translate.addLangs(Object.values(LANGUAGE));
    translate.setDefaultLang(LANGUAGE.DE);
    return translate.use(initialLang);
});

export const langInit: (FactoryProvider | EnvironmentProviders)[] = [
    langInitializer,
    { provide: INITIAL_LANG, useFactory: getInitialLang }
];

export const langInitServer: (FactoryProvider | EnvironmentProviders)[] = [
    langInitializer,
    { provide: INITIAL_LANG, useFactory: getInitialLangServer }
];
