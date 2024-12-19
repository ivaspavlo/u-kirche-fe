import { Provider } from '@angular/core';
import { RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { SITE_KEY } from '@env/environment';

export const siteKeyProvider: Provider = {
  provide: RECAPTCHA_V3_SITE_KEY,
  useValue: SITE_KEY
};
