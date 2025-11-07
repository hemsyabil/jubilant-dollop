import { Button, Form, Input, Modal, Space } from "antd"
import React, { useEffect } from "react"
import type { User } from "../../utils/web/userService"

export interface UserFormData {
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

interface UserFormModalProps {
  open: boolean
  editingUser: User | null
  loading: boolean
  onCancel: () => void
  onSubmit: (formData: UserFormData) => Promise<void>
}

const UserFormModal: React.FC<UserFormModalProps> = ({
  open,
  editingUser,
  loading,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm()

  // Reset form when modal opens/closes or editing user changes
  useEffect(() => {
    if (open && editingUser) {
      // Populate form with editing user data
      form.setFieldsValue({
        name: editingUser.name,
        email: editingUser.email,
        username: editingUser.username,
        phone: editingUser.phone,
        website: editingUser.website,
        companyName: editingUser.company.name,
        city: editingUser.address.city,
        zipcode: editingUser.address.zipcode,
      })
    } else if (open && !editingUser) {
      // Reset form for new user
      form.resetFields()
    }
  }, [open, editingUser, form])

  const handleFormSubmit = async (values: {
    name: string
    email: string
    username: string
    phone: string
    website: string
    companyName: string
    city: string
    zipcode: string
  }) => {
    const formData: UserFormData = {
      name: values.name,
      email: values.email,
      username: values.username,
      phone: values.phone,
      website: values.website,
      company: {
        name: values.companyName,
      },
      address: {
        city: values.city,
        zipcode: values.zipcode,
      },
    }

    try {
      await onSubmit(formData)
      form.resetFields()
    } catch (err) {
      // Error handling is done in parent component
      console.error("Form submission error:", err)
    }
  }

  const handleCancel = () => {
    form.resetFields()
    onCancel()
  }

  return (
    <Modal
      title={editingUser ? "Edit User" : "Add New User"}
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={600}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFormSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input the name!" }]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input the username!" }]}
        >
          <Input placeholder="Enter username" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input the email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: "Please input the phone!" }]}
        >
          <Input placeholder="Enter phone" />
        </Form.Item>

        <Form.Item label="Website" name="website">
          <Input placeholder="Enter website" />
        </Form.Item>

        <Form.Item
          label="Company Name"
          name="companyName"
          rules={[
            { required: true, message: "Please input the company name!" },
          ]}
        >
          <Input placeholder="Enter company name" />
        </Form.Item>

        <Form.Item
          label="City"
          name="city"
          rules={[{ required: true, message: "Please input the city!" }]}
        >
          <Input placeholder="Enter city" />
        </Form.Item>

        <Form.Item
          label="Zip Code"
          name="zipcode"
          rules={[{ required: true, message: "Please input the zip code!" }]}
        >
          <Input placeholder="Enter zip code" />
        </Form.Item>

        <Form.Item>
          <Space style={{ float: "right" }}>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              {editingUser ? "Update" : "Create"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UserFormModal
