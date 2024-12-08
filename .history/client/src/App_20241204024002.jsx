import { Route, Routes } from "react-router-dom";
import Auth from "@/pages/Auth";
import Home from "@/pages/customer/Home";
import Admin from "@/pages/admin/Home";
import Delivery from "@/pages/delivery/Home";
import Collections from "./pages/customer/collections";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/collections" element={<Collections />} />
      </Routes>
    </div>
  );
}

export default App;
