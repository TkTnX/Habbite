import {
	useMutation,
	useQuery,
	type UseMutationOptions
} from "@tanstack/react-query"
import { axiosInstance } from "../lib"
import type { ICreateTaskRequest, ITask } from "../types"

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

	return { getTasksQuery, createTaskMutation }
}
