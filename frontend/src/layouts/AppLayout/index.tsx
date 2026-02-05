import { useEffect } from "react"
import { Sidebar, UserPreview } from "../../components"
import "./appLayout.scss"
import { Outlet, useNavigate } from "react-router"
import Cookies from "js-cookie"
export const AppLayout = () => {
	const navigate = useNavigate()
	useEffect(() => {
		const token = Cookies.get("accessToken")

		if (!token) {
			navigate("/auth/login")
		}
	}, [navigate])

	return (
		<div className='appLayout'>
			<Sidebar />
			<div className='appLayout__main'>
				<UserPreview />
				<Outlet />
			</div>
		</div>
	)
}
