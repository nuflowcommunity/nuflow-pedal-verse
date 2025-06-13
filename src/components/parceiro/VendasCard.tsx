
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface PartnerSale {
  id: string;
  buyer_name: string;
  event_title: string;
  purchase_date: string;
  amount: number;
  status: string;
}

interface VendasCardProps {
  sales: PartnerSale[];
  isLoading: boolean;
}

const VendasCard: React.FC<VendasCardProps> = ({ sales, isLoading }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      'paid': { label: 'Pago', color: 'bg-green-100 text-green-800' },
      'pending': { label: 'Pendente', color: 'bg-yellow-100 text-yellow-800' },
      'cancelled': { label: 'Cancelado', color: 'bg-red-100 text-red-800' }
    };

    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.pending;
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
        {statusInfo.label}
      </span>
    );
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-green-800">🟩 Minhas Vendas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex space-x-4">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/6" />
                <Skeleton className="h-4 w-1/6" />
                <Skeleton className="h-4 w-1/6" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-green-800">🟩 Minhas Vendas</CardTitle>
      </CardHeader>
      <CardContent>
        {sales.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 text-4xl mb-4">💰</div>
            <p className="text-gray-600">Nenhuma venda registrada ainda.</p>
            <p className="text-gray-500 text-sm mt-2">
              As vendas aparecerão aqui quando alguém se inscrever em seus eventos.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Comprador</TableHead>
                  <TableHead>Evento</TableHead>
                  <TableHead>Data da Compra</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sales.slice(0, 10).map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell className="font-medium">
                      {sale.buyer_name || 'N/A'}
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {sale.event_title}
                    </TableCell>
                    <TableCell>
                      {formatDate(sale.purchase_date)}
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(sale.amount)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(sale.status)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {sales.length > 10 && (
              <div className="text-center mt-4 text-sm text-gray-500">
                Mostrando 10 de {sales.length} vendas
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VendasCard;
