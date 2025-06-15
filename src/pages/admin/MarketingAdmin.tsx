
import React from 'react';
import MarketingChart from '@/components/admin/marketing/MarketingChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, Eye, DollarSign } from 'lucide-react';

// Mock data para o gráfico de marketing
const marketingData = [
  { name: 'Jan', campanhas: 8, leads: 945, impressoes: 12500, roi: 185 },
  { name: 'Fev', campanhas: 10, leads: 1120, impressoes: 15200, roi: 198 },
  { name: 'Mar', campanhas: 12, leads: 1234, impressoes: 18000, roi: 215 },
  { name: 'Abr', campanhas: 11, leads: 1180, impressoes: 16800, roi: 205 },
  { name: 'Mai', campanhas: 14, leads: 1456, impressoes: 22100, roi: 235 },
  { name: 'Jun', campanhas: 16, leads: 1678, impressoes: 25400, roi: 285 },
];

const chartConfig = {
  campanhas: { label: 'Campanhas', color: '#19c37d' },
  leads: { label: 'Leads', color: '#6366f1' },
  impressoes: { label: 'Impressões', color: '#f59e0b' },
  roi: { label: 'ROI (%)', color: '#ef4444' }
};

const MarketingAdmin = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Marketing</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Campanhas Ativas</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+3 desde o mês passado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leads Gerados</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+15% desde o mês passado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impressões</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45.2K</div>
            <p className="text-xs text-muted-foreground">+8% desde a semana passada</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROI</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">285%</div>
            <p className="text-xs text-muted-foreground">+12% desde o mês passado</p>
          </CardContent>
        </Card>
      </div>

      {/* Marketing Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Performance de Marketing</CardTitle>
        </CardHeader>
        <CardContent>
          <MarketingChart 
            data={marketingData} 
            config={chartConfig} 
            dataKeys={['campanhas', 'leads', 'impressoes']} 
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketingAdmin;
