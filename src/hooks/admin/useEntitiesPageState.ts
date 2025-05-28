
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Entity } from '@/components/admin/entities/types';

export const useEntitiesPageState = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('todos');
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

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

  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
    setCurrentPage(1);
  }, []);

  const handleSort = useCallback((field: keyof Entity, direction: 'asc' | 'desc') => {
    console.log('Sorting by:', field, direction);
  }, []);

  return {
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
  };
};
