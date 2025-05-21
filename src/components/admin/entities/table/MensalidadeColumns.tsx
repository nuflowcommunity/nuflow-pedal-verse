
import React from 'react';
import { FinanceTableColumn } from '@/components/admin/finance/FinanceTable';
import { Entity, MensalidadeEntity } from '../types';
import { getBaseColumns } from './BaseColumns';

// Subscription-specific columns
export const getMensalidadeColumns = (): FinanceTableColumn<Entity>[] => [
  ...getBaseColumns(),
  {
    id: 'duration',
    header: 'Duração',
    accessorKey: 'type' as keyof Entity, // Use a valid key from Entity
    cell: (item: Entity) => {
      if (item.type !== 'mensalidade') return '-';
      const mensalidadeItem = item as MensalidadeEntity;
      return mensalidadeItem.duration || '-';
    },
  },
  {
    id: 'renewalDate',
    header: 'Renovação',
    accessorKey: 'type' as keyof Entity, // Use a valid key from Entity
    cell: (item: Entity) => {
      if (item.type !== 'mensalidade') return '-';
      const mensalidadeItem = item as MensalidadeEntity;
      return mensalidadeItem.renewalDate || '-';
    },
  },
  {
    id: 'includedCredits',
    header: 'Créditos Incluídos',
    accessorKey: 'type' as keyof Entity, // Use a valid key from Entity
    cell: (item: Entity) => {
      if (item.type !== 'mensalidade') return '-';
      const mensalidadeItem = item as MensalidadeEntity;
      return mensalidadeItem.includedCredits !== undefined ? mensalidadeItem.includedCredits : '-';
    }
  }
];
