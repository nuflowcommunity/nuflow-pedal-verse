
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Tabs } from '@/components/ui/tabs';
import { Entity } from '@/components/admin/entities/types';
import { EntityHeader } from '@/components/admin/entities/EntityHeader';
import { EntityStats } from '@/components/admin/entities/EntityStats';
import { EntityTypesTabs } from '@/components/admin/entities/EntityTypesTabs';
import { EntityTableContent } from '@/components/admin/entities/EntityTableContent';
import { EntityDetailDrawer } from '@/components/admin/entities/EntityDetailDrawer';
import { useSupabaseEntitiesData } from '@/hooks/admin/useSupabaseEntitiesData';

const EntidadesAdminContainer: React.FC = () => {
  const { toast } = useToast();
  const {
    entities,
    partners,
    loading,
    stats,
    filters,
    filterActions,
    refreshData,
  } = useSupabaseEntitiesData();

  const [activeTab, setActiveTab] = useState('todos');
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleViewEntity = (entity: Entity) => {
    setSelectedEntity(entity);
    setIsDetailDrawerOpen(true);
  };

  const handleEditEntity = (entity: Entity) => {
    toast({
      title: "Editar Entidade",
      description: `Funcionalidade de edição para ${entity.name} será implementada`,
    });
    setIsDetailDrawerOpen(false);
  };

  const handleViewIssues = () => {
    filterActions.setValidationFilter('failed');
    filterActions.setTypeFilter('credito');
    setActiveTab('credito');
  };

  const handleSort = (field: keyof Entity, direction: 'asc' | 'desc') => {
    console.log('Sorting by:', field, direction);
    // Implementar ordenação se necessário
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setCurrentPage(1); // Reset pagination when changing tabs
    
    // Clear type filter when going to "todos" tab, or set it when selecting specific type
    if (value === 'todos') {
      filterActions.setTypeFilter('');
    } else {
      filterActions.setTypeFilter(value);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Carregando entidades...</div>
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
        
        <EntityTableContent
          activeTab={activeTab}
          filters={filters}
          filteredEntities={entities}
          partners={partners}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onFilterChange={filterActions}
          onViewEntity={handleViewEntity}
          onSort={handleSort}
          toast={toast}
        />
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
