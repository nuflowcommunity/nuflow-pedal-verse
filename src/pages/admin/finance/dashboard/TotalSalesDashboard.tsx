
import React, { useState } from 'react';
import { ChevronLeft, RefreshCw, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FinanceLineChart } from '@/components/admin/finance/FinanceLineChart';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

// Generate monthly sales data for the last year
const generateMonthlySalesData = () => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const data = [];
  
  // Generate monthly data for the last 12 months
  for (let i = 11; i >= 0; i--) {
    let month = currentMonth - i;
    let year = currentYear;
    
    if (month < 0) {
      month += 12;
      year -= 1;
    }
    
    const monthNames = [
      'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];
    
    // Base amounts that increase over time (business growth)
    const baseAmount = 45000 + (i * 3500);
    
    // Seasonal factors (Q4 highest, Q1 lowest)
    let seasonalFactor = 1;
    if (month >= 9) { // Q4: Oct, Nov, Dec
      seasonalFactor = 1.4;
    } else if (month >= 6) { // Q3: Jul, Aug, Sep
      seasonalFactor = 1.1;
    } else if (month >= 3) { // Q2: Apr, May, Jun
      seasonalFactor = 0.9;
    } else { // Q1: Jan, Feb, Mar
      seasonalFactor = 0.8;
    }
    
    // Add some randomness
    const randomVariation = 0.85 + (Math.random() * 0.3);
    
    const amount = Math.round(baseAmount * seasonalFactor * randomVariation);
    const profit = Math.round(amount * (0.2 + Math.random() * 0.15)); // 20-35% profit margin
    const costs = amount - profit;
    
    data.push({
      name: `${monthNames[month]}`,
      fullDate: `${monthNames[month]}/${year}`,
      sales: amount,
      costs: costs,
      profit: profit
    });
  }
  
  return data;
};

// Generate yearly data
const generateYearlySalesData = () => {
  const currentYear = new Date().getFullYear();
  const data = [];
  
  // Generate data for the last 5 years
  for (let i = 4; i >= 0; i--) {
    const year = currentYear - i;
    
    // Base amount with growth year over year
    const growthFactor = Math.pow(1.25, i); // 25% annual growth backward
    const baseAmount = Math.round(600000 / growthFactor);
    
    // Add some randomness
    const randomVariation = 0.9 + (Math.random() * 0.2);
    
    const amount = Math.round(baseAmount * randomVariation);
    const profit = Math.round(amount * (0.22 + Math.random() * 0.1)); // 22-32% profit margin
    const costs = amount - profit;
    
    data.push({
      name: `${year}`,
      sales: amount,
      costs: costs,
      profit: profit
    });
  }
  
  return data;
};

const TotalSalesDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("monthly");
  const [monthlySalesData, setMonthlySalesData] = useState(generateMonthlySalesData());
  const [yearlySalesData, setYearlySalesData] = useState(generateYearlySalesData());
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
      setMonthlySalesData(generateMonthlySalesData());
      setYearlySalesData(generateYearlySalesData());
      setIsLoading(false);
      toast({
        title: "Dados atualizados",
        description: "Os dados de vendas totais foram atualizados."
      });
    }, 800);
  };
  
  // Calculate metrics for monthly data
  const totalMonthlySales = monthlySalesData.reduce((sum, dataPoint) => sum + dataPoint.sales, 0);
  const totalMonthlyProfit = monthlySalesData.reduce((sum, dataPoint) => sum + dataPoint.profit, 0);
  const averageMonthlyProfitMargin = (totalMonthlyProfit / totalMonthlySales) * 100;
  
  // Calculate year-over-year growth (comparing last month with same month last year)
  const currentMonthSales = monthlySalesData[monthlySalesData.length - 1].sales;
  const lastYearSameMonthSales = monthlySalesData[0].sales;
  const yoyGrowth = ((currentMonthSales - lastYearSameMonthSales) / lastYearSameMonthSales) * 100;
  
  // Calculate metrics for yearly data
  const totalYearlySales = yearlySalesData.reduce((sum, dataPoint) => sum + dataPoint.sales, 0);
  const currentYearSales = yearlySalesData[yearlySalesData.length - 1].sales;
  const previousYearSales = yearlySalesData[yearlySalesData.length - 2].sales;
  const yearGrowth = ((currentYearSales - previousYearSales) / previousYearSales) * 100;

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
          <h1 className="text-2xl font-bold">Análise de Vendas Totais</h1>
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
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="monthly">Mensal</TabsTrigger>
          <TabsTrigger value="yearly">Anual</TabsTrigger>
        </TabsList>
        
        <TabsContent value="monthly" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-sm font-medium text-gray-500">Vendas Anuais (12 meses)</p>
                <h3 className="text-2xl font-bold mt-1">{formatCurrency(totalMonthlySales)}</h3>
                <p className="text-xs text-gray-500 mt-1">Média mensal: {formatCurrency(totalMonthlySales / 12)}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <p className="text-sm font-medium text-gray-500">Crescimento Anual</p>
                <div className="flex items-center mt-1">
                  <h3 className="text-2xl font-bold">{yoyGrowth.toFixed(1)}%</h3>
                  {yoyGrowth > 0 ? (
                    <ArrowUp className="h-5 w-5 text-green-600 ml-2" />
                  ) : (
                    <ArrowDown className="h-5 w-5 text-red-600 ml-2" />
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">Em relação ao mesmo mês do ano anterior</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <p className="text-sm font-medium text-gray-500">Margem de Lucro Média</p>
                <h3 className="text-2xl font-bold mt-1">{averageMonthlyProfitMargin.toFixed(1)}%</h3>
                <p className="text-xs text-gray-500 mt-1">Lucro: {formatCurrency(totalMonthlyProfit)}</p>
              </CardContent>
            </Card>
          </div>
          
          <FinanceLineChart 
            title="Evolução das Vendas Mensais"
            subtitle="Vendas, custos e lucro por mês nos últimos 12 meses"
            data={monthlySalesData}
            dataKeys={['sales', 'costs', 'profit']}
            colors={{
              sales: '#60a5fa',
              costs: '#f87171',
              profit: '#4ade80',
            }}
            labels={{
              sales: 'Vendas',
              costs: 'Custos',
              profit: 'Lucro',
            }}
            formatter={formatCurrency}
            height={400}
          />
        </TabsContent>
        
        <TabsContent value="yearly" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-sm font-medium text-gray-500">Vendas Acumuladas</p>
                <h3 className="text-2xl font-bold mt-1">{formatCurrency(totalYearlySales)}</h3>
                <p className="text-xs text-gray-500 mt-1">Total dos últimos 5 anos</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <p className="text-sm font-medium text-gray-500">Crescimento Anual</p>
                <div className="flex items-center mt-1">
                  <h3 className="text-2xl font-bold">{yearGrowth.toFixed(1)}%</h3>
                  {yearGrowth > 0 ? (
                    <ArrowUp className="h-5 w-5 text-green-600 ml-2" />
                  ) : (
                    <ArrowDown className="h-5 w-5 text-red-600 ml-2" />
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">Em relação ao ano anterior</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <p className="text-sm font-medium text-gray-500">Ano Atual</p>
                <h3 className="text-2xl font-bold mt-1">{formatCurrency(currentYearSales)}</h3>
                <p className="text-xs text-gray-500 mt-1">Projeção para o ano completo</p>
              </CardContent>
            </Card>
          </div>
          
          <FinanceLineChart 
            title="Evolução das Vendas Anuais"
            subtitle="Vendas, custos e lucro por ano nos últimos 5 anos"
            data={yearlySalesData}
            dataKeys={['sales', 'costs', 'profit']}
            colors={{
              sales: '#60a5fa',
              costs: '#f87171',
              profit: '#4ade80',
            }}
            labels={{
              sales: 'Vendas',
              costs: 'Custos',
              profit: 'Lucro',
            }}
            formatter={formatCurrency}
            height={400}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TotalSalesDashboard;
