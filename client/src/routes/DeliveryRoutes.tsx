import { Route, Routes } from "react-router-dom";
import { Sidebar } from "@/components/ui/sidebar";
import { OrderTracking } from "@/components/Delivery/order-tracking";
import { InvoicesPage } from "@/pages/delivery/InvoicesPage";
import DriversPage from "@/pages/delivery/DriversPage";
import { CargoBusesPage } from "@/pages/delivery/CargoBusesPage";
import { ProfilePage } from "@/pages/delivery/ProfilePage";
import { OrdersPage } from "@/pages/delivery/OrdersPage";
import { AssignTaskPage } from "@/pages/delivery/AssignTaskPage";

function DeliveryRoutes() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<OrderTracking />} />
        </Routes>
      </main>
    </div>
  );
}

export default DeliveryRoutes;
