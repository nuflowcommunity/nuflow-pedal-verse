
import React, { useState } from 'react';
import { 
  Plus,
  Download,
  Upload,
  FileText,
  FileCheck,
  Search,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FinanceTable, getStatusBadge } from '@/components/admin/finance/FinanceTable';
import { DateRangeFilter, CategoryFilter, StatusFilter } from '@/components/admin/finance/FinanceFilters';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';

// Mock data for accounting entries
const mockAccountingEntries = [
  { 
    id: 1, 
    data: '20/05/2025', 
    documento: 'NF-e 12345',
    descricao: 'Serviços de Marketing Digital', 
    categoria: 'Despesa', 
    conta: 'Marketing',
    valor: 3500,
    status: 'Lançado',
    anexo: true
  },
  { 
    id: 2, 
    data: '18/05/2025', 
    documento: 'NF-e 54321',
    descricao: 'Receita Evento Mountain Bike SP', 
    categoria: 'Receita', 
    conta: 'Vendas',
    valor: 12500,
    status: 'Lançado',
    anexo: true
  },
  { 
    id: 3, 
    data: '15/05/2025', 
    documento: 'R-12345',
    descricao: 'Aluguel Escritório - Junho', 
    categoria: 'Despesa', 
    conta: 'Infraestrutura',
    valor: 4000,
    status: 'Pendente',
    anexo: false
  },
  { 
    id: 4, 
    data: '12/05/2025', 
    documento: 'NF-e 78965',
    descricao: 'Compra Equipamentos', 
    categoria: 'Despesa', 
    conta: 'Equipamentos',
    valor: 6500,
    status: 'Processando',
    anexo: true
  },
  { 
    id: 5, 
    data: '10/05/2025', 
    documento: 'NF-e 98765',
    descricao: 'Patrocínio Easy Bikes', 
    categoria: 'Receita', 
    conta: 'Patrocínio',
    valor: 5000,
    status: 'Lançado',
    anexo: true
  },
];

const mockCategories = [
  { value: 'receita', label: 'Receita' },
  { value: 'despesa', label: 'Despesa' },
  { value: 'patrocinio', label: 'Patrocínio' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'infraestrutura', label: 'Infraestrutura' },
  { value: 'equipamentos', label: 'Equipamentos' },
];

const mockStatuses = [
  { value: 'lancado', label: 'Lançado' },
  { value: 'pendente', label: 'Pendente' },
  { value: 'processando', label: 'Processando' },
  { value: 'erro', label: 'Erro' },
];

const Accounting = () => {
  const [dateRange, setDateRange] = useState<{
    startDate: Date | undefined;
    endDate: Date | undefined;
  }>({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date(),
  });

  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const formatCurrency = (value: number) => {
    return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
  };

  const handleDateRangeChange = (start: Date | undefined, end: Date | undefined) => {
    setDateRange({ startDate: start, endDate: end });
  };

  const columns = [
    { id: 'data', header: 'Data', accessorKey: 'data' },
    { id: 'documento', header: 'Documento', accessorKey: 'documento' },
    { id: 'descricao', header: 'Descrição', accessorKey: 'descricao' },
    { id: 'categoria', header: 'Categoria', accessorKey: 'categoria' },
    { id: 'conta', header: 'Conta Contábil', accessorKey: 'conta' },
    { 
      id: 'valor', 
      header: 'Valor', 
      accessorKey: 'valor',
      cell: (row: any) => formatCurrency(row.valor)
    },
    { 
      id: 'status', 
      header: 'Status', 
      accessorKey: 'status',
      cell: (row: any) => getStatusBadge(row.status)
    },
    { 
      id: 'anexo', 
      header: 'Anexo', 
      accessorKey: 'anexo',
      cell: (row: any) => row.anexo ? <FileCheck className="h-4 w-4 text-green-600" /> : <span>-</span>
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Contabilidade</h1>
        
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Novo Lançamento
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Novo Lançamento Contábil</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <p className="text-center text-muted-foreground">
                  Formulário para adicionar lançamento contábil seria implementado aqui.
                </p>
              </div>
            </DialogContent>
          </Dialog>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Upload className="h-4 w-4" />
                Importar NFe
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Importar Nota Fiscal Eletrônica</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <p className="text-center text-muted-foreground">
                  Sistema de upload e importação de XML seria implementado aqui.
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Accounting Entries */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Lançamentos Contábeis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Pesquisar documento ou descrição"
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
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
                Exportar para Contador
              </Button>
            </div>
          </div>
          
          <FinanceTable
            title=""
            columns={columns}
            data={mockAccountingEntries.filter(entry => 
              entry.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
              entry.documento.toLowerCase().includes(searchTerm.toLowerCase())
            )}
            actions={{
              view: true
            }}
          />
        </CardContent>
      </Card>

      {/* Tax Documents Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Documentos Fiscais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p>Esta seção mostraria os documentos fiscais e obrigações fiscais.</p>
              <p className="mt-2">Aqui seria possível visualizar, baixar e enviar documentos para o contador.</p>
              <Button className="mt-4">Gerenciar Documentos</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Accounting;
