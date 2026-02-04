import "./authForm.scss"
import { Link } from "react-router"
import {
	Checkbox,
	FormControl,
	FormControlLabel,
	Input,
	InputLabel
} from "@mui/material"

interface Props {
	type: "login" | "register"
}

export const AuthForm = ({ type }: Props) => {
	const isRegister = type === "register"
    console.log(type)
	return (
		<div className='authForm'>
			<div className='authForm__wrapper'>
				<img src='/images/icons/logo.svg' alt='Logo' />
				<h4 className='authForm__title'>
					{isRegister ? "Создание аккаунта" : "Логин"}
				</h4>
				<form className='authForm__form'>
					{isRegister && (
						<>
							<FormControl>
								<InputLabel htmlFor='firstName'>Имя</InputLabel>
								<Input id='firstName' />
							</FormControl>
							<FormControl>
								<InputLabel htmlFor='lastName'>
									Фамилия
								</InputLabel>
								<Input id='lastName' />
							</FormControl>
						</>
					)}
					<FormControl>
						<InputLabel htmlFor='email'>Почта</InputLabel>
						<Input id='email' />
					</FormControl>
					<FormControl>
						<InputLabel htmlFor='password'>Пароль</InputLabel>
						<Input id='password' />
					</FormControl>
					{isRegister ? (
						<FormControlLabel
							control={<Checkbox />}
							label={
								<p className='authForm__terms'>
									Я принимаю Правила и Условия{" "}
								</p>
							}
						/>
					) : (
						<div className="authForm__controls">
							<FormControlLabel
								control={<Checkbox />}
								label={
									<p className='authForm__terms'>
										Запомнить меня
									</p>
								}
                                />
                                <Link className="authForm__forgot" to={'/auth/reset-password'}>Забыли пароль?</Link>
						</div>
					)}
					<button className="authForm__submit">{isRegister ? "Создать аккаунт" : "Войти"}</button>
				</form>
				{isRegister ? (
					<p className="authForm__change">
						Уже есть аккаунт? <Link to={"/auth/login"}>Вход</Link>
					</p>
				) : (
					<p className="authForm__change">
						Ещё нет аккаунта?{" "}
						<Link to={"/auth/register"}>Регистрация</Link>
					</p>
				)}
			</div>
		</div>
	)
}
