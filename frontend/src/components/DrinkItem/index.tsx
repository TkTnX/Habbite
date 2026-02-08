import type { IDrink } from "../../shared"
import "./drinkItem.scss"

interface Props {
    drink: IDrink
	onClick: (id: string) => void
	isSelected: boolean
}

export const DrinkItem = ({ onClick, drink, isSelected }: Props) => {
	return (
		<button
			type='button'
			onClick={() => onClick(drink._id)}
			style={{ backgroundColor: drink.color }}
			className={`drinkItem ${isSelected && 'active'}`}
		>
			{drink.name}
		</button>
	)
}
