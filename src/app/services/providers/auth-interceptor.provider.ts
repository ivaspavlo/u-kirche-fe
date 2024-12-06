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

import { AdminActions } from '@app/features/admin';
import { KEYS } from '@app/constants';
import { LOCAL_STORAGE } from '.';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    readonly #localStorage: Storage = inject(LOCAL_STORAGE) as Storage;
    readonly #store: Store = inject(Store);

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.#localStorage.getItem(KEYS.ACCESS_TOKEN);

        if (token) {
            request = this.addToken(request, token);
        }

        return next.handle(request).pipe(
            catchError((err: any) => {
                if (err instanceof HttpErrorResponse && err.status === 401) {
                    this.#store.dispatch(AdminActions.logoutUser());
                }
                return throwError(() => err);
            })
        );
    }

    private addToken<T>(request: HttpRequest<T>, token: any): HttpRequest<T> {
        return request.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
        });
    }
}

export const AuthInterceptorProvider: ClassProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
};
