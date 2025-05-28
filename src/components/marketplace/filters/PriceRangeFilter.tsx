
import React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface PriceRangeFilterProps {
  minPrice: number;
  maxPrice: number;
  onPriceChange: (value: number[]) => void;
}

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  minPrice,
  maxPrice,
  onPriceChange
}) => {
  const priceRange = [minPrice, maxPrice];

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium text-gray-900">
        Faixa de Preço: R$ {priceRange[0].toLocaleString()} - R$ {priceRange[1].toLocaleString()}
      </Label>
      <Slider
        value={priceRange}
        onValueChange={onPriceChange}
        max={10000}
        min={0}
        step={100}
        className="w-full"
        aria-label="Faixa de preço"
      />
      <div className="flex justify-between text-xs text-gray-600">
        <span>R$ 0</span>
        <span>R$ 10.000+</span>
      </div>
    </div>
  );
};

export default PriceRangeFilter;
