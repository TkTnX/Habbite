import { calculateBMI } from "../../shared"
import "./bodyShape.scss"

interface Props {
	height: number
	weight: number
}

export const BodyShape = ({ height, weight }: Props) => {
	const BMI = calculateBMI(weight, height)
	let shapeIndex = 1
	if (BMI < 18.5) {
		shapeIndex = 1
	} else if (BMI > 18.5 && BMI < 25) {
		shapeIndex = 2
	} else if (BMI > 25 && BMI < 30) {
		shapeIndex = 3
	} else if (BMI > 30 && BMI < 35) {
		shapeIndex = 4
	} else {
		shapeIndex = 5
	}

	return (
		<div className='bodyShape'>
			<img src={`/images/shapes/${shapeIndex}.png`} alt='Форма тела' />
		</div>
	)
}
