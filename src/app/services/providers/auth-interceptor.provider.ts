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
import { catchError, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { API_URL } from '@env/environment';
import { AdminActions } from '@app/features/admin';
import { FirebaseAuthService } from '../firebase-auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    readonly #firebaseAuthService = inject(FirebaseAuthService);
    readonly #store: Store = inject(Store);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.url.startsWith(API_URL)) {
            return next.handle(req);
        }

        return this.#firebaseAuthService.getIdToken().pipe(
            switchMap((token) => next.handle(token ? this.addToken(req, token) : req)),
            catchError((err: any) => {
                if (err instanceof HttpErrorResponse && err.status === 401) {
                    this.#store.dispatch(AdminActions.logoutUser());
                }
                return throwError(() => err);
            })
        );
    }

    private addToken<T>(req: HttpRequest<T>, token: string): HttpRequest<T> {
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
