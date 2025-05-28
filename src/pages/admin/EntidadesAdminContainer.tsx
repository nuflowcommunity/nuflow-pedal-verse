
import React, { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Entity } from '@/components/admin/entities/types';
import { EntityHeader } from '@/components/admin/entities/EntityHeader';
import { EntityStats } from '@/components/admin/entities/EntityStats';
import { EntityTypesTabs } from '@/components/admin/entities/EntityTypesTabs';
import { EntityTableContent } from '@/components/admin/entities/EntityTableContent';
import { EntityDetailDrawer } from '@/components/admin/entities/EntityDetailDrawer';
import { useSupabaseEntitiesData } from '@/hooks/admin/useSupabaseEntitiesData';
import LoadingSkeleton from '@/components/ui/loading-skeleton';

const EntidadesAdminContainer: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('todos');
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  let entities: Entity[] = [];
  let partners: string[] = [];
  let loading = false;
  let stats = {
    total: 0,
    byType: {
      evento: 0,
      mensalidade: 0,
      dayUse: 0,
      credito: 0
    },
    validationIssues: 0
  };
  let filters = {
    searchQuery: '',
    partnerFilter: '',
    typeFilter: '',
    statusFilter: '',
    validationFilter: '',
    startDate: undefined,
    endDate: undefined
  };
  let filterActions = {
    setSearchQuery: () => {},
    setPartnerFilter: () => {},
    setTypeFilter: () => {},
    setStatusFilter: () => {},
    setValidationFilter: () => {},
    handleDateChange: () => {},
    filterLast24Hours: () => {},
    filterCurrentMonth: () => {},
    filterAllTime: () => {},
    clearFilters: () => {}
  };
  let refreshData = () => {};

  try {
    const hookData = useSupabaseEntitiesData();
    entities = hookData.entities || [];
    partners = hookData.partners || [];
    loading = hookData.loading;
    stats = hookData.stats || stats;
    filters = hookData.filters || filters;
    filterActions = hookData.filterActions || filterActions;
    refreshData = hookData.refreshData || refreshData;
  } catch (error) {
    console.error('Error loading entities data:', error);
    toast({
      title: "Erro ao carregar dados",
      description: "Ocorreu um erro ao carregar as entidades. Tente novamente.",
      variant: "destructive"
    });
  }

  const handleViewEntity = useCallback((entity: Entity) => {
    setSelectedEntity(entity);
    setIsDetailDrawerOpen(true);
  }, []);

  const handleEditEntity = useCallback((entity: Entity) => {
    toast({
      title: "Editar Entidade",
      description: `Funcionalidade de edição para ${entity.name} será implementada`,
    });
    setIsDetailDrawerOpen(false);
  }, [toast]);

  const handleViewIssues = useCallback(() => {
    filterActions.setValidationFilter('failed');
    filterActions.setTypeFilter('credito');
    setActiveTab('credito');
  }, [filterActions]);

  const handleSort = useCallback((field: keyof Entity, direction: 'asc' | 'desc') => {
    console.log('Sorting by:', field, direction);
  }, []);

  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
    setCurrentPage(1);
    
    if (value === 'todos') {
      filterActions.setTypeFilter('');
    } else {
      filterActions.setTypeFilter(value);
    }
  }, [filterActions]);

  const filteredEntities = React.useMemo(() => {
    if (activeTab === 'todos') {
      return entities;
    }
    return entities.filter(entity => entity.type === activeTab);
  }, [entities, activeTab]);

  if (loading) {
    return (
      <div className="space-y-6">
        <LoadingSkeleton variant="card" count={1} />
        <LoadingSkeleton variant="text" count={3} />
        <LoadingSkeleton variant="card" count={2} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <EntityHeader onRefresh={refreshData} />
      
      <EntityStats 
        stats={stats}
        onViewIssues={handleViewIssues}
      />
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <EntityTypesTabs 
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
        
        <TabsContent value={activeTab} className="mt-6">
          <EntityTableContent
            activeTab={activeTab}
            filters={filters}
            filteredEntities={filteredEntities}
            partners={partners}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onFilterChange={filterActions}
            onViewEntity={handleViewEntity}
            onSort={handleSort}
            toast={toast}
          />
        </TabsContent>
      </Tabs>
      
      <EntityDetailDrawer
        isOpen={isDetailDrawerOpen}
        onOpenChange={setIsDetailDrawerOpen}
        entity={selectedEntity}
        onEditEntity={handleEditEntity}
        toast={toast}
      />
    </div>
  );
};

export default EntidadesAdminContainer;
