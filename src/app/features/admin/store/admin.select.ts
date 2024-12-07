import { createFeatureSelector, createSelector } from '@ngrx/store';
import { errorState, loadedState, loadingState } from '@app/constants';
import { ADMIN_FEATURE_KEY } from './admin.reducer';
import { IAdminState } from './admin.state';

export const selectAdminState = createFeatureSelector<IAdminState>(ADMIN_FEATURE_KEY);

export const isAuth = createSelector(selectAdminState, (adminState: IAdminState) => adminState.auth);

export const selectUser = createSelector(selectAdminState, (adminState: IAdminState) => adminState.user);

// Call state
export const selectCallState = createSelector(selectAdminState, (adminState: IAdminState) => adminState.callState);
export const selectIsLoadingState = createSelector(selectCallState, loadingState);
export const selectIsLoadedState = createSelector(selectCallState, loadedState);
export const selectIsErrorState = createSelector(selectCallState, errorState);
