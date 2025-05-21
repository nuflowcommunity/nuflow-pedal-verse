
import React from 'react';
import { Button } from '@/components/ui/button';
import { MensalidadeEntity } from '../types';

interface MensalidadeDetailsProps {
  entity: MensalidadeEntity;
  toast: any;
}

export const MensalidadeDetails: React.FC<MensalidadeDetailsProps> = ({ entity, toast }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500">Duração</h4>
          <p>{entity.duration || '-'}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Renovação</h4>
          <p>{entity.renewalDate || '-'}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Créditos Incluídos</h4>
          <p>{entity.includedCredits !== undefined ? entity.includedCredits : '-'}</p>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Gerenciamento de Mensalidade</h3>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => toast({
            title: "Histórico de cobranças",
            description: "Visualizando histórico de cobranças"
          })}>
            Histórico de cobranças
          </Button>
          <Button onClick={() => toast({
            title: "Gerenciar renovações",
            description: "Abrindo gerenciamento de renovações"
          })}>
            Gerenciar renovações
          </Button>
        </div>
      </div>
    </>
  );
};
