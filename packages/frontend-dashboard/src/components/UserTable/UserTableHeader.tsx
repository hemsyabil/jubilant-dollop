import { Add as AddIcon, Refresh as RefreshIcon } from "@mui/icons-material"
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material"
import React from "react"
import { useTranslation } from "react-i18next"

interface UserTableHeaderProps {
  title: string
  onAddClick: () => void
  onRefreshClick: () => void
  loading: boolean
}

const UserTableHeader: React.FC<UserTableHeaderProps> = ({
  title,
  onAddClick,
  onRefreshClick,
  loading,
}) => {
  const { t } = useTranslation()

  return (
    <Box className="user-table-header">
      <Typography variant="h5" component="h2">
        {title}
      </Typography>
      <Box className="user-table-actions">
        <Tooltip title={t("refresh_data")}>
          <span>
            <IconButton onClick={onRefreshClick} disabled={loading}>
              <RefreshIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAddClick}
          className="user-table-add-button"
        >
          {t("add_user")}
        </Button>
      </Box>
    </Box>
  )
}

export default UserTableHeader
