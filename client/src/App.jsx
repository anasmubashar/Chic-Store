import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "@/pages/Auth";
import CustomerRoutes from "./routes/CustomerRoutes";
import DeliveryRoutes from "./routes/DeliveryRoutes";
import Admin from "@/pages/admin/Home";
import AdminRoutes from "./routes/AdminRoutes";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/delivery/*" element={<DeliveryRoutes />} />
        <Route path="/*" element={<CustomerRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </div>
  );
}

export default App;
