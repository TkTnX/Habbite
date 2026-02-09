import { Tooltip } from "@mui/material"
import { AnalyticDiagram, BMI } from "../ui"
import "./weightAnalytics.scss"
import { weightData } from "../../shared"
import { useUserStore } from "../../shared/stores"

export const WeightAnalytics = () => {
	const { user } = useUserStore()

	if (!user) return null

	return (
		<section className='weightAnalytics'>
			<h2 className='analytics__title'>
				Физические показатели и{" "}
				<Tooltip
					title={
						"Индекс массы тела (ИМТ) — это величина, которая позволяет оценить степень соответствия массы человека и его роста"
					}
				>
					<span>ИМТ*</span>
				</Tooltip>
			</h2>
			<div className='weightAnalytics__list'>
				<BMI />
				<AnalyticDiagram
					color='#f80d38'
					title='Вес (кг)'
					period='Последние 30 дней'
					data={weightData}
				/>
			</div>
		</section>
	)
}
