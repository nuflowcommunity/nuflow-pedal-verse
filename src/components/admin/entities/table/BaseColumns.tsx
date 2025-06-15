
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FinanceTableColumn } from '@/components/admin/finance/table/FinanceTableTypes';
import { Entity } from '../types';
import { entityTypeIcons } from '../EntityIcons';
import { entityTypeLabels } from '../types';
import { getStatusBadge } from '@/components/admin/finance/table/StatusBadge';
import { renderSalesLast24hCell, renderSalesMonthlyhCell, renderSalesTotalCell } from './FormatUtils';

// Base columns for all entity types
export const getBaseColumns = (): FinanceTableColumn<Entity>[] => {
  const navigate = useNavigate();
  
  return [
    {
      id: 'type',
      header: 'Tipo',
      accessorKey: 'type',
      cell: (item: Entity) => (
        <div className="flex items-center text-gray-900">
          {entityTypeIcons[item.type]}
          <span className="text-gray-900">{entityTypeLabels[item.type]}</span>
        </div>
      ),
      sortable: true,
    },
    {
      id: 'partner',
      header: 'Parceiro',
      accessorKey: 'partner',
      cell: (item: Entity) => <span className="text-gray-900">{item.partner}</span>,
      sortable: true,
    },
    {
      id: 'name',
      header: 'Nome',
      accessorKey: 'name',
      cell: (item: Entity) => <span className="text-gray-900">{item.name}</span>,
      sortable: true,
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      cell: (item: Entity) => getStatusBadge(item.status === 'ativo' ? 'Ativo' : item.status === 'pendente' ? 'Pendente' : 'Cancelado'),
      sortable: true,
    },
    // Enhanced financial columns with sorting
    {
      id: 'salesLast24h',
      header: 'Venda das últimas 24h',
      accessorKey: 'salesLast24h',
      cell: (item: Entity) => (
        <div 
          className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md transition-colors" 
          onClick={(e) => {
            e.stopPropagation();
            navigate('/admin/financeiro/dashboard/last-24h');
          }}
        >
          {renderSalesLast24hCell(item)}
        </div>
      ),
      sortable: true,
    },
    {
      id: 'salesMonthly',
      header: 'Venda do total mensal',
      accessorKey: 'salesMonthly',
      cell: (item: Entity) => (
        <div 
          className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md transition-colors" 
          onClick={(e) => {
            e.stopPropagation();
            navigate('/admin/financeiro/dashboard/monthly');
          }}
        >
          {renderSalesMonthlyhCell(item)}
        </div>
      ),
      sortable: true,
    },
    {
      id: 'salesTotal',
      header: 'Somando tudo',
      accessorKey: 'salesTotal',
      cell: (item: Entity) => (
        <div 
          className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md transition-colors" 
          onClick={(e) => {
            e.stopPropagation();
            navigate('/admin/financeiro/dashboard/total');
          }}
        >
          {renderSalesTotalCell(item)}
        </div>
      ),
      sortable: true,
    }
  ];
};
