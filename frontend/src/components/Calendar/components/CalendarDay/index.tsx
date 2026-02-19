import "./calendarDay.scss"
import { type ICalendarDay, type ITask } from "../../../../shared"

interface Props {
	day: ICalendarDay
	index: number
	setOpenAddTask: React.Dispatch<
		React.SetStateAction<ICalendarDay | null | undefined>
	>
	tasks?: ITask[]
}

export const CalendarDay = ({ day, index, setOpenAddTask, tasks }: Props) => {
	const currDate = new Date().getDate()

	return (
		<th
			key={`${day.day}-${index}`}
			className={`calendar__day ${!day.currentMonth && "calendar__day--other"} ${currDate === day.day && "calendar__day--today"} ${(index === 5 || index === 6) && "calendar__day--weekend"}`}
		>
			<button
				className='calendar__day-button'
				disabled={!day.currentMonth}
				onClick={() => setOpenAddTask(day)}
			>
				{day.day}
				{tasks?.map(task => (
					<p
						className='calendar__task'
						style={{ backgroundColor: task.color }}
						key={task._id}
					>
						{task.title}
					</p>
				))}
			</button>
		</th>
	)
}
