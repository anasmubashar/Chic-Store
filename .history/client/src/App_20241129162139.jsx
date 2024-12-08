import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/customer/Home";
import Admin from "./pages/admin/Home";
import Delivery from "./pages/delivery/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/delivery" element={<Delivery />} />
      </Routes>
    </div>
  );
}

export default App;
