import { BMI_GAPS } from "../constants"

export function calculateBMIPosition(BMI: number) {
	const minBMI = BMI_GAPS[0].gap[0]
	const maxBMI = BMI_GAPS.at(-1)!.gap[1]

	const clampedBMI = Math.min(Math.max(BMI, minBMI), maxBMI)
	return (clampedBMI - minBMI) * 20
}
