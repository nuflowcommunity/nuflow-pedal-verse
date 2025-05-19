
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
