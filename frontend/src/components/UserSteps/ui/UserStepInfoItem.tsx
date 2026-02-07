import type { LucideIcon } from "lucide-react"
import type { InputHTMLAttributes } from "react"

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	label: string
	name: string
	metrics?: string
	Icon: LucideIcon
	type?: string
	inputClassName?: string
}

export const UserStepInfoItem = ({
	label,
	name,
	metrics,
	type = "number",
	Icon,
	inputClassName,
	...props
}: Props) => {
	return (
		<div className='userStepInfo__item'>
			<div className='userStepInfo__label'>
				<Icon />
				<p>{label}</p>
			</div>
			<label className='userStepInfo__value'>
				{type === "gender" ? (
					<select required={props.required} name={name}>
						<option value='' hidden selected>
							Пол
						</option>
						<option value='male'>Мужской</option>
						<option value='female'>Женский</option>
					</select>
				) : (
					<input
						{...props}
						className={inputClassName}
						type={type}
						name={name}
					/>
				)}
				{metrics && <span>{metrics}</span>}
			</label>
		</div>
	)
}
