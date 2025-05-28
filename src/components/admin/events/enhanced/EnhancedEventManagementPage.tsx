
import React, { useState } from 'react';
import { Plus, RefreshCw, Filter, Download, Grid, List, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEventManagement } from '@/hooks/useEventManagement';
import { AdvancedFilters } from './AdvancedFilters';
import { EnhancedEventsTable } from './EnhancedEventsTable';
import { BatchActionsBar } from './BatchActionsBar';
import { PreviewFormDialog } from './PreviewFormDialog';
import { TabbedEventDialog } from './TabbedEventDialog';
import { ExportButtons } from '@/components/export/ExportButtons';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const EnhancedEventManagementPage = () => {
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

  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [previewDialog, setPreviewDialog] = useState(false);
  const [createDialog, setCreateDialog] = useState(false);
  const [quickSearch, setQuickSearch] = useState('');

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

  // Event handlers
  const handleSelectEvent = (eventId: string, selected: boolean) => {
    setSelectedEvents(prev => 
      selected 
        ? [...prev, eventId]
        : prev.filter(id => id !== eventId)
    );
  };

  const handleSelectAll = (selected: boolean) => {
    setSelectedEvents(selected ? events.map(e => e.id) : []);
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleBatchAction = (action: string, eventIds: string[]) => {
    console.log(`Batch ${action}:`, eventIds);
    // Implementar ações em lote
    setSelectedEvents([]);
  };

  const handleView = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    setSelectedEvent(event);
    setPreviewDialog(true);
  };

  const handleEdit = (eventId: string) => {
    console.log('Edit event:', eventId);
  };

  const handleManageRegistrations = (eventId: string) => {
    console.log('Manage registrations:', eventId);
  };

  const handleCreateNew = () => {
    setCreateDialog(true);
  };

  const handleRefresh = () => {
    refetch();
  };

  // Quick search effect
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateFilters({ search: quickSearch || undefined });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [quickSearch, updateFilters]);

  // Statistics
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
            Sistema completo de gestão de eventos esportivos com ferramentas avançadas.
          </p>
        </div>
        
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Atualizar</span>
          </Button>
          
          <ExportButtons
            data={selectedEvents.length > 0 
              ? events.filter(e => selectedEvents.includes(e.id))
              : events
            }
            config={exportConfig}
          />
          
          <Button onClick={handleCreateNew} className="bg-[#19c37d] hover:bg-[#16a86c]">
            <Plus className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Novo Evento</span>
          </Button>
        </div>
      </div>

      {/* Quick search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Busca rápida..."
            value={quickSearch}
            onChange={(e) => setQuickSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'table' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('table')}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">eventos cadastrados</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">aguardando aprovação</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aprovados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
            <p className="text-xs text-muted-foreground">prontos para publicação</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.active}</div>
            <p className="text-xs text-muted-foreground">com inscrições abertas</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejeitados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            <p className="text-xs text-muted-foreground">necessitam revisão</p>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Filters */}
      <AdvancedFilters
        filters={filters}
        onFilterChange={updateFilters}
        onClearFilters={clearFilters}
        totalResults={events.length}
        filteredResults={events.length}
      />

      {/* Batch Actions */}
      <BatchActionsBar
        selectedEvents={selectedEvents}
        events={events}
        onSelectAll={handleSelectAll}
        onClearSelection={() => setSelectedEvents([])}
        onBatchApprove={(ids) => handleBatchAction('approve', ids)}
        onBatchReject={(ids) => handleBatchAction('reject', ids)}
        onBatchArchive={(ids) => handleBatchAction('archive', ids)}
        onBatchExport={(ids) => handleBatchAction('export', ids)}
        onBatchDelete={(ids) => handleBatchAction('delete', ids)}
        onBatchClone={(ids) => handleBatchAction('clone', ids)}
      />

      {/* Events Table */}
      <EnhancedEventsTable
        events={events}
        selectedEvents={selectedEvents}
        onSelectEvent={handleSelectEvent}
        onSelectAll={handleSelectAll}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSort={handleSort}
        onApprove={approveEvent}
        onReject={(id) => rejectEvent(id, 'Evento rejeitado pelo administrador')}
        onClone={cloneEvent}
        onDeactivate={deactivateEvent}
        onView={handleView}
        onEdit={handleEdit}
        onManageRegistrations={handleManageRegistrations}
        isLoading={isLoading}
      />

      {/* Dialogs */}
      {selectedEvent && (
        <PreviewFormDialog
          event={selectedEvent}
          isOpen={previewDialog}
          onClose={() => {
            setPreviewDialog(false);
            setSelectedEvent(null);
          }}
        />
      )}

      <TabbedEventDialog
        isOpen={createDialog}
        onClose={() => setCreateDialog(false)}
        mode="create"
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
