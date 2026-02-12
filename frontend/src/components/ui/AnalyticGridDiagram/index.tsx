import { Card, CardContent, Skeleton, Stack, Typography } from "@mui/material"
import "./analyticGridDiagram.scss"
import { BarChart } from "@mui/x-charts"
import { Plus } from "lucide-react"
import { useUserStore } from "../../../shared/stores"
import { useState } from "react"
import { AddUserDrinkModal } from "../../modals"
import { sortUserDrinksByName } from "../../../shared"

interface Props {
	title: string
	description: string
	periods: string[]
}

export const AnalyticGridDiagram = ({ title, description, periods }: Props) => {
	const { user } = useUserStore()
	const [openModal, setOpenModal] = useState(false)

	if (!user) return <Skeleton width={"100%"} height={"350px"} />

	const drinksByName = sortUserDrinksByName(user.userDrinks)
	const series = Object.entries(drinksByName).map(([name, data]) => ({
		label: name,
		data,
		color: user.userDrinks.find(drink => drink.drink.name === name)?.drink
			.color
	}))

	return (
		<>
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
						<button onClick={() => setOpenModal(true)}>
							<Plus />
						</button>
					</div>

					<BarChart
						borderRadius={8}
						colors={user.userDrinks.flatMap(
							({ drink }) => drink.color
						)}
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
			<AddUserDrinkModal
				onClose={() => setOpenModal(false)}
				open={openModal}
			/>
		</>
	)
}
