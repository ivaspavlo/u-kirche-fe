import { IContent } from '@app/interfaces';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IMeetReq, IMeetRes } from '@app/interfaces';

export const HomeActions = createActionGroup({
    source: 'home',
    events: {
        'Get Content': emptyProps(),
        'Get Content Success': props<IContent>(),
        'Get Content Error': emptyProps(),
        'Send Meet Form': props<IMeetReq>(),
        'Send Meet Form Success': props<IMeetRes>(),
        'Send Meet Form Error': emptyProps()
    }
});
