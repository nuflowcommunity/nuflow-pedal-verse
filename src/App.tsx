
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import EventsCalendar from "./pages/EventsCalendar";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Roles from "./pages/Roles";
import Sobre from "./pages/Sobre";
import Bikes from "./pages/Bikes";
import Comunidade from "./pages/Comunidade";
import Products from "./pages/Products";
import Market from "./pages/Market";
import NewAnnounce from "./pages/NewAnnounce";
import EventDetail from "./pages/EventDetail";
import Dashboard from "./pages/admin/Dashboard";
import AdminLayout from "./components/admin/AdminLayout";
import EventsAdmin from "./pages/admin/EventsAdmin";
import UsersAdmin from "./pages/admin/UsersAdmin";
import MessagesAdmin from "./pages/admin/MessagesAdmin";
import ReportsAdmin from "./pages/admin/ReportsAdmin";
import SettingsAdmin from "./pages/admin/SettingsAdmin";
import OrdersAdmin from "./pages/admin/OrdersAdmin";
import MarketingAdmin from "./pages/admin/MarketingAdmin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/eventos" element={<EventsCalendar />} />
      <Route path="/eventos/:id" element={<EventDetail />} />
      <Route path="/comunidade" element={<Comunidade />} />
      <Route path="/bikes" element={<Bikes />} />
      <Route path="/mercado" element={<Market />} />
      <Route path="/mercado/produtos" element={<Products />} />
      <Route path="/mercado/novo-anuncio" element={<NewAnnounce />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/roles" element={<Roles />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="eventos" element={<EventsAdmin />} />
        <Route path="pedidos" element={<OrdersAdmin />} />
        <Route path="usuarios" element={<UsersAdmin />} />
        <Route path="mensagens" element={<MessagesAdmin />} />
        <Route path="marketing" element={<MarketingAdmin />} />
        <Route path="relatorios" element={<ReportsAdmin />} />
        <Route path="configuracoes" element={<SettingsAdmin />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
