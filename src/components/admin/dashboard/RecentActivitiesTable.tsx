
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Filter } from 'lucide-react';

interface Activity {
  id: string;
  type: 'evento' | 'pedido' | 'usuario' | 'mensagem';
  title: string;
  status: 'pendente' | 'concluído' | 'cancelado' | 'ativo';
  date: string;
  value?: number;
  user?: string;
}

interface RecentActivitiesProps {
  activities: Activity[];
  className?: string;
}

const RecentActivitiesTable: React.FC<RecentActivitiesProps> = ({ activities, className }) => {
  const [filter, setFilter] = useState<string>('all');

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(activity => activity.type === filter || activity.status === filter);

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'concluído':
        return 'bg-green-100 text-green-800';
      case 'cancelado':
        return 'bg-red-100 text-red-800';
      case 'ativo':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'evento':
        return '🗓️';
      case 'pedido':
        return '🛒';
      case 'usuario':
        return '👤';
      case 'mensagem':
        return '✉️';
      default:
        return '📄';
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">Atividades Recentes</CardTitle>
          <div className="flex gap-2">
            <div className="flex items-center border rounded-md overflow-hidden">
              <button 
                className={`px-3 py-1 text-sm ${filter === 'all' ? 'bg-[#19c37d] text-white' : 'bg-white text-gray-700'}`}
                onClick={() => setFilter('all')}
              >
                Todos
              </button>
              <button 
                className={`px-3 py-1 text-sm ${filter === 'evento' ? 'bg-[#19c37d] text-white' : 'bg-white text-gray-700'}`}
                onClick={() => setFilter('evento')}
              >
                Eventos
              </button>
              <button 
                className={`px-3 py-1 text-sm ${filter === 'pedido' ? 'bg-[#19c37d] text-white' : 'bg-white text-gray-700'}`}
                onClick={() => setFilter('pedido')}
              >
                Pedidos
              </button>
              <button 
                className={`px-3 py-1 text-sm ${filter === 'concluído' ? 'bg-[#19c37d] text-white' : 'bg-white text-gray-700'}`}
                onClick={() => setFilter('concluído')}
              >
                Concluídos
              </button>
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-1" />
              Filtros
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Exportar
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredActivities.map((activity) => (
                <tr key={activity.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">{getTypeIcon(activity.type)}</span>
                      <span className="text-sm text-gray-900 capitalize">{activity.type}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{activity.title}</div>
                    {activity.user && (
                      <div className="text-xs text-gray-500">{activity.user}</div>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{activity.date}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(activity.status)}`}>
                      {activity.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {activity.value ? `R$ ${activity.value.toFixed(2)}` : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivitiesTable;
