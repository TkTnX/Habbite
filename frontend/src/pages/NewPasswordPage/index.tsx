import { useNavigate, useSearchParams } from "react-router"
import { NewPasswordForm } from "../../features"
import "./newPasswordPage.scss"
export const NewPasswordPage = () => {
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()
    const token = searchParams.get("token")
	if (!token ) {
		navigate("/auth/login")
		return
	}

	return (
		<div className='newPasswordPage'>
			<div className='newPasswordPage__wrapper'>
				<h3 className='newPasswordPage__title'>Изменение пароля</h3>
				<NewPasswordForm token={token} />
			</div>
		</div>
	)
}
