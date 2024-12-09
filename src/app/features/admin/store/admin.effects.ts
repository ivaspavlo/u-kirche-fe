import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

import { ILoginReq, ILoginRes, IRegisterReq, IUser } from '@app/interfaces';
import { AuthApiService, UserApiService } from '@app/services';
import { KEYS } from '@app/constants';
import { LOCAL_STORAGE } from '@app/services/providers';
import { AdminActions } from './admin.actions';
import { ADMIN_ROUTE_NAMES } from '../admin.routes';

@Injectable()
export class AdminEffects {
    readonly #actions$: Actions = inject(Actions);
    readonly #router: Router = inject(Router);
    readonly #authApiService: AuthApiService = inject(AuthApiService);
    readonly #userApiService: UserApiService = inject(UserApiService);
    readonly #localStorage: Storage = inject(LOCAL_STORAGE);
    readonly #messageService: MessageService = inject(MessageService);

    public login$ = createEffect(() =>
        this.#actions$.pipe(
            ofType(AdminActions.loginUser),
            switchMap((req: ILoginReq) => this.#authApiService.login(req).pipe(catchError(() => of(null)))),
            map((res: ILoginRes | null) => {
                if (res === null) {
                    this.#messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'We could not log you in'
                    });
                    return AdminActions.loginUserError();
                }
                this.#messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'You have logged in'
                });
                this.#localStorage.setItem(KEYS.ACCESS_TOKEN, res.jwt);

                this.#router.navigateByUrl(`${ADMIN_ROUTE_NAMES.PARENT}/${ADMIN_ROUTE_NAMES.CMS}`);

                return AdminActions.loginUserSuccess();
            })
        )
    );

    public logout$ = createEffect(() =>
        this.#actions$.pipe(
            ofType(AdminActions.logoutUser),
            map(() => {
                this.#localStorage.removeItem(KEYS.ACCESS_TOKEN);
                this.#router.navigateByUrl(`${ADMIN_ROUTE_NAMES.PARENT}/${ADMIN_ROUTE_NAMES.LOGIN}`);
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
            map((res: IUser | null) => {
                if (res === null) {
                    this.#router.navigateByUrl(`${ADMIN_ROUTE_NAMES.PARENT}/${ADMIN_ROUTE_NAMES.LOGIN}`);
                    return AdminActions.registerUserError();
                }
                return AdminActions.registerUserSuccess();
            })
        )
    );

    public getUser$ = createEffect(() =>
        this.#actions$.pipe(
            ofType(AdminActions.getUser),
            switchMap(() => {
                return this.#userApiService.getUser().pipe(catchError(() => of(null)));
            }),
            map((res: IUser | null) => {
                if (res === null) {
                    return AdminActions.getUserError();
                }
                return AdminActions.getUserSuccess(res);
            })
        )
    );
}
