
import React, { useState } from 'react';
import { Plus, Search, Filter, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { EventApprovalPage } from '@/components/admin/events/EventApprovalPage';
import { AdvancedFilterBar } from '@/components/filters/AdvancedFilterBar';
import { ExportButtons } from '@/components/export/ExportButtons';
import { SortableTableHeader } from '@/components/table/SortableTableHeader';
import { useAdvancedFiltering } from '@/hooks/useAdvancedFiltering';

const mockEvents = [
  { id: '1', title: 'Pedal na Serra', date: '2025-05-20', location: 'Serra da Cantareira, SP', category: 'MTB', status: 'ativo', participants: 15, maxParticipants: 30, price: 120.00, organizer: 'João Silva' },
  { id: '2', title: 'Night Ride', date: '2025-05-25', location: 'Parque Ibirapuera, SP', category: 'Urbano', status: 'ativo', participants: 28, maxParticipants: 40, price: 80.00, organizer: 'Maria Costa' },
  { id: '3', title: 'Subida da Graciosa', date: '2025-06-10', location: 'Morretes, PR', category: 'Speed', status: 'ativo', participants: 10, maxParticipants: 20, price: 150.00, organizer: 'Pedro Santos' },
  { id: '4', title: 'Desafio dos Caminhos da Serra', date: '2025-04-05', location: 'Campos do Jordão, SP', category: 'MTB', status: 'concluído', participants: 30, maxParticipants: 30, price: 200.00, organizer: 'Ana Oliveira' },
  { id: '5', title: 'Volta da Ilha', date: '2025-03-30', location: 'Florianópolis, SC', category: 'Speed', status: 'concluído', participants: 45, maxParticipants: 50, price: 180.00, organizer: 'Carlos Mendes' }
];

const getStatusClass = (status: string) => {
  switch (status) {
    case 'ativo':
      return 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs';
    case 'concluído':
      return 'bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs';
    case 'cancelado':
      return 'bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs';
    default:
      return 'bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs';
  }
};

const EventsAdmin = () => {
  const [activeTab, setActiveTab] = useState('approval');

  // Filter configuration for events
  const filterConfig = {
    searchFields: ['title', 'location', 'organizer'],
    filterFields: [
      {
        key: 'category',
        label: 'Categoria',
        options: [
          { key: 'MTB', value: 'MTB', label: 'MTB' },
          { key: 'Speed', value: 'Speed', label: 'Speed' },
          { key: 'Urbano', value: 'Urbano', label: 'Urbano' },
          { key: 'Gravel', value: 'Gravel', label: 'Gravel' }
        ]
      },
      {
        key: 'status',
        label: 'Status',
        options: [
          { key: 'ativo', value: 'ativo', label: 'Ativo' },
          { key: 'concluído', value: 'concluído', label: 'Concluído' },
          { key: 'cancelado', value: 'cancelado', label: 'Cancelado' }
        ]
      },
      {
        key: 'location',
        label: 'Estado',
        options: [
          { key: 'SP', value: 'SP', label: 'São Paulo' },
          { key: 'RJ', value: 'RJ', label: 'Rio de Janeiro' },
          { key: 'MG', value: 'MG', label: 'Minas Gerais' },
          { key: 'PR', value: 'PR', label: 'Paraná' },
          { key: 'SC', value: 'SC', label: 'Santa Catarina' }
        ]
      }
    ],
    sortOptions: [
      { field: 'date', direction: 'desc' as const, label: 'Data (mais recente)' },
      { field: 'date', direction: 'asc' as const, label: 'Data (mais antigo)' },
      { field: 'title', direction: 'asc' as const, label: 'Nome (A-Z)' },
      { field: 'title', direction: 'desc' as const, label: 'Nome (Z-A)' },
      { field: 'price', direction: 'desc' as const, label: 'Preço (maior)' },
      { field: 'price', direction: 'asc' as const, label: 'Preço (menor)' },
      { field: 'participants', direction: 'desc' as const, label: 'Inscritos (mais)' },
      { field: 'participants', direction: 'asc' as const, label: 'Inscritos (menos)' }
    ]
  };

  const {
    searchQuery,
    setSearchQuery,
    activeFilters,
    updateFilter,
    clearFilter,
    clearFilters,
    sortBy,
    sortDirection,
    updateSort,
    filteredData: filteredEvents,
    hasActiveFilters,
    totalResults,
    filteredResults
  } = useAdvancedFiltering(mockEvents, filterConfig);

  // Export configuration
  const exportConfig = {
    filename: 'eventos',
    headers: {
      id: 'ID',
      title: 'Título',
      date: 'Data',
      location: 'Local',
      category: 'Categoria',
      status: 'Status',
      participants: 'Inscritos',
      maxParticipants: 'Máx. Participantes',
      price: 'Preço',
      organizer: 'Organizador'
    },
    fields: ['id', 'title', 'date', 'location', 'category', 'status', 'participants', 'maxParticipants', 'price', 'organizer']
  };

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
            <AdvancedFilterBar
              config={filterConfig}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              activeFilters={activeFilters}
              onFilterChange={updateFilter}
              onFilterClear={clearFilter}
              onClearAll={clearFilters}
              sortBy={sortBy}
              sortDirection={sortDirection}
              onSortChange={updateSort}
              hasActiveFilters={hasActiveFilters}
              filteredResults={filteredResults}
              totalResults={totalResults}
              renderExportButtons={() => (
                <ExportButtons
                  data={filteredEvents}
                  config={exportConfig}
                />
              )}
            />

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <SortableTableHeader 
                          field="title" 
                          currentSort={sortBy} 
                          currentDirection={sortDirection} 
                          onSort={updateSort}
                        >
                          Título
                        </SortableTableHeader>
                        <SortableTableHeader 
                          field="date" 
                          currentSort={sortBy} 
                          currentDirection={sortDirection} 
                          onSort={updateSort}
                        >
                          Data
                        </SortableTableHeader>
                        <SortableTableHeader 
                          field="location" 
                          currentSort={sortBy} 
                          currentDirection={sortDirection} 
                          onSort={updateSort}
                        >
                          Local
                        </SortableTableHeader>
                        <SortableTableHeader 
                          field="category" 
                          currentSort={sortBy} 
                          currentDirection={sortDirection} 
                          onSort={updateSort}
                        >
                          Categoria
                        </SortableTableHeader>
                        <SortableTableHeader 
                          field="status" 
                          currentSort={sortBy} 
                          currentDirection={sortDirection} 
                          onSort={updateSort}
                        >
                          Status
                        </SortableTableHeader>
                        <SortableTableHeader 
                          field="participants" 
                          currentSort={sortBy} 
                          currentDirection={sortDirection} 
                          onSort={updateSort}
                        >
                          Inscritos
                        </SortableTableHeader>
                        <SortableTableHeader 
                          field="price" 
                          currentSort={sortBy} 
                          currentDirection={sortDirection} 
                          onSort={updateSort}
                        >
                          Preço
                        </SortableTableHeader>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEvents.map((event) => (
                        <TableRow key={event.id} className="hover:bg-gray-50">
                          <TableCell>
                            <div className="text-sm font-medium text-gray-900">{event.title}</div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-gray-900">{new Date(event.date).toLocaleDateString('pt-BR')}</div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-gray-900">{event.location}</div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-gray-900">{event.category}</div>
                          </TableCell>
                          <TableCell>
                            <span className={getStatusClass(event.status)}>
                              {event.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-gray-900">{event.participants}/{event.maxParticipants}</div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-gray-900">R$ {event.price.toFixed(2)}</div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
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
