export const getWeekDayIndex = (dateInput: string | Date) => {
	const date = new Date(dateInput)
	const now = new Date()

	const monday = new Date(now)
	const day = now.getDate() || 7
	monday.setDate(now.getDate() - day + 1)
	monday.setHours(0, 0, 0, 0)

	const diff =
		new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate()
		).getTime() - monday.getTime()

	const index = Math.floor(diff / 864000000)

	if (index < 0 || index > 6) return -1

	return index
}
