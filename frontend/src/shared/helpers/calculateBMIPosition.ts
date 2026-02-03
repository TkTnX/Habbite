import { BMI_GAPS } from "../constants"

export function calculateBMIPosition(BMI: number) {
	const minBMI = BMI_GAPS[0].gap[0]
	const maxBMI = BMI_GAPS.at(-1)!.gap[1]
	const BMIRange = maxBMI - minBMI

	const clampedBMI = `${((BMI - minBMI) / (maxBMI - minBMI)) * 100}%`
	return {
		clampedBMI,
		BMIRange
	}
}
