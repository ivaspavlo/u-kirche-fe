import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

import { ILoginReq, ILoginRes, IRegisterReq } from '@app/interfaces';
import { AuthApiService } from '@app/services';
import { KEYS } from '@app/constants';
import { LOCAL_STORAGE } from '@app/services/providers';
import { AdminActions } from './admin.actions';

@Injectable()
export class AdminEffects {
    readonly #actions$: Actions = inject(Actions);
    readonly #authApiService: AuthApiService = inject(AuthApiService);
    readonly #localStorage: Storage = inject(LOCAL_STORAGE);
    readonly #messageService: MessageService = inject(MessageService);

    public login$ = createEffect(() =>
        this.#actions$.pipe(
            ofType(AdminActions.login),
            switchMap((req: ILoginReq) => this.#authApiService.login(req).pipe(catchError(() => of(null)))),
            map((res: ILoginRes | null) => {
                if (res === null) {
                    this.#messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'We could not log in'
                    });
                    return AdminActions.loginError();
                }
                this.#messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'You have logged in'
                });
                this.#localStorage.setItem(KEYS.ACCESS_TOKEN, res.jwt);
                return AdminActions.loginSuccess();
            })
        )
    );

    public logout$ = createEffect(() =>
        this.#actions$.pipe(
            ofType(AdminActions.logout),
            map(() => {
                this.#localStorage.removeItem(KEYS.ACCESS_TOKEN);
                return AdminActions.logoutSuccess();
            })
        )
    );

    public register$ = createEffect(() =>
        this.#actions$.pipe(
            ofType(AdminActions.register),
            switchMap((req: IRegisterReq) => {
                return this.#authApiService.register(req).pipe(catchError(() => of(null)));
            }),
            map((res: object | null) => {
                if (res === null) {
                    return AdminActions.registerSuccess();
                }
                return AdminActions.registerError();
            })
        )
    );
}
