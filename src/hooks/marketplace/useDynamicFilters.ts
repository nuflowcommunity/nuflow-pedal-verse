
import { useState, useEffect } from 'react';
import { fetchDynamicFilters, DynamicFilter, trackFilterUsage } from '@/services/marketplace/dynamicFilters';

export const useDynamicFilters = (category?: string) => {
  const [filters, setFilters] = useState<DynamicFilter[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, any>>({});

  useEffect(() => {
    const loadFilters = async () => {
      try {
        setLoading(true);
        const dynamicFilters = await fetchDynamicFilters(category);
        setFilters(dynamicFilters);
      } catch (error) {
        console.error('Error loading dynamic filters:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFilters();
  }, [category]);

  const updateFilter = (filterId: string, value: any) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };
      
      if (value === null || value === undefined || value === '') {
        delete newFilters[filterId];
      } else {
        newFilters[filterId] = value;
      }

      // Track filter usage
      const filter = filters.find(f => f.id === filterId);
      if (filter && value) {
        trackFilterUsage(filterId, String(value));
      }

      return newFilters;
    });
  };

  const clearFilters = () => {
    setSelectedFilters({});
  };

  const getFilterValue = (filterId: string) => {
    return selectedFilters[filterId];
  };

  return {
    filters,
    loading,
    selectedFilters,
    updateFilter,
    clearFilters,
    getFilterValue
  };
};
