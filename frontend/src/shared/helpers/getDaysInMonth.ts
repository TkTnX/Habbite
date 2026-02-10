export function getDaysInMonth() {
	const now = new Date()
	const date = new Date(now.getFullYear(), now.getMonth() + 1, 0)
	const monthName = date.toLocaleDateString("ru-RU", {
		month: "short"
	})

	const daysInMonth = date.getDate()
	const days = []
	let i = 1
	while (days.length < daysInMonth) {
		days.push(`${monthName} ${i}`)
		i += 1
	}
	return Array.from({ length: date.getDate() }, (_, i) => ({
		label: `${monthName} ${i + 1}`,
		day: i + 1
	}))
}
