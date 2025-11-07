import { Col } from "antd"
import { useTranslation } from "react-i18next"
import AntdPieChart from "../AntdCharts/AntdPieChart"
import type { CategoryData } from "../../utils/web/chartService"

interface CategoryDistributionChartProps {
  categoryData: CategoryData[]
  height?: number
}

const CategoryDistributionChart: React.FC<CategoryDistributionChartProps> = ({
  categoryData,
  height = 350,
}) => {
  const { t } = useTranslation()

  return (
    <Col xs={24} lg={8}>
      <AntdPieChart
        data={categoryData}
        title={t("inventory_by_category")}
        height={height}
      />
    </Col>
  )
}

export default CategoryDistributionChart
