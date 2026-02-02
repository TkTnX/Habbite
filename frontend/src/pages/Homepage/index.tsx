import { Analytics, WaterAnalytics, WeightAnalytics } from "../../components"
import { ThemeChange } from "../../features"
import "./homepage.scss"
export const Homepage = () => {
	return (
		<main className='homepage'>
			{/* TODO: Высчитывать добрый день/утро/вечер/ночь */}
			<div className='homepage__top'>
				<div>
					<p className='homepage__welcome'>Добрый день John,</p>
					<p>Как вы сегодня?</p>
				</div>
				<ThemeChange />
			</div>
			<Analytics />
			<WaterAnalytics />
			<WeightAnalytics />
		</main>
	)
}
