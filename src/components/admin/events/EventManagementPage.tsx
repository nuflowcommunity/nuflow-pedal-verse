
import React, { useState } from 'react';
import { Plus, Download, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEventManagement } from '@/hooks/useEventManagement';
import EventFilters from './EventFilters';
import EventsTable from './EventsTable';
import { ExportButtons } from '@/components/export/ExportButtons';

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
    isProcessing
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
    // Implementar visualização do evento
    console.log('View event:', eventId);
  };

  const handleEdit = (eventId: string) => {
    // Implementar edição do evento
    console.log('Edit event:', eventId);
  };

  const handleManageRegistrations = (eventId: string) => {
    // Implementar gerenciamento de inscrições
    console.log('Manage registrations:', eventId);
  };

  const handleCreateNew = () => {
    // Implementar criação de novo evento
    console.log('Create new event');
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
