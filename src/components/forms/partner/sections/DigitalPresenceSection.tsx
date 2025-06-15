
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormData, FieldStatus, Errors } from '../types';
import { FieldIcon } from '../components/FieldIcon';
import { opcoesComoConheceu } from '../data/constants';

interface DigitalPresenceSectionProps {
  formData: FormData;
  fieldStatus: FieldStatus;
  errors: Errors;
  isSubmitting: boolean;
  onInputChange: (field: string, value: string) => void;
}

export const DigitalPresenceSection: React.FC<DigitalPresenceSectionProps> = ({
  formData,
  fieldStatus,
  errors,
  isSubmitting,
  onInputChange
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
        Presença Digital e Marketing
      </h3>
      <p className="text-sm text-gray-600 -mt-2">
        Redes sociais e canais digitais para divulgação
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="instagram" className="text-gray-700">Instagram</Label>
          <Input
            id="instagram"
            value={formData.instagram}
            onChange={(e) => onInputChange('instagram', e.target.value)}
            placeholder="@sua_empresa"
            className="border-gray-300"
            disabled={isSubmitting}
          />
          <p className="text-gray-500 text-xs mt-1">Opcional - Perfil no Instagram</p>
        </div>
        
        <div>
          <Label htmlFor="site" className="text-gray-700">Site/Website</Label>
          <Input
            id="site"
            value={formData.site}
            onChange={(e) => onInputChange('site', e.target.value)}
            placeholder="https://www.suaempresa.com.br"
            className="border-gray-300"
            disabled={isSubmitting}
          />
          <p className="text-gray-500 text-xs mt-1">Opcional - Site oficial da empresa</p>
        </div>
      </div>

      <div>
        <Label htmlFor="comoConheceu" className="text-gray-700">Como Conheceu a NuFlow? *</Label>
        <Select 
          value={formData.comoConheceu} 
          onValueChange={(value) => onInputChange('comoConheceu', value)}
          disabled={isSubmitting}
        >
          <SelectTrigger className={errors.comoConheceu ? 'border-red-500' : 'border-gray-300'}>
            <SelectValue placeholder="Selecione como nos conheceu..." />
          </SelectTrigger>
          <SelectContent>
            {opcoesComoConheceu.map(opcao => (
              <SelectItem key={opcao.value} value={opcao.value}>
                {opcao.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.comoConheceu && <p className="text-red-500 text-sm mt-1">{errors.comoConheceu}</p>}
        {!errors.comoConheceu && <p className="text-gray-500 text-xs mt-1">Nos ajuda a entender nossos canais de divulgação</p>}
      </div>
    </div>
  );
};
