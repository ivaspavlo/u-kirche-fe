import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const HomeActions = createActionGroup({
    source: 'home',
    events: {
        'Get Content': emptyProps(),
        'Get Content Success': props<any>(),
        'Get Content Error': emptyProps()
    }
});
