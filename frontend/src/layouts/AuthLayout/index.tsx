import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router"
import Cookies from "js-cookie"
export const AuthLayout = () => {
	const navigate = useNavigate()
	useEffect(() => {
		const token = Cookies.get("accessToken")

		if (token) {
			navigate("/")
		}
	}, [navigate])
	return <Outlet />
}
