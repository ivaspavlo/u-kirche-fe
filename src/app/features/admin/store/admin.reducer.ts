import { Action, createReducer, on } from '@ngrx/store';
import { adminInitialState, IAdminState } from './admin.state';
import { AdminActions } from './admin.actions';

export const ADMIN_FEATURE_KEY = 'admin';

export const adminReducer = createReducer(
    adminInitialState,
    on(AdminActions.loginSuccess, (state) => {
        return {
            ...state,
            auth: true
        };
    }),
    on(AdminActions.loginError, (state) => {
        return {
            ...state,
            auth: false
        };
    }),
    on(AdminActions.logoutSuccess, (state) => {
        return {
            ...state,
            auth: false
        };
    })
);

export function reducer(state: IAdminState | undefined, action: Action) {
    return adminReducer(state, action);
}
