
import React from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { FinanceTable } from '@/components/admin/finance/FinanceTable';
import { EntityFilterBar } from '@/components/admin/entities/EntityFilterBar';
import { EntityPagination } from '@/components/admin/entities/EntityPagination';
import { EntityEmptyState } from '@/components/admin/entities/EntityEmptyState';
import { getTypeSpecificColumns } from '@/components/admin/entities/EntityColumns';
import { getTypeSpecificActions } from '@/components/admin/entities/EntityActions';
import { entityTypeLabels } from '@/components/admin/entities/types';
import { Entity } from '@/components/admin/entities/types';
import { EntitiesFilterState } from '@/hooks/admin/useEntitiesData';

interface EntityTableContentProps {
  activeTab: string;
  filters: EntitiesFilterState;
  filteredEntities: Entity[];
  partners: string[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  onFilterChange: {
    setSearchQuery: (value: string) => void;
    setPartnerFilter: (value: string) => void;
    setTypeFilter: (value: string) => void;
    setStatusFilter: (value: string) => void;
    setValidationFilter: (value: string) => void;
    handleDateChange: (start: Date | undefined, end: Date | undefined) => void;
    filterLast24Hours: () => void;
    filterCurrentMonth: () => void;
    filterAllTime: () => void;
    clearFilters: () => void;
  };
  onViewEntity: (entity: Entity) => void;
  onSort: (field: keyof Entity, direction: 'asc' | 'desc') => void;
  toast: any;
}

export const EntityTableContent: React.FC<EntityTableContentProps> = ({
  activeTab,
  filters,
  filteredEntities,
  partners,
  currentPage,
  setCurrentPage,
  onFilterChange,
  onViewEntity,
  onSort,
  toast
}) => {
  // Get columns for the current entity type
  const typeSpecificColumns = React.useMemo(() => 
    getTypeSpecificColumns(activeTab), [activeTab]);
  
  // Actions configuration for the table
  const tableActions = (item: Entity) => ({
    view: true,
    custom: getTypeSpecificActions(item, toast)
  });

  return (
    <TabsContent value={activeTab} className="mt-6">
      {/* Filter bar */}
      <EntityFilterBar 
        searchQuery={filters.searchQuery}
        setSearchQuery={onFilterChange.setSearchQuery}
        partnerFilter={filters.partnerFilter}
        setPartnerFilter={onFilterChange.setPartnerFilter}
        typeFilter={filters.typeFilter}
        setTypeFilter={onFilterChange.setTypeFilter}
        statusFilter={filters.statusFilter}
        setStatusFilter={onFilterChange.setStatusFilter}
        validationFilter={filters.validationFilter}
        setValidationFilter={onFilterChange.setValidationFilter}
        activeTab={activeTab}
        clearFilters={onFilterChange.clearFilters}
        partners={partners}
        startDate={filters.startDate}
        endDate={filters.endDate}
        onDateChange={onFilterChange.handleDateChange}
        onFilterLast24Hours={onFilterChange.filterLast24Hours}
        onFilterCurrentMonth={onFilterChange.filterCurrentMonth}
        onFilterAllTime={onFilterChange.filterAllTime}
      />

      {/* Entity table with sorting */}
      <FinanceTable
        title={`Entidades ${activeTab !== 'todos' ? '- ' + entityTypeLabels[activeTab as keyof typeof entityTypeLabels] : ''}`}
        columns={typeSpecificColumns}
        data={filteredEntities}
        actions={tableActions}
        onRowClick={onViewEntity}
        pagination={
          <EntityPagination 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage} 
            totalPages={3} 
          />
        }
        emptyState={<EntityEmptyState />}
        defaultSortField="salesLast24h"
        defaultSortDirection="desc"
        onSort={onSort}
      />
    </TabsContent>
  );
};
