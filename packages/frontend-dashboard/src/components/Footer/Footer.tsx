import { Box, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import { footerStyles } from "./Footer.styles"

const Footer = () => {
  const { t } = useTranslation()
  return (
    <Box sx={footerStyles.footer}>
      <Typography variant="body2" color="inherit" align="center">
        © {new Date().getFullYear()} {t("footer_text")}
      </Typography>
    </Box>
  )
}

export default Footer
