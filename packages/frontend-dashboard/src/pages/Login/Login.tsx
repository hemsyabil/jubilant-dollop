import { Box, Container, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"

const Login = () => {
  const { t } = useTranslation()
  return (
    <Box>
      <Container>
        <Typography variant="h4">{t("login")}</Typography>
      </Container>
    </Box>
  )
}

export default Login
