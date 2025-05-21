
import React from 'react';
import { Tabs } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Entity } from '@/components/admin/entities/types';

// Import refactored components
import { EntityHeader } from '@/components/admin/entities/EntityHeader';
import { EntityStats } from '@/components/admin/entities/EntityStats';
import { EntityTypesTabs } from '@/components/admin/entities/EntityTypesTabs';
import { EntityDetailDrawer } from '@/components/admin/entities/EntityDetailDrawer';
import { EntityTableContent } from '@/components/admin/entities/EntityTableContent';
import { useEntitiesData } from '@/hooks/admin/useEntitiesData';
import { entityTypeLabels } from '@/components/admin/entities/types';

interface EntidadesAdminContainerProps {
  initialEntities: Entity[];
}

export const EntidadesAdminContainer: React.FC<EntidadesAdminContainerProps> = ({ 
  initialEntities 
}) => {
  const { toast } = useToast();
  
  // Use the entities data hook
  const entitiesData = useEntitiesData(initialEntities);
  
  // Handlers for various actions
  const handleViewEntity = (entity: Entity) => {
    entitiesData.setSelectedEntity(entity);
    entitiesData.setIsDetailOpen(true);
  };

  const handleNewEntity = (type: string) => {
    toast({
      title: `Nova ${entityTypeLabels[type as keyof typeof entityTypeLabels]}`,
      description: `Criando uma nova ${entityTypeLabels[type as keyof typeof entityTypeLabels].toLowerCase()}`,
    });
  };

  const handleEditEntity = (entity: Entity) => {
    toast({
      title: "Editar entidade",
      description: `Editando ${entityTypeLabels[entity.type]}: ${entity.name}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header with page title and add entity dropdown */}
      <EntityHeader onNewEntity={handleNewEntity} />

      {/* Summary statistics cards */}
      <EntityStats 
        stats={entitiesData.stats} 
        onViewIssues={entitiesData.handleViewIssues} 
      />

      {/* Make sure the entire tabs structure is wrapped in a Tabs component */}
      <Tabs value={entitiesData.activeTab} onValueChange={entitiesData.setActiveTab}>
        {/* Entity type tabs */}
        <EntityTypesTabs 
          activeTab={entitiesData.activeTab} 
          setActiveTab={entitiesData.setActiveTab} 
        />

        {/* Tab content with filters and entity table */}
        <EntityTableContent
          activeTab={entitiesData.activeTab}
          filters={{
            searchQuery: entitiesData.searchQuery,
            partnerFilter: entitiesData.partnerFilter,
            typeFilter: entitiesData.typeFilter,
            statusFilter: entitiesData.statusFilter,
            validationFilter: entitiesData.validationFilter,
            startDate: entitiesData.startDate,
            endDate: entitiesData.endDate,
            activeTab: entitiesData.activeTab,
            sortField: entitiesData.sortField,
            sortDirection: entitiesData.sortDirection
          }}
          filteredEntities={entitiesData.filteredEntities}
          partners={entitiesData.partners}
          currentPage={entitiesData.currentPage}
          setCurrentPage={entitiesData.setCurrentPage}
          onFilterChange={{
            setSearchQuery: entitiesData.setSearchQuery,
            setPartnerFilter: entitiesData.setPartnerFilter,
            setTypeFilter: entitiesData.setTypeFilter,
            setStatusFilter: entitiesData.setStatusFilter,
            setValidationFilter: entitiesData.setValidationFilter,
            handleDateChange: entitiesData.handleDateChange,
            filterLast24Hours: entitiesData.filterLast24Hours,
            filterCurrentMonth: entitiesData.filterCurrentMonth,
            filterAllTime: entitiesData.filterAllTime,
            clearFilters: entitiesData.clearFilters
          }}
          onViewEntity={handleViewEntity}
          onSort={entitiesData.handleSort}
          toast={toast}
        />
      </Tabs>
      
      {/* Entity detail drawer */}
      <EntityDetailDrawer 
        isOpen={entitiesData.isDetailOpen} 
        onOpenChange={entitiesData.setIsDetailOpen} 
        entity={entitiesData.selectedEntity}
        onEditEntity={handleEditEntity}
        toast={toast}
      />
    </div>
  );
};
