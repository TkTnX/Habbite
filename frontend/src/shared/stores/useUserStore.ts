import { create } from "zustand"
import type { IUser } from "../types"
interface IUserStore {
	user: null | IUser
	setUser: (user: IUser) => void
}

export const useUserStore = create<IUserStore>(set => ({
	user: null,
	setUser(user) {
		set({ user })
	}
}))
