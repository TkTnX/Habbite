import { useEffect, useState } from "react"
import "./themeChange.scss"
import { FormLabel, Switch, useColorScheme } from "@mui/material"
export const ThemeChange = () => {
	const { setMode } = useColorScheme()
	const [theme, setTheme] = useState<"light" | "dark">(
		(localStorage.getItem("theme") as "light" | "dark") ?? "light"
	)

	const onChange = (theme: "light" | "dark") => {
		localStorage.setItem("theme", theme)
		setTheme(theme)
		setMode(theme)
	}

	useEffect(() => {
		if (theme === "dark") {
			document.body.classList.add("dark")
		} else {
			document.body.classList.remove("dark")
		}
	}, [theme])

	return (
		<FormLabel
			onChange={() => onChange(theme === "light" ? "dark" : "light")}
			className='themeChange'
		>
			<img src='/images/icons/theme.svg' alt='Изменить тему' />
			<div className='themeChange__button'>
				<Switch
					defaultChecked={theme === "dark"}
					className='themeChange__switch'
				/>
				<p>Apply Dark Theme</p>
			</div>
		</FormLabel>
	)
}
