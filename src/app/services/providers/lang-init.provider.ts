import { EnvironmentProviders, inject, provideAppInitializer } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGE } from '@app/constants';

const DEFAULT_LANGUAGE = LANGUAGE.UA;

const langInitializer: EnvironmentProviders = provideAppInitializer(() => {
    const translate = inject(TranslateService);

    translate.addLangs(Object.values(LANGUAGE));
    translate.setDefaultLang(DEFAULT_LANGUAGE);
    return translate.use(DEFAULT_LANGUAGE);
});

export const langInit: EnvironmentProviders[] = [langInitializer];
