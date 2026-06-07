import { provideServerRendering } from '@angular/ssr';
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { appConfig } from './app.config';

import { langInitServer } from './services/providers';

const serverConfig: ApplicationConfig = {
    providers: [provideServerRendering(), ...langInitServer]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
