import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';

import { ContentApiService } from '@app/services';
import { IContent, IMeetReq, IMeetRes } from '@app/interfaces';
import { HomeActions } from './home.actions';

@Injectable()
export class HomeEffects {
    readonly #actions$: Actions = inject(Actions);
    readonly #contentApiService: ContentApiService = inject(ContentApiService);

    public getContent$ = createEffect(() =>
        this.#actions$.pipe(
            ofType(HomeActions.getContent),
            switchMap(() => this.#contentApiService.getContent().pipe(catchError(() => of(null)))),
            map((res: IContent | null) => {
                if (res === null) {
                    return HomeActions.getContentError();
                }
                return HomeActions.getContentSuccess(res);
            })
        )
    );

    public sendMeetForm$ = createEffect(() =>
        this.#actions$.pipe(
            ofType(HomeActions.sendMeetForm),
            switchMap((value: IMeetReq) => this.#contentApiService.meet(value).pipe(catchError(() => of(null)))),
            map((res: IMeetRes | null) => {
                if (res === null) {
                    return HomeActions.sendMeetFormError();
                }
                return HomeActions.sendMeetFormSuccess(res);
            })
        )
    );
}
