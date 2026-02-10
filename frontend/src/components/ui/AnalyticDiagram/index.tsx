import { Box, Card, CardContent, Typography } from "@mui/material"
import "./analyticDiagram.scss"
import { areaElementClasses, SparkLineChart } from "@mui/x-charts"
import { getDaysInMonth } from "../../../shared"
import { AreaGradient } from "../AreaGradient"
import { Plus } from "lucide-react"
import { useUserStore } from "../../../shared/stores"
import { useState } from "react"
import { AddWeightModal } from "../../modals"

interface Props {
	title: string
	period: string
	color: string
}

export const AnalyticDiagram = ({ title, period, color }: Props) => {
	const now = new Date()
	const [openModal, setOpenModal] = useState(false)
	const { user } = useUserStore()
	const days = getDaysInMonth()
	// TODO: В будущем выводить skeleton
	if (!user) return null

	const monthWeights = user.weights.filter(w => {
		const date = new Date(w.createdAt)
		return (
			date.getMonth() === now.getMonth() &&
			date.getFullYear() === now.getFullYear()
		)
	})
	const weights = days.map(({ day }) => {
		const weightForDay = monthWeights.find(w => {
			const date = new Date(w.createdAt)
			return date.getDate() === day
		})

		if (weightForDay) {
			return weightForDay.weight
		}

		return null
	})

	return (
		<>
			<Card className='analyticDiagram' variant={"outlined"}>
				<CardContent>
					<div className='analyticDiagram__top'>
						<div>
							<Typography component='h3' gutterBottom>
								{title}{" "}
							</Typography>
							<p>
								Настоящий вес: {user.weights[0]?.weight || "-"}{" "}
								кг
							</p>
							<Typography variant='caption'>{period}</Typography>
						</div>
						<button onClick={() => setOpenModal(true)}>
							<Plus />
						</button>
					</div>
					<Box>
						<SparkLineChart
							height={250}
							color={color}
							// @ts-ignore
							data={weights || []}
							area
							showTooltip
							xAxis={{
								scaleType: "band",
								data: days.map(d => d.label)
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
			{openModal && (
				<AddWeightModal
					open={openModal}
					onClose={() => setOpenModal(false)}
				/>
			)}
		</>
	)
}
