
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, TrendingUp, DollarSign, Clock } from 'lucide-react';

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
    return date.toLocaleDate('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <Card className="bg-trailflow-white border-trailflow-lighter/20 shadow-modern">
        <CardHeader>
          <CardTitle className="text-trailflow-dark flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            Resumo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center space-y-2">
                <Skeleton className="h-8 w-16 mx-auto bg-trailflow-lighter/30" />
                <Skeleton className="h-4 w-24 mx-auto bg-trailflow-lighter/30" />
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
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-500/20'
    },
    {
      label: 'Total de Vendas',
      value: stats.total_sales,
      icon: TrendingUp,
      color: 'text-trailflow-green',
      bgColor: 'bg-trailflow-green/20'
    },
    {
      label: 'Receita Acumulada',
      value: formatCurrency(stats.total_revenue),
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-500/20'
    }
  ];

  return (
    <Card className="bg-trailflow-white border-trailflow-lighter/20 shadow-modern">
      <CardHeader>
        <CardTitle className="text-trailflow-dark flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          Resumo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {summaryItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="text-center space-y-3">
                <div className={`w-12 h-12 mx-auto rounded-full ${item.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <div className="space-y-1">
                  <div className={`text-2xl font-bold ${item.color}`}>
                    {item.value}
                  </div>
                  <div className="text-sm text-trailflow-medium">
                    {item.label}
                  </div>
                </div>
              </div>
            );
          })}
          
          <div className="border-t border-trailflow-lighter/20 pt-4 mt-6">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-4 h-4 text-trailflow-medium" />
                <span className="text-xs text-trailflow-medium">Último acesso</span>
              </div>
              <div className="text-sm text-trailflow-dark">
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
