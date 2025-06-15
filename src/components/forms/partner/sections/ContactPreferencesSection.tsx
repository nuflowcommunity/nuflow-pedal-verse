
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { FormData } from '../types';
import { diasSemana } from '../data/constants';

interface ContactPreferencesSectionProps {
  formData: FormData;
  isSubmitting: boolean;
  onInputChange: (field: string, value: string) => void;
  onDaysChange: (day: string, checked: boolean) => void;
}

export const ContactPreferencesSection: React.FC<ContactPreferencesSectionProps> = ({
  formData,
  isSubmitting,
  onInputChange,
  onDaysChange
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
        Preferências de Contato
      </h3>
      <p className="text-sm text-gray-600 -mt-2">
        Quando é melhor entrarmos em contato para discutir a parceria
      </p>
      
      <div>
        <Label>Dias da Semana Preferenciais</Label>
        <p className="text-gray-500 text-xs mb-3">Selecione os dias em que prefere receber contato comercial</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {diasSemana.map(dia => (
            <div key={dia} className="flex items-center space-x-2 p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Checkbox
                id={dia}
                checked={formData.diasDisponiveis.includes(dia)}
                onCheckedChange={(checked) => onDaysChange(dia, checked as boolean)}
                disabled={isSubmitting}
              />
              <Label htmlFor={dia} className="text-sm cursor-pointer">{dia}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="horarioPreferencial">Horário Preferencial para Contato</Label>
        <Select 
          value={formData.horarioPreferencial} 
          onValueChange={(value) => onInputChange('horarioPreferencial', value)}
          disabled={isSubmitting}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o melhor horário..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="manha">Manhã (8h às 12h)</SelectItem>
            <SelectItem value="tarde">Tarde (12h às 18h)</SelectItem>
            <SelectItem value="noite">Noite (18h às 22h)</SelectItem>
            <SelectItem value="comercial">Horário Comercial (8h às 18h)</SelectItem>
            <SelectItem value="qualquer">Qualquer horário</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-gray-500 text-xs mt-1">Nosso time comercial respeitará sua preferência</p>
      </div>
    </div>
  );
};
