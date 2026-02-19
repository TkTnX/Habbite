import type { IUser } from "./user.type"

export interface ITask {
	_id: string
	title: string
	text: string
	user: IUser
	date: string
	color: string
	isCompleted: boolean
	createdAt: string
	updatedAt: string
}


export interface ICreateTaskRequest {
    title: string,
    text: string,
	date: string,
	color: string
}

export interface IUpdateTaskRequest {
	title: string
	text: string
}