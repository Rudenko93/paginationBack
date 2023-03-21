import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Header } from "./components/Header"
import { Home } from "./pages/Home"
import { Detail } from "./pages/Details/Detail"

import "./index.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      { path: "/", element: <Home /> },
      { path: "details", element: <Detail /> },
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(<RouterProvider router={router} />)
