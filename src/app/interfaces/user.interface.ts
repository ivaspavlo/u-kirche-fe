export type TRole = 'user' | 'manager';

export interface IUser {
  uid: string;
  email: string;
  password: string;
  role: TRole;
}
