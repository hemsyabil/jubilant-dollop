import {
  CircularProgress,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material"
import React from "react"

interface TableEmptyStateProps {
  loading: boolean
  message?: string
  colSpan?: number
}

const TableEmptyState: React.FC<TableEmptyStateProps> = ({
  loading,
  message = "No data found",
  colSpan = 10,
}) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} align="center">
        {loading ? (
          <CircularProgress size={40} />
        ) : (
          <Typography variant="body2" color="text.secondary">
            {message}
          </Typography>
        )}
      </TableCell>
    </TableRow>
  )
}

export default TableEmptyState
