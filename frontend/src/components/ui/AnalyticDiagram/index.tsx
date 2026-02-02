import { Box, Card, CardContent, Typography } from "@mui/material"
import "./analyticDiagram.scss"
import { areaElementClasses, SparkLineChart } from "@mui/x-charts"
import { getDaysInMonth } from "../../../shared"
import { AreaGradient } from "../AreaGradient"
import { Plus } from "lucide-react"

interface Props {
	title: string
	period: string
	data: number[]
	color: string
}

export const AnalyticDiagram = ({ title, period, data, color }: Props) => {
	return (
		<Card className='analyticDiagram' variant={"outlined"}>
			<CardContent>
				<div className='analyticDiagram__top'>
					<div>
						<Typography component='h3' gutterBottom>
							{title}
						</Typography>
						<Typography variant='caption'>{period}</Typography>
					</div>
					<button>
						<Plus />
					</button>
				</div>
				<Box>
					<SparkLineChart
						height={250}
						color={color}
						data={data}
						area
						showTooltip
						xAxis={{
							scaleType: "band",
							data: getDaysInMonth()
						}}
						sx={{
							[`& .${areaElementClasses.root}`]: {
								fill: "url(#area-gradient-weight)"
							}
						}}
					>
						<AreaGradient
							color={color}
							id={"area-gradient-weight"}
						/>
					</SparkLineChart>
				</Box>
			</CardContent>
		</Card>
	)
}
