import { CallState, ICallState } from '@app/constants';
import { IContent } from '@app/interfaces';

export interface IHomeState extends ICallState {
    content: IContent | null;
}

export const homeInitialState: IHomeState = {
    callState: CallState.INIT,
    content: null
};
