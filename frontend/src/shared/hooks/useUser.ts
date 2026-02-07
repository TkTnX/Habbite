import { useMutation, useQuery } from "@tanstack/react-query"
import Cookies from "js-cookie"
import { axiosInstance } from "../lib"
import type { IUpdateUser } from "../types"
export function useUser() {
	const accessToken = Cookies.get("accessToken")
	const getMeQuery = () =>
		useQuery({
			queryKey: ["user"],
			queryFn: async () =>
				await axiosInstance.get(`user/me`, {
					headers: {
						Authorization: `Bearer ${accessToken}`
					}
				}),
			enabled: !!accessToken
		})
	
	
	const updateUserMutation = () => useMutation({
		mutationKey: ['update user'],
		mutationFn: async (values: IUpdateUser) => await axiosInstance.patch('user', values) 
	})

	return { getMeQuery, updateUserMutation }
}
