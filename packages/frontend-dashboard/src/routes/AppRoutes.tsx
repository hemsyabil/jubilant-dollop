import { Routes, Route } from "react-router-dom";
import Inventory from "../pages/Inventory/Inventory";
import Login from "../pages/Login/Login"
import Dashboard from "../pages/Dashboard/Dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;