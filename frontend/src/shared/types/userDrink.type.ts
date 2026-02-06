import type { IDrink, IUser } from "."

export interface IUserDrink {
	_id: string
	ml: number
	drink: IDrink
	user?: IUser
	createdAt: string
	updatedAt: string
}
