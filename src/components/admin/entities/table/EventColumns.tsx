
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { FinanceTableColumn } from '@/components/admin/finance/FinanceTable';
import { Entity, EventoEntity } from '../types';
import { getBaseColumns } from './BaseColumns';

// Event-specific columns
export const getEventColumns = (): FinanceTableColumn<Entity>[] => [
  ...getBaseColumns(),
  {
    id: 'date',
    header: 'Data',
    accessorKey: 'type' as keyof Entity, // Use a valid key from Entity
    cell: (item: Entity) => {
      if (item.type !== 'evento') return '-';
      const eventoItem = item as EventoEntity;
      return eventoItem.date || '-';
    },
  },
  {
    id: 'capacity',
    header: 'Capacidade',
    accessorKey: 'type' as keyof Entity, // Use a valid key from Entity
    cell: (item: Entity) => {
      if (item.type !== 'evento') return '-';
      const eventoItem = item as EventoEntity;
      
      if (eventoItem.capacity && eventoItem.registrations) {
        const percentage = (eventoItem.registrations / eventoItem.capacity) * 100;
        return (
          <div className="flex items-center">
            <span className="mr-2">{`${eventoItem.registrations}/${eventoItem.capacity}`}</span>
            <Badge className={`${percentage > 80 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
              {`${Math.round(percentage)}%`}
            </Badge>
          </div>
        );
      }
      return eventoItem.capacity || '-';
    }
  }
];
