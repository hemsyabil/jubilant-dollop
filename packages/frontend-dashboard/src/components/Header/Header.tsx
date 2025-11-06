import Brightness4Icon from "@mui/icons-material/Brightness4"
import Brightness7Icon from "@mui/icons-material/Brightness7"
import LanguageIcon from "@mui/icons-material/Language"
import LoginIcon from "@mui/icons-material/Login"
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import { NavLink, useNavigate } from "react-router-dom"
import { ColorModeContext } from "../../styles/ColorModeContext"
import { headerStyles } from "./Header.styles"

const Header = () => {
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)
  const { t, i18n } = useTranslation()
  const [language, setLanguage] = useState<"EN" | "FR">("EN")
  const navigate = useNavigate()

  const toggleLanguage = () => {
    const newLang = language === "EN" ? "FR" : "EN"
    setLanguage(newLang)
    i18n.changeLanguage(newLang)
  }

  const handleLogin = () => {
    navigate("/login")
  }

  return (
    <AppBar position="static" elevation={0} sx={headerStyles.appBar(theme)}>
      <Container maxWidth="lg">
        <Toolbar sx={headerStyles.toolbar}>
          {/* Left: Logo */}
          <Box sx={headerStyles.logoContainer}>
            <img
              alt="PNG here"
              src="https://picsum.photos/400/60/?blur"
              style={headerStyles.logo}
            />
          </Box>

          {/* Middle: Navigation */}
          <Box sx={headerStyles.navigationBox}>
            <Box component={NavLink} to="/" sx={headerStyles.menuLink(theme)}>
              {t("overview")}
            </Box>
            <Box
              component={NavLink}
              to="/inventory"
              sx={headerStyles.menuLink(theme)}
            >
              {t("inventory")}
            </Box>
          </Box>

          {/* Right: Actions */}
          <Box sx={headerStyles.actionsBox}>
            {/* Mode toggle */}
            <Box sx={headerStyles.actionItem}>
              <IconButton
                onClick={colorMode.toggleColorMode}
                color="inherit"
                size="small"
              >
                {theme.palette.mode === "dark" ? (
                  <Brightness7Icon fontSize="small" />
                ) : (
                  <Brightness4Icon fontSize="small" />
                )}
              </IconButton>
              <Typography variant="caption">
                {theme.palette.mode === "dark" ? t("dark") : t("light")}
              </Typography>
            </Box>

            {/* Language toggle */}
            <Box sx={headerStyles.actionItem}>
              <IconButton onClick={toggleLanguage} color="inherit" size="small">
                <LanguageIcon fontSize="small" />
              </IconButton>
              <Typography variant="caption">{language}</Typography>
            </Box>

            {/* Login link */}
            <Box sx={headerStyles.actionItem}>
              <IconButton onClick={handleLogin} color="inherit" size="small">
                <LoginIcon fontSize="small" />
              </IconButton>
              <Typography variant="caption">{t("login")}</Typography>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
