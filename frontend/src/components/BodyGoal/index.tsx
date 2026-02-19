import { Skeleton } from "@mui/material"
import { useUserStore } from "../../shared/stores"
import "./bodyGoal.scss"
import { BodyShape } from "../BodyShape"
import { BMI_INFO, calculateBMI } from "../../shared"

export const BodyGoal = () => {
	const { user } = useUserStore()
	if (!user) return <Skeleton width={"100%"} height={"350px"} />
	const currWeight = user.weights[0]?.weight
	const BMI = calculateBMI(user.weights[0]?.weight, Number(user.height))
	const BMIIndex = BMI_INFO.find((item, index) => {
		const gap = item.value
			.split(" ")
			.map(n => parseInt(n))
			.filter(item => !isNaN(item))
		if (
			(BMI >= gap[0] && BMI <= gap[1]) ||
			(gap.length === 1 && BMI <= gap[0]) ||
			(gap.length === 1 && BMI >= gap[0])
		)
			return index
	})


	return (
		<section className='bodyGoal'>
			<h3 className='bodyGoal__title'>Ваше тело</h3>
			<div className='bodyGoal__wrapper'>
				<BodyShape
					className='bodyGoal__image'
					height={Number(user.height)}
					weight={user.weights[0]?.weight}
				/>
				<div className='bodyGoal__info'>
					<p className='bodyGoal__item'>
						Нынешний вес: <span>{currWeight}кг</span>
					</p>
					{currWeight >= Number(user.weightGoal) ? (
						<p className='bodyGoal__item'>
							До цели осталось всего{" "}
							{currWeight - Number(user.weightGoal)}кг. Вперёд к
							достижению мечты!
						</p>
					) : (
						<p className='bodyGoal__item'>
							Вы достигли свои цели в {Number(user.weightGoal)}кг.
							Вы справились. Поздравляем!
						</p>
					)}
					<p className='bodyGoal__item'>
						ИМТ: <span>{BMI}</span>. {BMIIndex?.hint}
					</p>
				</div>
			</div>
		</section>
	)
}
