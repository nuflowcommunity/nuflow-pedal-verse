
import React, { useState } from 'react';
import { 
  Plus,
  Download,
  Filter,
  ArrowDownCircle,
  ChevronDown,
  CreditCard,
  TrendingDown,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FinanceSummaryCard } from '@/components/admin/finance/FinanceSummaryCard';
import { FinanceTable, getStatusBadge } from '@/components/admin/finance/FinanceTable';
import { DateRangeFilter, CategoryFilter, StatusFilter } from '@/components/admin/finance/FinanceFilters';
import { FinanceLineChart } from '@/components/admin/finance/FinanceLineChart';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FinancePieChart } from '@/components/admin/finance/FinancePieChart';

// Mock data for expenses
const mockExpensesByCategory = [
  { name: 'Marketing', value: 12000, color: '#f87171' },
  { name: 'Pessoal', value: 18000, color: '#fb923c' },
  { name: 'Infraestrutura', value: 8000, color: '#facc15' },
  { name: 'Operacional', value: 7000, color: '#a3e635' },
  { name: 'Fornecedores', value: 15000, color: '#60a5fa' }
];

const mockExpensesData = [
  { name: 'Jan', despesa: 8200 },
  { name: 'Fev', despesa: 10100 },
  { name: 'Mar', despesa: 9400 },
  { name: 'Abr', despesa: 11200 },
  { name: 'Mai', despesa: 12800 },
  { name: 'Jun', despesa: 14100 },
];

const mockExpenses = [
  { 
    id: 1, 
    data: '16/05/2025', 
    descricao: 'Serviços de Marketing Digital', 
    categoria: 'Marketing', 
    fornecedor: 'Marketing Pro', 
    metodo: 'Transferência',
    status: 'Pago', 
    valor: 3500
  },
  { 
    id: 2, 
    data: '15/05/2025', 
    descricao: 'Folha de Pagamento', 
    categoria: 'Pessoal', 
    fornecedor: 'Diversos', 
    metodo: 'Transferência',
    status: 'Pago', 
    valor: 9200
  },
  { 
    id: 3, 
    data: '12/05/2025', 
    descricao: 'Aluguel Escritório', 
    categoria: 'Infraestrutura', 
    fornecedor: 'Imobiliária XYZ', 
    metodo: 'Transferência',
    status: 'Pendente', 
    valor: 4000
  },
  { 
    id: 4, 
    data: '10/05/2025', 
    descricao: 'Compra Equipamentos', 
    categoria: 'Fornecedores', 
    fornecedor: 'Bike Parts Inc', 
    metodo: 'Cartão de Crédito',
    status: 'Pago', 
    valor: 6500
  },
  { 
    id: 5, 
    data: '05/05/2025', 
    descricao: 'Pagamento de Impostos', 
    categoria: 'Operacional', 
    fornecedor: 'Governo', 
    metodo: 'Transferência',
    status: 'Pendente', 
    valor: 3800
  },
];

const mockCategories = [
  { value: 'marketing', label: 'Marketing' },
  { value: 'pessoal', label: 'Pessoal' },
  { value: 'infraestrutura', label: 'Infraestrutura' },
  { value: 'operacional', label: 'Operacional' },
  { value: 'fornecedores', label: 'Fornecedores' },
];

const mockStatuses = [
  { value: 'pago', label: 'Pago' },
  { value: 'pendente', label: 'Pendente' },
  { value: 'atrasado', label: 'Atrasado' },
];

const Expenses = () => {
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
    { id: 'fornecedor', header: 'Fornecedor', accessorKey: 'fornecedor' },
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
        <h1 className="text-2xl font-bold">Despesas</h1>
        
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Nova Despesa
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nova Despesa</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <p className="text-center text-muted-foreground">
                  Formulário para adicionar despesa seria implementado aqui.
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Expenses Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FinanceSummaryCard
          title="Despesa Total"
          value={formatCurrency(67800)}
          icon={<ArrowDownCircle className="h-6 w-6" />}
          variant="expense"
          change={{ value: 4, isPositive: false }}
        />
        
        <FinanceSummaryCard
          title="Despesas Fixas"
          value={formatCurrency(23500)}
          icon={<Calendar className="h-6 w-6" />}
          variant="expense"
          subtext="Gastos recorrentes"
        />
        
        <FinanceSummaryCard
          title="A Pagar"
          value={formatCurrency(7800)}
          icon={<CreditCard className="h-6 w-6" />}
          variant="pending"
          subtext="Próximos 30 dias"
        />
      </div>

      {/* Expenses Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Despesas ao Longo do Tempo</CardTitle>
          </CardHeader>
          <CardContent>
            <FinanceLineChart
              title=""
              data={mockExpensesData}
              dataKeys={['despesa']}
              colors={{ despesa: '#f87171' }}
              labels={{ despesa: 'Despesa' }}
              formatter={formatCurrency}
              height={300}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Despesas por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <FinancePieChart
              title=""
              data={mockExpensesByCategory}
              formatter={formatCurrency}
              height={300}
            />
          </CardContent>
        </Card>
      </div>

      {/* Expenses Table */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Lista de Despesas</CardTitle>
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
            data={mockExpenses}
            actions={{
              view: true
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Expenses;
