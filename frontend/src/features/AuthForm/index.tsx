import "./authForm.scss"
import { Link, useNavigate } from "react-router"
import { Checkbox, FormControlLabel } from "@mui/material"
import type {
	UseMutationOptions,
	UseMutationResult
} from "@tanstack/react-query"
import type { AxiosResponse } from "axios"
import Cookies from "js-cookie"
import { toast } from "react-toastify"
import type { AuthAxiosError } from "../../shared"
import { useState } from "react"
import { FormInput } from "../../components/ui"

interface Props {
	type: "login" | "register"
	mutation: (
		options?: Omit<
			UseMutationOptions<unknown, unknown, unknown, unknown>,
			"mutationKey" | "mutationFn"
		>
	) => UseMutationResult<AxiosResponse, AuthAxiosError, any, unknown>
}

export const AuthForm = ({ type, mutation }: Props) => {
	const isRegister = type === "register"
	const [isConfirmedTerms, setIsConfirmedTerms] = useState(
		isRegister ? false : true
	)
	const { mutate, isPending } = mutation()
	const navigate = useNavigate()

	const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.target)
		const body = Object.fromEntries(formData)
		mutate(body, {
			onSuccess: ({ data }) => {
				;(Cookies.set("accessToken", data.accessToken), navigate("/"))
			},
			onError: error => {
				const errorData = error.response?.data
				errorData?.errors?.map((error: string) => toast.error(error)) ||
					toast.error(errorData?.message)
			}
		})
	}

	return (
		<div className='authForm'>
			<div className='authForm__wrapper'>
				<img src='/images/icons/logo.svg' alt='Logo' />
				<h4 className='authForm__title'>
					{isRegister ? "Создание аккаунта" : "Логин"}
				</h4>
				<form onSubmit={e => onSubmit(e)} className='authForm__form'>
					{isRegister && (
						<>
							<FormInput
								disabled={isPending}
								label={"Имя"}
								name='firstName'
							/>
							<FormInput
								disabled={isPending}
								name='lastName'
								label='Фамилия'
							/>
						</>
					)}
					<FormInput
						disabled={isPending}
						name='email'
						label='Почта'
					/>
					<FormInput
						type={"password"}
						disabled={isPending}
						name='password'
						label='Пароль'
					/>
					{isRegister ? (
						<FormControlLabel
							onChange={() => setIsConfirmedTerms(prev => !prev)}
							disabled={isPending}
							control={<Checkbox />}
							label={
								<p className='authForm__terms'>
									Я принимаю Правила и Условия{" "}
								</p>
							}
						/>
					) : (
						<div className='authForm__controls'>
							<FormControlLabel
								name='isRemember'
								disabled={isPending}
								control={<Checkbox />}
								label={
									<p className='authForm__terms'>
										Запомнить меня
									</p>
								}
							/>
							{/* TODO: ADD RESET PASSWORD FUNCTIONALITY */}
							<Link
								className='authForm__forgot'
								to={"/auth/reset-password"}
							>
								Забыли пароль?
							</Link>
						</div>
					)}
					<button
						disabled={isPending || !isConfirmedTerms}
						className='button'
					>
						{isRegister ? "Создать аккаунт" : "Войти"}
					</button>
				</form>
				{isRegister ? (
					<p className='authForm__change'>
						Уже есть аккаунт? <Link to={"/auth/login"}>Вход</Link>
					</p>
				) : (
					<p className='authForm__change'>
						Ещё нет аккаунта?{" "}
						<Link to={"/auth/register"}>Регистрация</Link>
					</p>
				)}
			</div>
		</div>
	)
}
