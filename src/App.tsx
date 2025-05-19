
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Client Pages
import Index from "./pages/Index";
import Roles from "./pages/Roles";
import EventsCalendar from "./pages/EventsCalendar";
import EventDetail from "./pages/EventDetail";
import Market from "./pages/Market";
import Bikes from "./pages/Bikes";
import Products from "./pages/Products";
import NewAnnounce from "./pages/NewAnnounce";
import Comunidade from "./pages/Comunidade";
import Sobre from "./pages/Sobre";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import EventsAdmin from "./pages/admin/EventsAdmin";
import OrdersAdmin from "./pages/admin/OrdersAdmin";
import UsersAdmin from "./pages/admin/UsersAdmin";
import MessagesAdmin from "./pages/admin/MessagesAdmin";
import ReportsAdmin from "./pages/admin/ReportsAdmin";
import SettingsAdmin from "./pages/admin/SettingsAdmin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Client Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/roles/:eventId" element={<EventDetail />} />
          <Route path="/eventos" element={<EventsCalendar />} />
          <Route path="/eventos/:eventId" element={<EventDetail />} />
          <Route path="/market" element={<Market />} />
          <Route path="/market/bikes" element={<Bikes />} />
          <Route path="/market/products" element={<Products />} />
          <Route path="/anunciar" element={<NewAnnounce />} />
          <Route path="/comunidade" element={<Comunidade />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<NotFound />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="eventos" element={<EventsAdmin />} />
            <Route path="pedidos" element={<OrdersAdmin />} />
            <Route path="usuarios" element={<UsersAdmin />} />
            <Route path="mensagens" element={<MessagesAdmin />} />
            <Route path="relatorios" element={<ReportsAdmin />} />
            <Route path="configuracoes" element={<SettingsAdmin />} />
          </Route>
          
          {/* Catch-all Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
