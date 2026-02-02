import { Card, CardContent, Stack, Typography } from "@mui/material"
import "./analyticGridDiagram.scss"
import { BarChart } from "@mui/x-charts"
import { Plus } from "lucide-react"

interface Props {
	title: string
	description: string
	periods: string[]
}

export const AnalyticGridDiagram = ({ title, description, periods }: Props) => {
	const blueColor = getComputedStyle(document.documentElement)
		.getPropertyValue("--color-blue")
		.trim()
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
					colors={[blueColor]}
					xAxis={[
						{
							scaleType: "band",
							categoryGapRatio: 0.5,
							data: periods,
							height: 24
						}
					]}
					series={[
						{
							id: "millilitres",
							label: "Выпито",
							data: [4000, 2000, 3000, 100, 3000]
						}
					]}
					height={250}
					margin={{ left: 0, right: 0, top: 20, bottom: 0 }}
					grid={{ horizontal: true }}
					hideLegend
				/>
			</CardContent>
		</Card>
	)
}
