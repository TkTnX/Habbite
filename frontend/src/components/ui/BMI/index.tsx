import "./bmi.scss"
import { BMI_GAPS, calculateBMI, calculateBMIPosition } from "../../../shared"
import { Tooltip } from "@mui/material"
import { useUserStore } from "../../../shared/stores"
export const BMI = () => {
	const { user } = useUserStore()
	if (!user) return null

	const BMI = calculateBMI(user.weight!, user.height!)
	const { clampedBMI, BMIRange } = calculateBMIPosition(BMI)

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
				<div className='bmi__info-item'>
					<h4 className='bmi__info-title'>Очень сильное истощение</h4>
					<p className='bmi__info-desc'>
						<span>{"ИМТ < 16"}</span> Сильный дефицит массы тела.
						Рекомендуется срочно обратиться к специалисту и работать
						над набором веса под наблюдением врача.
					</p>
				</div>
				<div className='bmi__info-item'>
					<h4 className='bmi__info-title'>
						Недостаточная масса тела
					</h4>
					<p className='bmi__info-desc'>
						<span>{"ИМТ 16 - 18.5"}</span> Масса тела ниже нормы.
						Возможно, организму не хватает питательных веществ —
						стоит обратить внимание на рацион и общее самочувствие.
					</p>
				</div>
				<div className='bmi__info-item'>
					<h4 className='bmi__info-title'> Норма</h4>
					<p className='bmi__info-desc'>
						<span>{"ИМТ 18.5 – 25"}</span> Оптимальный вес для
						здоровья. Поддерживайте текущий образ жизни,
						сбалансированное питание и регулярную физическую
						активность.
					</p>
				</div>
				<div className='bmi__info-item'>
					<h4 className='bmi__info-title'>Избыточная масса тела</h4>
					<p className='bmi__info-desc'>
						<span>{"ИМТ 25 - 30"}</span> Вес выше нормы. Небольшая
						коррекция питания и увеличение активности помогут
						снизить нагрузку на организм.
					</p>
				</div>
				<div className='bmi__info-item'>
					<h4 className='bmi__info-title'> Ожирение I степени</h4>
					<p className='bmi__info-desc'>
						<span>{"ИМТ 30 - 35"}</span> Повышенный риск для
						здоровья. Рекомендуется постепенное снижение веса и
						консультация специалиста.
					</p>
				</div>
				<div className='bmi__info-item'>
					<h4 className='bmi__info-title'> Ожирение II степени</h4>
					<p className='bmi__info-desc'>
						<span>{"ИМТ 35 - 40"}</span> Высокий риск развития
						хронических заболеваний. Необходимо обратиться к врачу
						для подбора индивидуального плана лечения.
					</p>
				</div>
			</div>
		</div>
	)
}
