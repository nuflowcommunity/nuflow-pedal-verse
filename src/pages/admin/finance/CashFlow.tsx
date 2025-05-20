
import React, { useState } from 'react';
import { 
  Plus,
  Download,
  Filter,
  CreditCard,
  ArrowUpCircle,
  ArrowDownCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FinanceTable, getStatusBadge } from '@/components/admin/finance/FinanceTable';
import { DateRangeFilter, StatusFilter, CategoryFilter } from '@/components/admin/finance/FinanceFilters';
import { FinanceLineChart } from '@/components/admin/finance/FinanceLineChart';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// Mock data
const mockCashFlowData = [
  { name: '01/05', entradas: 3400, saidas: 1200, saldo: 2200 },
  { name: '02/05', entradas: 2100, saidas: 1800, saldo: 300 },
  { name: '03/05', entradas: 4200, saidas: 1500, saldo: 2700 },
  { name: '04/05', entradas: 1800, saidas: 2100, saldo: -300 },
  { name: '05/05', entradas: 2800, saidas: 1300, saldo: 1500 },
  { name: '06/05', entradas: 3200, saidas: 1900, saldo: 1300 },
  { name: '07/05', entradas: 4100, saidas: 2200, saldo: 1900 },
  { name: '08/05', entradas: 2600, saidas: 1700, saldo: 900 },
  { name: '09/05', entradas: 3800, saidas: 2400, saldo: 1400 },
  { name: '10/05', entradas: 2900, saidas: 1600, saldo: 1300 },
];

const mockTransactions = [
  { 
    id: 1, 
    data: '10/05/2025', 
    descricao: 'Inscrição Evento Mountain Bike SP', 
    categoria: 'Vendas', 
    conta: 'Conta Corrente', 
    status: 'Recebido', 
    valor: 3800,
    tipo: 'entrada'
  },
  { 
    id: 2, 
    data: '09/05/2025', 
    descricao: 'Compra Equipamentos', 
    categoria: 'Equipamentos', 
    conta: 'Cartão Corporativo', 
    status: 'Pendente', 
    valor: 1450,
    tipo: 'saida'
  },
  { 
    id: 3, 
    data: '08/05/2025', 
    descricao: 'Patrocínio Easy Bikes', 
    categoria: 'Patrocínio', 
    conta: 'Conta Corrente', 
    status: 'Recebido', 
    valor: 5000,
    tipo: 'entrada'
  },
  { 
    id: 4, 
    data: '07/05/2025', 
    descricao: 'Serviço de Marketing Digital', 
    categoria: 'Marketing', 
    conta: 'Conta Corrente', 
    status: 'Pago', 
    valor: 2200,
    tipo: 'saida'
  },
  { 
    id: 5, 
    data: '06/05/2025', 
    descricao: 'Pagamento Fornecedor XYZ', 
    categoria: 'Fornecedores', 
    conta: 'Conta Corrente', 
    status: 'Pago', 
    valor: 1800,
    tipo: 'saida'
  },
  { 
    id: 6, 
    data: '05/05/2025', 
    descricao: 'Inscrição Evento City Ride', 
    categoria: 'Vendas', 
    conta: 'Conta Corrente', 
    status: 'Recebido', 
    valor: 2800,
    tipo: 'entrada'
  },
];

const mockCategories = [
  { value: 'vendas', label: 'Vendas' },
  { value: 'patrocinio', label: 'Patrocínio' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'equipamentos', label: 'Equipamentos' },
  { value: 'fornecedores', label: 'Fornecedores' },
  { value: 'pessoal', label: 'Pessoal' },
  { value: 'administrativo', label: 'Administrativo' },
];

const mockStatuses = [
  { value: 'recebido', label: 'Recebido' },
  { value: 'pago', label: 'Pago' },
  { value: 'pendente', label: 'Pendente' },
  { value: 'atrasado', label: 'Atrasado' },
];

const CashFlow = () => {
  const [dateRange, setDateRange] = useState<{
    startDate: Date | undefined;
    endDate: Date | undefined;
  }>({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date(),
  });

  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');
  const [transactionType, setTransactionType] = useState('all');

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
    { id: 'conta', header: 'Conta', accessorKey: 'conta' },
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
      cell: (row: any) => {
        return (
          <div className={`flex items-center ${row.tipo === 'entrada' ? 'text-green-600' : 'text-red-600'}`}>
            {row.tipo === 'entrada' ? <ArrowUpCircle className="h-4 w-4 mr-1" /> : <ArrowDownCircle className="h-4 w-4 mr-1" />}
            {formatCurrency(row.valor)}
          </div>
        )
      }
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Fluxo de Caixa</h1>
        
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Adicionar Lançamento
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Lançamento</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <p className="text-center text-muted-foreground">
                  Formulário para adicionar lançamento seria implementado aqui.
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Cash Flow Chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Fluxo de Caixa Diário</CardTitle>
        </CardHeader>
        <CardContent>
          <FinanceLineChart
            title=""
            data={mockCashFlowData}
            dataKeys={['entradas', 'saidas', 'saldo']}
            colors={{
              entradas: '#4ade80',
              saidas: '#f87171',
              saldo: '#60a5fa',
            }}
            labels={{
              entradas: 'Entradas',
              saidas: 'Saídas',
              saldo: 'Saldo',
            }}
            formatter={formatCurrency}
            height={300}
          />
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-medium">Lançamentos</CardTitle>
              
              <div className="flex items-center gap-2">
                <Tabs value={transactionType} onValueChange={setTransactionType}>
                  <TabsList>
                    <TabsTrigger value="all">Todos</TabsTrigger>
                    <TabsTrigger value="entrada">Entradas</TabsTrigger>
                    <TabsTrigger value="saida">Saídas</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
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
              data={mockTransactions.filter(transaction => 
                (transactionType === 'all' || transaction.tipo === transactionType)
              )}
              actions={{
                view: true
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CashFlow;
