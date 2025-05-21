
// Entity type definitions
export type EntityType = 'evento' | 'mensalidade' | 'dayUse' | 'credito';
export type EntityStatus = 'ativo' | 'pendente' | 'cancelado';
export type ValidationStatus = 'validated' | 'pending' | 'failed';

// Base entity interface
export interface BaseEntity {
  id: string;
  type: EntityType;
  partner: string;
  name: string;
  status: EntityStatus;
  createdAt: string;
  price?: number;
}

// Type-specific entity interfaces
export interface EventoEntity extends BaseEntity {
  type: 'evento';
  capacity?: number;
  date?: string;
  location?: string;
  registrations?: number;
}

export interface MensalidadeEntity extends BaseEntity {
  type: 'mensalidade';
  duration?: string;
  renewalDate?: string;
  includedCredits?: number;
}

export interface DayUseEntity extends BaseEntity {
  type: 'dayUse';
  validFor?: string;
  accessDate?: string;
}

export interface CreditoEntity extends BaseEntity {
  type: 'credito';
  totalCredits?: number;
  usedCredits?: number;
  expiryDate?: string;
  validationStatus?: ValidationStatus;
}

// Union type for all entity types
export type Entity = EventoEntity | MensalidadeEntity | DayUseEntity | CreditoEntity;

// Labels for entity types
export const entityTypeLabels: Record<EntityType, string> = {
  evento: 'Evento',
  mensalidade: 'Mensalidade',
  dayUse: 'Day Use',
  credito: 'Crédito'
};
