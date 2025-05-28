
import React from 'react';
import { SlidersHorizontal, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ProductFilters } from '@/hooks/marketplace/useProducts';

interface MarketplaceToolbarProps {
  productsCount: number;
  loading: boolean;
  hasActiveFilters: boolean;
  searchQuery: string;
  filters: ProductFilters;
  sortBy: string;
  viewMode: 'grid' | 'list';
  onShowFilters: () => void;
  onSearchClear: () => void;
  onFiltersClear: (newFilters: ProductFilters) => void;
  onClearAll: () => void;
  onSortChange: (value: string) => void;
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

const MarketplaceToolbar: React.FC<MarketplaceToolbarProps> = ({
  productsCount,
  loading,
  hasActiveFilters,
  searchQuery,
  filters,
  sortBy,
  viewMode,
  onShowFilters,
  onSearchClear,
  onFiltersClear,
  onClearAll,
  onSortChange,
  onViewModeChange
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Left: Results count and active filters */}
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-lg font-semibold text-gray-900">
              {loading ? 'Carregando...' : `${productsCount} produtos encontrados`}
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={onShowFilters}
              className="lg:hidden"
              aria-label="Abrir filtros"
            >
              <SlidersHorizontal size={16} className="mr-2" aria-hidden="true" />
              Filtros
            </Button>
          </div>
          
          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2" role="list" aria-label="Filtros ativos">
              <span className="text-sm text-gray-700">Filtros ativos:</span>
              {searchQuery && (
                <Badge variant="secondary" className="flex items-center gap-1" role="listitem">
                  Busca: "{searchQuery}"
                  <button 
                    onClick={onSearchClear} 
                    className="ml-1 hover:text-gray-700"
                    aria-label="Remover filtro de busca"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {filters.category && (
                <Badge variant="secondary" className="flex items-center gap-1" role="listitem">
                  {filters.category}
                  <button 
                    onClick={() => onFiltersClear({...filters, category: undefined})} 
                    className="ml-1 hover:text-gray-700"
                    aria-label="Remover filtro de categoria"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {filters.brand && (
                <Badge variant="secondary" className="flex items-center gap-1" role="listitem">
                  {filters.brand}
                  <button 
                    onClick={() => onFiltersClear({...filters, brand: undefined})} 
                    className="ml-1 hover:text-gray-700"
                    aria-label="Remover filtro de marca"
                  >
                    ×
                  </button>
                </Badge>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onClearAll} 
                className="text-nuflow-moss hover:text-nuflow-darkForest"
              >
                Limpar todos
              </Button>
            </div>
          )}
        </div>

        {/* Right: Sort and view options */}
        <div className="flex items-center gap-3">
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-48" aria-label="Ordenar produtos">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-300 shadow-lg z-50">
              <SelectItem value="newest">Mais recentes</SelectItem>
              <SelectItem value="oldest">Mais antigos</SelectItem>
              <SelectItem value="price-low">Menor preço</SelectItem>
              <SelectItem value="price-high">Maior preço</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center border border-gray-300 rounded-lg" role="group" aria-label="Modo de visualização">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewModeChange('grid')}
              className={`rounded-none ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
              aria-label="Visualização em grade"
              aria-pressed={viewMode === 'grid'}
            >
              <Grid size={16} aria-hidden="true" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewModeChange('list')}
              className={`rounded-none ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
              aria-label="Visualização em lista"
              aria-pressed={viewMode === 'list'}
            >
              <List size={16} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceToolbar;
