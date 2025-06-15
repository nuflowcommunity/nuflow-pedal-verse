
import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import MobileBottomNav from './MobileBottomNav';

const AdminLayout = () => {
  // Durante desenvolvimento, sempre permitir acesso direto
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <AdminSidebar />
        <div className="flex flex-col flex-1 min-w-0">
          <AdminHeader />
          <main className="p-3 sm:p-4 md:p-6 flex-1 overflow-auto pb-16 md:pb-6 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
          <MobileBottomNav />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
