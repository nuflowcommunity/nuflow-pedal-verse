
import React from 'react';
import { Entity } from '../types';
import { getStatusBadge } from '@/components/admin/finance/FinanceTable';

interface CommonDetailsProps {
  entity: Entity;
}

export const CommonDetails: React.FC<CommonDetailsProps> = ({ entity }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div>
        <h4 className="text-sm font-medium text-gray-600">Parceiro</h4>
        <p className="text-gray-900">{entity.partner}</p>
      </div>
      <div>
        <h4 className="text-sm font-medium text-gray-600">Status</h4>
        <p>{getStatusBadge(entity.status === 'ativo' ? 'Ativo' : entity.status === 'pendente' ? 'Pendente' : 'Cancelado')}</p>
      </div>
      <div>
        <h4 className="text-sm font-medium text-gray-600">Criado em</h4>
        <p className="text-gray-900">{entity.createdAt}</p>
      </div>
    </div>
  );
};
