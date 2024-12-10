import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { of } from 'rxjs';

import { KEYS } from '@app/constants';
import { ADMIN_ROUTE_NAMES } from '@app/features/admin/admin.routes';
import { LOCAL_STORAGE } from '../providers';

export function authGuard(): CanActivateFn {
  return () => {
    const router = inject(Router);
    const localStorage: Storage = inject(LOCAL_STORAGE);

    const canActivate = !!localStorage.getItem(KEYS.ACCESS_TOKEN);

    if (!canActivate) {
      router.navigateByUrl(`${ADMIN_ROUTE_NAMES.PARENT}/${ADMIN_ROUTE_NAMES.LOGIN}`);
    }

    return of(canActivate);
  };
}
