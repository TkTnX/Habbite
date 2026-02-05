import type { AxiosError } from "axios"

interface IAuthError  {
	errors: string[]
	message: string
}

export type AuthAxiosError = AxiosError<IAuthError>
