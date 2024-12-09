import { ROLE } from "@app/constants";

export interface IUser {
    id: string;
    name: string;
    email: string;
    role: ROLE;
    updatedAt: number;
    createdAt: number;
}
