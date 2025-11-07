import { Typography } from "antd"
import { useTranslation } from "react-i18next"
import "./Login.css"

const { Title } = Typography

const Login = () => {
  const { t } = useTranslation()
  return (
    <div style={{ padding: "24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Title level={2}>{t("login")}</Title>
      </div>
    </div>
  )
}

export default Login
