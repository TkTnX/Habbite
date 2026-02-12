import { Analytics, BodyGoal, WaterAnalytics, WeightAnalytics } from "../../components"
import { ThemeChange } from "../../features"
import { useUserStore } from "../../shared/stores"
import "./homepage.scss"
export const Homepage = () => {
	const { user } = useUserStore()
	return (
		<main className='homepage'>
			{/* TODO: Высчитывать добрый день/утро/вечер/ночь */}
			<div className='homepage__top'>
				<div>
					<p className='homepage__welcome'>
						Добрый день, {user?.firstName}
					</p>
					<p>Как вы сегодня?</p>
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
