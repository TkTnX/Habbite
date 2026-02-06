import { useQuery } from "@tanstack/react-query"
import Cookies from "js-cookie"
import { axiosInstance } from "../lib"
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

	return { getMeQuery }
}
