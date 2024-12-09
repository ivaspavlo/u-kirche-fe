import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { first, map } from 'rxjs';

import { ROLE } from '@app/constants';
import { IUser } from '@app/interfaces';
import { selectUser } from '@app/features/admin/store/admin.select';

export function roleGuard(requiredRoles: ROLE[]): CanActivateFn {
  return () => {
    const store: Store = inject(Store);
    const router: Router = inject(Router);

    return store.select(selectUser).pipe(
      first(),
      map((user: IUser | null) => {
        const canActivate = user !== null && requiredRoles.includes(user.role);
        if (!canActivate) {
          router.navigateByUrl('/');
        }
        return canActivate;
      })
    )
  };
}
