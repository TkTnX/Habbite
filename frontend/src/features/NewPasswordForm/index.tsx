import { toast } from "react-toastify"
import { FormInput } from "../../components/ui"
import { useAuth } from "../../shared/hooks"
import "./newPasswordForm.scss"
import type { AuthAxiosError } from "../../shared"
import { useNavigate } from "react-router"

interface Props {
	token: string
}

export const NewPasswordForm = ({ token }: Props) => {
	const navigate = useNavigate()
	const { newPasswordMutation } = useAuth()
	const { mutate, isPending } = newPasswordMutation()

	const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()

		const formData = new FormData(e.target)
		const { password } = Object.fromEntries(formData)

		mutate(
			{ password: String(password), token },
			{
				onSuccess: () => {
					toast.success("Пароль изменён!")
					navigate("/auth/login")
				},
				onError: (err: AuthAxiosError) => {
					const errorData = err.response?.data
					errorData?.errors?.map((error: string) =>
						toast.error(error)
					) || toast.error(errorData?.message)
				}
			}
		)
	}

	return (
		<form onSubmit={onSubmit} className='newPasswordForm'>
			<FormInput
				type='password'
				disabled={isPending}
				className='newPasswordForm__input'
				placeholder='********'
				label='Новый пароль'
				name='password'
			/>
			<button disabled={isPending} className='button'>
				Изменить
			</button>
		</form>
	)
}
