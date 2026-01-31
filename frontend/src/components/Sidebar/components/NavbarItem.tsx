import { useLocation } from "react-router";

interface Props {
	item: { link: string; icon: string; name: string }
}

export const NavbarItem = ({ item }: Props) => {
	const { pathname } = useLocation()

	return (
		<li
			key={item.link}
			className={`sidebar__item ${pathname === item.link && "sidebar__item--active"}`}
		>
			<a href={item.link} className='sidebar__link'>
				<img src={item.icon} alt={item.name} />
				<p className="sidebar__text">{item.name}</p>
			</a>
		</li>
	)
}
