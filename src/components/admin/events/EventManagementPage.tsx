
import React, { useState } from 'react';
import { Plus, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEventManagement } from '@/hooks/useEventManagement';
import EventFilters from './EventFilters';
import EventsTable from './EventsTable';
import { ExportButtons } from '@/components/export/ExportButtons';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const EventManagementPage = () => {
  const {
    events,
    isLoading,
    filters,
    updateFilters,
    clearFilters,
    approveEvent,
    rejectEvent,
    cloneEvent,
    deactivateEvent,
    isProcessing,
    refetch
  } = useEventManagement();

  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const exportConfig = {
    filename: 'eventos',
    headers: {
      title: 'Título',
      event_type: 'Tipo',
      partner_name: 'Parceiro',
      status: 'Status',
      date: 'Data',
      location: 'Local',
      category: 'Categoria',
      max_participants: 'Máx. Participantes',
      created_at: 'Criado em'
    },
    fields: ['title', 'event_type', 'partner_name', 'status', 'date', 'location', 'category', 'max_participants', 'created_at']
  };

  const handleView = (eventId: string) => {
    console.log('View event:', eventId);
  };

  const handleEdit = (eventId: string) => {
    console.log('Edit event:', eventId);
  };

  const handleManageRegistrations = (eventId: string) => {
    console.log('Manage registrations:', eventId);
  };

  const handleCreateNew = () => {
    console.log('Create new event');
  };

  const handleRefresh = () => {
    refetch();
  };

  // Estatísticas dos eventos
  const stats = {
    total: events.length,
    pending: events.filter(e => e.status === 'pending').length,
    approved: events.filter(e => e.status === 'approved').length,
    active: events.filter(e => e.status === 'active').length,
    rejected: events.filter(e => e.status === 'rejected').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gerenciamento de Eventos</h1>
          <p className="text-gray-600">
            Gerencie eventos, aprovações e configurações do seu marketplace esportivo.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
          <ExportButtons
            data={events}
            config={exportConfig}
          />
          <Button onClick={handleCreateNew} className="bg-[#19c37d] hover:bg-[#16a86c]">
            <Plus className="mr-2 h-4 w-4" />
            Novo Evento
          </Button>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aprovados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.active}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejeitados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <EventFilters
        filters={filters}
        onFilterChange={updateFilters}
        onClearFilters={clearFilters}
        totalResults={events.length}
        filteredResults={events.length}
      />

      {/* Tabela de eventos */}
      <EventsTable
        events={events}
        onApprove={approveEvent}
        onReject={rejectEvent}
        onClone={cloneEvent}
        onDeactivate={deactivateEvent}
        onView={handleView}
        onEdit={handleEdit}
        onManageRegistrations={handleManageRegistrations}
        isLoading={isLoading}
      />

      {/* Loading overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#19c37d]"></div>
              <span>Processando...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventManagementPage;
