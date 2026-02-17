import { Calendar } from "../../components"

export const TasksPage = () => {
	const now = new Date()
	return (
		<div>
			<p>Месяц: {now.toLocaleDateString("ru-RU", { month: "long" })} </p>
			<Calendar />
		</div>
	)
}
