import { Box, Container, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import {
  CategoryDistributionChart,
  DashboardRow,
  InventorySummary,
  LoadingSpinner,
  RecentSalesChart,
  RevenueTrendChart,
  SalesPerformanceChart,
} from "../../components/Inventory"
import useInventoryData from "../../hooks/useInventoryData"
import "./Inventory.css"

const Inventory = () => {
  const { t } = useTranslation()
  const { salesData, categoryData, inventoryData, loading, error } =
    useInventoryData()

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ py: 3 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          {t("inventory_dashboard")}
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {/* First Row - Sales Performance & Category Distribution */}
          <DashboardRow>
            <SalesPerformanceChart salesData={salesData} />
            <CategoryDistributionChart categoryData={categoryData} />
          </DashboardRow>

          {/* Second Row - Revenue Trend & Inventory Summary */}
          <DashboardRow>
            <RevenueTrendChart salesData={salesData} />
            <InventorySummary inventoryData={inventoryData} />
          </DashboardRow>

          {/* Third Row - Recent Sales (Full Width) */}
          <DashboardRow fullWidth>
            <RecentSalesChart salesData={salesData} monthsToShow={6} />
          </DashboardRow>
        </Box>
      </Container>
    </Box>
  )
}

export default Inventory
