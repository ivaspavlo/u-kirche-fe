import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { of } from 'rxjs';

import { KEYS } from '@app/constants';
import { ADMIN_ROUTE_NAMES } from '@app/features/admin/admin.routes';
import { StorageService } from '../storage.service';

export function authGuard(): CanActivateFn {
    return () => {
        const router = inject(Router);
        const storageService: StorageService = inject(StorageService);

        const canActivate = !!storageService.getItem(KEYS.ACCESS_TOKEN);

        if (!canActivate) {
            router.navigateByUrl(`${ADMIN_ROUTE_NAMES.PARENT}/${ADMIN_ROUTE_NAMES.LOGIN}`);
        }

        return of(canActivate);
    };
}
