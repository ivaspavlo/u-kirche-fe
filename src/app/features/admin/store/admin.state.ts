import { CallState, ICallState } from '@app/constants';
import { IUser } from '@app/interfaces';

export interface IAdminState extends ICallState {
    user: IUser | null;
}

export const adminInitialState: IAdminState = {
    callState: CallState.INIT,
    user: null
};
