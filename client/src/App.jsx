import { Route, Routes } from "react-router-dom";
import Auth from "@/pages/Auth";
import Home from "@/pages/customer/Home";
import Admin from "@/pages/admin/Home";
import Delivery from "@/pages/delivery/Home";
import ProductsPage from "@/pages/Customer/ProductsPage";
import ProductDetailPage from "@/pages/Customer/ProductDetailPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import DriversPage from './pages/delivery/DriversPage';
import { Sidebar } from './components/ui/sidebar'
import { OrderTracking } from './components/Delivery/order-tracking'
import { InvoicesPage } from './pages/delivery/InvoicesPage';
import { CargoBusesPage } from "./pages/delivery/CargoBusesPage";
import { ProfilePage } from "./pages/delivery/ProfilePage";
import { OrdersPage } from "./pages/delivery/OrdersPage"

// Placeholder components for other routes
import ProductsPage from "@/pages/customer/ProductsPage";
import ProductDetailPage from "@/pages/customer/ProductDetailPage";
import CheckoutInfo from "@/pages/customer/CheckoutInfo";
import CheckoutShipping from "@/pages/customer/CheckoutShipping";
import CheckoutPayment from "@/pages/customer/CheckoutPayment";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/checkout/info" element={<CheckoutInfo />} />
        <Route path="/checkout/shipping" element={<CheckoutShipping />} />
        <Route path="/checkout/payment" element={<CheckoutPayment />} />

      </Routes>


      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<OrderTracking />} />
            <Route path="/track-orders" element={<OrderTracking />} />
           <Route path="/invoices" element={<InvoicesPage/>} />
           <Route path="/drivers" element={<DriversPage/>} />
           <Route path="/buses" element={<CargoBusesPage/>} />
           <Route path="/profile" element={<ProfilePage/>}/>
           <Route path="/orders" element={<OrdersPage/>}/>
          </Routes>
        </main>
      </div>
     </div>
  );
}

export default App;
