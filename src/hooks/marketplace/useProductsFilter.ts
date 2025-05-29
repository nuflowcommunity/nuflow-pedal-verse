
import { useMemo } from 'react';

export interface ProductFilters {
  search?: string;
  category?: string;
  brand?: string;
  condition?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
  year?: number;
}

export const useProductsFilter = (filters?: ProductFilters) => {
  const memoizedFilters = useMemo(() => {
    if (!filters) return undefined;
    
    // Clean filters - remove undefined/empty values with proper typing
    const cleanFilters: Partial<ProductFilters> = {};
    
    // Handle each filter type explicitly to avoid TypeScript issues
    if (filters.search !== undefined && filters.search !== null && filters.search !== '') {
      cleanFilters.search = filters.search;
    }
    if (filters.category !== undefined && filters.category !== null && filters.category !== '') {
      cleanFilters.category = filters.category;
    }
    if (filters.brand !== undefined && filters.brand !== null && filters.brand !== '') {
      cleanFilters.brand = filters.brand;
    }
    if (filters.condition !== undefined && filters.condition !== null && filters.condition !== '') {
      cleanFilters.condition = filters.condition;
    }
    if (filters.location !== undefined && filters.location !== null && filters.location !== '') {
      cleanFilters.location = filters.location;
    }
    if (filters.minPrice !== undefined && filters.minPrice !== null) {
      cleanFilters.minPrice = filters.minPrice;
    }
    if (filters.maxPrice !== undefined && filters.maxPrice !== null) {
      cleanFilters.maxPrice = filters.maxPrice;
    }
    if (filters.featured !== undefined && filters.featured !== null) {
      cleanFilters.featured = filters.featured;
    }
    if (filters.year !== undefined && filters.year !== null) {
      cleanFilters.year = filters.year;
    }
    
    return Object.keys(cleanFilters).length > 0 ? cleanFilters as ProductFilters : undefined;
  }, [filters]);

  return memoizedFilters;
};
