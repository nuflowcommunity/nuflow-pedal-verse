
import { useMemo } from 'react';
import { Entity } from '@/components/admin/entities/types';

export const useEntitiesFiltering = (
  entities: Entity[],
  activeTab: string
) => {
  const filteredEntities = useMemo(() => {
    let filtered = [...entities];

    // Filter by active tab
    if (activeTab !== 'todos') {
      filtered = filtered.filter(entity => entity.type === activeTab);
    }

    return filtered;
  }, [entities, activeTab]);

  return { filteredEntities };
};
