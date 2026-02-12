import "./analyticRoundDiagram.scss"
import { Card, CardContent, Skeleton, Stack, Typography } from "@mui/material"
import { PieChart } from "@mui/x-charts"
import { sortUserDrinksByName, type IUserDrink } from "../../../shared"
interface Props {
	title: string
	description?: string
	data?: IUserDrink[]
}

export const AnalyticRoundDiagram = ({ title, description, data }: Props) => {
	if (!data) return <Skeleton width={"100%"} height={"350px"} />

	const totalDrunk = data.reduce((acc, item) => acc + item.ml, 0)

	const drinksByName = sortUserDrinksByName(data)
	const pieData = Object.entries(drinksByName).map(
		([name, values], index) => ({
			id: index,
			label: name,
			value: values.reduce((sum, v) => sum + v, 0)
		})
	)

	return (
		<Card className='analyticRoundDiagram' variant='outlined'>
			<CardContent>
				<div className='analyticDiagram__top'>
					<div>
						<Typography component='h3' gutterBottom>
							{title}
						</Typography>
						<Stack sx={{ justifyContent: "space-between" }}>
							<Typography variant='caption'>
								{description}
							</Typography>
						</Stack>
					</div>
				</div>
				<PieChart
					series={[
						{
							data: pieData,
							innerRadius: 75,
							outerRadius: 100,
							paddingAngle: 0,
							highlightScope: {
								fade: "global",
								highlight: "item"
							}
						}
					]}
					height={250}
					width={250}
				></PieChart>
				<p className='analyticRoundDiagram__total'>
					Всего выпито: <b>{totalDrunk}</b> мл
				</p>
			</CardContent>
		</Card>
	)
}
