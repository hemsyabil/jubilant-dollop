import { Alert, Space, Typography } from "antd"
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

const { Title } = Typography

const Inventory = () => {
  const { t } = useTranslation()
  const { salesData, categoryData, inventoryData, loading, error } =
    useInventoryData()

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <Alert message={error} type="error" showIcon />
      </div>
    )
  }

  return (
    <div style={{ padding: "24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Title level={2} style={{ marginBottom: "24px" }}>
          {t("inventory_dashboard")}
        </Title>

        <Space direction="vertical" size="large" style={{ width: "100%" }}>
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
        </Space>
      </div>
    </div>
  )
}

export default Inventory
