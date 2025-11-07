import { CssBaseline, ThemeProvider } from "@mui/material"
import { useEffect, useMemo, useState, type ReactNode } from "react"
import { ColorModeContext } from "./ColorModeContext"
import { createAppTheme } from "./theme"

interface Props {
  children: ReactNode
}

export const ColorModeProvider = ({ children }: Props) => {
  const [mode, setMode] = useState<"light" | "dark">("light")

  // Optional: persist preference
  useEffect(() => {
    const savedMode = localStorage.getItem("themeMode") as
      | "light"
      | "dark"
      | null
    if (savedMode) setMode(savedMode)
  }, [])

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => {
          const newMode = prev === "light" ? "dark" : "light"
          localStorage.setItem("themeMode", newMode)
          return newMode
        })
      },
    }),
    []
  )

  const theme = useMemo(() => createAppTheme(mode), [mode])

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
