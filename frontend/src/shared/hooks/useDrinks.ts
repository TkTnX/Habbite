import {
	useMutation,
	useQuery,
	type UseMutationOptions
} from "@tanstack/react-query"
import { axiosInstance } from "../lib"
import type { IDrink,  IUserDrinkRequest } from "../types"

export function useDrinks() {
	const getDrinksQuery = () =>
		useQuery({
			queryKey: ["drinks"],
			queryFn: async (): Promise<IDrink[]> => {
				const { data } = await axiosInstance.get("drink")
				return data
			}
		})

	const createUserDrinkMutation = (
		options?: Omit<
			UseMutationOptions<unknown, unknown, unknown, unknown>,
			"mutationKey" | "mutationFn"
		>
	) =>
		useMutation({
			mutationKey: ["create user drink"],
			mutationFn: async (data: IUserDrinkRequest) =>
				await axiosInstance.post("drink/user", data),
			...options
		})

	return { getDrinksQuery, createUserDrinkMutation }
}
