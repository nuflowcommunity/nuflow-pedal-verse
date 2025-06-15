
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormData, FieldStatus, Errors } from '../types';
import { FieldIcon } from '../components/FieldIcon';

interface CompanyInfoSectionProps {
  formData: FormData;
  fieldStatus: FieldStatus;
  errors: Errors;
  isSubmitting: boolean;
  onInputChange: (field: string, value: string) => void;
}

export const CompanyInfoSection: React.FC<CompanyInfoSectionProps> = ({
  formData,
  fieldStatus,
  errors,
  isSubmitting,
  onInputChange
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
        Informações da Empresa
      </h3>
      <p className="text-sm text-gray-600 -mt-2">
        Dados básicos sobre sua empresa ou organização
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nomeEmpresa" className="flex items-center gap-1 text-gray-700">
            Nome da Empresa/Parceiro *
            <FieldIcon fieldStatus={fieldStatus} field="nomeEmpresa" />
          </Label>
          <Input
            id="nomeEmpresa"
            value={formData.nomeEmpresa}
            onChange={(e) => onInputChange('nomeEmpresa', e.target.value)}
            placeholder="Ex: Bike Park Serra Verde"
            className={errors.nomeEmpresa ? 'border-red-500' : fieldStatus.nomeEmpresa === 'valid' ? 'border-green-500' : 'border-gray-300'}
            disabled={isSubmitting}
          />
          {errors.nomeEmpresa && <p className="text-red-500 text-sm mt-1">{errors.nomeEmpresa}</p>}
          {!errors.nomeEmpresa && <p className="text-gray-500 text-xs mt-1">Nome completo da empresa ou marca</p>}
        </div>
        
        <div>
          <Label htmlFor="urlPersonalizada" className="flex items-center gap-1 text-gray-700">
            URL Personalizada *
            <FieldIcon fieldStatus={fieldStatus} field="urlPersonalizada" />
          </Label>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-500 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md">
              nuflowpass.com.br/
            </span>
            <Input
              id="urlPersonalizada"
              value={formData.urlPersonalizada}
              onChange={(e) => onInputChange('urlPersonalizada', e.target.value)}
              placeholder="minha-empresa"
              className={`rounded-l-none ${errors.urlPersonalizada ? 'border-red-500' : fieldStatus.urlPersonalizada === 'valid' ? 'border-green-500' : 'border-gray-300'}`}
              disabled={isSubmitting}
            />
          </div>
          {errors.urlPersonalizada && <p className="text-red-500 text-sm mt-1">{errors.urlPersonalizada}</p>}
          {!errors.urlPersonalizada && <p className="text-gray-500 text-xs mt-1">Será sua página personalizada na plataforma</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="cnpj" className="flex items-center gap-1 text-gray-700">
          CNPJ *
          <FieldIcon fieldStatus={fieldStatus} field="cnpj" />
        </Label>
        <Input
          id="cnpj"
          value={formData.cnpj}
          onChange={(e) => onInputChange('cnpj', e.target.value)}
          placeholder="00.000.000/0000-00"
          className={errors.cnpj ? 'border-red-500' : fieldStatus.cnpj === 'valid' ? 'border-green-500' : 'border-gray-300'}
          disabled={isSubmitting}
        />
        {errors.cnpj && <p className="text-red-500 text-sm mt-1">{errors.cnpj}</p>}
        {!errors.cnpj && <p className="text-gray-500 text-xs mt-1">CNPJ da empresa registrada</p>}
      </div>

      <div>
        <Label htmlFor="sobreEmpresa" className="flex items-center gap-1 text-gray-700">
          Sobre a Empresa *
          <FieldIcon fieldStatus={fieldStatus} field="sobreEmpresa" />
        </Label>
        <Textarea
          id="sobreEmpresa"
          value={formData.sobreEmpresa}
          onChange={(e) => onInputChange('sobreEmpresa', e.target.value)}
          placeholder="Descreva sua empresa, histórico, principais atividades oferecidas, diferenciais e experiência no setor. Esta informação será importante para nossa análise..."
          rows={4}
          className={errors.sobreEmpresa ? 'border-red-500' : fieldStatus.sobreEmpresa === 'valid' ? 'border-green-500' : 'border-gray-300'}
          disabled={isSubmitting}
        />
        <div className="flex justify-between items-center mt-1">
          {errors.sobreEmpresa && <p className="text-red-500 text-sm">{errors.sobreEmpresa}</p>}
          <p className="text-gray-500 text-xs ml-auto">
            {formData.sobreEmpresa.length}/50 caracteres mínimos
          </p>
        </div>
      </div>
    </div>
  );
};
