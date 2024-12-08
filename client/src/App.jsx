import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "@/pages/Auth";
import CustomerRoutes from "./routes/CustomerRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import DeliveryRoutes from "./routes/DeliveryRoutes";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/delivery/*" element={<DeliveryRoutes />} />
        <Route path="/*" element={<CustomerRoutes />} />
      </Routes>
    </div>
  );
}

export default App;
