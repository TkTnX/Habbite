import "./themeChange.scss"
import { FormLabel, Switch } from "@mui/material"
export const ThemeChange = () => {
	return (
		<FormLabel className='themeChange'>
			<img src='/images/icons/theme.svg' alt='Изменить тему' />
			<div className='themeChange__button'>
				<Switch className="themeChange__switch" />
				<p>Apply Dark Theme</p>
			</div>
		</FormLabel>
	)
}
