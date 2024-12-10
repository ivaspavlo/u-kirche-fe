import { Action, createReducer, on } from '@ngrx/store';
import { CallState } from '@app/constants';
import { homeInitialState, IHomeState } from './home.state';
import { HomeActions } from './home.actions';

export const HOME_FEATURE_KEY = 'home';

export const homeReducer = createReducer(
    homeInitialState,
    on(
        HomeActions.getContent,
        (state) => {
            return {
                ...state,
                callState: CallState.LOADING
            }
        }
    ),
    on(
        HomeActions.getContentSuccess,
        (state) => {
            return {
                ...state,
                callState: CallState.LOADED
            };
        }
    ),
    on(
        HomeActions.getContentError,
        (state) => {
        return {
            ...state,
            callState: CallState.ERROR
        };
    })
);

export function reducer(state: IHomeState | undefined, action: Action) {
    return homeReducer(state, action);
}
