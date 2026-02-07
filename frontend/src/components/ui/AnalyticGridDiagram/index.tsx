import { Card, CardContent, Stack, Typography } from "@mui/material"
import "./analyticGridDiagram.scss"
import { BarChart } from "@mui/x-charts"
import { Plus } from "lucide-react"
import { useUserStore } from "../../../shared/stores"
import { sortUserDrinksByName } from "../../../shared"

interface Props {
	title: string
	description: string
	periods: string[]
}

export const AnalyticGridDiagram = ({ title, description, periods }: Props) => {
	const { user } = useUserStore()

	if (!user) return null
	const drinksByName = sortUserDrinksByName(user.userDrinks)
	const series = Object.entries(drinksByName).map(([drinkName, data]) => {
		const drink = user.userDrinks.find(
			userDrink => userDrink.drink.name === drinkName
		)

		return { label: drinkName, data, color: drink?.drink.color }
	})


	return (
		<Card className='analyticGridDiagram' variant='outlined'>
			<CardContent>
				<div className='analyticDiagram__top'>
					<div>
						<Typography component='h3' gutterBottom>
							{title}
						</Typography>
						<Stack sx={{ justifyContent: "space-between" }}>
							<Typography
								variant='caption'
								sx={{ color: "text.secondary" }}
							>
								{description}
							</Typography>
						</Stack>
					</div>
					<button>
						<Plus />
					</button>
				</div>

				<BarChart
					borderRadius={8}
					colors={user.userDrinks.flatMap(({ drink }) => drink.color)}
					xAxis={[
						{
							scaleType: "band",
							categoryGapRatio: 0.5,
							data: periods,
							height: 24
						}
					]}
					series={series}
					height={250}
					margin={{ left: 0, right: 0, top: 20, bottom: 0 }}
					grid={{ horizontal: true }}
					hideLegend
				/>
			</CardContent>
		</Card>
	)
}
