import { AuthForm } from "../../features"
import "./loginPage.scss"
import { useAuth } from "../../shared/hooks"
export const LoginPage = () => {
  const {loginMutation} = useAuth()

  return (
    <AuthForm mutation={loginMutation} type="login" />
  ) 
}
