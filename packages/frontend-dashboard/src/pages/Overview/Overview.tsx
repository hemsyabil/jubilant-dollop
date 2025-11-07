import { Typography } from "antd"
import { useTranslation } from "react-i18next"
import UserTable from "../../components/UserTable"

const { Title } = Typography

const Overview = () => {
  const { t } = useTranslation()
  return (
    <div style={{ padding: "24px" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <Title level={2} style={{ marginBottom: "24px" }}>
          {t("overview")}
        </Title>
        <UserTable title="User Management System" />
      </div>
    </div>
  )
}

export default Overview
