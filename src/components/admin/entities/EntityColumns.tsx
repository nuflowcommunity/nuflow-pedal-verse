
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { FinanceTableColumn } from '@/components/admin/finance/FinanceTable';
import { Entity, EntityType, EventoEntity, MensalidadeEntity, DayUseEntity, CreditoEntity } from './types';
import { entityTypeIcons, getValidationStatusIcon } from './EntityIcons';
import { entityTypeLabels } from './types';
import { getStatusBadge } from '@/components/admin/finance/FinanceTable';

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
  },
  {
    id: 'partner',
    header: 'Parceiro',
    accessorKey: 'partner',
  },
  {
    id: 'name',
    header: 'Nome',
    accessorKey: 'name',
  },
  {
    id: 'status',
    header: 'Status',
    accessorKey: 'status',
    cell: (item: Entity) => getStatusBadge(item.status === 'ativo' ? 'Ativo' : item.status === 'pendente' ? 'Pendente' : 'Cancelado'),
  },
  {
    id: 'price',
    header: 'Preço',
    accessorKey: 'price',
    cell: (item: Entity) => item.price ? `R$ ${item.price.toFixed(2)}` : '-',
  }
];

// Event-specific columns
export const getEventColumns = (): FinanceTableColumn<EventoEntity>[] => [
  ...getBaseColumns(),
  {
    id: 'date',
    header: 'Data',
    accessorKey: 'date',
    cell: (item: EventoEntity) => item.date || '-',
  },
  {
    id: 'capacity',
    header: 'Capacidade',
    accessorKey: 'capacity',
    cell: (item: EventoEntity) => {
      if (item.capacity && item.registrations) {
        const percentage = (item.registrations / item.capacity) * 100;
        return (
          <div className="flex items-center">
            <span className="mr-2">{`${item.registrations}/${item.capacity}`}</span>
            <Badge className={`${percentage > 80 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
              {`${Math.round(percentage)}%`}
            </Badge>
          </div>
        );
      }
      return item.capacity || '-';
    }
  }
];

// Subscription-specific columns
export const getMensalidadeColumns = (): FinanceTableColumn<MensalidadeEntity>[] => [
  ...getBaseColumns(),
  {
    id: 'duration',
    header: 'Duração',
    accessorKey: 'duration',
    cell: (item: MensalidadeEntity) => item.duration || '-',
  },
  {
    id: 'renewalDate',
    header: 'Renovação',
    accessorKey: 'renewalDate',
    cell: (item: MensalidadeEntity) => item.renewalDate || '-',
  },
  {
    id: 'includedCredits',
    header: 'Créditos Incluídos',
    accessorKey: 'includedCredits',
    cell: (item: MensalidadeEntity) => item.includedCredits !== undefined ? item.includedCredits : '-',
  }
];

// Day Use specific columns
export const getDayUseColumns = (): FinanceTableColumn<DayUseEntity>[] => [
  ...getBaseColumns(),
  {
    id: 'validFor',
    header: 'Validade',
    accessorKey: 'validFor',
    cell: (item: DayUseEntity) => item.validFor || '-',
  },
  {
    id: 'accessDate',
    header: 'Data de Acesso',
    accessorKey: 'accessDate',
    cell: (item: DayUseEntity) => item.accessDate || '-',
  }
];

// Credit-specific columns
export const getCreditColumns = (): FinanceTableColumn<CreditoEntity>[] => [
  ...getBaseColumns(),
  {
    id: 'totalCredits',
    header: 'Total de Créditos',
    accessorKey: 'totalCredits',
    cell: (item: CreditoEntity) => item.totalCredits !== undefined ? item.totalCredits : '-',
  },
  {
    id: 'usedCredits',
    header: 'Créditos Usados',
    accessorKey: 'usedCredits',
    cell: (item: CreditoEntity) => {
      if (item.totalCredits !== undefined && item.usedCredits !== undefined) {
        const remaining = item.totalCredits - item.usedCredits;
        const percentage = (item.usedCredits / item.totalCredits) * 100;
        return (
          <div className="flex items-center">
            <span className="mr-2">{`${item.usedCredits}/${item.totalCredits}`}</span>
            <Badge className={`${percentage > 80 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
              {`${remaining} restantes`}
            </Badge>
          </div>
        );
      }
      return item.usedCredits !== undefined ? item.usedCredits : '-';
    }
  },
  {
    id: 'expiryDate',
    header: 'Validade',
    accessorKey: 'expiryDate',
    cell: (item: CreditoEntity) => item.expiryDate || '-',
  },
  {
    id: 'validationStatus',
    header: 'Validação',
    accessorKey: 'validationStatus',
    cell: (item: CreditoEntity) => {
      const status = item.validationStatus;
      if (!status) return '-';
      
      const statusLabels = {
        validated: 'Validado',
        pending: 'Pendente',
        failed: 'Falhou'
      };
      
      const statusColors = {
        validated: 'bg-green-100 text-green-800',
        pending: 'bg-amber-100 text-amber-800',
        failed: 'bg-red-100 text-red-800'
      };
      
      return (
        <div className="flex items-center">
          {getValidationStatusIcon(status)}
          <Badge className={`ml-2 ${statusColors[status]}`}>{statusLabels[status]}</Badge>
        </div>
      );
    }
  }
];

// Get columns based on entity type
export const getTypeSpecificColumns = (
  activeTab: string
): FinanceTableColumn<Entity>[] => {
  switch (activeTab) {
    case 'evento':
      return getEventColumns();
    case 'mensalidade':
      return getMensalidadeColumns();
    case 'dayUse':
      return getDayUseColumns();
    case 'credito':
      return getCreditColumns();
    default:
      return getBaseColumns();
  }
};
