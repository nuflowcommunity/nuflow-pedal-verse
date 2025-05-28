import React, { useState } from 'react';
import { 
  Calendar,
  Filter,
  Plus,
  TrendingUp,
  TrendingDown,
  Users,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import { useBreakpoint } from '@/hooks/use-breakpoint';

// Mock Data
const marketingSummary = {
  totalInvestment: 12850.00,
  roi: 215,
  leadsGenerated: 324,
  costPerLead: 39.66
};

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

const metaAdsData = [
  { name: 'Jan', alcance: 24000, cliques: 1100, conversoes: 38, engajamento: 2800, custoConversao: 36.8 },
  { name: 'Fev', alcance: 28000, cliques: 1250, conversoes: 43, engajamento: 3100, custoConversao: 34.9 },
  { name: 'Mar', alcance: 32000, cliques: 1450, conversoes: 52, engajamento: 3600, custoConversao: 33.7 },
  { name: 'Abr', alcance: 30000, cliques: 1380, conversoes: 49, engajamento: 3400, custoConversao: 33.5 },
  { name: 'Mai', alcance: 35000, cliques: 1580, conversoes: 58, engajamento: 3900, custoConversao: 32.8 },
  { name: 'Jun', alcance: 42000, cliques: 1850, conversoes: 72, engajamento: 4500, custoConversao: 32.0 },
];

const metaCampaigns = [
  { id: 1, name: 'Eventos de Ciclismo', status: 'ativa', budget: 2000.00, result: 46, roi: 215 },
  { id: 2, name: 'Comunidade NuFlow', status: 'ativa', budget: 1800.00, result: 52, roi: 264 },
  { id: 3, name: 'Promoção Verão', status: 'pausada', budget: 1200.00, result: 31, roi: 178 },
  { id: 4, name: 'Acessórios Femininos', status: 'finalizada', budget: 900.00, result: 24, roi: 197 },
];

// Filter options
const periods = [
  { value: '7', label: 'Últimos 7 dias' },
  { value: '30', label: 'Últimos 30 dias' },
  { value: '90', label: 'Últimos 90 dias' },
  { value: 'custom', label: 'Personalizado' },
];

const channels = [
  { value: 'all', label: 'Todos canais' },
  { value: 'google', label: 'Google Ads' },
  { value: 'meta', label: 'Meta Ads' },
];

const statuses = [
  { value: 'all', label: 'Todos status' },
  { value: 'active', label: 'Ativa' },
  { value: 'paused', label: 'Pausada' },
  { value: 'finished', label: 'Finalizada' },
];

const MarketingAdmin = () => {
  const isMobile = useBreakpoint('md');
  
  // States for filters
  const [period, setPeriod] = useState('30');
  const [channel, setChannel] = useState('all');
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

  // Chart config objects
  const googleChartConfig = {
    cliques: { label: 'Cliques', color: '#19c37d' },
    impressoes: { label: 'Impressões', color: '#6366f1' },
    conversoes: { label: 'Conversões', color: '#f59e0b' },
    ctr: { label: 'CTR (%)', color: '#64748b' },
    custoConversao: { label: 'Custo/Conv (R$)', color: '#ef4444' }
  };

  const metaChartConfig = {
    cliques: { label: 'Cliques', color: '#19c37d' },
    alcance: { label: 'Alcance', color: '#6366f1' },
    conversoes: { label: 'Conversões', color: '#f59e0b' },
    engajamento: { label: 'Engajamento', color: '#64748b' },
    custoConversao: { label: 'Custo/Conv (R$)', color: '#ef4444' }
  };

  return (
    <div className="space-y-4 lg:space-y-6 p-2 lg:p-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-xl lg:text-2xl font-bold">Marketing</h1>
        
        {/* Filters - Responsive */}
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <select 
            value={period}
            onChange={e => setPeriod(e.target.value)}
            className="h-9 rounded-md border border-input px-3 py-1 text-sm bg-background shadow-sm focus:outline-none focus:ring-1 focus:ring-ring min-w-[120px]"
          >
            {periods.map(p => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
          
          <select 
            value={channel}
            onChange={e => setChannel(e.target.value)}
            className="h-9 rounded-md border border-input px-3 py-1 text-sm bg-background shadow-sm focus:outline-none focus:ring-1 focus:ring-ring min-w-[120px]"
          >
            {channels.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
          
          <select 
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="h-9 rounded-md border border-input px-3 py-1 text-sm bg-background shadow-sm focus:outline-none focus:ring-1 focus:ring-ring min-w-[120px]"
          >
            {statuses.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
          
          <Button variant="outline" className="gap-1 min-h-[36px]">
            <Filter size={16} />
            {!isMobile && <span>Filtros</span>}
          </Button>
        </div>
      </div>

      {/* Summary Cards - Responsive Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <Card>
          <CardHeader className="py-3 lg:py-4">
            <CardTitle className="text-xs lg:text-sm font-medium text-muted-foreground">
              Investimento Total
            </CardTitle>
          </CardHeader>
          <CardContent className="py-0 pb-3 lg:pb-4">
            <div className="text-lg lg:text-2xl font-bold">
              {formatCurrency(marketingSummary.totalInvestment)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-3 lg:py-4">
            <CardTitle className="text-xs lg:text-sm font-medium text-muted-foreground">ROI</CardTitle>
          </CardHeader>
          <CardContent className="py-0 pb-3 lg:pb-4">
            <div className="flex items-center space-x-2">
              <div className="text-lg lg:text-2xl font-bold">{marketingSummary.roi}%</div>
              <TrendingUp className="h-3 w-3 lg:h-4 lg:w-4 text-[#19c37d]" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-3 lg:py-4">
            <CardTitle className="text-xs lg:text-sm font-medium text-muted-foreground">
              Leads Gerados
            </CardTitle>
          </CardHeader>
          <CardContent className="py-0 pb-3 lg:pb-4">
            <div className="flex items-center space-x-2">
              <div className="text-lg lg:text-2xl font-bold">{marketingSummary.leadsGenerated}</div>
              <Users className="h-3 w-3 lg:h-4 lg:w-4 text-[#19c37d]" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-3 lg:py-4">
            <CardTitle className="text-xs lg:text-sm font-medium text-muted-foreground">
              Custo por Lead
            </CardTitle>
          </CardHeader>
          <CardContent className="py-0 pb-3 lg:pb-4">
            <div className="text-lg lg:text-2xl font-bold">
              {formatCurrency(marketingSummary.costPerLead)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Marketing Channels Tabs */}
      <Tabs defaultValue="google" className="w-full">
        <TabsList className="mb-4 w-full sm:w-auto">
          <TabsTrigger value="google" className="flex-1 sm:flex-none">Google Ads</TabsTrigger>
          <TabsTrigger value="meta" className="flex-1 sm:flex-none">Meta Ads</TabsTrigger>
        </TabsList>
        
        <TabsContent value="google" className="space-y-4 lg:space-y-6">
          {/* Google Ads Chart */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base lg:text-lg">Desempenho Google Ads</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] lg:h-[350px]">
              <MarketingChart 
                data={googleAdsData} 
                config={googleChartConfig} 
                dataKeys={['cliques', 'impressoes', 'conversoes']} 
              />
            </CardContent>
          </Card>
          
          {/* Google Campaigns - Responsive Table */}
          <Card>
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2 space-y-2 sm:space-y-0">
              <CardTitle className="text-base lg:text-lg">Campanhas Google Ads</CardTitle>
              <Button className="bg-[#19c37d] hover:bg-[#16a86c]" size="sm">
                <Plus size={16} className="mr-1" />
                {!isMobile && 'Nova Campanha'}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[150px]">Nome</TableHead>
                      <TableHead className="min-w-[80px]">Status</TableHead>
                      <TableHead className="min-w-[100px]">Orçamento</TableHead>
                      <TableHead className="min-w-[80px]">Conversões</TableHead>
                      <TableHead className="min-w-[60px]">ROI</TableHead>
                      <TableHead className="min-w-[100px]">Ações</TableHead>
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
                            {!isMobile && 'Ver Detalhes'}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="meta" className="space-y-4 lg:space-y-6">
          {/* Meta Ads Chart */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base lg:text-lg">Desempenho Meta Ads</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] lg:h-[350px]">
              <MarketingChart 
                data={metaAdsData} 
                config={metaChartConfig} 
                dataKeys={['cliques', 'alcance', 'conversoes', 'engajamento']} 
              />
            </CardContent>
          </Card>
          
          {/* Meta Campaigns - Responsive Table */}
          <Card>
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2 space-y-2 sm:space-y-0">
              <CardTitle className="text-base lg:text-lg">Campanhas Meta Ads</CardTitle>
              <Button className="bg-[#19c37d] hover:bg-[#16a86c]" size="sm">
                <Plus size={16} className="mr-1" />
                {!isMobile && 'Nova Campanha'}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[150px]">Nome</TableHead>
                      <TableHead className="min-w-[80px]">Status</TableHead>
                      <TableHead className="min-w-[100px]">Orçamento</TableHead>
                      <TableHead className="min-w-[80px]">Conversões</TableHead>
                      <TableHead className="min-w-[60px]">ROI</TableHead>
                      <TableHead className="min-w-[100px]">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {metaCampaigns.map((campaign) => (
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
                            {!isMobile && 'Ver Detalhes'}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketingAdmin;
