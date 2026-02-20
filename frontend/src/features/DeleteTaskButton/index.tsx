import { Trash } from "lucide-react"
import "./deleteTaskButton.scss"
import { useTasks } from "../../shared/hooks"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"

interface Props {
	taskId: string
	onClose: () => void
}

export const DeleteTaskButton = ({ taskId, onClose }: Props) => {
	const queryClient = useQueryClient()
	const { deleteTaskMutation } = useTasks()
	const { mutate, isPending } = deleteTaskMutation()

	const onClick = () => {
		mutate(taskId, {
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["tasks"] })
				toast.success("Задача удалена!")
				onClose()
			}
		})
	}

	return (
		<button
			onClick={onClick}
			disabled={isPending}
			className='deleteTaskButton'
		>
			<Trash color='red' />
		</button>
	)
}
