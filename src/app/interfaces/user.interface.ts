export type TRole = 'admin' | 'superadmin';

export interface IUser {
    uid: string;
    email: string;
    password: string;
    role: TRole;
}
