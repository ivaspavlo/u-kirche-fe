import { Routes } from '@angular/router';
import { authGuard, roleGuard } from '@app/services/guards';
import { ROLE } from '@app/constants';

export enum ADMIN_ROUTE_NAMES {
    PARENT = 'admin',
    LOGIN = 'login',
    REGISTER = 'register',
    CMS = 'cms'
}

export const ADMIN_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./admin-page.component').then((m) => m.AdminPageComponent),
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: ADMIN_ROUTE_NAMES.CMS
            },
            {
                path: ADMIN_ROUTE_NAMES.LOGIN,
                loadComponent: () => import('./pages/login-page/login-page.component').then((m) => m.LoginPageComponent)
            },
            {
                path: ADMIN_ROUTE_NAMES.REGISTER,
                canActivate: [authGuard, roleGuard([ROLE.SUPERADMIN])],
                loadComponent: () =>
                    import('./pages/register-page/register-page.component').then((m) => m.RegisterPageComponent)
            },
            {
                path: ADMIN_ROUTE_NAMES.CMS,
                canActivate: [authGuard(), roleGuard([ROLE.SUPERADMIN])],
                loadChildren: () => import('./pages/cms-page/cms.routes').then((m) => m.CMS_ROUTES)
            }
        ]
    }
];
