import { waterPeriod } from "../../shared"
import { useUserStore } from "../../shared/stores"
import { AnalyticGridDiagram, AnalyticRoundDiagram } from "../ui"
import "./waterAnalytics.scss"


export const WaterAnalytics = () => {
	const { user } = useUserStore()

	if (!user) return null
	return (
		<section className='waterAnalytics'>
			<h2 className='analytics__title'>Водяной анализ</h2>
			<div className='waterAnalytics__list'>
				<AnalyticGridDiagram
					title='Выпито за неделю (мл)'
					description='Ваш водяной баланс за неделю'
					periods={waterPeriod}
				/>
				<AnalyticRoundDiagram
					data={user.userDrinks}
					title='Виды жидкостей'
				/>
			</div>
		</section>
	)
}
