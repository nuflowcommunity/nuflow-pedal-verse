
import React, { useState } from 'react';
import { Plus, Search, Filter, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EventApprovalPage } from '@/components/admin/events/EventApprovalPage';

const mockEvents = [
  { id: '1', title: 'Pedal na Serra', date: '20/05/2025', location: 'Serra da Cantareira, SP', category: 'MTB', status: 'ativo', participants: 15, maxParticipants: 30, price: 120.00 },
  { id: '2', title: 'Night Ride', date: '25/05/2025', location: 'Parque Ibirapuera, SP', category: 'Urbano', status: 'ativo', participants: 28, maxParticipants: 40, price: 80.00 },
  { id: '3', title: 'Subida da Graciosa', date: '10/06/2025', location: 'Morretes, PR', category: 'Speed', status: 'ativo', participants: 10, maxParticipants: 20, price: 150.00 },
  { id: '4', title: 'Desafio dos Caminhos da Serra', date: '05/04/2025', location: 'Campos do Jordão, SP', category: 'MTB', status: 'concluído', participants: 30, maxParticipants: 30, price: 200.00 },
  { id: '5', title: 'Volta da Ilha', date: '30/03/2025', location: 'Florianópolis, SC', category: 'Speed', status: 'concluído', participants: 45, maxParticipants: 50, price: 180.00 }
];

const getStatusClass = (status: string) => {
  switch (status) {
    case 'ativo':
      return 'bg-green-100 text-green-800';
    case 'concluído':
      return 'bg-blue-100 text-blue-800';
    case 'cancelado':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const EventsAdmin = () => {
  const [activeTab, setActiveTab] = useState('approval');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gerenciamento de Eventos</h1>
          <p className="text-gray-600">Gerencie aprovações, configurações e listagem de eventos.</p>
        </div>
        <Button className="bg-[#19c37d] hover:bg-[#16a86c]">
          <Plus className="mr-2 h-4 w-4" />
          Novo Evento
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="approval" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Aprovação de Eventos
          </TabsTrigger>
          <TabsTrigger value="listing" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Listagem de Eventos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="approval" className="mt-6">
          <EventApprovalPage />
        </TabsContent>

        <TabsContent value="listing" className="mt-6">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Buscar eventos..."
                  className="pl-9 w-full"
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filtrar
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Local</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inscritos</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockEvents.map((event) => (
                        <tr key={event.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{event.title}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{event.date}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{event.location}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{event.category}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(event.status)}`}>
                              {event.status}
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{event.participants}/{event.maxParticipants}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">R$ {event.price.toFixed(2)}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventsAdmin;
