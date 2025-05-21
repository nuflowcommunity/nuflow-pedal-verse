
import React from 'react';
import { Button } from '@/components/ui/button';
import { EventoEntity } from '../types';

interface EventoDetailsProps {
  entity: EventoEntity;
  toast: any;
}

export const EventoDetails: React.FC<EventoDetailsProps> = ({ entity, toast }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500">Data</h4>
          <p>{entity.date || '-'}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Local</h4>
          <p>{entity.location || '-'}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Capacidade</h4>
          <p>{entity.capacity || '-'}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Inscritos</h4>
          <p>{entity.registrations || '0'}</p>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Gerenciamento de Inscrições</h3>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => toast({
            title: "Exportar lista",
            description: "Exportando lista de inscritos"
          })}>
            Exportar lista
          </Button>
          <Button onClick={() => toast({
            title: "Gerenciar inscrições",
            description: "Abrindo gerenciamento de inscrições"
          })}>
            Gerenciar inscrições
          </Button>
        </div>
      </div>
    </>
  );
};
