import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { ComparisonProvider } from '@/contexts/ComparisonContext';
import { AccessibilityProvider } from '@/components/accessibility/AccessibilityProvider';
import { SkipLinks } from '@/components/accessibility/SkipLinks';
import { ErrorBoundary } from '@/components/error/ErrorBoundary';
import { queryClient } from '@/lib/queryClient';
import BackToTopButton from '@/components/BackToTopButton';

// Auth pages
import Login from '@/pages/Login';
import PartnerLogin from '@/pages/auth/PartnerLogin';
import AdminLogin from '@/pages/auth/AdminLogin';
import ResetPassword from '@/pages/auth/ResetPassword';
import TornarParceiro from '@/pages/TornarParceiro';

// Main pages
import Index from '@/pages/Index';

// Marketplace pages
import Marketplace from '@/pages/Marketplace';
import ProductDetails from '@/pages/ProductDetails';
import ComparisonPage from '@/pages/ComparisonPage';

// Static pages
import Sobre from '@/pages/Sobre';
import Contato from '@/pages/Contato';
import Anunciar from '@/pages/Anunciar';

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <AccessibilityProvider>
          <SkipLinks />
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <ComparisonProvider>
                <Router>
                  <div className="flex flex-col min-h-screen">
                    <Toaster />
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/partner/login" element={<PartnerLogin />} />
                      <Route path="/admin/login" element={<AdminLogin />} />
                      <Route path="/reset-password" element={<ResetPassword />} />
                      <Route path="/tornar-parceiro" element={<TornarParceiro />} />
                      
                      <Route path="/marketplace" element={<Marketplace />} />
                      <Route path="/marketplace/:productId" element={<ProductDetails />} />
                      <Route path="/marketplace/comparacao" element={<ComparisonPage />} />

                      <Route path="/sobre" element={<Sobre />} />
                      <Route path="/contato" element={<Contato />} />
                      <Route path="/anunciar" element={<Anunciar />} />
                    </Routes>
                    <BackToTopButton />
                  </div>
                </Router>
              </ComparisonProvider>
            </AuthProvider>
          </QueryClientProvider>
        </AccessibilityProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
