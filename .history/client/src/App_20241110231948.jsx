import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/customer/Home";
import Admin from "./pages/admin/Home";
import Vendor from "./pages/vendor/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/vendor" element={<Vendor />} />
      </Routes>
    </div>
  );
}

export default App;
