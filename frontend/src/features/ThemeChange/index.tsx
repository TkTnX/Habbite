import "./themeChange.scss"
import { FormLabel, Switch, useColorScheme } from "@mui/material"
export const ThemeChange = () => {
	const { setMode, mode } = useColorScheme()

	const toggleTheme = () => setMode(mode === "light" ? "dark" : "light")
	console.log(mode)
	return (
		<FormLabel onChange={toggleTheme} className='themeChange'>
			<img src='/images/icons/theme.svg' alt='Изменить тему' />
			<div className='themeChange__button'>
				<Switch
					defaultChecked={mode !== "dark"}
					className='themeChange__switch'
				/>
				<p>Apply Dark Theme</p>
			</div>
		</FormLabel>
	)
}
