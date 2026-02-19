import {
	useMutation,
	useQuery,
	type UseMutationOptions
} from "@tanstack/react-query"
import { axiosInstance } from "../lib"
import type { ICreateTaskRequest, ITask, IUpdateTaskRequest } from "../types"

export function useTasks() {
	const getTasksQuery = () =>
		useQuery({
			queryKey: ["tasks"],
			queryFn: async (): Promise<ITask[]> => {
				const { data } = await axiosInstance.get("task")
				return data
			}
		})

	const createTaskMutation = (
		options?: Omit<
			UseMutationOptions<unknown, unknown, unknown>,
			"mutationKey" | "mutationFn"
		>
	) =>
		useMutation({
			mutationKey: ["create task"],
			mutationFn: async (body: ICreateTaskRequest) => {
				const { data } = await axiosInstance.post("task", body)

				return data
			},
			...options
		})

	const changeTaskStatusMutation = () =>
		useMutation({
			mutationKey: ["change task status"],
			mutationFn: async (taskId: string) => {
				const { data } = await axiosInstance.patch(
					`task/change-status/${taskId}`
				)
				return data
			}
		})

	const updateTaskMutation = () =>
		useMutation({
			mutationKey: ["update task"],
			mutationFn: async ({
				body,
				taskId
			}: {
				body: IUpdateTaskRequest
				taskId: string
			}) => {
				const { data } = await axiosInstance.patch(
					`task/${taskId}`,
					body
				)

				return data
			}
		})

	return {
		getTasksQuery,
		createTaskMutation,
		changeTaskStatusMutation,
		updateTaskMutation
	}
}
