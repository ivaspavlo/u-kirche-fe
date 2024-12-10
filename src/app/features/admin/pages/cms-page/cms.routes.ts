import { Routes } from '@angular/router';
import { authGuard } from '@app/services/guards';

export enum CMS_ROUTE_NAMES {
    ARTICLES = 'articles'
}

export const CMS_ROUTES: Routes = [
    {
        path: '',
        canActivate: [authGuard],
        loadComponent: () => import('./cms-page.component').then((m) => m.CmsPageComponent),
        children: [
            {
                path: CMS_ROUTE_NAMES.ARTICLES,
                loadComponent: () => import('./pages/articles-page/articles-page.component').then((m) => m.ArticlesPageComponent)
            }
        ]
    }
];
