import { ResetPasswordForm } from "../../features"
import "./resetPasswordPage.scss"
export const ResetPasswordPage = () => {
	return (
		<div className='resetPasswordPage'>
			<div className='resetPasswordPage__wrapper'>
				<h3 className='resetPasswordPage__title'>
					Восстановление пароля
				</h3>
				<ResetPasswordForm />
			</div>
		</div>
	)
}
