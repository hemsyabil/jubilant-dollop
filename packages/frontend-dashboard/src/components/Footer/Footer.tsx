import { Layout, Typography } from "antd"
import { useTranslation } from "react-i18next"
import "./Footer.css"

const { Footer: AntFooter } = Layout
const { Text } = Typography

const Footer = () => {
  const { t } = useTranslation()

  return (
    <AntFooter
      style={{
        textAlign: "center",
        backgroundColor: "#798fa4",
        color: "white",
        padding: "15px 0",
      }}
    >
      <Text style={{ color: "white" }}>
        © {new Date().getFullYear()} {t("footer_text")}
      </Text>
    </AntFooter>
  )
}

export default Footer
