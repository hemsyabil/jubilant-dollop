import { Layout } from "antd"
import { BrowserRouter } from "react-router-dom"
import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import AppRoutes from "./routes/AppRoutes"

const { Content } = Layout

const App = () => {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: "100vh" }}>
        <Header />
        <Content style={{ flex: 1 }}>
          <AppRoutes />
        </Content>
        <Footer />
      </Layout>
    </BrowserRouter>
  )
}

export default App
