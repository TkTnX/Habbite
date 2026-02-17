export interface IRegisterRequest {
	firstName: string
	lastName: string
	email: string
	password: string
}
export interface ILoginRequest {
	email: string
	password: string
}

export interface IAuthResponse {
	accessToken: string
}


export interface INewPasswordRequest {
	token: string
	password: string
}