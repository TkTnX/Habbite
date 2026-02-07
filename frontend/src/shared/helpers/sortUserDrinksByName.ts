import type { IUserDrink } from "../types"
import { getWeekDayIndex } from "./getWeekDayIndex"

export function sortUserDrinksByName(userDrinks: IUserDrink[]) {
	const drinksByName: Record<string, number[]> = {}

	userDrinks.forEach(({ drink, ml, createdAt }) => {
		const dayIndex = getWeekDayIndex(createdAt)
		const drinkName = drink.name
		if (!drinksByName[drinkName]) {
			drinksByName[drinkName] = Array(7).fill(0)
		}

		drinksByName[drinkName][dayIndex] += ml
	})

	return drinksByName
}
