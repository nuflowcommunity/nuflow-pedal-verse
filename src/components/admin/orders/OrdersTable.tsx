
import React from 'react';
import { FinanceTableCore } from '@/components/admin/finance/table/FinanceTableCore';
import { Card, CardContent } from '@/components/ui/card';
import { Truck } from 'lucide-react';
import { Order, getOrdersColumns } from './OrdersColumns';

interface OrdersTableProps {
  orders: Order[];
  isLoading: boolean;
  filters: React.ReactNode;
}

const OrdersTable = ({ orders, isLoading, filters }: OrdersTableProps) => {
  const columns = getOrdersColumns();

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
      title="Lista de Pedidos"
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

export default OrdersTable;
