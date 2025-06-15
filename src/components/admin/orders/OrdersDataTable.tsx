
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { FinanceTableCore } from '@/components/admin/finance/table/FinanceTableCore';
import { FinanceTableColumn } from '@/components/admin/finance/table/FinanceTableTypes';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Download, Package, Truck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Order {
  id: string;
  buyer_id: string;
  seller_id: string;
  product_id: string;
  quantity: number;
  total_amount: number;
  status: string;
  payment_status: string;
  created_at: string;
  tracking_code?: string;
}

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

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Pendente', className: 'bg-yellow-100 text-yellow-800' },
      confirmed: { label: 'Confirmado', className: 'bg-blue-100 text-blue-800' },
      shipped: { label: 'Enviado', className: 'bg-purple-100 text-purple-800' },
      delivered: { label: 'Entregue', className: 'bg-green-100 text-green-800' },
      cancelled: { label: 'Cancelado', className: 'bg-red-100 text-red-800' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getPaymentStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Pendente', className: 'bg-yellow-100 text-yellow-800' },
      paid: { label: 'Pago', className: 'bg-green-100 text-green-800' },
      failed: { label: 'Falhou', className: 'bg-red-100 text-red-800' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  const exportOrders = () => {
    const csv = [
      'ID,Quantidade,Valor Total,Status,Status Pagamento,Data',
      ...orders.map(order => [
        order.id,
        order.quantity,
        order.total_amount,
        order.status,
        order.payment_status,
        formatDate(order.created_at)
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pedidos_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const columns: FinanceTableColumn<Order>[] = [
    {
      id: 'id',
      header: 'Pedido',
      accessorKey: 'id',
      sortable: true,
      cell: (order) => (
        <div className="space-y-1">
          <div className="font-medium text-gray-900">#{order.id.slice(0, 8)}</div>
          <div className="text-sm text-gray-600">Qtd: {order.quantity}</div>
        </div>
      )
    },
    {
      id: 'total_amount',
      header: 'Valor',
      accessorKey: 'total_amount',
      sortable: true,
      cell: (order) => (
        <div className="font-medium text-gray-900">{formatCurrency(order.total_amount)}</div>
      )
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      sortable: true,
      cell: (order) => getStatusBadge(order.status)
    },
    {
      id: 'payment_status',
      header: 'Pagamento',
      accessorKey: 'payment_status',
      sortable: true,
      cell: (order) => getPaymentStatusBadge(order.payment_status)
    },
    {
      id: 'tracking_code',
      header: 'Rastreamento',
      accessorKey: 'tracking_code',
      cell: (order) => (
        <div className="text-sm text-gray-900">{order.tracking_code || '-'}</div>
      )
    },
    {
      id: 'created_at',
      header: 'Data',
      accessorKey: 'created_at',
      sortable: true,
      cell: (order) => (
        <div className="text-sm text-gray-900">{formatDate(order.created_at)}</div>
      )
    }
  ];

  const filters = (
    <div className="flex gap-4">
      <Input
        placeholder="Buscar pedidos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="pending">Pendente</SelectItem>
          <SelectItem value="confirmed">Confirmado</SelectItem>
          <SelectItem value="shipped">Enviado</SelectItem>
          <SelectItem value="delivered">Entregue</SelectItem>
          <SelectItem value="cancelled">Cancelado</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="outline" onClick={exportOrders}>
        <Download className="h-4 w-4 mr-2" />
        Exportar
      </Button>
    </div>
  );

  const actions = {
    view: true,
    edit: true,
    custom: [
      {
        label: 'Rastrear',
        icon: <Truck className="h-4 w-4" />,
        onClick: (order: Order) => console.log('Track order', order.id)
      }
    ]
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-gray-600">Carregando pedidos...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <FinanceTableCore
      title="Gerenciamento de Pedidos"
      columns={columns}
      data={orders}
      filters={filters}
      actions={actions}
      emptyState={
        <div className="text-center py-8 text-gray-600">
          Nenhum pedido encontrado
        </div>
      }
    />
  );
};

export default OrdersDataTable;
