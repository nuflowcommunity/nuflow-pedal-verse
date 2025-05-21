
import { Entity } from './types';

// Mock data for development and testing
export const mockEntities: Entity[] = [
  { 
    id: '1', 
    type: 'evento', 
    partner: 'Bike Park SP', 
    name: 'Downhill Experience', 
    status: 'ativo', 
    createdAt: '2025-01-15', 
    price: 120.00, 
    capacity: 30,
    date: '2025-06-15',
    location: 'São Paulo, SP',
    registrations: 12
  },
  { 
    id: '2', 
    type: 'evento', 
    partner: 'Trilhas da Serra', 
    name: 'Trilha Pico do Jaraguá', 
    status: 'ativo', 
    createdAt: '2025-02-20', 
    price: 85.00, 
    capacity: 20,
    date: '2025-07-01',
    location: 'São Paulo, SP',
    registrations: 8
  },
  { 
    id: '3', 
    type: 'mensalidade', 
    partner: 'Clube MTB', 
    name: 'Plano Premium', 
    status: 'ativo', 
    createdAt: '2025-01-01', 
    price: 99.90, 
    duration: 'Mensal',
    renewalDate: '2025-06-01',
    includedCredits: 4
  },
  { 
    id: '4', 
    type: 'mensalidade', 
    partner: 'Clube MTB', 
    name: 'Plano Básico', 
    status: 'ativo', 
    createdAt: '2025-01-01', 
    price: 49.90, 
    duration: 'Mensal',
    renewalDate: '2025-06-01',
    includedCredits: 2
  },
  { 
    id: '5', 
    type: 'dayUse', 
    partner: 'Bike Park SP', 
    name: 'Acesso Diário', 
    status: 'ativo', 
    createdAt: '2025-01-10', 
    price: 40.00,
    validFor: '1 dia',
    accessDate: '2025-06-10'
  },
  { 
    id: '6', 
    type: 'dayUse', 
    partner: 'Trilhas da Serra', 
    name: 'Day Pass', 
    status: 'pendente', 
    createdAt: '2025-03-05', 
    price: 35.00,
    validFor: '1 dia',
    accessDate: '2025-06-15'
  },
  { 
    id: '7', 
    type: 'credito', 
    partner: 'Clube MTB', 
    name: 'Créditos de Aulas', 
    status: 'ativo', 
    createdAt: '2025-02-10', 
    price: 200.00,
    totalCredits: 10,
    usedCredits: 3,
    expiryDate: '2025-12-31',
    validationStatus: 'validated'
  },
  { 
    id: '8', 
    type: 'credito', 
    partner: 'Bike Park SP', 
    name: 'Pacote 10 Acessos', 
    status: 'cancelado', 
    createdAt: '2024-12-01', 
    price: 300.00,
    totalCredits: 10,
    usedCredits: 2,
    expiryDate: '2025-11-30',
    validationStatus: 'pending'
  },
  { 
    id: '9', 
    type: 'evento', 
    partner: 'Pedal Urbano', 
    name: 'Night Ride SP', 
    status: 'cancelado', 
    createdAt: '2025-02-28', 
    price: 50.00, 
    capacity: 50,
    date: '2025-05-10',
    location: 'São Paulo, SP',
    registrations: 0
  },
  { 
    id: '10', 
    type: 'mensalidade', 
    partner: 'Bike Shop Pro', 
    name: 'Clube de Descontos', 
    status: 'pendente', 
    createdAt: '2025-03-01', 
    price: 29.90, 
    duration: 'Mensal',
    renewalDate: '2025-06-01',
    includedCredits: 0
  },
  {
    id: '11',
    type: 'credito',
    partner: 'Bike Park SP',
    name: 'Pacote de créditos promocional',
    status: 'ativo',
    createdAt: '2025-04-15',
    price: 150.00,
    totalCredits: 5,
    usedCredits: 0,
    expiryDate: '2025-10-15',
    validationStatus: 'failed'
  }
];
