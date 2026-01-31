import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter } from "react-router"
import { RouterProvider } from "react-router/dom"
import "./styles/index.scss"
import { Homepage } from "./pages"
import { AppLayout } from "./layouts"

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

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
)
