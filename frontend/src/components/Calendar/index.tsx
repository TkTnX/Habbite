import { useState } from "react"
import { getCalendarDays, type ICalendarDay } from "../../shared"
import "./calendar.scss"
import { AddTaskModal } from "../modals"
import { useTasks } from "../../shared/hooks"

import { CalendarDay } from "./components/CalendarDay"


export const Calendar = () => {
	const { getTasksQuery } = useTasks()
	const { data: tasks } = getTasksQuery()
	const [openAddTask, setOpenAddTask] = useState<null | ICalendarDay>()
	const days = getCalendarDays()

	const weeks = Array.from(
		{ length: Math.ceil(days.length / 7) },
		(_, index) => days.slice(index * 7, index * 7 + 7)
	)

	return (
		<>
			<div className='calendarWrapper'>
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
					<tbody>
						{weeks.map((week, index) => (
							<tr key={index} className='calendar__tr'>
								{week.map((day, index) => (
									<CalendarDay
										tasks={tasks?.filter(
											task => task.date === day.label
										)}
										day={day as ICalendarDay}
										index={index}
										setOpenAddTask={setOpenAddTask}
									/>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<AddTaskModal
				date={openAddTask?.label!}
				open={!!openAddTask}
				onClose={() => setOpenAddTask(null)}
			/>
		</>
	)
}
