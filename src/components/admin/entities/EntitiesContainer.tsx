
import React from 'react';
import { EntitiesPageLayout } from './EntitiesPageLayout';
import { EntityTableContent } from './EntityTableContent';
import { EntityDetailDrawer } from './EntityDetailDrawer';
import { useSupabaseEntitiesData } from '@/hooks/admin/useSupabaseEntitiesData';
import { useEntitiesPageState } from '@/hooks/admin/useEntitiesPageState';
import { useEntitiesFiltering } from '@/hooks/admin/useEntitiesFiltering';

export const EntitiesContainer: React.FC = () => {
  const {
    activeTab,
    selectedEntity,
    isDetailDrawerOpen,
    currentPage,
    setCurrentPage,
    setIsDetailDrawerOpen,
    handleViewEntity,
    handleEditEntity,
    handleTabChange,
    handleSort,
    toast
  } = useEntitiesPageState();

  // Initialize default values
  let entities: any[] = [];
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
    supabaseFilters = {
      ...supabaseFilters,
      ...hookData.filters,
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

  const { filteredEntities } = useEntitiesFiltering(entities, activeTab);

  const handleViewIssues = React.useCallback(() => {
    supabaseFilterActions.setValidationFilter('failed');
    supabaseFilterActions.setTypeFilter('credito');
    handleTabChange('credito');
  }, [supabaseFilterActions, handleTabChange]);

  const handleTabChangeWithFilter = React.useCallback((value: string) => {
    handleTabChange(value);
    
    if (value === 'todos') {
      supabaseFilterActions.setTypeFilter('');
    } else {
      supabaseFilterActions.setTypeFilter(value);
    }
  }, [handleTabChange, supabaseFilterActions]);

  // Transform supabase stats to match EntityStats interface
  const stats = {
    total: supabaseStats.total,
    ativo: supabaseStats.ativo,
    pendente: supabaseStats.pendente,
    cancelado: supabaseStats.cancelado,
    eventos: supabaseStats.eventos,
    mensalidades: supabaseStats.mensalidades,
    dayUse: supabaseStats.dayUse,
    creditos: supabaseStats.creditos,
    validationIssues: supabaseStats.validationIssues,
    salesLast24h: supabaseStats.salesLast24h,
    salesCurrentMonth: supabaseStats.salesCurrentMonth,
    salesTotal: supabaseStats.salesTotal
  };

  // Transform supabase filters to match expected interface
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

  return (
    <>
      <EntitiesPageLayout
        loading={loading}
        activeTab={activeTab}
        stats={stats}
        onTabChange={handleTabChangeWithFilter}
        onRefresh={refreshData}
        onViewIssues={handleViewIssues}
      >
        <EntityTableContent
          activeTab={activeTab}
          filters={filters}
          filteredEntities={filteredEntities}
          partners={partners}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onFilterChange={supabaseFilterActions}
          onViewEntity={handleViewEntity}
          onSort={handleSort}
          toast={toast}
        />
      </EntitiesPageLayout>
      
      <EntityDetailDrawer
        isOpen={isDetailDrawerOpen}
        onOpenChange={setIsDetailDrawerOpen}
        entity={selectedEntity}
        onEditEntity={handleEditEntity}
        toast={toast}
      />
    </>
  );
};
