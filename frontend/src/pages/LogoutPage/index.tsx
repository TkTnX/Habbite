import { FormInput } from "../../components/ui"
import { useUserStore } from "../../shared/stores"
import Cookies from "js-cookie"
import "./logoutPage.scss"
import { useAuth } from "../../shared/hooks"
import { useNavigate } from "react-router"

export const LogoutPage = () => {
	const navigate = useNavigate()
	const { logoutMutation } = useAuth()
	const { mutate } = logoutMutation({
		onSuccess: () => navigate("/auth/login")
	})
	const { user } = useUserStore()

	const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.target)
		const { email } = Object.fromEntries(formData)
		if (user?.email === email) {
			Cookies.remove("accessToken")
			mutate()
		}
	}

	return (
		<div className='logoutPage'>
			<img
				src='/images/icons/logo.svg'
				className='logoutPage__icon'
				alt='Logo'
			/>
			<form onSubmit={onSubmit} className='logoutPage__form'>
				<FormInput
					className='logoutPage__input'
					label='Email'
					name='email'
					placeholder='test@example.com'
				/>
				<button disabled={!user} className='button logoutPage__submit'>
					Выйти
				</button>
			</form>
		</div>
	)
}
