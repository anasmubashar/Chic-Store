import { Route, Routes } from "react-router-dom";
import Auth from "@/pages/Auth";
import Home from "@/pages/customer/Home";
import Admin from "@/pages/admin/Home";
import Delivery from "@/pages/delivery/Home";
import ProductsPage from "@/pages/customer/ProductsPage";
import ProductDetailPage from "@/pages/customer/ProductDetailPage";
import CheckoutInfo from "@/pages/customer/CheckoutInfo";
import CheckoutShipping from "@/pages/customer/CheckoutShipping";
import CheckoutPayment from "@/pages/customer/CheckoutPayment";
import ProductManagement from "./pages/admin/ProductManagement/Product-management";

import { Provider } from "react-redux";
import { store } from "./store/store";
import SidebarLayout from "./components/Layout";
import Profile from "./pages/delivery/Profile";
import SalesReports from "./pages/admin/Reports/SalesReports";
import ShippingManagement from "./pages/admin/Shipping/ShippingManagement";
import OrderManagement from "./pages/admin/OrderManagement/OrderManagement";
import UserManagement from "./pages/admin/Users/UserManagement";

// Placeholder components for other routes
const Orders = () => <div>Orders Page</div>;
const Drivers = () => <div>Drivers Page</div>;
const AssignOrders = () => <div>Assign Orders Page</div>;
const Analytics = () => <div>Analytics Page</div>;

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/products" element={<ProductManagement />} />
        <Route path="/admin/reports" element={<SalesReports />} />
        <Route path="/admin/shipping" element={<ShippingManagement />} />
        <Route path="/admin/orders" element={<OrderManagement />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/checkout/info" element={<CheckoutInfo />} />
        <Route path="/checkout/shipping" element={<CheckoutShipping />} />
        <Route path="/checkout/payment" element={<CheckoutPayment />} />
      </Routes>
    </div>
  );
}

export default App;
