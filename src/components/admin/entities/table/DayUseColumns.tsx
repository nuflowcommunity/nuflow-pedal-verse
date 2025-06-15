
import React from 'react';
import { FinanceTableColumn } from '@/components/admin/finance/FinanceTable';
import { Entity, DayUseEntity } from '../types';
import { getBaseColumns } from './BaseColumns';

// Day Use specific columns
export const getDayUseColumns = (): FinanceTableColumn<Entity>[] => [
  ...getBaseColumns(),
  {
    id: 'validFor',
    header: 'Validade',
    accessorKey: 'type' as keyof Entity,
    cell: (item: Entity) => {
      if (item.type !== 'dayUse') return '-';
      const dayUseItem = item as DayUseEntity;
      return <span className="text-gray-900">{dayUseItem.validFor || '-'}</span>;
    },
  },
  {
    id: 'accessDate',
    header: 'Data de Acesso',
    accessorKey: 'type' as keyof Entity,
    cell: (item: Entity) => {
      if (item.type !== 'dayUse') return '-';
      const dayUseItem = item as DayUseEntity;
      return <span className="text-gray-900">{dayUseItem.accessDate || '-'}</span>;
    }
  }
];
