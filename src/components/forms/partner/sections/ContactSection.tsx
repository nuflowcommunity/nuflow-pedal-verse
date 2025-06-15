
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FormData, FieldStatus, Errors } from '../types';
import { FieldIcon } from '../components/FieldIcon';

interface ContactSectionProps {
  formData: FormData;
  fieldStatus: FieldStatus;
  errors: Errors;
  isSubmitting: boolean;
  onInputChange: (field: string, value: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  formData,
  fieldStatus,
  errors,
  isSubmitting,
  onInputChange
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
        Informações de Contato
      </h3>
      <p className="text-sm text-gray-600 -mt-2">
        Formas de contato para comunicação comercial e suporte
      </p>
      
      <div>
        <Label htmlFor="emailContato" className="flex items-center gap-1">
          E-mail Comercial *
          <FieldIcon fieldStatus={fieldStatus} field="emailContato" />
        </Label>
        <Input
          id="emailContato"
          type="email"
          value={formData.emailContato}
          onChange={(e) => onInputChange('emailContato', e.target.value)}
          placeholder="contato@empresa.com"
          className={errors.emailContato ? 'border-red-500' : fieldStatus.emailContato === 'valid' ? 'border-green-500' : 'border-gray-300'}
          disabled={isSubmitting}
        />
        {errors.emailContato && <p className="text-red-500 text-sm mt-1">{errors.emailContato}</p>}
        {!errors.emailContato && <p className="text-gray-500 text-xs mt-1">E-mail principal para comunicações comerciais</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="telefone1" className="flex items-center gap-1">
            Telefone Principal *
            <FieldIcon fieldStatus={fieldStatus} field="telefone1" />
          </Label>
          <Input
            id="telefone1"
            value={formData.telefone1}
            onChange={(e) => onInputChange('telefone1', e.target.value)}
            placeholder="(11) 99999-9999"
            className={errors.telefone1 ? 'border-red-500' : fieldStatus.telefone1 === 'valid' ? 'border-green-500' : ''}
            disabled={isSubmitting}
          />
          {errors.telefone1 && <p className="text-red-500 text-sm mt-1">{errors.telefone1}</p>}
          {!errors.telefone1 && <p className="text-gray-500 text-xs mt-1">WhatsApp ou telefone comercial</p>}
        </div>
        
        <div>
          <Label htmlFor="telefone2" className="flex items-center gap-1">
            Telefone Secundário
            <FieldIcon fieldStatus={fieldStatus} field="telefone2" />
          </Label>
          <Input
            id="telefone2"
            value={formData.telefone2}
            onChange={(e) => onInputChange('telefone2', e.target.value)}
            placeholder="(11) 99999-9999"
            className={errors.telefone2 ? 'border-red-500' : fieldStatus.telefone2 === 'valid' ? 'border-green-500' : ''}
            disabled={isSubmitting}
          />
          {errors.telefone2 && <p className="text-red-500 text-sm mt-1">{errors.telefone2}</p>}
          {!errors.telefone2 && <p className="text-gray-500 text-xs mt-1">Opcional - Telefone alternativo</p>}
        </div>
      </div>
    </div>
  );
};
