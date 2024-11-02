import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import * as adminState from './features/admin';

export enum CORE_ROUTE_NAMES {
  HOME = 'home',
  ADMIN = 'admin'
}

export const CORE_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: CORE_ROUTE_NAMES.HOME,
        loadChildren: () => import('./features/home/home.routes').then((m) => m.HOME_ROUTES)
      },
      {
        path: CORE_ROUTE_NAMES.ADMIN,
        providers: [
          provideState(adminState.ADMIN_FEATURE_KEY, adminState.reducer),
          provideEffects([adminState.AdminEffects])
        ],
        loadChildren: () => import('./features/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: CORE_ROUTE_NAMES.HOME
      }
    ]
  }
];
