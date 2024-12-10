import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';

import { ContentApiService } from '@app/services';
import { HomeActions } from './home.actions';

@Injectable()
export class HomeEffects {
    readonly #actions$: Actions = inject(Actions);
    readonly #contentApiService: ContentApiService = inject(ContentApiService);

    public getContent$ = createEffect(() =>
        this.#actions$.pipe(
            ofType(HomeActions.getContent),
            switchMap(() => this.#contentApiService.getContent().pipe(catchError(() => of(null)))),
            map((res: any | null) => {
                if (res === null) {
                    return HomeActions.getContentError();
                }

                return HomeActions.getContentSuccess();
            })
        )
    );
}
