
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
    accessorKey: 'type' as keyof Entity, // Use a valid key from Entity
    cell: (item: Entity) => {
      if (item.type !== 'dayUse') return '-';
      const dayUseItem = item as DayUseEntity;
      return dayUseItem.validFor || '-';
    },
  },
  {
    id: 'accessDate',
    header: 'Data de Acesso',
    accessorKey: 'type' as keyof Entity, // Use a valid key from Entity
    cell: (item: Entity) => {
      if (item.type !== 'dayUse') return '-';
      const dayUseItem = item as DayUseEntity;
      return dayUseItem.accessDate || '-';
    }
  }
];
