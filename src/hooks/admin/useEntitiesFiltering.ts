
import { useMemo } from 'react';
import { Entity } from '@/components/admin/entities/types';

export const useEntitiesFiltering = (
  entities: Entity[],
  filters: {
    activeTab: string;
    searchQuery: string;
    partnerFilter: string;
    typeFilter: string;
    statusFilter: string;
    validationFilter: string;
  }
) => {
  const filteredEntities = useMemo(() => {
    let filtered = [...entities];

    // Filter by active tab
    if (filters.activeTab !== 'todos') {
      filtered = filtered.filter(entity => entity.type === filters.activeTab);
    }

    // Filter by search query
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(entity =>
        entity.name.toLowerCase().includes(query) ||
        entity.partner.toLowerCase().includes(query)
      );
    }

    // Filter by partner
    if (filters.partnerFilter && filters.partnerFilter !== 'todos') {
      filtered = filtered.filter(entity => entity.partner === filters.partnerFilter);
    }

    // Filter by type
    if (filters.typeFilter && filters.typeFilter !== 'todos') {
      filtered = filtered.filter(entity => entity.type === filters.typeFilter);
    }

    // Filter by status
    if (filters.statusFilter && filters.statusFilter !== 'todos') {
      filtered = filtered.filter(entity => entity.status === filters.statusFilter);
    }

    // Filter by validation status (only for credits)
    if (filters.validationFilter && filters.validationFilter !== 'todos') {
      filtered = filtered.filter(entity => {
        if (entity.type === 'credito') {
          return (entity as any).validationStatus === filters.validationFilter;
        }
        return true;
      });
    }

    return filtered;
  }, [entities, filters]);

  return { filteredEntities };
};
