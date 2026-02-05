import { AuthForm } from "../../features"
import { useAuth } from "../../shared/hooks"
import "./registerPage.scss"
export const RegisterPage = () => {
	const {registerMutation} = useAuth()
	return <AuthForm type='register' mutation={registerMutation} />
}

