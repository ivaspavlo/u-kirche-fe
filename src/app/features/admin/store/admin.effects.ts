import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

import { ILoginReq, ILoginRes, IRegisterReq } from '@app/interfaces';
import { AuthApiService } from '@app/services';
import { KEYS } from '@app/constants';
import { LOCAL_STORAGE } from '@app/services/providers';
import { AdminActions } from './admin.actions';
import { ADMIN_ROUTE_NAMES } from '../admin.routes';

@Injectable()
export class AdminEffects {
    readonly #actions$: Actions = inject(Actions);
    readonly #router: Router = inject(Router);
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
                        detail: 'We could not log you in'
                    });
                    return AdminActions.loginError();
                }
                this.#router.navigateByUrl(`${ADMIN_ROUTE_NAMES.PARENT}/${ADMIN_ROUTE_NAMES.CMS}`);
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
            ofType(AdminActions.logoutUser),
            map(() => {
                this.#localStorage.removeItem(KEYS.ACCESS_TOKEN);
                return AdminActions.logoutUserSuccess();
            })
        )
    );

    public register$ = createEffect(() =>
        this.#actions$.pipe(
            ofType(AdminActions.registerUser),
            switchMap((req: IRegisterReq) => {
                return this.#authApiService.register(req).pipe(catchError(() => of(null)));
            }),
            map((res: object | null) => {
                if (res === null) {
                    this.#router.navigateByUrl(`${ADMIN_ROUTE_NAMES.PARENT}/${ADMIN_ROUTE_NAMES.LOGIN}`);
                    return AdminActions.registerUserSuccess();
                }
                return AdminActions.registerUserError();
            })
        )
    );
}
