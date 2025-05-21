
import React, { useState } from 'react';
import { ChevronLeft, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FinanceLineChart } from '@/components/admin/finance/FinanceLineChart';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

// Mock data for hourly sales
const generateHourlySalesData = () => {
  const now = new Date();
  const data = [];
  
  // Generate data for the last 24 hours
  for (let i = 23; i >= 0; i--) {
    const hour = new Date(now);
    hour.setHours(now.getHours() - i);
    
    const formattedHour = `${hour.getHours().toString().padStart(2, '0')}:00`;
    
    // Generate random sales data with more realistic variation
    // Higher sales during business hours (9-18)
    const currentHour = hour.getHours();
    let salesMultiplier = 1;
    
    if (currentHour >= 9 && currentHour <= 18) {
      salesMultiplier = 3 + Math.sin((currentHour - 9) * 0.5) * 2; // Peak at midday
    } else if (currentHour >= 19 && currentHour <= 22) {
      salesMultiplier = 2; // Evening activity
    } else {
      salesMultiplier = 0.5; // Nighttime lower activity
    }
    
    const sales = Math.round(Math.random() * 2500 * salesMultiplier);
    const transactions = Math.round(sales / (100 + Math.random() * 150));
    
    data.push({
      name: formattedHour,
      sales: sales,
      transactions: transactions
    });
  }
  
  return data;
};

const Last24HoursDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [salesData, setSalesData] = useState(generateHourlySalesData());
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
      setSalesData(generateHourlySalesData());
      setIsLoading(false);
      toast({
        title: "Dados atualizados",
        description: "Os dados de vendas das últimas 24 horas foram atualizados."
      });
    }, 800);
  };
  
  // Calculate totals
  const totalSales = salesData.reduce((sum, dataPoint) => sum + dataPoint.sales, 0);
  const totalTransactions = salesData.reduce((sum, dataPoint) => sum + dataPoint.transactions, 0);
  const averageSale = totalSales / totalTransactions;
  
  // Find peak hour
  const peakHour = salesData.reduce((max, dataPoint) => 
    dataPoint.sales > max.sales ? dataPoint : max, salesData[0]);

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
          <h1 className="text-2xl font-bold">Vendas das Últimas 24 Horas</h1>
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
            <p className="text-sm font-medium text-gray-500">Vendas Totais</p>
            <h3 className="text-2xl font-bold mt-1">{formatCurrency(totalSales)}</h3>
            <p className="text-xs text-gray-500 mt-1">Últimas 24 horas</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <p className="text-sm font-medium text-gray-500">Transações</p>
            <h3 className="text-2xl font-bold mt-1">{totalTransactions}</h3>
            <p className="text-xs text-gray-500 mt-1">Ticket médio: {formatCurrency(averageSale)}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <p className="text-sm font-medium text-gray-500">Hora de Pico</p>
            <h3 className="text-2xl font-bold mt-1">{peakHour.name}</h3>
            <p className="text-xs text-gray-500 mt-1">{formatCurrency(peakHour.sales)} em vendas</p>
          </CardContent>
        </Card>
      </div>
      
      <FinanceLineChart 
        title="Vendas por Hora"
        subtitle="Detalhamento de vendas hora a hora nas últimas 24 horas"
        data={salesData}
        dataKeys={['sales']}
        colors={{
          sales: '#4ade80',
        }}
        labels={{
          sales: 'Vendas (R$)',
        }}
        formatter={formatCurrency}
        height={400}
      />
      
      <div className="mt-8">
        <FinanceLineChart 
          title="Volume de Transações"
          subtitle="Número de transações por hora"
          data={salesData}
          dataKeys={['transactions']}
          colors={{
            transactions: '#60a5fa',
          }}
          labels={{
            transactions: 'Transações',
          }}
          formatter={(value) => value.toString()}
          height={300}
        />
      </div>
    </div>
  );
};

export default Last24HoursDashboard;
