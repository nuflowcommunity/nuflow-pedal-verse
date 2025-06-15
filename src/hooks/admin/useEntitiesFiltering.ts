
import { useMemo } from 'react';
import { Entity } from '@/components/admin/entities/types';

export const useEntitiesFiltering = (
  entities: Entity[],
  searchQuery: string,
  partnerFilter: string,
  typeFilter: string,
  statusFilter: string,
  validationFilter: string,
  activeTab: string
) => {
  const filteredEntities = useMemo(() => {
    let filtered = [...entities];

    // Filter by active tab
    if (activeTab !== 'todos') {
      filtered = filtered.filter(entity => entity.type === activeTab);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(entity =>
        entity.name.toLowerCase().includes(query) ||
        entity.partner.toLowerCase().includes(query)
      );
    }

    // Filter by partner
    if (partnerFilter && partnerFilter !== 'todos') {
      filtered = filtered.filter(entity => entity.partner === partnerFilter);
    }

    // Filter by type
    if (typeFilter && typeFilter !== 'todos') {
      filtered = filtered.filter(entity => entity.type === typeFilter);
    }

    // Filter by status
    if (statusFilter && statusFilter !== 'todos') {
      filtered = filtered.filter(entity => entity.status === statusFilter);
    }

    // Filter by validation status (only for credits)
    if (validationFilter && validationFilter !== 'todos') {
      filtered = filtered.filter(entity => {
        if (entity.type === 'credito') {
          return (entity as any).validationStatus === validationFilter;
        }
        return true;
      });
    }

    return filtered;
  }, [entities, searchQuery, partnerFilter, typeFilter, statusFilter, validationFilter, activeTab]);

  return filteredEntities;
};
