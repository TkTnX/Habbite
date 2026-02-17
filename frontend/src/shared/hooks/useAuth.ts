import { useMutation, type UseMutationOptions } from "@tanstack/react-query"
import { axiosInstance } from "../lib"
import type {
	AuthAxiosError,
	ILoginRequest,
	INewPasswordRequest,
	IRegisterRequest
} from "../types"
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

	const logoutMutation = (
		options?: Omit<
			UseMutationOptions<unknown, unknown, void>,
			"mutationKey" | "mutationFn"
		>
	) =>
		useMutation({
			mutationKey: ["logout"],
			mutationFn: async () => await axiosInstance.post("auth/logout"),
			...options
		})

	const sendResetPasswordEmailMutation = (
		options?: Omit<
			UseMutationOptions<unknown, AuthAxiosError, unknown>,
			"mutationKey" | "mutationFn"
		>
	) =>
		useMutation({
			mutationKey: ["send reset password email"],
			mutationFn: async (email: string) => {
				const { data } = await axiosInstance.post("auth/send-email", {
					email
				})

				return data
			},
			...options
		})

	const newPasswordMutation = (
		options?: Omit<
			UseMutationOptions<unknown, AuthAxiosError, unknown>,
			"mutationKey" | "mutationFn"
		>
	) =>
		useMutation({
			mutationKey: ["set new password"],
			mutationFn: async (body: INewPasswordRequest) => {
				const { data } = await axiosInstance.patch(
					"auth/new-password",
					body
				)
				return data
			},
			...options
		})

	return {
		registerMutation,
		loginMutation,
		logoutMutation,
		sendResetPasswordEmailMutation,
		newPasswordMutation
	}
}
