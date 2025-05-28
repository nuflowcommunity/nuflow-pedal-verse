
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { FinanceTable } from '@/components/admin/finance/FinanceTable';
import { EntityFilterBar } from '@/components/admin/entities/EntityFilterBar';
import { EntityPagination } from '@/components/admin/entities/EntityPagination';
import { EntityEmptyState } from '@/components/admin/entities/EntityEmptyState';
import { getTypeSpecificColumns } from '@/components/admin/entities/EntityColumns';
import { getTypeSpecificActions } from '@/components/admin/entities/EntityActions';
import { entityTypeLabels } from '@/components/admin/entities/types';
import { Entity } from '@/components/admin/entities/types';
import { EntitiesFilterState } from '@/hooks/admin/useEntitiesData';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import LoadingSkeleton from '@/components/ui/loading-skeleton';

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
  const isMobile = useBreakpoint('md');
  
  // Get columns for the current entity type
  const typeSpecificColumns = React.useMemo(() => 
    getTypeSpecificColumns(activeTab), [activeTab]);
  
  // Actions configuration for the table
  const tableActions = (item: Entity) => ({
    view: true,
    custom: getTypeSpecificActions(item, toast)
  });

  const renderTabContent = (tabValue: string) => (
    <TabsContent value={tabValue} className="mt-6 space-y-4">
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

      {/* Loading state */}
      {!filteredEntities ? (
        <div className="space-y-4">
          <LoadingSkeleton variant="card" count={3} />
        </div>
      ) : (
        /* Entity table with responsive design */
        <div className="w-full">
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
                totalPages={Math.max(1, Math.ceil(filteredEntities.length / 10))} 
              />
            }
            emptyState={<EntityEmptyState />}
            defaultSortField="salesLast24h"
            defaultSortDirection="desc"
            onSort={onSort}
          />
        </div>
      )}
    </TabsContent>
  );

  return (
    <>
      {renderTabContent('todos')}
      {renderTabContent('evento')}
      {renderTabContent('mensalidade')}
      {renderTabContent('dayUse')}
      {renderTabContent('credito')}
    </>
  );
};
