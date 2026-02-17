import { toast } from "react-toastify"
import { FormInput } from "../../components/ui"
import { useAuth } from "../../shared/hooks"
import "./resetPasswordForm.scss"
import type { AuthAxiosError } from "../../shared"
export const ResetPasswordForm = () => {
	const { sendResetPasswordEmailMutation } = useAuth()
	const { mutate, isPending } = sendResetPasswordEmailMutation()

	const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()

		const formData = new FormData(e.target)
		const { email } = Object.fromEntries(formData)

		mutate(String(email), {
			onSuccess: () => toast.success("Письмо отправлено на почту!"),
			onError: (err: AuthAxiosError) => {
				const errorData = err.response?.data
				errorData?.errors?.map((error: string) => toast.error(error)) ||
					toast.error(errorData?.message)
			}
		})
	}

	return (
		<form onSubmit={onSubmit} className='resetPasswordForm'>
			<FormInput
				type='text'
				disabled={isPending}
				className='resetPasswordForm__input'
				placeholder='test@example.com'
				label='Почта'
				name='email'
			/>
			<button disabled={isPending} className='button'>
				Восстановить
			</button>
		</form>
	)
}
