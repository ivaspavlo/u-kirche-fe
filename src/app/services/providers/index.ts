import { windowProvider } from './window.provider';
import { AuthInterceptorProvider } from './auth-interceptor.provider';

export * from './window.provider';
export * from './auth-interceptor.provider';

export const CORE_PROVIDERS = [windowProvider, AuthInterceptorProvider];
