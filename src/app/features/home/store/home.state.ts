import { CallState, ICallState } from '@app/constants';

export interface IHomeState extends ICallState {
    content: any | null;
}

export const homeInitialState: IHomeState = {
    callState: CallState.INIT,
    content: null
};
