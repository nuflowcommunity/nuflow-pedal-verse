
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ComparisonProvider } from "./contexts/ComparisonContext";
import ErrorBoundary from "./components/error/ErrorBoundary";
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
import ResetPassword from "./pages/auth/ResetPassword";
import NewAnnounce from "./pages/NewAnnounce";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import ProductDetail from "./pages/marketplace/ProductDetail";
import ProductComparison from "./pages/marketplace/ProductComparison";
import AdminLayout from "./components/admin/AdminLayout";
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
import ComparisonFloatingIndicator from "./components/marketplace/ComparisonFloatingIndicator";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ComparisonProvider>
          <TooltipProvider>
            <ErrorBoundary>
              <Toaster />
              <SonnerToaster />
              <Routes>
                {/* Public Routes */}
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
                <Route path="/auth/reset-password" element={<ResetPassword />} />
                <Route path="/anunciar" element={<NewAnnounce />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="/marketplace/:id" element={<ProductDetail />} />
                <Route path="/marketplace/comparacao" element={<ProductComparison />} />

                {/* Admin Routes with AdminLayout */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="entidades" element={<EntidadesAdminContainer />} />
                  <Route path="usuarios" element={<UsersAdmin />} />
                  <Route path="eventos" element={<EventsAdmin />} />
                  <Route path="mensagens" element={<MessagesAdmin />} />
                  <Route path="pedidos" element={<OrdersAdmin />} />
                  <Route path="relatorios" element={<ReportsAdmin />} />
                  <Route path="configuracoes" element={<SettingsAdmin />} />
                  
                  {/* Marketing Routes */}
                  <Route path="marketing" element={<MarketingAdmin />} />
                  <Route path="marketing/google-ads" element={<GoogleAdsPage />} />
                  <Route path="marketing/meta-ads" element={<MetaAdsPage />} />
                  
                  {/* Finance Routes */}
                  <Route path="financeiro" element={<FinanceOverview />} />
                  <Route path="financeiro/dashboard/total-sales" element={<TotalSalesDashboard />} />
                  <Route path="financeiro/dashboard/monthly" element={<MonthlyDashboard />} />
                  <Route path="financeiro/dashboard/last-24-hours" element={<Last24HoursDashboard />} />
                  <Route path="financeiro/contabilidade" element={<Accounting />} />
                  <Route path="financeiro/fluxo-caixa" element={<CashFlow />} />
                  <Route path="financeiro/receitas" element={<Income />} />
                  <Route path="financeiro/despesas" element={<Expenses />} />
                  <Route path="financeiro/relatorios" element={<FinancialReports />} />
                  <Route path="financeiro/contas" element={<AccountsPage />} />
                </Route>

                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <ComparisonFloatingIndicator />
            </ErrorBoundary>
          </TooltipProvider>
        </ComparisonProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
