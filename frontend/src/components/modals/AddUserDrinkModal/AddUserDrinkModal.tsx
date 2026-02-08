import { Box, Modal } from "@mui/material"
import { FormInput } from "../../ui"
import "./addUserDrinkModal.scss"
import { DrinksList } from "../../DrinksList"
import { useState } from "react"
import { toast } from "react-toastify"
import { useDrinks } from "../../../shared/hooks"
import { useQueryClient } from "@tanstack/react-query"

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "var(--accent-color)",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4
}

interface Props {
	open: boolean
	onClose: () => void
}

export const AddUserDrinkModal = ({ open, onClose }: Props) => {
	const queryClient = useQueryClient()
	const { createUserDrinkMutation } = useDrinks()
	const { mutate, isPending } = createUserDrinkMutation()
	const [selectedDrink, setSelectedDrink] = useState<string | null>(null)
	const onAddDrink = (id: string) => setSelectedDrink(id)

	const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!selectedDrink) return toast.error("Выберите напиток!")
		const formData = new FormData(e.target)
		const { ml } = Object.fromEntries(formData)

		mutate(
			{ ml: Number(ml), drink: selectedDrink },
			{
				onSuccess: () => {
					queryClient.invalidateQueries({ queryKey: ["user"] })
					onClose()
				}
			}
		)
	}

	return (
		<Modal className='addUserDrinkModal' open={open} onClose={onClose}>
			<Box sx={style}>
				<h3 className='addUserDrinkModal__title'>Добавить напиток</h3>
				<form onSubmit={onSubmit} className='addUserDrinkModal__form'>
					<FormInput
						disabled={isPending}
						aria-valuemax={10000}
						aria-valuemin={100}
						label='Количество жидкости'
						name='ml'
						className='addUserDrinkModal__input'
						type='number'
					/>

					<DrinksList
						onAddDrink={onAddDrink}
						selectedDrink={selectedDrink}
					/>
					<button disabled={isPending} className='button'>
						Добавить
					</button>
				</form>
			</Box>
		</Modal>
	)
}
