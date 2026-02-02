import "./analyticRoundDiagram.scss"
import { Card, CardContent, Stack, Typography } from "@mui/material"
import { PieChart } from "@mui/x-charts"
interface Props {
	title: string
	description?: string
	data: { label: string; value: number; color: string }[]
}

export const AnalyticRoundDiagram = ({ title, description, data }: Props) => {
	const totalDrunk = data.reduce((acc, item) => acc + item.value, 0)
	return (
		<Card className='analyticRoundDiagram' variant='outlined'>
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
				</div>
				<PieChart
					series={[
						{
							data,
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
