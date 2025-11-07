import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./i18n"
import { ColorModeProvider } from "./styles/ColorModeProvider"
import "./styles/globals.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ColorModeProvider>
      <App />
    </ColorModeProvider>
  </React.StrictMode>
)
