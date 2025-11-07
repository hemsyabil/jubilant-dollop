import { PlusOutlined, ReloadOutlined } from "@ant-design/icons"
import { Button, Card, message, Space, Table, Typography } from "antd"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
  type User,
} from "../../utils/web/userService"
import UserFormModal, { type UserFormData } from "./UserFormModal"
import "./UserTable.css"
import { getUserTableColumns } from "./userTableColumns"

const { Title } = Typography

interface UserTableProps {
  title?: string
}

const UserTable: React.FC<UserTableProps> = ({ title }) => {
  const { t } = useTranslation()
  const displayTitle = title || t("user_management")

  // State management
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [formLoading, setFormLoading] = useState(false)

  // Load users on component mount
  useEffect(() => {
    loadUsers()
  }, [])

  // Load users function
  const loadUsers = async () => {
    setLoading(true)
    try {
      const fetchedUsers = await getUsers()
      setUsers(fetchedUsers)
    } catch (err) {
      message.error("Failed to load users. Please try again.")
      console.error("Error loading users:", err)
    } finally {
      setLoading(false)
    }
  }

  // Event handlers
  const handleAdd = () => {
    setEditingUser(null)
    setModalOpen(true)
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setModalOpen(true)
  }

  const handleDelete = async (userId: number) => {
    try {
      await deleteUser(userId)
      setUsers(users.filter((user) => user.id !== userId))
      message.success("User deleted successfully")
    } catch (err) {
      message.error("Failed to delete user. Please try again.")
      console.error("Error deleting user:", err)
    }
  }

  const handleFormSubmit = async (formData: UserFormData) => {
    setFormLoading(true)

    try {
      if (editingUser) {
        // Update existing user
        const updatedUser = await updateUser(editingUser.id, formData)
        setUsers(
          users.map((user) => (user.id === editingUser.id ? updatedUser : user))
        )
        message.success("User updated successfully")
      } else {
        // Create new user
        const newUser = await createUser(formData)
        setUsers([...users, newUser])
        message.success("User created successfully")
      }
      setModalOpen(false)
    } catch (err) {
      message.error("Failed to save user. Please try again.")
      console.error("Error saving user:", err)
      throw err // Re-throw to let modal handle it
    } finally {
      setFormLoading(false)
    }
  }

  const handleModalClose = () => {
    setModalOpen(false)
    setEditingUser(null)
  }

  // Get table columns with handlers
  const columns = getUserTableColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
  })

  return (
    <div className="user-table-container">
      <Card
        title={
          <Title level={4} style={{ margin: 0 }}>
            {displayTitle}
          </Title>
        }
        extra={
          <Space>
            <Button
              icon={<ReloadOutlined />}
              onClick={loadUsers}
              loading={loading}
            >
              Refresh
            </Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
              Add User
            </Button>
          </Space>
        }
      >
        <Table
          columns={columns}
          dataSource={users}
          loading={loading}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
          }}
          scroll={{ x: 800 }}
        />
      </Card>

      <UserFormModal
        open={modalOpen}
        editingUser={editingUser}
        loading={formLoading}
        onCancel={handleModalClose}
        onSubmit={handleFormSubmit}
      />
    </div>
  )
}

export default UserTable
