
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface FilterHeaderProps {
  activeFiltersCount: number;
  onClearAll: () => void;
}

const FilterHeader: React.FC<FilterHeaderProps> = ({
  activeFiltersCount,
  onClearAll
}) => {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
      <div className="flex items-center gap-2">
        {activeFiltersCount > 0 && (
          <Badge variant="secondary" className="text-xs bg-nuflow-mint text-nuflow-forest">
            {activeFiltersCount} ativo{activeFiltersCount > 1 ? 's' : ''}
          </Badge>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="text-xs text-nuflow-forest hover:text-nuflow-darkForest hover:bg-nuflow-mint/50"
        >
          Limpar tudo
        </Button>
      </div>
    </div>
  );
};

export default FilterHeader;
