import {
  BulbFilled,
  BulbOutlined,
  GlobalOutlined,
  LoginOutlined,
} from "@ant-design/icons"
import { Button, Layout, Space, Typography } from "antd"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Link, useNavigate } from "react-router-dom"
import { useTheme } from "../../hooks/useTheme"
import "./Header.css"

const { Header: AntHeader } = Layout
const { Text } = Typography

const Header = () => {
  const { isDark, toggleTheme } = useTheme()
  const { t, i18n } = useTranslation()
  const [language, setLanguage] = useState<"EN" | "FR">("EN")
  const navigate = useNavigate()

  const toggleLanguage = () => {
    const newLang = language === "EN" ? "FR" : "EN"
    setLanguage(newLang)
    i18n.changeLanguage(newLang.toLowerCase())
  }

  const handleLogin = () => {
    navigate("/login")
  }

  return (
    <AntHeader
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        height: "70px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          alt="Logo"
          src="https://picsum.photos/400/60/?blur"
          style={{ height: 50, borderRadius: 4 }}
        />
      </div>

      {/* Navigation */}
      <Space size="large">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <Text strong>{t("overview")}</Text>
        </Link>
        <Link
          to="/inventory"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <Text strong>{t("inventory")}</Text>
        </Link>
      </Space>

      {/* Actions */}
      <Space size="large">
        <Button
          type="text"
          icon={isDark ? <BulbFilled /> : <BulbOutlined />}
          onClick={toggleTheme}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            height: "40px",
            padding: "0 12px",
          }}
        >
          {isDark ? t("dark") : t("light")}
        </Button>

        <Button
          type="text"
          icon={<GlobalOutlined />}
          onClick={toggleLanguage}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            height: "40px",
            padding: "0 12px",
          }}
        >
          {language}
        </Button>

        <Button
          type="text"
          icon={<LoginOutlined />}
          onClick={handleLogin}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            height: "40px",
            padding: "0 12px",
          }}
        >
          {t("login")}
        </Button>
      </Space>
    </AntHeader>
  )
}

export default Header
