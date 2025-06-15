
import React from 'react';
import { useEntitiesPageState } from '@/hooks/admin/useEntitiesPageState';
import { useEntitiesFiltering } from '@/hooks/admin/useEntitiesFiltering';
import { EntitiesPageLayout } from './EntitiesPageLayout';
import { EntityTableContent } from './EntityTableContent';
import { mockEntities } from './mockData';

const EntitiesContainer = () => {
  const {
    activeTab,
    setActiveTab,
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
    selectedEntity,
    setSelectedEntity,
    isDrawerOpen,
    setIsDrawerOpen,
    isDetailDrawerOpen,
    setIsDetailDrawerOpen,
    currentPage,
    setCurrentPage,
    clearFilters,
    handleViewEntity,
    handleEditEntity,
    handleTabChange,
    handleSort,
    toast,
  } = useEntitiesPageState();

  const { filteredEntities } = useEntitiesFiltering(mockEntities, {
    activeTab,
    searchQuery,
    partnerFilter,
    typeFilter,
    statusFilter,
    validationFilter,
  });

  // Get unique partners for filter dropdown
  const partners = Array.from(new Set(mockEntities.map(entity => entity.partner)));

  const mockStats = {
    total: mockEntities.length,
    ativo: mockEntities.filter(e => e.status === 'ativo').length,
    pendente: mockEntities.filter(e => e.status === 'pendente').length,
    cancelado: mockEntities.filter(e => e.status === 'cancelado').length,
    eventos: mockEntities.filter(e => e.type === 'evento').length,
    mensalidades: mockEntities.filter(e => e.type === 'mensalidade').length,
    dayUse: mockEntities.filter(e => e.type === 'dayUse').length,
    creditos: mockEntities.filter(e => e.type === 'credito').length,
    validationIssues: mockEntities.filter(e => e.type === 'credito' && (e as any).validationStatus === 'failed').length,
    salesLast24h: 0,
    salesCurrentMonth: 0,
    salesTotal: 0,
  };

  const onFilterChange = {
    setSearchQuery,
    setPartnerFilter,
    setTypeFilter,
    setStatusFilter,
    setValidationFilter,
    handleDateChange: () => {},
    filterLast24Hours: () => {},
    filterCurrentMonth: () => {},
    filterAllTime: () => {},
    clearFilters,
  };

  return (
    <EntitiesPageLayout
      loading={false}
      activeTab={activeTab}
      stats={mockStats}
      onTabChange={handleTabChange}
      onRefresh={() => {}}
      onViewIssues={() => {}}
    >
      <EntityTableContent
        activeTab={activeTab}
        filters={{
          searchQuery,
          partnerFilter,
          typeFilter,
          statusFilter,
          validationFilter,
          activeTab,
          sortDirection: 'desc'
        }}
        filteredEntities={filteredEntities}
        partners={partners}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onFilterChange={onFilterChange}
        onViewEntity={handleViewEntity}
        onSort={handleSort}
        toast={toast}
      />
    </EntitiesPageLayout>
  );
};

export default EntitiesContainer;
