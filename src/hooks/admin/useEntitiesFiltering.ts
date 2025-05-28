
import { useMemo, useCallback } from 'react';
import { Entity } from '@/components/admin/entities/types';

export const useEntitiesFiltering = (entities: Entity[], activeTab: string) => {
  const filteredEntities = useMemo(() => {
    if (activeTab === 'todos') {
      return entities;
    }
    return entities.filter(entity => entity.type === activeTab);
  }, [entities, activeTab]);

  return {
    filteredEntities
  };
};
