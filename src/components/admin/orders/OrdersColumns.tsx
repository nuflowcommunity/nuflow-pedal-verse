
import React from 'react';
import { FinanceTableColumn } from '@/components/admin/finance/table/FinanceTableTypes';
import { Badge } from '@/components/ui/badge';

export interface Order {
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

export const getStatusBadge = (status: string) => {
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

export const getPaymentStatusBadge = (status: string) => {
  const statusConfig = {
    pending: { label: 'Pendente', className: 'bg-yellow-100 text-yellow-800' },
    paid: { label: 'Pago', className: 'bg-green-100 text-green-800' },
    failed: { label: 'Falhou', className: 'bg-red-100 text-red-800' }
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  return <Badge className={config.className}>{config.label}</Badge>;
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-BR');
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(amount);
};

export const getOrdersColumns = (): FinanceTableColumn<Order>[] => [
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
