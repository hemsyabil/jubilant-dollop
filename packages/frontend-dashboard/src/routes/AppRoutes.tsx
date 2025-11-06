import { Routes, Route } from "react-router-dom";
import Overview from "../pages/Overview/Overview";
import Inventory from "../pages/Inventory/Inventory";
import Login from "../pages/Login/Login"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Overview />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;