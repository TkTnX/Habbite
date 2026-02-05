import { useMutation, type UseMutationOptions } from "@tanstack/react-query"
import { axiosInstance } from "../lib"
import type { AuthAxiosError, ILoginRequest, IRegisterRequest } from "../types"
export function useAuth() {
	const registerMutation = (
		options?: Omit<
			UseMutationOptions<unknown, AuthAxiosError, unknown>,
			"mutationKey" | "mutationFn"
		>
	) =>
		useMutation({
			mutationKey: ["register"],
			mutationFn: async (body: IRegisterRequest) =>
				await axiosInstance.post("auth/registration", body),
			...options
		})

	const loginMutation = (
		options?: Omit<
			UseMutationOptions<unknown, AuthAxiosError, unknown>,
			"mutationKey" | "mutationFn"
		>
	) =>
		useMutation({
			mutationKey: ["login"],
			mutationFn: async (body: ILoginRequest) =>
				await axiosInstance.post("auth/login", body),

			...options
		})

	return { registerMutation, loginMutation }
}
