import { Box, Paper, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import type { InventoryItem } from "../../utils/web/chartService"

interface InventorySummaryProps {
  inventoryData: InventoryItem[]
  height?: number
}

const InventorySummary = ({
  inventoryData,
  height = 400,
}: InventorySummaryProps) => {
  const { t } = useTranslation()

  return (
    <Box sx={{ flex: 1 }}>
      <Paper elevation={3} sx={{ p: 3, height }}>
        <Typography variant="h6" gutterBottom>
          {t("current_inventory_items")}
        </Typography>
        <Box sx={{ maxHeight: height - 80, overflow: "auto" }}>
          {inventoryData.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: 1,
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <Box>
                <Typography variant="body2" fontWeight="bold">
                  {item.name}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {item.category}
                </Typography>
              </Box>
              <Box textAlign="right">
                <Typography variant="body2" fontWeight="bold">
                  ${item.price}
                </Typography>
                <Typography
                  variant="caption"
                  color={item.stock > 20 ? "success.main" : "warning.main"}
                >
                  {item.stock} {t("in_stock")}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  )
}

export default InventorySummary
