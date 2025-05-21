
import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

const AdminLayout = () => {
  return (
    // Using ProtectedRoute but it now bypasses authentication checks
    <ProtectedRoute>
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-[#f9f9f9]">
          <AdminSidebar />
          <div className="flex flex-col flex-1">
            <AdminHeader />
            <main className="p-6 flex-1">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  );
};

export default AdminLayout;
