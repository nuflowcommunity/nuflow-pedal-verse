import React from 'react';
import { Badge } from '@/components/ui/badge';
import { FinanceTableColumn } from '@/components/admin/finance/FinanceTable';
import { Entity, EntityType, EventoEntity, MensalidadeEntity, DayUseEntity, CreditoEntity } from './types';
import { entityTypeIcons, getValidationStatusIcon } from './EntityIcons';
import { entityTypeLabels } from './types';
import { getStatusBadge } from '@/components/admin/finance/FinanceTable';
import { DollarSign, CalendarDays, PiggyBank } from 'lucide-react';

// Currency formatter
const formatCurrency = (value: number | undefined) => {
  if (value === undefined) return '-';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

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
    cell: (item: Entity) => (
      <div className="flex items-center">
        <DollarSign className="h-4 w-4 mr-1 text-green-500" />
        <span>{formatCurrency(item.salesLast24h)}</span>
      </div>
    ),
    sortable: true,
  },
  {
    id: 'salesMonthly',
    header: 'Venda do total mensal',
    accessorKey: 'salesMonthly',
    cell: (item: Entity) => (
      <div className="flex items-center">
        <CalendarDays className="h-4 w-4 mr-1 text-blue-500" />
        <span>{formatCurrency(item.salesMonthly)}</span>
      </div>
    ),
    sortable: true,
  },
  {
    id: 'salesTotal',
    header: 'Somando tudo',
    accessorKey: 'salesTotal',
    cell: (item: Entity) => (
      <div className="flex items-center">
        <PiggyBank className="h-4 w-4 mr-1 text-purple-500" />
        <span>{formatCurrency(item.salesTotal)}</span>
      </div>
    ),
    sortable: true,
  }
];

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

// Credit-specific columns
export const getCreditColumns = (): FinanceTableColumn<Entity>[] => [
  ...getBaseColumns(),
  {
    id: 'totalCredits',
    header: 'Total de Créditos',
    accessorKey: 'type' as keyof Entity, // Use a valid key from Entity
    cell: (item: Entity) => {
      if (item.type !== 'credito') return '-';
      const creditoItem = item as CreditoEntity;
      return creditoItem.totalCredits !== undefined ? creditoItem.totalCredits : '-';
    },
  },
  {
    id: 'usedCredits',
    header: 'Créditos Usados',
    accessorKey: 'type' as keyof Entity, // Use a valid key from Entity
    cell: (item: Entity) => {
      if (item.type !== 'credito') return '-';
      const creditoItem = item as CreditoEntity;
      
      if (creditoItem.totalCredits !== undefined && creditoItem.usedCredits !== undefined) {
        const remaining = creditoItem.totalCredits - creditoItem.usedCredits;
        const percentage = (creditoItem.usedCredits / creditoItem.totalCredits) * 100;
        return (
          <div className="flex items-center">
            <span className="mr-2">{`${creditoItem.usedCredits}/${creditoItem.totalCredits}`}</span>
            <Badge className={`${percentage > 80 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
              {`${remaining} restantes`}
            </Badge>
          </div>
        );
      }
      return creditoItem.usedCredits !== undefined ? creditoItem.usedCredits : '-';
    }
  },
  {
    id: 'expiryDate',
    header: 'Validade',
    accessorKey: 'type' as keyof Entity, // Use a valid key from Entity
    cell: (item: Entity) => {
      if (item.type !== 'credito') return '-';
      const creditoItem = item as CreditoEntity;
      return creditoItem.expiryDate || '-';
    },
  },
  {
    id: 'validationStatus',
    header: 'Validação',
    accessorKey: 'type' as keyof Entity, // Use a valid key from Entity
    cell: (item: Entity) => {
      if (item.type !== 'credito') return '-';
      const creditoItem = item as CreditoEntity;
      const status = creditoItem.validationStatus;
      
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
