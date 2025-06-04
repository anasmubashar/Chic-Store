import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import SalesReports from "@/pages/admin/SalesReports/SalesReports";
import ShippingManagement from "@/pages/admin/ShippingManagement/ShippingManagement";
import OrderManagement from "../pages/admin/OrderManagement/OrderManagement";
import UserManagement from "@/pages/admin/UserManagement/UserManagement";
import ProductManagement from "@/pages/admin/ProductManagement/ProductManagement";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/shipping" element={<ShippingManagement />} />
      <Route path="/" element={<OrderManagement />} />
      <Route path="/reports" element={<SalesReports />} />
      <Route path="/users" element={<UserManagement />} />
      <Route path="/products" element={<ProductManagement />} />
    </Routes>
  );
}

export default AdminRoutes;
