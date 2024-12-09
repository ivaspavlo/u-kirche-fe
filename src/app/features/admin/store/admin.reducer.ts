import { Action, createReducer, on } from '@ngrx/store';
import { CallState } from '@app/constants';
import { IUser } from '@app/interfaces';
import { adminInitialState, IAdminState } from './admin.state';
import { AdminActions } from './admin.actions';

export const ADMIN_FEATURE_KEY = 'admin';

export const adminReducer = createReducer(
    adminInitialState,
    on(
        AdminActions.loginUser,
        AdminActions.registerUser,
        AdminActions.getUser,
        (state) => {
            return {
                ...state,
                callState: CallState.LOADING
            }
        }
    ),
    on(
        AdminActions.loginUserSuccess,
        AdminActions.logoutUserSuccess,
        (state) => {
            return {
                ...state,
                callState: CallState.LOADED
            };
        }
    ),
    on(AdminActions.getUserSuccess, (state, user: IUser) => {
        return {
            ...state,
            user: user,
            callState: CallState.LOADED
        };
    }),
    on(
        AdminActions.loginUserError,
        AdminActions.registerUserError,
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
