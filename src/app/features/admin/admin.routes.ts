import { Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page.component';

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
                loadComponent: () =>
                    import('./pages/register-page/register-page.component').then((m) => m.RegisterPageComponent)
            },
            {
                path: ADMIN_ROUTE_NAMES.CMS,
                loadChildren: () => import('./pages/cms-page/cms.routes').then((m) => m.CMS_ROUTES)
            }
        ]
    }
];
