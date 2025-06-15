
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import OrdersMetrics from './OrdersMetrics';
import OrdersFilters from './OrdersFilters';
import OrdersTable from './OrdersTable';
import { Order } from './OrdersColumns';

const OrdersDataTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['admin-orders', searchTerm, statusFilter],
    queryFn: async () => {
      let query = supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (searchTerm) {
        query = query.or(`id.ilike.%${searchTerm}%,tracking_code.ilike.%${searchTerm}%`);
      }

      if (statusFilter && statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Order[];
    }
  });

  const exportOrders = () => {
    const csv = [
      'ID,Quantidade,Valor Total,Status,Status Pagamento,Data',
      ...orders.map(order => [
        order.id,
        order.quantity,
        order.total_amount,
        order.status,
        order.payment_status,
        new Date(order.created_at).toLocaleDateString('pt-BR')
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pedidos_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const filters = (
    <OrdersFilters
      searchTerm={searchTerm}
      statusFilter={statusFilter}
      onSearchChange={setSearchTerm}
      onStatusFilterChange={setStatusFilter}
      onExport={exportOrders}
    />
  );

  return (
    <div className="space-y-6">
      <OrdersMetrics />
      <OrdersTable
        orders={orders}
        isLoading={isLoading}
        filters={filters}
      />
    </div>
  );
};

export default OrdersDataTable;
