
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AnnouncementData } from '../AnnouncementWizard';

interface ProductTypeStepProps {
  data: Partial<AnnouncementData>;
  onUpdate: (data: Partial<AnnouncementData>) => void;
}

const ProductTypeStep: React.FC<ProductTypeStepProps> = ({ data, onUpdate }) => {
  const categories = [
    'Mountain Bike',
    'Speed/Road',
    'Gravel',
    'BMX',
    'Elétrica',
    'Urbana',
    'Dobrável'
  ];

  const brands = [
    'Trek',
    'Specialized',
    'Giant',
    'Cannondale',
    'Scott',
    'Merida',
    'Caloi',
    'Hoje',
    'Oggi',
    'Soul',
    'Sense',
    'Outra'
  ];

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="category" className="text-base font-medium text-trailflow-dark drop-shadow-sm">
          Categoria da Bicicleta *
        </Label>
        <p className="text-sm text-trailflow-medium mb-3 drop-shadow-sm">
          Selecione o tipo de bicicleta que você está anunciando
        </p>
        <Select value={data.category || ""} onValueChange={(value) => onUpdate({ category: value })}>
          <SelectTrigger className="w-full bg-white/60 backdrop-blur-sm border-white/40 hover:bg-white/70 focus:bg-white/80 transition-all duration-200">
            <SelectValue placeholder="Selecione a categoria" />
          </SelectTrigger>
          <SelectContent className="bg-white/95 backdrop-blur-lg border-white/50">
            {categories.map((category) => (
              <SelectItem key={category} value={category} className="hover:bg-trailflow-accent/20">
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="brand" className="text-base font-medium text-trailflow-dark drop-shadow-sm">
          Marca *
        </Label>
        <p className="text-sm text-trailflow-medium mb-3 drop-shadow-sm">
          Escolha a marca da sua bicicleta
        </p>
        <Select value={data.brand || ""} onValueChange={(value) => onUpdate({ brand: value })}>
          <SelectTrigger className="w-full bg-white/60 backdrop-blur-sm border-white/40 hover:bg-white/70 focus:bg-white/80 transition-all duration-200">
            <SelectValue placeholder="Selecione a marca" />
          </SelectTrigger>
          <SelectContent className="bg-white/95 backdrop-blur-lg border-white/50">
            {brands.map((brand) => (
              <SelectItem key={brand} value={brand} className="hover:bg-trailflow-accent/20">
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg border border-white/30">
        <p className="text-sm text-trailflow-dark font-medium drop-shadow-sm">
          💡 Dica: Quanto mais específicas as informações, maior a chance de venda!
        </p>
      </div>
    </div>
  );
};

export default ProductTypeStep;
