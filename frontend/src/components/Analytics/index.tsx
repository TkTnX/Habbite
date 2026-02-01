import "./analytics.scss"
import { AnalyticDiagram, AnalyticGridDiagram } from "../ui"

// WEIGHT

const weightData = [
	65, 60, 59, 65, 60, 65, 60, 5, 65, 60, 59, 9, 65, 60, 59, 65, 60, 59, 65,
	60, 65, 60, 5, 65, 60, 59, 9, 65, 60, 59, 59
]

// WATER
const waterPeriod = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]

export const Analytics = () => {
	return (
		<div className='analytics'>
			<h2 className='analytics__title'>Ваша аналитика</h2>
			<div className='analytics__list'>
				<AnalyticDiagram
					color='#f80d38'
					title='Вес (кг)'
					period='Последние 30 дней'
					data={weightData}
				/>
				<AnalyticGridDiagram
					periods={waterPeriod}
					title='Контроль жидкости'
					description='Выпито жидкости за неделю (мл)'
				/>
			</div>
		</div>
	)
}
