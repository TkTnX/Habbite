import "./tasksPage.scss"
import { Calendar } from "../../components"

export const TasksPage = () => {
	const now = new Date()
	return (
		<section className="tasks" >
			<p className="tasks__month">Месяц: {now.toLocaleDateString("ru-RU", { month: "long" })} </p>
			<Calendar />
		</section>
	)
}
