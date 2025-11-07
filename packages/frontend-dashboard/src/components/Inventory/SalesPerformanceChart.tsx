import { Box } from "@mui/material"
import { useTranslation } from "react-i18next"
import type { SalesData } from "../../utils/web/chartService"
import ChartJSBarChart from "../Charts/ChartJSBarChart"

interface SalesPerformanceChartProps {
  salesData: SalesData[]
  height?: number
}

const SalesPerformanceChart = ({
  salesData,
  height = 350,
}: SalesPerformanceChartProps) => {
  const { t } = useTranslation()

  return (
    <Box sx={{ flex: 2 }}>
      <ChartJSBarChart
        data={salesData}
        title={t("monthly_sales_performance")}
        xDataKey="month"
        bars={[
          {
            dataKey: "sales",
            backgroundColor: "#8884d8",
            label: t("sales_volume"),
          },
          {
            dataKey: "orders",
            backgroundColor: "#82ca9d",
            label: t("orders"),
          },
        ]}
        height={height}
      />
    </Box>
  )
}

export default SalesPerformanceChart
