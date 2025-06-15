
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { ComparisonProvider } from '@/contexts/ComparisonContext';
import { AccessibilityProvider } from '@/components/accessibility/AccessibilityProvider';
import SkipLinks from '@/components/accessibility/SkipLinks';
import { queryClient } from '@/lib/queryClient';
import BackToTopButton from '@/components/BackToTopButton';

// Auth pages
import Login from '@/pages/Login';
import PartnerLogin from '@/pages/auth/PartnerLogin';
import AdminLogin from '@/pages/auth/AdminLogin';
import ResetPassword from '@/pages/auth/ResetPassword';
import TornarParceiro from '@/pages/TornarParceiro';
import FormularioParceiro from '@/pages/FormularioParceiro';

// Main pages
import Index from '@/pages/Index';
import NewAnnounce from '@/pages/NewAnnounce';

// Marketplace pages
import MarketplaceHome from '@/pages/marketplace/MarketplaceHome';

// Static pages
import Sobre from '@/pages/Sobre';

function App() {
  return (
    <AccessibilityProvider>
      <SkipLinks />
      <QueryClientProvider client={queryClient}>
        <Router>
          <AuthProvider>
            <ComparisonProvider>
              <div className="flex flex-col min-h-screen">
                <Toaster />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/partner/login" element={<PartnerLogin />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/tornar-parceiro" element={<TornarParceiro />} />
                  <Route path="/formulario-parceiro" element={<FormularioParceiro />} />
                  <Route path="/anunciar" element={<NewAnnounce />} />
                  
                  <Route path="/marketplace" element={<MarketplaceHome />} />

                  <Route path="/sobre" element={<Sobre />} />
                </Routes>
                <BackToTopButton />
              </div>
            </ComparisonProvider>
          </AuthProvider>
        </Router>
      </QueryClientProvider>
    </AccessibilityProvider>
  );
}

export default App;
