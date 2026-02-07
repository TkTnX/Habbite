export function calculateBMI(weight: number, height: number) {
	return Number((weight / (height / 100) ** 2).toFixed(1))
}
