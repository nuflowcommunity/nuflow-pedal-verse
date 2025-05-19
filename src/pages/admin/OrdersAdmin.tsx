
import React from 'react';
import { Search, Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const mockOrders = [
  { id: '1234', event: 'Pedal na Serra', user: 'Maria Santos', date: '12/05/2025', value: 120.00, status: 'confirmado', paymentMethod: 'Cartão de Crédito' },
  { id: '1233', event: 'Night Ride', user: 'João Silva', date: '10/05/2025', value: 80.00, status: 'cancelado', paymentMethod: 'PIX' },
  { id: '1232', event: 'Subida da Graciosa', user: 'Pedro Alves', date: '06/05/2025', value: 150.00, status: 'confirmado', paymentMethod: 'Cartão de Crédito' },
  { id: '1231', event: 'Night Ride', user: 'Ana Oliveira', date: '05/05/2025', value: 80.00, status: 'pendente', paymentMethod: 'Boleto' },
  { id: '1230', event: 'Pedal na Serra', user: 'Lucas Mendes', date: '04/05/2025', value: 120.00, status: 'confirmado', paymentMethod: 'PIX' },
];

const getStatusClass = (status: string) => {
  switch (status) {
    case 'confirmado':
      return 'bg-green-100 text-green-800';
    case 'pendente':
      return 'bg-yellow-100 text-yellow-800';
    case 'cancelado':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const OrdersAdmin = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Buscar pedidos..."
            className="pl-9 w-full"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filtrar
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button variant="outline" className="bg-white text-gray-700 border-gray-300 hover:border-[#19c37d] hover:text-[#19c37d]">
          Todos
        </Button>
        <Button variant="outline" className="bg-[#19c37d] text-white border-[#19c37d]">
          Confirmados
        </Button>
        <Button variant="outline" className="bg-white text-gray-700 border-gray-300 hover:border-[#19c37d] hover:text-[#19c37d]">
          Pendentes
        </Button>
        <Button variant="outline" className="bg-white text-gray-700 border-gray-300 hover:border-[#19c37d] hover:text-[#19c37d]">
          Cancelados
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Evento</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pagamento</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.event}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.user}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.date}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">R$ {order.value.toFixed(2)}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.paymentMethod}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersAdmin;
