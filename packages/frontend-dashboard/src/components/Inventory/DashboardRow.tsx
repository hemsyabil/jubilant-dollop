import { Box } from "@mui/material"
import { type ReactNode } from "react"

interface DashboardRowProps {
  children: ReactNode
  fullWidth?: boolean
}

const DashboardRow = ({ children, fullWidth = false }: DashboardRowProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: fullWidth ? "column" : { xs: "column", lg: "row" },
        gap: 2,
      }}
    >
      {children}
    </Box>
  )
}

export default DashboardRow
