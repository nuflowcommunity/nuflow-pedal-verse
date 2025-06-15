
import { useState } from 'react';

export const useEntitiesPageState = () => {
  const [activeTab, setActiveTab] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [partnerFilter, setPartnerFilter] = useState('todos');
  const [typeFilter, setTypeFilter] = useState('todos');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [validationFilter, setValidationFilter] = useState('todos');
  const [selectedEntity, setSelectedEntity] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const clearFilters = () => {
    setSearchQuery('');
    setPartnerFilter('todos');
    setTypeFilter('todos');
    setStatusFilter('todos');
    setValidationFilter('todos');
  };

  return {
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
    clearFilters,
  };
};
