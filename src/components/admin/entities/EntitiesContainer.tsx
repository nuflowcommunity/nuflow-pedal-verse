
import React from 'react';
import { useEntitiesPageState } from '@/hooks/admin/useEntitiesPageState';
import { useEntitiesFiltering } from '@/hooks/admin/useEntitiesFiltering';
import { EntitiesPageLayout } from './EntitiesPageLayout';
import { entities } from './mockData';

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

  const { filteredEntities } = useEntitiesFiltering(entities, {
    activeTab,
    searchQuery,
    partnerFilter,
    typeFilter,
    statusFilter,
    validationFilter,
  });

  // Get unique partners for filter dropdown
  const partners = Array.from(new Set(entities.map(entity => entity.partner)));

  return (
    <EntitiesPageLayout
      // State
      entities={filteredEntities}
      selectedEntity={selectedEntity}
      activeTab={activeTab}
      searchQuery={searchQuery}
      partnerFilter={partnerFilter}
      typeFilter={typeFilter}
      statusFilter={statusFilter}
      validationFilter={validationFilter}
      isDrawerOpen={isDrawerOpen}
      isDetailDrawerOpen={isDetailDrawerOpen}
      currentPage={currentPage}
      
      // Actions
      setActiveTab={setActiveTab}
      setSearchQuery={setSearchQuery}
      setPartnerFilter={setPartnerFilter}
      setTypeFilter={setTypeFilter}
      setStatusFilter={setStatusFilter}
      setValidationFilter={setValidationFilter}
      setSelectedEntity={setSelectedEntity}
      setIsDrawerOpen={setIsDrawerOpen}
      setIsDetailDrawerOpen={setIsDetailDrawerOpen}
      setCurrentPage={setCurrentPage}
      
      // Handlers
      handleViewEntity={handleViewEntity}
      handleEditEntity={handleEditEntity}
      handleTabChange={handleTabChange}
      handleSort={handleSort}
      clearFilters={clearFilters}
      
      // Data
      partners={partners}
    />
  );
};

export default EntitiesContainer;
