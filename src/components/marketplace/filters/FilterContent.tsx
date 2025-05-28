
import React from 'react';
import { Separator } from '@/components/ui/separator';
import FilterHeader from './FilterHeader';
import FilterSection from './FilterSection';
import FeaturedProductsFilter from './FeaturedProductsFilter';
import PriceRangeFilter from './PriceRangeFilter';
import CheckboxFilterGroup from './CheckboxFilterGroup';
import YearFilter from './YearFilter';
import { ProductFilters } from '@/hooks/marketplace/useProducts';

interface FilterContentProps {
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  onClearAll: () => void;
}

const FilterContent: React.FC<FilterContentProps> = ({
  filters,
  onFiltersChange,
  onClearAll
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

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.category) count++;
    if (filters.brand) count++;
    if (filters.condition) count++;
    if (filters.location) count++;
    if (filters.featured) count++;
    if (filters.year) count++;
    if (filters.minPrice || filters.maxPrice) count++;
    return count;
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

  const handleYearChange = (year: number | undefined) => {
    onFiltersChange({
      ...filters,
      year
    });
  };

  return (
    <div className="space-y-6">
      <FilterHeader
        activeFiltersCount={getActiveFiltersCount()}
        onClearAll={onClearAll}
      />

      <Separator className="bg-gray-200" />

      <FeaturedProductsFilter
        featured={filters.featured || false}
        onFeaturedChange={handleFeaturedChange}
      />

      <Separator className="bg-gray-200" />

      <FilterSection title="Faixa de Preço">
        <PriceRangeFilter
          minPrice={filters.minPrice || 0}
          maxPrice={filters.maxPrice || 10000}
          onPriceChange={handlePriceChange}
        />
      </FilterSection>

      <FilterSection title="Ano de Fabricação">
        <YearFilter
          selectedYear={filters.year}
          onYearChange={handleYearChange}
        />
      </FilterSection>

      <FilterSection title="Categorias">
        <CheckboxFilterGroup
          items={categories}
          selectedValue={filters.category}
          onSelectionChange={handleCategoryChange}
          idPrefix="category"
        />
      </FilterSection>

      <FilterSection title="Marcas">
        <CheckboxFilterGroup
          items={brands}
          selectedValue={filters.brand}
          onSelectionChange={handleBrandChange}
          idPrefix="brand"
        />
      </FilterSection>

      <FilterSection title="Condição">
        <CheckboxFilterGroup
          items={conditions}
          selectedValue={filters.condition}
          onSelectionChange={handleConditionChange}
          idPrefix="condition"
        />
      </FilterSection>

      <FilterSection title="Localização">
        <CheckboxFilterGroup
          items={locations}
          selectedValue={filters.location}
          onSelectionChange={handleLocationChange}
          idPrefix="location"
        />
      </FilterSection>
    </div>
  );
};

export default FilterContent;
