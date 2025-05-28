
import React from 'react';
import { Outlet } from 'react-router-dom';
import { PartnerSidebar } from './PartnerSidebar';
import { PartnerHeader } from './PartnerHeader';
import { PartnerProvider } from '@/contexts/PartnerContext';

export const PartnerLayout: React.FC = () => {
  return (
    <PartnerProvider>
      <div className="min-h-screen bg-gray-50 flex">
        <PartnerSidebar />
        <div className="flex-1 flex flex-col">
          <PartnerHeader />
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </PartnerProvider>
  );
};
