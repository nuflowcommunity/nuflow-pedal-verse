
import React from 'react';
import FilterSuggestionsManagement from '@/components/admin/filters/FilterSuggestionsManagement';

const FilterManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Gerenciamento de Filtros</h1>
      </div>
      <FilterSuggestionsManagement />
    </div>
  );
};

export default FilterManagement;
