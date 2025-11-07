import { Box } from "@mui/material"
import { useTranslation } from "react-i18next"
import type { SalesData } from "../../utils/web/chartService"
import ChartJSBarChart from "../Charts/ChartJSBarChart"

interface RecentSalesChartProps {
  salesData: SalesData[]
  height?: number
  monthsToShow?: number
}

const RecentSalesChart = ({
  salesData,
  height = 300,
  monthsToShow = 6,
}: RecentSalesChartProps) => {
  const { t } = useTranslation()

  return (
    <Box>
      <ChartJSBarChart
        data={salesData.slice(-monthsToShow)}
        title={t("recent_sales_vs_orders")}
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
            label: t("total_orders"),
          },
        ]}
        height={height}
      />
    </Box>
  )
}

export default RecentSalesChart
