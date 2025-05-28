
import React from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

export interface ProductFilters {
  category?: string;
  brand?: string;
  condition?: string;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  featured?: boolean;
}

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  className?: string;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  className
}) => {
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
    'Hoje'
  ];

  const conditions = [
    { value: 'novo', label: 'Novo' },
    { value: 'seminovo', label: 'Semi-novo' },
    { value: 'usado', label: 'Usado' }
  ];

  const locations = [
    'São Paulo - SP',
    'Rio de Janeiro - RJ',
    'Belo Horizonte - MG',
    'Porto Alegre - RS',
    'Curitiba - PR',
    'Salvador - BA'
  ];

  const priceRange = filters.maxPrice ? [filters.minPrice || 0, filters.maxPrice] : [0, 10000];

  const handleCategoryChange = (category: string, checked: boolean) => {
    onFiltersChange({
      ...filters,
      category: checked ? category : undefined
    });
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    onFiltersChange({
      ...filters,
      brand: checked ? brand : undefined
    });
  };

  const handleConditionChange = (condition: string, checked: boolean) => {
    onFiltersChange({
      ...filters,
      condition: checked ? condition : undefined
    });
  };

  const handleLocationChange = (location: string, checked: boolean) => {
    onFiltersChange({
      ...filters,
      location: checked ? location : undefined
    });
  };

  const handlePriceChange = (value: number[]) => {
    onFiltersChange({
      ...filters,
      minPrice: value[0],
      maxPrice: value[1]
    });
  };

  const handleFeaturedChange = (checked: boolean) => {
    onFiltersChange({
      ...filters,
      featured: checked ? true : undefined
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({});
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.category) count++;
    if (filters.brand) count++;
    if (filters.condition) count++;
    if (filters.location) count++;
    if (filters.featured) count++;
    if (filters.minPrice || filters.maxPrice) count++;
    return count;
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
        <div className="flex items-center gap-2">
          {getActiveFiltersCount() > 0 && (
            <Badge variant="secondary" className="text-xs bg-nuflow-mint text-nuflow-forest">
              {getActiveFiltersCount()} ativo{getActiveFiltersCount() > 1 ? 's' : ''}
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-xs text-nuflow-forest hover:text-nuflow-darkForest hover:bg-nuflow-mint/50"
          >
            Limpar tudo
          </Button>
        </div>
      </div>

      <Separator className="bg-gray-200" />

      {/* Featured Products */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-900">Especiais</Label>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="featured"
            checked={filters.featured || false}
            onCheckedChange={handleFeaturedChange}
            aria-describedby="featured-description"
          />
          <Label htmlFor="featured" className="text-sm cursor-pointer text-gray-700">
            Apenas produtos em destaque
          </Label>
        </div>
      </div>

      <Separator className="bg-gray-200" />

      {/* Price Range */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-900">
          Faixa de Preço: R$ {priceRange[0].toLocaleString()} - R$ {priceRange[1].toLocaleString()}
        </Label>
        <Slider
          value={priceRange}
          onValueChange={handlePriceChange}
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

      <Separator className="bg-gray-200" />

      {/* Categories */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-900">Categorias</Label>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={filters.category === category}
                onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
              />
              <Label htmlFor={`category-${category}`} className="text-sm cursor-pointer text-gray-700 hover:text-gray-900">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-gray-200" />

      {/* Brands */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-900">Marcas</Label>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={filters.brand === brand}
                onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
              />
              <Label htmlFor={`brand-${brand}`} className="text-sm cursor-pointer text-gray-700 hover:text-gray-900">
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-gray-200" />

      {/* Condition */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-900">Condição</Label>
        <div className="space-y-2">
          {conditions.map((condition) => (
            <div key={condition.value} className="flex items-center space-x-2">
              <Checkbox
                id={`condition-${condition.value}`}
                checked={filters.condition === condition.value}
                onCheckedChange={(checked) => handleConditionChange(condition.value, checked as boolean)}
              />
              <Label htmlFor={`condition-${condition.value}`} className="text-sm cursor-pointer text-gray-700 hover:text-gray-900">
                {condition.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-gray-200" />

      {/* Location */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-900">Localização</Label>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {locations.map((location) => (
            <div key={location} className="flex items-center space-x-2">
              <Checkbox
                id={`location-${location}`}
                checked={filters.location === location}
                onCheckedChange={(checked) => handleLocationChange(location, checked as boolean)}
              />
              <Label htmlFor={`location-${location}`} className="text-sm cursor-pointer text-gray-700 hover:text-gray-900">
                {location}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={cn("hidden lg:block", className)}>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
          <FilterContent />
        </div>
      </div>

      {/* Mobile Sheet */}
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="w-80 p-0 lg:hidden bg-white border-r border-gray-200">
          <SheetHeader className="p-6 border-b border-gray-200 bg-white">
            <div className="flex items-center justify-between">
              <SheetTitle className="flex items-center gap-2 text-gray-900">
                <SlidersHorizontal size={20} />
                Filtros
              </SheetTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onClose} 
                aria-label="Fechar filtros"
                className="hover:bg-gray-100"
              >
                <X size={18} />
              </Button>
            </div>
          </SheetHeader>
          <div className="p-6 overflow-y-auto bg-white">
            <FilterContent />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default FilterSidebar;
