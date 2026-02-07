import { Check } from "lucide-react"
import { UserStepInfo } from "../../components"
import "./startPage.scss"
import { useState } from "react"
import { Link } from "react-router"

export const StartPage = () => {
	const [step, setStep] = useState(0)
	const onNextStep = () => setStep(prev => prev + 1)
	return (
		<div className='steps'>
			<div className='steps__wrapper'>
				{step === 0 ? (
					<>
						<h3 className='steps__title'>Добро пожаловать!</h3>
						<p className='steps__subtitle'>
							Мы бы хотели попросить вас пройти небольшой опрос,
							для работы с приложением
						</p>
						<button onClick={onNextStep} className='button '>
							Далее
						</button>
					</>
				) : step === 1 ? (
					<UserStepInfo onNextStep={onNextStep} />
				) : (
					step === 2 && (
						<div className="steps__final">
							<div className='steps__success'>
								<Check />
							</div>
							<p className="steps__final-title">
								Данные обновлены! <br /> Спасибо за регистрацию
							</p>
							<Link to={"/"} className='button steps__link'>
								На главную
							</Link>
						</div>
					)
				)}
			</div>
		</div>
	)
}
