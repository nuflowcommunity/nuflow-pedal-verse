
import React from 'react';
import { Activity, CheckCircle, AlertTriangle, DollarSign, CalendarDays, PiggyBank } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { EntityType, Entity } from './types';
import { entityTypeIcons } from './EntityIcons';
import { FinanceSummaryCard } from '@/components/admin/finance/FinanceSummaryCard';

interface EntityStatsProps {
  stats: {
    total: number;
    ativo: number;
    pendente: number;
    cancelado: number;
    eventos: number;
    mensalidades: number;
    dayUse: number;
    creditos: number;
    validationIssues: number;
    salesLast24h: number;
    salesCurrentMonth: number;
    salesTotal: number;
  };
  onViewIssues: () => void;
}

export const EntityStats: React.FC<EntityStatsProps> = ({ stats, onViewIssues }) => {
  const navigate = useNavigate();
  
  // Format currency values
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="space-y-4 mb-6">
      {/* Financial metrics summary row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FinanceSummaryCard 
          title="Vendas (Últimas 24h)"
          value={formatCurrency(stats.salesLast24h)}
          icon={<DollarSign className="h-5 w-5" />}
          variant="income"
          subtext="Valor total de vendas nas últimas 24 horas"
          onClick={() => navigate('/admin/financeiro/dashboard/last-24h')}
        />
        
        <FinanceSummaryCard 
          title="Vendas do Mês"
          value={formatCurrency(stats.salesCurrentMonth)}
          icon={<CalendarDays className="h-5 w-5" />}
          variant="profit"
          subtext="Valor acumulado no mês atual"
          onClick={() => navigate('/admin/financeiro/dashboard/monthly')}
        />
        
        <FinanceSummaryCard 
          title="Vendas Totais"
          value={formatCurrency(stats.salesTotal)}
          icon={<PiggyBank className="h-5 w-5" />}
          variant="default"
          subtext="Valor acumulado desde o início"
          onClick={() => navigate('/admin/financeiro/dashboard/total')}
        />
      </div>

      {/* Original entity statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total de Entidades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.total}</div>
            <div className="text-sm text-muted-foreground mt-2">
              <span className="inline-flex items-center">
                <Activity className="h-4 w-4 mr-1" />
                {stats.ativo} ativos
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Por Tipo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="inline-flex items-center text-sm">
                  {entityTypeIcons.evento} Eventos
                </span>
                <Badge variant="outline">{stats.eventos}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="inline-flex items-center text-sm">
                  {entityTypeIcons.mensalidade} Mensalidades
                </span>
                <Badge variant="outline">{stats.mensalidades}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="inline-flex items-center text-sm">
                  {entityTypeIcons.dayUse} Day Use
                </span>
                <Badge variant="outline">{stats.dayUse}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="inline-flex items-center text-sm">
                  {entityTypeIcons.credito} Créditos
                </span>
                <Badge variant="outline">{stats.creditos}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Por Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm">Ativos</span>
                <Badge className="bg-green-100 text-green-800">{stats.ativo}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Pendentes</span>
                <Badge className="bg-amber-100 text-amber-800">{stats.pendente}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Cancelados</span>
                <Badge className="bg-gray-100 text-gray-800">{stats.cancelado}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className={stats.validationIssues > 0 ? "border-red-300" : ""}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              Alertas
              {stats.validationIssues > 0 && (
                <AlertTriangle className="h-4 w-4 ml-2 text-red-500" />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats.validationIssues > 0 ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-red-600">Validação de créditos</span>
                  <Badge className="bg-red-100 text-red-800">{stats.validationIssues}</Badge>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full text-red-600 border-red-200 hover:bg-red-50"
                  onClick={onViewIssues}
                >
                  Ver detalhes
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[85px]">
                <CheckCircle className="h-10 w-10 text-green-500 mb-1" />
                <span className="text-sm text-muted-foreground">Sem problemas detectados</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
