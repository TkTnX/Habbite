import { NAVBAR_ITEMS } from "../../../shared"
import { NavbarItem } from "./NavbarItem"

export const Navbar = () => {
	return (
		<nav className='sidebar__nav'>
			<ul className='sidebar__list'>
				{NAVBAR_ITEMS.slice(0, -2).map(item => (
					<NavbarItem item={item} />
				))}
			</ul>
			<div className='sidebar__account'>
				<p className='sidebar__account-title'>АККАУНТ</p>
				<ul className='sidebar__list'>
					{NAVBAR_ITEMS.slice(3).map(item => (
						<NavbarItem item={item} />
					))}
				</ul>
			</div>
		</nav>
	)
}
