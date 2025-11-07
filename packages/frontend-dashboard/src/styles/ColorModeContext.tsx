import { ConfigProvider, theme } from "antd"
import { useEffect, useState, type ReactNode } from "react"
import { ThemeContext } from "../hooks/useTheme"

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setIsDark(savedTheme === "dark")
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    localStorage.setItem("theme", newTheme ? "dark" : "light")
  }

  const antdTheme = {
    algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: "#48E5C2",
      colorSuccess: "#52c41a",
      colorWarning: "#faad14",
      colorError: "#F66247",
      fontFamily: '"Nunito Sans", sans-serif',
      borderRadius: 8,
      colorBgContainer: isDark ? "#141414" : "#ffffff",
      colorBgElevated: isDark ? "#1f1f1f" : "#ffffff",
      colorBgLayout: isDark ? "#000000" : "#fcfaf9",
    },
    components: {
      Layout: {
        headerBg: isDark ? "#141414" : "#fcfaf9",
        bodyBg: isDark ? "#000000" : "#fcfaf9",
        footerBg: isDark ? "#141414" : "#798fa4",
        headerHeight: 70,
        headerPadding: "0 24px",
        footerPadding: "15px 0",
      },
      Button: {
        borderRadius: 8,
        fontWeight: 600,
      },
      Table: {
        borderRadius: 8,
      },
      Card: {
        borderRadius: 16,
        paddingLG: 24,
      },
    },
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <ConfigProvider theme={antdTheme}>{children}</ConfigProvider>
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
