import { Col } from "antd"
import { useTranslation } from "react-i18next"
import AntdLineChart from "../AntdCharts/AntdLineChart"
import type { SalesData } from "../../utils/web/chartService"

interface RevenueTrendChartProps {
  salesData: SalesData[]
  height?: number
}

const RevenueTrendChart: React.FC<RevenueTrendChartProps> = ({
  salesData,
  height = 300,
}) => {
  const { t } = useTranslation()

  return (
    <Col xs={24} lg={16}>
      <AntdLineChart
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
    </Col>
  )
}

export default RevenueTrendChart
