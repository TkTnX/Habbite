import { useEffect } from "react"
import { Sidebar, UserPreview } from "../../components"
import "./appLayout.scss"
import { Outlet, useNavigate } from "react-router"
import Cookies from "js-cookie"
import { useUser } from "../../shared/hooks"
import { useUserStore } from "../../shared/stores"
export const AppLayout = () => {
	const navigate = useNavigate()
	const { getMeQuery } = useUser()
	const { setUser, user } = useUserStore()
	const { data: userData } = getMeQuery()
	useEffect(() => {
		const token = Cookies.get("accessToken")

		if (!token) {
			navigate("/auth/login")
		}
	}, [navigate])

	useEffect(() => {
		if (!userData) return

		setUser(userData.data)
		if (Object.values(userData.data).includes(null)) {
			navigate("/start")
			return
		}
	}, [userData, userData?.data])
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
