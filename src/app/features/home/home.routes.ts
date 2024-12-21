import { Routes } from '@angular/router';

export enum HOME_ROUTE_NAMES {
    ROOT = 'home'
}

export const HOME_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./home-page.component').then((m) => m.HomePageComponent)
    }
];
