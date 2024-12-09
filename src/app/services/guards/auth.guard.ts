import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LOCAL_STORAGE } from '../providers';
import { KEYS } from '@app/constants';

export function authGuard(): CanActivateFn {
  return () => {
    debugger;
    const localStorage: Storage = inject(LOCAL_STORAGE);
    const hasJwt = !!localStorage.getItem(KEYS.ACCESS_TOKEN);
    return hasJwt;
  };
}
