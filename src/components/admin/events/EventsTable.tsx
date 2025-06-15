
import React from 'react';
import { FinanceTableCore } from '@/components/admin/finance/table/FinanceTableCore';
import { ExtendedEventForManagement } from '@/types/eventManagement';
import { getEventsColumns } from './EventsColumns';
import { Card, CardContent } from '@/components/ui/card';
import { Check, X, Edit, Copy, Power } from 'lucide-react';

interface EventsTableProps {
  events: ExtendedEventForManagement[];
  isLoading: boolean;
  filters: React.ReactNode;
  onApprove: (eventId: string) => void;
  onReject: (eventId: string, reason: string) => void;
  onClone: (eventId: string) => void;
  onDeactivate: (eventId: string) => void;
}

const EventsTable = ({ 
  events, 
  isLoading, 
  filters, 
  onApprove, 
  onReject, 
  onClone, 
  onDeactivate 
}: EventsTableProps) => {
  const columns = getEventsColumns();

  const actions = (item: ExtendedEventForManagement) => ({
    view: true,
    custom: [
      ...(item.status === 'pending' ? [
        {
          label: 'Aprovar',
          icon: <Check className="h-4 w-4" />,
          onClick: () => onApprove(item.id)
        },
        {
          label: 'Rejeitar',
          icon: <X className="h-4 w-4" />,
          onClick: () => onReject(item.id, 'Rejeitado pelo administrador')
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
        onClick: () => onClone(item.id)
      },
      {
        label: 'Desativar',
        icon: <Power className="h-4 w-4" />,
        onClick: () => onDeactivate(item.id)
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

export default EventsTable;
