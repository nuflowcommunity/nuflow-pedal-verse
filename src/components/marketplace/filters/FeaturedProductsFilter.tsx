
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface FeaturedProductsFilterProps {
  featured: boolean;
  onFeaturedChange: (checked: boolean) => void;
}

const FeaturedProductsFilter: React.FC<FeaturedProductsFilterProps> = ({
  featured,
  onFeaturedChange
}) => {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium text-gray-900">Especiais</Label>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="featured"
          checked={featured}
          onCheckedChange={onFeaturedChange}
          aria-describedby="featured-description"
        />
        <Label htmlFor="featured" className="text-sm cursor-pointer text-gray-700">
          Apenas produtos em destaque
        </Label>
      </div>
    </div>
  );
};

export default FeaturedProductsFilter;
