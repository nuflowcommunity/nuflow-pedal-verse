
import React from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
        Preferências de Contato *
      </h3>
      <p className="text-sm text-gray-600 -mt-2">
        Como e quando prefere ser contatado pela nossa equipe
      </p>
      
      <div>
        <Label className="text-gray-700">Dias Disponíveis para Contato *</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
          {diasSemana.map((dia) => (
            <div key={dia} className="flex items-center space-x-2">
              <Checkbox
                id={dia}
                checked={formData.diasDisponiveis.includes(dia)}
                onCheckedChange={(checked) => onDaysChange(dia, checked as boolean)}
                disabled={isSubmitting}
              />
              <Label htmlFor={dia} className="text-sm cursor-pointer text-gray-700">
                {dia}
              </Label>
            </div>
          ))}
        </div>
        <p className="text-gray-500 text-xs mt-2">Selecione os dias em que prefere receber contato comercial</p>
      </div>

      <div>
        <Label htmlFor="horarioPreferencial" className="text-gray-700">Horário Preferencial *</Label>
        <Select 
          value={formData.horarioPreferencial} 
          onValueChange={(value) => onInputChange('horarioPreferencial', value)}
          disabled={isSubmitting}
        >
          <SelectTrigger className="border-gray-300">
            <SelectValue placeholder="Selecione o horário..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="manha">Manhã (08:00 - 12:00)</SelectItem>
            <SelectItem value="tarde">Tarde (13:00 - 18:00)</SelectItem>
            <SelectItem value="noite">Noite (18:00 - 21:00)</SelectItem>
            <SelectItem value="qualquer">Qualquer horário</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-gray-500 text-xs mt-1">Melhor horário para contato telefônico</p>
      </div>
    </div>
  );
};
