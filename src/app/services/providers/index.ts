import { windowProvider } from './window.provider';
import { localStorageProvider } from './local-storage.provider';
import { localeProvider } from './locale.provider';
import { AuthInterceptorProvider } from './auth-interceptor.provider';
import { siteKeyProvider } from './site-key.provider';

export * from './window.provider';
export * from './local-storage.provider';
export * from './locale.provider';
export * from './auth-interceptor.provider';
export * from './site-key.provider';

export const CORE_PROVIDERS = [windowProvider, localStorageProvider, localeProvider, AuthInterceptorProvider, siteKeyProvider];
