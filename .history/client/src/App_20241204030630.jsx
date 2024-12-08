import { Route, Routes } from "react-router-dom";
import Auth from "@/pages/Auth";
import Home from "@/pages/customer/Home";
import Admin from "@/pages/admin/Home";
import Delivery from "@/pages/delivery/Home";
import ProductsPage from "@/pages/customer/ProductsPage";
import ProductDetailPage from "@/pages/customer/ProductDetailPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
