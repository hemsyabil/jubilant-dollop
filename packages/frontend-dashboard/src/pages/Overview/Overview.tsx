import { Box, Container, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"

const Overview = () => {
  const { t } = useTranslation()
  return (
    <Box>
      <Container>
        <Typography variant="h4">{t("overview")}</Typography>
      </Container>
    </Box>
  )
}

export default Overview
