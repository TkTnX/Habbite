import axios from "axios"
import { getAccessToken, setAccessToken } from "../helpers"

let isRefreshing = false
let failedQueue: any[] = []

export const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_PUBLIC_SERVER_URL,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json"
	}
})

axiosInstance.interceptors.request.use(
	config => {
		const token = getAccessToken()

		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	error => Promise.reject(error)
)

const processQueue = (error: unknown | null, token = null) => {
	failedQueue.forEach(prom => {
		if (error) {
			prom.reject(error)
		} else {
			prom.resolve(token)
		}
	})

	failedQueue = []
}

axiosInstance.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config

		if (error.response?.status === 401 && !originalRequest._retry) {
			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					failedQueue.push({
						resolve: (token: string) => {
							originalRequest.headers.Authorization = `Bearer ${token}`
							resolve(axiosInstance(originalRequest))
						},
						reject
					})
				})
			}

			originalRequest._retry = true
			isRefreshing = true

			try {
				const response = await axiosInstance.post("auth/refresh")

				const newAccessToken = response.data.accessToken
				setAccessToken(newAccessToken)

				processQueue(null, newAccessToken)

				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

				return axiosInstance(originalRequest)
			} catch (err) {
				processQueue(err, null)
				return Promise.reject(err)
			} finally {
				isRefreshing = false
			}
		}

		return Promise.reject(error)
	}
)
