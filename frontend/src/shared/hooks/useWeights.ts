import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "../lib"

export function useWeights() {
	const addWeightMutation = () =>
		useMutation({
			mutationKey: ["add weight"],
			mutationFn: async (weight: number) =>
				await axiosInstance.post("weight", { weight })
        })
    
    return {
        addWeightMutation
    }
}
