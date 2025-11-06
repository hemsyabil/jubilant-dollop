import { Box, Container, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"

const Inventory = () => {
  const { t } = useTranslation()
  return (
    <Box>
      <Container>
        <Typography variant="h4">{t("inventory")}</Typography>
      </Container>
    </Box>
  )
}

export default Inventory
