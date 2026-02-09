import { Box, Modal } from "@mui/material"
import { FormInput } from "../../ui"
import "./addUserDrinkModal.scss"
import { useWeights } from "../../../shared/hooks"
import { useQueryClient } from "@tanstack/react-query"
import { useUserStore } from "../../../shared/stores"

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

export const AddWeightModal = ({ open, onClose }: Props) => {
	const { user } = useUserStore()
	const queryClient = useQueryClient()
	const { addWeightMutation } = useWeights()
	const { mutate, isPending } = addWeightMutation()

	const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.target)
		const { weight } = Object.fromEntries(formData)
		mutate(Number(weight), {
			onSuccess: () =>
				queryClient.invalidateQueries({ queryKey: ["user"] })
		})
	}

	return (
		<Modal className='addUserDrinkModal' open={open} onClose={onClose}>
			<Box sx={style}>
				<h3 className='addUserDrinkModal__title'>Новый вес</h3>
				<form onSubmit={onSubmit} className='addUserDrinkModal__form'>
					<FormInput
						defaultValue={user?.weights[0].weight}
						disabled={isPending}
						aria-valuemax={10000}
						aria-valuemin={100}
						label='Введите вес'
						name='weight'
						className='addUserDrinkModal__input'
						type='number'
					/>

					<button disabled={isPending} className='button'>
						Добавить
					</button>
				</form>
			</Box>
		</Modal>
	)
}
