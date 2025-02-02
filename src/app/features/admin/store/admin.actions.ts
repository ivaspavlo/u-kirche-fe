import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ILoginReq, IRegisterReq, IUser } from '@app/interfaces';

export const AdminActions = createActionGroup({
    source: 'admin',
    events: {
        'Login User': props<ILoginReq>(),
        'Login User Success': emptyProps(),
        'Login User Error': emptyProps(),
        'Register User': props<IRegisterReq>(),
        'Register User Success': emptyProps(),
        'Register User Error': emptyProps(),
        'Logout User': emptyProps(),
        'Logout User Success': emptyProps(),
        'Get User': emptyProps(),
        'Get User Success': props<IUser>(),
        'Get User Error': emptyProps()
    }
});
