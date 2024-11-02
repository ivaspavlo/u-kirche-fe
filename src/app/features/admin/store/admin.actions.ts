import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ILoginReq, IRegisterReq } from '@app/interfaces';

export const AdminActions = createActionGroup({
  source: 'admin',
  events: {
    'Login': props<ILoginReq>(),
    'Login Success': props<{ res: object }>(),
    'Login Error': emptyProps(),
    'Register': props<IRegisterReq>(),
    'Register Success': emptyProps()
  }
});
