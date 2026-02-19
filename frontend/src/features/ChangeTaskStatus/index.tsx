import { useQueryClient } from "@tanstack/react-query"
import type { ITask } from "../../shared"
import { useTasks } from "../../shared/hooks"

interface Props {
	task: ITask
	onClose: () => void
}

export const ChangeTaskStatus = ({ task, onClose }: Props) => {
	const queryClient = useQueryClient()
	const { changeTaskStatusMutation } = useTasks()
	const { mutate, isPending } = changeTaskStatusMutation()

	const onClick = (taskId: string) =>
		mutate(taskId, {
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: ["tasks"]
				})
				onClose()
			}
		})

	return (
		<button
			onClick={() => onClick(task._id)}
			disabled={isPending}
			className='button taskModal__button--submit'
		>
			{task.isCompleted ? "Выполнено" : "Готово"}
		</button>
	)
}
