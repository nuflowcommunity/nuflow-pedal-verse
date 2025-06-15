
import React, { useState } from 'react';
import { useEventManagement } from '@/hooks/useEventManagement';
import EventsMetrics from './EventsMetrics';
import EventsFilters from './EventsFilters';
import EventsTable from './EventsTable';

const EventsDataTable = () => {
  const { events, isLoading, updateFilters, approveEvent, rejectEvent, cloneEvent, deactivateEvent } = useEventManagement();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const exportEvents = () => {
    const csvContent = events.map(event => ({
      Título: event.title,
      Data: new Date(event.date).toLocaleDateString('pt-BR'),
      Status: event.status,
      Local: event.location,
      Organizador: event.organizer || '-'
    }));

    const csv = [
      Object.keys(csvContent[0]).join(','),
      ...csvContent.map(row => Object.values(row).join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `eventos_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    updateFilters({ search: value });
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
    updateFilters({ status: value === 'all' ? undefined : value });
  };

  const filters = (
    <EventsFilters
      searchTerm={searchTerm}
      statusFilter={statusFilter}
      onSearchChange={handleSearch}
      onStatusFilterChange={handleStatusFilter}
      onExport={exportEvents}
    />
  );

  return (
    <div className="space-y-6">
      <EventsMetrics />
      <EventsTable
        events={events}
        isLoading={isLoading}
        filters={filters}
        onApprove={approveEvent}
        onReject={rejectEvent}
        onClone={cloneEvent}
        onDeactivate={deactivateEvent}
      />
    </div>
  );
};

export default EventsDataTable;
