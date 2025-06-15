
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
        Informações sobre redes sociais e presença online (opcional)
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="instagram" className="flex items-center gap-1">
            Instagram da Empresa
            <FieldIcon fieldStatus={fieldStatus} field="instagram" />
          </Label>
          <Input
            id="instagram"
            value={formData.instagram}
            onChange={(e) => onInputChange('instagram', e.target.value)}
            placeholder="@minhaempresa ou https://instagram.com/minhaempresa"
            className={errors.instagram ? 'border-red-500' : fieldStatus.instagram === 'valid' ? 'border-green-500' : ''}
            disabled={isSubmitting}
          />
          {errors.instagram && <p className="text-red-500 text-sm mt-1">{errors.instagram}</p>}
          {!errors.instagram && <p className="text-gray-500 text-xs mt-1">Perfil oficial da empresa no Instagram</p>}
        </div>
        
        <div>
          <Label htmlFor="site" className="flex items-center gap-1">
            Site Oficial
            <FieldIcon fieldStatus={fieldStatus} field="site" />
          </Label>
          <Input
            id="site"
            value={formData.site}
            onChange={(e) => onInputChange('site', e.target.value)}
            placeholder="https://www.minhaempresa.com"
            className={errors.site ? 'border-red-500' : fieldStatus.site === 'valid' ? 'border-green-500' : ''}
            disabled={isSubmitting}
          />
          {errors.site && <p className="text-red-500 text-sm mt-1">{errors.site}</p>}
          {!errors.site && <p className="text-gray-500 text-xs mt-1">Website oficial da empresa</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="comoConheceu">Como conheceu a NuFlow?</Label>
        <Select 
          value={formData.comoConheceu} 
          onValueChange={(value) => onInputChange('comoConheceu', value)}
          disabled={isSubmitting}
        >
          <SelectTrigger>
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
        <p className="text-gray-500 text-xs mt-1">Isso nos ajuda a entender nossos canais de divulgação</p>
      </div>
    </div>
  );
};
