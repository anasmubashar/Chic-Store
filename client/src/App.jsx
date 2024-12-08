import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "@/pages/Auth";
import CustomerRoutes from "./routes/CustomerRoutes";
import DeliveryRoutes from "./routes/DeliveryRoutes";
import Admin from "@/pages/admin/Home";
import SalesReports from "@/pages/admin/SalesReports/SalesReports";
import ShippingManagement from "@/pages/admin/ShippingManagement/ShippingManagement";
import OrderManagement from "@/pages/admin/OrderManagement/OrderManagement";
import UserManagement from "@/pages/admin/UserManagement/UserManagement";
import ProductManagement from "@/pages/admin/ProductManagement/ProductManagement";
import { InvoicesPage } from "@/pages/delivery/InvoicesPage";
import DriversPage from "@/pages/delivery/DriversPage";
import { CargoBusesPage } from "@/pages/delivery/CargoBusesPage";
import { ProfilePage } from "@/pages/delivery/ProfilePage";
import { OrdersPage } from "@/pages/delivery/OrdersPage";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/delivery/*" element={<DeliveryRoutes />} />
        <Route path="/*" element={<CustomerRoutes />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/shipping" element={<ShippingManagement />} />
        <Route path="/admin/orders" element={<OrderManagement />} />
        <Route path="/admin/reports" element={<SalesReports />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/products" element={<ProductManagement />} />
        {/* <Route path="/track-orders" element={<OrderTracking />} /> */}
        <Route path="/invoices" element={<InvoicesPage />} />
        <Route path="/drivers" element={<DriversPage />} />
        <Route path="/buses" element={<CargoBusesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Routes>
    </div>
  );
}

export default App;
