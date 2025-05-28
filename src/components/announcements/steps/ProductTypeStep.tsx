
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
        <Label htmlFor="category" className="text-base font-medium">
          Categoria da Bicicleta *
        </Label>
        <p className="text-sm text-gray-600 mb-3">
          Selecione o tipo de bicicleta que você está anunciando
        </p>
        <Select value={data.category || ""} onValueChange={(value) => onUpdate({ category: value })}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione a categoria" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="brand" className="text-base font-medium">
          Marca *
        </Label>
        <p className="text-sm text-gray-600 mb-3">
          Escolha a marca da sua bicicleta
        </p>
        <Select value={data.brand || ""} onValueChange={(value) => onUpdate({ brand: value })}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione a marca" />
          </SelectTrigger>
          <SelectContent>
            {brands.map((brand) => (
              <SelectItem key={brand} value={brand}>
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="bg-nuflow-mint/10 p-4 rounded-lg">
        <p className="text-sm text-nuflow-darkForest font-medium">
          💡 Dica: Quanto mais específicas as informações, maior a chance de venda!
        </p>
      </div>
    </div>
  );
};

export default ProductTypeStep;
