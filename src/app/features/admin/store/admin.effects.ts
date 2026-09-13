import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

import { IRegisterReq, IUser } from '@app/interfaces';
import { AuthApiService, FirebaseAuthService, UserApiService } from '@app/services';
import { AdminActions } from './admin.actions';
import { ADMIN_ROUTE_NAMES } from '../admin.routes';

@Injectable()
export class AdminEffects {
    readonly #actions$: Actions = inject(Actions);
    readonly #router: Router = inject(Router);
    readonly #authApiService: AuthApiService = inject(AuthApiService);
    readonly #firebaseAuthService = inject(FirebaseAuthService);
    readonly #userApiService: UserApiService = inject(UserApiService);
    readonly #messageService: MessageService = inject(MessageService);

    public login$ = createEffect(() =>
        this.#actions$.pipe(
            ofType(AdminActions.loginUser),
            switchMap(() =>
                this.#firebaseAuthService.loginWithGoogle().pipe(
                    tap(() => {
                        this.#messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'You have logged in'
                        });
                        this.#router.navigateByUrl(`${ADMIN_ROUTE_NAMES.PARENT}/${ADMIN_ROUTE_NAMES.CMS}`);
                    }),
                    map(() => AdminActions.loginUserSuccess()),
                    catchError(() => {
                        this.#messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'We could not log you in'
                        });
                        return of(AdminActions.loginUserError());
                    })
                )
            )
        )
    );

    public logout$ = createEffect(() =>
        this.#actions$.pipe(
            ofType(AdminActions.logoutUser),
            switchMap(() => this.#firebaseAuthService.logout().pipe(catchError(() => of(undefined)))),
            tap(() => this.#router.navigateByUrl(`${ADMIN_ROUTE_NAMES.PARENT}/${ADMIN_ROUTE_NAMES.LOGIN}`)),
            map(() => AdminActions.logoutUserSuccess())
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
