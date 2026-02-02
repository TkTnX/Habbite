import { waterPeriod } from "../../shared"
import { AnalyticGridDiagram, AnalyticRoundDiagram } from "../ui"
import "./waterAnalytics.scss"

// Drink types
const drinkTypes = [
	{ label: "Вода", value: 50000, color: "blue" },
	{ label: "Кофе", value: 35000, color: "brown" },
	{ label: "Чай", value: 10000, color: "yellow" },
	{ label: "Лимонад", value: 5000, color: "orange" },
	{ label: "Молоко", value: 5000, color: "gray" }
]

export const WaterAnalytics = () => {
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
					data={drinkTypes}
					title='Виды жидкостей'
				/>
			</div>
		</section>
	)
}
