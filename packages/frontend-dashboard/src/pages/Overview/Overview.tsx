import { Box, Container, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import UserTable from "../../components/UserTable"

const Overview = () => {
  const { t } = useTranslation()
  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 3 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          {t("overview")}
        </Typography>
        <UserTable title="User Management System" />
      </Box>
    </Container>
  )
}

export default Overview
