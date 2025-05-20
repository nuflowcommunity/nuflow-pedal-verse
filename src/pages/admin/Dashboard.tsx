
import React from 'react';
import { Calendar, ShoppingCart, Users, MessageSquare, Plus, Download, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatCard from '@/components/admin/dashboard/StatCard';
import ChartCard from '@/components/admin/dashboard/ChartCard';
import RecentActivitiesTable, { Activity } from '@/components/admin/dashboard/RecentActivitiesTable';

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

const engagementData = [
  { name: 'Jan', visitantes: 1000, visualizacoes: 1400, interacoes: 2400 },
  { name: 'Fev', visitantes: 2000, visualizacoes: 2398, interacoes: 1398 },
  { name: 'Mar', visitantes: 3000, visualizacoes: 4800, interacoes: 9800 },
  { name: 'Abr', visitantes: 2500, visualizacoes: 3908, interacoes: 3908 },
  { name: 'Mai', visitantes: 2800, visualizacoes: 4800, interacoes: 4800 },
  { name: 'Jun', visitantes: 3300, visualizacoes: 3800, interacoes: 3800 },
  { name: 'Jul', visitantes: 3580, visualizacoes: 4300, interacoes: 4300 },
];

const recentActivities: Activity[] = [
  { id: '1', type: 'evento', title: 'Novo Evento: Pedal na Serra', status: 'ativo', date: '12/05/2025', user: 'Ricardo Almeida' },
  { id: '2', type: 'pedido', title: 'Inscrição #1234', status: 'concluído', date: '11/05/2025', value: 150.00, user: 'Maria Santos' },
  { id: '3', type: 'pedido', title: 'Inscrição #1233', status: 'cancelado', date: '10/05/2025', value: 80.00, user: 'João Silva' },
  { id: '4', type: 'usuario', title: 'Novo Parceiro: Bike Shop', status: 'pendente', date: '09/05/2025' },
  { id: '5', type: 'mensagem', title: 'Dúvida sobre evento', status: 'pendente', date: '08/05/2025', user: 'Carlos Mendes' },
  { id: '6', type: 'evento', title: 'Evento Atualizado: Night Ride', status: 'ativo', date: '07/05/2025', user: 'Amanda Costa' },
  { id: '7', type: 'pedido', title: 'Inscrição #1232', status: 'concluído', date: '06/05/2025', value: 120.00, user: 'Pedro Alves' },
  { id: '8', type: 'mensagem', title: 'Feedback positivo', status: 'concluído', date: '05/05/2025', user: 'Patrícia Lima' },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Quick actions */}
      <div className="flex flex-wrap gap-3">
        <Button className="bg-[#19c37d] hover:bg-[#16a86c]">
          <Plus className="mr-2 h-4 w-4" />
          Novo Evento
        </Button>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exportar Relatório
        </Button>
        <Button variant="outline">
          <UserPlus className="mr-2 h-4 w-4" />
          Cadastrar Parceiro
        </Button>
      </div>

      {/* Stats cards */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Eventos Ativos"
          value="24"
          icon={<Calendar className="h-6 w-6 text-[#19c37d]" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Vendas Totais"
          value="R$ 28.560,00"
          icon={<ShoppingCart className="h-6 w-6 text-[#19c37d]" />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Novos Parceiros"
          value="7"
          icon={<Users className="h-6 w-6 text-[#19c37d]" />}
          trend={{ value: 3, isPositive: false }}
        />
        <StatCard
          title="Mensagens Não Lidas"
          value="13"
          icon={<MessageSquare className="h-6 w-6 text-[#19c37d]" />}
          description="5 urgentes, 8 gerais"
        />
      </div>

      {/* Charts */}
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
          title="Engajamento"
          type="line"
          data={engagementData}
          dataKeys={['visitantes', 'visualizacoes', 'interacoes']}
          colors={{ visitantes: '#10b981', visualizacoes: '#6366f1', interacoes: '#f59e0b' }}
          labels={{ visitantes: 'Visitantes', visualizacoes: 'Visualizações', interacoes: 'Interações' }}
        />
      </div>

      {/* Recent activities */}
      <RecentActivitiesTable activities={recentActivities} />
    </div>
  );
};

export default Dashboard;
