
import React, { useState } from 'react';
import { 
  DollarSign, 
  ArrowUp, 
  ArrowDown, 
  Wallet, 
  CreditCard, 
  TrendingUp, 
  Calendar,
  AlertTriangle,
  Bell
} from 'lucide-react';
import { FinanceSummaryCard } from '@/components/admin/finance/FinanceSummaryCard';
import { FinanceLineChart } from '@/components/admin/finance/FinanceLineChart';
import { FinancePieChart } from '@/components/admin/finance/FinancePieChart';
import { DateRangeFilter } from '@/components/admin/finance/FinanceFilters';
import { FinanceAlert } from '@/components/admin/finance/FinanceAlert';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// Mock data for the dashboard
const mockCashFlowData = [
  { name: 'Jan', receitas: 15400, despesas: 10200, saldo: 5200 },
  { name: 'Fev', receitas: 18700, despesas: 11500, saldo: 7200 },
  { name: 'Mar', receitas: 16500, despesas: 12300, saldo: 4200 },
  { name: 'Abr', receitas: 21000, despesas: 13600, saldo: 7400 },
  { name: 'Mai', receitas: 19800, despesas: 12800, saldo: 7000 },
  { name: 'Jun', receitas: 22500, despesas: 14100, saldo: 8400 },
];

const mockPieChartData = [
  { name: 'Eventos', value: 35000, color: '#4ade80' },
  { name: 'Patrocínios', value: 24000, color: '#60a5fa' },
  { name: 'Vendas', value: 18000, color: '#a78bfa' },
  { name: 'Outros', value: 9000, color: '#f97316' },
];

const mockExpensesData = [
  { name: 'Marketing', value: 12000, color: '#f87171' },
  { name: 'Pessoal', value: 18000, color: '#fb923c' },
  { name: 'Infraestrutura', value: 8000, color: '#facc15' },
  { name: 'Operacional', value: 7000, color: '#a3e635' },
];

const mockAlerts = [
  {
    title: 'Despesas acima da média',
    description: 'As despesas de marketing estão 15% acima da média mensal.',
    variant: 'warning' as const,
  },
  {
    title: 'Pagamento em atraso',
    description: 'Conta de fornecedor "Equipamentos XYZ" vence amanhã.',
    variant: 'danger' as const,
  },
  {
    title: 'Receita em alta',
    description: 'As receitas de eventos aumentaram 22% este mês.',
    variant: 'success' as const,
  },
];

const FinanceOverview = () => {
  const [dateRange, setDateRange] = useState<{
    startDate: Date | undefined;
    endDate: Date | undefined;
  }>({
    startDate: new Date(new Date().getFullYear(), 0, 1),
    endDate: new Date(),
  });

  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const formatCurrency = (value: number) => {
    return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
  };

  const handleDateRangeChange = (start: Date | undefined, end: Date | undefined) => {
    setDateRange({ startDate: start, endDate: end });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Visão Geral Financeira</h1>
        
        <div className="flex flex-wrap items-center gap-2">
          <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod} className="mr-2">
            <TabsList>
              <TabsTrigger value="month">Mês</TabsTrigger>
              <TabsTrigger value="quarter">Trimestre</TabsTrigger>
              <TabsTrigger value="year">Ano</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <DateRangeFilter
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            onDateChange={handleDateRangeChange}
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <FinanceSummaryCard
          title="Saldo Disponível"
          value={formatCurrency(86500)}
          icon={<Wallet className="h-6 w-6" />}
          variant="default"
          subtext="Atualizado há 2 horas"
          change={{ value: 12, isPositive: true }}
        />
        
        <FinanceSummaryCard
          title="Receitas"
          value={formatCurrency(104200)}
          icon={<ArrowUp className="h-6 w-6" />}
          variant="income"
          change={{ value: 8, isPositive: true }}
        />
        
        <FinanceSummaryCard
          title="Despesas"
          value={formatCurrency(67800)}
          icon={<ArrowDown className="h-6 w-6" />}
          variant="expense"
          change={{ value: 4, isPositive: false }}
        />
        
        <FinanceSummaryCard
          title="Lucro do Período"
          value={formatCurrency(36400)}
          icon={<TrendingUp className="h-6 w-6" />}
          variant="profit"
          change={{ value: 22, isPositive: true }}
        />
        
        <FinanceSummaryCard
          title="Contas a Receber"
          value={formatCurrency(42300)}
          icon={<DollarSign className="h-6 w-6" />}
          variant="income"
          subtext="Próximos 30 dias"
        />
        
        <FinanceSummaryCard
          title="Contas a Pagar"
          value={formatCurrency(28700)}
          icon={<CreditCard className="h-6 w-6" />}
          variant="expense"
          subtext="Próximos 30 dias"
        />
        
        <FinanceSummaryCard
          title="Eventos Agendados"
          value="12"
          icon={<Calendar className="h-6 w-6" />}
          variant="default"
          subtext="Próximos 30 dias"
        />
        
        <FinanceSummaryCard
          title="Alertas"
          value="3"
          icon={<Bell className="h-6 w-6" />}
          variant="pending"
          subtext="Requerem sua atenção"
        />
      </div>

      {/* Alert Section */}
      <div className="space-y-3">
        {mockAlerts.map((alert, index) => (
          <FinanceAlert
            key={index}
            title={alert.title}
            description={alert.description}
            variant={alert.variant}
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FinanceLineChart
          title="Fluxo de Caixa"
          subtitle="Evolução de receitas e despesas ao longo do período"
          data={mockCashFlowData}
          dataKeys={['receitas', 'despesas', 'saldo']}
          colors={{
            receitas: '#4ade80',
            despesas: '#f87171',
            saldo: '#60a5fa',
          }}
          labels={{
            receitas: 'Receitas',
            despesas: 'Despesas',
            saldo: 'Saldo',
          }}
          formatter={formatCurrency}
          height={300}
        />
        
        <div className="grid grid-rows-2 gap-6">
          <FinancePieChart
            title="Receitas por Categoria"
            subtitle="Distribuição de receitas por fonte"
            data={mockPieChartData}
            formatter={formatCurrency}
            height={300}
          />
          
          <FinancePieChart
            title="Despesas por Categoria"
            subtitle="Distribuição de despesas por tipo"
            data={mockExpensesData}
            formatter={formatCurrency}
            height={300}
          />
        </div>
      </div>
    </div>
  );
};

export default FinanceOverview;
