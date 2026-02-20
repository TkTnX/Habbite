import {
	Analytics,
	BodyGoal,
	WaterAnalytics,
	WeightAnalytics
} from "../../components"
import { ThemeChange } from "../../features"
import { getTimeLabel } from "../../shared"
import { useUserStore } from "../../shared/stores"
import "./homepage.scss"
export const Homepage = () => {
	const { user } = useUserStore()
	return (
		<main className='homepage'>
			<div className='homepage__top'>
				<div>
					<p className='homepage__welcome'>
						{getTimeLabel()}, {user?.firstName}
					</p>
					<p>Как вы чувствуете себя сегодня?</p>
				</div>
				<ThemeChange />
			</div>
			<Analytics />
			<WaterAnalytics />
			<WeightAnalytics />
			<BodyGoal />
		</main>
	)
}
