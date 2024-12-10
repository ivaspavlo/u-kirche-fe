import { createFeatureSelector, createSelector } from '@ngrx/store';
import { errorState, loadedState, loadingState } from '@app/constants';
import { IHomeState } from './home.state';
import { HOME_FEATURE_KEY } from './home.reducer';

export const selectAdminState = createFeatureSelector<IHomeState>(HOME_FEATURE_KEY);

export const selectContent = createSelector(selectAdminState, (homeState: IHomeState) => homeState.content);

// Call state
export const selectCallState = createSelector(selectAdminState, (homeState: IHomeState) => homeState.callState);
export const selectIsLoadingState = createSelector(selectCallState, loadingState);
export const selectIsLoadedState = createSelector(selectCallState, loadedState);
export const selectIsErrorState = createSelector(selectCallState, errorState);
