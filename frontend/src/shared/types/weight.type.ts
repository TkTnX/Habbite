import type { IUser } from "./user.type";

export interface IWeight {
    weight: number,
    user?: IUser,
    createdAt: string,
    updatedAt: string
}