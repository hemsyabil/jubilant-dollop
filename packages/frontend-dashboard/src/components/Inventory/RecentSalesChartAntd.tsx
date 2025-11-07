import { Col } from "antd"
import { useTranslation } from "react-i18next"
import AntdBarChart from "../AntdCharts/AntdBarChart"
import type { SalesData } from "../../utils/web/chartService"

interface RecentSalesChartProps {
  salesData: SalesData[]
  height?: number
  monthsToShow?: number
}

const RecentSalesChart: React.FC<RecentSalesChartProps> = ({
  salesData,
  height = 300,
  monthsToShow = 6,
}) => {
  const { t } = useTranslation()

  return (
    <Col span={24}>
      <AntdBarChart
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
    </Col>
  )
}

export default RecentSalesChart
