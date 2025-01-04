import { windowProvider } from './window.provider';
import { AuthInterceptorProvider } from './auth-interceptor.provider';
import { siteKeyProvider } from './site-key.provider';

export * from './window.provider';
export * from './auth-interceptor.provider';
export * from './site-key.provider';

export const CORE_PROVIDERS = [windowProvider, AuthInterceptorProvider, siteKeyProvider];
