
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AnnouncementData } from '../AnnouncementWizard';

interface ProductDetailsStepProps {
  data: Partial<AnnouncementData>;
  onUpdate: (data: Partial<AnnouncementData>) => void;
}

const ProductDetailsStep: React.FC<ProductDetailsStepProps> = ({ data, onUpdate }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2009 }, (_, i) => currentYear - i)
    .filter(year => year <= 2025 && year >= 2010);

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="model" className="text-base font-medium">
          Modelo *
        </Label>
        <p className="text-sm text-gray-600 mb-3">
          Digite o modelo específico da sua bicicleta
        </p>
        <Input
          id="model"
          type="text"
          placeholder="Ex: Epic Expert Carbon, Tarmac SL7, TCR Advanced..."
          value={data.model || ""}
          onChange={(e) => onUpdate({ model: e.target.value })}
          className="w-full"
        />
      </div>

      <div>
        <Label htmlFor="year" className="text-base font-medium">
          Ano de Fabricação *
        </Label>
        <p className="text-sm text-gray-600 mb-3">
          Selecione o ano de fabricação da bicicleta
        </p>
        <Select 
          value={data.year?.toString() || ""} 
          onValueChange={(value) => onUpdate({ year: parseInt(value) })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione o ano" />
          </SelectTrigger>
          <SelectContent className="max-h-60">
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="location" className="text-base font-medium">
          Localização *
        </Label>
        <p className="text-sm text-gray-600 mb-3">
          Cidade e estado onde a bicicleta está localizada
        </p>
        <Input
          id="location"
          type="text"
          placeholder="Ex: São Paulo - SP"
          value={data.location || ""}
          onChange={(e) => onUpdate({ location: e.target.value })}
          className="w-full"
        />
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-blue-800 font-medium">
          📍 A localização ajuda compradores próximos a encontrar sua bike mais facilmente
        </p>
      </div>
    </div>
  );
};

export default ProductDetailsStep;
