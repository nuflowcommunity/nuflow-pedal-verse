
import React, { useState } from 'react';
import { 
  Download,
  FileText,
  BarChart2,
  FileSearch,
  CalendarRange,
  PieChart,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DateRangeFilter, CategoryFilter } from '@/components/admin/finance/FinanceFilters';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const mockReportTypes = [
  {
    id: 'cashFlow',
    title: 'Fluxo de Caixa',
    description: 'Relatório detalhado de entradas e saídas no período',
    icon: <TrendingUp className="h-6 w-6" />
  },
  {
    id: 'dre',
    title: 'DRE',
    description: 'Demonstrativo de Resultados do Exercício',
    icon: <BarChart2 className="h-6 w-6" />
  },
  {
    id: 'balance',
    title: 'Balancete',
    description: 'Resumo de contas contábeis',
    icon: <FileSearch className="h-6 w-6" />
  },
  {
    id: 'projection',
    title: 'Projeção Financeira',
    description: 'Fluxo de caixa projetado para os próximos meses',
    icon: <CalendarRange className="h-6 w-6" />
  },
  {
    id: 'categories',
    title: 'Análise por Categoria',
    description: 'Despesas e receitas agrupadas por categoria',
    icon: <PieChart className="h-6 w-6" />
  },
  {
    id: 'tax',
    title: 'Relatório Fiscal',
    description: 'Resumo de impostos e obrigações fiscais',
    icon: <FileText className="h-6 w-6" />
  }
];

const FinancialReports = () => {
  const [dateRange, setDateRange] = useState<{
    startDate: Date | undefined;
    endDate: Date | undefined;
  }>({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date(),
  });

  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [reportFormat, setReportFormat] = useState('pdf');

  const handleDateRangeChange = (start: Date | undefined, end: Date | undefined) => {
    setDateRange({ startDate: start, endDate: end });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Relatórios Financeiros</h1>
        
        <div className="flex items-center gap-2">
          <Tabs value={reportFormat} onValueChange={setReportFormat}>
            <TabsList>
              <TabsTrigger value="pdf">PDF</TabsTrigger>
              <TabsTrigger value="csv">CSV</TabsTrigger>
              <TabsTrigger value="xlsx">Excel</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Filtros do Relatório</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium mb-2">Período</p>
              <DateRangeFilter
                startDate={dateRange.startDate}
                endDate={dateRange.endDate}
                onDateChange={handleDateRangeChange}
              />
            </div>
            
            <div>
              <p className="text-sm font-medium mb-2">Categoria</p>
              <CategoryFilter
                value="all"
                onChange={() => {}}
                categories={[
                  { value: 'eventos', label: 'Eventos' },
                  { value: 'marketing', label: 'Marketing' },
                  { value: 'operacional', label: 'Operacional' },
                ]}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockReportTypes.map((report) => (
          <Card 
            key={report.id} 
            className={`hover:shadow-md transition-shadow cursor-pointer ${selectedReport === report.id ? 'border-primary' : ''}`}
            onClick={() => setSelectedReport(report.id)}
          >
            <CardContent className="p-6 flex flex-col h-full">
              <div className="mb-4 rounded-full bg-gray-100 p-3 w-12 h-12 flex items-center justify-center">
                {report.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{report.title}</h3>
              <p className="text-sm text-gray-500 mb-4 flex-grow">{report.description}</p>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full mt-auto gap-2">
                    <Download className="h-4 w-4" />
                    Gerar {reportFormat.toUpperCase()}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Gerando Relatório</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <p className="text-center text-muted-foreground">
                      Relatório "{report.title}" está sendo gerado no formato {reportFormat.toUpperCase()}.
                    </p>
                    <p className="text-center mt-4">
                      Em uma aplicação real, o relatório seria processado e disponibilizado para download.
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FinancialReports;
