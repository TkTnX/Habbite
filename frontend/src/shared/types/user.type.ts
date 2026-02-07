import type { IUserDrink } from "."

export interface IUser {
    _id: string,
    avatar?: string
    provider: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    gender?: string
    userDrinks: IUserDrink[],
    weight?: number
    weightGoal?: number
    height?: number
    age?: number
}

export interface IUpdateUser {
    height: number
    weight: number
    weightGoal: number
    gender: "male" | 'female'
    birthday: string
}