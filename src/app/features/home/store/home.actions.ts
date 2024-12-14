import { IContent } from '@app/interfaces';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const HomeActions = createActionGroup({
    source: 'home',
    events: {
        'Get Content': emptyProps(),
        'Get Content Success': props<IContent>(),
        'Get Content Error': emptyProps()
    }
});
