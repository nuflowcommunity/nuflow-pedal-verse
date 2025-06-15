
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
    accessorKey: 'type' as keyof Entity,
    cell: (item: Entity) => {
      if (item.type !== 'mensalidade') return '-';
      const mensalidadeItem = item as MensalidadeEntity;
      return <span className="text-gray-900">{mensalidadeItem.duration || '-'}</span>;
    },
  },
  {
    id: 'renewalDate',
    header: 'Renovação',
    accessorKey: 'type' as keyof Entity,
    cell: (item: Entity) => {
      if (item.type !== 'mensalidade') return '-';
      const mensalidadeItem = item as MensalidadeEntity;
      return <span className="text-gray-900">{mensalidadeItem.renewalDate || '-'}</span>;
    },
  },
  {
    id: 'includedCredits',
    header: 'Créditos Incluídos',
    accessorKey: 'type' as keyof Entity,
    cell: (item: Entity) => {
      if (item.type !== 'mensalidade') return '-';
      const mensalidadeItem = item as MensalidadeEntity;
      return <span className="text-gray-900">{mensalidadeItem.includedCredits !== undefined ? mensalidadeItem.includedCredits : '-'}</span>;
    }
  }
];
