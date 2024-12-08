import { Route, Routes } from "react-router-dom";
import Home from "@/pages/customer/Home";
import ProductsPage from "@/pages/customer/ProductsPage";
import ProductDetailPage from "@/pages/customer/ProductDetailPage";
import CheckoutInfo from "@/pages/customer/CheckoutInfo";
import CheckoutShipping from "@/pages/customer/CheckoutShipping";
import CheckoutPayment from "@/pages/customer/CheckoutPayment";
import { CheckoutProvider } from "@/store/CheckoutContext";

function CustomerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
      <Route
        path="/checkout/info"
        element={
          <CheckoutProvider>
            <CheckoutInfo />
          </CheckoutProvider>
        }
      />
      <Route path="/checkout/shipping" element={<CheckoutShipping />} />
      <Route
        path="/checkout/payment"
        element={
          <CheckoutProvider>
            <CheckoutPayment />
          </CheckoutProvider>
        }
      />
    </Routes>
  );
}

export default CustomerRoutes;
