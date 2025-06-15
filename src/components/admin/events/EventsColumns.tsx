
import React from 'react';
import { FinanceTableColumn } from '@/components/admin/finance/table/FinanceTableTypes';
import { ExtendedEventForManagement } from '@/types/eventManagement';
import { Badge } from '@/components/ui/badge';

export const getStatusBadge = (status: string) => {
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

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-BR');
};

export const getEventsColumns = (): FinanceTableColumn<ExtendedEventForManagement>[] => [
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
