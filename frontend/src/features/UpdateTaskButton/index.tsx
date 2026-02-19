import { useState } from "react"
import type { ITask } from "../../shared"
import { AddTaskModal } from "../../components"

interface Props {
	task: ITask
	onClose: () => void
}

export const UpdateTaskButton = ({ onClose, task }: Props) => {
	const [open, setOpen] = useState(false)
	return (
		<>
			<button
				onClick={() => setOpen(true)}
				className='button taskModal__button--edit'
			>
				Изменить
			</button>
			<AddTaskModal
				task={task}
				onClose={() => {
					setOpen(false)
					onClose()
				}}
				open={open}
			/>
		</>
	)
}
