
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { FinanceTableColumn } from '@/components/admin/finance/FinanceTable';
import { Entity, CreditoEntity } from '../types';
import { getValidationStatusIcon } from '../EntityIcons';
import { getBaseColumns } from './BaseColumns';

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
