
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ComparisonProvider } from "./contexts/ComparisonContext";
import Index from "./pages/Index";
import Products from "./pages/Products";
import Market from "./pages/Market";
import EventsCalendar from "./pages/EventsCalendar";
import EventDetail from "./pages/EventDetail";
import Bikes from "./pages/Bikes";
import Comunidade from "./pages/Comunidade";
import Sobre from "./pages/Sobre";
import Roles from "./pages/Roles";
import Login from "./pages/Login";
import NewAnnounce from "./pages/NewAnnounce";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import Wishlists from "./pages/Wishlists";
import WishlistDetail from "./pages/WishlistDetail";
import SharedWishlist from "./pages/SharedWishlist";
import ProductDetail from "./pages/marketplace/ProductDetail";
import ProductComparison from "./pages/marketplace/ProductComparison";
import Dashboard from "./pages/admin/Dashboard";
import EntidadesAdminContainer from "./pages/admin/EntidadesAdminContainer";
import UsersAdmin from "./pages/admin/UsersAdmin";
import EventsAdmin from "./pages/admin/EventsAdmin";
import MessagesAdmin from "./pages/admin/MessagesAdmin";
import MarketingAdmin from "./pages/admin/MarketingAdmin";
import SettingsAdmin from "./pages/admin/SettingsAdmin";
import OrdersAdmin from "./pages/admin/OrdersAdmin";
import ReportsAdmin from "./pages/admin/ReportsAdmin";
import FinanceOverview from "./pages/admin/finance/FinanceOverview";
import Accounting from "./pages/admin/finance/Accounting";
import CashFlow from "./pages/admin/finance/CashFlow";
import Income from "./pages/admin/finance/Income";
import Expenses from "./pages/admin/finance/Expenses";
import FinancialReports from "./pages/admin/finance/FinancialReports";
import AccountsPage from "./pages/admin/finance/AccountsPage";
import TotalSalesDashboard from "./pages/admin/finance/dashboard/TotalSalesDashboard";
import MonthlyDashboard from "./pages/admin/finance/dashboard/MonthlyDashboard";
import Last24HoursDashboard from "./pages/admin/finance/dashboard/Last24HoursDashboard";
import GoogleAdsPage from "./pages/admin/marketing/GoogleAdsPage";
import MetaAdsPage from "./pages/admin/marketing/MetaAdsPage";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import ComparisonFloatingIndicator from "./components/marketplace/ComparisonFloatingIndicator";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <ComparisonProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/products" element={<Products />} />
                <Route path="/market" element={<Market />} />
                <Route path="/events" element={<EventsCalendar />} />
                <Route path="/events/:id" element={<EventDetail />} />
                <Route path="/bikes" element={<Bikes />} />
                <Route path="/comunidade" element={<Comunidade />} />
                <Route path="/sobre" element={<Sobre />} />
                <Route path="/roles" element={<Roles />} />
                <Route path="/login" element={<Login />} />
                <Route path="/anunciar" element={<NewAnnounce />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/unauthorized" element={<Unauthorized />} />

                {/* Admin Routes */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute requiredRole="Admin">
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/entidades"
                  element={
                    <ProtectedRoute requiredRole="Admin">
                      <EntidadesAdminContainer />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/users"
                  element={
                    <ProtectedRoute requiredRole="Admin">
                      <UsersAdmin />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/events"
                  element={
                    <ProtectedRoute requiredRole="Admin">
                      <EventsAdmin />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/messages"
                  element={
                    <ProtectedRoute requiredRole="Admin">
                      <MessagesAdmin />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/marketing"
                  element={
                    <ProtectedRoute requiredRole="Admin">
                      <MarketingAdmin />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/marketing/google-ads"
                  element={
                    <ProtectedRoute requiredRole="Admin">
                      <GoogleAdsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/marketing/meta-ads"
                  element={
                    <ProtectedRoute requiredRole="Admin">
                      <MetaAdsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/settings"
                  element={
                    <ProtectedRoute requiredRole="Admin">
                      <SettingsAdmin />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/orders"
                  element={
                    <ProtectedRoute requiredRole="Admin">
                      <OrdersAdmin />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/reports"
                  element={
                    <ProtectedRoute requiredRole="Admin">
                      <ReportsAdmin />
                    </ProtectedRoute>
                  }
                />

                {/* Finance Admin Routes */}
                <Route
                  path="/admin/finance"
                  element={
                    <ProtectedRoute requiredRole="Admin">
                      <FinanceOverview />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/finance/dashboard/total-sales"
                  element={
                    <ProtectedRoute requiredRole="Admin">
                      <TotalSalesDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/finance/dashboard/monthly"
                  element={
                    <ProtectedRoute requiredRole="Admin">
                      <MonthlyDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/finance/dashboard/last-24-hours"
                  element={
                    <ProtectedRoute requiredRole="Admin">
                      <Last24HoursDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/finance/accounting"
                  element={
                    <ProtectedRoute requiredRole="Admin">
                      <Accounting />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/finance/cashflow"
                  element={
                    <ProtectedRoute requiredRole="Admin">
                      <CashFlow />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/finance/income"
                  element={
                    <ProtectedRoute requiredRole="Admin">
                      <Income />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/finance/expenses"
                  element={
                    <ProtectedRoute requiredRole="Admin">
                      <Expenses />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/finance/reports"
                  element={
                    <ProtectedRoute requiredRole="Admin">
                      <FinancialReports />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/finance/accounts"
                  element={
                    <ProtectedRoute requiredRole="Admin">
                      <AccountsPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/marketplace/:id" element={<ProductDetail />} />
                <Route path="/marketplace/comparacao" element={<ProductComparison />} />
              </Routes>
              <ComparisonFloatingIndicator />
            </TooltipProvider>
          </ComparisonProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
