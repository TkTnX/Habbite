import "./calendarDay.scss"
import { type ICalendarDay, type ITask } from "../../../../shared"
import { useState } from "react"
import { TaskModal } from "../../../modals"
import { Check } from "lucide-react"

interface Props {
	day: ICalendarDay
	index: number
	setOpenAddTask: React.Dispatch<
		React.SetStateAction<ICalendarDay | null | undefined>
	>
	tasks?: ITask[]
}

export const CalendarDay = ({ day, index, setOpenAddTask, tasks }: Props) => {
	const [openTask, setOpenTask] = useState<null | ITask>(null)
	const now = new Date()
	const currDate = now.getDate()
	return (
		<>
			<th
				key={`${day.day}-${index}`}
				className={`calendar__day 
					${!day.currentMonth && "calendar__day--other"} 
				${currDate === day.day && "calendar__day--today"} 
				${(index === 5 || index === 6) && "calendar__day--weekend"} 
				${day.day < now.getDate() && "calendar__day--gone"}`}
			>
				<button
					className='calendar__day-button'
					disabled={!day.currentMonth}
					onClick={() =>
						!(day.day < now.getDate()) && setOpenAddTask(day)
					}
				>
					{day.day}
					{tasks?.map(task => (
						<button
							onClick={e => {
								e.stopPropagation()
								setOpenTask(task)
							}}
							className={`calendar__task ${task.isCompleted && "calendar__task--completed"}`}
							style={{ backgroundColor: task.color }}
							key={task._id}
						>
							{task.isCompleted && <Check size={12} />}
							<span>{task.title}</span>
						</button>
					))}
				</button>
			</th>
			{openTask && (
				<TaskModal
					open={!!openTask}
					task={openTask}
					onClose={() => setOpenTask(null)}
				/>
			)}
		</>
	)
}
