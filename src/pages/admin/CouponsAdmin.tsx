
import React from 'react';
import { CouponsManagement } from '@/components/admin/coupons/CouponsManagement';

const CouponsAdmin = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Gerenciamento de Cupons</h1>
      </div>
      <CouponsManagement />
    </div>
  );
};

export default CouponsAdmin;
