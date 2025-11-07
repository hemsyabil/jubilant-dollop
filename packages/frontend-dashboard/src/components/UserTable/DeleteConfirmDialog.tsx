import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material"
import React from "react"

interface DeleteConfirmDialogProps {
  open: boolean
  userName: string
  onClose: () => void
  onConfirm: () => void
  loading?: boolean
}

const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  open,
  userName,
  onClose,
  onConfirm,
  loading = false,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm">
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete user "{userName}"? This action cannot
          be undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteConfirmDialog
