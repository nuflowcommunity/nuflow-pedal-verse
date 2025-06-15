
import React, { useState } from 'react';
import { useEventManagement } from '@/hooks/useEventManagement';
import { FinanceTableCore } from '@/components/admin/finance/table/FinanceTableCore';
import { FinanceTableColumn } from '@/components/admin/finance/table/FinanceTableTypes';
import { ExtendedEventForManagement } from '@/types/eventManagement';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Download, Check, X, Copy, Power } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const EventsDataTable = () => {
  const { events, isLoading, updateFilters, approveEvent, rejectEvent, cloneEvent, deactivateEvent } = useEventManagement();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Pendente', className: 'bg-yellow-100 text-yellow-800' },
      approved: { label: 'Aprovado', className: 'bg-green-100 text-green-800' },
      rejected: { label: 'Rejeitado', className: 'bg-red-100 text-red-800' },
      active: { label: 'Ativo', className: 'bg-blue-100 text-blue-800' },
      cancelled: { label: 'Cancelado', className: 'bg-gray-100 text-gray-800' },
      completed: { label: 'Concluído', className: 'bg-purple-100 text-purple-800' },
      draft: { label: 'Rascunho', className: 'bg-gray-100 text-gray-600' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const exportEvents = (format: 'csv' | 'excel') => {
    // Implementar exportação real
    const csvContent = events.map(event => ({
      Título: event.title,
      Data: formatDate(event.date),
      Status: event.status,
      Local: event.location,
      Organizador: event.organizer || '-'
    }));

    if (format === 'csv') {
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
    }
  };

  const columns: FinanceTableColumn<ExtendedEventForManagement>[] = [
    {
      id: 'title',
      header: 'Evento',
      accessorKey: 'title',
      sortable: true,
      cell: (event) => (
        <div className="space-y-1">
          <div className="font-medium text-gray-900">{event.title}</div>
          <div className="text-sm text-gray-500">{event.short_description}</div>
        </div>
      )
    },
    {
      id: 'date',
      header: 'Data',
      accessorKey: 'date',
      sortable: true,
      cell: (event) => (
        <div className="text-sm text-gray-900">{formatDate(event.date)}</div>
      )
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      sortable: true,
      cell: (event) => getStatusBadge(event.status)
    },
    {
      id: 'location',
      header: 'Local',
      accessorKey: 'location',
      cell: (event) => (
        <div className="text-sm text-gray-900">{event.city ? `${event.city}, ${event.state}` : event.location}</div>
      )
    },
    {
      id: 'organizer',
      header: 'Organizador',
      accessorKey: 'organizer',
      cell: (event) => (
        <div className="text-sm text-gray-900">{event.organizer || '-'}</div>
      )
    }
  ];

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    updateFilters({ search: value });
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
    updateFilters({ status: value === 'all' ? undefined : value });
  };

  const filters = (
    <div className="flex gap-4">
      <Input
        placeholder="Buscar eventos..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        className="max-w-sm"
      />
      <Select value={statusFilter} onValueChange={handleStatusFilter}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="pending">Pendente</SelectItem>
          <SelectItem value="approved">Aprovado</SelectItem>
          <SelectItem value="active">Ativo</SelectItem>
          <SelectItem value="rejected">Rejeitado</SelectItem>
          <SelectItem value="cancelled">Cancelado</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="outline" onClick={() => exportEvents('csv')}>
        <Download className="h-4 w-4 mr-2" />
        CSV
      </Button>
    </div>
  );

  const actions = (item: ExtendedEventForManagement) => ({
    view: true,
    custom: [
      ...(item.status === 'pending' ? [
        {
          label: 'Aprovar',
          icon: <Check className="h-4 w-4" />,
          onClick: () => approveEvent(item.id)
        },
        {
          label: 'Rejeitar',
          icon: <X className="h-4 w-4" />,
          onClick: () => rejectEvent(item.id, 'Rejeitado pelo administrador')
        }
      ] : []),
      {
        label: 'Editar',
        icon: <Edit className="h-4 w-4" />,
        onClick: () => console.log('Edit event', item.id)
      },
      {
        label: 'Clonar',
        icon: <Copy className="h-4 w-4" />,
        onClick: () => cloneEvent(item.id)
      },
      {
        label: 'Desativar',
        icon: <Power className="h-4 w-4" />,
        onClick: () => deactivateEvent(item.id)
      }
    ]
  });

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-gray-500">Carregando eventos...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <FinanceTableCore
      title="Gerenciamento de Eventos"
      columns={columns}
      data={events}
      filters={filters}
      actions={actions}
      emptyState={
        <div className="text-center py-8 text-gray-500">
          Nenhum evento encontrado
        </div>
      }
    />
  );
};

export default EventsDataTable;
