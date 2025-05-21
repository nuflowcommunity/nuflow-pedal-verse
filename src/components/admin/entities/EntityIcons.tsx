
import React from 'react';
import { Calendar, Clock, Users, CreditCard, CheckCircle, Clock as ClockIcon, AlertTriangle } from 'lucide-react';
import { EntityType, ValidationStatus } from './types';

// Icons for each entity type
export const entityTypeIcons: Record<EntityType, React.ReactNode> = {
  evento: <Calendar className="h-4 w-4 mr-2" />,
  mensalidade: <Clock className="h-4 w-4 mr-2" />,
  dayUse: <Users className="h-4 w-4 mr-2" />,
  credito: <CreditCard className="h-4 w-4 mr-2" />
};

// Function to get validation status icon
export const getValidationStatusIcon = (status?: ValidationStatus) => {
  if (!status) return null;
  
  switch (status) {
    case 'validated':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'pending':
      return <ClockIcon className="h-4 w-4 text-amber-500" />;
    case 'failed':
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    default:
      return null;
  }
};
