
import React from 'react';
import { Button } from '@/components/ui/button';
import { CreditoEntity } from '../types';
import { getValidationStatusIcon } from '../EntityIcons';

interface CreditoDetailsProps {
  entity: CreditoEntity;
  toast: any;
}

export const CreditoDetails: React.FC<CreditoDetailsProps> = ({ entity, toast }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500">Total de Créditos</h4>
          <p>{entity.totalCredits !== undefined ? entity.totalCredits : '-'}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Créditos Usados</h4>
          <p>{entity.usedCredits !== undefined ? entity.usedCredits : '-'}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Validade</h4>
          <p>{entity.expiryDate || '-'}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Status de Validação</h4>
          <div className="flex items-center">
            {getValidationStatusIcon(entity.validationStatus)}
            <span className="ml-2">
              {entity.validationStatus === 'validated' ? 'Validado' : 
               entity.validationStatus === 'pending' ? 'Pendente' : 
               entity.validationStatus === 'failed' ? 'Falhou' : '-'}
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Gerenciamento de Créditos</h3>
        <div className="flex space-x-2">
          <Button 
            variant="outline"
            className={entity.validationStatus === 'validated' ? 'bg-green-100' : ''}
            onClick={() => toast({
              title: "Validar créditos",
              description: "Abrindo validação de créditos via QR Code"
            })}
          >
            {entity.validationStatus === 'validated' ? 'Revalidar' : 'Validar créditos'}
          </Button>
          <Button onClick={() => toast({
            title: "Histórico de uso",
            description: "Visualizando histórico de uso de créditos"
          })}>
            Histórico de uso
          </Button>
        </div>
      </div>
    </>
  );
};
