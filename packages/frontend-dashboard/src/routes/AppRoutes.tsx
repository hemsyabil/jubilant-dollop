import { Routes, Route } from "react-router-dom";
import Overview from "../pages/Overview/Overview";
import Inventory from "../pages/Inventory/Inventory";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Overview />} />
      <Route path="/inventory" element={<Inventory />} />
    </Routes>
  );
};

export default AppRoutes;