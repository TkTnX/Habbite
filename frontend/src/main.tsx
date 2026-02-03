import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter } from "react-router"
import { RouterProvider } from "react-router/dom"
import "./shared/styles/index.scss"
import { Homepage } from "./pages"
import { AppLayout } from "./layouts"
import { createTheme, ThemeProvider } from "@mui/material"

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
	}
])

const theme = createTheme({
	colorSchemes: {
		dark: true
	}
})

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ThemeProvider theme={theme}>
			<RouterProvider router={router} />
		</ThemeProvider>
	</StrictMode>
)
