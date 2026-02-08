import { Skeleton } from "@mui/material"
import { useDrinks } from "../../shared/hooks"
import "./drinksList.scss"
import { DrinkItem } from "../DrinkItem"

interface Props {
	onAddDrink: (id: string) => void
	selectedDrink: string
}

export const DrinksList = ({ onAddDrink, selectedDrink }: Props) => {
	const { getDrinksQuery } = useDrinks()
	const { data, isPending, error } = getDrinksQuery()

	if (error) return <p className='errorMessage'>{error.message}</p>

	return (
		<div className='drinksList'>
			{isPending
				? [...new Array(5)].map((_, index) => (
						<Skeleton width={"50px"} height={"30px"} key={index} />
					))
				: data.map(drink => (
					<DrinkItem
						isSelected={selectedDrink === drink._id}
							onClick={onAddDrink}
							key={drink._id}
							drink={drink}
						/>
					))}
		</div>
	)
}
