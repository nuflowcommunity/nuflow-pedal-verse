
import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { FieldStatus } from '../types';

interface FieldIconProps {
  fieldStatus: FieldStatus;
  field: string;
}

export const FieldIcon: React.FC<FieldIconProps> = ({ fieldStatus, field }) => {
  const status = fieldStatus[field];
  if (status === 'valid') return <CheckCircle2 className="w-4 h-4 text-green-500" />;
  if (status === 'invalid') return <AlertCircle className="w-4 h-4 text-red-500" />;
  return null;
};
