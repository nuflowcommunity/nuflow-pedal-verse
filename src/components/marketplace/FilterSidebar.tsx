
import React from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import FilterContent from './filters/FilterContent';
import { ProductFilters } from '@/hooks/marketplace/useProducts';

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
  const clearAllFilters = () => {
    onFiltersChange({});
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={cn("hidden lg:block", className)}>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
          <FilterContent
            filters={filters}
            onFiltersChange={onFiltersChange}
            onClearAll={clearAllFilters}
          />
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
            <FilterContent
              filters={filters}
              onFiltersChange={onFiltersChange}
              onClearAll={clearAllFilters}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default FilterSidebar;
