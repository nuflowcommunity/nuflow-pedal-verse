
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface PartnerStats {
  total_events: number;
  total_sales: number;
  total_revenue: number;
  last_access: string;
}

interface ResumoCardProps {
  stats: PartnerStats;
  isLoading: boolean;
}

const ResumoCard: React.FC<ResumoCardProps> = ({ stats, isLoading }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-yellow-800">🟨 Resumo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center">
                <Skeleton className="h-8 w-16 mx-auto mb-2" />
                <Skeleton className="h-4 w-24 mx-auto" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const summaryItems = [
    {
      label: 'Eventos Ativos',
      value: stats.total_events,
      icon: '📅',
      color: 'text-blue-600'
    },
    {
      label: 'Total de Vendas',
      value: stats.total_sales,
      icon: '🎫',
      color: 'text-green-600'
    },
    {
      label: 'Receita Acumulada',
      value: formatCurrency(stats.total_revenue),
      icon: '💰',
      color: 'text-emerald-600'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-yellow-800">🟨 Resumo</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {summaryItems.map((item, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className={`text-2xl font-bold ${item.color}`}>
                {item.value}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {item.label}
              </div>
            </div>
          ))}
          
          <div className="border-t pt-4 mt-6">
            <div className="text-center">
              <div className="text-xs text-gray-500">Último acesso:</div>
              <div className="text-sm text-gray-700 mt-1">
                {formatDate(stats.last_access)}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumoCard;
