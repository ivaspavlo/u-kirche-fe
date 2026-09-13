import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, map, of, tap } from 'rxjs';

import { ROLE } from '@app/constants';
import { AdminActions } from '@app/features/admin/store/admin.actions';
import { UserApiService } from '../api/user-api.service';

export function roleGuard(requiredRoles: ROLE[]): CanActivateFn {
    return () => {
        const store: Store = inject(Store);
        const router: Router = inject(Router);
        const userApiService = inject(UserApiService);

        return userApiService.getUser().pipe(
            tap((user) => store.dispatch(AdminActions.getUserSuccess(user))),
            map((user) => (requiredRoles.includes(user.role) ? true : router.createUrlTree(['/']))),
            catchError(() => of(router.createUrlTree(['/'])))
        );
    };
}
