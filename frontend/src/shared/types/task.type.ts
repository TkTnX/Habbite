import type { IUser } from "./user.type"

export interface ITask {
	_id: string
	title: string
	text: string
	user: IUser
	date: string
	color: string
	createdAt: string
	updatedAt: string
}


export interface ICreateTaskRequest {
    title: string,
    text: string,
	date: string,
	color: string
}