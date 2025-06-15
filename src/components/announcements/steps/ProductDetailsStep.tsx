
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
        <Label htmlFor="model" className="text-base font-medium text-trailflow-dark drop-shadow-sm">
          Modelo *
        </Label>
        <p className="text-sm text-trailflow-medium mb-3 drop-shadow-sm">
          Digite o modelo específico da sua bicicleta
        </p>
        <Input
          id="model"
          type="text"
          placeholder="Ex: Epic Expert Carbon, Tarmac SL7, TCR Advanced..."
          value={data.model || ""}
          onChange={(e) => onUpdate({ model: e.target.value })}
          className="w-full bg-gray-100/80 backdrop-blur-sm border-gray-300/60 hover:bg-gray-50/85 focus:bg-gray-50/90 transition-all duration-200"
        />
      </div>

      <div>
        <Label htmlFor="year" className="text-base font-medium text-trailflow-dark drop-shadow-sm">
          Ano de Fabricação *
        </Label>
        <p className="text-sm text-trailflow-medium mb-3 drop-shadow-sm">
          Selecione o ano de fabricação da bicicleta
        </p>
        <Select 
          value={data.year?.toString() || ""} 
          onValueChange={(value) => onUpdate({ year: parseInt(value) })}
        >
          <SelectTrigger className="w-full bg-gray-100/80 backdrop-blur-sm border-gray-300/60 hover:bg-gray-50/85 focus:bg-gray-50/90 transition-all duration-200">
            <SelectValue placeholder="Selecione o ano" />
          </SelectTrigger>
          <SelectContent className="max-h-60 bg-white/95 backdrop-blur-lg border-white/50">
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()} className="hover:bg-trailflow-accent/20">
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="location" className="text-base font-medium text-trailflow-dark drop-shadow-sm">
          Localização *
        </Label>
        <p className="text-sm text-trailflow-medium mb-3 drop-shadow-sm">
          Cidade e estado onde a bicicleta está localizada
        </p>
        <Input
          id="location"
          type="text"
          placeholder="Ex: São Paulo - SP"
          value={data.location || ""}
          onChange={(e) => onUpdate({ location: e.target.value })}
          className="w-full bg-gray-100/80 backdrop-blur-sm border-gray-300/60 hover:bg-gray-50/85 focus:bg-gray-50/90 transition-all duration-200"
        />
      </div>

      <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg border border-white/30">
        <p className="text-sm text-trailflow-dark font-medium drop-shadow-sm">
          📍 A localização ajuda compradores próximos a encontrar sua bike mais facilmente
        </p>
      </div>
    </div>
  );
};

export default ProductDetailsStep;
