
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { ComparisonProvider } from '@/contexts/ComparisonContext';
import { AccessibilityProvider } from '@/components/accessibility/AccessibilityProvider';
import SkipLinks from '@/components/accessibility/SkipLinks';
import ErrorBoundary from '@/components/error/ErrorBoundary';
import BackToTopButton from '@/components/BackToTopButton';
import SEOHead from '@/components/seo/SEOHead';

// Layouts
import AdminLayout from '@/components/admin/AdminLayout';

// Pages
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import AdminLogin from '@/pages/auth/AdminLogin';
import PartnerLogin from '@/pages/auth/PartnerLogin';
import Sobre from '@/pages/Sobre';
import Products from '@/pages/Products';
import Bikes from '@/pages/Bikes';
import Market from '@/pages/Market';
import EventsCalendar from '@/pages/EventsCalendar';
import EventDetail from '@/pages/EventDetail';
import NewAnnounce from '@/pages/NewAnnounce';
import Comunidade from '@/pages/Comunidade';
import Roles from '@/pages/Roles';
import Wishlists from '@/pages/Wishlists';
import WishlistDetail from '@/pages/WishlistDetail';
import SharedWishlist from '@/pages/SharedWishlist';
import NotFound from '@/pages/NotFound';
import Unauthorized from '@/pages/Unauthorized';
import Checkout from '@/pages/Checkout';
import MeusPasses from '@/pages/MeusPasses';
import Perfil from '@/pages/Perfil';
import FAQ from '@/pages/FAQ';

// Admin Pages
import Dashboard from '@/pages/admin/Dashboard';
import EventsAdmin from '@/pages/admin/EventsAdmin';
import OrdersAdmin from '@/pages/admin/OrdersAdmin';
import UsersAdmin from '@/pages/admin/UsersAdmin';
import MessagesAdmin from '@/pages/admin/MessagesAdmin';
import ReportsAdmin from '@/pages/admin/ReportsAdmin';
import SettingsAdmin from '@/pages/admin/SettingsAdmin';
import MarketingAdmin from '@/pages/admin/MarketingAdmin';
import EntidadesAdminContainer from '@/pages/admin/EntidadesAdminContainer';
import CouponsAdmin from '@/pages/admin/CouponsAdmin';

// Marketing Pages
import GoogleAdsPage from '@/pages/admin/marketing/GoogleAdsPage';
import MetaAdsPage from '@/pages/admin/marketing/MetaAdsPage';

// Finance Pages
import FinanceOverview from '@/pages/admin/finance/FinanceOverview';
import CashFlow from '@/pages/admin/finance/CashFlow';
import Income from '@/pages/admin/finance/Income';
import Expenses from '@/pages/admin/finance/Expenses';
import AccountsPage from '@/pages/admin/finance/AccountsPage';
import FinancialReports from '@/pages/admin/finance/FinancialReports';
import Accounting from '@/pages/admin/finance/Accounting';

// Marketplace Pages
import MarketplaceHome from '@/pages/marketplace/MarketplaceHome';
import ProductDetail from '@/pages/marketplace/ProductDetail';
import ProductComparison from '@/pages/marketplace/ProductComparison';

// Auth Pages
import ResetPassword from '@/pages/auth/ResetPassword';

import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

import { PartnerLayout } from '@/components/partner/PartnerLayout';
import { ProtectedPartnerRoute } from '@/components/partner/ProtectedPartnerRoute';
import { PartnerDashboard } from '@/pages/partner/PartnerDashboard';
import { PartnerCredits } from '@/pages/partner/PartnerCredits';
import { PartnerDayUse } from '@/pages/partner/PartnerDayUse';
import { PartnerSubscriptions } from '@/pages/partner/PartnerSubscriptions';
import { PartnerEvents } from '@/pages/partner/PartnerEvents';
import { PartnerSettings } from '@/pages/partner/PartnerSettings';
import { PartnerPasses } from '@/pages/partner/PartnerPasses';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <ComparisonProvider>
        <AuthProvider>
          <AccessibilityProvider>
            <SEOHead />
            <SkipLinks />
            <div className="w-full">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/partner/login" element={<PartnerLogin />} />
                <Route path="/sobre" element={<Sobre />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/produtos" element={<Products />} />
                <Route path="/bikes" element={<Bikes />} />
                <Route path="/market" element={<Market />} />
                <Route path="/events" element={<Navigate to="/eventos" replace />} />
                <Route path="/eventos" element={<EventsCalendar />} />
                <Route path="/eventos/:id" element={<EventDetail />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/meus-passes" element={<MeusPasses />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/anunciar" element={<NewAnnounce />} />
                <Route path="/comunidade" element={<Comunidade />} />
                <Route path="/roles" element={<Roles />} />
                <Route path="/wishlists" element={<Wishlists />} />
                <Route path="/wishlists/:id" element={<WishlistDetail />} />
                <Route path="/shared/:token" element={<SharedWishlist />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="/auth/reset-password" element={<ResetPassword />} />
                <Route path="/admin/reset-password" element={<ResetPassword />} />
                <Route path="/partner/reset-password" element={<ResetPassword />} />
                
                {/* Marketplace Routes */}
                <Route path="/marketplace" element={<MarketplaceHome />} />
                <Route path="/marketplace/produto/:id" element={<ProductDetail />} />
                <Route path="/marketplace/comparar" element={<ProductComparison />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="eventos" element={<EventsAdmin />} />
                  <Route path="entidades" element={<EntidadesAdminContainer />} />
                  <Route path="cupons" element={<CouponsAdmin />} />
                  <Route path="pedidos" element={<OrdersAdmin />} />
                  <Route path="usuarios" element={<UsersAdmin />} />
                  <Route path="mensagens" element={<MessagesAdmin />} />
                  <Route path="relatorios" element={<ReportsAdmin />} />
                  <Route path="configuracoes" element={<SettingsAdmin />} />
                  <Route path="marketing" element={<MarketingAdmin />} />
                  <Route path="marketing/google-ads" element={<GoogleAdsPage />} />
                  <Route path="marketing/meta-ads" element={<MetaAdsPage />} />
                  <Route path="financeiro" element={<FinanceOverview />} />
                  <Route path="financeiro/fluxo-caixa" element={<CashFlow />} />
                  <Route path="financeiro/receitas" element={<Income />} />
                  <Route path="financeiro/despesas" element={<Expenses />} />
                  <Route path="financeiro/contas" element={<AccountsPage />} />
                  <Route path="financeiro/relatorios" element={<FinancialReports />} />
                  <Route path="financeiro/contabilidade" element={<Accounting />} />
                </Route>

                {/* Partner Routes */}
                <Route
                  path="/partner/*"
                  element={
                    <ProtectedPartnerRoute>
                      <PartnerLayout />
                    </ProtectedPartnerRoute>
                  }
                >
                  <Route path="dashboard" element={<PartnerDashboard />} />
                  <Route path="passes" element={<PartnerPasses />} />
                  <Route path="creditos" element={<PartnerCredits />} />
                  <Route path="day-use" element={<PartnerDayUse />} />
                  <Route path="assinaturas" element={<PartnerSubscriptions />} />
                  <Route path="eventos" element={<PartnerEvents />} />
                  <Route path="configuracoes" element={<PartnerSettings />} />
                </Route>

                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <BackToTopButton />
          </AccessibilityProvider>
        </AuthProvider>
      </ComparisonProvider>
    </QueryClientProvider>
  );
}

export default App;
