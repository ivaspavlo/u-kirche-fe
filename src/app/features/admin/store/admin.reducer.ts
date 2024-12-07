import { Action, createReducer, on } from '@ngrx/store';
import { CallState } from '@app/constants';
import { IUser } from '@app/interfaces';
import { adminInitialState, IAdminState } from './admin.state';
import { AdminActions } from './admin.actions';

export const ADMIN_FEATURE_KEY = 'admin';

export const adminReducer = createReducer(
    adminInitialState,
    on(
        AdminActions.getUser,
        AdminActions.loginUser,
        AdminActions.registerUser,
        (state) => {
            return {
                ...state,
                callState: CallState.LOADING
            }
        }
    ),
    on(AdminActions.loginUserSuccess, (state) => {
        return {
            ...state,
            auth: true,
            callState: CallState.LOADED
        };
    }),
    on(AdminActions.logoutUserSuccess, (state) => {
        return {
            ...state,
            auth: false
        };
    }),
    on(AdminActions.getUserSuccess, (state, user: IUser) => {
        return {
            ...state,
            user: user,
            callState: CallState.LOADED
        };
    }),
    on(
        AdminActions.loginUserError,
        AdminActions.getUserError,
        (state) => {
        return {
            ...state,
            callState: CallState.ERROR
        };
    })
);

export function reducer(state: IAdminState | undefined, action: Action) {
    return adminReducer(state, action);
}
