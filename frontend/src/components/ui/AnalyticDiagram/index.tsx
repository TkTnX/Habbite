import { Box, Card, CardContent, Skeleton, Typography } from "@mui/material"
import "./analyticDiagram.scss"
import { LineChart } from "@mui/x-charts"
import { Plus } from "lucide-react"
import { useUserStore } from "../../../shared/stores"
import { useState } from "react"
import { AddWeightModal } from "../../modals"

interface Props {
	title: string
	period: string
}

export const AnalyticDiagram = ({ title, period }: Props) => {
	const now = new Date()
	const [openModal, setOpenModal] = useState(false)
	const { user } = useUserStore()
	if (!user) return <Skeleton width={"100%"} height={"350px"} />

	let monthWeights = user.weights.filter(w => {
		const date = new Date(w.createdAt)
		return (
			date.getMonth() === now.getMonth() &&
			date.getFullYear() === now.getFullYear()
		)
	})

	const sortedMonthWeight = [...monthWeights].sort((a, b) => {
		return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
	})

	const lables = sortedMonthWeight.map(w => {
		const date = new Date(w.createdAt)
		return date.getDate().toString()
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
						<LineChart
							xAxis={[
								{
									scaleType: "point",
									data: lables
								}
							]}
							series={[
								{
									data: sortedMonthWeight.map(
										({ weight }) => weight
									),
									showMark: true
								}
							]}
							height={250}
							margin={{ left: 0, right: 0, top: 20, bottom: 0 }}
							grid={{ horizontal: true }}
							hideLegend
						/>
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
