
import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FormData, Errors } from '../types';

interface PartnerTypeSectionProps {
  formData: FormData;
  errors: Errors;
  isSubmitting: boolean;
  onInputChange: (field: string, value: string) => void;
}

export const PartnerTypeSection: React.FC<PartnerTypeSectionProps> = ({
  formData,
  errors,
  isSubmitting,
  onInputChange
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
        Tipo de Parceiro
      </h3>
      <p className="text-sm text-gray-600 -mt-2">
        Selecione o tipo que melhor descreve seu negócio
      </p>
      
      <div>
        <Label className="flex items-center gap-1">
          Tipo de Parceiro *
        </Label>
        <RadioGroup 
          value={formData.tipoParceiro} 
          onValueChange={(value) => onInputChange('tipoParceiro', value)}
          className="mt-2"
        >
          <div className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
            <RadioGroupItem value="bike-park" id="bike-park" />
            <Label htmlFor="bike-park" className="flex-1 cursor-pointer">
              <div>
                <span className="font-medium">Bike Park</span>
                <p className="text-sm text-gray-500">Trilhas, pistas de downhill, parques de mountain bike</p>
              </div>
            </Label>
          </div>
          <div className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
            <RadioGroupItem value="organizador" id="organizador" />
            <Label htmlFor="organizador" className="flex-1 cursor-pointer">
              <div>
                <span className="font-medium">Organizador de Eventos</span>
                <p className="text-sm text-gray-500">Competições, passeios, eventos de ciclismo</p>
              </div>
            </Label>
          </div>
        </RadioGroup>
        {errors.tipoParceiro && <p className="text-red-500 text-sm mt-1">{errors.tipoParceiro}</p>}
      </div>
    </div>
  );
};
