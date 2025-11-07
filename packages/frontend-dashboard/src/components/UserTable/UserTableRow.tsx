import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material"
import { Box, IconButton, TableCell, TableRow, Tooltip } from "@mui/material"
import React from "react"
import { useTranslation } from "react-i18next"
import { type User } from "../../utils/web/userService"

interface UserTableRowProps {
  user: User
  onEditClick: (user: User) => void
  onDeleteClick: (userId: number) => void
}

const UserTableRow: React.FC<UserTableRowProps> = ({
  user,
  onEditClick,
  onDeleteClick,
}) => {
  const { t } = useTranslation()

  return (
    <TableRow hover>
      <TableCell>{user.id}</TableCell>
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.username}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.phone}</TableCell>
      <TableCell>
        <a
          href={`http://${user.website}`}
          target="_blank"
          rel="noopener noreferrer"
          className="user-table-website-link"
        >
          {user.website}
        </a>
      </TableCell>
      <TableCell>{user.company.name}</TableCell>
      <TableCell>{user.address.city}</TableCell>
      <TableCell>{user.address.zipcode}</TableCell>
      <TableCell align="center">
        <Box className="user-table-action-buttons">
          <Tooltip title={t("edit_user")}>
            <span>
              <IconButton
                size="small"
                onClick={() => onEditClick(user)}
                color="primary"
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title={t("delete_user")}>
            <span>
              <IconButton
                size="small"
                onClick={() => onDeleteClick(user.id)}
                color="error"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      </TableCell>
    </TableRow>
  )
}

export default UserTableRow
