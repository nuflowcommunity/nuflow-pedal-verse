
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Entity } from '@/components/admin/entities/types';

export const useEntitiesPageState = () => {
  const [activeTab, setActiveTab] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [partnerFilter, setPartnerFilter] = useState('todos');
  const [typeFilter, setTypeFilter] = useState('todos');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [validationFilter, setValidationFilter] = useState('todos');
  const [selectedEntity, setSelectedEntity] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();

  console.log('useEntitiesPageState - Current state:', {
    activeTab,
    searchQuery,
    partnerFilter,
    typeFilter,
    statusFilter,
    validationFilter,
    selectedEntity,
    isDrawerOpen,
    isDetailDrawerOpen,
    currentPage
  });

  const clearFilters = () => {
    setSearchQuery('');
    setPartnerFilter('todos');
    setTypeFilter('todos');
    setStatusFilter('todos');
    setValidationFilter('todos');
    console.log('Filters cleared');
  };

  const handleViewEntity = (entity: Entity) => {
    console.log('Viewing entity:', entity);
    setSelectedEntity(entity);
    setIsDetailDrawerOpen(true);
  };

  const handleEditEntity = (entity: Entity) => {
    console.log('Editing entity:', entity);
    toast({
      title: "Editar entidade",
      description: `Editando ${entity.name}`,
    });
  };

  const handleTabChange = (value: string) => {
    console.log('Tab changed to:', value);
    setActiveTab(value);
  };

  const handleSort = (field: keyof Entity, direction: 'asc' | 'desc') => {
    console.log('Sorting by:', field, direction);
    // TODO: Implement sorting functionality
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
  };
};
