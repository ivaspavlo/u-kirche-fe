import { Routes } from '@angular/router';

export enum HOME_ROUTE_NAMES {}

export const HOME_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./home-page.component').then((m) => m.HomePageComponent)
    }
];
