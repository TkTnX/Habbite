import { toast } from "react-toastify"
import { useTasks } from "../../../shared/hooks"
import { FormInput } from "../../ui"
import "./addTaskModal.scss"
import { Box, Modal } from "@mui/material"
import { useQueryClient } from "@tanstack/react-query"
import { getRandomHexColor } from "../../../shared"
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
	date: string
}

export const AddTaskModal = ({ open, date, onClose }: Props) => {
	const queryClient = useQueryClient()
	const { createTaskMutation } = useTasks()
	const { mutate, isPending } = createTaskMutation()

	const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.target)
		const { title, text } = Object.fromEntries(formData)

		mutate(
			{ title: String(title), text: String(text), date: String(date), color: getRandomHexColor() },
			{
				onSuccess: () => {
					toast.success("Задача добавлена!")
					queryClient.invalidateQueries({ queryKey: ["tasks"] })
					onClose()
				}
			}
		)
	}

	return (
		<Modal className='addTaskModal' onClose={onClose} open={open}>
			<Box sx={style}>
				<h3 className='addTaskModal__title'>Добавить задачу</h3>
				<form onSubmit={onSubmit} className='addTaskModal__form'>
					<FormInput
						disabled={isPending}
						label='Заголовок'
						name='title'
						className='addTaskModal__input'
						type='text'
					/>

					<textarea
						name='text'
						disabled={isPending}
						className='addTaskModal__textarea'
						placeholder='Текст задачи'
					/>

					<button disabled={isPending} className='button'>
						Добавить
					</button>
				</form>
			</Box>
		</Modal>
	)
}
