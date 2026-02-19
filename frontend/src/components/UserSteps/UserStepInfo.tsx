import { Cake, Goal, Ruler, VenusAndMars, Weight } from "lucide-react"
import "./userSteps.scss"
import { UserStepInfoItem } from "./ui/UserStepInfoItem"
import { useUser } from "../../shared/hooks"
import type { IUpdateUser } from "../../shared"
import { useState } from "react"
import { BodyShape } from "../BodyShape"
import { useDebounce } from "use-debounce"
interface Props {
	onNextStep: () => void
}

export const UserStepInfo = ({ onNextStep }: Props) => {
	const [bodyShape, setBodyShape] = useState<{
		height: null | number
		weight: null | number
	}>({ height: null, weight: null })
	const [value] = useDebounce(bodyShape, 1000)

	const { updateUserMutation } = useUser()
	const { mutate, isPending } = updateUserMutation()

	const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.target)
		const values = Object.fromEntries(formData) as unknown as IUpdateUser
		mutate(values, {
			onSuccess: () => {
				onNextStep()
			}
		})
	}

	return (
		<div className='userStepInfo'>
			<h4 className='steps__title'>Данные о вас</h4>
			<p className='steps__subtitle'>
				Ваши данные помогут нам точнее отображать показатели
			</p>
			<div className='userStepInfo__wrapper'>
				<form onSubmit={onSubmit} className='userStepInfo__items'>
					<UserStepInfoItem
						onChange={e =>
							setBodyShape({
								...bodyShape,
								height: Number(e.target.value)
							})
						}
						disabled={isPending}
						label='Рост'
						Icon={Ruler}
						metrics='см'
						name='height'
						required={true}
						min={100}
						max={300}
					/>
					<UserStepInfoItem
						onChange={e =>
							setBodyShape({
								...bodyShape,
								weight: Number(e.target.value)
							})
						}
						disabled={isPending}
						label='Вес'
						Icon={Weight}
						metrics='кг'
						name='weight'
						required={true}
						min={30}
						max={300}
					/>
					<UserStepInfoItem
						disabled={isPending}
						label='Желаемый вес'
						Icon={Goal}
						metrics='кг'
						name='weightGoal'
						required={true}
						min={30}
						max={300}
					/>
					<UserStepInfoItem
						disabled={isPending}
						label='Пол'
						Icon={VenusAndMars}
						name='gender'
						type='gender'
						required={true}
					/>
					<UserStepInfoItem
						disabled={isPending}
						inputClassName='userStepInfo__item-date'
						label='Дата рождения'
						Icon={Cake}
						name='birthday'
						type='date'
						required={true}
					/>
					<button
						disabled={isPending}
						type='submit'
						className='button'
					>
						Далее
					</button>
				</form>
				{value.height && value.weight ? (
					<BodyShape height={value.height} weight={value.weight} />
				) : (
					""
				)}
			</div>
		</div>
	)
}
