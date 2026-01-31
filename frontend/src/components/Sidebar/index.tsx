import { Link } from "react-router"
import { Navbar } from "./components/Navbar"
import "./sidebar.scss"
import { useState } from "react"
export const Sidebar = () => {
	const [isClose, setIsClosed] = useState(false)
	return (
		<div className={`sidebar ${isClose && "closed"}`}>
			<div className='sidebar__top'>
				<Link to={"/"} className='sidebar__logo'>
					<img src='/images/icons/logo.svg' alt='Logo' />
					<p>Habbite</p>
				</Link>
				<button
					onClick={() => setIsClosed((prev: boolean) => !prev)}
					className='sidebar__expand'
				>
					<img src='/images/icons/expand.svg' alt='' />
				</button>
			</div>
			<Navbar />
		</div>
	)
}
