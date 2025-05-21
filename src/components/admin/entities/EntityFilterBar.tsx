
import React from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { EntityFiltersPanel } from './filters/EntityFiltersPanel';
import { DateFilterPanel } from './filters/DateFilterPanel';

interface EntityFilterBarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  partnerFilter: string;
  setPartnerFilter: (value: string) => void;
  typeFilter: string;
  setTypeFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  validationFilter: string;
  setValidationFilter: (value: string) => void;
  activeTab: string;
  clearFilters: () => void;
  partners: string[];
  // Date filter props
  startDate: Date | undefined;
  endDate: Date | undefined;
  onDateChange: (start: Date | undefined, end: Date | undefined) => void;
  // Quick filter handlers
  onFilterLast24Hours: () => void;
  onFilterCurrentMonth: () => void;
  onFilterAllTime: () => void;
}

export const EntityFilterBar: React.FC<EntityFilterBarProps> = ({
  searchQuery,
  setSearchQuery,
  partnerFilter,
  setPartnerFilter,
  typeFilter,
  setTypeFilter,
  statusFilter,
  setStatusFilter,
  validationFilter,
  setValidationFilter,
  activeTab,
  clearFilters,
  partners,
  startDate,
  endDate,
  onDateChange,
  onFilterLast24Hours,
  onFilterCurrentMonth,
  onFilterAllTime,
}) => {
  const filtersApplied = !!searchQuery || !!partnerFilter || !!typeFilter || !!statusFilter || !!validationFilter || activeTab !== 'todos' || !!startDate;
  
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Filtros</CardTitle>
        <CardDescription>Refine os resultados utilizando os filtros abaixo</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Date filter row */}
          <DateFilterPanel 
            startDate={startDate}
            endDate={endDate}
            onDateChange={onDateChange}
            onFilterLast24Hours={onFilterLast24Hours}
            onFilterCurrentMonth={onFilterCurrentMonth}
            onFilterAllTime={onFilterAllTime}
          />
          
          {/* Entity filters panel */}
          <EntityFiltersPanel 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            partnerFilter={partnerFilter}
            setPartnerFilter={setPartnerFilter}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            validationFilter={validationFilter}
            setValidationFilter={setValidationFilter}
            activeTab={activeTab}
            partners={partners}
          />
          
          {/* Clear filters button */}
          <div className="flex justify-end mt-4">
            <Button 
              variant="outline" 
              onClick={clearFilters}
              className="flex items-center gap-2"
              disabled={!filtersApplied}
            >
              <Filter size={16} />
              Limpar Filtros
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
