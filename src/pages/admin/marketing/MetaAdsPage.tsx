
import React, { useState } from 'react';
import { 
  Filter, 
  Plus, 
  Eye,
  Facebook,
  Instagram,
  Users,
  BarChart2
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

const statuses = [
  { value: 'all', label: 'Todos status' },
  { value: 'active', label: 'Ativa' },
  { value: 'paused', label: 'Pausada' },
  { value: 'finished', label: 'Finalizada' },
];

const MetaAdsPage = () => {
  // States for filters
  const [period, setPeriod] = useState('30');
  const [status, setStatus] = useState('all');
  const [isConnected, setIsConnected] = useState(false);

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
  const metaChartConfig = {
    cliques: { label: 'Cliques', color: '#19c37d' },
    alcance: { label: 'Alcance', color: '#6366f1' },
    conversoes: { label: 'Conversões', color: '#f59e0b' },
    engajamento: { label: 'Engajamento', color: '#64748b' },
    custoConversao: { label: 'Custo/Conv (R$)', color: '#ef4444' }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Meta Ads</h1>
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
        Crie e gerencie campanhas de anúncios para as plataformas da Meta
      </div>

      {/* Meta API Connection Card */}
      {!isConnected && (
        <Card className="bg-blue-50 border-blue-200 mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Facebook className="h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="font-medium">Conecte-se à API da Meta</h3>
                  <p className="text-sm text-gray-600">Para utilizar o recurso de Meta Ads, você precisa se conectar à sua conta de anúncios da Meta</p>
                </div>
              </div>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white" 
                onClick={() => setIsConnected(true)}
              >
                Conectar com Meta
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {isConnected && (
        <>
          {/* Meta Ads Chart */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Desempenho Meta Ads</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <MarketingChart 
                data={metaAdsData} 
                config={metaChartConfig} 
                dataKeys={['cliques', 'alcance', 'conversoes', 'engajamento']} 
              />
            </CardContent>
          </Card>
          
          {/* Meta Campaigns */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Campanhas Meta Ads</CardTitle>
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
                          Ver Detalhes
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Meta Ads Cards - Different platforms */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4 rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center">
                  <Facebook className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Campanhas do Facebook</h3>
                <p className="text-sm text-gray-500">Configure campanhas otimizadas para o Facebook</p>
                <ul className="mt-4 text-sm text-gray-500 space-y-1">
                  <li className="flex items-start">• Criar anúncios de imagem, vídeo e carrossel</li>
                  <li className="flex items-start">• Direcionar usuários para seu site ou WhatsApp</li>
                  <li className="flex items-start">• Configurar públicos alvo específicos</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4 rounded-full bg-pink-100 p-3 w-12 h-12 flex items-center justify-center">
                  <Instagram className="h-6 w-6 text-pink-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Campanhas do Instagram</h3>
                <p className="text-sm text-gray-500">Configure campanhas otimizadas para o Instagram</p>
                <ul className="mt-4 text-sm text-gray-500 space-y-1">
                  <li className="flex items-start">• Criar anúncios para feed, stories e reels</li>
                  <li className="flex items-start">• Destacar visuais e experiências de propriedade</li>
                  <li className="flex items-start">• Alcançar públicos mais jovens e engajados</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4 rounded-full bg-indigo-100 p-3 w-12 h-12 flex items-center justify-center">
                  <Users className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Públicos</h3>
                <p className="text-sm text-gray-500">Gerencie públicos alvos para suas campanhas</p>
                <ul className="mt-4 text-sm text-gray-500 space-y-1">
                  <li className="flex items-start">• Criar públicos personalizados</li>
                  <li className="flex items-start">• Segmentar por interesse, demografia e comportamento</li>
                  <li className="flex items-start">• Criar públicos semelhantes para novos clientes</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Meta Pixel */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart2 className="h-5 w-5" />
                Pixel do Facebook
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-sm text-gray-600 mb-4">Configure o rastreamento de conversões para melhorar o desempenho das suas campanhas</p>
              <div className="flex flex-wrap gap-4 mt-2">
                <Button className="bg-[#19c37d] hover:bg-[#16a86c]">
                  Instalar Pixel
                </Button>
                <Button variant="outline">
                  Ver Documentação
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default MetaAdsPage;
