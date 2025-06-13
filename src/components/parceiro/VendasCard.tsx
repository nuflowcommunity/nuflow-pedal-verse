
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { StatusBadge } from '@/components/ui/status-badge';
import { TrendingUp, Package } from 'lucide-react';
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

  if (isLoading) {
    return (
      <Card className="bg-trailflow-white border-trailflow-lighter/20 shadow-modern">
        <CardHeader>
          <CardTitle className="text-trailflow-dark flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            Minhas Vendas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex space-x-4">
                <Skeleton className="h-4 w-1/4 bg-trailflow-lighter/30" />
                <Skeleton className="h-4 w-1/4 bg-trailflow-lighter/30" />
                <Skeleton className="h-4 w-1/6 bg-trailflow-lighter/30" />
                <Skeleton className="h-4 w-1/6 bg-trailflow-lighter/30" />
                <Skeleton className="h-4 w-1/6 bg-trailflow-lighter/30" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-trailflow-white border-trailflow-lighter/20 shadow-modern">
      <CardHeader>
        <CardTitle className="text-trailflow-dark flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          Minhas Vendas
        </CardTitle>
      </CardHeader>
      <CardContent>
        {sales.length === 0 ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 mx-auto bg-trailflow-accent rounded-full flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-trailflow-green" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-trailflow-dark">Nenhuma venda registrada</h3>
              <p className="text-trailflow-medium">
                As vendas aparecerão aqui quando participantes se inscreverem em seus eventos.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Mobile View */}
            <div className="block md:hidden space-y-3">
              {sales.slice(0, 10).map((sale) => (
                <div key={sale.id} className="border border-trailflow-lighter/20 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="font-medium text-trailflow-dark">{sale.buyer_name}</p>
                      <p className="text-sm text-trailflow-medium truncate">{sale.event_title}</p>
                    </div>
                    <StatusBadge status={sale.status as any} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-trailflow-medium">{formatDate(sale.purchase_date)}</span>
                    <span className="font-medium text-trailflow-green">{formatCurrency(sale.amount)}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop View */}
            <div className="hidden md:block overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-trailflow-lighter/20">
                    <TableHead className="text-trailflow-medium">Comprador</TableHead>
                    <TableHead className="text-trailflow-medium">Evento</TableHead>
                    <TableHead className="text-trailflow-medium">Data da Compra</TableHead>
                    <TableHead className="text-trailflow-medium">Valor</TableHead>
                    <TableHead className="text-trailflow-medium">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sales.slice(0, 10).map((sale) => (
                    <TableRow key={sale.id} className="border-trailflow-lighter/20 hover:bg-trailflow-accent/30 transition-colors">
                      <TableCell className="font-medium text-trailflow-dark">
                        {sale.buyer_name}
                      </TableCell>
                      <TableCell className="max-w-xs truncate text-trailflow-medium">
                        {sale.event_title}
                      </TableCell>
                      <TableCell className="text-trailflow-medium">
                        {formatDate(sale.purchase_date)}
                      </TableCell>
                      <TableCell className="font-medium text-trailflow-green">
                        {formatCurrency(sale.amount)}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={sale.status as any} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {sales.length > 10 && (
              <div className="text-center mt-6 p-4 bg-trailflow-accent/20 rounded-lg">
                <p className="text-sm text-trailflow-medium">
                  Mostrando 10 de {sales.length} vendas
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VendasCard;
