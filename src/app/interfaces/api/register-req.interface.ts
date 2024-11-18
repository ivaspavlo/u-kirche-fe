import { ROLE } from '@app/constants';

export interface IRegisterReq {
  name: string;
  email: string;
  password: string;
  role: ROLE
}
