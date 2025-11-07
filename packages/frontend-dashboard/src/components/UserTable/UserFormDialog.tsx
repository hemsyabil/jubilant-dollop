import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material"
import React from "react"
import { type User } from "../../utils/web/userService"

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

interface UserFormDialogProps {
  open: boolean
  editingUser: User | null
  formData: UserFormData
  formLoading: boolean
  onClose: () => void
  onSubmit: (event: React.FormEvent) => void
  onFormChange: (field: string, value: string) => void
}

const UserFormDialog: React.FC<UserFormDialogProps> = ({
  open,
  editingUser,
  formData,
  formLoading,
  onClose,
  onSubmit,
  onFormChange,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{editingUser ? "Edit User" : "Add New User"}</DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent>
          <Box className="user-table-form">
            <TextField
              name="name"
              label="Full Name"
              value={formData.name}
              onChange={(e) => onFormChange("name", e.target.value)}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              name="username"
              label="Username"
              value={formData.username}
              onChange={(e) => onFormChange("username", e.target.value)}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => onFormChange("email", e.target.value)}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              name="phone"
              label="Phone"
              value={formData.phone}
              onChange={(e) => onFormChange("phone", e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              name="website"
              label="Website"
              value={formData.website}
              onChange={(e) => onFormChange("website", e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              name="company"
              label="Company Name"
              value={formData.company.name}
              onChange={(e) => onFormChange("company.name", e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              name="city"
              label="City"
              value={formData.address.city}
              onChange={(e) => onFormChange("address.city", e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              name="zipcode"
              label="Zip Code"
              value={formData.address.zipcode}
              onChange={(e) => onFormChange("address.zipcode", e.target.value)}
              fullWidth
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={formLoading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={formLoading}
            startIcon={formLoading ? <CircularProgress size={16} /> : null}
          >
            {editingUser ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default UserFormDialog
