import "./themeChange.scss"
import { FormLabel, Switch, useColorScheme } from "@mui/material"
export const ThemeChange = () => {
	const { setMode, mode } = useColorScheme()

	const toggleTheme = () => setMode(mode === "light" ? "dark" : "light")

	return (
		<FormLabel onChange={toggleTheme} className='themeChange'>
			<img src='/images/icons/theme.svg' alt='Изменить тему' />
			<div className='themeChange__button'>
				<Switch
					checked={mode === "dark"}
					className='themeChange__switch'
				/>
				<p>Apply Dark Theme</p>
			</div>
		</FormLabel>
	)
}
