import { Sidebar, UserPreview } from "../../components"
import "./appLayout.scss"
import { Outlet } from "react-router"

export const AppLayout = () => {
	return (
		<div className='appLayout'>
			<Sidebar />
			<div className="appLayout__main">
				<UserPreview />
				<Outlet />
			</div>
		</div>
	)
}
