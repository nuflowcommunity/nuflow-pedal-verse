
import React from 'react';
import { Button } from '@/components/ui/button';
import { DayUseEntity } from '../types';

interface DayUseDetailsProps {
  entity: DayUseEntity;
  toast: any;
}

export const DayUseDetails: React.FC<DayUseDetailsProps> = ({ entity, toast }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500">Validade</h4>
          <p>{entity.validFor || '-'}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Data de Acesso</h4>
          <p>{entity.accessDate || '-'}</p>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Gerenciamento de Day Use</h3>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => toast({
            title: "Gerar QR Code",
            description: "Gerando QR Code para acesso"
          })}>
            Gerar QR Code
          </Button>
          <Button onClick={() => toast({
            title: "Histórico de acessos",
            description: "Visualizando histórico de acessos"
          })}>
            Histórico de acessos
          </Button>
        </div>
      </div>
    </>
  );
};
