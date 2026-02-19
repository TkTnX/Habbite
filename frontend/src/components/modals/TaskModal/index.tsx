import "./taskModal.scss"
import { Box, Modal } from "@mui/material"
import type { ITask } from "../../../shared"
import { ChangeTaskStatus, UpdateTaskButton } from "../../../features"

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "var(--accent-color)",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4
}

interface Props {
	open: boolean
	onClose: () => void
	task: ITask
}

export const TaskModal = ({ open, onClose, task }: Props) => {
	return (
		<Modal className='taskModal' open={open} onClose={onClose}>
			<Box sx={style}>
				<h3 className='taskModal__title'>{task.title}</h3>
				<p className='taskModal__text'>{task.text}</p>
				<div className='taskModal__buttons'>
					<ChangeTaskStatus onClose={onClose} task={task} />
					{!task.isCompleted && <UpdateTaskButton onClose={onClose} task={task} />}
				</div>
			</Box>
		</Modal>
	)
}
