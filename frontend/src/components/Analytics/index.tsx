import "./analytics.scss"
import { AnalyticDiagram, AnalyticGridDiagram } from "../ui"
import { waterPeriod, weightData } from "../../shared"




export const Analytics = () => {
	return (
		<div className='analytics'>
			<h2 className='analytics__title'>Основная аналитика</h2>
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
