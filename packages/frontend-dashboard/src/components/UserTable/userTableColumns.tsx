import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Button, Popconfirm, Space } from "antd"
import type { ColumnsType } from "antd/es/table"
import React from "react"
import type { User } from "../../utils/web/userService"

interface UserTableColumnsProps {
  onEdit: (user: User) => void
  onDelete: (userId: number) => void
}

export const getUserTableColumns = ({
  onEdit,
  onDelete,
}: UserTableColumnsProps): ColumnsType<User> => [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 60,
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
    filterSearch: true,
    onFilter: (value, record) =>
      record.name.toLowerCase().includes((value as string).toLowerCase()),
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    render: (email: string) => <a href={`mailto:${email}`}>{email}</a>,
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Website",
    dataIndex: "website",
    key: "website",
    render: (website: string) => (
      <a href={`http://${website}`} target="_blank" rel="noopener noreferrer">
        {website}
      </a>
    ),
  },
  {
    title: "Company",
    dataIndex: ["company", "name"],
    key: "company",
  },
  {
    title: "City",
    dataIndex: ["address", "city"],
    key: "city",
  },
  {
    title: "Zip Code",
    dataIndex: ["address", "zipcode"],
    key: "zipcode",
  },
  {
    title: "Actions",
    key: "actions",
    width: 120,
    render: (_, record) => (
      <Space size="small">
        <Button
          type="link"
          icon={<EditOutlined />}
          onClick={() => onEdit(record)}
          size="small"
        />
        <Popconfirm
          title="Delete user"
          description={`Are you sure you want to delete ${record.name}?`}
          onConfirm={() => onDelete(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link" danger icon={<DeleteOutlined />} size="small" />
        </Popconfirm>
      </Space>
    ),
  },
]
