import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ILoginReq, IRegisterReq } from '@app/interfaces';

export const AdminActions = createActionGroup({
  source: 'admin',
  events: {
    'Login': props<ILoginReq>(),
    'Login Success': emptyProps(),
    'Login Error': emptyProps(),
    'Register': props<IRegisterReq>(),
    'Register Success': emptyProps(),
    'Register Error': emptyProps(),
    'Logout': emptyProps(),
    'Logout Success': emptyProps()
  }
});
