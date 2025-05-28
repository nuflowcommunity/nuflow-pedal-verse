
import React, { useState } from 'react';
import { X, ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useCategories } from '@/hooks/marketplace/useProducts';
import { ProductFilters } from '@/hooks/marketplace/useProducts';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  className?: string;
}

const brands = [
  'Specialized', 'Trek', 'Cannondale', 'Giant', 'Scott', 'Pinarello', 
  'Santa Cruz', 'Cervélo', 'Orbea', 'Merida', 'Canyon', 'Focus'
];

const conditions = [
  { value: 'novo', label: 'Novo' },
  { value: 'seminovo', label: 'Seminovo' },
  { value: 'usado', label: 'Usado' }
];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  className = ''
}) => {
  const { categories } = useCategories();
  const [priceRange, setPriceRange] = useState([
    filters.minPrice || 0,
    filters.maxPrice || 50000
  ]);
  
  const [openSections, setOpenSections] = useState({
    categories: true,
    brands: true,
    condition: true,
    price: true
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

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

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
    onFiltersChange({
      ...filters,
      minPrice: values[0],
      maxPrice: values[1]
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
    setPriceRange([0, 50000]);
  };

  const hasActiveFilters = Object.keys(filters).some(key => 
    filters[key as keyof ProductFilters] !== undefined
  );

  const FilterSection: React.FC<{
    title: string;
    section: keyof typeof openSections;
    children: React.ReactNode;
  }> = ({ title, section, children }) => (
    <Collapsible open={openSections[section]} onOpenChange={() => toggleSection(section)}>
      <CollapsibleTrigger className="flex items-center justify-between w-full py-3 text-left hover:bg-gray-50 rounded-lg px-2">
        <span className="font-medium text-gray-900">{title}</span>
        {openSections[section] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </CollapsibleTrigger>
      <CollapsibleContent className="px-2 pb-4">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:sticky top-0 left-0 h-full lg:h-auto w-80 bg-white z-50 lg:z-auto
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        border-r border-gray-200 overflow-y-auto
        ${className}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-700" />
            <h2 className="font-semibold text-gray-900">Filtros</h2>
          </div>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters}
                className="text-nuflow-moss hover:text-nuflow-moss/80"
              >
                Limpar
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="lg:hidden"
            >
              <X size={20} />
            </Button>
          </div>
        </div>

        {/* Filters Content */}
        <div className="p-4 space-y-6">
          {/* Categories */}
          <FilterSection title="Categorias" section="categories">
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={filters.category === category.name}
                    onCheckedChange={(checked) => 
                      handleCategoryChange(category.name, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={`category-${category.id}`}
                    className="text-sm text-gray-700 cursor-pointer flex-1"
                  >
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </FilterSection>

          {/* Brands */}
          <FilterSection title="Marcas" section="brands">
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={filters.brand === brand}
                    onCheckedChange={(checked) => 
                      handleBrandChange(brand, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={`brand-${brand}`}
                    className="text-sm text-gray-700 cursor-pointer flex-1"
                  >
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </FilterSection>

          {/* Condition */}
          <FilterSection title="Estado" section="condition">
            <div className="space-y-3">
              {conditions.map((condition) => (
                <div key={condition.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`condition-${condition.value}`}
                    checked={filters.condition === condition.value}
                    onCheckedChange={(checked) => 
                      handleConditionChange(condition.value, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={`condition-${condition.value}`}
                    className="text-sm text-gray-700 cursor-pointer flex-1"
                  >
                    {condition.label}
                  </label>
                </div>
              ))}
            </div>
          </FilterSection>

          {/* Price Range */}
          <FilterSection title="Faixa de Preço" section="price">
            <div className="space-y-4">
              <Slider
                value={priceRange}
                onValueChange={handlePriceChange}
                max={50000}
                min={0}
                step={100}
                className="w-full"
              />
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange([Number(e.target.value), priceRange[1]])}
                  className="flex-1"
                />
                <span className="text-gray-500">até</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange([priceRange[0], Number(e.target.value)])}
                  className="flex-1"
                />
              </div>
              <div className="text-sm text-gray-600 text-center">
                R$ {priceRange[0].toLocaleString()} - R$ {priceRange[1].toLocaleString()}
              </div>
            </div>
          </FilterSection>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
