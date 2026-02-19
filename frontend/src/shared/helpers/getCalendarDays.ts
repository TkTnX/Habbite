import { getDaysInMonth } from "./getDaysInMonth"

export function getCalendarDays() {
	const now = new Date()
	const year = now.getFullYear()
	const month = now.getMonth()

	const daysInMonth = new Date(year, month + 1, 0).getDate()
	const daysInPrevMonth = new Date(year, month, 0).getDate()

	let firstDay = new Date(year, month, 1).getDay()

	firstDay = firstDay === 0 ? 6 : firstDay - 1
	const days = []

	for (let i = firstDay - 1; i >= 0; i--) {
		days.push({
			day: daysInPrevMonth - i,
			currentMonth: false
		})
	}

	const labels = getDaysInMonth()

	for (let i = 1; i <= daysInMonth; i++) {
		days.push({
			day: i,
			currentMonth: true,
			label: labels.find(label => label.day === i)?.label
		})
	}
	const remaining = 35 - days.length
	for (let i = 1; i <= remaining; i++) {
		days.push({
			day: i,
			currentMonth: false
		})
	}

	return days
}
