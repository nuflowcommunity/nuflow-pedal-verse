
import React, { useState } from 'react';
import { 
  Plus,
  Download,
  Filter,
  ArrowUpCircle,
  ChevronDown,
  DollarSign,
  TrendingUp,
  CreditCard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FinanceSummaryCard } from '@/components/admin/finance/FinanceSummaryCard';
import { FinanceTable, getStatusBadge } from '@/components/admin/finance/FinanceTable';
import { DateRangeFilter, CategoryFilter, StatusFilter } from '@/components/admin/finance/FinanceFilters';
import { FinanceLineChart } from '@/components/admin/finance/FinanceLineChart';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FinancePieChart } from '@/components/admin/finance/FinancePieChart';

// Mock data for income
const mockIncomeByCategory = [
  { name: 'Eventos', value: 35000, color: '#4ade80' },
  { name: 'Patrocínios', value: 24000, color: '#60a5fa' },
  { name: 'Vendas', value: 18000, color: '#a78bfa' },
  { name: 'Outros', value: 9000, color: '#f97316' },
];

const mockIncomeData = [
  { name: 'Jan', receita: 15400 },
  { name: 'Fev', receita: 18700 },
  { name: 'Mar', receita: 16500 },
  { name: 'Abr', receita: 21000 },
  { name: 'Mai', receita: 19800 },
  { name: 'Jun', receita: 22500 },
];

const mockIncomes = [
  { 
    id: 1, 
    data: '15/05/2025', 
    descricao: 'Inscrição Evento Mountain Bike SP', 
    categoria: 'Eventos', 
    cliente: 'Diversos', 
    metodo: 'Transferência',
    status: 'Recebido', 
    valor: 12500
  },
  { 
    id: 2, 
    data: '12/05/2025', 
    descricao: 'Patrocínio Easy Bikes', 
    categoria: 'Patrocínio', 
    cliente: 'Easy Bikes', 
    metodo: 'Transferência',
    status: 'Recebido', 
    valor: 5000
  },
  { 
    id: 3, 
    data: '10/05/2025', 
    descricao: 'Venda de Acessórios', 
    categoria: 'Vendas', 
    cliente: 'Diversos', 
    metodo: 'Cartão de Crédito',
    status: 'Pendente', 
    valor: 3200
  },
  { 
    id: 4, 
    data: '08/05/2025', 
    descricao: 'Patrocínio BikeShop', 
    categoria: 'Patrocínio', 
    cliente: 'BikeShop', 
    metodo: 'Transferência',
    status: 'Recebido', 
    valor: 8500
  },
  { 
    id: 5, 
    data: '05/05/2025', 
    descricao: 'Inscrição Evento City Ride', 
    categoria: 'Eventos', 
    cliente: 'Diversos', 
    metodo: 'Transferência',
    status: 'Pendente', 
    valor: 9800
  },
];

const mockCategories = [
  { value: 'eventos', label: 'Eventos' },
  { value: 'patrocinio', label: 'Patrocínio' },
  { value: 'vendas', label: 'Vendas' },
  { value: 'outros', label: 'Outros' },
];

const mockStatuses = [
  { value: 'recebido', label: 'Recebido' },
  { value: 'pendente', label: 'Pendente' },
  { value: 'atrasado', label: 'Atrasado' },
];

const Income = () => {
  const [dateRange, setDateRange] = useState<{
    startDate: Date | undefined;
    endDate: Date | undefined;
  }>({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date(),
  });

  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');

  const formatCurrency = (value: number) => {
    return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
  };

  const handleDateRangeChange = (start: Date | undefined, end: Date | undefined) => {
    setDateRange({ startDate: start, endDate: end });
  };

  const columns = [
    { id: 'data', header: 'Data', accessorKey: 'data' },
    { id: 'descricao', header: 'Descrição', accessorKey: 'descricao' },
    { id: 'categoria', header: 'Categoria', accessorKey: 'categoria' },
    { id: 'cliente', header: 'Cliente', accessorKey: 'cliente' },
    { id: 'metodo', header: 'Método', accessorKey: 'metodo' },
    { 
      id: 'status', 
      header: 'Status', 
      accessorKey: 'status',
      cell: (row: any) => getStatusBadge(row.status)
    },
    { 
      id: 'valor', 
      header: 'Valor', 
      accessorKey: 'valor',
      cell: (row: any) => formatCurrency(row.valor)
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Receitas</h1>
        
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Nova Receita
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nova Receita</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <p className="text-center text-muted-foreground">
                  Formulário para adicionar receita seria implementado aqui.
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Income Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FinanceSummaryCard
          title="Receita Total"
          value={formatCurrency(104200)}
          icon={<DollarSign className="h-6 w-6" />}
          variant="income"
          change={{ value: 8, isPositive: true }}
        />
        
        <FinanceSummaryCard
          title="Maior Receita"
          value={formatCurrency(12500)}
          icon={<TrendingUp className="h-6 w-6" />}
          variant="income"
          subtext="Evento Mountain Bike SP"
        />
        
        <FinanceSummaryCard
          title="A Receber"
          value={formatCurrency(13000)}
          icon={<CreditCard className="h-6 w-6" />}
          variant="pending"
          subtext="Próximos 30 dias"
        />
      </div>

      {/* Income Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Receitas ao Longo do Tempo</CardTitle>
          </CardHeader>
          <CardContent>
            <FinanceLineChart
              title=""
              data={mockIncomeData}
              dataKeys={['receita']}
              colors={{ receita: '#4ade80' }}
              labels={{ receita: 'Receita' }}
              formatter={formatCurrency}
              height={300}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Receitas por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <FinancePieChart
              title=""
              data={mockIncomeByCategory}
              formatter={formatCurrency}
              height={300}
            />
          </CardContent>
        </Card>
      </div>

      {/* Income Transactions Table */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Lista de Receitas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <div className="flex flex-wrap items-center gap-2">
              <DateRangeFilter
                startDate={dateRange.startDate}
                endDate={dateRange.endDate}
                onDateChange={handleDateRangeChange}
              />
              
              <CategoryFilter
                value={category}
                onChange={setCategory}
                categories={mockCategories}
              />
              
              <StatusFilter
                value={status}
                onChange={setStatus}
                statuses={mockStatuses}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-4 w-4" />
                Exportar
              </Button>
            </div>
          </div>
          
          <FinanceTable
            title=""
            columns={columns}
            data={mockIncomes}
            actions={{
              view: true,
              custom: [
                {
                  label: 'Editar',
                  icon: <TrendingUp className="h-4 w-4" />,
                  onClick: (item) => console.log('Edit', item),
                }
              ]
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Income;
