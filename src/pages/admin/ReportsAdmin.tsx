
import React, { useState } from 'react';
import { Download, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ChartCard from '@/components/admin/dashboard/ChartCard';

// Mock data
const salesData = [
  { name: 'Jan', vendas: 4000, inscritos: 2400 },
  { name: 'Fev', vendas: 3000, inscritos: 1398 },
  { name: 'Mar', vendas: 2000, inscritos: 9800 },
  { name: 'Abr', vendas: 2780, inscritos: 3908 },
  { name: 'Mai', vendas: 1890, inscritos: 4800 },
  { name: 'Jun', vendas: 2390, inscritos: 3800 },
  { name: 'Jul', vendas: 3490, inscritos: 4300 },
];

const userChartData = [
  { name: 'Jan', novos: 150, ativos: 450, premium: 30 },
  { name: 'Fev', novos: 120, ativos: 520, premium: 45 },
  { name: 'Mar', novos: 180, ativos: 650, premium: 60 },
  { name: 'Abr', novos: 250, ativos: 800, premium: 75 },
  { name: 'Mai', novos: 220, ativos: 950, premium: 90 },
  { name: 'Jun', novos: 300, ativos: 1150, premium: 120 },
  { name: 'Jul', novos: 350, ativos: 1400, premium: 150 },
];

const eventsByCategory = [
  { name: 'MTB', valor: 45 },
  { name: 'Speed', valor: 25 },
  { name: 'Gravel', valor: 15 },
  { name: 'Urbano', valor: 10 },
  { name: 'Outro', valor: 5 },
];

const pageViewsData = [
  { name: 'Jan', views: 25000 },
  { name: 'Fev', views: 30000 },
  { name: 'Mar', views: 28000 },
  { name: 'Abr', views: 35000 },
  { name: 'Mai', views: 48000 },
  { name: 'Jun', views: 52000 },
  { name: 'Jul', views: 60000 },
];

const conversionData = [
  { name: 'Visitas', valor: 10000 },
  { name: 'Cadastros', valor: 2500 },
  { name: 'Compras', valor: 800 },
];

const ReportsAdmin = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-xl font-semibold">Relatórios Analíticos</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Período
          </Button>
          <Button className="bg-[#19c37d] hover:bg-[#16a86c]">
            <Download className="mr-2 h-4 w-4" />
            Exportar Dados
          </Button>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <ChartCard
          title="Vendas e Inscrições"
          type="area"
          data={salesData}
          dataKeys={['vendas', 'inscritos']}
          colors={{ vendas: '#19c37d', inscritos: '#6366f1' }}
          labels={{ vendas: 'Vendas (R$)', inscritos: 'Inscritos' }}
        />
        <ChartCard
          title="Usuários"
          type="line"
          data={userChartData}
          dataKeys={['novos', 'ativos', 'premium']}
          colors={{ novos: '#10b981', ativos: '#6366f1', premium: '#f59e0b' }}
          labels={{ novos: 'Novos Usuários', ativos: 'Usuários Ativos', premium: 'Usuários Premium' }}
        />
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <ChartCard
          title="Eventos por Categoria"
          type="bar"
          data={eventsByCategory}
          dataKeys={['valor']}
          colors={{ valor: '#19c37d' }}
          labels={{ valor: 'Eventos' }}
        />
        <ChartCard
          title="Visualizações de Página"
          type="area"
          data={pageViewsData}
          dataKeys={['views']}
          colors={{ views: '#6366f1' }}
          labels={{ views: 'Visualizações' }}
        />
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Métricas Detalhadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Taxa de Conversão</h4>
                <div className="mt-2 flex items-baseline">
                  <p className="text-3xl font-semibold text-gray-900">8.0%</p>
                  <p className="ml-2 text-sm font-medium text-green-600">+1.2%</p>
                </div>
                <p className="mt-1 text-xs text-gray-500">Comparado ao mês anterior</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">Valor Médio</h4>
                <div className="mt-2 flex items-baseline">
                  <p className="text-3xl font-semibold text-gray-900">R$ 145,00</p>
                  <p className="ml-2 text-sm font-medium text-green-600">+12%</p>
                </div>
                <p className="mt-1 text-xs text-gray-500">Por compra</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">Usuários Ativos</h4>
                <div className="mt-2 flex items-baseline">
                  <p className="text-3xl font-semibold text-gray-900">1.450</p>
                  <p className="ml-2 text-sm font-medium text-green-600">+22%</p>
                </div>
                <p className="mt-1 text-xs text-gray-500">Mensalmente</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">Retenção</h4>
                <div className="mt-2 flex items-baseline">
                  <p className="text-3xl font-semibold text-gray-900">76%</p>
                  <p className="ml-2 text-sm font-medium text-red-600">-3%</p>
                </div>
                <p className="mt-1 text-xs text-gray-500">Média mensal</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Stats */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-medium">Funil de Conversão</CardTitle>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full">
            <div className="flex h-full items-end">
              {conversionData.map((item, index) => (
                <div key={item.name} className="flex-1 flex flex-col items-center justify-end h-full">
                  <div 
                    className="w-full max-w-[80px] rounded-t-lg" 
                    style={{ 
                      height: `${(item.valor / conversionData[0].valor) * 100}%`,
                      backgroundColor: index === 0 ? '#6366f1' : index === 1 ? '#10b981' : '#f59e0b' 
                    }}
                  />
                  <div className="mt-2 text-center">
                    <div className="font-semibold text-gray-900">{item.valor.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">{item.name}</div>
                    {index > 0 && (
                      <div className="text-xs font-medium text-gray-700">
                        {((item.valor / conversionData[index-1].valor) * 100).toFixed(1)}%
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-8 grid gap-4 grid-cols-1 md:grid-cols-3">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700">Fontes de Tráfego</h4>
              <ul className="mt-2 space-y-2">
                <li className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Busca orgânica</span>
                  <span className="font-medium">45%</span>
                </li>
                <li className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Redes sociais</span>
                  <span className="font-medium">30%</span>
                </li>
                <li className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Direto</span>
                  <span className="font-medium">15%</span>
                </li>
                <li className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Referências</span>
                  <span className="font-medium">10%</span>
                </li>
              </ul>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700">Dispositivos</h4>
              <ul className="mt-2 space-y-2">
                <li className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Mobile</span>
                  <span className="font-medium">65%</span>
                </li>
                <li className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Desktop</span>
                  <span className="font-medium">30%</span>
                </li>
                <li className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Tablet</span>
                  <span className="font-medium">5%</span>
                </li>
              </ul>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700">Localidades</h4>
              <ul className="mt-2 space-y-2">
                <li className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">São Paulo</span>
                  <span className="font-medium">40%</span>
                </li>
                <li className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Rio de Janeiro</span>
                  <span className="font-medium">25%</span>
                </li>
                <li className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Minas Gerais</span>
                  <span className="font-medium">15%</span>
                </li>
                <li className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Outros</span>
                  <span className="font-medium">20%</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsAdmin;
