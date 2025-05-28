
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

  // Initialize default values
  let entities: Entity[] = [];
  let partners: string[] = [];
  let loading = false;
  let supabaseStats = {
    total: 0,
    ativo: 0,
    pendente: 0,
    cancelado: 0,
    eventos: 0,
    mensalidades: 0,
    dayUse: 0,
    creditos: 0,
    validationIssues: 0,
    salesLast24h: 0,
    salesCurrentMonth: 0,
    salesTotal: 0,
  };
  let supabaseFilters = {
    searchQuery: '',
    partnerFilter: '',
    typeFilter: '',
    statusFilter: '',
    validationFilter: '',
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    activeTab: 'todos',
    sortDirection: 'desc' as 'asc' | 'desc',
  };
  let supabaseFilterActions = {
    setSearchQuery: (value: string) => {},
    setPartnerFilter: (value: string) => {},
    setTypeFilter: (value: string) => {},
    setStatusFilter: (value: string) => {},
    setValidationFilter: (value: string) => {},
    handleDateChange: (start?: Date, end?: Date) => {},
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
    supabaseStats = hookData.stats || supabaseStats;
    // Ensure we properly merge the filters with defaults
    supabaseFilters = {
      ...supabaseFilters,
      ...hookData.filters,
      // Ensure these properties always exist
      startDate: hookData.filters?.startDate || undefined,
      endDate: hookData.filters?.endDate || undefined,
      activeTab: hookData.filters?.activeTab || 'todos',
      sortDirection: hookData.filters?.sortDirection || 'desc',
    };
    supabaseFilterActions = hookData.filterActions || supabaseFilterActions;
    refreshData = hookData.refreshData || refreshData;
  } catch (error) {
    console.error('Error loading entities data:', error);
    toast({
      title: "Erro ao carregar dados",
      description: "Ocorreu um erro ao carregar as entidades. Tente novamente.",
      variant: "destructive"
    });
  }

  // Transform supabase stats to match EntityStats interface
  const stats = {
    total: supabaseStats.total,
    byType: {
      evento: supabaseStats.eventos,
      mensalidade: supabaseStats.mensalidades,
      dayUse: supabaseStats.dayUse,
      credito: supabaseStats.creditos
    },
    validationIssues: supabaseStats.validationIssues
  };

  // Transform supabase filters to match expected interface - ensure all properties exist
  const filters = {
    searchQuery: supabaseFilters.searchQuery,
    partnerFilter: supabaseFilters.partnerFilter,
    typeFilter: supabaseFilters.typeFilter,
    statusFilter: supabaseFilters.statusFilter,
    validationFilter: supabaseFilters.validationFilter,
    startDate: supabaseFilters.startDate,
    endDate: supabaseFilters.endDate,
    activeTab: supabaseFilters.activeTab,
    sortDirection: supabaseFilters.sortDirection
  };

  // Transform filter actions to match expected interface
  const filterActions = {
    setSearchQuery: supabaseFilterActions.setSearchQuery,
    setPartnerFilter: supabaseFilterActions.setPartnerFilter,
    setTypeFilter: supabaseFilterActions.setTypeFilter,
    setStatusFilter: supabaseFilterActions.setStatusFilter,
    setValidationFilter: supabaseFilterActions.setValidationFilter,
    handleDateChange: supabaseFilterActions.handleDateChange,
    filterLast24Hours: supabaseFilterActions.filterLast24Hours,
    filterCurrentMonth: supabaseFilterActions.filterCurrentMonth,
    filterAllTime: supabaseFilterActions.filterAllTime,
    clearFilters: supabaseFilterActions.clearFilters
  };

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
        stats={{
          total: stats.total,
          ativo: supabaseStats.ativo,
          pendente: supabaseStats.pendente,
          cancelado: supabaseStats.cancelado,
          eventos: stats.byType.evento,
          mensalidades: stats.byType.mensalidade,
          dayUse: stats.byType.dayUse,
          creditos: stats.byType.credito,
          validationIssues: stats.validationIssues,
          salesLast24h: supabaseStats.salesLast24h,
          salesCurrentMonth: supabaseStats.salesCurrentMonth,
          salesTotal: supabaseStats.salesTotal
        }}
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
