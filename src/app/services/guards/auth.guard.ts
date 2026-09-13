import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';

import { ADMIN_ROUTE_NAMES } from '@app/features/admin/admin.routes';
import { FirebaseAuthService } from '../firebase-auth.service';

export const authGuard: CanActivateFn = () => {
    const router = inject(Router);
    const firebaseAuthService = inject(FirebaseAuthService);

    return firebaseAuthService
        .isAuthenticated()
        .pipe(
            map((isAuthenticated) =>
                isAuthenticated ? true : router.createUrlTree([ADMIN_ROUTE_NAMES.PARENT, ADMIN_ROUTE_NAMES.LOGIN])
            )
        );
};
