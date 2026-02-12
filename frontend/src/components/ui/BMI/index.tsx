import "./bmi.scss"
import {
	BMI_GAPS,
	BMI_INFO,
	calculateBMI,
	calculateBMIPosition
} from "../../../shared"
import { Skeleton, Tooltip } from "@mui/material"
import { useUserStore } from "../../../shared/stores"
export const BMI = () => {
	const { user } = useUserStore()
	if (!user) return <Skeleton width={"100%"} height={"350px"} />

	const BMI = calculateBMI(user.weights[0]?.weight!, user.height!)
	const { clampedBMI, BMIRange } = calculateBMIPosition(BMI)

	// TODO: Добавление userDrinks через client

	return (
		<div className='bmi'>
			<div className='bmi__line'>
				{BMI_GAPS.map(gap => (
					<Tooltip key={gap.label} title={gap.gap.join(" - ")}>
						<div
							className='bmi__gap'
							style={{
								backgroundColor: gap.color,
								width: `${((gap.gap[1] - gap.gap[0]) / BMIRange) * 100}%`
							}}
						>
							<p className='bmi__gap-max'>{gap.gap[1]}</p>
						</div>
					</Tooltip>
				))}
				<div className='bmi__marker' style={{ left: clampedBMI }}>
					<p className='bmi__marker-num'>{BMI}</p>
				</div>
			</div>
			<div className='bmi__info'>
				{BMI_INFO.map(item => (
					<div className='bmi__info-item'>
						<h4 className='bmi__info-title'>{item.title}</h4>
						<p className='bmi__info-desc'>
							<span>{item.value}</span> {item.desc}
						</p>
					</div>
				))}
			</div>
		</div>
	)
}
