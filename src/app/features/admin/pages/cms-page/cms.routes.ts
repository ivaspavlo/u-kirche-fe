import { Routes } from '@angular/router';

export enum CMS_ROUTE_NAMES {
    ARTICLES = 'articles'
}

export const CMS_ROUTES: Routes = [
    {
        path: CMS_ROUTE_NAMES.ARTICLES,
        loadComponent: () =>
            import('./pages/articles-page/articles-page.component').then((m) => m.ArticlesPageComponent)
    }
];
