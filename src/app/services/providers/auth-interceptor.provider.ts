import { ClassProvider, inject, Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
    HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { API_URL } from '@env/environment';
import { AdminActions } from '@app/features/admin';
import { KEYS } from '@app/constants';
import { StorageService } from '../storage.service';

const NO_AUTH_URLS = ['/auth/login', '/auth/register'];

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    readonly #storageService: StorageService = inject(StorageService);
    readonly #store: Store = inject(Store);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.#storageService.getItem(KEYS.ACCESS_TOKEN);

        const url = req.url.split(API_URL)[1];

        if (token && !NO_AUTH_URLS.includes(url)) {
            req = this.addToken(req, token);
        }

        return next.handle(req).pipe(
            catchError((err: any) => {
                if (err instanceof HttpErrorResponse && err.status === 401) {
                    this.#store.dispatch(AdminActions.logoutUser());
                }
                return throwError(() => err);
            })
        );
    }

    private addToken<T>(req: HttpRequest<T>, token: any): HttpRequest<T> {
        return req.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
        });
    }
}

export const AuthInterceptorProvider: ClassProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
};
