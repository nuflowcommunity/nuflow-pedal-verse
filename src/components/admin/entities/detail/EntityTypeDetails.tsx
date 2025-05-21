
import React from 'react';
import { Entity, EventoEntity, MensalidadeEntity, DayUseEntity, CreditoEntity } from '../types';
import { EventoDetails } from './EventoDetails';
import { MensalidadeDetails } from './MensalidadeDetails';
import { DayUseDetails } from './DayUseDetails';
import { CreditoDetails } from './CreditoDetails';

interface EntityTypeDetailsProps {
  entity: Entity;
  toast: any;
}

export const EntityTypeDetails: React.FC<EntityTypeDetailsProps> = ({ entity, toast }) => {
  switch (entity.type) {
    case 'evento':
      return <EventoDetails entity={entity as EventoEntity} toast={toast} />;
    case 'mensalidade':
      return <MensalidadeDetails entity={entity as MensalidadeEntity} toast={toast} />;
    case 'dayUse':
      return <DayUseDetails entity={entity as DayUseEntity} toast={toast} />;
    case 'credito':
      return <CreditoDetails entity={entity as CreditoEntity} toast={toast} />;
    default:
      return null;
  }
};
