import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter } from "react-router"
import { RouterProvider } from "react-router/dom"
import "./shared/styles/index.scss"
import {
	Homepage,
	LoginPage,
	StartPage,
	LogoutPage,
	SettingsPage
} from "./pages"
import { AppLayout, AuthLayout } from "./layouts"
import { createTheme, ThemeProvider } from "@mui/material"
import { RegisterPage } from "./pages/RegisterPage"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ToastContainer } from "react-toastify"
const router = createBrowserRouter([
	{
		element: <AppLayout />,
		children: [
			{
				index: true,
				element: <Homepage />,
				path: "/"
			},
			{
				path: "/start",
				element: <StartPage />
			},
			{
				path: "/logout",
				element: <LogoutPage />
			},
			{
				path: "/settings",
				element: <SettingsPage />
			}
		]
	},
	{
		element: <AuthLayout />,
		children: [
			{
				path: "/auth/login",
				element: <LoginPage />
			},
			{
				path: "/auth/register",
				element: <RegisterPage />
			}
		]
	}
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

const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ThemeProvider
			modeStorageKey='theme'
			defaultMode={getInitialMode()}
			theme={theme}
		>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
				<ToastContainer />
			</QueryClientProvider>
		</ThemeProvider>
	</StrictMode>
)
