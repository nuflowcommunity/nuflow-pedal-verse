
import React, { useState } from 'react';
import { ChevronLeft, RefreshCw, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FinanceLineChart } from '@/components/admin/finance/FinanceLineChart';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { format, getDaysInMonth, startOfMonth, addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Generate daily sales data for the current month
const generateMonthlySalesData = () => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const daysInMonth = getDaysInMonth(new Date(currentYear, currentMonth));
  
  const firstDayOfMonth = startOfMonth(new Date(currentYear, currentMonth));
  
  const data = [];
  
  // Generate data for each day in the month
  for (let i = 0; i < daysInMonth; i++) {
    const day = addDays(firstDayOfMonth, i);
    const isWeekend = day.getDay() === 0 || day.getDay() === 6;
    const isPast = day <= today;
    
    // Generate realistic data patterns
    // Higher sales on weekends, gradual increase through the month
    // Sales only for past days (not future)
    let salesMultiplier = isPast ? 1 : 0;
    
    if (isPast) {
      // Base multiplier that increases through the month (seasonal trend)
      salesMultiplier = 1 + (i / daysInMonth) * 0.5;
      
      // Weekend boost
      if (isWeekend) {
        salesMultiplier *= 1.4;
      }
      
      // Mid-month payday boost around day 15
      if (i === 14 || i === 15 || i === 16) {
        salesMultiplier *= 1.3;
      }
      
      // End-month payday boost
      if (i >= daysInMonth - 3 && i < daysInMonth) {
        salesMultiplier *= 1.5;
      }
      
      // Add some randomness
      salesMultiplier *= 0.8 + Math.random() * 0.4;
    }
    
    const sales = Math.round(3000 + Math.random() * 4000 * salesMultiplier);
    
    data.push({
      name: format(day, 'dd', { locale: ptBR }),
      fullDate: format(day, 'dd/MM', { locale: ptBR }),
      sales: isPast ? sales : 0,
      dayOfWeek: format(day, 'EEE', { locale: ptBR }),
    });
  }
  
  return data;
};

const MonthlyDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [salesData, setSalesData] = useState(generateMonthlySalesData());
  const [isLoading, setIsLoading] = useState(false);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };
  
  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setSalesData(generateMonthlySalesData());
      setIsLoading(false);
      toast({
        title: "Dados atualizados",
        description: "Os dados de vendas mensais foram atualizados."
      });
    }, 800);
  };
  
  // Calculate totals and metrics
  const totalSales = salesData.reduce((sum, dataPoint) => sum + dataPoint.sales, 0);
  
  // Find peak day
  const peakDay = salesData.reduce((max, dataPoint) => 
    dataPoint.sales > max.sales ? dataPoint : max, salesData[0]);
  
  // Calculate average daily sales (only counting days with sales)
  const daysWithSales = salesData.filter(day => day.sales > 0).length;
  const averageDailySales = totalSales / (daysWithSales || 1);

  // Calculate weekday vs weekend sales
  const weekdaySales = salesData
    .filter(day => ['seg', 'ter', 'qua', 'qui', 'sex'].includes(day.dayOfWeek.toLowerCase()))
    .reduce((sum, day) => sum + day.sales, 0);
    
  const weekendSales = salesData
    .filter(day => ['sáb', 'dom'].includes(day.dayOfWeek.toLowerCase()))
    .reduce((sum, day) => sum + day.sales, 0);

  const currentMonth = format(new Date(), 'MMMM yyyy', { locale: ptBR });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/admin/entidades')}
            className="mr-2"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Vendas Mensais - {currentMonth}</h1>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={refreshData} 
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Atualizar Dados
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm font-medium text-gray-500">Vendas Totais do Mês</p>
            <h3 className="text-2xl font-bold mt-1">{formatCurrency(totalSales)}</h3>
            <p className="text-xs text-gray-500 mt-1">Média diária: {formatCurrency(averageDailySales)}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <p className="text-sm font-medium text-gray-500">Melhor Dia</p>
            <h3 className="text-2xl font-bold mt-1">{peakDay.fullDate}</h3>
            <p className="text-xs text-gray-500 mt-1">{formatCurrency(peakDay.sales)} em vendas</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <p className="text-sm font-medium text-gray-500">Dias com Vendas</p>
            <h3 className="text-2xl font-bold mt-1">{daysWithSales}</h3>
            <p className="text-xs text-gray-500 mt-1">De um total de {salesData.length} dias</p>
          </CardContent>
        </Card>
      </div>
      
      <FinanceLineChart 
        title="Vendas Diárias"
        subtitle="Detalhamento de vendas por dia do mês atual"
        data={salesData}
        dataKeys={['sales']}
        colors={{
          sales: '#60a5fa',
        }}
        labels={{
          sales: 'Vendas (R$)',
        }}
        formatter={formatCurrency}
        height={400}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-2">Vendas em Dias Úteis</h3>
            <h2 className="text-3xl font-bold">{formatCurrency(weekdaySales)}</h2>
            <p className="text-sm text-gray-500 mt-1">
              {Math.round((weekdaySales / totalSales) * 100)}% do total mensal
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-2">Vendas em Fins de Semana</h3>
            <h2 className="text-3xl font-bold">{formatCurrency(weekendSales)}</h2>
            <p className="text-sm text-gray-500 mt-1">
              {Math.round((weekendSales / totalSales) * 100)}% do total mensal
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MonthlyDashboard;
