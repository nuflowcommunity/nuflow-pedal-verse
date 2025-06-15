
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormData, FieldStatus, Errors } from '../types';
import { FieldIcon } from '../components/FieldIcon';
import { estadosBrasil } from '../data/constants';

interface AddressSectionProps {
  formData: FormData;
  fieldStatus: FieldStatus;
  errors: Errors;
  isSubmitting: boolean;
  onInputChange: (field: string, value: string) => void;
}

export const AddressSection: React.FC<AddressSectionProps> = ({
  formData,
  fieldStatus,
  errors,
  isSubmitting,
  onInputChange
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
        Endereço e Localização
      </h3>
      <p className="text-sm text-gray-600 -mt-2">
        Endereço completo da sede ou local principal de operação
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="cep" className="flex items-center gap-1">
            CEP *
            <FieldIcon fieldStatus={fieldStatus} field="cep" />
          </Label>
          <Input
            id="cep"
            value={formData.cep}
            onChange={(e) => onInputChange('cep', e.target.value)}
            placeholder="00000-000"
            className={errors.cep ? 'border-red-500' : fieldStatus.cep === 'valid' ? 'border-green-500' : ''}
            disabled={isSubmitting}
          />
          {errors.cep && <p className="text-red-500 text-sm mt-1">{errors.cep}</p>}
        </div>
        
        <div>
          <Label htmlFor="estado">Estado (UF) *</Label>
          <Select 
            value={formData.estado} 
            onValueChange={(value) => onInputChange('estado', value)}
            disabled={isSubmitting}
          >
            <SelectTrigger className={errors.estado ? 'border-red-500' : ''}>
              <SelectValue placeholder="Selecione o estado..." />
            </SelectTrigger>
            <SelectContent>
              {estadosBrasil.map(estado => (
                <SelectItem key={estado.value} value={estado.value}>
                  {estado.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.estado && <p className="text-red-500 text-sm mt-1">{errors.estado}</p>}
        </div>
        
        <div>
          <Label htmlFor="cidade" className="flex items-center gap-1">
            Cidade *
            <FieldIcon fieldStatus={fieldStatus} field="cidade" />
          </Label>
          <Input
            id="cidade"
            value={formData.cidade}
            onChange={(e) => onInputChange('cidade', e.target.value)}
            placeholder="Ex: São Paulo"
            className={errors.cidade ? 'border-red-500' : fieldStatus.cidade === 'valid' ? 'border-green-500' : ''}
            disabled={isSubmitting}
          />
          {errors.cidade && <p className="text-red-500 text-sm mt-1">{errors.cidade}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="logradouro" className="flex items-center gap-1">
          Logradouro (Rua/Avenida) *
          <FieldIcon fieldStatus={fieldStatus} field="logradouro" />
        </Label>
        <Input
          id="logradouro"
          value={formData.logradouro}
          onChange={(e) => onInputChange('logradouro', e.target.value)}
          placeholder="Ex: Rua das Flores, Avenida Paulista"
          className={errors.logradouro ? 'border-red-500' : fieldStatus.logradouro === 'valid' ? 'border-green-500' : ''}
          disabled={isSubmitting}
        />
        {errors.logradouro && <p className="text-red-500 text-sm mt-1">{errors.logradouro}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="numero" className="flex items-center gap-1">
            Número *
            <FieldIcon fieldStatus={fieldStatus} field="numero" />
          </Label>
          <Input
            id="numero"
            value={formData.numero}
            onChange={(e) => onInputChange('numero', e.target.value)}
            placeholder="123 ou 123A"
            className={errors.numero ? 'border-red-500' : fieldStatus.numero === 'valid' ? 'border-green-500' : ''}
            disabled={isSubmitting}
          />
          {errors.numero && <p className="text-red-500 text-sm mt-1">{errors.numero}</p>}
        </div>
        
        <div>
          <Label htmlFor="bairro" className="flex items-center gap-1">
            Bairro *
            <FieldIcon fieldStatus={fieldStatus} field="bairro" />
          </Label>
          <Input
            id="bairro"
            value={formData.bairro}
            onChange={(e) => onInputChange('bairro', e.target.value)}
            placeholder="Ex: Centro, Vila Madalena"
            className={errors.bairro ? 'border-red-500' : fieldStatus.bairro === 'valid' ? 'border-green-500' : ''}
            disabled={isSubmitting}
          />
          {errors.bairro && <p className="text-red-500 text-sm mt-1">{errors.bairro}</p>}
        </div>
        
        <div>
          <Label htmlFor="complemento">Complemento</Label>
          <Input
            id="complemento"
            value={formData.complemento}
            onChange={(e) => onInputChange('complemento', e.target.value)}
            placeholder="Apto 101, Bloco A, Sala 203..."
            disabled={isSubmitting}
          />
          <p className="text-gray-500 text-xs mt-1">Opcional - Apartamento, sala, etc.</p>
        </div>
      </div>
    </div>
  );
};
