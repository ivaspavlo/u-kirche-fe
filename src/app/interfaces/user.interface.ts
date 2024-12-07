export type TRole = 'admin' | 'superadmin';

export interface IUser {
    id: string;
    name: string;
    email: string;
    role: TRole;
    updatedAt: number;
    createdAt: number;
}
