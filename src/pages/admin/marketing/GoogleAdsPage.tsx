
import React, { useState } from 'react';
import { 
  Filter, 
  Plus, 
  Search, 
  Eye,
  TrendingUp,
  MessageSquare,
  ShoppingCart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import MarketingChart from '@/components/admin/marketing/MarketingChart';

// Mock Data
const googleAdsData = [
  { name: 'Jan', impressoes: 12000, cliques: 850, conversoes: 32, ctr: 7.08, custoConversao: 38.2 },
  { name: 'Fev', impressoes: 14500, cliques: 920, conversoes: 41, ctr: 6.34, custoConversao: 35.6 },
  { name: 'Mar', impressoes: 18000, cliques: 1100, conversoes: 47, ctr: 6.11, custoConversao: 34.1 },
  { name: 'Abr', impressoes: 17200, cliques: 1050, conversoes: 45, ctr: 6.10, custoConversao: 33.8 },
  { name: 'Mai', impressoes: 20100, cliques: 1240, conversoes: 56, ctr: 6.17, custoConversao: 32.2 },
  { name: 'Jun', impressoes: 24500, cliques: 1490, conversoes: 68, ctr: 6.08, custoConversao: 31.5 },
];

const googleCampaigns = [
  { id: 1, name: 'Pedal na Serra 2025', status: 'ativa', budget: 1200.00, result: 28, roi: 232 },
  { id: 2, name: 'Bicicletas Premium', status: 'ativa', budget: 2400.00, result: 53, roi: 188 },
  { id: 3, name: 'Night Ride SP', status: 'pausada', budget: 800.00, result: 17, roi: 156 },
  { id: 4, name: 'Acessórios MTB', status: 'finalizada', budget: 1500.00, result: 34, roi: 201 },
];

// Filter options
const periods = [
  { value: '7', label: 'Últimos 7 dias' },
  { value: '30', label: 'Últimos 30 dias' },
  { value: '90', label: 'Últimos 90 dias' },
  { value: 'custom', label: 'Personalizado' },
];

const statuses = [
  { value: 'all', label: 'Todos status' },
  { value: 'active', label: 'Ativa' },
  { value: 'paused', label: 'Pausada' },
  { value: 'finished', label: 'Finalizada' },
];

const GoogleAdsPage = () => {
  // States for filters
  const [period, setPeriod] = useState('30');
  const [status, setStatus] = useState('all');

  const formatCurrency = (value: number) => {
    return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'ativa': return 'bg-green-100 text-green-800';
      case 'pausada': return 'bg-amber-100 text-amber-800';
      case 'finalizada': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Chart config object
  const googleChartConfig = {
    cliques: { label: 'Cliques', color: '#19c37d' },
    impressoes: { label: 'Impressões', color: '#6366f1' },
    conversoes: { label: 'Conversões', color: '#f59e0b' },
    ctr: { label: 'CTR (%)', color: '#64748b' },
    custoConversao: { label: 'Custo/Conv (R$)', color: '#ef4444' }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Google Ads</h1>
        <div className="flex gap-2">
          {/* Filter Period */}
          <select 
            value={period}
            onChange={e => setPeriod(e.target.value)}
            className="h-9 rounded-md border border-input px-3 py-1 text-sm bg-background shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
          >
            {periods.map(p => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
          
          {/* Filter Status */}
          <select 
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="h-9 rounded-md border border-input px-3 py-1 text-sm bg-background shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
          >
            {statuses.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
          
          <Button variant="outline" className="gap-1">
            <Filter size={16} />
            <span>Filtros</span>
          </Button>
        </div>
      </div>

      <div className="text-sm text-gray-500">
        Gerencie suas campanhas de Google Ads
      </div>

      {/* Google Ads Chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Desempenho Google Ads</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <MarketingChart 
            data={googleAdsData} 
            config={googleChartConfig} 
            dataKeys={['cliques', 'impressoes', 'conversoes']} 
          />
        </CardContent>
      </Card>
      
      {/* Google Campaigns */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg">Campanhas Google Ads</CardTitle>
          <Button className="bg-[#19c37d] hover:bg-[#16a86c]" size="sm">
            <Plus size={16} className="mr-1" />
            Nova Campanha
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Orçamento</TableHead>
                <TableHead>Conversões</TableHead>
                <TableHead>ROI</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {googleCampaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell>
                    <span className={cn("py-1 px-2 rounded-full text-xs font-medium", getStatusColor(campaign.status))}>
                      {campaign.status}
                    </span>
                  </TableCell>
                  <TableCell>{formatCurrency(campaign.budget)}</TableCell>
                  <TableCell>{campaign.result}</TableCell>
                  <TableCell>{campaign.roi}%</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="h-8 p-0 px-2">
                      <Eye size={16} className="mr-1" />
                      Ver Detalhes
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Google Ads Cards - Types of campaigns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="mb-4 rounded-full bg-purple-100 p-3 w-12 h-12 flex items-center justify-center">
              <Search className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Links Patrocinados</h3>
            <p className="text-sm text-gray-500">Configure campanhas otimizadas para busca no Google</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="mb-4 rounded-full bg-green-100 p-3 w-12 h-12 flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Campanhas WhatsApp</h3>
            <p className="text-sm text-gray-500">Configure campanhas otimizadas para gerar conversas no WhatsApp</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="mb-4 rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Google Retargeting</h3>
            <p className="text-sm text-gray-500">Configure campanhas para reconquistar visitantes do seu site</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="mb-4 rounded-full bg-amber-100 p-3 w-12 h-12 flex items-center justify-center">
              <ShoppingCart className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Google Shopping</h3>
            <p className="text-sm text-gray-500">Configure campanhas específicas para a plataforma Google Shopping</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GoogleAdsPage;

