import { getDaysInMonth } from "../../shared"
import "./calendar.scss"
export const Calendar = () => {
	const days = getDaysInMonth()
	console.log(days)

	const weeks = Array.from(
		{ length: Math.ceil(days.length / 7) },
		(_, index) => days.slice(index * 7, index * 7 + 7)
	)
	return (
		<table className='calendar'>
			<thead className='calendar__header'>
				<tr className='calendar__tr'>
					<th scope='col' className='calendar__tr-col'>
						Понедельник
					</th>
					<th scope='col' className='calendar__tr-col'>
						Вторник
					</th>
					<th scope='col' className='calendar__tr-col'>
						Среда
					</th>
					<th scope='col' className='calendar__tr-col'>
						Четверг
					</th>
					<th scope='col' className='calendar__tr-col'>
						Пятница
					</th>
					<th scope='col' className='calendar__tr-col'>
						Суббота
					</th>
					<th scope='col' className='calendar__tr-col'>
						Воскресенье
					</th>
				</tr>
            </thead>
            {/* TODO: Правильное отображение дней */}
            {/* TODO: Добавить border radius для таблицы */}
            {/* TODO: Добавление задач */}
			<tbody>
				{weeks.map(week => (
					<tr className='calendar__tr'>
						{week.map(day => (
							<th key={day.label} className='calendar__day'>
								<button>{day.day}</button>
							</th>
						))}
					</tr>
				))}
			</tbody>
		</table>
	)
}
