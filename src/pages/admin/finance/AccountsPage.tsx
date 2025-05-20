
import React, { useState } from 'react';
import { 
  Plus,
  Download,
  Filter,
  Calendar,
  ArrowUpCircle,
  ArrowDownCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FinanceSummaryCard } from '@/components/admin/finance/FinanceSummaryCard';
import { FinanceTable, getStatusBadge } from '@/components/admin/finance/FinanceTable';
import { DateRangeFilter, CategoryFilter, StatusFilter } from '@/components/admin/finance/FinanceFilters';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// Mock data for accounts
const mockAccountsReceivable = [
  { 
    id: 1, 
    data: '25/05/2025', 
    vencimento: '25/05/2025',
    descricao: 'Inscrição Evento Mountain Bike SP', 
    cliente: 'Diversos', 
    contato: 'contato@evento.com',
    valor: 12500,
    status: 'Pendente'
  },
  { 
    id: 2, 
    data: '10/05/2025', 
    vencimento: '10/06/2025',
    descricao: 'Patrocínio Easy Bikes - 2ª Parcela', 
    cliente: 'Easy Bikes',
    contato: 'financeiro@easybikes.com', 
    valor: 5000,
    status: 'Pendente'
  },
  { 
    id: 3, 
    data: '05/05/2025', 
    vencimento: '05/06/2025',
    descricao: 'Venda de Acessórios - Loja Online', 
    cliente: 'Diversos', 
    contato: 'vendas@nuflow.com',
    valor: 3200,
    status: 'Atrasado'
  },
  { 
    id: 4, 
    data: '01/05/2025', 
    vencimento: '01/06/2025',
    descricao: 'Inscrição Evento City Ride', 
    cliente: 'Diversos', 
    contato: 'contato@evento.com',
    valor: 9800,
    status: 'Atrasado'
  },
];

const mockAccountsPayable = [
  { 
    id: 1, 
    data: '20/05/2025', 
    vencimento: '20/05/2025',
    descricao: 'Serviços de Marketing Digital', 
    fornecedor: 'Marketing Pro', 
    contato: 'faturamento@marketingpro.com',
    valor: 3500,
    status: 'Pendente'
  },
  { 
    id: 2, 
    data: '15/05/2025', 
    vencimento: '15/05/2025',
    descricao: 'Aluguel Escritório - Junho', 
    fornecedor: 'Imobiliária XYZ', 
    contato: 'cobranca@imobiliariaxyz.com',
    valor: 4000,
    status: 'Pendente'
  },
  { 
    id: 3, 
    data: '12/05/2025', 
    vencimento: '12/05/2025',
    descricao: 'Compra Equipamentos', 
    fornecedor: 'Bike Parts Inc', 
    contato: 'vendas@bikepartsinc.com',
    valor: 6500,
    status: 'Vencido'
  },
  { 
    id: 4, 
    data: '05/05/2025', 
    vencimento: '05/05/2025',
    descricao: 'Pagamento de Impostos', 
    fornecedor: 'Governo', 
    contato: '-',
    valor: 3800,
    status: 'Vencido'
  },
];

const mockStatuses = [
  { value: 'pendente', label: 'Pendente' },
  { value: 'atrasado', label: 'Atrasado' },
  { value: 'vencido', label: 'Vencido' },
  { value: 'pago', label: 'Pago' },
  { value: 'recebido', label: 'Recebido' },
];

const AccountsPage = () => {
  const [dateRange, setDateRange] = useState<{
    startDate: Date | undefined;
    endDate: Date | undefined;
  }>({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
  });

  const [status, setStatus] = useState('all');
  const [accountType, setAccountType] = useState('receivable');

  const formatCurrency = (value: number) => {
    return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
  };

  const handleDateRangeChange = (start: Date | undefined, end: Date | undefined) => {
    setDateRange({ startDate: start, endDate: end });
  };

  const columnsReceivable = [
    { id: 'data', header: 'Data', accessorKey: 'data' },
    { id: 'vencimento', header: 'Vencimento', accessorKey: 'vencimento' },
    { id: 'descricao', header: 'Descrição', accessorKey: 'descricao' },
    { id: 'cliente', header: 'Cliente', accessorKey: 'cliente' },
    { id: 'contato', header: 'Contato', accessorKey: 'contato' },
    { 
      id: 'valor', 
      header: 'Valor', 
      accessorKey: 'valor',
      cell: (row: any) => (
        <div className="flex items-center text-green-600">
          <ArrowUpCircle className="h-4 w-4 mr-1" />
          {formatCurrency(row.valor)}
        </div>
      )
    },
    { 
      id: 'status', 
      header: 'Status', 
      accessorKey: 'status',
      cell: (row: any) => getStatusBadge(row.status)
    },
  ];

  const columnsPayable = [
    { id: 'data', header: 'Data', accessorKey: 'data' },
    { id: 'vencimento', header: 'Vencimento', accessorKey: 'vencimento' },
    { id: 'descricao', header: 'Descrição', accessorKey: 'descricao' },
    { id: 'fornecedor', header: 'Fornecedor', accessorKey: 'fornecedor' },
    { id: 'contato', header: 'Contato', accessorKey: 'contato' },
    { 
      id: 'valor', 
      header: 'Valor', 
      accessorKey: 'valor',
      cell: (row: any) => (
        <div className="flex items-center text-red-600">
          <ArrowDownCircle className="h-4 w-4 mr-1" />
          {formatCurrency(row.valor)}
        </div>
      )
    },
    { 
      id: 'status', 
      header: 'Status', 
      accessorKey: 'status',
      cell: (row: any) => getStatusBadge(row.status)
    },
  ];

  const totalReceivable = mockAccountsReceivable.reduce((acc, item) => acc + item.valor, 0);
  const totalPayable = mockAccountsPayable.reduce((acc, item) => acc + item.valor, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Contas a Pagar e Receber</h1>
        
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Adicionar Conta
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Conta</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <p className="text-center text-muted-foreground">
                  Formulário para adicionar conta seria implementado aqui.
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Accounts Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FinanceSummaryCard
          title="Total a Receber"
          value={formatCurrency(totalReceivable)}
          icon={<ArrowUpCircle className="h-6 w-6" />}
          variant="income"
        />
        
        <FinanceSummaryCard
          title="Total a Pagar"
          value={formatCurrency(totalPayable)}
          icon={<ArrowDownCircle className="h-6 w-6" />}
          variant="expense"
        />
        
        <FinanceSummaryCard
          title="Saldo Previsto"
          value={formatCurrency(totalReceivable - totalPayable)}
          icon={<Calendar className="h-6 w-6" />}
          variant={totalReceivable - totalPayable > 0 ? "income" : "expense"}
          subtext="Baseado nas contas atuais"
        />
      </div>

      {/* Accounts Tables */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-medium">
              {accountType === 'receivable' ? 'Contas a Receber' : 'Contas a Pagar'}
            </CardTitle>
            
            <div className="flex items-center gap-2">
              <Tabs value={accountType} onValueChange={setAccountType}>
                <TabsList>
                  <TabsTrigger value="receivable">A Receber</TabsTrigger>
                  <TabsTrigger value="payable">A Pagar</TabsTrigger>
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
          
          {accountType === 'receivable' ? (
            <FinanceTable
              title=""
              columns={columnsReceivable}
              data={mockAccountsReceivable}
              actions={{
                view: true
              }}
            />
          ) : (
            <FinanceTable
              title=""
              columns={columnsPayable}
              data={mockAccountsPayable}
              actions={{
                view: true
              }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsPage;
