
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import MobileBottomNav from './MobileBottomNav';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

const AdminLayout = () => {
  const location = useLocation();
  
  // Para desenvolvimento, permitir acesso direto
  const isDevelopment = import.meta.env.DEV;
  
  if (isDevelopment) {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-gray-50">
          <AdminSidebar />
          <div className="flex flex-col flex-1 min-w-0">
            <AdminHeader />
            <main className="p-3 sm:p-4 md:p-6 flex-1 overflow-auto pb-16 md:pb-6">
              <Outlet />
            </main>
            <MobileBottomNav />
          </div>
        </div>
      </SidebarProvider>
    );
  }

  // Em produção, usar proteção normal
  return (
    <ProtectedRoute requiredRole="admin">
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-gray-50">
          <AdminSidebar />
          <div className="flex flex-col flex-1 min-w-0">
            <AdminHeader />
            <main className="p-3 sm:p-4 md:p-6 flex-1 overflow-auto pb-16 md:pb-6">
              <Outlet />
            </main>
            <MobileBottomNav />
          </div>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  );
};

export default AdminLayout;
