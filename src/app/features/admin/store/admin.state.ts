import { CallState, ICallState } from '@app/constants';
import { IUser } from '@app/interfaces';

export interface IAdminState extends ICallState {
    auth: boolean;
    user: IUser | null;
}

export const adminInitialState: IAdminState = {
    callState: CallState.INIT,
    auth: false,
    user: null
};
