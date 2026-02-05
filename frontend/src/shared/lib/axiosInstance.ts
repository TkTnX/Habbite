import axios from "axios"
console.log(import.meta.env.SERVER_URL)
export const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_PUBLIC_SERVER_URL,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json"
	}
})
