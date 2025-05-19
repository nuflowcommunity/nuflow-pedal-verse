
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductSearchProps {
  onSearchChange?: (value: string) => void;
  onFilterClick?: () => void;
  additionalFilters?: React.ReactNode;
}

const ProductSearch = ({ onSearchChange, onFilterClick, additionalFilters }: ProductSearchProps) => {
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange?.(e.target.value);
  };

  return (
    <section className="py-8 border-b border-nuflow-mineral/20">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-auto flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-nuflow-charcoal/50" size={20} />
            <input 
              type="text" 
              placeholder="Buscar produtos..." 
              className="w-full pl-10 pr-4 py-3 border border-nuflow-mineral/30 rounded-md focus:outline-none focus:ring-2 focus:ring-nuflow-moss"
              onChange={handleSearchInput}
            />
          </div>
          
          <div className="flex items-center w-full md:w-auto gap-3">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={onFilterClick}
            >
              <Filter size={18} />
              Filtros
            </Button>
            
            {additionalFilters}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSearch;
