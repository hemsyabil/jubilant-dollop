import { Box } from "@mui/material"
import { useTranslation } from "react-i18next"
import type { CategoryData } from "../../utils/web/chartService"
import ChartJSPieChart from "../Charts/ChartJSPieChart"

interface CategoryDistributionChartProps {
  categoryData: CategoryData[]
  height?: number
}

const CategoryDistributionChart = ({
  categoryData,
  height = 350,
}: CategoryDistributionChartProps) => {
  const { t } = useTranslation()

  return (
    <Box sx={{ flex: 1 }}>
      <ChartJSPieChart
        data={categoryData}
        title={t("inventory_by_category")}
        height={height}
      />
    </Box>
  )
}

export default CategoryDistributionChart
