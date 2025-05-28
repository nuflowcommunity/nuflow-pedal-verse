
import { useState, useMemo, useCallback } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

export interface FilterOption {
  key: string;
  value: string;
  label: string;
}

export interface SortOption {
  field: string;
  direction: 'asc' | 'desc';
  label: string;
}

export interface AdvancedFilterConfig {
  searchFields: string[];
  filterFields: {
    key: string;
    label: string;
    options: FilterOption[];
  }[];
  sortOptions: SortOption[];
}

export const useAdvancedFiltering = <T extends Record<string, any>>(
  data: T[],
  config: AdvancedFilterConfig
) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [sortBy, setSortBy] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const filteredData = useMemo(() => {
    let result = [...data];

    // Apply search filter
    if (debouncedSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase();
      result = result.filter(item =>
        config.searchFields.some(field => {
          const value = item[field];
          if (value == null) return false;
          return String(value).toLowerCase().includes(query);
        })
      );
    }

    // Apply active filters
    Object.entries(activeFilters).forEach(([key, value]) => {
      if (value && value !== '_all') {
        result = result.filter(item => {
          const itemValue = item[key];
          if (itemValue == null) return false;
          return String(itemValue).toLowerCase() === value.toLowerCase();
        });
      }
    });

    // Apply sorting
    if (sortBy) {
      result.sort((a, b) => {
        let aValue = a[sortBy];
        let bValue = b[sortBy];

        // Handle different data types
        if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue?.toLowerCase() || '';
        }

        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, debouncedSearchQuery, activeFilters, sortBy, sortDirection, config.searchFields]);

  const updateFilter = useCallback((key: string, value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setActiveFilters({});
    setSortBy('');
    setSortDirection('asc');
  }, []);

  const clearFilter = useCallback((key: string) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  }, []);

  const updateSort = useCallback((field: string, direction: 'asc' | 'desc') => {
    setSortBy(field);
    setSortDirection(direction);
  }, []);

  const hasActiveFilters = Object.keys(activeFilters).length > 0 || searchQuery.length > 0;

  return {
    searchQuery,
    setSearchQuery,
    activeFilters,
    updateFilter,
    clearFilter,
    clearFilters,
    sortBy,
    sortDirection,
    updateSort,
    filteredData,
    hasActiveFilters,
    totalResults: data.length,
    filteredResults: filteredData.length
  };
};
