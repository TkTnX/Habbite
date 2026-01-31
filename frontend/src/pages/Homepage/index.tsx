import "./homepage.scss"
export const Homepage = () => {
	return (
		<section className='homepage'>
			{/* TODO: Высчитывать добрый день/утро/вечер/ночь */}
			<div className='homepage__top'>
				<div>
					<p className='homepage__welcome'>Добрый день John,</p>
					<p>Как вы сегодня?</p>
				</div>
			</div>
		</section>
	)
}
