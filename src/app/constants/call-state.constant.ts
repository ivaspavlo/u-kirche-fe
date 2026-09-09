export enum CallState {
    INIT = 'INIT',
    LOADING = 'LOADING',
    LOADED = 'LOADED',
    ERROR = 'ERROR'
}

export interface ICallState {
    callState: CallState;
}

export const loadingState = (callState: CallState) => callState === CallState.LOADING;
export const loadedState = (callState: CallState) => callState === CallState.LOADED || callState === CallState.ERROR;
export const errorState = (callState: CallState) => callState === CallState.ERROR;
