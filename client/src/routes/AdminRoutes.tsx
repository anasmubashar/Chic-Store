import { Route, Routes } from "react-router-dom";
import Admin from "@/pages/admin/Home";
import SalesReports from "@/pages/admin/SalesReports/SalesReports";
import ShippingManagement from "@/pages/admin/ShippingManagement/ShippingManagement";
import OrderManagement from "@/pages/admin/OrderManagement/OrderManagement";
import UserManagement from "@/pages/admin/UserManagement/UserManagement";
import ProductManagement from "@/pages/admin/ProductManagement/ProductManagement";
function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Admin />} />
      <Route path="/admin/shipping" element={<ShippingManagement />} />
      <Route path="/admin/orders" element={<OrderManagement />} />
      <Route path="/admin/reports" element={<SalesReports />} />
      <Route path="/admin/users" element={<UserManagement />} />
      <Route path="/admin/products" element={<ProductManagement />} />
    </Routes>
  );
}

export default AdminRoutes;
