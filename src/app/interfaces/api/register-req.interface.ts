export interface IRegisterReq {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'manager';
}
