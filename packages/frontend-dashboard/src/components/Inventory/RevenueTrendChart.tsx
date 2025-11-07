import { Box } from "@mui/material"
import { useTranslation } from "react-i18next"
import type { SalesData } from "../../utils/web/chartService"
import ChartJSLineChart from "../Charts/ChartJSLineChart"

interface RevenueTrendChartProps {
  salesData: SalesData[]
  height?: number
}

const RevenueTrendChart = ({
  salesData,
  height = 300,
}: RevenueTrendChartProps) => {
  const { t } = useTranslation()

  return (
    <Box sx={{ flex: 2 }}>
      <ChartJSLineChart
        data={salesData}
        title={t("revenue_trend_analysis")}
        xDataKey="month"
        lines={[
          {
            dataKey: "revenue",
            borderColor: "#ff7300",
            label: t("revenue"),
          },
        ]}
        height={height}
      />
    </Box>
  )
}

export default RevenueTrendChart
