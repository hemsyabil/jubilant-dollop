import { Add as AddIcon } from "@mui/icons-material"
import {
  Alert,
  Box,
  Fab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
  type User,
} from "../../utils/web/userService"
import DeleteConfirmDialog from "./DeleteConfirmDialog"
import TableEmptyState from "./TableEmptyState"
import UserFormDialog from "./UserFormDialog"
import "./UserTable.css"
import UserTableHeader from "./UserTableHeader"
import UserTableRow from "./UserTableRow"

interface UserTableProps {
  title?: string
}

interface UserFormData {
  name: string
  email: string
  username: string
  phone: string
  website: string
  company: {
    name: string
  }
  address: {
    city: string
    zipcode: string
  }
}

const initialFormData: UserFormData = {
  name: "",
  email: "",
  username: "",
  phone: "",
  website: "",
  company: {
    name: "",
  },
  address: {
    city: "",
    zipcode: "",
  },
}

const UserTable: React.FC<UserTableProps> = ({ title }) => {
  const { t } = useTranslation()
  const displayTitle = title || t("user_management")

  // State management
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // Dialog states
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [formData, setFormData] = useState<UserFormData>(initialFormData)
  const [formLoading, setFormLoading] = useState(false)

  // Delete confirmation
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  // Load users on component mount
  useEffect(() => {
    loadUsers()
  }, [])

  // Load users function using async/await
  const loadUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const fetchedUsers = await getUsers()
      setUsers(fetchedUsers)
    } catch (err) {
      setError("Failed to load users. Please try again.")
      console.error("Error loading users:", err)
    } finally {
      setLoading(false)
    }
  }

  // Event handlers
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleAddClick = () => {
    setEditingUser(null)
    setFormData(initialFormData)
    setDialogOpen(true)
  }

  const handleEditClick = (user: User) => {
    setEditingUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      username: user.username,
      phone: user.phone,
      website: user.website,
      company: {
        name: user.company.name,
      },
      address: {
        city: user.address.city,
        zipcode: user.address.zipcode,
      },
    })
    setDialogOpen(true)
  }

  const handleDeleteClick = (userId: number) => {
    const user = users.find((u) => u.id === userId)
    if (user) {
      setUserToDelete(user)
      setDeleteDialogOpen(true)
    }
  }

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return

    setDeleteLoading(true)
    try {
      await deleteUser(userToDelete.id)
      setUsers(users.filter((user) => user.id !== userToDelete.id))
      setDeleteDialogOpen(false)
      setUserToDelete(null)
    } catch (err) {
      setError("Failed to delete user. Please try again.")
      console.error("Error deleting user:", err)
    } finally {
      setDeleteLoading(false)
    }
  }

  // Form submission using mixed async approaches
  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setFormLoading(true)
    setError(null)

    try {
      if (editingUser) {
        // Update existing user - using .then/.catch approach
        updateUser(editingUser.id, formData)
          .then((updatedUser) => {
            setUsers(
              users.map((user) =>
                user.id === editingUser.id ? updatedUser : user
              )
            )
            setDialogOpen(false)
            setFormData(initialFormData)
          })
          .catch((err) => {
            setError("Failed to save user. Please try again.")
            console.error("Error saving user:", err)
          })
          .finally(() => {
            setFormLoading(false)
          })
      } else {
        // Create new user - using async/await approach
        const newUser = await createUser(formData)
        setUsers([...users, newUser])
        setDialogOpen(false)
        setFormData(initialFormData)
      }
    } catch (err) {
      setError("Failed to save user. Please try again.")
      console.error("Error saving user:", err)
    } finally {
      if (!editingUser) {
        setFormLoading(false)
      }
    }
  }

  const handleFormChange = (field: string, value: string) => {
    if (field === "company.name") {
      setFormData((prev) => ({
        ...prev,
        company: {
          ...prev.company,
          name: value,
        },
      }))
    } else if (field === "address.city") {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          city: value,
        },
      }))
    } else if (field === "address.zipcode") {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          zipcode: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }))
    }
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
    setEditingUser(null)
    setFormData(initialFormData)
  }

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false)
    setUserToDelete(null)
  }

  // Get current page data
  const paginatedUsers = users.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  return (
    <Box className="user-table-container">
      <UserTableHeader
        title={displayTitle}
        onAddClick={handleAddClick}
        onRefreshClick={loadUsers}
        loading={loading}
      />

      {error && (
        <Alert severity="error" className="user-table-alert">
          {error}
        </Alert>
      )}

      <Paper className="user-table-paper">
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Website</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Zip Code</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading && users.length === 0 ? (
                <TableEmptyState loading={true} />
              ) : paginatedUsers.length === 0 ? (
                <TableEmptyState loading={false} message="No users found" />
              ) : (
                paginatedUsers.map((user) => (
                  <UserTableRow
                    key={user.id}
                    user={user}
                    onEditClick={handleEditClick}
                    onDeleteClick={handleDeleteClick}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <UserFormDialog
        open={dialogOpen}
        editingUser={editingUser}
        formData={formData}
        formLoading={formLoading}
        onClose={handleDialogClose}
        onSubmit={handleFormSubmit}
        onFormChange={handleFormChange}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        userName={userToDelete?.name || ""}
        onClose={handleDeleteDialogClose}
        onConfirm={handleDeleteConfirm}
        loading={deleteLoading}
      />

      <Fab
        color="primary"
        className="user-table-fab"
        onClick={handleAddClick}
        size="medium"
      >
        <AddIcon />
      </Fab>
    </Box>
  )
}

export default UserTable
