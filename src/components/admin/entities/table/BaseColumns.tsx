
import React from 'react';
import { FinanceTableColumn } from '@/components/admin/finance/table/FinanceTableTypes';
import { Entity } from '../types';
import { entityTypeIcons } from '../EntityIcons';
import { entityTypeLabels } from '../types';
import { getStatusBadge } from '@/components/admin/finance/table/StatusBadge';
import { renderSalesLast24hCell, renderSalesMonthlyhCell, renderSalesTotalCell } from './FormatUtils';

// Base columns for all entity types
export const getBaseColumns = (): FinanceTableColumn<Entity>[] => [
  {
    id: 'type',
    header: 'Tipo',
    accessorKey: 'type',
    cell: (item: Entity) => (
      <div className="flex items-center">
        {entityTypeIcons[item.type]}
        <span>{entityTypeLabels[item.type]}</span>
      </div>
    ),
    sortable: true,
  },
  {
    id: 'partner',
    header: 'Parceiro',
    accessorKey: 'partner',
    sortable: true,
  },
  {
    id: 'name',
    header: 'Nome',
    accessorKey: 'name',
    sortable: true,
  },
  {
    id: 'status',
    header: 'Status',
    accessorKey: 'status',
    cell: (item: Entity) => getStatusBadge(item.status === 'ativo' ? 'Ativo' : item.status === 'pendente' ? 'Pendente' : 'Cancelado'),
    sortable: true,
  },
  {
    id: 'price',
    header: 'Preço',
    accessorKey: 'price',
    cell: (item: Entity) => item.price ? `R$ ${item.price.toFixed(2)}` : '-',
    sortable: true,
  },
  // Enhanced financial columns with sorting
  {
    id: 'salesLast24h',
    header: 'Venda das últimas 24h',
    accessorKey: 'salesLast24h',
    cell: renderSalesLast24hCell,
    sortable: true,
  },
  {
    id: 'salesMonthly',
    header: 'Venda do total mensal',
    accessorKey: 'salesMonthly',
    cell: renderSalesMonthlyhCell,
    sortable: true,
  },
  {
    id: 'salesTotal',
    header: 'Somando tudo',
    accessorKey: 'salesTotal',
    cell: renderSalesTotalCell,
    sortable: true,
  }
];
