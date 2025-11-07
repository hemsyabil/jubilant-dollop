import { Row } from "antd"
import { type ReactNode } from "react"

interface DashboardRowProps {
  children: ReactNode
  fullWidth?: boolean
}

const DashboardRow: React.FC<DashboardRowProps> = ({
  children,
  fullWidth = false,
}) => {
  if (fullWidth) {
    return <Row gutter={[16, 16]}>{children}</Row>
  }

  return <Row gutter={[16, 16]}>{children}</Row>
}

export default DashboardRow
