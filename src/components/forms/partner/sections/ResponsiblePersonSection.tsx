
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FormData, FieldStatus, Errors } from '../types';
import { FieldIcon } from '../components/FieldIcon';

interface ResponsiblePersonSectionProps {
  formData: FormData;
  fieldStatus: FieldStatus;
  errors: Errors;
  isSubmitting: boolean;
  onInputChange: (field: string, value: string) => void;
}

export const ResponsiblePersonSection: React.FC<ResponsiblePersonSectionProps> = ({
  formData,
  fieldStatus,
  errors,
  isSubmitting,
  onInputChange
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
        Responsável Legal/Comercial
      </h3>
      <p className="text-sm text-gray-600 -mt-2">
        Dados da pessoa responsável pela empresa e assinatura de contratos
      </p>
      
      <div>
        <Label htmlFor="nomeResponsavel" className="flex items-center gap-1 text-gray-700">
          Nome Completo do Responsável *
          <FieldIcon fieldStatus={fieldStatus} field="nomeResponsavel" />
        </Label>
        <Input
          id="nomeResponsavel"
          value={formData.nomeResponsavel}
          onChange={(e) => onInputChange('nomeResponsavel', e.target.value)}
          placeholder="João Silva Santos"
          className={errors.nomeResponsavel ? 'border-red-500' : fieldStatus.nomeResponsavel === 'valid' ? 'border-green-500' : 'border-gray-300'}
          disabled={isSubmitting}
        />
        {errors.nomeResponsavel && <p className="text-red-500 text-sm mt-1">{errors.nomeResponsavel}</p>}
        {!errors.nomeResponsavel && <p className="text-gray-500 text-xs mt-1">Sócio, proprietário ou responsável legal</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="cpfResponsavel" className="flex items-center gap-1 text-gray-700">
            CPF do Responsável *
            <FieldIcon fieldStatus={fieldStatus} field="cpfResponsavel" />
          </Label>
          <Input
            id="cpfResponsavel"
            value={formData.cpfResponsavel}
            onChange={(e) => onInputChange('cpfResponsavel', e.target.value)}
            placeholder="000.000.000-00"
            className={errors.cpfResponsavel ? 'border-red-500' : fieldStatus.cpfResponsavel === 'valid' ? 'border-green-500' : 'border-gray-300'}
            disabled={isSubmitting}
          />
          {errors.cpfResponsavel && <p className="text-red-500 text-sm mt-1">{errors.cpfResponsavel}</p>}
          {!errors.cpfResponsavel && <p className="text-gray-500 text-xs mt-1">Para formalização do contrato</p>}
        </div>
        
        <div>
          <Label htmlFor="contatoResponsavel" className="flex items-center gap-1 text-gray-700">
            Contato Direto do Responsável *
            <FieldIcon fieldStatus={fieldStatus} field="contatoResponsavel" />
          </Label>
          <Input
            id="contatoResponsavel"
            value={formData.contatoResponsavel}
            onChange={(e) => onInputChange('contatoResponsavel', e.target.value)}
            placeholder="(11) 99999-9999"
            className={errors.contatoResponsavel ? 'border-red-500' : fieldStatus.contatoResponsavel === 'valid' ? 'border-green-500' : 'border-gray-300'}
            disabled={isSubmitting}
          />
          {errors.contatoResponsavel && <p className="text-red-500 text-sm mt-1">{errors.contatoResponsavel}</p>}
          {!errors.contatoResponsavel && <p className="text-gray-500 text-xs mt-1">WhatsApp preferencial para contato direto</p>}
        </div>
      </div>
    </div>
  );
};
