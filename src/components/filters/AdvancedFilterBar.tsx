
import React, { useState } from 'react';
import { Search, Filter, X, ChevronDown, SortAsc, SortDesc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { AdvancedFilterConfig } from '@/hooks/useAdvancedFiltering';

interface AdvancedFilterBarProps {
  config: AdvancedFilterConfig;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilters: Record<string, string>;
  onFilterChange: (key: string, value: string) => void;
  onFilterClear: (key: string) => void;
  onClearAll: () => void;
  sortBy: string;
  sortDirection: 'asc' | 'desc';
  onSortChange: (field: string, direction: 'asc' | 'desc') => void;
  hasActiveFilters: boolean;
  filteredResults: number;
  totalResults: number;
  renderExportButtons?: () => React.ReactNode;
}

export const AdvancedFilterBar: React.FC<AdvancedFilterBarProps> = ({
  config,
  searchQuery,
  onSearchChange,
  activeFilters,
  onFilterChange,
  onFilterClear,
  onClearAll,
  sortBy,
  sortDirection,
  onSortChange,
  hasActiveFilters,
  filteredResults,
  totalResults,
  renderExportButtons
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="mb-6">
      <CardContent className="p-4 space-y-4">
        {/* Search and basic controls */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter size={16} />
                  Filtros Avançados
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                  />
                </Button>
              </CollapsibleTrigger>
            </Collapsible>
            
            {/* Sort Controls */}
            <Select value={`${sortBy}-${sortDirection}`} onValueChange={(value) => {
              const [field, direction] = value.split('-');
              onSortChange(field, direction as 'asc' | 'desc');
            }}>
              <SelectTrigger className="w-auto min-w-[140px]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="-">Sem ordenação</SelectItem>
                {config.sortOptions.map((option) => (
                  <SelectItem key={`${option.field}-${option.direction}`} value={`${option.field}-${option.direction}`}>
                    <div className="flex items-center gap-2">
                      {option.direction === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />}
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {renderExportButtons && renderExportButtons()}
          </div>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600">Filtros ativos:</span>
            {Object.entries(activeFilters).map(([key, value]) => {
              const filterField = config.filterFields.find(f => f.key === key);
              const option = filterField?.options.find(o => o.value === value);
              
              return (
                <Badge key={key} variant="secondary" className="flex items-center gap-1">
                  {filterField?.label}: {option?.label || value}
                  <X 
                    size={12} 
                    className="cursor-pointer hover:text-red-500" 
                    onClick={() => onFilterClear(key)}
                  />
                </Badge>
              );
            })}
            <Button variant="ghost" size="sm" onClick={onClearAll} className="text-red-600 hover:text-red-800">
              Limpar todos
            </Button>
          </div>
        )}

        {/* Advanced Filters */}
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {config.filterFields.map((field) => (
                <div key={field.key}>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    {field.label}
                  </label>
                  <Select 
                    value={activeFilters[field.key] || ''} 
                    onValueChange={(value) => onFilterChange(field.key, value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={`Todos ${field.label.toLowerCase()}`} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="_all">Todos</SelectItem>
                      {field.options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Results Summary */}
        <div className="text-sm text-gray-600 border-t pt-3">
          Mostrando {filteredResults} de {totalResults} resultado{totalResults !== 1 ? 's' : ''}
          {hasActiveFilters && ` (filtrado${filteredResults !== 1 ? 's' : ''})`}
        </div>
      </CardContent>
    </Card>
  );
};
