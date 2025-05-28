import { Suspense, lazy } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { queryClient } from "@/lib/queryClient";
import Index from "./pages/Index";
import BackToTopButton from "./components/BackToTopButton";
import LoadingTransition from "./components/ui/loading-transition";
import ErrorBoundary from "./components/error/ErrorBoundary";
import AccessibilityProvider from "./components/accessibility/AccessibilityProvider";
import SkipLinks from "./components/accessibility/SkipLinks";

// Lazy load components
const Market = lazy(() => import("./pages/Market"));
const ProductDetail = lazy(() => import("./pages/marketplace/ProductDetail"));
const NewAnnounce = lazy(() => import("./pages/NewAnnounce"));
const Products = lazy(() => import("./pages/Products"));
const Bikes = lazy(() => import("./pages/Bikes"));
const Comunidade = lazy(() => import("./pages/Comunidade"));
const Sobre = lazy(() => import("./pages/Sobre"));
const Login = lazy(() => import("./pages/Login"));
const EventsCalendar = lazy(() => import("./pages/EventsCalendar"));
const EventDetail = lazy(() => import("./pages/EventDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Unauthorized = lazy(() => import("./pages/Unauthorized"));
const Roles = lazy(() => import("./pages/Roles"));

// Admin pages
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const EntidadesAdminContainer = lazy(() => import("./pages/admin/EntidadesAdminContainer"));
const EventsAdmin = lazy(() => import("./pages/admin/EventsAdmin"));
const UsersAdmin = lazy(() => import("./pages/admin/UsersAdmin"));
const OrdersAdmin = lazy(() => import("./pages/admin/OrdersAdmin"));
const MessagesAdmin = lazy(() => import("./pages/admin/MessagesAdmin"));
const ReportsAdmin = lazy(() => import("./pages/admin/ReportsAdmin"));
const SettingsAdmin = lazy(() => import("./pages/admin/SettingsAdmin"));
const MarketingAdmin = lazy(() => import("./pages/admin/MarketingAdmin"));

// Finance pages
const FinanceOverview = lazy(() => import("./pages/admin/finance/FinanceOverview"));
const AccountsPage = lazy(() => import("./pages/admin/finance/AccountsPage"));
const CashFlow = lazy(() => import("./pages/admin/finance/CashFlow"));
const Income = lazy(() => import("./pages/admin/finance/Income"));
const Expenses = lazy(() => import("./pages/admin/finance/Expenses"));
const FinancialReports = lazy(() => import("./pages/admin/finance/FinancialReports"));
const Accounting = lazy(() => import("./pages/admin/finance/Accounting"));
const Last24HoursDashboard = lazy(() => import("./pages/admin/finance/dashboard/Last24HoursDashboard"));
const MonthlyDashboard = lazy(() => import("./pages/admin/finance/dashboard/MonthlyDashboard"));
const TotalSalesDashboard = lazy(() => import("./pages/admin/finance/dashboard/TotalSalesDashboard"));

// Marketing pages
const GoogleAdsPage = lazy(() => import("./pages/admin/marketing/GoogleAdsPage"));
const MetaAdsPage = lazy(() => import("./pages/admin/marketing/MetaAdsPage"));

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <AccessibilityProvider>
            <TooltipProvider>
              <SkipLinks />
              <Toaster />
              <Sonner />
              <Suspense fallback={<LoadingTransition />}>
                <main id="main-content">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/marketplace" element={<Market />} />
                    <Route path="/marketplace/produto/:id" element={<ProductDetail />} />
                    <Route path="/market" element={<Market />} />
                    <Route path="/anunciar" element={<NewAnnounce />} />
                    <Route path="/produtos" element={<Products />} />
                    <Route path="/bikes" element={<Bikes />} />
                    <Route path="/comunidade" element={<Comunidade />} />
                    <Route path="/sobre" element={<Sobre />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/eventos" element={<EventsCalendar />} />
                    <Route path="/eventos/:id" element={<EventDetail />} />
                    <Route path="/roles" element={<Roles />} />
                    <Route path="/unauthorized" element={<Unauthorized />} />
                    
                    {/* Admin routes */}
                    <Route path="/admin" element={<Dashboard />} />
                    <Route path="/admin/dashboard" element={<Dashboard />} />
                    <Route path="/admin/entidades" element={<EntidadesAdminContainer />} />
                    <Route path="/admin/events" element={<EventsAdmin />} />
                    <Route path="/admin/users" element={<UsersAdmin />} />
                    <Route path="/admin/orders" element={<OrdersAdmin />} />
                    <Route path="/admin/messages" element={<MessagesAdmin />} />
                    <Route path="/admin/reports" element={<ReportsAdmin />} />
                    <Route path="/admin/settings" element={<SettingsAdmin />} />
                    <Route path="/admin/marketing" element={<MarketingAdmin />} />
                    
                    {/* Finance routes */}
                    <Route path="/admin/finance" element={<FinanceOverview />} />
                    <Route path="/admin/finance/accounts" element={<AccountsPage />} />
                    <Route path="/admin/finance/cash-flow" element={<CashFlow />} />
                    <Route path="/admin/finance/income" element={<Income />} />
                    <Route path="/admin/finance/expenses" element={<Expenses />} />
                    <Route path="/admin/finance/reports" element={<FinancialReports />} />
                    <Route path="/admin/finance/accounting" element={<Accounting />} />
                    <Route path="/admin/finance/last-24h" element={<Last24HoursDashboard />} />
                    <Route path="/admin/finance/monthly" element={<MonthlyDashboard />} />
                    <Route path="/admin/finance/total" element={<TotalSalesDashboard />} />
                    
                    {/* Marketing routes */}
                    <Route path="/admin/marketing/google-ads" element={<GoogleAdsPage />} />
                    <Route path="/admin/marketing/meta-ads" element={<MetaAdsPage />} />
                    
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </Suspense>
              <BackToTopButton />
            </TooltipProvider>
          </AccessibilityProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
