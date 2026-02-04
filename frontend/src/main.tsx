import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter } from "react-router"
import { RouterProvider } from "react-router/dom"
import "./shared/styles/index.scss"
import { Homepage, LoginPage } from "./pages"
import { AppLayout } from "./layouts"
import { createTheme, ThemeProvider } from "@mui/material"
import { RegisterPage } from "./pages/RegisterPage"

const router = createBrowserRouter([
	{
		element: <AppLayout />,
		children: [
			{
				index: true,
				element: <Homepage />,
				path: "/"
			}
		]
	},
	{
		path: "/auth/login",
		element: <LoginPage />
	},
	{
		path: "/auth/register",
		element: <RegisterPage />
	},
])

const theme = createTheme({
	cssVariables: {
		colorSchemeSelector: "data"
	},
	colorSchemes: {
		dark: {
			palette: {
				mode: "dark"
			}
		},
		light: {
			palette: {
				mode: "light"
			}
		}
	}
})

const getInitialMode = () =>
	(localStorage.getItem("theme") as "light" | "dark") ?? "light"

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ThemeProvider
			modeStorageKey='theme'
			defaultMode={getInitialMode()}
			theme={theme}
		>
			<RouterProvider router={router} />
		</ThemeProvider>
	</StrictMode>
)
