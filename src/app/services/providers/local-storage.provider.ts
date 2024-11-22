import { FactoryProvider, InjectionToken } from '@angular/core';
import { WINDOW } from './window.provider';

export const LOCAL_STORAGE = new InjectionToken<Storage>('LocalStorageToken');

export const localStorageProvider: FactoryProvider = {
  provide: LOCAL_STORAGE,
  useFactory: (window: Window): Storage => window.localStorage,
  deps: [WINDOW]
}
