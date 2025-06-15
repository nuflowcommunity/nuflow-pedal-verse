
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
        <Label htmlFor="category" className="text-base font-medium text-gray-800">
          Categoria da Bicicleta *
        </Label>
        <p className="text-sm text-gray-700 mb-3">
          Selecione o tipo de bicicleta que você está anunciando
        </p>
        <Select value={data.category || ""} onValueChange={(value) => onUpdate({ category: value })}>
          <SelectTrigger className="w-full bg-gray-100/80 backdrop-blur-sm border-gray-300/60 hover:bg-gray-50/85 focus:bg-gray-50/90 transition-all duration-200">
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
        <Label htmlFor="brand" className="text-base font-medium text-gray-800">
          Marca *
        </Label>
        <p className="text-sm text-gray-700 mb-3">
          Escolha a marca da sua bicicleta
        </p>
        <Select value={data.brand || ""} onValueChange={(value) => onUpdate({ brand: value })}>
          <SelectTrigger className="w-full bg-gray-100/80 backdrop-blur-sm border-gray-300/60 hover:bg-gray-50/85 focus:bg-gray-50/90 transition-all duration-200">
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

      <div className="bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-gray-300">
        <p className="text-sm text-gray-800 font-medium">
          💡 Dica: Quanto mais específicas as informações, maior a chance de venda!
        </p>
      </div>
    </div>
  );
};

export default ProductTypeStep;
