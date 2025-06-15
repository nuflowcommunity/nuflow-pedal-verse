
import React from 'react';
import OrdersDataTable from '@/components/admin/orders/OrdersDataTable';

const OrdersAdmin = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Gerenciamento de Pedidos</h1>
      </div>

      <OrdersDataTable />
    </div>
  );
};

export default OrdersAdmin;
